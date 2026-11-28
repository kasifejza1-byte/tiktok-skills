HEAD_SRC='Quellen: FBI/CISA · Reuters · New York Times · BSI';
const MSG='Treffen um 8?';
function msgBubble(X,Y,locked,o={}){bubble(X,Y,300,90,o.hide?'x7#k!q?':MSG,{size:32,fill:o.fill||'#2C6FB8'});if(locked===1)lock(X+170,Y-40,46,YEL);if(locked===2)lockOpen(X+170,Y-40,46,RED);}
// 1 Hook 0–4.1
function s1(t){bg(redT(t,2.75,4.1));ground();hook(['DEINE SMS LIEST','KEINER MIT?'],t);
  stick(330,GROUND,1.25,{mood:t<2.8?'happy':'shock',handR:[470,GROUND-380]});phone(500,GROUND-420,110,200,{screen:'#5B9BE6',rot:0.1});
  popScale(t,0.6,sc=>{x.translate(700,GROUND-660);x.scale(sc,sc);msgBubble(0,0,1);});bigX(870,GROUND-700,40,p(t,2.85,3.2));}
// 2 Bis zum Mast verschlüsselt 4.1–6.9
function s2(t){bg();header(p(t,4.1,4.4));ground();stick(140,GROUND,0.9,{mood:'happy',handR:[230,GROUND-270]});phone(240,GROUND-300,64,112,{screen:'#5B9BE6'});
  tower(760,GROUND,1.1,{t,waves:p(t,5.4,5.6)});const k=eio(p(t,4.4,5.6));const X=lerp(320,700,k),Y=GROUND-420-Math.sin(k*Math.PI)*120;
  envelope(X,Y,120,{});lock(X+60,Y-40,40,YEL);pill('verschlüsselt',W/2,GROUND+170,{...popA(t,5.7),size:44,col:YEL});
  if(t>5.7){const a=p(t,5.7,6);x.save();x.globalAlpha=a;lock(W/2-230,GROUND+165,46,YEL);x.restore();}}
// 3 Beim Anbieter lesbar 6.9–10.4
function s3(t){bg();header(1);ground();tower(160,GROUND,0.8,{});fiber([[160,GROUND],[160,GROUND+70],[700,GROUND+70],[700,GROUND]],t,eo(p(t,6.95,7.5)),1);
  building(760,GROUND,420,560,{label:'Anbieter',lit:true});
  const k=eio(p(t,7.6,8.4));if(t>7.6){const X=lerp(160,760,k),Y=lerp(GROUND-360,GROUND-330,k);if(t<8.4){envelope(X,Y,110,{});lock(X+55,Y-36,36,YEL);}}
  if(t>8.4){const a=popA(t,8.4);x.save();x.globalAlpha=a.a;x.translate(520,400);x.scale(a.sc,a.sc);msgBubble(0,0,t>8.8?2:1,{fill:t>9.26?'#7a2a33':'#2C6FB8'});x.restore();}
  pill('lesbar!',520,525,{...popA(t,9.26),size:48,fill:RED,col:RED,tcol:WHITE});}
// 4 Einbruch 10.4–14.0
function s4(t){bg();header(1);ground();building(560,GROUND,480,620,{label:'Anbieter',lit:true});
  const X=lerp(1180,820,eo(p(t,10.45,11.2)));const st=stick(X,GROUND,1.0,{walk:t<11.2?t*10:undefined,mood:'angry',handL:[X-120,GROUND-430]});hood(st);
  if(t>11.2){x.save();x.globalAlpha=p(t,11.2,11.4);circ(X-150,GROUND-460,56,'rgba(91,155,230,0.25)',WHITE,8);line(X-110,GROUND-420,X-80,GROUND-390,WHITE,12);x.restore();}
  msgBubble(500,400,2,{fill:'#7a2a33'});pill('Einbruch',820,GROUND+170,{...popA(t,10.97),size:44,fill:RED,col:RED,tcol:WHITE});
  pill('liest mit',500,520,{...popA(t,11.88),size:44,col:RED});}
// 5 Salt Typhoon, monatelang 14.0–20.0
function s5(t){bg();header(1);const k=eo(p(t,14.0,14.4));x.save();x.globalAlpha=k;mapCard(W/2,700,860,560,{label:'USA – große Mobilfunknetze'});x.restore();
  [[-0.3,-0.05],[0.05,0.12],[0.28,-0.1],[-0.1,0.28],[0.33,0.25]].forEach((q,i)=>{const a=popA(t,14.3+i*0.2);if(a.a<=0)return;x.save();x.globalAlpha=a.a;const X=W/2+q[0]*860,Y=700+q[1]*560;building(X,Y+30,70,90,{fill:'#2a3a6c'});pin(X,Y-70,36);x.restore();});
  pill('Salt Typhoon',W/2,1080,{...popA(t,15.5),size:56,fill:RED,col:RED,tcol:WHITE});
  pill('chinesische Hacker',W/2,1190,{...popA(t,14.75),size:36,col:WHITE});
  if(t>16.74){const a=popA(t,16.74);const m=Math.min(9,1+Math.floor((t-17.25)*4));x.save();x.globalAlpha=a.a;x.translate(W/2,1350);x.scale(a.sc,a.sc);rr(-230,-62,460,124,24);x.fillStyle=DARK;x.fill();x.strokeStyle=YEL;x.lineWidth=6;x.stroke();
    txt(t>17.25?'Monat '+Math.max(1,m)+' …':'drin',0,4,52,YEL,900);x.restore();}}
