const express = require('express');
const cors = require('cors');
const { decide } = require('./bot');

const app = express();
const PORT = process.env.PORT || 3000;

// Autoriser toutes les origines (ou remplace * par un domaine spécifique)
app.use(cors());

app.use(express.json());

app.get('/action', (req, res) => {
    const gameState = req.body;
    const result = decide(gameState);
    res.json(result);
});

app.listen(PORT, () => console.log(`Bot running on port ${PORT}`));
