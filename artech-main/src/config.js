export const VW = 860, VH = 540, WW = 2048, WH = 1365, TILE = 48;
export const COLS = Math.ceil(WW / TILE), ROWS = Math.ceil(WH / TILE);
export const MM_W = 160, MM_H = 106, MM_X = 10, MM_Y = VH - MM_H - 10;
export const HX = WW / 2, HY = WH / 2;

export const SONG_POOL = [
  {title:'Blinding Lights',  artist:'The Weeknd',       genre:'Synth-pop',  emoji:'🌃'},
  {title:'좋아좋아',          artist:'볼빨간사춘기',      genre:'Indie Pop',  emoji:'🌸'},
  {title:'City of Stars',    artist:'Ryan Gosling',     genre:'Jazz/Film',  emoji:'⭐'},
  {title:'Butter',           artist:'BTS',              genre:'Pop/Dance',  emoji:'🧈'},
  {title:'Heat Waves',       artist:'Glass Animals',    genre:'Psych Pop',  emoji:'🌊'},
  {title:'드라마',            artist:'aespa',            genre:'K-pop',      emoji:'🎭'},
  {title:'Ditto',            artist:'NewJeans',         genre:'R&B',        emoji:'💚'},
  {title:'Levitating',       artist:'Dua Lipa',         genre:'Pop',        emoji:'🌟'},
  {title:'GODS',             artist:'NewJeans',         genre:'K-pop',      emoji:'✨'},
  {title:'Peaches',          artist:'Justin Bieber',    genre:'R&B',        emoji:'🍑'},
  {title:'La Vie en Rose',   artist:'Édith Piaf',       genre:'Jazz',       emoji:'🌹'},
  {title:'Nocturne',         artist:'Chopin',           genre:'Classic',    emoji:'🎹'},
];

export const NPC_DEF = [
  { name:'DJ LUNA', bio:'비트 위에서 사는 삶 🎧',  shirt:'#e84393', pants:'#223399', hair:'#111111', skin:'#f5d080', acc:'🎧',
    fave:{title:'Blinding Lights',artist:'The Weeknd',emoji:'🌃'},
    songs:[{title:'드라마',artist:'aespa',emoji:'🎭'},{title:'Butter',artist:'BTS',emoji:'🧈'},{title:'Ditto',artist:'NewJeans',emoji:'💚'}],
    quotes:['오늘도 비트 쏜다~🎧','이 BPM 느껴봐!','음악은 영혼의 언어야.'] },
  { name:'MINJUN', bio:'록이 없으면 못 살아 🎸',   shirt:'#f97316', pants:'#1e3a1e', hair:'#3a2210', skin:'#f5c87a', acc:'🎸',
    fave:{title:'Heat Waves',artist:'Glass Animals',emoji:'🌊'},
    songs:[{title:'Levitating',artist:'Dua Lipa',emoji:'🌟'},{title:'Peaches',artist:'Justin Bieber',emoji:'🍑'},{title:'GODS',artist:'NewJeans',emoji:'✨'}],
    quotes:['록은 진짜 감성이지 🎸','라이브 공연 최고야!','기타 치는 게 제일 행복해.'] },
  { name:'SOYEON', bio:'음악은 나의 여행 ✨',   shirt:'#22c55e', pants:'#2a1a4a', hair:'#1e1e3a', skin:'#f0c87a', acc:'🎵',
    fave:{title:'좋아좋아',artist:'볼빨간사춘기',emoji:'🌸'},
    songs:[{title:'City of Stars',artist:'Ryan Gosling',emoji:'⭐'},{title:'La Vie en Rose',artist:'Édith Piaf',emoji:'🌹'},{title:'Nocturne',artist:'Chopin',emoji:'🎹'}],
    quotes:['요즘 인디 씬 장난 없어✨','플레이리스트 공유해줘!','음악은 여행이야.'] },
  { name:'HYUNWOO', bio:'재즈처럼 즉흥적으로 🎺',  shirt:'#3b82f6', pants:'#1a1a2e', hair:'#2a1a0a', skin:'#d4a574', acc:'🎺',
    fave:{title:'City of Stars',artist:'Ryan Gosling',emoji:'⭐'},
    songs:[{title:'La Vie en Rose',artist:'Édith Piaf',emoji:'🌹'},{title:'Nocturne',artist:'Chopin',emoji:'🎹'},{title:'Blinding Lights',artist:'The Weeknd',emoji:'🌃'}],
    quotes:['재즈는 즉흥이 매력이지🎺','마일스 데이비스 알아?','밤에 듣는 재즈 최고.'] },
  { name:'YUJIN', bio:'케이팝 없인 못 살죠 💜',    shirt:'#a855f7', pants:'#1a1a1a', hair:'#111111', skin:'#f5d080', acc:'🎤',
    fave:{title:'Butter',artist:'BTS',emoji:'🧈'},
    songs:[{title:'드라마',artist:'aespa',emoji:'🎭'},{title:'Ditto',artist:'NewJeans',emoji:'💚'},{title:'GODS',artist:'NewJeans',emoji:'✨'}],
    quotes:['케이팝 완전 좋아!💜','아이돌 노래도 예술이야','오늘 컴백 알아?'] },
  { name:'DONGHYUN', bio:'EDM = 내 심장 박동 🔥', shirt:'#ef4444', pants:'#0a0a2a', hair:'#3a2210', skin:'#f5c87a', acc:'🔊',
    fave:{title:'Heat Waves',artist:'Glass Animals',emoji:'🌊'},
    songs:[{title:'Levitating',artist:'Dua Lipa',emoji:'🌟'},{title:'Blinding Lights',artist:'The Weeknd',emoji:'🌃'},{title:'Butter',artist:'BTS',emoji:'🧈'}],
    quotes:['EDM 파티 가자!🔥','드롭 부분이 제일 좋아','하이볼에 EDM 조합이지'] },
  { name:'AREUM', bio:'클래식으로 힐링 중 🎻',    shirt:'#eab308', pants:'#2a2a0a', hair:'#1e1e3a', skin:'#f0c87a', acc:'🎻',
    fave:{title:'Nocturne',artist:'Chopin',emoji:'🎹'},
    songs:[{title:'La Vie en Rose',artist:'Édith Piaf',emoji:'🌹'},{title:'City of Stars',artist:'Ryan Gosling',emoji:'⭐'},{title:'좋아좋아',artist:'볼빨간사춘기',emoji:'🌸'}],
    quotes:['클래식도 들어봐🎻','쇼팽 야상곡 알아?','음악으로 힐링 중...'] },
  { name:'TAEHO', bio:'가사 속에 철학이 있다 🎤',    shirt:'#06b6d4', pants:'#0a1a2a', hair:'#2a1a0a', skin:'#d4a574', acc:'🎧',
    fave:{title:'Ditto',artist:'NewJeans',emoji:'💚'},
    songs:[{title:'GODS',artist:'NewJeans',emoji:'✨'},{title:'드라마',artist:'aespa',emoji:'🎭'},{title:'Peaches',artist:'Justin Bieber',emoji:'🍑'}],
    quotes:['힙합이 진짜 문화야🎤','가사에 철학이 있어.','비트 만드는 중이야~'] },
];

