"""Presentazione PDF delle proposte di logo (A4 orizzontale): copertina, una pagina per proposta, come scegliere.
Uso: python3 pdf.py out.html  -> poi stampa con Chrome headless."""
import sys
sys.path.insert(0, '.')
from concepts import c1, c2, c3

P = [
    ('Freccia a due tratti', c1,
     'Una sola freccia, dipinta in due colpi di pennello: il blu scende, il rosso riparte. I due tratti si incontrano in punta, nel punto in cui si parte. Il punto verde è il cliente: tutto comincia da lui.',
     ['È la più semplice: si riconosce anche piccolissima, come icona sul telefono.',
      'Dice movimento in avanti e pronta consegna, senza disegnare un’auto.',
      'Resta uguale su fondo bianco e su fondo nero.'],
     'La freccia è un segno molto usato: a renderla nostra sono il pennello e il punto verde.'),
    ('L in avanti', c2,
     'La L di LOCAFIT, scritta a pennello. La base si allunga in avanti come una strada. Dentro, la freccia rossa indica la partenza e il punto verde è il cliente.',
     ['Contiene l’iniziale del nome: è il marchio più “nostro”.',
      'La strada parla di auto e di viaggio senza disegnare un’auto.',
      'Ha una forma quasi quadrata: ottima come icona dell’app.'],
     'Ha più elementi: da piccolissima è meno immediata della proposta 1.'),
    ('Ruota in corsa', c3,
     'Il punto verde diventa una ruota che corre in avanti, con due pennellate di velocità dietro, una blu e una rossa.',
     ['È la più dinamica: dice subito “si parte”.',
      'È orizzontale e si affianca bene alla scritta.',
      'È diversa da quella di qualunque altro noleggio.'],
     'È molto larga: come icona quadrata va rimpicciolita.'),
]


def s(f, cls, dark=False):
    kw = {'navy': '#fff'} if dark else {}
    if f is c3 and dark: kw['gap'] = '#000'
    body, vb = f(**kw)
    return f'<svg class="{cls}" viewBox="{vb}" aria-hidden="true">{body}</svg>'


def lockup(f, dark):
    return f'<span class="lk">{s(f, "m", dark)}<b>LOCAFIT</b><i>Rent</i></span>'


pages = []
pages.append(f'''<section class="pg cover">
  <div class="cv-top"><span class="kick">LOCAFIT Rent · Noleggio auto breve, medio e lungo termine</span></div>
  <div class="cv-mid">
    <h1>Proposte di logo</h1>
    <p>Tre marchi nuovi, disegnati da zero: pennellate a mano, blu, rosso e il punto verde, tutto in movimento in avanti.</p>
  </div>
  <div class="cv-row">{''.join(f'<div><span>{i}</span>{s(f, "cvm")}<em>{t}</em></div>' for i, (t, f, *_) in enumerate(P, 1))}</div>
  <div class="cv-foot"><span>Novembre 2026</span><span>La scritta è la stessa per tutte: LOCAFIT in carattere con grazie, RENT spaziato.</span></div>
</section>''')

for i, (t, f, idea, pro, nota) in enumerate(P, 1):
    pages.append(f'''<section class="pg prop">
  <div class="txt">
    <span class="kick">Proposta {i} di 3</span>
    <h2>{t}</h2>
    <p class="idea">{idea}</p>
    <h3>Perché funziona</h3>
    <ul>{''.join(f'<li>{x}</li>' for x in pro)}</ul>
    <h3>Da tenere presente</h3>
    <p class="nota">{nota}</p>
  </div>
  <div class="vis">
    <div class="big">{s(f, "bm")}</div>
    <div class="bars">
      <div class="bar k">{lockup(f, True)}</div>
      <div class="bar w">{lockup(f, False)}</div>
    </div>
    <div class="ico">
      <div class="app">{s(f, "am", True)}</div>
      <div class="fav">{s(f, "fm")}</div>
      <div class="lab">Sulla barra del sito (nero e bianco) · icona dell’app · scheda del browser</div>
    </div>
  </div>
</section>''')

pages.append('''<section class="pg end">
  <span class="kick">Come scegliere</span>
  <h2>Ci basta un numero.</h2>
  <ol>
    <li><b>Scegliete una proposta: 1, 2 o 3.</b> Se vi piacciono pezzi di più proposte, ditelo: si possono combinare.</li>
    <li><b>Tutto è ritoccabile.</b> Tonalità dei colori, spessore delle pennellate, posizione del punto verde, carattere della scritta.</li>
    <li><b>Poi preparo i file definitivi:</b> logo in vettoriale, versione per fondi scuri, icona dell’app, favicon, biglietto da visita e grafiche per i social.</li>
  </ol>
  <p class="sito">Nel sito di prova è già montata la proposta 1 come esempio: bennoolivaa.github.io/locafit-rent</p>
</section>''')

