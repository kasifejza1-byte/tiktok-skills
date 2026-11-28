// Einzelvideo (Anime): „Warum nerven Langsamgeher?“ – Zeiten = Timeline nach atempo 1.1
const SRC='Quellen: Gehforschung · Frustrations-Aggressions-Hypothese · Akteur-Beobachter-Effekt';
const IM={};
window.ready=Promise.all(['a','b','c','d','e'].map(k=>new Promise(r=>{const i=new Image();i.onload=()=>{IM[k]=i;r();};i.onerror=()=>r();i.src='img/'+k+'.png';})));
function headerA(a){if(a<=0)return;x.save();x.globalAlpha*=a;txt(SRC,W/2,1840,20,'rgba(255,255,255,0.55)',600);x.restore();}
// Bild mit Kamerafahrt: z = Zoom, fx/fy = Fokus (0..1)
function shot(k,t,t0,t1,z0,z1,fx0=.5,fy0=.5,fx1=fx0,fy1=fy0,o={}){const im=IM[k];if(!im){x.fillStyle='#223';x.fillRect(0,0,W,H);return;}
  const u=eio(p(t,t0,t1)),z=lerp(z0,z1,u),fx=lerp(fx0,fx1,u),fy=lerp(fy0,fy1,u);const s=Math.max(W/im.width,H/im.height)*z;const dw=im.width*s,dh=im.height*s;
  const sx=(o.shake||0)*Math.sin(t*53),sy=(o.shake||0)*Math.cos(t*47);
  const X=cl(W/2-fx*dw+ (fx-.5)*0, W-dw, 0)+sx,Y=cl(H/2-fy*dh,H-dh,0)+sy;x.drawImage(im,X,Y,dw,dh);
  // Lesbarkeit: oben + unten abdunkeln
  let g=x.createLinearGradient(0,0,0,560);g.addColorStop(0,'rgba(5,8,20,0.75)');g.addColorStop(1,'rgba(5,8,20,0)');x.fillStyle=g;x.fillRect(0,0,W,560);
  g=x.createLinearGradient(0,1300,0,H);g.addColorStop(0,'rgba(5,8,20,0)');g.addColorStop(1,'rgba(5,8,20,0.8)');x.fillStyle=g;x.fillRect(0,1300,W,H-1300);
  if(o.tint){x.fillStyle=o.tint;x.fillRect(0,0,W,H);}}
function flash(t,at,col='255,255,255',d=0.3){const k=p(t,at,at+d);if(k<=0||k>=1)return;x.fillStyle=`rgba(${col},${0.7*(1-k)})`;x.fillRect(0,0,W,H);}
function bigTxt(lines,t,at,Y,size=86,col=YEL){const a=popA(t,at);if(a.a<=0)return;x.save();x.globalAlpha=a.a;x.translate(W/2,Y);x.scale(a.sc,a.sc);
  x.font=`900 ${size}px Inter`;x.textAlign='center';x.textBaseline='middle';lines.forEach((l,i)=>{const yy=i*(size+14);x.lineWidth=14;x.strokeStyle='rgba(5,8,20,0.9)';x.lineJoin='round';x.strokeText(l,0,yy);x.fillStyle=col;x.fillText(l,0,yy);});x.restore();}
function card(X,Y,w,h,a=1){x.save();x.globalAlpha*=a;rr(X-w/2,Y-h/2,w,h,32);x.fillStyle='rgba(10,16,36,0.86)';x.fill();x.strokeStyle='rgba(255,255,255,0.5)';x.lineWidth=4;x.stroke();x.restore();}
function gauge(X,Y,r,val,max,lbl,col=YEL){circ(X,Y,r,'rgba(10,16,36,0.88)',WHITE,7);
  for(let i=0;i<=10;i++){const an=Math.PI*0.75+i/10*Math.PI*1.5;line(X+Math.cos(an)*r*.78,Y+Math.sin(an)*r*.78,X+Math.cos(an)*r*.9,Y+Math.sin(an)*r*.9,GREY,4);}
  const an=Math.PI*0.75+cl(val/max)*Math.PI*1.5;line(X,Y,X+Math.cos(an)*r*.72,Y+Math.sin(an)*r*.72,col,9);circ(X,Y,12,col);
  txt(lbl,X,Y+r*.45,r*.3,col,900);}
