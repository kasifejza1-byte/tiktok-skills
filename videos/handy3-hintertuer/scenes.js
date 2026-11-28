HEAD_SRC='Quellen: FBI (CALEA) · TKÜV · Wall Street Journal · Lawfare · EFF';
const BX=560,BW=520,BH=640,DX=BX+120;
function provider(t,o={}){building(BX,GROUND,BW,BH,{label:'Mobilfunkanbieter',lit:true});door(DX,GROUND,120,210,{open:o.open||0,fill:o.dfill});
  if(o.lab)pill('Abhör-Schnittstelle',DX-40,GROUND-430,{size:32,col:YEL,a:o.lab});}
// 1 Hook 0–3.8
function s1(t){bg(redT(t,2.35,3.8));ground();hook(['NUR DIE POLIZEI','KANN ABHÖREN?'],t);
  const st=stick(300,GROUND,1.25,{mood:t<2.4?'happy':'shock'});cap(st);headphones(st);
  phone(780,GROUND-360,120,220,{screen:'#5B9BE6'});waves(780,GROUND-360,t,{n:3,period:1,maxR:220,both:true});
  pill('nur Polizei',540,640,{...popA(t,0.8),size:48,col:t>2.4?RED:GREEN,strike:eo(p(t,2.5,2.85))});}
// 2 Pflicht-Schnittstelle 3.8–8.0
function s2(t){bg();header(p(t,3.8,4.1));ground();provider(t,{lab:popA(t,6.37).a});
  popScale(t,5.32,sc=>{x.translate(220,640);x.scale(sc,sc);doc(0,0,170,{title:'§'});});pill('Pflicht per Gesetz',W/2,GROUND+170,{...popA(t,5.76),size:44,col:YEL});
  if(t>6.37){x.save();x.globalAlpha=0.5+0.5*Math.sin(t*6);circ(DX,GROUND-105,130,null,YEL,6);x.restore();}}
// 3 Richterbeschluss, Polizei schaltet sich dazu 8.0–11.4
function s3(t){bg();header(1);ground();const op=eo(p(t,9.6,10.0));provider(t,{open:op,lab:1});
  popScale(t,8.06,sc=>{x.translate(190,620);x.scale(sc,sc);doc(0,0,190,{title:'Richter',stamp:eo(p(t,8.6,8.9)),stext:'BESCHLUSS',scol:GREEN});});
  const X=lerp(-80,DX-20,eo(p(t,8.4,10.4)));const st=stick(X,GROUND,0.95,{walk:t<10.4?t*9:undefined,mood:'neutral',handR:[X+80,GROUND-180]});cap(st);if(t>10.3)headphones(st);
  pill('Polizei hört zu',W/2,GROUND+170,{...popA(t,10.0),size:44,col:GREEN});}
// 4 USA seit 1994 11.4–15.9
function s4(t){bg();header(1);
  pill('USA',W/2,420,{...popA(t,11.89),size:72,fill:'#1d3d8f',col:WHITE,tcol:WHITE});
  popScale(t,13.4,sc=>{x.translate(W/2,820);x.scale(sc,sc);rr(-300,-170,600,340,30);x.fillStyle=DARK;x.fill();x.strokeStyle=YEL;x.lineWidth=8;x.stroke();
    txt('seit',0,-90,50,WHITE,800);txt(String(Math.round(lerp(1960,1994,eo(p(t,13.75,15.0))))),0,20,140,YEL,900);txt('CALEA-Gesetz',0,120,34,GREY,800);});
  pill('Pflicht',W/2,1180,{...popA(t,15.29),size:56,fill:RED,col:RED,tcol:WHITE});}
