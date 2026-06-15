import { useRef } from 'react';
import cls from './canvas.module.scss';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useStore } from 'app/providers/storeProvider';
import { ConnectModal } from 'features/auth/connect';
import { postCanvas, useGetCanvas } from 'entities/Canvas';
import { useCanvasSession } from 'entities/Session';
import BackButton from 'shared/ui/BackButton/BackButton';

export const Canvas = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { id } = useParams();
    const { historyStore } = useStore();

    useGetCanvas(canvasRef, id);
    useCanvasSession(canvasRef, id);

    const sendToAI = async (base64: string) => {
        try {
            const res = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ img: base64 }),
            });

            const data = await res.json();
            console.log('AI result:', data.result);
            console.log('BASE64 LENGTH:', base64.length);
        } catch (e) {
            console.log('AI error:', e);
        }
    };

    const mouseUpHandler = () => {
        if (!canvasRef.current) return;

        const base64 = canvasRef.current.toDataURL('image/png');

        historyStore.pushToUndo(base64);
        postCanvas(canvasRef.current, id);

        sendToAI(base64);
    };

    return (
        <div className={cls.canvas}>
            <ConnectModal />
            <BackButton />
            <canvas
                width={600}
                height={400}
                onPointerUp={() => mouseUpHandler()}
                ref={canvasRef}
            />
        </div>
    );
});
