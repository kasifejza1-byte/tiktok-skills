import json,re
segs=[(0.03,0.71,"Kassenbons"),(1.0,2.10,"werden mit Tinte gedruckt."),(2.58,3.28,"Das stimmt nicht."),
(3.57,4.65,"Du kriegst deinen Bon."),(5.0,6.64,"Doch der Drucker hat gar keine Tinte."),
(6.96,8.31,"Das Papier hat eine Schicht,"),(8.68,10.07,"die bei Hitze schwarz wird."),
(10.44,12.40,"Im Drucker werden winzige Punkte heiß,"),(12.71,13.79,"acht pro Millimeter."),
(14.28,14.98,"Teste es:"),(15.30,16.84,"Kratz mit dem Fingernagel drüber."),(17.13,18.31,"Reibung macht Hitze,"),
(18.66,20.20,"und zack, ein schwarzer Strich."),(20.68,21.78,"Darum verblasst er auch:"),(22.10,23.28,"im Dunkeln nach Jahren,"),
(23.56,25.0,"in der Sonne schon nach Wochen."),(25.56,27.62,"Wichtige Bons gleich abfotografieren."),
(27.94,29.71,"Denn dein Kassenbon wird nicht gedruckt."),(30.0,30.98,"Er wird getoastet."),
(31.13,32.23,"Das war drei von fünf."),(32.51,33.92,"Und zwei davon glaubst du noch.")]
out=[]
for a,b,txt in segs:
    ws=txt.split(); wt=[len(re.sub(r'\W','',w))+2 for w in ws]; tot=sum(wt); t=a
    for w,k in zip(ws,wt):
        d=(b-a)*k/tot; out.append({"w":w,"s":round(t,3),"e":round(t+d,3)}); t+=d
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]=34.6
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words")
