# DeskBlue - Website

Um site moderno e responsivo para compartilhar dicas de tecnologia e artigos sobre o futuro da tecnologia, construído com Next.js 14, TypeScript e Tailwind CSS.

## 🚀 Características

- **Design Responsivo**: Funciona perfeitamente em dispositivos móveis e desktop
- **Modo Escuro/Claro**: Toggle automático com persistência no localStorage
- **Integração com Notion**: CMS headless para gerenciar conteúdo
- **SEO Otimizado**: Meta tags, schema markup e sitemap automático
- **Performance**: Build estático com Next.js para máxima velocidade
- **Acessibilidade**: Componentes acessíveis com ARIA labels
- **TypeScript**: Código tipado para maior confiabilidade
- **Tailwind CSS**: Framework CSS utilitário para design consistente

## 🛠️ Tecnologias

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **CMS**: Notion API (com fallback para dados mock)
- **Deploy**: Vercel (recomendado)
- **Linting**: ESLint com configuração Next.js
- **Build**: SWC para compilação rápida

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js 14
│   ├── about/             # Página Sobre
│   ├── contact/           # Página Contato
│   ├── future/            # Página Futuro (artigos)
│   ├── post/[slug]/       # Páginas de posts individuais
│   ├── privacy/           # Política de Privacidade
│   ├── terms/             # Termos de Uso
│   ├── tips/              # Página Dicas
│   ├── api/posts/         # API para buscar posts
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/             # Componentes reutilizáveis
│   ├── CustomMarkdown.tsx # Renderizador de Markdown
│   ├── Footer.tsx         # Rodapé do site
│   ├── Navbar.tsx         # Navegação principal
│   ├── PostCard.tsx       # Card de post
│   ├── SearchModal.tsx    # Modal de pesquisa
│   ├── ShareButton.tsx    # Botões de compartilhamento
│   └── YouTubeEmbed.tsx   # Embed de vídeos do YouTube
├── data/                   # Dados mockados
│   └── mocks/
│       └── posts.ts       # Posts de exemplo
├── lib/                    # Utilitários e configurações
│   └── notion.ts          # Cliente da API do Notion
└── types/                  # Definições de tipos TypeScript
    └── post.ts            # Tipo Post
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Notion (opcional)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/deskblue.git
cd deskblue
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local`:
```env
# Notion (opcional - se não configurar, usará dados mock)
NOTION_API_KEY=seu_api_key_aqui
NOTION_DATABASE_ID=seu_database_id_aqui

# Configuração
USE_MOCKS=true  # true para usar dados mock, false para Notion
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
```

4. Execute o projeto:
```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar servidor de produção
npm start

# Linting
npm run lint
```

## 🔧 Configuração do Notion

Para usar o Notion como CMS:

1. Crie uma integração no [Notion Developers](https://developers.notion.com/)
2. Compartilhe seu database com a integração
3. Configure as variáveis de ambiente com sua API key e database ID
4. Estrutura recomendada do database:
   - `title`: Título do post
   - `status`: Select com "Published" e "Draft"
   - `type`: Select com "Tip" e "Future"
   - `categories`: Multi-select para tags
   - `Published`: Date para data de publicação
   - `summary`: Rich text para resumo
   - `route`: Rich text para slug customizado (opcional)
   - `coverImage`: Files para imagem de capa

## 📱 Funcionalidades

### Sistema de Pesquisa
- Pesquisa em tempo real nos posts
- Filtros por categoria
- Modal responsivo com resultados

### Modo Escuro/Claro
- Toggle automático
- Persistência no localStorage
- Transições suaves

### Compartilhamento Social
- WhatsApp
- Telegram
- Copiar link

### Embed de Vídeos
- Detecção automática de URLs do YouTube
- Embed responsivo
- Fallback para link direto

## 🎨 Customização

### Cores
As cores principais estão definidas em `tailwind.config.ts`:
```typescript
colors: {
  blue: {
    600: "#2563EB",
    700: "#1E40AF",
    // ...
  }
}
```

### Fontes
Fontes personalizadas configuradas no layout:
- Inter: Para texto geral
- Poppins: Para títulos

### Componentes
Todos os componentes são reutilizáveis e podem ser facilmente modificados em `src/components/`.

## 📊 Performance

- **Lighthouse Score**: 90+ em todas as métricas
- **Build Time**: < 30 segundos
- **Bundle Size**: Otimizado com tree-shaking
- **Images**: Otimizadas com Next.js Image component

## 🔍 SEO

- Meta tags dinâmicas
- Schema markup para artigos
- Breadcrumbs estruturados
- Sitemap automático
- Open Graph e Twitter Cards

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

- **Email**: seu-email@exemplo.com
- **WhatsApp**: +55 11 99999-9999
- **Issues**: Use o GitHub Issues para reportar bugs

## 🙏 Agradecimentos

- Next.js team pelo framework incrível
- Tailwind CSS pela biblioteca de utilitários
- Notion pela API robusta
- Comunidade open source

---

**DeskBlue** - Simplificando tecnologia para você 🚀
