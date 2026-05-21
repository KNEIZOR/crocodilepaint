import { useStore } from 'app/providers/storeProvider';
import { connectSocketData } from 'entities/Session/model/service/connectSocketData/connectSocketData';
import Brush from 'features/canvasTools/brush/Brush';
import { RefObject, useEffect } from 'react';

export const useCanvasSession = (
    canvasRef: RefObject<HTMLCanvasElement | null>,
    id: string | undefined,
) => {
    const { toolStore, sessionStore, userStore } = useStore();
    const canvas = canvasRef.current;

    useEffect(() => {
        if (!userStore.username || !id || !canvas) return;

        const socket = connectSocketData(id, userStore.username, canvas);

        sessionStore.setSoket(socket);
        sessionStore.setSessionId(id);
        toolStore.setTool(new Brush(canvas, socket, id));
        
        return () => socket.close();
    }, [userStore.username, canvas, id]);
};
