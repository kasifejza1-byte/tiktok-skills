const W=1080,H=1920,c=document.getElementById('c'),mainX=c.getContext('2d');let x=mainX;const buf=document.createElement('canvas');buf.width=W;buf.height=H;const bufX=buf.getContext('2d');
const YEL='#F5B83D',RED='#E5484D',WHITE='#F4F6FA',BLUE='#5B9BE6',GREY='#8C96AD',GROUND=1250;
let WORDS=[];
const cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const p=(t,a,b)=>cl((t-a)/(b-a));
const eo=v=>1-Math.pow(1-v,3);
const eio=v=>v<.5?4*v*v*v:1-Math.pow(-2*v+2,3)/2;
const back=v=>{const s=1.70158;v=v-1;return v*v*((s+1)*v+s)+1};
const lerp=(a,b,v)=>a+(b-a)*v;

function rr(X,Y,w,h,r){x.beginPath();x.moveTo(X+r,Y);x.arcTo(X+w,Y,X+w,Y+h,r);x.arcTo(X+w,Y+h,X,Y+h,r);x.arcTo(X,Y+h,X,Y,r);x.arcTo(X,Y,X+w,Y,r);x.closePath();}
function line(a,b,cc,d,col=WHITE,lw=8){x.strokeStyle=col;x.lineWidth=lw;x.lineCap='round';x.beginPath();x.moveTo(a,b);x.lineTo(cc,d);x.stroke();}
function circ(X,Y,r,fill,stroke,lw=8){x.beginPath();x.arc(X,Y,r,0,Math.PI*2);if(fill){x.fillStyle=fill;x.fill();}if(stroke){x.strokeStyle=stroke;x.lineWidth=lw;x.stroke();}}
function txt(s,X,Y,size,col=WHITE,weight=800,align='center'){x.font=`${weight} ${size}px Inter`;x.fillStyle=col;x.textAlign=align;x.textBaseline='middle';x.fillText(s,X,Y);}

// ---------- background ----------
function bg(tint=0){
  const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0c1530');g.addColorStop(.6,'#132350');g.addColorStop(1,'#0e1a3b');
  x.fillStyle=g;x.fillRect(0,0,W,H);
  const r=x.createRadialGradient(W/2,800,100,W/2,800,1100);r.addColorStop(0,'rgba(60,90,160,0.22)');r.addColorStop(1,'rgba(0,0,0,0.35)');
  x.fillStyle=r;x.fillRect(0,0,W,H);
  // lower band like refs
  x.fillStyle='rgba(10,18,40,0.35)';x.fillRect(0,GROUND+8,W,H-GROUND);
  if(tint>0){x.fillStyle=`rgba(150,30,35,${0.55*tint})`;x.fillRect(0,0,W,H);}
}
function ground(a=1,y=GROUND){x.globalAlpha*=a;line(0,y,W,y,WHITE,6);line(60,y+28,W-60,y+28,'rgba(244,246,250,0.25)',4);x.globalAlpha/=a;}

