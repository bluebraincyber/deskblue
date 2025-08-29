import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { Post } from "@/types/post";
import { posts as mockPosts } from "@/data/mocks/posts";

const notion = new Client({ 
  auth: process.env.NOTION_TOKEN || process.env.NOTION_API_KEY || "" 
});
const n2m = new NotionToMarkdown({ notionClient: notion });
const DB_ID = process.env.NOTION_DATABASE_ID;

function isNotionConfigured(): boolean {
  return Boolean((process.env.NOTION_TOKEN || process.env.NOTION_API_KEY) && process.env.NOTION_DATABASE_ID);
}

function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Função para calcular tempo de leitura
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Função para obter posts publicados
export async function getPublishedPosts(): Promise<Post[]> {
  try {
    const useMocks = String(process.env.USE_MOCKS).toLowerCase() === "true";
    if (useMocks) {
      console.warn("[Notion] USE_MOCKS=true -> servindo posts mockados");
      return mockPosts;
    }

    if (!isNotionConfigured()) {
      console.warn("[Notion] Variáveis não configuradas -> servindo posts mockados");
      return mockPosts;
    }

    // Consulta sem filtro por property (mais robusto a diferenças de schema)
    const res = await notion.databases.query({
      database_id: DB_ID!,
      sorts: [
        { timestamp: "created_time", direction: "descending" }
      ],
      page_size: 100
    });
    console.log(`[Notion] getPublishedPosts: resultados=${res.results?.length ?? 0}`);

    // Filtra Published em memória (lida com nomes diferentes de propriedade)
    const publishedPages = res.results.filter((page: any) => {
      const p = page.properties;
      const status =
        p.status?.select?.name ||
        p.Status?.select?.name ||
        p.State?.select?.name;
      return status && (status.toLowerCase() === "published" || status.toLowerCase().includes("published"));
    });

    return publishedPages.map((page: any) => {
      const p = page.properties;
      
      // Título
      const title =
        p.title?.title?.[0]?.plain_text ||
        p.Title?.title?.[0]?.plain_text ||
        p.Name?.title?.[0]?.plain_text ||
        "";

      // Slug
      const customSlug =
        p.route?.rich_text?.[0]?.plain_text ||
        p.slug?.rich_text?.[0]?.plain_text;
      const slug = customSlug || slugify(title);

      // Tipo
      const type = (p.type?.select?.name ?? p.Type?.select?.name ?? "Tip") as "Tip" | "Future";

      // Tags
      const tags =
        p.categories?.multi_select?.map((t: any) => t.name) ??
        p.tags?.multi_select?.map((t: any) => t.name) ??
        p.Tags?.multi_select?.map((t: any) => t.name) ??
        [];

      // Data de publicação
      const publishedAt =
        p.Published?.date?.start ||
        p.published?.date?.start ||
        p.publishedAt?.date?.start ||
        (page.created_time ? page.created_time.split("T")[0] : "");

      // Resumo
      const excerpt =
        p.summary?.rich_text?.[0]?.plain_text ||
        p.excerpt?.rich_text?.[0]?.plain_text ||
        p.description?.rich_text?.[0]?.plain_text ||
        "";

      // Evitar baixar conteúdo completo aqui (performance).
      // Estimativa simples baseada no resumo (fallback para 3 min).
      const estimatedReadingTime = excerpt
        ? Math.max(1, Math.ceil(excerpt.split(/\s+/).length / 120))
        : 3;

      return {
        id: page.id,
        title,
        slug,
        status: "Published" as const,
        type,
        tags,
        publishedAt,
        excerpt,
        seoTitle: p.seo_title?.rich_text?.[0]?.plain_text ?? title,
        seoDescription: p.seo_description?.rich_text?.[0]?.plain_text ?? excerpt,
        cover:
          p.cover?.files?.[0]?.external?.url ||
          p.cover?.files?.[0]?.file?.url ||
          p.coverImage?.files?.[0]?.external?.url ||
          p.coverImage?.files?.[0]?.file?.url ||
          (page.cover?.external?.url || page.cover?.file?.url) ||
          "",
        altText: p.alt_text?.rich_text?.[0]?.plain_text ?? "",
        videoUrl: p.video_url?.url ?? null,
        readingTime: estimatedReadingTime,
        content: "", // conteúdo completo só no getPostBySlug
      };
    });
  } catch (error) {
    console.error("Erro ao buscar posts do Notion:", error);
    console.error("[Notion] Erro na query -> servindo posts mockados");
    return mockPosts;
  }
}

// Função para obter um post específico pelo slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const useMocks = String(process.env.USE_MOCKS).toLowerCase() === "true";
    if (useMocks || !isNotionConfigured()) {
      const local = mockPosts.find((p) => p.slug === slug);
      if (!isNotionConfigured()) {
        console.warn("[Notion] Variáveis não configuradas -> servindo mock deste slug");
      }
      return local ?? null;
    }

    // Buscar todos os posts publicados e localizar o slug
    const posts = await getPublishedPosts();
    const post = posts.find((p) => p.slug === slug);
    if (!post) {
      console.log(`[Notion] Post com slug '${slug}' não encontrado`);
      return null;
    }

    // Baixa conteúdo completo e recalcula readingTime
    const content = await getPageContent(post.id);

    return {
      ...post,
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch (error) {
    console.error(`Erro ao buscar post com slug ${slug}:`, error);
    const local = mockPosts.find((p) => p.slug === slug);
    return local ?? null;
  }
}

// Função para obter todos os posts publicados com conteúdo completo (para pesquisa)
export async function getPublishedPostsWithContent(): Promise<Post[]> {
  try {
    const posts = await getPublishedPosts();
    
    // Se estamos usando mocks, retornar diretamente (já têm conteúdo)
    const useMocks = String(process.env.USE_MOCKS).toLowerCase() === "true";
    if (useMocks || !isNotionConfigured()) {
      return posts;
    }

    // Carregar conteúdo completo para cada post
    const postsWithContent = await Promise.all(
      posts.map(async (post) => {
        const content = await getPageContent(post.id);
        return {
          ...post,
          content,
          readingTime: calculateReadingTime(content),
        };
      })
    );

    return postsWithContent;
  } catch (error) {
    console.error("Erro ao buscar posts com conteúdo:", error);
    return mockPosts;
  }
}

// Função para obter todos os slugs (necessária para generateStaticParams)
export async function getAllSlugs(): Promise<string[]> {
  try {
    const posts = await getPublishedPosts();
    return posts.map(post => post.slug);
  } catch (error) {
    console.error("Erro ao buscar slugs:", error);
    return mockPosts.map(post => post.slug);
  }
}

// Função para obter posts mais recentes (necessária para ISR na home)
export async function getLatestPosts(limit: number = 50): Promise<Post[]> {
  try {
    const posts = await getPublishedPosts();
    return posts.slice(0, limit);
  } catch (error) {
    console.error("Erro ao buscar posts mais recentes:", error);
    return mockPosts.slice(0, limit);
  }
}

// Função para obter o conteúdo de uma página e converter para Markdown
async function getPageContent(pageId: string): Promise<string> {
  try {
    const mdblocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdblocks);
    return mdString.parent || "";
  } catch (error) {
    console.error(`Erro ao obter conteúdo da página ${pageId}:`, error);
    return "";
  }
}