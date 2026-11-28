// Neon-Stil, Mathe: Geburtstagsparadoxon. Grafiken im Canvas gezeichnet, nur wenige KI-Bilder.
// Zeiten = Timeline nach atempo 1.1
const SRC='Geburtstagsparadoxon · Rechnung mit 365 Tagen, ohne Schaltjahr';
const CY='#5BE0FF',PINK='#FF5FD2';
const IM={};window.ready=Promise.all(['falsch','gehirn','klasse','torte'].map(k=>new Promise(r=>{const i=new Image();i.onload=()=>{IM[k]=i;r();};i.onerror=()=>r();i.src='img/'+k+'.png';})));
const P=n=>{let q=1;for(let k=0;k<n;k++)q*=(365-k)/365;return 1-q;};
const HOT={'180':RED,'nicht.':RED,'23':YEL,'50':YEL,'Denkfehler:':RED,'eigenen':CY,'Paar.':YEL,'253':YEL,'Paare.':YEL,'Chance.':CY,'97':YEL,'70':YEL,'100':YEL,'30':YEL,'Geburtstagsparadoxon.':PINK,'Geburtstag?':YEL,'unmöglich?':CY};
// ---------- Grundlagen ----------
function bgNeon(t){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#05081a');g.addColorStop(1,'#0b1438');x.fillStyle=g;x.fillRect(0,0,W,H);
  x.save();x.strokeStyle='rgba(91,224,255,0.07)';x.lineWidth=2;const o=(t*20)%80;for(let X=-80+o;X<W+80;X+=80){x.beginPath();x.moveTo(X,0);x.lineTo(X,H);x.stroke();}for(let Y=-80+o;Y<H+80;Y+=80){x.beginPath();x.moveTo(0,Y);x.lineTo(W,Y);x.stroke();}x.restore();
  for(let i=0;i<40;i++){const sx=(i*197)%W,sy=(i*331+t*15*(1+i%3))%H;circ(sx,sy,1.5+(i%3),`rgba(255,255,255,${0.25+0.25*Math.sin(t*2+i)})`);}}
function drawImg(k,t,t0,t1,dir){const im=IM[k];if(!im)return;const u=p(t,t0,t1);const z=dir>0?lerp(1.04,1.16,u):lerp(1.16,1.04,u);
  const s=Math.max(W/im.width,H/im.height)*z,dw=im.width*s,dh=im.height*s;x.drawImage(im,(W-dw)/2,(H-dh)/2,dw,dh);}
function glitch(t,at){const k=t-at;if(k<0||k>0.22)return;const a=1-k/0.22;
  for(let i=0;i<7;i++){const y=((i*271+Math.floor(t*60)*97)%H),h=20+((i*53)%60),off=(((i*37)%2)?1:-1)*a*60;x.drawImage(c,0,y,W,h,off,y,W,h);}
  x.save();x.globalCompositeOperation='lighter';x.globalAlpha=0.35*a;x.drawImage(c,-10*a,0);x.restore();x.fillStyle=`rgba(255,255,255,${0.25*a})`;x.fillRect(0,0,W,H);}
function crt(t){x.save();x.globalAlpha=0.10;x.fillStyle='#000';for(let y=0;y<H;y+=4)x.fillRect(0,y,W,2);x.restore();
  const g=x.createRadialGradient(W/2,H/2,H*0.25,W/2,H/2,H*0.75);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.55)');x.fillStyle=g;x.fillRect(0,0,W,H);}
function neonTxt(s,X,Y,size,col,a=1,sc=1){x.save();x.globalAlpha*=a;x.translate(X,Y);x.scale(sc,sc);x.font=`${size}px Anton`;x.textAlign='center';x.textBaseline='middle';
  for(let d=8;d>0;d-=2){x.fillStyle='rgba(10,12,30,0.9)';x.fillText(s,d,d);}x.lineWidth=10;x.strokeStyle='rgba(5,6,15,0.95)';x.lineJoin='round';x.strokeText(s,0,0);
  x.shadowColor=col;x.shadowBlur=30;x.fillStyle=col;x.fillText(s,0,0);x.restore();}
