const { predict } = require('../ai/predict');
const { getRoom } = require('../ws/rooms');
const { sendWin } = require('../ws/events');

module.exports = (app) => {
    app.post('/predict', async (req, res) => {
        try {
            const base64 = req.body.img.replace('data:image/png;base64,', '');
            const result = await predict(base64);

            const room = getRoom(req.body.roomId);
            if (!room) return res.json({ result });

            if (!room.winner) {
                sendWin(room, req.body.username, result);
            }

            res.json({ result });
        } catch {
            res.status(500).json({ error: 'prediction failed' });
        }
    });
};
