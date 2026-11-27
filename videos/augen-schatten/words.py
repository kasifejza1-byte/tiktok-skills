import json,re
segs=[(0.00,1.50,"Deine Augen zeigen dir genau,"),(1.71,2.71,"was wirklich da ist."),(2.80,3.57,"Das stimmt nicht."),
(3.86,5.78,"Schau dir Feld A und Feld B an."),(6.14,6.93,"A ist dunkel."),(7.30,8.01,"B ist hell."),(8.48,8.96,"Oder?"),
(9.47,10.00,"Falsch."),(10.38,12.28,"Beide haben exakt dieselbe Farbe."),(12.82,14.36,"Ich verbinde sie mal mit einem Balken."),
(14.63,15.17,"Siehst du?"),(15.42,16.26,"Kein Unterschied."),(16.58,17.57,"Dein Gehirn weiß:"),(17.74,19.21,"Im Schatten wird alles dunkler."),
(19.44,20.55,"Also hellt es B"),(20.79,22.02,"heimlich für dich auf."),(22.22,24.25,"Das hat der Forscher Edward Adelson"),
(24.46,27.25,"schon 1995 gezeigt."),(27.49,28.84,"Du siehst nicht mit den Augen."),(29.14,30.36,"Du siehst mit dem Gehirn."),
(30.63,31.78,"Irrtum 1 von 5."),(32.07,33.07,"Vier glaubst du noch.")]
spoken={"1995":"neunzehnhundertfünfundneunzig","1":"eins","5":"fünf"}
out=[]
for a,b,txt in segs:
    ws=txt.split(); wt=[len(re.sub(r'\W','',spoken.get(w,w)))+2 for w in ws]; tot=sum(wt); t=a
    for w,k in zip(ws,wt):
        d=(b-a)*k/tot; out.append({"w":w,"s":round(t,3),"e":round(t+d,3)}); t+=d
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]=33.6
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words")
