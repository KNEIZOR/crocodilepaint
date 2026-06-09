import { crocodileStore } from 'entities/crocodile';
import { CrocodileLabel } from 'entities/crocodile/model/types/crocodile';
import { observer } from 'mobx-react-lite';
import cls from './botModels.module.scss'

export const BotModels = observer(() => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        crocodileStore.setLabel(e.target.value as CrocodileLabel);
    };

    return (
        <div className={cls.botModels}>
            <select value={crocodileStore.currentLabel} onChange={handleChange}>
                <option value="cat">Кот</option>
                <option value="house">Дом</option>
                <option value="car">Машина</option>
            </select>
        </div>
    );
});
