import { CrocodileStore } from "entities/crocodile/model/state/store";
import { CrocodileLabel } from "entities/crocodile/model/types/crocodile";


const LABELS: CrocodileLabel[] = ["cat", "house", "car"];

export async function trainModel(store: CrocodileStore) {
    if (!store.tf || !store.classifier) return;

    const { tf, classifier, samples } = store;

    const xs = tf.concat(samples.map(s => s.activation));

    const ys = tf.tensor2d(
        samples.map(s => {
            const arr = [0, 0, 0];
            arr[LABELS.indexOf(s.label)] = 1;
            return arr;
        })
    );

    classifier.add(tf.layers.dense({
        inputShape: [xs.shape[1] as number],
        units: 64,
        activation: "relu",
    }));

    classifier.add(tf.layers.dense({
        units: LABELS.length,
        activation: "softmax",
    }));

    classifier.compile({
        optimizer: tf.train.adam(0.0005),
        loss: "categoricalCrossentropy",
        metrics: ["accuracy"],
    });

    await classifier.fit(xs, ys, { epochs: 20, shuffle: true });
}
