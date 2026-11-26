import re,functools
sil=[(2.11776,2.65039),(3.42501,3.74036),(5.0283,5.37998),(6.57941,6.88281),(7.66853,7.93753),(8.76558,9.38769),(10.7101,11.2546),(12.8247,13.2123),(14.2112,14.5799),(16.5849,16.9512),(20.0362,20.6848),(21.71,21.9358),(22.6531,23.3958),(24.5166,24.8844),(25.8571,26.6245),(26.8434,27.2858),(28.7713,29.1179),(30.5963,31.0873),(32.2082,32.4675),(33.5868,33.9245),(35.0901,35.5626),(36.541,36.9197)]
segs=[];st=0.0
for a,b in sil: segs.append((st,a)); st=b
text="Die Fliege kommt immer wieder, weil sie zu dumm ist. Das stimmt nicht. Für sie bist du ein Buffet. Dein Schweiß ist salzig, deine Haut riecht, und du bist warm. Und sie schmeckt mit den Füßen. Darum krabbelt sie auf dir herum. Du schlägst nach ihr, aber sie sieht deine Hand wie in Zeitlupe. Ihre Augen schaffen rund zweihundertfünfzig Bilder pro Sekunde. Du nur etwa sechzig. Sie fliegt weg. Aber dein Geruch bleibt. Also kommt sie zurück. Tipp: Stell einen Ventilator auf. Gegen Wind kann sie kaum landen. Die Fliege ist nicht dumm. Sie hat einfach Hunger. Irrtum eins von fünf. Vier glaubst du noch."
ws=text.split();L=[len(re.sub(r'\W','',w))+1 for w in ws]
n=len(ws);m=len(segs);R=sum(L)/sum(b-a for a,b in segs)
@functools.lru_cache(None)
def f(i,j):
    if j==m: return (0,()) if i==n else (1e9,())
    best=(1e9,())
    for k in range(i+1,n+1):
        if n-k<m-j-1: break
        c=sum(L[i:k]);d=segs[j][1]-segs[j][0];cost=(c/d-R)**2/R**2*d
        if not re.search(r'[.,:?]$',ws[k-1]) and k<n: cost+=0.6
        r=f(k,j+1)
        if r[0]+cost<best[0]: best=(r[0]+cost,((i,k),)+r[1])
    return best
c,parts=f(0,0)
for (i,k),(a,b) in zip(parts,segs): print(f"({a:.2f},{b:.2f},\"{' '.join(ws[i:k])}\"),")
