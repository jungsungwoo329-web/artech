import { NPC_DEF, NPC_START, WW, WH, VW, VH } from '../config.js';
import { NPCS, player, cam, game, userProfile } from '../state.js';
import { walkable } from '../world/zones.js';
import { drawChar } from './character.js';

export function initNPCs() {
  NPCS.length = 0;
  NPC_DEF.forEach((d, i) => {
    const pos = NPC_START[i] || {x: WW/2+i*120, y: WH/2};
    NPCS.push({
      ...d,
      x:pos.x, y:pos.y,
      dx:Math.random()<.5?1:-1, dy:0,
      speed:.7+Math.random()*.5,
      mTimer:Math.floor(Math.random()*180+60),
      iTimer:0, idle:false, frame:0, fTimer:0, quoteIdx:0,
    });
  });
}

export function updateNPCs(p) {
  for(const n of NPCS){
    if(n.idle){ if(--n.iTimer<=0){n.idle=false;n.mTimer=Math.floor(Math.random()*180+60);} continue; }
    if(--n.mTimer<=0){
      if(Math.random()<.25){ n.idle=true;n.iTimer=Math.floor(Math.random()*120+40);n.dx=0;n.dy=0; continue; }
      const a=Math.random()*p.TWO_PI; n.dx=Math.cos(a);n.dy=Math.sin(a);
      n.mTimer=Math.floor(Math.random()*180+60);
    }
    const nx=n.x+n.dx*n.speed, ny=n.y+n.dy*n.speed;
    if(walkable(nx,ny)){n.x=nx;n.y=ny;}
    else{const a=Math.random()*p.TWO_PI;n.dx=Math.cos(a);n.dy=Math.sin(a);n.mTimer=60;}
    if(++n.fTimer>10){n.fTimer=0;n.frame=(n.frame+1)%2;}
  }
}

export function drawEntities(p) {
  const moving = p.keyIsDown(p.LEFT_ARROW)||p.keyIsDown(65)||
                 p.keyIsDown(p.RIGHT_ARROW)||p.keyIsDown(68)||
                 p.keyIsDown(p.UP_ARROW)||p.keyIsDown(87)||
                 p.keyIsDown(p.DOWN_ARROW)||p.keyIsDown(83);
  const playerLeg = moving && (Math.floor(game.fc/8)%2===1);

  const ents = [
    {y:player.y, fn:()=>{
      const px=Math.round(player.x-cam.x), py=Math.round(player.y-cam.y);
      drawChar(p,px,py,userProfile.shirt,userProfile.pants,userProfile.hair,userProfile.skin,userProfile.acc,playerLeg);
      p.noStroke();
      p.fill(0,0,0,120); p.rect(px-26,py+26,52,13);
      p.fill(255,255,255,220);
      p.textFont('Press Start 2P'); p.textSize(6); p.textAlign(p.CENTER,p.CENTER);
      p.text(userProfile.name,px,py+33);
    }},
    ...NPCS.map(n=>({y:n.y, fn:()=>{
      const sx=Math.round(n.x-cam.x), sy=Math.round(n.y-cam.y);
      if(sx<-60||sx>VW+60||sy<-60||sy>VH+60) return;
      const walking=!n.idle&&(Math.abs(n.dx)>.05||Math.abs(n.dy)>.05);
      drawChar(p,sx,sy,n.shirt,n.pants,n.hair,n.skin,n.acc,walking&&n.frame===1);
      p.noStroke();
      p.fill(0,0,0,100); p.rect(sx-26,sy+26,52,13);
      p.fill(200,200,255,210);
      p.textFont('Press Start 2P'); p.textSize(6); p.textAlign(p.CENTER,p.CENTER);
      p.text(n.name,sx,sy+33);
      if(p.dist(player.x,player.y,n.x,n.y)<90){
        p.textSize(13); p.textAlign(p.CENTER,p.BOTTOM); p.text('🎧',sx,sy-52);
      }
    }})),
  ].sort((a,b)=>a.y-b.y);

  for(const e of ents) e.fn();
}
