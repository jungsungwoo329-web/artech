# Music World HTML → 구조화된 p5.js 리팩토링 계획

## Context

현재 `music-world-v7-real-map-embedded.html` 단일 파일(1,234줄)은 HTML, CSS, JavaScript, 그리고 약 290KB의 base64 인코딩된 맵 이미지가 한 곳에 섞여 있어 유지보수가 어렵습니다. 음악 공유 월드의 기능(플레이어 이동, NPC 대화, 포토부스, 갤러리, 온보딩)이 한 `<script>` 블록 안에 모여 있어 기능별 수정이 위험합니다.

**목표**: 빌드 도구 없이 순수 ES Modules로 구조를 분리하되, **맵 텍스쳐 품질을 픽셀 단위로 동일하게 보존**합니다.

**핵심 원칙**
- 렌더링 파이프라인(픽셀화 설정, 카메라 lerp, 노이즈 처리, z-정렬)은 한 줄도 바꾸지 않는다.
- 코드 위치만 옮기는 "순수 조직화 리팩토링"으로 진행한다.
- 동작 변경/기능 추가 없음 (갤러리 영속성도 현재대로 메모리 보관).

---

## 최종 구조

```
artech/
├── index.html                  # DOM + <script type="module" src="src/main.js">
├── README.md
├── assets/
│   └── map.jpg                 # base64 → 외부 파일
├── styles/
│   └── main.css                # 기존 <style> 추출
└── src/
    ├── main.js                 # p5 instance entry, setup/draw 위임
    ├── config.js               # SONG_POOL, NPC_DEF, NPC_START, PHOTOBOOTHS,
    │                           # SHIRT_C/PANTS_C/HAIR_C/SKIN_C/ACC_LIST, 월드 상수
    ├── state.js                # userProfile, pickedSongs, sel*, photoGallery,
    │                           # pendingPhotoData (공유 상태 모듈)
    ├── world/
    │   ├── map.js              # bgMap 로드, drawBgImage, drawZoneDetail,
    │   │                       # getTileColor, drawScanlines, minimapBase 생성
    │   ├── camera.js           # cam 객체, lerp 업데이트 (계수 0.12 그대로)
    │   └── zones.js            # getZoneName, walkable, updateZoneHUD
    ├── entities/
    │   ├── character.js        # drawChar (월드용), drawCharCanvas (온보딩 프리뷰)
    │   │                       # — 둘 다 동일 픽셀 알고리즘 공유
    │   ├── player.js           # player 객체, 이동 입력, 충돌 처리
    │   ├── npc.js              # NPCS 초기화, updateNPCs, drawEntities (z-sort)
    │   └── animation.js        # fc 카운터, playerLeg 토글 (디바이저 8 그대로)
    ├── features/
    │   ├── photobooth.js       # PHOTOBOOTHS 렌더링, shootPhoto, drawBoothBg,
    │   │                       # showPbOverlay, savePbPhoto, closePbOverlay
    │   ├── gallery.js          # photoGallery 메모리 저장, renderGallery,
    │   │                       # openGallery, closeGallery, dlPhoto
    │   └── onboarding.js       # 로딩/음악/캐릭터 3단계 화면 전환,
    │                           # showMusicStep, goToChar, startWorld, updateBioCount
    └── ui/
        ├── hud.js              # zone-hud, hud-hint 갱신, 미니맵 그리기
        ├── bubble.js           # updateBubble (NPC 근접 75px, 뮤직 아이템 90px)
        └── profileCard.js      # openProfileCard, closeProfileCard, onBubbleClick,
                                # onMusicItemClick, pc-char-canvas 미리보기
```

---

## 핵심 보존 사항 (절대 변경 금지)

### 1) 맵 텍스쳐 품질
- `p.noSmooth()` (현재 line 794) → `main.js`의 `p.setup` 안에 유지
- 모든 캔버스에 CSS `image-rendering: pixelated` 유지 (현재 line 18, 47, 72, 86, 132)
- 맵 드로잉 함수 `drawBgImage()` 본문 한 줄도 수정 금지:
  ```js
  if (bgMap && bgMap.width > 0) p.image(bgMap, -cam.x, -cam.y, WW, WH);
  ```
- `bgMap` 로드 경로만 `assets/map.jpg`로 교체. 다른 파라미터 없음.

### 2) base64 → 외부 파일 변환 절차
1. `music-world-v7-real-map-embedded.html`의 line 795 `data:image/jpeg;base64,...` 추출
2. Node 한 줄로 디코드: `Buffer.from(b64, 'base64')` → `assets/map.jpg`
3. 파일 헤더(FFD8FF…)와 디코드 후 바이트 길이로 무결성 확인
4. `p.loadImage('assets/map.jpg')`로 변경 — 다른 파라미터(width/height 인자 등) 추가하지 않음

### 3) 카메라/애니메이션/정렬
- `camera.js`의 lerp 계수 `0.12` 고정
- `animation.js`의 프레임 디바이저 `Math.floor(fc/8)%2===1` 고정
- `drawEntities()`의 z-sort by `.y` 매 프레임 유지

