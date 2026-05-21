import { ReactNode } from 'react';
import cls from './modal.module.scss';
import { Portal } from '../Portal/Portal';

interface IModalProps {
    isOpen: boolean;
    title: string;
    submitText: string;
    children: ReactNode;
    onSubmit: () => void;
    onClose: () => void;
}

export const Modal = (props: IModalProps) => {
    const { isOpen, title, children, submitText, onClose, onSubmit } = props;



    return (
        <Portal>
            {isOpen && <div className={`${cls.modal}`}>
                <div className={cls.overlay}>
                    <div className={cls.content}>
                        <h1>{title}</h1>

                        <p>{children}</p>

                        <button onClick={() => [onSubmit(), onClose()]}>{submitText}</button>
                    </div>
                </div>
            </div>}
        </Portal>
    );
};
