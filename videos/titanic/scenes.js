// Neon-Stil (nach Referenzvideo des Users): Bildwechsel alle 2–3 s, EIN großes Wort in der Mitte, Glitch-Übergänge
// Story: Titanic (frei nacherzählt, eigene Figuren) + Hängebrücken-Experiment – Zeiten = Timeline nach atempo 1.1
const SRC='Story: Film „Titanic“ (1997), frei nacherzählt · Studie: Dutton & Aron 1974 (Hängebrücke)';
const IM={};const KEYS=[];for(let i=1;i<=14;i++)KEYS.push(String(i).padStart(2,'0'));
window.ready=Promise.all(KEYS.map(k=>new Promise(r=>{const i=new Image();i.onload=()=>{IM[k]=i;r();};i.onerror=()=>r();i.src='img/'+k+'.png';})));
// [Start, Bild, Zoom-Richtung]
const CUTS=[[0,'01',1],[2.74,'02',-1],[5.41,'03',1],[8.34,'04',-1],[10.86,'05',1],[12.84,'06',-1],[14.19,'07',1],[15.28,'08',-1],[18.39,'09',1],
  [19.92,'10',-1],[23.86,'11',1],[29.7,'12',-1],[32.45,'13',1],[36.76,'14',-1],[99,'',1]];
// Schlüsselwörter farbig
const HOT={'1912':YEL,'Rose':'#FF5FD2','gefangen.':RED,'Jack':'#5BE0FF','arm.':'#5BE0FF','Pokern':YEL,'alles.':YEL,'4':YEL,'Eisberg.':'#5BE0FF','sinkt.':RED,
  'eiskalten':'#5BE0FF','Holztür.':YEL,'nicht.':RED,'schnell?':YEL,'Psychologie':YEL,'Hängebrücke':RED,'Zweite':RED,'Achte.':'#5BE0FF','Angst':RED,'Liebe.':'#FF5FD2',
  'verliebt.':'#FF5FD2','Titanic':YEL,'riesig.':RED};
function drawImg(k,t,t0,t1,dir){const im=IM[k];if(!im)return;const u=p(t,t0,t1);const z=dir>0?lerp(1.04,1.16,u):lerp(1.16,1.04,u);
  const s=Math.max(W/im.width,H/im.height)*z,dw=im.width*s,dh=im.height*s;const dx=(W-dw)/2+Math.sin(t*0.7)*8,dy=(H-dh)/2;x.drawImage(im,dx,dy,dw,dh);}
function glitch(t,at){const k=t-at;if(k<0||k>0.22)return;const a=1-k/0.22;
  for(let i=0;i<7;i++){const y=((i*271+Math.floor(t*60)*97)%H),h=20+((i*53)%60),off=(((i*37)%2)?1:-1)*a*60;x.drawImage(c,0,y,W,h,off,y,W,h);}
  x.save();x.globalCompositeOperation='lighter';x.globalAlpha=0.35*a;x.drawImage(c,-10*a,0);x.restore();x.fillStyle=`rgba(255,255,255,${0.25*a})`;x.fillRect(0,0,W,H);}
function crt(t){x.save();x.globalAlpha=0.10;x.fillStyle='#000';for(let y=0;y<H;y+=4)x.fillRect(0,y,W,2);x.restore();
  const g=x.createRadialGradient(W/2,H/2,H*0.25,W/2,H/2,H*0.75);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.55)');x.fillStyle=g;x.fillRect(0,0,W,H);
  // Filmkorn
  x.save();x.globalAlpha=0.05;for(let i=0;i<140;i++){const r1=Math.sin(i*12.9898+Math.floor(t*30)*78.233)*43758.5453;const fx=(r1-Math.floor(r1))*W,fy=((r1*7)-Math.floor(r1*7))*H;x.fillStyle=i%2?'#fff':'#000';x.fillRect(fx,fy,3,3);}x.restore();}
