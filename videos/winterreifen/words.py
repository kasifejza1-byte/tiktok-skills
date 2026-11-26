import json,re
segs=[(0.03,1.45,"Winterreifen brauchst du nur,"),(1.76,2.62,"wenn Schnee liegt."),(3.11,4.02,"Das stimmt nicht."),
(4.34,7.17,"Schon bei Kälte wird das Gummi eines Sommerreifens hart."),(7.72,8.94,"Dann rutscht er auch auf nasser,"),(9.21,10.66,"kalter Straße."),
(11.03,12.50,"Ein Winterreifen bleibt weich."),(12.83,14.01,"Und seine feinen Lamellen"),(14.25,15.84,"krallen sich in Schnee und Matsch."),
(16.13,18.84,"Jetzt bremsen beide aus Tempo fünfzig auf Schnee."),(19.38,21.78,"Der Winterreifen steht nach rund dreißig Metern."),
(22.22,23.10,"Der Sommerreifen"),(23.44,24.95,"braucht oft doppelt so viel."),(25.22,26.75,"Das sind sechs Autolängen mehr."),
(27.29,29.63,"Achte also auf das Schneeflocken-Symbol."),(29.96,31.59,"Folge für mehr Technik-Irrtümer.")]
out=[]
for a,b,txt in segs:
    ws=txt.split(); wt=[len(re.sub(r'\W','',w))+2 for w in ws]; tot=sum(wt); t=a
    for w,k in zip(ws,wt):
        d=(b-a)*k/tot; out.append({"w":w,"s":round(t,3),"e":round(t+d,3)}); t+=d
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]=33.0
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words")
