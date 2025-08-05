const puppeteer = require('puppeteer'); // Assure-toi que puppeteer (et pas puppeteer-core) est installé
const fs = require('fs');

const BOT_NAME = "GrigrouBot";
const BOT_URL = "http://localhost:3000/action";
const BOT_EMOJI = "🤖";

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1280, height: 900 }
  });

  const page = await browser.newPage();

  console.log("🌐 Accès à la page d'enregistrement...");
  await page.goto('https://bot.gogokodo.com/bot-registration', { waitUntil: 'domcontentloaded' });

  // Remplir le formulaire
  console.log("✍️ Remplissage du formulaire...");
  await page.type('#bot-name', BOT_NAME);
  await page.type('#bot-url', BOT_URL);

  // Choisir un emoji
  await page.evaluate((emoji) => {
    const option = [...document.querySelectorAll('.emoji-option')].find(e => e.dataset.emoji === emoji);
    option?.click();
  }, BOT_EMOJI);

  // Valider
  console.log("🚀 Enregistrement du bot...");
  await page.click('#register-btn');
  await new Promise(resolve => setTimeout(resolve, 2000)); // Laisse le temps de redirection JS

  // Redirigé vers la page de sélection des jeux → cliquer sur Maze Runner
  console.log("🎮 Sélection du jeu Maze Runner...");
  await page.evaluate(() => {
    const link = [...document.querySelectorAll('a.btn')].find(a => a.textContent.includes('Maze Runner'));
    link?.click();
  });

  // Attendre que Maze Runner se charge (plus longtemps ici)
  await page.waitForSelector('#start-btn', { timeout: 10000 });

  // Démarrer le jeu
  console.log("🟢 Démarrage du jeu...");
  await page.click('#start-btn');

  // Attendre le canvas visible
  await page.waitForSelector('#maze-canvas', { visible: true });

  // Screenshot du canvas
  const canvas = await page.$('#maze-canvas');
  const clip = await canvas.boundingBox();

  console.log("📸 Capture du canvas...");
  await page.screenshot({ path: 'maze-canvas.png', clip });

  console.log("✅ Image sauvegardée : maze-canvas.png");

  await browser.close();
})();
