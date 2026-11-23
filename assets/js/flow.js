/* LocaFit Rent — noleggio 100% online (simulazione) e area personale */
(function () {
  const { $, $$, icons: I, eur, byId } = LF;
  const page = document.body.dataset.page;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const fmtDate = (d) => d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
  const esc = (s) => String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const save = (o) => { try { sessionStorage.setItem('lf-wizard', JSON.stringify(o)); } catch (e) { /* ignora */ } };
  const load = () => { try { return JSON.parse(sessionStorage.getItem('lf-wizard') || 'null'); } catch (e) { return null; } };

  /* Codice fiscale → data di nascita e sesso */
  function parseCF(cf) {
    cf = (cf || '').toUpperCase().trim();
    if (!/^[A-Z]{6}\d{2}[ABCDEHLMPRST]\d{2}[A-Z]\d{3}[A-Z]$/.test(cf)) return null;
    const yy = +cf.slice(6, 8); const m = 'ABCDEHLMPRST'.indexOf(cf[8]); let dd = +cf.slice(9, 11);
    const sesso = dd > 40 ? 'F' : 'M'; if (dd > 40) dd -= 40;
    const y = yy + (yy > (today.getFullYear() % 100) ? 1900 : 2000);
    return { nascita: new Date(y, m, dd), sesso };
  }

  /* Documento finto disegnato in SVG (per la demo) */
  function fakeDoc(kind, d) {
    const nome = `${(d.cognome || 'ROSSI').toUpperCase()} ${(d.nome || 'MARCO').toUpperCase()}`;
    const col = { patenteF: '#E7C6CF', patenteR: '#E7C6CF', identita: '#CFE0EE', cf: '#D7E7D2', reddito: '#F1EEE6', visura: '#F1EEE6' }[kind];
    const title = { patenteF: 'PATENTE DI GUIDA', patenteR: 'PATENTE · RETRO', identita: "CARTA D'IDENTITÀ", cf: 'TESSERA SANITARIA', reddito: 'CERTIFICAZIONE UNICA 2026', visura: 'VISURA CAMERALE' }[kind];
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='520' height='330' viewBox='0 0 520 330'><rect width='520' height='330' rx='18' fill='${col}'/><rect x='22' y='22' width='476' height='40' rx='6' fill='rgba(0,0,0,.08)'/><text x='38' y='49' font-family='Arial' font-size='17' font-weight='700' fill='#333'>${title}</text><text x='440' y='49' font-family='Arial' font-size='15' font-weight='700' fill='#333'>IT</text>${kind === 'reddito' || kind === 'visura' ? `<g fill='#555' font-family='Arial' font-size='13'><text x='38' y='100'>${nome}</text>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x='38' y='${120 + i * 26}' width='${300 + (i % 3) * 50}' height='8' rx='4' fill='rgba(0,0,0,.14)'/>`).join('')}</g>` : `<rect x='38' y='84' width='120' height='150' rx='8' fill='rgba(0,0,0,.12)'/><circle cx='98' cy='140' r='30' fill='rgba(0,0,0,.18)'/><rect x='62' y='180' width='72' height='40' rx='20' fill='rgba(0,0,0,.18)'/><g font-family='Arial' fill='#333'><text x='182' y='104' font-size='11' fill='#666'>COGNOME E NOME</text><text x='182' y='124' font-size='17' font-weight='700'>${nome}</text><text x='182' y='156' font-size='11' fill='#666'>NUMERO</text><text x='182' y='176' font-size='16' font-family='monospace'>${kind === 'cf' ? (d.cf || 'RSSMRA85T10H501Z') : 'U1' + Math.random().toString().slice(2, 9) + 'X'}</text><text x='182' y='208' font-size='11' fill='#666'>SCADENZA</text><text x='182' y='228' font-size='16'>12/03/2033</text></g>`}<rect x='22' y='270' width='476' height='36' rx='6' fill='rgba(0,0,0,.06)'/><text x='38' y='293' font-family='monospace' font-size='12' fill='#666'>DOCUMENTO DI ESEMPIO · DEMO LOCAFIT</text></svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  /* =================== WIZARD =================== */
  if (page === 'prenota') {
    const q = new URLSearchParams(location.search);
    let o = load();
    if (!o || (q.get('id') && q.get('id') !== o.id)) {
      o = { id: q.get('id') || 'mercedes-a', tipo: q.get('tipo') || 'medio', giorni: +q.get('giorni') || 3, mesi: +q.get('mesi') || 3, durata: [24, 36, 48, 60].includes(+q.get('durata')) ? +q.get('durata') : 36, km: +q.get('km') || 15, anticipo: +q.get('anticipo') || 0,
        extra: {}, cliente: 'privato', d: {}, docs: {}, ver: false, firma: null, otp: false, pay: { metodo: 'carta', codice: '', ok: false }, del: { modo: 'domicilio', sede: '', ind: '', giorno: '', ora: '' }, step: 0 };
    }
    if (!byId(o.id)) o.id = 'mercedes-a';
    const STEPS = [
      { k: 'auto', t: 'Auto e formula', s: 'Configura il noleggio', i: 'car' },
      { k: 'dati', t: 'Dati personali', s: 'Chi guiderà l’auto', i: 'user' },
      { k: 'doc', t: 'Documenti', s: 'Foto dal telefono', i: 'scan' },
      { k: 'ver', t: 'Verifica', s: 'Identità e valutazione', i: 'id' },
      { k: 'firma', t: 'Contratto', s: 'Firma digitale', i: 'pen' },
      { k: 'pay', t: 'Pagamento', s: 'Carta, Apple Pay, SEPA', i: 'card' },
      { k: 'del', t: 'Consegna', s: 'Dove e quando', i: 'pin' },
      { k: 'fine', t: 'Conferma', s: 'Tutto pronto', i: 'checkCircle' },
    ];
    const EXTRA = [
      { k: 'kasko0', t: 'Kasko franchigia zero', d: 'Nessuna spesa in caso di danni', p: { breve: 9, medio: 39, lungo: 25 } },
      { k: 'seggiolino', t: 'Seggiolino bimbo', d: 'Omologato i-Size, montato alla consegna', p: { breve: 5, medio: 19, lungo: 12 }, auto: true },
      { k: 'neve', t: 'Kit neve', d: 'Catene o pneumatici invernali', p: { breve: 6, medio: 15, lungo: 0 }, auto: true },
      { k: 'caschi', t: 'Due caschi omologati', d: 'Taglia su misura, igienizzati', p: { breve: 8, medio: 25, lungo: 15 }, moto: true },
      { k: 'bauletto', t: 'Bauletto e borse', d: 'Montati alla consegna', p: { breve: 6, medio: 20, lungo: 12 }, moto: true },
      { k: 'guidatore', t: 'Secondo guidatore', d: 'Sempre incluso', p: { breve: 0, medio: 0, lungo: 0 } },
    ];
    const car = () => byId(o.id);
    const extras = () => EXTRA.filter((x) => (car().categoria === 'moto' ? !x.auto : !x.moto));
    const P = () => LF.prezzo(car(), o.tipo, o);
    const extraTot = () => extras().filter((x) => o.extra[x.k]).reduce((s, x) => s + x.p[o.tipo], 0);
    const unitTot = () => P().unit + extraTot();
    const codici = { BLACK26: { t: 'Black November −5% aggiuntivo', pct: 0.05 }, WEEKEND20: { t: 'Weekend −20%', pct: 0.2, solo: 'breve' }, BENVENUTO: { t: 'Consegna gratuita + 1.000 km', pct: 0, consegna: true }, FLOTTA2: { t: '2 canoni gratuiti', pct: 0, solo: 'lungo' } };
    const codeInfo = () => { const c = codici[(o.pay.codice || '').toUpperCase()]; return c && (!c.solo || c.solo === o.tipo) ? c : null; };
    const consegnaCosto = () => (o.del.modo === 'domicilio' && !(codeInfo() && codeInfo().consegna) && !car().promo ? 39 : 0);
    const dovutoOggi = () => {
      const c = codeInfo(); const pct = c ? c.pct : 0;
      if (o.tipo === 'breve') return (P().tot + extraTot() * o.giorni) * (1 - pct) + consegnaCosto();
      return unitTot() * (1 - pct) + consegnaCosto();
    };
    const durTxt = () => (o.tipo === 'breve' ? `${o.giorni} ${o.giorni === 1 ? 'giorno' : 'giorni'}` : o.tipo === 'medio' ? `${o.mesi} ${o.mesi === 1 ? 'mese' : 'mesi'}` : `${o.durata} mesi · ${o.km}.000 km/anno`);

    const root = $('#wizard');
    root.innerHTML = `<nav class="stepper" id="stepper" aria-label="Passaggi"></nav><div class="wz-main"><div class="mini-sum" id="mini-sum"></div><section class="wz-panel" id="panel" aria-live="polite"></section></div><aside class="summary" id="summary"></aside>`;

    function stepper() {
      $('#stepper').innerHTML = STEPS.map((s, i) => `<button type="button" data-i="${i}" class="${i === o.step ? 'on' : i < o.step ? 'done' : ''}" ${i > o.step || o.step === 7 ? 'disabled' : ''}><span class="i">${i < o.step ? I.check : i + 1}</span><span><b>${s.t}</b><small>${s.s}</small></span></button>`).join('') +
        `<div class="secure"><span>${I.lock}Connessione cifrata</span><span>${I.shield}Dati in UE, GDPR</span><span>${I.pen}Firma con valore legale</span></div>`;
    }
    $('#wizard').addEventListener('click', (e) => { const b = e.target.closest('#stepper button'); if (b && !b.disabled) { o.step = +b.dataset.i; render(); } });

    function summary() {
      const a = car(); const p = P(); const c = codeInfo();
      $('#mini-sum').innerHTML = `<div class="l"><img src="${LF.img(a, '', '-sm')}" alt=""><span>${a.marca} ${a.modello} · ${durTxt()}</span></div><b>€${eur(dovutoOggi())}</b>`;
      $('#summary').innerHTML = `<div class="media stage">${LF.carShot(a, '-sm')}</div><div class="body">
        <div><span class="tiny">${a.marca}</span><div style="font-size:24px;font-weight:500;letter-spacing:-.03em">${a.modello}</div><span class="muted" style="font-size:13px">${a.versione}</span></div>
        <div class="row"><span>Formula</span><b>${LF.durate[o.tipo].nome}</b></div>
        <div class="row"><span>Durata</span><b>${durTxt()}</b></div>
        ${o.tipo === 'lungo' ? `<div class="row"><span>Anticipo</span><b>${o.anticipo ? '€' + eur(o.anticipo) : 'Zero'}</b></div>` : ''}
        <div class="row"><span>${o.tipo === 'breve' ? 'Tariffa' : 'Canone'}</span><b>${p.pct ? `<s class="dim" style="font-weight:400">€${eur(p.pieno)}</s> ` : ''}€${eur(p.unit)}${LF.durate[o.tipo].unita}</b></div>
        ${extraTot() ? `<div class="row"><span>Servizi extra</span><b>+€${eur(extraTot())}${LF.durate[o.tipo].unita}</b></div>` : ''}
        ${consegnaCosto() ? `<div class="row"><span>Consegna a domicilio</span><b>+€${consegnaCosto()}</b></div>` : ''}
        ${o.del.giorno ? `<div class="row"><span>${o.del.modo === 'sede' ? 'Ritiro' : 'Consegna'}</span><b>${new Date(o.del.giorno).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })} · ${o.del.ora || '—'}</b></div>` : ''}
        ${c ? `<div class="row"><span>Codice ${esc(o.pay.codice.toUpperCase())}</span><b style="color:var(--blue)">${c.t}</b></div>` : ''}
        <div class="tot"><div><span class="tiny">${o.tipo === 'breve' ? 'Totale' : 'Primo canone'}</span><br><span class="muted" style="font-size:12px">IVA inclusa</span></div><b>€${eur(dovutoOggi())}</b></div>
        ${p.pct ? `<span class="badge badge-red" style="justify-self:start">${LF.promo.nome} −${Math.round(p.pct * 100)}% applicato</span>` : ''}
      </div>`;
    }

    const nav = (nextLabel = 'Continua', opts = {}) => `<div class="wz-actions">${o.step > 0 && o.step < 7 ? `<button class="btn btn-grey" type="button" data-back>${I.arrowL} Indietro</button>` : '<span></span>'}${opts.extra || ''}<button class="btn btn-primary" type="button" data-next ${opts.disabled ? 'disabled' : ''}>${nextLabel} ${I.arrow}</button></div>`;
    const demo = (b) => `<div class="demo-tools">Modalità presentazione · ${b}</div>`;
    const head = (k, t, l) => `<div class="wz-progress"><i style="width:${((o.step + 1) / STEPS.length) * 100}%"></i></div><span class="kicker">Passaggio ${o.step + 1} di ${STEPS.length} · ${k}</span><h2 style="margin-top:14px">${t}</h2><p class="lead">${l}</p>`;

    const views = {
      auto() {
        const a = car();
        return head('Auto e formula', `${a.marca} ${a.modello}`, 'Conferma la formula e le opzioni: il prezzo si aggiorna in tempo reale.') + `
          <div class="form" style="margin-top:26px">
            <label>Auto<select id="w-car">${LF.auto.map((x) => `<option value="${x.id}" ${x.id === o.id ? 'selected' : ''}>${x.marca} ${x.modello} · ${x.versione}</option>`).join('')}</select></label>
          </div>
          <div style="margin-top:20px"><div class="seg" id="w-seg" style="display:flex"></div></div>
          <div id="w-opts" style="display:grid;gap:18px;margin-top:22px"></div>
          <div class="opt-label" style="margin-top:28px">Servizi aggiuntivi</div>
          <div class="choices" style="margin-top:0">${extras().map((x) => `<label class="choice"><input type="checkbox" data-extra="${x.k}" ${o.extra[x.k] || x.k === 'guidatore' ? 'checked' : ''} ${x.k === 'guidatore' ? 'disabled' : ''}><b>${x.t}</b><small>${x.d}</small><small class="mono" style="color:var(--text)">${x.p[o.tipo] ? '+€' + x.p[o.tipo] + LF.durate[o.tipo].unita : 'Incluso'}</small></label>`).join('')}</div>` + nav();
      },
      dati() {
        const d = o.d;
        return demo('<button type="button" data-demo-dati>Compila con dati di esempio</button>') + head('Dati personali', 'Chi guiderà l’auto?', 'Servono per il contratto. Dal codice fiscale ricaviamo da soli data di nascita e sesso.') + `
          <div class="choices">${[['privato', 'Privato', 'user'], ['piva', 'Libero professionista', 'doc'], ['azienda', 'Azienda', 'building']].map(([v, t, ic]) => `<label class="choice"><input type="radio" name="cliente" value="${v}" ${o.cliente === v ? 'checked' : ''}>${I[ic]}<b>${t}</b></label>`).join('')}</div>
          <form class="form" id="w-form" style="margin-top:24px" autocomplete="on" novalidate>
            ${o.cliente === 'azienda' ? `<div class="row2"><label>Ragione sociale<input name="rag" value="${esc(d.rag)}" required></label><label>Partita IVA<input name="piva" value="${esc(d.piva)}" inputmode="numeric" pattern="\\d{11}" required></label></div>` : ''}
            ${o.cliente === 'piva' ? `<label>Partita IVA<input name="piva" value="${esc(d.piva)}" inputmode="numeric" pattern="\\d{11}" required></label>` : ''}
            <div class="row2"><label>Nome<input name="nome" value="${esc(d.nome)}" autocomplete="given-name" required></label><label>Cognome<input name="cognome" value="${esc(d.cognome)}" autocomplete="family-name" required></label></div>
            <div class="row2"><label>Codice fiscale<input name="cf" value="${esc(d.cf)}" maxlength="16" style="text-transform:uppercase" required><span class="hint" id="cf-hint">16 caratteri</span></label><label>Data di nascita<input name="nascita" type="date" value="${esc(d.nascita)}" required></label></div>
            <div class="row2"><label>Email<input name="email" type="email" value="${esc(d.email)}" autocomplete="email" required></label><label>Cellulare<input name="tel" type="tel" value="${esc(d.tel)}" autocomplete="tel" required><span class="hint">Riceverai qui il codice per firmare</span></label></div>
            <div class="row3"><label>Indirizzo di residenza<input name="ind" value="${esc(d.ind)}" autocomplete="street-address" required></label><label>CAP<input name="cap" value="${esc(d.cap)}" inputmode="numeric" maxlength="5" required></label><label>Città<input name="citta" value="${esc(d.citta)}" autocomplete="address-level2" required></label></div>
          </form>` + nav('Continua');
      },
      doc() {
        const need = [['patenteF', 'Patente · fronte', 'id'], ['patenteR', 'Patente · retro', 'id'], ['identita', 'Carta d’identità', 'user'], ['cf', 'Tessera sanitaria', 'card']];
        if (o.tipo === 'lungo' && o.cliente === 'privato') need.push(['reddito', 'Documento di reddito', 'doc']);
        if (o.cliente !== 'privato') need.push(['visura', o.cliente === 'azienda' ? 'Visura camerale' : 'Certificato di attribuzione P.IVA', 'building']);
        o._need = need.map((n) => n[0]);
        return demo('<button type="button" data-demo-doc>Usa documenti di esempio</button>') + head('Documenti', 'Carica i documenti.', 'Scatta una foto o caricali dal telefono: leggiamo i dati in automatico. Formati JPG, PNG o PDF.') + `
          <div class="docs">${need.map(([k, t, ic]) => { const f = o.docs[k]; return `<div class="drop ${f ? 'ok' : ''}" data-doc="${k}">
            <input type="file" accept="image/*,.pdf" capture="environment" aria-label="Carica ${t}">
            <div class="head"><div><b>${t}</b><small>${f ? 'Verificato' : 'Obbligatorio'}</small></div><span class="ico">${f ? I.check : I[ic]}</span></div>
            ${f ? `<img class="thumb" src="${f.src}" alt=""><div class="ocr">${f.ocr}</div>` : `<span class="cta-u">${I.upload.replace('<svg', '<svg width="14" height="14"')} Trascina qui o tocca per caricare</span>`}
          </div>`; }).join('')}</div>` + nav('Continua', { disabled: !o._need.every((k) => o.docs[k]) });
      },
      ver() {
        const lungo = o.tipo !== 'breve';
        return head('Verifica', 'Verifichiamo che sei tu.', lungo ? 'Un selfie per confrontare il volto con il documento, poi la valutazione automatica di affidabilità.' : 'Un selfie per confrontare il volto con il documento. Ci vuole meno di un minuto.') + `
          <div class="idv">
            <div class="cam ${o.ver ? 'ok' : ''}" id="cam"><svg class="silhouette" viewBox="0 0 100 120" fill="none" stroke="#fff" stroke-width="1.5"><circle cx="50" cy="42" r="22"/><path d="M12 118c4-26 20-40 38-40s34 14 38 40"/></svg><span class="oval"></span><span class="msg" id="cam-msg">${o.ver ? 'Identità verificata' : 'Posiziona il volto nell’ovale'}</span></div>
            <div class="checklist">
              ${[['doc', 'Documento autentico'], ['face', 'Corrispondenza del volto'], ['live', 'Controllo di vitalità'], ...(lungo ? [['crif', 'Valutazione di affidabilità']] : [['card', 'Verifica carta di pagamento']])].map(([k, t]) => `<div class="check-item ${o.ver ? 'ok' : ''}" data-ck="${k}"><span class="st">${I.check}</span>${t}</div>`).join('')}
              ${lungo ? `<div class="score" style="grid-template-columns:120px 1fr;gap:18px;margin-top:6px"><div class="gauge" style="width:120px;height:120px"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" stroke="#E8E8ED" stroke-width="6" fill="none"/><circle id="g-arc" cx="50" cy="50" r="44" stroke="#1F57D6" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="276.5" stroke-dashoffset="${o.ver ? 276.5 * (1 - 0.86) : 276.5}" style="transition:stroke-dashoffset 1.6s cubic-bezier(.2,.75,.15,1)"/></svg><div class="val"><b id="g-val" style="font-size:30px">${o.ver ? 86 : '—'}</b><small>score</small></div></div><p class="muted" style="font-size:13px">Valutazione automatica su dati di reddito e storico creditizio. Nessun impatto sul tuo punteggio.</p></div>` : ''}
              <div class="approved ${o.ver ? 'show' : ''}" id="approved"><span class="ok">${I.check}</span><div><b style="font-weight:500">Approvato</b><br><span class="muted" style="font-size:13px">${lungo ? 'Noleggio approvato senza garanzie aggiuntive.' : 'Puoi procedere con la firma.'}</span></div></div>
            </div>
          </div>
          ${o.ver ? '' : `<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:20px"><button class="btn btn-primary" type="button" data-selfie>${I.camera} Avvia il selfie</button><button class="spid" type="button" data-spid>Entra con <b>SPID</b></button><button class="btn btn-grey" type="button" data-selfie-sim>Simula senza fotocamera</button></div>`}` + nav('Continua', { disabled: !o.ver });
      },
      firma() {
        const a = car(); const d = o.d; const p = P();
        const contract = contractHTML();
        return head('Contratto', 'Leggi e firma.', 'Il contratto è già compilato con i tuoi dati. Firma col dito o col mouse e conferma con il codice che ti inviamo via SMS.') + `
          <div class="contract" id="contract">${contract}</div>
          <form class="form" style="margin-top:18px"><label class="check"><input type="checkbox" id="acc1" ${o.firma ? 'checked' : ''}> Ho letto e accetto le Condizioni generali di noleggio e l’informativa privacy.</label><label class="check"><input type="checkbox" id="acc2" ${o.firma ? 'checked' : ''}> Approvo specificamente le clausole ai sensi degli artt. 1341 e 1342 c.c. (art. 7, 9, 12, 15).</label></form>
          <div class="sign-wrap">
            <div><div class="opt-label">Firma</div><div class="pad"><canvas id="pad"></canvas><span class="hint">Firma qui</span><button class="clear" type="button" data-clear>Cancella</button></div></div>
            <div><div class="opt-label">Conferma via SMS</div>
              ${o.otp ? `<div class="approved show" style="margin-top:0"><span class="ok">${I.check}</span><div><b style="font-weight:500">Contratto firmato</b><br><span class="muted" style="font-size:13px">Firma elettronica avanzata · ${new Date().toLocaleString('it-IT')}</span></div></div>` : `
              <div id="sms-zone"><button class="btn btn-grey btn-block" type="button" data-sms>${I.smartphone} Invia il codice a ${esc(d.tel || 'il tuo cellulare')}</button></div>`}
            </div>
          </div>` + nav('Continua', { disabled: !o.otp });
      },
      pay() {
        const c = codeInfo();
        return head('Pagamento', 'Ultimo passo.', o.tipo === 'breve' ? 'Paghi il noleggio oggi. La cauzione di €300 viene solo pre-autorizzata e sbloccata alla riconsegna.' : 'Oggi paghi solo il primo canone. I successivi vengono addebitati ogni mese con SEPA.') + `
          <div class="pay">
            <div>
              <div class="pay-methods">${[['carta', 'Carta', 'card'], ['apple', 'Apple Pay', 'smartphone'], ['sepa', 'Addebito SEPA', 'building']].map(([v, t, ic]) => `<button type="button" class="chip ${o.pay.metodo === v ? 'on' : ''}" data-metodo="${v}">${I[ic]}${t}</button>`).join('')}</div>
              ${o.pay.metodo === 'carta' ? `<div class="card-visual"><div style="display:flex;justify-content:space-between;align-items:center"><span class="chip-c"></span><span style="font-size:13px;letter-spacing:.1em">LOCAFIT · DEMO</span></div><div class="num" id="cv-num">•••• •••• •••• ••••</div><div class="bottom"><div>Titolare<b id="cv-name">${esc(((d) => `${d.nome || ''} ${d.cognome || ''}`)(o.d)).toUpperCase() || 'NOME COGNOME'}</b></div><div>Scade<b id="cv-exp">MM/AA</b></div></div></div>
              <form class="form" style="margin-top:16px" onsubmit="return false"><label>Numero carta<input id="cc-num" inputmode="numeric" autocomplete="off" placeholder="4242 4242 4242 4242" maxlength="19"></label><div class="row2"><label>Scadenza<input id="cc-exp" inputmode="numeric" autocomplete="off" placeholder="MM/AA" maxlength="5"></label><label>CVC<input id="cc-cvc" inputmode="numeric" autocomplete="off" placeholder="123" maxlength="4"></label></div><span class="hint">Demo: usa una carta di test qualsiasi (es. 4242 4242 4242 4242). Nessun addebito reale.</span></form>`
              : o.pay.metodo === 'apple' ? `<div class="panel" style="padding:28px;text-align:center"><div style="font-size:22px;font-weight:500"> Pay</div><p class="muted" style="margin-top:8px;font-size:14px">Conferma con Face ID o Touch ID sul tuo dispositivo.</p></div>`
              : `<form class="form" onsubmit="return false"><label>IBAN<input id="iban" autocomplete="off" placeholder="IT60 X054 2811 1010 0000 0123 456" value="${esc(o.pay.iban)}"></label><label>Intestatario<input value="${esc(`${o.d.nome || ''} ${o.d.cognome || ''}`)}"></label><span class="hint">Mandato SEPA Core firmato digitalmente insieme al contratto.</span></form>`}
            </div>
            <div>
              <div class="opt-label">Codice promozionale</div>
              <div style="display:flex;gap:8px"><input class="select" style="flex:1;background-image:none;padding-right:14px;text-transform:uppercase;border-radius:14px;height:48px" id="promo-code" value="${esc(o.pay.codice)}" placeholder="BLACK26"><button class="btn btn-grey" type="button" data-apply>Applica</button></div>
              <div class="mono" style="font-size:11px;margin-top:8px;color:${c ? 'var(--blue)' : 'var(--muted)'}" id="code-msg">${c ? '✓ ' + c.t : o.pay.codice ? 'Codice non valido per questa formula' : 'Prova BLACK26, WEEKEND20 o BENVENUTO'}</div>
              <div class="breakdown">
                <div class="row"><span>${o.tipo === 'breve' ? `Noleggio ${durTxt()}` : 'Primo canone'}</span><b>€${eur(o.tipo === 'breve' ? P().tot : P().unit)}</b></div>
                ${extraTot() ? `<div class="row"><span>Servizi extra</span><b>€${eur(o.tipo === 'breve' ? extraTot() * o.giorni : extraTot())}</b></div>` : ''}
                ${c && c.pct ? `<div class="row"><span>Sconto ${esc(o.pay.codice.toUpperCase())}</span><b style="color:var(--blue)">−€${eur((o.tipo === 'breve' ? P().tot + extraTot() * o.giorni : unitTot()) * c.pct)}</b></div>` : ''}
                <div class="row"><span>Consegna</span><b>${consegnaCosto() ? '€' + consegnaCosto() : 'Gratuita'}</b></div>
                ${o.tipo === 'breve' ? '<div class="row"><span>Cauzione (pre-autorizzata)</span><b>€300</b></div>' : `<div class="row"><span>Canoni successivi</span><b>€${eur(unitTot())}/mese · SEPA</b></div>`}
                <div class="row tot"><span>Paghi oggi</span><b style="font-size:22px;font-weight:500">€${eur(dovutoOggi())}</b></div>
              </div>
              <div class="trust" style="margin-top:14px"><span>${I.lock}3D Secure</span><span>${I.shield}PCI DSS</span><span>${I.swap}Recesso 14 gg</span></div>
            </div>
          </div>` + nav(o.pay.ok ? 'Continua' : `Paga €${eur(dovutoOggi())}`);
      },
      del() {
        const a = car();
        const start = new Date(today); if (a.consegna >= 24) start.setDate(start.getDate() + a.consegna / 24);
        const days = Array.from({ length: 10 }, (_, i) => { const d = new Date(start); d.setDate(d.getDate() + i); return d; }).filter((d) => d.getDay() !== 0).slice(0, 7);
        if (!o.del.giorno) o.del.giorno = days[0].toISOString();
        const sedi = LF.sedi.filter((s) => a.sedi.includes(s.id));
        if (!o.del.sede) o.del.sede = sedi[0].id;
        const isToday = new Date(o.del.giorno).toDateString() === new Date().toDateString();
        const nowH = new Date().getHours();
        return head('Consegna', 'Dove e quando?', a.consegna === 0 ? 'L’auto è già pronta: puoi riceverla anche oggi.' : `L’auto è disponibile tra ${a.consegna} ore: scegli il giorno che preferisci.`) + `
          <div class="choices">${[['domicilio', 'A domicilio', 'home', consegnaCosto() || o.del.modo !== 'domicilio' ? (a.promo || (codeInfo() && codeInfo().consegna) ? 'Gratuita' : '€39 · gratuita con BENVENUTO') : 'Gratuita'], ['sede', 'Ritiro in sede', 'pin', sedi.map((s) => s.citta).join(' · ')]].map(([v, t, ic, s]) => `<label class="choice"><input type="radio" name="modo" value="${v}" ${o.del.modo === v ? 'checked' : ''}>${I[ic]}<b>${t}</b><small>${s}</small></label>`).join('')}</div>
          <form class="form" style="margin-top:18px" onsubmit="return false">${o.del.modo === 'domicilio' ? `<label>Indirizzo di consegna<input id="del-ind" value="${esc(o.del.ind || [o.d.ind, o.d.cap, o.d.citta].filter(Boolean).join(', '))}" placeholder="Via, civico, CAP, città"></label>` : `<label>Sede<select id="del-sede">${sedi.map((s) => `<option value="${s.id}" ${o.del.sede === s.id ? 'selected' : ''}>${s.citta} · ${s.indirizzo}</option>`).join('')}</select></label>`}</form>
          <div class="opt-label" style="margin-top:24px">Giorno</div>
          <div class="slots">${days.map((d) => `<button type="button" class="day ${d.toISOString() === o.del.giorno ? 'on' : ''}" data-day="${d.toISOString()}"><small>${d.toLocaleDateString('it-IT', { weekday: 'short' })}</small><b>${d.getDate()}</b><small>${d.toLocaleDateString('it-IT', { month: 'short' })}</small></button>`).join('')}</div>
          <div class="opt-label" style="margin-top:22px">Fascia oraria</div>
          <div class="times">${['09:00', '11:00', '14:00', '16:00', '18:00'].map((t) => { const past = isToday && +t.slice(0, 2) <= nowH + 1; return `<button type="button" class="chip ${o.del.ora === t ? 'on' : ''}" data-ora="${t}" ${past ? 'disabled style="opacity:.3"' : ''}>${t}–${String(+t.slice(0, 2) + 2).padStart(2, '0')}:00</button>`; }).join('')}</div>` + nav('Conferma il noleggio', { disabled: !o.del.ora });
      },
      fine() {
        const a = car(); const g = new Date(o.del.giorno);
        return `<div class="done-hero"><span class="ok">${I.check}</span><h2>Tutto pronto, ${esc(o.d.nome || '')}.</h2><p class="lead" style="margin:12px auto 0">La tua ${a.marca} ${a.modello} ${o.del.modo === 'sede' ? `ti aspetta a ${LF.sedeNome(o.del.sede)}` : 'arriva a casa tua'} ${fmtDate(g)} tra le ${o.del.ora} e le ${String(+o.del.ora.slice(0, 2) + 2).padStart(2, '0')}:00.</p><p class="order-no">Ordine ${o.numero}</p></div>
          <div class="stage" style="max-width:520px;margin:20px auto 0">${LF.carShot(a)}</div>
          <div class="kv" style="margin-top:40px"><div><small>Formula</small><b>${LF.durate[o.tipo].nome}</b></div><div><small>Durata</small><b>${durTxt()}</b></div><div><small>Pagato oggi</small><b>€${eur(dovutoOggi())}</b></div><div><small>${o.del.modo === 'sede' ? 'Ritiro' : 'Consegna'}</small><b>${g.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })} · ${o.del.ora}</b></div></div>
          <div class="timeline" style="margin-top:36px">
            <div class="tl done"><small>Adesso</small><b>Contratto firmato e pagamento ricevuto</b><p>Ti abbiamo inviato copia del contratto a ${esc(o.d.email)}.</p></div>
            <div class="tl now"><small>Entro 2 ore</small><b>Preparazione dell’auto</b><p>Lavaggio, controlli e pieno. Ti avvisiamo su WhatsApp quando è pronta.</p></div>
            <div class="tl"><small>${fmtDate(g)}</small><b>${o.del.modo === 'sede' ? 'Ritiro in sede' : 'Consegna a domicilio'}</b><p>Il driver ti mostra l’auto, firmi il verbale digitale e parti.</p></div>
          </div>
          <div class="wz-actions"><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-grey" type="button" data-pdf>${I.download} Contratto</button><button class="btn btn-grey" type="button" data-ics>${I.calendar} Aggiungi al calendario</button></div><a class="btn btn-primary" href="area.html">Vai all’area personale ${I.arrow}</a></div>`;
      },
    };

    function contractHTML() {
      const a = car(); const d = o.d; const p = P();
      return `<div class="hd"><div><b>LocaFit Rent S.r.l.</b><br><small>Via Salaria 1024, 00138 Roma · P.IVA 00000000000</small></div><div style="text-align:right"><b>Contratto di noleggio</b><br><small>N. ${o.numero || 'LF-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 90000) + 10000)} · ${new Date().toLocaleDateString('it-IT')}</small></div></div>
        <h4>1. Le parti</h4><p>Il <b>Locatore</b> LocaFit Rent S.r.l. e il <b>Cliente</b> ${esc(o.cliente === 'azienda' ? d.rag : `${d.nome} ${d.cognome}`)}${d.cf ? `, C.F. ${esc(d.cf.toUpperCase())}` : ''}${d.piva ? `, P.IVA ${esc(d.piva)}` : ''}, residente in ${esc([d.ind, d.cap, d.citta].filter(Boolean).join(', '))}.</p>
        <h4>2. Il veicolo</h4><table><tr><td>Modello</td><td>${a.marca} ${a.modello} ${a.versione}</td></tr><tr><td>Alimentazione · cambio</td><td>${a.alim} · ${a.cambio}</td></tr><tr><td>Formula</td><td>${LF.durate[o.tipo].nome} · ${durTxt()}</td></tr></table>
        <h4>3. Corrispettivo</h4><table><tr><td>${o.tipo === 'breve' ? 'Tariffa giornaliera' : 'Canone mensile'} IVA inclusa</td><td>€ ${eur(unitTot())}</td></tr>${o.tipo === 'lungo' ? `<tr><td>Anticipo</td><td>€ ${eur(o.anticipo)}</td></tr><tr><td>Chilometri inclusi</td><td>${o.km}.000 / anno</td></tr>` : ''}${p.pct ? `<tr><td>Promozione ${LF.promo.nome}</td><td>−${Math.round(p.pct * 100)}% per tutta la durata</td></tr>` : ''}</table>
        <h4>4. Servizi inclusi</h4><p>Assicurazione RCA e Kasko, furto e incendio, manutenzione ordinaria e straordinaria, assistenza stradale 24/7, pneumatici, tassa di proprietà, auto sostitutiva.</p>
        <h4>5. Obblighi del Cliente</h4><p>Il Cliente si impegna a custodire il veicolo con diligenza, a non sublocarlo e a restituirlo nelle condizioni in cui lo ha ricevuto, salvo la normale usura.</p>
        <h4>7. Recesso</h4><p>${o.tipo === 'medio' ? 'Il Cliente può recedere con preavviso di 30 giorni senza penali.' : o.tipo === 'lungo' ? 'In caso di recesso anticipato si applica una penale pari al 30% dei canoni residui.' : 'Il noleggio può essere prolungato o terminato anticipatamente senza penali.'}</p>
        <h4>9. Firma elettronica</h4><p>Le parti convengono che il presente contratto è sottoscritto con firma elettronica avanzata mediante codice OTP inviato al numero ${esc(d.tel || '—')}.</p>
        <div class="sig"><div>Per LocaFit Rent S.r.l.<br><span style="font-family:cursive;font-size:22px;color:#1B2A6B">LocaFit</span></div><div>Il Cliente${o.firma ? `<img src="${o.firma}" alt="Firma">` : ''}</div></div>`;
    }

    function render() {
      save(o); stepper(); summary();
      const k = STEPS[o.step].k;
      $('#panel').innerHTML = views[k]();
      $('#panel').style.animation = 'none'; void $('#panel').offsetWidth; $('#panel').style.animation = '';
      bind[k] && bind[k]();
      $('#panel [data-back]') && $('#panel [data-back]').addEventListener('click', () => { o.step--; render(); scrollTo({ top: 0, behavior: 'smooth' }); });
      $('#panel [data-next]') && $('#panel [data-next]').addEventListener('click', next);
    }
    function next() {
      const k = STEPS[o.step].k;
      if (k === 'dati' && !validaDati()) return;
      if (k === 'pay' && !o.pay.ok) return paga();
      if (k === 'del') {
        if (o.del.modo === 'domicilio') { const v = ($('#del-ind') || {}).value || ''; if (v.trim().length < 6) { $('#del-ind').focus(); $('#del-ind').style.borderColor = 'var(--red)'; return; } o.del.ind = v; }
        o.numero = o.numero || `LF-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`;
        try { localStorage.setItem('lf-ordine', JSON.stringify({ ...o, docs: Object.fromEntries(Object.keys(o.docs).map((x) => [x, { ocr: o.docs[x].ocr }])), firma: null, quando: new Date().toISOString(), dovuto: dovutoOggi(), unit: unitTot() })); } catch (e) { /* ignora */ }
      }
      o.step++; render(); scrollTo({ top: 0, behavior: 'smooth' });
    }

    function validaDati() {
      const f = $('#w-form'); let ok = true;
      $$('input', f).forEach((i) => { i.style.borderColor = ''; if (!i.checkValidity() || (i.name === 'cf' && !parseCF(i.value))) { i.style.borderColor = 'var(--red)'; if (ok) i.focus(); ok = false; } });
      if (!ok) LF.toast('Controlla i campi evidenziati');
      return ok;
    }
    function paga() {
      if (o.pay.metodo === 'carta') {
        const n = ($('#cc-num').value || '').replace(/\s/g, ''); const ex = $('#cc-exp').value; const cv = $('#cc-cvc').value;
        const bad = [[n.length < 15, '#cc-num'], [!/^\d{2}\/\d{2}$/.test(ex), '#cc-exp'], [cv.length < 3, '#cc-cvc']].filter((x) => x[0]);
        $$('#cc-num, #cc-exp, #cc-cvc').forEach((i) => { i.style.borderColor = ''; });
        if (bad.length) { bad.forEach(([, s]) => { $(s).style.borderColor = 'var(--red)'; }); LF.toast('Inserisci una carta di test'); return; }
      }
      if (o.pay.metodo === 'sepa') { const ib = ($('#iban').value || '').replace(/\s/g, ''); if (ib.length < 15) { $('#iban').style.borderColor = 'var(--red)'; return; } o.pay.iban = $('#iban').value; }
      const btn = $('#panel [data-next]'); btn.disabled = true; btn.innerHTML = '<span class="spinner" style="width:18px;height:18px;border-width:2px;border-color:rgba(0,0,0,.2);border-top-color:#07080A"></span> Autorizzazione in corso';
      const sheet = document.createElement('div'); sheet.className = 'modal open';
      sheet.innerHTML = `<div class="modal-bg"></div><div class="modal-box" style="max-width:400px;text-align:center"><span class="tiny">${o.pay.metodo === 'apple' ? 'Apple Pay' : o.pay.metodo === 'sepa' ? 'Mandato SEPA' : '3D Secure · La tua banca'}</span><h2 style="font-size:26px;margin-top:14px">Conferma il pagamento</h2><p class="muted" style="margin-top:8px">€${eur(dovutoOggi())} a LocaFit Rent S.r.l.</p><div style="margin:26px auto 6px" class="spinner"></div><p class="tiny" style="font-size:11px;margin-top:14px">Demo · nessun addebito reale</p></div>`;
      document.body.appendChild(sheet);
      setTimeout(() => { $('.modal-box', sheet).innerHTML = `<div class="done-hero" style="padding:8px 0"><span class="ok">${I.check}</span><h2 style="font-size:26px;margin-top:18px">Pagamento autorizzato</h2><p class="muted" style="margin-top:8px">€${eur(dovutoOggi())}</p></div>`; }, 1700);
      setTimeout(() => { sheet.remove(); o.pay.ok = true; o.step++; render(); scrollTo({ top: 0, behavior: 'smooth' }); }, 2700);
    }

    const bind = {
      auto() {
        $('#w-car').addEventListener('change', (e) => { o.id = e.target.value; render(); });
        LF.segDurata($('#w-seg'), o.tipo, (t) => { o.tipo = t; render(); });
        const box = $('#w-opts');
        const pills = (key, vals, fmt) => `<div class="pills" data-k="${key}">${vals.map((v) => `<button type="button" class="pill ${o[key] === v ? 'on' : ''}" data-v="${v}">${fmt(v)}</button>`).join('')}</div>`;
        if (o.tipo === 'breve') box.innerHTML = `<div><div class="opt-label">Giorni <output>${o.giorni}</output></div><input type="range" min="1" max="30" value="${o.giorni}" data-r="giorni"></div>`;
        else if (o.tipo === 'medio') box.innerHTML = `<div><div class="opt-label">Mesi <output>${o.mesi}</output></div><input type="range" min="1" max="12" value="${o.mesi}" data-r="mesi"></div>`;
        else box.innerHTML = `<div><div class="opt-label">Durata</div>${pills('durata', [24, 36, 48, 60], (v) => v + ' mesi')}</div><div><div class="opt-label">Km all’anno</div>${pills('km', [10, 15, 20, 30], (v) => v + '.000')}</div><div><div class="opt-label">Anticipo</div>${pills('anticipo', [0, 2000, 5000], (v) => (v ? '€' + eur(v) : 'Zero'))}</div>`;
        $$('[data-r]', box).forEach((r) => r.addEventListener('input', () => { o[r.dataset.r] = +r.value; $('output', r.parentNode).textContent = r.value; summary(); save(o); }));
        $$('.pills', box).forEach((p) => p.addEventListener('click', (e) => { const b = e.target.closest('.pill'); if (!b) return; o[p.dataset.k] = +b.dataset.v; $$('.pill', p).forEach((x) => x.classList.toggle('on', x === b)); summary(); save(o); }));
        $$('[data-extra]').forEach((c) => c.addEventListener('change', () => { o.extra[c.dataset.extra] = c.checked; summary(); save(o); }));
      },
      dati() {
        $$('input[name=cliente]').forEach((r) => r.addEventListener('change', () => { collect(); o.cliente = r.value; render(); }));
        const f = $('#w-form');
        f.addEventListener('input', (e) => {
          collect();
          if (e.target.name === 'cf') { const r = parseCF(e.target.value); $('#cf-hint').innerHTML = r ? `<span style="color:var(--blue)">✓ Nato/a il ${r.nascita.toLocaleDateString('it-IT')} · ${r.sesso === 'F' ? 'Femmina' : 'Maschio'}</span>` : '16 caratteri'; if (r) { const n = f.nascita; n.value = new Date(r.nascita.getTime() - r.nascita.getTimezoneOffset() * 60000).toISOString().slice(0, 10); collect(); } e.target.classList.toggle('ok-field', !!r); }
        });
        $('[data-demo-dati]').addEventListener('click', () => {
          Object.assign(o.d, { nome: 'Marco', cognome: 'Rossi', cf: 'RSSMRC88M14H501T', nascita: '1988-08-14', email: 'marco.rossi@example.com', tel: '+39 333 123 4567', ind: 'Viale Parioli 40', cap: '00197', citta: 'Roma', rag: 'Rossi Consulting S.r.l.', piva: '01234567890' });
          render(); LF.toast('Dati demo inseriti');
        });
        function collect() { new FormData(f).forEach((v, k) => { o.d[k] = v; }); save(o); }
      },
      doc() {
        const ocrFor = (k) => {
          const n = `${(o.d.nome || 'Marco')} ${(o.d.cognome || 'Rossi')}`;
          return { patenteF: `Nome: <b>${esc(n)}</b><br>Categoria: <b>B</b> · Scadenza: <b>12/03/2033</b>`, patenteR: 'Categorie: <b>AM, B1, B</b><br>Restrizioni: <b>nessuna</b>', identita: `Titolare: <b>${esc(n)}</b><br>Validità: <b>valido</b>`, cf: `Codice: <b>${esc((o.d.cf || 'RSSMRC88M14H501T').toUpperCase())}</b><br>Corrispondenza dati: <b>ok</b>`, reddito: 'Reddito annuo: <b>verificato</b><br>Rapporto rata/reddito: <b>idoneo</b>', visura: `P.IVA: <b>${esc(o.d.piva || '01234567890')}</b><br>Stato: <b>attiva</b>` }[k];
        };
        const accept = (k, src) => {
          const box = $(`.drop[data-doc="${k}"]`);
          box.innerHTML = `<div class="head"><div><b>${$('b', box) ? $('b', box).textContent : ''}</b><small>Lettura in corso…</small></div><span class="ico"><span class="spinner" style="width:16px;height:16px;border-width:2px"></span></span></div><img class="thumb" src="${src}" alt=""><div class="scan"></div>`;
          setTimeout(() => { o.docs[k] = { src, ocr: ocrFor(k) }; render(); }, 1300);
        };
        $$('.drop').forEach((box) => {
          const k = box.dataset.doc; const input = $('input', box); if (!input) return;
          input.addEventListener('change', () => { const f = input.files[0]; if (!f) return; if (f.type.startsWith('image/')) { const r = new FileReader(); r.onload = () => accept(k, r.result); r.readAsDataURL(f); } else accept(k, fakeDoc(k, o.d)); });
          box.addEventListener('dragover', (e) => { e.preventDefault(); box.classList.add('over'); });
          box.addEventListener('dragleave', () => box.classList.remove('over'));
        });
        $('[data-demo-doc]').addEventListener('click', () => {
          o._need.forEach((k, i) => { if (!o.docs[k]) setTimeout(() => accept(k, fakeDoc(k, o.d)), i * 250); });
        });
      },
      ver() {
        if (o.ver) return;
        let stream;
        const run = (useCam) => {
          const cam = $('#cam'); const msg = $('#cam-msg');
          $$('[data-selfie],[data-spid],[data-selfie-sim]').forEach((b) => { b.disabled = true; });
          const seq = [['Guarda dritto nella fotocamera', 'doc'], ['Gira lentamente la testa a destra', 'face'], ['Ora sorridi', 'live'], ['Analisi in corso…', o.tipo === 'breve' ? 'card' : 'crif']];
          seq.forEach(([m, ck], i) => setTimeout(() => {
            msg.textContent = m;
            $$('.check-item').forEach((c) => { if (c.dataset.ck === ck) c.classList.add('run'); });
            setTimeout(() => { const c = $(`.check-item[data-ck="${ck}"]`); c.classList.remove('run'); c.classList.add('ok'); if (ck === 'crif') { $('#g-arc').style.strokeDashoffset = 276.5 * (1 - 0.86); let v = 0; const t = setInterval(() => { v += 3; $('#g-val').textContent = Math.min(v, 86); if (v >= 86) clearInterval(t); }, 40); } }, 1100);
          }, i * 1500));
          setTimeout(() => { cam.classList.add('ok'); msg.textContent = 'Identità verificata'; $('#approved').classList.add('show'); if (stream) stream.getTracks().forEach((t) => t.stop()); o.ver = true; save(o); const n = $('#panel [data-next]'); n.disabled = false; }, seq.length * 1500 + 600);
        };
        $('[data-selfie]').addEventListener('click', async () => {
          try {
            stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
            const v = document.createElement('video'); v.autoplay = true; v.playsInline = true; v.muted = true; v.srcObject = stream; $('#cam').prepend(v); $('.silhouette').remove(); run(true);
          } catch (e) { LF.toast('Fotocamera non disponibile: simulo la verifica'); run(false); }
        });
        $('[data-selfie-sim]').addEventListener('click', () => run(false));
        $('[data-spid]').addEventListener('click', () => {
          const sheet = document.createElement('div'); sheet.className = 'modal open';
          sheet.innerHTML = `<div class="modal-bg"></div><div class="modal-box" style="max-width:420px"><span class="tiny">SPID · Sistema Pubblico di Identità Digitale</span><h2 style="font-size:26px;margin-top:14px">Scegli il tuo provider</h2><div style="display:grid;gap:8px;margin-top:20px">${['Poste ID', 'Aruba ID', 'InfoCert ID', 'Namirial ID', 'Sielte ID'].map((p) => `<button class="btn btn-grey btn-block" data-p="${p}" style="justify-content:flex-start">${p}</button>`).join('')}</div><p class="tiny" style="font-size:11px;margin-top:16px">Demo · accesso simulato</p></div>`;
          document.body.appendChild(sheet);
          sheet.addEventListener('click', (e) => { const b = e.target.closest('[data-p]'); if (b) { $('.modal-box', sheet).innerHTML = `<div style="text-align:center;padding:20px"><div class="spinner" style="margin:0 auto"></div><p class="muted" style="margin-top:16px">Autenticazione con ${b.dataset.p}…</p></div>`; setTimeout(() => { sheet.remove(); run(false); }, 1600); } if (e.target.classList.contains('modal-bg')) sheet.remove(); });
        });
      },
      firma() {
        const c = $('#pad'); const ctx = c.getContext('2d'); let drawing = false, drawn = !!o.firma;
        const size = () => { const r = c.getBoundingClientRect(); c.width = r.width * 2; c.height = r.height * 2; ctx.scale(2, 2); ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#fff'; if (o.firma) { const im = new Image(); im.onload = () => ctx.drawImage(im, 0, 0, r.width, r.height); im.src = o.firmaW || o.firma; } };
        size();
        const pos = (e) => { const r = c.getBoundingClientRect(); const t = e.touches ? e.touches[0] : e; return [t.clientX - r.left, t.clientY - r.top]; };
        const start = (e) => { if (o.otp) return; drawing = true; ctx.beginPath(); ctx.moveTo(...pos(e)); e.preventDefault(); };
        const move = (e) => { if (!drawing) return; ctx.lineTo(...pos(e)); ctx.stroke(); drawn = true; e.preventDefault(); };
        const end = () => { if (!drawing) return; drawing = false; o.firmaW = c.toDataURL(); o.firma = darkSig(); save(o); $('.sig div:last-child', $('#contract')).innerHTML = `Il Cliente<img src="${o.firma}" alt="Firma">`; };
        c.addEventListener('mousedown', start); c.addEventListener('mousemove', move); addEventListener('mouseup', end);
        c.addEventListener('touchstart', start, { passive: false }); c.addEventListener('touchmove', move, { passive: false }); c.addEventListener('touchend', end);
        $('[data-clear]').addEventListener('click', () => { if (o.otp) return; ctx.clearRect(0, 0, c.width, c.height); drawn = false; o.firma = null; o.firmaW = null; save(o); });
        function darkSig() { const t = document.createElement('canvas'); t.width = c.width; t.height = c.height; const x = t.getContext('2d'); x.drawImage(c, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = '#1B2A6B'; x.fillRect(0, 0, t.width, t.height); return t.toDataURL(); }
        const smsBtn = $('[data-sms]');
        smsBtn && smsBtn.addEventListener('click', () => {
          if (!drawn) { LF.toast('Prima firma nel riquadro'); return; }
          if (!$('#acc1').checked || !$('#acc2').checked) { LF.toast('Accetta le condizioni per proseguire'); return; }
          const code = String(Math.floor(100000 + Math.random() * 900000));
          $('#sms-zone').innerHTML = `<div class="sms"><span class="ic">${I.chat}</span><div><span class="tiny" style="font-size:10.5px">SMS · LocaFit · adesso</span><br>Il tuo codice per firmare il contratto è <b>${code}</b>. Non condividerlo con nessuno.</div></div>
            <div class="otp" id="otp">${Array.from({ length: 6 }, () => '<input inputmode="numeric" maxlength="1" aria-label="Cifra">').join('')}</div><span class="hint mono" style="font-size:11px;color:var(--muted-2);display:block;margin-top:8px">Demo: il codice è mostrato qui sopra</span>`;
          const ins = $$('#otp input'); ins[0].focus();
          ins.forEach((inp, i) => {
            inp.addEventListener('input', () => { inp.value = inp.value.replace(/\D/g, ''); if (inp.value && ins[i + 1]) ins[i + 1].focus(); check(); });
            inp.addEventListener('keydown', (e) => { if (e.key === 'Backspace' && !inp.value && ins[i - 1]) ins[i - 1].focus(); });
            inp.addEventListener('paste', (e) => { const t = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6); if (t.length === 6) { e.preventDefault(); ins.forEach((x, j) => { x.value = t[j]; }); check(); } });
          });
          function check() { const v = ins.map((x) => x.value).join(''); if (v.length < 6) return; if (v === code) { o.otp = true; o.numero = o.numero || `LF-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`; save(o); LF.toast('Contratto firmato'); setTimeout(render, 500); } else { ins.forEach((x) => { x.style.borderColor = 'var(--red)'; x.value = ''; }); ins[0].focus(); LF.toast('Codice errato, riprova'); } }
        });
      },
      pay() {
        $$('[data-metodo]').forEach((b) => b.addEventListener('click', () => { o.pay.metodo = b.dataset.metodo; render(); }));
        $('[data-apply]').addEventListener('click', () => { o.pay.codice = $('#promo-code').value.trim(); render(); if (codeInfo()) LF.toast('Codice applicato'); });
        const num = $('#cc-num');
        if (num) {
          num.addEventListener('input', () => { const v = num.value.replace(/\D/g, '').slice(0, 16); num.value = v.replace(/(.{4})/g, '$1 ').trim(); $('#cv-num').textContent = (v + '•'.repeat(16 - v.length)).replace(/(.{4})/g, '$1 ').trim(); });
          $('#cc-exp').addEventListener('input', (e) => { let v = e.target.value.replace(/\D/g, '').slice(0, 4); if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2); e.target.value = v; $('#cv-exp').textContent = v || 'MM/AA'; });
        }
      },
      del() {
        $$('input[name=modo]').forEach((r) => r.addEventListener('change', () => { o.del.modo = r.value; render(); }));
        $('#del-sede') && $('#del-sede').addEventListener('change', (e) => { o.del.sede = e.target.value; save(o); });
        $('#del-ind') && $('#del-ind').addEventListener('input', (e) => { o.del.ind = e.target.value; save(o); });
        $$('[data-day]').forEach((b) => b.addEventListener('click', () => { o.del.giorno = b.dataset.day; o.del.ora = ''; render(); }));
        $$('[data-ora]').forEach((b) => b.addEventListener('click', () => { o.del.ora = b.dataset.ora; render(); }));
      },
      fine() {
        $('[data-pdf]').addEventListener('click', () => {
          const w = window.open('', '_blank'); if (!w) { LF.toast('Consenti i pop-up per scaricare'); return; }
          w.document.write(`<!doctype html><title>Contratto ${o.numero}</title><style>body{font:14px/1.6 Geist,Arial,sans-serif;color:#15171C;max-width:760px;margin:40px auto;padding:0 24px}h4{margin:18px 0 6px}table{width:100%;border-collapse:collapse}td{padding:6px 0;border-bottom:1px solid #ddd}td:last-child{text-align:right}.hd{display:flex;justify-content:space-between;border-bottom:1px solid #ccc;padding-bottom:16px}.sig{display:flex;gap:20px;margin-top:30px}.sig div{flex:1;border-top:1px solid #999;padding-top:6px;min-height:80px;position:relative;font-size:12px}.sig img{position:absolute;bottom:20px;left:0;height:56px}</style>${contractHTML()}<script>setTimeout(()=>print(),400)<\/script>`);
          w.document.close();
        });
        $('[data-ics]').addEventListener('click', () => {
          const g = new Date(o.del.giorno); const [h] = o.del.ora.split(':').map(Number);
          const s = new Date(g); s.setHours(h, 0, 0); const e = new Date(s); e.setHours(h + 2);
          const f = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
          const a = car();
          const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//LocaFit Rent//IT\r\nBEGIN:VEVENT\r\nUID:${o.numero}@locafitrent.it\r\nDTSTAMP:${f(new Date())}\r\nDTSTART:${f(s)}\r\nDTEND:${f(e)}\r\nSUMMARY:${o.del.modo === 'sede' ? 'Ritiro' : 'Consegna'} ${a.marca} ${a.modello} · LocaFit\r\nLOCATION:${o.del.modo === 'sede' ? (LF.sedi.find((x) => x.id === o.del.sede) || {}).indirizzo : o.del.ind}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
          const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
          const l = document.createElement('a'); l.href = url; l.download = `locafit-${o.numero}.ics`; l.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
        });
        try { sessionStorage.removeItem('lf-wizard'); } catch (e) { /* ignora */ }
      },
    };
    if (o.step === 7 && !o.numero) o.step = 0;
    render();
  }

  /* =================== AREA PERSONALE =================== */
  if (page === 'area') {
    let o; try { o = JSON.parse(localStorage.getItem('lf-ordine') || 'null'); } catch (e) { o = null; }
    const demo = !o;
    if (demo) {
      const g = new Date(); g.setDate(g.getDate() - 42);
      o = { id: 'mercedes-a', tipo: 'medio', mesi: 6, d: { nome: 'Marco', cognome: 'Rossi', email: 'marco.rossi@example.com', tel: '+39 333 123 4567' }, del: { modo: 'domicilio', giorno: g.toISOString(), ora: '11:00', ind: 'Viale Parioli 40, 00197 Roma' }, numero: 'LF-2026-48213', unit: LF.prezzo(byId('mercedes-a'), 'medio', { mesi: 6 }).unit, quando: g.toISOString(), docs: { patenteF: 1, patenteR: 1, identita: 1, cf: 1 } };
    }
    const a = byId(o.id) || byId('mercedes-a'); const start = new Date(o.del.giorno);
    const fine = new Date(start); if (o.tipo === 'breve') fine.setDate(fine.getDate() + (o.giorni || 3)); else fine.setMonth(fine.getMonth() + (o.tipo === 'medio' ? o.mesi : o.durata));
    const consegnata = start <= new Date();
    const kmTot = o.tipo === 'breve' ? 250 * (o.giorni || 3) : o.tipo === 'medio' ? 2500 * o.mesi : o.km * 1000 * (o.durata / 12);
    const giorniPassati = Math.max(0, Math.round((new Date() - start) / 86400000)); const giorniTot = Math.max(1, Math.round((fine - start) / 86400000));
    const kmFatti = consegnata ? Math.round(kmTot * Math.min(1, giorniPassati / giorniTot) * 0.92) : 0;
    const nome = `${o.d.nome || 'Marco'} ${o.d.cognome || 'Rossi'}`;
    const docs = [['patenteF', 'Patente di guida'], ['identita', 'Carta d’identità'], ['cf', 'Tessera sanitaria'], ['reddito', 'Documento di reddito'], ['visura', 'Visura camerale']].filter(([k]) => o.docs && o.docs[k]);
    const pagamenti = Array.from({ length: Math.min(4, Math.max(1, Math.floor(giorniPassati / 30) + 1)) }, (_, i) => { const d = new Date(start); d.setMonth(d.getMonth() + i); return d; }).reverse();
    $('#account').innerHTML = `
      <nav class="acc-nav" aria-label="Area personale">
        <div class="who"><span class="av">${nome.split(' ').map((x) => x[0]).join('')}</span><div><b style="font-weight:500">${LF.$ ? nome : ''}</b><small>Cliente dal 2026</small></div></div>
        <a href="#panoramica" class="on">${I.home}Panoramica</a><a href="#documenti">${I.doc}Documenti</a><a href="#pagamenti">${I.card}Pagamenti</a><a href="#assistenza">${I.chat}Assistenza</a><a href="#profilo">${I.user}Profilo</a><a href="index.html">${I.logout}Esci</a>
      </nav>
      <div>
        ${demo ? `<div class="promo-line" style="margin-bottom:16px;background:rgba(255,255,255,.04);border-color:var(--line-2)"><span>${I.sparkle.replace('<svg', '<svg width="16" height="16"')} Account dimostrativo. Completa una <a class="link" href="prenota.html?id=porsche-911&amp;tipo=breve" style="font-size:13px">prenotazione demo</a> per vedere qui il tuo noleggio.</span></div>` : ''}
        <div style="display:flex;justify-content:space-between;align-items:end;gap:16px;flex-wrap:wrap;margin-bottom:20px"><div><span class="kicker">Area personale</span><h1 style="font-size:clamp(36px,4vw,56px);margin-top:12px">Ciao, ${o.d.nome || 'Marco'}.</h1></div><a class="btn btn-primary" href="flotta.html">Nuovo noleggio</a></div>
        <div class="acc-grid" id="panoramica">
          <div class="acc-card acc-car"><div class="stage">${LF.carShot(a)}</div><div>
            <h3>Il tuo noleggio <span class="badge ${consegnata ? 'badge-dark' : 'badge-grey'}">${consegnata ? '<span class="dot"></span>Attivo' : 'In preparazione'}</span></h3>
            <div class="big">${a.marca} ${a.modello}</div><p class="muted" style="margin-top:6px">${a.versione} · ${LF.durate[o.tipo].nome}</p>
            <div class="list-rows" style="margin-top:14px"><div class="r"><span class="muted">Contratto</span><span class="mono">${o.numero}</span></div><div class="r"><span class="muted">${consegnata ? 'Iniziato' : (o.del.modo === 'sede' ? 'Ritiro' : 'Consegna')}</span><span>${fmtDate(start)} · ${o.del.ora}</span></div><div class="r"><span class="muted">Scadenza</span><span>${fmtDate(fine)}</span></div></div></div></div>
          <div class="acc-card span-acc-2"><h3>Stato</h3><div class="timeline" style="margin-top:20px">
            <div class="tl done"><small>${fmtDate(new Date(o.quando))}</small><b>Contratto firmato</b></div>
            <div class="tl ${consegnata ? 'done' : 'now'}"><small>${consegnata ? 'Completato' : 'In corso'}</small><b>Preparazione auto</b></div>
            <div class="tl ${consegnata ? 'done' : ''}"><small>${fmtDate(start)}</small><b>${o.del.modo === 'sede' ? 'Ritiro in sede' : 'Consegna a domicilio'}</b></div>
            <div class="tl ${consegnata ? 'now' : ''}" style="padding-bottom:0"><small>${fmtDate(fine)}</small><b>Fine noleggio</b></div></div></div>
          <div class="acc-card span-acc-2"><h3>Chilometri ${I.gauge.replace('<svg', '<svg width="16" height="16"')}</h3><div class="big" style="font-size:40px;font-weight:500;letter-spacing:-.05em;margin-top:18px">${eur(kmFatti)}<span class="muted" style="font-size:16px;letter-spacing:0"> / ${eur(kmTot)} km</span></div><div class="meter"><div class="bar"><i style="width:${Math.max(2, (kmFatti / kmTot) * 100)}%"></i></div><div class="lbl" style="margin-top:8px"><span>In linea con il piano</span><span>${Math.round((kmFatti / kmTot) * 100)}%</span></div></div></div>
          <div class="acc-card span-acc-2"><h3>Prossimo addebito ${I.calendar.replace('<svg', '<svg width="16" height="16"')}</h3><div class="big" style="font-size:40px;font-weight:500;letter-spacing:-.05em;margin-top:18px">€${eur(o.unit || 0)}</div><p class="muted" style="margin-top:8px">${o.tipo === 'breve' ? 'Nessun addebito: noleggio già saldato' : 'Il ' + fmtDate(((d) => { d.setMonth(d.getMonth() + 1); return d; })(new Date(pagamenti[0]))) + ' · SEPA'}</p></div>
          <div class="acc-card span-acc-2"><h3>Assistenza 24/7 ${I.phone.replace('<svg', '<svg width="16" height="16"')}</h3><p class="muted" style="margin-top:18px">Guasto, incidente o una domanda? Siamo raggiungibili sempre.</p><div style="display:flex;gap:8px;margin-top:18px;flex-wrap:wrap"><a class="btn btn-sm btn-primary" href="tel:+390645217780">Chiama</a><a class="btn btn-sm btn-grey" data-wa="Ciao LocaFit, sono ${esc(nome)} (contratto ${o.numero})." href="#">${I.wa}WhatsApp</a></div></div>
          <div class="acc-card span-acc-3" id="documenti"><h3>Documenti <span class="badge badge-grey">${docs.length + 1} verificati</span></h3><div class="list-rows">
            <div class="r"><div class="l"><span class="fi">${I.pen}</span><div>Contratto di noleggio<small>Firmato digitalmente · PDF</small></div></div><button class="icon-btn" data-dl aria-label="Scarica contratto">${I.download}</button></div>
            ${docs.map(([, t]) => `<div class="r"><div class="l"><span class="fi">${I.id}</span><div>${t}<small>Verificato il ${fmtDate(new Date(o.quando))}</small></div></div><span class="badge badge-grey">${I.check.replace('<svg', '<svg width="11" height="11"')}OK</span></div>`).join('')}</div></div>
          <div class="acc-card span-acc-3" id="pagamenti"><h3>Pagamenti</h3><div class="list-rows">${pagamenti.map((d, i) => `<div class="r"><div class="l"><span class="fi">${I.euro}</span><div>${i === pagamenti.length - 1 ? (o.tipo === 'breve' ? 'Noleggio' : 'Primo canone') : 'Canone mensile'}<small>${fmtDate(d)} · ${i === pagamenti.length - 1 ? 'Carta' : 'SEPA'}</small></div></div><div style="display:flex;gap:10px;align-items:center"><b style="font-weight:500">€${eur(i === pagamenti.length - 1 && o.dovuto ? o.dovuto : o.unit)}</b><button class="icon-btn" data-dl aria-label="Scarica fattura">${I.download}</button></div></div>`).join('')}</div></div>
          <div class="acc-card span-acc-6" id="assistenza"><h3>Gestisci il noleggio</h3><div class="choices" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
            ${[['calendar', 'Prolunga il noleggio', 'Aggiungi giorni o mesi'], ['swap', 'Cambia auto', 'Passa a un altro modello'], ['alert', 'Segnala un guasto', 'Soccorso in 60 minuti'], ['shield', 'Denuncia sinistro', 'Modulo CAI digitale'], ['wrench', 'Prenota tagliando', 'Ritiro e riconsegna a casa']].map(([ic, t, s]) => `<button class="choice" type="button" style="text-align:left" data-act="${t}">${I[ic]}<b>${t}</b><small>${s}</small></button>`).join('')}</div></div>
          <div class="acc-card span-acc-6" id="profilo"><h3>Profilo</h3><div class="kv" style="margin-top:16px"><div><small>Nome</small><b>${esc(nome)}</b></div><div><small>Email</small><b style="font-size:15px">${esc(o.d.email || '')}</b></div><div><small>Cellulare</small><b>${esc(o.d.tel || '')}</b></div><div><small>Indirizzo</small><b style="font-size:15px">${esc(o.del.ind || [o.d.ind, o.d.citta].filter(Boolean).join(', ') || '—')}</b></div></div></div>
        </div>
      </div>`;
    $$('[data-wa]').forEach((el) => { el.href = LF.waLink(el.dataset.wa); el.target = '_blank'; el.rel = 'noopener'; });
    $$('[data-dl]').forEach((b) => b.addEventListener('click', () => LF.toast('Documento scaricato (demo)')));
    $$('[data-act]').forEach((b) => b.addEventListener('click', () => LF.openLead({ id: a.id, tipo: o.tipo, title: b.dataset.act, kicker: 'Area personale' })));
    $$('.acc-nav a[href^="#"]').forEach((l) => l.addEventListener('click', () => { $$('.acc-nav a').forEach((x) => x.classList.toggle('on', x === l)); }));
  }
})();
