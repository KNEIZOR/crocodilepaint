import { ToolState } from "entities/Tool/model/state/ToolState";
import { InputHTMLAttributes, LabelHTMLAttributes } from "react"

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    id: string;
    text: string;
}

interface InputProps extends HTMLInputProps {
    type: string;
    onChange: (value: string) => void;
}

interface ISettingBar {
    id: number,
    label: LabelProps,
    input: InputProps
}


export const createSettinbgBarConfig = (toolStore: ToolState): ISettingBar[] => [
    {
        id: 1,
        label: {
            id: 'line-width',
            text: 'Толщина линии',
        },
        input: {
            type: 'number',
            id: 'line-width',
            min: 1,
            max: 50,
            defaultValue: 1,
            onChange(value: string) {
                toolStore.setLineWidth(+value);
            },
        },
    },
    {
        id: 2,
        label: {
            id: 'stroke-color',
            text: 'Цвет контура',
        },
        input: {
            type: 'color',
            id: 'stroke-color',
            onChange(value: string) {
                toolStore.setStrokelColor(value);
            },
        },
    },
];
