import json,re
segs=[(0.00,2.10,"Handy über Nacht laden macht den Akku kaputt."),(2.49,3.35,"Das stimmt nicht."),(3.82,5.38,"Du steckst abends dein Handy an"),
(5.86,7.42,"und hast ein schlechtes Gewissen."),(7.92,9.18,"Aber bei 100 Prozent"),(9.58,11.39,"stoppt ein Chip im Handy den Strom."),
(12.07,13.42,"Der Akku wird nicht überladen."),(13.86,15.24,"Viele Handys halten nachts"),(15.65,17.32,"sogar bei 80 Prozent an."),
(17.89,19.89,"Und laden erst kurz vor dem Aufstehen voll."),(20.38,21.96,"Der echte Feind ist Hitze."),(22.50,23.16,"Laut Apple"),
(23.46,24.98,"sollte es um dein Handy"),(25.23,27.55,"nicht wärmer als 35 Grad werden."),(28.18,28.59,"Also:"),(28.89,30.31,"Nie unter dem Kissen laden."),
(30.66,32.56,"Dein Akku hat keine Angst vor der Nacht."),(32.80,33.80,"Sondern vor Hitze."),(34.04,35.21,"Irrtum 1 von 5."),(35.44,36.42,"Vier glaubst du noch.")]
spoken={"100":"hundert","80":"achtzig","35":"fünfunddreißig","1":"eins","5":"fünf"}
out=[]
for a,b,txt in segs:
    ws=txt.split(); wt=[len(re.sub(r'\W','',spoken.get(w,w)))+2 for w in ws]; tot=sum(wt); t=a
    for w,k in zip(ws,wt):
        d=(b-a)*k/tot; out.append({"w":w,"s":round(t,3),"e":round(t+d,3)}); t+=d
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]=36.8
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words")
