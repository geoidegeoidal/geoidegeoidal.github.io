const assert = require('node:assert/strict');
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({channel: process.env.BROWSER_CHANNEL || 'msedge'});
  try {
    const page = await browser.newPage();
    await page.goto(process.env.TEST_SITE_URL || 'http://127.0.0.1:4176');
    const range = page.getByRole('slider', {name: 'Acercar el detalle del relieve'});
    await range.focus();
    await page.keyboard.press('End');
    assert.equal(await range.inputValue(), '2.4');
    assert.equal(await page.locator('.cover-map-window img').evaluate(e => e.style.getPropertyValue('--map-zoom')), '2.4');
    await page.keyboard.press('Home');
    assert.equal(await page.locator('.cover-map-window img').evaluate(e => e.style.getPropertyValue('--map-zoom')), '1');
    const order = await page.locator('main > section[id]').evaluateAll(es => es.map(e => e.id));
    assert.deepEqual(order, ['conmapas','proyectos','bio','cursos','experiencia','tech','contacto']);
    console.log('PASS: keyboard zoom, reset and work-first reading order.');
  } finally { await browser.close(); }
})();
