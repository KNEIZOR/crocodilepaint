import Brush from '../brush/Brush';

export default class Eraser extends Brush {
    constructor(
        canvas: HTMLCanvasElement | null,
        websoket: WebSocket | null,
        id: string | null,
    ) {
        super(canvas, websoket, id);
    }

    static draw(
        ctx: CanvasRenderingContext2D | null | undefined,
        x: number,
        y: number,
    ) {
        if(!ctx) return

        ctx.save()

        ctx.strokeStyle = 'white';
        ctx?.lineTo(x, y);
        ctx?.stroke();

        ctx.restore()
    }
}
