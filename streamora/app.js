(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const C = window.CATALOG;
  const byId = id => C.find(t => t.id === +id);

  // ---------- Armazenamento seguro ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* modo privado */ } }
  };
  let profile = null;
  const lk = () => `streamora:list:${profile.id}`;
  const getList = () => store.get(lk(), []);
  const inList = id => getList().includes(+id);
  const progress = () => store.get(`streamora:prog:${profile.id}`, { 2: 62, 6: 30, 19: 80 });

  // ---------- Utilitários ----------
  const esc = s => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  function rng(seed) { let s = seed * 9301 + 49297; return () => (s = (s * 9301 + 49297) % 233280) / 233280; }

  // Arte gerada: gradiente + formas geométricas determinísticas por título
  const artCache = new Map();
  function art(t, w = 640, h = 360) {
    const key = `${t.id}:${w}`;
    if (artCache.has(key)) return artCache.get(key);
    const r = rng(t.id), h1 = t.hue, h2 = (t.hue + 45) % 360;
    let shapes = '';
    for (let i = 0; i < 7; i++) {
      const x = r() * w, y = r() * h, s = (0.1 + r() * 0.35) * h, o = (0.06 + r() * 0.16).toFixed(2);
      shapes += i % 2
        ? `<circle cx="${x | 0}" cy="${y | 0}" r="${s | 0}" fill="hsl(${h2} 90% 70%)" opacity="${o}"/>`
        : `<rect x="${x | 0}" y="${y | 0}" width="${s * 1.6 | 0}" height="${s | 0}" rx="${s / 6 | 0}" transform="rotate(${r() * 60 - 30 | 0} ${x | 0} ${y | 0})" fill="hsl(${h1} 90% 75%)" opacity="${o}"/>`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${h1} 70% 38%)"/><stop offset="1" stop-color="hsl(${h2} 65% 10%)"/></linearGradient></defs>
      <rect width="${w}" height="${h}" fill="url(#g)"/>${shapes}</svg>`;
    const uri = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    artCache.set(key, uri);
    return uri;
  }

  let toastT;
  function toast(msg) {
    const el = $('#toast'); el.textContent = msg; el.style.opacity = 1;
    clearTimeout(toastT); toastT = setTimeout(() => (el.style.opacity = 0), 2200);
  }

  const icons = {
    play: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>',
    plus: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>',
    info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/></svg>',
    close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    left: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg>',
    right: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>'
  };
  const circleBtn = 'w-9 h-9 grid place-items-center rounded-full border-2 border-white/60 hover:border-white bg-black/50 transition';

  // ---------- Perfis ----------
  function renderProfiles() {
    $('#profileList').innerHTML = window.PROFILES.map(p => `
      <li><button data-profile="${p.id}" class="group flex flex-col items-center gap-3 w-28 sm:w-36">
        <span class="w-28 h-28 sm:w-36 sm:h-36 rounded-md grid place-items-center text-5xl font-bold ring-0 group-hover:ring-4 group-focus-visible:ring-4 ring-white transition"
              style="background:linear-gradient(135deg,${p.from},${p.to})">${esc(p.name[0])}</span>
        <span class="text-white/60 group-hover:text-white">${esc(p.name)}</span></button></li>`).join('');
  }

  function enter(p) {
    profile = p; store.set('streamora:profile', p.id);
    $('#profiles').classList.add('hidden'); $('#app').classList.remove('hidden');
    const b = $('#switchProfile'); b.textContent = p.name[0]; b.style.background = `linear-gradient(135deg,${p.from},${p.to})`;
    show('home'); window.scrollTo(0, 0);
  }

  // ---------- Hero ----------
  const featured = [6, 17, 1, 20].map(byId);
  let heroIdx = 0, heroTimer;
  function renderHero(t) {
    const h = $('#hero');
    h.innerHTML = `
      <img src="${art(t, 1600, 900)}" alt="" class="absolute inset-0 w-full h-full object-cover fade-in">
      <div class="hero-shade absolute inset-0"></div>
      <div class="absolute bottom-32 sm:bottom-40 left-4 sm:left-12 max-w-xl fade-in">
        <p class="text-xs tracking-[.3em] text-white/70 mb-2">${t.type === 'Série' ? 'SÉRIE' : 'FILME'} STREAMORA</p>
        <h1 class="text-4xl sm:text-6xl font-extrabold leading-tight drop-shadow-lg">${esc(t.title)}</h1>
        <p class="mt-3 text-sm sm:text-base text-white/85 line-clamp-3">${esc(t.desc)}</p>
        <div class="mt-5 flex gap-3">
          <button data-play="${t.id}" class="flex items-center gap-2 bg-white text-black font-semibold px-5 sm:px-7 py-2 rounded hover:bg-white/80 transition">${icons.play} Assistir</button>
          <button data-info="${t.id}" class="flex items-center gap-2 bg-white/25 backdrop-blur px-5 sm:px-7 py-2 rounded font-semibold hover:bg-white/35 transition">${icons.info} Mais informações</button>
        </div>
      </div>
      <div class="absolute bottom-28 sm:bottom-36 right-4 sm:right-12 flex gap-2" role="tablist" aria-label="Destaques">
        ${featured.map((f, i) => `<button role="tab" aria-selected="${i === heroIdx}" aria-label="${esc(f.title)}" data-hero="${i}" class="h-1.5 rounded-full transition-all ${i === heroIdx ? 'w-8 bg-white' : 'w-4 bg-white/40'}"></button>`).join('')}
      </div>`;
  }
  function startHero() {
    clearInterval(heroTimer);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    heroTimer = setInterval(() => { heroIdx = (heroIdx + 1) % featured.length; renderHero(featured[heroIdx]); }, 8000);
  }

  // ---------- Cards e fileiras ----------
  function card(t, opts = {}) {
    const prog = opts.progress;
    return `
      <div class="card relative shrink-0 w-[42vw] sm:w-60 lg:w-64 rounded-md overflow-hidden bg-panel snap-start" data-card="${t.id}">
        <button data-info="${t.id}" class="block w-full text-left" aria-label="${esc(t.title)}, ${t.year}. Ver detalhes">
          <div class="relative aspect-video">
            <img src="${art(t)}" alt="" loading="lazy" class="w-full h-full object-cover">
            <span class="absolute left-2 bottom-2 right-2 font-bold text-sm sm:text-base leading-tight drop-shadow">${esc(t.title)}</span>
          </div>
          ${prog ? `<div class="h-1 bg-white/20"><div class="h-full bg-brand" style="width:${prog}%"></div></div>` : ''}
        </button>
        <div class="card-actions absolute inset-x-0 bottom-0 pt-10 p-2 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none [&>*]:pointer-events-auto">
          <div class="flex items-center gap-2">
            <button data-play="${t.id}" class="${circleBtn} !bg-white !text-black !border-white" aria-label="Assistir ${esc(t.title)}">${icons.play}</button>
            <button data-toggle="${t.id}" class="${circleBtn}" aria-label="${inList(t.id) ? 'Remover de' : 'Adicionar à'} minha lista: ${esc(t.title)}">${inList(t.id) ? icons.check : icons.plus}</button>
            <span class="ml-auto text-xs text-green-400 font-semibold">${t.match}% relevante</span>
          </div>
          <p class="mt-1.5 text-[11px] text-white/70">${ageBadge(t.age)} ${t.dur} · ${esc(t.genres[0])}</p>
        </div>
      </div>`;
  }
  const ageColors = { L: '#16a34a', '10': '#2563eb', '12': '#eab308', '14': '#f97316', '16': '#dc2626' };
  const ageBadge = a => `<span class="inline-block text-[10px] font-bold text-white px-1 rounded mr-1" style="background:${ageColors[a] || '#444'}">${a}</span>`;

  function row(title, items, opts) {
    if (!items.length) return '';
    return `
      <section class="group/row relative fade-in" aria-label="${esc(title)}">
        <h2 class="px-4 sm:px-12 mb-1 text-lg sm:text-xl font-semibold">${esc(title)}</h2>
        <div class="relative">
          <button data-scroll="-1" class="hidden sm:grid absolute left-0 top-0 bottom-0 w-12 z-30 place-items-center bg-black/50 opacity-0 group-hover/row:opacity-100 focus-visible:opacity-100 transition" aria-label="Rolar para a esquerda">${icons.left}</button>
          <div class="track flex gap-2 overflow-x-auto no-scrollbar snap-x px-4 sm:px-12 py-8 -my-4 scroll-smooth" tabindex="-1">
            ${items.map(t => card(t, opts && { progress: opts.prog && opts.prog[t.id] })).join('')}
          </div>
          <button data-scroll="1" class="hidden sm:grid absolute right-0 top-0 bottom-0 w-12 z-30 place-items-center bg-black/50 opacity-0 group-hover/row:opacity-100 focus-visible:opacity-100 transition" aria-label="Rolar para a direita">${icons.right}</button>
        </div>
      </section>`;
  }

  function grid(title, items, emptyMsg) {
    return `
      <section class="px-4 sm:px-12 pt-32 min-h-[70vh] fade-in" aria-label="${esc(title)}">
        <h2 class="text-2xl sm:text-3xl font-semibold mb-6">${esc(title)}</h2>
        ${items.length ? `<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 gap-y-6">${items.map(t => card(t).replace('shrink-0 w-[42vw] sm:w-60 lg:w-64', 'w-full')).join('')}</div>`
          : `<p class="text-white/60 mt-10">${emptyMsg}</p>`}
      </section>`;
  }

  // ---------- Navegação entre telas ----------
  let view = 'home';
  function show(v, q = '') {
    view = v;
    $$('.nav-link').forEach(b => {
      const on = b.dataset.view === v; b.classList.toggle('font-bold', on); b.classList.toggle('text-white', on); b.classList.toggle('text-white/70', !on);
      on ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current');
    });
    const hero = $('#hero'), rows = $('#rows');
    const heroOn = v === 'home';
    hero.classList.toggle('hidden', !heroOn); rows.classList.toggle('-mt-24', heroOn); rows.classList.toggle('sm:-mt-32', heroOn);
    clearInterval(heroTimer);

    if (v === 'home') {
      renderHero(featured[heroIdx]); startHero();
      const prog = progress();
      const cont = Object.keys(prog).map(byId).filter(Boolean);
      const list = getList().map(byId).filter(Boolean);
      rows.innerHTML = row('Continuar assistindo', cont, { prog }) + row('Minha lista', list) +
        window.ROWS.map(r => row(r.title, r.pick(C).filter(Boolean))).join('');
    } else if (v === 'Série' || v === 'Filme') {
      rows.innerHTML = grid(v === 'Série' ? 'Séries' : 'Filmes', C.filter(t => t.type === v));
    } else if (v === 'list') {
      rows.innerHTML = grid('Minha lista', getList().map(byId).filter(Boolean), 'Sua lista está vazia. Use o botão + em qualquer título para salvar aqui.');
    } else if (v === 'search') {
      // Cada palavra da busca precisa ser o início de alguma palavra do título (evita "ação" casar com "estação")
      const toks = norm(q).split(/\s+/).filter(Boolean);
      const res = C.filter(t => {
        const words = norm([t.title, t.type, t.genres.join(' '), t.cast.join(' '), t.desc].join(' ')).split(/[^a-z0-9]+/);
        return toks.every(k => words.some(w => w.startsWith(k)));
      });
      rows.innerHTML = grid(`Resultados para “${q}”`, res, 'Nada encontrado. Tente outro título, gênero ou nome do elenco.');
    }
    $('#listCount').textContent = getList().length;
  }

  // ---------- Modal ----------
  let lastFocus = null;
  function openModal(id) {
    const t = byId(id); if (!t) return;
    lastFocus = document.activeElement;
    const sim = C.filter(x => x.id !== t.id && x.genres.some(g => t.genres.includes(g))).slice(0, 6);
    $('#modalBody').innerHTML = `
      <div class="relative aspect-video">
        <img src="${art(t, 1280, 720)}" alt="" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent"></div>
        <button data-close class="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-black/70 hover:bg-black" aria-label="Fechar">${icons.close}</button>
        <div class="absolute bottom-4 left-5 right-5">
          <h2 id="mTitle" class="text-3xl sm:text-4xl font-extrabold drop-shadow">${esc(t.title)}</h2>
          <div class="mt-3 flex gap-2 items-center">
            <button data-play="${t.id}" class="flex items-center gap-2 bg-white text-black font-semibold px-6 py-2 rounded hover:bg-white/80">${icons.play} Assistir</button>
            <button data-toggle="${t.id}" class="${circleBtn}" aria-label="Alternar minha lista">${inList(t.id) ? icons.check : icons.plus}</button>
          </div>
        </div>
      </div>
      <div class="p-5 sm:p-8 grid sm:grid-cols-[2fr_1fr] gap-6">
        <div>
          <p class="text-sm flex flex-wrap items-center gap-x-3 gap-y-1"><span class="text-green-400 font-semibold">${t.match}% relevante</span><span>${t.year}</span>${ageBadge(t.age)}<span>${t.dur}</span><span class="border border-white/40 px-1 text-[10px] rounded">HD</span></p>
          <p class="mt-4 leading-relaxed text-white/90">${esc(t.desc)}</p>
        </div>
        <dl class="text-sm space-y-2">
          <div><dt class="inline text-white/50">Elenco: </dt><dd class="inline">${t.cast.map(esc).join(', ')}</dd></div>
          <div><dt class="inline text-white/50">Gêneros: </dt><dd class="inline">${t.genres.map(esc).join(', ')}</dd></div>
          <div><dt class="inline text-white/50">Tipo: </dt><dd class="inline">${t.type}</dd></div>
        </dl>
      </div>
      ${sim.length ? `<div class="px-5 sm:px-8 pb-8"><h3 class="text-xl font-semibold mb-3">Títulos semelhantes</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">${sim.map(s => `
          <button data-info="${s.id}" class="text-left bg-black/30 rounded-md overflow-hidden hover:ring-2 ring-white/70 transition">
            <img src="${art(s)}" alt="" loading="lazy" class="aspect-video w-full object-cover">
            <span class="block p-2 text-sm font-medium">${esc(s.title)}</span></button>`).join('')}</div></div>` : ''}`;
    const m = $('#modal'); m.classList.remove('hidden'); document.body.style.overflow = 'hidden';
    $('[data-close]', m).focus(); m.scrollTop = 0;
  }
  function closeModal() {
    $('#modal').classList.add('hidden'); document.body.style.overflow = '';
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }

  // ---------- Ações ----------
  function toggleList(id) {
    const l = getList(), i = l.indexOf(+id);
    i > -1 ? l.splice(i, 1) : l.push(+id);
    store.set(lk(), l);
    toast(i > -1 ? 'Removido da sua lista' : 'Adicionado à sua lista');
    $('#listCount').textContent = l.length;
    // Atualiza botões visíveis sem recarregar a tela inteira
    $$(`[data-toggle="${id}"]`).forEach(b => (b.innerHTML = i > -1 ? icons.plus : icons.check));
    if (view === 'list' && i > -1) show('list');
  }
  function play(id) {
    const t = byId(id), p = progress();
    p[t.id] = Math.min(95, (p[t.id] || 0) + 10);
    store.set(`streamora:prog:${profile.id}`, p);
    toast(`▶ Reproduzindo “${t.title}” (demonstração, sem vídeo)`);
  }

  // ---------- Eventos ----------
  document.addEventListener('click', e => {
    const q = a => e.target.closest(`[${a}]`);
    let el;
    if ((el = q('data-profile'))) return enter(window.PROFILES.find(p => p.id === el.dataset.profile));
    if ((el = q('data-toggle'))) return toggleList(el.dataset.toggle);
    if ((el = q('data-play'))) return play(el.dataset.play);
    if ((el = q('data-info'))) return openModal(el.dataset.info);
    if ((el = q('data-hero'))) { heroIdx = +el.dataset.hero; renderHero(featured[heroIdx]); return startHero(); }
    if ((el = q('data-scroll'))) { const tr = $('.track', el.parentElement); return tr.scrollBy({ left: el.dataset.scroll * tr.clientWidth * 0.85 }); }
    if (q('data-close') || e.target.id === 'modal') {
      closeModal();
      if (view === 'home') show('home'); // reflete mudanças da lista e do progresso
      return;
    }
    if ((el = q('data-view'))) { $('#searchInput').value = ''; show(el.dataset.view); window.scrollTo(0, 0); return; }
    if (e.target.closest('#logo')) { e.preventDefault(); show('home'); window.scrollTo(0, 0); }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !$('#modal').classList.contains('hidden')) { closeModal(); if (view === 'home') show('home'); }
    if (e.key === 'Tab' && !$('#modal').classList.contains('hidden')) { // prende o foco no modal
      const f = $$('button, [href], input', $('#modal')).filter(x => !x.disabled);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  $('#searchBtn').addEventListener('click', () => $('#searchInput').focus());
  $('#searchForm').addEventListener('submit', e => e.preventDefault());
  let st;
  $('#searchInput').addEventListener('input', e => {
    clearTimeout(st);
    st = setTimeout(() => { const v = e.target.value.trim(); v ? show('search', v) : show('home'); }, 200);
  });
  $('#switchProfile').addEventListener('click', () => {
    $('#app').classList.add('hidden'); $('#profiles').classList.remove('hidden'); clearInterval(heroTimer);
    try { localStorage.removeItem('streamora:profile'); } catch { /* ignora */ }
  });
  addEventListener('scroll', () => $('#nav').classList.toggle('bg-ink', scrollY > 40), { passive: true });

  // ---------- Início ----------
  renderProfiles();
  const saved = store.get('streamora:profile', null);
  const sp = window.PROFILES.find(p => p.id === saved);
  if (sp) enter(sp);
})();