// ---------- characters ----------
function face(X,Y,R,mood){
  x.strokeStyle=WHITE;x.fillStyle=WHITE;x.lineWidth=6;x.lineCap='round';
  const ex=R*.36,ey=Y-R*.08;
  if(mood==='sleep'){for(const s of[-1,1]){x.beginPath();x.arc(X+s*ex,ey,R*.16,0.15*Math.PI,0.85*Math.PI);x.stroke();}
    x.beginPath();x.moveTo(X-R*.18,Y+R*.42);x.lineTo(X+R*.18,Y+R*.42);x.stroke();return;}
  if(mood==='shock'){for(const s of[-1,1]){circ(X+s*ex,ey,R*.13,null,WHITE,6);circ(X+s*ex,ey,R*.05,WHITE);}
    line(X-ex-R*.15,ey-R*.32,X-ex+R*.15,ey-R*.38,WHITE,6);line(X+ex-R*.15,ey-R*.38,X+ex+R*.15,ey-R*.32,WHITE,6);
    x.beginPath();x.ellipse(X,Y+R*.45,R*.14,R*.18,0,0,Math.PI*2);x.stroke();return;}
  for(const s of[-1,1])circ(X+s*ex,ey,R*.09,WHITE);
  if(mood==='happy'){x.beginPath();x.arc(X,Y+R*.18,R*.32,0.15*Math.PI,0.85*Math.PI);x.stroke();
    line(X-ex-R*.13,ey-R*.3,X-ex+R*.13,ey-R*.34,WHITE,6);line(X+ex-R*.13,ey-R*.34,X+ex+R*.13,ey-R*.3,WHITE,6);}
  else if(mood==='think'){line(X-ex-R*.15,ey-R*.36,X-ex+R*.15,ey-R*.26,WHITE,6);line(X+ex-R*.15,ey-R*.26,X+ex+R*.15,ey-R*.36,WHITE,6);
    x.beginPath();x.moveTo(X-R*.2,Y+R*.45);x.quadraticCurveTo(X,Y+R*.35,X+R*.2,Y+R*.45);x.stroke();}
  else if(mood==='angry'){line(X-ex-R*.15,ey-R*.38,X-ex+R*.15,ey-R*.24,WHITE,6);line(X+ex-R*.15,ey-R*.24,X+ex+R*.15,ey-R*.38,WHITE,6);
    line(X-R*.2,Y+R*.45,X+R*.2,Y+R*.45,WHITE,6);}
  else {line(X-ex-R*.13,ey-R*.32,X-ex+R*.13,ey-R*.32,WHITE,6);line(X+ex-R*.13,ey-R*.32,X+ex+R*.13,ey-R*.32,WHITE,6);
    line(X-R*.2,Y+R*.45,X+R*.2,Y+R*.45,WHITE,6);}
}
// returns hand positions; o.handL/handR absolute override; o.walk phase
function stick(X,Y,s,o={}){
  const R=50*s,hy=Y-335*s,neck=Y-282*s,hip=Y-140*s,sh=Y-255*s,lw=9*s+2;
  const w=o.walk;const sw=w===undefined?0:Math.sin(w)*0.45;
  // legs
  line(X,hip,X+Math.sin(sw)*140*s,hip+Math.cos(sw)*140*s,WHITE,lw);
  line(X,hip,X+Math.sin(-sw)*140*s,hip+Math.cos(-sw)*140*s,WHITE,lw);
  line(X,neck,X,hip,WHITE,lw);
  const hl=o.handL||[X-70*s+Math.sin(-sw)*30*s,Y-150*s],hr=o.handR||[X+70*s+Math.sin(sw)*30*s,Y-150*s];
  const elb=(h,side)=>[(X+h[0])/2+side*18*s,(sh+h[1])/2+12*s];
  for(const [h,side] of [[hl,-1],[hr,1]]){const e=elb(h,side);x.strokeStyle=WHITE;x.lineWidth=lw;x.lineCap='round';x.lineJoin='round';
    x.beginPath();x.moveTo(X,sh);x.lineTo(e[0],e[1]);x.lineTo(h[0],h[1]);x.stroke();}
  circ(X,hy,R,'#14224a',WHITE,lw);
  face(X,hy,R,o.mood||'neutral');
  return {hl,hr,head:[X,hy],R};
}
function phone(X,Y,w,h,o={}){ // center coords
  x.save();x.translate(X,Y);if(o.rot)x.rotate(o.rot);
  if(o.glow){const g=x.createRadialGradient(0,0,10,0,0,Math.max(w,h)*0.9);g.addColorStop(0,`rgba(245,184,61,${0.35*o.glow})`);g.addColorStop(1,'rgba(245,184,61,0)');x.fillStyle=g;x.fillRect(-w*1.5,-h*1.2,w*3,h*2.4);}
  rr(-w/2,-h/2,w,h,w*0.16);x.fillStyle='#070b16';x.fill();x.strokeStyle=WHITE;x.lineWidth=o.lw||7;x.stroke();
  if(o.screen){rr(-w/2+w*.07,-h/2+h*.05,w*.86,h*.9,w*.1);x.fillStyle=o.screen;x.fill();}
  rr(-w*.14,-h/2+h*.035,w*.28,h*.022,6);x.fillStyle=WHITE;x.fill();
  x.restore();
}
function pill(s,X,Y,o={}){
  const a=o.a===undefined?1:o.a; if(a<=0)return; const sc=o.sc||1,size=o.size||34;
  x.save();x.globalAlpha*=a;x.translate(X,Y);x.scale(sc,sc);
  x.font=`800 ${size}px Inter`;const tw=x.measureText(s).width,pw=tw+size*1.2,ph=size*1.75;
  rr(-pw/2,-ph/2,pw,ph,ph/2);x.fillStyle=o.fill||'#101a36';x.fill();x.strokeStyle=o.col||WHITE;x.lineWidth=5;x.stroke();
  txt(s,0,2,size,o.tcol||o.col||WHITE,800);
  if(o.strike){const v=o.strike;line(-pw/2-10,6,-pw/2-10+(pw+20)*v,-6,RED,9);}
  x.restore();
}
function popA(t,at){return {a:p(t,at,at+.15),sc:back(p(t,at,at+.3))||0.01};}
function waves(X,Y,t,o={}){
  const n=o.n||3,period=o.period||1.2,maxR=o.maxR||260,col=o.col||'245,184,61';
  for(let i=0;i<n;i++){const ph=((t/period)+i/n)%1;const r=40+ph*maxR;
    x.strokeStyle=`rgba(${col},${(1-ph)*0.9*(o.a??1)})`;x.lineWidth=7;
    const a0=o.a0??-0.9,a1=o.a1??0.9;
    x.beginPath();x.arc(X,Y,r,a0-Math.PI/2+Math.PI/2,a1);x.stroke();
    if(o.both){x.beginPath();x.arc(X,Y,r,Math.PI-a1,Math.PI-a0);x.stroke();}}
}
function chip(X,Y,s,col,lw=6){rr(X-s/2,Y-s/2,s,s,s*.12);x.fillStyle='#0d1530';x.fill();x.strokeStyle=col;x.lineWidth=lw;x.stroke();
  for(let i=0;i<4;i++){const o=-s/2+s*(0.2+i*0.2);line(X+o,Y-s/2,X+o,Y-s/2-s*.16,col,lw*.7);line(X+o,Y+s/2,X+o,Y+s/2+s*.16,col,lw*.7);line(X-s/2,Y+o,X-s/2-s*.16,Y+o,col,lw*.7);line(X+s/2,Y+o,X+s/2+s*.16,Y+o,col,lw*.7);}
  rr(X-s*.22,Y-s*.22,s*.44,s*.44,6);x.strokeStyle=col;x.lineWidth=lw*.6;x.stroke();}
