import { useRef } from 'react';
import cls from './canvas.module.scss';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useStore } from 'app/providers/storeProvider';
import { ConnectModal } from 'features/auth/connect';
import { postCanvas, useGetCanvas } from 'entities/Canvas';
import { useCanvasSession } from 'entities/Session';

export const Canvas = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { id } = useParams();
    const { historyStore } = useStore();

    useGetCanvas(canvasRef, id);
    useCanvasSession(canvasRef, id);

    const mouseUpHandler = () => {
        if (!canvasRef.current) return;

        historyStore.pushToUndo(canvasRef.current?.toDataURL());
        postCanvas(canvasRef.current, id);
    };

    return (
        <div className={cls.canvas}>
            <ConnectModal />
            <canvas
                onMouseUp={() => mouseUpHandler()}
                ref={canvasRef}
                width={600}
                height={400}
            />
        </div>
    );
});
