HEAD_SRC='Quellen: US-Finanzministerium · CISA/BSI · Cisco Talos · NBC News · Der Bund';
function desk(X,Y,s=1){rr(X-150*s,Y-150*s,300*s,24*s,6);x.fillStyle='#8a6a3a';x.fill();line(X-130*s,Y-130*s,X-130*s,Y,WHITE,6);line(X+130*s,Y-130*s,X+130*s,Y,WHITE,6);laptop(X,Y-190*s,150*s);}
function worker(X,t,o={}){const st=stick(X,GROUND,0.75,{mood:o.mood||'neutral',handL:[X+30,GROUND-170],handR:[X+60,GROUND-175]});hood(st);return st;}
// 1 Hook 0–3.4
function s1(t){bg(redT(t,2.18,3.4));for(let i=0;i<12;i++){circ((i*137+40)%W,520+(i*91)%240,2+(i%3),`rgba(255,255,255,${0.4+0.4*Math.sin(t*2+i)})`);}circ(900,560,60,'#C9A04A');
  ground();hook(['HACKER SITZEN NACHTS','IM DUNKLEN KELLER?'],t,68);
  x.fillStyle='rgba(0,0,0,0.45)';x.fillRect(0,GROUND-520,W,520);line(0,GROUND-520,W,GROUND-520,'rgba(255,255,255,0.3)',4);
  desk(560,GROUND,1.2);const st=stick(400,GROUND,1.1,{mood:'angry',handR:[520,GROUND-200]});hood(st);
  const g=x.createRadialGradient(560,GROUND-230,10,560,GROUND-230,300);g.addColorStop(0,'rgba(91,155,230,0.35)');g.addColorStop(1,'rgba(91,155,230,0)');x.fillStyle=g;x.fillRect(260,GROUND-530,600,530);
  pill('Keller, 3 Uhr nachts',W/2,GROUND+170,{...popA(t,0.9),size:42,col:t>2.2?RED:WHITE,strike:eo(p(t,2.3,2.6))});}
// 2 Wie im Büro 3.4–5.75
function s2(t){bg();header(p(t,3.4,3.7));ground();rr(60,GROUND-760,960,760,10);x.fillStyle='#22336a';x.fill();
  for(let i=0;i<3;i++){const X=230+i*310;popScale(t,3.5+i*0.2,sc=>{desk(X+40,GROUND,0.8);worker(X-60,t);});}
  clockF(W/2,GROUND-610,70,9,0,YEL);pill('9:00',W/2+130,GROUND-610,{size:34,col:YEL,a:popA(t,3.8).a});
  pill('wie im Büro',W/2,GROUND+170,{...popA(t,4.85),size:48,fill:YEL,col:YEL,tcol:DARK});}
// 3 Angriffe zu Bürozeiten, Wochenende ruhig 5.75–12.5
const DAYS=['Mo','Di','Mi','Do','Fr','Sa','So'],VAL=[0.86,0.92,0.88,0.95,0.8,0.12,0.08];
function s3(t){bg();header(1);const X0=150,BWd=100,GAP=30,BASE=1180,MAXH=560;
  txt('Angriffe pro Tag',W/2,470,46,WHITE,900);line(X0-30,BASE,X0+7*(BWd+GAP),BASE,WHITE,5);
  DAYS.forEach((d,i)=>{const we=i>=5;const k=we?eo(p(t,10.9,11.4)):eo(p(t,7.1+i*0.2,7.6+i*0.2));const h=MAXH*VAL[i]*k;const X=X0+i*(BWd+GAP);
    rr(X,BASE-h,BWd,h,10);x.fillStyle=we?'#5B9BE6':RED;if(h>1)x.fill();txt(d,X+BWd/2,BASE+40,34,we?BLUE:WHITE,800);if(we&&t>11.4)zzz(X+BWd/2,BASE-120,t,1);});
  pill('chinesische Bürozeiten',W/2,1330,{...popA(t,8.89),size:44,col:RED,a:popA(t,8.89).a*(1-p(t,10.8,11.0))});
  pill('Wochenende: ruhig',W/2,1330,{...popA(t,11.03),size:44,fill:'#2C6FB8',col:BLUE,tcol:WHITE});
  popScale(t,6.2,sc=>{x.translate(880,600);x.scale(sc*0.8,sc*0.8);clockF(0,0,70,9+((t*2)%9),0,YEL);});}
// 4 Firmen für den Staat 12.5–18.2
function s4(t){bg();header(1);ground();pill('Salt Typhoon',W/2,400,{...popA(t,12.95),size:60,fill:RED,col:RED,tcol:WHITE});pill('laut US-Regierung',W/2,510,{...popA(t,14.08),size:36,col:WHITE});
  popScale(t,15.59,sc=>{x.translate(270,GROUND);x.scale(sc,sc);building(0,0,320,440,{label:'IT-Firma',lit:true,lfill:'#3a3f55'});});
  if(t>16.0){const k=eo(p(t,16.0,16.6));line(450,GROUND-260,lerp(450,620,k),GROUND-260,YEL,10);if(k>.95){x.fillStyle=YEL;x.beginPath();x.moveTo(640,GROUND-260);x.lineTo(605,GROUND-285);x.lineTo(605,GROUND-235);x.closePath();x.fill();}}
  popScale(t,16.4,sc=>{x.translate(830,GROUND);x.scale(sc,sc);rr(-170,-420,340,420,8);x.fillStyle='#3a1d24';x.fill();x.strokeStyle=WHITE;x.lineWidth=7;x.stroke();
    x.fillStyle=RED;x.beginPath();x.moveTo(-200,-420);x.lineTo(0,-540);x.lineTo(200,-420);x.closePath();x.fill();for(let i=0;i<4;i++){rr(-130+i*80,-380,30,340,6);x.fillStyle='rgba(255,255,255,0.75)';x.fill();}});
  pill('Staat',830,GROUND+60,{...popA(t,17.0),size:40,fill:RED,col:RED,tcol:WHITE});}