function zzz(X,Y,t,a=1){x.save();x.globalAlpha*=a;for(let i=0;i<3;i++){const ph=((t*0.7)+i/3)%1;x.globalAlpha=a*(1-ph);txt('z',X+ph*50+i*6,Y-ph*90,30+i*8,'#B9C4DD',900);}x.restore();}
function bt(X,Y,s,col){x.strokeStyle=col;x.lineWidth=s*.12;x.lineJoin='round';x.lineCap='round';x.beginPath();
  x.moveTo(X-s*.3,Y-s*.25);x.lineTo(X+s*.3,Y+s*.25);x.lineTo(X,Y+s*.5);x.lineTo(X,Y-s*.5);x.lineTo(X+s*.3,Y-s*.25);x.lineTo(X-s*.3,Y+s*.25);x.stroke();}
function lock(X,Y,s,col){rr(X-s*.4,Y-s*.05,s*.8,s*.6,s*.1);x.fillStyle=col;x.fill();x.strokeStyle=col;x.lineWidth=s*.12;x.beginPath();x.arc(X,Y-s*.05,s*.25,Math.PI,0);x.stroke();circ(X,Y+s*.22,s*.08,'#101a36');}
function battery(X,Y,w,h,level,col){rr(X-w/2,Y-h/2,w,h,14);x.strokeStyle=WHITE;x.lineWidth=7;x.stroke();rr(X+w/2,Y-h*.18,14,h*.36,4);x.fillStyle=WHITE;x.fill();
  if(level>0){rr(X-w/2+10,Y-h/2+10,(w-20)*level,h-20,8);x.fillStyle=col;x.fill();}}
