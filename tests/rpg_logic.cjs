const assert=require('node:assert/strict');
const W=require('../assets/js/rpg-model.js');
const start={x:430,y:790};
assert(W.walkable(start.x,start.y));
assert(!W.walkable(W.riverX(550),550),'river blocks walking');
assert(W.walkable(W.riverX(710),710),'bridge crosses river');
const p={...start};W.move(p,1,1,1);assert(Math.hypot(p.x-start.x,p.y-start.y)<=7.751,'diagonal normalized and elapsed time clamped');
for(const b of W.buildings){
  const player={...start},route=W.findPath(player,{x:b.x,y:b.y+30});assert(route.length,'reachable '+b.id);
  for(const target of route){let frames=0;while(Math.hypot(target.x-player.x,target.y-player.y)>2&&frames++<100){const dx=target.x-player.x,dy=target.y-player.y;W.move(player,dx,dy,Math.min(1/60,Math.hypot(dx,dy)/155));}assert(frames<100,'route unobstructed '+b.id+' '+JSON.stringify(target));}
  assert(Math.hypot(player.x-b.x,player.y-b.y-30)<25,'arrive at '+b.id);
  assert(!W.walkable(b.x,b.y-30),'building has solid walls');
}
for(const n of W.npcs)assert(W.findPath(start,{x:n.x,y:n.y+35}).length,'NPC reachable '+n.name);
assert(!W.walkable(200,180,'taller'),'illustrated wall and counter block walking');
assert(!W.walkable(60,350,'taller'),'wall furnishings block walking');
assert(!W.walkable(320,180,'taller'),'interior table collision');
assert(W.findPath({x:320,y:378},{x:320,y:255},'taller').length,'interior exhibits reachable');
console.log('PASS RPG movement, river, bridges, all five doors, NPCs and interiors');
