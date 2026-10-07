const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../assets/js/rpg-audio.js'),'utf8');
const parameter=()=>({value:0,setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){},setTargetAtTime(){}});
const node=()=>({gain:parameter(),frequency:parameter(),threshold:parameter(),ratio:parameter(),delayTime:parameter(),connect(){},disconnect(){},start(){},stop(){}});
(async()=>{for(const action of ['mute','pause','hidden']){
 const events={},clicks={},elements=Object.fromEntries(['music','music-volume','audio-status'].map(id=>[id,{value:'35',dataset:{},setAttribute(){},addEventListener(event,fn){clicks[id+':'+event]=fn;}}]));
 let audio,finishResume;
 class Audio{constructor(){audio=this;this.state='suspended';this.currentTime=0;this.sampleRate=64;this.destination=node();}resume(){return new Promise(resolve=>{finishResume=()=>{this.state='running';resolve();};});}suspend(){this.state='suspended';return Promise.resolve();}createGain(){return node();}createOscillator(){return node();}createBiquadFilter(){return node();}createDynamicsCompressor(){return node();}createDelay(){return node();}createBufferSource(){return node();}createBuffer(){return{getChannelData:()=>new Float32Array(256)};}}
 const document={hidden:false,querySelector:s=>elements[s.slice(1)],addEventListener:(name,fn)=>events[name]=fn};
 vm.runInNewContext(source,{document,window:{AudioContext:Audio,addEventListener(){}},setInterval:()=>1,clearInterval(){}});
 events['rpg:playstate']({detail:{playing:true}});clicks['music:click']();assert(finishResume,'resume pending');
 if(action==='mute')clicks['music:click']();else if(action==='pause')events['rpg:playstate']({detail:{playing:false}});else{document.hidden=true;events.visibilitychange();}
 finishResume();await new Promise(resolve=>setImmediate(resolve));assert.equal(audio.state,'suspended','late resume respects '+action);
 }
 console.log('PASS deferred AudioContext resume cannot override mute, pause or hidden');
})().catch(e=>{console.error(e);process.exitCode=1;});
