import Tool from '../tool/Tool';
import { resetCanvas } from 'features/clearCanvas/resetCanvas';

export default class Cirlce extends Tool {
    mouseDown = false;
    startX = 0;
    startY = 0;
    saved = '';
    radius = 0;

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
        if (this.canvas && this.socket) {
            this.socket.send(
                JSON.stringify({
                    method: 'draw',
                    id: this.id,
                    figure: {
                        type: 'circle',
                        x: this.startX,
                        y: this.startY,
                        radius: this.radius,
                        color: this.ctx?.fillStyle,
                        stroke: this.ctx?.strokeStyle,
                        lineWidth: this.ctx?.lineWidth,
                    },
                }),
            );
        }
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
            this.radius = Math.sqrt(width ** 2 + height ** 2);

            this.draw(this.startX, this.startY, this.radius);
        }
    }

    draw(x: number, y: number, r: number) {
        if (!this.ctx || !this.canvas) return;
        resetCanvas(this.saved, this.ctx, this.canvas, (ctx) => {
            ctx?.arc(x, y, r, 0, 2 * Math.PI);
            ctx?.fill();
        });
    }

    static staticDraw(
        ctx: CanvasRenderingContext2D | null | undefined,
        x: number,
        y: number,
        r: number,
        color: string,
        stroke: string,
        lineWidth: number,
    ) {
        if (!ctx) return;

        ctx.save()

        ctx.fillStyle = color;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth
        ctx.beginPath();
        ctx?.arc(x, y, r, 0, 2 * Math.PI);
        ctx?.fill();
        ctx?.stroke();

        ctx.restore()
    }
}
