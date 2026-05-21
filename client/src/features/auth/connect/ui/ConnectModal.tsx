import { useStore } from 'app/providers/storeProvider';
import React, { useRef } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';

export const ConnectModal = () => {
    const { userStore } = useStore();

    const usernameRef = useRef<HTMLInputElement | null>(null);

    const connectHandler = () => {
        const username = usernameRef.current?.value;

        if (!username) return;

        userStore.setUsername(username);

        userStore.closeModal();
    };

    return (
        <Modal
            isOpen={userStore.isModalOpen}
            title="Введите ваше имя"
            submitText="Войти"
            onSubmit={connectHandler}
            onClose={() => userStore.closeModal()}
        >
            <input type="text" ref={usernameRef} />
        </Modal>
    );
};
