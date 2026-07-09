-- ============================================================
-- VENTURI — Script de Criação do Banco de Dados (MySQL)
-- Baseado em: Venturi_Modelagem_Banco_ER.docx — Revisão Maio 2026 v1.0
-- SGBD: MySQL (Railway)
-- Engine: InnoDB | Charset: utf8mb4
--
-- IMPORTANTE: rode este script de uma vez só (na ordem em que está),
-- pois as tabelas têm FKs que dependem das tabelas anteriores.
-- ============================================================

CREATE DATABASE IF NOT EXISTS venturi
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE venturi;

SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- MÓDULO 1 — USUÁRIOS E AUTENTICAÇÃO
-- ============================================================

-- --------------------------------------------------------------
-- Tabela: usuarios
-- --------------------------------------------------------------
CREATE TABLE usuarios (
    id                CHAR(36)      NOT NULL,                 -- UUID v4 gerado no cliente
    nome              VARCHAR(100)  NOT NULL,
    email             VARCHAR(150)  NOT NULL,
    senha_hash        VARCHAR(255)  NULL,                      -- bcrypt — nullable se OAuth
    google_id         VARCHAR(100)  NULL,                      -- OAuth Google — nullable
    nicho             VARCHAR(80)   NULL,                      -- área de atuação do negócio
    plano             ENUM('free','pro','business') NOT NULL DEFAULT 'free',
    avatar_url        VARCHAR(255)  NULL,
    reputacao_pontos  INT           NOT NULL DEFAULT 0,
    onboarding_ok     TINYINT(1)    NOT NULL DEFAULT 0,
    created_at        DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_usuarios_email (email),
    UNIQUE KEY uq_usuarios_google_id (google_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------
-- Tabela: refresh_tokens
-- --------------------------------------------------------------
CREATE TABLE refresh_tokens (
    id           INT AUTO_INCREMENT,
    usuario_id   CHAR(36)      NOT NULL,
    token_hash   VARCHAR(255)  NOT NULL,                        -- SHA-256 do token enviado ao cliente
    plataforma   ENUM('web','mobile','desktop') NOT NULL,
    expires_at   DATETIME      NOT NULL,
    revogado     TINYINT(1)    NOT NULL DEFAULT 0,
    created_at   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_refresh_tokens_hash (token_hash),
    KEY idx_refresh_tokens_usuario (usuario_id),
    CONSTRAINT fk_refresh_tokens_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------
-- Tabela: chapeus
-- --------------------------------------------------------------
CREATE TABLE chapeus (
    id           INT AUTO_INCREMENT,
    usuario_id   CHAR(36)      NOT NULL,
    tipo         ENUM('financeiro','operacional','marketing','vendas') NOT NULL,
    cor_hex      CHAR(7)       NULL,                            -- cor personalizada (#RRGGBB)
    nome_custom  VARCHAR(50)   NULL,                             -- nome personalizado — nullable
    PRIMARY KEY (id),
    KEY idx_chapeus_usuario (usuario_id),
    CONSTRAINT fk_chapeus_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------
-- Tabela: badges
-- --------------------------------------------------------------
CREATE TABLE badges (
    id               INT AUTO_INCREMENT,
    usuario_id       CHAR(36)     NOT NULL,
    tipo             VARCHAR(50)  NOT NULL,                      -- ex: resposta_util, 30_dias, precificacao
    descricao        VARCHAR(120) NULL,
    conquistado_em   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_badges_usuario (usuario_id),
    CONSTRAINT fk_badges_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- MÓDULO 2 — ORGANIZAÇÃO
-- ============================================================

-- --------------------------------------------------------------
-- Tabela: projetos
-- --------------------------------------------------------------
CREATE TABLE projetos (
    id           CHAR(36)      NOT NULL,                         -- UUID v4 — gerado offline no desktop
    usuario_id   CHAR(36)      NOT NULL,
    chapeu_id    INT           NULL,
    titulo       VARCHAR(120)  NOT NULL,
    descricao    TEXT          NULL,
    status       ENUM('ativo','pausado','concluido','arquivado') NOT NULL DEFAULT 'ativo',
    prazo        DATE          NULL,
    cor_hex      CHAR(7)       NULL,                             -- cor do card no kanban
    created_at   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_projetos_usuario (usuario_id),
    KEY idx_projetos_chapeu (chapeu_id),
    CONSTRAINT fk_projetos_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_projetos_chapeu
        FOREIGN KEY (chapeu_id) REFERENCES chapeus(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------
-- Tabela: tarefas
-- --------------------------------------------------------------
CREATE TABLE tarefas (
    id             CHAR(36)      NOT NULL,                       -- UUID v4
    projeto_id     CHAR(36)      NOT NULL,
    titulo         VARCHAR(200)  NOT NULL,
    descricao      TEXT          NULL,
    status         ENUM('a_fazer','em_andamento','concluido') NOT NULL DEFAULT 'a_fazer',
    prioridade     ENUM('baixa','media','alta','urgente') NOT NULL DEFAULT 'media',
    prazo          DATETIME      NULL,
    ordem          INT           NOT NULL DEFAULT 0,              -- posição na coluna (drag & drop)
    criada_por_ia  TINYINT(1)    NOT NULL DEFAULT 0,
    created_at     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_tarefas_projeto (projeto_id),
    KEY idx_tarefas_projeto_status (projeto_id, status),          -- filtro kanban por projeto e coluna
    KEY idx_tarefas_prazo (prazo),                                -- dashboard: tarefas com prazo próximo
    CONSTRAINT fk_tarefas_projeto
        FOREIGN KEY (projeto_id) REFERENCES projetos(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------
-- Tabela: subtarefas
-- --------------------------------------------------------------
CREATE TABLE subtarefas (
    id          INT AUTO_INCREMENT,
    tarefa_id   CHAR(36)      NOT NULL,
    titulo      VARCHAR(200)  NOT NULL,
    concluida   TINYINT(1)    NOT NULL DEFAULT 0,
    ordem       INT           NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    KEY idx_subtarefas_tarefa (tarefa_id),
    CONSTRAINT fk_subtarefas_tarefa
        FOREIGN KEY (tarefa_id) REFERENCES tarefas(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------
-- Tabela: timer_sessoes
-- --------------------------------------------------------------
CREATE TABLE timer_sessoes (
    id            INT AUTO_INCREMENT,
    tarefa_id     CHAR(36)      NOT NULL,
    usuario_id    CHAR(36)      NOT NULL,
    tipo          ENUM('foco','pausa_curta','pausa_longa') NOT NULL,
    inicio        DATETIME      NOT NULL,
    fim           DATETIME      NULL,                             -- sessão em andamento
    duracao_min   INT           NULL,                              -- calculado ao fim
    interrompida  TINYINT(1)    NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    KEY idx_timer_tarefa (tarefa_id),
    KEY idx_timer_usuario (usuario_id),
    KEY idx_timer_usuario_inicio (usuario_id, inicio),             -- relatório de horas por período
    CONSTRAINT fk_timer_tarefa
        FOREIGN KEY (tarefa_id) REFERENCES tarefas(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_timer_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------
-- Tabela: planilhas
-- --------------------------------------------------------------
CREATE TABLE planilhas (
    id           INT AUTO_INCREMENT,
    usuario_id   CHAR(36)      NOT NULL,
    projeto_id   CHAR(36)      NULL,                              -- nullable
    nome         VARCHAR(100)  NOT NULL,
    tipo         ENUM('fluxo_caixa','dre','metas','marketing') NOT NULL,
    created_at   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_planilhas_usuario (usuario_id),
    KEY idx_planilhas_projeto (projeto_id),
    CONSTRAINT fk_planilhas_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_planilhas_projeto
        FOREIGN KEY (projeto_id) REFERENCES projetos(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------
-- Tabela: celulas
-- --------------------------------------------------------------
CREATE TABLE celulas (
    id           INT AUTO_INCREMENT,
    planilha_id  INT           NOT NULL,
    linha        SMALLINT      NOT NULL,                          -- índice 0-based
    coluna       SMALLINT      NOT NULL,                          -- índice 0-based
    valor        TEXT          NULL,                              -- valor calculado ou digitado
    formula      VARCHAR(255)  NULL,                               -- ex: =C3*D3
    formato      VARCHAR(30)   NULL,                               -- moeda | percentual | texto | numero
    PRIMARY KEY (id),
    KEY idx_celulas_planilha (planilha_id),
    UNIQUE KEY uq_celulas_posicao (planilha_id, linha, coluna),    -- evita 2 células na mesma posição
    CONSTRAINT fk_celulas_planilha
        FOREIGN KEY (planilha_id) REFERENCES planilhas(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- MÓDULO 3 — PRECIFICAÇÃO
-- ============================================================

-- --------------------------------------------------------------
-- Tabela: custos_fixos
-- --------------------------------------------------------------
CREATE TABLE custos_fixos (
    id             INT AUTO_INCREMENT,
    usuario_id     CHAR(36)       NOT NULL,
    descricao      VARCHAR(120)   NOT NULL,
    valor          DECIMAL(10,2)  NOT NULL,                       -- sempre em R$
    periodicidade  ENUM('mensal','anual','unico') NOT NULL,
    categoria      VARCHAR(60)    NULL,                            -- ex: aluguel, software
    ativo          TINYINT(1)     NOT NULL DEFAULT 1,              -- soft delete
    PRIMARY KEY (id),
    KEY idx_custos_fixos_usuario (usuario_id),
    CONSTRAINT fk_custos_fixos_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------
-- Tabela: custos_variaveis
-- --------------------------------------------------------------
CREATE TABLE custos_variaveis (
    id           INT AUTO_INCREMENT,
    usuario_id   CHAR(36)       NOT NULL,
    projeto_id   CHAR(36)       NULL,                              -- nullable
    descricao    VARCHAR(120)   NOT NULL,
    valor        DECIMAL(10,2)  NOT NULL,
    data         DATE           NOT NULL,
    PRIMARY KEY (id),
    KEY idx_custos_var_usuario (usuario_id),
    KEY idx_custos_var_projeto (projeto_id),
    CONSTRAINT fk_custos_var_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_custos_var_projeto
        FOREIGN KEY (projeto_id) REFERENCES projetos(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------
-- Tabela: propostas
-- --------------------------------------------------------------
CREATE TABLE propostas (
    id               CHAR(36)       NOT NULL,                     -- UUID v4
    usuario_id       CHAR(36)       NOT NULL,
    cliente_nome     VARCHAR(120)   NOT NULL,
    cliente_email    VARCHAR(150)   NULL,
    titulo           VARCHAR(200)   NOT NULL,
    texto_intro      TEXT           NULL,                          -- gerado ou editado
    valor_total      DECIMAL(12,2)  NOT NULL DEFAULT 0,            -- soma de itens_proposta.valor_total
    status           ENUM('rascunho','enviada','visualizada','aceita','recusada') NOT NULL DEFAULT 'rascunho',
    token_publico    CHAR(32)       NOT NULL,                      -- token da URL pública
    visualizada_em   DATETIME       NULL,
    aceita_em        DATETIME       NULL,
    created_at       DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_propostas_token (token_publico),
    KEY idx_propostas_usuario (usuario_id),
    KEY idx_propostas_usuario_status (usuario_id, status),        -- funil por status
    CONSTRAINT fk_propostas_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------
-- Tabela: itens_proposta
-- --------------------------------------------------------------
CREATE TABLE itens_proposta (
    id               INT AUTO_INCREMENT,
    proposta_id      CHAR(36)       NOT NULL,
    descricao        VARCHAR(255)   NOT NULL,
    quantidade       DECIMAL(8,2)   NOT NULL DEFAULT 1,
    valor_unitario   DECIMAL(10,2)  NOT NULL,
    valor_total      DECIMAL(12,2)  NOT NULL,                      -- quantidade × valor_unitario (calcular na API)
    ordem            INT            NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    KEY idx_itens_proposta_proposta (proposta_id),
    CONSTRAINT fk_itens_proposta_proposta
        FOREIGN KEY (proposta_id) REFERENCES propostas(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- MÓDULO 4 — COMUNIDADE
-- ============================================================

-- --------------------------------------------------------------
-- Tabela: categorias_forum
-- --------------------------------------------------------------
CREATE TABLE categorias_forum (
    id          TINYINT AUTO_INCREMENT,
    nome        VARCHAR(60)   NOT NULL,
    slug        VARCHAR(60)   NOT NULL,
    icone       VARCHAR(40)   NULL,                                -- nome do ícone Tabler Icons
    descricao   VARCHAR(200)  NULL,
    ordem       TINYINT       NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY uq_categorias_forum_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------
-- Tabela: posts
-- --------------------------------------------------------------
CREATE TABLE posts (
    id              CHAR(36)      NOT NULL,                        -- UUID v4
    usuario_id      CHAR(36)      NOT NULL,
    categoria_id    TINYINT       NOT NULL,
    titulo          VARCHAR(220)  NOT NULL,
    conteudo        TEXT          NOT NULL,                        -- Markdown
    tipo            ENUM('post','duvida','parceria','oportunidade') NOT NULL DEFAULT 'post',
    curtidas        INT           NOT NULL DEFAULT 0,               -- denormalizado
    visualizacoes   INT           NOT NULL DEFAULT 0,
    fixado          TINYINT(1)    NOT NULL DEFAULT 0,
    created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_posts_usuario (usuario_id),
    KEY idx_posts_categoria (categoria_id),
    KEY idx_posts_categoria_created (categoria_id, created_at),    -- feed do fórum por categoria
    KEY idx_posts_tipo_created (tipo, created_at),                 -- filtro por tipo de post
    CONSTRAINT fk_posts_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_posts_categoria
        FOREIGN KEY (categoria_id) REFERENCES categorias_forum(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------
-- Tabela: comentarios
-- --------------------------------------------------------------
CREATE TABLE comentarios (
    id             CHAR(36)   NOT NULL,                            -- UUID v4
    post_id        CHAR(36)   NOT NULL,
    usuario_id     CHAR(36)   NOT NULL,
    parent_id      CHAR(36)   NULL,                                -- auto-referência para respostas
    conteudo       TEXT       NOT NULL,
    curtidas       INT        NOT NULL DEFAULT 0,                  -- denormalizado
    marcado_util   TINYINT(1) NOT NULL DEFAULT 0,
    created_at     DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_comentarios_post (post_id),
    KEY idx_comentarios_usuario (usuario_id),
    KEY idx_comentarios_parent (parent_id),
    CONSTRAINT fk_comentarios_post
        FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_comentarios_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_comentarios_parent
        FOREIGN KEY (parent_id) REFERENCES comentarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------
-- Tabela: curtidas (pivot polimórfica — sem FK formal para alvo_id,
-- pois pode apontar para posts OU comentarios; integridade fica na API)
-- --------------------------------------------------------------
CREATE TABLE curtidas (
    id          INT AUTO_INCREMENT,
    usuario_id  CHAR(36) NOT NULL,
    alvo_tipo   ENUM('post','comentario') NOT NULL,
    alvo_id     CHAR(36) NOT NULL,                                 -- id do post ou comentário curtido
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_curtidas_usuario (usuario_id),
    KEY idx_curtidas_alvo (alvo_id),
    UNIQUE KEY uq_curtidas_usuario_alvo (usuario_id, alvo_tipo, alvo_id), -- impede dupla curtida
    CONSTRAINT fk_curtidas_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------
-- Tabela: mensagens
-- --------------------------------------------------------------
CREATE TABLE mensagens (
    id                CHAR(36)  NOT NULL,                          -- UUID v4
    remetente_id      CHAR(36)  NOT NULL,
    destinatario_id   CHAR(36)  NOT NULL,
    conteudo          TEXT      NOT NULL,
    lida              TINYINT(1) NOT NULL DEFAULT 0,
    created_at        DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_mensagens_remetente (remetente_id),
    KEY idx_mensagens_destinatario (destinatario_id),
    KEY idx_mensagens_conversa (remetente_id, destinatario_id, created_at), -- histórico da conversa
    CONSTRAINT fk_mensagens_remetente
        FOREIGN KEY (remetente_id) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_mensagens_destinatario
        FOREIGN KEY (destinatario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- MÓDULO 5 — INTELIGÊNCIA ARTIFICIAL
-- ============================================================

-- --------------------------------------------------------------
-- Tabela: ia_historico
-- --------------------------------------------------------------
CREATE TABLE ia_historico (
    id             INT AUTO_INCREMENT,
    usuario_id     CHAR(36) NOT NULL,
    modulo         ENUM('tarefas','financeiro','precificacao','forum','geral') NOT NULL,
    prompt         TEXT     NOT NULL,
    resposta       TEXT     NOT NULL,
    tokens_usados  INT      NOT NULL DEFAULT 0,
    plataforma     ENUM('web','mobile','desktop') NOT NULL,
    created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_ia_historico_usuario (usuario_id),
    KEY idx_ia_historico_usuario_created (usuario_id, created_at), -- consulta de histórico
    CONSTRAINT fk_ia_historico_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------
-- Tabela: ia_uso_diario
-- --------------------------------------------------------------
CREATE TABLE ia_uso_diario (
    id                INT AUTO_INCREMENT,
    usuario_id        CHAR(36) NOT NULL,
    data              DATE     NOT NULL,
    requisicoes       INT      NOT NULL DEFAULT 0,
    tokens_total      INT      NOT NULL DEFAULT 0,
    limite_atingido   TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY uq_ia_uso_diario_usuario_data (usuario_id, data),   -- 1 registro por dia/usuário
    CONSTRAINT fk_ia_uso_diario_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- SEED INICIAL — categorias_forum
-- (necessário existir ao menos uma categoria antes de criar posts)
-- ============================================================
INSERT INTO categorias_forum (nome, slug, icone, descricao, ordem) VALUES
('Financeiro', 'financeiro', 'cash', 'Dúvidas e discussões sobre finanças do negócio', 1),
('Marketing',  'marketing',  'speakerphone', 'Estratégias de divulgação e vendas', 2),
('Jurídico',   'juridico',   'gavel', 'Questões legais, contratos e MEI', 3),
('Tech',       'tech',       'code', 'Ferramentas e tecnologia para o negócio', 4),
('Geral',      'geral',      'message-circle', 'Assuntos gerais da comunidade', 5);

-- ============================================================
-- FIM DO SCRIPT
-- Tabelas criadas: usuarios, refresh_tokens, chapeus, badges,
-- projetos, tarefas, subtarefas, timer_sessoes, planilhas, celulas,
-- custos_fixos, custos_variaveis, propostas, itens_proposta,
-- categorias_forum, posts, comentarios, curtidas, mensagens,
-- ia_historico, ia_uso_diario  (21 tabelas MySQL)
--
-- NOTA: sync_fila e sync_estado NÃO entram aqui — são exclusivas
-- do SQLite local do Electron (modo offline), conforme a modelagem.
-- Como o offline agora é somente leitura, essas duas tabelas podem
-- ficar mais simples: sem fila de operações pendentes de escrita,
-- só cache de leitura + controle de última sincronização.
-- ============================================================
