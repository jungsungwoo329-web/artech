import { VW, VH, WW, WH } from '../config.js';
import { player, cam } from '../state.js';

export function updateCamera(p) {
  cam.x += (p.constrain(player.x - VW/2, 0, WW - VW) - cam.x) * 0.12;
  cam.y += (p.constrain(player.y - VH/2, 0, WH - VH) - cam.y) * 0.12;
}
