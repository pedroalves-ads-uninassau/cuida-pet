# 📘 Documentação Técnica Completa: Cuida Pet

Este documento é um **Manual de Referência Exaustivo** do projeto. Ele descreve a finalidade técnica de cada arquivo e diretório presente na aplicação, garantindo que você tenha domínio total sobre a estrutura do código.

---

## 1. Raiz do Projeto (Configurações e Tooling)

Arquivos essenciais para o funcionamento do ambiente de desenvolvimento e build.

*   **`.env.example`**: Modelo de variáveis de ambiente. Define quais chaves de API (como a do Firebase ou OpenAI) são necessárias para o projeto rodar.
*   **`next.config.mjs`**: Configuração do framework Next.js.
    *   *Função Crítica:* Autoriza domínios externos de imagem (ex: `firebasestorage.googleapis.com`) para uso com o componente `<Image />`.
*   **`package.json`**: Manifesto do Node.js. Lista todas as dependências (bibliotecas instaladas) e scripts de automação (`dev`, `build`, `start`).
*   **`tailwind.config.ts`**: Configuração do motor de estilos Tailwind CSS. Define o Design System (cores `primary`, `secondary`, fontes).
*   **`tsconfig.json`**: Configuração do TypeScript. Define regras de tipagem estrita e caminhos absolutos (`@/` apontando para `src/`).

---

## 2. `src/app` (Roteamento e Páginas)

O Next.js utiliza o sistema de arquivos para definir rotas.

### Rotas Públicas e Autenticação
*   **`page.tsx` (Landing Page):** A página inicial (`/`). Composta por componentes modulares da pasta `landing`.
*   **`layout.tsx` (Root Layout):** O "pai" de todas as páginas. Define o HTML base, carrega a fonte `Baloo 2` e injeta o `AppProvider` (Contexto Global).
*   **`globals.css`**: Estilos globais e diretivas do Tailwind.
*   **`login/page.tsx`**: Formulário de login. Gerencia estado local (`useState`) e chama `login()` do contexto.
*   **`register/page.tsx`**: Seleção de tipo de conta (Tutor ou Clínica).
*   **`register/tutor/page.tsx` & `register/clinic/page.tsx`**: Formulários específicos de cadastro. Salvam dados adicionais no Firestore.
*   **`forgot-password/page.tsx`**: Integração com `sendPasswordResetEmail` do Firebase Auth para recuperação de conta.
*   **`legal/page.tsx`**: Página estática de Termos de Uso.
*   **`not-found.tsx`**: Página de erro 404 personalizada.

### Rotas Protegidas `(main)`
Esta pasta é um **Route Group**. Ela não aparece na URL, mas serve para compartilhar um Layout comum (a `Navbar`).

*   **`layout.tsx`**: Adiciona a `Navbar` fixa no topo para todas as páginas internas.
*   **`feed/page.tsx`**: A "Rede Social".
    *   *Funcionalidade:* Lista posts do contexto, permite upload de imagens (Firebase Storage) e criação de novos posts.
*   **`mapa/page.tsx`**: Integração com Leaflet.
    *   *Funcionalidade:* Busca usuários com `role: 'clinic'` no Firestore e renderiza marcadores no mapa.
*   **`agendamentos/page.tsx`**: Sistema de Gestão.
    *   *Lógica:* Filtra agendamentos baseados no ID do usuário logado (seja ele Tutor ou Clínica). Permite confirmar ou cancelar.
*   **`mensagens/page.tsx`**: Chat em tempo real entre usuários.
*   **`chatbot/page.tsx`**: Interface de chat com IA (Jarvis).
*   **`perfil/tutor/page.tsx`**: Perfil privado do usuário logado.
*   **`perfil/editar/page.tsx`**: Formulário para atualização de dados cadastrais.
*   **`perfil/[uid]/page.tsx` (Rota Dinâmica):** Perfil público.
    *   *Técnica:* O `[uid]` captura o ID da URL (ex: `/perfil/abc12345`) para buscar e exibir os dados de qualquer usuário.
