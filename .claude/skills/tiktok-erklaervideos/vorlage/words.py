import json,re
segs=[(0.03,1.85,"Dein Handy ist nicht wirklich aus,"),(2.09,3.68,"nur weil der Bildschirm schwarz ist."),
(3.87,6.58,"Beim Ausschalten schlafen Display und Prozessor ein."),(6.75,8.21,"Aber ein winziger Funkchip"),(8.42,8.92,"bleibt wach."),
(9.54,11.37,"Er nutzt eine geheime Akku-Reserve"),(11.72,13.39,"und sendet alle paar Sekunden"),(13.67,15.46,"ein verschlüsseltes Bluetooth-Signal."),
(15.68,17.77,"Jedes fremde Handy in der Nähe fängt es auf"),(18.14,20.15,"und schickt deinen Standort anonym an dich."),
(20.58,22.37,"So findest du viele neuere Handys"),(22.63,24.72,"noch bis zu 24 Stunden später."),(25.18,25.63,"Sogar,"),(25.88,26.96,"wenn sie gestohlen wurden."),
(27.33,27.65,"Krass,"),(27.94,29.60,"was in deiner Hosentasche steckt, oder?"),(30.07,31.80,"Folge für mehr Technik-Geheimnisse.")]
spoken={"24":"vierundzwanzig"}
out=[]
for a,b,txt in segs:
    ws=txt.split(); wt=[len(re.sub(r'\W','',spoken.get(w,w)))+2 for w in ws]; tot=sum(wt); t=a
    for w,k in zip(ws,wt):
        d=(b-a)*k/tot; out.append({"w":w,"s":round(t,3),"e":round(t+d,3)}); t+=d
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]=33.0
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words")
