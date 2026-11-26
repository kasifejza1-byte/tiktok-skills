import json,re
segs=[(0.05,2.51,"Stell dir vor, du hättest drei Herzen!"),(2.89,4.73,"Der Oktopus hat genau das."),
(5.13,7.93,"Zwei kleine Herzen pumpen Blut durch seine Kiemen."),(8.25,10.78,"Das große Herz versorgt den ganzen Körper."),
(11.21,12.57,"Und jetzt wird's verrückt:"),(12.98,14.52,"Sein Blut ist blau!"),(14.89,16.90,"Darin steckt nämlich Kupfer statt Eisen."),
(17.29,18.06,"Noch krasser:"),(18.40,21.42,"Wenn er schwimmt, hört das große Herz kurz auf zu schlagen."),
(21.74,24.08,"Deshalb krabbelt er lieber über den Meeresboden."),(24.37,27.55,"Und seine acht Arme können sogar schmecken!"),
(28.02,30.02,"Welches Tier soll ich dir als Nächstes zeigen?"),(30.26,31.43,"Schreib's in die Kommentare!")]
out=[]
for si,(a,b,txt) in enumerate(segs):
    ws=txt.split(); wt=[len(re.sub(r'\W','',w))+2 for w in ws]; tot=sum(wt); t=a
    for w,k in zip(ws,wt):
        d=(b-a)*k/tot; out.append({"w":w,"s":round(t,3),"e":round(t+d,3),"g":si}); t+=d
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]=33.2
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words")
