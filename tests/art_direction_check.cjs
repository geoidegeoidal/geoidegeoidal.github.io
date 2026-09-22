const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const path = require('node:path');
const base = process.env.TEST_SITE_URL || 'http://127.0.0.1:4176';

(async () => {
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'msedge' });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const orbit = () => page.locator('.atlas-stage').evaluate(el => {
      const s = getComputedStyle(el, '::before');
      return { name: s.animationName, state: s.animationPlayState, transform: s.transform };
    });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.querySelector('.atlas-scene').classList.contains('is-in-view'));
    assert.equal((await orbit()).state, 'running');
    const initial = (await orbit()).transform;
    await page.waitForTimeout(200);
    assert.notEqual((await orbit()).transform, initial);
    await page.locator('.motion-toggle').click();
    assert.equal((await orbit()).name, 'none');
    await page.locator('.motion-toggle').click();
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    assert.equal((await orbit()).state, 'paused');
    await page.evaluate(() => {
      delete document.hidden;
      document.dispatchEvent(new Event('visibilitychange'));
      document.querySelector('#tech').scrollIntoView();
    });
    await page.waitForFunction(() => !document.querySelector('.atlas-scene').classList.contains('is-in-view'));
    assert.equal((await orbit()).state, 'paused');
    await page.locator('.technology-area a').first().focus();
    assert.equal(await page.locator('.technology-area').first().evaluate(el => getComputedStyle(el).opacity), '1');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => document.documentElement.dataset.motion === 'off');
    assert.equal((await orbit()).name, 'none');
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(base, { waitUntil: 'networkidle' });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow ${width}`);
      assert.equal(await page.locator('#cursos').evaluate(el => getComputedStyle(el).backgroundImage), 'none');
      for (const selector of ['.selected-project', '.technology-area']) {
        assert(await page.locator(selector).evaluateAll(els => els.every(el => {
          const r = el.getBoundingClientRect();
          return r.left >= -1 && r.right <= innerWidth + 1;
        })), `${selector} containment ${width}`);
      }
      if (process.env.VISUAL_OUTPUT && [390, 1440].includes(width)) {
        await page.screenshot({ path: path.join(process.env.VISUAL_OUTPUT, `art-hero-${width}.png`) });
        for (const section of ['bio', 'proyectos', 'tech']) {
          await page.locator(`#${section}`).scrollIntoViewIfNeeded();
          await page.screenshot({ path: path.join(process.env.VISUAL_OUTPUT, `art-${section}-${width}.png`) });
        }
      }
    }
    await page.setViewportSize({ width: 720, height: 450 });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.documentElement.style.zoom = '2');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), '200% zoom overflow');
    const plain = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    await plain.goto(base);
    assert(await plain.locator('.atlas-fallback').isVisible());
    assert.equal(await plain.locator('.atlas-stage').evaluate(el => getComputedStyle(el, '::before').animationPlayState), 'paused');
    assert(await plain.locator('.technology-area').first().isVisible());
    console.log('PASS: art motion, pause, hidden tab, offscreen, focus, reduced motion, no-JS, 200% zoom and four widths.');
  } finally {
    await browser.close();
  }
})();
