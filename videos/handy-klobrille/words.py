import json
d=json.load(open('scribe.json'))
ws=d['words'] if isinstance(d,dict) and 'words' in d else d
ws=[w for w in ws if w.get('type','word')=='word']
rep={'siebzig':'70','Prozent':'%'}
out=[{"w":rep.get(w['text'],w['text']),"s":w['start'],"e":w['end']} for w in ws]
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]=36.0
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words", out[:2])
