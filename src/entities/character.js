export function hex2rgb(h) {
  return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
}

// p5 인스턴스로 월드에 캐릭터 그리기
export function drawChar(p, x, y, shirt, pants, hair, skin, acc, walkLeg) {
  p.noStroke();
  const [sr,sg,sb] = hex2rgb(shirt);
  const [pr,pg,pb2] = hex2rgb(pants);
  function lc(r,g,b,a){ return [Math.min(255,r+a),Math.min(255,g+a),Math.min(255,b+a)]; }

  // 그림자
  p.fill(0,0,0,70); p.ellipse(x,y+22,24,8);

  // 다리
  p.fill(pr,pg,pb2);
  if(walkLeg){p.rect(x-9,y+8,8,13);p.rect(x+1,y+5,8,13);}
  else{p.rect(x-9,y+8,8,13);p.rect(x+1,y+8,8,13);}
  p.fill(0,0,0,40); p.rect(x-9,y+8,2,13); p.rect(x+7,y+8,2,13);

  // 신발
  p.fill(26,26,42); p.rect(x-10,y+19,10,5); p.rect(x+1,y+19,10,5);
  p.fill(255,255,255,28); p.rect(x-9,y+19,8,2); p.rect(x+2,y+19,8,2);

  // 몸통
  p.fill(sr,sg,sb); p.rect(x-11,y-8,22,18);
  const [lr,lg,lb]=lc(sr,sg,sb,45);
  p.fill(lr,lg,lb); p.rect(x-11,y-8,22,4);
  p.fill(0,0,0,36); p.rect(x-11,y+6,22,4);

  // 팔
  p.fill(sr,sg,sb);
  if(walkLeg){p.rect(x-17,y-6,7,12);p.rect(x+10,y-5,7,12);}
  else{p.rect(x-17,y-5,7,11);p.rect(x+10,y-5,7,11);}
  const [sk0,sk1,sk2]=hex2rgb(skin);
  p.fill(sk0,sk1,sk2); p.rect(x-18,y+4,7,5); p.rect(x+11,y+4,7,5);

  // 목
  p.fill(sk0,sk1,sk2); p.rect(x-4,y-12,8,6);

  // 머리 본체
  p.fill(sk0,sk1,sk2);
  p.rect(x-11,y-32,22,22);
  p.rect(x-13,y-30,2,18); p.rect(x+11,y-30,2,18);
  p.rect(x-11,y-34,22,2);
  p.fill(0,0,0,28); p.rect(x-13,y-30,1,18); p.rect(x+12,y-30,1,18);

  // 머리카락
  const [hr,hg,hb]=hex2rgb(hair);
  p.fill(hr,hg,hb);
  p.rect(x-11,y-34,22,8);
  p.rect(x-13,y-30,4,10); p.rect(x+9,y-30,4,10);
  const [hlr,hlg,hlb]=lc(hr,hg,hb,30);
  p.fill(hlr,hlg,hlb); p.rect(x-8,y-34,10,3);

  // 눈썹
  p.fill(40,20,0,170); p.rect(x-8,y-22,5,2); p.rect(x+3,y-22,5,2);

  // 눈 흰자
  p.fill(232,232,255); p.rect(x-8,y-19,6,6); p.rect(x+2,y-19,6,6);
  // 동공
  p.fill(26,10,0); p.rect(x-6,y-17,4,4); p.rect(x+4,y-17,4,4);
  // 하이라이트
  p.fill(255,255,255,230); p.rect(x-5,y-17,2,2); p.rect(x+5,y-17,2,2);

  // 코
  p.fill(0,0,0,44); p.rect(x-1,y-14,2,3);

  // 입
  p.fill(180,80,80,200); p.rect(x-4,y-10,8,2);
  p.fill(255,180,180,120); p.rect(x-3,y-10,6,1);

  // 볼 홍조
  p.fill(255,150,130,55);
  p.ellipse(x-7,y-11,8,6); p.ellipse(x+7,y-11,8,6);

  // 악세서리
  if(acc&&acc!=='none'){
    p.textFont('serif'); p.textSize(14); p.textAlign(p.CENTER,p.BOTTOM);
    p.fill(255); p.noStroke(); p.text(acc,x,y-38);
  }
}

