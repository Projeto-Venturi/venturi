// ============================================================
// Venturi — dados e templates das telas do protótipo
// ============================================================

const HATS = {
  financeiro:  { label: 'Financeiro',  color: 'var(--color-semantic-chapeu-financeiro)' },
  operacional: { label: 'Operacional', color: 'var(--color-semantic-chapeu-operacional)' },
  marketing:   { label: 'Marketing',   color: 'var(--color-semantic-chapeu-marketing)' },
  vendas:      { label: 'Vendas',      color: 'var(--color-semantic-chapeu-vendas)' },
};

const PROPOSTA_COLORS = {
  rascunho: 'var(--color-semantic-proposta-rascunho)',
  enviada: 'var(--color-semantic-proposta-enviada)',
  visualizada: 'var(--color-semantic-proposta-visualizada)',
  aceita: 'var(--color-semantic-proposta-aceita)',
  recusada: 'var(--color-semantic-proposta-recusada)',
};

// Mensagens Diretas — conversas de exemplo (usado pela troca de conversa em app.js)
const CONVERSATIONS = {
  fernanda: { n: 'Fernanda R.', online: true, unread: 2, last: 'Combinado, te envio hoje!',
    messages: [
      { who: 'them', text: 'Oi! Vi sua publicação sobre a calculadora, como você configurou a margem?' },
      { who: 'me', text: 'Usei a sugestão da IA e ajustei +5% pro meu nicho' },
      { who: 'them', text: 'Combinado, te envio hoje!' },
    ] },
  diego: { n: 'Diego A.', online: false, unread: 0, last: 'Vou revisar o orçamento',
    messages: [
      { who: 'me', text: 'Consegue revisar o orçamento da campanha até amanhã?' },
      { who: 'them', text: 'Vou revisar o orçamento' },
    ] },
  studio: { n: 'Studio Verde', online: true, unread: 0, last: 'Obrigado pela parceria :)',
    messages: [
      { who: 'them', text: 'Fechamos a parceria pro projeto do site!' },
      { who: 'me', text: 'Perfeito, bora começar' },
      { who: 'them', text: 'Obrigado pela parceria :)' },
    ] },
};

function hat(key) {
  const h = HATS[key];
  return `<span class="hat-tag"><span class="hat-dot" style="background:${h.color}"></span>${h.label}</span>`;
}

function meta(route, access) {
  return `<div class="proto-meta">
    <span class="t-mono text-secondary">${route}</span>
    <span class="badge badge-info">${access}</span>
  </div>`;
}

function kpi(label, value, note, tone) {
  const toneColor = tone === 'up' ? 'var(--color-semantic-status-success)' : tone === 'down' ? 'var(--color-semantic-status-error)' : 'var(--color-text-secondary-auto)';
  return `<div class="card" style="flex:1; min-width:180px;">
    <div class="t-label text-secondary">${label}</div>
    <div class="t-h2" style="margin:4px 0;">${value}</div>
    <div class="t-caption" style="color:${toneColor}">${note}</div>
  </div>`;
}

function sectionLabel(text) {
  return `<div class="t-label text-secondary" style="margin-bottom:var(--spacing-3); letter-spacing:var(--typography-letterSpacing-wide);">${text}</div>`;
}

// data: [{label, value}], unit ex.: 'h' ou 'R$ '
function barChart(title, data, unit) {
  const max = Math.max(...data.map(d => d.value));
  return `<div class="card" style="flex:1; min-width:280px;">
    <div class="card-title">${title}</div>
    <div style="display:flex; align-items:flex-end; gap:10px; height:160px;">
      ${data.map(d => `
        <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; gap:6px; height:100%;">
          <span class="t-caption text-secondary">${unit || ''}${d.value.toLocaleString('pt-BR')}</span>
          <div style="width:100%; max-width:32px; background:var(--color-accent-auto); border-radius:4px 4px 0 0; height:${Math.max(6, Math.round(d.value / max * 100))}%;"></div>
          <span class="t-caption text-secondary">${d.label}</span>
        </div>`).join('')}
    </div>
  </div>`;
}

// segments: [{label, value, color}]
function donutChart(title, segments, opts) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  let acc = 0;
  const stops = segments.map(s => {
    const start = acc / total * 360;
    acc += s.value;
    const end = acc / total * 360;
    return `${s.color} ${start}deg ${end}deg`;
  }).join(', ');
  return `<div class="card" style="flex:1; min-width:280px;">
    <div class="card-title">${title}</div>
    <div class="row" style="gap:var(--spacing-6); align-items:center; flex-wrap:wrap;">
      <div style="position:relative; width:140px; height:140px; flex-shrink:0;">
        <div style="width:140px; height:140px; border-radius:50%; background:conic-gradient(${stops});"></div>
        <div style="position:absolute; inset:22px; border-radius:50%; background:var(--color-bg-primary-auto); display:flex; align-items:center; justify-content:center; text-align:center;">
          <span class="t-caption text-secondary">${opts && opts.center ? opts.center : total + (opts && opts.unit ? opts.unit : '')}</span>
        </div>
      </div>
      <div class="stack" style="gap:8px; flex:1; min-width:140px;">
        ${segments.map(s => `<div class="row" style="gap:8px;"><span style="width:10px;height:10px;border-radius:50%;background:${s.color};display:inline-block;flex-shrink:0;"></span><span class="t-body">${s.label}</span><span class="text-secondary t-caption" style="margin-left:auto;">${Math.round(s.value / total * 100)}%</span></div>`).join('')}
      </div>
    </div>
  </div>`;
}

// ------------------------------------------------------------
// SIDEBARS por módulo (item 1.2)
// ------------------------------------------------------------
const MODULES = {
  organizacao: {
    label: 'Organização',
    items: [
      { icon: '📊', label: 'Dashboard', route: '/dashboard' },
      { icon: '📁', label: 'Projetos', route: '/projetos' },
      { icon: '🗂️', label: 'Quadro de Tarefas', route: '/projetos/1/quadro' },
      { icon: '📋', label: 'Planilhas', route: '/planilhas' },
      { icon: '📈', label: 'Relatórios', route: '/relatorios' },
    ],
  },
  precificacao: {
    label: 'Precificação',
    items: [
      { icon: '🧮', label: 'Calculadora', route: '/precificacao/calculadora' },
      { icon: '💰', label: 'Custos', route: '/precificacao/custos' },
      { icon: '📊', label: 'Propostas', route: '/precificacao/propostas' },
    ],
  },
  comunidade: {
    label: 'Comunidade',
    items: [
      { icon: '🌐', label: 'Feed', route: '/comunidade/feed' },
      { icon: '💬', label: 'Fórum', route: '/comunidade/forum/financeiro' },
      { icon: '✉️', label: 'Mensagens', route: '/comunidade/mensagens' },
    ],
  },
  conta: {
    label: 'Conta',
    items: [
      { icon: '👤', label: 'Perfil público', route: '/perfil/42' },
      { icon: '⚙️', label: 'Configurações', route: '/configuracoes' },
    ],
  },
};

