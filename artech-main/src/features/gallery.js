import { photoGallery } from '../state.js';

export function openGallery() {
  document.getElementById('gallery').classList.add('show');
  renderGallery();
  window._pauseInput=true;
}

export function closeGallery() {
  document.getElementById('gallery').classList.remove('show');
  window._pauseInput=false;
}

export function renderGallery() {
  const grid=document.getElementById('gallery-grid');
  const empty=document.getElementById('gallery-empty');
  if(!photoGallery.length){ empty.style.display='block'; grid.innerHTML=''; grid.appendChild(empty); return; }
  empty.style.display='none'; grid.innerHTML='';
  photoGallery.forEach((ph,i)=>{
    const item=document.createElement('div'); item.className='g-item';
    item.innerHTML=`<img src="${ph.dataURL}" alt="photo"/><div class="g-item-label">${ph.label} · ${ph.time}</div><button class="g-dl" onclick="dlPhoto(${i})">↓ 저장</button>`;
    grid.appendChild(item);
  });
}

export function dlPhoto(i) {
  const a=document.createElement('a');
  a.href=photoGallery[i].dataURL; a.download=`musicworld_${i+1}.png`; a.click();
}
