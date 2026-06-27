import React from 'react';
import { useWordChoice } from '../model/useWordChoice';
import cls from './wordChoice.module.scss';

export const WordChoice = ({
    onSelect,
}: {
    onSelect: (word: string) => void;
}) => {
    const { options, select, selected } = useWordChoice(5);

    return (
        <div className={cls.wrapper}>
            <h2>Выберите слово</h2>
            <div className={cls.cards}>

            {options.map((word) => (
                <button
                    key={word}
                    className={`${cls.card} ${selected === word ? cls.active : ''}`}
                    onClick={() => {
                        select(word);
                        onSelect(word);
                    }}
                >
                    {word}
                </button>
            ))}
            </div>
        </div>
    );
};
