const { getRoom, createRoom, deleteRoom } = require('./rooms');

const joinRoom = (ws, msg) => {
    const { id, mode } = msg;

    const maxPlayers =
        mode === 'paint'
            ? Infinity
            : mode === 'crocodile1'
              ? 1
              : mode === 'crocodile2'
                ? 2
                : 2;

    let room = getRoom(id);
    if (!room) room = createRoom(id, maxPlayers);

    if (room.clients.length >= room.maxPlayers) {
        ws.send(JSON.stringify('комната переполнена'));
        ws.close();
        return;
    }

    ws.roomId = id;
    ws.ready = false;

    room.clients.push(ws);

    ws.on('close', () => {
        room.clients = room.clients.filter((c) => c !== ws);
        if (room.clients.length === 0) deleteRoom(id);
    });
};

const broadcastConnection = (ws, msg) => {
    const room = getRoom(ws.roomId);
    if (!room) return;

    room.clients.forEach((c) => c.send(JSON.stringify(msg)));
};

const isReady = (ws, msg) => {
    const room = getRoom(ws.roomId);
    if (!room) return;

    ws.ready = msg.ready;

    if (room.clients.length === 2) {
        const allReady = room.clients.every((c) => c.ready);
        if (allReady) {
            room.clients.forEach((c) =>
                c.send(JSON.stringify({ method: 'start' })),
            );
        }
    }
};

const newRound = (ws) => {
    const room = getRoom(ws.roomId);
    if (!room) return;

    room.winner = null;
    room.clients.forEach((c) => (c.ready = false));

    room.clients.forEach((c) =>
        c.send(JSON.stringify({ method: 'clearCanvas' })),
    );
    room.clients.forEach((c) => c.send(JSON.stringify({ method: 'newRound' })));
};

const sendWin = (room, username, word) => {
    room.winner = { username, word };

    room.clients.forEach((c) => {
        c.send(
            JSON.stringify({
                method: 'win',
                username,
                word,
            }),
        );
    });
};

module.exports = {
    joinRoom,
    broadcastConnection,
    isReady,
    newRound,
    sendWin,
};
