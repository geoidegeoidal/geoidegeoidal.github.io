/* Original 16-bar coastal theme. Generated locally with Web Audio; no audio requests. */
(function(){
  'use strict';
  const button=document.querySelector('#music'),slider=document.querySelector('#music-volume');if(!button)return;
  let context,master,timer,enabled=false,active=false,next=0,step=0,revision=0;
  const eighth=60/88/2,roots=[48,53,57,55,48,50,53,55,48,53,57,55,53,50,55,48];
  const melody=[[72,0,76,79,0,76,74,72],[69,0,72,76,0,74,72,0],[76,0,79,81,0,79,76,74],[71,0,74,79,0,76,74,0],[72,76,79,0,84,0,79,76],[74,0,77,81,0,77,76,74],[72,0,69,72,77,0,76,72],[71,74,79,0,74,0,71,0],[72,0,76,79,84,0,79,76],[77,0,76,72,69,0,72,0],[76,79,81,0,84,0,81,79],[74,0,71,74,79,0,76,0],[77,0,76,72,0,69,72,76],[74,0,77,81,77,0,74,0],[79,0,77,74,71,0,74,0],[76,0,74,72,0,0,0,0]];
  function note(pitch,time,duration,gain,type='triangle'){
    const oscillator=context.createOscillator(),envelope=context.createGain();oscillator.type=type;oscillator.frequency.value=440*2**((pitch-69)/12);
    envelope.gain.setValueAtTime(0,time);envelope.gain.linearRampToValueAtTime(gain,time+.015);envelope.gain.exponentialRampToValueAtTime(.001,time+duration);oscillator.connect(envelope);envelope.connect(master);oscillator.start(time);oscillator.stop(time+duration+.03);oscillator.onended=()=>{oscillator.disconnect();envelope.disconnect();};
  }
  function schedule(){
    while(next<context.currentTime+.18){const bar=Math.floor(step/8)%16,beat=step%8,root=roots[bar],minor=[50,57].includes(root),third=minor?3:4;
      if(beat===0||beat===4)note(root,next,.9,.2,'sine');
      const arp=[0,7,12,third+12,7,12,third+12,7][beat];note(root+arp,next,.24,.07,'triangle');
      if(melody[bar][beat])note(melody[bar][beat],next,.52,.1,'triangle');
      next+=eighth;step=(step+1)%128;
    }
  }
  async function update(){
    const version=++revision;
    clearInterval(timer);timer=null;
    button.setAttribute('aria-pressed',String(enabled));button.textContent=enabled?'Música: sí':'Música: no';
    if(!context||!enabled||!active||document.hidden){if(context?.state==='running')await context.suspend();return;}
    try{await context.resume();if(version!==revision)return;if(!enabled||!active||document.hidden){await context.suspend();return;}next=context.currentTime+.03;schedule();timer=setInterval(schedule,80);}catch{enabled=false;button.textContent='Música no disponible';button.setAttribute('aria-pressed','false');}
  }
  button.addEventListener('click',async()=>{
    enabled=!enabled;
    if(enabled&&!context){try{const Audio=window.AudioContext||window.webkitAudioContext;context=new Audio();master=context.createGain();master.gain.value=Number(slider.value)/100*.6;const filter=context.createBiquadFilter();filter.type='lowpass';filter.frequency.value=3200;master.connect(filter);filter.connect(context.destination);}catch{enabled=false;button.textContent='Música no disponible';return;}}
    await update();
  });
  slider.addEventListener('input',()=>{if(master)master.gain.setTargetAtTime(Number(slider.value)/100*.6,context.currentTime,.04);});
  document.addEventListener('rpg:playstate',e=>{active=e.detail.playing;update();});
  document.addEventListener('visibilitychange',update);
  window.addEventListener('pagehide',()=>{clearInterval(timer);context?.suspend();});
})();
