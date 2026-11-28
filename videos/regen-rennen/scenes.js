// Einzelvideo: „Im Regen rennen bringt nichts“ (Zeiten = Timeline nach atempo 1.1)
const SRC='Quelle: Peterson & Wallis (US-Wetterbehörde NOAA), Fachzeitschrift „Weather“ 1997';
const WATER='#4FA3F7';
function headerR(a){if(a<=0)return;x.save();x.globalAlpha*=a;txt('ALLTAGS-IRRTUM',W/2,150,34,'#9AA5BF',800);txt(SRC,W/2,196,21,'#6D7894',600);x.restore();}
// Regen: deterministische Streifen; slant = Neigung (px pro px Fall), sp = Fallgeschwindigkeit
function rain(t,o={}){const n=o.n||110,sl=o.slant||0.18,sp=o.sp||1700,a=o.a??0.55,top=o.top??0,bot=o.bot??GROUND;
  x.save();x.strokeStyle=`rgba(170,205,255,${a})`;x.lineWidth=3;x.lineCap='round';x.beginPath();
  for(let i=0;i<n;i++){const r1=(i*9301+49297)%233280/233280,r2=(i*4253+1237)%1000/1000;const len=30+r2*30;
    const yy=top+((t*sp*(0.8+r2*0.4)+r1*(bot-top+400))%(bot-top+200))-100;const xx=(r1*1300-110+(yy)*sl+((o.dx||0)*t))%1300-110;
    if(yy>bot)continue;x.moveTo(xx,yy);x.lineTo(xx+len*sl,yy+len);}x.stroke();x.restore();}
function splashes(t,a=0.6){x.save();for(let i=0;i<10;i++){const ph=((t*2.2)+i*0.37)%1,X=(i*157+37)%W;x.globalAlpha=a*(1-ph);x.strokeStyle='#AACDFF';x.lineWidth=3;x.beginPath();x.ellipse(X,GROUND,6+ph*26,2+ph*6,0,Math.PI,0);x.stroke();}x.restore();}
function cloudsTop(t){for(let i=0;i<4;i++){const X=((i*330+t*25)%1500)-200;x.save();x.globalAlpha=0.55;cloud(X,60+(i%2)*30,240,'#3a4668');x.restore();}}
function lightning(t,at){const k=p(t,at,at+0.35);if(k<=0||k>=1)return;const f=(k<0.15||(k>0.3&&k<0.42))?1:0.25*(1-k);x.save();x.fillStyle=`rgba(230,240,255,${0.55*f})`;x.fillRect(0,0,W,H);x.restore();}
function drop(X,Y,s,col=WATER){x.save();x.translate(X,Y);x.scale(s,s);x.beginPath();x.moveTo(0,-30);x.bezierCurveTo(14,-10,22,4,22,14);x.arc(0,14,22,0,Math.PI);x.bezierCurveTo(-22,4,-14,-10,0,-30);x.fillStyle=col;x.fill();x.restore();}
function wetDots(X,Y,s,n,side=1,t=0){x.save();for(let i=0;i<n;i++){const yy=Y-120*s-((i*53)%200)*s,xx=X+side*(8+(i*29)%22)*s;circ(xx,yy,(5+(i%3)*2)*s,'rgba(79,163,247,0.9)');}x.restore();}
function umbrellaX(X,Y,s,k){x.save();x.translate(X,Y);x.scale(s,s);x.fillStyle='#C94B5A';x.beginPath();x.arc(0,0,120,Math.PI,0);
  for(let i=0;i<4;i++){x.quadraticCurveTo(90-i*60,-20,60-i*60,0);}x.closePath();x.fill();x.strokeStyle=WHITE;x.lineWidth=6;x.stroke();line(0,0,0,150,WHITE,7);x.beginPath();x.arc(-18,150,18,0,Math.PI);x.stroke();x.restore();bigX(X,Y+20*s,110*s,k);}
