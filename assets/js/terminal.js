(function(){
  'use strict';
  const T=window.PortfolioTerminal,$=s=>document.querySelector(s),input=$('#console-input'),output=$('#console-output');if(!T||!input)return;
  const templates=[...document.querySelectorAll('template[id^="project-"]')],projectIds=templates.map(t=>t.id.slice(8));
  const files={'/':{directory:true},'/README.md':{intro:true},'/perfil.md':{template:'place-puerto'},'/contacto.txt':{contact:true},'/herramientas.md':{template:'exp-skills'},'/proyectos':{directory:true,place:'taller'},'/trayectoria':{directory:true,place:'puerto'},'/trayectoria/recorrido.md':{template:'exp-trajectory'},'/formacion':{directory:true,place:'escuela'},'/formacion/bootcamp.md':{template:'place-escuela'},'/cartografia':{directory:true,place:'archivo'},'/cartografia/conmapas.md':{template:'place-archivo'},'/ambiente':{directory:true,place:'observatorio'},'/ambiente/iema.md':{template:'place-observatorio'}};
  templates.forEach(t=>files['/proyectos/'+t.id.slice(8)+'.md']={template:t.id,project:t.id.slice(8)});
  const commands=['help','ls','cd','cat','pwd','tree','whoami','clear','history','perfil','proyectos','trayectoria','habilidades','formacion','contacto','abrir'];
  const descriptions={help:'Ver comandos y ejemplos',ls:'Listar archivos de la carpeta',cd:'Cambiar de carpeta',cat:'Leer un archivo',pwd:'Mostrar la ruta actual',tree:'Ver todo el portafolio como árbol',whoami:'Conocer a Jorge',clear:'Despejar la pantalla',history:'Ver comandos de esta sesión'};
  const normalize=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  let cwd='/',previousCwd=null,lastRead='',currentPlace='puerto',currentProject='',history=[],historyIndex=0,draft='',motionOff=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shortPath=()=>cwd==='/'?'~':'~'+cwd;
  function text(parent,value,className){const p=document.createElement('p');p.textContent=value;if(className)p.className=className;parent.append(p);return p;}
  function commandButton(parent,label,command=label,description){const b=document.createElement('button');b.type='button';b.dataset.command=command;b.textContent=label;if(description){const s=document.createElement('span');s.textContent=description;b.append(s);}parent.append(b);return b;}
  function suggestions(){
    const target=$('#command-suggestions');target.replaceChildren();
    let title='Empieza por aquí',list=[['cat /perfil.md','Conocerme'],['cd /proyectos','Ver proyectos'],['formacion','Formación']];
    if(lastRead==='/perfil.md'){title='Ya conoces el punto de partida';list=[['cd /proyectos','Ver proyectos'],['trayectoria','Mi trayectoria'],['formacion','Formación']];}
    else if(files[lastRead]?.project){title='Después de '+document.getElementById(files[lastRead].template).dataset.name;list=[['ls /proyectos','Más proyectos'],['habilidades','Cómo trabajo'],['contacto','Conversemos']];}
    else if(lastRead==='/formacion/bootcamp.md'){title='Sigue explorando';list=[['cd /cartografia','Ver cartografías'],['cd /proyectos','Ver proyectos'],['contacto','Hablemos']];}
    else if(cwd!=='/'){title='Estás en '+shortPath();const first=T.children(files,cwd).find(p=>!files[p].directory);list=[['ls','Ver esta carpeta'],[first?'cat '+first:'tree',first?'Abrir un archivo':'Ver directorio'],['cd ..','Subir un nivel']];}
    else if(lastRead){title='Puedes seguir por aquí';list=[['cd /proyectos','Ver proyectos'],['formacion','Formación'],['contacto','Conversemos']];}
    list.forEach(([command,label])=>{const b=commandButton(target,label,command),code=document.createElement('code');code.textContent=command;b.append(code);});$('#guide-title').textContent=title;
  }
  function closeCompletion(){
    $('#completion-list').replaceChildren();$('#completion-list').hidden=true;
    $('#command-hint').textContent='Tab completa · ↑↓ historial · help orienta';
    $('.execute').disabled=!input.value.trim();
  }
  function status(code,message){
    $('#exit-code').textContent='exit '+code;$('#result-status').textContent=message;
    $('.shell-status').dataset.error=String(code!==0);
  }
  function changeDirectory(path,parent){
    if(!files[path]?.directory)return failure(parent,'cd: no existe esa carpeta: '+path);
    previousCwd=cwd;cwd=path;lastRead='';currentPlace=files[path].place||'puerto';currentProject='';
    text(parent,shortPath(),'file-heading');list(parent,cwd,false);return 0;
  }
  function sync(){
    $('#prompt-path').textContent=shortPath();$('#session-path').textContent='visitante@jorge: '+shortPath();
    const url=new URL(location.href);url.searchParams.set('lugar',currentPlace);if(currentProject)url.searchParams.set('proyecto',currentProject);else url.searchParams.delete('proyecto');window.history.replaceState(null,'',url);
    suggestions();
  }
  function placeOf(id){return [...document.querySelectorAll('template[id^="place-"]')].find(t=>[...t.content.querySelectorAll('[data-project]')].some(b=>b.dataset.project===id))?.id.slice(6)||'taller';}
  function clone(parent,id){const template=document.getElementById(id);if(template)parent.append(template.content.cloneNode(true));}
  function failure(parent,message){
    text(parent,message,'command-error');text(parent,'Puedes seguir desde aquí:','terminal-next');
    const actions=document.createElement('div');actions.className='recovery-actions';
    commandButton(actions,'Ver archivos','ls');commandButton(actions,'Ver ejemplos','help');parent.append(actions);return 1;
  }
  function readFile(parent,path){
    const file=files[path];if(!file)return failure(parent,'cat: no existe el archivo '+path);if(file.directory)return failure(parent,'cat: '+path+' es una carpeta. Usa ls '+path);
    lastRead=path;text(parent,'/home/jorge'+path,'file-heading');
    if(file.intro){text(parent,'Jorge Ulloa Roa · Geógrafo, analista espacial y formador.');text(parent,'Este directorio reúne mi trabajo. Empieza en perfil.md, entra a proyectos/ o visita formacion/. Cada archivo conserva las fuentes y límites del proyecto.');}
    else if(file.contact){text(parent,'¿Tienes datos por explorar, un mapa por construir o un equipo por formar?');parent.append($('#terminal-contact').cloneNode(true));parent.lastChild.removeAttribute('id');}
    else clone(parent,file.template);
    currentProject=file.project||'';currentPlace=file.project?placeOf(file.project):path.startsWith('/formacion')?'escuela':path.startsWith('/cartografia')?'archivo':path.startsWith('/ambiente')?'observatorio':'puerto';
    return 0;
  }
  function list(parent,path,long){
    if(!files[path])return failure(parent,'ls: no existe '+path);
    lastRead='';
    const paths=files[path].directory?T.children(files,path):[path],list=document.createElement('div');list.className='file-list'+(long?' is-long':'');
    paths.forEach(p=>{const file=files[p],name=p.split('/').pop()+(file.directory?'/':'');const b=commandButton(list,name,(file.directory?'cd ':'cat ')+p,long?(file.directory?'directorio':file.project?document.getElementById(file.template).dataset.name:'archivo de lectura'):undefined);if(file.directory)b.className='directory';});parent.append(list);return 0;
  }
  function help(parent,subject){
    if(subject&&!Object.hasOwn(descriptions,subject))return failure(parent,'help: no hay ayuda para '+subject+'. Usa help sin argumentos.');
    if(subject){text(parent,subject+' — '+descriptions[subject]);text(parent,({cd:'cd proyectos · cd .. · cd ~',cat:'cat perfil.md · cat /proyectos/azimut.md',ls:'ls · ls -l · ls /proyectos',help:'help · help cd'})[subject]||subject);return 0;}
    text(parent,'No necesitas saber usar una terminal. Prueba este recorrido:');
    ['ls ~','cd ~/proyectos','cat ~/proyectos/azimut.md'].forEach(c=>commandButton(parent,c));
    Object.entries(descriptions).forEach(([c,d])=>{const row=document.createElement('div');row.className='help-row';const code=document.createElement('code');code.textContent=c;const span=document.createElement('span');span.textContent=d;row.append(code,span);parent.append(row);});
    text(parent,'También funcionan: perfil, proyectos, abrir azimut, trayectoria, habilidades, formacion y contacto.','terminal-next');
    text(parent,'Tab completa una coincidencia. Con varias opciones, las muestra y deja avanzar el foco. ↑↓ recuperan comandos; Ctrl+C cancela la línea; Ctrl+L limpia la pantalla.','terminal-next');return 0;
  }
  function run(raw,{record=true,focus=true}={}){
    raw=raw.trim().slice(0,240);if(!raw)return;
    input.value='';closeCompletion();if(record){history.push(raw);if(history.length>100)history.shift();}historyIndex=history.length;draft='';
    let args;try{args=T.tokens(raw);}catch(e){args=['__error',e.message];}
    let verb=normalize(args.shift()||''),code=0;
    if(['clear','limpiar'].includes(verb)){output.replaceChildren();text(output,'Consola despejada. ls para mirar alrededor; help para orientarte.','terminal-next');status(0,'Pantalla despejada');if(focus)input.focus({preventScroll:true});return;}
    const entry=document.createElement('section');entry.className='terminal-entry';const echo=text(entry,'','terminal-entry-command');
    for(const [c,v]of [['echo-user','visitante@jorge'],['echo-path',shortPath()],['',' $ '+raw]]){const span=document.createElement('span');span.className=c;span.textContent=v;echo.append(span);}
    const result=document.createElement('div');result.className='terminal-result';entry.append(result);
    if(verb==='__error')code=failure(result,args[0]);
    else if(['help','ayuda','man'].includes(verb))code=help(result,args[0]);
    else if(verb==='pwd')text(result,'/home/jorge'+(cwd==='/'?'':cwd));
    else if(verb==='ls'){const positional=args.filter(a=>!a.startsWith('-'));if(args.some(a=>a.startsWith('-')&&!['-l','-a','-la','-al'].includes(a))||positional.length>1)code=failure(result,'Uso: ls [-l] [carpeta]');else code=list(result,T.resolvePath(positional[0]||cwd,cwd),args.some(a=>a.includes('l')));}
    else if(verb==='cd'){
      if(args.length>1)code=failure(result,'Uso: cd carpeta');else if(args[0]==='-'&&!previousCwd)code=failure(result,'cd: todavía no hay una carpeta anterior.');else code=changeDirectory(args[0]==='-'?previousCwd:T.resolvePath(args[0]||'/',cwd),result);
    }
    else if(verb==='cat')code=args.length===1?readFile(result,T.resolvePath(args[0],cwd)):failure(result,'Uso: cat archivo.md. Prueba cat /perfil.md');
    else if(verb==='tree'){
      const pre=document.createElement('pre');pre.className='file-tree';const rows=['/home/jorge'];
      function branch(dir,prefix){const children=T.children(files,dir);children.forEach((p,i)=>{const last=i===children.length-1;rows.push(prefix+(last?'└── ':'├── ')+p.split('/').pop()+(files[p].directory?'/':''));if(files[p].directory)branch(p,prefix+(last?'    ':'│   '));});}branch('/','');pre.textContent=rows.join('\n');result.append(pre);
    }
    else if(verb==='history'){history.forEach((line,i)=>text(result,String(i+1).padStart(3)+'  '+line));}
    else if(['whoami','perfil'].includes(verb))code=readFile(result,'/perfil.md');
    else if(['trayectoria','cv'].includes(verb))code=readFile(result,'/trayectoria/recorrido.md');
    else if(verb==='habilidades')code=readFile(result,'/herramientas.md');
    else if(['formacion','cursos'].includes(verb))code=readFile(result,'/formacion/bootcamp.md');
    else if(verb==='contacto')code=readFile(result,'/contacto.txt');
    else if(verb==='proyectos'){
      const topic=normalize(args.join(' '));if(topic&&!['ambiente','codigo','--tema ambiente','--tema codigo'].includes(topic))code=failure(result,'Usa proyectos, proyectos ambiente o proyectos codigo.');else{const ids=topic.endsWith('ambiente')?['retc-map']:topic.endsWith('codigo')?['luz-rm','azimut','autoatlas-pro','geocallejero']:projectIds;ids.forEach(id=>commandButton(result,document.getElementById('project-'+id).dataset.name,'cat /proyectos/'+id+'.md'));}
    }
    else if(['abrir','open'].includes(verb)){
      const id=projectIds.find(id=>normalize(id)===normalize(args.join(' '))||normalize(document.getElementById('project-'+id).dataset.name)===normalize(args.join(' ')));
      code=id?readFile(result,'/proyectos/'+id+'.md'):files[T.resolvePath(args[0]||'',cwd)]?readFile(result,T.resolvePath(args[0],cwd)):failure(result,'No encuentro ese proyecto. Usa proyectos para ver los nombres disponibles.');
    }
    else if(verb==='ir'){
      const dirs={puerto:'/trayectoria',archivo:'/cartografia',observatorio:'/ambiente',taller:'/proyectos',escuela:'/formacion'};
      if(Object.hasOwn(dirs,args[0]))code=changeDirectory(dirs[args[0]],result);else code=failure(result,'Destinos: puerto, archivo, observatorio, taller, escuela.');
    }
    else if(verb==='terminal')text(result,'Ya estás en la terminal. Prueba ls o help.');
    else {code=127;failure(result,verb+': comando no encontrado.');}
    while(output.children.length>=40)output.firstElementChild.remove();output.append(entry);sync();status(code,code?'Revisa el mensaje de arriba':'Comando completado');
    output.scrollTop+=entry.getBoundingClientRect().top-output.getBoundingClientRect().top-24;if(focus)input.focus({preventScroll:true});
  }
  function matches(){
    const value=input.value,parts=value.trimStart().split(/\s+/);parts[0]=normalize(parts[0]);if(parts.length===1)return commands.filter(c=>c.startsWith(normalize(parts[0])));
    if(['abrir','open'].includes(parts[0]))return projectIds.filter(id=>id.startsWith(normalize(parts.slice(1).join(' ')))).map(id=>parts[0]+' '+id);
    if(parts[0]==='ir')return ['puerto','archivo','observatorio','taller','escuela'].filter(id=>id.startsWith(parts[1])).map(id=>'ir '+id);
    if(parts[0]==='help')return Object.keys(descriptions).filter(c=>c.startsWith(parts[1])).map(c=>'help '+c);
    if(!['ls','cd','cat'].includes(parts[0]))return [];
    const prefix=parts.slice(0,-1).join(' ')+' ',word=parts.at(-1),resolved=T.resolvePath(word,cwd),dir=!word?cwd:word.endsWith('/')?resolved:resolved.slice(0,resolved.lastIndexOf('/'))||'/';
    const typedBase=word.includes('/')?word.slice(0,word.lastIndexOf('/')+1):'';const leaf=word.endsWith('/')?'':word.split('/').pop();
    return T.children(files,dir).filter(p=>p.split('/').pop().startsWith(leaf)&&(!(parts[0]==='cd')||files[p].directory)).map(p=>prefix+typedBase+p.split('/').pop()+(files[p].directory?'/':''));
  }
  input.addEventListener('input',()=>{
    closeCompletion();const options=matches();
    if(input.value&&options.length===1&&options[0]!==input.value)$('#command-hint').textContent='Tab completa: '+options[0];
  });
  input.addEventListener('keydown',e=>{
    if(e.isComposing)return;
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='l'){e.preventDefault();run('clear',{record:false});}
    else if(e.ctrlKey&&['a','e','u','k'].includes(e.key.toLowerCase())){
      e.preventDefault();const key=e.key.toLowerCase(),start=input.selectionStart,end=input.selectionEnd;
      if(key==='a'||key==='e'){const pos=key==='a'?0:input.value.length;input.setSelectionRange(pos,pos);}
      else {const from=key==='u'?0:start,to=key==='u'?end:input.value.length;input.setRangeText('',from,to,'start');closeCompletion();}
    }
    else if(e.ctrlKey&&e.key.toLowerCase()==='c'&&input.selectionStart===input.selectionEnd){e.preventDefault();text(output,shortPath()+' $ '+input.value+'^C','terminal-next');input.value='';closeCompletion();status(130,'Línea cancelada');output.scrollTop=output.scrollHeight;}
    else if(e.key==='Escape'){if($('#completion-list').hidden)input.value='';closeCompletion();}
    else if(e.key==='Tab'&&!e.shiftKey&&input.value.trim()&&input.selectionStart===input.value.length&&input.selectionEnd===input.value.length){
      const options=matches();
      if(options.length===1&&options[0]!==input.value){e.preventDefault();input.value=options[0];closeCompletion();}
      else if(options.length>1){const list=$('#completion-list');list.replaceChildren();options.forEach(c=>{const b=document.createElement('button');b.type='button';b.dataset.complete=c;b.textContent=c;list.append(b);});list.hidden=false;$('#command-hint').textContent='Coincidencias: '+options.slice(0,3).join(' · ')+(options.length>3?'…':'')+'. Elige una abajo.';}
    }
    else if(['ArrowUp','ArrowDown'].includes(e.key)&&history.length){e.preventDefault();if(historyIndex===history.length)draft=input.value;historyIndex=Math.max(0,Math.min(history.length,historyIndex+(e.key==='ArrowUp'?-1:1)));input.value=historyIndex===history.length?draft:history[historyIndex];closeCompletion();}
  });
  $('#console-form').hidden=false;$('#console-form').addEventListener('submit',e=>{e.preventDefault();run(input.value);});
  document.addEventListener('click',e=>{
    const completion=e.target.closest('[data-complete]'),command=e.target.closest('[data-command]'),project=e.target.closest('[data-project]');
    if(completion){input.value=completion.dataset.complete;closeCompletion();input.focus({preventScroll:true});return;}
    const raw=command?.dataset.command||(project?'abrir '+project.dataset.project:'');if(!raw)return;
    const pending=input.value;run(raw,{focus:e.detail===0});
    if(pending){input.value=pending;draft=pending;closeCompletion();}
  });
  $('#guide-toggle').addEventListener('click',()=>{const guide=$('#command-guide');guide.hidden=!guide.hidden;$('#guide-toggle').setAttribute('aria-expanded',String(!guide.hidden));$('#guide-toggle').textContent=guide.hidden?'Mostrar pistas':'Ocultar pistas';});
  function motion(){document.documentElement.dataset.terminalMotion=motionOff?'off':'on';$('#terminal-motion').textContent=motionOff?'Activar animación':'Pausar animación';$('#terminal-motion').setAttribute('aria-pressed',String(motionOff));}
  $('#terminal-motion').addEventListener('click',()=>{motionOff=!motionOff;motion();});matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{motionOff=e.matches;motion();});motion();
  const params=new URLSearchParams(location.search),initial=params.get('lugar'),dirs={puerto:'/',taller:'/proyectos',archivo:'/cartografia',escuela:'/formacion',observatorio:'/ambiente'};if(Object.hasOwn(dirs,initial)){cwd=dirs[initial];currentPlace=initial;}sync();
  if(projectIds.includes(params.get('proyecto')))run('cat /proyectos/'+params.get('proyecto')+'.md',{record:false,focus:false});
})();