*   **`configuracoes/page.tsx`**: Opções de conta e botão de exclusão (com trava de segurança).

### Rotas Administrativas e API
*   **`admin/page.tsx`**: Dashboard protegido. Verifica se `user.role === 'admin'` antes de renderizar. Mostra métricas do sistema.
*   **`api/chat/route.js`**: **Serverless Function**.
    *   *Segurança:* Atua como um Proxy para a API da OpenAI, protegendo a chave de API no servidor. Inclui um sistema de *Fallback* (resposta padrão) caso a API falhe ou a cota exceda, garantindo que o app nunca quebre.

---

## 3. `src/components` (Interface de Usuário)

Componentes reutilizáveis (Building Blocks).

*   **`feed/`**:
    *   `Navbar.tsx`: Barra de navegação responsiva. Inclui lógica de **Notificações em Tempo Real** (o sino vermelho).
    *   `PostCard.tsx`: Componente visual de um post. Gerencia likes e comentários localmente.
*   **`landing/`**: Componentes exclusivos da página inicial (`Hero`, `Features`, `Team`, etc.). Separados para organização.
*   **`map/`**:
    *   `LeafletMap.tsx`: Wrapper para a biblioteca de mapas. Carregado via `dynamic import` para evitar erros de SSR (Server-Side Rendering).
    *   `BookingModal.tsx`: Modal (Pop-up) para agendar consultas.

---

## 4. `src/context` (Gerenciamento de Estado)

*   **`AppContext.tsx`**: O coração da aplicação.
    *   **Autenticação:** Gerencia `user`, `login`, `logout`, `register`.
    *   **Dados:** Gerencia `posts`, `appointments`, `notifications`.
    *   **Reatividade:** Mantém conexões abertas com o Firestore (`onSnapshot`) para receber atualizações automáticas.

---

## 5. `src/services` (Infraestrutura)

*   **`firebase.ts`**: Arquivo de configuração (Singleton). Inicializa e exporta as instâncias de `auth` (Autenticação), `db` (Banco de Dados) e `storage` (Arquivos).

---

## 6. `src/utils` e `src/data` (Utilitários)

*   **`utils/hooks.ts`**: Hooks personalizados (ex: `useOnClickOutside` para fechar menus quando clica fora).
*   **`utils/motion.ts`**: Configurações de animação (Framer Motion).
*   **`data/`**: Dados estáticos (texto e nomes) usados apenas na Landing Page para facilitar a edição de conteúdo.

---

## ✅ Verificação de Integridade

*   **Caminhos:** Todos os `imports` utilizam caminhos absolutos (`@/`) ou relativos corretos. Não há links quebrados.
*   **Funcionalidade:** Todas as rotas listadas acima estão implementadas e funcionais.
*   **Robustez:** O sistema inclui tratamentos de erro (ex: no Chatbot e no Login) para garantir que a aplicação continue funcionando mesmo se serviços externos falharem.

Este projeto está pronto para deploy e apresentação. 🚀

---

## 🛠️ Como Rodar o Projeto Localmente (Mini Manual)

Se você baixou este código sem a pasta `node_modules`, siga estes passos para rodar no seu computador:

1.  **Instalar Dependências:**
    *   Abra o terminal na pasta do projeto.
    *   Digite: `npm install`
    *   *O que isso faz:* Lê o arquivo `package.json` e baixa todas as bibliotecas necessárias (React, Next.js, Firebase, etc.) para a pasta `node_modules`. Isso pode demorar alguns minutos.

2.  **Configurar Variáveis de Ambiente:**
    *   Crie um arquivo chamado `.env.local` na raiz do projeto.
    *   Copie o conteúdo de `.env.example` para dentro dele.
    *   Preencha as chaves (API Keys) do Firebase e OpenAI.

3.  **Rodar o Servidor de Desenvolvimento:**
    *   Digite: `npm run dev`
    *   Acesse no navegador: `http://localhost:3000`

**Nota:** O comando `npm run dev` só funciona **depois** que você rodou o `npm install` pelo menos uma vez.
