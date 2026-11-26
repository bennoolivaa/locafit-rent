/* LOCAFIT Rent — Gestionale: interfaccia */
(function () {
  const { esc, eur, fmtD, fmtDL, fmtDW, T, addD, addM, diff, num } = G;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const sv = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const I = {
    dash: sv('<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>'),
    doc: sv('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>'),
    plan: sv('<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4M7 13h5M10 17h7"/>'),
    truck: sv('<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>'),
    car: sv('<path d="M5 16V11l2-5h10l2 5v5"/><path d="M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="13.5" r=".6"/><circle cx="16.5" cy="13.5" r=".6"/>'),
    users: sv('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.7-3.6 3.3-5.5 6.5-5.5s5.8 1.9 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c2 .7 3.2 2.5 3.5 5.2"/>'),
    inbox: sv('<path d="M3 13h5l1.5 3h5L16 13h5"/><path d="M5.5 5h13L21 13v6H3v-6z"/>'),
    euro: sv('<path d="M17 6.5A6.5 6.5 0 1 0 17 17.5"/><path d="M4 10h9M4 14h9"/>'),
    wrench: sv('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3.5 17.3a1.8 1.8 0 0 0 2.5 2.6l5.9-5.8a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>'),
    ticket: sv('<path d="M4 4h16v16l-3-2-3 2-2-2-2 2-3-2-3 2z"/><path d="M8 9h8M8 13h5"/>'),
    tag: sv('<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>'),
    cog: sv('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
    search: sv('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    x: sv('<path d="M6 6l12 12M18 6 6 18"/>'),
    menu: sv('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    bell: sv('<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>'),
    out: sv('<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/>'),
    check: sv('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
    phone: sv('<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>'),
    wa: sv('<path d="M4 20l1.3-4A8 8 0 1 1 8.5 19z"/><path d="M9 9.5c.3 2 2.5 4.2 4.5 4.5l1-1.2 1.8.8c-.2 1-1 1.7-2 1.7A5.8 5.8 0 0 1 8.5 9.4c0-1 .7-1.8 1.7-2l.8 1.8z"/>'),
    mail: sv('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>'),
    pin: sv('<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    plus: sv('<path d="M12 5v14M5 12h14"/>'),
    dl: sv('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),
    alert: sv('<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>'),
    clock: sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    shield: sv('<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/>'),
    chevL: sv('<path d="m15 6-6 6 6 6"/>'), chevR: sv('<path d="m9 6 6 6-6 6"/>'),
    key: sv('<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l2 2M15 8l2 2"/>'),
  };
  const LOGO = '<img src="assets/img/logo/marchio-negativo.svg" alt="" width="30" height="28">';

  /* ---------- Etichette di stato ---------- */
  const P = {
    c: { richiesta: ['warn', 'Da confermare'], confermata: ['info', 'Confermata'], attivo: ['good', 'In corso'], chiuso: ['', 'Chiuso'], annullato: ['bad', 'Annullato'] },
    v: { disponibile: ['good', 'Disponibile'], noleggiato: ['info', 'Noleggiato'], consegna: ['warn', 'Da consegnare'], officina: ['warn', 'In officina'], arrivo: ['', 'In arrivo'] },
    p: { pagato: ['good', 'Incassato'], aperto: ['info', 'Da incassare'], scaduto: ['bad', 'Scaduto'] },
    d: { ok: ['good', 'Verificati'], attesa: ['warn', 'Da verificare'], scaduti: ['bad', 'Scaduti'] },
    i: { aperto: ['warn', 'Aperto'], 'in lavorazione': ['info', 'In lavorazione'], chiuso: ['good', 'Chiuso'] },
    m: { 'da rinotificare': ['bad', 'Da rinotificare'], rinotificata: ['info', 'Rinotificata'], chiusa: ['good', 'Chiusa'] },
    s: { aperto: ['bad', 'Aperto'], 'in perizia': ['warn', 'In perizia'], chiuso: ['good', 'Chiuso'] },
    l: { nuova: ['info', 'Nuova'], contattato: ['warn', 'Contattato'], preventivo: ['warn', 'Preventivo inviato'], vinta: ['good', 'Vinta'], persa: ['', 'Persa'] },
  };
  const pill = (t, k) => { const x = (P[t] || {})[k] || ['', k]; return `<span class="pill ${x[0]}">${esc(x[1])}</span>`; };
  const ggPill = (g) => (g < 0 ? `<span class="pill bad">Scaduta da ${-g} gg</span>` : g <= 30 ? `<span class="pill warn">${g === 0 ? 'Oggi' : `Tra ${g} gg`}</span>` : `<span class="pill good">Tra ${g} gg</span>`);
  const targa = (v) => (v && v.targa ? `<span class="targa">${esc(v.targa)}</span>` : '<span class="tag">Senza targa</span>');
  const vehCell = (v, sub) => { const a = v && G.model(v.auto); if (!a) return '—'; return `<div class="cell-v"><img src="${G.img(a)}" alt="" loading="lazy"><div><b>${esc(a.marca)} ${esc(a.modello)}</b><small>${sub != null ? sub : targa(v)}</small></div></div>`; };
  const t2 = (a, b) => `<div class="t2"><b>${a}</b>${b ? `<small>${b}</small>` : ''}</div>`;
  const ini = (n) => esc(String(n || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((x) => x[0]).join('').toUpperCase());
  const waHref = (t) => `https://wa.me/${String(t || '').replace(/\D/g, '')}`;
  const yy = T.slice(0, 4);
  const fmtP = (d) => (d.slice(0, 4) === yy ? fmtD(d) : fmtD(d, { day: 'numeric', month: 'short', year: '2-digit' }));
  const periodo = (c) => `${fmtP(c.start)} → ${fmtP(c.end)}`;
  const durata = (c) => (c.tipo === 'breve' ? `${c.len} ${c.len === 1 ? 'giorno' : 'giorni'}` : `${c.len} mesi`);
  const S = () => G.S;

  /* ---------- Toast, drawer, modali ---------- */
  G.toast = (m) => { let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); } t.innerHTML = I.check + esc(m); t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2600); };
  let scrim, drawer, modal, current = null, lastFocus = null;
  function ensureLayers() {
    if (scrim) return;
    scrim = document.createElement('div'); scrim.className = 'scrim'; scrim.hidden = true;
    drawer = document.createElement('aside'); drawer.className = 'drawer'; drawer.setAttribute('role', 'dialog'); drawer.setAttribute('aria-modal', 'true'); drawer.hidden = true;
    modal = document.createElement('div'); modal.className = 'modal'; modal.hidden = true;
    document.body.append(scrim, drawer, modal);
    scrim.addEventListener('click', () => { if (!modal.hidden) closeModal(); else { closeDrawer(); $('.side') && $('.side').classList.remove('open'); } });
  }
  const showScrim = () => { scrim.hidden = false; requestAnimationFrame(() => scrim.classList.add('open')); };
  const hideScrim = () => { if (!drawer.hidden || !modal.hidden || ($('.side') && $('.side').classList.contains('open'))) return; scrim.classList.remove('open'); setTimeout(() => { if (!scrim.classList.contains('open')) scrim.hidden = true; }, 200); };
  function openDrawer(html) {
    ensureLayers(); if (drawer.hidden) lastFocus = document.activeElement;
    const keep = !drawer.hidden && $('.dr-b', drawer) ? $('.dr-b', drawer).scrollTop : 0;
    drawer.innerHTML = html; drawer.hidden = false; showScrim();
    if (keep) $('.dr-b', drawer).scrollTop = keep;
    requestAnimationFrame(() => { drawer.classList.add('open'); const f = $('.x', drawer); f && f.focus({ preventScroll: true }); });
  }
  function closeDrawer() { if (!drawer || drawer.hidden) return; drawer.classList.remove('open'); current = null; setTimeout(() => { if (!drawer.classList.contains('open')) { drawer.hidden = true; hideScrim(); } }, 250); lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true }); }
  const drH = (kick, title, extra = '') => `<div class="dr-h"><div><small>${kick}</small><h2>${title}</h2>${extra}</div><button class="x" data-act="closeDrawer" aria-label="Chiudi">${I.x}</button></div>`;
  function openModal(title, body, onSubmit, opt = {}) {
    ensureLayers();
    modal.innerHTML = `<form novalidate>${drH(opt.kick || 'LOCAFIT Rent', esc(title))}<div class="dr-b">${body}</div><div class="dr-f"><button type="submit" class="btn ${opt.danger ? 'btn-danger' : 'btn-primary'}">${esc(opt.ok || 'Salva')}</button><button type="button" class="btn btn-line" data-act="closeModal">Annulla</button></div></form>`;
    $('.x', modal).dataset.act = 'closeModal';
    modal.hidden = false; showScrim(); requestAnimationFrame(() => modal.classList.add('open'));
    const f = $('form', modal);
    setTimeout(() => { const el = $('input:not([type=hidden]):not([type=radio]):not([type=checkbox]), select, textarea', f); el && el.focus(); }, 60);
    f.addEventListener('submit', (e) => { e.preventDefault(); const fd = Object.fromEntries(new FormData(f)); const r = onSubmit(fd, f); if (r !== false) closeModal(); });
    opt.bind && opt.bind(f);
  }
  function closeModal() { if (!modal || modal.hidden) return; modal.classList.remove('open'); setTimeout(() => { modal.hidden = true; modal.innerHTML = ''; hideScrim(); }, 200); }
  G.confirm = (title, text, ok, cb, danger = true) => openModal(title, `<p>${text}</p>`, () => { cb(); }, { ok, danger });
  const fail = (f, msg) => { let n = $('.note.bad', f); if (!n) { n = document.createElement('div'); n.className = 'note bad'; $('.dr-b', f).prepend(n); } n.textContent = msg; $('.dr-b', f).scrollTop = 0; return false; };

  /* Dopo ogni modifica: salva, ridisegna la vista e il pannello aperto */
  function refresh(msg) {
    G.save(); renderNav(); renderView(true);
    if (current && drawer && !drawer.hidden) OPEN[current.t](current.id, true);
    if (msg) G.toast(msg);
  }

  /* ---------- Navigazione ---------- */
  const ROUTES = [
    ['grp', 'Operativo'],
    ['dashboard', 'Panoramica', I.dash],
    ['contratti', 'Prenotazioni e contratti', I.doc, () => S().contratti.filter((c) => c.stato === 'richiesta' && G.inSede(G.contrSede(c))).length],
    ['planning', 'Planning flotta', I.plan],
    ['consegne', 'Consegne e ritiri', I.truck, () => jobs(T, T).filter((j) => !j.done).length],
    ['flotta', 'Flotta', I.car],
    ['clienti', 'Clienti', I.users],
    ['richieste', 'Richieste e lead', I.inbox, () => S().richieste.filter((r) => r.stato === 'nuova' && G.inSede(r.sede)).length],
    ['grp', 'Amministrazione'],
    ['pagamenti', 'Pagamenti', I.euro, () => pagamenti().filter((p) => G.pagStato(p) === 'scaduto').length],
    ['officina', 'Officina e scadenze', I.wrench],
    ['multe', 'Multe e sinistri', I.ticket, () => S().multe.filter((m) => m.stato === 'da rinotificare' && G.inSede((G.veh(m.veh) || {}).sede)).length],
    ['listino', 'Listino e promozioni', I.tag],
    ['impostazioni', 'Impostazioni', I.cog],
  ];
  const route = () => { const r = (location.hash || '').replace('#', '').split('?')[0]; return ROUTES.some((x) => x[0] === r) ? r : 'dashboard'; };
  const go = (r) => { if (location.hash !== '#' + r) location.hash = r; else renderView(); };

  function shell() {
    const u = G.user();
    document.body.innerHTML = `<div class="app">
      <aside class="side" aria-label="Menu gestionale">
        <a class="brand" href="#dashboard">${LOGO}<div><b>LOCAFIT<span>RENT</span></b><em>Gestionale</em></div></a>
        <nav id="nav"></nav>
        <div class="me"><span class="av">${ini(u.nome)}</span><div><b>${esc(u.nome)}</b><small>${esc(u.ruolo)}${u.sede ? ' · ' + esc(G.sedeNome(u.sede)) : ''}</small></div><button data-act="logout" aria-label="Esci" title="Esci">${I.out}</button></div>
      </aside>
      <div class="main">
        <header class="top">
          <button class="burger" data-act="burger" aria-label="Apri menu">${I.menu}</button>
          <div class="search search-top">${I.search}<input id="gsearch" type="search" placeholder="Cerca cliente, targa, contratto…" autocomplete="off" aria-label="Cerca nel gestionale"><div class="search-res" id="gres" hidden></div></div>
          <div class="top-r">
            <button class="icon-btn" data-act="mobileSearch" aria-label="Cerca" style="display:none" id="msearch">${I.search}</button>
            <select class="sede-sel" id="sede" aria-label="Sede">${['', ...LF.sedi.map((s) => s.id)].map((s) => `<option value="${s}" ${S().sede === s ? 'selected' : ''}>${s ? esc(G.sedeNome(s)) : 'Tutte le sedi'}</option>`).join('')}</select>
            <button class="icon-btn" data-go="dashboard" aria-label="Cose da fare" id="bell">${I.bell}</button>
            <a class="btn btn-line" href="index.html" target="_blank" rel="noopener" title="Apri il sito pubblico" id="tosite">Sito</a>
          </div>
        </header>
        <main class="view" id="view"></main>
      </div>
    </div>`;
    const mq = matchMedia('(max-width: 760px)');
    const ms = () => { $('#msearch').style.display = mq.matches ? 'inline-grid' : 'none'; $('#tosite').style.display = mq.matches ? 'none' : ''; };
    ms(); mq.addEventListener ? mq.addEventListener('change', ms) : mq.addListener(ms);
    $('#sede').addEventListener('change', (e) => { S().sede = e.target.value; G.save(); renderNav(); renderView(); });
    bindSearch($('#gsearch'), $('#gres'));
    renderNav();
  }
  function renderNav() {
    const r = route();
    $('#nav').innerHTML = ROUTES.map((x) => {
      if (x[0] === 'grp') return `<div class="grp">${x[1]}</div>`;
      const n = x[3] ? x[3]() : 0;
      return `<a href="#${x[0]}" class="${r === x[0] ? 'on' : ''}" ${r === x[0] ? 'aria-current="page"' : ''}>${x[2]}<span>${x[1]}</span>${n ? `<span class="cnt">${n}</span>` : ''}</a>`;
    }).join('');
    const tot = contratti().filter((c) => c.stato === 'richiesta').length + jobs(T, T).filter((j) => !j.done).length + S().richieste.filter((r) => r.stato === 'nuova' && G.inSede(r.sede)).length;
    $('#bell').title = tot ? `${tot} cose da gestire oggi` : 'Niente di urgente'; $('#bell').innerHTML = I.bell + (tot ? `<span class="dot">${tot > 99 ? '99+' : tot}</span>` : '');
  }

  /* ---------- Ricerca globale ---------- */
  function searchAll(q) {
    q = q.trim().toLowerCase(); if (q.length < 2) return [];
    const out = [];
    const has = (...xs) => xs.some((x) => String(x || '').toLowerCase().includes(q));
    S().contratti.forEach((c) => { const k = G.cli(c.cli); const v = G.veh(c.veh); if (has(c.num, G.cliNome(k), v && v.targa)) out.push(['Contratti', 'c', c.id, `${c.num} · ${G.cliNome(k)}`, `${G.vehNome(v)} · ${periodo(c)}`]); });
    S().clienti.forEach((k) => { if (has(G.cliNome(k), k.nome + ' ' + k.cognome, k.tel, k.email, k.piva)) out.push(['Clienti', 'k', k.id, G.cliNome(k), `${k.tel} · ${k.citta}`]); });
    S().veicoli.forEach((v) => { if (has(v.targa, G.vehNome(v), v.telaio)) out.push(['Veicoli', 'v', v.id, `${G.vehNome(v)} ${v.targa ? '· ' + v.targa : ''}`, `${G.sedeNome(v.sede)} · ${P.v[G.vehStato(v)][1]}`]); });
    S().richieste.forEach((r) => { if (has(r.nome, r.azienda, r.tel)) out.push(['Richieste', 'r', r.id, r.nome, `${r.fonte} · ${P.l[r.stato][1]}`]); });
    return out.slice(0, 30);
  }
  function bindSearch(inp, box) {
    const draw = () => {
      const res = searchAll(inp.value);
      if (!inp.value.trim()) { box.hidden = true; return; }
      let last = '';
      box.innerHTML = res.length ? res.map((r) => { const h = r[0] !== last ? `<div class="k">${r[0]}</div>` : ''; last = r[0]; return `${h}<button type="button" data-open="${r[1]}:${r[2]}"><div><b>${esc(r[3])}</b><small>${esc(r[4])}</small></div></button>`; }).join('') : '<div class="empty">Nessun risultato</div>';
      box.hidden = false;
    };
    inp.addEventListener('input', draw);
    inp.addEventListener('focus', draw);
    inp.addEventListener('keydown', (e) => { if (e.key === 'Escape') { inp.value = ''; box.hidden = true; } if (e.key === 'ArrowDown') { const b = $('button', box); b && (e.preventDefault(), b.focus()); } });
    box.addEventListener('keydown', (e) => { const bs = $$('button', box); const i = bs.indexOf(document.activeElement); if (e.key === 'ArrowDown' && bs[i + 1]) { e.preventDefault(); bs[i + 1].focus(); } if (e.key === 'ArrowUp') { e.preventDefault(); (bs[i - 1] || inp).focus(); } });
    document.addEventListener('click', (e) => { if (!e.target.closest('.search')) box.hidden = true; else if (e.target.closest('[data-open]')) { box.hidden = true; inp.value = ''; } });
  }

  /* ---------- Dati filtrati per sede ---------- */
  const contratti = () => S().contratti.filter((c) => G.inSede(G.contrSede(c)));
  const veicoli = () => S().veicoli.filter((v) => G.inSede(v.sede));
  const pagamenti = () => S().pagamenti.filter((p) => { const c = G.contr(p.contr); return c && G.inSede(G.contrSede(c)); });

  /* Consegne e ritiri tra due date (incluse); quelle in ritardo finiscono su "oggi" */
  function jobs(from, to) {
    const out = [];
    contratti().forEach((c) => {
      const v = G.veh(c.veh);
      if (c.stato === 'confermata') { const d = c.start < T ? T : c.start; if (d >= from && d <= to) out.push({ k: 'consegna', c, v, d, ora: c.ora, late: c.start < T, done: false }); }
      if (c.stato === 'attivo' && c.tipo !== 'lungo') { const d = c.end < T ? T : c.end; if (d >= from && d <= to) out.push({ k: 'ritiro', c, v, d, ora: c.oraR, late: c.end < T, done: false }); }
      if (c.consegna && c.consegna.quando >= from && c.consegna.quando <= to && c.consegna.oggi) out.push({ k: 'consegna', c, v, d: c.consegna.quando, ora: c.consegna.ora || c.ora, done: true });
      if (c.ritiro && c.ritiro.quando >= from && c.ritiro.quando <= to && c.ritiro.oggi) out.push({ k: 'ritiro', c, v, d: c.ritiro.quando, ora: c.ritiro.ora || c.oraR, done: true });
    });
    return out.sort((a, b) => (a.d + a.ora).localeCompare(b.d + b.ora));
  }

  /* Cose da fare */
  function todo() {
    const cs = contratti(), vs = veicoli();
    const L = [];
    const rich = cs.filter((c) => c.stato === 'richiesta');
    L.push({ n: rich.length, ico: 'doc', cls: 'warn', t: `${rich.length} prenotazioni da confermare`, s: rich.some((c) => c.nuovo) ? 'Ci sono noleggi appena arrivati dal sito' : 'Verifica documenti e disponibilità', go: 'contratti?richiesta' });
    const docs = S().clienti.filter((k) => k.docs !== 'ok' && G.inSede(k.sede) && cs.some((c) => c.cli === k.id && G.APERTI.includes(c.stato)));
    L.push({ n: docs.length, ico: 'shield', cls: 'warn', t: `${docs.length} clienti con documenti da verificare`, s: 'Con prenotazioni o contratti aperti', go: 'clienti?docs' });
    const jt = jobs(T, T).filter((j) => !j.done);
    L.push({ n: jt.length, ico: 'truck', cls: 'info', t: `${jt.length} consegne e ritiri oggi`, s: jt.some((j) => j.late) ? 'Alcuni sono in ritardo' : 'Assegna i driver', go: 'consegne' });
    const sc = pagamenti().filter((p) => G.pagStato(p) === 'scaduto');
    L.push({ n: sc.length, ico: 'euro', cls: 'bad', t: `${sc.length} pagamenti scaduti · ${eur(sc.reduce((s, p) => s + p.imp, 0))}`, s: 'Invia i solleciti', go: 'pagamenti' });
    const scad = vs.filter((v) => G.scadenze(v).some((x) => x.gg <= 30));
    L.push({ n: scad.length, ico: 'alert', cls: 'warn', t: `${scad.length} veicoli con scadenze entro 30 giorni`, s: 'Assicurazione, revisione, bollo', go: 'officina?scadenze' });
    const tg = vs.filter((v) => { const k = G.kmTagliando(v); return k != null && k < 1000; });
    L.push({ n: tg.length, ico: 'wrench', cls: 'warn', t: `${tg.length} tagliandi da programmare`, s: 'Mancano meno di 1.000 km', go: 'officina?scadenze' });
    const mu = S().multe.filter((m) => m.stato === 'da rinotificare' && G.inSede((G.veh(m.veh) || {}).sede));
    L.push({ n: mu.length, ico: 'ticket', cls: 'bad', t: `${mu.length} multe da rinotificare`, s: 'Hai 60 giorni dalla notifica', go: 'multe' });
    const ld = S().richieste.filter((r) => r.stato === 'nuova' && G.inSede(r.sede));
    L.push({ n: ld.length, ico: 'inbox', cls: 'info', t: `${ld.length} richieste nuove da richiamare`, s: 'Promessa sul sito: richiamata entro 30 minuti', go: 'richieste' });
    return L.filter((x) => x.n > 0);
  }

  /* ---------- Liste generiche (ricerca, filtri, schede, ordinamento, CSV) ---------- */
  const UI = {}; const LISTS = {};
  function list(id, cfg) {
    LISTS[id] = cfg;
    const st = UI[id] = UI[id] || { tab: cfg.tabs ? cfg.tabs[0][0] : '', q: '', f: {}, sort: cfg.sort || null, lim: 60 };
    if (cfg.initTab) { st.tab = cfg.initTab; }
    return `<div class="toolbar">
      ${cfg.tabs ? `<div class="seg" role="tablist" data-tabs="${id}"></div>` : ''}
      <div class="search">${I.search}<input type="search" data-q="${id}" value="${esc(st.q)}" placeholder="${esc(cfg.ph || 'Cerca…')}" aria-label="Cerca"></div>
      ${(cfg.filters || []).map((f) => `<select class="sel" data-f="${id}:${f.k}" aria-label="${esc(f.l)}"><option value="">${esc(f.l)}</option>${f.o.map(([v, l]) => `<option value="${esc(v)}" ${st.f[f.k] === v ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>`).join('')}
      <span class="sp"></span>
      <button class="btn btn-line btn-sm" data-act="csv" data-id="${id}">${I.dl}Esporta CSV</button>
    </div><div id="lst-${id}"></div>`;
  }
  function rowsFor(id, tabOverride) {
    const cfg = LISTS[id], st = UI[id];
    let r = cfg.rows();
    (cfg.filters || []).forEach((f) => { const v = st.f[f.k]; if (v) r = r.filter((x) => f.fn(x, v)); });
    const q = st.q.trim().toLowerCase();
    if (q) r = r.filter((x) => cfg.text(x).toLowerCase().includes(q));
    const tab = tabOverride != null ? tabOverride : st.tab;
    if (cfg.tabs) { const t = cfg.tabs.find((x) => x[0] === tab) || cfg.tabs[0]; r = r.filter(t[2]); }
    return r;
  }
  function renderList(id) {
    const cfg = LISTS[id], st = UI[id], box = $('#lst-' + id); if (!box) return;
    if (cfg.tabs) $(`[data-tabs="${id}"]`).innerHTML = cfg.tabs.map(([k, l]) => `<button role="tab" aria-selected="${st.tab === k}" class="${st.tab === k ? 'on' : ''}" data-tab="${id}:${k}">${esc(l)} <i>${rowsFor(id, k).length}</i></button>`).join('');
    let r = rowsFor(id);
    if (st.sort) { const col = cfg.cols[st.sort.i]; if (col && col.s) r = [...r].sort((a, b) => { const x = col.s(a), y = col.s(b); return (x > y ? 1 : x < y ? -1 : 0) * st.sort.d; }); }
    const shown = r.slice(0, st.lim);
    box.innerHTML = `<div class="tbl-card"><div class="tbl-scroll"><table class="tbl"><thead><tr>${cfg.cols.map((c, i) => `<th class="${c.r ? 'r' : ''}" ${st.sort && st.sort.i === i ? `aria-sort="${st.sort.d > 0 ? 'ascending' : 'descending'}"` : ''}>${c.s ? `<button data-sort="${id}:${i}">${esc(c.l)}<span class="ar">${st.sort && st.sort.i === i ? (st.sort.d > 0 ? '▲' : '▼') : ''}</span></button>` : esc(c.l)}</th>`).join('')}</tr></thead>
      <tbody>${shown.map((x) => `<tr data-open="${cfg.open(x)}" tabindex="0">${cfg.cols.map((c) => `<td data-l="${esc(c.l)}" class="${[c.r ? 'r' : '', c.main ? 'main' : '', c.hm ? 'hide-m' : ''].join(' ')}">${c.h(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      ${shown.length ? '' : `<div class="empty">${esc(cfg.empty || 'Niente da mostrare con questi filtri.')}</div>`}
      <div class="tbl-foot"><span>${r.length} risultati${cfg.sum ? ' · ' + cfg.sum(r) : ''}</span>${r.length > st.lim ? `<button class="btn btn-ghost btn-sm" data-act="more" data-id="${id}">Mostra altri ${Math.min(60, r.length - st.lim)}</button>` : ''}</div></div>`;
  }
  function csv(id) {
    const cfg = LISTS[id]; const r = rowsFor(id);
    const strip = (h) => { const d = document.createElement('div'); d.innerHTML = h; return d.textContent.replace(/\s+/g, ' ').trim(); };
    const cell = (s) => `"${String(s).replace(/"/g, '""')}"`;
    const lines = [cfg.cols.map((c) => cell(c.l)).join(';'), ...r.map((x) => cfg.cols.map((c) => cell(c.c ? c.c(x) : strip(c.h(x)))).join(';'))];
    const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `locafit-${id}-${T}.csv`; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    G.toast(`Esportate ${r.length} righe`);
  }

  /* ======================= VISTE ======================= */
  const V = {};
  const head = (title, sub, acts = '') => `<div class="v-head"><div><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div><div class="acts">${acts}</div></div>`;
  const sedeLbl = () => (S().sede ? G.sedeNome(S().sede) : 'tutte le sedi');

  /* ---------- Panoramica ---------- */
  function ricavi(y, m) {
    const ms = G.ymd(new Date(y, m, 1)), me = G.ymd(new Date(y, m + 1, 1));
    let s = 0;
    contratti().forEach((c) => {
      if (!['attivo', 'chiuso'].includes(c.stato) && !(c.stato === 'confermata' && c.start < me)) return;
      if (c.tipo === 'breve') { if (c.start >= ms && c.start < me) s += c.tot; return; }
      if (c.start < me && c.end > ms) s += c.unit;
    });
    return s;
  }
  V.dashboard = () => {
    const vs = veicoli().filter((v) => !v.arrivo); const st = vs.map(G.vehStato);
    const nol = st.filter((x) => x === 'noleggiato').length; const disp = st.filter((x) => x === 'disponibile').length;
    const cs = contratti(); const att = cs.filter((c) => c.stato === 'attivo');
    const now = new Date(); const months = [];
    for (let i = 11; i >= 0; i--) { const d = new Date(now.getFullYear(), now.getMonth() - i, 1); months.push({ d, v: ricavi(d.getFullYear(), d.getMonth()) }); }
    const cur = months[11].v, prev = months[10].v; const delta = prev ? Math.round((cur - prev) / prev * 100) : 0;
    const sc = pagamenti().filter((p) => G.pagStato(p) === 'scaduto');
    const daGest = cs.filter((c) => c.stato === 'richiesta').length + S().richieste.filter((r) => r.stato === 'nuova' && G.inSede(r.sede)).length;
    const u = G.user(); const h = now.getHours();
    const max = Math.max(...months.map((m) => m.v), 1); const step = Math.pow(10, Math.floor(Math.log10(max))) * (max / Math.pow(10, Math.floor(Math.log10(max))) > 5 ? 2 : 1); const top = Math.ceil(max / step) * step;
    const ticks = [0, top / 2, top];
    const k = (n) => (n >= 1000 ? `${Math.round(n / 100) / 10}`.replace('.', ',') + 'k' : String(n));
    const chart = `<div class="bars" role="img" aria-label="Ricavi degli ultimi 12 mesi">
        <div class="yax">${ticks.map((t) => `<span style="bottom:${t / top * 100}%">€${k(t)}</span>`).join('')}</div>
        <div class="plot">${ticks.slice(1).map((t) => `<div class="gl" style="bottom:${t / top * 100}%"></div>`).join('')}${months.map((m, i) => `<div class="col ${i === 11 ? 'cur' : ''}" tabindex="0"><span class="tip">${m.d.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}: <b>${eur(m.v)}</b>${i === 11 ? ' (in corso)' : ''}</span><i style="height:${Math.max(0.8, m.v / top * 100)}%"></i></div>`).join('')}</div></div>
      <div class="xax"><span></span><div>${months.map((m) => `<span>${m.d.toLocaleDateString('it-IT', { month: 'narrow' })}</span>`).join('')}</div></div>
      <div class="legend"><span><i></i>Ricavi mensili (canoni + breve termine)</span><span><i class="cur"></i>Mese in corso</span></div>`;
    const sedi = LF.sedi.filter((s) => G.inSede(s.id)).map((s) => { const l = S().veicoli.filter((v) => v.sede === s.id && !v.arrivo); const n = l.filter((v) => G.vehStato(v) === 'noleggiato').length; return { s, p: l.length ? Math.round(n / l.length * 100) : 0, n, t: l.length }; });
    const mix = ['breve', 'medio', 'lungo'].map((t) => ({ t, n: att.filter((c) => c.tipo === t).length, r: att.filter((c) => c.tipo === t).reduce((s, c) => s + (t === 'breve' ? c.unit * 30 : c.unit), 0) }));
    const mixMax = Math.max(...mix.map((m) => m.n), 1);
    const jt = jobs(T, addD(T, 1));
    const td = todo();
    return head(`${h < 13 ? 'Buongiorno' : h < 18 ? 'Buon pomeriggio' : 'Buonasera'}, ${esc(u.nome.split(' ')[0])}`, `${G.fmtD(T, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · ${sedeLbl()}`, `<button class="btn btn-primary" data-act="newPren">${I.plus}Nuova prenotazione</button>`) + `
    <div class="kpis">
      <button class="kpi" data-go="flotta"><small>Veicoli in flotta</small><b>${vs.length}</b><span>${disp} disponibili ora</span></button>
      <button class="kpi" data-go="planning"><small>Utilizzo flotta</small><b>${vs.length ? Math.round(nol / vs.length * 100) : 0}%</b><span>${nol} noleggiati</span></button>
      <button class="kpi" data-go="contratti"><small>Contratti in corso</small><b>${att.length}</b><span>${att.filter((c) => c.tipo === 'lungo').length} a lungo termine</span></button>
      <div class="kpi"><small>Ricavi del mese</small><b>${eur(cur)}</b><span class="${delta >= 0 ? 'up' : 'dn'}">${delta >= 0 ? '▲' : '▼'} ${Math.abs(delta)}% sul mese scorso</span></div>
      <button class="kpi" data-go="pagamenti"><small>Insoluti</small><b>${eur(sc.reduce((s, p) => s + p.imp, 0))}</b><span class="${sc.length ? 'dn' : ''}">${sc.length} rate scadute</span></button>
      <button class="kpi" data-go="richieste"><small>Da gestire</small><b>${daGest}</b><span>richieste e prenotazioni</span></button>
    </div>
    <div class="dash"><div>
      <section class="card"><div class="card-h"><h2>Ricavi ultimi 12 mesi</h2><span class="muted small">${sedeLbl()}</span></div><div class="card-b">${chart}</div></section>
      <section class="card"><div class="card-h"><h2>Consegne e ritiri · oggi e domani</h2><button class="btn btn-ghost btn-sm" data-go="consegne">Apri agenda</button></div><div class="card-b"><div class="list">${jt.length ? jt.slice(0, 8).map((j) => `<button class="li" data-open="c:${j.c.id}"><span class="li-ico ${j.k === 'consegna' ? 'info' : 'warn'}">${j.k === 'consegna' ? I.key : I.truck}</span><span class="li-m"><span class="li-t">${j.k === 'consegna' ? 'Consegna' : 'Ritiro'} · ${esc(G.vehNome(j.v))} ${j.v.targa ? '· ' + esc(j.v.targa) : ''}</span><span class="li-s">${esc(G.cliNome(G.cli(j.c.cli)))} · ${j.c.modo === 'domicilio' ? esc(j.c.ind || 'a domicilio') : 'in sede a ' + esc(G.sedeNome(j.v.sede))}</span></span><span class="li-r"><b>${j.ora}</b>${j.done ? 'fatto' : j.late ? '<span class="pill bad">In ritardo</span>' : j.d === T ? 'oggi' : 'domani'}</span></button>`).join('') : '<div class="empty">Nessuna consegna o ritiro in programma.</div>'}</div></div></section>
      <section class="card"><div class="card-h"><h2>Ultime attività</h2></div><div class="card-b"><div class="list">${S().log.slice(0, 6).map((l) => `<div class="li"><span class="av lt">${ini(l.u)}</span><span class="li-m"><span class="li-t" style="font-weight:400"><b style="font-weight:600">${esc(l.u)}</b> ${esc(l.m)}</span></span><span class="li-r">${new Date(l.t).toLocaleString('it-IT', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span></div>`).join('')}</div></div></section>
    </div><div>
      <section class="card"><div class="card-h"><h2>Da fare</h2></div><div class="card-b"><div class="list">${td.length ? td.map((t) => `<button class="li" data-go="${t.go}"><span class="li-ico ${t.cls}">${I[t.ico]}</span><span class="li-m"><span class="li-t">${esc(t.t)}</span><span class="li-s">${esc(t.s)}</span></span><span class="li-r">${I.chevR.replace('<svg', '<svg width="16" height="16"')}</span></button>`).join('') : '<div class="empty">Tutto in ordine.</div>'}</div></div></section>
      <section class="card"><div class="card-h"><h2>Utilizzo per sede</h2></div><div class="card-b"><div class="hb">${sedi.map((x) => `<div class="hb-r" title="${x.n} noleggiati su ${x.t}"><span>${esc(x.s.citta)}</span><span class="tr"><i style="width:${x.p}%"></i></span><b>${x.p}%</b></div>`).join('')}</div><p class="muted small" style="margin-top:10px">Veicoli noleggiati sul totale della sede, oggi.</p></div></section>
      <section class="card"><div class="card-h"><h2>Contratti in corso per formula</h2></div><div class="card-b"><div class="hb">${mix.map((m) => `<div class="hb-r" title="${eur(m.r)} al mese"><span>${G.FORMULE[m.t]}</span><span class="tr"><i style="width:${m.n / mixMax * 100}%"></i></span><b>${m.n}</b></div>`).join('')}</div><p class="muted small" style="margin-top:10px">Ricavo mensile ricorrente: <b style="color:var(--ink)">${eur(mix.reduce((s, m) => s + m.r, 0))}</b></p></div></section>
    </div></div>`;
  };

  /* ---------- Prenotazioni e contratti ---------- */
  V.contratti = (arg) => {
    const tabs = [['tutti', 'Tutti', () => true], ['richiesta', 'Da confermare', (c) => c.stato === 'richiesta'], ['confermata', 'Confermate', (c) => c.stato === 'confermata'], ['attivo', 'In corso', (c) => c.stato === 'attivo'], ['chiuso', 'Chiusi', (c) => c.stato === 'chiuso'], ['annullato', 'Annullati', (c) => c.stato === 'annullato']];
    const html = head('Prenotazioni e contratti', 'Dalla richiesta alla riconsegna. Le prenotazioni fatte sul sito arrivano qui da confermare.', `<button class="btn btn-primary" data-act="newPren">${I.plus}Nuova prenotazione</button>`) + list('contratti', {
      initTab: arg || null, tabs, ph: 'Cerca numero, cliente, targa…',
      rows: () => contratti().sort((a, b) => (b.nuovo ? 1 : 0) - (a.nuovo ? 1 : 0) || b.start.localeCompare(a.start)),
      text: (c) => { const v = G.veh(c.veh); return [c.num, G.cliNome(G.cli(c.cli)), v.targa, G.vehNome(v), c.canale].join(' '); },
      filters: [{ k: 'tipo', l: 'Tutte le formule', o: Object.entries(G.FORMULE), fn: (c, v) => c.tipo === v }, { k: 'canale', l: 'Tutti i canali', o: ['Sito', 'Telefono', 'WhatsApp', 'In sede'].map((x) => [x, x]), fn: (c, v) => c.canale === v }],
      open: (c) => 'c:' + c.id,
      cols: [
        { l: 'Contratto', main: true, h: (c) => t2(`${esc(c.num)} ${c.nuovo ? '<span class="tag new">Nuovo dal sito</span>' : ''}`, esc(G.cliNome(G.cli(c.cli)))), c: (c) => c.num, s: (c) => c.num },
        { l: 'Cliente', hm: true, h: (c) => esc(G.cliNome(G.cli(c.cli))), s: (c) => G.cliNome(G.cli(c.cli)) },
        { l: 'Veicolo', h: (c) => vehCell(G.veh(c.veh)), c: (c) => `${G.vehNome(G.veh(c.veh))} ${G.veh(c.veh).targa}`, s: (c) => G.vehNome(G.veh(c.veh)) },
        { l: 'Formula', h: (c) => `${G.FORMULE[c.tipo]} · ${durata(c)}`, s: (c) => c.tipo },
        { l: 'Periodo', h: (c) => `<span class="nowrap">${periodo(c)}</span>`, c: (c) => `${c.start} - ${c.end}`, s: (c) => c.start },
        { l: 'Canone', r: true, h: (c) => `<span class="num nowrap">${eur(c.unit)}${G.UNITA[c.tipo]}</span>`, c: (c) => c.unit, s: (c) => c.unit },
        { l: 'Sede', hm: true, h: (c) => esc(G.sedeNome(G.contrSede(c))) },
        { l: 'Stato', h: (c) => pill('c', c.stato), c: (c) => P.c[c.stato][1], s: (c) => c.stato },
      ],
      sum: (r) => `valore ${eur(r.reduce((s, c) => s + c.tot, 0))}`,
    });
    return html;
  };

  /* ---------- Planning ---------- */
  V.planning = () => {
    const st = UI.planning = UI.planning || { off: -3, cat: '', q: '' };
    const W = matchMedia('(max-width: 760px)').matches ? 34 : 38, N = 28, VW = matchMedia('(max-width: 760px)').matches ? 150 : 230;
    const from = addD(T, st.off), to = addD(from, N - 1);
    const days = Array.from({ length: N }, (_, i) => addD(from, i));
    let vs = veicoli().filter((v) => !st.cat || G.model(v.auto).categoria === st.cat);
    const q = st.q.trim().toLowerCase(); if (q) vs = vs.filter((v) => `${G.vehNome(v)} ${v.targa}`.toLowerCase().includes(q));
    const catOrd = LF.categorie.map((c) => c.id);
    vs.sort((a, b) => catOrd.indexOf(G.model(a.auto).categoria) - catOrd.indexOf(G.model(b.auto).categoria) || G.vehNome(a).localeCompare(G.vehNome(b)));
    const we = (d) => [0, 6].includes(G.parse(d).getDay());
    let busy = new Set();
    const bars = (v) => {
      const out = []; busy = new Set();
      const seg = (s, e, cls, label, open, title) => {
        if (e < from || s > to) return;
        for (let d = s < from ? from : s; d <= e && d <= to; d = addD(d, 1)) busy.add(d);
        const a = s < from ? from : s, b = e > to ? to : e;
        const left = diff(from, a) * W + 2, width = (diff(a, b) + 1) * W - 4;
        out.push(`<button class="bar ${cls} ${s < from ? 'cut-l' : ''} ${e > to ? 'cut-r' : ''}" style="left:${left}px;width:${width}px" data-open="${open}" title="${esc(title)}">${esc(label)}</button>`);
      };
      S().contratti.filter((c) => c.veh === v.id && G.APERTI.includes(c.stato)).forEach((c) => { const k = G.cli(c.cli); seg(c.start, c.end, c.stato, k ? (k.tipo === 'azienda' && k.rs ? k.rs : k.cognome) : '', 'c:' + c.id, `${c.num} · ${G.cliNome(k)} · ${periodo(c)} · ${P.c[c.stato][1]}`); });
      S().contratti.filter((c) => c.veh === v.id && c.stato === 'chiuso' && c.end >= from).forEach((c) => { seg(c.start, c.end, 'off', 'Chiuso', 'c:' + c.id, `${c.num} · chiuso`); });
      S().interventi.filter((i) => i.veh === v.id && i.stato !== 'chiuso').forEach((i) => seg(i.apertura, i.fine, 'off', i.tipo, 'i:' + i.id, `Officina: ${i.tipo}`));
      return out.join('');
    };
    return head('Planning flotta', 'Chi ha quale auto, giorno per giorno. Tocca uno spazio vuoto per prenotare.', `<button class="btn btn-primary" data-act="newPren">${I.plus}Nuova prenotazione</button>`) + `
      <div class="toolbar">
        <div class="seg"><button data-act="planMove" data-n="-7" aria-label="Settimana precedente">${I.chevL.replace('<svg', '<svg width="16" height="16"')}</button><button data-act="planMove" data-n="0" class="on">Oggi</button><button data-act="planMove" data-n="7" aria-label="Settimana successiva">${I.chevR.replace('<svg', '<svg width="16" height="16"')}</button></div>
        <span class="muted">${fmtDL(from)} – ${fmtDL(to)}</span>
        <span class="sp"></span>
        <div class="search">${I.search}<input type="search" id="plan-q" value="${esc(st.q)}" placeholder="Cerca modello o targa…" aria-label="Cerca veicolo"></div>
        <select class="sel" id="plan-cat" aria-label="Categoria"><option value="">Tutte le categorie</option>${LF.categorie.map((c) => `<option value="${c.id}" ${st.cat === c.id ? 'selected' : ''}>${esc(c.nome)}</option>`).join('')}</select>
      </div>
      <div class="legend" style="margin:0 0 10px"><span><i style="background:var(--blue)"></i>In corso</span><span><i style="background:var(--blue-bg);border:1px solid #9CC8EE"></i>Confermata</span><span><i style="background:#fff;border:1.5px dashed #E0A33B"></i>Da confermare</span><span><i class="cur" style="background:repeating-linear-gradient(135deg,#EDEDF0 0 3px,#D5D5DA 3px 6px)"></i>Officina / chiuso</span></div>
      <div class="plan"><div class="plan-g" style="grid-template-columns:${VW}px repeat(${N},${W}px)">
        <div class="hd">${vs.length} veicoli</div>${days.map((d) => `<div class="dh ${d === T ? 'td' : we(d) ? 'we' : ''}">${G.parse(d).toLocaleDateString('it-IT', { weekday: 'narrow' })}<b>${G.parse(d).getDate()}</b></div>`).join('')}
        ${vs.map((v) => `<div class="vc" data-open="v:${v.id}" title="${esc(G.vehNome(v))}"><img src="${G.img(G.model(v.auto))}" alt="" loading="lazy"><div style="min-width:0"><b>${esc(G.vehNome(v))}</b><small>${v.targa ? esc(v.targa) : 'in arrivo'} · ${esc(G.sedeNome(v.sede))}</small></div></div>
          ${(() => { const b = bars(v); return `<div class="row" style="grid-column:2/-1;grid-template-columns:repeat(${N},${W}px)">${days.map((d) => `<div class="cell ${d === T ? 'td' : we(d) ? 'we' : ''} ${busy.has(d) ? 'busy' : ''}" ${v.arrivo || d < T || busy.has(d) ? '' : `data-act="newAt" data-v="${v.id}" data-d="${d}" title="Prenota dal ${fmtD(d)}"`}></div>`).join('')}${b}</div>`; })()}`).join('')}
      </div></div>`;
  };

  /* ---------- Consegne e ritiri ---------- */
  V.consegne = () => {
    const st = UI.consegne = UI.consegne || { r: 'oggi' };
    const R = { oggi: [T, T], domani: [addD(T, 1), addD(T, 1)], sett: [T, addD(T, 6)] };
    const [from, to] = R[st.r];
    const js = jobs(from, to);
    const byDay = {}; js.forEach((j) => { (byDay[j.d] = byDay[j.d] || []).push(j); });
    const drivers = S().staff.filter((u) => u.ruolo === 'Driver');
    const job = (j) => { const k = G.cli(j.c.cli); return `<article class="job ${j.done ? 'done' : ''}">
        <div class="job-h"><span class="pill ${j.k === 'consegna' ? 'info' : 'warn'}">${j.k === 'consegna' ? 'Consegna' : 'Ritiro'}</span>${j.late ? '<span class="pill bad">In ritardo</span>' : ''}${j.done ? '<span class="pill good">Fatto</span>' : ''}<span class="t">${esc(j.ora)}</span></div>
        <button style="text-align:left" data-open="c:${j.c.id}">${vehCell(j.v)}</button>
        <div class="where">${I.users}<span><b>${esc(G.cliNome(k))}</b> · <a href="tel:${esc(k.tel)}" style="color:var(--blue-2)">${esc(k.tel)}</a></span></div>
        <div class="where">${I.pin}<span>${j.c.modo === 'domicilio' ? `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(j.c.ind)}" target="_blank" rel="noopener" style="color:var(--blue-2)">${esc(j.c.ind || 'Indirizzo da definire')}</a>` : `In sede · ${esc(G.sedeNome(j.v.sede))}`}</span></div>
        ${j.done ? '' : `<div class="job-f"><select class="sel" data-drv="${j.c.id}" aria-label="Driver"><option value="">${j.c.modo === 'domicilio' ? 'Assegna driver…' : 'Gestito in sede'}</option>${drivers.map((u) => `<option value="${u.id}" ${j.c.driver === u.id ? 'selected' : ''}>${esc(u.nome)} · ${esc(G.sedeNome(u.sede))}</option>`).join('')}</select><button class="btn btn-dark btn-sm" data-act="${j.k === 'consegna' ? 'checkout' : 'checkin'}" data-id="${j.c.id}">${j.k === 'consegna' ? 'Registra consegna' : 'Registra ritiro'}</button></div>`}
      </article>`; };
    return head('Consegne e ritiri', `Agenda dei driver e delle sedi · ${sedeLbl()}`) + `
      <div class="toolbar"><div class="seg">${[['oggi', 'Oggi'], ['domani', 'Domani'], ['sett', 'Prossimi 7 giorni']].map(([k, l]) => `<button data-act="jobsRange" data-r="${k}" class="${st.r === k ? 'on' : ''}">${l}</button>`).join('')}</div><span class="muted">${js.filter((j) => !j.done).length} da fare · ${js.filter((j) => j.done).length} fatti</span></div>
      <div class="days">${Object.keys(byDay).length ? Object.keys(byDay).sort().map((d) => `<section class="day"><h2>${d === T ? 'Oggi' : d === addD(T, 1) ? 'Domani' : ''} <span class="muted" style="font-weight:400">${fmtDW(d)}</span></h2><div class="jobs">${byDay[d].map(job).join('')}</div></section>`).join('') : '<div class="card"><div class="empty">Nessuna consegna o ritiro in questo periodo.</div></div>'}</div>`;
  };

  /* ---------- Flotta ---------- */
  V.flotta = () => {
    const tabs = [['tutti', 'Tutti', () => true], ...Object.entries(P.v).map(([k, [, l]]) => [k, l, (v) => G.vehStato(v) === k])];
    return head('Flotta', `${veicoli().length} veicoli · ${sedeLbl()}`, `<button class="btn btn-primary" data-act="newVeh">${I.plus}Aggiungi veicolo</button>`) + list('flotta', {
      tabs, ph: 'Cerca modello, targa, telaio…',
      rows: () => veicoli(),
      text: (v) => `${G.vehNome(v)} ${v.targa} ${v.telaio} ${G.model(v.auto).versione}`,
      filters: [{ k: 'cat', l: 'Tutte le categorie', o: LF.categorie.map((c) => [c.id, c.nome]), fn: (v, x) => G.model(v.auto).categoria === x }, { k: 'sc', l: 'Tutte le scadenze', o: [['30', 'Scadenze entro 30 gg'], ['tagl', 'Tagliando vicino']], fn: (v, x) => (x === '30' ? G.scadenze(v).some((s) => s.gg <= 30) : (G.kmTagliando(v) != null && G.kmTagliando(v) < 1000)) }],
      open: (v) => 'v:' + v.id,
      sort: { i: 0, d: 1 },
      cols: [
        { l: 'Veicolo', main: true, h: (v) => vehCell(v, esc(G.model(v.auto).versione)), c: (v) => `${G.vehNome(v)} ${G.model(v.auto).versione}`, s: (v) => G.vehNome(v) },
        { l: 'Targa', h: (v) => targa(v), c: (v) => v.targa, s: (v) => v.targa },
        { l: 'Sede', h: (v) => esc(G.sedeNome(v.sede)), s: (v) => v.sede },
        { l: 'Km', r: true, h: (v) => `<span class="num">${v.arrivo ? '—' : num(v.km)}</span>`, c: (v) => v.km, s: (v) => v.km },
        { l: 'Stato', h: (v) => pill('v', G.vehStato(v)), c: (v) => P.v[G.vehStato(v)][1], s: (v) => G.vehStato(v) },
        { l: 'Prossima scadenza', h: (v) => { const s = G.scadenze(v)[0]; return v.arrivo ? `Dal ${esc(v.arrivo)}` : s ? `<span class="nowrap">${s.l} ${ggPill(s.gg)}</span>` : '—'; }, c: (v) => { const s = G.scadenze(v)[0]; return s ? `${s.l} ${s.data}` : ''; }, s: (v) => (G.scadenze(v)[0] || { gg: 9999 }).gg },
        { l: 'Tagliando', r: true, hm: true, h: (v) => { const k = G.kmTagliando(v); return k == null ? '—' : `<span class="num ${k < 1000 ? '' : 'muted'}" style="${k < 1000 ? 'color:var(--warn);font-weight:600' : ''}">tra ${num(k)} km</span>`; }, s: (v) => G.kmTagliando(v) ?? 1e9 },
      ],
    });
  };

  /* ---------- Clienti ---------- */
  V.clienti = (arg) => {
    const tabs = [['tutti', 'Tutti', () => true], ['privato', 'Privati', (k) => k.tipo === 'privato'], ['azienda', 'Aziende', (k) => k.tipo === 'azienda'], ['docs', 'Documenti da verificare', (k) => k.docs !== 'ok'], ['insoluti', 'Con insoluti', (k) => insoluto(k.id) > 0]];
    return head('Clienti', 'Anagrafiche, documenti, contratti e saldo di ogni cliente.', `<button class="btn btn-primary" data-act="newCli">${I.plus}Nuovo cliente</button>`) + list('clienti', {
      initTab: arg || null, tabs, ph: 'Cerca nome, telefono, email, P.IVA…',
      rows: () => S().clienti.filter((k) => G.inSede(k.sede)),
      text: (k) => `${G.cliNome(k)} ${k.nome} ${k.cognome} ${k.tel} ${k.email} ${k.piva} ${k.citta}`,
      open: (k) => 'k:' + k.id, sort: { i: 0, d: 1 },
      cols: [
        { l: 'Cliente', main: true, h: (k) => `<div class="cell-v"><span class="av lt">${ini(G.cliNome(k))}</span><div><b>${esc(G.cliNome(k))}</b><small>${k.tipo === 'azienda' ? 'Azienda · P.IVA ' + esc(k.piva) : 'Privato'}</small></div></div>`, c: (k) => G.cliNome(k), s: (k) => G.cliNome(k) },
        { l: 'Contatti', h: (k) => t2(esc(k.tel), esc(k.email)), c: (k) => `${k.tel} ${k.email}` },
        { l: 'Città', hm: true, h: (k) => esc(k.citta), s: (k) => k.citta },
        { l: 'Contratti aperti', r: true, h: (k) => String(S().contratti.filter((c) => c.cli === k.id && G.APERTI.includes(c.stato)).length), s: (k) => S().contratti.filter((c) => c.cli === k.id && G.APERTI.includes(c.stato)).length },
        { l: 'Insoluto', r: true, h: (k) => { const n = insoluto(k.id); return n ? `<b style="color:var(--bad)" class="num">${eur(n)}</b>` : '<span class="muted">—</span>'; }, c: (k) => insoluto(k.id), s: (k) => insoluto(k.id) },
        { l: 'Documenti', h: (k) => pill('d', k.docs), c: (k) => P.d[k.docs][1], s: (k) => k.docs },
      ],
    });
  };
  const insoluto = (kid) => S().pagamenti.filter((p) => p.cli === kid && G.pagStato(p) === 'scaduto').reduce((s, p) => s + p.imp, 0);

  /* ---------- Richieste (lead) ---------- */
  V.richieste = () => {
    const cols = [['nuova', 'Nuove'], ['contattato', 'Contattati'], ['preventivo', 'Preventivo inviato'], ['vinta', 'Vinte'], ['persa', 'Perse']];
    const rs = S().richieste.filter((r) => G.inSede(r.sede)).sort((a, b) => b.quando.localeCompare(a.quando));
    const ago = (iso) => { const m = Math.round((Date.now() - new Date(iso)) / 60000); const h = Math.round(m / 60), d = Math.round(m / 1440); return m < 60 ? `${m} min fa` : m < 1440 ? (h === 1 ? '1 ora fa' : `${h} ore fa`) : (d === 1 ? 'ieri' : `${d} giorni fa`); };
    const vinte = rs.filter((r) => r.stato === 'vinta').length, chiuse = rs.filter((r) => ['vinta', 'persa'].includes(r.stato)).length;
    return head('Richieste e lead', `Form del sito, WhatsApp, telefono e "Avvisami" sui veicoli in arrivo · tasso di conversione ${chiuse ? Math.round(vinte / chiuse * 100) : 0}%`, `<button class="btn btn-primary" data-act="newLead">${I.plus}Nuova richiesta</button>`) +
      `<div class="kanban">${cols.map(([k, l]) => { const xs = rs.filter((r) => r.stato === k); return `<section class="kcol"><h3>${l}<i>${xs.length}</i></h3>${xs.map((r) => { const a = G.model(r.auto); const late = r.stato === 'nuova' && Date.now() - new Date(r.quando) > 30 * 60000; return `<button class="kcard" data-open="r:${r.id}"><b>${esc(r.azienda || r.nome)}</b><small>${esc(a ? a.marca + ' ' + a.modello : '')} · ${G.FORMULE[r.tipo]} termine</small><div class="ft"><span class="tag">${esc(r.fonte)}</span><small style="margin:0;${late ? 'color:var(--bad);font-weight:600' : ''}">${ago(r.quando)}</small></div></button>`; }).join('') || '<div class="empty" style="padding:12px 0">Vuoto</div>'}</section>`; }).join('')}</div>`;
  };

  /* ---------- Pagamenti ---------- */
  V.pagamenti = () => {
    const ps = pagamenti();
    const ms = T.slice(0, 8) + '01';
    const inc = ps.filter((p) => p.stato === 'pagato' && p.pagatoIl >= ms).reduce((s, p) => s + p.imp, 0);
    const da = ps.filter((p) => G.pagStato(p) === 'aperto' && p.due <= addD(T, 30)).reduce((s, p) => s + p.imp, 0);
    const sc = ps.filter((p) => G.pagStato(p) === 'scaduto');
    const tabs = [['scaduto', 'Scaduti', (p) => G.pagStato(p) === 'scaduto'], ['aperto', 'In scadenza', (p) => G.pagStato(p) === 'aperto'], ['pagato', 'Incassati', (p) => p.stato === 'pagato'], ['tutti', 'Tutti', () => true]];
    return head('Pagamenti', 'Canoni, noleggi e addebiti: incassi, scadenze e solleciti.', sc.length ? `<button class="btn btn-dark" data-act="sollecitaTutti">${I.mail}Sollecita tutti gli scaduti (${sc.length})</button>` : '') + `
      <div class="kpis k3">
        <div class="kpi"><small>Incassato questo mese</small><b>${eur(inc)}</b></div>
        <div class="kpi"><small>Da incassare nei prossimi 30 giorni</small><b>${eur(da)}</b></div>
        <div class="kpi"><small>Insoluti</small><b style="color:${sc.length ? 'var(--bad)' : 'inherit'}">${eur(sc.reduce((s, p) => s + p.imp, 0))}</b><span>${sc.length} rate · ${new Set(sc.map((p) => p.cli)).size} clienti</span></div>
      </div>` + list('pagamenti', {
      tabs, ph: 'Cerca cliente o contratto…',
      rows: () => pagamenti(),
      text: (p) => `${G.cliNome(G.cli(p.cli))} ${(G.contr(p.contr) || {}).num} ${p.desc}`,
      filters: [{ k: 'm', l: 'Tutti i metodi', o: ['SEPA', 'Carta', 'Bonifico'].map((x) => [x, x]), fn: (p, v) => p.metodo === v }],
      open: (p) => 'c:' + p.contr, sort: { i: 0, d: 1 },
      cols: [
        { l: 'Scadenza', main: true, h: (p) => t2(fmtDL(p.due), G.pagStato(p) === 'scaduto' ? `<span style="color:var(--bad)">${G.rel(p.due)}</span>` : G.rel(p.due)), c: (p) => p.due, s: (p) => p.due },
        { l: 'Cliente', h: (p) => esc(G.cliNome(G.cli(p.cli))), s: (p) => G.cliNome(G.cli(p.cli)) },
        { l: 'Descrizione', h: (p) => t2(esc(p.desc), esc((G.contr(p.contr) || {}).num)), c: (p) => `${p.desc} ${(G.contr(p.contr) || {}).num}` },
        { l: 'Metodo', hm: true, h: (p) => esc(p.metodo) },
        { l: 'Importo', r: true, h: (p) => `<b class="num">${eur(p.imp, true)}</b>`, c: (p) => String(p.imp).replace('.', ','), s: (p) => p.imp },
        { l: 'Stato', h: (p) => pill('p', G.pagStato(p)) + (p.solleciti ? ` <span class="tag">${p.solleciti} sollec.</span>` : ''), c: (p) => P.p[G.pagStato(p)][1] },
        { l: '', r: true, h: (p) => (p.stato === 'pagato' ? `<span class="muted small">${fmtD(p.pagatoIl)}</span>` : `<span class="nowrap"><button class="btn btn-line btn-sm" data-act="incassa" data-id="${p.id}">Incassa</button>${G.pagStato(p) === 'scaduto' ? ` <button class="btn btn-ghost btn-sm" data-act="sollecita" data-id="${p.id}">Sollecita</button>` : ''}</span>`), c: () => '' },
      ],
      sum: (r) => `totale ${eur(r.reduce((s, p) => s + p.imp, 0))}`,
    });
  };

  /* ---------- Officina e scadenze ---------- */
  V.officina = (arg) => {
    const st = UI.off = UI.off || { t: 'interventi' }; if (arg) st.t = arg;
    const seg = `<div class="toolbar"><div class="seg">${[['interventi', 'Interventi'], ['scadenze', 'Scadenze veicoli'], ['storico', 'Storico']].map(([k, l]) => `<button data-act="offTab" data-t="${k}" class="${st.t === k ? 'on' : ''}">${l}</button>`).join('')}</div></div>`;
    const h = head('Officina e scadenze', 'Manutenzioni, tagliandi, revisioni, assicurazioni e bolli.', `<button class="btn btn-primary" data-act="newInt">${I.plus}Nuovo intervento</button>`) + seg;
    if (st.t === 'scadenze') {
      return h + list('scadenze', {
        ph: 'Cerca modello o targa…',
        rows: () => { const r = []; veicoli().forEach((v) => { G.scadenze(v).forEach((s) => { if (s.gg <= 60) r.push({ v, ...s }); }); const k = G.kmTagliando(v); if (k != null && k < 1500) r.push({ v, k: 'tagl', l: 'Tagliando', data: null, gg: null, km: k }); }); return r; },
        text: (x) => `${G.vehNome(x.v)} ${x.v.targa} ${x.l}`,
        filters: [{ k: 't', l: 'Tutti i tipi', o: [['ass', 'Assicurazione'], ['rev', 'Revisione'], ['bollo', 'Bollo'], ['tagl', 'Tagliando']], fn: (x, v) => x.k === v }],
        open: (x) => 'v:' + x.v.id, sort: { i: 2, d: 1 },
        cols: [
          { l: 'Veicolo', main: true, h: (x) => vehCell(x.v), c: (x) => `${G.vehNome(x.v)} ${x.v.targa}` },
          { l: 'Scadenza', h: (x) => esc(x.l) },
          { l: 'Quando', h: (x) => (x.k === 'tagl' ? `<span class="pill warn">Tra ${num(x.km)} km</span>` : `<span class="nowrap">${fmtDL(x.data)} ${ggPill(x.gg)}</span>`), c: (x) => x.data || `${x.km} km`, s: (x) => (x.gg != null ? x.gg : x.km / 100) },
          { l: 'Sede', hm: true, h: (x) => esc(G.sedeNome(x.v.sede)) },
          { l: '', r: true, h: (x) => (x.k === 'tagl' ? `<button class="btn btn-line btn-sm" data-act="newInt" data-v="${x.v.id}" data-t="Tagliando">Programma</button>` : `<button class="btn btn-line btn-sm" data-act="rinnova" data-id="${x.v.id}" data-k="${x.k}">Segna rinnovata</button>`), c: () => '' },
        ],
      });
    }
    const chiuso = st.t === 'storico';
    return h + list(chiuso ? 'storico' : 'interventi', {
      ph: 'Cerca veicolo, officina, tipo…',
      rows: () => S().interventi.filter((i) => (chiuso ? i.stato === 'chiuso' : i.stato !== 'chiuso') && G.inSede((G.veh(i.veh) || {}).sede)),
      text: (i) => `${G.vehNome(G.veh(i.veh))} ${G.veh(i.veh).targa} ${i.tipo} ${i.officina}`,
      open: (i) => 'i:' + i.id, sort: { i: 3, d: chiuso ? -1 : 1 }, empty: chiuso ? 'Nessun intervento chiuso.' : 'Nessun veicolo in officina.',
      cols: [
        { l: 'Veicolo', main: true, h: (i) => vehCell(G.veh(i.veh)), c: (i) => `${G.vehNome(G.veh(i.veh))} ${G.veh(i.veh).targa}` },
        { l: 'Intervento', h: (i) => t2(esc(i.tipo), esc(i.officina)), c: (i) => `${i.tipo} - ${i.officina}` },
        { l: 'Aperto il', hm: true, h: (i) => fmtD(i.apertura), s: (i) => i.apertura },
        { l: chiuso ? 'Chiuso il' : 'Pronto il', h: (i) => `<span class="nowrap">${fmtD(i.fine)}${!chiuso && i.fine < T ? ' <span class="pill bad">In ritardo</span>' : ''}</span>`, s: (i) => i.fine },
        { l: 'Costo', r: true, h: (i) => `<span class="num">${eur(i.costo)}</span>`, c: (i) => i.costo, s: (i) => i.costo },
        { l: 'Stato', h: (i) => pill('i', i.stato) },
      ],
      sum: (r) => `costo ${eur(r.reduce((s, i) => s + i.costo, 0))}`,
    });
  };

  /* ---------- Multe e sinistri ---------- */
  V.multe = () => {
    const st = UI.mul = UI.mul || { t: 'multe' };
    const seg = `<div class="toolbar"><div class="seg">${[['multe', 'Multe'], ['sinistri', 'Sinistri e danni']].map(([k, l]) => `<button data-act="mulTab" data-t="${k}" class="${st.t === k ? 'on' : ''}">${l}</button>`).join('')}</div></div>`;
    if (st.t === 'sinistri') {
      return head('Multe e sinistri', 'Danni segnalati alla riconsegna o dal cliente, franchigie e perizie.', `<button class="btn btn-primary" data-act="newSin">${I.plus}Nuovo sinistro</button>`) + seg + list('sinistri', {
        ph: 'Cerca veicolo o cliente…',
        rows: () => S().sinistri.filter((s) => G.inSede((G.veh(s.veh) || {}).sede)),
        text: (s) => `${G.vehNome(G.veh(s.veh))} ${G.veh(s.veh).targa} ${G.cliNome(G.cli((G.contr(s.contr) || {}).cli))} ${s.desc}`,
        open: (s) => 's:' + s.id, sort: { i: 0, d: -1 },
        cols: [
          { l: 'Data', main: true, h: (s) => t2(fmtDL(s.data), esc(s.desc)), c: (s) => `${s.data} ${s.desc}`, s: (s) => s.data },
          { l: 'Veicolo', h: (s) => vehCell(G.veh(s.veh)), c: (s) => `${G.vehNome(G.veh(s.veh))} ${G.veh(s.veh).targa}` },
          { l: 'Cliente', h: (s) => esc(G.cliNome(G.cli((G.contr(s.contr) || {}).cli))) },
          { l: 'Stima danno', r: true, h: (s) => `<span class="num">${eur(s.stima)}</span>`, s: (s) => s.stima },
          { l: 'Franchigia', r: true, h: (s) => `<span class="num">${s.franchigia ? eur(s.franchigia) : '—'}</span>` },
          { l: 'Stato', h: (s) => pill('s', s.stato) },
        ],
      });
    }
    return head('Multe e sinistri', 'Il gestionale trova da solo chi aveva l’auto il giorno della multa.', `<button class="btn btn-primary" data-act="newMulta">${I.plus}Registra multa</button>`) + seg + list('multe', {
      tabs: [['tutti', 'Tutte', () => true], ['da rinotificare', 'Da rinotificare', (m) => m.stato === 'da rinotificare'], ['rinotificata', 'Rinotificate', (m) => m.stato === 'rinotificata'], ['chiusa', 'Chiuse', (m) => m.stato === 'chiusa']],
      ph: 'Cerca targa, verbale, luogo…',
      rows: () => S().multe.filter((m) => G.inSede((G.veh(m.veh) || {}).sede)),
      text: (m) => `${m.targa} ${m.verbale} ${m.luogo} ${G.vehNome(G.veh(m.veh))}`,
      open: (m) => 'm:' + m.id, sort: { i: 0, d: -1 },
      cols: [
        { l: 'Infrazione', main: true, h: (m) => t2(`${fmtDL(m.data)} · ${esc(m.ora)}`, esc(m.luogo)), c: (m) => `${m.data} ${m.luogo}`, s: (m) => m.data },
        { l: 'Veicolo', h: (m) => vehCell(G.veh(m.veh)), c: (m) => `${G.vehNome(G.veh(m.veh))} ${m.targa}` },
        { l: 'Alla guida', h: (m) => { const c = G.contrAllaData(m.veh, m.data); return c ? t2(esc(G.cliNome(G.cli(c.cli))), esc(c.num)) : '<span class="pill warn">Non a noleggio</span>'; }, c: (m) => { const c = G.contrAllaData(m.veh, m.data); return c ? G.cliNome(G.cli(c.cli)) : ''; } },
        { l: 'Verbale', hm: true, h: (m) => esc(m.verbale) },
        { l: 'Importo', r: true, h: (m) => `<span class="num">${eur(m.importo)}</span>`, s: (m) => m.importo },
        { l: 'Stato', h: (m) => pill('m', m.stato) + (m.stato === 'da rinotificare' && diff(m.ricevuta, T) > 45 ? ' <span class="pill bad">Termine vicino</span>' : '') },
      ],
    });
  };

  /* ---------- Listino e promozioni ---------- */
  V.listino = () => {
    const units = (id) => S().veicoli.filter((v) => v.auto === id && G.inSede(v.sede)).length;
    const pin = (a, t) => `<input class="in price-in num" type="number" min="0" step="1" inputmode="numeric" value="${G.prezzo(a, t)}" data-lp="${a.id}:${t}" aria-label="Prezzo ${G.FORMULE[t]} ${esc(a.marca)} ${esc(a.modello)}">`;
    return head('Listino e promozioni', 'Prezzi base per formula e codici sconto. IVA inclusa.', `<button class="btn btn-primary" data-act="newCode">${I.plus}Nuovo codice</button>`) + `
      <section style="margin-bottom:24px"><h2 style="font-size:16px;margin-bottom:12px">Codici sconto</h2><div class="codes">${S().codici.map((c, i) => `<article class="code"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><span class="c">${esc(c.code)}</span><label class="switch" title="${c.attivo ? 'Attivo' : 'Disattivato'}"><input type="checkbox" data-code="${i}" ${c.attivo ? 'checked' : ''} aria-label="Codice ${esc(c.code)} attivo"><i></i></label></div><b style="color:var(--ink)">${esc(c.titolo)}</b><p class="muted small">${esc(c.desc)}</p><div class="small muted" style="display:flex;justify-content:space-between;gap:8px"><span>${G.FORMULE[c.tipo] || ''} termine · scade ${esc(c.scade)}</span><span><b style="color:var(--ink)">${c.usi}</b> utilizzi</span></div></article>`).join('')}</div></section>
      <h2 style="font-size:16px;margin-bottom:12px">Prezzi per modello</h2>` + list('listino', {
      ph: 'Cerca modello…',
      rows: () => LF.auto.slice(),
      text: (a) => `${a.marca} ${a.modello} ${a.versione}`,
      filters: [{ k: 'cat', l: 'Tutte le categorie', o: LF.categorie.map((c) => [c.id, c.nome]), fn: (a, v) => a.categoria === v }],
      open: () => '',
      cols: [
        { l: 'Modello', main: true, h: (a) => `<div class="cell-v"><img src="${G.img(a)}" alt="" loading="lazy"><div><b>${esc(a.marca)} ${esc(a.modello)}</b><small>${esc(a.versione)}</small></div></div>`, c: (a) => `${a.marca} ${a.modello} ${a.versione}`, s: (a) => a.marca + a.modello },
        { l: 'Categoria', hm: true, h: (a) => esc(G.catNome(a.categoria)), s: (a) => a.categoria },
        { l: 'In flotta', r: true, h: (a) => String(units(a.id)), s: (a) => units(a.id) },
        { l: 'Breve €/giorno', r: true, h: (a) => pin(a, 'breve'), c: (a) => G.prezzo(a, 'breve') },
        { l: 'Medio €/mese', r: true, h: (a) => pin(a, 'medio'), c: (a) => G.prezzo(a, 'medio') },
        { l: 'Lungo €/mese', r: true, h: (a) => pin(a, 'lungo'), c: (a) => G.prezzo(a, 'lungo') },
        { l: 'Promo %', r: true, h: (a) => `<input class="in price-in num" type="number" min="0" max="60" step="1" value="${Math.round(G.promo(a) * 100)}" data-lp="${a.id}:promo" aria-label="Promo ${esc(a.modello)}">`, c: (a) => Math.round(G.promo(a) * 100) },
      ],
    }) + '<p class="muted small" style="margin-top:10px">I prezzi modificati qui valgono per le nuove prenotazioni create nel gestionale. Per cambiarli anche sul sito pubblico vanno aggiornati in <code>assets/js/data.js</code>.</p>';
  };

  /* ---------- Impostazioni ---------- */
  V.impostazioni = () => head('Impostazioni', 'Staff, sedi e dati del gestionale.') + `
    <div class="dash"><div>
      <section class="card"><div class="card-h"><h2>Staff</h2><button class="btn btn-line btn-sm" data-act="newStaff">${I.plus}Aggiungi</button></div><div class="card-b"><div class="list">${S().staff.map((u) => `<div class="li"><span class="av lt">${ini(u.nome)}</span><span class="li-m"><span class="li-t">${esc(u.nome)} ${u.id === S().utente ? '<span class="tag">Tu</span>' : ''}</span><span class="li-s">${esc(u.ruolo)} · ${u.sede ? esc(G.sedeNome(u.sede)) : 'Tutte le sedi'} · ${esc(u.email)}</span></span>${u.id !== S().utente ? `<button class="btn btn-ghost btn-sm" data-act="delStaff" data-id="${u.id}">Rimuovi</button>` : ''}</div>`).join('')}</div></div></section>
      <section class="card"><div class="card-h"><h2>Sedi</h2></div><div class="card-b"><div class="list">${LF.sedi.map((s) => `<div class="li"><span class="li-ico">${I.pin}</span><span class="li-m"><span class="li-t">${esc(s.citta)} · ${esc(s.tipo)}</span><span class="li-s">${esc(s.indirizzo)} · ${esc(s.orari)} · ${esc(s.tel)}</span></span><span class="li-r"><b>${S().veicoli.filter((v) => v.sede === s.id).length}</b>veicoli</span></div>`).join('')}</div></div></section>
    </div><div>
      <section class="card"><div class="card-h"><h2>Dati</h2></div><div class="card-b" style="display:grid;gap:12px">
        <p class="muted">Questa è una versione dimostrativa: i dati restano in questo browser. Per usarlo davvero con più persone serve un database condiviso (es. Supabase o Firebase) e un accesso con password.</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-line" data-act="backup">${I.dl}Scarica backup</button><label class="btn btn-line" style="cursor:pointer">Ripristina backup<input type="file" accept="application/json" id="restore" hidden></label></div>
        <div class="note">Ripristinare i dati di esempio cancella tutte le modifiche fatte nel gestionale.</div>
        <div><button class="btn btn-danger" data-act="resetDemo">Ripristina dati di esempio</button></div>
      </div></section>
      <section class="card"><div class="card-h"><h2>Collegamento con il sito</h2></div><div class="card-b"><p class="muted">Quando un cliente completa il noleggio online su <a href="prenota.html" style="color:var(--blue-2)">prenota.html</a> da questo browser, la prenotazione compare qui in <b>Prenotazioni e contratti</b> come <span class="tag new">Nuovo dal sito</span>, da confermare.</p></div></section>
    </div></div>`;

  function renderView(keepScroll) {
    const [r, arg] = (location.hash.replace('#', '') || 'dashboard').split('?');
    const name = ROUTES.some((x) => x[0] === r) ? r : 'dashboard';
    const y = scrollY;
    const view = $('#view');
    const planScroll = $('.plan') ? [$('.plan').scrollLeft, $('.plan').scrollTop] : null;
    view.innerHTML = V[name](keepScroll ? null : arg);
    Object.keys(LISTS).forEach((id) => { if ($('#lst-' + id)) renderList(id); });
    if (name === 'planning') {
      $('#plan-q').addEventListener('input', (e) => { UI.planning.q = e.target.value; const p = e.target.selectionStart; renderView(true); const i = $('#plan-q'); i.focus(); i.setSelectionRange(p, p); });
      $('#plan-cat').addEventListener('change', (e) => { UI.planning.cat = e.target.value; renderView(true); });
      if (keepScroll && planScroll) { $('.plan').scrollLeft = planScroll[0]; $('.plan').scrollTop = planScroll[1]; }
    }
    if (name === 'impostazioni') $('#restore').addEventListener('change', restore);
    if (keepScroll) scrollTo(0, y); else scrollTo(0, 0);
    document.title = `${(ROUTES.find((x) => x[0] === name) || [])[1] || 'Gestionale'} · Gestionale LOCAFIT Rent`;
  }

  /* ======================= PANNELLI DI DETTAGLIO ======================= */
  const OPEN = {};
  const contactBtns = (tel, email) => `<div style="display:flex;gap:6px;flex-wrap:wrap">${tel ? `<a class="btn btn-line btn-sm" href="tel:${esc(tel)}">${I.phone}Chiama</a><a class="btn btn-line btn-sm" href="${waHref(tel)}" target="_blank" rel="noopener">${I.wa}WhatsApp</a>` : ''}${email ? `<a class="btn btn-line btn-sm" href="mailto:${esc(email)}">${I.mail}Email</a>` : ''}</div>`;

  OPEN.c = (id) => {
    const c = G.contr(id); if (!c) return; current = { t: 'c', id };
    const v = G.veh(c.veh), a = G.model(v.auto), k = G.cli(c.cli);
    const ps = S().pagamenti.filter((p) => p.contr === c.id).sort((x, y) => x.due.localeCompare(y.due));
    const drv = S().staff.find((u) => u.id === c.driver);
    const tl = [
      ['ok', 'Richiesta ricevuta', `${fmtDL(c.creato)} · ${esc(c.canale)}`],
      [c.stato !== 'richiesta' && c.stato !== 'annullato' ? 'ok' : c.stato === 'richiesta' ? 'now' : '', c.stato === 'annullato' ? 'Annullato' : 'Confermata', ''],
      [c.consegna ? 'ok' : c.stato === 'confermata' ? 'now' : '', 'Consegna', c.consegna ? `${fmtDL(c.consegna.quando)} · ${num(c.consegna.km)} km` : `${fmtDL(c.start)} · ${c.ora}`],
      [c.ritiro ? 'ok' : c.stato === 'attivo' ? 'now' : '', 'Riconsegna', c.ritiro ? `${fmtDL(c.ritiro.quando)} · ${num(c.ritiro.km)} km` : `${fmtDL(c.end)} · ${c.oraR}`],
    ];
    const acts = {
      richiesta: `<button class="btn btn-primary" data-act="conferma" data-id="${c.id}">${I.check}Conferma</button><button class="btn btn-line" data-act="cambiaVeh" data-id="${c.id}">Cambia veicolo</button><button class="btn btn-danger" data-act="annulla" data-id="${c.id}">Rifiuta</button>`,
      confermata: `<button class="btn btn-primary" data-act="checkout" data-id="${c.id}">${I.key}Registra consegna</button><button class="btn btn-line" data-act="cambiaVeh" data-id="${c.id}">Cambia veicolo</button><button class="btn btn-danger" data-act="annulla" data-id="${c.id}">Annulla</button>`,
      attivo: `<button class="btn btn-primary" data-act="checkin" data-id="${c.id}">${I.truck}Registra riconsegna</button><button class="btn btn-line" data-act="proroga" data-id="${c.id}">Proroga</button>`,
      chiuso: `<button class="btn btn-line" data-act="ripeti" data-id="${c.id}">Nuova prenotazione per questo cliente</button>`,
      annullato: `<button class="btn btn-line" data-act="ripeti" data-id="${c.id}">Nuova prenotazione per questo cliente</button>`,
    }[c.stato];
    openDrawer(drH(`Contratto · ${G.FORMULE[c.tipo]} termine`, esc(c.num), `<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">${pill('c', c.stato)}${c.nuovo ? '<span class="tag new">Nuovo dal sito</span>' : ''}<span class="tag">${esc(c.canale)}</span></div>`) + `<div class="dr-b">
      ${c.stato === 'richiesta' && k && k.docs !== 'ok' ? `<div class="note">Documenti del cliente ${k.docs === 'scaduti' ? 'scaduti' : 'da verificare'}: controllali prima di confermare.</div>` : ''}
      ${c.stato === 'richiesta' && !G.libero(c.veh, c.start, c.end, c.id) ? '<div class="note bad">Il veicolo risulta già impegnato in queste date: cambialo prima di confermare.</div>' : ''}
      <div class="hero-car"><img src="assets/img/car/${a.img}.webp" alt="${esc(a.marca)} ${esc(a.modello)}"></div>
      <div class="sec"><h3>Veicolo</h3><button style="text-align:left;width:100%" data-open="v:${v.id}">${vehCell(v, `${targa(v)} · ${esc(G.sedeNome(v.sede))}`)}</button></div>
      <div class="sec"><h3>Cliente</h3><dl class="kv"><dt>Nome</dt><dd><button data-open="k:${k.id}" style="color:var(--blue-2);font-weight:500">${esc(G.cliNome(k))}</button></dd><dt>Documenti</dt><dd>${pill('d', k.docs)}</dd><dt>Contatti</dt><dd>${esc(k.tel)}<br>${esc(k.email)}</dd></dl><div style="margin-top:10px">${contactBtns(k.tel, k.email)}</div></div>
      <div class="sec"><h3>Noleggio</h3><dl class="kv">
        <dt>Periodo</dt><dd>${fmtDL(c.start)} → ${fmtDL(c.end)} (${durata(c)})</dd>
        <dt>Canone</dt><dd><b>${eur(c.unit)}${G.UNITA[c.tipo]}</b>${c.codice ? ` · codice ${esc(c.codice)}` : ''}</dd>
        <dt>Valore contratto</dt><dd>${eur(c.tot)}</dd>
        <dt>Km inclusi</dt><dd>${num(c.km)}${c.tipo === 'lungo' ? ' / anno' : ''}</dd>
        <dt>Consegna</dt><dd>${c.modo === 'domicilio' ? `A domicilio · ${esc(c.ind)}` : `In sede · ${esc(G.sedeNome(v.sede))}`} · ore ${esc(c.ora)}</dd>
        <dt>Driver</dt><dd>${drv ? esc(drv.nome) : '—'}</dd>
      </dl></div>
      <div class="sec"><h3>Avanzamento</h3><div class="tl">${tl.map(([cl, t, s]) => `<div class="${cl}"><b style="font-weight:500">${t}</b><span>${s}</span></div>`).join('')}</div></div>
      ${(c.consegna && (c.consegna.danni || []).length) || (c.ritiro && (c.ritiro.danni || []).length) ? `<div class="sec"><h3>Danni rilevati</h3><p>${c.consegna && c.consegna.danni.length ? `Alla consegna: ${esc(c.consegna.danni.join(', '))}<br>` : ''}${c.ritiro && c.ritiro.danni.length ? `Alla riconsegna: ${esc(c.ritiro.danni.join(', '))}` : ''}</p></div>` : ''}
      <div class="sec"><h3>Pagamenti</h3><div class="list">${ps.length ? ps.map((p) => `<div class="li"><span class="li-m"><span class="li-t">${esc(p.desc)}</span><span class="li-s">${fmtDL(p.due)} · ${esc(p.metodo)}</span></span><span class="li-r"><b>${eur(p.imp, true)}</b>${pill('p', G.pagStato(p))}</span>${p.stato !== 'pagato' ? `<button class="btn btn-line btn-sm" data-act="incassa" data-id="${p.id}">Incassa</button>` : ''}</div>`).join('') : '<div class="empty">Nessun pagamento generato.</div>'}</div></div>
      <div class="sec"><h3>Note interne</h3><textarea class="in" data-note="c:${c.id}" placeholder="Visibili solo allo staff">${esc(c.note)}</textarea></div>
    </div><div class="dr-f">${acts}</div>`);
  };

  OPEN.v = (id) => {
    const v = G.veh(id); if (!v) return; current = { t: 'v', id };
    const a = G.model(v.auto); const st = G.vehStato(v);
    const cs = S().contratti.filter((c) => c.veh === v.id && c.stato !== 'annullato').sort((x, y) => y.start.localeCompare(x.start));
    const now = G.contrInCorso(v.id); const next = cs.filter((c) => ['confermata', 'richiesta'].includes(c.stato)).reverse();
    const ints = S().interventi.filter((i) => i.veh === v.id).sort((x, y) => y.apertura.localeCompare(x.apertura));
    const mul = S().multe.filter((m) => m.veh === v.id);
    const rcv = cs.filter((c) => ['attivo', 'chiuso'].includes(c.stato)).reduce((s, c) => s + (c.tipo === 'breve' ? c.tot : c.unit * Math.max(1, Math.min(c.len, Math.round(diff(c.start, c.end < T ? c.end : T) / 30.4)))), 0);
    const df = (k, l) => `<label class="fld"><span>${l}</span><input class="in" type="date" value="${v[k] || ''}" data-vf="${v.id}:${k}"></label>`;
    openDrawer(drH(`${esc(G.catNome(a.categoria))} · ${esc(G.sedeNome(v.sede))}`, `${esc(a.marca)} ${esc(a.modello)}`, `<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap;align-items:center">${targa(v)} ${pill('v', st)}</div>`) + `<div class="dr-b">
      ${v.arrivo ? `<div class="note info">Veicolo ordinato, disponibile dal ${esc(v.arrivo)}. Sul sito i clienti possono lasciare il numero con “Avvisami”.</div>` : ''}
      <div class="hero-car"><img src="assets/img/car/${a.img}.webp" alt="${esc(a.marca)} ${esc(a.modello)}"></div>
      ${now ? `<div class="sec"><h3>Ora è da</h3><button class="li" data-open="c:${now.id}"><span class="li-m"><span class="li-t">${esc(G.cliNome(G.cli(now.cli)))}</span><span class="li-s">${esc(now.num)} · ${periodo(now)}</span></span><span class="li-r">${pill('c', now.stato)}</span></button></div>` : ''}
      ${next.length ? `<div class="sec"><h3>Prossime prenotazioni</h3><div class="list">${next.map((c) => `<button class="li" data-open="c:${c.id}"><span class="li-m"><span class="li-t">${esc(G.cliNome(G.cli(c.cli)))}</span><span class="li-s">${esc(c.num)} · ${periodo(c)}</span></span><span class="li-r">${pill('c', c.stato)}</span></button>`).join('')}</div></div>` : ''}
      <div class="sec"><h3>Dati</h3><dl class="kv"><dt>Versione</dt><dd>${esc(a.versione)}</dd><dt>Motore</dt><dd>${esc(a.alim)} · ${esc(a.cambio)} · ${a.cv} CV</dd><dt>Telaio</dt><dd>${esc(v.telaio)}</dd><dt>Immatricolazione</dt><dd>${v.imm ? fmtDL(v.imm) : '—'}</dd><dt>Ricavi generati</dt><dd>${eur(rcv)}</dd></dl></div>
      ${v.arrivo ? '' : `<div class="sec"><h3>Chilometri e manutenzione</h3><div class="grid2"><label class="fld"><span>Km attuali</span><input class="in num" type="number" min="0" step="1" value="${v.km}" data-vf="${v.id}:km"></label><label class="fld"><span>Prossimo tagliando a (km)</span><input class="in num" type="number" min="0" step="500" value="${v.tagl || ''}" data-vf="${v.id}:tagl"></label></div></div>
      <div class="sec"><h3>Scadenze</h3><div class="grid3">${df('ass', 'Assicurazione')}${df('rev', 'Revisione')}${df('bollo', 'Bollo')}</div><div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">${G.scadenze(v).map((s) => `<span class="small">${s.l}: ${ggPill(s.gg)}</span>`).join(' ')}</div></div>`}
      <div class="sec"><h3>Storico noleggi</h3><div class="list">${cs.filter((c) => c.stato === 'chiuso').slice(0, 6).map((c) => `<button class="li" data-open="c:${c.id}"><span class="li-m"><span class="li-t">${esc(G.cliNome(G.cli(c.cli)))}</span><span class="li-s">${esc(c.num)} · ${periodo(c)}</span></span><span class="li-r"><b>${eur(c.tipo === 'breve' ? c.tot : c.unit)}</b>${c.tipo === 'breve' ? 'totale' : 'al mese'}</span></button>`).join('') || '<div class="empty">Nessun noleggio concluso.</div>'}</div></div>
      <div class="sec"><h3>Officina</h3><div class="list">${ints.map((i) => `<button class="li" data-open="i:${i.id}"><span class="li-m"><span class="li-t">${esc(i.tipo)}</span><span class="li-s">${fmtDL(i.apertura)} · ${esc(i.officina)}</span></span><span class="li-r"><b>${eur(i.costo)}</b>${pill('i', i.stato)}</span></button>`).join('') || '<div class="empty">Nessun intervento.</div>'}</div></div>
      ${mul.length ? `<div class="sec"><h3>Multe</h3><div class="list">${mul.map((m) => `<button class="li" data-open="m:${m.id}"><span class="li-m"><span class="li-t">${esc(m.luogo)}</span><span class="li-s">${fmtDL(m.data)}</span></span><span class="li-r"><b>${eur(m.importo)}</b>${pill('m', m.stato)}</span></button>`).join('')}</div></div>` : ''}
      <div class="sec"><h3>Note</h3><textarea class="in" data-note="v:${v.id}" placeholder="Es. graffio leggero porta posteriore sinistra">${esc(v.note)}</textarea></div>
    </div><div class="dr-f">${v.arrivo ? `<button class="btn btn-primary" data-act="arrivato" data-id="${v.id}">Segna come arrivato</button>` : `<button class="btn btn-primary" data-act="newPrenVeh" data-id="${v.id}">${I.plus}Prenota</button><button class="btn btn-line" data-act="newInt" data-v="${v.id}">${I.wrench}Manda in officina</button><button class="btn btn-line" data-act="trasferisci" data-id="${v.id}">Trasferisci sede</button>`}</div>`);
  };

  OPEN.k = (id) => {
    const k = G.cli(id); if (!k) return; current = { t: 'k', id };
    const cs = S().contratti.filter((c) => c.cli === k.id).sort((x, y) => y.start.localeCompare(x.start));
    const ps = S().pagamenti.filter((p) => p.cli === k.id);
    const sc = ps.filter((p) => G.pagStato(p) === 'scaduto');
    const tot = cs.filter((c) => ['attivo', 'chiuso'].includes(c.stato)).reduce((s, c) => s + c.tot, 0);
    const f = (n, l, t = 'text', full) => `<label class="fld ${full ? 'full' : ''}"><span>${l}</span><input class="in" type="${t}" name="${n}" value="${esc(k[n])}"></label>`;
    openDrawer(drH(k.tipo === 'azienda' ? 'Cliente azienda' : 'Cliente privato', esc(G.cliNome(k)), `<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">${pill('d', k.docs)}${sc.length ? `<span class="pill bad">Insoluto ${eur(insoluto(k.id))}</span>` : ''}<span class="tag">Cliente dal ${fmtD(k.dal, { month: 'short', year: 'numeric' })}</span></div>`) + `<div class="dr-b">
      ${contactBtns(k.tel, k.email)}
      <div class="kpis k3" style="margin:0"><div class="kpi"><small>Contratti</small><b>${cs.filter((c) => c.stato !== 'annullato').length}</b></div><div class="kpi"><small>Fatturato</small><b>${eur(tot)}</b></div><div class="kpi"><small>Insoluto</small><b style="color:${sc.length ? 'var(--bad)' : 'inherit'}">${eur(insoluto(k.id))}</b></div></div>
      <div class="sec"><h3>Documenti</h3><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">${pill('d', k.docs)}${k.patenteScad ? `<span class="small muted">Patente valida fino al ${fmtDL(k.patenteScad)}${k.punti ? ` · ${k.punti} punti` : ''}</span>` : ''}</div>${k.docs !== 'ok' ? `<button class="btn btn-line btn-sm" style="margin-top:10px" data-act="docsOk" data-id="${k.id}">${I.check}Segna documenti verificati</button>` : ''}</div>
      <form class="sec" data-cliform="${k.id}"><h3>Anagrafica</h3><div class="grid2">${k.tipo === 'azienda' ? f('rs', 'Ragione sociale', 'text', true) + f('piva', 'Partita IVA') : ''}${f('nome', k.tipo === 'azienda' ? 'Referente · nome' : 'Nome')}${f('cognome', k.tipo === 'azienda' ? 'Referente · cognome' : 'Cognome')}${f('tel', 'Telefono', 'tel')}${f('email', 'Email', 'email')}${f('ind', 'Indirizzo')}${f('citta', 'Città')}</div><button class="btn btn-line btn-sm" style="margin-top:10px" type="submit">Salva anagrafica</button></form>
      <div class="sec"><h3>Contratti</h3><div class="list">${cs.map((c) => `<button class="li" data-open="c:${c.id}"><span class="li-m"><span class="li-t">${esc(G.vehNome(G.veh(c.veh)))} · ${G.FORMULE[c.tipo]}</span><span class="li-s">${esc(c.num)} · ${periodo(c)}</span></span><span class="li-r">${pill('c', c.stato)}</span></button>`).join('') || '<div class="empty">Nessun contratto.</div>'}</div></div>
      ${sc.length ? `<div class="sec"><h3>Rate scadute</h3><div class="list">${sc.map((p) => `<div class="li"><span class="li-m"><span class="li-t">${esc(p.desc)}</span><span class="li-s">scaduta ${G.rel(p.due)}${p.solleciti ? ` · ${p.solleciti} solleciti` : ''}</span></span><span class="li-r"><b>${eur(p.imp, true)}</b></span><button class="btn btn-ghost btn-sm" data-act="sollecita" data-id="${p.id}">Sollecita</button><button class="btn btn-line btn-sm" data-act="incassa" data-id="${p.id}">Incassa</button></div>`).join('')}</div></div>` : ''}
      <div class="sec"><h3>Note interne</h3><textarea class="in" data-note="k:${k.id}">${esc(k.note)}</textarea></div>
    </div><div class="dr-f"><button class="btn btn-primary" data-act="newPrenCli" data-id="${k.id}">${I.plus}Nuova prenotazione</button></div>`);
  };

  OPEN.r = (id) => {
    const r = S().richieste.find((x) => x.id === id); if (!r) return; current = { t: 'r', id };
    const a = G.model(r.auto);
    openDrawer(drH(`Richiesta · ${esc(r.fonte)}`, esc(r.azienda || r.nome), `<div style="margin-top:8px">${pill('l', r.stato)}</div>`) + `<div class="dr-b">
      ${contactBtns(r.tel, r.email)}
      <div class="sec"><h3>Interesse</h3>${a ? `<div class="cell-v"><img src="${G.img(a)}" alt=""><div><b>${esc(a.marca)} ${esc(a.modello)}</b><small>${G.FORMULE[r.tipo]} termine · da ${eur(G.prezzo(a, r.tipo))}${G.UNITA[r.tipo]}${a.arrivo ? ` · in arrivo dal ${esc(a.arrivo)}` : ''}</small></div></div>` : ''}</div>
      <div class="sec"><h3>Dettagli</h3><dl class="kv"><dt>Referente</dt><dd>${esc(r.nome)}</dd><dt>Telefono</dt><dd>${esc(r.tel)}</dd><dt>Email</dt><dd>${esc(r.email)}</dd><dt>Sede</dt><dd>${esc(G.sedeNome(r.sede))}</dd><dt>Ricevuta</dt><dd>${new Date(r.quando).toLocaleString('it-IT', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</dd></dl></div>
      <div class="sec"><h3>Stato</h3><div class="seg">${Object.entries(P.l).map(([k2, [, l]]) => `<button data-act="leadStato" data-id="${r.id}" data-s="${k2}" class="${r.stato === k2 ? 'on' : ''}">${l}</button>`).join('')}</div></div>
      <div class="sec"><h3>Assegnata a</h3><select class="sel" data-lassign="${r.id}"><option value="">Nessuno</option>${S().staff.filter((u) => u.ruolo !== 'Driver').map((u) => `<option value="${u.id}" ${r.assegnata === u.id ? 'selected' : ''}>${esc(u.nome)}</option>`).join('')}</select></div>
      <div class="sec"><h3>Note</h3><textarea class="in" data-note="r:${r.id}" placeholder="Es. richiamare dopo le 18">${esc(r.note)}</textarea></div>
    </div><div class="dr-f"><button class="btn btn-primary" data-act="convertLead" data-id="${r.id}">Converti in prenotazione</button></div>`);
  };

  OPEN.i = (id) => {
    const i = S().interventi.find((x) => x.id === id); if (!i) return; current = { t: 'i', id };
    const v = G.veh(i.veh);
    openDrawer(drH('Intervento di officina', esc(i.tipo), `<div style="margin-top:8px">${pill('i', i.stato)}</div>`) + `<div class="dr-b">
      <div class="sec"><h3>Veicolo</h3><button style="text-align:left" data-open="v:${v.id}">${vehCell(v)}</button></div>
      <form class="sec" data-intform="${i.id}"><h3>Dettagli</h3><div class="grid2">
        <label class="fld full"><span>Officina</span><input class="in" name="officina" value="${esc(i.officina)}"></label>
        <label class="fld"><span>Aperto il</span><input class="in" type="date" name="apertura" value="${i.apertura}"></label>
        <label class="fld"><span>${i.stato === 'chiuso' ? 'Chiuso il' : 'Pronto il'}</span><input class="in" type="date" name="fine" value="${i.fine}"></label>
        <label class="fld"><span>Costo (€)</span><input class="in num" type="number" min="0" name="costo" value="${i.costo}"></label>
        <label class="fld"><span>Stato</span><select class="sel" name="stato">${Object.keys(P.i).map((s) => `<option ${i.stato === s ? 'selected' : ''} value="${s}">${P.i[s][1]}</option>`).join('')}</select></label>
        <label class="fld full"><span>Note</span><textarea class="in" name="note">${esc(i.note)}</textarea></label>
      </div><button class="btn btn-line btn-sm" style="margin-top:10px" type="submit">Salva</button></form>
    </div>${i.stato !== 'chiuso' ? `<div class="dr-f"><button class="btn btn-primary" data-act="chiudiInt" data-id="${i.id}">${I.check}Veicolo pronto, chiudi intervento</button></div>` : ''}`);
  };

  OPEN.m = (id) => {
    const m = S().multe.find((x) => x.id === id); if (!m) return; current = { t: 'm', id };
    const v = G.veh(m.veh); const c = G.contrAllaData(m.veh, m.data); const k = c && G.cli(c.cli);
    const left = 60 - diff(m.ricevuta, T);
    openDrawer(drH('Multa', `${eur(m.importo)} · ${esc(m.luogo)}`, `<div style="margin-top:8px">${pill('m', m.stato)}</div>`) + `<div class="dr-b">
      ${m.stato === 'da rinotificare' ? `<div class="note ${left < 15 ? 'bad' : ''}">Per rinotificare al conducente restano <b>${Math.max(0, left)} giorni</b> (60 dalla notifica del ${fmtDL(m.ricevuta)}).</div>` : ''}
      <div class="sec"><h3>Infrazione</h3><dl class="kv"><dt>Quando</dt><dd>${fmtDL(m.data)} · ${esc(m.ora)}</dd><dt>Dove</dt><dd>${esc(m.luogo)}</dd><dt>Verbale</dt><dd>${esc(m.verbale)}</dd><dt>Importo</dt><dd>${eur(m.importo)}</dd><dt>Spese di gestione</dt><dd>${eur(m.spese)}</dd></dl></div>
      <div class="sec"><h3>Veicolo</h3><button style="text-align:left" data-open="v:${v.id}">${vehCell(v)}</button></div>
      <div class="sec"><h3>Alla guida in quella data</h3>${c ? `<button class="li" data-open="k:${k.id}"><span class="li-m"><span class="li-t">${esc(G.cliNome(k))}</span><span class="li-s">${esc(c.num)} · ${periodo(c)}</span></span></button>` : '<div class="note">Nessun noleggio in quella data: la multa resta a carico di LOCAFIT.</div>'}</div>
    </div><div class="dr-f">${m.stato === 'da rinotificare' && c ? `<button class="btn btn-primary" data-act="rinotifica" data-id="${m.id}">${I.mail}Rinotifica al cliente e addebita spese</button>` : ''}${m.stato !== 'chiusa' ? `<button class="btn btn-line" data-act="chiudiMulta" data-id="${m.id}">Segna chiusa</button>` : ''}</div>`);
  };

  OPEN.s = (id) => {
    const s = S().sinistri.find((x) => x.id === id); if (!s) return; current = { t: 's', id };
    const v = G.veh(s.veh); const c = G.contr(s.contr); const k = c && G.cli(c.cli);
    openDrawer(drH('Sinistro / danno', esc(s.desc), `<div style="margin-top:8px">${pill('s', s.stato)}</div>`) + `<div class="dr-b">
      <div class="sec"><h3>Dettagli</h3><dl class="kv"><dt>Data</dt><dd>${fmtDL(s.data)}</dd><dt>Stima danno</dt><dd>${eur(s.stima)}</dd><dt>Franchigia cliente</dt><dd>${s.franchigia ? eur(s.franchigia) : 'Nessuna (Kasko inclusa)'}</dd>${s.addebitato ? '<dt>Addebito</dt><dd>Franchigia già addebitata</dd>' : ''}</dl></div>
      <div class="sec"><h3>Veicolo</h3><button style="text-align:left" data-open="v:${v.id}">${vehCell(v)}</button></div>
      ${c ? `<div class="sec"><h3>Contratto</h3><button class="li" data-open="c:${c.id}"><span class="li-m"><span class="li-t">${esc(G.cliNome(k))}</span><span class="li-s">${esc(c.num)} · ${periodo(c)}</span></span></button></div>` : ''}
      <div class="sec"><h3>Stato</h3><div class="seg">${Object.entries(P.s).map(([k2, [, l]]) => `<button data-act="sinStato" data-id="${s.id}" data-s="${k2}" class="${s.stato === k2 ? 'on' : ''}">${l}</button>`).join('')}</div></div>
    </div><div class="dr-f">${c && s.franchigia && !s.addebitato ? `<button class="btn btn-primary" data-act="addebitaFranchigia" data-id="${s.id}">Addebita franchigia ${eur(s.franchigia)}</button>` : ''}<button class="btn btn-line" data-act="newInt" data-v="${v.id}" data-t="Carrozzeria">${I.wrench}Manda in carrozzeria</button></div>`);
  };

  /* ======================= MODULI (nuovo / modifica) ======================= */
  const opt = (list, sel) => list.map(([v, l]) => `<option value="${esc(v)}" ${String(sel) === String(v) ? 'selected' : ''}>${esc(l)}</option>`).join('');
  const cliOpts = (sel) => S().clienti.slice().sort((a, b) => G.cliNome(a).localeCompare(G.cliNome(b))).map((k) => [k.id, `${G.cliNome(k)} · ${k.tel}`]);

  function nuovaPren(pre = {}) {
    const v0 = pre.veh ? G.veh(pre.veh) : null;
    const tipo0 = pre.tipo || 'breve';
    const models = LF.auto.filter((a) => !a.arrivo);
    const body = `
      <div class="seg" role="radiogroup" aria-label="Formula">${Object.entries(G.FORMULE).map(([k, l]) => `<button type="button" data-ft="${k}" class="${tipo0 === k ? 'on' : ''}">${l} termine</button>`).join('')}</div><input type="hidden" name="tipo" value="${tipo0}">
      <div class="grid2">
        <label class="fld full"><span>Cliente</span><select class="sel" name="cli"><option value="">Scegli un cliente…</option><option value="__new" ${pre.newCli ? 'selected' : ''}>+ Nuovo cliente</option>${opt(cliOpts(), pre.cli)}</select></label>
        <div class="full grid2" id="nc" ${pre.newCli ? '' : 'hidden'}>
          <label class="fld"><span>Nome</span><input class="in" name="nome" value="${esc(pre.nome || '')}"></label>
          <label class="fld"><span>Cognome</span><input class="in" name="cognome" value="${esc(pre.cognome || '')}"></label>
          <label class="fld"><span>Telefono</span><input class="in" type="tel" name="tel" value="${esc(pre.tel || '')}"></label>
          <label class="fld"><span>Email</span><input class="in" type="email" name="email" value="${esc(pre.email || '')}"></label>
        </div>
        <label class="fld full"><span>Modello</span><select class="sel" name="auto">${LF.categorie.map((c) => { const l = models.filter((a) => a.categoria === c.id); return l.length ? `<optgroup label="${esc(c.nome)}">${opt(l.map((a) => [a.id, `${a.marca} ${a.modello} · ${a.versione}`]), v0 ? v0.auto : pre.auto)}</optgroup>` : ''; }).join('')}</select></label>
        <label class="fld"><span>Dal</span><input class="in" type="date" name="start" min="${T}" value="${pre.start || T}" required></label>
        <label class="fld"><span id="lenl">Durata</span><select class="sel" name="len"></select></label>
        <label class="fld full"><span>Veicolo</span><select class="sel" name="veh"></select></label>
        <label class="fld"><span>Consegna</span><select class="sel" name="modo">${opt([['sede', 'Ritiro in sede'], ['domicilio', 'A domicilio']], 'sede')}</select></label>
        <label class="fld"><span>Ora</span><input class="in" type="time" name="ora" value="10:00" step="900"></label>
        <label class="fld full" id="indf" hidden><span>Indirizzo di consegna</span><input class="in" name="ind" placeholder="Via, numero, città"></label>
        <label class="fld"><span>Codice sconto</span><select class="sel" name="codice"><option value="">Nessuno</option>${opt(S().codici.filter((c) => c.attivo).map((c) => [c.code, c.code]))}</select></label>
        <label class="fld"><span>Stato</span><select class="sel" name="stato">${opt([['confermata', 'Confermata'], ['richiesta', 'Da confermare']], 'confermata')}</select></label>
      </div>
      <div class="note info" id="riep"></div>`;
    openModal('Nuova prenotazione', body, (fd, f) => {
      const a = G.model(fd.auto); const tipo = fd.tipo; const len = +fd.len;
      if (!fd.cli) return fail(f, 'Scegli il cliente.');
      if (fd.cli === '__new' && (!fd.nome.trim() || !fd.cognome.trim() || !fd.tel.trim())) return fail(f, 'Per il nuovo cliente servono nome, cognome e telefono.');
      if (!fd.veh) return fail(f, 'Nessun veicolo di questo modello è libero in queste date.');
      if (fd.modo === 'domicilio' && fd.ind.trim().length < 6) return fail(f, 'Inserisci l’indirizzo di consegna.');
      const end = tipo === 'breve' ? addD(fd.start, len) : addM(fd.start, len);
      if (!G.libero(fd.veh, fd.start, end)) return fail(f, 'Il veicolo è già impegnato in queste date.');
      let cli = G.cli(fd.cli);
      if (fd.cli === '__new') { const v = G.veh(fd.veh); cli = { id: G.uid('k'), tipo: 'privato', nome: fd.nome.trim(), cognome: fd.cognome.trim(), rs: '', piva: '', email: fd.email.trim(), tel: fd.tel.trim(), citta: G.sedeNome(v.sede), ind: '', sede: v.sede, docs: 'attesa', patenteScad: null, punti: null, dal: T, note: '' }; S().clienti.unshift(cli); }
      const q = quote(a, tipo, len, fd.codice);
      const c = { id: G.uid('c'), num: `LF-${fd.start.slice(0, 4)}-${String(Math.floor(Math.random() * 90000) + 10000)}`, cli: cli.id, veh: fd.veh, tipo, start: fd.start, end, len, unit: q.unit, tot: q.tot, stato: fd.stato, canale: pre.canale || 'In sede', modo: fd.modo, ind: fd.modo === 'domicilio' ? fd.ind.trim() : '', ora: fd.ora || '10:00', oraR: fd.ora || '10:00', codice: fd.codice, km: tipo === 'breve' ? 250 * len : tipo === 'medio' ? 2500 * len : 15000, creato: T, consegna: null, ritiro: null, driver: '', note: '' };
      S().contratti.unshift(c);
      if (c.stato === 'confermata') G.genPagamenti(c);
      if (pre.lead) { const r = S().richieste.find((x) => x.id === pre.lead); if (r) r.stato = 'vinta'; }
      G.log(`ha creato la prenotazione ${c.num} (${a.marca} ${a.modello}, ${G.cliNome(cli)})`);
      refresh(`Prenotazione ${c.num} creata`);
      OPEN.c(c.id);
    }, { ok: 'Crea prenotazione', kick: 'Prenotazioni', bind: (f) => {
      const upd = () => {
        const tipo = f.tipo.value; const a = G.model(f.auto.value);
        const lens = tipo === 'breve' ? Array.from({ length: 30 }, (_, i) => [i + 1, `${i + 1} ${i ? 'giorni' : 'giorno'}`]) : tipo === 'medio' ? Array.from({ length: 12 }, (_, i) => [i + 1, `${i + 1} ${i ? 'mesi' : 'mese'}`]) : [24, 36, 48, 60].map((n) => [n, `${n} mesi`]);
        const cur = +f.len.value || (tipo === 'breve' ? 3 : tipo === 'medio' ? 3 : 36);
        f.len.innerHTML = opt(lens, lens.some((x) => x[0] === cur) ? cur : lens[tipo === 'lungo' ? 1 : 2][0]);
        const len = +f.len.value; const start = f.start.value || T; const end = tipo === 'breve' ? addD(start, len) : addM(start, len);
        const units = S().veicoli.filter((v) => v.auto === a.id && !v.arrivo).sort((x, y) => (G.inSede(y.sede) ? 1 : 0) - (G.inSede(x.sede) ? 1 : 0));
        const free = units.filter((v) => G.libero(v.id, start, end));
        const keep = f.veh.value || (v0 && v0.auto === a.id ? v0.id : '');
        f.veh.innerHTML = free.length ? opt(free.map((v) => [v.id, `${v.targa} · ${G.sedeNome(v.sede)} · ${num(v.km)} km`]), free.some((v) => v.id === keep) ? keep : free[0].id) : '<option value="">Nessun veicolo libero in queste date</option>';
        const q = quote(a, tipo, len, f.codice.value);
        $('#riep', f).innerHTML = `<b>${eur(q.unit)}${G.UNITA[tipo]}</b>${q.sconto ? ` (sconto ${Math.round(q.sconto * 100)}% applicato)` : ''} · ${fmtDL(start)} → ${fmtDL(end)} · totale contratto <b>${eur(q.tot)}</b>${units.length > free.length ? ` · ${units.length - free.length} di ${units.length} unità occupate` : ''}`;
        $('#nc', f).hidden = f.cli.value !== '__new';
        $('#indf', f).hidden = f.modo.value !== 'domicilio';
      };
      $$('[data-ft]', f).forEach((b) => b.addEventListener('click', () => { f.tipo.value = b.dataset.ft; $$('[data-ft]', f).forEach((x) => x.classList.toggle('on', x === b)); f.len.value = ''; upd(); }));
      ['auto', 'start', 'len', 'codice', 'cli', 'modo'].forEach((n) => f[n].addEventListener('change', () => { if (n === 'cli' && f.cli.value && f.cli.value !== '__new') { const k = G.cli(f.cli.value); if (k && k.ind && !f.ind.value) f.ind.value = `${k.ind}, ${k.citta}`; } upd(); }));
      upd();
    } });
  }
  function quote(a, tipo, len, codice) {
    const base = G.prezzo(a, tipo);
    let sconto = 0;
    if (codice === 'BLACK26' && tipo !== 'breve') sconto = G.promo(a) || 0.1;
    else if (codice === 'WEEKEND20' && tipo === 'breve') sconto = 0.2;
    else if (codice) sconto = 0;
    const unit = Math.round(base * (1 - sconto));
    return { unit, sconto, tot: unit * len };
  }

  /* Check-out (consegna) e check-in (riconsegna) */
  function checkModal(kind, c) {
    const v = G.veh(c.veh); const k = G.cli(c.cli);
    const ZONE = ['Anteriore', 'Posteriore', 'Fiancata sx', 'Fiancata dx', 'Tetto', 'Cerchi e gomme', 'Cristalli', 'Specchietti', 'Interni'];
    const before = kind === 'ritiro' && c.consegna ? c.consegna : null;
    const body = `
      <div class="cell-v">${vehCell(v, `${targa(v)} · ${esc(G.cliNome(k))}`)}</div>
      ${kind === 'consegna' && k.docs !== 'ok' ? `<div class="note">Documenti del cliente ${k.docs === 'scaduti' ? 'scaduti' : 'non ancora verificati'}: controlla patente e documento di persona.</div>` : ''}
      <div class="grid2">
        <label class="fld"><span>Km al ${kind === 'consegna' ? 'momento della consegna' : 'rientro'}</span><input class="in num" type="number" name="km" min="${v.km}" value="${v.km}" required></label>
        <label class="fld"><span>Ora</span><input class="in" type="time" name="ora" value="${new Date().toTimeString().slice(0, 5)}"></label>
      </div>
      <div class="fld"><span>Carburante / carica</span><div class="fuel">${['Riserva', '1/4', '1/2', '3/4', 'Pieno'].map((l, i) => `<label><input type="radio" name="carb" value="${i}" ${i === (kind === 'consegna' ? 4 : 3) ? 'checked' : ''}><span>${l}</span></label>`).join('')}</div>${before ? `<small>Alla consegna: ${['riserva', '1/4', '1/2', '3/4', 'pieno'][before.carb] || 'pieno'}${before.km ? ` · ${num(before.km)} km` : ''}</small>` : ''}</div>
      <div class="fld"><span>Danni ${kind === 'ritiro' ? 'nuovi ' : ''}rilevati</span><div class="zones">${ZONE.map((z) => `<label><input type="checkbox" name="d_${z}" value="1">${z}</label>`).join('')}</div></div>
      <label class="fld"><span>Note</span><textarea class="in" name="note" placeholder="Es. foto fatte da 4 lati, graffio già presente su cerchio ant. dx"></textarea></label>
      <label class="chk"><input type="checkbox" name="docs" value="1"> ${kind === 'consegna' ? 'Documenti e patente controllati di persona' : 'Chiavi, documenti e accessori restituiti'}</label>
      <label class="chk"><input type="checkbox" name="firma" value="1"> Verbale firmato dal cliente</label>`;
    openModal(kind === 'consegna' ? 'Registra consegna' : 'Registra riconsegna', body, (fd, f) => {
      const km = +fd.km;
      if (!(km >= v.km)) return fail(f, `I km non possono essere meno di quelli registrati (${num(v.km)}).`);
      if (!fd.docs || !fd.firma) return fail(f, 'Spunta le due conferme finali.');
      const danni = ZONE.filter((z) => fd['d_' + z]);
      const rec = { fatta: true, quando: T, oggi: true, ora: fd.ora, km, carb: +fd.carb, danni, note: fd.note };
      v.km = km; v.carb = +fd.carb;
      if (kind === 'consegna') {
        c.consegna = rec; c.stato = 'attivo';
        if (c.start > T) { const sh = diff(T, c.start); c.start = T; c.end = c.tipo === 'breve' ? addD(c.end, -sh) : c.end; }
        if (!S().pagamenti.some((p) => p.contr === c.id)) G.genPagamenti(c);
        G.log(`ha consegnato ${G.vehNome(v)} ${v.targa} a ${G.cliNome(k)}`);
        refresh('Consegna registrata: contratto in corso');
      } else {
        c.ritiro = rec; c.stato = 'chiuso';
        const extra = [];
        if (c.tipo === 'breve' && c.consegna && c.consegna.km != null) { const fatti = km - c.consegna.km; if (fatti > c.km) extra.push([`Km extra (${num(fatti - c.km)} × € 0,25)`, Math.round((fatti - c.km) * 0.25 * 100) / 100]); }
        const c0 = before ? before.carb : 4; if (+fd.carb < c0) extra.push([`Rifornimento (${c0 - fd.carb}/4 mancanti)`, (c0 - fd.carb) * 18 + 10]);
        extra.forEach(([d, imp]) => S().pagamenti.push({ id: G.uid('p'), contr: c.id, cli: c.cli, due: T, imp, desc: d, metodo: 'Carta', stato: 'aperto', pagatoIl: null, solleciti: 0 }));
        if (danni.length) S().sinistri.unshift({ id: G.uid('s'), veh: v.id, contr: c.id, data: T, desc: `Danni alla riconsegna: ${danni.join(', ')}`, stato: 'aperto', franchigia: 300, stima: 0 });
        if (c.end > T && c.tipo !== 'breve') { S().pagamenti = S().pagamenti.filter((p) => !(p.contr === c.id && p.stato !== 'pagato' && p.due > T)); }
        G.log(`ha registrato il rientro di ${G.vehNome(v)} ${v.targa}${danni.length ? ' con danni' : ''}`);
        refresh(`Riconsegna registrata${extra.length ? ` · ${extra.length} addebiti creati` : ''}${danni.length ? ' · sinistro aperto' : ''}`);
      }
    }, { ok: kind === 'consegna' ? 'Conferma consegna' : 'Chiudi noleggio', kick: c.num });
  }

  /* ======================= AZIONI ======================= */
  const A = {};
  A.closeDrawer = () => closeDrawer();
  A.closeModal = () => closeModal();
  A.burger = () => { ensureLayers(); $('.side').classList.add('open'); showScrim(); };
  A.mobileSearch = () => {
    openModal('Cerca', `<div class="search" style="max-width:none">${I.search}<input id="msq" type="search" placeholder="Cliente, targa, contratto…" autocomplete="off"><div class="search-res" id="msr" hidden style="position:static;box-shadow:none;border:0;max-height:none;margin-top:8px"></div></div>`, () => false, { ok: 'Chiudi', bind: (f) => { bindSearch($('#msq', f), $('#msr', f)); $('#msr', f).addEventListener('click', (e) => { if (e.target.closest('[data-open]')) closeModal(); }); f.addEventListener('submit', () => closeModal()); } });
  };
  A.logout = () => { S().utente = ''; G.save(); location.hash = ''; boot(); };
  A.newPren = () => nuovaPren();
  A.newAt = (el) => nuovaPren({ veh: el.dataset.v, start: el.dataset.d });
  A.newPrenVeh = (el) => nuovaPren({ veh: el.dataset.id });
  A.newPrenCli = (el) => nuovaPren({ cli: el.dataset.id });
  A.ripeti = (el) => { const c = G.contr(el.dataset.id); nuovaPren({ cli: c.cli, tipo: c.tipo, veh: c.veh }); };
  A.planMove = (el) => { const n = +el.dataset.n; UI.planning.off = n === 0 ? -3 : UI.planning.off + n; renderView(true); if (n === 0) { const p = $('.plan'); p && (p.scrollLeft = 0); } };
  A.jobsRange = (el) => { UI.consegne.r = el.dataset.r; renderView(true); };
  A.offTab = (el) => { UI.off.t = el.dataset.t; history.replaceState(null, '', '#officina'); renderView(true); };
  A.mulTab = (el) => { UI.mul.t = el.dataset.t; renderView(true); };
  A.more = (el) => { UI[el.dataset.id].lim += 60; renderList(el.dataset.id); };
  A.csv = (el) => csv(el.dataset.id);
  A.conferma = (el) => {
    const c = G.contr(el.dataset.id);
    if (!G.libero(c.veh, c.start, c.end, c.id)) return G.toast('Veicolo occupato: cambialo prima di confermare');
    c.stato = 'confermata'; c.nuovo = false;
    if (!S().pagamenti.some((p) => p.contr === c.id)) G.genPagamenti(c);
    G.log(`ha confermato la prenotazione ${c.num}`); refresh('Prenotazione confermata');
  };
  A.annulla = (el) => { const c = G.contr(el.dataset.id); G.confirm(c.stato === 'richiesta' ? 'Rifiutare la richiesta?' : 'Annullare la prenotazione?', `${esc(c.num)} · ${esc(G.cliNome(G.cli(c.cli)))}. I pagamenti non ancora incassati verranno eliminati.`, c.stato === 'richiesta' ? 'Rifiuta' : 'Annulla prenotazione', () => { c.stato = 'annullato'; c.nuovo = false; S().pagamenti = S().pagamenti.filter((p) => !(p.contr === c.id && p.stato !== 'pagato')); G.log(`ha annullato ${c.num}`); refresh('Prenotazione annullata'); }); };
  A.checkout = (el) => checkModal('consegna', G.contr(el.dataset.id));
  A.checkin = (el) => checkModal('ritiro', G.contr(el.dataset.id));
  A.proroga = (el) => {
    const c = G.contr(el.dataset.id); const u = c.tipo === 'breve' ? 'giorni' : 'mesi';
    openModal('Proroga contratto', `<p class="muted">${esc(c.num)} · fine attuale ${fmtDL(c.end)}</p><label class="fld"><span>Aggiungi ${u}</span><input class="in num" type="number" name="n" min="1" max="${c.tipo === 'breve' ? 30 : 24}" value="${c.tipo === 'breve' ? 2 : 3}"></label>`, (fd, f) => {
      const n = +fd.n; if (!(n > 0)) return fail(f, 'Inserisci un numero valido.');
      const end = c.tipo === 'breve' ? addD(c.end, n) : addM(c.end, n);
      if (!G.libero(c.veh, c.end, end, c.id)) return fail(f, 'Il veicolo è già prenotato subito dopo: non si può prorogare così tanto.');
      const oldLen = c.len; c.end = end; c.len += n; c.tot = c.unit * c.len; if (c.tipo === 'breve') c.km = 250 * c.len;
      if (c.tipo === 'breve') S().pagamenti.push({ id: G.uid('p'), contr: c.id, cli: c.cli, due: T, imp: c.unit * n, desc: `Proroga ${n} giorni`, metodo: 'Carta', stato: 'aperto', pagatoIl: null, solleciti: 0 });
      else for (let i = oldLen; i < c.len && addM(c.start, i) <= addD(T, 35); i++) S().pagamenti.push({ id: G.uid('p'), contr: c.id, cli: c.cli, due: addM(c.start, i), imp: c.unit, desc: `Canone ${i + 1}/${c.len}`, metodo: 'SEPA', stato: 'aperto', pagatoIl: null, solleciti: 0 });
      G.log(`ha prorogato ${c.num} di ${n} ${u}`); refresh('Contratto prorogato');
    }, { ok: 'Proroga' });
  };
  A.cambiaVeh = (el) => {
    const c = G.contr(el.dataset.id); const cur = G.veh(c.veh); const cat = G.model(cur.auto).categoria;
    const free = S().veicoli.filter((v) => v.id !== c.veh && G.libero(v.id, c.start, c.end, c.id)).sort((a, b) => (G.model(b.auto).categoria === cat) - (G.model(a.auto).categoria === cat) || (b.auto === cur.auto) - (a.auto === cur.auto));
    openModal('Cambia veicolo', `<p class="muted">Veicoli liberi dal ${fmtDL(c.start)} al ${fmtDL(c.end)}. In alto quelli della stessa categoria.</p><label class="fld"><span>Nuovo veicolo</span><select class="sel" name="veh">${opt(free.map((v) => [v.id, `${G.vehNome(v)} · ${v.targa} · ${G.sedeNome(v.sede)}`]))}</select></label><label class="chk"><input type="checkbox" name="prezzo" value="1"> Aggiorna il canone al listino del nuovo modello</label>`, (fd, f) => {
      if (!fd.veh) return fail(f, 'Nessun veicolo libero.');
      c.veh = fd.veh;
      if (fd.prezzo) { const a = G.model(G.veh(fd.veh).auto); c.unit = quote(a, c.tipo, c.len, c.codice).unit; c.tot = c.unit * c.len; S().pagamenti.filter((p) => p.contr === c.id && p.stato !== 'pagato').forEach((p) => { p.imp = c.tipo === 'breve' ? c.tot : c.unit; }); }
      G.log(`ha spostato ${c.num} su ${G.vehNome(G.veh(fd.veh))}`); refresh('Veicolo cambiato');
    }, { ok: 'Cambia' });
  };
  A.incassa = (el) => { const p = S().pagamenti.find((x) => x.id === el.dataset.id); p.stato = 'pagato'; p.pagatoIl = T; G.log(`ha incassato ${eur(p.imp, true)} da ${G.cliNome(G.cli(p.cli))}`); refresh('Pagamento segnato come incassato'); };
  A.sollecita = (el) => { const p = S().pagamenti.find((x) => x.id === el.dataset.id); const k = G.cli(p.cli); p.solleciti++; G.log(`ha sollecitato ${G.cliNome(k)} (${eur(p.imp, true)})`); refresh(`Sollecito registrato per ${G.cliNome(k)}`); window.open(`mailto:${encodeURIComponent(k.email)}?subject=${encodeURIComponent('LOCAFIT Rent · pagamento in sospeso')}&body=${encodeURIComponent(`Gentile ${k.nome},\n\nrisulta non ancora saldato il pagamento "${p.desc}" di ${eur(p.imp, true)} scaduto il ${fmtDL(p.due)} (contratto ${(G.contr(p.contr) || {}).num}).\nPuò saldarlo dalla sua area personale o rispondendo a questa email.\n\nGrazie,\nLOCAFIT Rent`)}`, '_self'); };
  A.sollecitaTutti = () => { const sc = pagamenti().filter((p) => G.pagStato(p) === 'scaduto'); const n = new Set(sc.map((p) => p.cli)).size; G.confirm('Sollecitare tutti gli scaduti?', `Registra un sollecito su ${sc.length} rate di ${n} clienti. In un gestionale collegato partirebbe un’email automatica a ciascuno.`, 'Registra solleciti', () => { sc.forEach((p) => p.solleciti++); G.log(`ha sollecitato ${n} clienti insolventi`); refresh(`${sc.length} solleciti registrati`); }, false); };
  A.docsOk = (el) => { const k = G.cli(el.dataset.id); k.docs = 'ok'; G.log(`ha verificato i documenti di ${G.cliNome(k)}`); refresh('Documenti verificati'); };
  A.leadStato = (el) => { const r = S().richieste.find((x) => x.id === el.dataset.id); r.stato = el.dataset.s; if (!r.assegnata) r.assegnata = S().utente; G.log(`ha spostato la richiesta di ${r.azienda || r.nome} in "${P.l[r.stato][1]}"`); refresh(); };
  A.convertLead = (el) => { const r = S().richieste.find((x) => x.id === el.dataset.id); const [nome, ...cog] = r.nome.split(' '); const ex = S().clienti.find((k) => k.tel === r.tel); nuovaPren(ex ? { cli: ex.id, auto: r.auto, tipo: r.tipo, lead: r.id, canale: r.fonte.includes('WhatsApp') ? 'WhatsApp' : r.fonte.includes('Telefono') ? 'Telefono' : 'Sito' } : { newCli: true, nome, cognome: cog.join(' '), tel: r.tel, email: r.email, auto: G.model(r.auto).arrivo ? '' : r.auto, tipo: r.tipo, lead: r.id, canale: 'Sito' }); };
  A.chiudiInt = (el) => { const i = S().interventi.find((x) => x.id === el.dataset.id); i.stato = 'chiuso'; i.fine = T; const v = G.veh(i.veh); if (i.tipo === 'Tagliando') v.tagl = Math.ceil((v.km + 15000) / 1000) * 1000; if (i.tipo === 'Revisione') v.rev = addM(T, 24); G.log(`ha chiuso l’intervento “${i.tipo}” su ${G.vehNome(v)}`); refresh('Intervento chiuso, veicolo disponibile'); };
  A.rinnova = (el) => { const v = G.veh(el.dataset.id); const k = el.dataset.k; v[k] = k === 'rev' ? addM(v[k] > T ? v[k] : T, 24) : addM(v[k] > T ? v[k] : T, 12); G.log(`ha rinnovato ${k === 'ass' ? 'l’assicurazione' : k === 'rev' ? 'la revisione' : 'il bollo'} di ${G.vehNome(v)} ${v.targa}`); refresh('Scadenza aggiornata'); };
  A.rinotifica = (el) => { const m = S().multe.find((x) => x.id === el.dataset.id); const c = G.contrAllaData(m.veh, m.data); m.stato = 'rinotificata'; S().pagamenti.push({ id: G.uid('p'), contr: c.id, cli: c.cli, due: addD(T, 15), imp: m.spese, desc: `Spese gestione verbale ${m.verbale}`, metodo: 'Carta', stato: 'aperto', pagatoIl: null, solleciti: 0 }); G.log(`ha rinotificato la multa ${m.verbale} a ${G.cliNome(G.cli(c.cli))}`); refresh(`Multa rinotificata a ${G.cliNome(G.cli(c.cli))}, spese addebitate`); };
  A.chiudiMulta = (el) => { const m = S().multe.find((x) => x.id === el.dataset.id); m.stato = 'chiusa'; refresh('Multa chiusa'); };
  A.sinStato = (el) => { const s = S().sinistri.find((x) => x.id === el.dataset.id); s.stato = el.dataset.s; refresh(); };
  A.addebitaFranchigia = (el) => { const s = S().sinistri.find((x) => x.id === el.dataset.id); const c = G.contr(s.contr); s.addebitato = true; S().pagamenti.push({ id: G.uid('p'), contr: c.id, cli: c.cli, due: addD(T, 10), imp: s.franchigia, desc: 'Franchigia danni', metodo: 'Carta', stato: 'aperto', pagatoIl: null, solleciti: 0 }); G.log(`ha addebitato la franchigia a ${G.cliNome(G.cli(c.cli))}`); refresh('Franchigia addebitata'); };
  A.arrivato = (el) => { const v = G.veh(el.dataset.id); openModal('Veicolo arrivato', `<div class="grid2"><label class="fld"><span>Targa</span><input class="in" name="targa" required style="text-transform:uppercase" placeholder="GH123AB"></label><label class="fld"><span>Km</span><input class="in num" type="number" name="km" value="10" min="0"></label></div>`, (fd, f) => { const t = fd.targa.replace(/\s/g, '').toUpperCase(); if (!/^[A-Z]{2}\d{3}[A-Z]{2}$/.test(t)) return fail(f, 'Targa non valida (formato AB123CD).'); v.targa = t; v.km = +fd.km || 0; v.arrivo = ''; v.imm = T; v.ass = addM(T, 12); v.bollo = addM(T, 12); v.rev = addM(T, 48); v.tagl = 15000; G.log(`ha messo in flotta ${G.vehNome(v)} ${t}`); refresh('Veicolo disponibile al noleggio'); }, { ok: 'Metti in flotta' }); };
  A.trasferisci = (el) => { const v = G.veh(el.dataset.id); openModal('Trasferisci sede', `<label class="fld"><span>Nuova sede</span><select class="sel" name="sede">${opt(LF.sedi.filter((s) => s.id !== v.sede).map((s) => [s.id, s.citta]))}</select></label>`, (fd) => { v.sede = fd.sede; G.log(`ha trasferito ${G.vehNome(v)} ${v.targa} a ${G.sedeNome(fd.sede)}`); refresh(`Trasferito a ${G.sedeNome(fd.sede)}`); }, { ok: 'Trasferisci' }); };
  A.newVeh = () => openModal('Aggiungi veicolo', `<div class="grid2"><label class="fld full"><span>Modello</span><select class="sel" name="auto">${opt(LF.auto.map((a) => [a.id, `${a.marca} ${a.modello} · ${a.versione}`]))}</select></label><label class="fld"><span>Targa</span><input class="in" name="targa" style="text-transform:uppercase" placeholder="GH123AB"></label><label class="fld"><span>Sede</span><select class="sel" name="sede">${opt(LF.sedi.map((s) => [s.id, s.citta]), S().sede || 'roma')}</select></label><label class="fld"><span>Immatricolazione</span><input class="in" type="date" name="imm" value="${T}"></label><label class="fld"><span>Km</span><input class="in num" type="number" name="km" value="0" min="0"></label><label class="fld"><span>Scadenza assicurazione</span><input class="in" type="date" name="ass" value="${addM(T, 12)}"></label><label class="fld"><span>Scadenza bollo</span><input class="in" type="date" name="bollo" value="${addM(T, 12)}"></label></div>`, (fd, f) => {
    const t = fd.targa.replace(/\s/g, '').toUpperCase(); if (!/^[A-Z]{2}\d{3}[A-Z]{2}$/.test(t)) return fail(f, 'Targa non valida (formato AB123CD).');
    if (S().veicoli.some((v) => v.targa === t)) return fail(f, 'Questa targa è già in flotta.');
    const v = { id: G.uid('v'), auto: fd.auto, targa: t, sede: fd.sede, imm: fd.imm, km: +fd.km || 0, arrivo: '', ass: fd.ass, rev: addM(fd.imm, 48), bollo: fd.bollo, tagl: Math.ceil(((+fd.km || 0) + 15000) / 1000) * 1000, carb: 4, telaio: '', note: '' };
    S().veicoli.push(v); G.log(`ha aggiunto ${G.vehNome(v)} ${t} alla flotta`); refresh('Veicolo aggiunto'); OPEN.v(v.id);
  }, { ok: 'Aggiungi' });
  A.newCli = () => openModal('Nuovo cliente', `<div class="seg"><button type="button" class="on" data-ct="privato">Privato</button><button type="button" data-ct="azienda">Azienda</button></div><input type="hidden" name="tipo" value="privato"><div class="grid2"><label class="fld full az" hidden><span>Ragione sociale</span><input class="in" name="rs"></label><label class="fld az" hidden><span>Partita IVA</span><input class="in" name="piva" inputmode="numeric"></label><label class="fld"><span>Nome</span><input class="in" name="nome"></label><label class="fld"><span>Cognome</span><input class="in" name="cognome"></label><label class="fld"><span>Telefono</span><input class="in" type="tel" name="tel"></label><label class="fld"><span>Email</span><input class="in" type="email" name="email"></label><label class="fld"><span>Indirizzo</span><input class="in" name="ind"></label><label class="fld"><span>Città</span><input class="in" name="citta"></label><label class="fld"><span>Sede di riferimento</span><select class="sel" name="sede">${opt(LF.sedi.map((s) => [s.id, s.citta]), S().sede || 'roma')}</select></label></div>`, (fd, f) => {
    if (!fd.nome.trim() || !fd.cognome.trim() || !fd.tel.trim()) return fail(f, 'Servono almeno nome, cognome e telefono.');
    if (fd.tipo === 'azienda' && !fd.rs.trim()) return fail(f, 'Inserisci la ragione sociale.');
    const k = { id: G.uid('k'), tipo: fd.tipo, nome: fd.nome.trim(), cognome: fd.cognome.trim(), rs: fd.rs.trim(), piva: fd.piva.trim(), email: fd.email.trim(), tel: fd.tel.trim(), citta: fd.citta.trim(), ind: fd.ind.trim(), sede: fd.sede, docs: 'attesa', patenteScad: null, punti: null, dal: T, note: '' };
    S().clienti.unshift(k); G.log(`ha aggiunto il cliente ${G.cliNome(k)}`); refresh('Cliente aggiunto'); OPEN.k(k.id);
  }, { ok: 'Aggiungi', bind: (f) => $$('[data-ct]', f).forEach((b) => b.addEventListener('click', () => { f.tipo.value = b.dataset.ct; $$('[data-ct]', f).forEach((x) => x.classList.toggle('on', x === b)); $$('.az', f).forEach((x) => { x.hidden = b.dataset.ct !== 'azienda'; }); })) });
  A.newInt = (el) => { const vs = S().veicoli.filter((v) => !v.arrivo).sort((a, b) => G.vehNome(a).localeCompare(G.vehNome(b))); openModal('Nuovo intervento', `<div class="grid2"><label class="fld full"><span>Veicolo</span><select class="sel" name="veh">${opt(vs.map((v) => [v.id, `${G.vehNome(v)} · ${v.targa} · ${G.sedeNome(v.sede)}`]), el.dataset.v)}</select></label><label class="fld"><span>Tipo</span><select class="sel" name="tipo">${opt(['Tagliando', 'Cambio gomme invernali', 'Cambio gomme estive', 'Carrozzeria', 'Revisione', 'Freni e pastiglie', 'Sostituzione parabrezza', 'Riparazione meccanica', 'Pulizia e igienizzazione'].map((x) => [x, x]), el.dataset.t)}</select></label><label class="fld"><span>Officina</span><input class="in" name="officina" list="offs" placeholder="Nome officina"><datalist id="offs">${[...new Set(S().interventi.map((i) => i.officina))].map((o) => `<option value="${esc(o)}">`).join('')}</datalist></label><label class="fld"><span>Dal</span><input class="in" type="date" name="apertura" value="${T}"></label><label class="fld"><span>Pronto il</span><input class="in" type="date" name="fine" value="${addD(T, 2)}"></label><label class="fld"><span>Costo stimato (€)</span><input class="in num" type="number" name="costo" min="0" value="0"></label></div><div class="note" id="intw" hidden></div>`, (fd, f) => {
    if (fd.fine < fd.apertura) return fail(f, 'La data di fine è prima dell’apertura.');
    const i = { id: G.uid('i'), veh: fd.veh, tipo: fd.tipo, officina: fd.officina.trim() || 'Da definire', apertura: fd.apertura, fine: fd.fine, stato: 'aperto', costo: +fd.costo || 0, note: '' };
    S().interventi.unshift(i); G.log(`ha mandato in officina ${G.vehNome(G.veh(fd.veh))} (${fd.tipo})`); refresh('Intervento aperto');
  }, { ok: 'Apri intervento', bind: (f) => { const chk = () => { const busy = S().contratti.filter((c) => c.veh === f.veh.value && G.APERTI.includes(c.stato) && c.start <= f.fine.value && f.apertura.value <= c.end); const w = $('#intw', f); w.hidden = !busy.length; w.textContent = busy.length ? `Attenzione: il veicolo ha ${busy.length} prenotazioni in quelle date (${busy.map((c) => c.num).join(', ')}). Dopo, usa “Cambia veicolo”.` : ''; }; ['veh', 'apertura', 'fine'].forEach((n) => f[n].addEventListener('change', chk)); chk(); } }); };
  A.newMulta = () => { const vs = S().veicoli.filter((v) => v.targa).sort((a, b) => a.targa.localeCompare(b.targa)); openModal('Registra multa', `<div class="grid2"><label class="fld full"><span>Targa</span><select class="sel" name="veh">${opt(vs.map((v) => [v.id, `${v.targa} · ${G.vehNome(v)}`]))}</select></label><label class="fld"><span>Data infrazione</span><input class="in" type="date" name="data" max="${T}" value="${addD(T, -20)}"></label><label class="fld"><span>Ora</span><input class="in" type="time" name="ora" value="12:00"></label><label class="fld full"><span>Luogo</span><input class="in" name="luogo" placeholder="Es. Roma, ZTL Centro Storico"></label><label class="fld"><span>N. verbale</span><input class="in" name="verbale"></label><label class="fld"><span>Importo (€)</span><input class="in num" type="number" name="importo" min="0" value="42"></label><label class="fld"><span>Notificata il</span><input class="in" type="date" name="ricevuta" max="${T}" value="${T}"></label></div><div class="note info" id="chi"></div>`, (fd, f) => {
    if (!fd.luogo.trim() || !fd.verbale.trim()) return fail(f, 'Inserisci luogo e numero di verbale.');
    const v = G.veh(fd.veh); const m = { id: G.uid('m'), veh: v.id, targa: v.targa, data: fd.data, ora: fd.ora, luogo: fd.luogo.trim(), verbale: fd.verbale.trim(), importo: +fd.importo || 0, ricevuta: fd.ricevuta, stato: 'da rinotificare', spese: 25 };
    S().multe.unshift(m); G.log(`ha registrato la multa ${m.verbale} su ${v.targa}`); refresh('Multa registrata'); OPEN.m(m.id);
  }, { ok: 'Registra', bind: (f) => { const chk = () => { const c = G.contrAllaData(f.veh.value, f.data.value); $('#chi', f).innerHTML = c ? `In quella data l’auto era a <b>${esc(G.cliNome(G.cli(c.cli)))}</b> (${esc(c.num)}).` : 'In quella data l’auto non risulta a noleggio.'; }; f.veh.addEventListener('change', chk); f.data.addEventListener('change', chk); chk(); } }); };
  A.newSin = () => { const cs = contratti().filter((c) => ['attivo', 'chiuso'].includes(c.stato)).sort((a, b) => b.start.localeCompare(a.start)).slice(0, 150); openModal('Nuovo sinistro', `<div class="grid2"><label class="fld full"><span>Contratto</span><select class="sel" name="contr">${opt(cs.map((c) => [c.id, `${c.num} · ${G.cliNome(G.cli(c.cli))} · ${G.vehNome(G.veh(c.veh))}`]))}</select></label><label class="fld"><span>Data</span><input class="in" type="date" name="data" max="${T}" value="${T}"></label><label class="fld"><span>Stima danno (€)</span><input class="in num" type="number" name="stima" min="0" value="0"></label><label class="fld full"><span>Descrizione</span><input class="in" name="desc" placeholder="Es. urto paraurti posteriore in parcheggio"></label><label class="fld"><span>Franchigia (€)</span><select class="sel" name="franchigia">${opt([[0, 'Nessuna'], [300, '€ 300'], [500, '€ 500'], [1000, '€ 1.000']], 300)}</select></label></div>`, (fd, f) => {
    if (!fd.desc.trim()) return fail(f, 'Descrivi il danno.');
    const c = G.contr(fd.contr); const s = { id: G.uid('s'), veh: c.veh, contr: c.id, data: fd.data, desc: fd.desc.trim(), stato: 'aperto', franchigia: +fd.franchigia, stima: +fd.stima || 0 };
    S().sinistri.unshift(s); G.log(`ha aperto un sinistro su ${G.vehNome(G.veh(c.veh))}`); refresh('Sinistro registrato'); OPEN.s(s.id);
  }, { ok: 'Registra' }); };
  A.newLead = () => openModal('Nuova richiesta', `<div class="grid2"><label class="fld"><span>Nome e cognome</span><input class="in" name="nome"></label><label class="fld"><span>Azienda (facoltativa)</span><input class="in" name="azienda"></label><label class="fld"><span>Telefono</span><input class="in" type="tel" name="tel"></label><label class="fld"><span>Email</span><input class="in" type="email" name="email"></label><label class="fld"><span>Modello di interesse</span><select class="sel" name="auto">${opt(LF.auto.map((a) => [a.id, `${a.marca} ${a.modello}`]))}</select></label><label class="fld"><span>Formula</span><select class="sel" name="tipo">${opt(Object.entries(G.FORMULE).map(([k, l]) => [k, l + ' termine']), 'lungo')}</select></label><label class="fld"><span>Fonte</span><select class="sel" name="fonte">${opt(['Telefono', 'WhatsApp', 'In sede', 'Form sito', 'Aziende', 'Passaparola'].map((x) => [x, x]))}</select></label><label class="fld"><span>Sede</span><select class="sel" name="sede">${opt(LF.sedi.map((s) => [s.id, s.citta]), S().sede || 'roma')}</select></label><label class="fld full"><span>Note</span><textarea class="in" name="note"></textarea></label></div>`, (fd, f) => {
    if (!fd.nome.trim() || !fd.tel.trim()) return fail(f, 'Servono nome e telefono.');
    S().richieste.unshift({ id: G.uid('r'), nome: fd.nome.trim(), azienda: fd.azienda.trim(), tel: fd.tel.trim(), email: fd.email.trim(), auto: fd.auto, tipo: fd.tipo, fonte: fd.fonte, sede: fd.sede, stato: 'nuova', quando: new Date().toISOString(), assegnata: S().utente, note: fd.note });
    G.log(`ha inserito una richiesta di ${fd.nome.trim()}`); refresh('Richiesta aggiunta');
  }, { ok: 'Aggiungi' });
  A.newCode = () => openModal('Nuovo codice sconto', `<div class="grid2"><label class="fld"><span>Codice</span><input class="in" name="code" style="text-transform:uppercase" placeholder="ESTATE27"></label><label class="fld"><span>Formula</span><select class="sel" name="tipo">${opt(Object.entries(G.FORMULE).map(([k, l]) => [k, l + ' termine']))}</select></label><label class="fld full"><span>Titolo</span><input class="in" name="titolo"></label><label class="fld full"><span>Descrizione</span><textarea class="in" name="desc"></textarea></label><label class="fld"><span>Scadenza</span><input class="in" type="date" name="scade" value="${addM(T, 2)}"></label></div>`, (fd, f) => {
    const code = fd.code.replace(/\s/g, '').toUpperCase(); if (code.length < 3) return fail(f, 'Codice troppo corto.'); if (S().codici.some((c) => c.code === code)) return fail(f, 'Codice già esistente.');
    S().codici.push({ code, titolo: fd.titolo.trim() || code, desc: fd.desc.trim(), scade: fmtDL(fd.scade), tipo: fd.tipo, attivo: true, usi: 0 }); G.log(`ha creato il codice ${code}`); refresh('Codice creato');
  }, { ok: 'Crea' });
  A.newStaff = () => openModal('Aggiungi membro dello staff', `<div class="grid2"><label class="fld"><span>Nome e cognome</span><input class="in" name="nome"></label><label class="fld"><span>Email</span><input class="in" type="email" name="email"></label><label class="fld"><span>Ruolo</span><select class="sel" name="ruolo">${opt(['Consulente', 'Responsabile sede', 'Driver', 'Amministrazione', 'Amministratore'].map((x) => [x, x]))}</select></label><label class="fld"><span>Sede</span><select class="sel" name="sede"><option value="">Tutte</option>${opt(LF.sedi.map((s) => [s.id, s.citta]))}</select></label></div>`, (fd, f) => { if (!fd.nome.trim()) return fail(f, 'Inserisci il nome.'); S().staff.push({ id: G.uid('u'), nome: fd.nome.trim(), email: fd.email.trim(), ruolo: fd.ruolo, sede: fd.sede }); refresh('Aggiunto allo staff'); }, { ok: 'Aggiungi' });
  A.delStaff = (el) => { const u = S().staff.find((x) => x.id === el.dataset.id); G.confirm('Rimuovere dallo staff?', esc(u.nome), 'Rimuovi', () => { S().staff = S().staff.filter((x) => x.id !== u.id); S().contratti.forEach((c) => { if (c.driver === u.id) c.driver = ''; }); refresh('Rimosso'); }); };
  A.backup = () => { const blob = new Blob([JSON.stringify(S(), null, 1)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `locafit-gestionale-${T}.json`; document.body.appendChild(a); a.click(); a.remove(); G.toast('Backup scaricato'); };
  A.resetDemo = () => G.confirm('Ripristinare i dati di esempio?', 'Tutte le modifiche fatte nel gestionale andranno perse.', 'Ripristina', () => { const u = S().utente; G.reset(); S().utente = u; G.save(); renderNav(); renderView(); G.toast('Dati di esempio ripristinati'); });
  function restore(e) {
    const file = e.target.files[0]; if (!file) return;
    const rd = new FileReader();
    rd.onload = () => { try { const d = JSON.parse(rd.result); if (!d || d.v !== 1 || !Array.isArray(d.contratti)) throw new Error(); const u = S().utente; G.S = d; d.utente = u; G.save(); renderNav(); renderView(); G.toast('Backup ripristinato'); } catch (err) { G.toast('File non valido'); } };
    rd.readAsText(file);
  }

  /* ---------- Delegazione eventi ---------- */
  document.addEventListener('click', (e) => {
    const t = e.target;
    const act = t.closest('[data-act]');
    if (act && A[act.dataset.act]) { e.preventDefault(); A[act.dataset.act](act); return; }
    const gol = t.closest('[data-go]');
    if (gol) { e.preventDefault(); $('.side') && $('.side').classList.remove('open'); hideScrim(); go(gol.dataset.go); return; }
    const tab = t.closest('[data-tab]');
    if (tab) { const [id, k] = tab.dataset.tab.split(':'); UI[id].tab = k; UI[id].lim = 60; renderList(id); return; }
    const so = t.closest('[data-sort]');
    if (so) { const [id, i] = so.dataset.sort.split(':'); const st = UI[id]; st.sort = st.sort && st.sort.i === +i ? { i: +i, d: -st.sort.d } : { i: +i, d: 1 }; renderList(id); return; }
    const op = t.closest('[data-open]');
    if (op && op.dataset.open && !t.closest('input, select, textarea, a')) { const [ty, id] = op.dataset.open.split(':'); if (OPEN[ty]) { if (!modal || modal.hidden) OPEN[ty](id); else { closeModal(); OPEN[ty](id); } } return; }
    if (t.closest('.side nav a')) { $('.side').classList.remove('open'); hideScrim(); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { if (modal && !modal.hidden) closeModal(); else if (drawer && !drawer.hidden) closeDrawer(); else if ($('.side.open')) { $('.side').classList.remove('open'); hideScrim(); } }
    if (e.key === 'Enter' && e.target.matches('tr[data-open]')) e.target.click();
    if (e.key === '/' && !e.target.matches('input, textarea, select') && $('#gsearch')) { e.preventDefault(); $('#gsearch').focus(); }
  });
  document.addEventListener('input', (e) => {
    const q = e.target.closest('[data-q]');
    if (q) { const id = q.dataset.q; UI[id].q = q.value; UI[id].lim = 60; renderList(id); }
  });
  document.addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset.f) { const [id, k] = t.dataset.f.split(':'); UI[id].f[k] = t.value; renderList(id); return; }
    if (t.dataset.drv) { const c = G.contr(t.dataset.drv); c.driver = t.value; const u = S().staff.find((x) => x.id === t.value); G.log(u ? `ha assegnato ${u.nome} a ${c.num}` : `ha tolto il driver da ${c.num}`); G.save(); G.toast(u ? `Assegnato a ${u.nome}` : 'Driver rimosso'); return; }
    if (t.dataset.note) { const [ty, id] = t.dataset.note.split(':'); const o = { c: G.contr, v: G.veh, k: G.cli, r: (x) => S().richieste.find((y) => y.id === x) }[ty](id); o.note = t.value; G.save(); G.toast('Nota salvata'); return; }
    if (t.dataset.vf) { const [id, k] = t.dataset.vf.split(':'); const v = G.veh(id); v[k] = ['km', 'tagl'].includes(k) ? Math.max(0, +t.value || 0) : t.value; refresh('Salvato'); return; }
    if (t.dataset.lp) { const [id, k] = t.dataset.lp.split(':'); const o = S().listino[id] = S().listino[id] || {}; const n = Math.max(0, +t.value || 0); o[k] = k === 'promo' ? Math.min(60, n) / 100 : n; G.save(); G.toast('Prezzo aggiornato'); return; }
    if (t.dataset.code != null && t.matches('[data-code]')) { const c = S().codici[+t.dataset.code]; c.attivo = t.checked; G.log(`ha ${c.attivo ? 'attivato' : 'disattivato'} il codice ${c.code}`); refresh(`${c.code} ${c.attivo ? 'attivato' : 'disattivato'}`); return; }
    if (t.dataset.lassign) { const r = S().richieste.find((x) => x.id === t.dataset.lassign); r.assegnata = t.value; G.save(); G.toast('Assegnazione salvata'); }
  });
  document.addEventListener('submit', (e) => {
    const f = e.target;
    if (f.dataset.cliform) { e.preventDefault(); const k = G.cli(f.dataset.cliform); const fd = Object.fromEntries(new FormData(f)); Object.keys(fd).forEach((x) => { k[x] = fd[x].trim(); }); G.log(`ha aggiornato l’anagrafica di ${G.cliNome(k)}`); refresh('Anagrafica salvata'); }
    if (f.dataset.intform) { e.preventDefault(); const i = S().interventi.find((x) => x.id === f.dataset.intform); const fd = Object.fromEntries(new FormData(f)); Object.assign(i, fd, { costo: +fd.costo || 0 }); refresh('Intervento aggiornato'); }
  });
  addEventListener('hashchange', () => { closeDrawer(); renderNav(); renderView(); });

  /* ---------- Avvio ---------- */
  function login() {
    document.body.innerHTML = `<div class="login"><div class="login-card">
      <div class="brand" style="padding:0">${LOGO}<div><b>LOCAFIT<span>RENT</span></b><em>Gestionale</em></div></div>
      <h1>Area staff</h1><p>Prenotazioni, flotta, clienti, consegne e pagamenti in un unico posto.</p>
      <form id="lg"><label>Accedi come<select name="u">${S().staff.map((u) => `<option value="${u.id}">${esc(u.nome)} · ${esc(u.ruolo)}${u.sede ? ' · ' + esc(G.sedeNome(u.sede)) : ''}</option>`).join('')}</select></label>
      <button class="btn btn-primary" type="submit">Entra nel gestionale</button>
      <small>Versione dimostrativa: nessuna password, i dati restano in questo browser.</small></form>
    </div></div>`;
    $('#lg').addEventListener('submit', (e) => { e.preventDefault(); const u = S().staff.find((x) => x.id === e.target.u.value); S().utente = u.id; S().sede = u.sede || ''; G.save(); boot(); });
  }
  function boot() {
    scrim = drawer = modal = null; current = null;
    if (!G.user()) return login();
    shell(); renderView();
  }
  G.load(); boot();
})();
