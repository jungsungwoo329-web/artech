import { setupMap, drawBgImage } from './world/map.js';
import { updateZoneHUD } from './world/zones.js';
import { updatePlayer } from './entities/player.js';
import { initNPCs, updateNPCs, drawEntities } from './entities/npc.js';
import { drawPhotoBooths, updateBoothDetection, shootPhoto, savePbPhoto, closePbOverlay } from './features/photobooth.js';
import { openGallery, closeGallery, dlPhoto } from './features/gallery.js';
import { initOnboarding, goToChar, updateBioCount, updatePreview, startWorld } from './features/onboarding.js';
import { openProfileCard, closeProfileCard, onBubbleClick, onMusicItemClick } from './ui/profileCard.js';
import { updateBubble } from './ui/bubble.js';
import { setupMinimapBase, drawMinimap, drawScanlines } from './ui/hud.js';
import { player, cam, NPCS, game } from './state.js';
import { VW, VH } from './config.js';

// HTML onclick 핸들러가 참조하는 함수들을 window에 노출
window.onBubbleClick    = onBubbleClick;
window.onMusicItemClick = onMusicItemClick;
window.closeProfileCard = closeProfileCard;
window.shootPhoto       = shootPhoto;
window.savePbPhoto      = savePbPhoto;
window.closePbOverlay   = closePbOverlay;
window.openGallery      = openGallery;
window.closeGallery     = closeGallery;
window.dlPhoto          = dlPhoto;
window.goToChar         = goToChar;
window.startWorld       = startWorld;
window.updateBioCount   = updateBioCount;
window.updatePreview    = updatePreview;

// 온보딩 로딩 애니메이션 시작
initOnboarding();

const sketch = (p) => {
  p.setup = () => {
    const cnv = p.createCanvas(VW, VH);
    cnv.parent('sketch-wrapper');
    p.frameRate(60);
    p.noSmooth();

    setupMap(p);
    initNPCs();
    setupMinimapBase(p);

    window._startGame = () => { game.running=true; updateZoneHUD(); };
    window._getNearNPC = () => {
      let n=null, nd=80;
      for(const x of NPCS){ const d=p.dist(player.x,player.y,x.x,x.y); if(d<nd){nd=d;n=x;} }
      return n;
    };
    window._getCam = () => ({...cam});
    window._pauseInput = false;
    window._currentBooth = null;
  };

  p.draw = () => {
    if(!game.running) return;
    const t = p.millis() * 0.001;
    if(!window._pauseInput){
      updatePlayer(p);
      updateNPCs(p);
      updateBoothDetection(p);
      updateBubble(p);
    }
    p.background('#07071a');
    drawBgImage(p);
    drawPhotoBooths(p, t);
    drawEntities(p);
    drawMinimap(p);
    drawScanlines(p);
  };
};

new p5(sketch);