function stopwatch(X,Y,r,t,run,col=WHITE){circ(X,Y,r,DARK,col,7);rr(X-14,Y-r-26,28,22,5);x.fillStyle=col;x.fill();const an=run*Math.PI*2-Math.PI/2;line(X,Y,X+Math.cos(an)*r*.75,Y+Math.sin(an)*r*.75,YEL,7);circ(X,Y,8,YEL);}
function scaleW(X,Y,w,val,col,shirt){rr(X-w/2,Y-30,w,30,10);x.fillStyle='#C9D2E3';x.fill();rr(X-w*.35,Y,w*.7,70,14);x.fillStyle='#E9EEF7';x.fill();x.strokeStyle=WHITE;x.lineWidth=5;x.stroke();
  rr(X-w*.25,Y+14,w*.5,40,8);x.fillStyle=DARK;x.fill();txt(val,X,Y+35,30,col,900);
  if(shirt){x.save();x.translate(X,Y-90);x.fillStyle=col;x.beginPath();x.moveTo(-50,-50);x.lineTo(-90,-20);x.lineTo(-70,5);x.lineTo(-50,-10);x.lineTo(-50,55);x.lineTo(50,55);x.lineTo(50,-10);x.lineTo(70,5);x.lineTo(90,-20);x.lineTo(50,-50);x.lineTo(20,-50);x.quadraticCurveTo(0,-30,-20,-50);x.closePath();x.fill();x.restore();}}
function bucketHead(st,fill){const [hx,hy]=st.head,R=st.R;x.save();x.beginPath();x.moveTo(hx-R*1.0,hy-R*.75);x.lineTo(hx-R*.8,hy-R*2.2);x.lineTo(hx+R*.8,hy-R*2.2);x.lineTo(hx+R*1.0,hy-R*.75);x.closePath();x.fillStyle='rgba(20,34,74,0.9)';x.fill();
  x.save();x.clip();const fy=lerp(hy-R*.75,hy-R*2.2,fill);x.fillStyle=WATER;x.fillRect(hx-R*1.2,fy,R*2.4,R*2);x.restore();x.strokeStyle=WHITE;x.lineWidth=6;x.stroke();x.restore();}

// ---------- Szenen ----------
// 1 Hook 0–4.45
function s1(t){const red=redT(t,4.0,4.45);bg(red);cloudsTop(t);ground();rain(t,{slant:-0.35,a:0.6});splashes(t);lightning(t,0.0);lightning(t,4.0);
  hook(['IM REGEN RENNEN','BRINGT NICHTS.'],t,80);
  const X=lerp(150,760,(t/4.45));const st=stick(X,GROUND,1.0,{walk:t*14,mood:t<4.0?'think':'shock'});
  // Tropfen schlagen vorne ein
  if(t>1.9&&t<4.0){for(let i=0;i<6;i++){const ph=((t*3)+i/6)%1;drop(X+60+(1-ph)*160,GROUND-330+i*30-(1-ph)*60,0.45*(1-ph*0.3));}}
  wetDots(X,GROUND,1.0,Math.floor(cl((t-1.9)/2)*14),1);
  pill('mehr Tropfen?',X+40,GROUND-560,{...popA(t,2.8),size:40,col:WATER,strike:p(t,4.05,4.35)});
  bigX(W/2,GROUND-480,90,p(t,4.05,4.4));}
// 2 Kein Schirm – gehen oder rennen? 4.45–6.95
function s2(t){bg();cloudsTop(t);ground();rain(t,{a:0.5});splashes(t,0.4);headerR(p(t,4.45,4.8));
  const st=stick(W/2,GROUND,1.05,{mood:'think',handR:[W/2+90,GROUND-380]});wetDots(W/2,GROUND,1.05,8,1);wetDots(W/2,GROUND,1.05,8,-1);
  popScale(t,4.8,sc=>{x.translate(W/2+290,GROUND-400);x.scale(sc,sc);umbrellaX(0,0,0.9,p(t,5.1,5.45));});
  pill('GEHEN',260,560,{...popA(t,5.66),size:56,col:WHITE});pill('RENNEN',820,560,{...popA(t,6.4),size:56,col:YEL});
  popScale(t,6.2,sc=>{x.translate(W/2,560);x.scale(sc,sc);txt('?',0,0,120,WATER,900);});}
