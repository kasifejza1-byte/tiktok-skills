import json,re
segs=[(0.05,3.06,"Du drückst morgens dreimal auf Snooze und bist trotzdem todmüde?"),(3.66,4.71,"Das liegt nicht an dir."),
(5.01,6.75,"In deinem Blut steckt noch Melatonin,"),(7.04,7.93,"das Schlafhormon."),(8.27,9.69,"Und das stoppt am besten eins:"),(10.04,10.64,"helles Licht."),
(10.97,13.22,"Deine Lampe schafft nur etwa 300 Lux."),(13.68,16.52,"Draußen ist es selbst bei Wolken oft zehnmal so hell."),
(16.89,17.31,"Also:"),(17.77,18.41,"Rollo hoch"),(18.87,21.02,"und fünf Minuten raus ans Tageslicht."),
(21.51,22.86,"Leg dein Handy weg vom Bett,"),(23.23,24.57,"damit du wirklich aufstehst."),(24.91,25.94,"Und steh jeden Tag"),(26.35,27.60,"zur gleichen Zeit auf,"),(27.91,28.89,"auch am Wochenende."),
(29.33,29.68,"Licht"),(30.07,30.82,"ist der Kaffee"),(31.15,32.19,"für deine innere Uhr."),(32.49,33.99,"Folge für mehr Alltags-Tricks.")]
spoken={"300":"dreihundert"}
out=[]
for a,b,txt in segs:
    ws=txt.split(); wt=[len(re.sub(r'\W','',spoken.get(w,w)))+2 for w in ws]; tot=sum(wt); t=a
    for w,k in zip(ws,wt):
        d=(b-a)*k/tot; out.append({"w":w,"s":round(t,3),"e":round(t+d,3)}); t+=d
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]=35.0
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words")
