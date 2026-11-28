HEAD_SRC='Quellen: GSMA · arXiv (A5/1) · Canadian Centre for Cyber Security · Bundesnetzagentur';
function statusPhone(X,Y,w,h,net,col){phone(X,Y,w,h,{screen:'#1d2d5c'});rr(X-w*.36,Y-h*.4,w*.72,h*.12,10);x.fillStyle='rgba(0,0,0,0.25)';x.fill();
  txt(net,X+w*.14,Y-h*.34,h*.07,col||WHITE,900);for(let i=0;i<4;i++){rr(X-w*.3+i*w*.06,Y-h*.31-i*h*.012,w*.04,h*.03+i*h*.012,3);x.fillStyle=i<(net==='2G'?1:4)?(col||WHITE):'rgba(255,255,255,0.25)';x.fill();}}
// 1 Hook 0–2.5
function s1(t){bg(redT(t,1.53,2.5));ground();hook(['2G GIBT ES DOCH','GAR NICHT MEHR?'],t);
  statusPhone(W/2,GROUND-400,300,540,'5G',GREEN);pill('2G?',W/2+250,GROUND-650,{...popA(t,0.3),size:60,col:t>1.53?RED:WHITE});
  pill('weg',W/2,GROUND+170,{...popA(t,0.8),size:48,col:t>1.6?RED:WHITE,strike:eo(p(t,1.65,1.95))});}
// 2 2G läuft noch, Handy springt drauf 2.5–8.7
function s2(t){bg();header(p(t,2.5,2.8));ground();tower(220,GROUND,1.1,{t,waves:1});
  const f45=1-p(t,6.9,7.4);[['5G',GREEN,f45],['4G',BLUE,f45],['2G',RED,1]].forEach(([n,c,a],i)=>pill(n,420,GROUND-560+i*100,{...popA(t,2.8+i*0.25),size:44,col:c,a:popA(t,2.8+i*0.25).a*a}));
  pill('Deutschland',W/2,420,{...popA(t,2.75),size:48,fill:'#1d3d8f',col:WHITE,tcol:WHITE});pill('2G läuft noch',W/2,530,{...popA(t,4.04),size:44,col:RED});
  x.save();x.globalAlpha=0.5*p(t,5.3,5.8);rr(660,GROUND-720,420,720,30);x.fillStyle='rgba(0,0,0,0.45)';x.fill();txt('kaum Empfang',870,GROUND-670,30,GREY,800);x.restore();
  const X=lerp(560,860,eo(p(t,5.4,6.8)));stick(X,GROUND,0.9,{walk:t<6.8&&t>5.4?t*9:undefined,mood:t>6.3?'shock':'happy',handR:[X+95,GROUND-280]});
  statusPhone(X+100,GROUND-320,70,124,t>6.3?'2G':'5G',t>6.3?RED:GREEN);
  if(t>6.3)pill('springt auf 2G',W/2,GROUND+170,{...popA(t,6.3),size:44,fill:RED,col:RED,tcol:WHITE});}
// 3 Verschlüsselung geknackt 8.7–12.95
function s3(t){bg();header(1);const brk=t>12.2;
  popScale(t,8.95,sc=>{x.translate(W/2,820);x.scale(sc,sc);if(!brk)lock(0,0,300,YEL);else{lockOpen(0,0,300,RED);line(-60,40,10,110,DARK,10);line(10,110,-20,170,DARK,10);}});
  pill('2G-Verschlüsselung',W/2,1120,{...popA(t,10.0),size:44,col:WHITE});
  const sw=t>11.3&&t<12.4?Math.sin((t-11.3)*9):0;x.save();x.translate(790,560);x.rotate(-0.6+sw*0.8);rr(-20,0,40,240,10);x.fillStyle='#8a5a33';x.fill();rr(-80,-50,160,80,14);x.fillStyle=GREY;x.fill();x.restore();
  if(brk){x.save();x.globalAlpha=1-p(t,12.2,12.7);circ(W/2,760,lerp(60,320,p(t,12.2,12.7)),null,YEL,10);x.restore();}
  pill('seit Jahren geknackt',W/2,1240,{...popA(t,12.22),size:46,fill:RED,col:RED,tcol:WHITE});}
// 4 Keine Prüfung ob Mast echt 12.95–16.6
function s4(t){bg();header(1);ground();tower(780,GROUND,1.1,{t,waves:0.8});stick(200,GROUND,1.0,{mood:'happy',handR:[300,GROUND-300]});statusPhone(310,GROUND-330,70,124,'2G',RED);
  waves(330,GROUND-340,t,{n:3,period:1,maxR:300,a0:-0.6,a1:0.5});
  popScale(t,13.87,sc=>{x.translate(420,GROUND-640);x.scale(sc,sc);bubble(0,0,340,100,'Mast echt?',{size:40,fill:'#3a4668'});});bigX(560,GROUND-660,46,p(t,14.6,14.9));
  pill('keine Prüfung',W/2,GROUND+170,{...popA(t,14.78),size:48,col:RED});}
