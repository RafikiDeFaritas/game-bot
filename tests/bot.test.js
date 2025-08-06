import { decide, setMaze, manualMove } from '../src/bot.js'; 


describe('Bot intelligence tests', () => {

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
