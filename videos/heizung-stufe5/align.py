import re,functools
v=list(map(float,open('sil.txt').read().split()))
sil=list(zip(v[0::2],v[1::2]))
segs=[];st=0.0
for a,b in sil: segs.append((st,a)); st=b
text="Halt, stopp! Scroll nicht weiter! Du drehst die Heizung auf fünf, damit es schneller warm wird? Falsch! Die Zahl ist nur die Zieltemperatur. Drei heißt etwa zwanzig Grad. Fünf heißt achtundzwanzig. Schneller warm wird's nicht. Nur teurer."
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
