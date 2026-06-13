<div align="center">

<br/>

<h1>VENTURI</h1>

**Plataforma Multiplataforma para Empreendedores Solo**

*Organização · Precificação · Comunicação · Inteligência Artificial*

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![React Native](https://img.shields.io/badge/React_Native-Expo-0EA5E9?style=flat-square&logo=expo&logoColor=white)](https://expo.dev)
[![Electron](https://img.shields.io/badge/Electron-Desktop-47848F?style=flat-square&logo=electron&logoColor=white)](https://electronjs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://mysql.com)
[![Claude API](https://img.shields.io/badge/Claude_API-Anthropic-CC785C?style=flat-square)](https://anthropic.com)
[![License](https://img.shields.io/badge/Licença-MIT-green?style=flat-square)](LICENSE)

<br/>

> **"O Venturi é o único lugar onde o empreendedor solo organiza seu negócio, cobra o preço certo e ainda se conecta com quem vive os mesmos desafios — tudo em uma plataforma, com IA ao lado."**

<br/>

[Sobre o Projeto](#-sobre-o-projeto) · [Funcionalidades](#-funcionalidades) · [Stack](#-stack-tecnológica) · [Banco de Dados](#-banco-de-dados) · [Instalação](#-instalação) · [Estrutura](#-estrutura-do-repositório) · [Equipe](#-equipe)

</div>

---

## 📌 Sobre o Projeto

O **Venturi** nasceu da observação das dores reais de empreendedores solo brasileiros — terapeutas, artesãs, designers freelancers — que enfrentam três males fundamentais no dia a dia:

| Dor | Problema Real |
|-----|--------------|
| **Desorganização** | Tarefas anotadas no papel, WhatsApp e planilhas fragmentadas, sem visão centralizada do negócio |
| **Precificação equivocada** | Cobrança no "achismo", sem considerar custos reais, horas trabalhadas e margem de lucro |
| **Falta de comunidade** | Ausência de um espaço focado em negócios para trocar experiências e buscar parcerias |

O Venturi resolve os três problemas em **uma única plataforma**, potencializada por **Inteligência Artificial** (Claude API), disponível em Desktop, Web e Mobile.

Este projeto é o **TCC do Curso Técnico em Desenvolvimento de Sistemas — COTIL 2026/2027**.

---

## ✨ Funcionalidades

### 🗂️ Módulo de Organização
- **Kanban Visual** com drag & drop entre colunas (A fazer / Em andamento / Concluído)
- **Projetos e Tarefas** com subtarefas, prioridade, prazo e histórico
- **Timer Pomodoro** integrado por tarefa (25 min foco / 5 min pausa / 15 min pausa longa)
- **Planilhas Inteligentes** com fórmulas de negócio embutidas — Fluxo de Caixa, DRE, Metas, Marketing — exportáveis para `.xlsx`
- **Chapéus do Empreendedor** — alterne entre os 4 papéis do seu negócio: Financeiro, Operacional, Marketing e Vendas
- **Dashboard de KPIs** com gráficos de horas por chapéu e receita vs. despesa

### 💰 Módulo de Precificação
- **Calculadora de Preço** por hora, por serviço e por produto físico
- **Cadastro de Custos** fixos (mensal/anual/único) e variáveis por projeto
- **Resultado em 3 faixas**: preço mínimo, ideal e premium
- **Gerador de Proposta em PDF** com template profissional via Puppeteer
- **Link Público de Proposta** — cliente visualiza e assina sem precisar de cadastro
- **Funil de Propostas** Kanban com 5 estágios: Rascunho → Enviada → Visualizada → Aceita → Recusada

### 🌐 Módulo de Comunidade
- **Feed** de publicações em ordem cronológica com scroll infinito
- **Fórum** organizado por nicho: Financeiro, Marketing, Jurídico, Tech e Geral
- **Comentários aninhados** com sistema de votos e marcação "útil"
- **Mensagens Diretas** em tempo real via Socket.io
- **Sistema de Reputação** com pontos e badges por contribuições úteis
- **Publicação de Oportunidades e Parcerias**

### 🤖 SoloPlan AI — Assistente de IA
O assistente permeia **todas as telas** como um drawer lateral e opera em três camadas progressivas:

**Camada 1 — Automações**
- Alertas de prazo automáticos (2 dias antes do vencimento)
- Status de tarefa atualizado automaticamente quando subtarefas são concluídas
- Criação de tarefas recorrentes

**Camada 2 — Análise de Padrões**
- *"Você gasta 60% do tempo em Operacional e apenas 10% em Vendas"*
- Identificação do Princípio de Pareto nos clientes (80/20)
- Projeção de receita dos próximos 3 meses
- Detecção de padrões de atraso por tipo de projeto

**Camada 3 — IA Generativa (Claude API)**
- Chat em linguagem natural em qualquer tela da plataforma
- Criação automática de projetos e tarefas por comando de texto
- Sugestão de preço baseada nos custos cadastrados do usuário
- Preenchimento assistido de planilhas financeiras
- Geração automática do texto de apresentação da proposta comercial
- Respostas a dúvidas de gestão e empreendedorismo

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| **Backend / API** | Node.js + Express | JavaScript unificado com o frontend; simples para aprender em equipe |
| **Banco de Dados** | MySQL + Sequelize ORM | Já conhecido pela equipe; ORM facilita queries complexas |
| **Desktop** | Electron + HTML/CSS/JS | Permite reaproveitar as habilidades web da equipe |
| **Web** | React.js (Vite) | Componentização, mercado forte, reaproveitamento de lógica com mobile |
| **Mobile** | React Native (Expo) | Mesmo React do web; reaproveitam lógica e componentes |
| **Inteligência Artificial** | Claude API (Anthropic) | Melhor desempenho em português, contexto longo, análise holística dos dados do usuário |
| **Geração de PDF** | Puppeteer | Gera PDF profissional a partir de HTML customizado |
| **Autenticação** | JWT + bcrypt | Padrão de mercado; seguro e simples de implementar |
| **Planilha embutida** | Handsontable | Grid editável com suporte a fórmulas no frontend |
| **Gráficos** | Chart.js | Leve, bonito e fácil de integrar com React |
| **Tempo real** | Socket.io | Chat de mensagens diretas em tempo real |
| **Exportação XLSX** | SheetJS | Exportar planilhas para `.xlsx` direto do navegador |
| **Versionamento** | GitHub + Git Flow | Commits organizados por feature; histórico rastreável |
| **Design / Protótipo** | Figma | Prototipagem antes de codar; assets exportáveis em SVG |
| **Deploy API** | Railway | Gratuito para MVPs; deploy simples via CLI |
| **Deploy Web** | Vercel | Deploy automático pelo GitHub; domínio gratuito |

### Distribuição por plataforma

| Funcionalidade | Desktop (Electron) | Web (React) | Mobile (React Native) |
|---|---|---|---|
| Organização / Kanban | ✅ Completo | ✅ Completo | ⚡ Simplificado |
| Planilhas inteligentes | ✅ Completo | ⚡ Edição básica | 👁️ Somente resumo |
| Precificação | ✅ Completo | ✅ Completo | ⚡ Calculadora rápida |
| Gerador de proposta PDF | ✅ Completo | ✅ Completo | 👁️ Somente visualização |
| Rede Social / Fórum | 👁️ Somente leitura | ✅ Completo | ✅ Completo |
| Chat com IA | ✅ Completo | ✅ Completo | ⚡ Simplificado |
| Dashboard de KPIs | ✅ Completo | ✅ Completo | ⚡ Resumido |

---

## 🗄️ Banco de Dados

O Venturi utiliza **MySQL** (hospedado no Railway) como banco central. Todas as plataformas consomem a mesma API REST. O Desktop mantém adicionalmente um **SQLite local** para funcionamento offline, com sincronização automática ao reconectar.

**19 tabelas distribuídas em 5 módulos:**

```
📦 Usuários & Auth       → usuarios, refresh_tokens, chapeus, badges
📋 Organização           → projetos, tarefas, subtarefas, timer_sessoes, planilhas, celulas
💰 Precificação          → custos_fixos, custos_variaveis, propostas, itens_proposta
🌐 Comunidade            → categorias_forum, posts, comentarios, curtidas, mensagens
🤖 Inteligência Artificial → ia_historico, ia_uso_diario
🖥️ Sync Offline (SQLite) → sync_fila, sync_estado
```

> **Decisões de design notáveis:**
> - UUIDs v4 nas tabelas principais — garante unicidade em criações offline sem depender do servidor
> - Curtidas polimórficas — uma tabela cobre posts e comentários via `alvo_tipo`
> - Contadores denormalizados — `posts.curtidas` evita `COUNT(*)` a cada render de feed
> - `ia_uso_diario` separada — controle de limite de API por plano sem varrer o histórico completo

---

## 🚀 Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org) v22 ou superior
- [MySQL](https://mysql.com) v8 ou superior (ou conta no [Railway](https://railway.app))
- [Git](https://git-scm.com)
- Conta na [Anthropic](https://console.anthropic.com) para obter a `ANTHROPIC_API_KEY`
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (apenas para Mobile)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/venturi.git
cd venturi
```

### 2. Configure o banco de dados

```bash
# Crie o banco de dados MySQL
mysql -u root -p -e "CREATE DATABASE venturi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Execute as migrations
cd packages/api
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` dentro de `packages/api/`:

```env
# Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_NAME=venturi
DB_USER=root
DB_PASS=sua_senha

# JWT
JWT_SECRET=seu_segredo_jwt_super_seguro
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=30d

# Claude API
ANTHROPIC_API_KEY=sk-ant-...

# Servidor
PORT=3001
NODE_ENV=development

# Frontend (CORS)
CLIENT_URL=http://localhost:5173
```

### 4. Inicie a API

```bash
cd packages/api
npm run dev
# API disponível em http://localhost:3001
```

### 5. Inicie a aplicação Web

```bash
cd packages/web
npm install
npm run dev
# Aplicação disponível em http://localhost:5173
```

### 6. Inicie o Desktop (Electron)

```bash
cd packages/desktop
npm install
npm run dev
# Abre a janela do Electron automaticamente
```

### 7. Inicie o Mobile (Expo)

```bash
cd packages/mobile
npm install
npx expo start
# Escaneie o QR code com o app Expo Go no seu celular
```

---

## 📁 Estrutura do Repositório

```
venturi/
├── packages/
│   ├── api/                        # Backend Node.js + Express
│   │   ├── src/
│   │   │   ├── controllers/        # Lógica de cada módulo
│   │   │   ├── middleware/         # Auth, rate limit, error handler
│   │   │   ├── models/             # Modelos Sequelize (19 tabelas)
│   │   │   ├── routes/             # Definição das rotas REST
│   │   │   ├── services/           # Lógica de negócio e integrações
│   │   │   │   ├── ai.service.js   # Integração Claude API
│   │   │   │   ├── pdf.service.js  # Geração de PDF com Puppeteer
│   │   │   │   └── socket.service.js # Chat em tempo real
│   │   │   └── app.js
│   │   ├── database/
│   │   │   ├── migrations/         # Migrations Sequelize
│   │   │   └── seeders/            # Seeds iniciais
│   │   └── package.json
│   │
│   ├── web/                        # Frontend React.js (Vite)
│   │   ├── src/
│   │   │   ├── components/         # Componentes reutilizáveis
│   │   │   │   ├── Kanban/
│   │   │   │   ├── SoloPlanAI/     # Drawer de IA global
│   │   │   │   ├── Navbar/
│   │   │   │   └── Sidebar/
│   │   │   ├── pages/              # Páginas por módulo
│   │   │   │   ├── auth/           # Login, Cadastro, Recuperação
│   │   │   │   ├── organizacao/    # Dashboard, Projetos, Kanban, Planilhas
│   │   │   │   ├── precificacao/   # Calculadora, Custos, Propostas
│   │   │   │   └── comunidade/     # Feed, Fórum, Mensagens
│   │   │   ├── hooks/              # Custom hooks (useAuth, useSocket, useIA)
│   │   │   ├── services/           # Chamadas à API REST
│   │   │   └── main.jsx
│   │   └── package.json
│   │
│   ├── mobile/                     # React Native (Expo)
│   │   ├── src/
│   │   │   ├── screens/            # Telas por módulo
│   │   │   ├── navigation/         # Stack, Tab e Drawer navigators
│   │   │   ├── components/         # Componentes mobile
│   │   │   └── hooks/              # Hooks compartilhados com web
│   │   ├── app.json
│   │   └── package.json
│   │
│   └── desktop/                    # Electron
│       ├── src/
│       │   ├── main.js             # Processo principal Electron
│       │   ├── preload.js          # Bridge segura renderer ↔ main
│       │   ├── renderer/           # UI web embutida no Electron
│       │   └── database/           # SQLite local + sync_fila
│       └── package.json
│
├── database/
│   └── schema.sql                  # Schema completo para referência
│
├── docs/
│   ├── TCC_Venturi.pdf             # Documento de projeto completo
│   ├── ER_Banco_de_Dados.pdf       # Diagrama Entidade-Relacionamento
│   └── Estrutura_Paginas_Web.pdf   # Mapa de rotas e páginas
│
├── .github/
│   └── workflows/
│       ├── api-deploy.yml          # CI/CD → Railway
│       └── web-deploy.yml          # CI/CD → Vercel
│
└── README.md
```

---

## 🗺️ Mapa de Rotas — Web

| Módulo | Página | Rota |
|--------|--------|------|
| **Público** | Landing Page | `/` |
| **Público** | Cadastro | `/cadastro` |
| **Público** | Login | `/login` |
| **Público** | Recuperação de senha | `/recuperar-senha` |
| **Público** | Proposta do cliente | `/proposta/:token` |
| **Onboarding** | Wizard inicial | `/onboarding` |
| **Organização** | Dashboard | `/app/dashboard` |
| **Organização** | Listagem de projetos | `/app/projetos` |
| **Organização** | Kanban do projeto | `/app/projetos/:id/kanban` |
| **Organização** | Planilhas inteligentes | `/app/planilhas` |
| **Organização** | Chapéus | `/app/chapeus` |
| **Organização** | Timer e relatório | `/app/timer` |
| **Precificação** | Calculadora | `/app/precificacao/calculadora` |
| **Precificação** | Custos do negócio | `/app/precificacao/custos` |
| **Precificação** | Funil de propostas | `/app/precificacao/propostas` |
| **Precificação** | Editor de proposta | `/app/precificacao/propostas/:id` |
| **Comunidade** | Feed | `/app/comunidade/feed` |
| **Comunidade** | Fórum por categoria | `/app/comunidade/forum/:categoria` |
| **Comunidade** | Tópico individual | `/app/comunidade/post/:id` |
| **Comunidade** | Mensagens diretas | `/app/comunidade/mensagens` |
| **Global** | SoloPlan AI | Drawer — qualquer página |
| **Conta** | Perfil público | `/app/perfil/:id` |
| **Conta** | Configurações | `/app/configuracoes` |

---

## 📋 Requisitos do Sistema

### Requisitos Funcionais

**Módulo Organização**
- `RF01` — Criar, editar e excluir projetos e tarefas
- `RF02` — Quadro Kanban com drag & drop entre colunas
- `RF03` — Timer integrado por tarefa (modo Pomodoro)
- `RF04` — Planilha financeira com fórmulas de negócio
- `RF05` — Alternância de Chapéus do Empreendedor
- `RF06` — Dashboard com KPIs: tarefas, horas, receita × despesa

**Módulo Precificação**
- `RF07` — Cadastro de custos fixos e variáveis
- `RF08` — Calculadora de preço por hora, serviço e produto
- `RF09` — Sugestão de margem por nicho com apoio da IA
- `RF10` — Gerador de proposta em PDF com template profissional
- `RF11` — Link público de proposta para visualização pelo cliente
- `RF12` — Funil de propostas com 5 estágios

**Módulo Comunidade**
- `RF13` — Feed de publicações em ordem cronológica
- `RF14` — Fórum organizado por nicho/categoria
- `RF15` — Mensagens diretas em tempo real (Socket.io)
- `RF16` — Sistema de reputação com curtidas e badges
- `RF17` — Publicação de oportunidades e parcerias

**Módulo IA**
- `RF18` — Chat com SoloPlan AI em linguagem natural
- `RF19` — Criação automática de projetos/tarefas por comando de texto
- `RF20` — Sugestão de preço baseada nos dados do usuário
- `RF21` — Preenchimento assistido de planilhas
- `RF22` — Respostas a dúvidas de gestão e empreendedorismo

### Requisitos Não Funcionais

| Código | Requisito |
|--------|-----------|
| `RNF01` | Sistema funcional nas 3 plataformas com sincronização em tempo real via API REST |
| `RNF02` | Autenticação segura com JWT (15 min) + refresh token (30 dias) + bcrypt |
| `RNF03` | Banco de dados MySQL normalizado com índices otimizados para as queries mais frequentes |
| `RNF04` | IA com limite de requisições por usuário/dia configurável por plano (controle de custo) |
| `RNF05` | Dados sensíveis do usuário criptografados; tokens nunca expostos em logs |
| `RNF06` | Interface 100% em português brasileiro |
| `RNF07` | Dark mode em todas as plataformas |

---

## 🔄 Fluxo de Trabalho da Equipe

O projeto adota **mob programming** — todos codificam juntos, sem funções fixas — garantindo conhecimento compartilhado e qualidade uniforme.

### Convenção de branches (Git Flow)

```
main          → código de produção, sempre estável
develop       → integração contínua das features
feature/*     → uma branch por funcionalidade
              → ex: feature/kanban, feature/login, feature/precificacao
```

### Regras de commit

```bash
# Formato
tipo(escopo): descrição curta em português

# Exemplos
feat(kanban): implementar drag & drop entre colunas
fix(auth): corrigir expiração do refresh token
docs(readme): adicionar instruções de instalação
refactor(api): extrair lógica de preço para service
```

### Regras do time

- ✅ Mínimo de 1 commit por sessão de trabalho com mensagem descritiva
- ✅ Code review coletivo obrigatório antes de merge para `develop`
- ✅ Reunião de alinhamento de 10 minutos no início de cada sessão
- ✅ Abrir Issue no GitHub para cada bug encontrado
- 🚫 **Regra de ouro:** nunca avançar de fase sem o módulo atual funcionando de ponta a ponta

---

## 📅 Cronograma Resumido

| Período | Fase | Principais Entregas |
|---------|------|---------------------|
| Mai/Jun 2026 | **Fase 0** — Fundação | Logo, identidade visual, repositórios, modelagem do banco, protótipos Figma |
| Jun/Jul 2026 | **Fase 1** — API + Auth | API Node.js, banco MySQL, autenticação JWT, telas de login nas 3 plataformas |
| Ago 2026 | **Fase 2** — Kanban | CRUD projetos/tarefas, quadro Kanban com drag & drop |
| Set 2026 | **Fase 3** — Chapéus + Timer | Sistema de Chapéus, Timer Pomodoro, relatório de horas |
| Out 2026 | **Fase 4** — Planilhas | Grid Handsontable, fórmulas de negócio, exportação XLSX |
| Nov 2026 | **Fase 5** — Precificação | Cadastro de custos, calculadora de preço |
| Dez 2026 | **Fase 6** — Proposta PDF | Gerador PDF (Puppeteer), link público, funil de propostas |
| Jan 2027 | **Fase 7** — Rede Social | Feed, fórum, curtidas, sistema de reputação |
| Fev 2027 | **Fase 8** — Mensagens + IA | Chat tempo real (Socket.io), integração Claude API |
| Mar 2027 | **Fase 9** — Mobile | Expo/React Native, telas principais, notificações push |
| Abr 2027 | **Fase 10** — Dashboard | Chart.js, KPIs, dark mode, animações, onboarding |
| Mai/Jul 2027 | **Fase 11** — Entrega | Testes, deploy Railway/Vercel, APK Android, banca |

---

## 🎨 Identidade Visual

| Elemento | Valor |
|----------|-------|
| **Cor primária** | Cherry `#670626` |
| **Cor secundária** | Matcha `#bad797` |
| **Cherry Mid** | `#4a0419` |
| **Cherry Deep** | `#2d0210` |
| **Dark** | `#1a1014` |
| **Tipografia de display** | Syne 800 |
| **Tipografia de interface** | DM Sans 300/400 |
| **Símbolo** | V com traço paralelo à perna direita em Matcha — representa o fluxo acelerando |

> O nome **Venturi** é inspirado no efeito físico homônimo: um fluido acelera ao passar por um canal estreito. A metáfora representa o que a plataforma faz — com os recursos certos, o empreendedor solo ganha velocidade para crescer.

---

## 💼 Modelo de Negócio (Futuro)

| Plano | Preço | Limites |
|-------|-------|---------|
| **Free** | Grátis | Até 3 projetos, 10 tarefas/mês, 5 propostas/mês, acesso limitado à IA |
| **Pro** | R$ 49–99/mês | Projetos, tarefas e propostas ilimitados, IA sem restrição |
| **Business** | A definir | Multi-usuários, API key própria, suporte prioritário |

---

## 📊 Potencial de Mercado

- **+15 milhões** de MEIs ativos no Brasil (SEBRAE, 2025)
- **+12% ao ano** no crescimento do número de freelancers
- Mercado de SaaS para pequenos negócios em expansão acelerada
- Concorrentes diretos (Trello, ClickUp) sem solução integrada para o empreendedor solo

---

## 👥 Equipe

| Integrante | GitHub |
|------------|--------|
| Laura Cristina Buosi | [@lauracbuosi](https://github.com/lauracbuosi) |
| Marina Coser | [@marinacoser](https://github.com/marinacoser) |
| Integrante 3 | — |
| Integrante 4 | — |

**Orientador:** A definir  
**Instituição:** COTIL — Colégio Técnico de Limeira  
**Curso:** Técnico em Desenvolvimento de Sistemas  
**Período:** 2026/2027

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

**VENTURI — O fluxo que move seu negócio.**

*Projeto Integrador COTIL 2026/2027 — Documento Confidencial*

</div>
