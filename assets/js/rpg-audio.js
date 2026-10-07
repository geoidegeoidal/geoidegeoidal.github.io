/* Costa de las ideas: original 16-bar score, coastal ambience and interaction sounds. */
(function(){
  'use strict';
  const button=document.querySelector('#music'),slider=document.querySelector('#music-volume');if(!button)return;
  let context,master,musicBus,seaGain,timer,enabled=false,active=false,next=0,step=0,revision=0,scene='outside',coast=.55,failed=false;
  const eighth=60/88/2,roots=[48,53,57,55,48,50,53,55,48,53,57,55,53,50,55,48];
  const melody=[[72,0,76,79,0,76,74,72],[69,0,72,76,0,74,72,0],[76,0,79,81,0,79,76,74],[71,0,74,79,0,76,74,0],[72,76,79,0,84,0,79,76],[74,0,77,81,0,77,76,74],[72,0,69,72,77,0,76,72],[71,74,79,0,74,0,71,0],[72,0,76,79,84,0,79,76],[77,0,76,72,69,0,72,0],[76,79,81,0,84,0,81,79],[74,0,71,74,79,0,76,0],[77,0,76,72,0,69,72,76],[74,0,77,81,77,0,74,0],[79,0,77,74,71,0,74,0],[76,0,74,72,0,0,0,0]];
  function status(){
    button.setAttribute('aria-pressed',String(enabled));
    button.textContent=failed?'Reintentar música':enabled?(active?'Música: sí':'Música: pausa'):'Música: no';
    button.setAttribute('aria-label',button.textContent+'. '+(enabled?'Silenciar música':'Activar música'));
    button.dataset.playing=String(!!(enabled&&active&&!document.hidden&&!failed));
    document.querySelector('#audio-status').textContent=failed?'No se pudo iniciar el sonido. Puedes seguir jugando y volver a intentarlo.':enabled?(active?'Suena Costa de las ideas. Música y ambiente activados.':'Música en pausa.'):'Sonido desactivado.';
  }
  function note(pitch,time,duration,gain,type='triangle',bus=musicBus){
    const oscillator=context.createOscillator(),envelope=context.createGain();oscillator.type=type;oscillator.frequency.value=440*2**((pitch-69)/12);
    envelope.gain.setValueAtTime(0,time);envelope.gain.linearRampToValueAtTime(gain,time+.025);envelope.gain.exponentialRampToValueAtTime(.0001,time+duration);oscillator.connect(envelope);envelope.connect(bus);oscillator.start(time);oscillator.stop(time+duration+.03);oscillator.onended=()=>{oscillator.disconnect();envelope.disconnect();};
  }
  function mix(){if(!context)return;musicBus.gain.setTargetAtTime(scene==='outside'?1:.72,context.currentTime,.8);seaGain.gain.setTargetAtTime(scene==='outside'?.045+coast*.11:0,context.currentTime,1.1);}
  function create(){
    const Audio=window.AudioContext||window.webkitAudioContext;context=new Audio();master=context.createGain();master.gain.value=Number(slider.value)/100*.85;
    const compressor=context.createDynamicsCompressor();compressor.threshold.value=-18;compressor.ratio.value=3;master.connect(compressor);compressor.connect(context.destination);
    musicBus=context.createGain();const filter=context.createBiquadFilter();filter.type='lowpass';filter.frequency.value=3600;musicBus.connect(filter);filter.connect(master);
    const delay=context.createDelay(1),echo=context.createGain();delay.delayTime.value=eighth*1.5;echo.gain.value=.18;filter.connect(delay);delay.connect(echo);echo.connect(master);
    // A short deterministic filtered-noise loop and slow swell form the shoreline.
    const buffer=context.createBuffer(1,context.sampleRate*4,context.sampleRate),data=buffer.getChannelData(0);let seed=41,brown=0;
    for(let i=0;i<data.length;i++){seed=(seed*1664525+1013904223)>>>0;brown=(brown+((seed/4294967296)*2-1)*.04)/1.02;data[i]=brown*3;}
    const sea=context.createBufferSource(),low=context.createBiquadFilter(),swell=context.createGain(),lfo=context.createOscillator(),depth=context.createGain();sea.buffer=buffer;sea.loop=true;low.type='lowpass';low.frequency.value=850;swell.gain.value=.65;lfo.frequency.value=.12;depth.gain.value=.28;seaGain=context.createGain();lfo.connect(depth);depth.connect(swell.gain);sea.connect(low);low.connect(swell);swell.connect(seaGain);seaGain.connect(master);sea.start();lfo.start();mix();
  }
  function schedule(){
    while(next<context.currentTime+.18){const bar=Math.floor(step/8)%16,beat=step%8,root=roots[bar],third=[50,57].includes(root)?3:4;
      if(beat===0||beat===4)note(root,next,1.1,.2,'sine');
      if(beat===0)[root+12,root+12+third,root+19].forEach(p=>note(p,next,2.2,.045,'sine'));
      note(root+[0,7,12,third+12,7,12,third+12,7][beat],next,.3,.08);
      if(melody[bar][beat]){note(melody[bar][beat],next,.66,.2);note(melody[bar][beat]+12,next,.5,.025,'sine');}
      if(scene==='outside'&&beat===6&&bar%4===1){note(91,next,.09,.025,'sine',master);note(95,next+.13,.14,.02,'sine',master);}
      next+=eighth;step=(step+1)%128;
    }
  }
  async function update(){
    const version=++revision;clearInterval(timer);timer=null;status();
    try{
      if(!context||!enabled||!active||document.hidden){if(context?.state==='running')await context.suspend();return;}
      await context.resume();
      if(!enabled||!active||document.hidden){await context.suspend();return;}
      if(version!==revision)return;
      next=context.currentTime+.04;schedule();timer=setInterval(schedule,80);failed=false;status();
    }catch{if(version===revision){enabled=false;failed=true;status();}}
  }
  function enable(value){
    enabled=value;failed=false;
    if(enabled&&!context){try{create();}catch{enabled=false;failed=true;status();return;}}
    update();
  }
  button.addEventListener('click',()=>enable(!enabled));
  document.addEventListener('rpg:sound-choice',e=>enable(e.detail.enabled));
  slider.addEventListener('input',()=>{if(master)master.gain.setTargetAtTime(Number(slider.value)/100*.85,context.currentTime,.04);});
  document.addEventListener('rpg:playstate',e=>{active=e.detail.playing;update();});
  document.addEventListener('rpg:environment',e=>{scene=e.detail.scene;coast=e.detail.coast;mix();});
  document.addEventListener('rpg:cue',e=>{
    if(!enabled||!active||document.hidden||context?.state!=='running')return;
    const now=context.currentTime;
    if(e.detail.kind==='step')note(e.detail.bridge?43:50,now,.055,.065,'triangle',master);
    if(e.detail.kind==='door'){note(60,now,.24,.13,'sine',master);note(67,now+.09,.36,.11,'sine',master);}
    if(e.detail.kind==='talk'){note(79,now,.13,.08,'sine',master);note(84,now+.1,.18,.06,'sine',master);}
  });
  document.addEventListener('visibilitychange',update);
  window.addEventListener('pagehide',()=>{++revision;clearInterval(timer);context?.suspend().catch(()=>{});});
})();
