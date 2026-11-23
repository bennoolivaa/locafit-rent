import sys; sys.path.insert(0,'.')
from concepts import c1, c2, c3
P = [('Freccia a due tratti', 'Una sola freccia dipinta in due colpi, blu e rosso, che si incrociano in punta. Il punto verde è il cliente: parte da lì. È la più semplice e si legge anche piccolissima.', c1),
     ('L in avanti', 'La L di LOCAFIT dipinta a pennello: il piede corre in avanti come una strada. Dentro, la freccia rossa e il punto verde.', c2),
     ('Ruota in corsa', 'Il punto verde diventa una ruota che va avanti, con due pennellate di velocità dietro.', c3)]
def s(f, cls, **kw):
    if f is c3 and kw.get('navy') == '#fff': kw['gap'] = '#000'
    body, vb = f(**kw); return f'<svg class="{cls}" viewBox="{vb}" aria-hidden="true">{body}</svg>'
cards = ''
for i, (t, d, f) in enumerate(P, 1):
    cards += f'''<section class="pr">
  <div class="pr-h"><span>Proposta {i}</span><h2>{t}</h2><p>{d}</p></div>
  <div class="pr-big w">{s(f,'big')}</div>
  <div class="pr-big k">{s(f,'big', navy='#fff')}</div>
  <div class="pr-bar k"><span class="lk">{s(f,'m', navy='#fff')}<b>LOCAFIT</b><i>Rent</i></span></div>
  <div class="pr-bar w"><span class="lk">{s(f,'m')}<b>LOCAFIT</b><i>Rent</i></span></div>
  <div class="pr-ico"><div class="app">{s(f,'a', navy='#fff')}</div><div class="fav">{s(f,'f')}</div><div class="fav s">{s(f,'f')}</div><small>icona app · scheda del browser</small></div>
</section>'''
html = f'''<!doctype html>
<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>Proposte logo · LOCAFIT Rent</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500&display=swap" rel="stylesheet">
<style>
*{{box-sizing:border-box;margin:0}} body{{font:16px/1.5 Inter,system-ui,sans-serif;color:#333;background:#F4F4F4}}
header{{max-width:1180px;margin:0 auto;padding:56px 20px 8px}} header h1{{font:400 44px/1.1 'Source Serif 4',serif;color:#000}} header p{{margin-top:10px;color:#696969;max-width:640px}}
main{{max-width:1180px;margin:0 auto;padding:24px 20px 80px;display:grid;gap:28px}}
.pr{{background:#fff;border-radius:8px;padding:28px;display:grid;grid-template-columns:1fr 1fr;gap:16px}}
.pr-h{{grid-column:1/-1}} .pr-h span{{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#696969}} .pr-h h2{{font:400 30px/1.2 'Source Serif 4',serif;color:#000;margin-top:4px}} .pr-h p{{margin-top:6px;color:#696969;max-width:680px}}
.pr-big{{border-radius:6px;display:grid;place-items:center;aspect-ratio:16/10}} .w{{background:#fff;border:1px solid #E8E8E8}} .k{{background:#000}}
.big{{width:52%;height:auto}}
.pr-bar{{border-radius:6px;height:64px;display:flex;align-items:center;padding:0 22px}}
.lk{{display:inline-flex;align-items:center;gap:10px}} .lk .m{{height:30px;width:auto}} .lk b{{font:500 19px/1 'Source Serif 4',serif;letter-spacing:.05em}} .lk i{{font:500 11px/1 Inter,sans-serif;letter-spacing:.22em;text-transform:uppercase;font-style:normal;margin-left:-2px;padding-top:4px}}
.k .lk b{{color:#fff}} .k .lk i{{color:#9F9F9F}} .w .lk b{{color:#000}} .w .lk i{{color:#696969}}
.pr-ico{{grid-column:1/-1;display:flex;align-items:center;gap:18px;flex-wrap:wrap}} .pr-ico small{{color:#696969}}
.app{{width:72px;height:72px;border-radius:16px;background:#000;display:grid;place-items:center}} .app .a{{width:46px;height:auto}}
.fav{{width:32px;height:32px;display:grid;place-items:center;border:1px solid #E8E8E8;border-radius:6px;background:#fff}} .fav .f{{width:26px;height:auto}} .fav.s{{width:20px;height:20px;border:0}} .fav.s .f{{width:16px}}
@media (max-width:734px){{ .pr{{grid-template-columns:1fr;padding:18px}} header h1{{font-size:34px}} }}
</style></head><body>
<header><h1>Proposte logo</h1><p>Tre marchi nuovi, disegnati da zero nello stile del logo di Fausto: pennellate a mano, blu, rosso e il punto verde, tutto in movimento in avanti. Per ognuno: in grande, sulla barra nera del sito, su fondo bianco e come icona.</p></header>
<main>{cards}</main></body></html>'''
open(sys.argv[1], 'w').write(html)
