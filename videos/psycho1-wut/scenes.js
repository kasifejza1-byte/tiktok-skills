// Psycho-Irrtum (Einzelvideo, keine Serie): „Wut muss raus“
// Zeiten = Timeline nach atempo 1.1 (siehe words.json)
const SRC='Quellen: Bushman 2002 (Pers. Soc. Psychol. Bull.) · Kjærvik & Bushman 2024 (154 Studien)';
const ORANGE='#F08A3C',BROWN='#8A5A34';
function headerP(a){if(a<=0)return;x.save();x.globalAlpha*=a;txt('PSYCHO-IRRTUM',W/2,150,34,'#9AA5BF',800);txt(SRC,W/2,196,21,'#6D7894',600);x.restore();}

// ---------- Bausteine ----------
function heart(X,Y,s,col=RED){x.save();x.translate(X,Y);x.scale(s,s);x.beginPath();x.moveTo(0,30);
  x.bezierCurveTo(-60,-10,-50,-70,0,-38);x.bezierCurveTo(50,-70,60,-10,0,30);x.closePath();x.fillStyle=col;x.fill();x.strokeStyle=WHITE;x.lineWidth=5/s;x.stroke();x.restore();}
function pillow(X,Y,w,h,sq=0){const ww=w*(1+sq*.12),hh=h*(1-sq*.3);x.save();x.translate(X,Y-hh/2);
  x.beginPath();x.moveTo(-ww/2,-hh/2);x.quadraticCurveTo(0,-hh/2+12,ww/2,-hh/2);x.quadraticCurveTo(ww/2-14,0,ww/2,hh/2);x.quadraticCurveTo(0,hh/2-12,-ww/2,hh/2);x.quadraticCurveTo(-ww/2+14,0,-ww/2,-hh/2);x.closePath();
  x.fillStyle='#9CC3EE';x.fill();x.strokeStyle=WHITE;x.lineWidth=7;x.stroke();x.restore();}
function sandbag(X,top,len,ang,s=1){const bx=X+Math.sin(ang)*len,by=top+Math.cos(ang)*len;line(X,top,bx,by,GREY,5);
  x.save();x.translate(bx,by);x.rotate(-ang);rr(-40*s,0,80*s,170*s,30*s);x.fillStyle='#B4463C';x.fill();x.strokeStyle=WHITE;x.lineWidth=6;x.stroke();
  line(-40*s,40*s,40*s,40*s,'rgba(255,255,255,.4)',4);line(-40*s,130*s,40*s,130*s,'rgba(255,255,255,.4)',4);x.restore();return [bx,by+80*s];}
function flame(X,Y,s,t,col1=ORANGE,col2=YEL){ // Y = Fuß
  for(const [k,col] of [[1,col1],[0.62,col2],[0.3,'#FFF2C4']]){const f=Math.sin(t*11+k*5)*0.06,g=Math.sin(t*7+k*3)*0.05;
    x.save();x.translate(X,Y);x.scale(s*k,s*k*(1+f));x.beginPath();x.moveTo(0,0);
    x.bezierCurveTo(-90,0,-95,-80,-40,-150);x.bezierCurveTo(-30,-110,-10,-110,-5,-130);x.bezierCurveTo(-15,-190,20,-230,10+g*200,-290);
    x.bezierCurveTo(60,-220,95,-140,80,-80);x.bezierCurveTo(95,-30,60,0,0,0);x.closePath();x.fillStyle=col;x.fill();x.restore();}}
function logW(X,Y,s,rot=0){x.save();x.translate(X,Y);x.rotate(rot);x.scale(s,s);rr(-110,-28,220,56,26);x.fillStyle=BROWN;x.fill();x.strokeStyle=WHITE;x.lineWidth=5;x.stroke();
  x.beginPath();x.ellipse(110,0,18,28,0,0,7);x.fillStyle='#D9A86C';x.fill();x.stroke();circ(110,0,8,null,BROWN,3);x.restore();}