// ------------------------------------------------------------
// PÁGINAS — cada entrada: path (com :params), section (para o menu),
// title, access badge, chrome: 'public' | 'app' | 'bare', module (sidebar), render()
// ------------------------------------------------------------
const PAGES = [

// ===================== 2. PÁGINAS PÚBLICAS =====================
{
  path: '/', section: '2. Páginas Públicas', title: '🏠 Landing Page', access: 'Pública', chrome: 'public',
  render: () => `
  ${meta('/', 'Pública')}
  <section style="padding:var(--spacing-16) var(--spacing-8); text-align:center; background:linear-gradient(180deg,var(--color-brand-cherry) 0%, var(--color-brand-cherry-mid) 100%); color:#fff; border-radius:var(--borderRadius-2xl); margin-bottom:var(--spacing-12);">
    <div class="t-label" style="color:var(--color-brand-matcha); margin-bottom:var(--spacing-4);">PLATAFORMA PARA EMPREENDEDORES SOLO</div>
    <h1 class="t-h1" style="max-width:760px;margin:0 auto var(--spacing-5);">Organize, precifique e cresça <span style="color:var(--color-brand-matcha)">sem sócio, sem equipe, sem planilha bagunçada.</span></h1>
    <p class="t-body-light" style="max-width:560px;margin:0 auto var(--spacing-8); opacity:.9;">O Venturi junta gestão de projetos, precificação inteligente e uma comunidade de empreendedores solo — com um assistente de IA que entende seu negócio.</p>
    <div class="row" style="justify-content:center; gap:var(--spacing-4);">
      <a href="#/cadastro" class="btn btn-accent">Começar grátis</a>
      <a href="#/login" class="btn btn-secondary" style="border-color:#fff;color:#fff;">Já tenho conta</a>
    </div>
  </section>

  <section style="margin-bottom:var(--spacing-12);">
    <h2 class="t-h2" style="text-align:center;margin-bottom:var(--spacing-8);">Três funções, um só painel</h2>
    <div class="grid-auto" style="grid-template-columns:repeat(3,1fr);">
      <div class="card"><div style="font-size:28px;">🗂️</div><div class="card-title">Organização</div><p class="text-secondary">Quadro de tarefas, planilhas inteligentes e funções do empreendedor num só lugar.</p></div>
      <div class="card"><div style="font-size:28px;">🧮</div><div class="card-title">Precificação</div><p class="text-secondary">Calculadora com IA sugere preço justo com base nos seus custos reais.</p></div>
      <div class="card"><div style="font-size:28px;">🌐</div><div class="card-title">Comunidade</div><p class="text-secondary">Fórum e feed com outros solo founders trocando experiência real.</p></div>
    </div>
  </section>

  <section class="card" style="margin-bottom:var(--spacing-12); background:var(--color-bg-secondary-auto); text-align:center; padding:var(--spacing-12);">
    <div class="t-label text-secondary" style="margin-bottom:var(--spacing-4);">DEMONSTRAÇÃO</div>
    <div style="background:var(--color-brand-dark); border-radius:var(--borderRadius-lg); height:280px; display:flex; align-items:center; justify-content:center; color:var(--color-brand-matcha);">▶ Demo animada do produto</div>
  </section>

  <section style="margin-bottom:var(--spacing-12);">
    <h2 class="t-h2" style="text-align:center;margin-bottom:var(--spacing-6);">Para quem é o Venturi</h2>
    <div class="grid-auto" style="grid-template-columns:repeat(3,1fr);">
      <div class="card"><b>Freelancers</b><p class="text-secondary t-caption">Designers, devs, redatores cobrando por projeto.</p></div>
      <div class="card"><b>MEIs</b><p class="text-secondary t-caption">Prestadores de serviço formalizados sozinhos.</p></div>
      <div class="card"><b>Consultores</b><p class="text-secondary t-caption">Vendem tempo e expertise, precisam precificar bem.</p></div>
    </div>
  </section>

  <section style="margin-bottom:var(--spacing-12);">
    <h2 class="t-h2" style="text-align:center;margin-bottom:var(--spacing-6);">Venturi vs. planilha solta</h2>
    <div class="table-wrap"><table class="grid">
      <tr><th>Recurso</th><th>Planilha / caderno</th><th>Venturi</th></tr>
      <tr><td>Precificação com margem sugerida</td><td class="text-secondary">✕</td><td><span class="badge badge-success">✓ com IA</span></td></tr>
      <tr><td>Quadro de tarefas</td><td class="text-secondary">✕</td><td><span class="badge badge-success">✓</span></td></tr>
      <tr><td>Comunidade de apoio</td><td class="text-secondary">✕</td><td><span class="badge badge-success">✓</span></td></tr>
    </table></div>
  </section>

  <section style="margin-bottom:var(--spacing-12);">
    <h2 class="t-h2" style="text-align:center;margin-bottom:var(--spacing-6);">Quem já usa</h2>
    <div class="grid-auto" style="grid-template-columns:repeat(3,1fr);">
      ${['"Parei de cobrar barato demais depois da calculadora de preço."','"O quadro de tarefas com Pomodoro mudou minha rotina."','"A comunidade resolveu uma dúvida jurídica em 1 dia."'].map(t=>`<div class="card"><p class="t-body-light">${t}</p><div class="row" style="gap:8px;margin-top:12px;"><div class="avatar avatar-sm">JS</div><span class="t-caption text-secondary">Empreendedor(a) solo</span></div></div>`).join('')}
    </div>
  </section>

  <section style="margin-bottom:var(--spacing-12);">
    <h2 class="t-h2" style="text-align:center;margin-bottom:var(--spacing-6);">Planos e preços</h2>
    <div class="grid-auto" style="grid-template-columns:repeat(3,1fr);">
      <div class="card"><div class="t-label text-secondary">FREE</div><div class="t-h2">R$ 0</div><p class="text-secondary t-caption">50 mensagens IA/mês, 1 função ativa</p><a class="btn btn-secondary btn-block" style="margin-top:12px;" href="#/cadastro">Começar</a></div>
      <div class="card" style="border-color:var(--color-accent-auto); box-shadow:var(--shadow-brand);"><div class="t-label" style="color:var(--color-accent-auto)">PRO</div><div class="t-h2">R$ 39/mês</div><p class="text-secondary t-caption">IA ilimitada, todos os módulos</p><a class="btn btn-primary btn-block" style="margin-top:12px;" href="#/cadastro">Assinar Pro</a></div>
      <div class="card"><div class="t-label text-secondary">BUSINESS</div><div class="t-h2">R$ 89/mês</div><p class="text-secondary t-caption">Multiusuário e relatórios avançados</p><a class="btn btn-secondary btn-block" style="margin-top:12px;" href="#/cadastro">Assinar Business</a></div>
    </div>
  </section>

  <section style="margin-bottom:var(--spacing-12); max-width:640px; margin-left:auto; margin-right:auto;">
    <h2 class="t-h2" style="text-align:center;margin-bottom:var(--spacing-6);">Perguntas frequentes</h2>
    <div class="stack" style="gap:8px;">
      ${[
        ['Preciso de CNPJ para usar?', 'Não. Você pode usar o Venturi como autônomo, MEI ou qualquer outro CNPJ. Alguns recursos (como emissão fiscal) funcionam melhor com CNPJ, mas não são obrigatórios.'],
        ['Posso cancelar quando quiser?', 'Sim, sem multa ou fidelidade. Seu plano continua ativo até o fim do período já pago.'],
        ['O SoloPlan AI substitui um contador?', 'Não — ele ajuda a organizar e sugerir preços com base nos seus dados, mas não substitui orientação contábil ou jurídica profissional.'],
      ].map(([q,a])=>`
        <div class="card" style="cursor:pointer;" onclick="Venturi.toggleFaq(this)">
          <div class="row" style="justify-content:space-between;"><span><b>${q}</b></span><span class="text-secondary faq-icon">＋</span></div>
          <p class="text-secondary t-caption faq-answer" style="display:none; margin-top:10px;">${a}</p>
        </div>`).join('')}
    </div>
  </section>

  <section style="text-align:center; padding:var(--spacing-12) 0;">
    <h2 class="t-h2" style="margin-bottom:var(--spacing-4);">Pronto para organizar seu negócio solo?</h2>
    <a href="#/cadastro" class="btn btn-primary">Começar grátis agora</a>
  </section>

  <footer style="border-top:1px solid var(--color-border-auto); padding-top:var(--spacing-6); text-align:center;" class="text-secondary t-caption">
    Venturi © 2026 — Termos · Privacidade · Contato
  </footer>
  `,
},

{
  path: '/cadastro', section: '2. Páginas Públicas', title: '📝 Cadastro', access: 'Pública', chrome: 'public', split: true,
  render: () => `
  ${meta('/cadastro', 'Pública')}
  <label class="field"><span class="field-label">Nome completo</span><input class="input" placeholder="Seu nome"></label>
  <label class="field"><span class="field-label">E-mail</span><input class="input" type="email" placeholder="voce@email.com"></label>
  <label class="field"><span class="field-label">Senha</span><input class="input" type="password" placeholder="Crie uma senha"></label>
  <label class="field"><span class="field-label">Nicho / área de atuação</span>
    <select class="input"><option>Design & criação</option><option>Desenvolvimento</option><option>Consultoria</option><option>Outro</option></select>
  </label>
  <div class="checkbox-row"><input type="checkbox" id="terms"><label for="terms">Aceito os termos de uso e a política de privacidade</label></div>
  <button class="btn btn-primary btn-block" style="margin-top:var(--spacing-4);">Criar conta</button>
  <div class="row" style="justify-content:center; margin:var(--spacing-4) 0; color:var(--color-text-secondary-auto); gap:8px;"><div class="hr" style="flex:1;"></div><span class="t-caption">ou</span><div class="hr" style="flex:1;"></div></div>
  <button class="btn btn-secondary btn-block">🔵 Entrar com Google</button>
  <p class="t-caption text-secondary" style="text-align:center; margin-top:var(--spacing-6);">Já tem conta? <a href="#/login" style="color:var(--color-accent-auto); font-weight:600;">Entrar</a></p>
  `,
},

{
  path: '/login', section: '2. Páginas Públicas', title: '🔐 Login', access: 'Pública', chrome: 'public', split: true,
  render: () => `
  ${meta('/login', 'Pública')}
  <label class="field"><span class="field-label">E-mail</span><input class="input" type="email" placeholder="voce@email.com"></label>
  <label class="field"><span class="field-label">Senha</span><input class="input" type="password" placeholder="Sua senha"></label>
  <div class="row" style="justify-content:space-between;">
    <div class="checkbox-row"><input type="checkbox" id="remember"><label for="remember">Lembrar de mim</label></div>
    <a href="#/recuperar-senha" class="t-caption" style="color:var(--color-accent-auto);">Esqueci minha senha</a>
  </div>
  <button class="btn btn-primary btn-block" style="margin-top:var(--spacing-4);">Entrar</button>
  <div class="row" style="justify-content:center; margin:var(--spacing-4) 0; color:var(--color-text-secondary-auto); gap:8px;"><div class="hr" style="flex:1;"></div><span class="t-caption">ou</span><div class="hr" style="flex:1;"></div></div>
  <button class="btn btn-secondary btn-block">🔵 Entrar com Google</button>
  <p class="t-caption text-secondary" style="text-align:center; margin-top:var(--spacing-6);">Novo por aqui? <a href="#/cadastro" style="color:var(--color-accent-auto); font-weight:600;">Criar conta</a></p>
  `,
},

{
  path: '/recuperar-senha', section: '2. Páginas Públicas', title: '🔑 Recuperação de Senha', access: 'Pública', chrome: 'public', centered: true,
  render: () => `
  ${meta('/recuperar-senha', 'Pública')}
  <div class="stack" style="gap:var(--spacing-6);">
    <div class="card">
      <div class="t-label text-secondary" style="margin-bottom:8px;">PASSO 1</div>
      <div class="card-title">Informe seu e-mail</div>
      <div class="field"><input class="input" type="email" placeholder="voce@email.com" aria-label="E-mail"></div>
      <button class="btn btn-primary btn-block">Enviar link de recuperação</button>
    </div>
    <div class="card" style="background:var(--color-semantic-status-info-bg); border-color:transparent;">
      <div class="t-label" style="color:var(--color-semantic-status-info); margin-bottom:8px;">PASSO 2 — CONFIRMAÇÃO</div>
      <p class="t-body">Enviamos um link para <b>voce@email.com</b>. Verifique sua caixa de entrada.</p>
    </div>
    <div class="card">
      <div class="t-label text-secondary" style="margin-bottom:8px;">PASSO 3 — VIA LINK DO E-MAIL</div>
      <div class="card-title">Defina uma nova senha</div>
      <div class="field"><input class="input" type="password" placeholder="Nova senha" aria-label="Nova senha"></div>
      <div class="field"><input class="input" type="password" placeholder="Confirmar nova senha" aria-label="Confirmar nova senha"></div>
      <button class="btn btn-primary btn-block">Salvar nova senha</button>
    </div>
  </div>
  `,
},

{
  path: '/proposta/:token', section: '2. Páginas Públicas', title: '📄 Proposta Pública', access: 'Pública — sem login', chrome: 'bare',
  render: () => `
  ${meta('/proposta/:token', 'Pública — sem login')}
  <div class="card" style="max-width:720px;margin:0 auto;">
    <div class="row" style="justify-content:space-between; align-items:flex-start; margin-bottom:var(--spacing-6);">
      <div class="row" style="gap:12px;"><div class="avatar avatar-md">AN</div><div><div class="t-h4">Ana Ferreira Design</div><div class="t-caption text-secondary">CNPJ 00.000.000/0001-00</div></div></div>
      <span class="badge" style="background:var(--color-semantic-proposta-enviada);color:#fff;">Enviada</span>
    </div>
    <div class="t-h3" style="margin-bottom:var(--spacing-4);">Proposta comercial — Identidade visual completa</div>
    <div class="table-wrap" style="margin-bottom:var(--spacing-4);"><table class="grid">
      <tr><th>Item</th><th>Qtd</th><th>Valor</th></tr>
      <tr><td>Logotipo + variações</td><td>1</td><td class="mono">R$ 1.800,00</td></tr>
      <tr><td>Manual de marca</td><td>1</td><td class="mono">R$ 900,00</td></tr>
      <tr><td>Templates de redes sociais</td><td>10</td><td class="mono">R$ 700,00</td></tr>
    </table></div>
    <div class="row" style="justify-content:space-between; margin-bottom:var(--spacing-6);">
      <span class="text-secondary">Condições: 50% entrada, 50% na entrega · 15 dias úteis</span>
      <span class="t-h3">R$ 3.400,00</span>
    </div>
    <div class="row" style="gap:var(--spacing-3); margin-bottom:var(--spacing-4);">
      <button class="btn btn-primary" style="flex:1;">Aceitar proposta</button>
      <button class="btn btn-secondary" style="flex:1;">Recusar</button>
    </div>
    <label class="field"><span class="field-label">Assinatura (digite seu nome completo)</span><input class="input" placeholder="Nome completo"></label>
    <button class="btn btn-ghost btn-block">⬇ Baixar PDF</button>
  </div>
  <p class="t-caption text-secondary" style="text-align:center; margin-top:var(--spacing-6);">Criado com <b>Venturi</b></p>
  `,
},

// ===================== 3. ONBOARDING =====================
{
  path: '/onboarding', section: '3. Onboarding', title: '🚀 Onboarding', access: 'Somente primeira vez', chrome: 'bare',
  render: () => `
  ${meta('/onboarding', 'Somente primeira vez')}
  <div style="max-width:560px;margin:0 auto;">
    <div class="progress" style="margin-bottom:var(--spacing-8);"><span style="width:50%"></span></div>
    <div class="row" style="justify-content:space-between; margin-bottom:var(--spacing-8);">
      ${['Boas-vindas','Nicho','Custos fixos','Primeiro projeto'].map((s,i)=>`<div class="stack" style="align-items:center; gap:4px;"><div class="avatar avatar-sm" style="background:${i<2?'var(--color-brand-cherry)':'var(--color-border-auto)'}; color:${i<2?'#fff':'var(--color-text-secondary-auto)'};">${i+1}</div><span class="t-caption text-secondary">${s}</span></div>`).join('')}
    </div>
    <div class="card">
      <div class="t-label text-secondary" style="margin-bottom:8px;">PASSO 2 DE 4</div>
      <div class="t-h3" style="margin-bottom:var(--spacing-2);">Qual é o seu nicho?</div>
      <p class="text-secondary" style="margin-bottom:var(--spacing-5);">Isso ajuda o SoloPlan AI a sugerir preços e conteúdo relevantes.</p>
      <label class="field"><span class="field-label">Nicho / área de atuação</span><select class="input"><option>Design & criação</option><option>Desenvolvimento</option><option>Consultoria</option></select></label>
      <label class="field"><span class="field-label">Tipo de serviço/produto</span><input class="input" placeholder="Ex: identidade visual, sites, consultoria..."></label>
      <div class="row" style="justify-content:space-between; margin-top:var(--spacing-6);">
        <button class="btn btn-ghost">Voltar</button>
        <button class="btn btn-primary">Continuar</button>
      </div>
    </div>
    <p class="t-caption text-secondary" style="text-align:center; margin-top:var(--spacing-4);">Pode pular, mas afeta a qualidade das sugestões da IA.</p>
  </div>
  `,
},

// ===================== 4. MÓDULO ORGANIZAÇÃO =====================
{
  path: '/dashboard', section: '4. Organização', title: '📊 Dashboard', access: 'Funcionalidade completa', chrome: 'app', module: 'organizacao',
  render: () => `
  ${meta('/app/dashboard', 'Funcionalidade completa')}
  <div class="page-header"><div><div class="t-h3">Dashboard</div><div class="page-sub">Visão 360° do seu negócio</div></div><button class="btn btn-primary">+ Novo projeto</button></div>

  ${sectionLabel('VISÃO GERAL')}
  <div class="row" style="gap:var(--spacing-4); flex-wrap:wrap; margin-bottom:var(--spacing-4);">
    ${kpi('Tarefas em aberto','14','+3 essa semana','down')}
    ${kpi('Horas trabalhadas','38h','vs. 42h na semana passada','down')}
    ${kpi('Receita do mês','R$ 8.420','+12% vs. mês anterior','up')}
  </div>
  <div class="card" style="margin-bottom:var(--spacing-8); border-left:3px solid var(--color-brand-matcha);">
    <div class="row" style="gap:8px;"><span>✨</span><b>Insight da IA</b></div>
    <p class="text-secondary" style="margin-top:4px;">Você passou 60% do tempo na função Operacional essa semana. Considere delegar tarefas repetitivas para focar em Vendas.</p>
  </div>

  ${sectionLabel('DESEMPENHO')}
  <div class="row" style="gap:var(--spacing-4); flex-wrap:wrap; margin-bottom:var(--spacing-8);">
    <div class="card" style="flex:1; min-width:280px;">
      <div class="row" style="justify-content:space-between; align-items:center; margin-bottom:var(--spacing-3);">
        <div class="card-title" style="margin-bottom:0;">Horas por função</div>
        <a href="#/relatorios" class="t-caption" style="color:var(--color-accent-auto); font-weight:600;">Ver relatório completo →</a>
      </div>
      <div class="stack" style="gap:10px;">
        ${Object.entries(HATS).map(([k,h],i)=>`
          <div class="row" style="justify-content:space-between;">
            <span class="hat-tag"><span class="hat-dot" style="background:${h.color}"></span>${h.label}</span>
            <span class="t-caption text-secondary">${[38,26,20,16][i]}%</span>
          </div>`).join('')}
      </div>
    </div>
    ${barChart('Receita vs. despesa do mês', [{label:'Receita',value:8420},{label:'Despesas',value:1900},{label:'Lucro',value:6520}], 'R$ ')}
  </div>

  ${sectionLabel('ATIVIDADE RECENTE')}
  <div class="row" style="gap:var(--spacing-4); flex-wrap:wrap; align-items:flex-start;">
    <div class="card" style="flex:1; min-width:280px;">
      <div class="card-title">Tarefas com prazo próximo</div>
      <div class="stack" style="gap:10px;">
        <div class="row" style="justify-content:space-between;"><span>Fechar orçamento — cliente Ana</span><span class="badge badge-warning">amanhã</span></div>
        <div class="row" style="justify-content:space-between;"><span>Entregar manual de marca</span><span class="badge badge-warning">3 dias</span></div>
        <div class="row" style="justify-content:space-between;"><span>Revisar planilha DRE</span><span class="badge badge-error">atrasado</span></div>
      </div>
    </div>
    <div class="card" style="flex:1; min-width:280px;">
      <div class="card-title">Últimas propostas</div>
      <div class="stack" style="gap:10px;">
        <div class="row" style="justify-content:space-between;"><span>Ana Ferreira Design</span><span class="badge" style="background:var(--color-semantic-proposta-enviada);color:#fff;">Enviada</span></div>
        <div class="row" style="justify-content:space-between;"><span>Studio Verde</span><span class="badge" style="background:var(--color-semantic-proposta-aceita);color:#fff;">Aceita</span></div>
        <div class="row" style="justify-content:space-between;"><span>Loja Boa Vista</span><span class="badge" style="background:var(--color-semantic-proposta-recusada);color:#fff;">Recusada</span></div>
      </div>
    </div>
  </div>
  `,
},

{
  path: '/projetos', section: '4. Organização', title: '📁 Projetos', access: 'Funcionalidade completa', chrome: 'app', module: 'organizacao',
  render: () => `
  ${meta('/app/projetos', 'Funcionalidade completa')}
  <div class="page-header"><div><div class="t-h3">Projetos</div><div class="page-sub">Todos os seus projetos ativos</div></div><button class="btn btn-primary">+ Novo projeto</button></div>
  <div class="row" style="gap:var(--spacing-3); margin-bottom:var(--spacing-5); flex-wrap:wrap;">
    <input class="input" style="max-width:260px;" placeholder="🔎 Buscar projeto..." aria-label="Buscar projeto">
    <select class="input" style="max-width:160px;" aria-label="Filtrar por status"><option>Status: todos</option><option>Em andamento</option><option>Concluído</option></select>
    <select class="input" style="max-width:160px;" aria-label="Filtrar por função"><option>Função: todas</option><option>Financeiro</option><option>Marketing</option></select>
    <div class="row" style="gap:4px; margin-left:auto;">
      <button class="btn btn-ghost btn-sm" id="view-grid-btn" style="background:var(--color-bg-secondary-auto);" onclick="Venturi.setProjView('grid')">▦ Grid</button>
      <button class="btn btn-ghost btn-sm" id="view-list-btn" onclick="Venturi.setProjView('list')">☰ Lista</button>
    </div>
  </div>
  <div class="grid-auto" id="projetos-grid" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr));">
    ${[
      {name:'Identidade visual — Ana Ferreira', hatKey:'marketing', progress:70},
      {name:'Site institucional — Studio Verde', hatKey:'operacional', progress:40},
      {name:'Consultoria financeira — Loja Boa Vista', hatKey:'financeiro', progress:90},
      {name:'Campanha de lançamento', hatKey:'vendas', progress:20},
    ].map(p => `
      <div class="card">
        <div class="row" style="justify-content:space-between; margin-bottom:8px;">${hat(p.hatKey)}<span class="text-secondary t-caption">${p.progress}%</span></div>
        <div class="card-title" style="font-size:var(--typography-size-base);">${p.name}</div>
        <div class="progress" style="margin-top:8px;"><span style="width:${p.progress}%"></span></div>
      </div>`).join('')}
  </div>
  `,
},

{
  path: '/projetos/:id/quadro', section: '4. Organização', title: '🗂️ Quadro de Tarefas do Projeto', access: 'Funcionalidade completa', chrome: 'app', module: 'organizacao',
  render: () => {
    const col = (label, colorVar, cards) => `
      <div class="kanban-col">
        <div class="kanban-col-head"><span class="kanban-dot" style="background:${colorVar}"></span><span class="t-label">${label}</span><span class="text-secondary t-caption">${cards.length}</span></div>
        ${cards.map(c => `
          <div class="kanban-card">
            <div class="row" style="justify-content:space-between;">${hat(c.hatKey)}${c.priority ? `<span class="badge badge-error">${c.priority}</span>` : ''}</div>
            <div>${c.title}</div>
            <div class="row" style="justify-content:space-between; color:var(--color-text-secondary-auto); font-size:12px;">
              <span>${c.sub ? `☑ ${c.sub}` : ''}</span>
              <span>⏱ 25:00</span>
            </div>
          </div>`).join('')}
        <div class="kanban-add">+ Adicionar tarefa</div>
      </div>`;
    return `
    ${meta('/app/projetos/:id/quadro', 'Funcionalidade completa')}
    <div class="page-header">
      <div>
        <div class="row" style="gap:10px; flex-wrap:wrap;">
          <div class="t-h3">Identidade visual — Ana Ferreira</div>
          ${hat('marketing')}
        </div>
        <div class="page-sub">4 tarefas · atualizado há 2h</div>
      </div>
      <button class="btn btn-accent">✨ Criar tarefas com IA</button>
    </div>
    <div class="kanban">
      ${col('A fazer', 'var(--color-semantic-kanban-a-fazer)', [
        {title:'Fechar orçamento do cliente Ana', hatKey:'vendas', priority:'alta', sub:'0/2'},
        {title:'Pesquisar referências visuais', hatKey:'marketing', sub:'1/3'},
      ])}
      ${col('Em andamento', 'var(--color-semantic-kanban-em-andamento)', [
        {title:'Criar variações do logotipo', hatKey:'marketing', sub:'2/4'},
        {title:'Reunião de alinhamento', hatKey:'operacional'},
      ])}
      ${col('Concluído', 'var(--color-semantic-kanban-concluido)', [
        {title:'Briefing aprovado pelo cliente', hatKey:'vendas'},
      ])}
    </div>
    `;
  },
},

{
  path: '/planilhas', section: '4. Organização', title: '📋 Planilhas Inteligentes', access: 'Edição básica (web)', chrome: 'app', module: 'organizacao',
  render: () => {
    const calcHint = (row, human, formula) => `
      <div class="calc-hint"><span>💡</span><span><b>${row}</b> é calculado automaticamente: ${human}. <span class="t-mono" style="font-size:11px;">(${formula})</span></span></div>`;
    return `
    ${meta('/app/planilhas', 'Edição básica (web)')}
    <div class="page-header"><div><div class="t-h3">Planilhas Inteligentes</div><div class="page-sub">4 modelos prontos, com fórmulas que calculam sozinhas</div></div>
      <div class="row" style="gap:8px;"><button class="btn btn-accent">✨ Preencher com IA</button><button class="btn btn-secondary">⬇ Exportar .xlsx</button><button class="btn btn-primary">+ Nova planilha</button></div>
    </div>
    <div class="tabs" role="tablist" aria-label="Modelo de planilha">
      <button type="button" class="tab active" role="tab" aria-selected="true" aria-controls="pl-fluxo" onclick="Venturi.showTab(this,'pl-fluxo')">Fluxo de Caixa</button>
      <button type="button" class="tab" role="tab" aria-selected="false" aria-controls="pl-dre" onclick="Venturi.showTab(this,'pl-dre')">DRE</button>
      <button type="button" class="tab" role="tab" aria-selected="false" aria-controls="pl-metas" onclick="Venturi.showTab(this,'pl-metas')">Metas</button>
      <button type="button" class="tab" role="tab" aria-selected="false" aria-controls="pl-marketing" onclick="Venturi.showTab(this,'pl-marketing')">Marketing</button>
    </div>

    <div data-tab-panel="pl-fluxo" id="pl-fluxo" role="tabpanel">
      <p class="text-secondary t-caption" style="margin-bottom:var(--spacing-3);">Entradas e saídas mês a mês — mostra se sobrou ou faltou dinheiro no caixa.</p>
      <div class="formula-bar"><span class="formula-cell">Saldo</span><span class="formula-fx">𝑓x</span><span class="t-mono">Receita − Custos fixos</span></div>
      <div class="table-wrap" style="margin-bottom:var(--spacing-3);">
        <table class="grid">
          <tr><th>Categoria</th><th>Jan</th><th>Fev</th><th>Mar</th></tr>
          <tr><td>Receita</td><td class="mono">4.200</td><td class="mono">5.100</td><td class="mono">8.420</td></tr>
          <tr><td>Custos fixos</td><td class="mono">1.800</td><td class="mono">1.800</td><td class="mono">1.900</td></tr>
          <tr class="computed"><td>Saldo</td><td class="mono">2.400</td><td class="mono">3.300</td><td class="mono">6.520</td></tr>
        </table>
      </div>
      ${calcHint('Saldo', 'Receita menos custos fixos do mesmo mês', '=SOMA(Receita) - SOMA(CustosFixos)')}
    </div>

    <div data-tab-panel="pl-dre" id="pl-dre" role="tabpanel" style="display:none;">
      <p class="text-secondary t-caption" style="margin-bottom:var(--spacing-3);">Demonstrativo de Resultado — do faturamento bruto até o lucro que realmente sobra, mês atual.</p>
      <div class="formula-bar"><span class="formula-cell">Lucro líquido</span><span class="formula-fx">𝑓x</span><span class="t-mono">Receita − Impostos − Custos</span></div>
      <div class="table-wrap" style="margin-bottom:var(--spacing-3);">
        <table class="grid">
          <tr><th>Demonstrativo (mês atual)</th><th>Valor</th></tr>
          <tr><td>Receita bruta</td><td class="mono">8.420</td></tr>
          <tr><td>Impostos (Simples/MEI)</td><td class="mono">-337</td></tr>
          <tr><td>Custos fixos</td><td class="mono">-1.900</td></tr>
          <tr><td>Custos variáveis</td><td class="mono">-640</td></tr>
          <tr class="computed"><td>Lucro líquido</td><td class="mono">5.543</td></tr>
        </table>
      </div>
      ${calcHint('Lucro líquido', 'receita bruta menos impostos, custos fixos e variáveis', '=Receita - Impostos - CustosFixos - CustosVariaveis')}
    </div>

    <div data-tab-panel="pl-metas" id="pl-metas" role="tabpanel" style="display:none;">
      <p class="text-secondary t-caption" style="margin-bottom:var(--spacing-3);">Metas do negócio comparadas com o resultado atual — o progresso é recalculado sozinho conforme os outros dados mudam.</p>
      <div class="formula-bar"><span class="formula-cell">Progresso</span><span class="formula-fx">𝑓x</span><span class="t-mono">Atual ÷ Objetivo</span></div>
      <div class="table-wrap" style="margin-bottom:var(--spacing-3);">
        <table class="grid">
          <tr><th>Meta</th><th>Atual</th><th>Objetivo</th><th>Progresso</th></tr>
          ${[
            ['Receita mensal', 'R$ 8.420', 'R$ 10.000', 84],
            ['Novos clientes', '3', '5', 60],
            ['Reserva de emergência', 'R$ 2.400', 'R$ 6.000', 40],
          ].map(([label, atual, meta, pct]) => `
          <tr>
            <td>${label}</td><td class="mono">${atual}</td><td class="mono">${meta}</td>
            <td style="min-width:140px;">
              <div class="row" style="gap:8px;">
                <div class="progress" style="flex:1;"><span style="width:${pct}%"></span></div>
                <span class="t-caption text-secondary">${pct}%</span>
              </div>
            </td>
          </tr>`).join('')}
        </table>
      </div>
      ${calcHint('Progresso', 'valor atual dividido pelo objetivo da meta', '=Atual / Objetivo')}
    </div>

    <div data-tab-panel="pl-marketing" id="pl-marketing" role="tabpanel" style="display:none;">
      <p class="text-secondary t-caption" style="margin-bottom:var(--spacing-3);">Investimento por canal de divulgação e quantos leads (contatos interessados) cada um trouxe.</p>
      <div class="formula-bar"><span class="formula-cell">Custo/lead</span><span class="formula-fx">𝑓x</span><span class="t-mono">Investimento ÷ Leads</span></div>
      <div class="table-wrap" style="margin-bottom:var(--spacing-3);">
        <table class="grid">
          <tr><th>Canal</th><th>Investimento</th><th>Leads gerados</th><th>Custo/lead</th></tr>
          <tr><td>Instagram Ads</td><td class="mono">450</td><td>12</td><td class="mono">37,50</td></tr>
          <tr><td>Indicação</td><td class="mono">0</td><td>5</td><td class="mono">0,00</td></tr>
          <tr><td>Google Ads</td><td class="mono">300</td><td>6</td><td class="mono">50,00</td></tr>
          <tr class="computed"><td>Total</td><td class="mono">750</td><td>23</td><td class="mono">32,60</td></tr>
        </table>
      </div>
      ${calcHint('Custo/lead', 'investimento do canal dividido pelos leads que ele gerou', '=Investimento / Leads')}
    </div>
    `;
  },
},

{
  path: '/relatorios', section: '4. Organização', title: '📈 Relatórios', access: 'Funcionalidade completa', chrome: 'app', module: 'organizacao',
  render: () => `
  ${meta('/app/relatorios', 'Funcionalidade completa')}
  <div class="page-header"><div><div class="t-h3">Relatórios</div><div class="page-sub">Como seu tempo é investido no negócio</div></div></div>

  <div class="tabs" role="tablist" aria-label="Tipo de relatório">
    <button type="button" class="tab active" role="tab" aria-selected="true" aria-controls="rel-funcao" onclick="Venturi.showTab(this,'rel-funcao')">Por Função</button>
    <button type="button" class="tab" role="tab" aria-selected="false" aria-controls="rel-tempo" onclick="Venturi.showTab(this,'rel-tempo')">Por Tempo</button>
  </div>

  <div data-tab-panel="rel-funcao" id="rel-funcao" role="tabpanel">
    <div class="card" style="margin-bottom:var(--spacing-6); background:var(--color-bg-secondary-auto);">
      <p class="text-secondary t-caption">💡 Sem sócio ou equipe, você acumula 4 papéis no seu próprio negócio. O Venturi rotula suas tarefas com uma <b>função</b> — Financeiro, Operacional, Marketing ou Vendas — para mostrar onde seu tempo realmente vai.</p>
    </div>

    <div class="row" style="justify-content:space-between; align-items:center;">
      ${sectionLabel('SUAS 4 FUNÇÕES')}
      <button class="btn btn-secondary btn-sm">Editar funções</button>
    </div>
    <div class="row" style="gap:var(--spacing-4); flex-wrap:wrap; margin-bottom:var(--spacing-8);">
      ${Object.entries(HATS).map(([k,h],i)=>`
        <div class="card" style="flex:1; min-width:200px; border-top:3px solid ${h.color};">
          <div class="hat-tag" style="margin-bottom:8px;"><span class="hat-dot" style="background:${h.color}"></span><b>${h.label}</b></div>
          <div class="t-h3">${[38,26,20,16][i]}%</div>
          <div class="text-secondary t-caption">do tempo essa semana</div>
        </div>`).join('')}
    </div>

    ${sectionLabel('DISTRIBUIÇÃO')}
    <div class="row" style="gap:var(--spacing-4); flex-wrap:wrap;">
      ${donutChart('Horas por função esta semana', Object.entries(HATS).map(([k,h],i)=>({label:h.label, value:[38,26,20,16][i], color:h.color})), {center:'38h'})}
      <div class="card" style="flex:1; min-width:280px; border-left:3px solid var(--color-brand-matcha);">
        <div class="row" style="gap:8px;"><span>✨</span><b>Insight da IA</b></div>
        <p class="text-secondary" style="margin-top:4px;">Você está gastando pouco tempo em Vendas (16%). Negócios solo saudáveis costumam reservar ao menos 25%.</p>
      </div>
    </div>
  </div>

  <div data-tab-panel="rel-tempo" id="rel-tempo" role="tabpanel" style="display:none;">
    ${sectionLabel('VISÃO GERAL')}
    <div class="row" style="gap:var(--spacing-4); flex-wrap:wrap; margin-bottom:var(--spacing-8);">
      ${kpi('Total mensal','96h','horas produtivas','up')}
      ${kpi('Sessões Pomodoro','142','25min foco / 5min pausa','')}
      ${kpi('Atrasos detectados pela IA','3 tarefas','padrão: sextas à tarde','down')}
    </div>

    ${sectionLabel('HORAS POR DIA')}
    ${barChart('Horas trabalhadas esta semana', [
      {label:'Seg',value:6},{label:'Ter',value:7},{label:'Qua',value:5},{label:'Qui',value:8},
      {label:'Sex',value:4},{label:'Sáb',value:2},{label:'Dom',value:0},
    ], '')}

    ${sectionLabel('POR PROJETO E TAREFA')}
    <div class="table-wrap" style="margin-top:var(--spacing-3);">
      <table class="grid">
        <tr><th>Projeto</th><th>Tarefa</th><th>Horas</th></tr>
        <tr><td>Identidade visual — Ana Ferreira</td><td>Criar variações do logotipo</td><td class="mono">6h20</td></tr>
        <tr><td>Site institucional — Studio Verde</td><td>Reunião de alinhamento</td><td class="mono">1h00</td></tr>
        <tr><td>Consultoria financeira</td><td>Revisar planilha DRE</td><td class="mono">3h40</td></tr>
      </table>
    </div>
  </div>
  `,
},

// ===================== 5. MÓDULO PRECIFICAÇÃO =====================
{
  path: '/precificacao/calculadora', section: '5. Precificação', title: '🧮 Calculadora', access: 'Funcionalidade completa', chrome: 'app', module: 'precificacao',
  render: () => {
    const tiers = (min, ideal, premium) => `
      <div class="stack" style="flex:1; min-width:280px; gap:var(--spacing-3);">
        <div class="card" style="border-left:3px solid var(--color-text-secondary-auto);"><div class="t-label text-secondary">MÍNIMO</div><div class="t-h2">${min}</div></div>
        <div class="card" style="border-left:3px solid var(--color-accent-auto); box-shadow:var(--shadow-brand);"><div class="t-label" style="color:var(--color-accent-auto);">IDEAL</div><div class="t-h2">${ideal}</div></div>
        <div class="card" style="border-left:3px solid var(--color-brand-matcha);"><div class="t-label text-secondary">PREMIUM</div><div class="t-h2">${premium}</div></div>
      </div>`;
    return `
    ${meta('/app/precificacao/calculadora', 'Funcionalidade completa')}
    <div class="page-header"><div><div class="t-h3">Calculadora de Precificação</div><div class="page-sub">Baseada nos custos que você já cadastrou</div></div></div>
    <div class="tabs" role="tablist" aria-label="Tipo de cobrança">
      <button type="button" class="tab active" role="tab" aria-selected="true" aria-controls="calc-hora" onclick="Venturi.showTab(this,'calc-hora')">Por hora</button>
      <button type="button" class="tab" role="tab" aria-selected="false" aria-controls="calc-servico" onclick="Venturi.showTab(this,'calc-servico')">Por serviço completo</button>
      <button type="button" class="tab" role="tab" aria-selected="false" aria-controls="calc-produto" onclick="Venturi.showTab(this,'calc-produto')">Por produto físico</button>
    </div>

    <div data-tab-panel="calc-hora" id="calc-hora" role="tabpanel">
      <div class="row" style="gap:var(--spacing-6); flex-wrap:wrap; align-items:flex-start;">
        <div class="card" style="flex:1; min-width:280px;">
          <label class="field"><span class="field-label">Custos fixos mensais (auto)</span><input class="input" value="R$ 1.900,00" readonly></label>
          <label class="field"><span class="field-label">Horas disponíveis no mês</span><input class="input" value="120"></label>
          <label class="field"><span class="field-label">Margem de lucro</span><input class="input" value="30%"></label>
          <div class="card" style="background:var(--color-semantic-status-info-bg); border-color:transparent;">
            <div class="row" style="gap:8px;"><span>✨</span><span class="t-caption">Sugestão da IA: no seu nicho (design), margens de 35–45% são comuns.</span></div>
          </div>
        </div>
        ${tiers('R$ 65/h', 'R$ 85/h', 'R$ 110/h')}
      </div>
    </div>

    <div data-tab-panel="calc-servico" id="calc-servico" role="tabpanel" style="display:none;">
      <div class="row" style="gap:var(--spacing-6); flex-wrap:wrap; align-items:flex-start;">
        <div class="card" style="flex:1; min-width:280px;">
          <label class="field"><span class="field-label">Custo estimado do serviço (auto)</span><input class="input" value="R$ 900,00" readonly></label>
          <label class="field"><span class="field-label">Prazo de entrega (dias)</span><input class="input" value="15"></label>
          <label class="field"><span class="field-label">Margem de lucro</span><input class="input" value="35%"></label>
          <div class="card" style="background:var(--color-semantic-status-info-bg); border-color:transparent;">
            <div class="row" style="gap:8px;"><span>✨</span><span class="t-caption">Sugestão da IA: prazos curtos (&lt;7 dias) suportam até +15% de margem.</span></div>
          </div>
        </div>
        ${tiers('R$ 1.200', 'R$ 1.850', 'R$ 2.400')}
      </div>
    </div>

    <div data-tab-panel="calc-produto" id="calc-produto" role="tabpanel" style="display:none;">
      <div class="row" style="gap:var(--spacing-6); flex-wrap:wrap; align-items:flex-start;">
        <div class="card" style="flex:1; min-width:280px;">
          <label class="field"><span class="field-label">Custo de material (auto)</span><input class="input" value="R$ 40,00" readonly></label>
          <label class="field"><span class="field-label">Custo de produção (auto)</span><input class="input" value="R$ 25,00" readonly></label>
          <label class="field"><span class="field-label">Margem de lucro</span><input class="input" value="40%"></label>
          <div class="card" style="background:var(--color-semantic-status-info-bg); border-color:transparent;">
            <div class="row" style="gap:8px;"><span>✨</span><span class="t-caption">Sugestão da IA: produtos físicos no seu nicho vendem bem com margem de 40–60%.</span></div>
          </div>
        </div>
        ${tiers('R$ 91', 'R$ 130', 'R$ 175')}
      </div>
    </div>
    `;
  },
},

{
  path: '/precificacao/custos', section: '5. Precificação', title: '💰 Custos do Negócio', access: 'Funcionalidade completa', chrome: 'app', module: 'precificacao',
  render: () => `
  ${meta('/app/precificacao/custos', 'Funcionalidade completa')}
  <div class="page-header"><div><div class="t-h3">Custos do Negócio</div><div class="page-sub">Alimenta a calculadora e o contexto da IA</div></div><button class="btn btn-primary">+ Adicionar custo</button></div>
  <div class="row" style="gap:var(--spacing-4); flex-wrap:wrap; margin-bottom:var(--spacing-5);">
    ${kpi('Total mensal (fixos)','R$ 1.900','', '')}
    ${kpi('Custos variáveis (mês)','R$ 640','vinculados a projetos','')}
  </div>
  <div class="t-label text-secondary" style="margin-bottom:8px;">CUSTOS FIXOS</div>
  <div class="table-wrap" style="margin-bottom:var(--spacing-6);">
    <table class="grid">
      <tr><th>Descrição</th><th>Categoria</th><th>Recorrência</th><th>Valor</th><th></th></tr>
      <tr><td>Assinatura de software</td><td><span class="chip">Ferramentas</span></td><td>Mensal</td><td class="mono">R$ 180</td><td class="text-secondary">✎ 🗑</td></tr>
      <tr><td>Internet e telefone</td><td><span class="chip">Infra</span></td><td>Mensal</td><td class="mono">R$ 220</td><td class="text-secondary">✎ 🗑</td></tr>
      <tr><td>Contador</td><td><span class="chip">Serviços</span></td><td>Mensal</td><td class="mono">R$ 250</td><td class="text-secondary">✎ 🗑</td></tr>
    </table>
  </div>
  <div class="t-label text-secondary" style="margin-bottom:8px;">CUSTOS VARIÁVEIS (por projeto)</div>
  <div class="table-wrap">
    <table class="grid">
      <tr><th>Descrição</th><th>Projeto vinculado</th><th>Valor</th><th></th></tr>
      <tr><td>Banco de imagens</td><td>Identidade visual — Ana Ferreira</td><td class="mono">R$ 90</td><td class="text-secondary">✎ 🗑</td></tr>
    </table>
  </div>
  `,
},

{
  path: '/precificacao/propostas', section: '5. Precificação', title: '📊 Funil de Propostas', access: 'Funcionalidade completa', chrome: 'app', module: 'precificacao',
  render: () => {
    const col = (label, key, cards) => `
      <div class="kanban-col">
        <div class="kanban-col-head"><span class="kanban-dot" style="background:${PROPOSTA_COLORS[key]}"></span><span class="t-label">${label}</span><span class="text-secondary t-caption">${cards.length}</span></div>
        ${cards.map(c=>`
          <a class="kanban-card" href="#/precificacao/propostas/1">
            <div>${c.client}</div>
            <div class="row" style="justify-content:space-between; color:var(--color-text-secondary-auto); font-size:12px;"><span class="mono">${c.value}</span><span>${c.date}</span></div>
          </a>`).join('')}
      </div>`;
    return `
    ${meta('/app/precificacao/propostas', 'Funcionalidade completa')}
    <div class="page-header"><div><div class="t-h3">Funil de Propostas</div><div class="page-sub">Taxa de conversão: 42%</div></div><button class="btn btn-primary">+ Nova proposta</button></div>
    <div class="row" style="gap:var(--spacing-3); margin-bottom:var(--spacing-5);">
      <select class="input" style="max-width:180px;" aria-label="Filtrar por período"><option>Período: mês atual</option></select>
      <input class="input" style="max-width:220px;" placeholder="🔎 Filtrar por cliente" aria-label="Filtrar por cliente">
    </div>
    <div class="kanban">
      ${col('Rascunho','rascunho',[{client:'Loja Nova Era',value:'R$ 1.200',date:'02/07'}])}
      ${col('Enviada','enviada',[{client:'Ana Ferreira Design',value:'R$ 3.400',date:'28/06'},{client:'Studio Verde',value:'R$ 2.100',date:'30/06'}])}
      ${col('Visualizada','visualizada',[{client:'Café Aroma',value:'R$ 900',date:'01/07'}])}
      ${col('Aceita','aceita',[{client:'Studio Verde',value:'R$ 2.100',date:'25/06'}])}
      ${col('Recusada','recusada',[{client:'Loja Boa Vista',value:'R$ 1.500',date:'20/06'}])}
    </div>
    `;
  },
},

{
  path: '/precificacao/propostas/:id', section: '5. Precificação', title: '✏️ Editor de Proposta', access: 'Funcionalidade completa', chrome: 'app', module: 'precificacao',
  render: () => `
  ${meta('/app/precificacao/propostas/:id', 'Funcionalidade completa')}
  <div class="page-header"><div><div class="t-h3">Editor de Proposta</div><div class="page-sub">Ana Ferreira Design</div></div>
    <div class="row" style="gap:8px;"><button class="btn btn-ghost">⬇ PDF</button><button class="btn btn-secondary">✉ Enviar por e-mail</button><button class="btn btn-primary">🔗 Copiar link público</button></div>
  </div>
  <div class="row" style="gap:var(--spacing-6); align-items:flex-start; flex-wrap:wrap;">
    <div class="stack" style="flex:1; min-width:320px; gap:var(--spacing-4);">
      <div class="card">
        <div class="card-title">Dados do cliente</div>
        <label class="field"><span class="field-label">Nome</span><input class="input" value="Ana Ferreira"></label>
        <label class="field"><span class="field-label">E-mail</span><input class="input" value="ana@email.com"></label>
      </div>
      <div class="card">
        <div class="card-title">Itens da proposta</div>
        <div class="table-wrap"><table class="grid">
          <tr><th>Descrição</th><th>Qtd</th><th>Valor</th></tr>
          <tr><td>Logotipo + variações</td><td>1</td><td class="mono">1.800</td></tr>
          <tr><td>Manual de marca</td><td>1</td><td class="mono">900</td></tr>
        </table></div>
      </div>
      <div class="card">
        <div class="row" style="justify-content:space-between;"><div class="card-title" id="texto-apresentacao-label">Texto de apresentação</div><button class="btn btn-accent btn-sm">✨ Gerar com IA</button></div>
        <textarea class="input" rows="4" aria-labelledby="texto-apresentacao-label">Olá Ana! Preparei esta proposta pensando em fortalecer a identidade visual do seu negócio...</textarea>
      </div>
    </div>
    <div class="card" style="flex:1; min-width:280px; background:var(--color-bg-secondary-auto);">
      <div class="t-label text-secondary" style="margin-bottom:8px;">PREVIEW DO PDF</div>
      <div style="background:#fff; border-radius:var(--borderRadius-md); padding:var(--spacing-4); min-height:320px; box-shadow:var(--shadow-sm);">
        <div class="t-h4">Proposta — Ana Ferreira Design</div>
        <div class="hr"></div>
        <p class="t-caption text-secondary">Total: R$ 2.700,00</p>
      </div>
    </div>
  </div>
  `,
},

// ===================== 6. MÓDULO COMUNIDADE =====================
{
  path: '/comunidade/feed', section: '6. Comunidade', title: '🌐 Feed', access: 'Funcionalidade completa', chrome: 'app', module: 'comunidade',
  render: () => `
  ${meta('/app/comunidade/feed', 'Funcionalidade completa')}
  <div class="row" style="gap:var(--spacing-5); align-items:flex-start; flex-wrap:wrap;">
    <div class="stack" style="width:200px; gap:6px;">
      <div class="t-label text-secondary" style="margin-bottom:4px;">IR PARA O FÓRUM</div>
      <div class="local-nav">
        ${[['financeiro','Financeiro'],['marketing','Marketing'],['juridico','Jurídico'],['tech','Tech'],['geral','Geral']].map(([k,c])=>`<a class="local-nav-item" href="#/comunidade/forum/${k}" style="text-decoration:none;">${c}</a>`).join('')}
      </div>
    </div>
    <div class="stack" style="flex:2; min-width:320px; gap:var(--spacing-4);">
      <div class="row" style="justify-content:space-between;">
        <div class="row" style="gap:8px;" role="group" aria-label="Filtrar por tipo">${['Todos','Post','Dúvida','Parceria','Oportunidade'].map((f,i)=>`<button type="button" class="chip ${i===0?'active':''}" aria-pressed="${i===0}" onclick="Venturi.filterFeed('${f}', this)">${f}</button>`).join('')}</div>
        <button class="btn btn-primary btn-sm">+ Publicar</button>
      </div>
      <div id="feed-posts" class="stack" style="gap:var(--spacing-4);">
        ${[
          {name:'Carlos M.', badge:'Dúvida', text:'Como vocês lidam com clientes que pedem desconto após a proposta aceita?'},
          {name:'Fernanda R.', badge:'Post', text:'Fechei meu primeiro contrato de R$ 5k usando a calculadora do Venturi 🎉'},
          {name:'Diego A.', badge:'Oportunidade', text:'Preciso de um parceiro dev para projeto de e-commerce, alguém disponível?'},
        ].map(p=>`
          <a class="card" href="#/comunidade/post/1" data-type="${p.badge}">
            <div class="row" style="justify-content:space-between; margin-bottom:8px;">
              <div class="row" style="gap:8px;"><div class="avatar avatar-sm">${p.name[0]}</div><b>${p.name}</b><span class="badge badge-neutral">⭐ 120</span></div>
              <span class="badge badge-info">${p.badge}</span>
            </div>
            <p class="t-body">${p.text}</p>
            <div class="row" style="gap:var(--spacing-4); margin-top:10px; color:var(--color-text-secondary-auto); font-size:13px;"><span>♥ 24</span><span>💬 8 comentários</span></div>
          </a>`).join('')}
      </div>
    </div>
    <div class="stack" style="width:200px; gap:8px;">
      <div class="t-label text-secondary" style="margin-bottom:4px;">EM DESTAQUE</div>
      ${['Fernanda R.','Diego A.','Carlos M.'].map(n=>`<div class="row" style="gap:8px;"><div class="avatar avatar-sm">${n[0]}</div><span class="t-caption">${n}</span></div>`).join('')}
    </div>
  </div>
  `,
},

{
  path: '/comunidade/forum/:categoria', section: '6. Comunidade', title: '💬 Fórum por Categoria', access: 'Funcionalidade completa', chrome: 'app', module: 'comunidade',
  render: (params) => {
    const CATS = {
      financeiro: { label: 'Financeiro', desc: 'Tópicos sobre gestão financeira solo' },
      marketing: { label: 'Marketing', desc: 'Divulgação, redes sociais e aquisição de clientes' },
      juridico: { label: 'Jurídico', desc: 'Contratos, MEI e questões legais do dia a dia' },
      tech: { label: 'Tech', desc: 'Ferramentas, automações e stack de trabalho' },
      geral: { label: 'Geral', desc: 'Papo livre entre empreendedores solo' },
    };
    const key = (params && CATS[params.categoria]) ? params.categoria : 'financeiro';
    const cat = CATS[key];
    return `
    ${meta('/app/comunidade/forum/:categoria', 'Funcionalidade completa')}
    <div class="page-header"><div><div class="t-h3">Fórum — ${cat.label}</div><div class="page-sub">${cat.desc}</div></div><button class="btn btn-primary">+ Novo tópico</button></div>
    <div class="tabs">
      ${Object.entries(CATS).map(([k,c])=>`<a class="tab ${k===key?'active':''}" href="#/comunidade/forum/${k}">${c.label}</a>`).join('')}
    </div>
    <div class="row" style="gap:var(--spacing-3); margin-bottom:var(--spacing-4);">
      <div role="group" aria-label="Ordenar tópicos" style="display:inline-flex; gap:var(--spacing-2);">
        <button type="button" class="chip active" aria-pressed="true" onclick="Venturi.selectChip(this)">Mais recentes</button>
        <button type="button" class="chip" aria-pressed="false" onclick="Venturi.selectChip(this)">Mais curtidos</button>
      </div>
    </div>
    <div class="stack" style="gap:var(--spacing-3);">
      <a class="card" href="#/comunidade/post/1" style="border-left:3px solid var(--color-brand-matcha);">
        <div class="badge badge-warning" style="margin-bottom:6px;">📌 Fixado</div>
        <div class="card-title">Guia: como declarar como MEI em 2026</div>
        <div class="text-secondary t-caption">42 respostas · última em 2h atrás</div>
      </a>
      ${['Vale a pena abrir CNPJ ou continuar autônomo?','Como separar conta pessoal da PJ?','Dicas de reserva de emergência para solo founders'].map((t,i)=>`
        <a class="card" href="#/comunidade/post/1"><div class="card-title">${t}</div><div class="text-secondary t-caption">${(i+1)*4+2} respostas</div></a>`).join('')}
    </div>
    `;
  },
},

{
  path: '/comunidade/post/:id', section: '6. Comunidade', title: '📝 Tópico Individual', access: 'Funcionalidade completa', chrome: 'app', module: 'comunidade',
  render: () => `
  ${meta('/app/comunidade/post/:id', 'Funcionalidade completa')}
  <div class="row" style="gap:var(--spacing-5); align-items:flex-start; flex-wrap:wrap;">
    <div class="stack" style="flex:2; min-width:320px; gap:var(--spacing-4);">
      <div class="card">
        <div class="row" style="gap:8px; margin-bottom:8px;"><div class="avatar avatar-sm">C</div><b>Carlos M.</b><span class="t-caption text-secondary">2h atrás</span></div>
        <div class="t-h4" style="margin-bottom:6px;">Como vocês lidam com clientes que pedem desconto após a proposta aceita?</div>
        <p class="t-body">Aconteceu comigo essa semana e fiquei sem saber a melhor forma de responder sem perder o cliente...</p>
        <div class="row" style="gap:var(--spacing-4); margin-top:10px; color:var(--color-text-secondary-auto); font-size:13px;"><span>♥ 24</span><span>💬 8 comentários</span><span>útil ✓ 5</span></div>
      </div>
      <div class="field"><textarea class="input" rows="2" placeholder="Escreva uma resposta..." aria-label="Escreva uma resposta"></textarea></div>
      <div class="stack" style="gap:var(--spacing-3); padding-left:var(--spacing-4); border-left:2px solid var(--color-border-auto);">
        <div class="card"><div class="row" style="gap:8px; margin-bottom:4px;"><div class="avatar avatar-sm">F</div><b>Fernanda R.</b></div><p class="t-body">Eu sempre deixo claro no contrato que reajustes de escopo geram novo valor.</p>
          <div class="stack" style="gap:8px; margin-top:8px; padding-left:var(--spacing-4); border-left:2px solid var(--color-border-auto);">
            <div class="card"><div class="row" style="gap:8px; margin-bottom:4px;"><div class="avatar avatar-sm">C</div><b>Carlos M.</b></div><p class="t-body">Faz sentido, vou adicionar essa cláusula. Obrigado!</p></div>
          </div>
        </div>
      </div>
    </div>
    <div class="card" style="width:240px;">
      <div class="row" style="gap:8px; margin-bottom:8px;"><div class="avatar avatar-md">C</div><div><b>Carlos M.</b><div class="t-caption text-secondary">⭐ 120 reputação</div></div></div>
      <div class="row" style="gap:4px; flex-wrap:wrap; margin-bottom:12px;"><span class="badge badge-info">Top contribuidor</span><span class="badge badge-neutral">MEI</span></div>
      <a class="btn btn-secondary btn-block btn-sm" href="#/comunidade/mensagens">Enviar mensagem</a>
    </div>
  </div>
  `,
},

{
  path: '/comunidade/mensagens', section: '6. Comunidade', title: '✉️ Mensagens Diretas', access: 'Funcionalidade completa', chrome: 'app', module: 'comunidade',
  render: () => {
    const convItem = (key, c, active) => `
      <div class="row" data-conv-item="${key}" style="padding:var(--spacing-3); gap:10px; cursor:pointer; ${active?'background:var(--color-bg-secondary-auto);':''}" onclick="Venturi.openConversation('${key}')">
        <div style="position:relative;"><div class="avatar avatar-md">${c.n[0]}</div>${c.online?`<span style="position:absolute;bottom:0;right:0;width:9px;height:9px;border-radius:50%;background:var(--color-semantic-status-success);border:2px solid #fff;"></span>`:''}</div>
        <div style="flex:1; min-width:0;"><div class="row" style="justify-content:space-between;"><b style="font-size:14px;">${c.n}</b>${c.unread?`<span class="badge" style="background:var(--color-brand-cherry);color:#fff;">${c.unread}</span>`:''}</div><div class="t-caption text-secondary" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c.last}</div></div>
      </div>`;
    const first = CONVERSATIONS.fernanda;
    return `
    ${meta('/app/comunidade/mensagens', 'Funcionalidade completa')}
    <div class="card" style="display:flex; padding:0; height:520px; overflow:hidden;">
      <div style="width:260px; border-right:1px solid var(--color-border-auto); display:flex; flex-direction:column;">
        <div style="padding:var(--spacing-3);"><input class="input" placeholder="🔎 Buscar usuário..." aria-label="Buscar usuário"></div>
        <div class="stack" style="overflow-y:auto;" id="conv-list">
          ${convItem('fernanda', CONVERSATIONS.fernanda, true)}
          ${convItem('diego', CONVERSATIONS.diego, false)}
          ${convItem('studio', CONVERSATIONS.studio, false)}
        </div>
      </div>
      <div style="flex:1; display:flex; flex-direction:column;">
        <div class="row" id="conv-header" style="padding:var(--spacing-3) var(--spacing-4); border-bottom:1px solid var(--color-border-auto); gap:10px;">
          <div class="avatar avatar-md">${first.n[0]}</div><div><b>${first.n}</b><div class="t-caption" style="color:var(--color-semantic-status-success);">● online</div></div>
        </div>
        <div class="stack" id="conv-messages" style="flex:1; padding:var(--spacing-4); gap:10px; overflow-y:auto;">
          ${first.messages.map(m=>`<div class="chat-bubble ${m.who}">${m.text}</div>`).join('')}
        </div>
        <div class="row" style="padding:var(--spacing-3); gap:8px; border-top:1px solid var(--color-border-auto);"><input class="input" style="flex:1;" placeholder="Escreva uma mensagem..." aria-label="Escreva uma mensagem"><button class="btn btn-primary btn-icon" aria-label="Enviar mensagem">➤</button></div>
      </div>
    </div>
    `;
  },
},

// ===================== 7. PERFIL E CONFIGURAÇÕES =====================
{
  path: '/perfil/:id', section: '7. Perfil e Configurações', title: '👤 Perfil Público', access: '', chrome: 'app', module: 'conta',
  render: () => `
  ${meta('/app/perfil/:id', '')}
  <div class="card" style="max-width:640px;">
    <div class="row" style="gap:16px; margin-bottom:var(--spacing-4);">
      <div class="avatar avatar-lg">CM</div>
      <div><div class="t-h3">Carlos M.</div><div class="text-secondary">Consultoria financeira para autônomos</div>
        <div class="row" style="gap:6px; margin-top:6px;"><span class="badge badge-info">⭐ 120 reputação</span><span class="badge badge-neutral">Top contribuidor</span></div>
      </div>
      <a class="btn btn-secondary" style="margin-left:auto;" href="#/comunidade/mensagens">Enviar mensagem direta</a>
    </div>
    <div class="hr"></div>
    <div class="t-label text-secondary" style="margin:var(--spacing-4) 0 8px;">POSTS PUBLICADOS</div>
    <div class="stack" style="gap:10px;">
      <div class="card"><b>Como vocês lidam com clientes que pedem desconto...</b><div class="t-caption text-secondary">24 curtidas · 8 comentários</div></div>
      <div class="card"><b>Dicas de reserva de emergência para solo founders</b><div class="t-caption text-secondary">31 curtidas · 12 comentários</div></div>
    </div>
  </div>
  `,
},

{
  path: '/configuracoes', section: '7. Perfil e Configurações', title: '⚙️ Configurações da Conta', access: '', chrome: 'app', module: 'conta',
  render: () => `
  ${meta('/app/configuracoes', '')}
  <div class="page-header"><div class="t-h3">Configurações</div></div>
  <div class="row" style="gap:var(--spacing-6); align-items:flex-start; flex-wrap:wrap;">
    <div class="local-nav" style="width:200px;">
      ${['Dados pessoais','Segurança','Preferências','Plano e uso da IA','Notificações','Zona de perigo'].map((s,i)=>`<div class="local-nav-item ${i===0?'active':''}">${s}</div>`).join('')}
    </div>
    <div class="stack" style="flex:1; min-width:320px; gap:var(--spacing-4);">
      <div class="card">
        <div class="card-title">Dados pessoais e do negócio</div>
        <label class="field"><span class="field-label">Nome</span><input class="input" value="Carlos M."></label>
        <label class="field"><span class="field-label">Nicho</span><input class="input" value="Consultoria financeira"></label>
      </div>
      <div class="card">
        <div class="card-title">Segurança</div>
        <button class="btn btn-secondary">Alterar senha</button>
      </div>
      <div class="card">
        <div class="card-title">Preferências</div>
        <div class="row" style="justify-content:space-between; margin-bottom:var(--spacing-3);"><span>Modo escuro</span><button class="btn btn-ghost btn-sm" onclick="window.Venturi.toggleDark()">Alternar 🌙/☀️</button></div>
        <div class="row" style="justify-content:space-between;"><span id="idioma-label">Idioma</span><select class="input" style="width:160px;" aria-labelledby="idioma-label"><option>Português (BR)</option><option>English</option></select></div>
      </div>
      <div class="card">
        <div class="row" style="justify-content:space-between;"><div><div class="card-title">Plano atual: Free</div><div class="text-secondary t-caption">12/50 mensagens de IA usadas hoje</div></div><button class="btn btn-primary">Fazer upgrade</button></div>
        <div class="progress" style="margin-top:10px;"><span style="width:24%"></span></div>
      </div>
      <div class="card" style="border-color:var(--color-semantic-status-error);">
        <div class="card-title" style="color:var(--color-semantic-status-error);">Zona de perigo</div>
        <button class="btn" style="color:var(--color-semantic-status-error); border:1px solid var(--color-semantic-status-error); background:transparent;">Deletar conta</button>
      </div>
    </div>
  </div>
  `,
},

];
