// Comedy-Sketch (Anime): Polizeikontrolle nach dem Spaziergang. Dialog aus timeline.json, Wort für Wort eingeblendet.
const IM={};let TL=[];
window.ready=Promise.all([...'abcdefgh'].map(k=>new Promise(r=>{const i=new Image();i.onload=()=>{IM[k]=i;r();};i.onerror=()=>r();i.src='img/'+k+'.png';}))
  
  );
const SPK={D:['DU','#5BE0FF'],F:['DEIN KUMPEL','#7CFF8A'],P:['POLIZIST','#FF5A5A']};
// [Start, Bild, Zoom von, Zoom bis, fx, fy]
const SHOTS=[[0,'a',1.0,1.12,.5,.55],[3.6,'b',1.05,1.2,.5,.4],[11.72,'c',1.15,1.0,.5,.5],[17.45,'d',1.0,1.15,.55,.45],[20.71,'e',1.0,1.18,.5,.35],
  [23.86,'d',1.2,1.05,.7,.5],[29.89,'f',1.0,1.15,.5,.45],[35.92,'d',1.05,1.25,.6,.4],[38.74,'g',1.0,1.15,.5,.35],[42.18,'h',1.05,1.2,.5,.45],[99,'',1,1,.5,.5]];
function shot(t){let i=0;while(i<SHOTS.length-2&&t>=SHOTS[i+1][0])i++;const [a,k,z0,z1,fx,fy]=SHOTS[i],b=SHOTS[i+1][0];const im=IM[k];if(!im)return a;
  const u=eio(p(t,a,Math.min(b,a+6)));const z=lerp(z0,z1,u),s=Math.max(W/im.width,H/im.height)*z,dw=im.width*s,dh=im.height*s;
  let sh=0;if(t>11.8&&t<12.6)sh=14*(1-p(t,11.8,12.6));if(t>45.8&&t<46.4)sh=10;
  const X=cl(W/2-fx*dw+W/2*0+(fx-.5)*0,W-dw,0)+Math.sin(t*61)*sh,Y=cl(H/2-fy*dh,H-dh,0)+Math.cos(t*53)*sh;
  x.drawImage(im,cl(W/2-dw*fx,W-dw,0)+Math.sin(t*61)*sh,Y,dw,dh);return a;}
function flash(t,at,col='255,255,255',d=0.25){const k=p(t,at,at+d);if(k<=0||k>=1)return;x.fillStyle=`rgba(${col},${0.6*(1-k)})`;x.fillRect(0,0,W,H);}
function policeLights(t){if(t<11.72)return;const a=p(t,11.72,12.0)*(t>47.8?1-p(t,47.8,48.6):1);const ph=Math.floor(t*4)%2;
  const g=x.createRadialGradient(ph?0:W,300,50,ph?0:W,300,900);g.addColorStop(0,ph?`rgba(60,110,255,${0.35*a})`:`rgba(255,40,40,${0.28*a})`);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);}
function grads(){let g=x.createLinearGradient(0,1250,0,H);g.addColorStop(0,'rgba(5,8,20,0)');g.addColorStop(1,'rgba(5,8,20,0.88)');x.fillStyle=g;x.fillRect(0,1250,W,H-1250);
  g=x.createLinearGradient(0,0,0,420);g.addColorStop(0,'rgba(5,8,20,0.7)');g.addColorStop(1,'rgba(5,8,20,0)');x.fillStyle=g;x.fillRect(0,0,W,420);}
