import json,re
segs=[(0.07,0.45,"Halt,"),(0.50,0.72,"stopp!"),(1.06,2.12,"Scroll nicht weiter!"),(2.30,4.94,"Du drehst die Heizung auf 5, damit es schneller warm wird?"),
(5.12,5.56,"Falsch!"),(5.74,7.48,"Die Zahl ist nur die Zieltemperatur."),(7.66,9.33,"3 heißt etwa 20 Grad."),(9.52,10.13,"5 heißt"),
(10.34,11.18,"28°!"),(11.38,12.52,"Schneller warm wird's nicht."),(12.70,13.27,"Nur teurer.")]
spoken={"5,":"fünf","5":"fünf","3":"drei","20":"zwanzig","28°!":"achtundzwanzig"}
out=[]
for a,b,txt in segs:
    ws=txt.split(); wt=[len(re.sub(r'\W','',spoken.get(w,w)))+2 for w in ws]
    if txt=="28 Grad!": wt=[1,0.0001]
    tot=sum(wt); t=a
    for w,k in zip(ws,wt):
        d=(b-a)*k/tot; out.append({"w":w,"s":round(t,3),"e":round(t+d,3)}); t+=d
out=[o for o in out if o["e"]-o["s"]>0.01]
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]=14.3
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words")
