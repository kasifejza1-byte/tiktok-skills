# Untertitel aus ElevenLabs-Transkript (Scribe) -> words.json; Stimme mit atempo=1.1 beschleunigt (voice.mp3)
import json
SPEED=1.1
d=json.load(open("transcript.json"));ws=d["words"] if isinstance(d,dict) else d
ws=[w for w in ws if w.get("type","word")=="word"]
rep={"sechshundert":"600"}
out=[{"w":rep.get(w["text"].strip(".,:"),w["text"]),"s":round(w["start"]/SPEED,3),"e":round(w["end"]/SPEED,3)} for w in ws]
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]+=0.4
# Serie entfernt: "Fünf Psycho-Irrtümer. Teil eins." (3.40–6.15) und Cliffhanger (ab 33.45) sind aus voice_cut.mp3 geschnitten
out=[w for w in out if not (3.4<w["s"]<6.15) and w["s"]<33.45]; out[-1]["e"]=33.9
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words, last",out[-1]["e"])
