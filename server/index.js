const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const fs = require('fs');
const path = require('path');

// AI
const { loadModel, predict } = require("./predict");

app.use(cors());
app.use(express.json({ limit: "10mb" })); // важно для base64

// Загружаем модель при старте
loadModel().catch(err => console.log("Ошибка загрузки модели:", err));

// ---------------------- WEBSOCKET ----------------------
app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        try {
            msg = JSON.parse(msg);
        } catch (e) {
            console.log("Ошибка JSON:", e);
            return;
        }

        switch (msg.method) {
            case 'connection':
                connectionHandler(ws, msg);
                break;
            case 'draw':
                broadcastConnection(ws, msg);
                break;
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
app.post("/predict", async (req, res) => {
    try {
        const base64 = req.body.img.replace("data:image/png;base64,", "");
        const result = await predict(base64);

        return res.json({ result });
    } catch (e) {
        console.log("Ошибка предсказания:", e);
        return res.status(500).json({ error: "prediction failed" });
    }
});

// ---------------------- START SERVER ----------------------
app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));

const connectionHandler = (ws, msg) => {
    ws.id = msg.id;
    broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach((client) => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg));
        }
    });
};
