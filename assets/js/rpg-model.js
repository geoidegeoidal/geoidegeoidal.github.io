/* The same geometry drives play, click routes and the route-regression check. */
(function (scope) {
  'use strict';
  const width = 1600, height = 1120, cell = 20;
  const buildings = [
    { id: 'puerto', name: 'Puerto de partida', x: 330, y: 820, w: 220, h: 205, sprite: 0 },
    { id: 'archivo', name: 'Archivo ConMapas', x: 630, y: 420, w: 230, h: 215, sprite: 1 },
    { id: 'observatorio', name: 'Observatorio', x: 1250, y: 310, w: 230, h: 215, sprite: 2 },
    { id: 'taller', name: 'Taller de herramientas', x: 1150, y: 730, w: 245, h: 210, sprite: 3 },
    { id: 'escuela', name: 'Escuela de cartógrafos', x: 690, y: 930, w: 230, h: 200, sprite: 4 }
  ];
  const paths = [
    [260, 710, 1300, 710, 76], [770, 300, 770, 990, 72],
    [330, 850, 330, 710, 70], [330, 850, 450, 850, 64],
    [630, 450, 630, 710, 68], [630, 450, 770, 450, 68],
    [770, 370, 1250, 370, 76], [1250, 340, 1250, 400, 72],
    [1150, 760, 1150, 710, 82], [690, 960, 770, 960, 74]
  ];
  const npcs = [
    { id: 'guia', name: 'Nico', role: 'Guía del puerto', place: 'puerto', x: 460, y: 754, sprite: 3 },
    { id: 'cartografa', name: 'Violeta', role: 'Guardiana del archivo', place: 'archivo', x: 675, y: 487, sprite: 0 },
    { id: 'cientifica', name: 'Ada', role: 'Investigadora del observatorio', place: 'observatorio', x: 1290, y: 373, sprite: 2 },
    { id: 'constructor', name: 'Tomás', role: 'Constructor de herramientas', place: 'taller', x: 1200, y: 776, sprite: 1 },
    { id: 'docente', name: 'Lina', role: 'Docente de la escuela', place: 'escuela', x: 650, y: 990, sprite: 3 }
  ];
  const riverX = y => 960 + Math.sin(y / 145) * 32;
  const coastX = y => 155 + Math.sin(y / 110) * 28;
  const onBridge = y => Math.abs(y - 370) < 43 || Math.abs(y - 710) < 43;
  const distanceToSegment = (x, y, p) => {
    const [ax, ay, bx, by] = p;
    const t = Math.max(0, Math.min(1, ((x-ax)*(bx-ax)+(y-ay)*(by-ay))/((bx-ax)**2+(by-ay)**2)));
    return Math.hypot(x-ax-t*(bx-ax), y-ay-t*(by-ay));
  };
  const onPath = (x,y,padding=0) => paths.some(p => distanceToSegment(x,y,p) < p[4]/2+padding);
  let seed = 617;
  const random = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const trees = [];
  for (let n=0;n<330;n++) {
    const x = 205 + random()*1270, y = 105+random()*920;
    if (onPath(x,y,55) || Math.abs(x-riverX(y))<80 || buildings.some(b=>Math.abs(x-b.x)<b.w*.65 && y>b.y-b.h-35 && y<b.y+110) || npcs.some(p=>Math.hypot(x-p.x,y-p.y)<90) || (x>360&&x<620&&y>630&&y<870)) continue;
    trees.push({x:Math.round(x),y:Math.round(y),sprite:y<260?1:random()<.15?3:0,w:70+Math.round(random()*28),h:85+Math.round(random()*30)});
  }
  function walkable(x,y,scene='outside') {
    if (scene !== 'outside') return x>75&&x<565&&y>225&&y<438 && !(y<240&&x>270&&x<370) && Math.hypot(x-510,y-260)>19;
    if (x<coastX(y)+26 || x>1485 || y<90 || y>1040) return false;
    if (Math.abs(x-riverX(y))<45 && !onBridge(y)) return false;
    if (buildings.some(b=>Math.abs(x-b.x)<b.w*.38+9 && y>b.y-b.h*.5 && y<b.y+5)) return false;
    if (trees.some(t=>Math.hypot(x-t.x,y-t.y)<17)) return false;
    if (npcs.some(n=>Math.hypot(x-n.x,y-n.y)<19)) return false;
    return true;
  }
  function move(player,dx,dy,dt,scene='outside') {
    const length=Math.hypot(dx,dy);
    if (!length) return false;
    const distance=155*Math.min(dt,.05), x=player.x+dx/length*distance, y=player.y+dy/length*distance;
    const previous=[player.x,player.y];
    if (walkable(x,player.y,scene)) player.x=x;
    if (walkable(player.x,y,scene)) player.y=y;
    return previous[0]!==player.x || previous[1]!==player.y;
  }
  function findPath(start,goal,scene='outside') {
    const w=scene==='outside'?width:640,h=scene==='outside'?height:480,cols=w/cell,rows=h/cell;
    const at=(x,y)=>y*cols+x, center=(x,y)=>({x:x*cell+cell/2,y:y*cell+cell/2});
    const sx=Math.floor(start.x/cell),sy=Math.floor(start.y/cell);
    let gx=Math.max(0,Math.min(cols-1,Math.floor(goal.x/cell))),gy=Math.max(0,Math.min(rows-1,Math.floor(goal.y/cell)));
    if (!walkable(...Object.values(center(gx,gy)),scene)) {
      let closest;
      for(let y=gy-3;y<=gy+3;y++)for(let x=gx-3;x<=gx+3;x++) {
        const p=center(x,y),d=Math.hypot(p.x-goal.x,p.y-goal.y);
        if(x>=0&&y>=0&&x<cols&&y<rows&&walkable(p.x,p.y,scene)&&(!closest||d<closest.d))closest={x,y,d};
      }
      if(!closest)return [];gx=closest.x;gy=closest.y;
    }
    const from=new Int32Array(cols*rows).fill(-1),queue=[at(sx,sy)],end=at(gx,gy);
    from[queue[0]]=queue[0];
    // ponytail: fixed 80x56 grid, BFS stays small; use A* for substantially larger worlds.
    for(let i=0;i<queue.length&&from[end]===-1;i++) {
      const node=queue[i],x=node%cols,y=Math.floor(node/cols);
      for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nx=x+dx,ny=y+dy,k=at(nx,ny),p=center(nx,ny);
        if(nx<0||ny<0||nx>=cols||ny>=rows||from[k]!==-1||!walkable(p.x,p.y,scene))continue;
        from[k]=node;queue.push(k);
      }
    }
    if(from[end]===-1)return [];
    const result=[];
    for(let k=end;k!==queue[0];k=from[k])result.push(center(k%cols,Math.floor(k/cols)));
    return result.reverse();
  }
  function camera(view, player, dt, snap = false) {
    const vw = view.w / view.scale, vh = view.h / view.scale;
    const bound = (value, size, extent) => size >= extent ? (extent - size) / 2 : Math.max(0, Math.min(extent - size, value));
    const axis = (position, current, size, extent) => {
      const delta = Math.min(0, position - current - size * .38) + Math.max(0, position - current - size * .62);
      const target = bound(snap ? position - size / 2 : current + delta, size, extent);
      return snap ? target : current + (target - current) * (1 - Math.exp(-10 * dt));
    };
    return { x: axis(player.x, view.x, vw, width), y: axis(player.y, view.y, vh, height) };
  }
  const api={width,height,cell,buildings,paths,npcs,trees,riverX,coastX,onBridge,onPath,walkable,move,findPath,camera};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else scope.PortfolioWorld=api;
})(typeof window==='undefined'?globalThis:window);
