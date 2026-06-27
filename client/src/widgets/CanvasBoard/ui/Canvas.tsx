import { useRef, useState } from 'react';
import cls from './canvas.module.scss';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useStore } from 'app/providers/storeProvider';
import { ConnectModal } from 'features/auth/connect';
import { postCanvas, useGetCanvas } from 'entities/Canvas';
import { useCanvasSession } from 'entities/Session';
import BackButton from 'shared/ui/BackButton/BackButton';

export type mods = 'paint' | 'crocodile1' | 'crocodile2';

interface CanvasProps {
    mode: mods;
    word?: string | null
}

export const Canvas = observer((props: CanvasProps) => {
    const { mode, word } = props;
    const [aiWord, setAiWord] = useState('');
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { id } = useParams();
    const { historyStore } = useStore();
    const [win, setWin] = useState(false)


    useGetCanvas(canvasRef, id);
    useCanvasSession(canvasRef, id, mode);

    const sendToAI = async (base64: string) => {
        try {
            const res = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ img: base64 }),
            });

            const data = await res.json();
            setAiWord(data.result);

            if(data.result === word) {
                setWin(true)
            }
            console.log('AI result:', data.result);
        } catch (e) {
            console.log('AI error:', e);
        }
    };

    const mouseUpHandler = () => {
        if (!canvasRef.current) return;

        const base64 = canvasRef.current.toDataURL('image/png');

        historyStore.pushToUndo(base64);
        postCanvas(canvasRef.current, id);

        if (mode === 'crocodile1' || mode === 'crocodile2') {
            sendToAI(base64);
        }
    };

    return (
        <div className={cls.canvas}>
            <div className={cls.aiAnswer}>
                {win && <h1>Вы победили</h1>}
                {word && <h2>Ваше слово: {word}</h2>}
                {(mode === 'crocodile1' || mode === 'crocodile2') && (
                    <h2>Я думаю это: {aiWord}</h2>
                )}
            </div>
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
