// node render.js stills 1.0,5.0   |   node render.js full <dauer_s> [tempo=1.15]
const {chromium}=require('playwright');const fs=require('fs');const {spawn}=require('child_process');
const DIR=process.env.DIR||__dirname;
(async()=>{
  const [mode,arg,sp]=process.argv.slice(2);const speed=Number(sp||1.15);
  const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
  await pg.goto('file://'+DIR+'/anim.html');
  await pg.evaluate(async w=>{setWords(w);await document.fonts.load('900 80px Inter');await document.fonts.load('800 40px Inter');await document.fonts.load('600 20px Inter');},JSON.parse(fs.readFileSync(DIR+'/words.json','utf8')));
  const grab=async t=>{const d=await pg.evaluate(t=>{render(t);return document.getElementById('c').toDataURL('image/jpeg',0.93);},t);return Buffer.from(d.split(',')[1],'base64');};
  if(mode==='stills'){fs.mkdirSync(DIR+'/prev',{recursive:true});for(const t of arg.split(',').map(Number)){fs.writeFileSync(`${DIR}/prev/f_${t.toFixed(2)}.jpg`,await grab(t));}}
  else{const fps=30,dur=Number(arg)/speed,N=Math.round(fps*dur);
    const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-','-i',DIR+'/take1.mp3','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-af',`atempo=${speed},apad`,'-t',String(dur),'-movflags','+faststart',DIR+'/out.mp4'],{stdio:['pipe','inherit','inherit']});
    for(let i=0;i<N;i++){const buf=await grab(i/fps*speed);if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if(i%300==0)console.log('frame',i,'/',N);}
    ff.stdin.end();await new Promise(r=>ff.on('close',r));}
  await b.close();})();
