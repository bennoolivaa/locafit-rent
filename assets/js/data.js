/* LocaFit Rent — dati di esempio (finti) per il prototipo */

window.LF = window.LF || {};

LF.contatti = {
  telefono: '+39 06 4521 7780',
  telefonoHref: 'tel:+390645217780',
  whatsapp: '393401234567', // numero finto: sostituire con quello reale
  email: 'info@locafitrent.it',
  piva: 'P.IVA 00000000000 · REA RM-0000000',
};

LF.sedi = [
  { id: 'roma', citta: 'Roma', tipo: 'Sede legale e hub principale', indirizzo: 'Via Salaria 1024, 00138 Roma', orari: 'Lun–Sab 8:30–19:30', tel: '+39 06 4521 7780', mappa: 'Via Salaria 1024 Roma', foto: 'sede-roma', fotoAlt: 'Castel Sant’Angelo e il Tevere al tramonto', auto: 140 },
  { id: 'caserta', citta: 'Caserta', tipo: 'Sede operativa', indirizzo: 'Viale Carlo III 52, 81100 Caserta', orari: 'Lun–Sab 9:00–19:00', tel: '+39 0823 150 420', mappa: 'Viale Carlo III Caserta', foto: 'sede-caserta', fotoAlt: 'La Reggia di Caserta vista dalle fontane del parco', auto: 60 },
  { id: 'benevento', citta: 'Benevento', tipo: 'Sede operativa', indirizzo: 'Viale Mellusi 118, 82100 Benevento', orari: 'Lun–Sab 9:00–19:00', tel: '+39 0824 180 315', mappa: 'Viale Mellusi Benevento', foto: 'sede-benevento', fotoAlt: 'La Rocca dei Rettori a Benevento', auto: 45 },
];

LF.categorie = [
  { id: 'city', nome: 'City car', icon: 'city' },
  { id: 'compatta', nome: 'Compatte', icon: 'car' },
  { id: 'suv', nome: 'SUV', icon: 'suv' },
  { id: 'premium', nome: 'Premium', icon: 'star' },
  { id: 'sportiva', nome: 'Sportive', icon: 'bolt' },
  { id: 'elettrica', nome: 'Elettriche', icon: 'plug' },
  { id: 'furgone', nome: 'Furgoni', icon: 'van' },
  { id: 'moto', nome: 'Moto e scooter', icon: 'moto' },
];

LF.durate = {
  breve: { nome: 'Breve termine', breve: 'Breve', unita: '/giorno', periodo: 'da 1 a 30 giorni' },
  medio: { nome: 'Medio termine', breve: 'Medio', unita: '/mese', periodo: 'da 1 a 12 mesi' },
  lungo: { nome: 'Lungo termine', breve: 'Lungo', unita: '/mese', periodo: 'da 24 a 60 mesi' },
};

/* Promozione in corso */
LF.promo = {
  nome: 'Black November',
  fine: '2026-11-30T23:59:59',
  codice: 'BLACK26',
  testo: 'Fino al −20% sul canone, anticipo zero e consegna gratuita',
};
LF.codici = [
  { code: 'BLACK26', titolo: 'Black November', desc: 'Fino al −20% sul canone mensile dei modelli in promo, per tutta la durata del contratto.', scade: '30 nov 2026', tipo: 'lungo' },
  { code: 'WEEKEND20', titolo: 'Weekend lungo', desc: '−20% sul breve termine dal venerdì al lunedì. Ritiro dalle 15:00, riconsegna entro le 12:00.', scade: '31 dic 2026', tipo: 'breve' },
  { code: 'FLOTTA2', titolo: '2 mesi gratis per le aziende', desc: 'Per flotte da 3 auto in su: i primi due canoni sono a carico nostro.', scade: '31 gen 2027', tipo: 'lungo' },
  { code: 'BENVENUTO', titolo: 'Primo noleggio', desc: 'Consegna a domicilio gratuita e 1.000 km extra sul tuo primo contratto LocaFit.', scade: 'sempre attivo', tipo: 'medio' },
];

