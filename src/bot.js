const botState = {
    x: 1,
    y: 1,
    visited: new Set(['1,1']),
    directionIndex: 0,
    maze: [],
    nextManualMove: null,
  };
  
  const directionOrder = ['RIGHT', 'DOWN', 'LEFT', 'UP'];
  
  function getNextCoords(x, y, move) {
    switch (move) {
      case 'UP': return { x, y: y - 1 };
      case 'DOWN': return { x, y: y + 1 };
      case 'LEFT': return { x: x - 1, y };
      case 'RIGHT': return { x: x + 1, y };
      default: return { x, y };
    }
  }
  
  function isWalkable(x, y) {
    return (
      y >= 0 &&
      y < botState.maze.length &&
      x >= 0 &&
      x < botState.maze[0].length &&
      botState.maze[y][x] === 1
    );
  }
  
  function setMaze(mazeArray) {
    botState.x = 1;
    botState.y = 1;
    botState.visited = new Set(['1,1']);
    botState.directionIndex = 0;
    botState.maze = mazeArray;
  }
  
  function decide() {
    if (botState.nextManualMove) {
      const override = botState.nextManualMove;
      botState.nextManualMove = null; // consomme l'action
      return override;
    }
  
    // logique automatique normale
    for (let i = 0; i < 4; i++) {
      const move = directionOrder[botState.directionIndex];
      const { x: nextX, y: nextY } = getNextCoords(botState.x, botState.y, move);
      const key = `${nextX},${nextY}`;
  
      if (isWalkable(nextX, nextY) && !botState.visited.has(key)) {
        botState.visited.add(key);
        botState.x = nextX;
        botState.y = nextY;
        botState.lastMove = move;
        return { move, action: 'COLLECT' };
      }
  
      botState.directionIndex = (botState.directionIndex + 1) % 4;
    }
  
    return { move: 'STAY', action: 'COLLECT' };
  }
  
  function manualMove(move, action) {
    // Enregistre le move et l'action à utiliser dans le prochain /action
    botState.nextManualMove = { move, action };
    return {
      status: 'Prochaine action forcée',
      override: botState.nextManualMove,
    };
  }
  
  
  export { decide, setMaze , manualMove };
  