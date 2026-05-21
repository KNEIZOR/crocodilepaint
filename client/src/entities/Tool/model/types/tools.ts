
export interface ITool {
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null | undefined;
    mouseDown: boolean;
    startX?: number;
    startY?: number;
    saved?: string;
    fillColor?: string;
    strokeColor?: string;
    lineWidth?: number;
}
