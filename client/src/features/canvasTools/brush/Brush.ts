import Tool from '../tool/Tool';
import { sendSocketData } from 'entities/Session';
import { getCoords } from 'shared/lib/getCoords/getCoords';

export default class Brush extends Tool {
    mouseDown = false;

    constructor(
        canvas: HTMLCanvasElement | null,
        socket: WebSocket | null,
        id: string | null,
    ) {
        super(canvas, socket, id);
        this.listen();
    }

    listen() {
        if (this.canvas) {
            this.canvas.style.touchAction = 'none';
            this.canvas.onpointerup = this.mouseUpHandler.bind(this);
            this.canvas.onpointerdown = this.mouseDownHandler.bind(this);
            this.canvas.onpointermove = this.mouseMoveHandler.bind(this);
            this.canvas.onpointercancel = this.mouseUpHandler.bind(this);
        }
    }

    private mouseUpHandler(e: PointerEvent) {
        this.mouseDown = false;
        if (!this.socket || !this.id) return;

        sendSocketData(this.socket, this.id, 'draw', { type: 'finish' });
    }

    private mouseDownHandler(e: PointerEvent) {
        if (!this.canvas) return;
        const coords = getCoords(e, this.canvas);
        this.canvas.setPointerCapture(e.pointerId);
        this.mouseDown = true;
        this.ctx?.beginPath();
        this.ctx?.moveTo(coords.x, coords.y);
    }

    private mouseMoveHandler(e: PointerEvent) {
        if (!this.mouseDown || !this.canvas || !this.socket || !this.id) return;

        const coords = getCoords(e, this.canvas);

        sendSocketData(this.socket, this.id, 'draw', {
            type: 'brush',
            x: coords.x,
            y: coords.y,
            lineWidth: this.ctx?.lineWidth,
            stroke: this.ctx?.strokeStyle,
            color: this.ctx?.fillStyle,
        });
    }

    static draw(
        ctx: CanvasRenderingContext2D | null | undefined,
        x: number,
        y: number,
        lineWidth: number,
        stroke: string | CanvasGradient | CanvasPattern,
        color: string | CanvasGradient | CanvasPattern,
    ) {
        if (!ctx) return;

        ctx.save();

        ctx.fillStyle = color;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx?.lineTo(x, y);
        ctx?.stroke();

        ctx.restore();
    }
}
