
export function canvasRender(canvas: HTMLCanvasElement | null, dataUrl: string) {
    const ctx = canvas?.getContext('2d');
    const img = new Image();

    img.src = dataUrl;

    img.onload = () => {
        if (canvas) {
            ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
    };
}
