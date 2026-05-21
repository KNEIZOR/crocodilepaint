type DrawOverlay = (ctx: CanvasRenderingContext2D) => void;

export function resetCanvas(
    saved: string,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    drawOverlay?: DrawOverlay,
) {
    const img = new Image();
    img.src = saved;

    img.onload = () => {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        drawOverlay?.(ctx);
        ctx?.stroke();
    };
}
