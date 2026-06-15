const fs = require("fs");
const { predict } = require("./predict");

async function test() {
    const img = fs.readFileSync("dataset/cat/0.png"); // ← возьми любую PNG из датасета
    const base64 = img.toString("base64");

    const result = await predict(base64);

    console.log("Ожидалось: cat");
    console.log("Модель сказала:", result);
}

test();