function kettle(X,Y,s,t,steam=1){x.save();x.translate(X,Y);x.scale(s,s);
  rr(-130,-230,260,230,70);x.fillStyle='#4A5A82';x.fill();x.strokeStyle=WHITE;x.lineWidth=8;x.stroke();
  x.beginPath();x.moveTo(120,-150);x.lineTo(210,-210);x.lineTo(225,-190);x.lineTo(130,-100);x.fillStyle='#4A5A82';x.fill();x.stroke();
  rr(-60,-262,120,34,14);x.fillStyle='#4A5A82';x.fill();x.stroke();circ(0,-275,16,WHITE);
  circ(0,-115,52,'#101a36',WHITE,6);const an=-Math.PI*0.8+Math.PI*1.3*cl(0.55+0.4*Math.sin(t*9)*steam);line(0,-115,Math.cos(an)*40,-115+Math.sin(an)*40,RED,7);
  for(let i=0;i<5;i++){const ph=((t*1.3)+i/5)%1;x.globalAlpha=(1-ph)*0.8*steam;circ(225+ph*80,-215-ph*170,18+ph*40,'rgba(230,236,248,0.7)');}x.globalAlpha=1;x.restore();}
function speaker(X,Y,s,t,on){x.save();x.translate(X,Y);x.scale(s,s);rr(-40,-30,36,60,8);x.fillStyle=WHITE;x.fill();x.beginPath();x.moveTo(-6,-30);x.lineTo(40,-70);x.lineTo(40,70);x.lineTo(-6,30);x.closePath();x.fill();x.restore();
  if(on>0)waves(X+40*s,Y,t,{n:3,period:0.5,maxR:140*s,a0:-0.8,a1:0.8,a:on,col:'229,72,77'});}
function sitStick(X,Y,s,o={}){ // Y = Boden
  const lw=9*s+2,seat=Y-150*s;rr(X-70*s,seat,120*s,18*s,6);x.fillStyle=BROWN;x.fill();line(X-60*s,seat+18*s,X-60*s,Y,BROWN,8*s);line(X+40*s,seat+18*s,X+40*s,Y,BROWN,8*s);line(X-70*s,seat,X-70*s,seat-150*s,BROWN,8*s);
  const hip=[X-30*s,seat-10*s],knee=[X+70*s,seat-10*s];line(hip[0],hip[1],knee[0],knee[1],WHITE,lw);line(knee[0],knee[1],knee[0]+10*s,Y,WHITE,lw);
  const neck=[X-30*s,seat-150*s];line(hip[0],hip[1],neck[0],neck[1],WHITE,lw);line(neck[0],neck[1]+25*s,X+40*s,seat-30*s,WHITE,lw);
  const R=50*s;circ(neck[0],neck[1]-R,R,'#14224a',WHITE,lw);face(neck[0],neck[1]-R,R,o.mood||'neutral');}
function mini(X,Y,s,col=WHITE,mood){x.save();line(X,Y-36*s,X,Y-14*s,col,5*s);line(X,Y-14*s,X-9*s,Y,col,5*s);line(X,Y-14*s,X+9*s,Y,col,5*s);line(X-10*s,Y-30*s,X+10*s,Y-30*s,col,5*s);circ(X,Y-46*s,10*s,col);
  if(mood==='angry'){line(X-6*s,Y-50*s,X-1*s,Y-47*s,'#101a36',2.5*s);line(X+6*s,Y-50*s,X+1*s,Y-47*s,'#101a36',2.5*s);}x.restore();}
function steamHead(hx,hy,t,a){if(a<=0)return;for(const sd of[-1,1])for(let i=0;i<3;i++){const ph=((t*1.6)+i/3)%1;x.globalAlpha=a*(1-ph);circ(hx+sd*(50+ph*60),hy-50-ph*120,12+ph*22,'rgba(230,236,248,0.8)');}x.globalAlpha=1;}
function bar(X,base,w,h,col,lbl,val){rr(X-w/2,base-h,w,Math.max(h,2),14);x.fillStyle=col;x.fill();if(lbl)txt(lbl,X,base+50,40,WHITE,800);if(val)txt(val,X,base-h-40,44,col,900);}

