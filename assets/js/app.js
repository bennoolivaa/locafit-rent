/* LOCAFIT Rent — logica condivisa (v4) */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  LF.$ = $; LF.$$ = $$;
  const page = document.body.dataset.page;

  /* ---------- Icone ---------- */
  const sv = (d, w = 1.7) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const I = LF.icons = {
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.5c-1.7 0-3.4-.5-4.9-1.3l-.4-.2-3.6.9 1-3.5-.2-.4C3 15.4 2.5 13.7 2.5 12 2.5 6.8 6.8 2.5 12 2.5S21.5 6.8 21.5 12 17.2 21.5 12 21.5zm0-21C5.7.5.5 5.7.5 12c0 2 .5 4 1.5 5.8L.5 23.5l5.9-1.5c1.7.9 3.6 1.4 5.6 1.4 6.3 0 11.5-5.2 11.5-11.5S18.3.5 12 .5z"/></svg>',
    arrow: sv('<path d="M5 12h14M13 6l6 6-6 6"/>'), arrowL: sv('<path d="M19 12H5M11 6l-6 6 6 6"/>'), chevL: sv('<path d="m15 18-6-6 6-6"/>'), chevR: sv('<path d="m9 18 6-6-6-6"/>'),
    phone: sv('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>'),
    mail: sv('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>'), pin: sv('<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>'),
    check: sv('<path d="M20 6 9 17l-5-5"/>', 2.2), checkCircle: sv('<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>'),
    close: sv('<path d="M18 6 6 18M6 6l12 12"/>'), menu: sv('<path d="M4 8h16M4 16h16"/>'), filter: sv('<path d="M4 6h16M7 12h10M10 18h4"/>'),
    user: sv('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'), users: sv('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 20a6.5 6.5 0 0 0-2-4.7"/>'),
    rotate: sv('<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/>'), seat: sv('<path d="M7 4h4l1 9h6a2 2 0 0 1 2 2v3H8a2 2 0 0 1-2-2z"/><path d="M8 18v3M18 18v3"/>'),
    city: sv('<path d="M3 17h18M5 17v-3l2-4h10l2 4v3"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>'),
    car: sv('<path d="M3 16h18v-3l-2.5-5h-13L3 13z"/><circle cx="7" cy="16.5" r="1.8"/><circle cx="17" cy="16.5" r="1.8"/><path d="M6 11h12"/>'),
    suv: sv('<path d="M2.5 16h19v-4l-2-5h-15l-2 5z"/><circle cx="7" cy="16.5" r="2"/><circle cx="17" cy="16.5" r="2"/><path d="M4.5 11h15M10 7v4"/>'),
    star: sv('<path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>'), bolt: sv('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'), plug: sv('<path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0zM12 17v5"/>'),
    moto: sv('<circle cx="5.5" cy="16.5" r="3.5"/><circle cx="18.5" cy="16.5" r="3.5"/><path d="M5.5 16.5 9 10h5l4.5 6.5M14 10l-1.5-4H10M9 10l3 6.5h6.5"/>'),
    van: sv('<path d="M2 17V7a1 1 0 0 1 1-1h11v11M14 9h4l4 4v4h-8"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>'),
    shield: sv('<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>'), wrench: sv('<path d="M14.7 6.3a4 4 0 0 0 5 5L22 14l-8 8-2.3-2.3a4 4 0 0 0-5-5L4.4 12.4a4 4 0 0 1 5.3-5.3z"/>'),
    tire: sv('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5"/>'), doc: sv('<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M8 13h8M8 17h5"/>'),
    swap: sv('<path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>'), calendar: sv('<rect x="3" y="4.5" width="18" height="17" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>'), clock: sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    upload: sv('<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>'), download: sv('<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>'), camera: sv('<path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="4"/>'),
    id: sv('<rect x="2.5" y="5" width="19" height="14" rx="2"/><circle cx="8.5" cy="11.5" r="2.5"/><path d="M5 16.5a4 4 0 0 1 7 0M14.5 10h4.5M14.5 13.5h3"/>'), card: sv('<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6.5 15h4"/>'),
    lock: sv('<rect x="4" y="10.5" width="16" height="10.5" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>'), pen: sv('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
    home: sv('<path d="m3 11 9-8 9 8M5 9.5V21h14V9.5"/>'), gauge: sv('<path d="M12 14l4-4"/><path d="M3.3 17a10 10 0 1 1 17.4 0"/>'), tag: sv('<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>'),
    sparkle: sv('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'), euro: sv('<path d="M17 6.5A7 7 0 1 0 17 17.5M4 10h9M4 14h9"/>'), logout: sv('<path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 16l-4-4 4-4M6 12h11"/>'),
    alert: sv('<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17.5v.01"/>'), chat: sv('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>'),
    building: sv('<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>'), copy: sv('<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>'),
    smartphone: sv('<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M11 18.5h2"/>'), scan: sv('<path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3M7 12h10"/>'),
    cube: sv('<path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="m3 7 9 5 9-5M12 12v10"/>'),
  };
  const markSVG = () => `<svg class="brand-mark" viewBox="0 1 66 62" aria-hidden="true"><path fill="#D62839" d="M59.5 31.8 58.1 32.4 56.4 32.6 54.6 32.5 52.9 32.5 51.3 32.7 50.1 33.4 48.9 34.2 47.7 34.9 46.5 35.7 45.3 36.4 44.1 37.0 42.8 37.7 41.6 38.4 40.4 39.0 39.2 39.6 37.9 40.3 36.7 40.9 35.4 41.5 34.2 42.0 32.9 42.6 31.7 43.2 30.4 43.8 29.2 44.3 27.9 44.9 26.7 45.5 25.4 46.0 24.2 46.6 22.9 47.1 21.6 47.7 20.4 48.2 19.1 48.7 17.8 49.1 16.5 49.6 15.2 50.0 13.8 50.4 12.5 50.8 11.2 51.2 9.9 51.7 8.6 52.2 7.2 52.5 6.7 52.8 6.4 53.2 6.1 53.8 6.0 54.6 5.9 55.5 6.1 56.4 6.3 57.2 6.7 58.0 7.2 58.7 7.7 59.1 8.2 59.4 8.7 59.4 10.1 59.1 11.6 59.0 13.1 58.8 14.5 58.5 15.9 58.1 17.4 57.8 18.8 57.4 20.2 57.1 21.6 56.7 23.0 56.3 24.5 55.9 25.9 55.5 27.3 55.1 28.7 54.7 30.1 54.2 31.5 53.7 32.9 53.2 34.2 52.7 35.6 52.1 37.0 51.5 38.3 50.9 39.7 50.3 41.0 49.6 42.3 49.0 43.6 48.3 44.9 47.6 46.2 46.9 47.5 46.1 48.8 45.4 50.1 44.6 51.4 43.8 52.7 43.1 54.0 42.3 55.2 41.4 56.5 40.6 57.4 39.2 58.1 37.5 58.7 35.8 59.4 34.2 60.4 33.1 60.5 33.0 60.5 32.9 60.5 32.7 60.5 32.6 60.4 32.4 60.3 32.2 60.2 32.1 60.0 31.9 59.9 31.9 59.7 31.8 59.6 31.8Z"/><path class="lm-n" fill="#1B2A6B" d="M6.3 12.7 7.5 12.8 8.7 13.1 9.9 13.3 11.1 13.6 12.2 13.9 13.4 14.2 14.5 14.6 15.7 14.9 16.8 15.3 18.0 15.8 19.1 16.2 20.3 16.7 21.4 17.2 22.5 17.7 23.7 18.2 24.8 18.7 25.9 19.3 27.1 19.9 28.2 20.4 29.4 21.0 30.5 21.6 31.7 22.2 32.8 22.8 34.0 23.5 35.2 24.1 36.3 24.8 37.5 25.5 38.7 26.2 39.9 26.9 41.1 27.7 42.3 28.4 43.5 29.2 44.6 30.0 45.8 30.9 46.9 31.7 47.6 32.2 48.3 32.8 49.1 33.3 49.8 33.7 50.6 34.3 51.3 34.6 52.2 34.9 53.5 35.0 54.9 35.0 56.4 34.9 57.8 34.6 59.2 34.2 60.3 33.7 61.1 33.2 61.5 32.6 61.6 32.1 61.3 31.6 59.7 30.1 58.1 28.5 56.4 27.1 54.7 25.6 52.9 24.3 51.6 23.2 50.4 22.3 49.2 21.3 47.9 20.4 46.7 19.4 45.5 18.6 44.2 17.7 43.0 16.8 41.7 16.0 40.5 15.2 39.2 14.4 37.9 13.7 36.6 13.0 35.3 12.3 34.0 11.6 32.7 11.0 31.4 10.4 30.1 9.9 28.8 9.4 27.5 8.9 26.1 8.4 24.8 8.0 23.5 7.6 22.1 7.2 20.8 6.8 19.5 6.5 18.2 6.2 16.8 5.9 15.5 5.6 14.2 5.3 12.8 5.1 11.5 4.9 10.2 4.6 8.9 4.4 7.6 4.3 7.0 4.3 6.3 4.6 5.8 5.2 5.3 6.1 4.9 7.0 4.6 8.1 4.6 9.2 4.6 10.3 4.9 11.2 5.3 11.9 5.8 12.4Z"/><circle fill="#2BA84A" cx="18" cy="33" r="6.2"/></svg>`;

  /* ---------- Utilità ---------- */
  const eur = LF.eur = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const byId = LF.byId = (id) => LF.auto.find((a) => a.id === id);
  const sedeNome = LF.sedeNome = (id) => (LF.sedi.find((s) => s.id === id) || {}).citta || id;
  const catNome = LF.catNome = (id) => (LF.categorie.find((c) => c.id === id) || {}).nome || id;
  const img = LF.img = (a, v = '', size = '') => `assets/img/car/${a.img}${v ? '-' + v : ''}${size}.webp`;
  const photo = LF.photo = (k) => `assets/img/photo/${k}.webp`;
  const has = LF.has = (a, k) => !!(LF.foto && LF.foto[a.id] && LF.foto[a.id][k]);
  const consegnaLabel = LF.consegnaLabel = (h) => (h === 0 ? 'Pronta oggi' : `Pronta in ${h} ore`);
  LF.disp = (a) => (a.arrivo ? `In arrivo dal ${a.arrivo}` : consegnaLabel(a.consegna));
  LF.status = (a) => `<span class="cc-eta ${a.arrivo ? 'soon' : a.consegna ? 'later' : ''}"><i></i>${LF.disp(a)}</span>`;
  LF.carShot = (a, size = '', o = {}) => {
    const lz = size === '-sm' ? ' loading="lazy"' : '';
    const back = o.back && has(a, 'rear') ? `<img class="back" src="${img(a, 'rear', size)}" alt="" aria-hidden="true" loading="lazy" decoding="async">` : '';
    return `<div class="car-shot${back ? ' has-back' : ''}"><img class="front" src="${img(a, o.view || '', size)}" alt="${a.marca} ${a.modello}"${lz} decoding="async">${back}</div>`;
  };
  const store = LF.store = { get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignora */ } } };
  LF.durata = new URLSearchParams(location.search).get('tipo') || document.body.dataset.tipo || store.get('lf-durata', 'lungo');
  if (!LF.durate[LF.durata]) LF.durata = 'lungo';

  LF.prezzo = function (a, tipo, o = {}) {
    const base = a.prezzi[tipo]; let unit, tot;
    if (tipo === 'breve') { const g = o.giorni || 1; const f = g >= 7 ? 0.88 : g >= 3 ? 0.94 : 1; unit = base * f; tot = unit * g; }
    else if (tipo === 'medio') { const m = o.mesi || 3; const f = m <= 2 ? 1.08 : m >= 6 ? 0.9 : 1; unit = base * f; tot = unit * m; }
    else { const d = o.durata || 36; const fD = { 24: 1.08, 36: 1, 48: 0.95, 60: 0.92 }[d]; const fK = { 10: 0.94, 15: 1, 20: 1.07, 30: 1.16 }[o.km || 15]; unit = Math.max(base * 0.5, base * fD * fK - (o.anticipo || 0) / d); tot = unit * d; }
    const pct = a.promo && !o.noPromo ? a.promo : 0;
    return { unit: unit * (1 - pct), tot: tot * (1 - pct), pieno: unit, pct };
  };
  LF.waLink = (msg) => `https://wa.me/${LF.contatti.whatsapp}?text=${encodeURIComponent(msg)}`;
  LF.waCar = (a, tipo) => LF.waLink(`Ciao LOCAFIT Rent! Mi interessa ${a.marca} ${a.modello} (${a.versione}) a noleggio ${LF.durate[tipo].nome.toLowerCase()}. È disponibile?`);
  LF.toast = (msg) => { let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); } t.innerHTML = I.checkCircle + msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2600); };
  document.addEventListener('click', (e) => { const c = e.target.closest('[data-copy]'); if (!c) return; try { navigator.clipboard.writeText(c.dataset.copy); } catch (err) { /* ignora */ } LF.toast(`Codice ${c.dataset.copy} copiato`); });
  LF.countdown = (el, end) => { const tick = () => { let s = Math.max(0, Math.floor((new Date(end) - new Date()) / 1000)); const d = Math.floor(s / 86400); s -= d * 86400; const h = Math.floor(s / 3600); s -= h * 3600; const m = Math.floor(s / 60); s -= m * 60; el.innerHTML = [[d, 'giorni'], [h, 'ore'], [m, 'min'], [s, 'sec']].map(([v, l]) => `<div><b>${String(v).padStart(2, '0')}</b><small>${l}</small></div>`).join(''); }; tick(); setInterval(tick, 1000); };

  /* ---------- Navigazione ---------- */
  const active = document.body.dataset.nav || page;
  const noleggio = [['breve-termine.html', 'Breve termine', 'Da 1 a 30 giorni', 'breve'], ['medio-termine.html', 'Medio termine', 'Da 1 a 12 mesi', 'medio'], ['lungo-termine.html', 'Lungo termine', 'Da 24 a 60 mesi', 'lungo']];
  /* Menu grande (stile Mercedes): veicoli per tipo e per esigenza, formule di noleggio */
  const catImg = { city: 'fiat-500', compatta: 'vw-golf', suv: 'vw-tiguan', premium: 'mercedes-e', sportiva: 'porsche-911', elettrica: 'tesla-model-y', furgone: 'ford-transit-custom', moto: 'bmw-r1300gs' };
  const unita = () => LF.durate[LF.durata].unita;
  const minPrezzo = (list, tipo = LF.durata) => Math.min(...list.map((a) => a.prezzi[tipo]));
  const catInfo = () => LF.categorie.map((c) => {
    const list = LF.auto.filter((a) => a.categoria === c.id);
    const img = (list.find((a) => a.id === catImg[c.id]) || list[0] || {}).img;
    return { ...c, n: list.length, da: list.length ? minPrezzo(list) : 0, img };
  }).filter((c) => c.n);
  const bisogni = [
    ['flotta.html?tipo=breve', 'Un’auto per qualche giorno'],
    ['flotta.html?tipo=medio', 'Un’auto per qualche mese'],
    ['flotta.html?tipo=lungo', 'Un’auto nuova per anni'],
    ['flotta.html?cat=furgone&tipo=breve', 'Un furgone per lavoro o trasloco'],
    ['flotta.html?cat=moto', 'Una moto o uno scooter'],
    ['flotta.html?pronta=1', 'Un veicolo pronto oggi'],
    ['flotta.html?promo=1', 'Le auto in offerta'],
    ['aziende.html', 'Una flotta per l’azienda'],
  ];
  const megaVeicoli = () => `<div class="mega" id="mm-veicoli" hidden><div class="mega-in">
      <div><p class="mm-h">Scegli per tipo</p><div class="mm-cats">${catInfo().map((c) => `<a class="mm-cat" href="flotta.html?cat=${c.id}"><span class="mm-img"><img src="assets/img/car/${c.img}-sm.webp" alt="" loading="lazy"></span><b>${c.nome}</b><small>${c.n} ${c.n === 1 ? 'modello' : 'modelli'} · da €${c.da}${unita()}</small></a>`).join('')}</div></div>
      <div class="mm-needs"><p class="mm-h">Cosa ti serve?</p>${bisogni.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</div>
      <div class="mm-foot"><a class="link" href="flotta.html">Vedi tutti i ${LF.auto.length} veicoli</a><span class="tiny">Prezzi ${LF.durate[LF.durata].nome.toLowerCase()}, IVA inclusa. Cambi formula nella Flotta.</span></div>
    </div></div>`;
  const piani = [
    ['breve-termine.html', 'Breve termine', 'Da 1 a 30 giorni', 'Un viaggio, un weekend, un’auto sostitutiva.', 'breve'],
    ['medio-termine.html', 'Medio termine', 'Da 1 a 12 mesi', 'Qualche mese senza vincoli. Recesso con 30 giorni.', 'medio'],
    ['lungo-termine.html', 'Lungo termine', 'Da 24 a 60 mesi', 'L’auto nuova senza comprarla. Anticipo zero.', 'lungo'],
  ];
  const megaNoleggio = () => `<div class="mega" id="mm-noleggio" hidden><div class="mega-in plans">
      ${piani.map(([h, t, s, d, k]) => `<a class="mm-plan" href="${h}"><small>${s}</small><b>${t}</b><p>${d}</p><span class="mm-from">da €${minPrezzo(LF.auto.filter((a) => a.categoria !== 'moto'), k)}${LF.durate[k].unita}</span></a>`).join('')}
      <a class="mm-plan dark" href="aziende.html"><small>Aziende e P.IVA</small><b>Flotte aziendali</b><p>Un referente dedicato, canoni deducibili, auto sostitutiva in 24 ore.</p><span class="mm-from">Richiedi un’offerta</span></a>
    </div></div>`;
  function setupMega(h) {
    const trig = $$('.mm-t', h), hover = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const scrim = document.createElement('div'); scrim.className = 'mm-scrim'; scrim.hidden = true; document.body.appendChild(scrim);
    let cur = null, at = 0, tm;
    const set = (k) => {
      if (k !== cur) at = Date.now();
      cur = k; scrim.hidden = !k; h.classList.toggle('mm-open', !!k);
      trig.forEach((b) => b.setAttribute('aria-expanded', String(b.dataset.mm === k)));
      $$('.mega', h).forEach((m) => { m.hidden = m.id !== 'mm-' + k; });
    };
    trig.forEach((b) => {
      b.addEventListener('click', () => set(cur === b.dataset.mm && Date.now() - at > 400 ? null : b.dataset.mm));
      if (hover) b.addEventListener('mouseenter', () => { clearTimeout(tm); tm = setTimeout(() => set(b.dataset.mm), cur ? 0 : 140); });
    });
    if (hover) {
      $$('.nav > a', h).forEach((a) => a.addEventListener('mouseenter', () => { clearTimeout(tm); if (cur) tm = setTimeout(() => set(null), 120); }));
      h.addEventListener('mouseleave', () => { clearTimeout(tm); tm = setTimeout(() => set(null), 260); });
      h.addEventListener('mouseenter', () => { if (cur) clearTimeout(tm); });
    }
    scrim.addEventListener('click', () => set(null));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && cur) { const b = trig.find((x) => x.dataset.mm === cur); set(null); if (b) b.focus(); } });
    addEventListener('resize', () => { if (cur && innerWidth < 1024) set(null); });
  }

  const header = $('#site-header');
  if (header) {
    if (!document.body.dataset.noRibbon) header.insertAdjacentHTML('beforebegin', `<a class="ribbon" href="offerte.html"><b>${LF.promo.nome}.</b> Fino al −20%<span class="rb-long"> sul canone con il codice ${LF.promo.codice}, fino al 30 novembre</span>. <u>Scopri le offerte</u></a>`);
    header.className = 'site-header';
    header.innerHTML = `<div class="wrap-wide">
      <a href="index.html" class="brand" aria-label="LOCAFIT Rent, home">${markSVG()}<span class="brand-name">LOCAFIT<span>Rent</span></span></a>
      <nav class="nav" aria-label="Principale">
        <button type="button" class="mm-t ${['flotta', 'auto'].includes(active) ? 'active' : ''}" data-mm="veicoli" aria-expanded="false" aria-controls="mm-veicoli">Veicoli</button>
        <button type="button" class="mm-t ${['breve', 'medio', 'lungo'].includes(active) ? 'active' : ''}" data-mm="noleggio" aria-expanded="false" aria-controls="mm-noleggio">Noleggio</button>
        <a href="offerte.html" class="promo ${active === 'offerte' ? 'active' : ''}">Offerte</a>
        <a href="aziende.html" class="${active === 'aziende' ? 'active' : ''}">Aziende</a>
        <a href="come-funziona.html" class="${active === 'come' ? 'active' : ''}">Come funziona</a>
        <a href="contatti.html" class="${['contatti', 'faq', 'chi-siamo'].includes(active) ? 'active' : ''}">Assistenza</a>
      </nav>
      <div class="header-cta">
        <a class="icon-link" href="area.html" aria-label="Area personale">${I.user}</a>
        <a class="btn btn-primary btn-sm" href="flotta.html">Scegli l’auto</a>
      </div>
      <button class="menu-btn" aria-label="Apri menu" aria-expanded="false">${I.menu}</button></div>
      ${megaVeicoli()}
      ${megaNoleggio()}`;
    setupMega(header);
    const mob = document.createElement('div'); mob.className = 'mobile-nav';
    mob.innerHTML = `<p class="mn-h">Cosa cerchi?</p><div class="mn-cats">${catInfo().map((c) => `<a href="flotta.html?cat=${c.id}"><img src="assets/img/car/${c.img}-sm.webp" alt="" loading="lazy"><span>${c.nome}</span></a>`).join('')}</div><a href="flotta.html">Tutti i veicoli <small class="n">${LF.auto.length}</small></a><a href="offerte.html">Offerte <small>${LF.promo.nome}</small></a><div class="sub-links">${noleggio.map(([h, t]) => `<a href="${h}">${t.split(' ')[0]}</a>`).join('')}</div><a href="aziende.html">Aziende</a><a href="come-funziona.html">Come funziona</a><a href="contatti.html">Assistenza</a><a href="faq.html">Domande frequenti</a><a href="area.html">Area personale</a><a class="btn btn-primary btn-lg" href="flotta.html">Scegli l’auto</a>`;
    document.body.appendChild(mob);
    const mb = $('.menu-btn', header);
    mb.addEventListener('click', () => { mob.style.top = Math.max(0, header.getBoundingClientRect().bottom) + 'px'; const o = mob.classList.toggle('open'); mb.setAttribute('aria-expanded', o); mb.innerHTML = o ? I.close : I.menu; document.body.style.overflow = o ? 'hidden' : ''; });
  }
  const footer = $('#site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML = `<div class="wrap-wide">
      <div class="footer-notes"><p>Prezzi IVA inclusa per privati. Canoni del lungo termine calcolati su 36 mesi e 15.000 km/anno con anticipo zero. Le promozioni ${LF.promo.nome} sono valide fino al 30 novembre 2026 sui modelli indicati.</p><p>Sito dimostrativo: prezzi, recensioni e contatti sono di esempio. Foto da Wikimedia Commons (CC), modelli 3D da Sketchfab.</p></div>
      <div class="footer-top">
        <div><h4>Noleggio</h4><ul><li><a href="flotta.html">Flotta</a></li><li><a href="offerte.html">Offerte</a></li>${noleggio.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>
        <div><h4>Servizi</h4><ul><li><a href="come-funziona.html">Come funziona</a></li><li><a href="prenota.html">Noleggio online</a></li><li><a href="aziende.html">Aziende e P.IVA</a></li><li><a href="area.html">Area personale</a></li><li><a href="gestionale.html">Area staff</a></li></ul></div>
        <div><h4>Sedi</h4><ul>${LF.sedi.map((s) => `<li><a href="contatti.html#${s.id}">${s.citta}</a></li>`).join('')}<li><a href="contatti.html">Consegna in tutta Italia</a></li></ul></div>
        <div><h4>Assistenza</h4><ul><li><a href="contatti.html">Contatti</a></li><li><a href="faq.html">Domande frequenti</a></li><li><a href="${LF.contatti.telefonoHref}">${LF.contatti.telefono}</a></li><li><a href="${LF.waLink('Ciao LOCAFIT Rent!')}" target="_blank" rel="noopener">WhatsApp</a></li></ul></div>
        <div><h4>LOCAFIT Rent</h4><ul><li><a href="chi-siamo.html">Chi siamo</a></li><li><a href="mailto:${LF.contatti.email}">${LF.contatti.email}</a></li></ul>
          <form class="newsletter" style="margin-top:14px" onsubmit="event.preventDefault();LF.toast('Iscrizione confermata');this.reset()"><input type="email" required placeholder="Email per le offerte" aria-label="Email"><button class="btn btn-dark btn-sm">Iscriviti</button></form></div>
      </div>
      <div class="footer-bottom"><span>Copyright © 2026 LOCAFIT Rent S.r.l. · ${LF.contatti.piva}</span><span>Privacy · Cookie · Termini di noleggio</span><span>Italia</span></div></div>`;
  }
  if (!document.body.dataset.noFloat) document.body.insertAdjacentHTML('beforeend', `<a class="wa-float" href="${LF.waLink('Ciao LOCAFIT Rent! Vorrei informazioni.')}" target="_blank" rel="noopener" aria-label="Scrivici su WhatsApp">${I.wa}</a>`);

  // WhatsApp flottante: si nasconde mentre scorri verso il basso, torna quando risali
  { const wf = $('.wa-float'); let y0 = scrollY;
    if (wf) addEventListener('scroll', () => { const y = scrollY; if (Math.abs(y - y0) < 8) return; wf.classList.toggle('away', y > y0 && y > 400); y0 = y; }, { passive: true }); }

  /* ---------- Card auto ---------- */
  LF.card = function (a, tipo) {
    const p = LF.prezzo(a, tipo);
    const href = `auto.html?id=${a.id}&tipo=${tipo}`;
    const cat = (LF.categorie.find((c) => c.id === a.categoria) || {}).nome || '';
    const flag = p.pct ? `<span class="cc-flag promo">${LF.promo.nome} −${Math.round(p.pct * 100)}%</span>` : `<span class="cc-flag">${cat}</span>`;
    const label = tipo === 'lungo' ? 'Anticipo zero, IVA inclusa' : tipo === 'medio' ? 'Recesso con 30 giorni' : '250 km al giorno inclusi';
    return `<article class="car-card">
      <div class="cc-head">
        <div class="cc-line">${flag}${LF.status(a)}</div>
        <h3><a class="card-link" href="${href}">${a.modello}</a></h3>
        <p>${a.marca} · ${a.versione}</p>
      </div>
      <div class="cc-stage">${LF.carShot(a, '-sm', { back: true })}${LF.modelli3d[a.id] ? `<span class="cc-360">${I.rotate}360°</span>` : ''}</div>
      <div class="cc-specs"><div><b>${a.cv} CV</b><small>Potenza</small></div><div><b>${a.alim}</b><small>Motore</small></div><div><b>${a.cambio}</b><small>Cambio</small></div></div>
      <div class="cc-foot">
        <div class="price"><div class="row"><b class="${p.pct ? 'promo' : ''}">€${eur(p.unit)}</b><em>${LF.durate[tipo].unita}</em>${p.pct ? `<s>€${eur(p.pieno)}</s>` : ''}</div><small>${label}</small></div>
        ${a.arrivo ? `<button type="button" class="btn btn-outline btn-sm cc-go" data-lead-open data-id="${a.id}" data-tipo="${tipo}">Avvisami</button>` : `<a class="btn btn-primary btn-sm cc-go" href="prenota.html?id=${a.id}&tipo=${tipo}">Noleggia</a>`}
      </div>
    </article>`;
  };
  const tiles = [
    { k: 'costiera', e: '100% online', t: 'Firmi dal telefono. Guidi in giornata.', d: 'Documenti, verifica, firma e pagamento in meno di dieci minuti.', href: 'come-funziona.html', l: 'Come funziona' },
    { k: 'notte', e: LF.promo.nome, t: 'Fino al −20% sul canone.', d: `Con il codice ${LF.promo.codice}, fino al 30 novembre.`, href: 'offerte.html', l: 'Vedi le offerte' },
    { k: 'interni', e: 'Tour 3D', t: 'Siediti al posto di guida prima di noleggiare.', d: 'Sui modelli con il simbolo 360°.', href: 'auto.html?id=porsche-911', l: 'Prova sulla 911' },
  ];
  const swUpd = (el) => {
    const bar = el._bar, w = el.scrollWidth, c = el.clientWidth;
    bar.hidden = w <= c + 2; if (bar.hidden) return;
    bar.firstChild.style.width = (c / w * 100) + '%';
    bar.firstChild.style.transform = `translateX(${el.scrollLeft / c * 100}%)`;
  };
  LF.swipe = function (el) {
    if (!el) return;
    el.classList.add('swipe');
    if (!el._bar) {
      const bar = document.createElement('div'); bar.className = 'swipe-bar'; bar.setAttribute('aria-hidden', 'true'); bar.innerHTML = '<i></i>';
      el.after(bar); el._bar = bar;
      el.addEventListener('scroll', () => swUpd(el), { passive: true });
      if (window.ResizeObserver) new ResizeObserver(() => swUpd(el)).observe(el);
    }
    el.scrollLeft = 0; swUpd(el);
  };
  LF.renderGrid = function (el, list, tipo, opt = {}) {
    if (!list.length) { el.innerHTML = '<div class="empty"><b>Nessuna auto con questi filtri.</b><br>Prova a cambiare sede o categoria, oppure scrivici: la troviamo noi.</div>'; return; }
    const cards = (l, withTiles) => {
      const html = l.map((a) => LF.card(a, tipo));
      if (withTiles) { [3, 11, 19].forEach((p, t) => { if (html.length > p && tiles[t]) { const x = tiles[t]; html.splice(p, 0, `<div class="tile-photo"><img src="${photo(x.k)}" alt="" loading="lazy"><span class="eyebrow">${x.e}</span><h3>${x.t}</h3><p>${x.d}</p><a class="btn btn-light btn-sm" href="${x.href}">${x.l}</a></div>`); } }); }
      return html.join('');
    };
    if (opt.groups) {
      const gs = opt.groups.filter((g) => g[1].length);
      el.innerHTML = gs.map(([t, l, id], i) => `${gs.length > 1 ? `<h2 class="grid-h${i ? '' : ' first'}">${t}<span>${l.length}</span>${opt.rows && id ? `<button type="button" class="grid-all" data-cat="${id}">Vedi elenco</button>` : ''}</h2>` : ''}${opt.rows ? `<div class="car-row">${cards(l, false)}</div>` : cards(l, i === 0 && opt.tiles)}`).join('');
      if (opt.rows) $$('.car-row', el).forEach((r) => LF.swipe(r));
      return;
    }
    el.innerHTML = cards(list, opt.tiles);
    if (!opt.noSwipe) LF.swipe(el);
  };
  LF.segDurata = function (el, current, onChange) {
    el.innerHTML = Object.entries(LF.durate).map(([k, v]) => `<button type="button" data-v="${k}" class="${k === current ? 'on' : ''}" aria-pressed="${k === current}">${v.breve}</button>`).join('');
    el.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; $$('button', el).forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); }); onChange(b.dataset.v); });
  };

  /* ---------- Galleria scheda auto: foto + 360° + interni 3D ---------- */
  let sfScript;
  const loadSketchfab = () => sfScript || (sfScript = new Promise((res, rej) => { const s = document.createElement('script'); s.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js'; s.onload = res; s.onerror = rej; document.head.appendChild(s); }));
  LF.gallery = function (host, a) {
    const m = LF.modelli3d[a.id];
    const slides = [{ k: 'front', t: 'Esterno', html: LF.carShot(a), th: `<img class="cut" src="${img(a, '', '-sm')}" alt="">` }];
    if (has(a, 'rear')) slides.push({ k: 'rear', t: 'Posteriore', html: LF.carShot(a, '', { view: 'rear' }), th: `<img class="cut" src="${img(a, 'rear', '-sm')}" alt="">` });
    if (has(a, 'interior')) slides.push({ k: 'int-photo', t: 'Interni', html: `<img class="photo" src="${img(a, 'interior')}" alt="Interni ${a.marca} ${a.modello}" loading="lazy">`, th: `<img src="${img(a, 'interior', '-sm')}" alt="">` });
    if (m) slides.push({ k: '3d-ext', t: '360°', d3: 'ext', th: `<span class="t3d">${I.rotate}360°</span>` });
    if (m && m.int) slides.push({ k: '3d-int', t: 'Interni 3D', d3: 'int', th: `<span class="t3d">${I.seat}3D</span>` });
    host.innerHTML = `<div class="gallery-main">${slides.map((s, i) => `<div class="slide ${i === 0 ? 'on' : ''}" data-i="${i}">${s.html || ''}</div>`).join('')}
      <span class="g-tag badge badge-grey"></span>
      <div class="gallery-loading"><span class="spinner"></span>Carico il modello 3D</div>
      ${slides.length > 1 ? `<button class="g-arrow g-prev" type="button" aria-label="Foto precedente">${I.chevL}</button><button class="g-arrow g-next" type="button" aria-label="Foto successiva">${I.chevR}</button>` : ''}</div>
      <div class="gallery-thumbs" role="tablist">${slides.map((s, i) => `<button class="g-thumb ${i === 0 ? 'on' : ''}" type="button" data-i="${i}" aria-label="${s.t}">${s.th}</button>`).join('')}</div>
      <p class="credit"></p>`;
    const main = $('.gallery-main', host), credit = $('.credit', host), tag = $('.g-tag', main);
    let cur = 0, api, cam0, ready = false, want = null, ifr;
    const apply = () => {
      if (!ready || !want) return; main.classList.remove('loading');
      if (want === 'int') { const { p, t } = m.int; const d = [t[0] - p[0], t[1] - p[1], t[2] - p[2]]; const len = Math.hypot(...d); const k = (m.int.k || len * 0.02) / len; api.setCameraLookAt(p, [p[0] + d[0] * k, p[1] + d[1] * k, p[2] + d[2] * k], 1.2); }
      else api.setCameraLookAt(cam0.position, cam0.target, 1.2);
    };
    async function open3d(mode) {
      want = mode;
      if (api) return apply();
      main.classList.add('loading');
      credit.innerHTML = `Modello 3D: <a href="https://sketchfab.com/3d-models/${m.uid}" target="_blank" rel="noopener">${m.nome}</a> di ${m.autore} · ${m.licenza} · Sketchfab`;
      ifr = document.createElement('iframe'); ifr.title = `${a.marca} ${a.modello} in 3D`; ifr.setAttribute('allow', 'autoplay; fullscreen; xr-spatial-tracking'); main.appendChild(ifr);
      try { await loadSketchfab(); } catch (e) { main.classList.remove('loading'); credit.textContent = 'Modello 3D non raggiungibile: serve la connessione.'; return; }
      new window.Sketchfab(ifr).init(m.uid, { autostart: 1, preload: 1, ui_infos: 0, ui_controls: 0, ui_stop: 0, ui_watermark: 0, ui_hint: 0, ui_settings: 0, ui_help: 0, ui_inspector: 0, ui_annotations: 0, ui_vr: 0, ui_ar: 0, ui_fullscreen: 0, ui_loading: 0, ui_theme: 'dark',
        success(x) { api = x; api.addEventListener('viewerready', () => setTimeout(() => api.getCameraLookAt((err, c) => { cam0 = c; ready = true; apply(); }), 1800)); },
        error() { main.classList.remove('loading'); credit.textContent = 'Impossibile caricare il modello 3D.'; } });
    }
    const go = (i) => {
      cur = (i + slides.length) % slides.length; const s = slides[cur];
      $$('.slide', main).forEach((el, k) => el.classList.toggle('on', k === cur));
      $$('.g-thumb', host).forEach((el, k) => el.classList.toggle('on', k === cur));
      tag.textContent = s.t;
      if (ifr) ifr.style.visibility = s.d3 ? 'visible' : 'hidden';
      if (s.d3) { open3d(s.d3); if (ifr) ifr.style.visibility = 'visible'; } else { main.classList.remove('loading'); if (!ifr) credit.textContent = ''; }
    };
    tag.textContent = slides[0].t;
    host.addEventListener('click', (e) => { const t = e.target.closest('.g-thumb'); if (t) go(+t.dataset.i); if (e.target.closest('.g-prev')) go(cur - 1); if (e.target.closest('.g-next')) go(cur + 1); });
    let sx = null; main.addEventListener('touchstart', (e) => { if (!slides[cur].d3) sx = e.touches[0].clientX; }, { passive: true });
    main.addEventListener('touchend', (e) => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1)); sx = null; });
    return { open: (mode) => { const i = slides.findIndex((s) => s.d3 === mode); if (i >= 0) go(i); } };
  };

  /* ---------- Modal consulente ---------- */
  document.body.insertAdjacentHTML('beforeend', `<div class="modal" id="lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-title"><div class="modal-bg" data-close></div><div class="modal-box"><button class="modal-close" data-close aria-label="Chiudi">${I.close}</button><div class="lead-content"></div></div></div>`);
  const modal = $('#lead-modal'); let lastFocus;
  LF.openLead = function (opts = {}) {
    const a = opts.id ? byId(opts.id) : null; const tipo = opts.tipo || LF.durata;
    const soon = a && a.arrivo, sede = !a && opts.sede;
    const kicker = soon ? 'In arrivo' : sede ? 'Da un’altra sede' : (opts.kicker || LF.durate[tipo].nome);
    const title = soon ? `${a.marca} ${a.modello} arriva dal ${a.arrivo}.` : sede ? `Te lo portiamo a ${sedeNome(sede)}.` : (opts.title || 'Parla con un consulente');
    const text = soon ? 'Lasciaci il numero: ti chiamiamo appena arriva e te lo teniamo da parte.' : sede ? 'Lasciaci il numero e dicci quale veicolo ti interessa: lo portiamo in sede in 2–3 giorni.' : 'Ti richiamiamo entro 30 minuti in orario d’ufficio.';
    $('.lead-content', modal).innerHTML = `<span class="eyebrow grey">${kicker}</span><h2 id="lead-title">${title}</h2>
      <p class="muted" style="margin-top:8px">${text}</p>
      <form class="form" data-lead style="margin-top:22px">
        <div class="row2"><label>Nome e cognome<input required name="nome" autocomplete="name"></label><label>Telefono<input required name="tel" type="tel" autocomplete="tel"></label></div>
        ${soon || sede ? '' : '<label>Email<input required name="email" type="email" autocomplete="email"></label>'}
        ${soon ? '' : `<label>Messaggio<textarea name="msg" placeholder="${a ? `Mi interessa ${a.marca} ${a.modello}…` : sede ? 'Quale veicolo, per quando…' : 'Quante auto, per quanto tempo, che tipo…'}"></textarea></label>`}
        <label class="check"><input type="checkbox" required> Acconsento a essere ricontattato secondo l’informativa privacy.</label>
        <button class="btn btn-primary btn-block btn-lg" type="submit">${soon ? 'Avvisami quando arriva' : sede ? 'Richiamatemi' : 'Invia richiesta'}</button>
        ${a && !soon ? `<a class="btn btn-outline btn-block" href="prenota.html?id=${a.id}&tipo=${tipo}">Oppure noleggia online</a>` : ''}
      </form>`;
    lastFocus = document.activeElement; modal.classList.add('open'); document.body.style.overflow = 'hidden'; setTimeout(() => $('input', modal).focus(), 50);
  };
  const closeLead = () => { modal.classList.remove('open'); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); };
  modal.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeLead(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeLead(); });
  document.addEventListener('submit', (e) => {
    const f = e.target.closest('form[data-lead]'); if (!f) return; e.preventDefault();
    const nome = (new FormData(f).get('nome') || '').toString().split(' ')[0];
    f.outerHTML = `<div class="done-hero" style="padding:28px 0"><span class="ok">${I.check}</span><h2 style="font-size:30px">Grazie${nome ? ', ' + nome : ''}.</h2><p class="muted" style="margin-top:10px">Richiesta ricevuta: un consulente ti contatta a breve.<br><small>Demo · nessun dato è stato inviato.</small></p></div>`;
  });
  document.addEventListener('click', (e) => { const b = e.target.closest('[data-lead-open]'); if (!b) return; e.preventDefault(); LF.openLead({ id: b.dataset.id, tipo: b.dataset.tipo, title: b.dataset.title, kicker: b.dataset.kicker, sede: b.dataset.sede }); });

  /* ---------- Blocchi ripetuti ---------- */
  $$('[data-inclusi]').forEach((el) => { el.innerHTML = LF.inclusi.map((x) => `<div class="incluso"><span class="ico">${I[x.i]}</span><b>${x.t}</b><small>${x.d}</small></div>`).join(''); });
  $$('[data-faq]').forEach((el) => { const c = el.dataset.faq; const l = c && isNaN(c) ? LF.faq.filter((f) => f.c === c) : LF.faq.slice(0, +c || LF.faq.length); el.innerHTML = l.map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join(''); });
  $$('[data-sedi]').forEach((el) => { el.innerHTML = LF.sedi.map((s) => `<article class="sede" id="${s.id}">
      <div class="sede-img"><img src="${photo(s.foto)}" alt="${s.fotoAlt || s.citta}" loading="lazy"></div>
      <div class="sede-body">
        <span class="tag">${s.tipo}</span>
        <h3>${s.citta}</h3>
        <dl class="sede-info">
          <div><dt>Indirizzo</dt><dd>${s.indirizzo}</dd></div>
          <div><dt>Orari</dt><dd>${s.orari}</dd></div>
          <div><dt>In sede</dt><dd>${s.auto}+ auto pronte</dd></div>
          <div><dt>Telefono</dt><dd><a href="tel:${s.tel.replace(/\s/g, '')}">${s.tel}</a></dd></div>
        </dl>
        <div class="btns"><a class="btn btn-primary btn-sm" href="flotta.html?sede=${s.id}">Auto a ${s.citta}</a><a class="btn btn-outline btn-sm" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mappa)}" target="_blank" rel="noopener">Indicazioni</a></div>
      </div>
    </article>`).join(''); });
  $$('[data-reviews]').forEach((el) => { el.innerHTML = LF.recensioni.map((r) => `<div class="review"><span class="stars">★★★★★</span><blockquote>“${r.q}”</blockquote><div class="who"><span class="av">${r.n.split(' ').map((x) => x[0]).join('')}</span><div><b style="font-weight:600">${r.n}</b><br><span class="muted" style="font-size:13px">${r.t}</span></div></div></div>`).join(''); });
  $$('[data-wa]').forEach((el) => { el.href = LF.waLink(el.dataset.wa || 'Ciao LOCAFIT Rent!'); el.target = '_blank'; el.rel = 'noopener'; });
  $$('[data-icon]').forEach((el) => { el.insertAdjacentHTML(el.dataset.iconPos === 'end' ? 'beforeend' : 'afterbegin', I[el.dataset.icon] || ''); });
  $$('[data-from]').forEach((el) => { const t = el.dataset.from; el.textContent = '€' + eur(Math.min(...LF.auto.map((a) => LF.prezzo(a, t).unit))); });
  $$('[data-price]').forEach((el) => { const a = byId(el.dataset.price); const t = el.dataset.tipo || 'lungo'; if (a) el.textContent = `€${eur(LF.prezzo(a, t).unit)}${LF.durate[t].unita}`; });
  $$('[data-car]').forEach((el) => { const a = byId(el.dataset.car); if (a) el.innerHTML = LF.carShot(a, el.dataset.size || '', { view: el.dataset.view || '' }); });
  $$('[data-photo]').forEach((el) => { el.src = photo(el.dataset.photo); });
  $$('[data-countdown]').forEach((el) => LF.countdown(el, LF.promo.fine));
  $$('[data-count]').forEach((el) => { const k = el.dataset.count; el.textContent = k === 'all' ? LF.auto.length : k === 'auto' ? LF.auto.filter((a) => a.categoria !== 'moto').length : LF.auto.filter((a) => a.categoria === k).length; });
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
      const list = ['porsche-911', 'mercedes-glc', 'bmw-x5', 'tesla-model-y', 'audi-q5', 'mercedes-a', 'cupra-formentor', 'fiat-panda'].map(byId).filter(Boolean);
      // altezza reale in metri: le auto restano in scala tra loro (la più alta riempie il riquadro)
      const alt = { 'porsche-911': 1.30, 'mercedes-glc': 1.64, 'bmw-x5': 1.75, 'tesla-model-y': 1.62, 'audi-q5': 1.66, 'mercedes-a': 1.44, 'cupra-formentor': 1.51, 'fiat-panda': 1.57 };
      const hMax = Math.max(...list.map((a) => alt[a.id] || 1.5));
      let i = 0;
      const car = $('#hero-car');
      car.innerHTML = `<button class="hero-arrow prev" type="button" aria-label="Auto precedente">‹</button><div class="hero-track" tabindex="0" aria-label="Modelli: scorri per cambiare auto">${list.map((a, k) => `<div class="hero-slide" style="--k:${((alt[a.id] || 1.5) / hMax).toFixed(3)}"><img ${k ? 'data-src' : 'src'}="${img(a)}" alt="${a.marca} ${a.modello}" draggable="false" decoding="async"></div>`).join('')}</div><button class="hero-arrow next" type="button" aria-label="Auto successiva">›</button>`;
      const track = $('.hero-track', car);
      // la prima auto arriva subito, le altre appena dopo (così scorrendo non c'è mai un vuoto)
      const rest = () => $$('img[data-src]', track).forEach((im) => { im.src = im.dataset.src; im.removeAttribute('data-src'); });
      const first = $('img', track); if (first.complete) rest(); else { first.addEventListener('load', rest, { once: true }); first.addEventListener('error', rest, { once: true }); }
      $('#hero-models').innerHTML = list.map((a, k) => `<button class="hero-model ${k === 0 ? 'on' : ''}" data-k="${k}" type="button" aria-label="${a.marca} ${a.modello}"><img src="${img(a, '', '-sm')}" alt="">${a.modello}</button>`).join('');
      const draw = () => {
        const a = list[i]; const p = LF.prezzo(a, 'lungo');
        $('#hero-name').textContent = `${a.marca} ${a.modello}`;
        $('#hero-meta').innerHTML = `<span>da <b>€${eur(p.unit)}/mese</b>${p.pct ? ` <s>€${eur(p.pieno)}</s>` : ''}</span><span class="sep"></span><span>${LF.disp(a)}</span><span class="sep"></span><span><a class="link" href="auto.html?id=${a.id}">Scopri ${a.modello}</a></span>`;
        $$('.hero-model').forEach((t, k) => t.classList.toggle('on', k === i));
        $('.prev', car).disabled = i === 0; $('.next', car).disabled = i === list.length - 1;
      };
      const show = (n) => { n = Math.max(0, Math.min(list.length - 1, n)); track.scrollTo({ left: n * track.clientWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); };
      track.addEventListener('scroll', () => { const n = Math.round(track.scrollLeft / track.clientWidth); if (n !== i && list[n]) { i = n; draw(); } }, { passive: true });
      addEventListener('resize', () => { track.scrollLeft = i * track.clientWidth; });
      // col mouse: trascina l'auto a destra o a sinistra
      let x0 = null;
      track.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse' && e.button === 0) { x0 = e.clientX; e.preventDefault(); } });
      addEventListener('pointerup', (e) => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1)); });
      $('.prev', car).addEventListener('click', () => show(i - 1));
      $('.next', car).addEventListener('click', () => show(i + 1));
      $('#hero-models').addEventListener('click', (e) => { const b = e.target.closest('.hero-model'); if (b) show(+b.dataset.k); });
      draw();
      // ricerca
      let fTipo = 'lungo';
      LF.segDurata($('#finder-seg'), fTipo, (t) => { fTipo = t; });
      $('#finder-sede').innerHTML = '<option value="">Tutte le sedi</option>' + LF.sedi.map((s) => `<option value="${s.id}">${s.citta}</option>`).join('');
      $('#finder-cat').innerHTML = '<option value="">Tutte le auto</option>' + LF.categorie.map((c) => `<option value="${c.id}">${c.nome}</option>`).join('');
      $('#finder-data').value = new Date().toISOString().slice(0, 10); $('#finder-data').min = $('#finder-data').value;
      $('#finder').addEventListener('submit', (e) => { e.preventDefault(); const q = new URLSearchParams({ tipo: fTipo }); if ($('#finder-sede').value) q.set('sede', $('#finder-sede').value); if ($('#finder-cat').value) q.set('cat', $('#finder-cat').value); location.href = 'flotta.html?' + q; });
      // griglia: selettore formula vicino ai prezzi
      let cat = 'top', tipo = LF.durata;
      LF.segDurata($('#grid-seg'), tipo, (t) => { tipo = t; store.set('lf-durata', t); drawGrid(); });
      const chips = $('#home-chips');
      chips.innerHTML = [['top', 'Le più richieste', 'star'], ['promo', 'In offerta', 'tag'], ...LF.categorie.map((c) => [c.id, c.nome, c.icon])].map(([v, t, ic]) => `<button class="chip ${v === cat ? 'on' : ''}" data-v="${v}">${I[ic] || ''}${t}</button>`).join('');
      chips.addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (!b) return; cat = b.dataset.v; $$('.chip', chips).forEach((c) => c.classList.toggle('on', c === b)); drawGrid(); });
      function drawGrid() {
        let l = cat === 'top' ? LF.auto.filter((a) => a.top) : cat === 'promo' ? LF.auto.filter((a) => a.promo) : LF.auto.filter((a) => a.categoria === cat);
        LF.renderGrid($('#home-grid'), l.sort((x, y) => x.prezzi.lungo - y.prezzi.lungo).slice(0, 6), tipo);
        $('#home-all').href = $('#home-all-2').href = `flotta.html?tipo=${tipo}${cat !== 'top' && cat !== 'promo' ? '&cat=' + cat : ''}`;
      }
      drawGrid();
      const g = LF.gallery($('#home-3d'), byId('bmw-x5'));
      $('#home-3d-int').addEventListener('click', () => g.open('int'));
      $('#home-3d-ext').addEventListener('click', () => g.open('ext'));
    },

    flotta() {
      const q = new URLSearchParams(location.search);
      const st = { tipo: LF.durata, cat: q.get('cat') || '', sede: q.get('sede') || '', pronta: q.get('pronta') === '1', promo: q.get('promo') === '1', d3: false, ord: 'prezzo', alim: '', cambio: '', max: 0 };
      LF.segDurata($('#fleet-seg'), st.tipo, (t) => { st.tipo = t; store.set('lf-durata', t); setRange(); draw(); });
      const chips = $('#fleet-chips');
      chips.className = 'catbar';
      chips.innerHTML = `<button class="cb ${st.cat ? '' : 'on'}" data-v="" aria-pressed="${!st.cat}"><span class="cb-img cb-all">${LF.auto.length}</span><b>Tutti</b></button>` + catInfo().map((c) => `<button class="cb ${c.id === st.cat ? 'on' : ''}" data-v="${c.id}" aria-pressed="${c.id === st.cat}"><span class="cb-img"><img src="assets/img/car/${c.img}-sm.webp" alt="" loading="lazy"></span><b>${c.nome}</b><small>${c.n}</small></button>`).join('');
      chips.addEventListener('click', (e) => { const b = e.target.closest('.cb'); if (!b) return; st.cat = b.dataset.v; $$('.cb', chips).forEach((c) => { c.classList.toggle('on', c === b); c.setAttribute('aria-pressed', c === b); }); draw(); { const tb = $('.toolbar'), y = $('#fleet-grid').getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(tb).top) || 0) - tb.offsetHeight - 16; if (scrollY > y) scrollTo({ top: y, behavior: 'smooth' }); } });
      { const on = $('.cb.on', chips); if (on && on.offsetLeft > chips.clientWidth - 120) chips.scrollLeft = on.offsetLeft - 24; }
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
      // pannello filtri su telefono
      const side = $('.fleet-side'); let bg;
      const openSheet = () => { side.classList.add('sheet'); bg = document.createElement('div'); bg.className = 'sheet-bg'; bg.addEventListener('click', closeSheet); document.body.appendChild(bg); document.body.style.overflow = 'hidden'; };
      const closeSheet = () => { side.classList.remove('sheet'); if (bg) bg.remove(); document.body.style.overflow = ''; };
      $('#filter-open').addEventListener('click', openSheet);
      $$('[data-sheet-close]').forEach((b) => b.addEventListener('click', closeSheet));
      const phone = matchMedia('(max-width: 734px)');
      phone.addEventListener('change', () => draw());
      $('#fleet-grid').addEventListener('click', (e) => { const b = e.target.closest('.grid-all'); if (b) $(`.cb[data-v="${b.dataset.cat}"]`, chips).click(); });
      $('#f-reset').addEventListener('click', () => {
        Object.assign(st, { sede: '', pronta: false, promo: false, d3: false, alim: '', cambio: '' });
        ['#fleet-pronta', '#fleet-promo', '#fleet-3d'].forEach((s) => { $(s).checked = false; });
        $$('.fleet-side .opts').forEach((o) => $$('.opt', o).forEach((x, i) => x.classList.toggle('on', i === 0)));
        setRange(); draw();
      });
      function draw() {
        const l = LF.auto.filter((a) => (!st.cat || a.categoria === st.cat) && (!st.sede || a.sedi.includes(st.sede)) && (!st.pronta || (a.consegna === 0 && !a.arrivo)) && (!st.promo || a.promo) && (!st.d3 || LF.modelli3d[a.id]) && (!st.alim || a.alim === st.alim) && (!st.cambio || a.cambio === st.cambio) && (!st.max || LF.prezzo(a, st.tipo).unit <= st.max));
        const P = (a) => LF.prezzo(a, st.tipo).unit;
        l.sort(st.ord === 'prezzo-desc' ? (x, y) => P(y) - P(x) : st.ord === 'consegna' ? (x, y) => x.consegna - y.consegna || P(x) - P(y) : st.ord === 'potenza' ? (x, y) => y.cv - x.cv : (x, y) => P(x) - P(y));
        l.sort((x, y) => (x.arrivo ? 1 : 0) - (y.arrivo ? 1 : 0));
        const n = `${l.length} ${st.cat === 'moto' ? (l.length === 1 ? 'moto' : 'moto e scooter') : st.cat === 'furgone' ? (l.length === 1 ? 'furgone' : 'furgoni') : st.cat ? 'auto' : (l.length === 1 ? 'veicolo' : 'veicoli')}`;
        const h1 = $('.page-head h1'); if (h1) h1.textContent = st.cat === 'moto' ? 'Scegli la tua moto.' : st.cat === 'furgone' ? 'Scegli il tuo furgone.' : st.cat ? 'Scegli la tua auto.' : 'Scegli il tuo veicolo.';
        $('#fleet-count').textContent = n; $('#sheet-count').textContent = `Mostra ${n}`;
        const active = ['sede', 'alim', 'cambio', 'pronta', 'promo', 'd3', 'max'].filter((k) => st[k]).length;
        $('#filter-open').innerHTML = `${I.filter}Filtri${active ? ` (${active})` : ''}`;
        $('#fleet-note').textContent = st.tipo === 'lungo' ? 'Canoni IVA inclusa · 36 mesi · 15.000 km/anno · anticipo zero' : st.tipo === 'medio' ? 'Canoni IVA inclusa · 2.500 km/mese · tutto incluso' : 'Tariffe IVA inclusa · 250 km/giorno · tutto incluso';
        const grp = phone.matches
          ? LF.categorie.map((c) => [c.nome, l.filter((a) => a.categoria === c.id), c.id])
          : [['Auto', l.filter((a) => !['furgone', 'moto'].includes(a.categoria))], ['Furgoni', l.filter((a) => a.categoria === 'furgone')], ['Moto e scooter', l.filter((a) => a.categoria === 'moto')]];
        const rows = phone.matches && !st.cat && grp.filter((g) => g[1].length).length > 1;
        $('#fleet-grid').classList.toggle('rows', rows);
        LF.renderGrid($('#fleet-grid'), l, st.tipo, { tiles: !st.cat && !active, groups: st.cat ? null : grp, rows, noSwipe: true });
        if (st.sede) {
          const altrove = LF.auto.filter((a) => !a.sedi.includes(st.sede) && (!st.cat || a.categoria === st.cat)).length;
          if (altrove) $('#fleet-grid').insertAdjacentHTML('beforeend', `<div class="fleet-more"><div><b>Altri ${altrove} ${altrove === 1 ? 'veicolo è' : 'veicoli sono'} in altre sedi.</b><p>Possiamo portarli a ${sedeNome(st.sede)} in 2–3 giorni. Lasciaci il numero, ti chiamiamo noi.</p></div><button type="button" class="btn btn-dark btn-sm" data-lead-open data-sede="${st.sede}">Lasciaci il numero</button></div>`);
        }
        $('#f-reset').hidden = !active;
        const u = new URLSearchParams({ tipo: st.tipo }); if (st.cat) u.set('cat', st.cat); if (st.sede) u.set('sede', st.sede); if (st.pronta) u.set('pronta', '1'); if (st.promo) u.set('promo', '1');
        history.replaceState(null, '', '?' + u);
      }
      draw();
    },

    auto() {
      const a = byId(new URLSearchParams(location.search).get('id')) || byId('mercedes-c');
      document.title = `${a.marca} ${a.modello} a noleggio · LOCAFIT Rent`;
      $('#crumb-name').textContent = `${a.marca} ${a.modello}`;
      $('#d-marca').textContent = `${a.marca} · ${catNome(a.categoria)}`;
      $('#d-modello').textContent = a.modello; $('#d-versione').textContent = a.versione;
      $('#d-badges').innerHTML = `${a.promo ? `<span class="badge badge-red">${LF.promo.nome} −${Math.round(a.promo * 100)}%</span>` : ''}${LF.modelli3d[a.id] ? '<span class="badge badge-grey">Tour 3D</span>' : ''}`;
      $('.disp').innerHTML = `${LF.status(a)}<span>· ${a.arrivo ? 'lasciaci il numero, ti chiamiamo noi' : a.consegna === 0 ? `in sede a ${a.sedi.map(sedeNome).join(', ')}` : 'consegna anche a domicilio'}</span>`;
      $('#d-specs').innerHTML = [['Potenza', a.cv + ' CV'], (a.categoria === 'moto' ? ['Patente', a.patente] : ['0–100 km/h', String(a.acc).replace('.', ',') + ' s']), ['Alimentazione', a.alim], ['Cambio', a.cambio], ['Posti', a.posti], ['Disponibile a', a.sedi.map(sedeNome).join(', ')], ['Consegna', LF.disp(a)], ['Km inclusi', '15.000/anno']].map(([k, v]) => `<div><small>${k}</small><b>${v}</b></div>`).join('');
      LF.gallery($('#d-gallery'), a);
      const st = { tipo: LF.durata, giorni: 3, mesi: 3, durata: 36, km: 15, anticipo: 0 };
      const box = $('#cfg-opts');
      LF.segDurata($('#cfg-seg'), st.tipo, (t) => { st.tipo = t; store.set('lf-durata', t); opts(); calc(); });
      const pills = (key, vals, fmt) => `<div class="pills" data-k="${key}">${vals.map((v) => `<button type="button" class="pill ${st[key] === v ? 'on' : ''}" data-v="${v}">${fmt(v)}</button>`).join('')}</div>`;
      function opts() {
        if (st.tipo === 'breve') { box.innerHTML = `<div><div class="opt-label">Giorni <output id="o-g">${st.giorni}</output></div><input type="range" min="1" max="30" value="${st.giorni}" id="r-g" aria-label="Giorni"></div>`; $('#r-g').addEventListener('input', (e) => { st.giorni = +e.target.value; $('#o-g').textContent = st.giorni; calc(); }); }
        else if (st.tipo === 'medio') { box.innerHTML = `<div><div class="opt-label">Mesi <output id="o-m">${st.mesi}</output></div><input type="range" min="1" max="12" value="${st.mesi}" id="r-m" aria-label="Mesi"></div>`; $('#r-m').addEventListener('input', (e) => { st.mesi = +e.target.value; $('#o-m').textContent = st.mesi; calc(); }); }
        else {
          box.innerHTML = `<div><div class="opt-label">Durata</div>${pills('durata', [24, 36, 48, 60], (v) => v + ' mesi')}</div><div><div class="opt-label">Km all’anno</div>${pills('km', [10, 15, 20, 30], (v) => v + '.000')}</div><div><div class="opt-label">Anticipo</div>${pills('anticipo', [0, 2000, 5000], (v) => (v ? '€' + eur(v) : 'Zero'))}</div>`;
          $$('.pills', box).forEach((p) => p.addEventListener('click', (e) => { const b = e.target.closest('.pill'); if (!b) return; st[p.dataset.k] = +b.dataset.v; $$('.pill', p).forEach((x) => x.classList.toggle('on', x === b)); calc(); }));
        }
      }
      function calc() {
        const p = LF.prezzo(a, st.tipo, st); const d = LF.durate[st.tipo];
        $('#t-now').innerHTML = `${p.pct ? `<s>€${eur(p.pieno)}</s>` : ''}<b>€${eur(p.unit)}</b>`;
        $('#t-unit').textContent = d.unita + ' · IVA inclusa';
        $('#t-side').innerHTML = st.tipo === 'lungo' ? `<small>IVA esclusa</small><b>€${eur(p.unit / 1.22)}${d.unita}</b>` : `<small>Totale ${st.tipo === 'breve' ? st.giorni + (st.giorni === 1 ? ' giorno' : ' giorni') : st.mesi + (st.mesi === 1 ? ' mese' : ' mesi')}</small><b>€${eur(p.tot)}</b>`;
        $('#cfg-promo').style.display = p.pct ? '' : 'none';
        if (p.pct) $('#cfg-promo').innerHTML = `<span>${LF.promo.nome}: risparmi <b>€${eur(p.pieno - p.unit)}</b>${d.unita}</span><span class="code" style="padding:4px 8px;font-size:12px">${LF.promo.codice}</span>`;
        const href = 'prenota.html?' + new URLSearchParams({ id: a.id, tipo: st.tipo, giorni: st.giorni, mesi: st.mesi, durata: st.durata, km: st.km, anticipo: st.anticipo });
        if (!a.arrivo) { $('#cfg-go').href = href; $('#bar-go').href = href; }
        $('#bar-price').innerHTML = `<b>€${eur(p.unit)}</b><span class="muted" style="font-size:14px">${d.unita}</span><small>${a.marca} ${a.modello} · ${d.nome}</small>`;
        $('#cfg-wa').href = LF.waLink(`Ciao LOCAFIT Rent! Mi interessa ${a.marca} ${a.modello} a noleggio ${d.nome.toLowerCase()} a €${eur(p.unit)}${d.unita}. È disponibile?`);
      }
      $('#cfg-lead').addEventListener('click', () => LF.openLead({ id: a.id, tipo: st.tipo, title: `${a.marca} ${a.modello}`, kicker: 'Parla con un consulente' }));
      opts(); calc();
      if (a.arrivo) [['#cfg-go', 'Avvisami quando arriva'], ['#bar-go', 'Avvisami']].forEach(([s, t]) => { const b = $(s); b.textContent = t; b.dataset.leadOpen = ''; b.dataset.id = a.id; b.setAttribute('role', 'button'); b.removeAttribute('href'); b.tabIndex = 0; b.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); b.click(); } }); });
      // barra fissa in basso quando il pulsante del configuratore non è visibile (telefono/tablet)
      const bar = $('#order-bar'); const go = $('#cfg-go');
      if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { const show = !e.isIntersecting && innerWidth < 1024; bar.classList.toggle('show', show); document.body.classList.toggle('has-bar', show); }).observe(go);
      const sim = LF.auto.filter((x) => x.id !== a.id && x.categoria === a.categoria).slice(0, 4);
      LF.renderGrid($('#simili'), sim.length >= 3 ? sim.slice(0, 3) : LF.auto.filter((x) => x.id !== a.id && x.top).slice(0, 3), st.tipo);
    },

    offerte() {
      const l = LF.auto.filter((a) => a.promo).sort((x, y) => y.promo - x.promo);
      LF.renderGrid($('#offers'), l, 'lungo');
      $('#codes').innerHTML = LF.codici.map((c) => `<div class="code-card"><span class="eyebrow grey">${LF.durate[c.tipo].nome} · scade ${c.scade}</span><h3>${c.titolo}</h3><p>${c.desc}</p><div class="row"><button class="code" data-copy="${c.code}">${c.code}</button><a class="link" href="flotta.html?tipo=${c.tipo}">Usalo ora</a></div></div>`).join('');
    },

    noleggio() {
      const t = document.body.dataset.tipo; LF.durata = t;
      const l = [...LF.auto].filter((a) => a.categoria !== 'furgone' || t !== 'lungo').sort((x, y) => x.prezzi[t] - y.prezzi[t]);
      const pick = []; LF.categorie.forEach((c) => { const f = l.find((a) => a.categoria === c.id); if (f) pick.push(f); });
      l.forEach((a) => { if (pick.length < 8 && !pick.includes(a)) pick.push(a); });
      LF.renderGrid($('#tipo-grid'), pick.slice(0, 6), t);
      const calc = $('#mini-calc');
      if (calc) {
        const sel = $('#mc-car'); sel.innerHTML = LF.auto.map((a) => `<option value="${a.id}">${a.marca} ${a.modello}</option>`).join(''); sel.value = calc.dataset.default || LF.auto[0].id;
        const rng = $('#mc-r');
        const draw = () => { const a = byId(sel.value); const n = +rng.value; const p = LF.prezzo(a, t, t === 'breve' ? { giorni: n } : { mesi: n, durata: n }); $('#mc-n').textContent = n + (t === 'breve' ? (n === 1 ? ' giorno' : ' giorni') : ' mesi'); $('#mc-o').innerHTML = `${p.pct ? `<s class="muted" style="font-size:20px;font-weight:400">€${eur(p.pieno)}</s> ` : ''}€${eur(p.unit)}<span class="muted" style="font-size:19px;font-weight:400">${LF.durate[t].unita}</span>`; $('#mc-tot').textContent = t === 'breve' ? `Totale €${eur(p.tot)}` : t === 'medio' ? `Totale periodo €${eur(p.tot)}` : 'Anticipo zero, tutto incluso'; $('#mc-car-img').innerHTML = LF.carShot(a, '-sm'); $('#mc-go').href = `prenota.html?id=${a.id}&tipo=${t}&giorni=${n}&mesi=${n}&durata=${n}`; };
        sel.addEventListener('change', draw); rng.addEventListener('input', draw); draw();
      }
    },

    faq() {
      const cats = [...new Set(LF.faq.map((f) => f.c))];
      $('#faq-cats').innerHTML = cats.map((c) => `<a href="#faq-${c}">${c}</a>`).join('') + '<a href="contatti.html">Contattaci</a>';
      $('#faq-all').innerHTML = cats.map((c) => `<div id="faq-${c}" style="scroll-margin-top:90px;margin-bottom:48px"><h2 style="font-size:28px;margin-bottom:8px">${c}</h2><div class="faq">${LF.faq.filter((f) => f.c === c).map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></div>`).join('');
    },
  };
  (init[page] || (() => {}))();
  $$('.tiles, .steps, .inclusi, .reviews, .sedi-grid, #codes').forEach((el) => LF.swipe(el));
})();