// Canvas 2D API로 온보딩/프로필 카드 캐릭터 프리뷰 그리기
export function drawCharCanvas(ctx, x, y, shirt, pants, hair, skin, acc, walkLeg) {
  function h2a(h){ return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]; }
  function lighter(h,a){ const[r,g,b]=h2a(h); return `rgb(${Math.min(255,r+a)},${Math.min(255,g+a)},${Math.min(255,b+a)})`; }
  const shirt3=h2a(shirt), pants3=h2a(pants);

  // 그림자
  ctx.fillStyle='rgba(0,0,0,.22)';
  ctx.beginPath(); ctx.ellipse(x,y+22,13,5,0,0,Math.PI*2); ctx.fill();

  // 다리
  ctx.fillStyle=`rgb(${pants3[0]},${pants3[1]},${pants3[2]})`;
  if(walkLeg){
    ctx.fillRect(x-9,y+8,8,13); ctx.fillRect(x+1,y+5,8,13);
  } else {
    ctx.fillRect(x-9,y+8,8,13); ctx.fillRect(x+1,y+8,8,13);
  }
  ctx.fillStyle='rgba(0,0,0,.18)';
  ctx.fillRect(x-9,y+8,2,13); ctx.fillRect(x+7,y+8,2,13);

  // 신발
  ctx.fillStyle='#1a1a2a';
  ctx.fillRect(x-10,y+19,10,5); ctx.fillRect(x+1,y+19,10,5);
  ctx.fillStyle='rgba(255,255,255,.12)';
  ctx.fillRect(x-9,y+19,8,2); ctx.fillRect(x+2,y+19,8,2);

  // 몸통
  ctx.fillStyle=`rgb(${shirt3[0]},${shirt3[1]},${shirt3[2]})`;
  ctx.fillRect(x-11,y-8,22,18);
  ctx.fillStyle=lighter(shirt,45);
  ctx.fillRect(x-11,y-8,22,4);
  ctx.fillStyle='rgba(0,0,0,.15)';
  ctx.fillRect(x-11,y+6,22,4);

  // 팔
  ctx.fillStyle=`rgb(${shirt3[0]},${shirt3[1]},${shirt3[2]})`;
  if(walkLeg){ ctx.fillRect(x-17,y-6,7,12); } else { ctx.fillRect(x-17,y-5,7,11); }
  if(walkLeg){ ctx.fillRect(x+10,y-5,7,12); } else { ctx.fillRect(x+10,y-5,7,11); }
  ctx.fillStyle=skin;
  ctx.fillRect(x-18,y+4,7,5); ctx.fillRect(x+11,y+4,7,5);

  // 목
  ctx.fillStyle=skin;
  ctx.fillRect(x-4,y-12,8,6);

  // 머리 본체
  ctx.fillStyle=skin;
  ctx.fillRect(x-11,y-32,22,22);
  ctx.fillRect(x-13,y-30,2,18); ctx.fillRect(x+11,y-30,2,18);
  ctx.fillRect(x-11,y-34,22,2);
  ctx.fillStyle='rgba(0,0,0,.12)';
  ctx.fillRect(x-13,y-30,1,18); ctx.fillRect(x+12,y-30,1,18);
  ctx.fillRect(x-11,y+(-10),22,1);

  // 머리카락
  ctx.fillStyle=hair;
  ctx.fillRect(x-11,y-34,22,8);
  ctx.fillRect(x-13,y-30,4,10); ctx.fillRect(x+9,y-30,4,10);
  ctx.fillStyle=lighter(hair,30);
  ctx.fillRect(x-8,y-34,10,3);

  // 눈썹
  ctx.fillStyle='rgba(40,20,0,.7)';
  ctx.fillRect(x-8,y-22,5,2); ctx.fillRect(x+3,y-22,5,2);

  // 눈 흰자
  ctx.fillStyle='#e8e8ff';
  ctx.fillRect(x-8,y-19,6,6); ctx.fillRect(x+2,y-19,6,6);
  // 동공
  ctx.fillStyle='#1a0a00';
  ctx.fillRect(x-6,y-17,4,4); ctx.fillRect(x+4,y-17,4,4);
  // 하이라이트
  ctx.fillStyle='rgba(255,255,255,.9)';
  ctx.fillRect(x-5,y-17,2,2); ctx.fillRect(x+5,y-17,2,2);

  // 코
  ctx.fillStyle='rgba(0,0,0,.18)';
  ctx.fillRect(x-1,y-14,2,3);

  // 입
  ctx.fillStyle='rgba(180,80,80,.8)';
  ctx.fillRect(x-4,y-10,8,2);
  ctx.fillStyle='rgba(255,180,180,.5)';
  ctx.fillRect(x-3,y-10,6,1);

  // 볼 홍조
  ctx.fillStyle='rgba(255,150,130,.25)';
  ctx.beginPath(); ctx.ellipse(x-7,y-11,4,3,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(x+7,y-11,4,3,0,0,Math.PI*2); ctx.fill();

  // 악세서리
  if(acc&&acc!=='none'){
    ctx.font='14px serif';
    ctx.textAlign='center';
    ctx.textBaseline='alphabetic';
    ctx.fillText(acc,x,y-38);
  }
}
