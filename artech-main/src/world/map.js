import { WW, WH, VW, VH } from '../config.js';
import { cam, game } from '../state.js';

export function setupMap(p) {
  game.bgMap = p.loadImage('assets/map.jpg');
}

export function drawBgImage(p) {
  if(game.bgMap && game.bgMap.width > 0){
    p.image(game.bgMap, -cam.x, -cam.y, WW, WH);
  } else {
    p.background('#07071a');
  }
}

export function getTileColor(type) {
  const COLORS = {
    'park_grass':'#1e4a1e', 'park_path':'#2a3a1a', 'park_dark':'#0d2e0d',
    'club_floor':'#1a0a2e', 'club_stage':'#2a1060', 'club_dark':'#0a0418',
    'skate_concrete':'#2a2420', 'skate_ramp':'#1a1208', 'skate_edge':'#3a3020',
    'air_tarmac':'#1a1e2e', 'air_runway':'#141828', 'air_build':'#0e1420',
    'road':'#1e1e24', 'center':'#1a1a28',
  };
  return COLORS[type] || '#1a1a28';
}

// 구역별 절차적 오버레이 (현재 draw 루프에서 미사용 — 향후 활용 예비)
export function drawZoneDetail(p, z, sx, sy, t) {
  const cx=sx+z.w/2, cy=sy+z.h/2;
  p.noStroke();
  if(z.type==='park'){
    const trees=[[0.15,0.3],[0.35,0.15],[0.55,0.4],[0.25,0.65],[0.7,0.25],[0.8,0.6],[0.45,0.75],[0.1,0.75]];
    for(const[rx,ry] of trees){
      const tx=sx+rx*z.w, ty=sy+ry*z.h;
      if(tx<-30||tx>VW+30||ty<-30||ty>VH+30) continue;
      p.fill(14,36,20); p.rect(tx-5,ty+8,10,16);
      p.fill(26,66,32); p.circle(tx,ty,32);
      p.fill(35,80,42); p.circle(tx-4,ty-6,20);
      p.fill(45,100,55); p.circle(tx+3,ty-10,14);
    }
    p.fill(30,80,130,180); p.circle(cx,cy,50);
    p.fill(60,140,200,Math.floor(120+80*Math.sin(t*2)));
    p.circle(cx,cy-5,20);
    p.stroke(140,160,100,60); p.strokeWeight(3); p.noFill();
    p.ellipse(cx,cy,z.w*0.6,z.h*0.6);
    p.noStroke();
  } else if(z.type==='club'||z.type==='club2'){
    for(let i=0;i<5;i++){
      const hue=(t*50+i*72)%360;
      const lx=sx+z.w*(0.15+i*0.17), ly=sy+z.h*0.3;
      if(lx<-20||lx>VW+20) continue;
      p.fill(`hsl(${hue},100%,60%)`);
      p.ellipse(lx,ly,18,18+10*Math.sin(t*2+i));
      p.fill(`hsla(${hue},100%,60%,0.08)`);
      p.triangle(lx,ly,lx-20,sy+z.h,lx+20,sy+z.h);
    }
    p.fill(160,0,220,200); p.rect(cx-28,sy+10,56,20);
    p.fill(255); p.textFont('Press Start 2P'); p.textSize(7);
    p.textAlign(p.CENTER,p.CENTER); p.text('CLUB',cx,sy+20);
    p.fill(180,10,10,200); p.rect(cx-12,sy+z.h-30,24,30);
  } else if(z.type==='stage'||z.type==='stage2'){
    p.fill(20,10,50,220); p.rect(sx+20,sy+20,z.w-40,z.h-40);
    p.fill(240,240,255,Math.floor(180+60*Math.sin(t*.5)));
    p.rect(cx-z.w*0.25,sy+25,z.w*0.5,z.h*0.35);
    for(let i=0;i<4;i++){
      const hue=(t*30+i*90)%360;
      const lx=sx+z.w*(0.15+i*0.22);
      if(lx<-20||lx>VW+20) continue;
      p.fill(`hsla(${hue},100%,70%,0.5)`);
      p.triangle(lx,sy+10,lx-25,sy+z.h,lx+25,sy+z.h);
    }
    p.fill(15,10,40,180); p.rect(sx+20,cy,z.w-40,z.h*0.35);
    for(let row=0;row<3;row++) for(let col=0;col<8;col++){
      const rx=sx+40+col*(z.w-60)/8, ry=cy+10+row*18;
      if(rx<-10||rx>VW+10) continue;
      p.fill(80+row*20,60,120); p.rect(rx,ry,12,12);
    }
  } else if(z.type==='cafe'){
    p.fill(100,70,30,100); p.rect(sx+15,sy+15,z.w-30,z.h-30);
    const tables=[[.2,.35],[.5,.35],[.75,.35],[.2,.7],[.5,.7],[.75,.7]];
    for(const[rx,ry] of tables){
      const tx=sx+rx*z.w, ty=sy+ry*z.h;
      if(tx<-20||tx>VW+20||ty<-20||ty>VH+20) continue;
      p.fill(140,100,50,200); p.circle(tx,ty,20);
      p.fill(120,80,30,180); p.circle(tx-12,ty+4,8); p.circle(tx+10,ty-5,8);
    }
    p.fill(200,140,30,220); p.rect(cx-24,sy+6,48,18);
    p.fill(255); p.textFont('Press Start 2P'); p.textSize(6);
    p.textAlign(p.CENTER,p.CENTER); p.text('CAFE',cx,sy+15);
  } else if(z.type==='record'||z.type==='record2'){
    const cols=Math.floor(z.w/40), rows2=Math.floor(z.h/50);
    for(let r=0;r<rows2;r++) for(let c=0;c<cols;c++){
      const rx=sx+20+c*40, ry=sy+20+r*50;
      if(rx<-30||rx>VW+30||ry<-30||ry>VH+30) continue;
      const hue=(r*cols+c)*47%360;
      p.fill(`hsl(${hue},60%,30%)`); p.rect(rx,ry,32,42);
      p.fill(255,255,255,30); p.rect(rx,ry,32,8);
    }
    p.fill(180,30,30,200); p.rect(cx-34,sy+6,68,18);
    p.fill(255); p.textFont('Press Start 2P'); p.textSize(5);
    p.textAlign(p.CENTER,p.CENTER); p.text('RECORDS',cx,sy+15);
  } else if(z.type==='arcade'){
    for(let i=0;i<4;i++){
      const ax=sx+30+i*100, ay=sy+20;
      if(ax<-20||ax>VW+20) continue;
      const hue=(t*20+i*90)%360;
      p.fill(30,20,60); p.rect(ax,ay,60,z.h-40);
      p.fill(`hsl(${hue},100%,60%)`); p.rect(ax+8,ay+10,44,28);
      p.fill(20,10,40); p.rect(ax+14,ay+44,32,20);
    }
    p.fill(100,0,180,220); p.rect(cx-34,sy+6,68,18);
    p.fill(255); p.textFont('Press Start 2P'); p.textSize(5);
    p.textAlign(p.CENTER,p.CENTER); p.text('ARCADE',cx,sy+15);
  } else if(z.type==='hotel'){
    p.fill(220,200,140,80); p.rect(sx+10,sy+10,z.w-20,z.h-20);
    for(let r=0;r<3;r++) for(let c=0;c<3;c++){
      const wx=sx+20+c*50, wy=sy+20+r*60;
      if(wx>VW||wy>VH) continue;
      p.fill(255,240,180,Math.floor(80+60*Math.sin(t+r+c)));
      p.rect(wx,wy,28,36);
    }
    p.fill(255); p.textFont('Press Start 2P'); p.textSize(5);
    p.textAlign(p.CENTER,p.CENTER); p.text('HOTEL',cx,sy+12);
  }
}
