import json,re
segs=[(0.04,1.575,"Stell dir vor, auf 10.000 Metern Höhe"),(1.74,2.935,"fällt der Bordcomputer aus."),(3.10,3.80,"Deine Reaktion:"),(3.97,4.40,"Panik."),
(4.56,5.69,"Die Reaktion des Piloten:"),(5.88,6.70,"Ein müdes Gähnen."),(6.84,7.19,"Warum?"),(7.35,8.43,"Weil moderne Flugzeuge"),
(8.58,10.31,"nach dem sogenannten Redundanz-Prinzip"),(10.47,11.03,"gebaut sind."),(11.18,11.88,"Das bedeutet:"),(12.03,14.07,"Nichts im Cockpit existiert nur einmal."),
(14.23,15.60,"Fällt ein Hydrauliksystem aus?"),(15.77,17.46,"Kein Problem, es gibt noch zwei weitere."),(17.63,18.55,"Streikt ein Computer?"),
(18.71,20.55,"Übernehmen sofort zwei Backup-Systeme –"),(20.71,21.44,"oft sogar"),(21.61,23.16,"von komplett unterschiedlichen Herstellern,"),
(23.32,25.54,"damit nicht derselbe Softwarefehler alle lahmlegt."),(25.70,27.17,"Für dich als Passagier bedeutet das:"),
(27.33,29.14,"Selbst wenn im Hintergrund Technik ausfällt,"),(29.29,31.25,"merkst du davon meistens nicht einmal ein Ruckeln.")]
spoken={"10.000":"zehntausend"}
out=[]
for a,b,txt in segs:
    ws=[w for w in txt.split() if w!="–"]; wt=[len(re.sub(r'\W','',spoken.get(w,w)))+2 for w in ws]; tot=sum(wt); t=a
    for w,k in zip(ws,wt):
        d=(b-a)*k/tot; out.append({"w":w,"s":round(t,3),"e":round(t+d,3)}); t+=d
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]=31.6
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words")