// 3 Zwei Arten: von vorne 6.95–12.6
function s3(t){bg();cloudsTop(t);ground();headerR(1);
  const slow=t>11.4;rain(t,{slant:-0.5,a:0.45,top:300});
  pill('2 Arten',W/2,340,{...popA(t,7.95),size:46,col:YEL,a:popA(t,7.95).a*(1-p(t,8.8,9.0))});
  pill('① VON VORNE',W/2,340,{...popA(t,9.0),size:48,fill:'#2C6FB8',col:WATER,tcol:WHITE});
  // Laufbahn mit Metern
  const y0=GROUND+120;line(80,y0,1000,y0,'rgba(255,255,255,.5)',4);for(let i=0;i<=5;i++){line(80+i*184,y0-14,80+i*184,y0+14,WHITE,4);}
  const k=eo(p(t,9.7,10.4));for(let m=0;m<5;m++){if(m/5>k)break;for(let j=0;j<4;j++)drop(120+m*184+j*36,y0-50,0.5);}
  pill('jeder Meter = gleich viele Tropfen',W/2,y0+90,{...popA(t,10.5),size:34,col:WATER});
  // zwei Figuren: langsam und schnell, beide gleich nass vorne
  const pa=p(t,7.0,12.6);const Xw=lerp(160,420,pa),Xr=lerp(160,940,pa);
  stick(Xw,GROUND,0.75,{walk:t*7,mood:'neutral'});stick(Xr,GROUND,0.75,{walk:t*18,mood:'neutral'});
  if(t>9.1){wetDots(Xw,GROUND,0.75,Math.min(14,Math.floor((Xw-160)/55)),1);wetDots(Xr,GROUND,0.75,Math.min(14,Math.floor((Xr-160)/55)),1);}
  if(t>11.5){pill('egal wie schnell',W/2,470,{...popA(t,11.52),size:40,col:YEL});}}
// 4 Von oben: Zeit zählt 12.6–16.1
function s4(t){bg();cloudsTop(t);ground();headerR(1);rain(t,{slant:0,a:0.55,top:300});splashes(t,0.5);
  pill('② VON OBEN',W/2,340,{...popA(t,12.65),size:48,fill:'#2C6FB8',col:WATER,tcol:WHITE});
  const st=stick(380,GROUND,1.1,{mood:'think'});bucketHead(st,eo(p(t,13.0,16.0))*0.95);
  for(let i=0;i<5;i++){const ph=((t*1.8)+i/5)%1;drop(380+(i-2)*22,lerp(320,st.head[1]-st.R*2.2,ph),0.5);}
  popScale(t,13.6,sc=>{x.translate(800,GROUND-420);x.scale(sc,sc);stopwatch(0,0,120,t,(t-13.6)/2,WHITE);});
  pill('nur die Zeit zählt',800,GROUND-220,{...popA(t,14.7),size:38,col:YEL});}
