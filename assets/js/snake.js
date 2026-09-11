(() => {
  const trigger=document.querySelector('#secret-trigger'), dialog=document.querySelector('#snake-dialog');
  const canvas=document.querySelector('#snake-board'), ctx=canvas.getContext('2d');
  if(!dialog.showModal||!ctx)return;
  const angle=document.querySelector('#golf-angle'),power=document.querySelector('#golf-power');
  const shot=document.querySelector('#snake-start'),status=document.querySelector('#snake-status');
  const courses=[{ball:[65,330],hole:[330,70],walls:[[175,140,30,155]]},{ball:[65,65],hole:[330,330],walls:[[120,20,25,230],[255,150,25,230]]},{ball:[60,340],hole:[340,60],walls:[[100,230,190,25],[100,100,25,130],[215,100,120,25]]}];
  let round=0,strokes=0,ball,velocity=[0,0],moving=false,won=false,frame,last=0;
  const radius=7;
  function labels(){document.querySelector('#golf-angle-value').textContent=angle.value+'°';document.querySelector('#golf-power-value').textContent=power.value+'%';}
  function draw(){
    ctx.fillStyle='#163e32';ctx.fillRect(0,0,400,400);
    ctx.strokeStyle='#2b5544';ctx.lineWidth=1;
    for(let r=35;r<500;r+=28){ctx.beginPath();ctx.ellipse(90,110,r,r*.7,.4,0,Math.PI*2);ctx.stroke();}
    ctx.strokeStyle='#8aa28a';ctx.lineWidth=3;ctx.strokeRect(12,12,376,376);
    for(const [x,y,w,h]of courses[round].walls){ctx.fillStyle='#708975';ctx.fillRect(x,y,w,h);}
    const [hx,hy]=courses[round].hole;ctx.fillStyle='#071b15';ctx.beginPath();ctx.arc(hx,hy,11,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#f0e8c5';ctx.beginPath();ctx.moveTo(hx,hy);ctx.lineTo(hx,hy-30);ctx.stroke();ctx.fillStyle='#e88d42';ctx.beginPath();ctx.moveTo(hx,hy-30);ctx.lineTo(hx+19,hy-23);ctx.lineTo(hx,hy-17);ctx.fill();
    if(!moving&&!won){const a=Number(angle.value)*Math.PI/180,l=25+Number(power.value)*.55;ctx.setLineDash([4,5]);ctx.strokeStyle='#d6de59';ctx.beginPath();ctx.moveTo(...ball);ctx.lineTo(ball[0]+Math.cos(a)*l,ball[1]+Math.sin(a)*l);ctx.stroke();ctx.setLineDash([]);}
    ctx.fillStyle='#f3f0e7';ctx.beginPath();ctx.arc(...ball,radius,0,Math.PI*2);ctx.fill();
  }
  function controls(){shot.disabled=moving;angle.disabled=moving;power.disabled=moving;}
  function load(){cancelAnimationFrame(frame);moving=false;won=false;ball=[...courses[round].ball];velocity=[0,0];angle.value=-45;power.value=50;labels();shot.textContent='Golpear';controls();document.querySelector('#golf-round').textContent=`Hoyo ${round+1} / 3`;document.querySelector('#snake-score').textContent=`${strokes} golpes`;status.textContent='Busca la bandera naranja.';draw();}
  function step(){
    for(let axis=0;axis<2;axis++){
      ball[axis]+=velocity[axis];
      if(ball[axis]<12+radius||ball[axis]>388-radius){ball[axis]=Math.max(12+radius,Math.min(388-radius,ball[axis]));velocity[axis]*=-.78;}
      for(const [x,y,w,h]of courses[round].walls){if(ball[0]+radius>x&&ball[0]-radius<x+w&&ball[1]+radius>y&&ball[1]-radius<y+h){ball[axis]=velocity[axis]>0?(axis===0?x:y)-radius:(axis===0?x+w:y+h)+radius;velocity[axis]*=-.78;}}
    }
    velocity=velocity.map(v=>v*.982);
    const h=courses[round].hole;
    if(Math.hypot(ball[0]-h[0],ball[1]-h[1])<11&&Math.hypot(...velocity)<4){ball=[...h];moving=false;won=true;status.textContent=round===2?`¡Recorrido completo! ${strokes} golpes. ¿Puedes mejorarlo?`:'¡Dentro! Vamos al siguiente hoyo.';shot.textContent=round===2?'Volver a jugar':'Siguiente hoyo';controls();}
    else if(Math.hypot(...velocity)<.08){moving=false;status.textContent='Ajusta el siguiente golpe.';controls();}
  }
  function animate(now){if(!moving||!dialog.open)return;const elapsed=Math.min(now-last,50);last=now;for(let i=0;i<Math.max(1,Math.round(elapsed/(1000/60)));i++)if(moving)step();draw();if(moving)frame=requestAnimationFrame(animate);}
  function hit(){if(moving)return;if(won){if(round===2){round=0;strokes=0;}else round++;load();return;}const a=Number(angle.value)*Math.PI/180,s=Number(power.value)*.085;velocity=[Math.cos(a)*s,Math.sin(a)*s];strokes++;document.querySelector('#snake-score').textContent=`${strokes} golpes`;moving=true;controls();status.textContent='Bola en movimiento…';last=performance.now();frame=requestAnimationFrame(animate);}
  trigger.hidden=false;trigger.addEventListener('click',()=>{round=0;strokes=0;load();dialog.showModal();shot.focus();});shot.addEventListener('click',hit);
  document.querySelector('#golf-reset').addEventListener('click',()=>{round=0;strokes=0;load();});
  document.querySelector('#snake-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{cancelAnimationFrame(frame);moving=false;trigger.focus();});
  for(const input of [angle,power])input.addEventListener('input',()=>{labels();draw();});
  dialog.addEventListener('keydown',e=>{if(e.target.tagName==='INPUT')return;if(e.code==='Space'){e.preventDefault();hit();}if(moving)return;const changes={ArrowLeft:[angle,-5],ArrowRight:[angle,5],ArrowUp:[power,5],ArrowDown:[power,-5]};if(changes[e.key]){e.preventDefault();const [input,delta]=changes[e.key];input.value=Number(input.value)+delta;labels();draw();}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);}else if(moving&&dialog.open){last=performance.now();frame=requestAnimationFrame(animate);}});
})();