function cloud(X,Y,s,col){x.fillStyle='#101a36';x.strokeStyle=col;x.lineWidth=7;x.beginPath();
  x.arc(X-s*.35,Y+s*.05,s*.28,Math.PI*.5,Math.PI*1.5);x.arc(X-s*.05,Y-s*.18,s*.36,Math.PI*1.1,Math.PI*1.9);x.arc(X+s*.38,Y+s*.02,s*.26,Math.PI*1.4,Math.PI*.5);x.closePath();x.fill();x.stroke();}
function pin(X,Y,s,col=RED){x.fillStyle=col;x.beginPath();x.arc(X,Y-s,s*.62,Math.PI*0.85,Math.PI*0.15);x.lineTo(X,Y);x.closePath();x.fill();circ(X,Y-s,s*.25,WHITE);}
function mapCard(X,Y,w,h,o={}){
  rr(X-w/2,Y-h/2,w,h,26);x.fillStyle='#E9EEF7';x.fill();x.strokeStyle=WHITE;x.lineWidth=8;x.stroke();
  x.save();rr(X-w/2,Y-h/2,w,h,26);x.clip();
  x.fillStyle='#CFE0C3';x.beginPath();x.ellipse(X-w*.25,Y-h*.2,w*.2,h*.18,0.3,0,7);x.fill();x.beginPath();x.ellipse(X+w*.3,Y+h*.28,w*.22,h*.16,-.2,0,7);x.fill();
  x.fillStyle='#B8D4F0';x.beginPath();x.ellipse(X+w*.32,Y-h*.32,w*.18,h*.12,0,0,7);x.fill();
  x.strokeStyle='#FFFFFF';x.lineWidth=18;x.lineCap='round';
  x.beginPath();x.moveTo(X-w/2,Y+h*.05);x.bezierCurveTo(X-w*.1,Y-h*.05,X+w*.1,Y+h*.15,X+w/2,Y+h*.02);x.stroke();
  x.beginPath();x.moveTo(X-w*.05,Y-h/2);x.bezierCurveTo(X-w*.1,Y,X+w*.05,Y+h*.2,X-w*.02,Y+h/2);x.stroke();
  x.strokeStyle='#C9D2E3';x.lineWidth=6;x.beginPath();x.moveTo(X-w/2,Y-h*.3);x.lineTo(X+w/2,Y-h*.38);x.stroke();
  if(o.trail){x.strokeStyle=RED;x.lineWidth=7;x.setLineDash([14,12]);x.beginPath();o.trail.forEach((q,i)=>i?x.lineTo(X+q[0]*w,Y+q[1]*h):x.moveTo(X+q[0]*w,Y+q[1]*h));x.stroke();x.setLineDash([]);}
  x.restore();
  if(o.pin){const [px,py]=o.pin,pp=o.pulse||0;circ(X+px*w,Y+py*h,20+pp*50,null,`rgba(229,72,77,${1-pp})`,6);pin(X+px*w,Y+py*h,56*(o.pinS||1));}
  if(o.label)txt(o.label,X,Y-h/2+48,38,'#101a36',900);
}
function laptop(X,Y,s){rr(X-s*.5,Y-s*.36,s,s*.62,16);x.fillStyle='#101a36';x.fill();x.strokeStyle=WHITE;x.lineWidth=7;x.stroke();
  rr(X-s*.62,Y+s*.26,s*1.24,s*.09,8);x.fillStyle=WHITE;x.fill();}
function caption(t){
  let cur=null;for(const w of WORDS){if(t>=w.s-0.02&&t<w.e)cur=w;}
  if(!cur)return;const k=p(t,cur.s-0.02,cur.s+0.08);const sc=0.86+0.14*eo(k);
  x.save();x.translate(W/2,1590);x.scale(sc,sc);x.font='900 92px Inter';x.textAlign='center';x.textBaseline='middle';
  let s=cur.w;let size=92;while(x.measureText(s).width>W-120){size-=4;x.font=`900 ${size}px Inter`;}
  x.lineWidth=16;x.strokeStyle='rgba(6,10,25,0.85)';x.lineJoin='round';x.strokeText(s,0,0);
  x.shadowColor='rgba(0,0,0,0.6)';x.shadowBlur=18;x.fillStyle=YEL;x.fillText(s,0,0);x.restore();
}