// ---------- Szenen ----------
// 1 Hook 0–3.55
function s1(t){const red=redT(t,2.9,3.4);bg(red);ground();hook(['WUT MUSS RAUS,','SONST STAUT','SIE SICH AN.'],t,80);
  const rage=0.5+0.5*Math.sin(t*14);const st=stick(330,GROUND,1.05,{mood:t<2.9?'angry':'shock',handL:[250+rage*10,GROUND-420-rage*20],handR:[420-rage*10,GROUND-420-rage*20]});
  steamHead(st.head[0],st.head[1],t,t<2.9?1:0.3);
  // Druckanzeige „Wut“
  const k=t<2.9?eo(p(t,0.3,2.2)):1;rr(640,GROUND-600,150,520,30);x.fillStyle=DARK;x.fill();x.strokeStyle=WHITE;x.lineWidth=7;x.stroke();
  rr(660,GROUND-100-400*k,110,400*k+0.1,20);x.fillStyle=t<2.9?ORANGE:RED;x.fill();txt('WUT',715,GROUND-40,36,WHITE,900);
  pill('Druck ablassen!',715,GROUND-680,{...popA(t,1.0),size:38,col:YEL,strike:p(t,2.95,3.3)});bigX(715,GROUND-350,90,p(t,3.0,3.35));}
// 3 Kissen + Alarm 6.2–10.9
function s3(t){bg();headerP(p(t,6.2,6.5));ground();
  const hitPh=t>6.4&&t<9.2?((t-6.4)*2.6)%1:0;const down=hitPh<0.35?eo(hitPh/0.35):1-eo((hitPh-0.35)/0.65);const sq=t>6.4&&t<9.2?Math.max(0,1-Math.abs(hitPh-0.35)*6):0;
  const PX=470;pillow(PX,GROUND,240,130,sq);
  const hand=[lerp(380,PX-10,down),lerp(GROUND-470,GROUND-140,down)];const st=stick(260,GROUND,1.0,{mood:t<9.2?'angry':'think',handR:hand,handL:[170,GROUND-170]});
  if(sq>0.5){x.save();x.globalAlpha=sq;for(let i=0;i<5;i++){const an=-Math.PI*(0.15+i*0.17);line(PX+Math.cos(an)*150,GROUND-120+Math.sin(an)*110,PX+Math.cos(an)*200,GROUND-120+Math.sin(an)*150,YEL,6);}x.restore();}
  pill('Wut rauslassen',PX,GROUND-560,{...popA(t,6.45),size:40,col:WHITE,a:popA(t,6.45).a*(1-p(t,7.9,8.1))});
  // Gedankenblase
  const ba=popA(t,8.1);ba.a*=1-p(t,9.2,9.45);if(ba.a>0){x.save();x.globalAlpha=ba.a;circ(330,GROUND-470,12,WHITE);circ(370,GROUND-530,18,WHITE);x.translate(560,GROUND-640);x.scale(ba.sc,ba.sc);rr(-250,-60,500,120,60);x.fillStyle=WHITE;x.fill();txt('„Geht mir besser!“',0,3,40,DARK,900);x.restore();}
  // Körper bleibt im Alarm
  if(t>9.2){const ha=popA(t,9.55);const beat=1+0.12*Math.max(0,Math.sin(t*14));x.save();x.globalAlpha=ha.a;heart(850,GROUND-380,ha.sc*1.4*beat);x.restore();
    const pul=Math.round(lerp(80,130,eo(p(t,9.6,10.4))));popScale(t,9.6,sc=>{x.translate(850,GROUND-200);x.scale(sc,sc);txt('Puls '+pul,0,0,54,RED,900);});
    const aa=popA(t,10.25);const flash=0.6+0.4*Math.sin(t*18);pill('⚠ ALARM',850,GROUND-620,{...aa,size:44,fill:RED,col:RED,tcol:WHITE,a:aa.a*flash});
    x.save();x.globalAlpha=0.18*p(t,10.25,10.4)*flash;x.fillStyle=RED;x.fillRect(0,0,W,H);x.restore();}}
// 4 Forscher + 600 Studenten 10.9–13.5
function s4(t){bg();headerP(1);ground();
  const st=stick(150,GROUND,0.95,{mood:'neutral',handR:[230,GROUND-230]});popScale(t,10.95,sc=>{x.translate(240,GROUND-250);x.scale(sc,sc);doc(0,0,90,{title:'?'});});
  pill('Forscher',150,GROUND+70,{...popA(t,11.1),size:34,col:WHITE});
  const k=p(t,12.05,12.9),N=60;for(let i=0;i<N;i++){if(i/N>k)break;const c=i%10,r=Math.floor(i/10);const ang=t>13.0&&(i*37)%100/100<p(t,13.0,13.45);
    mini(380+c*64,560+r*112,1.25,ang?RED:WHITE,ang?'angry':null);}
  const n=Math.round(600*k);if(t>12.05){txt(String(n)+' Studenten',700,440,80,YEL,900);}
  pill('1 Figur = 10',700,1290,{...popA(t,12.6),size:30,col:GREY});
  if(t>13.0)pill('wütend gemacht',700,1220,{...popA(t,13.05),size:36,fill:RED,col:RED,tcol:WHITE});}
