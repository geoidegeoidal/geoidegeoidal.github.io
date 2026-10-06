(function(scope){
  'use strict';
  function resolvePath(raw,cwd='/'){
    raw=String(raw||'').replace(/^~(?=\/|$)/,'/').replace(/^\/home\/jorge(?=\/|$)/,'/');
    const parts=(raw.startsWith('/')?raw:cwd+'/'+raw).split('/'),out=[];
    for(const part of parts){if(part==='..')out.pop();else if(part&&part!=='.')out.push(part);}
    return '/'+out.join('/');
  }
  function tokens(raw){const result=[];let token='',quote='',active=false;for(const char of raw){if(quote){if(char===quote)quote='';else token+=char;}else if(char==='"'||char==="'"){quote=char;active=true;}else if(/\s/.test(char)){if(active){result.push(token);token='';active=false;}}else{token+=char;active=true;}}if(quote)throw new Error('Falta cerrar una comilla.');if(active)result.push(token);return result;}
  function children(files,dir){return Object.keys(files).filter(p=>p!=='/'&&p.slice(0,p.lastIndexOf('/'))===(dir==='/'?'':dir));}
  const api={resolvePath,tokens,children};if(typeof module!=='undefined'&&module.exports)module.exports=api;else scope.PortfolioTerminal=api;
})(typeof window==='undefined'?globalThis:window);
