import { canvasHistory, canvasState } from 'entities/Canvas';

class CanvasRedo {
    constructor(
        private canvas = canvasState,
        private history = canvasHistory,
    ) {}

    redo() {
        const canvas = this.canvas.canvas;

        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const dataUrl = this.history.popToRedo();

        if (!dataUrl) return;

        this.history.pushToUndo(canvas.toDataURL());

        const img = new Image();

        img.src = dataUrl;

        img.onload = () => {
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    }
}



export const redoService = new CanvasRedo()