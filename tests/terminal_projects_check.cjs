const assert=require('node:assert/strict'),{chromium}=require('playwright'),{default:AxeBuilder}=require('@axe-core/playwright'),projects=require('../_data/projects.json');
const base=process.env.TEST_SITE_URL||'http://127.0.0.1:4000';
(async()=>{const browser=await chromium.launch();try{
  const context=await browser.newContext({viewport:{width:1440,height:950}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/terminal.html');const input=page.locator('#console-input'),last=()=>page.locator('.terminal-result').last();
  const cmd=async value=>{await input.fill(value);await input.press('Enter')};
  for(const command of ['cd /proyectos','ls -l','proyectos']){
    await cmd(command);assert.equal(await last().locator('.project-file').count(),projects.length);
    for(const project of projects){const row=last().locator('[data-command="cat /proyectos/'+project.id+'.md"]');assert.equal(await row.locator('.project-name').innerText(),project.name);assert.equal(await row.locator('.project-purpose').innerText(),project.summary);assert.equal(await row.locator('.project-filename').innerText(),project.id+'.md');}
  }
  await cmd('proyectos ambiente');assert.equal(await last().locator('.project-file').count(),1);assert.match(await last().innerText(),/HuellaRETC/);await cmd('proyectos codigo');assert.equal(await last().locator('.project-file').count(),4);
  for(const project of projects){
    await cmd('abrir '+project.id);const brief=last().locator('.exp-project');assert.equal(await brief.locator('h3').innerText(),project.name);
    assert.deepEqual(await brief.locator('.project-brief dt').allTextContents(),['Problema','Mi aporte']);assert.deepEqual(await brief.locator('.project-brief dd').allTextContents(),[project.problem,project.contribution]);
    assert.equal(await brief.locator('.exp-project-links a').count(),project.demo?2:1);assert.match(await brief.locator('.exp-project-note').innerText(),new RegExp(project.note.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
    const links=await brief.locator('.exp-project-links a').evaluateAll(nodes=>nodes.map(a=>({href:a.href,target:a.target,rel:a.rel,text:a.textContent})));assert.deepEqual(links.map(a=>a.href),[project.demo,project.repo].filter(Boolean));for(const link of links){assert.equal(link.target,'_blank');assert.match(link.rel,/noopener/);assert.match(link.text,/nueva pestaña/);}
    if(!project.demo)assert.match(await brief.locator('.project-access-hint').innerText(),/no tiene demo web/);
    await brief.locator('summary').click();assert.match(await brief.locator('.project-technical').innerText(),new RegExp(project.stack.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));assert((await brief.locator('.project-technical').innerText()).includes(project.detail));
  }
  await cmd('cd /proyectos');await input.fill('pendiente');await last().locator('[data-command="cat /proyectos/azimut.md"]').click();assert.equal(await input.inputValue(),'pendiente');assert.equal(new URL(page.url()).searchParams.get('proyecto'),'azimut');
  // Exercise a real new-tab click without loading or operating the external application.
  const demo=projects.find(p=>p.id==='azimut').demo;await page.context().route(demo,route=>route.fulfill({status:200,body:'Project destination'}));
  const popupPromise=page.waitForEvent('popup');await last().locator('.project-primary').click();const popup=await popupPromise;await popup.waitForLoadState();assert.equal(popup.url(),demo);assert.equal(await input.inputValue(),'pendiente');assert.match(page.url(),/terminal.html/);
  for(const width of [320,390,768,1440]){
    await page.setViewportSize({width,height:950});await cmd('cat /proyectos/azimut.md');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'project overflow '+width);
    assert(await last().evaluate(e=>e.scrollWidth<=e.clientWidth),'result overflow '+width);
    const axe=await new AxeBuilder({page}).analyze();assert.deepEqual(axe.violations.map(v=>v.id),[],'axe project '+width);
    await cmd('ls /proyectos');assert(await last().evaluate(e=>e.scrollWidth<=e.clientWidth),'list overflow '+width);assert(await page.evaluate(()=>document.documentElement.scrollHeight<innerHeight*2),'transcript must not grow outer page '+width);
  }
  await page.setViewportSize({width:1440,height:950});await cmd('cat /proyectos/azimut.md');await page.screenshot({path:'.impeccable/review/project-brief-desktop.png',fullPage:true});
  await page.evaluate(()=>document.documentElement.style.zoom='2');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'200% project reflow');await page.evaluate(()=>document.documentElement.style.zoom='');
  await cmd('proyectos');await page.screenshot({path:'.impeccable/review/project-list-desktop.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});await cmd('cat /proyectos/autoatlas-pro.md');await page.screenshot({path:'.impeccable/review/project-brief-mobile.png',fullPage:true});await last().locator('.exp-project-links').scrollIntoViewIfNeeded();await page.screenshot({path:'.impeccable/review/project-access-mobile.png',fullPage:true});
  await page.goto(base+'/terminal.html?lugar=taller&proyecto=azimut');assert.equal(await last().locator('.project-brief dd').count(),2);assert.match(await last().innerText(),/servicios de respaldo reciben/);
  assert.deepEqual(errors,[]);console.log('PASS all ten project briefs, shared directory/command rows, filters, factual notes, technical context, real links/new-tab continuity, draft preservation, direct links, 320–1440px/axe and 200% reflow');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
