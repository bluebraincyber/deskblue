### Fase 1: Análise do conteúdo e esclarecimento de requisitos
- [x] Analisar o PRD fornecido e extrair todos os requisitos.
- [x] Esclarecer dúvidas sobre a integração com a Notion API (credenciais, tipo de vídeo).
- [x] Esclarecer dúvidas sobre a busca interna (filtro frontend vs. interação com API).
- [x] Esclarecer dúvidas sobre o armazenamento e alt text de imagens.
- [x] Esclarecer dúvidas sobre o conteúdo inicial (posts, páginas Privacy/Terms).
- [x] Esclarecer dúvidas sobre o design e responsividade (GRID, dark mode).
- [x] Esclarecer dúvidas sobre o deploy (Vercel).

### Fase 2: Configuração do ambiente de desenvolvimento e mock de dados
- [x] Criar um novo projeto Next.js.
- [x] Configurar Tailwind CSS para estilização.
- [x] Criar estrutura de pastas para componentes, páginas e mocks.
- [x] Criar mocks de dados para posts, incluindo diferentes tipos (Tip, Future).
- [x] Definir tipos TypeScript para os dados dos posts.

### Fase 3: Desenvolvimento do frontend e integração com mock de dados
- [x] Desenvolver o componente Navbar com navegação e toggle de tema.
- [x] Desenvolver o componente Footer.
- [x] Desenvolver o componente PostCard para exibir posts.
- [x] Criar a página Home (`/`).
- [x] Criar a página About (`/about`).
- [x] Criar a página Tips (`/tips`).
- [x] Criar a página Future (`/future`).
- [x] Criar a página de Post Individual (`/post/[slug]`).
- [x] Criar a página Contact (`/contact`).
- [x] Desenvolver as páginas Privacy e Terms com placeholders.

### Fase 4: Implementação da lógica de busca e renderização de conteúdo
- [x] Implementar a busca interna simples (filtro frontend).
- [x] Implementar a paginação SEO-friendly para Tips e Future.
- [x] Implementar o cálculo automático de tempo de leitura.
- [x] Implementar a incorporação de vídeos do YouTube nos posts.
- [x] Implementar o botão "Copiar Link" em cada post.
- [x] Implementar breadcrumb navigation dinâmico.

### Fase 5: Refinamento de design, SEO e acessibilidade
- [x] Otimizar performance (Lighthouse Score > 90).
- [x] Otimizar acessibilidade (Lighthouse Accessibility Score > 90).
- [x] Otimizar Core Web Vitals.
- [x] Gerar sitemap.xml automático com paginação.
- [x] Configurar robots.txt.
- [x] Implementar Schema.org markup.
- [x] Implementar alt text automático para imagens (se possível com mocks).
- [x] Garantir navegação via teclado funcional.
- [x] Implementar Vercel Analytics básico.
- [x] Implementar tracking de CTR para links externos.
- [x] Implementar tracking de scroll depth por post.
- [x] Implementar métricas de engajamento por categoria/tag.
- [x] Implementar eventos personalizados (WhatsApp, YouTube clicks).
- [x] Ajustar design para responsividade em telas maiores (GRID 2x2 para 3x2/4x2).
- [x] Implementar seletor de tema (claro/escuro/sistema).

### Fase 6: Preparação para integração com Notion API (sem credenciais)
- [x] Criar estrutura para variáveis de ambiente do Notion API.
- [x] Adaptar o código para receber as credenciais do Notion API posteriormente.

### Fase 7: Testes e validação
- [x] Realizar testes funcionais de todas as páginas e funcionalidades.

### Fase 8: Empacotamento e entrega final
- [ ] Empacotar o projeto em um arquivo ZIP.
- [ ] Entregar o arquivo ZIP ao usuário.