/*
  prezzi: breve €/giorno · medio €/mese · lungo €/mese (36 mesi, 15.000 km/anno, anticipo 0)
  promo: sconto applicato (prezzo barrato = prezzo pieno)
  consegna: ore entro cui è disponibile (0 = pronta oggi)
  arrivo: vedi LF.arrivi più sotto (veicolo non ancora noleggiabile)
*/
const A = (id, marca, modello, versione, categoria, alim, cambio, cv, acc, prezzi, consegna, sedi, extra = {}) =>
  ({ id, img: id, marca, modello, versione, categoria, alim, cambio, cv, acc, prezzi, consegna, sedi, posti: 5, ...extra });
const R = ['roma'], RC = ['roma', 'caserta'], RB = ['roma', 'benevento'], ALL = ['roma', 'caserta', 'benevento'], CB = ['caserta', 'benevento'];

LF.auto = [
  // City
  A('fiat-panda', 'Fiat', 'Grande Panda', '1.2 Hybrid La Prima', 'city', 'Ibrida', 'Automatico', 110, 11.2, { breve: 29, medio: 390, lungo: 219 }, 0, ALL, { top: true, promo: .15 }),
  A('fiat-500', 'Fiat', '500', '1.0 Hybrid Torino', 'city', 'Ibrida', 'Manuale', 70, 13.8, { breve: 32, medio: 420, lungo: 239 }, 0, RC, { posti: 4 }),
  A('fiat-600', 'Fiat', '600', '1.2 Hybrid La Prima', 'city', 'Ibrida', 'Automatico', 100, 10.9, { breve: 39, medio: 490, lungo: 279 }, 24, ALL, { promo: .1 }),
  A('toyota-yaris', 'Toyota', 'Yaris', '1.5 Hybrid Trend', 'city', 'Full hybrid', 'Automatico', 116, 9.7, { breve: 36, medio: 460, lungo: 259 }, 0, ALL),
  A('renault-clio', 'Renault', 'Clio', 'E-Tech Full Hybrid Techno', 'city', 'Full hybrid', 'Automatico', 145, 9.3, { breve: 35, medio: 450, lungo: 249 }, 24, CB),
  A('peugeot-208', 'Peugeot', '208', '1.2 PureTech GT', 'city', 'Benzina', 'Automatico', 100, 10.6, { breve: 36, medio: 470, lungo: 269 }, 0, RB, { promo: .12 }),
  A('vw-polo', 'Volkswagen', 'Polo', '1.0 TSI R-Line', 'city', 'Benzina', 'Manuale', 95, 10.8, { breve: 38, medio: 490, lungo: 279 }, 0, ALL),
  A('mini-cooper', 'Mini', 'Cooper', 'C Classic Trim', 'city', 'Benzina', 'Automatico', 156, 7.7, { breve: 55, medio: 690, lungo: 389 }, 24, R),
  // Compatte
  A('vw-golf', 'Volkswagen', 'Golf', '1.5 eTSI Style DSG', 'compatta', 'Mild hybrid', 'Automatico', 150, 8.5, { breve: 49, medio: 640, lungo: 359 }, 0, RC, { top: true }),
  A('mercedes-a', 'Mercedes-Benz', 'Classe A', 'A 200 AMG Line', 'compatta', 'Mild hybrid', 'Automatico', 163, 8.2, { breve: 59, medio: 720, lungo: 399 }, 0, ALL, { top: true, promo: .15 }),
  A('bmw-serie1', 'BMW', 'Serie 1', '120 M Sport', 'compatta', 'Mild hybrid', 'Automatico', 170, 7.8, { breve: 64, medio: 780, lungo: 439 }, 24, R),
  A('audi-a3', 'Audi', 'A3 Sedan', '35 TFSI S line', 'compatta', 'Mild hybrid', 'Automatico', 150, 8.4, { breve: 66, medio: 790, lungo: 449 }, 0, RC, { top: true }),
  // SUV
  A('toyota-yaris-cross', 'Toyota', 'Yaris Cross', '1.5 Hybrid Lounge', 'suv', 'Full hybrid', 'Automatico', 116, 11.2, { breve: 44, medio: 560, lungo: 319 }, 0, ALL),
  A('renault-captur', 'Renault', 'Captur', 'E-Tech Full Hybrid Techno', 'suv', 'Full hybrid', 'Automatico', 145, 10.6, { breve: 46, medio: 580, lungo: 329 }, 0, ALL),
  A('jeep-avenger', 'Jeep', 'Avenger', '1.2 e-Hybrid Altitude', 'suv', 'Ibrida', 'Automatico', 100, 10.6, { breve: 45, medio: 570, lungo: 329 }, 24, CB, { promo: .1 }),
  A('vw-troc', 'Volkswagen', 'T-Roc R', '2.0 TSI 4MOTION', 'suv', 'Benzina', 'Automatico', 300, 4.9, { breve: 79, medio: 920, lungo: 519 }, 0, ALL),
  A('peugeot-3008', 'Peugeot', '3008', 'Hybrid 136 GT', 'suv', 'Ibrida', 'Automatico', 136, 10.2, { breve: 62, medio: 740, lungo: 419 }, 48, RB),
  A('kia-sportage', 'Kia', 'Sportage', '1.6 T-GDi HEV GT-Line', 'suv', 'Full hybrid', 'Automatico', 230, 8.0, { breve: 64, medio: 760, lungo: 429 }, 24, CB),
  A('jeep-compass', 'Jeep', 'Compass', '1.3 PHEV 4xe Summit', 'suv', 'Plug-in', 'Automatico', 240, 7.3, { breve: 62, medio: 730, lungo: 409 }, 24, CB),
  A('cupra-formentor', 'Cupra', 'Formentor', '1.5 e-Hybrid VZ', 'suv', 'Plug-in', 'Automatico', 272, 7.0, { breve: 72, medio: 860, lungo: 479 }, 0, RC, { promo: .12 }),
  A('alfa-tonale', 'Alfa Romeo', 'Tonale', '1.5 Hybrid Veloce', 'suv', 'Mild hybrid', 'Automatico', 160, 8.8, { breve: 69, medio: 820, lungo: 459 }, 24, ALL),
  A('vw-tiguan', 'Volkswagen', 'Tiguan', '1.5 eTSI R-Line', 'suv', 'Mild hybrid', 'Automatico', 150, 9.1, { breve: 72, medio: 850, lungo: 479 }, 48, R),
  A('bmw-x1', 'BMW', 'X1', 'sDrive18d M Sport', 'suv', 'Diesel', 'Automatico', 150, 8.9, { breve: 79, medio: 890, lungo: 499 }, 0, RC, { top: true, promo: .1 }),
  A('audi-q3', 'Audi', 'Q3', '35 TDI S line', 'suv', 'Diesel', 'Automatico', 150, 9.3, { breve: 82, medio: 920, lungo: 519 }, 24, R),
  A('mercedes-gla', 'Mercedes-Benz', 'GLA', '200 AMG Line', 'suv', 'Mild hybrid', 'Automatico', 163, 8.7, { breve: 84, medio: 940, lungo: 529 }, 0, ALL),
  A('range-evoque', 'Land Rover', 'Range Rover Evoque', 'P300e R-Dynamic S', 'suv', 'Plug-in', 'Automatico', 309, 6.4, { breve: 119, medio: 1390, lungo: 739 }, 48, R),
  // Premium
  A('bmw-serie3', 'BMW', 'Serie 3', '320d xDrive M Sport', 'premium', 'Mild hybrid', 'Automatico', 190, 6.9, { breve: 95, medio: 1090, lungo: 579 }, 0, RC),
  A('mercedes-c', 'Mercedes-Benz', 'Classe C', 'C 220 d AMG Line', 'premium', 'Mild hybrid', 'Automatico', 200, 7.3, { breve: 99, medio: 1190, lungo: 629 }, 0, ALL, { top: true }),
  A('audi-q5', 'Audi', 'Q5', '45 TFSI quattro S line', 'premium', 'Mild hybrid', 'Automatico', 265, 6.1, { breve: 109, medio: 1290, lungo: 689 }, 24, R),
  A('volvo-xc60', 'Volvo', 'XC60', 'T6 Plug-in Hybrid AWD', 'premium', 'Plug-in', 'Automatico', 350, 5.7, { breve: 112, medio: 1320, lungo: 699 }, 48, RB),
  A('bmw-x3', 'BMW', 'X3', 'M50 xDrive', 'premium', 'Mild hybrid', 'Automatico', 398, 4.6, { breve: 159, medio: 1790, lungo: 949 }, 24, R),
  A('mercedes-glc', 'Mercedes-Benz', 'GLC', '300 de 4MATIC AMG Line', 'premium', 'Plug-in', 'Automatico', 333, 6.4, { breve: 139, medio: 1590, lungo: 849 }, 0, RC, { promo: .08 }),
  A('mercedes-e', 'Mercedes-Benz', 'Classe E', 'E 300 de Station Wagon', 'premium', 'Plug-in', 'Automatico', 313, 6.5, { breve: 149, medio: 1690, lungo: 899 }, 48, R),
  A('bmw-x5', 'BMW', 'X5', 'xDrive30d M Sport', 'premium', 'Mild hybrid', 'Automatico', 298, 6.1, { breve: 169, medio: 1890, lungo: 1049 }, 24, RC),
  A('mercedes-gle', 'Mercedes-Benz', 'GLE', '350 d 4MATIC AMG Line', 'premium', 'Diesel', 'Automatico', 272, 6.9, { breve: 179, medio: 1990, lungo: 1099 }, 48, R),
  A('porsche-macan', 'Porsche', 'Macan', 'Macan 2.0 PDK', 'premium', 'Benzina', 'Automatico', 265, 6.4, { breve: 189, medio: 2190, lungo: 1190 }, 24, R, { top: true }),
  A('porsche-cayenne', 'Porsche', 'Cayenne', 'E-Hybrid Coupé', 'premium', 'Plug-in', 'Automatico', 470, 4.9, { breve: 259, medio: 2890, lungo: 1590 }, 48, R),
  // Sportive ed elettriche
  A('porsche-911', 'Porsche', '911', 'Carrera S', 'sportiva', 'Benzina', 'Automatico', 450, 3.5, { breve: 390, medio: 4490, lungo: 2390 }, 0, R, { top: true, posti: 4 }),
  A('porsche-taycan', 'Porsche', 'Taycan', '4S Performance', 'sportiva', 'Elettrica', 'Automatico', 598, 3.7, { breve: 349, medio: 3990, lungo: 1990 }, 24, R),
  A('tesla-model-3', 'Tesla', 'Model 3', 'Long Range AWD', 'elettrica', 'Elettrica', 'Automatico', 498, 4.4, { breve: 79, medio: 890, lungo: 489 }, 0, RC, { promo: .1 }),
  A('tesla-model-y', 'Tesla', 'Model Y', 'Long Range AWD', 'elettrica', 'Elettrica', 'Automatico', 514, 4.8, { breve: 85, medio: 950, lungo: 519 }, 0, ALL, { top: true }),
  A('bmw-i4', 'BMW', 'i4', 'eDrive40 M Sport', 'elettrica', 'Elettrica', 'Automatico', 340, 5.7, { breve: 109, medio: 1250, lungo: 669 }, 24, R),
  // Furgoni
  A('fiat-doblo', 'Fiat', 'Doblò', '1.6 Multijet', 'furgone', 'Diesel', 'Manuale', 100, 13.0, { breve: 55, medio: 650, lungo: 389 }, 0, ALL, { posti: 2 }),
  A('ford-transit-custom', 'Ford', 'Transit Custom', '2.0 EcoBlue Trend', 'furgone', 'Diesel', 'Manuale', 136, 12.5, { breve: 79, medio: 890, lungo: 529 }, 24, CB, { posti: 3 }),
  A('fiat-ducato', 'Fiat', 'Ducato', 'L2H2 2.2 Multijet', 'furgone', 'Diesel', 'Manuale', 140, 14.0, { breve: 89, medio: 990, lungo: 589 }, 0, ALL, { posti: 3 }),
  // Moto e scooter
  A('vespa-gts', 'Vespa', 'GTS 310', 'Super', 'moto', 'Benzina', 'Automatico', 25, null, { breve: 39, medio: 290, lungo: 139 }, 0, ALL, { posti: 2, patente: 'A2' }),
  A('yamaha-tmax', 'Yamaha', 'TMAX', '560 Tech MAX', 'moto', 'Benzina', 'Automatico', 48, null, { breve: 69, medio: 520, lungo: 269 }, 24, ALL, { posti: 2, patente: 'A2', promo: .10 }),
  A('honda-xadv', 'Honda', 'X-ADV', '750 DCT', 'moto', 'Benzina', 'Automatico', 59, null, { breve: 79, medio: 590, lungo: 299 }, 0, RC, { posti: 2, patente: 'A' }),
  A('bmw-r1300gs', 'BMW', 'R 1300 GS', 'Trophy', 'moto', 'Benzina', 'Manuale', 145, null, { breve: 119, medio: 890, lungo: 449 }, 0, R, { posti: 2, patente: 'A' }),
];

