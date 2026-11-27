# Wort-Timing aus ElevenLabs-Transkript (raw.mp3) -> geschnittene take1.mp3 (gleiche Schnitte wie cut.py)
import json,re,subprocess
RAW=json.load(open("raw_words.json"))
out=subprocess.run(["ffmpeg","-i","raw.mp3","-af","silencedetect=n=-35dB:d=0.12","-f","null","-"],capture_output=True,text=True).stderr
v=list(map(float,re.findall(r'silence_(?:start|end): ([0-9.]+)',out)));sil=list(zip(v[0::2],v[1::2]))
segs=[];start=0.0
for i,(a,b) in enumerate(sil):
    k=0.15 if i==0 else 0.09; segs.append((start,a+k)); start=b-k
segs.append((start,99))
offs=[];o=0
for a,b in segs: offs.append(o); o+=b-a
def m(t):
    for (a,b),o in zip(segs,offs):
        if t<=b: return o+max(0,t-a)
    return t
res=[{"w":w,"s":round(m(s),3),"e":round(m(e),3)} for w,s,e in RAW]
for i in range(len(res)-1): res[i]["e"]=max(res[i]["e"],min(res[i+1]["s"],res[i]["e"]+0.35))
res[-1]["e"]=round(res[-1]["e"]+0.6,3)
json.dump(res,open("words.json","w"),ensure_ascii=False)
print(" ".join(f'{r["w"]}@{r["s"]}' for r in res))
