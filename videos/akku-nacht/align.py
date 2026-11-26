import re,functools
v=list(map(float,open('sil.txt').read().split()))
sil=list(zip(v[0::2],v[1::2]))
segs=[];st=0.0
for a,b in sil: segs.append((st,a)); st=b
text="Handy über Nacht laden macht den Akku kaputt. Das stimmt nicht. Du steckst abends dein Handy an und hast ein schlechtes Gewissen. Aber bei hundert Prozent stoppt ein Chip im Handy den Strom. Der Akku wird nicht überladen. Viele Handys halten nachts sogar bei achtzig Prozent an. Und laden erst kurz vor dem Aufstehen voll. Der echte Feind ist Hitze. Laut Apple sollte es um dein Handy nicht wärmer als fünfunddreißig Grad werden. Also: Nie unter dem Kissen laden. Dein Akku hat keine Angst vor der Nacht. Sondern vor Hitze. Irrtum eins von fünf. Vier glaubst du noch."
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
