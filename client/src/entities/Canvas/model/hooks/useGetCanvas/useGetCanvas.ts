import { useStore } from 'app/providers/storeProvider';
import { getCanvas } from 'entities/Canvas/model/services/getCanvas/getCanvas';
import { RefObject, useEffect } from 'react';

export const useGetCanvas = (
    canvasRef: RefObject<HTMLCanvasElement | null>,
    id: string | undefined,
) => {
    const { canvasStore } = useStore();
    const canvas = canvasRef.current;

    useEffect(() => {
        if (!canvas || !id) return;
        canvasStore.setCanvas(canvas);
        const ctx = canvas?.getContext('2d');
        getCanvas(canvas, id, ctx);
    }, [canvas, id]);
};
