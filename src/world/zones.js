import { WW, WH, HY } from '../config.js';
import { player } from '../state.js';

export function getZoneName(wx, wy) {
  if(wx<WW*0.35 && wy<HY)              return '🌳 공원';
  if(wx>=WW*0.35 && wx<WW*0.65 && wy<HY) return '🎵 뮤직홀';
  if(wx>=WW*0.65 && wy<HY)             return '🎤 클럽';
  if(wx<WW*0.35 && wy>=HY)             return '☕ 카페거리';
  if(wx>=WW*0.35 && wx<WW*0.65 && wy>=HY) return '🎸 공연장';
  return '🎧 레코드샵';
}

export function walkable(x, y) {
  return x>30 && y>30 && x<WW-30 && y<WH-30;
}

export function updateZoneHUD() {
  document.getElementById('zone-hud').textContent = getZoneName(player.x, player.y);
}
