import { decide, setMaze, manualMove } from '../src/bot';

describe('Bot intelligence tests', () => {
  beforeEach(() => {
    // Labyrinthe 5x5 simple avec des murs (0) et chemins (1)
    const maze = [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0],
    ];
    setMaze(maze); // Reset l'état du bot
  });

  test('Le bot retourne un objet avec move et action valides', () => {
    const result = decide();
    expect(result).toHaveProperty('move');
    expect(result).toHaveProperty('action');
    expect(['UP', 'DOWN', 'LEFT', 'RIGHT', 'STAY']).toContain(result.move);
    expect(['COLLECT', 'NONE']).toContain(result.action);
  });

  test('Le bot évite les murs et ne revient pas en arrière', () => {
    const visitedMoves = new Set();
    for (let i = 0; i < 10; i++) {
      const result = decide();
      const key = `${result.move}_${result.action}`;
      expect(visitedMoves.has(key)).toBe(false); // On veut des mouvements variés
      visitedMoves.add(key);
    }
  });

  test('Le bot suit une logique automatique dans un couloir', () => {
    // On force un labyrinthe linéaire pour tester l'enchaînement
    const maze = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];
    setMaze(maze);

    const steps = [];
    for (let i = 0; i < 3; i++) {
      steps.push(decide());
    }

    const directions = steps.map(s => s.move);
    expect(directions).toContain('RIGHT'); // Le bot doit avancer à droite
  });

  test('Le mouvement manuel est appliqué correctement', () => {
    manualMove('UP', 'NONE');
    const result = decide();
    expect(result).toEqual({ move: 'UP', action: 'NONE' });
  });

  test('Le mouvement manuel est consommé une seule fois', () => {
    manualMove('LEFT', 'COLLECT');
    const result1 = decide();
    const result2 = decide();

    expect(result1).toEqual({ move: 'LEFT', action: 'COLLECT' });
    expect(result2).not.toEqual(result1); // Le 2e appel suit la logique automatique
  });
});
