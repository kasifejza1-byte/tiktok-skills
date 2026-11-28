import json,re
b=[(0,2.87),(3.47,4.61),(5.45,6.53),(6.85,7.75),(8.09,9.90),(10.80,13.10),(13.32,14.27),(14.69,16.62),(16.90,18.32),(18.68,19.87),(20.22,20.82),(21.19,22.95),(23.39,24.56),(25.05,26.47),(26.79,28.64),(29.05,31.10),(31.39,32.86),(33.26,33.73),(33.92,34.76),(35.12,36.32),(36.63,37.89),(38.16,39.16),(39.66,40.24),(40.59,41.61),(42.14,43.25),(43.63,46.29),(46.72,49.24),(49.52,51.45),(51.89,54.13),(54.68,56.90),(57.44,58.12),(58.65,59.61),(59.98,62.13)]
T=["Drei Männer räumen über Weihnachten eine ganze Bank aus.","Und keiner merkt es.","Gelsenkirchen-Buer,","Ende Dezember","2025.","Die Täter kommen aus einer Tiefgarage nebenan","in einen Archivraum.","Von dort bohren sie mit einem Kernbohrer","ein Loch durch die Betonwand.","Direkt in den Tresorraum.","Dahinter:","über 3.000 Schließfächer.","Sie knacken fast alle.","Zeugen sehen nachts Männer","mit großen Taschen im Treppenhaus.","Eine Kamera filmt einen schwarzen Audi","mit gestohlenem Kennzeichen.","Darin:","Maskierte.","Erst am Montagmorgen","geht ein Feueralarm los.","Da sind sie längst weg.","Die Beute?","Die Polizei sagt:","über 10 Millionen.","Schätzungen gehen bis über 100 Millionen Euro.","Über 2.500 Kunden sind betroffen.","Viele stürmen verzweifelt die Filiale.","Versichert ist pro Fach oft nur ein Bruchteil.","Über 200 Ermittler suchen die Täter.","Festnahmen?","Bisher keine bekannt.","Folg mir, wenn du wissen willst, wie es weitergeht."]
assert len(b)==len(T)
sp={"2025":"zweitausendfünfundzwanzig","3.000":"dreitausend","10":"zehn","100":"hundert","2.500":"zweitausendfünfhundert","200":"zweihundert"}
out=[]
for (a,e),txt in zip(b,T):
    ws=txt.split(); wt=[len(re.sub(r'\W','',sp.get(w.strip('.,:?'),w)))+2 for w in ws]; tot=sum(wt); t=a
    for w,k in zip(ws,wt):
        d=(e-a)*k/tot; out.append({"w":w,"s":round(t,3),"e":round(t+d,3)}); t+=d
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]=62.6
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words")
