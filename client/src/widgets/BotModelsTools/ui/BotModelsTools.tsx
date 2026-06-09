import React from 'react';
import cls from './borModuleTools.module.scss'
import { loadModels } from 'shared/lib/crocodile/crocodileLoadModel';
import { crocodileStore } from 'entities/crocodile';
import { addSampleToStore } from 'shared/lib/addSample/addSample';
import { trainModel } from 'shared/lib/trainModel/trainModel';
import { predict } from 'shared/lib/predict/predict';

const BotModelsTools = () => {
    const handleLoad = async () => {
        const models = await loadModels();
        crocodileStore.setModels(models);
    };

    const handleAdd = () => {
        const canvas = document.querySelector("canvas") as HTMLCanvasElement;
        addSampleToStore(crocodileStore, canvas);
    };

    const handleTrain = async () => {
        await trainModel(crocodileStore);
    };

    const handleGuess = () => {
        const canvas = document.querySelector("canvas") as HTMLCanvasElement;
        const result = predict(crocodileStore, canvas);
        alert("Ответ: " + result);
    };

    return (
        <div className={cls.botModuleTools}>
            <button onClick={handleLoad}>Загрузить модель</button>
            <button onClick={handleAdd}>Добавить пример</button>
            <button onClick={handleTrain}>Обучить</button>
            <button onClick={handleGuess}>Угадать</button>
        </div>
    );
};

export default BotModelsTools;