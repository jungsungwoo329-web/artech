import { VW, VH, WW, WH, MM_W, MM_H, MM_X, MM_Y, PHOTOBOOTHS } from '../config.js';
import { player, cam, NPCS, game } from '../state.js';
import { hex2rgb } from '../entities/character.js';

export function setupMinimapBase(p) {
  game.minimapBase=p.createGraphics(MM_W,MM_H);
  game.minimapBase.noStroke();
  const SX=WW/MM_W, SY=WH/MM_H;
  game.minimapBase.background(175,180,208);
  const mmZones=[
    {x:0,   y:0,   w:480, h:325, c:'#2d5a2d'},
    {x:570, y:0,   w:970, h:325, c:'#1a0a3e'},
    {x:1630,y:0,   w:420, h:325, c:'#18042a'},
    {x:0,   y:415, w:480, h:265, c:'#3a2810'},
    {x:570, y:415, w:390, h:265, c:'#0a0418'},
    {x:1630,y:415, w:420, h:265, c:'#18042a'},
    {x:960, y:415, w:580, h:265, c:'#2a1a08'},
    {x:0,   y:770, w:480, h:280, c:'#0a1a0a'},
    {x:570, y:770, w:970, h:280, c:'#12083a'},
    {x:1630,y:770, w:420, h:280, c:'#1a0808'},
  ];
  for(const z of mmZones){
    game.minimapBase.fill(z.c);
    game.minimapBase.rect(z.x/SX,z.y/SY,z.w/SX,z.h/SY);
  }
}

export function drawMinimap(p) {
  const SX=WW/MM_W, SY=WH/MM_H;
  p.noStroke(); p.fill(5,5,16,230); p.rect(MM_X,MM_Y,MM_W,MM_H);
  if(game.minimapBase) p.image(game.minimapBase,MM_X,MM_Y);
  else{ p.fill(30,30,60,220); p.rect(MM_X,MM_Y,MM_W,MM_H); }
  for(const pb of PHOTOBOOTHS){
    const [cr,cg,cb]=hex2rgb(pb.color);
    p.noStroke(); p.fill(cr,cg,cb,200);
    p.rect(MM_X+pb.x/SX-3,MM_Y+pb.y/SY-3,6,6);
  }
  for(const n of NPCS){
    const [cr,cg,cb]=hex2rgb(n.shirt);
    p.noStroke(); p.fill(cr,cg,cb,200);
    p.circle(MM_X+n.x/SX,MM_Y+n.y/SY,3.5);
  }
  p.noFill(); p.stroke(255,255,255,80); p.strokeWeight(.8);
  p.rect(MM_X+cam.x/SX,MM_Y+cam.y/SY,VW/SX,VH/SY);
  p.noStroke(); p.fill(255,220,80); p.circle(MM_X+player.x/SX,MM_Y+player.y/SY,7);
  p.noFill(); p.stroke(255,255,255,22); p.strokeWeight(1);
  p.rect(MM_X,MM_Y,MM_W,MM_H);
}

export function drawScanlines(p) {
  p.noStroke(); p.fill(0,0,0,10);
  for(let y=0;y<VH;y+=4) p.rect(0,y,VW,2);
}
