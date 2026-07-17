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
| Laura Cristina Buosi | [@laura-buosii](https://github.com/laura-buosi) |
| Marina Coser | [@marinacoser](https://github.com/marinacoser) |
| Júlia Chiarotto | — |
| Emanuelle Rodrigues | — |
 
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
