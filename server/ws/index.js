const {
    joinRoom,
    broadcastConnection,
    isReady,
    newRound,
} = require('./events');

module.exports = (app) => {
    app.ws('/', (ws) => {
        ws.on('message', (raw) => {
            let msg;
            try {
                msg = JSON.parse(raw);
            } catch {
                return;
            }

            switch (msg.method) {
                case 'connection':
                    joinRoom(ws, msg);
                    break;

                case 'draw':
                    broadcastConnection(ws, msg);
                    break;

                case 'ready':
                    isReady(ws, msg);
                    break;

                case 'newRound':
                    newRound(ws);
                    break;
            }
        });
    });
};
