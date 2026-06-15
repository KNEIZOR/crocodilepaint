import { makeAutoObservable } from 'mobx';
import type { CrocodileLabel, Sample, LoadedModels } from '../types/crocodile';

export class CrocodileStore {
    samples: Sample[] = [];
    currentLabel: CrocodileLabel = 'cat';

    tf: LoadedModels['tf'] | null = null;
    mobilenetModel: LoadedModels['mobilenetModel'] | null = null;
    classifier: LoadedModels['classifier'] | null = null;

    isReady = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLabel(label: CrocodileLabel) {
        this.currentLabel = label;
    }

    addSample(sample: Sample) {
        this.samples.push(sample);
    }

    setModels(models: LoadedModels) {
        this.tf = models.tf;
        this.mobilenetModel = models.mobilenetModel;
        this.classifier = models.classifier;
        this.isReady = true;
    }
}