/*
  Veicoli in arrivo: li decide il noleggio.
  Chiave = id del veicolo, valore = da quando sarà disponibile.
  Sul sito il veicolo resta visibile, con "Avvisami" al posto di "Noleggia":
  il cliente lascia nome e telefono e viene richiamato quando arriva.
  Per renderlo di nuovo noleggiabile basta togliere la riga.
*/
LF.arrivi = {
  'mini-cooper': '20 dicembre',
  'kia-sportage': '12 dicembre',
  'bmw-x3': '15 dicembre',
  'tesla-model-3': '9 dicembre',
  'honda-xadv': '1 marzo',
};
LF.auto.forEach((a) => { if (LF.arrivi[a.id]) a.arrivo = LF.arrivi[a.id]; });

LF.inclusi = [
  { t: 'RCA e Kasko', d: 'Copertura totale, franchigia ridotta', i: 'shield' },
  { t: 'Manutenzione', d: 'Ordinaria e straordinaria', i: 'wrench' },
  { t: 'Assistenza 24/7', d: 'Soccorso stradale in tutta Italia', i: 'phone' },
  { t: 'Consegna a domicilio', d: 'Dove vuoi tu, anche in giornata', i: 'pin' },
  { t: 'Pneumatici', d: 'Cambio stagionale incluso', i: 'tire' },
  { t: 'Bollo e pratiche', d: 'Ci pensiamo noi', i: 'doc' },
  { t: 'Auto sostitutiva', d: 'Mai a piedi, in 24 ore', i: 'swap' },
  { t: 'Secondo guidatore', d: 'Senza costi aggiuntivi', i: 'users' },
];

