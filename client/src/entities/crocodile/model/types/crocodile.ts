import type * as tf from "@tensorflow/tfjs";

export type CrocodileLabel = "cat" | "house" | "car";

export interface Sample {
    activation: tf.Tensor;
    label: CrocodileLabel;
}

export interface LoadedModels {
    tf: typeof import("@tensorflow/tfjs");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mobilenetModel: any
    classifier: tf.Sequential;
}