// Zeilen umbrechen
function wrap(words,maxW,size){x.font=`900 ${size}px Inter`;const lines=[[]];let w=0;for(const wd of words){const ww=x.measureText(wd+' ').width;if(w+ww>maxW&&lines[lines.length-1].length){lines.push([]);w=0;}lines[lines.length-1].push(wd);w+=ww;}return lines;}
function dialog(t){const L=TL.find(l=>l.spk!=='S'&&t>=l.s-0.05&&t<l.e+0.35);if(!L)return;
  const [name,col]=SPK[L.spk];const words=L.text.split(' ');const lens=words.map(w=>w.length+2),tot=lens.reduce((a,b)=>a+b,0);
  let acc=0;const starts=lens.map(l=>{const s=L.s+(L.e-L.s)*acc/tot;acc+=l;return s;});
  const size=72,lines=wrap(words,W-140,size);const a=p(t,L.s-0.05,L.s+0.1)*(1-p(t,L.e+0.2,L.e+0.35));
  x.save();x.globalAlpha=a;const top=1500-(lines.length-1)*(size+14)/2;
  // Sprecher-Chip
  x.font='900 38px Inter';const nw=x.measureText(name).width+50;rr(W/2-nw/2,top-120,nw,62,31);x.fillStyle=col;x.fill();txt(name,W/2,top-88,38,'#0b1328',900);
  let wi=0;lines.forEach((ln,li)=>{x.font=`900 ${size}px Inter`;const lw=x.measureText(ln.join(' ')).width;let cx=W/2-lw/2;const y=top+li*(size+14);
    ln.forEach(wd=>{const ww=x.measureText(wd).width,st=starts[wi++];if(t>=st-0.02){const k=p(t,st-0.02,st+0.12),sc=0.7+0.3*back(k);
      x.save();x.translate(cx+ww/2,y);x.scale(sc,sc);x.font=`900 ${size}px Inter`;x.textAlign='center';x.textBaseline='middle';x.lineWidth=14;x.lineJoin='round';x.strokeStyle='rgba(5,8,20,0.95)';x.strokeText(wd,0,0);
      const nx=wi<starts.length?starts[wi]:L.e+0.4;x.fillStyle=(t>=st&&t<nx)?col:'#FFFFFF';x.fillText(wd,0,0);x.restore();}
      cx+=ww+x.measureText(' ').width;});});
  x.restore();}
function sticker(s,X,Y,t,at,until,col=YEL,rot=-0.08,size=86){if(t<at||t>until)return;const r=popA(t,at);x.save();x.globalAlpha=r.a*(1-p(t,until-0.2,until));x.translate(X,Y);x.rotate(rot);x.scale(r.sc,r.sc);
  x.font=`900 ${size}px Inter`;x.textAlign='center';x.textBaseline='middle';x.lineWidth=16;x.lineJoin='round';x.strokeStyle='rgba(5,8,20,0.95)';x.strokeText(s,0,0);x.fillStyle=col;x.fillText(s,0,0);x.restore();}
window.render=function(t){x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.fillStyle='#05070f';x.fillRect(0,0,W,H);
  const a=shot(t);policeLights(t);grads();if(t-a<0.18&&a>0)flash(t,a);
  sticker('SAMSTAG, 23 UHR.',W/2,230,t,0.1,3.4,'#FFFFFF',-0.03,64);sticker('WIR WAREN NUR SPAZIEREN…',W/2,320,t,0.6,3.4,YEL,-0.03,58);
  sticker('*TIEF*',800,360,t,9.6,11.6,'#7CFF8A',0.1,90);
  sticker('STOPP!',W/2,300,t,11.8,13.6,'#FF5A5A',-0.06,110);
  sticker('*GRILLEN ZIRPEN*',W/2,300,t,18.9,19.9,'#FFFFFF',0.04,60);
  sticker('GENIE.',800,380,t,38.2,39.6,YEL,0.12,100);
  sticker('KEKSE?!',W/2,330,t,43.2,47.6,YEL,-0.08,120);
  dialog(t);
  if(t>47.9){const f=popA(t,48.0);const pul=1+0.05*Math.sin(t*7);x.save();x.globalAlpha=f.a;x.translate(W/2,1500);x.scale(f.sc*pul,f.sc*pul);rr(-220,-62,440,124,62);x.fillStyle=RED;x.fill();txt('+ Folgen',0,4,56,WHITE,900);x.restore();
    sticker('TEIL 2: AUF DER WACHE?',W/2,330,t,47.95,99,'#FFFFFF',-0.04,64);}
  x.save();x.globalAlpha=0.5;txt('Satire · alle Figuren erfunden',W/2,1870,22,'rgba(255,255,255,0.7)',600);x.restore();};

window.setWords=w=>{TL=w;};
