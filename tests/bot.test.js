const { decide } = require('../src/bot');

test('Le bot retourne une action valide', () => {
    const mockState = {};  // État fictif
    const result = decide(mockState);

    expect(result).toHaveProperty('move');
    expect(result).toHaveProperty('action');
    expect(['UP', 'DOWN', 'LEFT', 'RIGHT', 'STAY']).toContain(result.move);
    expect(['COLLECT', 'NONE']).toContain(result.action);
});
