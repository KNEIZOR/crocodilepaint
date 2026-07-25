import { useStore } from 'app/providers/storeProvider';
import { userState } from 'entities/User';
import CopyShareLink from 'features/copyShareLink/ui/CopyShareLink';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';

const ConfirmReady = observer(() => {
    const [textShow, setTextShow] = useState(false);
    const { sessionStore } = useStore();

    const timeoutRef = useRef<number | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [timerTime, setTimerTime] = useState(5);

    const handleSubmit = () => {
        setTextShow(true);
        sessionStore.socket?.send(
            JSON.stringify({
                method: 'ready',
                ready: true,
            }),
        );
    };

    useEffect(() => {
        if (!userState.startTimer) return;

        setTimerTime(5);

        intervalRef.current = setInterval(() => {
            setTimerTime((prev) => {
                if (prev <= 1) {
                    if (intervalRef.current !== null) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [userState.startTimer]);

    useEffect(() => {
        if (timerTime <= 0) {
            userState.setIsReady(false);

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
    }, [timerTime]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <Modal
            isOpen={userState.isReady}
            title="Подтвердите что готовы"
            submitText="Готов"
            onSubmit={handleSubmit}
        >
            <>
                <h2>игра начнется через: {timerTime}</h2>

                {textShow && <p>Подождите пока ваш друг нажмет кнопку готов</p>}
                <input type="text" defaultValue={window.location.href} />
                <CopyShareLink />
            </>
        </Modal>
    );
});

export default ConfirmReady;
