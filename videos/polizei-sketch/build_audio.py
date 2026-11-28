# Baut den Dialog aus Einzelzeilen: Stille kürzen, Tempo 1.12, Zeitplan -> timeline.json + dialog.wav
import json, subprocess
L=[("L01","F","Bro… ist dir mal aufgefallen… Bäume sind eigentlich… stehender Brokkoli?",0.4),
   ("L02","D","Alter… das ist so tief.",0.3),
   ("SIREN","S","",0.15),
   ("L03","P","Guten Abend. Polizeiliche Kontrolle. Wo wollen Sie hin?",0.35),
   ("L04","D","… Nach vorne.",0.45),
   ("L05","P","Wie heißen Sie?",0.25),
   ("L06","F","Ähm… kann ich einen Joker nehmen?",0.45),
   ("L07","P","Haben Sie etwas getrunken oder geraucht?",0.25),
   ("L08","D","Nur Luft. Sehr… viel… Luft.",0.45),
   ("L09","P","Und warum sind Ihre Augen so rot?",0.25),
   ("L10","F","Wir haben die ganze Zeit… an SIE gedacht, Herr Polizei.",0.45),
   ("L11","P","Welcher Tag ist heute?",0.3),
   ("L12","D","Heute.",0.6),
   ("L13","P","Okay. Sie beide kommen mit auf die Wache.",0.25),
   ("L14","F","Gibt's da Snacks?",0.35),
   ("L15","P","… Ja. Kekse.",0.25),
   ("L16","F","LET'S GOOO!",0.0)]
def dur(f): return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f]).decode())
t=0.3; tl=[]; inputs=[]; filt=[]
for i,(k,spk,txt,gap) in enumerate(L):
    src="audio/siren.mp3" if k=="SIREN" else f"audio/{k}.mp3"; out=f"audio/c_{k}.wav"
    af="volume=0.5" if k=="SIREN" else ("silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,"
        "silenceremove=stop_periods=-1:stop_duration=0.45:stop_threshold=-45dB:stop_silence=0.3,atempo=1.12")
    subprocess.run(["ffmpeg","-y","-loglevel","error","-i",src,"-af",af,"-ar","44100","-ac","1",out],check=True)
    d=dur(out); tl.append({"k":k,"spk":spk,"text":txt,"s":round(t,3),"e":round(t+d,3)})
    inputs+=["-i",out]; filt.append(f"[{i}]adelay={int(t*1000)}|{int(t*1000)}[a{i}]"); t+=d+gap
n=len(L); filt.append("".join(f"[a{i}]" for i in range(n))+f"amix=inputs={n}:duration=longest:normalize=0[o]")
subprocess.run(["ffmpeg","-y","-loglevel","error",*inputs,"-filter_complex",";".join(filt),"-map","[o]","voice.wav"],check=True)
json.dump(tl,open("timeline.json","w"),ensure_ascii=False,indent=0); print("Ende Dialog:",round(t,2))
