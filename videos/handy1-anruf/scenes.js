HEAD_SRC='Quellen: Informationszentrum Mobilfunk · Bundesnetzagentur · Deutsche GigaNetz';
// 1 Hook 0–4.6
function s1(t){const red=redT(t,3.69,4.6);bg(red);ground();hook(['DEIN ANRUF FLIEGT','DIREKT PER FUNK?'],t);
  stick(190,GROUND,1.0,{mood:t<3.7?'happy':'think',handR:[290,GROUND-300]});phone(300,GROUND-330,70,124,{screen:'#5B9BE6'});
  stick(890,GROUND,1.0,{mood:t<3.7?'happy':'think',handL:[790,GROUND-300]});phone(780,GROUND-330,70,124,{screen:'#5B9BE6'});
  const k=eo(p(t,0.5,1.6));const col=t>3.69?RED:YEL;x.save();x.setLineDash([22,16]);x.lineDashOffset=-t*80;x.strokeStyle=col;x.lineWidth=9;x.beginPath();
  const n=40;for(let i=0;i<=n*k;i++){const u=i/n;const X=lerp(320,760,u),Y=GROUND-380-Math.sin(u*Math.PI)*300+Math.sin(u*30-t*8)*10;i?x.lineTo(X,Y):x.moveTo(X,Y);}x.stroke();x.restore();
  pill('Funk',W/2,GROUND-720,{...popA(t,1.2),size:40,col});bigX(W/2,GROUND-560,70,p(t,3.75,4.1));}
// 2 Funk bis zum Mast 4.6–8.95
function s2(t){bg();header(p(t,4.6,4.9));ground();const st=stick(170,GROUND,1.0,{mood:'happy',handR:[270,GROUND-300]});phone(280,GROUND-330,70,124,{screen:'#5B9BE6'});
  const ta=eo(p(t,4.7,5.1));tower(640,GROUND,1.2*ta+0.01,{t,waves:p(t,7.7,8.1),label:'Mast',la:p(t,8.1,8.3)});
  if(t>4.97){x.save();x.globalAlpha=p(t,4.97,5.2);waves(300,GROUND-340,t,{n:4,period:1.0,maxR:300,a0:-0.7,a1:0.5,col:'245,184,61'});x.restore();}
  pill('Funk',440,GROUND-640,{...popA(t,5.0),size:42,col:YEL});
  if(t>6.28){const k=eo(p(t,6.28,6.8));line(290,GROUND+130,lerp(290,640,k),GROUND+130,YEL,6);line(290,GROUND+110,290,GROUND+150,YEL,6);if(k>.99)line(640,GROUND+110,640,GROUND+150,YEL,6);}
  pill('nur die ersten Meter',W/2,GROUND+220,{...popA(t,6.3),size:40,col:YEL});
  if(t>5.3){x.save();x.globalAlpha=0.35*p(t,5.3,5.8);x.setLineDash([14,12]);line(760,GROUND-300,1040,GROUND-300,GREY,5);x.setLineDash([]);txt('?',1000,GROUND-380,60,GREY,900);x.restore();}}
// 3 Glasfaser ins Kernnetz 8.95–15.6
const P3=[[200,GROUND],[200,GROUND+90],[700,GROUND+90],[700,1180],[690,1120]];
function s3(t){bg();header(1);ground();tower(200,GROUND,1.0,{t,waves:0.6});
  fiber([[200,GROUND],[200,GROUND+90],[820,GROUND+90],[820,1210]],t,eo(p(t,9.0,10.5)),p(t,12.4,12.8));
  pill('Glasfaser',320,GROUND+190,{...popA(t,10.62),size:44,fill:'#2C6FB8',col:BLUE,tcol:WHITE});
  pill('Lichtblitze',720,GROUND+190,{...popA(t,12.41),size:38,col:YEL});
  const ra=popA(t,13.75);if(ra.a>0){x.save();x.globalAlpha=ra.a;x.translate(820,1000);x.scale(ra.sc,ra.sc);x.translate(-820,-1000);rack(820,1000,260,420,t,{label:'Kernnetz',lcol:YEL});x.restore();}
  pill('dein Anbieter',820,700,{...popA(t,14.6),size:34,col:WHITE});
  if(t>9.25)pill('Gespräch',420,1080,{...popA(t,9.6),size:36,col:WHITE});}
