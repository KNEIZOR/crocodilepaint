import { makeAutoObservable } from 'mobx';

export class CanvasState {
    canvas: HTMLCanvasElement | null = null;
    ctx: CanvasRenderingContext2D | null | undefined = null;

    constructor() {
        makeAutoObservable(this);
    }

    setCanvas(canvas: HTMLCanvasElement | null) {
        this.canvas = canvas;
        this.ctx = canvas?.getContext('2d');
    }
}
