# Untertitel aus ElevenLabs-Transkript (Scribe) -> words.json; Stimme mit atempo=1.1 (voice.mp3)
import json
SPEED=1.1
d=json.load(open("transcript.json"));ws=[w for w in d["words"] if w.get("type","word")=="word"]
rep={"Neunzehnhundertzwölf":"1912","vier":"4"}
out=[{"w":rep.get(w["text"].strip(".,:"),w["text"]),"s":round(w["start"]/SPEED,3),"e":round(w["end"]/SPEED,3)} for w in ws]
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]+=0.4
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words, last",out[-1]["e"])