// ================= Serie „Fünf Handy-Irrtümer“ – gemeinsame Bausteine =================
const GREEN='#3FBF7F',DARK='#101a36';
let HEAD_SRC='';
function header(a){if(a<=0)return;x.save();x.globalAlpha*=a;txt('FÜNF HANDY-IRRTÜMER',W/2,150,34,'#9AA5BF',800);txt(HEAD_SRC,W/2,196,22,'#6D7894',600);x.restore();}
function hook(lines,t,size=74){const a=popA(t,0.05);x.save();x.globalAlpha=a.a;x.font=`900 ${size}px Inter`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=YEL;x.shadowColor='rgba(0,0,0,.4)';x.shadowBlur=12;
  lines.forEach((l,i)=>x.fillText(l,W/2,290+i*(size+18)));x.restore();}
function redT(t,a0,a1){return eio(p(t,a0,a0+0.2))*(1-p(t,a1-0.3,a1));}
function bigX(X,Y,s,k){if(k<=0)return;const a=eo(k);line(X-s,Y-s,X-s+2*s*cl(a*2),Y-s+2*s*cl(a*2),RED,s*.22);if(a>.5)line(X+s,Y-s,X+s-2*s*cl(a*2-1),Y-s+2*s*cl(a*2-1),RED,s*.22);}
function checkM(X,Y,s,k,col=GREEN){if(k<=0)return;x.strokeStyle=col;x.lineWidth=s*.2;x.lineCap='round';x.lineJoin='round';x.beginPath();const tt=k*2;x.moveTo(X-.4*s,Y);const a=Math.min(1,tt);x.lineTo(X+lerp(-.4,-.1,a)*s,Y+lerp(0,.3,a)*s);if(tt>1){const b=tt-1;x.lineTo(X+lerp(-.1,.45,b)*s,Y+lerp(.3,-.35,b)*s);}x.stroke();}
// Funkmast (Y = Fuß)
function tower(X,Y,s=1,o={}){const col=o.col||WHITE,h=380*s,lw=7*s+1;x.save();if(o.a!==undefined)x.globalAlpha*=o.a;
  line(X-70*s,Y,X-8*s,Y-h,col,lw);line(X+70*s,Y,X+8*s,Y-h,col,lw);
  for(let i=1;i<5;i++){const y1=Y-h*i/5,y0=Y-h*(i-1)/5,w1=lerp(70,8,i/5)*s,w0=lerp(70,8,(i-1)/5)*s;line(X-w0,y0,X+w1,y1,col,lw*.55);line(X+w0,y0,X-w1,y1,col,lw*.55);}
  rr(X-40*s,Y-h-30*s,22*s,60*s,6);x.fillStyle=col;x.fill();rr(X+18*s,Y-h-30*s,22*s,60*s,6);x.fill();
  if(o.t!==undefined&&o.waves)waves(X,Y-h,o.t,{n:3,period:1,maxR:o.maxR||200,both:true,a:o.waves,col:o.wcol||'245,184,61'});
  if(o.label)pill(o.label,X,Y+60,{size:30,col:o.lcol||WHITE,a:o.la??1});x.restore();}
function polyLen(P){let L=0;for(let i=1;i<P.length;i++)L+=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);return L;}
function polyAt(P,u){const L=polyLen(P)*cl(u);let acc=0;for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);if(acc+d>=L){const k=(L-acc)/d;return[lerp(P[i-1][0],P[i][0],k),lerp(P[i-1][1],P[i][1],k)];}acc+=d;}return P[P.length-1];}
function polyDraw(P,k,col,lw){if(k<=0)return;const L=polyLen(P)*cl(k);x.strokeStyle=col;x.lineWidth=lw;x.lineCap='round';x.lineJoin='round';x.beginPath();x.moveTo(P[0][0],P[0][1]);let acc=0;
  for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);if(acc+d>=L){const q=(L-acc)/d;x.lineTo(lerp(P[i-1][0],P[i][0],q),lerp(P[i-1][1],P[i][1],q));break;}x.lineTo(P[i][0],P[i][1]);acc+=d;}x.stroke();}
