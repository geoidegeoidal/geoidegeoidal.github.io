(() => {
  const trigger = document.querySelector('#secret-trigger');
  const dialog = document.querySelector('#snake-dialog');
  if (!dialog.showModal) return;
  const canvas = document.querySelector('#snake-board'), ctx = canvas.getContext('2d');
  if (!ctx) return;
  const status = document.querySelector('#snake-status');
  const score = document.querySelector('#snake-score');
  const start = document.querySelector('#snake-start'), pause = document.querySelector('#snake-pause');
  const vectors = {up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
  let snake, food, direction, queued, timer, running = false, paused = false, points = 0;
  function stop() { clearInterval(timer); timer = null; }
  function spawn() {
    const free=[];
    for(let y=0;y<20;y++) for(let x=0;x<20;x++) if(!snake.some(p=>p[0]===x&&p[1]===y)) free.push([x,y]);
    return free[Math.floor(Math.random()*free.length)];
  }
  function draw() {
    ctx.fillStyle='#142922';ctx.fillRect(0,0,400,400);
    ctx.strokeStyle='#254036';ctx.lineWidth=1;
    for(let n=0;n<=400;n+=20){ctx.beginPath();ctx.moveTo(n,0);ctx.lineTo(n,400);ctx.moveTo(0,n);ctx.lineTo(400,n);ctx.stroke();}
    snake.forEach(([x,y],i)=>{ctx.fillStyle=i===0?'#f1f2b4':'#d6de59';ctx.fillRect(x*20+2,y*20+2,16,16);});
    if(food){ctx.fillStyle='#e88d42';ctx.beginPath();ctx.arc(food[0]*20+10,food[1]*20+10,6,0,Math.PI*2);ctx.fill();}
  }
  function reset(){stop();snake=[[8,10],[7,10],[6,10]];direction=[1,0];queued=null;points=0;score.textContent=0;food=spawn();running=false;paused=false;pause.disabled=true;pause.textContent='Pausar';draw();}
  function finish(message){stop();running=false;pause.disabled=true;status.textContent=message;start.textContent='Volver a jugar';}
  function tick(){
    if(queued){direction=queued;queued=null;}
    const head=[snake[0][0]+direction[0],snake[0][1]+direction[1]];
    const eating=head[0]===food[0]&&head[1]===food[1];
    const body=eating?snake:snake.slice(0,-1);
    if(head.some(v=>v<0||v>=20)||body.some(p=>p[0]===head[0]&&p[1]===head[1])){finish(`Fin del recorrido. ${points} puntos. ¿Otra vuelta?`);return;}
    snake.unshift(head);
    if(eating){points++;score.textContent=points;food=spawn();if(!food){draw();finish('¡Cartografiaste todo el tablero!');return;}}else snake.pop();
    draw();
  }
  function turn(name){const v=vectors[name];if(!running||paused||queued||!v)return;if(v[0]===-direction[0]&&v[1]===-direction[1])return;queued=v;}
  function setPause(value){if(!running)return;paused=value;stop();if(!paused)timer=setInterval(tick,150);pause.textContent=paused?'Continuar':'Pausar';status.textContent=paused?'En pausa. Tu ruta te espera.':'Recoge los puntos naranjas.';}
  trigger.hidden=false;
  trigger.addEventListener('click',()=>{reset();status.textContent='Pulsa Jugar para comenzar.';start.textContent='Jugar';dialog.showModal();start.focus();});
  document.querySelector('#snake-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{stop();running=false;trigger.focus();});
  start.addEventListener('click',()=>{reset();running=true;pause.disabled=false;start.textContent='Reiniciar';status.textContent='Recoge los puntos naranjas.';timer=setInterval(tick,150);});
  pause.addEventListener('click',()=>setPause(!paused));
  dialog.querySelectorAll('[data-direction]').forEach(b=>b.addEventListener('click',()=>turn(b.dataset.direction)));
  dialog.addEventListener('keydown',e=>{const key=e.key.toLowerCase();const name={arrowup:'up',w:'up',arrowdown:'down',s:'down',arrowleft:'left',a:'left',arrowright:'right',d:'right'}[key];if(name){e.preventDefault();turn(name);}else if(e.code==='Space'&&running){e.preventDefault();setPause(!paused);}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)setPause(true);});
})();