// 5 Falscher Mast / IMSI-Catcher 16.6–22.3
function s5(t){bg(0.2*p(t,17.3,17.8));header(1);ground();tower(940,GROUND,0.9,{t,waves:0.5,label:'echter Mast',la:p(t,16.8,17.1)});
  stick(120,GROUND,0.85,{mood:t>18.8?'shock':'happy',handR:[205,GROUND-260]});statusPhone(215,GROUND-290,60,106,'2G',RED);
  const fa=eo(p(t,16.75,17.2));if(fa>0){x.save();x.globalAlpha=fa;rr(400,GROUND-120,260,120,16);x.fillStyle='#3a3f55';x.fill();x.strokeStyle=WHITE;x.lineWidth=5;x.stroke();circ(450,GROUND,26,DARK,WHITE,5);circ(610,GROUND,26,DARK,WHITE,5);
    tower(530,GROUND-120,0.7,{col:RED,t,waves:1,wcol:'229,72,77'});x.restore();const st=stick(720,GROUND,0.7,{mood:'happy'});hood(st);}
  if(t>17.3){x.save();x.globalAlpha=p(t,17.3,17.6);waves(240,GROUND-300,t,{n:3,period:0.8,maxR:240,a0:-0.5,a1:0.3,col:'229,72,77'});x.restore();}
  pill('falscher Mast',530,GROUND-560,{...popA(t,17.3),size:42,fill:RED,col:RED,tcol:WHITE});
  pill('IMSI-Catcher',W/2,GROUND+170,{...popA(t,18.8),a:popA(t,18.8).a*(1-p(t,20.9,21.1)),size:50,col:RED});
  if(t>21.1){const k=eo(p(t,21.1,21.6));x.save();x.setLineDash([16,12]);x.lineDashOffset=-t*60;x.strokeStyle=YEL;x.lineWidth=6;x.beginPath();x.moveTo(560,GROUND-440);x.quadraticCurveTo(760,GROUND-620,lerp(560,920,k),lerp(GROUND-440,GROUND-420,k));x.stroke();x.restore();
    pill('schaltet sich dazwischen',W/2,GROUND+170,{...popA(t,21.1),size:42,col:YEL});}}
// 6 Android: 2G aus 22.3–27.3 | 7 iPhone Blockierungsmodus 27.3–30.7
function settings(X,Y,title,row,on,t){rr(X-260,Y-470,520,940,70);x.fillStyle='#070b16';x.fill();x.strokeStyle=WHITE;x.lineWidth=8;x.stroke();rr(X-230,Y-430,460,860,46);x.fillStyle='#F2F4F8';x.fill();
  txt(title,X,Y-340,44,DARK,900);for(let i=0;i<4;i++){rr(X-200,Y-250+i*120,400,90,20);x.fillStyle=i===2?'#FFFFFF':'#E6E9F0';x.fill();}
  txt(row,X-180,Y-250+2*120+45,row.length>12?25:32,DARK,800,'left');toggle(X+130,Y-250+2*120+45,on);[0,1,3].forEach(i=>{rr(X-170,Y-250+i*120+35,200,20,8);x.fillStyle='#C9D0DC';x.fill();});}
function s6(t){bg();header(1);pill('Android',W/2,330,{...popA(t,22.98),size:52,fill:'#2F8F7A',col:'#2F8F7A',tcol:WHITE});
  popScale(t,22.5,sc=>{x.translate(W/2,900);x.scale(sc,sc);settings(0,0,'Mobilfunknetz','2G zulassen',1-eio(p(t,26.3,26.7)),t);});
  if(t>26.6)pill('2G aus ✓',W/2,1440,{...popA(t,26.6),size:44,fill:GREEN,col:GREEN,tcol:'#0b2a1b'});}
function s7(t){bg();header(1);pill('iPhone',W/2,330,{...popA(t,27.45),size:52,fill:'#3a3f55',col:WHITE,tcol:WHITE});
  popScale(t,27.4,sc=>{x.translate(W/2,900);x.scale(sc,sc);settings(0,0,'Datenschutz','Blockierungsmodus',eio(p(t,29.3,29.7)),t);});
  if(t>29.7)pill('blockiert u. a. 2G ✓',W/2,1440,{...popA(t,29.7),size:40,fill:GREEN,col:GREEN,tcol:'#0b2a1b'});}
// 8 Pointe: Tür mit altem Schloss 30.7–32.8
function s8(t){bg();header(1);ground();rr(240,GROUND-760,600,760,12);x.fillStyle='#6b4a2e';x.fill();x.strokeStyle=WHITE;x.lineWidth=8;x.stroke();
  for(let i=0;i<4;i++)line(260,GROUND-700+i*190,820,GROUND-700+i*190,'rgba(0,0,0,0.25)',6);
  const wig=Math.sin(t*14)*0.15;x.save();x.translate(720,GROUND-380);rr(-50,-70,100,140,14);x.fillStyle='#8a6a3a';x.fill();x.strokeStyle='#5a4320';x.lineWidth=6;x.stroke();circ(0,-10,16,DARK);rr(-6,-10,12,40,4);x.fillStyle=DARK;x.fill();
  x.rotate(wig);rr(-6,-10,140,16,6);x.fillStyle=YEL;x.fill();circ(140,-2,26,null,YEL,10);x.restore();
  pill('2G',540,GROUND-860,{...popA(t,30.75),size:60,col:RED});pill('altes Schloss',W/2,GROUND+170,{...popA(t,32.0),size:48,fill:RED,col:RED,tcol:WHITE});}
function s9(t){seriesEnd(t,32.85,4,'Finale: Hacker mit Feierabend →');}
SCENES=[[0,2.5,s1],[2.5,8.7,s2],[8.7,12.95,s3],[12.95,16.6,s4],[16.6,22.3,s5],[22.3,27.3,s6],[27.3,30.7,s7],[30.7,32.8,s8],[32.8,99,s9]];
