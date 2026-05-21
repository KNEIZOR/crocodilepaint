import React, { InputHTMLAttributes, memo } from 'react';
import cls from './input.module.scss'

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
>;

interface InputProps extends HTMLInputProps {
    type: string;
    onChange: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
    const { type, onChange, ...otherProps } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return <input className={cls.input} type={type} onChange={onChangeHandler} {...otherProps} />;
});