// U-Kurve Energie pro Meter über Tempo (km/h 1..8, Minimum bei 5)
function curve(X,Y,w,h,t,k,mark){card(X,Y,w+80,h+170);const x0=X-w/2,y0=Y+h/2-20;
  line(x0,y0,x0+w,y0,GREY,4);line(x0,y0,x0,y0-h,GREY,4);txt('Tempo (km/h)',X,y0+50,28,GREY,700);
  x.save();x.translate(x0-30,Y-10);x.rotate(-Math.PI/2);txt('Energie pro Meter',0,0,28,GREY,700);x.restore();
  const f=v=>0.18+0.82*Math.pow((v-5)/4,2);const px=v=>x0+(v-1)/7*w,py=v=>y0-f(v)*h*0.9;
  for(const v of [1,3,5,7]){txt(String(v),px(v),y0+18,24,WHITE,700);}
  x.strokeStyle=YEL;x.lineWidth=8;x.lineCap='round';x.beginPath();const N=60;for(let i=0;i<=N*k;i++){const v=1+7*i/N;i?x.lineTo(px(v),py(v)):x.moveTo(px(v),py(v));}x.stroke();
  if(mark){for(const [v,col,lb,a] of mark){if(a<=0)continue;x.save();x.globalAlpha=a;circ(px(v),py(v),16,col,WHITE,4);x.setLineDash([8,8]);line(px(v),py(v),px(v),y0,col,3);x.setLineDash([]);pill(lb,px(v),py(v)-60,{size:28,col,fill:'rgba(10,16,36,0.95)'});x.restore();}}}
function pendulum(X,Y,L,t,jerk,col=YEL){let an;if(!jerk)an=Math.sin(t*4.2)*0.55;else{const ph=Math.floor(t*6);an=Math.sin(ph*1.7)*0.35*(ph%2?1:-1)*0.8;}
  line(X-60,Y,X+60,Y,WHITE,8);const bx=X+Math.sin(an)*L,by=Y+Math.cos(an)*L;line(X,Y,bx,by,WHITE,6);circ(bx,by,40,col,WHITE,6);circ(X,Y,10,WHITE);
  if(!jerk){x.save();x.globalAlpha=0.35;x.strokeStyle=col;x.lineWidth=4;x.setLineDash([10,12]);x.beginPath();x.arc(X,Y,L,Math.PI/2-0.55,Math.PI/2+0.55);x.stroke();x.restore();}}
function stamp(s,X,Y,t,at,col=RED){const k=p(t,at,at+0.25);if(k<=0)return;const sc=lerp(2.2,1,eo(k));x.save();x.globalAlpha=Math.min(1,k*2);x.translate(X,Y);x.rotate(-0.12);x.scale(sc,sc);
  x.font='900 70px Inter';const w=x.measureText(s).width+60;rr(-w/2,-55,w,110,16);x.strokeStyle=col;x.lineWidth=10;x.stroke();x.fillStyle='rgba(10,16,36,0.6)';x.fill();txt(s,0,4,70,col,900);x.restore();}
function meter(X,Y,w,v,lbl,col){txt(lbl,X-w/2,Y-40,32,WHITE,800,'left');rr(X-w/2,Y-18,w,36,18);x.fillStyle='rgba(255,255,255,0.15)';x.fill();rr(X-w/2,Y-18,Math.max(36,w*v),36,18);x.fillStyle=col;x.fill();}

// ---------- Szenen ----------
// 1 Hook 0–4.45 (Bild B)
function s1(t){const red=redT(t,4.0,4.45);shot('b',t,0,4.45,1.0,1.2,.4,.6,.3,.5,{tint:red>0?`rgba(160,20,30,${0.45*red})`:null});
  bigTxt(['LANGSAME LEUTE NERVEN?'],t,0.05,250,64,WHITE);bigTxt(['DU BIST HALT','UNGEDULDIG.'],t,1.9,370,88);
  if(t>4.05){const k=eo(p(t,4.05,4.3));line(160,470,160+760*k,450,RED,14);}bigX(W/2,820,110,p(t,4.05,4.4));flash(t,4.0,'255,60,60');}
