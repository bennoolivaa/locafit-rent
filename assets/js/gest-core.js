/* LOCAFIT Rent — Gestionale: dati, stato e regole (demo: tutto resta nel browser, in localStorage) */
(function () {
  const G = window.G = {};
  const KEY = 'lf-gest-v1';

  /* ---------- Date e formati ---------- */
  const pad = (n) => String(n).padStart(2, '0');
  const ymd = G.ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = G.parse = (s) => {
    if (!s) return null;
    if (s instanceof Date) return new Date(s);
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    const d = new Date(s); d.setHours(0, 0, 0, 0); return d;
  };
  const NOW = new Date();
  const TODAY = new Date(NOW); TODAY.setHours(0, 0, 0, 0);
  const T = G.T = ymd(TODAY);
  const addD = G.addD = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return ymd(d); };
  const addM = G.addM = (s, n) => { const d = parse(s); const day = d.getDate(); d.setDate(1); d.setMonth(d.getMonth() + n); const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(); d.setDate(Math.min(day, last)); return ymd(d); };
  const diff = G.diff = (a, b) => Math.round((parse(b) - parse(a)) / 86400000);
  G.fmtD = (s, o = { day: 'numeric', month: 'short' }) => (s ? parse(s).toLocaleDateString('it-IT', o) : '—');
  G.fmtDL = (s) => G.fmtD(s, { day: 'numeric', month: 'short', year: 'numeric' });
  G.fmtDW = (s) => G.fmtD(s, { weekday: 'short', day: 'numeric', month: 'short' });
  G.eur = (n, dec) => '€ ' + (dec ? (Math.round(n * 100) / 100).toFixed(2).replace('.', ',') : String(Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  G.num = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  G.esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  G.rel = (s) => { const n = diff(T, s); return n === 0 ? 'oggi' : n === 1 ? 'domani' : n === -1 ? 'ieri' : n > 0 ? `tra ${n} giorni` : `${-n} giorni fa`; };

  /* ---------- Generatore pseudo-casuale con seme (dati demo sempre uguali) ---------- */
  let seed = 7;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const int = (a, b) => a + Math.floor(rnd() * (b - a + 1));
  const pick = (a) => a[Math.floor(rnd() * a.length)];
  const chance = (p) => rnd() < p;
  G.uid = (p) => p + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36);

  /* ---------- Catalogo (dal sito) ---------- */
  G.model = (id) => LF.auto.find((a) => a.id === id);
  G.sedeNome = (id) => (LF.sedi.find((s) => s.id === id) || {}).citta || id || '—';
  G.catNome = (id) => (LF.categorie.find((c) => c.id === id) || {}).nome || id;
  G.img = (a) => `assets/img/car/${a.img}-sm.webp`;
  G.FORMULE = { breve: 'Breve', medio: 'Medio', lungo: 'Lungo' };
  G.UNITA = { breve: '/giorno', medio: '/mese', lungo: '/mese' };

  /* ---------- Generazione dati demo ---------- */
  const NOMI_M = ['Marco', 'Luca', 'Giuseppe', 'Antonio', 'Francesco', 'Alessandro', 'Davide', 'Matteo', 'Stefano', 'Paolo', 'Giovanni', 'Andrea', 'Roberto', 'Simone', 'Pasquale', 'Vincenzo', 'Carmine', 'Raffaele'];
  const NOMI_F = ['Giulia', 'Francesca', 'Chiara', 'Sara', 'Valentina', 'Martina', 'Federica', 'Elena', 'Anna', 'Laura', 'Serena', 'Alessia', 'Ilaria', 'Rosa'];
  const COGNOMI = ['Rossi', 'Esposito', 'Russo', 'Romano', 'Colombo', 'De Luca', 'Ferrara', 'Marino', 'Greco', 'Bruno', 'Gallo', 'Conti', 'Costa', 'Mancini', 'Lombardi', 'Moretti', 'Barbieri', 'Fontana', 'Caruso', 'Ricci', 'Iannace', 'Pepe', 'Di Lorenzo', 'Mastrocinque', 'Zollo', 'Pisapia', 'Capone', 'Fusco', 'Santoro', 'D’Amico'];
  const AZIENDE = ['Edil Sannio S.r.l.', 'Tecnoimpianti Caserta S.p.A.', 'Studio Legale Fusco & Associati', 'Farmacia Centrale Benevento', 'Logistica Appia S.r.l.', 'Vigna del Taburno Soc. Agr.', 'Roma Eventi S.r.l.', 'Clinica Villa Fiorita', 'Ottica Visconti S.n.c.', 'Gruppo Medici Salaria', 'Consulta Engineering S.r.l.'];
  const CITTA = { roma: ['Roma', 'Roma', 'Roma', 'Fiumicino', 'Guidonia', 'Tivoli'], caserta: ['Caserta', 'Caserta', 'Marcianise', 'Maddaloni', 'Aversa', 'Santa Maria C.V.'], benevento: ['Benevento', 'Benevento', 'Montesarchio', 'San Giorgio del Sannio', 'Telese Terme', 'Avellino'] };
  const VIE = ['Via Nomentana', 'Viale Europa', 'Corso Garibaldi', 'Via Roma', 'Via dei Mille', 'Viale Mazzini', 'Via Appia', 'Piazza Risorgimento', 'Via San Pasquale', 'Corso Trieste', 'Via Tiburtina', 'Viale Kennedy'];
  const OFFICINE = ['Autofficina Salaria (Roma)', 'Car Service Reggia (Caserta)', 'Officina Sannio Motors (Benevento)', 'Pneus Center (Roma)', 'Carrozzeria Due Ponti (Roma)', 'Carrozzeria Mellusi (Benevento)'];
  const LUOGHI_MULTA = ['Roma, ZTL Centro Storico', 'A1 Roma–Napoli, km 712 (Tutor)', 'Caserta, Viale Carlo III (autovelox)', 'Roma, Via Cristoforo Colombo (autovelox)', 'Benevento, Corso Garibaldi (ZTL)', 'Napoli, Tangenziale (Tutor)', 'Roma, sosta vietata Via Cola di Rienzo'];

  function targa() { const L = 'ABCDEFGHJKLMNPRSTVWXYZ'; return 'G' + pick('FGHJKL'.split('')) + int(100, 999) + L[int(0, L.length - 1)] + L[int(0, L.length - 1)]; }
  function tel() { return `+39 3${int(20, 49)} ${int(100, 999)} ${int(1000, 9999)}`; }
  const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]+/g, '.').replace(/^\.|\.$/g, '');

  function seedData() {
    seed = 20261126;
    const S = { v: 1, creato: new Date().toISOString(), veicoli: [], clienti: [], contratti: [], pagamenti: [], interventi: [], sinistri: [], multe: [], richieste: [], log: [], listino: {}, codici: [], staff: [], note: {} };

    // Staff
    S.staff = [
      { id: 'u1', nome: 'Benedetto Oliva', ruolo: 'Amministratore', sede: '', email: 'direzione@locafitrent.it' },
      { id: 'u2', nome: 'Giulia Marino', ruolo: 'Consulente', sede: 'roma', email: 'g.marino@locafitrent.it' },
      { id: 'u3', nome: 'Carmine Iannace', ruolo: 'Responsabile sede', sede: 'caserta', email: 'c.iannace@locafitrent.it' },
      { id: 'u4', nome: 'Serena Zollo', ruolo: 'Consulente', sede: 'benevento', email: 's.zollo@locafitrent.it' },
      { id: 'u5', nome: 'Davide Costa', ruolo: 'Driver', sede: 'roma', email: 'd.costa@locafitrent.it' },
      { id: 'u6', nome: 'Pasquale Fusco', ruolo: 'Driver', sede: 'caserta', email: 'p.fusco@locafitrent.it' },
      { id: 'u7', nome: 'Raffaele Capone', ruolo: 'Driver', sede: 'benevento', email: 'r.capone@locafitrent.it' },
    ];

    // Veicoli: un'unità per modello in ogni sede in cui il sito lo mostra
    let nv = 0;
    LF.auto.forEach((a) => {
      a.sedi.forEach((sede) => {
        const arrivo = !!a.arrivo;
        const imm = arrivo ? null : ymd(new Date(2022 + int(0, 4) - (a.categoria === 'furgone' ? 1 : 0), int(0, 11), int(1, 28)));
        const immOk = imm && imm > T ? addM(T, -int(2, 10)) : imm;
        const eta = immOk ? Math.max(0.15, diff(immOk, T) / 365) : 0;
        const km = arrivo ? 0 : Math.round(eta * int(9000, 24000) / 100) * 100;
        const revBase = immOk ? addM(immOk, 48) : null;
        let rev = revBase; while (rev && rev < addD(T, 35)) rev = addM(rev, 24);
        S.veicoli.push({
          id: 'v' + (++nv), auto: a.id, targa: arrivo ? '' : targa(), sede, imm: immOk, km, arrivo: arrivo ? a.arrivo : '',
          ass: arrivo ? null : addD(T, int(35, 360)), rev, bollo: arrivo ? null : addD(T, int(35, 360)),
          tagl: arrivo ? null : Math.ceil((km + int(400, 15000)) / 1000) * 1000, carb: int(2, 4), telaio: 'ZFA' + int(100000000, 999999999) + int(10000, 99999), note: '',
        });
      });
    });
    // qualche scadenza vicina per rendere la demo realistica
    S.veicoli.filter((v) => !v.arrivo).slice(0, 60).forEach((v, i) => { if (i % 14 === 0) v.ass = addD(T, int(-2, 20)); if (i % 19 === 4) v.bollo = addD(T, int(-5, 25)); if (i % 23 === 6) v.rev = addD(T, int(1, 28)); if (i % 13 === 3) v.tagl = Math.ceil((v.km + int(150, 900)) / 100) * 100; });

    // Clienti
    for (let i = 0; i < 58; i++) {
      const azienda = i % 5 === 3;
      const sede = pick(['roma', 'roma', 'roma', 'caserta', 'caserta', 'benevento', 'benevento']);
      const f = chance(0.42); const nome = pick(f ? NOMI_F : NOMI_M); const cognome = pick(COGNOMI);
      const rs = azienda ? AZIENDE[i % AZIENDE.length] : '';
      S.clienti.push({
        id: 'k' + (i + 1), tipo: azienda ? 'azienda' : 'privato', nome, cognome, rs,
        piva: azienda ? String(int(10000000, 99999999)) + String(int(100, 999)) : '',
        email: azienda ? `amministrazione@${slug(rs).split('.')[0]}.it` : `${slug(nome)}.${slug(cognome)}${int(1, 99)}@example.com`,
        tel: tel(), citta: pick(CITTA[sede]), ind: `${pick(VIE)} ${int(1, 180)}`, sede,
        docs: chance(0.88) ? 'ok' : pick(['attesa', 'scaduti']), patenteScad: addD(T, int(60, 3000)), punti: int(14, 30),
        dal: addD(T, -int(20, 900)), note: '',
      });
    }
    const cliRand = (sede) => { const l = S.clienti.filter((c) => c.sede === sede); return chance(0.8) && l.length ? pick(l) : pick(S.clienti); };

    // Contratti per veicolo, senza sovrapposizioni
    let nc = 0;
    const CANALI = ['Sito', 'Sito', 'Sito', 'Telefono', 'WhatsApp', 'In sede'];
    const ORE = ['09:00', '09:30', '10:00', '11:00', '11:30', '12:00', '14:30', '15:00', '16:00', '17:30', '18:00'];
    const mk = (v, cli, tipo, start, len, stato, extra = {}) => {
      const a = G.model(v.auto);
      const end = tipo === 'breve' ? addD(start, len) : addM(start, len);
      const promo = a.promo && chance(0.6) ? a.promo : 0;
      const unit = Math.round(a.prezzi[tipo] * (1 - promo));
      const c = {
        id: 'c' + (++nc), num: `LF-${start.slice(0, 4)}-${int(10000, 99999)}`, cli: cli.id, veh: v.id, tipo, start, end, len, unit,
        tot: tipo === 'breve' ? unit * len : unit * len, stato, canale: pick(CANALI), modo: chance(0.45) ? 'domicilio' : 'sede',
        ind: '', ora: pick(ORE), oraR: pick(ORE), codice: promo ? (tipo === 'breve' ? 'WEEKEND20' : 'BLACK26') : '', km: tipo === 'breve' ? 250 * len : tipo === 'medio' ? 2500 * len : 15000,
        creato: addD(start, -int(1, 12)), consegna: null, ritiro: null, driver: '', note: '', ...extra,
      };
      if (c.modo === 'domicilio') c.ind = `${cli.ind}, ${cli.citta}`;
      if (c.creato > T) c.creato = T;
      if (stato === 'attivo' || stato === 'chiuso') c.consegna = { fatta: true, quando: start, km: Math.max(0, v.km - int(200, 4000)), carb: 4, danni: [], note: '' };
      if (stato === 'chiuso') c.ritiro = { fatta: true, quando: end, km: v.km, carb: int(2, 4), danni: [], note: '' };
      S.contratti.push(c); return c;
    };

    S.veicoli.filter((v) => !v.arrivo).forEach((v) => {
      const r = rnd(); const a = G.model(v.auto);
      const cli = () => cliRand(v.sede);
      let busyFrom = null; // inizio del contratto in corso
      if (r < 0.33 && a.categoria !== 'moto') {
        const len = pick([24, 36, 36, 48]); const start = addD(T, -int(20, 640));
        const c = mk(v, cli(), 'lungo', start, len, 'attivo'); busyFrom = c.start;
      } else if (r < 0.52) {
        const len = int(2, 9); let start = addD(T, -int(3, 170)); if (addM(start, len) <= addD(T, 2)) start = addD(T, -int(3, 25));
        const c = mk(v, cli(), 'medio', start, len, 'attivo'); busyFrom = c.start;
      } else if (r < 0.7) {
        const len = int(2, 9); const start = addD(T, -int(0, len - 1));
        const c = mk(v, cli(), 'breve', start, len, start === T && chance(0.6) ? 'confermata' : 'attivo');
        if (c.stato === 'confermata') { c.consegna = null; } busyFrom = c.start;
        // prenotazione successiva
        if (chance(0.4)) mk(v, cli(), 'breve', addD(c.end, int(1, 6)), int(2, 7), chance(0.75) ? 'confermata' : 'richiesta');
      } else {
        // libero: magari prenotato a breve
        if (chance(0.55)) mk(v, cli(), chance(0.8) ? 'breve' : 'medio', addD(T, int(0, 12)), 0, 'x');
      }
      // storico chiuso (breve/medio) prima del contratto attuale
      let cursor = addD(busyFrom || T, -int(3, 20));
      for (let k = 0; k < 4 && a.categoria !== 'x'; k++) {
        if (!busyFrom && k === 0 && chance(0.2)) continue;
        const tipo = chance(0.78) ? 'breve' : 'medio'; const len = tipo === 'breve' ? int(2, 12) : int(1, 4);
        const end = cursor; const start = tipo === 'breve' ? addD(end, -len) : addM(end, -len);
        if (diff(start, T) > 400) break;
        mk(v, cli(), tipo, start, len, chance(0.05) ? 'annullato' : 'chiuso');
        cursor = addD(start, -int(4, 40));
      }
    });
    // sistemiamo le prenotazioni "x" (future) con durata e stato
    S.contratti.filter((c) => c.stato === 'x').forEach((c) => {
      c.len = c.tipo === 'breve' ? int(2, 8) : int(1, 4); c.end = c.tipo === 'breve' ? addD(c.start, c.len) : addM(c.start, c.len);
      c.tot = c.unit * c.len; c.km = c.tipo === 'breve' ? 250 * c.len : 2500 * c.len;
      c.stato = c.start <= addD(T, 2) ? 'confermata' : chance(0.6) ? 'confermata' : 'richiesta';
      if (c.stato === 'richiesta') c.canale = 'Sito';
    });
    // driver sulle consegne/ritiri imminenti
    S.contratti.forEach((c) => {
      const s = S.veicoli.find((v) => v.id === c.veh).sede;
      const drivers = S.staff.filter((u) => u.ruolo === 'Driver' && u.sede === s);
      if (drivers.length && ((c.stato === 'confermata' && diff(T, c.start) <= 3) || (c.stato === 'attivo' && diff(T, c.end) <= 3)) && chance(0.6)) c.driver = drivers[0].id;
    });

    // Pagamenti
    S.contratti.forEach((c) => genPagamenti(S, c, true));

    // Officina: interventi aperti su veicoli liberi, chiusi nello storico
    const liberi = S.veicoli.filter((v) => !v.arrivo && !S.contratti.some((c) => c.veh === v.id && ['attivo', 'confermata', 'richiesta'].includes(c.stato) && c.start <= addD(T, 6)));
    const TIPI_INT = [['Tagliando', 180, 420], ['Cambio gomme invernali', 240, 620], ['Carrozzeria', 300, 1800], ['Revisione', 79, 79], ['Freni e pastiglie', 160, 480], ['Sostituzione parabrezza', 380, 760]];
    for (let i = 0; i < 6 && liberi.length; i++) {
      const v = liberi.splice(int(0, liberi.length - 1), 1)[0]; const t = pick(TIPI_INT);
      S.interventi.push({ id: 'i' + (i + 1), veh: v.id, tipo: t[0], officina: OFFICINE.find((o) => o.includes(G.sedeNome(v.sede))) || OFFICINE[0], apertura: addD(T, -int(0, 6)), fine: addD(T, int(0, 5)), stato: i % 3 === 0 ? 'aperto' : 'in lavorazione', costo: int(t[1], t[2]), note: '' });
    }
    for (let i = 0; i < 12; i++) {
      const v = pick(S.veicoli.filter((x) => !x.arrivo)); const t = pick(TIPI_INT); const ap = addD(T, -int(8, 300));
      S.interventi.push({ id: 'i' + (20 + i), veh: v.id, tipo: t[0], officina: pick(OFFICINE), apertura: ap, fine: addD(ap, int(1, 6)), stato: 'chiuso', costo: int(t[1], t[2]), note: '' });
    }

    // Multe e sinistri sullo storico contratti
    const storici = S.contratti.filter((c) => ['attivo', 'chiuso'].includes(c.stato) && diff(c.start, T) > 8);
    for (let i = 0; i < 11; i++) {
      const c = pick(storici); const last = c.end < T ? c.end : addD(T, -6);
      const data = addD(c.start, int(0, Math.max(0, diff(c.start, last))));
      const v = S.veicoli.find((x) => x.id === c.veh);
      S.multe.push({ id: 'm' + (i + 1), veh: v.id, targa: v.targa, data, ora: pick(ORE), luogo: pick(LUOGHI_MULTA), verbale: `${int(10, 99)}/${int(100000, 999999)}`, importo: pick([29, 42, 87, 87, 173, 42]), ricevuta: addD(data, int(15, 60)) > T ? T : addD(data, int(15, 60)), stato: i < 4 ? 'da rinotificare' : i < 8 ? 'rinotificata' : 'chiusa', spese: 25 });
    }
    for (let i = 0; i < 5; i++) {
      const c = pick(storici); const v = S.veicoli.find((x) => x.id === c.veh);
      const data = addD(c.start, int(0, Math.max(0, diff(c.start, c.end < T ? c.end : T))));
      S.sinistri.push({ id: 's' + (i + 1), veh: v.id, contr: c.id, data, desc: pick(['Urto in parcheggio, paraurti posteriore', 'Tamponamento a bassa velocità', 'Graffio fiancata destra', 'Specchietto rotto', 'Rottura cristallo da sasso']), stato: pick(['aperto', 'in perizia', 'chiuso']), franchigia: pick([0, 300, 500]), stima: int(250, 2400) });
    }

    // Richieste (lead)
    const FONTI = ['Form sito', 'Form sito', 'WhatsApp', 'Telefono', 'Avvisami (in arrivo)', 'Aziende'];
    const STATI_L = ['nuova', 'nuova', 'nuova', 'contattato', 'contattato', 'preventivo', 'preventivo', 'vinta', 'persa'];
    for (let i = 0; i < 19; i++) {
      const fonte = pick(FONTI); const a = fonte.startsWith('Avvisami') ? pick(LF.auto.filter((x) => x.arrivo)) : pick(LF.auto);
      const az = fonte === 'Aziende'; const nome = `${pick(chance(0.5) ? NOMI_F : NOMI_M)} ${pick(COGNOMI)}`;
      const stato = pick(STATI_L);
      S.richieste.push({ id: 'r' + (i + 1), nome, azienda: az ? pick(AZIENDE) : '', tel: tel(), email: `${slug(nome)}@example.com`, auto: a.id, tipo: az ? 'lungo' : pick(['breve', 'medio', 'lungo']), fonte, sede: pick(['roma', 'caserta', 'benevento']), stato, quando: new Date(NOW.getTime() - int(1, 240) * 3600000 * (stato === 'nuova' ? 0.4 : 1.5)).toISOString(), assegnata: stato === 'nuova' ? '' : pick(['u2', 'u3', 'u4']), note: az ? `Flotta da ${int(3, 12)} veicoli` : '' });
    }

    S.codici = LF.codici.map((c, i) => ({ ...c, attivo: true, usi: [128, 64, 9, 211][i] || int(5, 50) }));
    S.log = [
      { t: new Date(NOW.getTime() - 3600000 * 2).toISOString(), u: 'Giulia Marino', m: 'ha confermato una prenotazione dal sito' },
      { t: new Date(NOW.getTime() - 3600000 * 5).toISOString(), u: 'Carmine Iannace', m: 'ha registrato una riconsegna a Caserta' },
      { t: new Date(NOW.getTime() - 3600000 * 26).toISOString(), u: 'Serena Zollo', m: 'ha inviato un preventivo aziendale' },
    ];
    return S;
  }

  /* Rate e pagamenti di un contratto (solo una finestra utile: ultimi 4 mesi e prossimo mese) */
  function genPagamenti(S, c, seeding) {
    if (['annullato', 'x'].includes(c.stato)) return;
    const cli = c.cli; const metodo = seeding ? pick(['SEPA', 'SEPA', 'Carta', 'Carta', 'Bonifico']) : 'Carta';
    const mkP = (due, imp, desc) => {
      const past = due < T;
      const pagato = seeding ? (due < addD(T, -45) ? true : past ? chance(0.9) : false) : false;
      S.pagamenti.push({ id: G.uid('p'), contr: c.id, cli, due, imp, desc, metodo, stato: pagato ? 'pagato' : 'aperto', pagatoIl: pagato ? due : null, solleciti: 0 });
    };
    if (c.tipo === 'breve') { if (c.stato !== 'richiesta' || !seeding) mkP(c.start, c.tot, `Noleggio ${c.len} giorni`); return; }
    const from = addD(T, -125), to = addD(T, 35);
    for (let i = 0; i < c.len; i++) {
      const due = addM(c.start, i);
      if (due > to) break;
      if (seeding && due < from) continue;
      if (c.stato === 'chiuso' && due >= c.end) break;
      if (c.stato === 'richiesta' && seeding) break;
      mkP(due, c.unit, `Canone ${i + 1}/${c.len}`);
    }
  }
  G.genPagamenti = (c) => genPagamenti(G.S, c, false);

  /* ---------- Stato persistente ---------- */
  G.load = () => {
    let S = null;
    try { S = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { S = null; }
    if (!S || S.v !== 1) S = seedData();
    G.S = S; importaOrdineSito(); G.save(); return S;
  };
  G.save = () => { try { localStorage.setItem(KEY, JSON.stringify(G.S)); } catch (e) { /* spazio pieno: la demo continua in memoria */ } };
  G.reset = () => { try { localStorage.removeItem(KEY); localStorage.removeItem('lf-gest-importati'); } catch (e) { /* ignora */ } G.S = seedData(); importaOrdineSito(); G.save(); };
  G.log = (m) => { G.S.log.unshift({ t: new Date().toISOString(), u: (G.user() || {}).nome || 'Staff', m }); G.S.log = G.S.log.slice(0, 80); };
  G.user = () => G.S.staff.find((u) => u.id === G.S.utente);

  /* Il noleggio fatto su prenota.html (salvato in lf-ordine) arriva qui come richiesta da confermare */
  function importaOrdineSito() {
    let o; try { o = JSON.parse(localStorage.getItem('lf-ordine') || 'null'); } catch (e) { o = null; }
    if (!o || !o.numero || G.S.contratti.some((c) => c.num === o.numero)) return;
    const a = G.model(o.id); if (!a) return;
    const d = o.d || {};
    const del = o.del || {};
    const sede = del.sede || a.sedi[0];
    let cli = G.S.clienti.find((k) => d.email && k.email === d.email);
    if (!cli) {
      cli = { id: G.uid('k'), tipo: o.cliente === 'azienda' ? 'azienda' : 'privato', nome: d.nome || 'Cliente', cognome: d.cognome || 'dal sito', rs: d.rs || d.azienda || '', piva: d.piva || '', email: d.email || '', tel: d.tel || '', citta: d.citta || G.sedeNome(sede), ind: d.ind || '', sede, docs: 'attesa', patenteScad: null, punti: null, dal: T, note: 'Registrato con il noleggio online' };
      G.S.clienti.unshift(cli);
    }
    const start = del.giorno ? ymd(parse(del.giorno)) : addD(T, 1);
    const len = o.tipo === 'breve' ? (o.giorni || 3) : o.tipo === 'medio' ? (o.mesi || 3) : (o.durata || 36);
    const end = o.tipo === 'breve' ? addD(start, len) : addM(start, len);
    // prima un'unità libera nella sede scelta, poi libera altrove, poi qualsiasi (lo staff la cambierà)
    const units = G.S.veicoli.filter((v) => v.auto === a.id && !v.arrivo).sort((x, y) => (y.sede === sede) - (x.sede === sede));
    const veh = units.find((v) => G.libero(v.id, start, end)) || units[0];
    if (!veh) return;
    const unit = Math.round(o.unit || a.prezzi[o.tipo]);
    const c = { id: G.uid('c'), num: o.numero, cli: cli.id, veh: veh.id, tipo: o.tipo, start, end, len, unit, tot: o.tipo === 'breve' ? unit * len : unit * len, stato: 'richiesta', canale: 'Sito', modo: del.modo === 'domicilio' ? 'domicilio' : 'sede', ind: del.ind || '', ora: del.ora || '10:00', oraR: '10:00', codice: (o.pay && o.pay.codice) || '', km: o.tipo === 'breve' ? 250 * len : o.tipo === 'medio' ? 2500 * len : (o.km || 15) * 1000, creato: ymd(parse(o.quando || new Date())), consegna: null, ritiro: null, driver: '', note: 'Noleggio online completato sul sito: documenti e firma acquisiti.', nuovo: true };
    G.S.contratti.unshift(c);
    G.genPagamenti(c);
    G.S.log.unshift({ t: new Date().toISOString(), u: 'Sito', m: `nuovo noleggio online ${o.numero} (${a.marca} ${a.modello})` });
  }

  /* ---------- Regole derivate ---------- */
  G.veh = (id) => G.S.veicoli.find((v) => v.id === id);
  G.cli = (id) => G.S.clienti.find((k) => k.id === id);
  G.contr = (id) => G.S.contratti.find((c) => c.id === id);
  G.cliNome = (k) => (k ? (k.tipo === 'azienda' && k.rs ? k.rs : `${k.nome} ${k.cognome}`) : '—');
  G.vehNome = (v) => { const a = v && G.model(v.auto); return a ? `${a.marca} ${a.modello}` : '—'; };
  G.APERTI = ['richiesta', 'confermata', 'attivo'];
  G.contrVeh = (vid) => G.S.contratti.filter((c) => c.veh === vid);
  G.contrInCorso = (vid) => G.S.contratti.find((c) => c.veh === vid && c.stato === 'attivo');
  G.intAperto = (vid) => G.S.interventi.find((i) => i.veh === vid && i.stato !== 'chiuso');
  G.vehStato = (v) => {
    if (v.arrivo) return 'arrivo';
    if (G.intAperto(v.id)) return 'officina';
    if (G.contrInCorso(v.id)) return 'noleggiato';
    if (G.S.contratti.some((c) => c.veh === v.id && c.stato === 'confermata' && c.start <= T)) return 'consegna';
    return 'disponibile';
  };
  /* Il veicolo è libero tra due date? (ignora un contratto, per lo spostamento) */
  G.libero = (vid, start, end, ignora) => {
    const v = G.veh(vid); if (!v || v.arrivo) return false;
    const busy = G.S.contratti.some((c) => c.id !== ignora && c.veh === vid && G.APERTI.includes(c.stato) && c.start < end && start < c.end);
    const off = G.S.interventi.some((i) => i.veh === vid && i.stato !== 'chiuso' && i.apertura <= end && start <= i.fine);
    return !busy && !off;
  };
  /* Chi aveva l'auto in una certa data (per rinotificare le multe) */
  G.contrAllaData = (vid, data) => G.S.contratti.find((c) => c.veh === vid && ['attivo', 'chiuso'].includes(c.stato) && c.start <= data && data <= c.end);

  G.prezzo = (a, tipo) => { const o = G.S.listino[a.id] || {}; return o[tipo] != null ? o[tipo] : a.prezzi[tipo]; };
  G.promo = (a) => { const o = G.S.listino[a.id] || {}; return o.promo != null ? o.promo : (a.promo || 0); };

  G.pagStato = (p) => (p.stato === 'pagato' ? 'pagato' : p.due < T ? 'scaduto' : 'aperto');

  G.scadenze = (v) => {
    if (v.arrivo) return [];
    const out = [];
    [['ass', 'Assicurazione'], ['rev', 'Revisione'], ['bollo', 'Bollo']].forEach(([k, l]) => { if (v[k]) out.push({ k, l, data: v[k], gg: diff(T, v[k]) }); });
    return out.sort((a, b) => a.gg - b.gg);
  };
  G.kmTagliando = (v) => (v.tagl ? v.tagl - v.km : null);

  /* Filtro sede globale */
  G.inSede = (sede) => !G.S.sede || G.S.sede === sede;
  G.contrSede = (c) => (G.veh(c.veh) || {}).sede;
})();