// 5 Sanktionen 2025 18.2–23.1
function s5(t){bg();header(1);ground();building(W/2,GROUND,420,560,{label:'IT-Firma',lit:true,lfill:'#3a3f55'});pill('USA',W/2,400,{...popA(t,19.42),size:56,fill:'#1d3d8f',col:WHITE,tcol:WHITE});
  const k=p(t,21.6,21.8);if(t>21.6){x.save();x.translate(W/2,GROUND-300);x.rotate(-0.18);const sc=lerp(2.2,1,eo(k));x.scale(sc,sc);x.globalAlpha=k;rr(-300,-80,600,160,18);x.strokeStyle=RED;x.lineWidth=14;x.stroke();
    txt('SANKTIONEN',0,-18,56,RED,900);txt('2025',0,44,44,RED,900);x.restore();}
  if(t>21.6&&t<22.1){const s=(1-p(t,21.6,22.1))*14;x.translate(Math.sin(t*90)*s,0);}}
// 6 Alte Lücken 23.1–27.0
function s6(t){bg();header(1);ground();const RX=W/2,RY=GROUND-300;
  rr(RX-300,RY-90,600,180,24);x.fillStyle='#1d2d5c';x.fill();x.strokeStyle=WHITE;x.lineWidth=7;x.stroke();for(let i=0;i<5;i++)circ(RX-220+i*60,RY,12,Math.sin(t*6+i)>0?GREEN:'#2a3a6c');
  line(RX-200,RY-90,RX-240,RY-200,WHITE,7);line(RX+200,RY-90,RX+240,RY-200,WHITE,7);txt('Router',RX+150,RY,34,WHITE,800);
  x.fillStyle='#05070f';x.beginPath();x.moveTo(RX+20,RY-90);x.lineTo(RX+60,RY-30);x.lineTo(RX+30,RY+10);x.lineTo(RX+70,RY+90);x.lineTo(RX-10,RY+90);x.lineTo(RX-30,RY+20);x.lineTo(RX,RY-30);x.closePath();x.fill();
  pill('alte Lücke',RX,RY-200,{...popA(t,24.63),size:44,fill:RED,col:RED,tcol:WHITE});
  const X=lerp(-60,RX+10,eo(p(t,23.3,24.6)));const sc=t>24.6?lerp(1,0.01,p(t,24.6,25.1)):1;if(sc>0.02){const st=stick(X,GROUND,0.8*sc+0.01,{walk:t*10,mood:'angry'});hood(st);}
  popScale(t,25.66,sc=>{x.translate(RX,GROUND-760);x.scale(sc,sc);rr(-320,-60,640,120,24);x.fillStyle=DARK;x.fill();x.strokeStyle=GREEN;x.lineWidth=5;x.stroke();txt('Update gab es längst',0,3,42,GREEN,900);});}
// 7 Feierabend 27.0–29.3
function s7(t){bg();header(1);ground();rr(60,GROUND-760,960,760,10);x.fillStyle='#22336a';x.fill();desk(380,GROUND,1.0);
  const hh=lerp(14,18,eo(p(t,27.1,28.4)));clockF(W/2+120,GROUND-560,110,Math.floor(hh),(hh%1)*60,YEL);
  const leave=p(t,28.5,29.3);const X=lerp(240,700,eo(leave));const st=stick(X,GROUND,0.95,{walk:leave>0&&leave<1?t*9:undefined,mood:leave>0?'happy':'neutral',handL:leave>0?undefined:[X+60,GROUND-200]});hood(st);
  pill('Feierabend',W/2+120,GROUND-340,{...popA(t,28.46),size:50,fill:YEL,col:YEL,tcol:DARK});
  pill('Hacken = Job',W/2,GROUND+170,{...popA(t,27.02),size:44,col:WHITE});}
// 8 Installier deine Updates 29.3–31.9
function s8(t){bg();header(1);phone(W/2,860,380,700,{screen:'#F2F4F8'});txt('Software-Update',W/2,640,32,DARK,900);
  const k=eio(p(t,30.1,31.5));rr(W/2-130,860,260,26,13);x.fillStyle='#C9D0DC';x.fill();rr(W/2-130,860,260*k,26,13);x.fillStyle=GREEN;x.fill();txt(Math.round(k*100)+' %',W/2,940,40,DARK,900);
  if(k>0.99){circ(W/2,760,60,GREEN);checkM(W/2,760,70,p(t,31.5,31.8),WHITE);}
  pill('Installier deine Updates',W/2,1330,{...popA(t,30.1),size:46,fill:GREEN,col:GREEN,tcol:'#0b2a1b'});}
function s9(t){seriesEnd(t,31.95,5,'Serie komplett ✓');}
SCENES=[[0,3.4,s1],[3.4,5.75,s2],[5.75,12.5,s3],[12.5,18.2,s4],[18.2,23.1,s5],[23.1,27.0,s6],[27.0,29.3,s7],[29.3,31.9,s8],[31.9,99,s9]];
