import json,re
segs=[(0.05,1.816,"Stell dir vor, auf 10.000 Metern Höhe"),(2.08,3.448,"fällt der Bordcomputer aus."),(3.826,4.647,"Deine Reaktion:"),(4.99,5.483,"Panik."),
(6.109,7.462,"Die Reaktion des Piloten:"),(7.676,8.616,"Ein müdes Gähnen."),(9.19,9.59,"Warum?"),(10.205,11.434,"Weil moderne Flugzeuge"),
(11.626,13.616,"nach dem sogenannten Redundanz-Prinzip"),(13.791,14.434,"gebaut sind."),(14.933,15.728,"Das bedeutet:"),(16.001,18.347,"Nichts im Cockpit existiert nur einmal."),
(18.705,20.284,"Fällt ein Hydrauliksystem aus?"),(20.586,22.554,"Kein Problem, es gibt noch zwei weitere."),(22.884,23.956,"Streikt ein Computer?"),
(24.356,26.471,"Übernehmen sofort zwei Backup-Systeme –"),(26.804,27.651,"oft sogar"),(27.922,29.726,"von komplett unterschiedlichen Herstellern,"),
(30.004,32.546,"damit nicht derselbe Softwarefehler alle lahmlegt."),(33.098,34.792,"Für dich als Passagier bedeutet das:"),
(35.046,37.13,"Selbst wenn im Hintergrund Technik ausfällt,"),(37.409,39.589,"merkst du davon meistens nicht einmal ein Ruckeln.")]
spoken={"10.000":"zehntausend"}
out=[]
for a,b,txt in segs:
    ws=[w for w in txt.split() if w!="–"]; wt=[len(re.sub(r'\W','',spoken.get(w,w)))+2 for w in ws]; tot=sum(wt); t=a
    for w,k in zip(ws,wt):
        d=(b-a)*k/tot; out.append({"w":w,"s":round(t,3),"e":round(t+d,3)}); t+=d
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]=39.94
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words")
