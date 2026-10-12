const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_SITE_URL||'http://127.0.0.1:4000';
(async()=>{const browser=await chromium.launch();try{
  const page=await browser.newPage({viewport:{width:1440,height:950}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/terminal.html',{waitUntil:'domcontentloaded'});
  // Freeze decorative motion to prove commands never wait for its completion.
  const immediate=await page.evaluate(()=>{
    const intro=document.querySelector('.terminal-intro'),signature=document.querySelector('.session-signature');
    intro.classList.remove('is-opening');void signature.offsetWidth;intro.classList.add('is-opening');
    const opening=signature.getAnimations()[0];opening.pause();opening.currentTime=0;
    const input=document.querySelector('#console-input'),form=document.querySelector('#console-form');
    input.value='ls';form.requestSubmit();
    const result=document.querySelector('.terminal-result'),line=document.querySelector('.terminal-entry-command'),feedback=line.getAnimations()[0];
    feedback.pause();feedback.currentTime=0;
    return {visible:!form.hidden,opening:opening.playState,feedback:feedback.playState,files:result.querySelectorAll('.file-list button').length,text:result.textContent,opacity:getComputedStyle(result).opacity,status:document.querySelector('#result-status').textContent};
  });
  assert(immediate.visible);assert.equal(immediate.opening,'paused');assert.equal(immediate.feedback,'paused');assert.equal(immediate.opacity,'1');assert(immediate.files>0);assert.match(immediate.text,new RegExp('# '+immediate.files+' entradas'));assert.equal(immediate.status,'~ · '+immediate.files+' entradas');
  const input=page.locator('#console-input'),cmd=async value=>{await input.fill(value);await input.press('Enter')};
  await cmd('cat /perfil.md');assert.equal(await page.locator('#result-status').innerText(),'Leído: ~/perfil.md');assert.match(await page.locator('.terminal-result').last().innerText(),/Jorge/);assert.equal(await page.locator('.entry-exit').last().innerText(),'[0]');assert.equal(await page.locator('.is-latest').count(),1);
  assert.equal(await page.locator('.terminal-entry-command').first().evaluate(e=>e.getAnimations().length),0,'previous acknowledgement is cancelled');
  await cmd('cd /proyectos');assert.match(await page.locator('#result-status').innerText(),/^~\/proyectos · \d+ entradas$/);
  await cmd('noexiste');assert.equal(await page.locator('.entry-exit').last().innerText(),'[127]');assert.match(await page.locator('.terminal-result').last().innerText(),/Sigues en ~\/proyectos/);assert.equal(await page.locator('#prompt-path').innerText(),'~/proyectos');
  await page.locator('#terminal-motion').click();await cmd('tree');assert.equal(await page.evaluate(()=>document.getAnimations().length),0);assert.match(await page.locator('#result-status').innerText(),/directorio completo/);
  await page.locator('#terminal-motion').click();assert.equal(await page.locator('.session-signature').evaluate(e=>e.getAnimations().length),0,'signature does not replay on resume');
  await cmd('clear');assert.match(await page.locator('#console-output').innerText(),/Sigues en ~\/proyectos/);await input.press('ArrowUp');assert.equal(await input.inputValue(),'clear');
  await page.emulateMedia({reducedMotion:'reduce'});await cmd('perfil');assert.equal(await page.evaluate(()=>document.getAnimations().length),0);assert.match(await page.locator('.terminal-result').last().innerText(),/Jorge/);
  await page.emulateMedia({reducedMotion:'no-preference'});await cmd('x'.repeat(240));assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const settle=()=>page.evaluate(()=>Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{}))));
  await page.goto(base+'/terminal.html');await settle();await page.screenshot({path:'.impeccable/review/terminal-personality-desktop.png',fullPage:true});
  await cmd('cd proyectos');await page.screenshot({path:'.impeccable/review/terminal-personality-result.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});await page.goto(base+'/terminal.html');await settle();await page.screenshot({path:'.impeccable/review/terminal-personality-mobile.png',fullPage:true});
  const reduced=await browser.newPage({reducedMotion:'reduce'});await reduced.goto(base+'/terminal.html');assert.equal(await reduced.evaluate(()=>document.getAnimations().length),0);assert(await reduced.locator('.session-signature').isVisible());
  assert.deepEqual(errors,[]);console.log('PASS synchronous input/output during frozen motion, real counts/paths, persistent exit codes, recovery, repeated commands, pause/resume, reduced motion and long input');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
