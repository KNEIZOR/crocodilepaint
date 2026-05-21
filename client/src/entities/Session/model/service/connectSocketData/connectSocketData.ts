import { drawHandler } from 'shared/lib/drawHandler/drawHandler';
import { WsData } from '../../types/session';

export function connectSocketData(
    id: string | undefined,
    username: string,
    canvas: HTMLCanvasElement | null,
) {
    const socket = new WebSocket('ws://localhost:5000/');

    socket.onopen = () => {
        socket.send(
            JSON.stringify({
                id,
                username,
                method: 'connection',
            }),
        );
    };
    socket.onmessage = (e) => {
        const msg: WsData = JSON.parse(e.data);
        switch (msg.method) {
            case 'connection':
                console.log(`Пользователь ${msg.username} подключился`);
                break;
            case 'draw':
                drawHandler(msg, canvas);
                break;
        }
    };

    return socket;
}