// 5 Der Test 16.1–25.4
function s5(t){bg();cloudsTop(t);ground();headerR(1);rain(t,{slant:-0.2,a:0.4,top:300});
  if(t<19.1){stick(380,GROUND,1.0,{mood:'happy'});stick(700,GROUND,1.0,{mood:'happy'});cap({head:[380,GROUND-335],R:50},'#2E5AA8');cap({head:[700,GROUND-335],R:50},'#2E5AA8');
    pill('Wetterforscher',W/2,520,{...popA(t,16.35),size:46,col:YEL});pill('USA · Wetterbehörde',W/2,630,{...popA(t,17.43),size:36,col:WHITE});
    popScale(t,18.3,sc=>{x.translate(W/2,820);x.scale(sc,sc);rr(-170,-46,340,92,46);x.fillStyle=GREEN;x.fill();txt('TEST',0,3,50,'#0b2a1b',900);});return;}
  // Strecke 90 m
  const L=120,R=960;line(L,GROUND+60,R,GROUND+60,YEL,6);line(L,GROUND+40,L,GROUND+80,YEL,6);line(R,GROUND+40,R,GROUND+80,YEL,6);
  const cnt=Math.round(90*eo(p(t,19.2,20.0)));txt(cnt+' m',W/2,GROUND+130,64,YEL,900);
  // Ziel-Flagge
  line(R,GROUND,R,GROUND-260,WHITE,6);x.fillStyle=WHITE;x.fillRect(R,GROUND-260,70,46);
  const tw=p(t,21.3,25.4),tr=p(t,22.15,23.4);const Xw=lerp(L,lerp(L,R,0.55),tw),Xr=lerp(L,R,eo(tr));
  stick(Xw,GROUND-150,0.6,{walk:t>21.3?t*7:undefined,mood:'neutral'});stick(Xr,GROUND,0.6,{walk:t>22.15&&tr<1?t*20:undefined,mood:tr>=1?'happy':'neutral'});
  pill('geht',Xw,GROUND-480,{...popA(t,21.56),size:34,col:WHITE});pill('rennt',Xr,GROUND-330,{...popA(t,22.44),size:34,col:YEL});
  line(L,GROUND-150,R,GROUND-150,'rgba(255,255,255,.3)',3);
  if(t>23.1){const a=popA(t,23.2);x.save();x.globalAlpha=a.a;rr(80,320,920,520,30);x.fillStyle='rgba(11,19,40,0.92)';x.fill();x.strokeStyle=WHITE;x.lineWidth=5;x.stroke();
    scaleW(330,700,220,t>24.9?'? ? ?':'---',WATER,true);scaleW(750,700,220,t>24.9?'? ? ?':'---',WATER,true);txt('Klamotten gewogen',W/2,400,44,YEL,900);x.restore();}}
// 6 Ergebnis 25.4–28.95
function s6(t){bg();cloudsTop(t);ground();headerR(1);rain(t,{a:0.3,top:300});
  pill('ERGEBNIS',W/2,340,{...popA(t,25.48),size:56,fill:YEL,col:YEL,tcol:DARK});
  const base=GROUND-40;rr(240,base-560,180,560,16);x.strokeStyle='rgba(255,255,255,.3)';x.setLineDash([12,10]);x.lineWidth=4;x.stroke();rr(660,base-560,180,560,16);x.stroke();x.setLineDash([]);
  const ha=520*eo(p(t,26.6,27.3)),hb=375*eo(p(t,27.1,27.7));
  if(ha<1)txt('?',330,base-280,100,GREY,900);if(hb<1)txt('?',750,base-280,100,GREY,900);
  for(const [X,h] of [[330,ha],[750,hb]]){if(h<1)continue;rr(X-90,base-h,180,h,16);const g=x.createLinearGradient(0,base-h,0,base);g.addColorStop(0,'#7CC0FF');g.addColorStop(1,'#2C6FB8');x.fillStyle=g;x.fill();
    for(let i=0;i<3;i++){const wy=base-h+8+Math.sin(t*4+i)*4;line(X-70+i*50,wy,X-40+i*50,wy,'rgba(255,255,255,.6)',4);}}
  txt('Geher',330,base+50,42,WHITE,800);txt('Renner',750,base+50,42,WHITE,800);
  popScale(t,27.46,sc=>{x.translate(330,base-ha-80);x.scale(sc,sc);rr(-150,-54,300,108,54);x.fillStyle=RED;x.fill();txt('+40 %',0,4,64,WHITE,900);});
  pill('nasser',330,base-ha-170,{...popA(t,28.42),size:38,col:RED});}
