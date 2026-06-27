const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    app.post('/image', (req, res) => {
        try {
            const data = req.body.img.replace('data:image/png;base64,', '');
            fs.writeFileSync(
                path.resolve(__dirname, '../files', `${req.query.id}.jpg`),
                data,
                'base64'
            );
            res.json({ message: 'Загружено' });
        } catch {
            res.status(500).json('error');
        }
    });

    app.get('/image', (req, res) => {
        try {
            let file;
            try {
                file = fs.readFileSync(
                    path.resolve(__dirname, '../files', `${req.query.id}.jpg`)
                );
            } catch {
                file = fs.readFileSync(
                    path.resolve(__dirname, '../files', 'base.jpg')
                );
            }

            res.json(`data:image/png;base64,${file.toString('base64')}`);
        } catch {
            res.status(500).json('error');
        }
    });
};