// Glasfaserkabel mit Lichtblitzen
function fiber(P,t,k=1,pulses=0){polyDraw(P,k,'#2a3a6c',26);polyDraw(P,k,'#5B9BE6',8);if(pulses<=0||k<1)return;
  for(let i=0;i<6;i++){const u=((t*0.6)+i/6)%1;const [px,py]=polyAt(P,u);const g=x.createRadialGradient(px,py,2,px,py,34);g.addColorStop(0,`rgba(255,240,170,${pulses})`);g.addColorStop(1,'rgba(255,240,170,0)');x.fillStyle=g;x.fillRect(px-34,py-34,68,68);}}
// Server-Schrank / Kernnetz
function rack(X,Y,w,h,t,o={}){rr(X-w/2,Y-h/2,w,h,16);x.fillStyle=DARK;x.fill();x.strokeStyle=o.col||WHITE;x.lineWidth=7;x.stroke();
  const n=Math.max(3,Math.floor(h/60));for(let i=0;i<n;i++){const yy=Y-h/2+20+i*(h-40)/n;rr(X-w/2+18,yy,w-36,(h-40)/n-12,6);x.strokeStyle='rgba(255,255,255,0.35)';x.lineWidth=3;x.stroke();
    for(let j=0;j<3;j++){const on=Math.sin(t*6+i*1.7+j*2.3)>0;circ(X+w/2-40-j*22,yy+((h-40)/n-12)/2,6,on?(o.led||GREEN):'#2a3a6c');}}
  if(o.label)pill(o.label,X,Y+h/2+52,{size:32,col:o.lcol||WHITE,a:o.la??1});}
function building(X,Y,w,h,o={}){ // Y = Fuß
  rr(X-w/2,Y-h,w,h,10);x.fillStyle=o.fill||'#1b2b5a';x.fill();x.strokeStyle=o.col||WHITE;x.lineWidth=7;x.stroke();
  for(let r=0;r<Math.floor((h-90)/70);r++)for(let c=0;c<Math.floor((w-40)/70);c++){rr(X-w/2+30+c*70,Y-h+40+r*70,40,40,6);x.fillStyle=o.lit&&((r+c)%2==0)?'rgba(245,184,61,0.8)':'rgba(255,255,255,0.18)';x.fill();}
  if(o.label){rr(X-w/2-10,Y-h-60,w+20,54,12);x.fillStyle=o.lfill||'#2E5AA8';x.fill();txt(o.label,X,Y-h-33,30,WHITE,900);}}
function door(X,Y,w,h,o={}){ // Y = Fuß
  rr(X-w/2,Y-h,w,h,8);x.fillStyle=o.fill||'#6b4a2e';x.fill();x.strokeStyle=o.col||WHITE;x.lineWidth=6;x.stroke();circ(X+w/2-18,Y-h/2,7,YEL);
  if(o.open){x.save();x.globalAlpha*=0.9;rr(X-w/2,Y-h,w*o.open,h,8);x.fillStyle='#05070f';x.fill();x.restore();}}
function cap(st,col='#1d3d8f'){const [hx,hy]=st.head,R=st.R;x.fillStyle=col;x.beginPath();x.ellipse(hx,hy-R*.55,R*1.05,R*.45,0,Math.PI,0);x.fill();rr(hx-R*.2,hy-R*.95,R*.4,R*.3,4);x.fillStyle=YEL;x.fill();
  x.fillStyle=col;rr(hx-R*1.1,hy-R*.6,R*2.2,R*.22,6);x.fill();}
function hood(st){const [hx,hy]=st.head,R=st.R;x.fillStyle='#0a0f1e';x.beginPath();x.arc(hx,hy,R*1.25,Math.PI*0.95,Math.PI*0.05,false);x.lineTo(hx+R*1.1,hy+R*.6);x.lineTo(hx-R*1.1,hy+R*.6);x.closePath();x.fill();
  circ(hx,hy+R*.05,R*.82,'#111827');circ(hx-R*.3,hy,R*.1,'#E5484D');circ(hx+R*.3,hy,R*.1,'#E5484D');}
