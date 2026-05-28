interface IFigure {
    type: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    radius?: number;
    currentX?: number;
    currentY?: number;
    color?: string;
    stroke?: string;
    lineWidth?: number;
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
