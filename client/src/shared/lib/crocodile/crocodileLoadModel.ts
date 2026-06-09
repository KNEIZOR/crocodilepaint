import { LoadedModels } from "entities/crocodile/model/types/crocodile";

export async function loadModels(): Promise<LoadedModels> {
    const tf = await import("@tensorflow/tfjs");
    const mobilenet = await import("@tensorflow-models/mobilenet");

    const mobilenetModel = await mobilenet.load();
    const classifier = tf.sequential();

    return { tf, mobilenetModel, classifier };
}
