import { WsData } from 'entities/Session/model/types/session';
import Brush from 'features/canvasTools/brush/Brush';
import Rect from 'features/canvasTools/rect/Rect';

export function drawHandler(msg: WsData, canvas: HTMLCanvasElement | null) {
    const figure = msg.figure;
    const ctx = canvas?.getContext('2d');

    switch (figure.type) {
        case 'brush':
            if (figure.x && figure.y) {
                Brush.draw(ctx, figure.x, figure.y);
            }
            break;
        case 'rect':
            if (
                figure.x &&
                figure.y &&
                figure.width &&
                figure.height &&
                figure.color
            ) {
                Rect.staticDraw(
                    ctx,
                    figure.x,
                    figure.y,
                    figure.width,
                    figure.height,
                    figure.color,
                );
            }
            break;
        case 'finish':
            ctx?.beginPath();
            break;
    }
}
