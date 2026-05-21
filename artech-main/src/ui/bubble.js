import { NPCS, player, cam, game } from '../state.js';

export function updateBubble(p) {
  const bubble=document.getElementById('npc-bubble');
  const musicBtn=document.getElementById('music-item-btn');
  let near=null, nd=75;
  for(const n of NPCS){ const d=p.dist(player.x,player.y,n.x,n.y); if(d<nd){nd=d;near=n;} }
  if(near){
    if(game.activeNPC!==near){
      game.activeNPC=near;
      near.quoteIdx=(near.quoteIdx+1)%near.quotes.length;
      game.qTimer=280;
    }
    document.getElementById('bubble-name').textContent=near.name;
    const bioText=near.bio&&near.bio.trim()?near.bio:near.quotes[near.quoteIdx];
    document.getElementById('bubble-text').textContent=bioText;
    bubble.style.left=(near.x-cam.x)+'px';
    bubble.style.top=(near.y-cam.y-44)+'px';
    bubble.classList.add('show');
    musicBtn.style.left=(near.x-cam.x)+'px';
    musicBtn.style.top=(near.y-cam.y-10)+'px';
    musicBtn.style.display='block';
    if(--game.qTimer<=0){ near.quoteIdx=(near.quoteIdx+1)%near.quotes.length; game.qTimer=280; }
  } else {
    bubble.classList.remove('show');
    musicBtn.style.display='none';
    game.activeNPC=null;
  }
}
