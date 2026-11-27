# Wort-Timing aus ElevenLabs-Transkript (raw.mp3) -> geschnittene take1.mp3 (gleiche Schnitte wie cut.py)
import json,re,subprocess
RAW=[("Halt,",0,0.279),("stopp!",0.302,0.673),("Scroll",0.848,1.173),("nicht",1.196,1.347),("weiter!",1.393,1.904),("Du",2.113,2.276),("drehst",2.322,2.601),("die",2.624,2.717),("Heizung",2.763,3.135),("auf",3.216,3.367),("5,",3.437,3.901),("damit",3.936,4.249),("es",4.307,4.365),("schneller",4.389,4.714),("warm",4.76,4.957),("wird?",5.004,5.352),("Falsch!",5.677,6.258),("Die",6.583,6.722),("Zahl",6.803,7.094),("ist",7.245,7.43),("nur",7.5,7.651),("die",7.674,7.744),("Zieltemperatur.",7.814,8.754),("3",8.963,9.334),("heißt",9.509,9.787),("etwa",9.857,10.066),("20",10.124,10.553),("Grad.",10.6,11.088),("5",11.366,11.714),("heißt",11.923,12.283),("28°!",12.411,13.398),("Schneller",13.781,14.153),("warm",14.199,14.443),("wird's",14.652,14.907),("nicht.",14.977,15.36),("Nur",15.534,15.755),("teurer.",15.824,16.579)]
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