LF.faq = [
  { c: 'Noleggio', q: 'Cosa significa “pronta consegna”?', a: 'Che l’auto è già in sede, immatricolata e pronta. Le auto “Pronta oggi” le ritiri in giornata; le altre sono disponibili entro 24 o 48 ore. Niente attese di mesi.' },
  { c: 'Noleggio', q: 'Chi può noleggiare: privati o solo aziende?', a: 'Tutti: privati, liberi professionisti, partite IVA e aziende. Per le aziende prepariamo condizioni dedicate e gestione flotte.' },
  { c: 'Online', q: 'Posso fare davvero tutto online?', a: 'Sì. Scegli l’auto, carichi i documenti dallo smartphone, verifichi l’identità con un selfie o con SPID, firmi il contratto con un codice via SMS e paghi online. Nessun ufficio, nessuna carta da stampare.' },
  { c: 'Online', q: 'Che documenti servono?', a: 'Patente valida, documento d’identità e codice fiscale. Per il lungo termine aggiungiamo un documento di reddito (busta paga, 730 o Modello Unico); per le aziende la visura camerale.' },
  { c: 'Online', q: 'Quanto tempo serve per l’approvazione?', a: 'Per il breve termine è immediata. Per medio e lungo termine la valutazione è automatica e in genere arriva in pochi minuti; nei casi particolari un consulente ti risponde entro un’ora lavorativa.' },
  { c: 'Prezzi', q: 'Il prezzo mostrato è davvero tutto incluso?', a: 'Sì: assicurazione RCA e Kasko, manutenzione, assistenza stradale, pneumatici e bollo sono compresi. Prezzi IVA inclusa per privati; per le aziende mostriamo anche il prezzo IVA esclusa.' },
  { c: 'Prezzi', q: 'Serve un anticipo?', a: 'No. Tutte le offerte partono da anticipo zero. Se preferisci un canone più basso puoi scegliere tu un anticipo.' },
  { c: 'Prezzi', q: 'Come funzionano i codici promozionali?', a: 'Inseriscili al momento del pagamento: lo sconto si applica subito e lo vedi nel riepilogo prima di firmare.' },
  { c: 'Consegna', q: 'Consegnate anche fuori da Roma, Caserta e Benevento?', a: 'Sì, consegniamo in tutta Italia. Il costo di consegna dipende dalla distanza e te lo diciamo subito nel preventivo.' },
  { c: 'Consegna', q: 'Posso cambiare auto o recedere prima della scadenza?', a: 'Con il medio termine puoi cambiare auto o terminare il contratto con 30 giorni di preavviso. Per il lungo termine valutiamo insieme la soluzione più conveniente.' },
  { c: 'Consegna', q: 'Quanti chilometri posso fare?', a: 'Breve termine: 250 km al giorno inclusi. Medio termine: 2.500 km al mese. Lungo termine: scegli tu da 10.000 a 30.000 km all’anno.' },
];

