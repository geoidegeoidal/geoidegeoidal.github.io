(function () {
  'use strict';
  const W = window.PortfolioWorld, canvas = document.querySelector('#world'), ctx = canvas.getContext('2d');
  if (!W || !ctx) { document.querySelector('#loading').textContent = 'No se pudo abrir el mapa. Usa el índice para consultar el portafolio.'; return; }
  const $ = s => document.querySelector(s), assets = {}, keys = new Set(), visited = new Set(), read = new Set();
  const player = { x: 430, y: 790, direction: 0, step: 1 };
  const dialog = $('#conversation'), content = $('#dialog-content'), status = $('#world-status');
  let ready = false, started = false, paused = false, scene = 'outside', place = 'puerto', project = '';
  let last = 0, frame = 0, route = [], afterWalk = null, moving = false, walkingTime = 0, nearby = null, returnFocus = null;
  let view = { x: 0, y: 0, scale: 1, w: 800, h: 600 }, outsidePosition = { x: 430, y: 790 };
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
  function stopInput() { keys.clear(); route = []; afterWalk = null; moving = false; }
  function syncURL() {
    const url = new URL(location.href); url.searchParams.set('lugar', place);
    if (project) url.searchParams.set('proyecto', project); else url.searchParams.delete('proyecto');
    history.replaceState(null, '', url); const terminal = new URL($('#terminal-link').href); terminal.search = url.search; $('#terminal-link').href = terminal.href;
  }
  function announce(text) { status.textContent = text; }
  function show(title) {
    stopInput(); if (!dialog.open) returnFocus = document.activeElement;
    $('#conversation-title').textContent = title; content.replaceChildren();
    if (!dialog.open) dialog.showModal(); $('#close-dialog').focus(); draw();
  }
  function close() { dialog.close(); }
  dialog.addEventListener('close', () => { stopInput(); if (returnFocus?.isConnected) returnFocus.focus(); else canvas.focus(); last = 0; tick(); });
  $('#close-dialog').addEventListener('click', close);
  function fragment(id) { return document.getElementById(id)?.content.cloneNode(true); }
  function showProject(id) {
    const template = document.getElementById('project-' + id); if (!template) return;
    project = id; read.add(id); syncURL(); show(template.dataset.name);
    button('Volver a ' + W.buildings.find(b => b.id === place).name, () => showPlace(place)).className = 'dialog-back';
    content.append(template.content.cloneNode(true)); updateDiscovery();
  }
  function showPlace(id) {
    const b = W.buildings.find(b => b.id === id); if (!b) return;
    place = id; project = ''; syncURL(); show(b.name); content.append(fragment('place-' + id));
    if (id === 'puerto') button('Leer trayectoria aquí', () => showExtra('exp-trajectory', 'Trayectoria profesional'));
    if (id === 'escuela') button('Ver las herramientas de trabajo', () => showExtra('exp-skills', 'Herramientas de trabajo'));
    button('Visitar este edificio', () => { close(); enter(id); });
  }
  function showExtra(id, title) { show(title); content.append(fragment(id)); button('Volver al cuaderno', journal); }
  content.addEventListener('click', e => { const b = e.target.closest('[data-project]'); if (b) showProject(b.dataset.project); });
  function journal() {
    show('Cuaderno de viaje'); paragraph('El trabajo de Jorge, a tu ritmo. Puedes leerlo aquí o visitar cada edificio. No necesitas completar el juego para acceder a nada.');
    const list = document.createElement('div'); list.className = 'journal-list'; content.append(list);
    W.buildings.forEach(b => { const control = button(b.name, () => showPlace(b.id), list); const s = document.createElement('small'); s.textContent = visited.has(b.id) ? 'Visitado' : 'Por descubrir'; control.append(s); });
    button('Trayectoria profesional', () => showExtra('exp-trajectory', 'Trayectoria profesional'));
    button('Herramientas de trabajo', () => showExtra('exp-skills', 'Herramientas de trabajo'));
    const contact = document.createElement('a'); contact.href = new URL('./#contacto', location.href).href; contact.textContent = 'Conversemos sobre tu proyecto'; content.append(contact);
  }
  function help() { show('Vamos a explorar'); paragraph('Camina con las flechas o WASD. También puedes pulsar el suelo: Jorge buscará un camino. En el teléfono, mantén presionadas las flechas.'); paragraph('Acércate a una persona o a una puerta y pulsa E, Espacio o el botón de interacción. Dentro de cada edificio hay materiales para consultar. Sal por la puerta de abajo.'); paragraph('Cuaderno te lleva directamente al contenido. Pausar detiene el juego; al cambiar de pestaña también se pausa. Escape cierra una conversación.'); button('Entendido, vamos', close); }
  function talk(npc) {
    place = npc.place; project = ''; syncURL(); show(npc.name);
    const portrait = document.createElement('div'); portrait.className = 'dialog-portrait'; portrait.style.backgroundPositionX = `${npc.sprite / 3 * 100}%`; portrait.setAttribute('aria-hidden', 'true'); content.append(portrait);
    paragraph(npc.role, 'npc-role'); paragraph(messages[npc.place]);
    const choices = document.createElement('div'); choices.className = 'choices'; content.append(choices);
    button('Muéstrame el trabajo de Jorge', () => showPlace(npc.place), choices);
    button('Entrar a ' + W.buildings.find(b => b.id === npc.place).name, () => { close(); enter(npc.place); }, choices);
    button('Seguir caminando', close, choices);
    paragraph('Personaje ficticio del pueblo. Los proyectos y la trayectoria son reales.', 'guide-note');
  }
  function updateDiscovery() { $('#discovery').textContent = `${visited.size} de 5 lugares visitados`; }
  function enter(id) {
    if (!ready) { announce('El mapa aún no está disponible. Puedes leer todo el contenido en el cuaderno.'); return; }
    started = true; paused = false; $('#welcome').hidden = true; $('#paused').hidden = true; $('#pause').hidden = false; $('#pause').textContent = 'Pausar'; $('#interact').hidden = false; $('.touch-pad').hidden = false;
    if (scene === 'outside') outsidePosition = { x: player.x, y: player.y };
    scene = id; place = id; project = ''; visited.add(id); player.x = 320; player.y = 378; player.direction = 2; stopInput();
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
  function pause(value = !paused) { paused = value; stopInput(); $('#pause').textContent = paused ? 'Continuar' : 'Pausar'; $('#paused').hidden = !paused; last = 0; if (!paused) { canvas.focus(); tick(); } else { cancelAnimationFrame(frame); frame = 0; draw(); } }
  $('#journal').addEventListener('click', journal); $('#help').addEventListener('click', help); $('#pause').addEventListener('click', () => pause()); $('#resume').addEventListener('click', () => pause(false)); $('#interact').addEventListener('click', interact);
  const directions = { arrowup: [0,-1], w:[0,-1], arrowdown:[0,1], s:[0,1], arrowleft:[-1,0], a:[-1,0], arrowright:[1,0], d:[1,0], up:[0,-1], down:[0,1], left:[-1,0], right:[1,0] };
  canvas.addEventListener('keydown', e => { const k = e.key.toLowerCase(); if (!started || paused || dialog.open) return; if (directions[k]) { e.preventDefault(); keys.add(k); route=[]; afterWalk=null; } else if (k === 'e' || k === ' ') { e.preventDefault(); if (!e.repeat) interact(); } });
  window.addEventListener('keyup', e => keys.delete(e.key.toLowerCase()));
  canvas.addEventListener('blur', () => { keys.clear(); });
  window.addEventListener('blur', () => { if (started && !dialog.open) pause(true); else stopInput(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && started) pause(true); });
  document.querySelectorAll('[data-move]').forEach(b => {
    b.addEventListener('pointerdown', e => { if (!started || paused || dialog.open) return; e.preventDefault(); b.setPointerCapture(e.pointerId); keys.add(b.dataset.move); route=[]; afterWalk=null; });
    ['pointerup','pointercancel','lostpointercapture'].forEach(type => b.addEventListener(type, () => keys.delete(b.dataset.move)));
    b.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !paused) { e.preventDefault(); keys.add(b.dataset.move); } });
    b.addEventListener('keyup', () => keys.delete(b.dataset.move)); b.addEventListener('blur', () => keys.delete(b.dataset.move));
  });
  canvas.addEventListener('pointerdown', e => {
    if (!started || paused || dialog.open) return; canvas.focus();
    const rect=canvas.getBoundingClientRect(), goal={x:(e.clientX-rect.left)/view.scale+view.x,y:(e.clientY-rect.top)/view.scale+view.y};
    const target=interactions().find(i=>Math.hypot(goal.x-i.x,goal.y-i.y)<42 || (i.kind==='npc'&&Math.abs(goal.x-i.x)<24&&goal.y<i.y&&goal.y>i.y-60));
    if (target) {
      if (Math.hypot(player.x-target.x,player.y-target.y)<65) { target.action(); return; }
      route=W.findPath(player,{x:target.x,y:target.y+35},scene); afterWalk=target;
    } else { route=W.findPath(player,goal,scene); afterWalk=null; }
    if (!route.length) announce('No hay un camino hasta ahí. Prueba sobre el sendero o usa el cuaderno.');
  });
  function resize() {
    const rect=canvas.getBoundingClientRect(), dpr=Math.min(devicePixelRatio||1,1.5);
    canvas.width=Math.round(rect.width*dpr); canvas.height=Math.round(rect.height*dpr);
    const scale=scene==='outside'?(rect.width<650?1.45:1.7):Math.min(rect.width/640,rect.height/480);
    view={...view,scale,w:rect.width,h:rect.height,dpr}; draw();
  }
  window.addEventListener('resize', resize);
  const terrain=document.createElement('canvas'); terrain.width=W.width; terrain.height=W.height;
  const ground=terrain.getContext('2d');
  function makeTerrain() {
    const g=ground; g.fillStyle='#6bb8c9'; g.fillRect(0,0,W.width,W.height);
    for(let y=0;y<W.height;y+=8) { const coast=W.coastX(y); g.fillStyle='#dcd496'; g.fillRect(coast-20,y,W.width-coast+20,8); g.fillStyle='#92b874'; g.fillRect(coast+25,y,W.width-coast-25,8); const river=W.riverX(y); g.fillStyle='#d9cf97';g.fillRect(river-52,y,104,8);g.fillStyle='#65abb8';g.fillRect(river-39,y,78,8); }
    let n=23; const rand=()=>((n=(n*1664525+1013904223)>>>0)/4294967296);
    for(let i=0;i<8200;i++) { const x=rand()*W.width,y=rand()*W.height; if(x<W.coastX(y)-25) {g.fillStyle='#a1d6d7';g.fillRect(x,y,6+rand()*18,2);} else if(x>W.coastX(y)+30&&Math.abs(x-W.riverX(y))>57){g.fillStyle=rand()<.5?'#85aa67':'#a3c381';g.fillRect(x,y,2+rand()*4,2);} }
    g.lineCap='round'; W.paths.forEach(p=>{g.strokeStyle='#bfa478';g.lineWidth=p[4]+6;g.beginPath();g.moveTo(p[0],p[1]);g.lineTo(p[2],p[3]);g.stroke();g.strokeStyle='#e6c894';g.lineWidth=p[4];g.stroke();});
    for(let i=0;i<1800;i++){const x=rand()*W.width,y=rand()*W.height;if(W.onPath(x,y,-6)){g.fillStyle=rand()<.5?'#d6b984':'#f1d7a5';g.fillRect(x,y,4,2);}}
    [370,710].forEach(y=>{const x=W.riverX(y);g.fillStyle='#574d3c';g.fillRect(x-66,y-46,132,92);g.fillStyle='#b88453';g.fillRect(x-65,y-39,130,78);for(let xx=x-61;xx<x+66;xx+=12){g.fillStyle='#ddb37a';g.fillRect(xx,y-38,9,76);}g.fillStyle='#6d5740';g.fillRect(x-75,y-48,150,6);g.fillRect(x-75,y+42,150,6);});
    // A small quay gives the coast an inhabited edge; it does not change collision geometry.
    g.fillStyle='#796242';g.fillRect(100,870,180,66);for(let x=104;x<280;x+=12){g.fillStyle='#c39c67';g.fillRect(x,874,9,58);}
  }
  function sprite(img,col,row,cols,rows,x,y,w,h) { if(!img)return;const sw=img.width/cols,sh=img.height/rows;ctx.drawImage(img,col*sw,row*sh,sw,sh,Math.round(x-w/2),Math.round(y-h),w,h); }
  function label(text,x,y,color='#fff2cf') {ctx.font='14px Pixelify, sans-serif';const width=ctx.measureText(text).width+18;ctx.fillStyle=color;ctx.fillRect(Math.round(x-width/2),y-18,width,25);ctx.fillStyle='#26382f';ctx.textAlign='center';ctx.fillText(text,x,y);}
  function actor(p,isPlayer=false) { ctx.fillStyle='#40563c40';ctx.beginPath();ctx.ellipse(p.x,p.y-4,isPlayer?17:13,5,0,0,Math.PI*2);ctx.fill();if(isPlayer)sprite(assets.jorge,player.step,player.direction,4,4,p.x,p.y,62,66);else sprite(assets.actors,p.sprite,3,4,4,p.x,p.y,53,61); }
  function drawOutside() {
    ctx.drawImage(terrain,0,0);
    const entities=[...W.trees.map(t=>({...t,type:'tree'})),...W.buildings.map(b=>({...b,type:'building'})),...W.npcs.map(n=>({...n,type:'npc'})),{...player,type:'player'}].sort((a,b)=>a.y-b.y);
    entities.forEach(e=>{if(e.x+e.w<view.x||e.x-(e.w||80)>view.x+view.w/view.scale||e.y<view.y||e.y-(e.h||90)>view.y+view.h/view.scale)return;
      if(e.type==='tree')sprite(assets.props,e.sprite,0,4,2,e.x,e.y,e.w,e.h);
      if(e.type==='building'){sprite(assets.buildings,e.sprite%3,Math.floor(e.sprite/3),3,2,e.x,e.y,e.w,e.h);label(e.name,e.x,e.y-e.h-5);}
      if(e.type==='npc'){actor(e);label(e.name,e.x,e.y-68);}
      if(e.type==='player')actor(player,true);
    });
  }
  function drawInside() {
    const accents={puerto:'#85b9bc',archivo:'#bb8f83',observatorio:'#9daabc',taller:'#bbab7c',escuela:'#a9bb87'};
    ctx.fillStyle='#304941';ctx.fillRect(0,0,640,480);ctx.fillStyle=accents[scene];ctx.fillRect(30,40,580,400);
    ctx.fillStyle='#e7c998';ctx.fillRect(48,124,544,314);
    for(let y=130;y<438;y+=25){ctx.fillStyle='#cda877';ctx.fillRect(48,y,544,2);for(let x=50+(y%2)*40;x<590;x+=100)ctx.fillRect(x,y,2,25);}
    ctx.fillStyle='#f7dfac';ctx.fillRect(48,102,544,22);ctx.fillStyle='#647f78';ctx.fillRect(70,52,90,45);ctx.fillRect(475,52,90,45);ctx.fillStyle='#b3d9d5';ctx.fillRect(76,58,78,32);ctx.fillRect(481,58,78,32);
    ctx.fillStyle='#b8674c';ctx.fillRect(251,264,138,145);ctx.fillStyle='#e4b476';ctx.fillRect(257,270,126,133);ctx.fillStyle='#b8674c';ctx.fillRect(266,279,108,115);
    sprite(assets.props,2,1,4,2,115,228,115,135);sprite(assets.props,scene==='observatorio'?3:1,1,4,2,320,236,145,125);
    const npc={...W.npcs.find(n=>n.place===scene),x:510,y:260}; actor(npc);label(npc.name,510,195);
    label(scene==='escuela'?'Programas y formación':scene==='puerto'?'Hitos del recorrido':'Mesa de proyectos',320,170);
    ctx.fillStyle='#4d604f';ctx.fillRect(288,418,64,28);label('Salida',320,469);
    actor(player,true);
  }
  function draw() {
    if(!ctx)return;ctx.setTransform(view.dpr||1,0,0,view.dpr||1,0,0);ctx.fillStyle='#304941';ctx.fillRect(0,0,view.w,view.h);
    const vw=view.w/view.scale,vh=view.h/view.scale;
    if(scene==='outside'){view.x=Math.max(0,Math.min(W.width-vw,player.x-vw/2));view.y=Math.max(0,Math.min(W.height-vh,player.y-vh/2));}
    else{view.x=(640-vw)/2;view.y=(480-vh)/2;}
    ctx.scale(view.scale,view.scale);ctx.translate(-Math.round(view.x),-Math.round(view.y));ctx.imageSmoothingEnabled=false;
    if(scene==='outside')drawOutside();else drawInside();
    if(route.length){const end=route[route.length-1];ctx.strokeStyle='#375e4c';ctx.lineWidth=2;ctx.strokeRect(end.x-6,end.y-4,12,8);}
    if(nearby&&started&&!dialog.open&&!paused){ctx.strokeStyle='#fff2cf';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(nearby.x,nearby.y+3,22,8,0,0,Math.PI*2);ctx.stroke();}
    // Expose observable play state on the canvas for regression checks and accessible tooling.
    canvas.dataset.x=player.x.toFixed(1);canvas.dataset.y=player.y.toFixed(1);canvas.dataset.scene=scene;canvas.dataset.direction=player.direction;canvas.dataset.paused=String(paused);canvas.dataset.route=route.length;
  }
  function tick(time=0) {
    if(frame){cancelAnimationFrame(frame);frame=0;}if(!ready||!started||paused||document.hidden||dialog.open){draw();return;}
    const dt=last?Math.min((time-last)/1000,.05):0;last=time;let dx=0,dy=0;
    keys.forEach(k=>{const d=directions[k];if(d){dx+=d[0];dy+=d[1];}});
    if(!dx&&!dy&&route.length){const next=route[0],distance=Math.hypot(next.x-player.x,next.y-player.y);if(distance<3){route.shift();}else{dx=next.x-player.x;dy=next.y-player.y;}}
    moving=W.move(player,dx,dy,Math.min(dt,route.length?Math.hypot(dx,dy)/155:dt),scene);
    if(dx||dy)player.direction=Math.abs(dx)>Math.abs(dy)?(dx>0?1:3):(dy>0?0:2);
    if(moving){walkingTime+=dt;player.step=reduced.matches?1:Math.floor(walkingTime*9)%4;}else player.step=1;
    if(!route.length&&afterWalk){const action=afterWalk;afterWalk=null;if(Math.hypot(action.x-player.x,action.y-player.y)<68)action.action();}
    updateNearby();draw();if(!dialog.open&&!paused)frame=requestAnimationFrame(tick);
  }
  $('#start').addEventListener('click',()=>{started=true;$('#welcome').hidden=true;$('#pause').hidden=false;$('#interact').hidden=false;$('.touch-pad').hidden=false;canvas.focus();announce('Estás en el puerto. Acércate a Nico o entra al faro.');tick();});
  if(!ctx||!W){$('#loading').textContent='No se pudo abrir el mapa. Usa el índice para consultar el portafolio.';return;}
  makeTerrain();resize();$('#journal').hidden=false;$('#help').hidden=false;
  const params=new URLSearchParams(location.search);if(W.buildings.some(b=>b.id===params.get('lugar'))){place=params.get('lugar');const b=W.buildings.find(b=>b.id===place);player.x=b.x;player.y=b.y+60;outsidePosition={x:player.x,y:player.y};}
  Promise.all(['buildings','actors','props','jorge'].map(name=>new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>{assets[name]=img;resolve();};img.onerror=()=>reject(new Error(name));img.src=$('.game').dataset.assets+'rpg-'+name+'.png';}))).then(()=>{
    ready=true;$('#loading').textContent='Camina, conversa y entra donde te dé curiosidad.';$('#start').hidden=false;$('#start').disabled=false;draw();
    if(params.get('proyecto')&&document.getElementById('project-'+params.get('proyecto')))showProject(params.get('proyecto'));
  }).catch(()=>{$('#loading').textContent='Una ilustración no pudo cargar. Recarga la página o abre el cuaderno para explorar el contenido.';$('#start').hidden=true;});
})();
