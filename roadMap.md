## Etapa 1: Frontend & UI (Next.js + Tailwind)
1.1. Setup Inicial
Comando: npx create-next-app@latest . --typescript --tailwind --eslint

Libs Adicionais: lucide-react (ícones), date-fns (formatação), clsx, tailwind-merge.

Configuração de Cores: Definir paleta de alto contraste no tailwind.config.js (Foco em legibilidade para +50 anos).

1.2. View Usuário (Mobile-First / PWA)
Layout: Container único, largura máxima sm, padding generoso.

Formulário de Gasto:

Input Valor: type="number", inputmode="decimal", fonte text-3xl.

Seletor Data: type="date" nativo do navegador.

Select Categoria: Dropdown grande com ícones.

Opção "Outro": Abre campo de texto + textarea para explicação.

Lista de Lançamentos do Dia:

Cards com Badge de Status (Pendente, Aprovado, Rejeitado).

Botão "Solicitar Alteração" (Abre modal de edição/exclusão).

PWA Setup: Adicionar manifest.json e ícones para permitir "Adicionar à Tela de Início".

1.3. View ADM (Desktop-Optimized)
Layout: Sidebar fixa à esquerda, conteúdo principal com max-width: 7xl.

Dashboard Principal:

Cards de resumo: "Total do Mês", "Gastos Pendentes", "Categoria mais cara".

Gráficos: Barra (Gastos por Dia) e Pizza (Categoria Global vs Específica).

Gestão de Transações:

Tabela com filtros por Usuário e Data.

Ações rápidas: Botões Aprovar (verde) e Rejeitar (vermelho) direto na linha.

Gestão de Categorias:

CRUD simples para adicionar categorias vinculando a Flag 1 (específica) à Flag 2 (global).

1.4. Componentes Globais
Modais: Usar Headless UI ou Radix UI para diálogos de confirmação acessíveis.

Feedbacks: Toast notifications para "Gasto enviado com sucesso".

## Etapa 2: Banco de Dados & Modelagem (Supabase)
2.1. Schema SQL (Executar no Editor SQL do Supabase)
Tabela perfis:

id (uuid, fk para auth.users), email (text), role (text: 'admin' ou 'user').

Tabela categorias:

id (int), nome_especifico (text - Ex: "Cinema"), nome_global (text - Ex: "Entretenimento").

Tabela transacoes:

id (uuid), criado_em (timestamptz), usuario_id (uuid, fk para perfis), valor (numeric), data_gasto (date), categoria_id (fk para categorias), descricao (text).

status (text: 'pendente', 'aprovado', 'rejeitado').

editada (boolean, default false).

Tabela sugestoes:

id (uuid), usuario_id (uuid), nome_sugerido (text), explicacao (text), lida (boolean).

2.2. Row Level Security (RLS)
Política Usuário: SELECT, INSERT, UPDATE onde usuario_id == auth.uid().

Política ADM: SELECT, UPDATE, DELETE onde auth.jwt() ->> 'role' == 'admin'.

2.3. Lógica de Histórico Recente (View Usuário)
Query: Fetch de transacoes filtrando por usuario_id e data_gasto descrescente.

Limite: Trazer últimos 30 dias por padrão para evitar overhead.

UI Component: Agrupar resultados por data (ex: "Hoje", "Ontem", "12 de Abril") usando date-fns.

2.4. Server Actions (Next.js)
getTransactions(limit: number): Busca transações do usuário logado.

getCategories(): Busca lista de categorias para o Select.

createTransaction(data): Insere novo gasto com status: 'pendente'.

requestUpdate(id, newData): Marca transação como editada e envia novos valores para aprovação do ADM.

 Instruções para o Agente
"Modele o banco de dados no Supabase conforme o schema acima. No Frontend, implemente uma seção de 'Histórico Recente' na página do usuário que liste os gastos dos últimos 7 a 30 dias, agrupados por data. Garanta que transações com status 'pendente' tenham uma indicação visual clara (ex: opacidade reduzida ou badge amarelo). Adicione a lógica de 'Solicitar Alteração' que, em vez de deletar, altera o status da transação para análise do ADM."

## Etapa 3: Autenticação, Segurança e Persistência

3.1. Configuração Supabase Auth
Persistência de Sessão: Ativar persistSession: true no cliente Supabase para que o login não expire ao fechar o navegador.

Middleware de Redirecionamento: Implementar middleware.ts no Next.js para detectar sessão ativa e saltar a tela de login, levando o usuário direto para o formulário de gastos.

Autocomplete: Marcar inputs de email/senha com atributos HTML específicos para acionar o preenchimento automático do sistema (iOS Keychain/Google Smart Lock).

3.2. Segurança e Anti-Bot
Cloudflare Turnstile: Integrar o widget no formulário de login (é invisível para usuários legítimos, mantendo a velocidade).

Validação Server-side: Validar o token do Captcha em uma API Route antes de chamar o signInWithPassword.

Roles (ADM vs User): Lógica no login para verificar a coluna role na tabela perfis e direcionar para /admin ou /home.

3.3. Lógica de Pedidos e Alterações
Endpoint de Aprovação: Rota de API protegida para o ADM mudar o status de pendente para aprovado.

Triggers de Notificação: (Opcional Inicial) Envio de mensagem simples para o ADM via Supabase Edge Functions quando houver novo pedido de categoria.

Etapa 4: Deployment, PWA e Guia de Uso
4.1. Configuração PWA (O segredo da velocidade)
Manifest.json: Configurar display: standalone e start_url: /. Isso remove as barras do navegador no celular, fazendo o site parecer um app nativo.

Service Workers: Estratégia básica de cache para que a interface carregue instantaneamente mesmo em redes 3G lentas.

Ícones: Gerar ícone de atalho para a tela inicial (importante para o acesso rápido dos pais).

4.2. Hospedagem (Vercel)
Vercel Deploy: Conectar o repositório GitHub para deploy contínuo.

Env Vars: Configurar as chaves públicas e secretas do Supabase e Cloudflare no painel da Vercel.

4.3. Dashboards de Relatório (Visão ADM)
Integração Tremor: Implementar gráficos de linha (evolução mensal) e barras (gastos por perfil) na tela de computador.

Filtros Avançados: Busca por período e categoria global (ex: filtrar tudo que é "Entretenimento").