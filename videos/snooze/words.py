# Untertitel aus ElevenLabs-Transkript (Scribe, Wort-Zeitstempel) -> words.json
import json
ws=[w for w in json.load(open("transcript.json"))["words"] if w["type"]=="word"]
out=[{"w":w["text"].replace("300","300"),"s":w["start"],"e":w["end"]} for w in ws]
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]=36.4
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words")
