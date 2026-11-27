import json,re
segs=[(0.05,2.42,"Delfine schlafen mit einem offenen Auge!"),(2.75,4.31,"Und mit einem halben Gehirn."),(4.62,5.34,"Wirklich!"),
(5.75,8.11,"Delfine atmen nämlich nicht automatisch."),(8.39,10.63,"Sie müssen jedes Mal selbst daran denken."),
(11.05,13.64,"Würden sie tief schlafen, würden sie keine Luft holen."),(13.98,16.39,"Deshalb schläft immer nur eine Hälfte vom Gehirn."),
(16.73,17.99,"Die andere passt auf:"),(18.31,21.50,"Sie atmet, guckt nach Haien und bleibt bei der Familie."),(21.91,23.18,"Danach wird getauscht."),
(23.54,27.05,"Bei einem Test blieb ein Delfin so 15 Tage lang wachsam!"),(27.51,29.30,"Mit welchem Auge würdest du schlafen?"),(29.58,30.85,"Schreib's in die Kommentare!")]
spoken={"15":"fünfzehn"}
out=[]
for si,(a,b,txt) in enumerate(segs):
    ws=txt.split(); wt=[len(re.sub(r'\W','',spoken.get(w,w)))+2 for w in ws]; tot=sum(wt); t=a
    for w,k in zip(ws,wt):
        d=(b-a)*k/tot; out.append({"w":w,"s":round(t,3),"e":round(t+d,3),"g":si}); t+=d
for i in range(len(out)-1): out[i]["e"]=max(out[i]["e"],min(out[i+1]["s"],out[i]["e"]+0.35))
out[-1]["e"]=32.6
json.dump(out,open("words.json","w"),ensure_ascii=False); print(len(out),"words")
