import { ButtonHTMLAttributes, memo } from 'react';
import cls from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

const Button = memo((props: ButtonProps) => {
    const { className, children, ...oherProps } = props;

    return (
        <button
        className={`${cls.button} ${className ? className : ''}`}
            {...oherProps}
        >
            {children}
        </button>
    );
});

export default Button;