// 4 Kernnetz findet Ziel-Mast 15.6–22.85
const TW=[160,460,760];
function s4(t){bg();header(1);ground();const RX=W/2,RY=560;rack(RX,RY,300,280,t,{});pill('Kernnetz',RX-290,RY,{size:38,col:YEL});
  TW.forEach((X,i)=>{const sel=i===2&&t>18.77;fiber([[RX,RY+140],[RX,RY+260],[X,RY+260],[X,GROUND-266]],t,1,sel&&t>19.9?1:0);});
  const scan=t>16.38&&t<18.77?Math.floor((t-16.38)/0.4)%3:-1;
  TW.forEach((X,i)=>{const sel=(i===2&&t>18.77)||scan===i;tower(X,GROUND,0.7,{t,col:sel?YEL:WHITE,waves:i===2&&t>21.6?1:0,maxR:160});if(scan===i){x.save();x.globalAlpha=0.3;circ(X,GROUND-150,120,YEL);x.restore();}});
  const st=stick(965,GROUND,0.62,{mood:t>21.9?'happy':'neutral',handL:[905,GROUND-190]});phone(905,GROUND-210,40,72,{screen:t>21.6?YEL:'#20305c',glow:t>21.6?0.8:0});
  pill('wo ist das Handy?',RX,RY-210,{...popA(t,16.38),size:38,col:WHITE,a:popA(t,16.38).a*(1-p(t,18.6,18.8))});
  pill('eingebucht ✓',760,GROUND-420,{...popA(t,18.77),size:36,fill:GREEN,col:GREEN,tcol:'#0b2a1b'});
  pill('Funk zum Ziel',W/2,GROUND+170,{...popA(t,21.6),size:42,col:YEL});}
// 5 Bruchteile einer Sekunde 22.85–26.2
const P5=[[120,980],[260,940],[260,1200],[820,1200],[820,940],[960,980]];
function s5(t){bg();header(1);
  phone(120,1000,60,106,{screen:'#5B9BE6'});phone(960,1000,60,106,{screen:YEL});tower(260,1150,0.55,{});tower(820,1150,0.55,{});
  fiber([[260,1150],[260,1200],[820,1200],[820,1150]],t,1,1);rack(540,1080,150,170,t,{});
  const u=((t-22.9)/0.7)%1;if(t>22.9){const [px,py]=polyAt(P5,u);const g=x.createRadialGradient(px,py,2,px,py,60);g.addColorStop(0,'rgba(255,240,170,1)');g.addColorStop(1,'rgba(255,240,170,0)');x.fillStyle=g;x.fillRect(px-60,py-60,120,120);}
  popScale(t,23.5,sc=>{x.translate(W/2,600);x.scale(sc,sc);circ(0,0,110,DARK,WHITE,8);const an=(t*8)%(Math.PI*2)-Math.PI/2;line(0,0,Math.cos(an)*80,Math.sin(an)*80,YEL,8);circ(0,0,10,YEL);rr(-20,-140,40,26,6);x.fillStyle=WHITE;x.fill();});
  pill('< 1 Sekunde',W/2,800,{...popA(t,24.03),size:56,fill:YEL,col:YEL,tcol:DARK});}
// 6 Pointe: Einfahrt + Autobahn 26.2–29.55
function s6(t){bg();header(1);
  x.fillStyle='#1c2438';x.beginPath();x.moveTo(420,620);x.lineTo(660,620);x.lineTo(1080,1460);x.lineTo(0,1460);x.closePath();x.fill();
  const ga=p(t,27.9,28.4);x.save();x.shadowColor='#5B9BE6';x.shadowBlur=30*ga;line(420,620,0,1460,`rgba(91,155,230,${0.4+0.6*ga})`,10);line(660,620,1080,1460,`rgba(91,155,230,${0.4+0.6*ga})`,10);x.restore();
  for(let l=-1;l<=1;l+=2)for(let i=0;i<8;i++){const ph=((t*0.9)+i/8)%1;const yy=620+ph*ph*840,xx=540+l*lerp(40,260,ph*ph);line(xx,yy,xx+l*lerp(4,24,ph*ph),yy+lerp(6,70,ph*ph),'rgba(255,255,255,0.7)',lerp(3,10,ph*ph));}
  for(let i=0;i<10;i++){const ph=((t*1.6)+i/10)%1,lane=(i%4)-1.5;const yy=620+ph*ph*840,xx=540+lane*lerp(50,400,ph*ph);const g=x.createRadialGradient(xx,yy,1,xx,yy,lerp(6,40,ph));g.addColorStop(0,`rgba(255,240,170,${ga})`);g.addColorStop(1,'rgba(255,240,170,0)');x.fillStyle=g;x.fillRect(xx-50,yy-50,100,100);}
  // Einfahrt
  x.strokeStyle='#3a4668';x.lineWidth=60;x.lineCap='round';x.beginPath();x.moveTo(-40,1500);x.quadraticCurveTo(80,1380,200,1340);x.stroke();
  phone(70,1380,46,80,{screen:'#5B9BE6'});if(t>26.3)waves(70,1360,t,{n:2,period:0.8,maxR:90,a0:-1.2,a1:0.2,a:p(t,26.3,26.6)});
  pill('Funk = Einfahrt',290,1180,{...popA(t,26.25),size:40,col:YEL});
  pill('Glasfaser = Autobahn',W/2,480,{...popA(t,28.0),size:46,fill:'#2C6FB8',col:BLUE,tcol:WHITE});}
function s7(t){seriesEnd(t,29.6,1,'Teil 2: Deine SMS →');}
SCENES=[[0,4.6,s1],[4.6,8.95,s2],[8.95,15.6,s3],[15.6,22.85,s4],[22.85,26.2,s5],[26.2,29.55,s6],[29.55,99,s7]];
