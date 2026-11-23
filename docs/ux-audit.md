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
| Card auto | Noleggia | Scopri |
| Scheda auto (barra fissa) | Noleggia — €prezzo | Consulente · WhatsApp |
| Flotta (telefono) | Filtri | Ordina |
| Prenotazione | Continua | Indietro |
| Promozioni | Scegli l’auto in offerta | Copia codice |

## Linee guida visive (Apple + Tesla + Revel)

- **Apple**: fondo bianco e grigio #F5F5F7, titoli centrati e grandi, prodotto scontornato al centro, due pulsanti a pillola (pieno + contorno).
- **Tesla**: foto a tutto schermo dell’auto in ambiente reale, titolo centrato in alto, due pulsanti affiancati, barra d’ordine fissa.
- **Revel**: card con prezzo barrato, tempi di consegna e badge offerta; filtri a chip con icone.
- **Font**: Inter (con dimensione ottica), il più vicino libero a SF Pro e Universal Sans.
- **Colore**: un solo blu d’azione, rosso solo per le promozioni, nessun altro colore.
