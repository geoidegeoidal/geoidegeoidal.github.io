(function () {
  'use strict';
  const W = window.PortfolioWorld, canvas = document.querySelector('#world'), ctx = canvas.getContext('2d');
  if (!W || !ctx) { document.querySelector('#loading').textContent = 'No se pudo abrir el mapa. Usa el índice para consultar el portafolio.'; return; }
  const $ = s => document.querySelector(s), assets = {}, keys = new Set(), visited = new Set(), read = new Set();
  const player = { x: 430, y: 790, direction: 0, step: 1 };
  const dialog = $('#conversation'), content = $('#dialog-content'), status = $('#world-status');
  let ready = false, started = false, paused = false, scene = 'outside', place = 'puerto', project = '';
  let last = 0, frame = 0, route = [], afterWalk = null, moving = false, walkingTime = 0, ambientTime = 0, nearby = null, returnFocus = null;
  let view = { x: 0, y: 0, scale: 1, w: 800, h: 600 }, outsidePosition = { x: 430, y: 790 };
  let zoom = 1, cameraSnap = true, routeName = '';
  const placeNames = { puerto: ['Puerto', 'Trayectoria'], archivo: ['Archivo', 'ConMapas'], observatorio: ['Observatorio', 'Ambiente'], taller: ['Taller', 'Proyectos'], escuela: ['Escuela', 'Formación'] };
  const landmarkButtons = W.buildings.map(b => {
    const control = document.createElement('button'); control.type = 'button'; control.className = 'landmark'; control.dataset.place = b.id;
    control.setAttribute('aria-label', 'Caminar a ' + b.name);
    const name = document.createElement('strong'), role = document.createElement('small'); name.textContent = placeNames[b.id][0]; role.textContent = placeNames[b.id][1]; control.append(name, role);
    control.addEventListener('click', () => travel(b.id)); $('#world-labels').append(control); return { b, control };
  });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const messages = {
    puerto: '¡Llegaste, Jorge! Este puerto guarda tu recorrido: geografía, análisis espacial y herramientas para entender el territorio. Entra al faro para recorrer los hitos. Al otro lado del puente está el taller; al sur, la escuela.',
    archivo: 'Cada mapa puede abrir una pregunta. Aquí reunimos ConMapas, vida cotidiana y memoria territorial. Entra al archivo y acércate a la mesa: puedes abrir las cartografías y sus fuentes.',
    observatorio: 'Desde aquí miramos el territorio con datos ambientales y teledetección. Adentro encontrarás el IEMA, HuellaRETC y la investigación publicada de Jorge, con sus alcances reales.',
    taller: 'Pasa al taller. Aquí una pregunta se convierte en una herramienta: LUZ·RM, Azimut, AutoAtlas Pro. Puedes revisar qué hace cada proyecto, sus límites y su código.',
    escuela: '¡La escuela está abierta! Aquí Jorge comparte lo que construye: del primer visor a una aplicación territorial publicada. Entra para conocer el Bootcamp y las herramientas que se usan.'
  };
  function button(label, action, parent = content) { const b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.addEventListener('click', action); parent.append(b); return b; }
  function paragraph(text, className) { const p = document.createElement('p'); p.textContent = text; if (className) p.className = className; content.append(p); return p; }
  function clearRoute() { route = []; afterWalk = null; routeName = ''; $('#route-banner').hidden = true; }
  function stopInput() { keys.clear(); clearRoute(); moving = false; }
  function syncURL() {
    const url = new URL(location.href); url.searchParams.set('lugar', place);
    if (project) url.searchParams.set('proyecto', project); else url.searchParams.delete('proyecto');
    history.replaceState(null, '', url); const terminal = new URL($('#terminal-link').href); terminal.search = url.search; $('#terminal-link').href = terminal.href;
  }
  function announce(text) { status.textContent = text; }
  function show(title, kind = 'book') {
    dialog.dataset.kind = kind;
    stopInput(); if (!dialog.open) returnFocus = document.activeElement;
    $('#conversation-title').textContent = title; content.replaceChildren(); content.classList.remove('dialog-reveal'); void content.offsetWidth; content.classList.add('dialog-reveal');
    if (!dialog.open) dialog.showModal(); $('#close-dialog').focus(); draw();
  }
  function close() { dialog.close(); }
  dialog.addEventListener('close', () => { keys.clear(); moving = false; if (returnFocus?.isConnected) returnFocus.focus(); else canvas.focus(); last = 0; tick(); });
  $('#close-dialog').addEventListener('click', close);
  function fragment(id) { return document.getElementById(id)?.content.cloneNode(true); }
  function showProject(id) {
    const template = document.getElementById('rpg-project-' + id); if (!template) return;
    project = id; read.add(id); syncURL(); show(template.dataset.name);
    button('Volver a ' + W.buildings.find(b => b.id === place).name, () => showPlace(place)).className = 'dialog-back';
    content.append(template.content.cloneNode(true)); updateDiscovery();
  }
  function showPlace(id) {
    const b = W.buildings.find(b => b.id === id); if (!b) return;
    place = id; project = ''; syncURL(); show(b.name);
    const tabs = document.createElement('nav'); tabs.className = 'book-tabs'; tabs.setAttribute('aria-label','Lugares del cuaderno'); content.append(tabs);
    W.buildings.forEach(area=>{const tab=button(area.name,()=>showPlace(area.id),tabs);if(area.id===id)tab.setAttribute('aria-current','true');});
    content.append(fragment('rpg-place-' + id));
    button(scene===id?'Seguir explorando la sala':'Visitar este edificio',()=>{close();if(scene!==id)enter(id);});
  }
  function showExtra(id, title) { show(title); content.append(fragment(id)); button('Volver al cuaderno', journal); }
  content.addEventListener('click', e => { const b = e.target.closest('[data-project]'); if (b) showProject(b.dataset.project); const reading=e.target.closest('[data-reading]'); if(reading)showExtra(reading.dataset.reading,reading.dataset.title); });
  function journal() {
    show('Cuaderno de viaje'); paragraph('El trabajo de Jorge, a tu ritmo. Puedes leerlo aquí o visitar cada edificio. No necesitas completar el juego para acceder a nada.');
    const list = document.createElement('div'); list.className = 'journal-list'; content.append(list);
    W.buildings.forEach(b => { const control = button(b.name, () => showPlace(b.id), list); const illustration=document.createElement('span');illustration.className='room-vignette room-'+b.id;illustration.setAttribute('aria-hidden','true');control.prepend(illustration); const s = document.createElement('small'); s.textContent = visited.has(b.id) ? 'Visitado' : 'Por descubrir'; control.append(s); });
    button('Trayectoria profesional', () => showExtra('exp-trajectory', 'Trayectoria profesional'));
    button('Herramientas de trabajo', () => showExtra('exp-skills', 'Herramientas de trabajo'));
    const contact = document.createElement('a'); contact.href = new URL('./#contacto', location.href).href; contact.textContent = 'Conversemos sobre tu proyecto'; content.append(contact);
  }
  function help() { show('Vamos a explorar'); paragraph('Camina con las flechas o WASD, o pulsa el suelo. En el teléfono, mantén presionadas las flechas. Ajusta la distancia con Acercar y Alejar.'); paragraph('Pulsa el nombre de un edificio para caminar hasta él. Plano del pueblo (M) muestra todos los destinos; una ruta punteada te guía. Puedes cancelarla o tomar el control con las flechas.'); paragraph('Acércate a alguien y pulsa E, Espacio o el botón de interacción. En cada sala hay materiales para consultar. Sal por la puerta de abajo. Cuaderno permite leer todo sin desplazarte. Pausar detiene el juego y la música; Escape cierra los diálogos.'); button('Entendido, vamos', close); }
  function startGame() {
    $('#pause').textContent = 'Pausar';
    started = true; paused = false; $('#welcome').hidden = true; $('#paused').hidden = true;
    $('#pause').hidden = false; $('#pause').textContent = 'Pausar'; $('#interact').hidden = false; $('.touch-pad').hidden = false;
    audioState(); canvas.focus(); last = 0;
  }
  function walkTo(goal, target = null, name = 'el punto marcado') {
    clearRoute(); route = W.findPath(player, goal, scene);
    if (!route.length) { if(target&&Math.hypot(target.x-player.x,target.y-player.y)<68)target.action();else announce('No hay un camino hasta ahí. Prueba sobre el sendero o usa el cuaderno.'); return; }
    afterWalk = target; routeName = name; $('#route-name').textContent = 'Hacia ' + name; $('#route-banner').hidden = false;
    announce('Caminando hacia ' + name + '. Usa las flechas o Cancelar para tomar el control.');
  }
  function travel(id) {
    const b = W.buildings.find(b => b.id === id); if (!b || !ready) return;
    returnFocus = canvas; if (dialog.open) close(); startGame(); if (scene !== 'outside') leave();
    const destination = { x: b.x, y: b.y + 30, action: () => enter(id) };
    walkTo({ x: b.x, y: b.y + 50 }, destination, placeNames[id][0]); tick();
  }
  function atlas() {
    show('El pueblo de Jorge', 'atlas'); paragraph('Elige un lugar. Caminaré contigo hasta su puerta.');
    const spread = document.createElement('div'); spread.className = 'atlas-spread'; content.append(spread);
    const map = document.createElement('canvas'); map.width = 800; map.height = 560; map.className = 'atlas-map'; map.setAttribute('aria-hidden', 'true'); spread.append(map);
    const paint = map.getContext('2d'); paint.imageSmoothingEnabled = false; paint.drawImage(overview, 0, 0, 800, 560);
    const list = document.createElement('div'); list.className = 'atlas-destinations'; spread.append(list);
    W.buildings.forEach((b, i) => {
      const x = b.x / 2, y = b.y / 2 + 12; paint.fillStyle = '#244a3c'; paint.beginPath(); paint.arc(x,y,16,0,Math.PI*2); paint.fill(); paint.strokeStyle = '#fff2cf'; paint.lineWidth = 2; paint.stroke(); paint.fillStyle = '#fff2cf'; paint.font = 'bold 18px "DM Sans"'; paint.textAlign = 'center'; paint.fillText(String(i+1),x,y+6);
      const item = button('', () => travel(b.id), list); item.dataset.destination = b.id; item.setAttribute('aria-label', 'Caminar a ' + b.name);
      const number = document.createElement('span'); number.className = 'atlas-number'; number.textContent = i+1; number.setAttribute('aria-hidden', 'true');
      const copy = document.createElement('span'), name = document.createElement('strong'), role = document.createElement('small'); name.textContent = placeNames[b.id][0]; role.textContent = placeNames[b.id][1] + (visited.has(b.id) ? ' · Visitado' : ''); copy.append(name, role); item.append(number, copy);
    });
    const p = scene === 'outside' ? player : W.buildings.find(b => b.id === scene); paint.fillStyle = '#ffefb0'; paint.fillRect(p.x/2-5,p.y/2-5,10,10); paint.strokeStyle = '#244a3c'; paint.strokeRect(p.x/2-5,p.y/2-5,10,10);
    paragraph('El punto claro eres tú. También puedes seguir a pie o consultar el cuaderno.', 'atlas-note');
  }
  function talk(npc) {
    place = npc.place; project = ''; syncURL(); show(npc.name, 'talk');
    const portrait = document.createElement('div'); portrait.className = 'dialog-portrait'; portrait.style.backgroundPositionX = `${npc.sprite / 3 * 100}%`; portrait.setAttribute('aria-hidden', 'true'); content.append(portrait);
    paragraph(npc.role, 'npc-role'); paragraph(messages[npc.place], 'npc-line');
    const choices = document.createElement('div'); choices.className = 'choices'; content.append(choices);
    button('Muéstrame el trabajo de Jorge', () => showPlace(npc.place), choices);
    button('Entrar a ' + W.buildings.find(b => b.id === npc.place).name, () => { close(); enter(npc.place); }, choices);
    button('Seguir caminando', close, choices);
    paragraph('Personaje ficticio del pueblo. Los proyectos y la trayectoria son reales.', 'guide-note');
  }
  function updateDiscovery() { $('#discovery').textContent = `${visited.size} de 5 lugares visitados`; }
  function enter(id) {
    if (!ready) { announce('El mapa aún no está disponible. Puedes leer todo el contenido en el cuaderno.'); return; }
    returnFocus = canvas;
    startGame();
    if (scene === 'outside') outsidePosition = { x: player.x, y: player.y };
    audioState(); scene = id; place = id; project = ''; visited.add(id); player.x = 320; player.y = 378; player.direction = 2; stopInput();
    $('#location-name').textContent = W.buildings.find(b => b.id === id).name; updateDiscovery(); syncURL(); announce('Entraste a ' + $('#location-name').textContent + '. Acércate a la mesa para explorar.'); canvas.focus(); resize(); last = 0; tick();
  }
  function leave() { scene = 'outside'; Object.assign(player, outsidePosition); player.direction = 0; stopInput(); announce('De vuelta en el pueblo.'); resize(); }
  function interactions() {
    if (scene === 'outside') return [...W.npcs.map(n => ({ ...n, kind: 'npc', label: 'Hablar con ' + n.name, action: () => talk(n) })), ...W.buildings.map(b => ({ x: b.x, y: b.y + 30, kind: 'door', label: 'Entrar: ' + b.name, action: () => enter(b.id) }))];
    return [
      { x: 320, y: 255, kind: 'exhibit', label: 'Explorar ' + W.buildings.find(b => b.id === scene).name, action: () => showPlace(scene) },
      { x: 115, y: 235, kind: 'exhibit', label: scene === 'puerto' ? 'Leer la trayectoria' : scene === 'escuela' ? 'Ver herramientas' : 'Leer los proyectos', action: () => scene === 'puerto' ? showExtra('exp-trajectory', 'Trayectoria profesional') : scene === 'escuela' ? showExtra('exp-skills', 'Herramientas de trabajo') : showPlace(scene) },
      { x: 510, y: 260, kind: 'npc', label: 'Hablar con ' + W.npcs.find(n => n.place === scene).name, action: () => talk(W.npcs.find(n => n.place === scene)) },
      { x: 320, y: 432, kind: 'exit', label: 'Salir al pueblo', action: leave }
    ];
  }
  function updateNearby() {
    nearby = interactions().map(i => ({ ...i, distance: Math.hypot(i.x - player.x, i.y - player.y) })).filter(i => i.distance < 65).sort((a,b) => a.distance - b.distance)[0];
    $('#interact').disabled = !nearby; $('#interact').textContent = nearby ? nearby.label : 'Acércate para interactuar';
    if (scene === 'outside') { const closest = [...W.buildings].sort((a,b) => Math.hypot(a.x-player.x,a.y-player.y)-Math.hypot(b.x-player.x,b.y-player.y))[0]; $('#location-name').textContent = closest.name; }
  }
  function interact() { if (started && !paused && !dialog.open && nearby) nearby.action(); }
  function audioState() { document.dispatchEvent(new CustomEvent('rpg:playstate',{detail:{playing:started&&!paused}})); }
  function pause(value = !paused) { paused = value; audioState(); stopInput(); $('#pause').textContent = paused ? 'Continuar' : 'Pausar'; $('#paused').hidden = !paused; last = 0; if (!paused) { canvas.focus(); tick(); } else { cancelAnimationFrame(frame); frame = 0; draw(); } }
  $('#overview').addEventListener('click', atlas);
  $('#cancel-route').addEventListener('click', () => { clearRoute(); canvas.focus(); announce('Recorrido cancelado. Puedes seguir caminando.'); });
  function changeZoom(delta) { if (scene !== 'outside') return; zoom = Math.max(.65, Math.min(1.35, Math.round((zoom + delta) * 100) / 100)); resize(); canvas.focus(); }
  $('#zoom-out').addEventListener('click', () => changeZoom(-.15)); $('#zoom-in').addEventListener('click', () => changeZoom(.15));
  $('#journal').addEventListener('click', journal); $('#help').addEventListener('click', help); $('#pause').addEventListener('click', () => pause()); $('#resume').addEventListener('click', () => pause(false)); $('#interact').addEventListener('click', interact);
  const directions = { arrowup: [0,-1], w:[0,-1], arrowdown:[0,1], s:[0,1], arrowleft:[-1,0], a:[-1,0], arrowright:[1,0], d:[1,0], up:[0,-1], down:[0,1], left:[-1,0], right:[1,0] };
  canvas.addEventListener('keydown', e => { const k = e.key.toLowerCase(); if (!started || paused || dialog.open) return; if (directions[k]) { e.preventDefault(); keys.add(k); clearRoute(); } else if (k === 'e' || k === ' ') { e.preventDefault(); if (!e.repeat) interact(); } else if (k === 'm') { e.preventDefault(); if (!e.repeat) atlas(); } else if (k === '+' || k === '=') { e.preventDefault(); changeZoom(.15); } else if (k === '-') { e.preventDefault(); changeZoom(-.15); } });
  window.addEventListener('keyup', e => keys.delete(e.key.toLowerCase()));
  canvas.addEventListener('blur', () => { keys.clear(); });
  window.addEventListener('blur', () => { if (started && !dialog.open) pause(true); else stopInput(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && started) pause(true); });
  document.querySelectorAll('[data-move]').forEach(b => {
    b.addEventListener('pointerdown', e => { if (!started || paused || dialog.open) return; e.preventDefault(); b.setPointerCapture(e.pointerId); keys.add(b.dataset.move); clearRoute(); });
    ['pointerup','pointercancel','lostpointercapture'].forEach(type => b.addEventListener(type, () => keys.delete(b.dataset.move)));
    b.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !paused) { e.preventDefault(); clearRoute(); keys.add(b.dataset.move); } });
    b.addEventListener('keyup', () => keys.delete(b.dataset.move)); b.addEventListener('blur', () => keys.delete(b.dataset.move));
  });
  canvas.addEventListener('pointerdown', e => {
    if (!started || paused || dialog.open) return; canvas.focus();
    const rect=canvas.getBoundingClientRect(), goal={x:(e.clientX-rect.left)/view.scale+Math.round(view.x),y:(e.clientY-rect.top)/view.scale+Math.round(view.y)};
    const target=interactions().find(i=>Math.hypot(goal.x-i.x,goal.y-i.y)<42 || (i.kind==='npc'&&Math.abs(goal.x-i.x)<24&&goal.y<i.y&&goal.y>i.y-60));
    const building=scene==='outside'&&W.buildings.find(b=>Math.abs(goal.x-b.x)<b.w*.42&&goal.y>b.y-b.h*.9&&goal.y<b.y+32);
    if (target) {
      if (Math.hypot(player.x-target.x,player.y-target.y)<65) { target.action(); return; }
      walkTo({x:target.x,y:target.y+35},target,target.label);
    } else if (building) travel(building.id);
    else walkTo(goal);
  });
  function resize() {
    const rect=canvas.getBoundingClientRect(), dpr=Math.min(devicePixelRatio||1,1.5);
    canvas.width=Math.round(rect.width*dpr); canvas.height=Math.round(rect.height*dpr);
    const scale=scene==='outside'?(rect.height<360?.65:rect.width<650?.75:.95)*zoom:Math.min(rect.width/640,rect.height/480);
    view={...view,scale,w:rect.width,h:rect.height,dpr}; cameraSnap=true;
    landmarkButtons.forEach(item=>{item.control.hidden=false;item.width=item.control.offsetWidth;item.height=item.control.offsetHeight;});
    $('#zoom-level').textContent=Math.round(zoom*100)+'%'; $('#zoom-out').disabled=scene!=='outside'||zoom<=.65; $('#zoom-in').disabled=scene!=='outside'||zoom>=1.35; draw();
  }
  window.addEventListener('resize', resize);
  const terrain=document.createElement('canvas'); terrain.width=W.width; terrain.height=W.height;
  const overview=document.createElement('canvas'); overview.width=W.width; overview.height=W.height;
  const ground=terrain.getContext('2d');
  function makeTerrain() {
    const g=ground; g.fillStyle='#6bb8c9'; g.fillRect(0,0,W.width,W.height);
    for(let y=0;y<W.height;y+=8) { const coast=W.coastX(y); g.fillStyle='#dcd496'; g.fillRect(coast-20,y,W.width-coast+20,8); g.fillStyle='#92b874'; g.fillRect(coast+25,y,W.width-coast-25,8); const river=W.riverX(y); g.fillStyle='#d9cf97';g.fillRect(river-52,y,104,8);g.fillStyle='#65abb8';g.fillRect(river-39,y,78,8); }
    let n=23; const rand=()=>((n=(n*1664525+1013904223)>>>0)/4294967296);
    for(let i=0;i<8200;i++) { const x=rand()*W.width,y=rand()*W.height; if(x<W.coastX(y)-25) {g.fillStyle='#a1d6d7';g.fillRect(x,y,6+rand()*18,2);} else if(x>W.coastX(y)+30&&Math.abs(x-W.riverX(y))>57){g.fillStyle=rand()<.5?'#85aa67':'#a3c381';g.fillRect(x,y,2+rand()*4,2);} }
    // Pixel-edged paths with staggered paving, baked once into the terrain.
    for(let y=0;y<W.height;y+=6)for(let x=0;x<W.width;x+=8){if(W.onPath(x,y,0)){g.fillStyle=W.onPath(x,y,-5)?((Math.floor(x/8)+Math.floor(y/6))%4?'#ddc799':'#ead4a6'):'#a78f67';g.fillRect(x,y,8,6);if(W.onPath(x,y,-6)){g.fillStyle='#c9b186';g.fillRect(x+(y%12?0:4),y,1,6);g.fillRect(x,y,8,1);}}}
    for(let i=0;i<1800;i++){const x=rand()*W.width,y=rand()*W.height;if(W.onPath(x,y,-6)){g.fillStyle=rand()<.5?'#d6b984':'#f1d7a5';g.fillRect(x,y,4,2);}}
    [370,710].forEach(y=>{const x=W.riverX(y);g.fillStyle='#574d3c';g.fillRect(x-66,y-46,132,92);g.fillStyle='#b88453';g.fillRect(x-65,y-39,130,78);for(let xx=x-61;xx<x+66;xx+=12){g.fillStyle='#ddb37a';g.fillRect(xx,y-38,9,76);}g.fillStyle='#6d5740';g.fillRect(x-75,y-48,150,6);g.fillRect(x-75,y+42,150,6);});
    // A small quay gives the coast an inhabited edge; it does not change collision geometry.
    g.fillStyle='#796242';g.fillRect(100,870,180,66);for(let x=104;x<280;x+=12){g.fillStyle='#c39c67';g.fillRect(x,874,9,58);}
  }
  function sprite(img,col,row,cols,rows,x,y,w,h,paint=ctx) {
    if(!img)return;const sw=img.width/cols,sh=img.height/rows;
    if(img===assets.props&&col===2&&row===1){const dw=w*289/sw,dh=h*376/sh;paint.drawImage(img,954,455,289,376,Math.round(x-dw/2),Math.round(y-dh),dw,dh);return;}
    paint.drawImage(img,col*sw,row*sh,sw,sh,Math.round(x-w/2),Math.round(y-h),w,h);
  }
  function label(text,x,y) {
    ctx.save();ctx.translate(x,y);ctx.scale(1/view.scale,1/view.scale);ctx.font='14px Pixelify, sans-serif';const width=ctx.measureText(text).width+16;ctx.fillStyle='#244a3c';ctx.fillRect(-width/2,-17,width,24);ctx.fillStyle='#fff2cf';ctx.textAlign='center';ctx.fillText(text,0,0);ctx.restore();
  }
  // Measured opaque bounds: generated sheets have unequal transparent gutters, not exact tiles.
  const npcRects=[[76,937,180,264],[391,930,185,272],[710,933,154,268],[1009,940,162,261]];
  const jorgeRects=[[79,30,201,288],[377,30,199,285],[671,30,201,289],[974,30,202,285],[80,332,193,291],[381,332,192,287],[682,332,187,291],[981,332,189,287],[71,636,201,278],[383,636,193,272],[673,636,199,278],[981,636,195,272],[81,924,190,290],[382,924,189,286],[680,924,190,291],[984,924,187,286]];
  function actor(p,isPlayer=false,paint=ctx) {
    const img=isPlayer?assets.jorge:assets.actors;if(!img)return;
    paint.fillStyle='#40563c40';paint.beginPath();paint.ellipse(p.x,p.y-3,isPlayer?17:13,5,0,0,Math.PI*2);paint.fill();
    const [sx,sy,sw,sh]=isPlayer?jorgeRects[player.direction*4+player.step]:npcRects[p.sprite],scale=isPlayer?.22:.205;
    paint.drawImage(img,sx,sy,sw,sh,Math.round(p.x-sw*scale/2),Math.round(p.y-sh*scale),sw*scale,sh*scale);
  }
  function groundTarget() {if(nearby&&started&&!dialog.open&&!paused){ctx.strokeStyle='#fff2cf';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(nearby.x,nearby.y+3,22,8,0,0,Math.PI*2);ctx.stroke();}}
  function drawRoute() {
    if(!route.length)return;
    ctx.save();ctx.strokeStyle='#244a3c';ctx.lineWidth=3/view.scale;ctx.setLineDash([2/view.scale,8/view.scale]);ctx.lineCap='round';ctx.beginPath();ctx.moveTo(player.x,player.y);route.forEach(p=>ctx.lineTo(p.x,p.y));ctx.stroke();ctx.setLineDash([]);
    const end=route[route.length-1];ctx.strokeStyle='#fff2cf';ctx.lineWidth=3/view.scale;ctx.beginPath();ctx.ellipse(end.x,end.y,12/view.scale,6/view.scale,0,0,Math.PI*2);ctx.stroke();ctx.restore();
  }
  function drawOutside(paint=ctx,whole=false) {
    paint.drawImage(terrain,0,0);
    if(!whole){
      if(started&&!reduced.matches){const phase=ambientTime;paint.fillStyle='#d1eee4';for(let y=60;y<W.height;y+=83){const x=42+(y%71)+Math.floor(Math.sin(phase*.6+y)*12);paint.fillRect(x,y,20,2);paint.fillRect(x+6,y+3,10,2);}}
      drawRoute();groundTarget();
    }
    const entities=[...W.trees.map(t=>({...t,type:'tree'})),...W.buildings.map(b=>({...b,type:'building'})),...W.npcs.map(n=>({...n,type:'npc'})),...(!whole?[{...player,type:'player'}]:[])].sort((a,b)=>a.y-b.y);
    entities.forEach(e=>{if(!whole&&(e.x+(e.w||80)<view.x||e.x-(e.w||80)>view.x+view.w/view.scale||e.y<view.y||e.y-(e.h||90)>view.y+view.h/view.scale))return;
      if(e.type==='tree')sprite(assets.props,e.sprite,0,4,2,e.x,e.y,e.w,e.h,paint);
      if(e.type==='building')sprite(assets.buildings,e.sprite%3,Math.floor(e.sprite/3),3,2,e.x,e.y,e.w,e.h,paint);
      if(e.type==='npc'){actor(e,false,paint);if(!whole&&started&&Math.hypot(e.x-player.x,e.y-player.y)<145)label(e.name,e.x,e.y-68);}
      if(e.type==='player')actor(player,true,paint);
    });
  }
  function positionLabels() {
    const game=canvas.getBoundingClientRect(),occupied=[];
    ['.location','.camera-controls','#overview','#route-banner','.game-bottom','.touch-pad'].forEach(selector=>{
      const el=$(selector);if(el.getClientRects().length){const r=el.getBoundingClientRect();occupied.push({left:r.left-game.left-8,right:r.right-game.left+8,top:r.top-game.top-8,bottom:r.bottom-game.top+8});}
    });
    [player,...W.npcs].forEach(p=>{const x=(p.x-Math.round(view.x))*view.scale,y=(p.y-Math.round(view.y))*view.scale;occupied.push({left:x-24*view.scale,right:x+24*view.scale,top:y-66*view.scale,bottom:y+6*view.scale});});
    landmarkButtons.forEach(({b,control,width,height})=>{
      const x=(b.x-Math.round(view.x))*view.scale,feet=(b.y-Math.round(view.y))*view.scale,roof=feet-b.h*.78*view.scale,left=x-width/2,top=roof-height;
      const visible=x+b.w*.42*view.scale>0&&x-b.w*.42*view.scale<view.w&&feet>0&&roof<view.h;
      const candidates=[[left,top],[left,Math.max(10,top)],[left,feet+10],[x+b.w*.45*view.scale+8,roof],[x-b.w*.45*view.scale-width-8,roof]];
      const rect=visible&&candidates.map(([left,top])=>({left,top,right:left+width,bottom:top+height})).find(r=>r.left>=10&&r.right<=view.w-10&&r.top>=10&&r.bottom<=view.h-10&&!occupied.some(o=>r.left<o.right&&r.right>o.left&&r.top<o.bottom&&r.bottom>o.top));
      control.hidden=!ready||!started||paused||dialog.open||scene!=='outside'||!rect;
      if(!control.hidden){control.style.left=Math.round(rect.left)+'px';control.style.top=Math.round(rect.top)+'px';occupied.push(rect);}
    });
  }
  function drawInside() {
    const room=W.buildings.find(b=>b.id===scene).sprite,sw=assets.rooms.width/3,sh=assets.rooms.height/2;
    ctx.drawImage(assets.rooms,(room%3)*sw,Math.floor(room/3)*sh,sw,sh,0,0,640,480);
    ctx.fillStyle='#4d604f';ctx.fillRect(288,418,64,28);
    drawRoute();
    groundTarget();
    sprite(assets.props,2,1,4,2,115,228,115,135);sprite(assets.props,scene==='observatorio'?3:1,1,4,2,320,236,145,125);
    const npc={...W.npcs.find(n=>n.place===scene),x:510,y:260}; actor(npc);label(npc.name,510,195);
    label(scene==='escuela'?'Programas y formación':scene==='puerto'?'Hitos del recorrido':'Mesa de proyectos',320,104);
    label('Salida',320,469);
    actor(player,true);
  }
  function draw(dt=0) {
    if(!ctx)return;ctx.setTransform(view.dpr||1,0,0,view.dpr||1,0,0);ctx.fillStyle=scene==='outside'?'#92b874':'#304941';ctx.fillRect(0,0,view.w,view.h);
    const vw=view.w/view.scale,vh=view.h/view.scale;
    if(scene==='outside'){Object.assign(view,W.camera(view,player,dt,cameraSnap||reduced.matches));cameraSnap=false;}
    else{view.x=(640-vw)/2;view.y=(480-vh)/2;}
    ctx.scale(view.scale,view.scale);ctx.translate(-Math.round(view.x),-Math.round(view.y));ctx.imageSmoothingEnabled=false;
    if(scene==='outside'){ctx.fillStyle='#6bb8c9';ctx.fillRect(view.x,view.y,Math.max(0,-view.x),vh);drawOutside();}else if(ready)drawInside();
    const mini=$('#world-minimap'),map=mini.getContext('2d'),ratio=mini.width/W.width;map.imageSmoothingEnabled=false;map.drawImage(ready?overview:terrain,0,0,mini.width,mini.height);
    if(scene==='outside'){map.strokeStyle='#fff2cf';map.lineWidth=1.5;map.strokeRect(Math.max(0,view.x)*ratio,Math.max(0,view.y)*ratio,Math.min(vw,W.width)*ratio,Math.min(vh,W.height)*ratio);}
    if(scene==='outside'&&route.length){
      map.beginPath();map.moveTo(player.x*ratio,player.y*ratio);route.forEach(p=>map.lineTo(p.x*ratio,p.y*ratio));map.strokeStyle='#244a3c';map.lineWidth=6;map.stroke();map.strokeStyle='#fff2cf';map.lineWidth=3;map.stroke();
      const end=route[route.length-1];map.fillStyle='#b8432e';map.strokeStyle='#fff2cf';map.lineWidth=2;map.beginPath();map.arc(end.x*ratio,end.y*ratio,7,0,Math.PI*2);map.fill();map.stroke();
    }
    const point=scene==='outside'?player:W.buildings.find(b=>b.id===scene);map.fillStyle='#203e3a';map.fillRect(point.x*ratio-4,point.y*ratio-4,8,8);map.fillStyle='#fff9d6';map.fillRect(point.x*ratio-2,point.y*ratio-2,4,4);
    positionLabels();
    // Observable play state supports regression checks without exposing mutable game internals.
    canvas.dataset.x=player.x.toFixed(1);canvas.dataset.y=player.y.toFixed(1);canvas.dataset.scene=scene;canvas.dataset.direction=player.direction;canvas.dataset.paused=String(paused);canvas.dataset.route=route.length;canvas.dataset.scale=view.scale.toFixed(3);canvas.dataset.cameraX=Math.round(view.x);canvas.dataset.cameraY=Math.round(view.y);
  }
  function tick(time=0) {
    if(frame){cancelAnimationFrame(frame);frame=0;}if(!ready||!started||paused||document.hidden||dialog.open){draw();return;}
    const dt=last?Math.min((time-last)/1000,.05):0;last=time;ambientTime+=dt;let dx=0,dy=0;
    keys.forEach(k=>{const d=directions[k];if(d){dx+=d[0];dy+=d[1];}});
    if(!dx&&!dy&&route.length){const next=route[0],distance=Math.hypot(next.x-player.x,next.y-player.y);if(distance<3){route.shift();}else{dx=next.x-player.x;dy=next.y-player.y;}}
    moving=W.move(player,dx,dy,Math.min(dt,route.length?Math.hypot(dx,dy)/155:dt),scene);
    if(dx||dy)player.direction=Math.abs(dx)>Math.abs(dy)?(dx>0?1:3):(dy>0?0:2);
    if(moving){walkingTime+=dt;player.step=reduced.matches?1:Math.floor(walkingTime*9)%4;}else player.step=1;
    if(!route.length&&routeName){const action=afterWalk;clearRoute();if(action&&Math.hypot(action.x-player.x,action.y-player.y)<68)action.action();}
    updateNearby();draw(dt);if(!dialog.open&&!paused)frame=requestAnimationFrame(tick);
  }
  $('#start').addEventListener('click',()=>{startGame();announce('Estás en el puerto. Pulsa un lugar o abre el plano para elegir destino.');tick();});
  if(!ctx||!W){$('#loading').textContent='No se pudo abrir el mapa. Usa el índice para consultar el portafolio.';return;}
  makeTerrain();resize();$('#journal').hidden=false;$('#help').hidden=false;
  document.fonts.ready.then(resize);
  const params=new URLSearchParams(location.search);if(W.buildings.some(b=>b.id===params.get('lugar'))){place=params.get('lugar');const b=W.buildings.find(b=>b.id===place);player.x=b.x;player.y=b.y+60;outsidePosition={x:player.x,y:player.y};}
  Promise.all(['buildings','actors','props','jorge','rooms'].map(name=>new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>{assets[name]=img;resolve();};img.onerror=()=>reject(new Error(name));img.src=$('.game').dataset.assets+'rpg-'+name+'.png';}))).then(()=>{
    ready=true;const paint=overview.getContext('2d');paint.imageSmoothingEnabled=false;drawOutside(paint,true);cameraSnap=true;$('#overview').disabled=false;$('#loading').textContent='Camina libremente o elige un destino en el plano.';$('#start').hidden=false;$('#start').disabled=false;draw();
    if(params.get('proyecto')&&document.getElementById('project-'+params.get('proyecto')))showProject(params.get('proyecto'));
  }).catch(()=>{$('#loading').textContent='Una ilustración no pudo cargar. Recarga la página o abre el cuaderno para explorar el contenido.';$('#start').hidden=true;});
})();
