const express = require('express');
const { decide } = require('./bot');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/action', (req, res) => {
    const gameState = req.body;
    const result = decide(gameState);
    res.json(result);
});

app.listen(PORT, () => console.log(`Bot running on port ${PORT}`));
