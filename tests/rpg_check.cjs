const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');const {default:AxeBuilder}=require('@axe-core/playwright');
const base=(process.env.TEST_SITE_URL||'http://127.0.0.1:4000').replace(/\/$/,'');
const captures=path.join(__dirname,'../.impeccable/review');fs.mkdirSync(captures,{recursive:true});
(async()=>{const browser=await chromium.launch({headless:true});try{
 const context=await browser.newContext({viewport:{width:1440,height:950}});const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/explorar.html');await page.locator('#start').waitFor({state:'visible'});await page.screenshot({path:path.join(captures,'rpg-welcome.png')});await page.locator('#start').click();
 const canvas=page.locator('#world'),position=async()=>canvas.evaluate(c=>({x:+c.dataset.x,y:+c.dataset.y,scene:c.dataset.scene}));
 let a=await position();await page.keyboard.down('ArrowRight');await page.waitForTimeout(500);await page.keyboard.up('ArrowRight');let b=await position();assert(b.x>a.x+45,'continuous movement');
 await page.locator('#pause').click();a=await position();await canvas.focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(100);assert.deepEqual(await position(),a,'pause blocks movement');await page.locator('#resume').click();
 // Start beside Nico; walk to him using real controls, then converse.
 await page.goto(base+'/explorar.html');await page.locator('#start').click();await page.locator('#interact').filter({hasText:'Nico'}).click();assert.match(await page.locator('#dialog-content').innerText(),/puerto guarda tu recorrido/);await page.waitForTimeout(250);await page.screenshot({path:path.join(captures,'rpg-dialogue.png')});await page.getByRole('button',{name:'Seguir caminando',exact:true}).click();assert(await canvas.evaluate(c=>c===document.activeElement)||await page.locator('#interact').evaluate(c=>c===document.activeElement));
 for(const id of ['puerto','archivo','observatorio','taller','escuela']){
   await page.goto(base+'/explorar.html?lugar='+id);await page.locator('#start').click();await canvas.focus();await page.keyboard.press('e');await page.waitForFunction(id=>document.querySelector('#world').dataset.scene===id,id);assert.equal((await position()).scene,id);if(id==='taller')await page.screenshot({path:path.join(captures,'rpg-interior.png')});
   await page.keyboard.down('ArrowUp');await page.waitForTimeout(630);await page.keyboard.up('ArrowUp');await page.keyboard.press('e');await page.locator('#conversation[open]').waitFor();assert(await page.locator('#dialog-content').innerText());
   if(id==='taller'){await page.locator('[data-project="azimut"]').click();assert.match(await page.locator('#dialog-content').innerText(),/servicios de respaldo reciben/);assert.match(page.url(),/proyecto=azimut/);}
   if(id==='escuela')assert.match(await page.locator('#dialog-content').innerText(),/Bootcamp/);
   await page.keyboard.press('Escape');await page.locator('#conversation').waitFor({state:'hidden'});await page.waitForTimeout(50);await canvas.focus();await page.keyboard.down('ArrowDown');await page.waitForTimeout(860);await page.keyboard.up('ArrowDown');await page.keyboard.press('e');await page.waitForFunction(()=>document.querySelector('#world').dataset.scene==='outside');
 }
 await page.goto(base+'/explorar.html');await page.locator('#start').click();await page.screenshot({path:path.join(captures,'rpg-desktop.png')});
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});await page.waitForTimeout(100);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no overflow '+width);const results=await new AxeBuilder({page}).analyze();assert.deepEqual(results.violations.map(v=>v.id),[],'axe '+width);if(width===390)await page.screenshot({path:path.join(captures,'rpg-mobile.png')});}
 await page.setViewportSize({width:1440,height:950});await page.locator('#journal').click();await page.getByRole('button',{name:'Taller de herramientas Por descubrir'}).click();await page.locator('[data-project="azimut"]').click();await page.keyboard.press('Escape');await page.locator('#terminal-link').click();assert.match(page.url(),/proyecto=azimut/);await page.locator('#console-form:not([hidden])').waitFor();assert.match(await page.locator('#console-output').innerText(),/Azimut/);
 assert.deepEqual(errors,[]);
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});await mobile.goto(base+'/explorar.html');await mobile.locator('#start').click();a=await mobile.locator('#world').evaluate(c=>+c.dataset.x);const pad=mobile.locator('[data-move="right"]');const box=await pad.boundingBox();await mobile.mouse.move(box.x+box.width/2,box.y+box.height/2);await mobile.mouse.down();await mobile.waitForTimeout(300);await mobile.mouse.up();b=await mobile.locator('#world').evaluate(c=>+c.dataset.x);assert(b>a+20,'held touch moves');assert.equal(await mobile.locator('#world').getAttribute('data-direction'),'1');await mobile.screenshot({path:path.join(captures,'rpg-touch.png')});
 const fallback=await browser.newPage({javaScriptEnabled:false});await fallback.goto(base+'/explorar.html');await fallback.locator('#world-index summary').click();assert.equal(await fallback.locator('.index-content section').count(),5);
 const failed=await browser.newPage();await failed.route('**/rpg-jorge.png',r=>r.abort());await failed.goto(base+'/explorar.html');await failed.getByText('Una ilustración no pudo cargar.',{exact:false}).waitFor();await failed.locator('#journal').click();assert(await failed.getByRole('heading',{name:'Cuaderno de viaje'}).isVisible());
 console.log('PASS RPG keyboard movement, pause, five interiors, NPC, projects, terminal handoff, touch, reduced motion, noJS, missing sprite, responsive and axe');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1);});




