// Usage: node preview.js <svgDir> <outPng> [keys]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const [dir, outPng, keysArg] = process.argv.slice(2);
const keys = (keysArg || 'a,b,c').split(',');
const names = { a: 'A — Wave H', b: 'B — Talk bubble', c: 'C — Lettermark bubble' };
const read = (f) => fs.readFileSync(path.join(dir, f), 'utf8');
const img = (f, h) => `<img src="data:image/svg+xml;base64,${Buffer.from(read(f)).toString('base64')}" style="height:${h}px">`;

const rows = keys.map((k) => `
  <section>
    <h2>${names[k] || k}</h2>
    <div class="row">
      <div class="tile light">${img(`${k}-logo.svg`, 64)}</div>
      <div class="tile dark">${img(`${k}-logo-dark.svg`, 64)}</div>
    </div>
    <div class="row">
      <div class="tile light sizes">${[128, 64, 32, 16].map((s) => img(`${k}-icon.svg`, s)).join('')}</div>
      <div class="tile light nav">
        <div class="bar">${img(`${k}-logo.svg`, 32)}<span>Features</span><span>How it works</span><span>Pricing</span><b>Sign in</b></div>
      </div>
    </div>
  </section>`).join('');

const html = `<!doctype html><html><head><style>
  body{margin:0;padding:32px;background:#f1f5f9;font-family:Inter,Arial,sans-serif;color:#0f172b;width:1240px}
  h2{font-size:18px;margin:0 0 12px}
  section{margin-bottom:36px}
  .row{display:flex;gap:16px;margin-bottom:16px}
  .tile{flex:1;border-radius:16px;padding:32px;display:flex;align-items:center;justify-content:center;min-height:120px}
  .light{background:#fff;border:1px solid #e2e8f0}
  .dark{background:#0f172b}
  .sizes{gap:28px;align-items:flex-end}
  .nav{padding:0;align-items:stretch}
  .bar{display:flex;align-items:center;gap:22px;width:100%;padding:0 24px;font-size:14px;color:#45556c}
  .bar img{margin-right:auto}
  .bar b{background:#4f39f6;color:#fff;font-weight:500;padding:8px 14px;border-radius:8px}
</style></head><body>${rows}</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1304, height: 800 }, deviceScaleFactor: 2 });
  await page.setContent(html);
  await page.screenshot({ path: outPng, fullPage: true });
  await browser.close();
})();
