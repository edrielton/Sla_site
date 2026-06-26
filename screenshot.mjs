import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 2000));

const sections = ['hero', 'timeline', 'legends', 'comparador', 'quiz', 'stats'];

for (const id of sections) {
  await page.evaluate((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'instant' });
  }, id);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: `screenshot-${id}.png` });
  console.log(`✓ screenshot-${id}.png`);
}

await browser.close();