LF.recensioni = [
  { n: 'Giulia M.', t: 'Roma · Medio termine', q: 'Ho scritto alle 10, alle 16 avevo la Classe A sotto casa. Contratto firmato dal telefono in cinque minuti.' },
  { n: 'Antonio R.', t: 'Caserta · Flotta aziendale', q: 'Abbiamo spostato tutta la flotta dei commerciali. Un referente, una fattura, zero pensieri.' },
  { n: 'Luca P.', t: 'Benevento · Lungo termine', q: 'Prezzo chiaro dall’inizio, nessuna sorpresa alla consegna. La Panda per mio figlio, la X1 per me.' },
  { n: 'Sara D.', t: 'Roma · Breve termine', q: 'Weekend in costiera con la Cupra: documenti caricati dal divano, auto pronta al ritiro. Perfetto.' },
];

/*
  Modelli 3D (Sketchfab, embed) per 360° esterni e, dove indicato, interni.
  "int" = telecamera al posto di guida, calibrata modello per modello.
  Licenze NonCommercial/Editorial: ok per la presentazione, non per il sito pubblico.
*/
LF.modelli3d = {
  'porsche-911': { uid: '877b1bc1739f4a2bb65d62fd7ffd9f75', nome: 'Porsche 911 with interior', autore: 'n.brizitskaya', licenza: 'CC BY', int: { p: [-2.85, 0.36, 0.98], t: [2, 0.36, 0.25], k: 0.1 } },
  'bmw-x5': { uid: 'b453ba441ff04f9290955d09c3d46b9f', nome: '2024 BMW X5 xDrive40i', autore: 'Ddiaz Design', licenza: 'CC BY-NC-SA', int: { p: [0, 0.0105, 0.0125], t: [0, -1, -0.06], k: 0.006 } },
  'mercedes-c': { uid: '21393b5f402543848db2f26f95a2e9fa', nome: 'Mercedes-Benz C-Class W206 AMG-Line 2022', autore: 'ceron_alex', licenza: 'CC BY-NC' },
  'audi-q5': { uid: '60fea790b21c48bcb379be2a6d2c1f81', nome: '2023 Audi Q5 quattro S line', autore: 'Ddiaz Design', licenza: 'CC BY-NC-SA' },
  'bmw-x1': { uid: '4ca3a2247af44e51919074565ed93486', nome: '2020 BMW X1 xDrive 18d', autore: 'Ddiaz Design', licenza: 'CC BY-NC-SA' },
  'porsche-cayenne': { uid: '74fbea5a4dfc4197839fdd2bf654369a', nome: '2022 Porsche Cayenne Turbo GT', autore: 'Ddiaz Design', licenza: 'CC BY-NC-SA' },
  'porsche-macan': { uid: '5d57f6dcabe7473f91b160595a3eb0cc', nome: 'Porsche Macan', autore: 'animanyarty', licenza: 'CC BY' },
  'vw-golf': { uid: 'e87d7c0f8937481db236529beb5ecab7', nome: 'Volkswagen Golf 8 GTI', autore: 'Mona x Supercars', licenza: 'CC BY' },
  'fiat-500': { uid: '4606659ff31142e3b8080f995514452f', nome: 'Fiat 500', autore: 'Francesco Coldesina', licenza: 'CC BY' },
  'fiat-panda': { uid: '8881e8a9344c4aec9f3bd3998596d8b6', nome: 'Fiat Panda City Life 2021', autore: 'SQUIR3D', licenza: 'Editorial' },
  'vw-troc': { uid: '017bc0c8e99242cb8b3aa18d1a0f77e6', nome: 'Volkswagen T-Roc R 2020', autore: 'Nieve5677', licenza: 'CC BY' },
  'mercedes-a': { uid: '9482f251f9c34a6e91d7777db5934cfc', nome: 'Mercedes-Benz A45 AMG 2018', autore: 'Lexyc16', licenza: 'CC BY-NC' },
};

