const assert = require('node:assert/strict');
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'msedge' });
  try {
    const page = await browser.newPage();
    await page.goto(process.env.TEST_SITE_URL || 'http://127.0.0.1:4176');
    await page.locator('.map-switch').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.querySelectorAll('.map-switch img')].every(i => i.complete && i.naturalWidth));
    assert.equal(await page.locator('.map-switch img').count(), 5);
    await page.locator('[data-map="ferias"]').click();
    await page.locator('[data-map="ipec"]').click();
    await page.waitForFunction(() => document.querySelector('.terrain-scene').hash === '#conmapas-ipec');
    assert.equal(await page.locator('[data-map][aria-pressed="true"]').count(), 1);
    await page.route('**/impacto_dictadura.webp', route => route.abort());
    await page.locator('[data-map="memoria"]').click();
    await page.waitForFunction(() => document.querySelector('.map-load-status').textContent.includes('No se pudo'));
    assert.equal(await page.locator('[data-map="ipec"]').getAttribute('aria-pressed'), 'true');
    await page.unroute('**/impacto_dictadura.webp');
    await page.locator('[data-map="memoria"]').click();
    await page.waitForFunction(() => document.querySelector('.terrain-scene').hash === '#memoria-territorial');
    console.log('PASS: five thumbnails, latest selection, load failure preserves selection, retry.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
