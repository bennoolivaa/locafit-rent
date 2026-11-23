# Audit UI/UX — LocaFit Rent (prototipo v3)

Data: 23 novembre 2026 · Ambito: tutte le pagine, desktop (1440 px) e telefono (390 px).
Riferimenti: apple.com/it, tesla.com/it_it, driverevel.com/it.

## Metodo

Ogni schermata è stata valutata su cinque criteri:

1. **Una sola azione principale per schermata.** Se due pulsanti pieni competono, l’utente esita (legge di Hick).
2. **Il pulsante sta dove nasce la decisione.** Prezzo e "Noleggia" devono essere vicini; più strada c’è, più abbandoni.
3. **Zona del pollice su telefono.** Le azioni frequenti stanno nella metà bassa dello schermo, raggiungibili con una mano.
4. **Etichette coerenti.** Lo stesso testo deve portare sempre nello stesso posto.
5. **Bersagli comodi.** Almeno 44×44 px, distanziati (legge di Fitts).

Gravità: **Alta** = blocca o fa perdere clienti · **Media** = rallenta o confonde · **Bassa** = rifinitura.

## Problemi trovati

| # | Pagina | Problema | Gravità | Decisione |
|---|---|---|---|---|
| 1 | Flotta (telefono) | I filtri laterali spariscono sotto i 1100 px: da telefono non si può filtrare per sede, alimentazione, prezzo. | **Alta** | Pulsante **"Filtri"** fisso nella barra, che apre un pannello dal basso con tutti i filtri e "Mostra N auto". |
| 2 | Scheda auto (telefono) | Il pulsante "Noleggia" è a più di uno schermo di distanza dalla foto: chi guarda l’auto non vede né prezzo né azione. | **Alta** | **Barra fissa in basso** (stile Tesla) con prezzo aggiornato e "Noleggia". |
| 3 | Home, hero | Due pulsanti principali in competizione: "Noleggia online" sull’auto e "Mostra le auto" nella ricerca. | **Alta** | Hero con **un messaggio e due pulsanti gerarchici** (stile Apple): pieno "Scegli l’auto", contorno "Come funziona". La ricerca scende sotto, come strumento. |
| 4 | Tutto il sito | "Noleggia online" porta a volte alla flotta, a volte alla prenotazione. | **Media** | Etichette fisse: **"Scegli l’auto"** → flotta · **"Noleggia"** → prenotazione di quell’auto · **"Scopri"** → scheda. |
| 5 | Header | 8 voci + 3 azioni: troppe scelte, la voce "Offerte" si perde. | **Media** | 6 voci (Flotta, Offerte, Noleggio ▸ breve/medio/lungo, Aziende, Come funziona, Assistenza) + account + "Scegli l’auto". |
| 6 | Card auto | Tre bersagli in una card (card, WhatsApp, freccia): WhatsApp ripetuto 45 volte fa rumore e il tocco sbagliato è facile. | **Media** | Card cliccabile + **due pulsanti testuali** stile Tesla: "Noleggia" (pieno) e "Scopri" (contorno). WhatsApp resta solo nel pulsante flottante e in scheda. |
| 7 | Card auto | Una sola foto per auto: non si capisce com’è dietro né dentro. | **Media** | Galleria in scheda (fronte, retro, interni, foto in strada) e passaggio fronte→retro al passaggio del mouse sulle card su desktop. |
| 8 | Prenotazione (telefono) | Il riepilogo con il prezzo sta in fondo, sotto il passaggio. | **Media** | Riepilogo compatto **fisso in alto** (auto + totale) che si apre al tocco. |
| 9 | Prenotazione | I pulsanti demo ("Compila con dati demo", "usa documenti di esempio") stanno tra Indietro e Continua: sembrano azioni reali. | **Media** | Spostati in una riga discreta **"Modalità presentazione"** sopra il passaggio. |
| 10 | Home | La formula (Breve/Medio/Lungo) cambia i prezzi della hero ma sta nella barra di ricerca: il legame non si vede. | **Bassa** | Selettore formula sopra la griglia delle auto, vicino ai prezzi che cambia. |
| 11 | Tutto il sito | Etichette in monospaziato grigio su nero sotto il contrasto minimo (≈3,6:1). | **Bassa** | Tema chiaro con testo #1D1D1F su #FFFFFF/#F5F5F7 (contrasto > 12:1). |
| 12 | Pulsante WhatsApp flottante | Su telefono copre il prezzo nell’ultima card visibile. | **Bassa** | Si alza quando compare la barra fissa e lascia 16 px di margine. |

