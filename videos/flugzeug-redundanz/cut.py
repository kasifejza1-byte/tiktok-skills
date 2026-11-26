import subprocess
sil=[(0,0.785),(2.55052,2.81488),(4.18317,4.56082),(5.38179,5.72533),(6.21819,6.84415),(8.19658,8.4115),(9.35125,9.9254),(10.3254,10.9397),(12.1686,12.3613),(14.3506,14.5256),(15.1693,15.6678),(16.4633,16.7361),(19.0819,19.4404),(21.0188,21.321),(23.2888,23.6193),(24.691,25.0908),(27.2061,27.5387),(28.3861,28.6567),(30.4613,30.739),(33.2805,33.8333),(35.527,35.7806),(37.8645,38.1441),(40.3238,40.6349)]
K=0.09 # keep per side
segs=[];prev=None
for i,(a,b) in enumerate(sil):
    if i==0: start=b-0.05; continue
    segs.append((start,a+K)); start=b-K
f=";".join(f"[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS[s{i}]" for i,(a,b) in enumerate(segs))
f+=";"+"".join(f"[s{i}]" for i in range(len(segs)))+f"concat=n={len(segs)}:v=0:a=1,atempo=1.15[o]"
subprocess.run(["ffmpeg","-y","-loglevel","error","-i","raw.mp3","-filter_complex",f,"-map","[o]","-b:a","192k","take1.mp3"],check=True)
