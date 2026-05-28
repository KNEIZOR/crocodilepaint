import ChangeCard from 'shared/ui/ChangeCard/ChangeCard';
import { changeCardConfig } from '../model/changeCardConfig';
import cls from './startPage.module.scss';

const StartPage = () => {
    return (
        <div className={cls.startPage}>
            <h1>Добро пожаловать в KNEIZOR GAMES</h1>
            <p>Выберите игру:</p>
            <div className={cls.cards}>
                {changeCardConfig.map((card) => (
                    <ChangeCard
                        key={card.title}
                        title={card.title}
                        text={card.text}
                        link={card.link}
                    />
                ))}
            </div>
        </div>
    );
};

export default StartPage;
