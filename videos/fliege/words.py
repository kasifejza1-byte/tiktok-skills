import json,re
segs=[(0.00,2.12,"Die Fliege kommt immer wieder, weil sie zu dumm ist."),(2.65,3.43,"Das stimmt nicht."),(3.74,5.03,"Für sie bist du ein Buffet."),
(5.38,6.58,"Dein Schweiß ist salzig,"),(6.88,7.67,"deine Haut riecht,"),(7.94,8.77,"und du bist warm."),(9.39,10.71,"Und sie schmeckt mit den Füßen."),
(11.25,12.82,"Darum krabbelt sie auf dir herum."),(13.21,14.21,"Du schlägst nach ihr,"),(14.58,16.58,"aber sie sieht deine Hand wie in Zeitlupe."),
(16.95,20.04,"Ihre Augen schaffen rund 250 Bilder pro Sekunde."),(20.68,21.71,"Du nur etwa 60."),(21.94,22.65,"Sie fliegt weg."),
(23.40,24.52,"Aber dein Geruch bleibt."),(24.88,25.86,"Also kommt sie zurück."),(26.62,26.84,"Tipp:"),(27.29,28.77,"Stell einen Ventilator auf."),
(29.12,30.60,"Gegen Wind kann sie kaum landen."),(31.09,32.21,"Die Fliege ist nicht dumm."),(32.47,33.59,"Sie hat einfach Hunger."),
(33.92,35.09,"Irrtum eins von fünf."),(35.56,36.54,"Vier glaubst du noch.")]
spoken={"250":"zweihundertfünfzig","60":"sechzig"}
out=[]
for a,b,txt in segs:
    ws=txt.split(); wt=[len(re.sub(r'\W','',spoken.get(w,w)))+2 for w in ws]; tot=sum(wt); t=a
    for w,k in zip(ws,wt):
        d=(b-a)*k/tot; out.append({"w":w,"s":round(t,3),"e":round(t+d,3)}); t+=d
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]=36.9
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words")
