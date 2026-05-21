import Brush from '../brush/Brush';

export default class Eraser extends Brush {
    constructor(
        canvas: HTMLCanvasElement | null,
        websoket: WebSocket | null,
        id: string | null,
    ) {
        super(canvas, websoket, id);
    }

    draw(x: number, y: number) {
        if (this.ctx) {
            this.ctx.strokeStyle = 'white';
            this.ctx?.lineTo(x, y);
            this.ctx?.stroke();
            this.ctx.strokeStyle = 'red';
        }
    }
}