// 7 Twist: pro Sekunde vs. Zeit draußen 28.95–33.3
function s7(t){bg();cloudsTop(t);ground();headerR(1);rain(t,{a:0.35,top:300});
  pill('Aber: pro Sekunde …',W/2,340,{...popA(t,29.08),size:46,col:YEL});
  // Tropfen/Sekunde-Zähler
  const rows=[['Geher',0.45,9],['Renner',1.0,22]];
  rows.forEach(([n,sp,dps],i)=>{const Y=560+i*170,a=popA(t,29.5+i*0.6);if(a.a<=0)return;x.save();x.globalAlpha=a.a;txt(n,200,Y,40,WHITE,800);
    const w=lerp(0,600,sp*eo(p(t,29.6+i*0.6,30.4+i*0.6)));rr(320,Y-30,w,60,30);x.fillStyle=i?RED:WATER;x.fill();x.restore();});
  pill('Renner: schneller nass',W/2,940,{...popA(t,31.1),size:38,col:RED,a:popA(t,31.1).a});
  // Zeit draußen
  if(t>31.5){const a=popA(t,31.56);x.save();x.globalAlpha=a.a;txt('Zeit im Regen',W/2,1060,40,GREY,800);
    const k=eo(p(t,31.9,32.8));rr(140,1100,800*k,46,23);x.fillStyle=WATER;x.fill();rr(140,1170,260*k,46,23);x.fillStyle=GREEN;x.fill();
    txt('Geher',100,1123,26,WHITE,800,'right');txt('Renner',100,1193,26,WHITE,800,'right');x.restore();
    pill('viel kürzer ✓',600,1193,{...popA(t,32.3),size:34,fill:GREEN,col:GREEN,tcol:'#0b2a1b'});}}
// 8 Pointe Taxameter 33.3–37.8
function s8(t){bg();cloudsTop(t);ground();headerR(1);rain(t,{slant:0,a:0.5,top:300});splashes(t,0.4);
  const a=popA(t,33.5);x.save();x.globalAlpha=a.a;x.translate(W/2,760);x.scale(a.sc,a.sc);
  rr(-330,-170,660,340,40);x.fillStyle='#111827';x.fill();x.strokeStyle=YEL;x.lineWidth=10;x.stroke();
  rr(-260,-110,520,140,20);x.fillStyle='#05200f';x.fill();
  const stopAt=36.9;const v=Math.floor(Math.min(t,stopAt)*7.3-240);const shown=Math.max(0,v);
  x.font='900 96px "Courier New", monospace';x.textAlign='center';x.textBaseline='middle';x.fillStyle=t>stopAt?YEL:'#3FE07F';x.fillText(String(shown).padStart(4,'0'),-40,-38);drop(200,-30,1.3);
  txt(t>stopAt?'STOPP':'läuft …',0,100,44,t>stopAt?GREEN:WHITE,900);x.restore();
  pill('TAXAMETER',W/2,500,{...popA(t,35.0),size:58,fill:YEL,col:YEL,tcol:DARK});
  popScale(t,36.3,sc=>{x.translate(W/2,1110);x.scale(sc,sc);stopwatch(0,0,80,t,(t-36.3)/1.5,WHITE);});}
// 9 Abschluss 37.8+
function s9(t){bg();cloudsTop(t);ground();rain(t,{a:0.4});splashes(t,0.4);
  const X=lerp(-100,1200,p(t,37.8,40));stick(X,GROUND,0.9,{walk:t*20,mood:'happy'});
  popScale(t,37.85,sc=>{x.translate(W/2,430);x.scale(sc,sc);txt('ALSO: RENN!',0,0,100,YEL,900);});
  popScale(t,38.2,sc=>{x.translate(W/2,560);x.scale(sc,sc);txt('Fast 30 % weniger nass.',0,0,50,WHITE,800);});
  const f=popA(t,38.6);const pul=1+0.05*Math.sin(t*7);x.save();x.globalAlpha=f.a;x.translate(W/2,760);x.scale(f.sc*pul,f.sc*pul);rr(-220,-62,440,124,62);x.fillStyle=RED;x.fill();txt('+ Folgen',0,4,56,WHITE,900);x.restore();}
SCENES=[[0,4.45,s1],[4.45,6.95,s2],[6.95,12.6,s3],[12.6,16.1,s4],[16.1,25.4,s5],[25.4,28.95,s6],[28.95,33.3,s7],[33.3,37.8,s8],[37.8,99,s9]];
