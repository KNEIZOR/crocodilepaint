import Tool from '../tool/Tool';
import { resetCanvas } from 'features/clearCanvas/resetCanvas';

export default class Cirlce extends Tool {
    mouseDown = false;
    startX: number = 0;
    startY: number = 0;
    saved: string = '';

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
            this.canvas.onmouseup = this.mouseUpHandler.bind(this);
            this.canvas.onmousedown = this.mouseDownHandler.bind(this);
            this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        }
    }

    mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false;
    }
    mouseDownHandler(e: MouseEvent) {
        if (this.canvas) {
            this.mouseDown = true;
            this.ctx?.beginPath();
            this.startX = e.pageX - this.canvas.offsetLeft;
            this.startY = e.pageY - this.canvas.offsetTop;
            this.saved = this.canvas.toDataURL();
        }
    }
    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown && this.canvas) {
            const currentX = e.pageX - this.canvas.offsetLeft;
            const currentY = e.pageY - this.canvas.offsetTop;
            const width = currentX - this.startX;
            const height = currentY - this.startY;
            const radius = Math.sqrt(width ** 2 + height ** 2);

            this.draw(this.startX, this.startY, radius);
        }
    }

    draw(x: number, y: number, r: number) {
        if (!this.ctx || !this.canvas) return;
        resetCanvas(this.saved, this.ctx, this.canvas, (ctx) => {
            this.ctx?.arc(x, y, r, 0, 2 * Math.PI);
            this.ctx?.fill();
        });
    }
}
