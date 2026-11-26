import re,functools
sil=[(1.23431,1.46522),(3.05526,3.6529),(4.21644,4.52805),(5.14982,5.44952),(6.73431,7.07202),(9.00356,9.28517),(9.93014,10.2146),(11.361,11.6986),(12.3235,12.5807),(13.2933,13.5933),(15.5432,15.8874),(17.479,17.8352),(18.2956,18.9607),(19.8101,20.1118),(21.7885,22.1035),(23.5943,24.1388),(25.3439,25.6997),(27.4895,28.1588),(30.3932,30.7507),(32.0426,32.4239),(34.9719,35.2479)]
segs=[];st=0.0
for a,b in sil: segs.append((st,a)); st=b
text="In jedem Maiskorn steckt eine winzige Dampfbombe! Echt jetzt. Guck mal rein: Innen ist ein bisschen Wasser. Drumherum eine superharte Schale. Wird es heiß, wird das Wasser zu Dampf. Der will raus, kann aber nicht. Der Druck wird größer und größer. Bei rund hundertachtzig Grad: PLOPP! Die Schale platzt. Das Innere wird zu weißem Schaum, bis zu vierzigmal so groß. Und Forscher haben gefilmt: Popcorn macht dabei einen Salto! Körner mit Riss platzen übrigens oft nicht. Da haut der Dampf vorher ab. Schreib mal in die Kommentare: süß oder salzig?"
ws=text.split();L=[len(re.sub(r'\W','',w))+1 for w in ws]
n=len(ws);m=len(segs);R=sum(L)/sum(b-a for a,b in segs)
@functools.lru_cache(None)
def f(i,j):
    if j==m: return (0,()) if i==n else (1e9,())
    best=(1e9,())
    for k in range(i+1,n+1):
        if n-k<m-j-1: break
        c=sum(L[i:k]);d=segs[j][1]-segs[j][0];cost=(c/d-R)**2/R**2*d
        if not re.search(r'[.,:?!]$',ws[k-1]) and k<n: cost+=0.6
        r=f(k,j+1)
        if r[0]+cost<best[0]: best=(r[0]+cost,((i,k),)+r[1])
    return best
c,parts=f(0,0)
for (i,k),(a,b) in zip(parts,segs): print(f"({a:.2f},{b:.2f},\"{' '.join(ws[i:k])}\"),")