function headphones(st){const [hx,hy]=st.head,R=st.R;x.strokeStyle=YEL;x.lineWidth=8;x.beginPath();x.arc(hx,hy,R*1.15,Math.PI*1.05,Math.PI*1.95);x.stroke();rr(hx-R*1.3,hy-R*.2,R*.4,R*.6,8);x.fillStyle=YEL;x.fill();rr(hx+R*.9,hy-R*.2,R*.4,R*.6,8);x.fill();}
function lockOpen(X,Y,s,col){rr(X-s*.4,Y-s*.05,s*.8,s*.6,s*.1);x.fillStyle=col;x.fill();x.strokeStyle=col;x.lineWidth=s*.12;x.beginPath();x.arc(X+s*.35,Y-s*.15,s*.25,Math.PI,0);x.stroke();circ(X,Y+s*.22,s*.08,DARK);}
function bubble(X,Y,w,h,s,o={}){rr(X-w/2,Y-h/2,w,h,24);x.fillStyle=o.fill||'#2C6FB8';x.fill();x.beginPath();x.moveTo(X-w/2+30,Y+h/2-4);x.lineTo(X-w/2+20,Y+h/2+26);x.lineTo(X-w/2+60,Y+h/2-4);x.closePath();x.fill();
  if(s)txt(s,X,Y+2,o.size||34,WHITE,800);}
function envelope(X,Y,w,o={}){const h=w*.62;rr(X-w/2,Y-h/2,w,h,10);x.fillStyle=o.fill||'#E9EEF7';x.fill();x.strokeStyle=o.col||WHITE;x.lineWidth=5;x.stroke();
  x.strokeStyle='#9AA5BF';x.lineWidth=4;x.beginPath();x.moveTo(X-w/2,Y-h/2);x.lineTo(X,Y+h*.05);x.lineTo(X+w/2,Y-h/2);x.stroke();if(o.seal){circ(X,Y+h*.05,w*.11,RED);txt('✓',X,Y+h*.05+2,w*.12,WHITE,900);}}
function postcard(X,Y,w,s){const h=w*.62;rr(X-w/2,Y-h/2,w,h,10);x.fillStyle='#F6E7C8';x.fill();x.strokeStyle=WHITE;x.lineWidth=5;x.stroke();line(X+w*.05,Y-h*.35,X+w*.05,Y+h*.35,'#C9B08A',3);
  rr(X+w*.3,Y-h*.4,w*.15,h*.25,4);x.strokeStyle='#C98A2A';x.lineWidth=3;x.stroke();(s||[]).forEach((l,i)=>txt(l,X-w*.22,Y-h*.2+i*36,26,'#3a2a14',800));}
function doc(X,Y,w,o={}){const h=w*1.3;rr(X-w/2,Y-h/2,w,h,10);x.fillStyle='#F4F6FA';x.fill();txt(o.title||'§',X,Y-h*.32,w*.16,DARK,900);for(let i=0;i<4;i++)line(X-w*.32,Y-h*.1+i*h*.12,X+w*.32,Y-h*.1+i*h*.12,'#9AA5BF',4);
  if(o.stamp){x.save();x.translate(X+w*.18,Y+h*.3);x.rotate(-0.25);x.globalAlpha*=o.stamp;rr(-w*.3,-w*.11,w*.6,w*.22,8);x.strokeStyle=o.scol||RED;x.lineWidth=5;x.stroke();txt(o.stext||'GENEHMIGT',0,2,w*.08,o.scol||RED,900);x.restore();}}
function clockF(X,Y,r,h,m,col=WHITE){circ(X,Y,r,DARK,col,6);for(let i=0;i<12;i++){const an=i/12*Math.PI*2;line(X+Math.cos(an)*r*.78,Y+Math.sin(an)*r*.78,X+Math.cos(an)*r*.88,Y+Math.sin(an)*r*.88,GREY,4);}
  const ah=((h%12)+m/60)/12*Math.PI*2-Math.PI/2,am=m/60*Math.PI*2-Math.PI/2;line(X,Y,X+Math.cos(ah)*r*.45,Y+Math.sin(ah)*r*.45,WHITE,8);line(X,Y,X+Math.cos(am)*r*.68,Y+Math.sin(am)*r*.68,YEL,6);circ(X,Y,7,YEL);}