### 4) 미니맵 프리렌더
- `minimapBase = p.createGraphics(MM_W, MM_H)`는 `p.setup` 안에서 1회 생성
- draw 루프에 절대 옮기지 않음 (성능)

---

## 모듈 간 데이터 흐름

순수 ESM에서 p5는 instance mode로 사용 중. 두 가지 패턴을 혼용:

1. **공유 상태**: `state.js`에서 `export const player = { x:0, y:0, speed:0 }` 처럼 객체 익스포트 → 다른 모듈에서 mutate. 현재 전역 변수 사용 방식과 의미적으로 동일.
2. **p 인스턴스 전달**: 그리기 함수는 `(p, ...args)` 시그니처로 통일.
   예: `drawBgImage(p, bgMap, cam)`, `updateNPCs(p)`, `drawEntities(p, fc)`

`main.js` 골격:
```js
import p5 from 'https://esm.sh/p5@1.9.3';   // 또는 <script>로 p5 전역 로드
import { setupWorld, drawWorld } from './world/map.js';
import { updatePlayer } from './entities/player.js';
import { updateNPCs, drawEntities } from './entities/npc.js';
// ...

new p5((p) => {
  p.setup = () => setupWorld(p);
  p.draw  = () => drawWorld(p);
});
```

**브라우저 ESM 임포트**: p5는 `<script src="https://cdnjs.../p5.min.js">`로 전역 로드한 뒤 `new window.p5(...)` 사용이 가장 무난(현재 CDN 그대로 활용). esm.sh 경로는 옵션.

`window._startGame`, `window._pauseInput`, `window._getCam`, `window._currentBooth`, `window._getNearNPC`는 HTML inline `onclick` 핸들러가 의존하므로 **그대로 노출** 유지. (HTML 인라인 핸들러를 모듈 이벤트 리스너로 바꾸는 작업은 이번 스코프 밖.)

---

## 작업 순서 (각 단계 끝나면 브라우저로 동작 확인)

1. **빈 골격 생성**: 폴더 구조와 빈 파일 + index.html 복제 → 브라우저에서 그대로 동작 확인
2. **CSS 분리**: `<style>` 블록 통째로 `styles/main.css`로 이동, `<link>` 추가
3. **맵 이미지 외부화**: base64 디코드 → `assets/map.jpg`, `loadImage` 경로 변경. 이 단계에서 **시각적으로 동일한지 가장 엄격하게 비교** (스크린샷 픽셀 비교 권장)
4. **config.js / state.js 추출**: 데이터 상수와 공유 가변 상태 분리
5. **world/ 추출**: map, camera, zones — 그리기 함수 본문 그대로 옮김
6. **entities/ 추출**: character → player → npc → animation 순서 (의존 방향)
7. **features/ 추출**: photobooth, gallery, onboarding
8. **ui/ 추출**: hud, bubble, profileCard
9. **main.js 정리**: setup/draw에서 위임만 하도록 정돈
10. **HTML 인라인 핸들러 경로 확인**: `onclick="onBubbleClick()"` 등이 모듈 export를 보지 못하므로, 각 모듈에서 `window.onBubbleClick = onBubbleClick`처럼 노출

---

## 검증 (Verification)

원본 HTML과 리팩토링 결과를 두 탭에 띄워 비교:

- [ ] 맵 배경 시각 동일성: 같은 좌표(예: 플레이어 (200,200), (1500,1000))에서 스크린샷 픽셀 단위 비교
- [ ] 캐릭터 이동: 방향키 4방향 + 대각선 속도(0.707) 동일
- [ ] 다리 애니메이션 속도: 30초 이동 시 다리 토글 횟수 동일
- [ ] NPC 8명 모두 정상 스폰, 근접 75px에서 말풍선 표시
- [ ] 음악 아이콘 근접 90px에서 표시, 클릭 시 프로필 카드 열림
- [ ] 포토부스 4곳 모두 영역 진입 시 HUD 표시 → 촬영 → 갤러리 추가
- [ ] 갤러리 다운로드(PNG) 동작
- [ ] 온보딩 3단계 진행 (로딩 → 음악 선택 → 캐릭터)
- [ ] 미니맵 6개 존 색상 동일
- [ ] CRT 스캔라인 오버레이 동일
- [ ] 콘솔 에러 0건

**비교용 명령**: 단순 정적 서버로 실행 (`python3 -m http.server 8000` 또는 VSCode Live Server). ES Modules는 `file://`에서 동작하지 않으므로 반드시 HTTP로 띄울 것.

---

## 스코프 외 (이번에 하지 않음)

- TypeScript 도입
- 갤러리 localStorage 영속화
- HTML 인라인 onclick → addEventListener 리팩토링
- 빌드 도구(Vite/webpack) 도입
- 기능 추가/버그 픽스 (있더라도 별도 PR로)

추후 작업 후보로만 README에 메모.
