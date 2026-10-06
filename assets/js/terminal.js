(function(){
  'use strict';
  const T=window.PortfolioTerminal,$=s=>document.querySelector(s),input=$('#console-input'),output=$('#console-output');if(!T||!input)return;
  const templates=[...document.querySelectorAll('template[id^="project-"]')],projectIds=templates.map(t=>t.id.slice(8));
  const files={'/':{directory:true},'/README.md':{intro:true},'/perfil.md':{template:'place-puerto'},'/contacto.txt':{contact:true},'/herramientas.md':{template:'exp-skills'},'/proyectos':{directory:true,place:'taller'},'/trayectoria':{directory:true,place:'puerto'},'/trayectoria/recorrido.md':{template:'exp-trajectory'},'/formacion':{directory:true,place:'escuela'},'/formacion/bootcamp.md':{template:'place-escuela'},'/cartografia':{directory:true,place:'archivo'},'/cartografia/conmapas.md':{template:'place-archivo'},'/ambiente':{directory:true,place:'observatorio'},'/ambiente/iema.md':{template:'place-observatorio'}};
  templates.forEach(t=>files['/proyectos/'+t.id.slice(8)+'.md']={template:t.id,project:t.id.slice(8)});
  const commands=['help','ls','cd','cat','pwd','tree','whoami','clear','history','perfil','proyectos','trayectoria','habilidades','formacion','contacto','mapa','abrir'];
  const descriptions={help:'Ver comandos y ejemplos',ls:'Listar archivos de la carpeta',cd:'Cambiar de carpeta',cat:'Leer un archivo',pwd:'Mostrar la ruta actual',tree:'Ver todo el portafolio como árbol',whoami:'Conocer a Jorge',clear:'Despejar la pantalla',history:'Ver comandos de esta sesión'};
  const normalize=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  let cwd='/',currentPlace='puerto',currentProject='',history=[],historyIndex=0,draft='',motionOff=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shortPath=()=>cwd==='/'?'~':'~'+cwd;
  function text(parent,value,className){const p=document.createElement('p');p.textContent=value;if(className)p.className=className;parent.append(p);return p;}
  function commandButton(parent,label,command=label,description){const b=document.createElement('button');b.type='button';b.dataset.command=command;b.textContent=label;if(description){const s=document.createElement('span');s.textContent=description;b.append(s);}parent.append(b);return b;}
  function suggestions(){
    const target=$('#command-suggestions');target.replaceChildren();
    const list=cwd==='/'?[['ls','Ver archivos'],['cat perfil.md','Conocerme'],['cd proyectos','Explorar proyectos']]:cwd==='/proyectos'?[['ls','Ver el catálogo'],['cat azimut.md','Leer un proyecto'],['cd ../formacion','Conocer la formación']]:cwd==='/formacion'?[['cat bootcamp.md','Explorar el programa'],['cat ../herramientas.md','Herramientas de trabajo'],['cd ..','Volver al inicio']]:[['ls','Ver esta carpeta'],['cd ..','Subir un nivel'],['tree','Orientarme']];
    list.forEach(([c,d])=>commandButton(target,c,c,d));$('#guide-title').textContent=cwd==='/'?'Empieza por aquí':'Desde '+shortPath();
  }
  function sync(){
    $('#prompt-path').textContent=shortPath();$('#session-path').textContent='visitante@jorge: '+shortPath();
    const url=new URL(location.href);url.searchParams.set('lugar',currentPlace);if(currentProject)url.searchParams.set('proyecto',currentProject);else url.searchParams.delete('proyecto');window.history.replaceState(null,'',url);
    const map=new URL($('#terminal-map').href);map.search=url.search;$('#terminal-map').href=map.href;suggestions();
  }
  function placeOf(id){return [...document.querySelectorAll('template[id^="place-"]')].find(t=>[...t.content.querySelectorAll('[data-project]')].some(b=>b.dataset.project===id))?.id.slice(6)||'taller';}
  function clone(parent,id){const template=document.getElementById(id);if(template)parent.append(template.content.cloneNode(true));}
  function failure(parent,message){text(parent,message,'command-error');text(parent,'Usa help para ver ejemplos o pulsa una sugerencia.','terminal-next');return 1;}
  function readFile(parent,path){
    const file=files[path];if(!file)return failure(parent,'cat: no existe el archivo '+path);if(file.directory)return failure(parent,'cat: '+path+' es una carpeta. Usa ls '+path);
    if(file.intro){text(parent,'Jorge Ulloa Roa · Geógrafo, analista espacial y formador.');text(parent,'Este directorio reúne mi trabajo. Empieza en perfil.md, entra a proyectos/ o visita formacion/. Cada archivo conserva las fuentes y límites del proyecto.');}
    else if(file.contact){text(parent,'¿Tienes datos por explorar, un mapa por construir o un equipo por formar?');parent.append($('#terminal-contact').cloneNode(true));parent.lastChild.removeAttribute('id');}
    else clone(parent,file.template);
    currentProject=file.project||'';currentPlace=file.project?placeOf(file.project):path.startsWith('/formacion')?'escuela':path.startsWith('/cartografia')?'archivo':path.startsWith('/ambiente')?'observatorio':'puerto';
    return 0;
  }
  function list(parent,path,long){
    if(!files[path])return failure(parent,'ls: no existe '+path);
    const paths=files[path].directory?T.children(files,path):[path],list=document.createElement('div');list.className='file-list';
    paths.forEach(p=>{const file=files[p],name=p.split('/').pop()+(file.directory?'/':'');const b=commandButton(list,(long?(file.directory?'d ':'- '):'')+name,(file.directory?'cd ':'cat ')+p);if(file.directory)b.className='directory';});parent.append(list);return 0;
  }
  function help(parent,subject){
    if(subject&&descriptions[subject]){text(parent,subject+' — '+descriptions[subject]);text(parent,({cd:'cd proyectos · cd .. · cd ~',cat:'cat perfil.md · cat /proyectos/azimut.md',ls:'ls · ls -l · ls /proyectos',help:'help · help cd'})[subject]||subject);return 0;}
    text(parent,'No necesitas saber usar una terminal. Prueba este recorrido:');
    ['ls','cd proyectos','cat azimut.md'].forEach(c=>commandButton(parent,c));
    Object.entries(descriptions).forEach(([c,d])=>{const row=document.createElement('div');row.className='help-row';const code=document.createElement('code');code.textContent=c;const span=document.createElement('span');span.textContent=d;row.append(code,span);parent.append(row);});
    text(parent,'También funcionan: perfil, proyectos, abrir azimut, trayectoria, habilidades, formacion, contacto y mapa.','terminal-next');
    text(parent,'Tab completa una coincidencia. Con varias opciones, las muestra y deja avanzar el foco. ↑↓ recuperan comandos; Ctrl+C cancela la línea; Ctrl+L limpia la pantalla.','terminal-next');return 0;
  }
  function run(raw,{record=true}={}){
    raw=raw.trim().slice(0,240);if(!raw)return;
    input.value='';$('#command-ghost').textContent='';if(record){history.push(raw);if(history.length>100)history.shift();}historyIndex=history.length;draft='';
    let args;try{args=T.tokens(raw);}catch(e){args=['__error',e.message];}
    let verb=normalize(args.shift()||''),code=0;
    if(['clear','limpiar'].includes(verb)){output.replaceChildren();text(output,'Consola despejada. ls para mirar alrededor; help para orientarte.','terminal-disclosure');$('#exit-code').textContent='exit 0';input.focus();return;}
    const entry=document.createElement('section');entry.className='terminal-entry';const echo=text(entry,'','terminal-entry-command');
    for(const [c,v]of [['echo-user','visitante@jorge'],['echo-path',shortPath()],['',' $ '+raw]]){const span=document.createElement('span');span.className=c;span.textContent=v;echo.append(span);}
    const result=document.createElement('div');result.className='terminal-result';entry.append(result);
    if(verb==='__error')code=failure(result,args[0]);
    else if(['help','ayuda','man'].includes(verb))code=help(result,args[0]);
    else if(verb==='pwd')text(result,'/home/jorge'+(cwd==='/'?'':cwd));
    else if(verb==='ls'){const positional=args.filter(a=>!a.startsWith('-'));if(args.some(a=>a.startsWith('-')&&!['-l','-a','-la','-al'].includes(a))||positional.length>1)code=failure(result,'Uso: ls [-l] [carpeta]');else code=list(result,T.resolvePath(positional[0]||cwd,cwd),args.some(a=>a.includes('l')));}
    else if(verb==='cd'){
      const path=T.resolvePath(args[0]||'/',cwd);if(args.length>1)code=failure(result,'Uso: cd carpeta');else if(!files[path]?.directory)code=failure(result,'cd: no existe esa carpeta: '+path);else{cwd=path;currentPlace=files[path].place||'puerto';currentProject='';text(result,'Entraste a '+shortPath()+'.');list(result,cwd,false);}
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
      if(Object.hasOwn(dirs,args[0])){cwd=dirs[args[0]];currentPlace=args[0];currentProject='';list(result,cwd,false);}else code=failure(result,'Destinos: puerto, archivo, observatorio, taller, escuela.');
    }
    else if(verb==='mapa'){sync();location.assign($('#terminal-map').href);return;}
    else if(verb==='terminal')text(result,'Ya estás en la terminal. Prueba ls o help.');
    else {code=127;failure(result,verb+': comando no encontrado.');}
    while(output.children.length>=40)output.firstElementChild.remove();output.append(entry);sync();$('#exit-code').textContent='exit '+code;
    output.scrollTop=Math.max(0,entry.offsetTop-output.offsetTop-12);input.focus({preventScroll:true});
  }
  function matches(){
    const value=input.value,parts=value.trimStart().split(/\s+/);if(parts.length===1)return commands.filter(c=>c.startsWith(normalize(parts[0])));
    if(['abrir','open'].includes(parts[0]))return projectIds.filter(id=>id.startsWith(normalize(parts.slice(1).join(' ')))).map(id=>parts[0]+' '+id);
    if(parts[0]==='ir')return ['puerto','archivo','observatorio','taller','escuela'].filter(id=>id.startsWith(parts[1])).map(id=>'ir '+id);
    const prefix=parts.slice(0,-1).join(' ')+' ',word=parts.at(-1),resolved=T.resolvePath(word,cwd),dir=!word?cwd:word.endsWith('/')?resolved:resolved.slice(0,resolved.lastIndexOf('/'))||'/';
    const typedBase=word.includes('/')?word.slice(0,word.lastIndexOf('/')+1):'';const leaf=word.endsWith('/')?'':word.split('/').pop();
    return T.children(files,dir).filter(p=>p.split('/').pop().startsWith(leaf)&&(!(parts[0]==='cd')||files[p].directory)).map(p=>prefix+typedBase+p.split('/').pop()+(files[p].directory?'/':''));
  }
  input.addEventListener('input',()=>{const options=matches();$('#command-ghost').textContent=options.length===1&&input.value?input.value+options[0].slice(input.value.length):'';});
  input.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='l'){e.preventDefault();run('clear',{record:false});}
    else if(e.ctrlKey&&e.key.toLowerCase()==='c'&&input.selectionStart===input.selectionEnd){e.preventDefault();text(output,shortPath()+' $ '+input.value+'^C','terminal-disclosure');input.value='';$('#command-ghost').textContent='';$('#exit-code').textContent='exit 130';output.scrollTop=output.scrollHeight;}
    else if(e.key==='Escape'){input.value='';$('#command-ghost').textContent='';}
    else if(e.key==='Tab'&&!e.shiftKey&&input.value.trim()){
      const options=matches();if(options.length===1&&options[0]!==input.value){e.preventDefault();input.value=options[0];$('#command-ghost').textContent='';}
      else if(options.length>1){$('#command-hint').textContent='Coincidencias: '+options.slice(0,8).join(' · ');}
    }
    else if(['ArrowUp','ArrowDown'].includes(e.key)&&history.length){e.preventDefault();if(historyIndex===history.length)draft=input.value;historyIndex=Math.max(0,Math.min(history.length,historyIndex+(e.key==='ArrowUp'?-1:1)));input.value=historyIndex===history.length?draft:history[historyIndex];$('#command-ghost').textContent='';}
  });
  $('#console-form').hidden=false;$('#console-form').addEventListener('submit',e=>{e.preventDefault();run(input.value);});
  document.addEventListener('click',e=>{const command=e.target.closest('[data-command]'),project=e.target.closest('[data-project]');if(command)run(command.dataset.command);else if(project)run('abrir '+project.dataset.project);});
  function motion(){document.documentElement.dataset.terminalMotion=motionOff?'off':'on';$('#terminal-motion').textContent=motionOff?'Activar animación':'Pausar animación';$('#terminal-motion').setAttribute('aria-pressed',String(motionOff));}
  $('#terminal-motion').addEventListener('click',()=>{motionOff=!motionOff;motion();});matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{motionOff=e.matches;motion();});motion();
  const params=new URLSearchParams(location.search),initial=params.get('lugar'),dirs={puerto:'/',taller:'/proyectos',archivo:'/cartografia',escuela:'/formacion',observatorio:'/ambiente'};if(Object.hasOwn(dirs,initial)){cwd=dirs[initial];currentPlace=initial;}sync();
  if(projectIds.includes(params.get('proyecto')))run('cat /proyectos/'+params.get('proyecto')+'.md',{record:false});
})();
