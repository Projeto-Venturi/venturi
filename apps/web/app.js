// ============================================================
// Venturi — router + chrome (navbar / sidebar / drawer / tabbar)
// ============================================================

function pathToRegex(path) {
  const paramNames = [];
  const pattern = path
    .replace(/[.]/g, '\\.')
    .replace(/:([^/]+)/g, (_, name) => { paramNames.push(name); return '([^/]+)'; });
  return { regex: new RegExp('^' + pattern + '$'), paramNames };
}

function sampleRoute(path) {
  return path
    .replace(':id', '1')
    .replace(':token', 'abc123tok')
    .replace(':categoria', 'financeiro');
}

// Finds the page matching the current hash AND extracts named params
// (e.g. '/comunidade/forum/marketing' → { categoria: 'marketing' })
// so a page's render(params) can use them instead of showing static data.
function findPage(hashPath) {
  for (const p of PAGES) {
    const { regex, paramNames } = pathToRegex(p.path);
    const m = hashPath.match(regex);
    if (m) {
      const params = {};
      paramNames.forEach((name, i) => params[name] = m[i + 1]);
      return { page: p, params };
    }
  }
  return { page: PAGES[0], params: {} };
}

function topSection(hashPath) {
  if (hashPath.startsWith('/precificacao')) return 'precificacao';
  if (hashPath.startsWith('/comunidade')) return 'comunidade';
  if (hashPath === '/perfil' || hashPath.startsWith('/perfil/') || hashPath === '/configuracoes') return 'conta';
  return 'organizacao';
}

const els = {};

function renderNavbarRight(page) {
  if (page.chrome === 'public') {
    els.navbarRight.innerHTML = `
      <a href="#/login" class="btn btn-ghost btn-sm" style="color:#fff;">Entrar</a>
      <a href="#/cadastro" class="btn btn-accent btn-sm">Começar grátis</a>
    `;
    return;
  }
  els.navbarRight.innerHTML = `
    <button type="button" class="navbar-btn-ai" id="ai-btn">✨ SoloPlan AI</button>
    <button type="button" class="navbar-icon-btn" aria-label="Notificações">🔔<span class="navbar-badge" aria-hidden="true"></span></button>
    <button type="button" class="navbar-icon-btn" id="dark-btn" aria-label="Alternar modo escuro">🌙</button>
    <div class="navbar-account" id="navbar-account">
      <button type="button" class="avatar avatar-sm" title="Sua conta" id="avatar-btn" aria-haspopup="menu" aria-expanded="false" aria-label="Menu da conta">CM</button>
      <div class="account-menu" id="account-menu" role="menu">
        <a href="#/perfil/42" role="menuitem">👤 Perfil público</a>
        <a href="#/configuracoes" role="menuitem">⚙️ Configurações</a>
        <div class="hr" style="margin:4px 0;"></div>
        <a href="#/" class="text-secondary" role="menuitem">↪ Sair</a>
      </div>
    </div>
  `;
  document.getElementById('ai-btn').addEventListener('click', openAI);
  document.getElementById('dark-btn').addEventListener('click', toggleDark);
  document.getElementById('avatar-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    const menu = document.getElementById('account-menu');
    const isOpen = menu.classList.toggle('open');
    e.currentTarget.setAttribute('aria-expanded', String(isOpen));
  });
}

function renderSidebar(page, hashPath) {
  if (page.chrome !== 'app' || !page.module) {
    els.sidebar.innerHTML = '';
    els.sidebar.style.display = 'none';
    els.tabbar.classList.remove('enabled');
    document.body.classList.remove('has-tabbar');
    return;
  }
  els.sidebar.style.display = '';
  const mod = MODULES[page.module];
  els.sidebar.innerHTML = `
    <div class="sidebar-label">${mod.label}</div>
    ${mod.items.map(it => `
      <a class="sidebar-item ${hashPath === it.route ? 'active' : ''}" href="#${it.route}">
        <span class="sidebar-icon">${it.icon}</span>${it.label}
      </a>`).join('')}
  `;
  // mobile tab bar mirrors the same items (max 5)
  els.tabbar.innerHTML = mod.items.slice(0, 5).map(it => `
    <a class="tabbar-item ${hashPath === it.route ? 'active' : ''}" href="#${it.route}">
      <span>${it.icon}</span><span>${it.label}</span>
    </a>`).join('');
  els.tabbar.classList.add('enabled');
  document.body.classList.add('has-tabbar');
}

