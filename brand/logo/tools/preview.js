// Usage: node preview.js <svgDir> <outPng> [names]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const [dir, outPng, namesArg] = process.argv.slice(2);
const names = (namesArg || '1-duo,2-live,3-booked,4-wordmark').split(',');
const titles = {
  '1-duo': '1 — Duo · customer + AI in conversation',
  '2-live': '2 — Live · always-on ring that is also a speech bubble',
  '3-booked': '3 — Booked · every call answered and booked',
  '4-wordmark': '4 — Wordmark · type only, purple 2',
};
const img = (f, h) => `<img src="data:image/svg+xml;base64,${Buffer.from(fs.readFileSync(path.join(dir, f))).toString('base64')}" style="height:${h}px">`;

const rows = names.map((n) => `
  <section>
    <h2>${titles[n] || n}</h2>
    <div class="row">
      <div class="tile light">${img(`${n}-logo.svg`, 60)}</div>
      <div class="tile dark">${img(`${n}-logo-dark.svg`, 60)}</div>
      <div class="tile purple">${img(`${n}-logo-white.svg`, 60)}</div>
    </div>
    <div class="row">
      <div class="tile light sizes">
        ${n === '4-wordmark' ? '' : [96, 48, 32, 16].map((s) => img(`${n}-mark.svg`, s)).join('') + '<span class="sep"></span>'}
        ${[96, 48, 32, 16].map((s) => img(`${n}-icon.svg`, s)).join('')}
      </div>
      <div class="tile light nav"><div class="bar">${img(`${n}-logo.svg`, 34)}<span>Features</span><span>How it works</span><span>Pricing</span><b>Sign in</b></div></div>
    </div>
  </section>`).join('');

const html = `<!doctype html><html><head><style>
  body{margin:0;padding:32px;background:#f5f5f6;font-family:Arial,sans-serif;color:#18181a;width:1336px}
  h2{font-size:18px;margin:0 0 12px}
  section{margin-bottom:40px}
  .row{display:flex;gap:16px;margin-bottom:16px}
  .tile{flex:1;border-radius:16px;padding:28px;display:flex;align-items:center;justify-content:center;min-height:116px}
  .light{background:#fff;border:1px solid #e9e9ec}
  .dark{background:#18181a}
  .purple{background:radial-gradient(120% 140% at 70% 10%,#7b66ff 0%,#673de6 35%,#331c74 75%,#251951 100%)}
  .sizes{gap:22px;align-items:flex-end;flex:1.25}
  .sep{width:1px;height:96px;background:#e9e9ec;margin:0 8px}
  .nav{padding:0;align-items:stretch}
  .bar{display:flex;align-items:center;gap:22px;width:100%;padding:0 24px;font-size:14px;color:#58585e}
  .bar img{margin-right:auto}
  .bar b{background:#673de6;color:#fff;font-weight:600;padding:9px 16px;border-radius:8px}
</style></head><body>${rows}</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 800 }, deviceScaleFactor: 2 });
  await page.setContent(html);
  await page.screenshot({ path: outPng, fullPage: true });
  await browser.close();
})();
