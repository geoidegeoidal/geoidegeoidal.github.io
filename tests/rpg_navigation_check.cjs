const assert=require('node:assert/strict');
const {chromium}=require('playwright'),{default:AxeBuilder}=require('@axe-core/playwright');
const W=require('../assets/js/rpg-model.js');
const base=(process.env.TEST_SITE_URL||'http://127.0.0.1:4000').replace(/\/$/,'');
const v={x:200,y:200,w:800,h:600,scale:1};
assert.deepEqual(W.camera(v,{x:600,y:500},.05),{x:200,y:200},'camera dead zone');
const follow=W.camera(v,{x:750,y:700},.05);assert(follow.x>200&&follow.x<254&&follow.y>200&&follow.y<328,'smooth following');
assert.deepEqual(W.camera(v,{x:0,y:0},.05,true),{x:0,y:0},'camera top bounds');
assert.deepEqual(W.camera(v,{x:1600,y:1120},.05,true),{x:800,y:520},'camera bottom bounds');
assert.deepEqual(W.camera({...v,w:2000,h:1400},{x:0,y:0},0,true),{x:-200,y:-140},'oversize viewport centered');
(async()=>{const browser=await chromium.launch();try{
 const context=await browser.newContext({viewport:{width:1440,height:900}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const state=()=>page.locator('#world').evaluate(c=>({...c.dataset}));
 await page.goto(base+'/explorar.html');await page.locator('#start').click();assert.equal((await state()).scale,'0.950');
 const initial=await state();for(let i=0;i<3;i++)await page.locator('#zoom-out').click();assert(await page.locator('#zoom-out').isDisabled());assert.equal((await state()).x,initial.x);assert.equal((await state()).y,initial.y);
 for(let i=0;i<5;i++)await page.locator('#zoom-in').click();assert(await page.locator('#zoom-in').isDisabled());assert.equal((await state()).x,initial.x);
 // Pointer coordinates must use the same rounded camera origin as the renderer at either zoom limit.
 for(const delta of ['out','in']){
   while(!await page.locator('#zoom-'+delta).isDisabled())await page.locator('#zoom-'+delta).click();
   const s=await state(),r=await page.locator('#world').boundingBox();
   await page.mouse.click(r.x+(510-Number(s.cameraX))*Number(s.scale),r.y+(790-Number(s.cameraY))*Number(s.scale));
   await page.waitForFunction(()=>+document.querySelector('#world').dataset.route>0);await page.waitForFunction(()=>document.querySelector('#world').dataset.route==='0');
   assert(Math.abs(Number((await state()).x)-510)<4,'click mapping at '+delta);
   await page.goto(base+'/explorar.html');await page.locator('#start').click();
 }
 await page.locator('#overview').click();assert.equal(await page.locator('[data-destination]').count(),5);await page.waitForTimeout(300);assert.deepEqual((await new AxeBuilder({page}).analyze()).violations.map(v=>v.id),[],'atlas accessibility');
 await page.locator('[data-destination=taller]').click();await page.waitForFunction(()=>+document.querySelector('#world').dataset.route>0);await page.locator('#cancel-route').click();await page.waitForFunction(()=>document.querySelector('#world').dataset.route==='0');assert.equal((await state()).route,'0');
 await page.locator('#overview').click();await page.locator('[data-destination=taller]').click();await page.locator('#world').focus();await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('#world').dataset.route==='0');assert.equal((await state()).route,'0','manual takeover');
 await page.locator('#overview').click();await page.locator('[data-destination=taller]').click();await page.waitForFunction(()=>document.querySelector('#world').dataset.scene==='taller',null,{timeout:20000});assert(await page.locator('#zoom-in').isDisabled());assert(await page.locator('#route-banner').isHidden());
 await page.locator('#overview').click();await page.locator('[data-destination=escuela]').click();await page.waitForFunction(()=>document.querySelector('#world').dataset.scene==='escuela',null,{timeout:20000});
 for(const [width,height]of [[320,800],[390,844],[844,390],[1440,900]]){
   await page.setViewportSize({width,height});await page.goto(base+'/explorar.html');await page.locator('#start').click();await page.waitForTimeout(250);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no overflow');
   const labels=await page.locator('.landmark:visible').evaluateAll(list=>list.map(e=>{const r=e.getBoundingClientRect();return{left:r.left,right:r.right,top:r.top,bottom:r.bottom,w:r.width,h:r.height};}));
   for(const r of labels){assert(r.left>=0&&r.right<=width&&r.h>=44,'label bounds and target');}
   for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++){const a=labels[i],b=labels[j];assert(!(a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top),'labels do not collide');}
   await page.locator('#overview').click();await page.waitForTimeout(250);assert.deepEqual((await new AxeBuilder({page}).analyze()).violations.map(v=>v.id),[],'atlas axe '+width);await page.keyboard.press('Escape');
 }
 const mobile=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true});await mobile.goto(base+'/explorar.html');await mobile.locator('#start').click();assert.equal(await mobile.locator('#world').getAttribute('data-scale'),'0.750');await mobile.locator('#overview').click();await mobile.locator('[data-destination=taller]').click();const pad=await mobile.locator('[data-move=right]').boundingBox();await mobile.mouse.move(pad.x+20,pad.y+20);await mobile.mouse.down();await mobile.waitForTimeout(50);assert.equal(await mobile.locator('#world').getAttribute('data-route'),'0');await mobile.mouse.up();
 assert.deepEqual(errors,[]);console.log('PASS camera bounds/dead zone, zoom limits and pointer mapping, atlas routes across bridge/interiors, cancellation, responsive labels and axe');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});