function renderNavbarModules(page, hashPath) {
  els.navbar.classList.toggle('public', page.chrome === 'public');
  const section = topSection(hashPath);
  els.navbarModules.querySelectorAll('a').forEach(a => {
    a.classList.toggle('active', page.chrome === 'app' && a.dataset.module === section);
  });
}

function renderContent(page, params) {
  const html = page.render(params);
  if (page.chrome === 'public' && page.split) {
    els.content.className = 'content public-content';
    els.content.innerHTML = `<div class="split-wrap">
      <div class="split-brand">
        <div style="max-width:360px;">
          <div class="t-h1" style="font-size:40px;">VENTURI</div>
          <p class="t-body-light" style="opacity:.85;margin-top:16px;">"Finalmente uma ferramenta que entende que eu sou a empresa inteira."</p>
        </div>
      </div>
      <div class="split-form">${html}</div>
    </div>`;
  } else if (page.chrome === 'public' && page.centered) {
    els.content.className = 'content public-content';
    els.content.innerHTML = `<div class="centered-wrap">${html}</div>`;
  } else if (page.chrome === 'public') {
    els.content.className = 'content public-content';
    els.content.innerHTML = `<div class="public-inner">${html}</div>`;
  } else if (page.chrome === 'bare') {
    els.content.className = 'content bare-content';
    els.content.innerHTML = `<div class="bare-inner">${html}</div>`;
  } else {
    els.content.className = 'content' + (page.module ? '' : ' no-sidebar');
    els.content.innerHTML = html;
  }
}

function render() {
  const hashPath = (location.hash.slice(1) || '/').split('?')[0];
  const { page, params } = findPage(hashPath);
  document.title = 'Venturi — ' + page.title;
  renderNavbarModules(page, hashPath);
  renderNavbarRight(page);
  renderSidebar(page, hashPath);
  renderContent(page, params);
  closeSidebarMobile();
  window.scrollTo(0, 0);
  // Move focus to the new page content so keyboard/screen-reader users land
  // somewhere sensible after a route change, instead of staying on a link
  // that no longer exists in the DOM.
  els.content.focus({ preventScroll: true });
}

// ---------------- AI Drawer ----------------
function openAI() {
  els.aiDrawer.classList.add('open');
  els.aiOverlay.classList.add('open');
}
function closeAI() {
  els.aiDrawer.classList.remove('open');
  els.aiOverlay.classList.remove('open');
}

// ---------------- Mobile sidebar ----------------
function openSidebarMobile() {
  els.sidebar.classList.add('open');
  els.sidebarScrim.classList.add('open');
}
function closeSidebarMobile() {
  els.sidebar.classList.remove('open');
  els.sidebarScrim.classList.remove('open');
}

// ---------------- Mensagens: switch active conversation ----------------
function openConversation(key) {
  const c = CONVERSATIONS[key];
  if (!c) return;
  document.querySelectorAll('[data-conv-item]').forEach(el => {
    el.style.background = el.dataset.convItem === key ? 'var(--color-bg-secondary-auto)' : '';
  });
  document.getElementById('conv-header').innerHTML = `
    <div class="avatar avatar-md">${c.n[0]}</div>
    <div><b>${c.n}</b><div class="t-caption" style="color:${c.online ? 'var(--color-semantic-status-success)' : 'var(--color-text-secondary-auto)'};">${c.online ? '● online' : 'offline'}</div></div>
  `;
  document.getElementById('conv-messages').innerHTML = c.messages.map(m => `<div class="chat-bubble ${m.who}">${m.text}</div>`).join('');
}

// ---------------- Generic filter chip (single-select within its own row) ----------------
function selectChip(el) {
  el.parentElement.querySelectorAll('.chip').forEach(c => {
    c.classList.remove('active');
    c.setAttribute('aria-pressed', 'false');
  });
  el.classList.add('active');
  el.setAttribute('aria-pressed', 'true');
}

// ---------------- Feed: filter posts by type ----------------
function filterFeed(type, chipEl) {
  selectChip(chipEl);
  document.querySelectorAll('#feed-posts [data-type]').forEach(card => {
    card.style.display = (type === 'Todos' || card.dataset.type === type) ? '' : 'none';
  });
}

// ---------------- Projetos: grid / list view toggle ----------------
function setProjView(mode) {
  const grid = document.getElementById('projetos-grid');
  if (!grid) return;
  grid.style.gridTemplateColumns = mode === 'list' ? '1fr' : 'repeat(auto-fill,minmax(240px,1fr))';
  const gridBtn = document.getElementById('view-grid-btn');
  const listBtn = document.getElementById('view-list-btn');
  gridBtn.style.background = mode === 'grid' ? 'var(--color-bg-secondary-auto)' : 'transparent';
  listBtn.style.background = mode === 'list' ? 'var(--color-bg-secondary-auto)' : 'transparent';
}

