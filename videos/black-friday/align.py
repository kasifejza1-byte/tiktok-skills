import re
sil=[(0.89805,1.27268),(3.2312,3.62982),(4.49118,4.89517),(5.97249,6.25279),(8.01617,8.22247),(9.30728,9.66512),(11.3725,11.6346),(12.4542,12.8052),(13.8226,14.1542),(15.7497,15.9722),(18.4071,19.0125),(19.7147,19.9344),(20.9576,21.1868),(23.5572,23.96),(25.1627,25.3795),(26.3065,26.5488),(27.4381,28.0017),(28.4621,28.8016),(31.1383,31.4684),(33.0541,33.3755),(34.4683,34.7789),(35.951,36.2469),(37.1831,37.4495)]
segs=[];st=0.0
for a,b in sil: segs.append((st,a)); st=b
text="Am Black Friday ist Technik so billig wie sonst nie im Jahr. Das stimmt nicht. Du siehst einen Fernseher: neunhundert Euro durchgestrichen, jetzt nur sechshundert. Aber der Streichpreis ist oft nur die U-V-P. Die zahlt kaum jemand. Das Vergleichsportal idealo hat letztes Jahr zehntausend Produkte geprüft. Ergebnis: Mehr als die Hälfte war an einem anderen Novembertag schon günstiger. Und gegenüber Oktober sparst du im Schnitt nur acht Prozent. Also: Vor dem Kauf immer den Preisverlauf checken. Black Friday ist kein Spartag, sondern ein Werbetag. Irrtum eins von fünf. Vier glaubst du noch."
ws=text.split();L=[len(re.sub(r'\W','',w))+1 for w in ws]
n=len(ws);m=len(segs);R=sum(L)/sum(b-a for a,b in segs)
import functools
@functools.lru_cache(None)
def f(i,j):
    if j==m: return (0,()) if i==n else (1e9,())
    best=(1e9,())
    for k in range(i+1,n+1):
        if n-k<m-j-1: break
        c=sum(L[i:k]);d=segs[j][1]-segs[j][0];cost=(c/d-R)**2/R**2*d
        if not re.search(r'[.,:?]$',ws[k-1]) and k<n: cost+=0.6
        r=f(k,j+1);
        if r[0]+cost<best[0]: best=(r[0]+cost,((i,k),)+r[1])
    return best
c,parts=f(0,0)
for (i,k),(a,b) in zip(parts,segs): print(f"({a:.2f},{b:.2f},\"{' '.join(ws[i:k])}\"),")