// 5 Boxen vs. still sitzen 13.5–17.1
function s5(t){bg();headerP(1);ground();line(W/2,300,W/2,GROUND,'rgba(255,255,255,.25)',4);
  const la=eo(p(t,13.55,13.9));x.save();x.globalAlpha=la;
  const swing=t>14.0?Math.sin((t-14)*5.5)*0.32:0;const [bx,by]=sandbag(330,640,240,swing,1.1);
  const hitL=Math.max(0,-Math.sin((t-14)*5.5));const st=stick(150,GROUND,0.95,{mood:'angry',handR:[lerp(200,bx-50,t>14?hitL:0),GROUND-300+(t>14?hitL*-40:0)],handL:[190,GROUND-260]});
  pill('Sandsack',270,GROUND+80,{...popA(t,15.0),size:36,col:RED});x.restore();
  const ra=eo(p(t,15.55,15.9));x.save();x.globalAlpha=ra;sitStick(780,GROUND,1.0,{mood:'neutral'});pill('still sitzen',800,GROUND+80,{...popA(t,15.6),size:36,col:GREEN});
  if(t>16.4)pill('2 Minuten',800,700,{...popA(t,16.45),size:34,col:WHITE});x.restore();
  pill('Gruppe A',270,330,{...popA(t,13.6),size:30,col:GREY});pill('Gruppe B',810,330,{...popA(t,15.6),size:30,col:GREY});}
// 6 Lärm-Test + Ergebnis 17.1–24.7
function s6(t){bg();headerP(1);ground();
  // Gegner mit Kopfhörern in der Mitte
  const g=stick(W/2,GROUND-660,0.55,{mood:t>17.0?'shock':'neutral'});headphones(g);pill('Gegner',W/2,GROUND-600,{...popA(t,18.25),size:30,col:WHITE});
  speaker(230,GROUND-820,1.1,t,p(t,18.8,19.2)*(t<20.2?1:0.4));x.save();x.scale(-1,1);speaker(-850,GROUND-820,1.1,t,p(t,18.8,19.2)*(t<20.2?1:0.15));x.restore();
  pill('lauter Lärm',W/2,285,{...popA(t,18.8),size:44,col:RED});
  // Balken
  const base=GROUND-40,A=popA(t,20.25);if(A.a>0){x.save();x.globalAlpha=A.a;
    const ha=380*eo(p(t,21.75,22.4)),hb=110*eo(p(t,23.6,24.1));
    rr(250,base-390,160,390,14);x.strokeStyle='rgba(255,255,255,.3)';x.setLineDash([12,10]);x.lineWidth=4;x.stroke();rr(670,base-390,160,390,14);x.stroke();x.setLineDash([]);
    if(ha<1)txt('?',330,base-195,90,GREY,900);if(hb<1)txt('?',750,base-195,90,GREY,900);
    bar(330,base,160,ha,RED,'Boxer',ha>360?'am meisten':null);bar(750,base,160,hb,GREEN,'Stille',hb>100?'am wenigsten':null);x.restore();}}
// 7 Atmen 24.7–28.3
function s7(t){bg();headerP(1);ground();
  const br=t>25.9?0.5-0.5*Math.cos((t-25.9)*2.4):0;const R=150+br*90;x.save();x.globalAlpha=0.25+0.35*p(t,25.9,26.3);circ(W/2,GROUND-370,R,'rgba(63,191,127,0.18)',GREEN,6);x.restore();
  const st=stick(W/2,GROUND,1.05,{mood:t>27.6?'happy':'neutral'});
  if(t>26.0){const a=p(t,26,26.3);x.save();x.globalAlpha=a;txt(br>0.5?'einatmen':'ausatmen',W/2,GROUND-780,40,GREEN,800);x.restore();}
  pill('Was wirklich hilft',W/2,330,{...popA(t,24.75),size:44,col:YEL});
  pill('langsam atmen ✓',W/2,440,{...popA(t,25.95),size:46,fill:GREEN,col:GREEN,tcol:'#0b2a1b'});
  const pul=Math.round(lerp(130,70,eo(p(t,27.3,28.2))));const beat=1+0.1*Math.max(0,Math.sin(t*lerp(14,7,p(t,27.3,28.2))));
  popScale(t,27.2,sc=>{x.translate(880,GROUND-260);x.scale(sc,sc);heart(0,-80,beat*0.9,pul<90?GREEN:RED);txt('Puls '+pul,0,40,46,pul<90?GREEN:RED,900);});}
