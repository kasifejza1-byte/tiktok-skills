import json,re
segs=[(0.00,1.23,"In jedem Maiskorn"),(1.47,3.06,"steckt eine winzige Dampfbombe!"),(3.65,4.22,"Echt jetzt."),(4.53,5.15,"Guck mal rein:"),
(5.45,6.73,"Innen ist ein bisschen Wasser."),(7.07,9.00,"Drumherum eine superharte Schale."),(9.29,9.93,"Wird es heiß,"),(10.21,11.36,"wird das Wasser zu Dampf."),
(11.70,12.32,"Der will raus,"),(12.58,13.29,"kann aber nicht."),(13.59,15.54,"Der Druck wird größer und größer."),(15.89,17.48,"Bei rund 180 Grad:"),
(17.84,18.30,"PLOPP!"),(18.96,19.81,"Die Schale platzt."),(20.11,21.79,"Das Innere wird zu weißem Schaum,"),(22.10,23.59,"bis zu 40-mal so groß."),
(24.14,25.34,"Und Forscher haben gefilmt:"),(25.70,27.49,"Popcorn macht dabei einen Salto!"),(28.16,30.39,"Körner mit Riss platzen übrigens oft nicht."),
(30.75,32.04,"Da haut der Dampf vorher ab."),(32.42,34.97,"Schreib mal in die Kommentare: süß oder salzig?")]
spoken={"180":"hundertachtzig","40-mal":"vierzigmal"}
out=[]
for a,b,txt in segs:
    ws=txt.split(); wt=[len(re.sub(r'\W','',spoken.get(w,w)))+2 for w in ws]; tot=sum(wt); t=a
    for w,k in zip(ws,wt):
        d=(b-a)*k/tot; out.append({"w":w,"s":round(t,3),"e":round(t+d,3)}); t+=d
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]=35.3
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words")
