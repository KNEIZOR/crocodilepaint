import { ReactNode } from 'react';
import cls from './modal.module.scss';
import { Portal } from '../Portal/Portal';

interface IModalProps {
    isOpen: boolean;
    title: string;
    submitText: string;
    children: ReactNode;
    onSubmit: () => void;
}

export const Modal = (props: IModalProps) => {
    const { isOpen, title, children, submitText, onSubmit } = props;

    return (
        <Portal>
            {isOpen && <div className={`${cls.modal}`}>
                <div className={cls.overlay}>
                    <div className={cls.content}>
                        <h1>{title}</h1>

                        <div>{children}</div>

                        <button className={cls.button} onClick={() => onSubmit()}>{submitText}</button>
                    </div>
                </div>
            </div>}
        </Portal>
    );
};
