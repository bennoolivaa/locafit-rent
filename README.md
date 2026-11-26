# LocaFit Rent — prototipo sito

Demo del sito di noleggio auto LocaFit Rent (breve, medio e lungo termine, pratica 100% online).
Sito statico: HTML, CSS e JavaScript senza dipendenze né build.

## Online

https://bennoolivaa.github.io/locafit-rent/

## Avvio in locale

```bash
php -S localhost:8110
```

oppure qualsiasi server statico nella cartella del progetto, poi apri `http://localhost:8110`.

## Pagine

- `index.html` — home
- `flotta.html`, `auto.html?id=…` — flotta e scheda auto (configuratore, tour 3D)
- `offerte.html` — promozioni e codici
- `breve-termine.html`, `medio-termine.html`, `lungo-termine.html` — formule con calcolatore
- `prenota.html` — noleggio online simulato in 8 passaggi (dati, documenti, verifica, firma OTP, pagamento, consegna)
- `area.html` — area personale
- `gestionale.html` — gestionale per lo staff (link "Area staff" nel footer): panoramica, prenotazioni e contratti, planning flotta, consegne e ritiri con check-in/check-out, flotta e scadenze, clienti, richieste, pagamenti e solleciti, officina, multe e sinistri, listino e codici sconto. Demo: i dati restano nel browser (localStorage); i noleggi completati su `prenota.html` arrivano qui da confermare.
- `aziende.html`, `come-funziona.html`, `chi-siamo.html`, `faq.html`, `contatti.html`

## Dati

Flotta, prezzi, sedi, promozioni e FAQ sono in `assets/js/data.js`.
Tutti i dati (prezzi, recensioni, contatti, numero WhatsApp) sono **di esempio**.
La procedura di noleggio è una simulazione: nessun dato viene inviato e nessun pagamento avviene.

## Immagini

Foto da Wikimedia Commons (licenze Creative Commons), scontornate; modelli 3D da Sketchfab.
Fonti in `CREDITI-FOTO.md`. Vanno sostituite o licenziate prima della pubblicazione.

## Documenti

- `docs/ux-audit.md` — audit UI/UX (posizione dei pulsanti, percorsi, decisioni del redesign).
