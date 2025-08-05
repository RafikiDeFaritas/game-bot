import * as JimpNamespace from 'jimp';
import fs from 'fs';

const Jimp = JimpNamespace.default || JimpNamespace;

const path = './image.png';
const gridWidth = 21;
const gridHeight = 21;
const cellSize = 25;

async function extractMaze() {
  const image = await Jimp.read(path);
  const maze = [];

  for (let y = 0; y < gridHeight; y++) {
    const row = [];
    for (let x = 0; x < gridWidth; x++) {
      const centerX = x * cellSize + Math.floor(cellSize / 2);
      const centerY = y * cellSize + Math.floor(cellSize / 2);

      const { r, g, b } = Jimp.intToRGBA(image.getPixelColor(centerX, centerY));

      if (r < 50 && g < 50 && b < 50) {
        row.push(0); // Wall
      } else if ((r > 200 && g > 150 && b < 120) || (r > 200 && g > 100 && b < 80)) {
        row.push(2); // Item
      } else {
        row.push(1); // Path
      }
    }
    maze.push(row);
  }

  return maze;
}

extractMaze().then((maze) => {
  const output = `const maze = ${JSON.stringify(maze, null, 2)};\n\nexport default maze;`;
  fs.writeFileSync('./src/generated-maze.js', output, 'utf8');
  console.log('✅ Maze generated and saved to src/generated-maze.js');
});
