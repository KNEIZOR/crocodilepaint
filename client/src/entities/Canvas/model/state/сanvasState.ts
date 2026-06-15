import { makeAutoObservable } from 'mobx';

export class CanvasState {
    canvas: HTMLCanvasElement | null = null;
    ctx: CanvasRenderingContext2D | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setCanvas(canvas: HTMLCanvasElement | null) {
        this.canvas = canvas;
        if (!canvas) return;

        this.ctx = canvas.getContext('2d');
        if (!this.ctx) return;

        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.ctx.lineWidth = 22;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.strokeStyle = 'black';
    }
}
