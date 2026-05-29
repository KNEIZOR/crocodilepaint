import { WsData } from 'entities/Session/model/types/session';
import Brush from 'features/canvasTools/brush/Brush';
import Cirlce from 'features/canvasTools/circle/Circle';
import Line from 'features/canvasTools/line/Line';
import Rect from 'features/canvasTools/rect/Rect';

export function drawHandler(msg: WsData, canvas: HTMLCanvasElement | null) {
    const figure = msg.figure;
    const ctx = canvas?.getContext('2d');

    switch (figure.type) {
        case 'brush_start':
            if (
                figure.x === undefined ||
                figure.y === undefined ||
                !figure.stroke ||
                !ctx ||
                !figure.lineWidth
            )
                return;
            ctx?.beginPath();
            ctx?.moveTo(figure.x, figure.y);
            ctx.strokeStyle = figure.stroke;
            ctx.lineWidth = figure.lineWidth;
            break;
        case 'brush':
            if (
                figure.x !== undefined &&
                figure.y !== undefined &&
                figure.lineWidth &&
                figure.stroke &&
                figure.color
            ) {
                Brush.draw(
                    ctx,
                    figure.x,
                    figure.y,
                    figure.lineWidth,
                    figure.stroke,
                    figure.color,
                );
            }
            break;
        case 'rect':
            if (
                figure.x !== undefined &&
                figure.y !== undefined &&
                figure.width &&
                figure.height &&
                figure.color &&
                figure.stroke &&
                figure.lineWidth
            ) {
                Rect.staticDraw(
                    ctx,
                    figure.x,
                    figure.y,
                    figure.width,
                    figure.height,
                    figure.color,
                    figure.stroke,
                    figure.lineWidth,
                );
            }
            break;
        case 'circle':
            if (
                figure.x !== undefined &&
                figure.y !== undefined &&
                figure.radius &&
                figure.color &&
                figure.stroke &&
                figure.lineWidth
            ) {
                Cirlce.staticDraw(
                    ctx,
                    figure.x,
                    figure.y,
                    figure.radius,
                    figure.color,
                    figure.stroke,
                    figure.lineWidth,
                );
            }
            break;
        case 'line':
            if (
                figure.x !== undefined &&
                figure.y !== undefined &&
                figure.currentX &&
                figure.currentY &&
                figure.color &&
                figure.stroke &&
                figure.lineWidth
            ) {
                Line.staticDraw(
                    ctx,
                    figure.x,
                    figure.y,
                    figure.currentX,
                    figure.currentY,
                    figure.color,
                    figure.stroke,
                    figure.lineWidth,
                );
            }
            break;
        case 'undo': {
            if (!ctx || !canvas) return;
            const img = new Image();
            img.src = figure.canvas || '';

            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            break;
        }
        case 'finish':
            ctx?.beginPath();
            break;
    }
}