## Cosa funziona già (da tenere)

- Percorso di prenotazione in 8 passaggi con stato chiaro e possibilità di tornare indietro.
- Prezzi sempre "IVA inclusa" e prezzo barrato visibile nelle promozioni.
- Area personale con azioni rapide (prolunga, cambia auto, guasto).
- Testi: frasi brevi, tono diretto, nessun asterisco.

## Mappa delle azioni dopo il redesign

| Contesto | Azione principale (pieno) | Azione secondaria (contorno/testo) |
|---|---|---|
| Header | Scegli l’auto | Account |
| Hero home | Scegli l’auto | Come funziona |
| Card auto | Noleggia | Tutta la card apre la scheda |
| Scheda auto (barra fissa) | Noleggia — €prezzo | Consulente · WhatsApp |
| Flotta (telefono) | Filtri | Ordina |
| Prenotazione | Continua | Indietro |
| Promozioni | Scegli l’auto in offerta | Copia codice |

## Linee guida visive (v4, sostituite dalla palette Mercedes in v5)

- **Apple**: fondo bianco e grigio #F5F5F7, titoli centrati e grandi, prodotto scontornato al centro, due pulsanti a pillola (pieno + contorno).
- **Tesla**: foto a tutto schermo dell’auto in ambiente reale, titolo centrato in alto, due pulsanti affiancati, barra d’ordine fissa.
- **Revel**: card con prezzo barrato, tempi di consegna e badge offerta; filtri a chip con icone.
- **Font**: Inter (con dimensione ottica), il più vicino libero a SF Pro e Universal Sans.
- **Colore**: un solo blu d’azione, rosso solo per le promozioni, nessun altro colore.

## Revisione critica v4.1

| # | Dove | Difetto | Correzione |
|---|---|---|---|
| 13 | Flotta | Titolo e breadcrumb attaccati al bordo sinistro (margine azzerato) | Margini ripristinati |
| 14 | Tutte le foto | Contorni scontornati frastagliati, aloni verdi e grigi | Bordo rifinito su 88 immagini |
| 15 | Hero | Auto attaccata ai pulsanti e sospesa nel vuoto | Più aria e ombra a terra |
| 16 | Card auto | Sette righe di testo piccolo grigio | Quattro righe: nome, versione, prezzo con disponibilità, azioni |
| 17 | Card auto | Auto alte (500, furgoni) tagliate in alto | Foto contenute nel riquadro, appoggiate in basso |
| 18 | Galleria | Retro di colore o generazione diversa su 6 modelli | Retro rimossi su X3, 500, Transit Custom, GLA, GLC, Macan |
| 19 | Home | 911 ripetuta nella hero e nel riquadro Breve termine | Mini Cooper nel riquadro |
| 20 | Fondi neri | Pulsante contorno azzurro poco leggibile | Contorno bianco |
| 21 | Passaggi | Cinque riquadri con icone, aspetto da modello pronto | Linea del tempo con numeri grandi |
| 22 | Footer | Più stretto della griglia sopra | Stessa larghezza del contenuto |

## Revisione critica v4.2 — inserzioni

