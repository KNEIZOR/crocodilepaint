import { useNavigate } from 'react-router-dom';
import cls from './changeCard.module.scss';

interface ChangeCardProps {
    title: string;
    text: string;
    link: string;
}

const ChangeCard = (props: ChangeCardProps) => {
    const { text, title, link } = props;
    const navigate = useNavigate();

    return (
        <div className={cls.changeCard} onClick={() => navigate(link)}>
            <h2 className={cls.cardTitle}>{title}</h2>
            <p className={cls.cardText}>{text}</p>
        </div>
    );
};

export default ChangeCard;
