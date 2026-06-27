const express = require('express');
const cors = require('cors');
const WSServer = require('express-ws');

const { loadModel } = require('./ai/predict');
const registerWS = require('./ws');
const registerImageAPI = require('./api/image');
const registerPredictAPI = require('./api/predict');

const app = express();
WSServer(app);

app.use(cors());
app.use(express.json({ limit: '10mb' }));

loadModel();

registerWS(app);
registerImageAPI(app);
registerPredictAPI(app);

app.listen(5000, () => console.log('server started'));