export const NPC_START = [
  {x:200,y:300},{x:500,y:400},{x:900,y:300},{x:1400,y:250},
  {x:300,y:900},{x:700,y:950},{x:1100,y:900},{x:1600,y:800},
];

export const PHOTOBOOTHS = [
  { id:'park',    x:280,  y:380,  r:110, theme:'🌳 공원',   color:'#22c55e', bg:'#0d2e0d', bgAccent:'#1a4a1a' },
  { id:'club',    x:1650, y:350,  r:110, theme:'🎤 클럽',   color:'#a855f7', bg:'#1a0a2e', bgAccent:'#3a1060' },
  { id:'concert', x:1024, y:950,  r:110, theme:'🎸 공연장', color:'#f97316', bg:'#1a0e04', bgAccent:'#3a2010' },
  { id:'cafe',    x:320,  y:950,  r:110, theme:'☕ 카페',   color:'#f59e0b', bg:'#1a1000', bgAccent:'#3a2800' },
];

export const SHIRT_C = ['#4488ee','#e84393','#f97316','#22c55e','#a855f7','#ef4444','#eab308','#06b6d4','#ec4899','#84cc16','#ffffff','#888888'];
export const PANTS_C = ['#223399','#1e1e3a','#1a1a1a','#2a1a0a','#0a1a2a','#1a0a2e','#2a2a0a','#1a0e04','#3a1060','#0a2040','#3a3a3a','#ffffff'];
export const HAIR_C  = ['#3a2210','#111111','#1e1e3a','#2a1a0a','#c8860a','#d4a0c8','#e8e8e8','#4a1a1a','#ff6b9d','#22c55e'];
export const SKIN_C  = ['#f5d080','#f5c87a','#f0c87a','#d4a574','#c68642','#8d5524','#fde9b0'];
export const ACC_LIST = ['🎧','🎤','🎸','🎵','🔊','🎺','🎻','none'];
