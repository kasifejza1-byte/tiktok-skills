import json,re
segs=[(0.05,1.47,"Betrunken wirst du nicht im Bauch."),(2.00,2.79,"Sondern im Kopf."),
(3.71,6.37,"Schon nach wenigen Minuten ist der Alkohol in deinem Blut."),(6.62,7.24,"Und das Blut"),(7.59,8.88,"bringt ihn direkt ins Gehirn."),
(9.51,11.04,"Dort bremst er deine Nervenzellen."),(11.40,12.70,"Wie ein Fuß auf der Bremse."),
(13.19,14.78,"Zuerst trifft es deine Vorsicht."),(15.31,16.22,"Du wirst lauter"),(16.57,17.39,"und mutiger."),
(18.13,19.20,"Dann das Kleinhirn."),(20.03,21.23,"Du schwankst und lallst."),
(21.50,23.90,"Gleichzeitig lässt deine Niere mehr Wasser raus."),(24.55,24.96,"Darum"),(25.13,26.29,"musst du ständig aufs Klo."),
(27.14,28.02,"Und deine Leber?"),(28.52,30.09,"Sie baut nur etwa"),(30.51,32.07,"0,1 Promille pro Stunde ab."),
(33.01,35.75,"Kaffee oder eine kalte Dusche ändern daran nichts."),(36.35,37.96,"Nur Zeit macht dich wieder nüchtern."),
(38.83,40.58,"Folge für mehr Körper-Geheimnisse.")]
spoken={"0,1":"nullkommaeins"}
out=[]
for a,b,txt in segs:
    ws=txt.split(); wt=[len(re.sub(r'\W','',spoken.get(w,w)))+2 for w in ws]; tot=sum(wt); t=a
    for w,k in zip(ws,wt):
        d=(b-a)*k/tot; out.append({"w":w,"s":round(t,3),"e":round(t+d,3)}); t+=d
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]=42.0
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words")