// ---------------- FAQ accordion (Landing page) ----------------
function toggleFaq(el) {
  const ans = el.querySelector('.faq-answer');
  const icon = el.querySelector('.faq-icon');
  const isOpen = ans.style.display !== 'none';
  ans.style.display = isOpen ? 'none' : 'block';
  icon.textContent = isOpen ? '＋' : '－';
}

// ---------------- Dark mode ----------------
function toggleDark() {
  document.body.classList.toggle('dark');
  localStorage.setItem('venturi-dark', document.body.classList.contains('dark') ? '1' : '0');
}

// ---------------- Simple in-page tabs (e.g. Relatórios: Por Função / Por Tempo) ----------------
function showTab(tabEl, key) {
  const wrap = tabEl.closest('.content') || document;
  wrap.querySelectorAll('.tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
  tabEl.classList.add('active');
  tabEl.setAttribute('aria-selected', 'true');
  wrap.querySelectorAll('[data-tab-panel]').forEach(p => p.style.display = 'none');
  const target = wrap.querySelector('[data-tab-panel="' + key + '"]');
  if (target) target.style.display = '';
}

// ---------------- Prototype navigation menu (not part of the product) ----------------
function buildProtoMenu() {
  const bySection = {};
  PAGES.forEach(p => {
    if (!bySection[p.section]) bySection[p.section] = [];
    bySection[p.section].push(p);
  });
  const fab = document.createElement('button');
  fab.className = 'proto-fab';
  fab.innerHTML = '🗺️ Mapa de telas';
  document.body.appendChild(fab);

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.display = 'none';
  overlay.innerHTML = `<div class="modal" style="max-width:640px; max-height:80vh; overflow-y:auto;">
    <div class="t-h3" style="margin-bottom:4px;">Protótipo Venturi — Mapa de telas</div>
    <p class="text-secondary t-caption" style="margin-bottom:16px;">${PAGES.length} telas do protótipo, navegáveis livremente.</p>
    ${Object.keys(bySection).map(sec => `
      <div style="margin-bottom:16px;">
        <div class="t-label text-secondary" style="margin-bottom:6px;">${sec}</div>
        <div class="grid-auto" style="grid-template-columns:repeat(2,1fr); gap:8px;">
          ${bySection[sec].map(p => `<a class="chip" style="justify-content:flex-start;" href="#${sampleRoute(p.path)}">${p.title}</a>`).join('')}
        </div>
      </div>`).join('')}
    <button class="btn btn-secondary btn-block" id="proto-menu-close">Fechar</button>
  </div>`;
  document.body.appendChild(overlay);

  fab.addEventListener('click', () => overlay.style.display = 'flex');
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.style.display = 'none'; });
  document.getElementById('proto-menu-close').addEventListener('click', () => overlay.style.display = 'none');
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => overlay.style.display = 'none'));
}

// ---------------- Init ----------------
function init() {
  els.navbar = document.getElementById('navbar');
  els.navbarModules = document.getElementById('navbar-modules');
  els.navbarRight = document.getElementById('navbar-right');
  els.sidebar = document.getElementById('sidebar');
  els.sidebarScrim = document.getElementById('sidebar-scrim');
  els.tabbar = document.getElementById('tabbar');
  els.content = document.getElementById('content');
  els.aiOverlay = document.getElementById('ai-overlay');
  els.aiDrawer = document.getElementById('ai-drawer');

  document.getElementById('ai-close').addEventListener('click', closeAI);
  els.aiOverlay.addEventListener('click', closeAI);
  document.getElementById('btn-hamburger').addEventListener('click', openSidebarMobile);
  els.sidebarScrim.addEventListener('click', closeSidebarMobile);

  // close the account dropdown when clicking anywhere outside it
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('account-menu');
    if (menu && !e.target.closest('#navbar-account')) {
      menu.classList.remove('open');
      const btn = document.getElementById('avatar-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  });
  // close it on Escape too, and return focus to the trigger
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const menu = document.getElementById('account-menu');
    if (menu && menu.classList.contains('open')) {
      menu.classList.remove('open');
      const btn = document.getElementById('avatar-btn');
      if (btn) { btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    }
  });

  if (localStorage.getItem('venturi-dark') === '1') document.body.classList.add('dark');

  window.Venturi = { openAI, closeAI, toggleDark, showTab, toggleFaq, setProjView, selectChip, filterFeed, openConversation };

  buildProtoMenu();
  window.addEventListener('hashchange', render);
  render();
}

init();
