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
                // 🔥 Вместо clearRect — белый фон
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Рисуем изображение поверх белого
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
        };
    });
}