CSS = r"""
@page { size: 297mm 210mm; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font: 11pt/1.5 Inter, system-ui, sans-serif; color: #333; }
.pg { width: 297mm; height: 210mm; padding: 18mm 20mm; page-break-after: always; break-after: page; position: relative; overflow: hidden; }
.pg:last-child { page-break-after: auto; break-after: auto; }
.kick { font-size: 8.5pt; letter-spacing: .14em; text-transform: uppercase; color: #696969; }
h1, h2 { font-family: 'Source Serif 4', serif; font-weight: 400; color: #000; letter-spacing: -.01em; }
/* copertina */
.cover { background: #000; color: #9F9F9F; display: flex; flex-direction: column; }
.cover .kick { color: #9F9F9F; }
.cv-mid { margin-top: 22mm; }
.cover h1 { color: #fff; font-size: 54pt; line-height: 1.02; }
.cover .cv-mid p { margin-top: 6mm; max-width: 165mm; font-size: 14pt; line-height: 1.45; color: #C8C8C8; }
.cv-row { margin-top: auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8mm; }
.cv-row > div { background: #fff; border-radius: 3mm; height: 42mm; display: grid; place-items: center; position: relative; }
.cv-row span { position: absolute; top: 3mm; left: 4mm; font-size: 9pt; color: #696969; }
.cv-row em { position: absolute; bottom: 3mm; left: 4mm; font-style: normal; font-size: 9pt; color: #333; }
.cvm { height: 22mm; width: auto; }
.cv-foot { margin-top: 7mm; display: flex; justify-content: space-between; font-size: 9pt; }
/* proposta */
.prop { display: grid; grid-template-columns: 96mm 1fr; gap: 14mm; }
.txt h2 { font-size: 30pt; line-height: 1.1; margin-top: 3mm; }
.idea { margin-top: 5mm; font-size: 12pt; line-height: 1.5; color: #333; }
.txt h3 { margin-top: 7mm; font-size: 8.5pt; letter-spacing: .14em; text-transform: uppercase; color: #000; font-weight: 600; }
.txt ul { margin-top: 2.5mm; list-style: none; }
.txt li { position: relative; padding-left: 5mm; margin-top: 1.8mm; font-size: 10.5pt; }
.txt li::before { content: ''; position: absolute; left: 0; top: 2.3mm; width: 2mm; height: 2mm; border-radius: 50%; background: #2BA84A; }
.nota { margin-top: 2.5mm; font-size: 10.5pt; color: #696969; }
.vis { display: grid; grid-template-rows: 1fr auto auto; gap: 5mm; min-height: 0; }
.big { border: .3mm solid #E8E8E8; border-radius: 3mm; display: grid; place-items: center; min-height: 0; }
.bm { height: 58mm; width: auto; max-width: 80%; }
.bars { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; }
.bar { height: 17mm; border-radius: 2.5mm; display: flex; align-items: center; padding: 0 6mm; }
.bar.k { background: #000; } .bar.w { border: .3mm solid #E8E8E8; }
.lk { display: inline-flex; align-items: center; gap: 2.6mm; }
.lk .m { height: 8mm; width: auto; }
.lk b { font: 500 14pt/1 'Source Serif 4', serif; letter-spacing: .05em; }
.lk i { font: 500 7.5pt/1 Inter, sans-serif; font-style: normal; letter-spacing: .22em; text-transform: uppercase; margin-left: -.4mm; padding-top: .8mm; }
.k .lk b { color: #fff; } .k .lk i { color: #9F9F9F; } .w .lk b { color: #000; } .w .lk i { color: #696969; }
.ico { display: flex; align-items: center; gap: 5mm; }
.app { width: 17mm; height: 17mm; border-radius: 4mm; background: #000; display: grid; place-items: center; }
.am { width: 11mm; height: auto; }
.fav { width: 9mm; height: 9mm; border: .3mm solid #E8E8E8; border-radius: 1.5mm; display: grid; place-items: center; }
.fm { width: 6.5mm; height: auto; }
.lab { font-size: 8.5pt; color: #696969; }
/* fine */
.end h2 { font-size: 40pt; margin-top: 4mm; }
.end ol { margin-top: 12mm; list-style: none; counter-reset: n; max-width: 200mm; }
.end li { counter-increment: n; position: relative; padding-left: 14mm; margin-top: 7mm; font-size: 13pt; line-height: 1.5; }
.end li::before { content: counter(n); position: absolute; left: 0; top: -1mm; width: 9mm; height: 9mm; border-radius: 50%; background: #000; color: #fff; display: grid; place-items: center; font-size: 11pt; }
.end li b { color: #000; font-weight: 600; }
.sito { position: absolute; left: 20mm; bottom: 18mm; font-size: 9.5pt; color: #696969; }
"""

html = f'''<!doctype html><html lang="it"><head><meta charset="utf-8"><title>LOCAFIT Rent · Proposte di logo</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body>{''.join(pages)}</body></html>'''
open(sys.argv[1], 'w').write(html)
