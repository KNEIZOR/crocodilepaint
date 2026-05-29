import { canvasHistory, canvasState } from 'entities/Canvas';
import { sendSocketData } from 'entities/Session';

export class CanvasUndo {
    constructor(
        private canvas = canvasState,
        private history = canvasHistory,
    ) {}

    undo(socket: WebSocket | null, id: string | null) {
        const canvas = this.canvas.canvas;

        if (!canvas || !socket || !id) return;

        const ctx = canvas.getContext('2d');
        const dataUrl = this.history.popToUndo();

        if (!dataUrl) return;

        this.history.pushToRedo(canvas.toDataURL());

        const img = new Image();

        img.src = dataUrl;

        img.onload = () => {
            ctx?.clearRect(0, 0, canvas.width, canvas.height);

            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

            sendSocketData(socket, id, 'undo', {
                type: 'undo',
                canvas: dataUrl,
            });
        };
    }
}

export const undoService = new CanvasUndo();
