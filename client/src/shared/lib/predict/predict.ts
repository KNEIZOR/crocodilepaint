import { CrocodileStore } from "entities/crocodile/model/state/store";


const LABELS_RU = ["Кот", "Дом", "Машина"];

export function predict(store: CrocodileStore, canvas: HTMLCanvasElement): string {
    if (!store.tf || !store.mobilenetModel || !store.classifier) return "Модель не загружена";

    const img = store.tf.browser.fromPixels(canvas);
    const activation = store.mobilenetModel.infer(img, "conv_preds");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pred = store.classifier.predict(activation.expandDims(0)) as any;

    const index = pred.argMax(1).dataSync()[0];
    return LABELS_RU[index];
}
