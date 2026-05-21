export function getCoords(e: MouseEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();

    return {
        x: e.pageX - rect.left,
        y: e.pageY - rect.top,
    };
}
