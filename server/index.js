const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const fs = require('fs');
const path = require('path');

const rooms = {};

// AI
const { loadModel, predict } = require('./predict');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Загружаем модель при старте
loadModel().catch((err) => console.log('Ошибка загрузки модели:', err));

// ---------------------- WEBSOCKET ----------------------
app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        try {
            msg = JSON.parse(msg);

        } catch (e) {
            console.log('Ошибка JSON:', e);
            return;
        }

        if (msg.method === 'connection') {
            const roomId = msg.id
            const mode = msg.mode

            switch (mode) {
                case 'paint':
                    joinRoom(ws, roomId, Infinity)
                    break;

                case 'crocodile1':
                    joinRoom(ws, roomId, 1)
                    break;

                case 'crocodile2':
                    joinRoom(ws, roomId, 2)
                    break;
            
                default:
                    break;
            }
        }

        if(msg.method === 'draw') {
            broadcastConnection(ws, msg)
        }
    });
});

// ---------------------- IMAGE SAVE ----------------------
app.post('/image', (req, res) => {
    try {
        const data = req.body.img.replace(`data:image/png;base64,`, '');
        fs.writeFileSync(
            path.resolve(__dirname, 'files', `${req.query.id}.jpg`),
            data,
            'base64',
        );

        return res.status(200).json({ message: 'Загружено' });
    } catch (e) {
        console.log(e);
        return res.status(500).json('error');
    }
});

// ---------------------- IMAGE GET ----------------------
app.get('/image', (req, res) => {
    try {
        let file;

        try {
            file = fs.readFileSync(
                path.resolve(__dirname, 'files', `${req.query.id}.jpg`),
            );
        } catch {
            file = fs.readFileSync(
                path.resolve(__dirname, 'files', 'base.jpg'),
            );
        }

        const data = `data:image/png;base64,${file.toString('base64')}`;

        return res.json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json('error');
    }
});

// ---------------------- AI PREDICT ----------------------
app.post('/predict', async (req, res) => {
    try {
        const base64 = req.body.img.replace('data:image/png;base64,', '');
        const result = await predict(base64);

        return res.json({ result });
    } catch (e) {
        console.log('Ошибка предсказания:', e);
        return res.status(500).json({ error: 'prediction failed' });
    }
});

// ---------------------- START SERVER ----------------------
app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));

const broadcastConnection = (ws, msg) => {
    const room = rooms[ws.roomId]
    if(!room) return

    room.clients.forEach(client => {
        client.send(JSON.stringify(msg))
    })
};

const joinRoom = (ws, roomId, maxPlayers) => {
    if (!rooms[roomId]) {
        rooms[roomId] = {
            clients: [],
            maxPlayers,
        };
    }

    const room = rooms[roomId];

    if (room.clients.length >= room.maxPlayers) {
        ws.send(JSON.stringify('комната переполнена'));
        ws.close();
        return;
    }

    room.clients.push(ws);
    ws.roomId = roomId;

    ws.on('close', () => {
        room.clients = room.clients.filter((c) => c !== ws);

        if (room.clients.length === 0) {
            delete room[roomId];
        }
    });
};
