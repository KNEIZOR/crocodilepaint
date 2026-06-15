const fs = require('fs');
const sharp = require('sharp');
const ort = require('onnxruntime-node');

const labels = JSON.parse(fs.readFileSync('labels.json', 'utf8'));

let session = null;

// -------------------------
// ЗАГРУЗКА МОДЕЛИ
// -------------------------
async function loadModel() {
    try {
        if (!session) {
            session = await ort.InferenceSession.create('model.onnx');
            console.log('ONNX модель загружена');
            console.log('INPUTS:', session.inputNames);
            console.log('OUTPUTS:', session.outputNames);
        }
    } catch (err) {
        console.error('Ошибка загрузки модели:', err);
        session = null;
    }
}

// -------------------------
// АВТООБРЕЗКА (CROP)
// -------------------------
async function preprocess(imgBuffer) {
    const sharpImg = sharp(imgBuffer).grayscale();

    // Получаем RAW данные
    const { data, info } = await sharpImg
        .raw()
        .toBuffer({ resolveWithObject: true });

    const { width, height } = info;

    let minX = width, minY = height;
    let maxX = 0, maxY = 0;

    // Ищем границы рисунка
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const v = data[y * width + x];
            if (v < 250) { // пиксель не белый
                if (x < minX) minX = x;
                if (y < minY) minY = y;
                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
            }
        }
    }

    // Если рисунок пустой — fallback
    if (minX > maxX || minY > maxY) {
        return sharpImg
            .resize(28, 28)
            .raw()
            .toBuffer();
    }

    const cropWidth = maxX - minX;
    const cropHeight = maxY - minY;

    // Вырезаем область и уменьшаем до 28×28
    const cropped = await sharpImg
        .extract({
            left: minX,
            top: minY,
            width: cropWidth,
            height: cropHeight
        })
        .resize(64, 64)
        .raw()
        .toBuffer();

    return cropped;
}

// -------------------------
// ПРЕДСКАЗАНИЕ
// -------------------------
async function predict(base64) {
    if (!session) await loadModel();

    const imgBuffer = Buffer.from(base64, 'base64');

    // Сохраняем debug.png
    fs.writeFileSync("debug.png", imgBuffer);
    console.log("debug.png saved");

    // Автообрезка + grayscale + resize
    const img = await preprocess(imgBuffer);

    // Нормализация (без инверсии)
    const floatArray = Float32Array.from(img, (v) => v / 255);

    // NHWC (Keras)
    const tensor = new ort.Tensor('float32', floatArray, [1, 64, 64, 1]);

    const inputName = session.inputNames[0];

    let result;
    try {
        result = await session.run({ [inputName]: tensor });
    } catch (err) {
        console.log("MODEL ERROR:", err.message);
        console.log("TENSOR SHAPE:", tensor.dims);
        throw err;
    }

    const outputName = session.outputNames[0];
    const output = result[outputName].data;

    const maxIndex = output.indexOf(Math.max(...output));

    return labels[maxIndex];
}

module.exports = { loadModel, predict };