// 2 Wunschtempo 4.45–14.35 (Bild A)
function s2(t){shot('a',t,4.45,14.35,1.05,1.25,.42,.62,.4,.55);flash(t,4.45);
  pill('Wunschtempo',W/2,300,{...popA(t,5.4),size:60,fill:YEL,col:YEL,tcol:DARK,a:popA(t,5.4).a*(1-p(t,10.0,10.2))});
  if(t>6.85&&t<10.3){const a=popA(t,7.3);x.save();x.globalAlpha=a.a;x.translate(800,520);x.scale(a.sc,a.sc);gauge(0,0,150,5*eo(p(t,8.3,9.3)),8,(5*eo(p(t,8.3,9.3))).toFixed(0)+' km/h');x.restore();}
  if(t>10.1){const a=p(t,10.1,10.4);x.save();x.globalAlpha=a;curve(W/2,1080,720,420,t,eo(p(t,10.2,11.4)),[[5,GREEN,'am wenigsten Energie ✓',p(t,12.9,13.2)]]);x.restore();}}
// 3 Pendel 14.35–17.6 (Bild A, nah)
function s3(t){shot('a',t,14.35,17.6,1.6,1.75,.4,.8,.42,.85);x.fillStyle='rgba(5,8,20,0.35)';x.fillRect(0,0,W,H);
  pill('wie ein Pendel',W/2,300,{...popA(t,15.86),size:54,col:YEL});const a=popA(t,14.6);x.save();x.globalAlpha=a.a;card(W/2,760,420,560);pendulum(W/2,560,330,t,false,GREEN);x.restore();
  pill('fast von allein ✓',W/2,1110,{...popA(t,16.6),size:40,fill:GREEN,col:GREEN,tcol:'#0b2a1b'});}
// 4 Jemand mit 3 km/h + Pendel aus dem Takt 17.6–27.0 (Bild B)
function s4(t){shot('b',t,17.6,27.0,1.1,1.4,.55,.55,.35,.6,{shake:t>23.3&&t<25.5?4:0});flash(t,17.6);
  if(t<21.4){const a=popA(t,18.5);x.save();x.globalAlpha=a.a;x.translate(W/2,520);x.scale(a.sc,a.sc);gauge(0,0,150,3*eo(p(t,19.6,20.4)),8,(3*eo(p(t,19.6,20.4))).toFixed(0)+' km/h',RED);x.restore();
    pill('vor dir',W/2,300,{...popA(t,19.07),size:50,col:WHITE});}
  else if(t<25.4){const a=popA(t,21.5);x.save();x.globalAlpha=a.a;card(W/2,640,420,540);pendulum(W/2,450,320,t,true,RED);x.restore();
    pill('aus dem Takt ✗',W/2,300,{...popA(t,22.8),size:50,fill:RED,col:RED,tcol:WHITE});
    // zerhackte Schritte
    if(t>23.7){for(let i=0;i<7;i++){const k=p(t,23.75+i*0.12,23.9+i*0.12);if(k<=0)continue;x.save();x.globalAlpha=k;rr(180+i*110,1040+(i%2)*40,46,70,20);x.fillStyle=WHITE;x.fill();x.restore();}}}
  else{const a=p(t,25.4,25.7);x.save();x.globalAlpha=a;curve(W/2,1080,720,420,t,1,[[5,GREEN,'dein Tempo',1],[3,RED,'kostet mehr Kraft',p(t,26.0,26.3)]]);x.restore();}}
