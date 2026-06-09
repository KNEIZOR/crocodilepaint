import { CrocodileStore } from "entities/crocodile/model/state/store";



export function addSampleToStore(store: CrocodileStore, canvas: HTMLCanvasElement) {
    if (!store.tf || !store.mobilenetModel) return;

    const img = store.tf.browser.fromPixels(canvas);
    const activation = store.mobilenetModel.infer(img, "conv_preds");

    store.addSample({
        activation,
        label: store.currentLabel,
    });
}
