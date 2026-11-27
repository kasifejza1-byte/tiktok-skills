import subprocess,re
out=subprocess.run(["ffmpeg","-i","raw.mp3","-af","silencedetect=n=-35dB:d=0.12","-f","null","-"],capture_output=True,text=True).stderr
v=list(map(float,re.findall(r'silence_(?:start|end): ([0-9.]+)',out)))
sil=list(zip(v[0::2],v[1::2]))
K=0.09;segs=[];start=0.0
for i,(a,b) in enumerate(sil):
    k=0.15 if i==0 else K  # nach "Halt," etwas mehr Pause
    segs.append((start,a+k)); start=b-k
segs.append((start,99))
f=";".join(f"[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS[s{i}]" for i,(a,b) in enumerate(segs))
f+=";"+"".join(f"[s{i}]" for i in range(len(segs)))+f"concat=n={len(segs)}:v=0:a=1[o]"
subprocess.run(["ffmpeg","-y","-loglevel","error","-i","raw.mp3","-filter_complex",f,"-map","[o]","-b:a","192k","take1.mp3"],check=True)