// 8 Pointe: Dampfkessel → Feuer → Holz nachlegen 28.3–33.5
function s8(t){bg(0);headerP(1);ground();
  if(t<30.0){const a=popA(t,28.4);x.save();x.globalAlpha=a.a;x.translate(W/2,GROUND-100);x.scale(a.sc,a.sc);kettle(0,0,1.2,t,1);x.restore();
    pill('Dampfkessel',W/2,360,{...popA(t,29.3),size:46,col:WHITE,strike:p(t,29.6,29.95)});bigX(W/2,GROUND-380,150,p(t,29.65,30.0));}
  else{const grow=1+0.9*eo(p(t,32.6,33.2));const fa=popA(t,30.0);x.save();x.globalAlpha=fa.a;
    const g=x.createRadialGradient(W/2,GROUND-200,30,W/2,GROUND-200,500*grow);g.addColorStop(0,`rgba(240,138,60,${0.35*grow/1.9})`);g.addColorStop(1,'rgba(240,138,60,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
    logW(W/2-40,GROUND-30,1.1,0.12);logW(W/2+40,GROUND-30,1.1,-0.12);flame(W/2,GROUND-40,fa.sc*1.25*grow,t);x.restore();
    pill('Feuer',W/2,360,{...popA(t,30.5),size:52,fill:ORANGE,col:ORANGE,tcol:DARK});
    // Holzscheit fliegt rein
    if(t>31.4){const k=eo(p(t,31.45,32.6));const lx=lerp(1000,W/2+20,k),ly=lerp(GROUND-560,GROUND-140,k)-Math.sin(k*Math.PI)*180;if(k<1)logW(lx,ly,0.9,k*5);}
    const st=stick(170,GROUND,0.9,{mood:'think',handR:[t>31.4&&t<32?300:240,GROUND-260]});
    pill('Rauslassen = Holz nachlegen',W/2,470,{...popA(t,32.55),size:42,col:YEL});}}
// Outro (ohne Serie)
function s9(t){bg();for(let i=0;i<14;i++){const sx=(i*137)%W,sy=80+(i*91)%420;circ(sx,sy,2+(i%3),`rgba(255,255,255,${0.4+0.4*Math.sin(t*2+i)})`);}
  logW(W/2-40,860,0.8,0.12);logW(W/2+40,860,0.8,-0.12);flame(W/2,850,0.9,t);
  popScale(t,33.55,sc=>{x.translate(W/2,400);x.scale(sc,sc);txt('WUT IST EIN FEUER.',0,0,76,YEL,900);});
  popScale(t,33.8,sc=>{x.translate(W/2,1010);x.scale(sc,sc);txt('Nicht rauslassen. Runterkühlen.',0,0,48,WHITE,800);});
  const f=popA(t,34.1);const pul=1+0.05*Math.sin(t*7);x.save();x.globalAlpha=f.a;x.translate(W/2,1220);x.scale(f.sc*pul,f.sc*pul);rr(-220,-62,440,124,62);x.fillStyle=RED;x.fill();txt('+ Folgen',0,4,56,WHITE,900);x.restore();}
SCENES=[[0,3.4,s1],[3.4,10.9,s3],[10.9,13.5,s4],[13.5,17.1,s5],[17.1,24.7,s6],[24.7,28.3,s7],[28.3,33.5,s8],[33.5,99,s9]];

// Zeit-Mapping: Serien-Teil (3.40–6.15) ist aus der Stimme geschnitten
const CUT0=3.40,CUT=2.75;const render0=render;window.render=t=>render0(t<CUT0?t:t+CUT);