function bigWord(t){let cur=null;for(const w of WORDS){if(t>=w.s-0.02&&t<w.e)cur=w;}if(!cur)return;
  const k=p(t,cur.s-0.02,cur.s+0.1),sc=0.78+0.22*back(k);let s=cur.w.replace(/[„“"]/g,'').toUpperCase();const key=cur.w;const col=HOT[key]||HOT[key.replace(/[.,:?]$/,'')]||null;
  s=s.replace(/[,.:]$/,'');let size=170;x.font=`${size}px Anton`;while(x.measureText(s).width>W-90){size-=6;x.font=`${size}px Anton`;}
  x.save();x.translate(W/2,960);x.scale(sc,sc);x.textAlign='center';x.textBaseline='middle';
  // 3D-Tiefe
  for(let d=10;d>0;d-=2){x.fillStyle=`rgba(10,12,30,${0.9})`;x.fillText(s,d,d);}
  x.lineWidth=12;x.strokeStyle='rgba(5,6,15,0.95)';x.lineJoin='round';x.strokeText(s,0,0);
  const g=x.createLinearGradient(0,-size/2,0,size/2);if(col){g.addColorStop(0,'#ffffff');g.addColorStop(0.35,col);g.addColorStop(1,col);}else{g.addColorStop(0,'#ffffff');g.addColorStop(0.55,'#e8ecf5');g.addColorStop(1,'#9aa5bf');}
  x.shadowColor=col||'rgba(120,200,255,0.8)';x.shadowBlur=30;x.fillStyle=g;x.fillText(s,0,0);x.restore();}
const BOXES=[[11.15,12.8,'4 TAGE','bis zur großen Liebe','#FF5FD2'],[27.75,29.65,'JEDER 2.','rief an · wackelige Brücke',RED],[31.15,32.4,'JEDER 8.','rief an · sichere Brücke','#5BE0FF']];
function stat(t){for(const [a,b,big,small,col] of BOXES){if(t<a||t>b)continue;const r=popA(t,a);x.save();x.globalAlpha=r.a*(1-p(t,b-0.15,b));x.translate(W/2,430);x.scale(r.sc,r.sc);
  x.font='96px Anton';const w=Math.max(560,x.measureText(big).width+90);rr(-w/2,-95,w,190,30);x.fillStyle='rgba(8,12,30,0.78)';x.fill();x.strokeStyle=col;x.lineWidth=6;x.stroke();
  x.textAlign='center';x.textBaseline='middle';x.fillStyle=col;x.shadowColor=col;x.shadowBlur=30;x.fillText(big,0,-8);x.shadowBlur=0;txt(small,0,124,40,WHITE,800);x.restore();}}
function xMark(t){}
function outro(t){if(t<41.3)return;const f=popA(t,41.4);const pul=1+0.05*Math.sin(t*7);x.save();x.globalAlpha=f.a;x.translate(W/2,1350);x.scale(f.sc*pul,f.sc*pul);rr(-220,-62,440,124,62);x.fillStyle=RED;x.fill();txt('+ Folgen',0,4,56,WHITE,900);x.restore();
  const g=popA(t,41.32);x.save();x.globalAlpha=g.a;x.translate(W/2,960);x.scale(g.sc,g.sc);x.font='96px Anton';x.textAlign='center';x.textBaseline='middle';x.lineWidth=12;x.strokeStyle='rgba(5,6,15,0.95)';x.strokeText('MARKIER DEINEN SCHATZ',0,0);x.fillStyle=YEL;x.shadowColor=YEL;x.shadowBlur=30;x.fillText('MARKIER DEINEN SCHATZ',0,0);x.restore();}
window.render=function(t){x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.fillStyle='#05070f';x.fillRect(0,0,W,H);
  let i=0;while(i<CUTS.length-1&&t>=CUTS[i+1][0])i++;const [a,k,dir]=CUTS[i];const b=CUTS[i+1][0];drawImg(k,t,a,Math.min(b,a+4),dir);
  if(t<15.28&&t>12.84){x.fillStyle=`rgba(160,0,20,${0.2*p(t,12.84,13.1)})`;x.fillRect(0,0,W,H);}
  glitch(t,a);crt(t);xMark(t);stat(t);if(t<41.3)bigWord(t);outro(t);
  x.save();x.globalAlpha=0.6;txt(SRC,W/2,1860,20,'rgba(255,255,255,0.7)',600);x.restore();};
