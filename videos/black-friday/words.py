import json,re
segs=[(0.00,0.90,"Am Black Friday ist"),(1.27,3.23,"Technik so billig wie sonst nie im Jahr."),(3.63,4.49,"Das stimmt nicht."),(4.90,5.97,"Du siehst einen Fernseher:"),
(6.25,8.02,"900 Euro durchgestrichen,"),(8.22,9.31,"jetzt nur 600."),(9.67,11.37,"Aber der Streichpreis ist oft"),(11.63,12.45,"nur die UVP."),
(12.81,13.82,"Die zahlt kaum jemand."),(14.15,15.75,"Das Vergleichsportal idealo"),(15.97,18.41,"hat letztes Jahr 10.000 Produkte geprüft."),(19.01,19.71,"Ergebnis:"),
(19.93,20.96,"Mehr als die Hälfte"),(21.19,23.56,"war an einem anderen Novembertag schon günstiger."),(23.96,25.16,"Und gegenüber Oktober"),(25.38,26.31,"sparst du im Schnitt"),
(26.55,27.44,"nur 8 Prozent."),(28.00,28.46,"Also:"),(28.80,31.14,"Vor dem Kauf immer den Preisverlauf checken."),(31.47,33.05,"Black Friday ist kein Spartag,"),
(33.38,34.47,"sondern ein Werbetag."),(34.78,35.95,"Irrtum 1 von 5."),(36.25,37.18,"Vier glaubst du noch.")]
spoken={"10.000":"zehntausend","900":"neunhundert","600":"sechshundert","8":"acht","1":"eins","5":"fünf","UVP":"uvp"}
out=[]
for a,b,txt in segs:
    ws=[w for w in txt.split() if w!="–"]; wt=[len(re.sub(r'\W','',spoken.get(w,w)))+2 for w in ws]; tot=sum(wt); t=a
    for w,k in zip(ws,wt):
        d=(b-a)*k/tot; out.append({"w":w,"s":round(t,3),"e":round(t+d,3)}); t+=d
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]=37.4
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words")