// 5 Gehirn: Ziel blockiert → Frustration 27.0–34.85 (Bild C)
function s5(t){shot('c',t,27.0,34.85,1.0,1.3,.5,.42,.5,.4,{shake:t>32.9?5:0});flash(t,27.0,'255,120,60');
  pill('dein Gehirn',W/2,300,{...popA(t,28.2),size:50,col:WHITE,a:popA(t,28.2).a*(1-p(t,29.6,29.8))});
  stamp('ZIEL BLOCKIERT',W/2,300,t,29.76);
  pill('FRUST',W/2,1260,{...popA(t,31.5),size:70,fill:RED,col:RED,tcol:WHITE});
  if(t>32.6){const a=p(t,32.6,32.9);x.save();x.globalAlpha=a;meter(W/2,1400,700,eo(p(t,32.9,34.2)),'Gereiztheit',RED);x.restore();}
  pill('automatisch',W/2,1130,{...popA(t,34.05),size:36,col:YEL});}
// 6 Denkfehler 34.85–42.9 (Bild B, dann D)
function s6(t){if(t<40.1){shot('b',t,34.85,40.1,1.25,1.5,.6,.55,.65,.5);flash(t,34.85,'120,140,255');
    bigTxt(['DENKFEHLER'],t,35.3,300,96,YEL);
    if(t>36.9){const a=popA(t,37.55);pill('der andere langsam:',W/2,460,{...a,size:38,col:WHITE});}
    stamp('RÜCKSICHTSLOS!',W/2,700,t,38.88,RED);}
  else{shot('d',t,40.1,42.9,1.1,1.3,.6,.55,.65,.45);flash(t,40.1);
    pill('du selbst langsam:',W/2,300,{...popA(t,40.4),size:38,col:WHITE});
    const b=popA(t,41.89);if(b.a>0){x.save();x.globalAlpha=b.a;x.translate(W/2,450);x.scale(b.sc,b.sc);rr(-300,-70,600,140,70);x.fillStyle=WHITE;x.fill();txt('„Bin halt müde.“',0,4,52,DARK,900);x.restore();}
    if(t>42.3)pill('doppelter Maßstab',W/2,620,{...popA(t,42.4),size:40,fill:YEL,col:YEL,tcol:DARK});}}
// 7 Pointe: Auto im falschen Gang 42.9–48.4 (Bild E)
function s7(t){shot('e',t,42.9,48.4,1.05,1.3,.45,.55,.4,.5,{shake:t>46.2?6:0});flash(t,42.9);
  pill('Auto im falschen Gang',W/2,300,{...popA(t,45.0),size:50,fill:YEL,col:YEL,tcol:DARK});
  if(t>45.7){const a=popA(t,45.8);x.save();x.globalAlpha=a.a;x.translate(290,600);x.scale(a.sc,a.sc);const rpm=lerp(2,7.6,eo(p(t,46.0,46.6)))+(t>46.6?Math.sin(t*40)*0.15:0);gauge(0,0,140,rpm,8,'DREHZAHL',rpm>6.5?RED:YEL);x.restore();}
  if(t>46.8){const a=popA(t,46.9);x.save();x.globalAlpha=a.a;x.translate(790,600);x.scale(a.sc,a.sc);gauge(0,0,140,0.6,8,'TEMPO',GREY);x.restore();}}
// 8 Abschluss 48.4+ (Bild A)
function s8(t){shot('a',t,48.4,51,1.1,1.2,.45,.5,.45,.45);x.fillStyle='rgba(5,8,20,0.35)';x.fillRect(0,0,W,H);flash(t,48.4);
  bigTxt(['NICHT UNGEDULDIG.'],t,48.45,330,74,WHITE);bigTxt(['NUR AUS DEM TAKT.'],t,48.85,440,74,YEL);
  const f=popA(t,49.3);const pul=1+0.05*Math.sin(t*7);x.save();x.globalAlpha=f.a;x.translate(W/2,1160);x.scale(f.sc*pul,f.sc*pul);rr(-220,-62,440,124,62);x.fillStyle=RED;x.fill();txt('+ Folgen',0,4,56,WHITE,900);x.restore();}
SCENES=[[0,4.45,s1],[4.45,14.35,s2],[14.35,17.6,s3],[17.6,27.0,s4],[27.0,34.85,s5],[34.85,42.9,s6],[42.9,48.4,s7],[48.4,99,s8]];
const _r=render;window.render=t=>{_r(t);headerA(1);};
