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
            this.canvas.onmouseup = this.mouseUpHandler.bind(this);
            this.canvas.onmousedown = this.mouseDownHandler.bind(this);
            this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        }
    }

    private mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false;
        if (!this.socket || !this.id) return;
        
        sendSocketData(this.socket, this.id, 'draw', { type: 'finish' });
    }

    private mouseDownHandler(e: MouseEvent) {
        if (!this.canvas) return;
        
        this.mouseDown = true;
        this.ctx?.beginPath();
        this.ctx?.moveTo(
            e.pageX - this.canvas.offsetLeft,
            e.pageY - this.canvas.offsetTop,
        );
    }

    private mouseMoveHandler(e: MouseEvent) {
        if (!this.mouseDown || !this.canvas || !this.socket || !this.id) return;
            
        const coords = getCoords(e, this.canvas);
        sendSocketData(this.socket, this.id, 'draw', {
            type: 'brush',
            x: coords.x,
            y: coords.y,
        });
    }

    static draw(
        ctx: CanvasRenderingContext2D | null | undefined,
        x: number,
        y: number,
    ) {
        ctx?.lineTo(x, y);
        ctx?.stroke();
    }
}
