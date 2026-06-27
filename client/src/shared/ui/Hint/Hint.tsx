import React from 'react';
import cls from './hint.module.scss'

interface HintProps {
    text: string;
}

const Hint = (props: HintProps) => {
    const { text } = props;

    return <div className={cls.hint}>{text}</div>;
};

export default Hint;
