import { drawHandler } from 'shared/lib/drawHandler/drawHandler';
import { WsData } from '../../types/session';
import { mods } from 'widgets/CanvasBoard/ui/Canvas';
import { useStore } from 'app/providers/storeProvider';
import { userState } from 'entities/User';

export function connectSocketData(
    id: string | undefined,
    username: string,
    canvas: HTMLCanvasElement | null,
    mode: mods,
) {
    const socket = new WebSocket('ws://localhost:5000/');

    socket.onopen = () => {
        socket.send(
            JSON.stringify({
                id,
                username,
                method: 'connection',
                mode,
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
            case 'start':
                userState.setStartTimer(true)
                break;
        }
    };

    return socket;
}