function bigWord(t){let cur=null;for(const w of WORDS){if(t>=w.s-0.02&&t<w.e)cur=w;}if(!cur)return;
  const k=p(t,cur.s-0.02,cur.s+0.1),sc=0.78+0.22*back(k);let s=cur.w.replace(/[„“"]/g,'').toUpperCase().replace(/[,.:]$/,'');const col=HOT[cur.w]||HOT[cur.w.replace(/[.,:?]$/,'')]||null;
  let size=150;x.font=`${size}px Anton`;while(x.measureText(s).width>W-90){size-=6;x.font=`${size}px Anton`;}
  x.save();x.translate(W/2,1530);x.scale(sc,sc);x.textAlign='center';x.textBaseline='middle';for(let d=10;d>0;d-=2){x.fillStyle='rgba(10,12,30,0.9)';x.fillText(s,d,d);}
  x.lineWidth=12;x.strokeStyle='rgba(5,6,15,0.95)';x.lineJoin='round';x.strokeText(s,0,0);const g=x.createLinearGradient(0,-size/2,0,size/2);
  if(col){g.addColorStop(0,'#fff');g.addColorStop(0.35,col);g.addColorStop(1,col);}else{g.addColorStop(0,'#fff');g.addColorStop(0.55,'#e8ecf5');g.addColorStop(1,'#9aa5bf');}
  x.shadowColor=col||'rgba(120,200,255,0.8)';x.shadowBlur=30;x.fillStyle=g;x.fillText(s,0,0);x.restore();}
function box(big,small,col,t,at,Y=380,a=1){const r=popA(t,at);if(r.a<=0)return;x.save();x.globalAlpha=r.a*a;x.translate(W/2,Y);x.scale(r.sc,r.sc);
  rr(-330,-100,660,200,30);x.fillStyle='rgba(8,12,30,0.8)';x.fill();x.strokeStyle=col;x.lineWidth=6;x.stroke();x.restore();neonTxt(big,W/2,Y-8,120,col,r.a*a,r.sc);if(small){x.save();x.globalAlpha=r.a*a;txt(small,W/2,Y+128,40,WHITE,800);x.restore();}}
// Personen im Kreis
const CX=W/2,CYc=880,RAD=330;
const pos=(i,n)=>{const an=-Math.PI/2+i/n*Math.PI*2;return [CX+Math.cos(an)*RAD,CYc+Math.sin(an)*RAD];};
function person(X,Y,s,col,glow=0){x.save();if(glow){x.shadowColor=col;x.shadowBlur=25*glow;}circ(X,Y-18*s,11*s,col);x.beginPath();x.arc(X,Y+14*s,18*s,Math.PI,0);x.fillStyle=col;x.fill();x.restore();}
function people(t,n,at,dur,hi=-1){for(let i=0;i<n;i++){const a=popA(t,at+i*dur/n);if(a.a<=0)continue;const [X,Y]=pos(i,n);x.save();x.globalAlpha=a.a;x.translate(X,Y);x.scale(a.sc,a.sc);person(0,0,1.3,i===hi?YEL:CY,i===hi?1:0.5);x.restore();}}
function pairLines(t,n,k,from=-1,col='rgba(255,200,80,'){let cnt=0;const tot=from>=0?n-1:n*(n-1)/2;const show=Math.floor(tot*k);x.save();x.lineWidth=2.2;x.globalCompositeOperation='lighter';
  for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){if(from>=0&&i!==from&&j!==from)continue;if(cnt>=show)break;const [a1,b1]=pos(i,n),[a2,b2]=pos(j,n);
    x.strokeStyle=col+(from>=0?0.9:0.35)+')';x.beginPath();x.moveTo(a1,b1);x.lineTo(a2,b2);x.stroke();cnt++;}x.restore();return cnt;}
// ---------- Szenen ----------
function sA(t){bgNeon(t); // Kalender + Zähler bis 180
  const k=eo(p(t,0.3,3.6));const n=Math.round(180*k);for(let i=0;i<365;i++){const c0=i%19,r0=Math.floor(i/19);const X=150+c0*41,Y=520+r0*41;rr(X-16,Y-16,32,32,6);
    x.fillStyle=i<n?'rgba(91,224,255,0.75)':'rgba(255,255,255,0.08)';x.fill();}
  neonTxt('365 TAGE',W/2,400,90,WHITE,p(t,0.1,0.4));box(String(n),'Leute?',RED,t,0.6,1230);}
function sB(t){drawImg('falsch',t,4.38,5.68,1);bigX(W/2,700,170,p(t,4.55,4.85));}
function sC(t){bgNeon(t);people(t,23,5.7,1.0);
  if(t>7.7){const k=eo(p(t,7.9,8.8))*P(23);x.save();x.lineWidth=18;x.lineCap='round';x.strokeStyle='rgba(255,255,255,0.12)';x.beginPath();x.arc(CX,CYc,RAD+90,0,Math.PI*2);x.stroke();
    x.strokeStyle=YEL;x.shadowColor=YEL;x.shadowBlur=25;x.beginPath();x.arc(CX,CYc,RAD+90,-Math.PI/2,-Math.PI/2+k*Math.PI*2);x.stroke();x.restore();
    neonTxt((k*100).toFixed(1).replace('.',',')+' %',CX,CYc,130,YEL,p(t,7.8,8.0));}
  neonTxt('23 LEUTE',W/2,330,96,CY,popA(t,5.7).a);}
function sD(t){drawImg('gehirn',t,8.95,10.5,-1);neonTxt('?',W/2+260,420,220,CY,popA(t,9.3).a,1+0.05*Math.sin(t*6));}
function sE(t){bgNeon(t);people(t,23,10.5,0.01,0);const c=pairLines(t,23,eo(p(t,11.5,12.9)),0,'rgba(91,224,255,');
  const [X,Y]=pos(0,23);neonTxt('DU',X,Y-80,70,YEL,popA(t,11.3).a);neonTxt(c+' VERGLEICHE',W/2,330,80,CY,popA(t,11.6).a);}
function sF(t){bgNeon(t);people(t,23,13.7,0.01);const c=pairLines(t,23,Math.pow(p(t,14.3,17.7),1.6));
  neonTxt('JEDES PAAR',W/2,300,90,YEL,popA(t,14.3).a);box(String(c),'Paare',YEL,t,16.0,1240);
  if(t>18.3){for(let i=0;i<14;i++){const ph=((t*1.4)+i/14)%1;const an=i*2.4;const r=ph*RAD*1.2;x.save();x.globalAlpha=1-ph;circ(CX+Math.cos(an)*r,CYc+Math.sin(an)*r,6,PINK);x.restore();}}}
function sG(t){bgNeon(t);const L=150,R=960,T=540,B=1230;x.save();x.strokeStyle='rgba(255,255,255,0.5)';x.lineWidth=4;x.beginPath();x.moveTo(L,T);x.lineTo(L,B);x.lineTo(R,B);x.stroke();x.restore();
  txt('Leute',R-40,B+45,32,GREY,700);txt('100 %',L-10,T,26,GREY,700,'right');txt('50 %',L-10,(T+B)/2,26,GREY,700,'right');
  for(const v of [10,20,30,40,50,60,70,80])txt(String(v),L+(R-L)*v/80,B+22,24,WHITE,700);
  const px=n=>L+(R-L)*n/80,py=v=>B-(B-T)*v;x.save();x.setLineDash([10,10]);x.strokeStyle='rgba(255,255,255,0.25)';x.lineWidth=3;x.beginPath();x.moveTo(L,py(0.5));x.lineTo(R,py(0.5));x.stroke();x.restore();
  const k=eo(p(t,20.75,21.6));x.save();x.strokeStyle=YEL;x.lineWidth=8;x.shadowColor=YEL;x.shadowBlur=20;x.beginPath();for(let n=0;n<=80*k;n++){const X=px(n),Y=py(P(n));n?x.lineTo(X,Y):x.moveTo(X,Y);}x.stroke();x.restore();
  const mk=(n,at,col)=>{const a=popA(t,at);if(a.a<=0)return;x.save();x.globalAlpha=a.a;x.setLineDash([8,8]);line(px(n),py(P(n)),px(n),B,col,3);x.setLineDash([]);circ(px(n),py(P(n)),16*a.sc,col,WHITE,4);x.restore();};
  mk(23,20.9,CY);mk(50,21.0,YEL);mk(70,24.8,PINK);
  if(t<24.6)box('97 %','bei 50 Leuten',YEL,t,23.05,300);else box('99,9 %','bei 70 Leuten',PINK,t,24.8,300);}
function sH(t){drawImg('klasse',t,27.1,30.4,1);box('70 %','Klasse mit 30 Kindern',YEL,t,28.2,360);}
function sI(t){drawImg('torte',t,30.4,36,-1);const a=popA(t,31.05);neonTxt('GEBURTSTAGS-',W/2,300,100,PINK,a.a,a.sc);neonTxt('PARADOXON',W/2,410,100,PINK,a.a,a.sc);}
function sJ(t){drawImg('klasse',t,32.4,38,-1);neonTxt('UND BEI DIR?',W/2,330,100,YEL,popA(t,32.45).a);
  if(t>36.6){const f=popA(t,36.7);const pul=1+0.05*Math.sin(t*7);x.save();x.globalAlpha=f.a;x.translate(W/2,1250);x.scale(f.sc*pul,f.sc*pul);rr(-220,-62,440,124,62);x.fillStyle=RED;x.fill();txt('+ Folgen',0,4,56,WHITE,900);x.restore();
    neonTxt('SCHREIB\'S IN DIE KOMMENTARE',W/2,1050,62,WHITE,popA(t,36.6).a);}}
const SC=[[0,sA],[4.38,sB],[5.68,sC],[8.95,sD],[10.5,sE],[13.7,sF],[20.7,sG],[27.1,sH],[30.4,sI],[32.4,sJ],[99,null]];
window.render=function(t){x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.fillStyle='#05070f';x.fillRect(0,0,W,H);
  let i=0;while(i<SC.length-2&&t>=SC[i+1][0])i++;x.save();SC[i][1](t);x.restore();
  if(t>4.38&&t<5.68){x.fillStyle=`rgba(160,0,20,${0.25*p(t,4.38,4.6)})`;x.fillRect(0,0,W,H);}
  glitch(t,SC[i][0]);crt(t);if(t<36.6)bigWord(t);x.save();x.globalAlpha=0.6;txt(SRC,W/2,1860,22,'rgba(255,255,255,0.7)',600);x.restore();};