// 5 2024: Staatshacker drin 15.9–22.3
function s5(t){bg(0.25*p(t,18.6,19.2));header(1);ground();const op=eo(p(t,19.4,19.8));provider(t,{open:op,lab:1,dfill:t>19.4?'#5a1d24':undefined});
  popScale(t,16.0,sc=>{x.translate(W/2,430);x.scale(sc,sc);txt('2024',0,0,140,RED,900);});
  for(let i=0;i<2;i++){const X=lerp(1200+i*170,DX+30+i*60,eo(p(t,18.62,20.3)));if(X>1150)continue;const st=stick(X,GROUND,0.85,{walk:t<20.3?t*10+i:undefined,mood:'angry'});hood(st);}
  if(t>19.4){x.save();x.globalAlpha=0.5+0.5*Math.sin(t*10);circ(DX,GROUND-105,150,null,RED,8);x.restore();}
  pill('chinesische Staatshacker',W/2,GROUND+170,{...popA(t,18.9),a:popA(t,18.9).a*(1-p(t,21.2,21.4)),size:42,fill:RED,col:RED,tcol:WHITE});
  pill('drin im Abhörsystem',W/2,GROUND+170,{...popA(t,21.4),size:42,fill:RED,col:RED,tcol:WHITE});}
// 6 Wen überwachen die Behörden? 22.3–25.5
function s6(t){bg();header(1);
  popScale(t,22.4,sc=>{x.translate(W/2-80,860);x.scale(sc,sc);rr(-260,-340,520,680,20);x.fillStyle='#F4F6FA';x.fill();txt('ABHÖRLISTE',0,-280,46,DARK,900);
    for(let i=0;i<7;i++){rr(-200,-200+i*78,90,40,8);x.fillStyle='#9AA5BF';x.fill();rr(-90,-200+i*78,lerp(150,260,(i*37%10)/10),40,8);x.fillStyle='#2a3a6c';x.fill();}});
  const X=lerp(1100,860,eo(p(t,22.6,23.4)));const st=stick(X,GROUND,1.0,{mood:'happy',handL:[X-150,GROUND-560]});hood(st);
  x.save();x.globalAlpha=p(t,22.9,23.2);const mx=X-190+Math.sin(t*3)*40,my=GROUND-600+Math.cos(t*2)*60;circ(mx,my,80,'rgba(91,155,230,0.25)',WHITE,9);line(mx+56,my+56,X-150,GROUND-560,WHITE,14);x.restore();
  pill('wen wird überwacht?',W/2,GROUND+170,{...popA(t,23.43),size:44,col:RED});}
// 7 Pointe: Hintertür ohne Schild 25.5–31.0
function s7(t){bg();header(1);ground();const op=eo(p(t,29.8,30.3));
  rr(200,GROUND-700,680,700,10);x.fillStyle='#1b2b5a';x.fill();x.strokeStyle=WHITE;x.lineWidth=7;x.stroke();door(W/2,GROUND,200,380,{open:op});
  pill('Hintertür',W/2,GROUND-790,{...popA(t,25.79),size:52,col:YEL});
  const sg=popA(t,27.38);if(sg.a>0){const fall=eio(p(t,29.6,30.2));x.save();x.globalAlpha=sg.a;x.translate(W/2,GROUND-470+fall*380);x.rotate(fall*0.9);x.scale(sg.sc,sg.sc);rr(-170,-46,340,92,10);x.fillStyle=WHITE;x.fill();txt('NUR POLIZEI',0,3,40,DARK,900);x.restore();}
  if(t>27.38&&t<29.6)bigX(W/2,GROUND-470,80,p(t,27.4,27.8)*0);
  const X=lerp(1180,W/2+30,eo(p(t,29.5,30.8)));if(X<1150){const st=stick(X,GROUND,0.9,{walk:t<30.8?t*10:undefined,mood:'angry'});hood(st);}
  pill('kein Schild hält auf',W/2,GROUND+170,{...popA(t,27.8),a:popA(t,27.8).a*(1-p(t,29.3,29.5)),size:42,col:RED});
  pill('wer den Weg findet, kommt rein',W/2,GROUND+170,{...popA(t,29.5),size:36,col:WHITE});}
function s8(t){seriesEnd(t,31.1,3,'Teil 4: Das alte 2G →');}
SCENES=[[0,3.8,s1],[3.8,8.0,s2],[8.0,11.4,s3],[11.4,15.9,s4],[15.9,22.3,s5],[22.3,25.5,s6],[25.5,31.0,s7],[31.0,99,s8]];
