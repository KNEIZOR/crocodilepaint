import { WsData } from 'entities/Session/model/types/session';
import Brush from 'features/canvasTools/brush/Brush';
import Cirlce from 'features/canvasTools/circle/Circle';
import Line from 'features/canvasTools/line/Line';
import Rect from 'features/canvasTools/rect/Rect';

export function drawHandler(msg: WsData, canvas: HTMLCanvasElement | null) {
    const figure = msg.figure;
    const ctx = canvas?.getContext('2d');

    switch (figure.type) {
        case 'brush':
            if (figure.x && figure.y) {
                Brush.draw(
                    ctx,
                    figure.x,
                    figure.y,
                );
            }
            break;
        case 'rect':
            if (
                figure.x &&
                figure.y &&
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
                figure.x &&
                figure.y &&
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
                figure.x &&
                figure.y &&
                figure.currentX &&
                figure.currentY &&
                figure.color
            ) {
                Line.staticDraw(
                    ctx,
                    figure.x,
                    figure.y,
                    figure.currentX,
                    figure.currentY,
                    figure.color,
                );
            }
            break;
        case 'finish':
            ctx?.beginPath();
            break;
    }
}
