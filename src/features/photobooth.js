import { PHOTOBOOTHS, VW, VH } from '../config.js';
import { player, cam, game, photoGallery, pendingPhotoData } from '../state.js';
import { hex2rgb } from '../entities/character.js';

export function drawPhotoBooths(p, t) {
  for(const pb of PHOTOBOOTHS){
    const sx=pb.x-cam.x, sy=pb.y-cam.y;
    if(sx<-180||sx>VW+180||sy<-180||sy>VH+180) continue;
    const [cr,cg,cb]=hex2rgb(pb.color);
    const inZone=p.dist(player.x,player.y,pb.x,pb.y)<pb.r;
    const pulse=1+.05*Math.sin(t*2.2+pb.x*.005);
    p.noStroke(); p.fill(cr,cg,cb,inZone?28:14); p.circle(sx,sy,pb.r*2*pulse);
    p.stroke(cr,cg,cb,inZone?200:90); p.strokeWeight(inZone?2:1); p.noFill();
    p.circle(sx,sy,pb.r*2*pulse);
    const hs=pb.r*.55; p.stroke(cr,cg,cb,inZone?170:70); p.strokeWeight(2);
    p.line(sx-hs,sy-hs+10,sx-hs,sy-hs); p.line(sx-hs,sy-hs,sx-hs+10,sy-hs);
    p.line(sx+hs-10,sy-hs,sx+hs,sy-hs); p.line(sx+hs,sy-hs,sx+hs,sy-hs+10);
    p.line(sx-hs,sy+hs-10,sx-hs,sy+hs); p.line(sx-hs,sy+hs,sx-hs+10,sy+hs);
    p.line(sx+hs-10,sy+hs,sx+hs,sy+hs); p.line(sx+hs,sy+hs,sx+hs,sy+hs-10);
    p.noStroke();
    p.fill(cr,cg,cb,inZone?220:120);
    p.textFont('Noto Sans KR'); p.textSize(11); p.textAlign(p.CENTER,p.BOTTOM);
    p.text(pb.theme,sx,sy-pb.r*.6);
  }
}

export function updateBoothDetection(p) {
  let inBooth=null;
  for(const pb of PHOTOBOOTHS){ if(p.dist(player.x,player.y,pb.x,pb.y)<pb.r){inBooth=pb;break;} }
  if(inBooth!==game.currentBooth){
    game.currentBooth=inBooth; window._currentBooth=inBooth;
    const hud=document.getElementById('photobooth-hud');
    if(inBooth){ document.getElementById('pb-label').textContent='📸 '+inBooth.theme; hud.classList.add('show'); }
    else hud.classList.remove('show');
  }
}

export function shootPhoto() {
  const booth=window._currentBooth;
  if(!booth) return;
  const srcCanvas=document.querySelector('#sketch-wrapper canvas');
  const pbCv=document.getElementById('pb-canvas');
  const ctx=pbCv.getContext('2d');
  ctx.fillStyle=booth.bg; ctx.fillRect(0,0,400,260);
  drawBoothBg(ctx,booth);
  if(srcCanvas){
    const c=window._getCam?window._getCam():{x:0,y:0};
    const bx=booth.x-c.x-160, by=booth.y-c.y-130;
    ctx.drawImage(srcCanvas,Math.max(0,bx),Math.max(0,by),320,260,40,0,320,260);
  }
  document.getElementById('pb-frame-label').textContent=`📸 ${booth.theme}`;
  pendingPhotoData.value={booth,time:new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'})};
  const flash=document.createElement('div');
  flash.style.cssText='position:absolute;inset:0;background:#fff;z-index:999;pointer-events:none;opacity:.9;transition:opacity .35s';
  document.getElementById('sketch-wrapper').appendChild(flash);
  setTimeout(()=>{ flash.style.opacity='0'; setTimeout(()=>{ flash.remove(); showPbOverlay(booth); },350); },80);
}

export function drawBoothBg(ctx, booth) {
  ctx.fillStyle=booth.bgAccent;
  if(booth.id==='park'){
    for(let i=0;i<5;i++){
      ctx.fillStyle='#0e2414'; ctx.fillRect(30+i*70,160,12,50);
      ctx.fillStyle='#1a4220'; ctx.beginPath(); ctx.arc(36+i*70,155,20,0,Math.PI*2); ctx.fill();
    }
    ctx.fillStyle='rgba(34,90,34,.3)'; ctx.fillRect(0,200,400,60);
  } else if(booth.id==='club'){
    for(let i=0;i<8;i++){
      ctx.fillStyle=`hsla(${i*45},100%,70%,.4)`;
      ctx.beginPath(); ctx.arc(50*i+25,30,15,0,Math.PI*2); ctx.fill();
    }
    ctx.fillStyle='rgba(100,0,150,.2)'; ctx.fillRect(0,220,400,40);
  } else if(booth.id==='skate'){
    ctx.fillStyle='rgba(80,50,20,.4)'; ctx.fillRect(0,180,400,80);
    ctx.strokeStyle='rgba(255,150,50,.3)'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(0,200); ctx.quadraticCurveTo(200,120,400,200); ctx.stroke();
  } else if(booth.id==='airport'){
    ctx.fillStyle='rgba(20,40,80,.4)'; ctx.fillRect(0,180,400,80);
    ctx.fillStyle='rgba(255,255,100,.15)';
    for(let i=0;i<5;i++) ctx.fillRect(30+i*80,210,40,8);
  }
}

export function showPbOverlay(booth) {
  document.getElementById('pb-bg').style.background=booth.bg;
  document.getElementById('pb-overlay').classList.add('show');
  window._pauseInput=true;
}

export function savePbPhoto() {
  const pbCv=document.getElementById('pb-canvas');
  const dataURL=pbCv.toDataURL('image/png');
  const booth=window._currentBooth||{theme:'포토부스'};
  const time=pendingPhotoData.value?pendingPhotoData.value.time:'--:--';
  photoGallery.push({dataURL,label:booth.theme,time});
  closePbOverlay();
}

export function closePbOverlay() {
  document.getElementById('pb-overlay').classList.remove('show');
  window._pauseInput=false;
}