function toggle(X,Y,on,col=GREEN){rr(X-60,Y-34,120,68,34);x.fillStyle=on>0.5?col:'#3a4668';x.fill();circ(lerp(X-26,X+26,on),Y,26,WHITE);}
function popScale(t,a0,f){const a=popA(t,a0);if(a.a<=0)return;x.save();x.globalAlpha*=a.a;f(a.sc);x.restore();}
// Serienkarte + Abspann (n = Teil 1..5)
const SER=['Anruf','SMS','Abhören','2G','Hacker'];
function serIcon(i,X,Y,s){x.save();x.translate(X,Y);x.scale(s,s);
  if(i===0)phone(0,0,36,64,{lw:4});if(i===1)bubble(0,0,70,44,'',{});if(i===2){x.strokeStyle=WHITE;x.lineWidth=6;x.beginPath();x.arc(0,6,26,Math.PI,0);x.stroke();rr(-34,0,14,24,4);x.fillStyle=WHITE;x.fill();rr(20,0,14,24,4);x.fill();}
  if(i===3)txt('2G',0,3,34,WHITE,900);if(i===4){circ(0,0,26,'#0a0f1e');x.fillStyle='#0a0f1e';x.beginPath();x.arc(0,0,30,Math.PI,0);x.fill();circ(-9,0,4,RED);circ(9,0,4,RED);}x.restore();}
function seriesEnd(t,a0,n,nextTxt){bg();
  for(let i=0;i<14;i++){const sx=(i*137)%W,sy=80+(i*91)%420;circ(sx,sy,2+(i%3),`rgba(255,255,255,${0.4+0.4*Math.sin(t*2+i)})`);}
  const a=popA(t,a0);x.save();x.globalAlpha=a.a;x.translate(W/2,430);x.scale(a.sc,a.sc);txt('FÜNF',0,-100,80,YEL,900);txt('HANDY-IRRTÜMER',0,0,80,YEL,900);x.restore();
  for(let i=0;i<5;i++){const ia=popA(t,a0+0.15+i*0.1);if(ia.a<=0)continue;const X=150+i*195,Y=760,cur=i===n-1,done=i<n-1;
    x.save();x.globalAlpha=ia.a;x.translate(X,Y);x.scale(ia.sc*(cur?1.22:1),ia.sc*(cur?1.22:1));circ(0,0,64,['#2E5AA8','#2F8F7A','#7A4FB0','#C98A2A','#3a3f55'][i],cur?YEL:WHITE,cur?9:5);serIcon(i,0,0,1);
    if(done){circ(44,-44,22,GREEN);checkM(44,-44,26,1,WHITE);}x.restore();txt(SER[i],X,Y+(cur?108:96),26,cur?YEL:WHITE,800);}
  popScale(t,a0+0.5,sc=>{x.translate(W/2,990);x.scale(sc,sc);txt(n+'/5',0,0,110,WHITE,900);});
  if(nextTxt)popScale(t,a0+0.9,sc=>{x.translate(W/2,1150);x.scale(sc,sc);txt(nextTxt,0,0,48,YEL,900);});
  const f=popA(t,a0+1.2);const pul=1+0.05*Math.sin(t*7);x.save();x.globalAlpha=f.a;x.translate(W/2,1310);x.scale(f.sc*pul,f.sc*pul);rr(-220,-62,440,124,62);x.fillStyle=RED;x.fill();txt('+ Folgen',0,4,56,WHITE,900);x.restore();}
// Render mit kurzer Überblendung zwischen Szenen
let SCENES=[];
function render(t){x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.clearRect(0,0,W,H);
  let i=SCENES.findIndex(s=>t>=s[0]&&t<s[1]);if(i<0)i=SCENES.length-1;const [a,b,f]=SCENES[i];x.save();f(t);x.restore();
  if(i>0&&t-a<0.2){x=bufX;x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.save();SCENES[i-1][2](a-0.001);x.restore();x=mainX;x.save();x.globalAlpha=1-eo((t-a)/0.2);x.drawImage(buf,0,0);x.restore();}
  x.globalAlpha=1;caption(t);}
window.render=render;window.setWords=w=>{WORDS=w;};
