import React, { LabelHTMLAttributes, memo } from 'react';

import cls from './label.module.scss';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    id: string;
    text: string;
}

export const Label = memo((props: LabelProps) => {
    const { id, text } = props;

    return (
        <label className={cls.label} htmlFor={id}>
            {text}
        </label>
    );
});
