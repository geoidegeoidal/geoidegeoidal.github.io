const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { default: AxeBuilder } = require('@axe-core/playwright');
const base = (process.env.TEST_SITE_URL || 'http://127.0.0.1:4000').replace(/\/$/, '');
const capture = process.env.EXPEDITION_CAPTURE;
(async () => {
  const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || undefined });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.url().startsWith(base) && r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
    await page.goto(base + '/terminal.html?lugar=taller&proyecto=azimut');
    await page.locator('#console-form:not([hidden])').waitFor();
    assert.match(await page.locator('#place-detail').innerText(), /Azimut/);
    const command = async text => {
      await page.locator('#console-input').fill(text);
      await page.locator('#console-input').press('Enter');
    };
    await command('PROYECTOS ambiente');
    assert.match(await page.locator('.exp-entry').last().innerText(), /HuellaRETC/);
    await command('abrir autoatlas-pro');
    assert.match(await page.locator('.exp-entry').last().innerText(), /experimental/);
    await command('ir taller');
    await page.locator('#place-detail [data-project="azimut"]').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('.exp-back').evaluate(e => e === document.activeElement), true, 'terminal notebook keeps keyboard focus');
    await command('<img src=x onerror=alert(1)>');
    assert.equal(await page.locator('#console-output img').count(), 0);
    assert.match(await page.locator('.exp-entry').last().innerText(), /no está disponible/);
    await command('abrir no-existe');
    assert.match(await page.locator('.exp-entry').last().innerText(), /No encuentro/);
    await command('trayectoria');
    assert.match(await page.locator('.exp-entry').last().innerText(), /SERVEL/);
    await command('habilidades');
    assert.match(await page.locator('.exp-entry').last().innerText(), /PostGIS/);
    await command('formación');
    assert.match(await page.locator('.exp-entry').last().innerText(), /Bootcamp/);
    await command('contacto');
    assert((await page.locator('.exp-entry').last().locator('a').getAttribute('href')).endsWith('/#contacto'));
    await page.locator('#console-input').press('ArrowUp');
    assert.equal(await page.locator('#console-input').inputValue(), 'contacto');
    await page.locator('#console-input').press('Escape');
    await page.locator('#console-input').fill('abrir azi');
    await page.locator('#console-input').press('Tab');
    assert.equal(await page.locator('#console-input').inputValue(), 'abrir azimut');
    await command('limpiar');
    assert.equal(await page.locator('.exp-entry').count(), 0);
    assert.match(await page.locator('#console-output').innerText(), /Consola despejada/);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
      for (const route of ['terminal']) {
        await page.goto(`${base}/${route}.html`);
        await page.locator('#place-detail h2').waitFor();
        await page.emulateMedia({ reducedMotion: 'reduce' });
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route}: overflow ${width}`);
        assert.equal(await page.locator('h1').count(), 1);
        const controls = await page.locator('.expedition button, .exp-switch a').evaluateAll(elements => elements.filter(e => e.getClientRects().length && e.getBoundingClientRect().height < 43.9).map(e => e.textContent));
        assert.deepEqual(controls, [], `${route}: small targets ${width}`);
        if ([390, 1440].includes(width)) {
          const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
          assert.deepEqual(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), [], `${route}: accessibility ${width}`);
          if (capture) {
            fs.mkdirSync(capture, { recursive: true });
            await page.screenshot({ path: path.join(capture, `${route}-${width}.png`), fullPage: true });
          }
        }
      }
    }
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(base + '/terminal.html');
    await page.evaluate(() => { document.body.style.zoom = '2'; });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), '200% zoom overflow');
    await page.evaluate(() => { document.body.style.zoom = ''; });
    const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const fallback = await noJS.newPage();
    for (const route of ['terminal']) {
      await fallback.goto(`${base}/${route}.html`);
      await fallback.locator('.exp-index summary').click();
      assert.equal(await fallback.locator('.exp-index-grid a:visible').count(), 6);
      assert(await fallback.locator('.exp-switch a').last().isVisible());
    }
    await noJS.close();
    assert.deepEqual(errors, []);
    console.log('PASS: terminal commands, safe input, history, keyboard, responsive, axe, 200% zoom and no-JS.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
