import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import cls from './backButton.module.scss';
import { routePath } from 'shared/config/routeConfig/routeConfig';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <Button
            className={cls.backButton}
            onClick={() => navigate(routePath.start)}
        >
            Назад
        </Button>
    );
};

export default BackButton;
