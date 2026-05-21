export const userProfile = {
  name:'PLAYER', shirt:'#4488ee', pants:'#223399',
  hair:'#3a2210', skin:'#f5d080', acc:'🎧',
  bio:'음악을 사랑합니다 🎵',
  fave:{title:'',artist:'',emoji:'🎵'}, songs:[],
};

// 온보딩 캐릭터 커스터마이징 선택값 (객체로 묶어 참조 공유)
export const sel = {
  shirt:'#4488ee', pants:'#223399', hair:'#3a2210', skin:'#f5d080', acc:'🎧',
};

export const player = { x:1024, y:682, speed:3.2 };
export const cam    = { x:1024 - 860/2, y:682 - 540/2 };
export const NPCS   = [];

export const photoGallery   = [];
export const pendingPhotoData = { value: null };

// 스케치 런타임 상태
export const game = {
  running:     false,
  fc:          0,
  activeNPC:   null,
  qTimer:      0,
  currentBooth:null,
  bgMap:       null,
  minimapBase: null,
  currentNPC:  null,
};
