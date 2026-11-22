/* LocaFit Rent — logica condivisa (v3 · luxury tech) */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  LF.$ = $; LF.$$ = $$;
  const page = document.body.dataset.page;

  /* ---------- Icone (linea 1.6) ---------- */
  const sv = (d, w = 1.6) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const I = LF.icons = {
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.5c-1.7 0-3.4-.5-4.9-1.3l-.4-.2-3.6.9 1-3.5-.2-.4C3 15.4 2.5 13.7 2.5 12 2.5 6.8 6.8 2.5 12 2.5S21.5 6.8 21.5 12 17.2 21.5 12 21.5zm0-21C5.7.5.5 5.7.5 12c0 2 .5 4 1.5 5.8L.5 23.5l5.9-1.5c1.7.9 3.6 1.4 5.6 1.4 6.3 0 11.5-5.2 11.5-11.5S18.3.5 12 .5z"/></svg>',
    arrow: sv('<path d="M5 12h14M13 6l6 6-6 6"/>'), arrowL: sv('<path d="M19 12H5M11 6l-6 6 6 6"/>'), arrowUR: sv('<path d="M7 17 17 7M8 7h9v9"/>'),
    phone: sv('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>'),
    mail: sv('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>'),
    pin: sv('<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>'),
    check: sv('<path d="M20 6 9 17l-5-5"/>', 2.2), checkCircle: sv('<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>'),
    close: sv('<path d="M18 6 6 18M6 6l12 12"/>'), menu: sv('<path d="M4 8h16M4 16h16"/>'),
    user: sv('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'), users: sv('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 20a6.5 6.5 0 0 0-2-4.7"/>'),
    photo: sv('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 8"/>'),
    rotate: sv('<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/>'), seat: sv('<path d="M7 4h4l1 9h6a2 2 0 0 1 2 2v3H8a2 2 0 0 1-2-2z"/><path d="M8 18v3M18 18v3"/>'),
    city: sv('<path d="M3 17h18M5 17v-3l2-4h10l2 4v3"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>'),
    car: sv('<path d="M3 16h18v-3l-2.5-5h-13L3 13z"/><circle cx="7" cy="16.5" r="1.8"/><circle cx="17" cy="16.5" r="1.8"/><path d="M6 11h12"/>'),
    suv: sv('<path d="M2.5 16h19v-4l-2-5h-15l-2 5z"/><circle cx="7" cy="16.5" r="2"/><circle cx="17" cy="16.5" r="2"/><path d="M4.5 11h15M10 7v4"/>'),
    star: sv('<path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>'),
    bolt: sv('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'), plug: sv('<path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0zM12 17v5"/>'),
    van: sv('<path d="M2 17V7a1 1 0 0 1 1-1h11v11M14 9h4l4 4v4h-8"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>'),
    shield: sv('<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>'),
    wrench: sv('<path d="M14.7 6.3a4 4 0 0 0 5 5L22 14l-8 8-2.3-2.3a4 4 0 0 0-5-5L4.4 12.4a4 4 0 0 1 5.3-5.3z"/>'),
    tire: sv('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5"/>'),
    doc: sv('<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M8 13h8M8 17h5"/>'),
    swap: sv('<path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>'),
    calendar: sv('<rect x="3" y="4.5" width="18" height="17" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>'),
    clock: sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    upload: sv('<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>'), download: sv('<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>'),
    camera: sv('<path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="4"/>'),
    id: sv('<rect x="2.5" y="5" width="19" height="14" rx="2"/><circle cx="8.5" cy="11.5" r="2.5"/><path d="M5 16.5a4 4 0 0 1 7 0M14.5 10h4.5M14.5 13.5h3"/>'),
    card: sv('<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6.5 15h4"/>'),
    lock: sv('<rect x="4" y="10.5" width="16" height="10.5" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>'),
    pen: sv('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
    home: sv('<path d="m3 11 9-8 9 8M5 9.5V21h14V9.5"/>'), gauge: sv('<path d="M12 14l4-4"/><path d="M3.3 17a10 10 0 1 1 17.4 0"/>'),
    tag: sv('<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>'),
    sparkle: sv('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),
    fuel: sv('<path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12M14 9h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V8l-3-3"/><path d="M7 8h4"/>'),
    gear: sv('<circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M6 8v8M18 8v4H6"/>'),
    speed: sv('<path d="M12 13l3-5"/><circle cx="12" cy="13" r="1"/><path d="M4 18a9 9 0 1 1 16 0"/>'),
    euro: sv('<path d="M17 6.5A7 7 0 1 0 17 17.5M4 10h9M4 14h9"/>'), logout: sv('<path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 16l-4-4 4-4M6 12h11"/>'),
    alert: sv('<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17.5v.01"/>'), chat: sv('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>'),
    building: sv('<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>'),
    leaf: sv('<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19 13 11"/>'), copy: sv('<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>'),
    smartphone: sv('<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M11 18.5h2"/>'), scan: sv('<path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3M7 12h10"/>'),
  };
  const markSVG = () => `<svg class="brand-mark" viewBox="0 0 64 48" fill="none" aria-hidden="true"><path d="M30 6 L52 24 L30 42" stroke="#E5263A" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 6 L37 24 L15 42" stroke="#8EA0FF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8" cy="24" r="5" fill="#2BD178"/></svg>`;
  LF.markSVG = markSVG;

  /* ---------- Utilità ---------- */
  const eur = LF.eur = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const byId = LF.byId = (id) => LF.auto.find((a) => a.id === id);
  const sedeNome = LF.sedeNome = (id) => (LF.sedi.find((s) => s.id === id) || {}).citta || id;
  const catNome = LF.catNome = (id) => (LF.categorie.find((c) => c.id === id) || {}).nome || id;
  const img = LF.img = (a, size = '') => `assets/img/car/${a.img}${size}.webp`;
  const photo = LF.photo = (k) => `assets/img/photo/${k}.webp`;
  const consegnaLabel = LF.consegnaLabel = (h) => (h === 0 ? 'Pronta oggi' : `Pronta in ${h}h`);
  const status = LF.status = (a) => (a.consegna === 0 ? `<span class="badge badge-ok"><span class="dot"></span>Pronta oggi</span>` : `<span class="badge">${I.clock.replace('<svg', '<svg width="12" height="12"')}In ${a.consegna} ore</span>`);
  LF.carShot = (a, size = '') => { const lz = size === '-sm' ? ' loading="lazy"' : ''; return `<div class="car-shot"><img src="${img(a, size)}" alt="${a.marca} ${a.modello}"${lz} decoding="async"></div>`; };
  const store = LF.store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignora */ } },
  };
  LF.durata = new URLSearchParams(location.search).get('tipo') || document.body.dataset.tipo || store.get('lf-durata', 'lungo');
  if (!LF.durate[LF.durata]) LF.durata = 'lungo';

  LF.prezzo = function (a, tipo, o = {}) {
    const base = a.prezzi[tipo];
    let unit, tot;
    if (tipo === 'breve') { const g = o.giorni || 1; const f = g >= 7 ? 0.88 : g >= 3 ? 0.94 : 1; unit = base * f; tot = unit * g; }
    else if (tipo === 'medio') { const m = o.mesi || 3; const f = m <= 2 ? 1.08 : m >= 6 ? 0.9 : 1; unit = base * f; tot = unit * m; }
    else {
      const d = o.durata || 36;
      const fD = { 24: 1.08, 36: 1, 48: 0.95, 60: 0.92 }[d];
      const fK = { 10: 0.94, 15: 1, 20: 1.07, 30: 1.16 }[o.km || 15];
      unit = Math.max(base * 0.5, base * fD * fK - (o.anticipo || 0) / d); tot = unit * d;
    }
    const pct = a.promo && !o.noPromo ? a.promo : 0;
    return { unit: unit * (1 - pct), tot: tot * (1 - pct), pieno: unit, pct };
  };
  LF.waLink = (msg) => `https://wa.me/${LF.contatti.whatsapp}?text=${encodeURIComponent(msg)}`;
  LF.waCar = (a, tipo) => LF.waLink(`Ciao LocaFit Rent! Mi interessa ${a.marca} ${a.modello} (${a.versione}) a noleggio ${LF.durate[tipo].nome.toLowerCase()}. È disponibile?`);

  LF.toast = (msg) => {
    let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.innerHTML = I.checkCircle + msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2600);
  };
  document.addEventListener('click', (e) => {
    const c = e.target.closest('[data-copy]'); if (!c) return;
    try { navigator.clipboard.writeText(c.dataset.copy); } catch (err) { /* ignora */ }
    LF.toast(`Codice ${c.dataset.copy} copiato`);
  });

  /* Countdown promo */
  LF.countdown = (el, end) => {
    const tick = () => {
      let s = Math.max(0, Math.floor((new Date(end) - new Date()) / 1000));
      const d = Math.floor(s / 86400); s -= d * 86400;
      const h = Math.floor(s / 3600); s -= h * 3600; const m = Math.floor(s / 60); s -= m * 60;
      el.innerHTML = [[d, 'giorni'], [h, 'ore'], [m, 'min'], [s, 'sec']].map(([v, l]) => `<div><b>${String(v).padStart(2, '0')}</b><small>${l}</small></div>`).join('');
    };
    tick(); setInterval(tick, 1000);
  };

  /* ---------- Header, promo bar, footer ---------- */
  const navItems = [
    ['flotta.html', 'Flotta', 'flotta'], ['offerte.html', 'Offerte', 'offerte', true], ['breve-termine.html', 'Breve', 'breve'], ['medio-termine.html', 'Medio', 'medio'],
    ['lungo-termine.html', 'Lungo termine', 'lungo'], ['aziende.html', 'Aziende', 'aziende'], ['come-funziona.html', 'Come funziona', 'come'], ['contatti.html', 'Contatti', 'contatti'],
  ];
  const active = document.body.dataset.nav || page;
  const header = $('#site-header');
  if (header && !document.body.dataset.noPromo) {
    const items = [`<span><b>${LF.promo.nome}</b> · ${LF.promo.testo}</span>`, `<span>Codice <span class="mono">${LF.promo.codice}</span> · valido fino al 30 novembre</span>`, `<span>Noleggio <b>100% online</b>: documenti, firma e pagamento dal telefono</span>`, `<span><b>Pronta consegna</b> da Roma, Caserta e Benevento in 24 ore</span>`];
    header.insertAdjacentHTML('beforebegin', `<a class="promo-bar" href="offerte.html" aria-label="Vedi le offerte"><div class="track">${items.concat(items).join('')}</div></a>`);
    document.documentElement.style.setProperty('--promo-h', '0px');
  }
  if (header) {
    header.className = 'site-header';
    header.innerHTML = `<div class="wrap">
      <a href="index.html" class="brand" aria-label="LocaFit Rent, home">${markSVG()}<span class="brand-name">LocaFit<span>Rent</span></span></a>
      <nav class="nav" aria-label="Principale">${navItems.map(([h, t, k, n]) => `<a href="${h}" class="${k === active ? 'active' : ''}">${t}${n ? '<i class="new"></i>' : ''}</a>`).join('')}</nav>
      <div class="header-cta">
        <a class="icon-link hide-m" href="${LF.waLink('Ciao LocaFit Rent! Vorrei informazioni.')}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}</a>
        <a class="icon-link" href="area.html" aria-label="Area personale">${I.user}</a>
        <a class="btn btn-primary btn-sm" href="flotta.html">Noleggia online</a>
      </div>
      <button class="menu-btn" aria-label="Apri menu" aria-expanded="false">${I.menu}</button></div>`;
    const mob = document.createElement('div'); mob.className = 'mobile-nav';
    mob.innerHTML = navItems.map(([h, t, k, n]) => `<a href="${h}">${t}${n ? '<small>Black November</small>' : ''}</a>`).join('') + '<a href="area.html">Area personale</a><a href="faq.html">FAQ</a><a class="btn btn-primary" href="flotta.html">Noleggia online</a>';
    document.body.appendChild(mob);
    const mb = $('.menu-btn', header);
    mb.addEventListener('click', () => { const o = mob.classList.toggle('open'); mb.setAttribute('aria-expanded', o); mb.innerHTML = o ? I.close : I.menu; document.body.style.overflow = o ? 'hidden' : ''; });
    const onScroll = () => header.classList.toggle('scrolled', scrollY > 10);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
  const footer = $('#site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML = `<div class="wrap">
      <div class="footer-top">
        <div class="about">
          <a href="index.html" class="brand">${markSVG()}<span class="brand-name">LocaFit<span>Rent</span></span></a>
          <p>Noleggio auto a breve, medio e lungo termine, 100% online. Pronta consegna da Roma, Caserta e Benevento in tutta Italia.</p>
          <form class="newsletter" onsubmit="event.preventDefault();LF.toast('Iscrizione confermata');this.reset()"><input type="email" required placeholder="La tua email per le offerte" aria-label="Email"><button class="btn btn-primary btn-sm">Iscriviti</button></form>
        </div>
        <div><h4>Noleggio</h4><ul><li><a href="flotta.html">Flotta</a></li><li><a href="offerte.html">Offerte</a></li><li><a href="breve-termine.html">Breve termine</a></li><li><a href="medio-termine.html">Medio termine</a></li><li><a href="lungo-termine.html">Lungo termine</a></li></ul></div>
        <div><h4>Servizi</h4><ul><li><a href="come-funziona.html">Come funziona</a></li><li><a href="aziende.html">Aziende e P.IVA</a></li><li><a href="area.html">Area personale</a></li><li><a href="faq.html">Domande frequenti</a></li></ul></div>
        <div><h4>Sedi</h4><ul>${LF.sedi.map((s) => `<li><a href="contatti.html#${s.id}">${s.citta}</a></li>`).join('')}<li><a href="contatti.html">Consegna in tutta Italia</a></li></ul></div>
        <div><h4>Contatti</h4><ul><li><a href="${LF.contatti.telefonoHref}">${LF.contatti.telefono}</a></li><li><a href="${LF.waLink('Ciao LocaFit Rent!')}" target="_blank" rel="noopener">WhatsApp</a></li><li><a href="mailto:${LF.contatti.email}">${LF.contatti.email}</a></li><li><a href="chi-siamo.html">Chi siamo</a></li></ul></div>
      </div>
      <div class="footer-word" aria-hidden="true">LocaFit Rent</div>
      <div class="footer-bottom">
        <span>© 2026 LocaFit Rent S.r.l. · Sede legale Roma · ${LF.contatti.piva}</span>
        <div class="payments"><span>VISA</span><span>MASTERCARD</span><span>AMEX</span><span>APPLE PAY</span><span>SEPA</span><span>SPID</span></div>
        <span>Privacy · Cookie · Foto: Wikimedia Commons (CC) · Modelli 3D: Sketchfab</span>
      </div></div>`;
  }
  if (!document.body.dataset.noFloat) document.body.insertAdjacentHTML('beforeend', `<a class="wa-float" href="${LF.waLink('Ciao LocaFit Rent! Vorrei informazioni.')}" target="_blank" rel="noopener" aria-label="Scrivici su WhatsApp">${I.wa}</a><span class="demo-flag">Demo · dati di esempio</span>`);

  /* ---------- Card auto ---------- */
  LF.card = function (a, tipo) {
    const p = LF.prezzo(a, tipo);
    const href = `auto.html?id=${a.id}&tipo=${tipo}`;
    return `<article class="car-card">
      <div class="cc-top"><div>${status(a)}</div><div class="r">${a.promo ? `<span class="badge badge-red">−${Math.round(a.promo * 100)}%</span>` : ''}${LF.modelli3d[a.id] ? '<span class="badge">3D</span>' : ''}</div></div>
      <div class="cc-stage">${LF.carShot(a, '-sm')}</div>
      <div class="cc-body">
        <div class="cc-name"><small>${a.marca} · ${catNome(a.categoria)}</small><h3><a class="card-link" href="${href}">${a.modello}</a></h3><p>${a.versione}</p></div>
        <div class="cc-specs"><span>${I.fuel}${a.alim}</span><span>${I.gear}${a.cambio === 'Automatico' ? 'Auto' : 'Manuale'}</span><span>${I.speed}${a.cv} CV</span></div>
        <div class="cc-foot">
          <div class="price"><small>${tipo === 'lungo' ? 'Canone · anticipo zero' : tipo === 'medio' ? 'Canone mensile' : 'Tariffa giornaliera'}</small><div class="row">${p.pct ? `<s>€${eur(p.pieno)}</s>` : ''}<b>€${eur(p.unit)}</b><em>${LF.durate[tipo].unita}</em></div></div>
          <div class="cc-actions"><a class="icon-btn wa" href="${LF.waCar(a, tipo)}" target="_blank" rel="noopener" aria-label="WhatsApp per ${a.modello}">${I.wa}</a><a class="icon-btn" href="${href}" aria-label="Vedi ${a.modello}">${I.arrow}</a></div>
        </div>
      </div></article>`;
  };
  const tiles = [
    { k: 'costiera', kicker: '100% online', t: 'Firmi dal telefono, guidi in giornata.', d: 'Documenti, verifica, firma e pagamento: tutto in meno di 10 minuti.', href: 'come-funziona.html', l: 'Come funziona' },
    { k: 'notte', kicker: LF.promo.nome, t: 'Fino al −20% sul canone.', d: `Codice ${LF.promo.codice} · solo fino al 30 novembre.`, href: 'offerte.html', l: 'Vedi le offerte', red: true },
    { k: 'interni', kicker: 'Esperienza 3D', t: 'Siediti al posto di guida prima di noleggiarla.', d: 'Tour 3D a 360° sui modelli con il badge 3D.', href: 'auto.html?id=porsche-911', l: 'Prova sulla 911' },
  ];
  LF.renderGrid = function (el, list, tipo, opt = {}) {
    if (!list.length) { el.innerHTML = '<div class="empty"><b>Nessuna auto con questi filtri.</b><br>Prova a cambiare sede o categoria, oppure scrivici: la troviamo noi.</div>'; return; }
    const html = list.map((a) => LF.card(a, tipo));
    if (opt.tiles) {
      const pos = [3, 10, 17]; let t = 0;
      pos.forEach((p) => { if (html.length > p && tiles[t]) { const x = tiles[t++]; html.splice(p, 0, `<a class="tile-photo ${x.red ? 'red' : ''}" href="${x.href}"><img src="${photo(x.k)}" alt="" loading="lazy"><span class="kicker" style="color:#fff">${x.kicker}</span><h3>${x.t}</h3><p>${x.d}</p><span class="link">${x.l} ${I.arrow}</span></a>`); } });
    }
    el.innerHTML = html.join('');
  };
  LF.segDurata = function (el, current, onChange) {
    el.innerHTML = Object.entries(LF.durate).map(([k, v]) => `<button type="button" data-v="${k}" class="${k === current ? 'on' : ''}" aria-pressed="${k === current}">${v.breve}</button>`).join('');
    el.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; $$('button', el).forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); }); onChange(b.dataset.v); });
  };

  /* ---------- Viewer foto / 360° / interni ---------- */
  let sfScript;
  const loadSketchfab = () => sfScript || (sfScript = new Promise((res, rej) => { const s = document.createElement('script'); s.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js'; s.onload = res; s.onerror = rej; document.head.appendChild(s); }));
  LF.viewer = function (host, a) {
    const m = LF.modelli3d[a.id];
    host.innerHTML = `<div class="viewer">
      <div class="viewer-tabs" role="tablist" aria-label="Vista"><button type="button" data-v="foto" class="on">${I.photo}Foto</button><button type="button" data-v="ext" ${m ? '' : 'disabled'}>${I.rotate}360°</button><button type="button" data-v="int" ${m && m.int ? '' : 'disabled'}>${I.seat}Interni 3D</button></div>
      <div class="viewer-photo">${LF.carShot(a)}</div>
      <div class="viewer-loading"><span class="spinner"></span><span>Carico il modello 3D</span></div>
      <span class="viewer-hint">Trascina per ruotare · rotella per lo zoom</span>
      <span class="viewer-note">${m ? (m.int ? '360° esterni e interni 3D disponibili' : '360° esterni disponibile') : 'Tour 3D su richiesta in sede'}</span>
    </div><p class="credit"></p>`;
    const v = $('.viewer', host), credit = $('.credit', host);
    let api, cam0, ready = false, want = 'foto';
    const apply = () => {
      if (!ready) return; v.classList.remove('loading');
      if (want === 'int') {
        const { p, t } = m.int; const d = [t[0] - p[0], t[1] - p[1], t[2] - p[2]]; const len = Math.hypot(...d); const k = (m.int.k || len * 0.02) / len;
        api.setCameraLookAt(p, [p[0] + d[0] * k, p[1] + d[1] * k, p[2] + d[2] * k], 1.4); $('.viewer-hint', v).textContent = 'Trascina per guardarti intorno';
      } else { api.setCameraLookAt(cam0.position, cam0.target, 1.4); $('.viewer-hint', v).textContent = 'Trascina per ruotare · rotella per lo zoom'; }
    };
    async function start3d() {
      if (api) return apply();
      v.classList.add('loading', 'show-3d');
      credit.innerHTML = `Modello 3D: <a href="https://sketchfab.com/3d-models/${m.uid}" target="_blank" rel="noopener">${m.nome}</a> di ${m.autore} · ${m.licenza} · Sketchfab`;
      const ifr = document.createElement('iframe'); ifr.title = `${a.marca} ${a.modello} in 3D`; ifr.setAttribute('allow', 'autoplay; fullscreen; xr-spatial-tracking'); v.appendChild(ifr);
      try { await loadSketchfab(); } catch (e) { v.classList.remove('loading', 'show-3d'); credit.textContent = 'Modello 3D non raggiungibile: serve la connessione.'; return; }
      new window.Sketchfab(ifr).init(m.uid, {
        autostart: 1, preload: 1, ui_infos: 0, ui_controls: 0, ui_stop: 0, ui_watermark: 0, ui_hint: 0, ui_settings: 0, ui_help: 0, ui_inspector: 0, ui_annotations: 0, ui_vr: 0, ui_ar: 0, ui_fullscreen: 0, ui_loading: 0, ui_theme: 'dark',
        success(x) { api = x; api.addEventListener('viewerready', () => setTimeout(() => api.getCameraLookAt((err, c) => { cam0 = c; ready = true; apply(); }), 1800)); },
        error() { v.classList.remove('loading'); credit.textContent = 'Impossibile caricare il modello 3D.'; },
      });
    }
    $('.viewer-tabs', v).addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || b.disabled) return;
      $$('.viewer-tabs button', v).forEach((x) => x.classList.toggle('on', x === b)); want = b.dataset.v;
      if (want === 'foto') { v.classList.remove('show-3d', 'loading'); return; }
      v.classList.add('show-3d'); start3d();
    });
    return { open: (mode) => $(`.viewer-tabs [data-v="${mode}"]`, v).click() };
  };

  /* ---------- Modal preventivo ---------- */
  document.body.insertAdjacentHTML('beforeend', `<div class="modal" id="lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-title"><div class="modal-bg" data-close></div><div class="modal-box"><button class="modal-close" data-close aria-label="Chiudi">${I.close}</button><div class="lead-content"></div></div></div>`);
  const modal = $('#lead-modal'); let lastFocus;
  LF.openLead = function (opts = {}) {
    const a = opts.id ? byId(opts.id) : null; const tipo = opts.tipo || LF.durata;
    $('.lead-content', modal).innerHTML = `<span class="kicker">${opts.kicker || LF.durate[tipo].nome}</span><h2 id="lead-title">${opts.title || 'Parla con un consulente'}</h2>
      <p class="muted" style="margin-top:8px">Ti richiamiamo entro 30 minuti in orario d’ufficio. Oppure noleggia subito online.</p>
      <form class="form" data-lead style="margin-top:22px">
        <div class="row2"><label>Nome e cognome<input required name="nome" autocomplete="name"></label><label>Telefono<input required name="tel" type="tel" autocomplete="tel"></label></div>
        <label>Email<input required name="email" type="email" autocomplete="email"></label>
        <label>Messaggio<textarea name="msg" placeholder="${a ? `Mi interessa ${a.marca} ${a.modello}…` : 'Quante auto, per quanto tempo, che tipo…'}"></textarea></label>
        <label class="check"><input type="checkbox" required> Acconsento a essere ricontattato secondo l’informativa privacy.</label>
        <button class="btn btn-primary btn-block" type="submit">Invia richiesta</button>
        ${a ? `<a class="btn btn-line btn-block" href="prenota.html?id=${a.id}&tipo=${tipo}">Noleggia online in 10 minuti ${I.arrow}</a>` : ''}
      </form>`;
    lastFocus = document.activeElement; modal.classList.add('open'); document.body.style.overflow = 'hidden'; setTimeout(() => $('input', modal).focus(), 50);
  };
  const closeLead = () => { modal.classList.remove('open'); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); };
  modal.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeLead(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeLead(); });
  document.addEventListener('submit', (e) => {
    const f = e.target.closest('form[data-lead]'); if (!f) return; e.preventDefault();
    const nome = (new FormData(f).get('nome') || '').toString().split(' ')[0];
    f.outerHTML = `<div class="done-hero" style="padding:28px 0"><span class="ok">${I.check}</span><h2 style="font-size:30px">Grazie${nome ? ', ' + nome : ''}.</h2><p class="muted" style="margin-top:10px">Richiesta ricevuta: un consulente ti contatta a breve.<br><small class="dim">Demo · nessun dato è stato inviato.</small></p></div>`;
  });
  document.addEventListener('click', (e) => { const b = e.target.closest('[data-lead-open]'); if (!b) return; e.preventDefault(); LF.openLead({ id: b.dataset.id, tipo: b.dataset.tipo, title: b.dataset.title, kicker: b.dataset.kicker }); });

  /* ---------- Blocchi ripetuti ---------- */
  $$('[data-inclusi]').forEach((el) => { el.innerHTML = LF.inclusi.map((x) => `<div class="incluso"><span class="ico">${I[x.i]}</span><div><b>${x.t}</b><small>${x.d}</small></div></div>`).join(''); });
  $$('[data-faq]').forEach((el) => { const c = el.dataset.faq; const l = c && isNaN(c) ? LF.faq.filter((f) => f.c === c) : LF.faq.slice(0, +c || LF.faq.length); el.innerHTML = l.map((f, i) => `<details ${i === 0 && !el.dataset.closed ? 'open' : ''}><summary>${f.q}</summary><p>${f.a}</p></details>`).join(''); });
  $$('[data-sedi]').forEach((el) => {
    el.innerHTML = LF.sedi.map((s) => `<div class="sede" id="${s.id}"><img src="${photo(s.foto)}" alt="${s.citta}" loading="lazy"><span class="kicker" style="color:rgba(255,255,255,.75)">${s.tipo}</span><h3>${s.citta}</h3><p>${s.indirizzo} · ${s.orari}</p><p class="mono" style="margin-top:12px;color:rgba(255,255,255,.6)">${s.auto}+ auto in sede</p>
      <div class="links"><a class="btn btn-sm btn-primary" href="flotta.html?sede=${s.id}">Auto a ${s.citta}</a><a class="btn btn-sm btn-line" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mappa)}" target="_blank" rel="noopener">${I.pin}Mappa</a></div></div>`).join('');
  });
  $$('[data-reviews]').forEach((el) => { el.innerHTML = LF.recensioni.map((r) => `<div class="review"><span class="stars">★★★★★</span><blockquote>“${r.q}”</blockquote><div class="who"><span class="av">${r.n.split(' ').map((x) => x[0]).join('')}</span><div><b style="font-weight:500">${r.n}</b><br><span class="muted" style="font-size:13px">${r.t}</span></div></div></div>`).join(''); });
  $$('[data-wa]').forEach((el) => { el.href = LF.waLink(el.dataset.wa || 'Ciao LocaFit Rent!'); el.target = '_blank'; el.rel = 'noopener'; });
  $$('[data-icon]').forEach((el) => { el.insertAdjacentHTML(el.dataset.iconPos === 'end' ? 'beforeend' : 'afterbegin', I[el.dataset.icon] || ''); });
  $$('[data-from]').forEach((el) => { const t = el.dataset.from; el.textContent = '€' + eur(Math.min(...LF.auto.map((a) => LF.prezzo(a, t).unit))); });
  $$('[data-car]').forEach((el) => { const a = byId(el.dataset.car); if (a) el.innerHTML = LF.carShot(a, el.dataset.size || ''); });
  $$('[data-photo]').forEach((el) => { el.src = photo(el.dataset.photo); });
  $$('[data-countdown]').forEach((el) => LF.countdown(el, LF.promo.fine));
  $$('[data-count]').forEach((el) => { const k = el.dataset.count; el.textContent = k === 'all' ? LF.auto.length : LF.auto.filter((a) => a.categoria === k).length; });
  $$('[data-grid]').forEach((el) => {
    const [kind, val] = el.dataset.grid.split(':'); const tipo = el.dataset.tipo || LF.durata; const n = +el.dataset.n || 8;
    let l = LF.auto.slice();
    if (kind === 'promo') l = l.filter((a) => a.promo).sort((x, y) => y.promo - x.promo);
    if (kind === 'cat') l = l.filter((a) => a.categoria === val);
    if (kind === 'top') l = l.filter((a) => a.top);
    if (kind === 'cheap') l = l.sort((x, y) => x.prezzi[tipo] - y.prezzi[tipo]);
    LF.renderGrid(el, l.slice(0, n), tipo);
  });

  /* ---------- Pagine ---------- */
  const init = {
    home() {
      const list = ['porsche-911', 'mercedes-glc', 'bmw-x1', 'tesla-model-y', 'audi-a3', 'mercedes-a', 'cupra-formentor', 'fiat-panda'].map(byId).filter(Boolean);
      let i = 0, tipo = LF.durata, timer;
      const car = $('#hero-car'), name = $('#hero-name');
      $('#hero-thumbs').innerHTML = list.map((a, k) => `<button class="hero-thumb" data-k="${k}" type="button" aria-label="${a.marca} ${a.modello}"><img src="${img(a, '-sm')}" alt=""><span>${a.modello}</span></button>`).join('');
      const info = () => {
        const a = list[i]; const p = LF.prezzo(a, tipo);
        $('#hero-info').innerHTML = `<div class="name"><small>${a.marca} · ${a.versione}</small><b>${a.modello}</b></div><div>${status(a)} ${a.promo ? `<span class="badge badge-red">${LF.promo.nome} −${Math.round(a.promo * 100)}%</span>` : ''}</div>
          <div class="hero-price">${p.pct ? `<s>€${eur(p.pieno)}</s>` : ''}<b>€${eur(p.unit)}</b><em>${LF.durate[tipo].unita}</em></div>
          <div style="display:flex;gap:8px"><a class="btn btn-line btn-sm" href="auto.html?id=${a.id}&tipo=${tipo}">Scheda</a><a class="btn btn-primary btn-sm" href="prenota.html?id=${a.id}&tipo=${tipo}">Noleggia online</a></div>`;
        $('#hero-readouts').innerHTML = `<div class="readout"><small>Potenza</small><b>${a.cv} CV</b></div><div class="readout"><small>0–100 km/h</small><b>${String(a.acc).replace('.', ',')} s</b></div><div class="readout"><small>Alimentazione</small><b>${a.alim}</b></div>`;
        $$('.hero-thumb').forEach((t, k) => t.classList.toggle('on', k === i));
      };
      const show = (n, user) => {
        if (user) clearInterval(timer);
        i = (n + list.length) % list.length; const a = list[i];
        car.classList.add('out'); name.style.opacity = 0;
        setTimeout(() => { car.innerHTML = LF.carShot(a).replace(/ loading="lazy"/g, ''); name.textContent = a.marca.split('-')[0]; car.classList.remove('out'); car.classList.add('pre'); requestAnimationFrame(() => requestAnimationFrame(() => car.classList.remove('pre'))); name.style.opacity = 1; info(); }, 300);
      };
      $('#hero-thumbs').addEventListener('click', (e) => { const b = e.target.closest('.hero-thumb'); if (b) show(+b.dataset.k, true); });
      
      car.innerHTML = LF.carShot(list[0]).replace(/ loading="lazy"/g, ''); name.textContent = list[0].marca; info();
      // Finder
      let fTipo = tipo;
      LF.segDurata($('#finder-seg'), tipo, (t) => { fTipo = t; tipo = t; store.set('lf-durata', t); info(); drawGrid(); });
      $('#finder-sede').innerHTML = '<option value="">Tutte le sedi</option>' + LF.sedi.map((s) => `<option value="${s.id}">${s.citta}</option>`).join('') + '<option value="">Consegna a domicilio</option>';
      $('#finder-cat').innerHTML = '<option value="">Tutte le auto</option>' + LF.categorie.map((c) => `<option value="${c.id}">${c.nome}</option>`).join('');
      $('#finder-data').value = new Date().toISOString().slice(0, 10); $('#finder-data').min = $('#finder-data').value;
      $('#finder').addEventListener('submit', (e) => { e.preventDefault(); const q = new URLSearchParams({ tipo: fTipo }); if ($('#finder-sede').value) q.set('sede', $('#finder-sede').value); if ($('#finder-cat').value) q.set('cat', $('#finder-cat').value); location.href = 'flotta.html?' + q; });
      // Griglia
      let cat = 'top';
      const chips = $('#home-chips');
      chips.innerHTML = [['top', 'Le più richieste', 'star'], ['promo', 'In offerta', 'tag'], ...LF.categorie.map((c) => [c.id, c.nome, c.icon])].map(([v, t, ic]) => `<button class="chip ${v === cat ? 'on' : ''}" data-v="${v}">${I[ic] || ''}${t}</button>`).join('');
      chips.addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (!b) return; cat = b.dataset.v; $$('.chip', chips).forEach((c) => c.classList.toggle('on', c === b)); drawGrid(); });
      function drawGrid() {
        let l = cat === 'top' ? LF.auto.filter((a) => a.top) : cat === 'promo' ? LF.auto.filter((a) => a.promo) : LF.auto.filter((a) => a.categoria === cat);
        l = l.sort((x, y) => x.prezzi.lungo - y.prezzi.lungo).slice(0, 8);
        LF.renderGrid($('#home-grid'), l, tipo);
        $('#home-all').href = `flotta.html?tipo=${tipo}${cat !== 'top' && cat !== 'promo' ? '&cat=' + cat : ''}`;
      }
      drawGrid();
      const v3 = LF.viewer($('#home-3d'), byId('porsche-911'));
      $('#home-3d-int').addEventListener('click', () => v3.open('int'));
      $('#home-3d-ext').addEventListener('click', () => v3.open('ext'));
    },

    flotta() {
      const q = new URLSearchParams(location.search);
      const st = { tipo: LF.durata, cat: q.get('cat') || '', sede: q.get('sede') || '', pronta: q.get('pronta') === '1', promo: q.get('promo') === '1', d3: false, ord: 'prezzo', alim: '', cambio: '', max: 0 };
      LF.segDurata($('#fleet-seg'), st.tipo, (t) => { st.tipo = t; store.set('lf-durata', t); setRange(); draw(); });
      const chips = $('#fleet-chips');
      chips.innerHTML = [['', 'Tutte', 'car', LF.auto.length], ...LF.categorie.map((c) => [c.id, c.nome, c.icon, LF.auto.filter((a) => a.categoria === c.id).length])].map(([v, t, ic, n]) => `<button class="chip ${v === st.cat ? 'on' : ''}" data-v="${v}">${I[ic]}${t}<span class="n">${n}</span></button>`).join('');
      chips.addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (!b) return; st.cat = b.dataset.v; $$('.chip', chips).forEach((c) => c.classList.toggle('on', c === b)); draw(); });
      const opts = (el, key, values) => {
        el.innerHTML = values.map(([v, t]) => `<div class="opt ${st[key] === v ? 'on' : ''}" data-v="${v}" role="button" tabindex="0">${t}<span class="n">${v ? LF.auto.filter((a) => (key === 'sede' ? a.sedi.includes(v) : a[key] === v)).length : LF.auto.length}</span></div>`).join('');
        el.addEventListener('click', (e) => { const o = e.target.closest('.opt'); if (!o) return; st[key] = o.dataset.v; $$('.opt', el).forEach((x) => x.classList.toggle('on', x === o)); draw(); });
      };
      opts($('#f-sede'), 'sede', [['', 'Tutte le sedi'], ...LF.sedi.map((s) => [s.id, s.citta])]);
      opts($('#f-alim'), 'alim', [['', 'Tutte'], ...[...new Set(LF.auto.map((a) => a.alim))].map((x) => [x, x])]);
      opts($('#f-cambio'), 'cambio', [['', 'Tutti'], ['Automatico', 'Automatico'], ['Manuale', 'Manuale']]);
      const range = $('#f-max');
      const setRange = () => { const vals = LF.auto.map((a) => LF.prezzo(a, st.tipo).unit); range.min = Math.floor(Math.min(...vals)); range.max = Math.ceil(Math.max(...vals)); range.step = st.tipo === 'breve' ? 5 : 25; range.value = range.max; st.max = 0; $('#f-max-o').textContent = 'Nessun limite'; };
      range.addEventListener('input', () => { st.max = +range.value; $('#f-max-o').textContent = `fino a €${eur(st.max)}${LF.durate[st.tipo].unita}`; draw(); });
      setRange();
      $('#fleet-ord').addEventListener('change', (e) => { st.ord = e.target.value; draw(); });
      [['#fleet-pronta', 'pronta'], ['#fleet-promo', 'promo'], ['#fleet-3d', 'd3']].forEach(([s, k]) => { const el = $(s); el.checked = st[k]; el.addEventListener('change', () => { st[k] = el.checked; draw(); }); });
      function draw() {
        const l = LF.auto.filter((a) => (!st.cat || a.categoria === st.cat) && (!st.sede || a.sedi.includes(st.sede)) && (!st.pronta || a.consegna === 0) && (!st.promo || a.promo) && (!st.d3 || LF.modelli3d[a.id]) && (!st.alim || a.alim === st.alim) && (!st.cambio || a.cambio === st.cambio) && (!st.max || LF.prezzo(a, st.tipo).unit <= st.max));
        const P = (a) => LF.prezzo(a, st.tipo).unit;
        l.sort(st.ord === 'prezzo-desc' ? (x, y) => P(y) - P(x) : st.ord === 'consegna' ? (x, y) => x.consegna - y.consegna || P(x) - P(y) : st.ord === 'potenza' ? (x, y) => y.cv - x.cv : (x, y) => P(x) - P(y));
        $('#fleet-count').textContent = `${l.length} ${l.length === 1 ? 'veicolo' : 'veicoli'}`;
        $('#fleet-note').textContent = st.tipo === 'lungo' ? 'Canoni IVA inclusa · 36 mesi · 15.000 km/anno · anticipo zero' : st.tipo === 'medio' ? 'Canoni IVA inclusa · 2.500 km/mese · tutto incluso' : 'Tariffe IVA inclusa · 250 km/giorno · tutto incluso';
        LF.renderGrid($('#fleet-grid'), l, st.tipo, { tiles: !st.cat && !st.sede && !st.pronta && !st.promo && !st.d3 && !st.alim && !st.cambio && !st.max });
        const u = new URLSearchParams({ tipo: st.tipo }); if (st.cat) u.set('cat', st.cat); if (st.sede) u.set('sede', st.sede); if (st.pronta) u.set('pronta', '1'); if (st.promo) u.set('promo', '1');
        history.replaceState(null, '', '?' + u);
      }
      draw();
    },

    auto() {
      const a = byId(new URLSearchParams(location.search).get('id')) || byId('mercedes-c');
      document.title = `${a.marca} ${a.modello} a noleggio · LocaFit Rent`;
      $('#crumb-name').textContent = `${a.marca} ${a.modello}`;
      $('#d-marca').innerHTML = `${a.marca} · ${catNome(a.categoria)}`;
      $('#d-modello').textContent = a.modello; $('#d-versione').textContent = a.versione;
      $('#d-badges').innerHTML = `${status(a)}${a.promo ? `<span class="badge badge-red">${LF.promo.nome} −${Math.round(a.promo * 100)}%</span>` : ''}${LF.modelli3d[a.id] ? '<span class="badge">Tour 3D</span>' : ''}`;
      $('.disp').innerHTML = a.consegna === 0 ? `<span class="badge badge-ok"><span class="dot"></span>Pronta oggi</span> in sede a ${a.sedi.map(sedeNome).join(', ')}` : `<span class="badge">${consegnaLabel(a.consegna)}</span> consegna anche a domicilio`;
      $('#d-specs').innerHTML = [['Potenza', a.cv + ' CV'], ['0–100 km/h', String(a.acc).replace('.', ',') + ' s'], ['Alimentazione', a.alim], ['Cambio', a.cambio], ['Posti', a.posti], ['Disponibile a', a.sedi.map(sedeNome).join(', ')], ['Consegna', consegnaLabel(a.consegna)], ['Km inclusi', '15.000/anno']].map(([k, v]) => `<div><small>${k}</small><b>${v}</b></div>`).join('');
      LF.viewer($('#d-viewer'), a);
      const st = { tipo: LF.durata, giorni: 3, mesi: 3, durata: 36, km: 15, anticipo: 0 };
      const box = $('#cfg-opts');
      LF.segDurata($('#cfg-seg'), st.tipo, (t) => { st.tipo = t; store.set('lf-durata', t); opts(); calc(); });
      const pills = (key, vals, fmt) => `<div class="pills" data-k="${key}">${vals.map((v) => `<button type="button" class="pill ${st[key] === v ? 'on' : ''}" data-v="${v}">${fmt(v)}</button>`).join('')}</div>`;
      function opts() {
        if (st.tipo === 'breve') {
          box.innerHTML = `<div><div class="opt-label">Giorni <output id="o-g">${st.giorni}</output></div><input type="range" min="1" max="30" value="${st.giorni}" id="r-g" aria-label="Giorni"></div>`;
          $('#r-g').addEventListener('input', (e) => { st.giorni = +e.target.value; $('#o-g').textContent = st.giorni; calc(); });
        } else if (st.tipo === 'medio') {
          box.innerHTML = `<div><div class="opt-label">Mesi <output id="o-m">${st.mesi}</output></div><input type="range" min="1" max="12" value="${st.mesi}" id="r-m" aria-label="Mesi"></div>`;
          $('#r-m').addEventListener('input', (e) => { st.mesi = +e.target.value; $('#o-m').textContent = st.mesi; calc(); });
        } else {
          box.innerHTML = `<div><div class="opt-label">Durata</div>${pills('durata', [24, 36, 48, 60], (v) => v + ' mesi')}</div><div><div class="opt-label">Km all’anno</div>${pills('km', [10, 15, 20, 30], (v) => v + 'k')}</div><div><div class="opt-label">Anticipo</div>${pills('anticipo', [0, 2000, 5000], (v) => (v ? '€' + eur(v) : 'Zero'))}</div>`;
          $$('.pills', box).forEach((p) => p.addEventListener('click', (e) => { const b = e.target.closest('.pill'); if (!b) return; st[p.dataset.k] = +b.dataset.v; $$('.pill', p).forEach((x) => x.classList.toggle('on', x === b)); calc(); }));
        }
      }
      function calc() {
        const p = LF.prezzo(a, st.tipo, st); const d = LF.durate[st.tipo];
        $('#t-now').innerHTML = `${p.pct ? `<s>€${eur(p.pieno)}</s>` : ''}<b>€${eur(p.unit)}</b>`;
        $('#t-unit').textContent = d.unita + ' · IVA inclusa';
        $('#t-side').innerHTML = st.tipo === 'lungo' ? `<small>IVA esclusa</small><b>€${eur(p.unit / 1.22)}${d.unita}</b>` : `<small>Totale ${st.tipo === 'breve' ? st.giorni + (st.giorni === 1 ? ' giorno' : ' giorni') : st.mesi + (st.mesi === 1 ? ' mese' : ' mesi')}</small><b>€${eur(p.tot)}</b>`;
        $('#cfg-promo').style.display = p.pct ? '' : 'none';
        if (p.pct) $('#cfg-promo').innerHTML = `<span>${I.tag.replace('<svg', '<svg width="16" height="16"')} ${LF.promo.nome}: risparmi <b>€${eur(p.pieno - p.unit)}</b>${d.unita}</span><span class="mono">${LF.promo.codice}</span>`;
        const q = new URLSearchParams({ id: a.id, tipo: st.tipo, giorni: st.giorni, mesi: st.mesi, durata: st.durata, km: st.km, anticipo: st.anticipo });
        $('#cfg-go').href = 'prenota.html?' + q;
        $('#cfg-wa').href = LF.waLink(`Ciao LocaFit Rent! Mi interessa ${a.marca} ${a.modello} a noleggio ${d.nome.toLowerCase()} a €${eur(p.unit)}${d.unita}. È disponibile?`);
      }
      $('#cfg-lead').addEventListener('click', () => LF.openLead({ id: a.id, tipo: st.tipo, title: `${a.marca} ${a.modello}`, kicker: 'Parla con un consulente' }));
      opts(); calc();
      const sim = LF.auto.filter((x) => x.id !== a.id && x.categoria === a.categoria).slice(0, 4);
      LF.renderGrid($('#simili'), sim.length >= 4 ? sim : LF.auto.filter((x) => x.id !== a.id && x.top).slice(0, 4), st.tipo);
    },

    offerte() {
      const l = LF.auto.filter((a) => a.promo).sort((x, y) => y.promo - x.promo);
      const hero = l[0] && byId('mercedes-a');
      $('#promo-car').innerHTML = LF.carShot(hero);
      $('#offers').innerHTML = l.map((a) => { const p = LF.prezzo(a, 'lungo'); return `<a class="offer" href="auto.html?id=${a.id}&tipo=lungo">
        <div class="offer-media"><div class="off">${status(a)}<span class="badge badge-red">${LF.promo.nome}</span></div><span class="pct">−${Math.round(a.promo * 100)}%</span>${LF.carShot(a, '-sm')}</div>
        <div class="offer-body"><div><span class="mono dim">${a.marca} · ${catNome(a.categoria)}</span><h3 style="margin-top:6px">${a.modello} <span class="muted" style="font-size:15px;font-weight:400">${a.versione}</span></h3></div>
        <ul><li>${I.check}Anticipo zero e consegna gratuita</li><li>${I.check}Sconto bloccato per tutta la durata</li><li>${I.check}36 mesi · 15.000 km/anno · tutto incluso</li></ul>
        <div class="offer-foot"><div class="price"><small>Canone mensile</small><div class="row"><s>€${eur(p.pieno)}</s><b>€${eur(p.unit)}</b><em>/mese</em></div></div><span class="icon-btn">${I.arrow}</span></div></div></a>`; }).join('');
      $('#codes').innerHTML = LF.codici.map((c) => `<div class="b-cell span-3 half" style="min-height:240px"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><span class="badge">${LF.durate[c.tipo].nome}</span><span class="mono dim">Scade: ${c.scade}</span></div><h3 style="margin-top:auto">${c.titolo}</h3><p>${c.desc}</p><div style="display:flex;gap:10px;margin-top:18px;align-items:center;flex-wrap:wrap"><button class="code" data-copy="${c.code}">${c.code} ${I.copy.replace('<svg', '<svg width="13" height="13" style="vertical-align:-2px;margin-left:6px"')}</button><a class="link" href="flotta.html?tipo=${c.tipo}">Usa ora ${I.arrow}</a></div></div>`).join('');
    },

    noleggio() {
      const t = document.body.dataset.tipo; LF.durata = t;
      const l = [...LF.auto].filter((a) => a.categoria !== 'furgone' || t !== 'lungo').sort((x, y) => x.prezzi[t] - y.prezzi[t]);
      const pick = []; LF.categorie.forEach((c) => { const f = l.find((a) => a.categoria === c.id); if (f) pick.push(f); });
      l.forEach((a) => { if (pick.length < 8 && !pick.includes(a)) pick.push(a); });
      LF.renderGrid($('#tipo-grid'), pick.slice(0, 8), t);
      const calc = $('#mini-calc');
      if (calc) {
        const sel = $('#mc-car'); sel.innerHTML = LF.auto.map((a) => `<option value="${a.id}">${a.marca} ${a.modello}</option>`).join(''); sel.value = $('#mini-calc').dataset.default || LF.auto[0].id;
        const rng = $('#mc-r'); const out = $('#mc-o');
        const draw = () => { const a = byId(sel.value); const n = +rng.value; const p = LF.prezzo(a, t, t === 'breve' ? { giorni: n } : { mesi: n, durata: n }); $('#mc-n').textContent = n + (t === 'breve' ? (n === 1 ? ' giorno' : ' giorni') : ' mesi'); out.innerHTML = `${p.pct ? `<s class="dim" style="font-size:18px">€${eur(p.pieno)}</s> ` : ''}€${eur(p.unit)}<small class="muted" style="font-size:16px;letter-spacing:0">${LF.durate[t].unita}</small>`; $('#mc-tot').textContent = t === 'breve' ? `Totale €${eur(p.tot)}` : t === 'medio' ? `Totale periodo €${eur(p.tot)}` : 'Anticipo zero · tutto incluso'; $('#mc-car-img').innerHTML = LF.carShot(a, '-sm'); $('#mc-go').href = `prenota.html?id=${a.id}&tipo=${t}&giorni=${n}&mesi=${n}&durata=${n}`; };
        sel.addEventListener('change', draw); rng.addEventListener('input', draw); draw();
      }
    },

    faq() {
      const cats = [...new Set(LF.faq.map((f) => f.c))];
      $('#faq-cats').innerHTML = cats.map((c) => `<a href="#faq-${c}">${c}</a>`).join('') + '<a href="contatti.html">Non trovi la risposta?</a>';
      $('#faq-all').innerHTML = cats.map((c) => `<div id="faq-${c}" style="scroll-margin-top:100px;margin-bottom:56px"><span class="kicker">${c}</span><div class="faq" data-closed="1" style="margin-top:16px">${LF.faq.filter((f) => f.c === c).map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></div>`).join('');
    },
  };
  (init[page] || (() => {}))();
})();
