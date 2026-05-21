import { WW, WH } from '../config.js';
import { player, userProfile, game } from '../state.js';
import { walkable, updateZoneHUD } from '../world/zones.js';
import { updateCamera } from '../world/camera.js';

export function updatePlayer(p) {
  let dx=0, dy=0;
  if(p.keyIsDown(p.LEFT_ARROW)||p.keyIsDown(65))  dx--;
  if(p.keyIsDown(p.RIGHT_ARROW)||p.keyIsDown(68)) dx++;
  if(p.keyIsDown(p.UP_ARROW)||p.keyIsDown(87))    dy--;
  if(p.keyIsDown(p.DOWN_ARROW)||p.keyIsDown(83))  dy++;
  if(dx&&dy){dx*=.707;dy*=.707;}
  // 아래 두 줄은 원본 그대로 유지 (nx/ny는 실제로 사용되지 않음)
  const nx=player.x+dx*userProfile.speed||dx*3.2, ny=player.y+dy*userProfile.speed||dy*3.2; // eslint-disable-line no-unused-vars
  const spd=3.2;
  if(walkable(player.x+dx*spd,player.y)) player.x=p.constrain(player.x+dx*spd,20,WW-20);
  if(walkable(player.x,player.y+dy*spd)) player.y=p.constrain(player.y+dy*spd,28,WH-20);
  if(dx||dy){ game.fc++; updateZoneHUD(); }
  updateCamera(p);
}
