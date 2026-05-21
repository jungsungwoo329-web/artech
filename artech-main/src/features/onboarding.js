import { userProfile, sel } from '../state.js';
import { SHIRT_C, PANTS_C, HAIR_C, SKIN_C, ACC_LIST } from '../config.js';
import { drawCharCanvas } from '../entities/character.js';

export function initOnboarding() {
  window.addEventListener('load', () => {
    const bar=document.getElementById('loading-bar');
    const txt=document.getElementById('loading-text');
    const msgs=['LOADING...','BUILDING MAP...','SPAWNING USERS...','READY!'];
    let pct=0;
    const iv=setInterval(()=>{
      pct+=Math.random()*7+3; if(pct>=100){pct=100;clearInterval(iv);}
      bar.style.width=pct+'%';
      txt.textContent=msgs[Math.floor(pct/25)]||'READY!';
      if(pct>=100) setTimeout(showMusicStep,600);
    },80);
  });
}

export function showMusicStep() {
  document.getElementById('ob-loading').classList.remove('active');
  document.getElementById('ob-music').classList.add('active');
}

export function goToChar() {
  const emojis=['🎵','🎸','🎹','🎺'];
  const songs=[];
  for(let i=0;i<4;i++){
    const t=(document.getElementById('s'+i+'-title').value.trim())||'(미입력)';
    const a=(document.getElementById('s'+i+'-artist').value.trim())||'(미입력)';
    songs.push({title:t,artist:a,emoji:emojis[i]});
  }
  userProfile.fave=songs[0];
  userProfile.songs=songs.slice(1);
  document.getElementById('ob-music').classList.remove('active');
  document.getElementById('ob-char').classList.add('active');
  buildSwatches(); updatePreview();
}

export function updateBioCount() {
  const v=document.getElementById('bio-input').value;
  document.getElementById('bio-count').textContent=v.length+'/20';
}

export function updatePreview() {
  const cv=document.getElementById('char-canvas-preview');
  const ctx=cv.getContext('2d');
  ctx.clearRect(0,0,110,120);
  drawCharCanvas(ctx,55,82,sel.shirt,sel.pants,sel.hair,sel.skin,sel.acc,false);
}

export function buildSwatches() {
  function makeSwatch(id,colors,cur,setter){
    const el=document.getElementById(id); el.innerHTML='';
    colors.forEach(c=>{
      const s=document.createElement('div');
      s.className='swatch'+(c===cur?' active':'');
      s.style.background=c;
      s.style.border=c==='#ffffff'?'2px solid rgba(255,255,255,.3)':'2px solid transparent';
      if(cur===c) s.style.borderColor='#fff';
      s.onclick=()=>{
        el.querySelectorAll('.swatch').forEach(x=>{x.style.borderColor='transparent';});
        s.style.borderColor='#fff'; setter(c); updatePreview();
      };
      el.appendChild(s);
    });
  }
  makeSwatch('shirt-sw',SHIRT_C,sel.shirt,v=>{ sel.shirt=v; });
  makeSwatch('pants-sw',PANTS_C,sel.pants,v=>{ sel.pants=v; });
  makeSwatch('hair-sw', HAIR_C, sel.hair,  v=>{ sel.hair=v;  });
  makeSwatch('skin-sw', SKIN_C, sel.skin,  v=>{ sel.skin=v;  });
  const accEl=document.getElementById('acc-sw'); accEl.innerHTML='';
  ACC_LIST.forEach(a=>{
    const s=document.createElement('div');
    s.className='acc-swatch'+(a===sel.acc?' active':'');
    s.textContent=a==='none'?'✕':a;
    s.title=a==='none'?'없음':a;
    s.onclick=()=>{
      accEl.querySelectorAll('.acc-swatch').forEach(x=>x.classList.remove('active'));
      s.classList.add('active'); sel.acc=a; updatePreview();
    };
    accEl.appendChild(s);
  });
}

export function startWorld() {
  const n=document.getElementById('char-name-input').value.trim();
  userProfile.name=n||'PLAYER';
  userProfile.bio=document.getElementById('bio-input').value.trim()||'음악을 사랑합니다 🎵';
  userProfile.shirt=sel.shirt; userProfile.pants=sel.pants;
  userProfile.hair=sel.hair;   userProfile.skin=sel.skin; userProfile.acc=sel.acc;
  const ob=document.getElementById('onboarding');
  ob.style.transition='opacity .6s'; ob.style.opacity='0';
  setTimeout(()=>{ ob.remove(); window._startGame && window._startGame(); },700);
}
