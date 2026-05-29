import Tool from '../tool/Tool';

export default class Line extends Tool {
    mouseDown = false;
    startX = 0;
    startY = 0;
    saved = '';
    currentX = 0;
    currentY = 0;

    constructor(
        canvas: HTMLCanvasElement | null,
        websocket: WebSocket | null,
        id: string | null,
    ) {
        super(canvas, websocket, id);
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
                        type: 'line',
                        x: this.startX,
                        y: this.startY,
                        currentX: this.currentX,
                        currentY: this.currentY,
                        color: this.ctx?.fillStyle,
                        stroke: this.ctx?.strokeStyle,
                        lineWidth: this.ctx?.lineWidth
                    },
                }),
            );
        }
    }
    mouseDownHandler(e: MouseEvent) {
        if (this.canvas) {
            this.mouseDown = true;
            this.currentX = e.pageX - this.canvas.offsetLeft;
            this.currentY = e.pageY - this.canvas.offsetTop;
            this.ctx?.beginPath();
            this.ctx?.moveTo(this.currentX, this.currentY);
            this.saved = this.canvas.toDataURL();
        }
    }
    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown && this.canvas) {
            this.startX = e.pageX - this.canvas?.offsetLeft;
            this.startY = e.pageY - this.canvas?.offsetTop;
            this.draw(
                e.pageX - this.canvas?.offsetLeft,
                e.pageY - this.canvas?.offsetTop,
            );
        }
    }

    draw(x: number, y: number) {
        const img = new Image();
        img.src = this.saved;

        img.onload = () => {
            if (this.ctx && this.canvas) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(
                    img,
                    0,
                    0,
                    this.canvas.width,
                    this.canvas.height,
                );
                this.ctx.beginPath();
                this.ctx?.moveTo(this.currentX, this.currentY);
                this.ctx?.lineTo(x, y);
                this.ctx?.stroke();
            }
        };
    }

    static staticDraw(
        ctx: CanvasRenderingContext2D | null | undefined,
        x: number,
        y: number,
        currentX: number,
        currentY: number,
        color: string,
        stroke: string,
        lineWidth: number,
    ) {
        if (!ctx) return;

        ctx.save();

        ctx.fillStyle = color;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx?.moveTo(currentX, currentY);
        ctx?.lineTo(x, y);
        ctx?.stroke();

        ctx.restore();
    }
}
