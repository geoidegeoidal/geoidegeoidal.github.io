(() => {
 const trigger=document.querySelector('#secret-trigger'),dialog=document.querySelector('#snake-dialog'),canvas=document.querySelector('#snake-board'),ctx=canvas.getContext('2d');
 if(!dialog.showModal||!ctx)return;
 const status=document.querySelector('#snake-status'),start=document.querySelector('#snake-start'),pause=document.querySelector('#arcade-pause');
 const stages=[{name:'Andes',color:'#e9bd83',bg:'#171e32'},{name:'Pacífico',color:'#64d9d1',bg:'#092c3b'},{name:'Órbita',color:'#c7a1ff',bg:'#19162e'}];
 let stage=0,score=0,lives=3,x=200,t=0,fire=0,enemyFire=0,enemies=[],shots=[],hazards=[],running=false,paused=false,frame,last=0,invincible=0,transition=0;
 const keys=new Set();let touch=0;
 function hud(){document.querySelector('#arcade-stage').textContent=`${stages[stage].name} · ${stage+1}/3`;document.querySelector('#arcade-score').textContent=`${score} puntos`;document.querySelector('#arcade-lives').textContent=`${lives} vidas`;}
 function formation(){enemies=[];for(let r=0;r<3;r++)for(let c=0;c<6;c++)enemies.push({base:65+c*54,row:r,x:65+c*54,y:48+r*34,phase:c+r,diving:false});shots=[];hazards=[];t=0;enemyFire=0;transition=0;hud();}
 function reset(){cancelAnimationFrame(frame);stage=0;score=0;lives=3;x=200;fire=0;invincible=0;running=false;paused=false;touch=0;keys.clear();formation();pause.disabled=true;pause.textContent='Pausar';start.textContent='Jugar';draw();}
 function ship(px,py,color,enemy=false){ctx.fillStyle=color;ctx.beginPath();if(enemy){ctx.moveTo(px-12,py-5);ctx.lineTo(px-6,py+7);ctx.lineTo(px,py+2);ctx.lineTo(px+6,py+7);ctx.lineTo(px+12,py-5);ctx.lineTo(px+4,py-2);ctx.lineTo(px,py-8);ctx.lineTo(px-4,py-2);}else{ctx.moveTo(px,py-14);ctx.lineTo(px+5,py-2);ctx.lineTo(px+14,py+8);ctx.lineTo(px+4,py+5);ctx.lineTo(px,py+10);ctx.lineTo(px-4,py+5);ctx.lineTo(px-14,py+8);ctx.lineTo(px-5,py-2);}ctx.closePath();ctx.fill();ctx.fillStyle='#fff8d9';ctx.fillRect(px-2,py-3,4,4);}
 function draw(){const s=stages[stage];ctx.fillStyle=s.bg;ctx.fillRect(0,0,400,440);ctx.strokeStyle=stage===1?'#235e6b':'#34364c';ctx.lineWidth=1;
  if(stage===0){for(let j=0;j<5;j++){ctx.beginPath();ctx.moveTo(0,390-j*42);for(let i=0;i<=400;i+=40)ctx.lineTo(i,350-j*42-Math.sin(i*.025+j)*35);ctx.stroke();}}
  else if(stage===1){for(let j=0;j<10;j++){ctx.beginPath();for(let i=0;i<=400;i+=10)ctx.lineTo(i,j*48+Math.sin(i*.025+t)*9);ctx.stroke();}}
  else{for(let i=0;i<55;i++){ctx.fillStyle=i%3?'#657087':'#bfc7d5';ctx.fillRect((i*137)%400,(i*71)%440,2,2);}ctx.strokeStyle='#3a5366';for(let r=35;r<130;r+=25){ctx.beginPath();ctx.ellipse(320,340,r,r*.6,-.4,0,7);ctx.stroke();}}
  for(const e of enemies)ship(e.x,e.y,s.color,true);
  ctx.fillStyle='#e8f39e';for(const p of shots)ctx.fillRect(p.x-2,p.y-7,4,12);
  ctx.fillStyle='#ff956c';for(const p of hazards){ctx.beginPath();ctx.arc(p.x,p.y,4,0,7);ctx.fill();}
  ship(x,403,invincible>0?'#8daea6':'#d6de59');
  if(transition>0){ctx.fillStyle='#101a2be8';ctx.fillRect(35,180,330,72);ctx.fillStyle='#f3f0e7';ctx.font='18px sans-serif';ctx.textAlign='center';ctx.fillText('Sector despejado',200,211);ctx.font='13px sans-serif';ctx.fillText('Preparando el siguiente destino…',200,235);}
 }
 function end(won){running=false;cancelAnimationFrame(frame);keys.clear();touch=0;pause.disabled=true;start.textContent='Volver a jugar';status.textContent=won?`¡Misión completa! Andes, Pacífico y órbita: ${score} puntos.`:`Fin de misión. ${score} puntos. ¿Otra expedición?`;}
 function hit(){if(invincible>0)return;lives--;invincible=1.8;hud();if(!lives)end(false);}
 function update(dt){t+=dt;invincible=Math.max(0,invincible-dt);const move=(keys.has('arrowright')||keys.has('d')?1:0)-(keys.has('arrowleft')||keys.has('a')?1:0)+touch;x=Math.max(18,Math.min(382,x+Math.sign(move)*240*dt));
  if(transition>0){transition-=dt;if(transition<=0){stage++;formation();status.textContent=`Etapa ${stage+1}: ${stages[stage].name}.`; }return;}
  fire+=dt;if(fire>.22){shots.push({x,y:385});fire=0;}
  enemyFire+=dt;if(enemyFire>Math.max(.36,.9-stage*.22)&&enemies.length){const e=enemies[Math.floor(Math.random()*enemies.length)];hazards.push({x:e.x,y:e.y,vx:stage===2?(x-e.x)*.4:0});enemyFire=0;}
  for(const e of enemies){if(!e.diving){e.x=e.base+Math.sin(t*1.4+e.row*.6)*24;e.y=48+e.row*34+Math.sin(t*2+e.phase)*5;if(t>2&&Math.random()<dt*(.04+stage*.025)){e.diving=true;e.dx=(x-e.x)/2;}}else{e.y+=(65+stage*20)*dt;e.x+=Math.sin(t*3+e.phase)*45*dt+e.dx*dt;if(e.y>430){e.diving=false;e.y=48+e.row*34;}}if(Math.hypot(e.x-x,e.y-403)<23)hit();}
  for(const p of shots)p.y-=340*dt;
  for(const p of hazards){p.y+=(130+stage*30)*dt;p.x+=p.vx*dt;if(Math.hypot(p.x-x,p.y-403)<14){p.y=500;hit();}}
  for(const p of shots){const i=enemies.findIndex(e=>Math.abs(e.x-p.x)<14&&Math.abs(e.y-p.y)<12);if(i!==-1){enemies.splice(i,1);p.y=-50;score+=100*(stage+1);hud();}}
  shots=shots.filter(p=>p.y>-10);hazards=hazards.filter(p=>p.y<455);
  if(!enemies.length&&running){if(stage===2)end(true);else{transition=1.8;hazards=[];shots=[];status.textContent='Sector despejado.';}}
 }
 function loop(now){if(!running||paused||!dialog.open)return;const dt=Math.min((now-last)/1000,.025);last=now;update(dt);draw();if(running)frame=requestAnimationFrame(loop);}
 function setPause(value){if(!running)return;paused=value;cancelAnimationFrame(frame);keys.clear();touch=0;pause.textContent=paused?'Continuar':'Pausar';status.textContent=paused?'Misión en pausa.':'Esquiva los disparos y despeja la formación.';if(!paused){last=performance.now();frame=requestAnimationFrame(loop);}}
 trigger.hidden=false;trigger.addEventListener('click',()=>{reset();dialog.showModal();status.textContent='Pulsa Jugar. Tu nave dispara automáticamente.';start.focus();});
 start.addEventListener('click',()=>{reset();running=true;pause.disabled=false;start.textContent='Reiniciar';status.textContent='Etapa 1: Andes. Despeja la formación.';last=performance.now();frame=requestAnimationFrame(loop);});
 pause.addEventListener('click',()=>setPause(!paused));document.querySelector('#snake-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{running=false;cancelAnimationFrame(frame);keys.clear();touch=0;trigger.focus();});
 dialog.addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(['arrowleft','arrowright','a','d'].includes(k)){e.preventDefault();keys.add(k);}if(e.code==='Space'&&running){e.preventDefault();if(!e.repeat)setPause(!paused);}});dialog.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
 dialog.querySelectorAll('[data-move]').forEach(b=>{b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);touch=Number(b.dataset.move);});for(const name of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(name,()=>touch=0);});
 window.addEventListener('blur',()=>setPause(true));document.addEventListener('visibilitychange',()=>{if(document.hidden)setPause(true);});
})();
