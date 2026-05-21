import { api } from 'shared/api/api';

export function getCanvas(
    canvas: HTMLCanvasElement | null,
    id: string | undefined,
    ctx: CanvasRenderingContext2D | null | undefined,
) {
    api.get(`/image?id=${id}`).then((res) => {
        const img = new Image();
        img.src = res.data;

        img.onload = () => {
            if (ctx && canvas) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                ctx.stroke();
            }
        };
    });
}
