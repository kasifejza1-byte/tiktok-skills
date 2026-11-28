// Neon-Stil: „Was wäre, wenn du einen IQ von 1000 hättest?“ – Gedankenexperiment. Zeiten nach atempo 1.1
const SRC='IQ-Skala: Mittelwert 100, Standardabweichung 15 · Gehirn ≈ 20 % des Energieverbrauchs';
const CY='#5BE0FF',PINK='#FF5FD2',ORANGE='#FF9A3C';
const KEYS=['01','03','04','05','06','07','08','09','10','11','gehirn'];
const IM={};window.ready=Promise.all(KEYS.map(k=>new Promise(r=>{const i=new Image();i.onload=()=>{IM[k]=i;r();};i.onerror=()=>r();i.src='img/'+k+'.png';})));
const HOT={'1000':YEL,'unmöglich.':RED,'100':CY,'160':CY,'30.000.':YEL,'Atome':RED,'Universum':RED,'Sekunden.':YEL,'Sprache':YEL,'Nachmittag.':YEL,'Gewonnen.':YEL,
  'Fünftel':ORANGE,'Energie.':ORANGE,'Supergehirn':ORANGE,'Hunger.':ORANGE,'Schlimmste:':RED,'Niemand':RED,'Witze.':RED,'Klügste':CY,'versteht.':PINK,'jemanden':PINK,'du?':YEL};
// [Start, Bild oder 'CURVE', Zoom-Richtung]
const CUTS=[[0,'01',1],[3.07,'CURVE',1],[15.95,'03',1],[19.2,'gehirn',-1],[20.89,'04',1],[22.88,'05',-1],[26.16,'06',1],[28.89,'07',-1],[32.17,'08',1],[33.94,'09',-1],[36.77,'10',1],[41.01,'11',-1],[99,'',1]];
const BOXES=[[11.68,12.85,'1 VON 30.000','hat einen IQ von 160',YEL,330],[16.3,19.1,'UNMÖGLICH','seltener als alle Atome im Universum',RED,430],[30.58,32.1,'20 %','deiner Energie frisst das Gehirn',ORANGE,430]];
function bgNeon(t){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#05081a');g.addColorStop(1,'#0b1438');x.fillStyle=g;x.fillRect(0,0,W,H);
  x.save();x.strokeStyle='rgba(91,224,255,0.07)';x.lineWidth=2;const o=(t*20)%80;for(let X=-80+o;X<W+80;X+=80){x.beginPath();x.moveTo(X,0);x.lineTo(X,H);x.stroke();}for(let Y=-80+o;Y<H+80;Y+=80){x.beginPath();x.moveTo(0,Y);x.lineTo(W,Y);x.stroke();}x.restore();
  for(let i=0;i<40;i++){const sx=(i*197)%W,sy=(i*331+t*15*(1+i%3))%H;circ(sx,sy,1.5+(i%3),`rgba(255,255,255,${0.25+0.25*Math.sin(t*2+i)})`);}}
function drawImg(k,t,t0,t1,dir){const im=IM[k];if(!im)return;const u=p(t,t0,t1);const z=dir>0?lerp(1.04,1.16,u):lerp(1.16,1.04,u);
  const s=Math.max(W/im.width,H/im.height)*z,dw=im.width*s,dh=im.height*s;x.drawImage(im,(W-dw)/2+Math.sin(t*0.7)*8,(H-dh)/2,dw,dh);}
function glitch(t,at){const k=t-at;if(k<0||k>0.22)return;const a=1-k/0.22;
  for(let i=0;i<7;i++){const y=((i*271+Math.floor(t*60)*97)%H),h=20+((i*53)%60),off=(((i*37)%2)?1:-1)*a*60;x.drawImage(c,0,y,W,h,off,y,W,h);}
  x.save();x.globalCompositeOperation='lighter';x.globalAlpha=0.35*a;x.drawImage(c,-10*a,0);x.restore();x.fillStyle=`rgba(255,255,255,${0.25*a})`;x.fillRect(0,0,W,H);}
