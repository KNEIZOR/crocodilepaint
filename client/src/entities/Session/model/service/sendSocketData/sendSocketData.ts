interface IFigure {
    type: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    radius?: number;
    currentX?: number;
    currentY?: number;
    color?: string | CanvasGradient | CanvasPattern | undefined;
    stroke?: string | CanvasGradient | CanvasPattern | undefined;
    lineWidth?: number;
    canvas?: string | undefined;
}

export function sendSocketData(
    socket: WebSocket,
    id: string,
    method: string,
    figure: IFigure,
) {
    socket.send(
        JSON.stringify({
            method,
            id,
            figure,
        }),
    );
}