/* Foto disponibili per la galleria (oltre al frontale): retro scontornato e interni */
LF.foto = {
  "vespa-gts":{}, "yamaha-tmax":{}, "honda-xadv":{}, "bmw-r1300gs":{},
  "fiat-panda":{"rear":1},
  "fiat-500":{"interior":1},
  "fiat-600":{"rear":1},
  "toyota-yaris":{"rear":1},
  "renault-clio":{"rear":1},
  "peugeot-208":{"interior":1},
  "vw-polo":{"rear":1,"interior":1},
  "mini-cooper":{"rear":1,"interior":1},
  "vw-golf":{"rear":1},
  "mercedes-a":{"rear":1},
  "bmw-serie1":{"rear":1},
  "audi-a3":{"rear":1,"interior":1},
  "toyota-yaris-cross":{"rear":1,"interior":1},
  "renault-captur":{"rear":1,"interior":1},
  "jeep-avenger":{"rear":1},
  "vw-troc":{"rear":1},
  "peugeot-3008":{"rear":1,"interior":1},
  "kia-sportage":{"rear":1,"interior":1},
  "jeep-compass":{"rear":1,"interior":1},
  "cupra-formentor":{"rear":1},
  "alfa-tonale":{"rear":1,"interior":1},
  "vw-tiguan":{"rear":1,"interior":1},
  "bmw-x1":{"rear":1,"interior":1},
  "audi-q3":{"rear":1,"interior":1},
  "mercedes-gla":{"interior":1},
  "range-evoque":{"rear":1,"interior":1},
  "bmw-serie3":{"rear":1,"interior":1},
  "mercedes-c":{},
  "audi-q5":{"rear":1,"interior":1},
  "volvo-xc60":{"rear":1,"interior":1},
  "bmw-x3":{"interior":1},
  "mercedes-glc":{"interior":1},
  "mercedes-e":{"rear":1},
  "bmw-x5":{"rear":1,"interior":1},
  "mercedes-gle":{"rear":1,"interior":1},
  "porsche-macan":{"interior":1},
  "porsche-cayenne":{"rear":1,"interior":1},
  "porsche-911":{"rear":1,"interior":1},
  "porsche-taycan":{"rear":1},
  "tesla-model-3":{"rear":1,"interior":1},
  "tesla-model-y":{"rear":1,"interior":1},
  "bmw-i4":{"rear":1},
  "fiat-doblo":{"rear":1},
  "ford-transit-custom":{"interior":1},
  "fiat-ducato":{"rear":1,"interior":1}};
