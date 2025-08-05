import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { decide, setMaze, manualMove } from './bot.js';



// 🔧 Obtenir __dirname en ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 🔽 Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Servir les fichiers statiques HTML (doit venir après app est initialisé)
app.use(express.static(path.join(__dirname, '../public')));


// 🔧 Route pour init le labyrinthe
app.post('/init', (req, res) => {
  const { maze } = req.body;
  if (!Array.isArray(maze)) {
    return res.status(400).json({ error: 'maze doit être un tableau 2D' });
  }

  setMaze(maze);
  console.log('Maze initialisé :\n' + maze.map(row => row.join(' ')).join('\n'));
  res.json({ status: 'Maze initialisé avec succès' });
});

// 🔧 Route automatique (bot)
app.get('/action', (req, res) => {
  const result = decide();
  console.log('Réponse auto :', result);
  res.json(result);
});

// 🔧 Route manuelle depuis l’interface
app.post('/manual-action', (req, res) => {
  const { move, action } = req.body;

  const result = manualMove(move, action);

  console.log(`🎮 Action manuelle appliquée :`, result);
  res.json(result);
});


// ✅ Lancement du serveur
app.listen(PORT, () => console.log(`🤖 Bot running on http://localhost:${PORT}`));