// 6 FBI: Ende-zu-Ende 20.0–26.4
function tube(x0,x1,Y,k,col=GREEN){const X=lerp(x0,x1,k);rr(x0,Y-40,X-x0,80,40);x.fillStyle='rgba(63,191,127,0.18)';x.fill();x.strokeStyle=col;x.lineWidth=6;x.stroke();}
function s6(t){bg();header(1);ground();
  popScale(t,20.5,sc=>{x.translate(W/2,400);x.scale(sc,sc);rr(-230,-70,460,140,24);x.fillStyle='#1d3d8f';x.fill();x.strokeStyle=YEL;x.lineWidth=6;x.stroke();txt('FBI rät:',0,4,64,WHITE,900);});
  stick(140,GROUND,0.9,{mood:'happy',handR:[230,GROUND-270]});phone(240,GROUND-300,64,112,{screen:'#5B9BE6'});
  stick(940,GROUND,0.9,{mood:'happy',handL:[850,GROUND-270]});phone(840,GROUND-300,64,112,{screen:'#5B9BE6'});
  const k=eo(p(t,22.5,23.6));if(k>0){tube(280,800,GROUND-300,k);lock(280,GROUND-380,40,GREEN);if(k>.99)lock(800,GROUND-380,40,GREEN);
    const u=((t-22.5)*0.8)%1;envelope(lerp(300,780,u),GROUND-300,70,{seal:true});}
  pill('Ende-zu-Ende',W/2,GROUND-470,{...popA(t,22.5),size:48,fill:GREEN,col:GREEN,tcol:'#0b2a1b'});
  pill('Signal',W/2-150,GROUND+170,{...popA(t,24.75),size:46,fill:'#3A76F0',col:'#3A76F0',tcol:WHITE});pill('WhatsApp',W/2+170,GROUND+170,{...popA(t,25.73),size:46,fill:'#25A366',col:'#25A366',tcol:WHITE});}
// 7 Nur du und dein Gegenüber 26.4–30.3
function s7(t){bg();header(1);ground();building(W/2,GROUND,300,420,{label:'Anbieter'});
  stick(110,GROUND,0.85,{mood:'happy',handR:[195,GROUND-260]});phone(205,GROUND-290,60,106,{screen:'#5B9BE6'});
  stick(970,GROUND,0.85,{mood:'happy',handL:[885,GROUND-260]});phone(875,GROUND-290,60,106,{screen:'#5B9BE6'});
  tube(240,840,GROUND-560,1);envelope(lerp(270,810,((t*0.5)%1)),GROUND-560,70,{seal:true});
  popScale(t,27.0,sc=>{x.translate(W/2,GROUND-760);x.scale(sc,sc);bubble(0,0,300,90,'x7#k!q?',{size:34,fill:'#3a4668'});});
  if(t>27.0)txtS2('???',W/2,GROUND-200,60,GREY);
  pill('nur du + dein Gegenüber',W/2,GROUND+170,{...popA(t,27.55),size:42,col:GREEN});}
function txtS2(s,X,Y,size,col){txt(s,X,Y,size,col,900);}
// 8 Pointe: Postkarte vs. Brief 30.3–35.15
function s8(t){bg();header(1);
  popScale(t,30.4,sc=>{x.translate(290,760);x.scale(sc,sc);x.rotate(-0.06);postcard(0,0,400,['Treffen','um 8?']);});
  pill('SMS',290,520,{...popA(t,30.75),size:48,col:RED});txt('jeder kann lesen',290,1000,32,RED,800);
  popScale(t,33.0,sc=>{x.translate(790,760);x.scale(sc,sc);x.rotate(0.05);envelope(0,0,400,{seal:true});});
  pill('Ende-zu-Ende',790,520,{...popA(t,33.05),size:44,col:GREEN});if(t>34.1)txt('versiegelt',790,1000,32,GREEN,800);
  if(t<31)x.globalAlpha=1;}
function s9(t){seriesEnd(t,35.25,2,'Teil 3: Wer hört mit? →');}
SCENES=[[0,4.1,s1],[4.1,6.9,s2],[6.9,10.4,s3],[10.4,14.0,s4],[14.0,20.0,s5],[20.0,26.4,s6],[26.4,30.3,s7],[30.3,35.15,s8],[35.15,99,s9]];