function crt(t){x.save();x.globalAlpha=0.10;x.fillStyle='#000';for(let y=0;y<H;y+=4)x.fillRect(0,y,W,2);x.restore();
  const g=x.createRadialGradient(W/2,H/2,H*0.25,W/2,H/2,H*0.75);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.55)');x.fillStyle=g;x.fillRect(0,0,W,H);}
function neonTxt(s,X,Y,size,col,a=1,sc=1){if(a<=0)return;x.save();x.globalAlpha*=a;x.translate(X,Y);x.scale(sc,sc);x.font=`${size}px Anton`;x.textAlign='center';x.textBaseline='middle';
  for(let d=8;d>0;d-=2){x.fillStyle='rgba(10,12,30,0.9)';x.fillText(s,d,d);}x.lineWidth=10;x.strokeStyle='rgba(5,6,15,0.95)';x.lineJoin='round';x.strokeText(s,0,0);
  x.shadowColor=col;x.shadowBlur=30;x.fillStyle=col;x.fillText(s,0,0);x.restore();}
function bigWord(t){let cur=null;for(const w of WORDS){if(t>=w.s-0.02&&t<w.e)cur=w;}if(!cur)return;
  const k=p(t,cur.s-0.02,cur.s+0.1),sc=0.78+0.22*back(k);let s=cur.w.replace(/[„“"]/g,'').toUpperCase().replace(/[,.:]$/,'');const col=HOT[cur.w]||HOT[cur.w.replace(/[.,:?]$/,'')]||null;
  let size=150;x.font=`${size}px Anton`;while(x.measureText(s).width>W-90){size-=6;x.font=`${size}px Anton`;}
  x.save();x.translate(W/2,1530);x.scale(sc,sc);x.textAlign='center';x.textBaseline='middle';for(let d=10;d>0;d-=2){x.fillStyle='rgba(10,12,30,0.9)';x.fillText(s,d,d);}
  x.lineWidth=12;x.strokeStyle='rgba(5,6,15,0.95)';x.lineJoin='round';x.strokeText(s,0,0);const g=x.createLinearGradient(0,-size/2,0,size/2);
  if(col){g.addColorStop(0,'#fff');g.addColorStop(0.35,col);g.addColorStop(1,col);}else{g.addColorStop(0,'#fff');g.addColorStop(0.55,'#e8ecf5');g.addColorStop(1,'#9aa5bf');}
  x.shadowColor=col||'rgba(120,200,255,0.8)';x.shadowBlur=30;x.fillStyle=g;x.fillText(s,0,0);x.restore();}
function boxes(t){for(const [a,b,big,small,col,Y] of BOXES){if(t<a||t>b)continue;const r=popA(t,a);const al=r.a*(1-p(t,b-0.15,b));x.save();x.globalAlpha=al;x.translate(W/2,Y);x.scale(r.sc,r.sc);
  x.font='100px Anton';const w=Math.max(560,x.measureText(big).width+100);rr(-w/2,-95,w,190,30);x.fillStyle='rgba(8,12,30,0.82)';x.fill();x.strokeStyle=col;x.lineWidth=6;x.stroke();x.restore();
  neonTxt(big,W/2,Y-8,100,col,al,r.sc);x.save();x.globalAlpha=al;txt(small,W/2,Y+124,38,WHITE,800);x.restore();}}
// Glockenkurve der IQ-Verteilung (Mittel 100, SD 15), Kamera fährt am Ende nach rechts ins Leere
function curve(t){bgNeon(t);const pan=eo(p(t,12.9,15.4));const L=110,R=970,B=1220,Hc=520;
  const lo=lerp(40,40,pan),hi=lerp(170,1060,pan);const px=v=>L+(R-L)*(v-lo)/(hi-lo),pdf=v=>Math.exp(-0.5*((v-100)/15)**2);
  const k=eo(p(t,3.3,4.6));x.save();x.strokeStyle='rgba(255,255,255,0.5)';x.lineWidth=4;line(L,B,R,B,'rgba(255,255,255,0.5)',4);
  x.beginPath();for(let i=0;i<=300*k;i++){const v=lo+(hi-lo)*i/300;const X=px(v),Y=B-Hc*pdf(v);i?x.lineTo(X,Y):x.moveTo(X,Y);}
  x.lineTo(px(lo+(hi-lo)*k),B);x.lineTo(L,B);x.closePath();const g=x.createLinearGradient(0,B-Hc,0,B);g.addColorStop(0,'rgba(91,224,255,0.45)');g.addColorStop(1,'rgba(91,224,255,0.05)');x.fillStyle=g;x.fill();
  x.strokeStyle=CY;x.lineWidth=7;x.shadowColor=CY;x.shadowBlur=20;x.beginPath();for(let i=0;i<=300*k;i++){const v=lo+(hi-lo)*i/300;const X=px(v),Y=B-Hc*pdf(v);i?x.lineTo(X,Y):x.moveTo(X,Y);}x.stroke();x.restore();
  const ticks=pan<0.3?[70,100,130,160]:[100,400,700,1000];for(const v of ticks){const X=px(v);if(X<L-5||X>R+5)continue;line(X,B,X,B+16,WHITE,3);txt(String(v),X,B+44,30,WHITE,800);}
  txt('IQ',R+30,B+44,30,GREY,800);
  const mk=(v,at,col,label)=>{const a=popA(t,at);if(a.a<=0)return;const X=px(v);if(X>R+40)return;x.save();x.globalAlpha=a.a;x.setLineDash([10,10]);line(X,B,X,B-Hc*Math.max(pdf(v),0.02)-40,col,4);x.setLineDash([]);
    circ(X,B-Hc*pdf(v),16*a.sc,col,WHITE,4);x.restore();neonTxt(label,X,B-Hc*Math.max(pdf(v),0.02)-90,64,col,a.a,a.sc);};
  mk(100,7.55,CY,'100 = NORMAL');mk(160,9.38,YEL,'160');
  if(pan>0.6){const a=p(t,14.6,15.0);const X=px(1000);neonTxt('1000',Math.min(X,W-170),B-250,150,RED,a,1+0.05*Math.sin(t*8));x.save();x.globalAlpha=a;x.setLineDash([14,12]);line(px(160),B-30,Math.min(X,W-170)-110,B-200,RED,5);x.restore();
    x.save();x.globalAlpha=a;txt('Kurve hier = praktisch NULL',W/2,B-560,40,WHITE,800);x.restore();}
  neonTxt('SO VERTEILT SICH DER IQ',W/2,330,74,WHITE,popA(t,3.3).a*(1-p(t,11.5,11.7)*(1-p(t,12.85,13.05))));}
function outro(t){if(t<44.45)return;const f=popA(t,44.55);const pul=1+0.05*Math.sin(t*7);x.save();x.globalAlpha=f.a;x.translate(W/2,1350);x.scale(f.sc*pul,f.sc*pul);rr(-220,-62,440,124,62);x.fillStyle=RED;x.fill();txt('+ Folgen',0,4,56,WHITE,900);x.restore();
  neonTxt('SCHREIB\'S IN DIE KOMMENTARE',W/2,960,70,YEL,popA(t,44.47).a);}
window.render=function(t){x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.fillStyle='#05070f';x.fillRect(0,0,W,H);
  let i=0;while(i<CUTS.length-2&&t>=CUTS[i+1][0])i++;const [a,k,dir]=CUTS[i],b=CUTS[i+1][0];
  if(k==='CURVE')curve(t);else drawImg(k,t,a,Math.min(b,a+4),dir);
  if(t>3.75&&t<5.2){x.fillStyle=`rgba(160,0,20,${0.22*p(t,3.75,3.95)*(1-p(t,4.9,5.2))})`;x.fillRect(0,0,W,H);}
  glitch(t,a);crt(t);boxes(t);if(t<44.45)bigWord(t);outro(t);x.save();x.globalAlpha=0.6;txt(SRC,W/2,1860,21,'rgba(255,255,255,0.7)',600);x.restore();};
