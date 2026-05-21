
export default class Tool {
    public canvas;
    public ctx;
    public socket;
    public id;

    constructor(
        canvas: HTMLCanvasElement | null,
        socket: WebSocket | null,
        id: string | null,
    ) {
        this.canvas = canvas;
        this.socket = socket;
        this.id = id;
        this.ctx = canvas?.getContext('2d');
        this.destroyEvents();
    }

    set fillColor(color: string) {
        if (!this.ctx) return;
        this.ctx.fillStyle = color;
    }
    set strokeColor(color: string) {
        if (!this.ctx) return;
        this.ctx.strokeStyle = color;
    }

    set lineWidth(width: number) {
        if (!this.ctx) return;
        this.ctx.lineWidth = width;
    }

    private destroyEvents() {
        if (!this.canvas) return;
        
        this.canvas.onmouseup = null;
        this.canvas.onmousedown = null;
        this.canvas.onmousemove = null;
    }
}
