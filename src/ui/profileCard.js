import { game } from '../state.js';
import { drawCharCanvas } from '../entities/character.js';

export function openProfileCard(npc) {
  const cv=document.getElementById('pc-char-canvas');
  const ctx=cv.getContext('2d');
  ctx.clearRect(0,0,90,110);
  drawCharCanvas(ctx,45,78,npc.shirt,npc.pants,npc.hair,npc.skin,npc.acc,false);
  document.getElementById('pc-title').textContent=npc.name+"'S PROFILE";
  document.getElementById('pc-name').textContent=npc.name;
  document.getElementById('pc-bio').textContent=npc.bio||'';
  document.getElementById('pc-fave-title').textContent=npc.fave.emoji+' '+npc.fave.title;
  document.getElementById('pc-fave-artist').textContent=npc.fave.artist;
  const rows=npc.songs.map(s=>`
    <div class="pc-song-row">
      <div class="pc-song-emoji">${s.emoji}</div>
      <div><div class="pc-song-title">${s.title}</div><div class="pc-song-artist">${s.artist}</div></div>
    </div>`).join('');
  document.getElementById('pc-songs').innerHTML=rows;
  document.getElementById('profile-card').classList.add('show');
  window._pauseInput=true;
}

export function closeProfileCard() {
  document.getElementById('profile-card').classList.remove('show');
  window._pauseInput=false;
}

export function onBubbleClick() {
  const bubble=document.getElementById('npc-bubble');
  if(!bubble.classList.contains('show')) return;
  game.currentNPC=window._getNearNPC?window._getNearNPC():null;
  if(!game.currentNPC) return;
  openProfileCard(game.currentNPC);
}

export function onMusicItemClick() {
  game.currentNPC=window._getNearNPC?window._getNearNPC():null;
  if(game.currentNPC) openProfileCard(game.currentNPC);
}
