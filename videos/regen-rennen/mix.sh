# Stimme vorne, Musik leise im Hintergrund mit Ducking
D=${1:-39.6}
ffmpeg -y -loglevel error -i voice.mp3 -i music.mp3 -filter_complex "\
[0]loudnorm=I=-15:TP=-1.5:LRA=11,apad=whole_dur=$D,asplit=2[v][sc];\
[1]atrim=0:$D,volume=0.16,afade=t=in:d=0.6,afade=t=out:st=$(echo "$D-1.6"|bc):d=1.6[m];\
[m][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[md];\
[v][md]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95" -c:a aac -b:a 192k mix.m4a
