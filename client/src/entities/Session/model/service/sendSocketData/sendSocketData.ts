interface IFigure {
    type: string;
    x?: number;
    y?: number;
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