| # | Dove | Difetto | Correzione |
|---|---|---|---|
| 23 | Card auto | Auto piccola dentro un riquadro grigio, testo minuto, due pulsanti per card: in home 16 pillole blu una accanto all’altra | Card stile scheda prodotto: nome grande, auto più grande con ombra a terra, tre dati tecnici in colonna, prezzo in evidenza e un solo pulsante "Noleggia"; la card intera apre la scheda |
| 24 | Card auto | Badge "−15%" e "3D" sovrapposti alla foto | Promozione scritta in rosso sopra il nome, "360°" discreto in grigio |
| 25 | Card auto | Altezze della foto diverse tra card della stessa riga | Foto in un riquadro fisso, allineate in basso |
| 26 | Home | 8 card su 4 colonne, strette | 6 card su 3 colonne e pulsante "Vedi tutte le 45 auto" in fondo |
| 27 | Flotta | Griglia a 4 colonne forzata nel codice della pagina | Stessa griglia della home: 3, 2 o 1 colonna |
| 28 | Home | Riquadro promozioni più stretto delle card sopra | Stessa larghezza |
| 29 | Home | 911 in apertura e di nuovo nella sezione 3D | Sezione 3D con la BMW X5 |
| 30 | Inclusi | Otto riquadri con icone, aspetto da modello pronto | Stesso stile a linee della sezione "Tutto online" |
| 31 | Galleria | Miniature tagliate a destra (5 non entravano) | Miniature a larghezza uguale, sempre tutte visibili |
| 32 | Telefono | Il pulsante WhatsApp copriva "Noleggia" nelle card | Si nasconde mentre scorri verso il basso e torna quando risali |

## v5 — palette Mercedes

Richiesta del cliente: i colori Mercedes al posto di quelli Apple. Valori letti da mercedes-benz.it (novembre 2026).

| Elemento | Prima (Apple) | Ora (Mercedes) |
|---|---|---|
| Pulsante principale | Blu #1F57D6 | Blu #0078D6, scuro al passaggio #006ABC |
| Pulsante secondario | Contorno blu | Contorno argento #9F9F9F, testo #333 |
| Testo | #1D1D1F | #333333, titoli in nero |
| Grigi | #F5F5F7, #E8E8ED | #F4F4F4, #E8E8E8, argento #9F9F9F |
| Header, hero, footer | Chiari, vetro sfocato | Neri |
| Titoli | Inter seminegretto | Serif sottile (Source Serif 4, il libero più vicino a MB Corpo Title) |
| Angoli | 14–28 px | 4–8 px; pulsanti a pillola come Mercedes |
| Rosso | Solo promozioni | Invariato |

Il logo LocaFit sull'header nero usa la freccia bianca al posto del blu notte.
Corretto anche il menu su telefono: la prima voce finiva sotto l'header quando la barra promo era visibile.

## Revisione critica v5.1

| # | Dove | Difetto | Correzione |
|---|---|---|---|
| 33 | Aziende, Chi siamo, Come funziona, formule | Titolo poco leggibile sulle foto chiare o affollate | Velatura più scura dietro il testo |
| 34 | Aziende, formule | Quattro riquadri grigi con testo piccolo, aspetto da modello pronto | Numeri grandi in serif su una linea sottile |
| 35 | Aziende, Chi siamo, Come funziona | Tre riquadri con icona | Stesso stile a linee di "Sempre incluso" |
| 36 | Scheda auto | Dati tecnici in otto riquadri grigi | Righe sottili, più leggere |
| 37 | Sedi | Nome della città e orari illeggibili sulle foto | Sfumatura più forte e nome in serif |
| 38 | Header | "Offerte" più chiaro delle altre voci: sembrava la pagina attiva | Stesso colore delle altre voci |
| 39 | Titoli | Parole sole a capo ("Mercedes-Benz Classe / A") | Righe bilanciate su tutti i titoli |
| 40 | Offerte | Riquadro promozione più stretto della griglia sotto | Stessa larghezza |
| 41 | Telefono | Barra promo su tre righe | Una riga: "Fino al −20%. Scopri le offerte" |
| 42 | Scheda auto (telefono) | Pulsante WhatsApp sopra la barra "Noleggia"; "24 mesi" spezzato su due righe; dati tecnici larghi solo tre quarti | WhatsApp nascosto (c'è già nel configuratore), testo su una riga, larghezza piena |
| 43 | Galleria | Con due sole foto le miniature erano sparse sulla riga | Larghezza fissa, allineate a sinistra |
