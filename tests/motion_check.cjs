const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const base = (process.env.TEST_SITE_URL || 'http://127.0.0.1:4000').replace(/\/$/,'');
(async()=>{
 const browser = await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL || undefined});
 try {
  const context=await browser.newContext({viewport:{width:1440,height:1000}});
  await context.addInitScript(()=>{window.atlasPaints=0;const clear=CanvasRenderingContext2D.prototype.clearRect;CanvasRenderingContext2D.prototype.clearRect=function(...args){window.atlasPaints++;return clear.apply(this,args)};});
  const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base,{waitUntil:'networkidle'});await page.waitForSelector('.atlas-scene.is-ready');
  const paints=()=>page.evaluate(()=>window.atlasPaints);
  let count=await paints();await page.waitForTimeout(180);assert(await paints()>count,'globe animates');
  await page.getByRole('button',{name:'Pausar movimiento',exact:true}).click();
  count=await paints();await page.waitForTimeout(180);assert.equal(await paints(),count,'pause stops drawing');
  const before=await page.locator('[data-atlas]').getAttribute('data-longitude');
  await page.getByRole('button',{name:'Girar globo a la derecha'}).focus();await page.keyboard.press('Enter');
  assert.notEqual(await page.locator('[data-atlas]').getAttribute('data-longitude'),before,'keyboard changes orientation while paused');
  await page.getByRole('button',{name:'Centrar globo en Chile'}).click();assert.equal(await page.locator('[data-atlas]').getAttribute('data-longitude'),'-68.0');
  await page.goto(base+'/blog.html');assert.equal(await page.locator('html').getAttribute('data-motion'),'off','pause persists across pages');
  await page.getByRole('button',{name:'Activar movimiento',exact:true}).click();
  await page.goto(base);await page.waitForSelector('.atlas-scene.is-ready');
  const box=await page.locator('canvas.atlas-canvas').boundingBox();
  await page.mouse.move(box.x+box.width*.55,box.y+box.height*.4);await page.mouse.down();await page.mouse.move(box.x+box.width*.35,box.y+box.height*.4,{steps:8});await page.mouse.up();
  await page.waitForTimeout(150);assert.notEqual(await page.locator('[data-atlas]').getAttribute('data-longitude'),'-68.0','pointer drag rotates');
  await page.locator('#contacto').scrollIntoViewIfNeeded();await page.waitForTimeout(200);count=await paints();await page.waitForTimeout(180);assert.equal(await paints(),count,'off-screen canvas stops');
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(150);count=await paints();await page.waitForTimeout(180);assert(await paints()>count,'canvas resumes on return');
  assert.equal(errors.length,0);await context.close();

  const hidden=await browser.newContext({viewport:{width:1440,height:1000}});
  await hidden.addInitScript(()=>Object.defineProperty(document,'hidden',{configurable:true,get:()=>true}));
  const background=await hidden.newPage();await background.goto(base);await background.waitForSelector('.atlas-scene.is-ready');
  assert(await background.locator('html').evaluate(el=>el.classList.contains('tab-hidden')));
  await background.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'))});
  assert.equal(await background.locator('.atlas-orbit').evaluate(el=>getComputedStyle(el).animationPlayState),'running','background-loaded CSS resumes');await hidden.close();

  const reduced=await browser.newContext({reducedMotion:'reduce',viewport:{width:390,height:844}});
  const still=await reduced.newPage();await still.goto(base);await still.waitForSelector('.atlas-scene.is-ready');
  assert.equal(await still.locator('html').getAttribute('data-motion'),'off');assert(await still.getByRole('button',{name:'Movimiento reducido',exact:true}).isDisabled());
  const pixel=await still.locator('canvas').evaluate(c=>c.toDataURL());await still.waitForTimeout(180);assert.equal(await still.locator('canvas').evaluate(c=>c.toDataURL()),pixel,'reduced-motion globe remains static');
  assert.equal(await still.locator('h1').evaluate(h=>getComputedStyle(h.firstElementChild.firstElementChild).animationName),'none');await reduced.close();

  const fallback=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const plain=await fallback.newPage();await plain.goto(base);assert(await plain.locator('.atlas-fallback').isVisible());assert(await plain.locator('canvas').isHidden());await fallback.close();
  const failed=await browser.newContext();const failure=await failed.newPage();await failure.route('**/atlas.json',route=>route.fulfill({status:503,body:'Unavailable'}));await failure.goto(base,{waitUntil:'networkidle'});assert(await failure.locator('.atlas-fallback').isVisible());assert(await failure.locator('.atlas-controls').isHidden());await failed.close();
  console.log('PASS: live rendering, pause/resume, persistence, keyboard, drag, reset, offscreen suspension, hidden-tab recovery, reduced motion, no-JS and failed-data fallbacks.');
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
