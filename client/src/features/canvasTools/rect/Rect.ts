import Tool from '../tool/Tool';
import { resetCanvas } from 'features/clearCanvas/resetCanvas';

export default class Rect extends Tool {
    mouseDown = false;
    startX = 0;
    startY = 0;
    saved = '';
    width = 0;
    height = 0;

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
                        type: 'rect',
                        x: this.startX,
                        y: this.startY,
                        width: this.width,
                        height: this.height,
                        color: this.ctx?.fillStyle,
                        stroke: this.ctx?.strokeStyle,
                        lineWidth: this.ctx?.lineWidth
                    },
                }),
            );
        }
    }

    mouseDownHandler(e: MouseEvent) {
        if (!this.canvas) return;

        this.mouseDown = true;
        this.ctx?.beginPath();
        this.startX = e.pageX - this.canvas.offsetLeft;
        this.startY = e.pageY - this.canvas.offsetTop;
        this.saved = this.canvas.toDataURL();
    }

    mouseMoveHandler(e: MouseEvent) {
        if (!this.mouseDown || !this.canvas) return;

        const currentX = e.pageX - this.canvas.offsetLeft;
        const currentY = e.pageY - this.canvas.offsetTop;
        this.width = currentX - this.startX;
        this.height = currentY - this.startY;

        this.draw(this.startX, this.startY, this.width, this.height);
    }

    draw(x: number, y: number, w: number, h: number) {
        if (!this.ctx || !this.canvas) return;
        resetCanvas(this.saved, this.ctx, this.canvas, (ctx) => {
            ctx.rect(x, y, w, h);
            ctx.fill();
        });
    }

    static staticDraw(
        ctx: CanvasRenderingContext2D | null | undefined,
        x: number,
        y: number,
        w: number,
        h: number,
        color: string,
        stroke: string,
        lineWidth: number,
    ) {
        if (!ctx) return;

        ctx.save()

        ctx.fillStyle = color;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx?.rect(x, y, w, h);
        ctx?.fill();
        ctx?.stroke();

        ctx.restore()
    }
}
