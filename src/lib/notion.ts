import { Client } from "@notionhq/client";
import { Post } from "@/types/post";
import { posts as mockPosts } from "@/data/mocks/posts";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DB_ID = process.env.NOTION_DATABASE_ID;

function isNotionConfigured(): boolean {
  return Boolean(process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID);
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

    // Query simples - busca todos os posts e filtra depois
    const res = await notion.databases.query({
      database_id: DB_ID!,
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    });
    console.log(`[Notion] getPublishedPosts: resultados=${res.results?.length ?? 0}`);

    // Filtrar apenas posts publicados e mapear
    const publishedPosts = res.results.filter((page: any) => {
      const p = page.properties;
      const status = p.status?.select?.name || p.Status?.select?.name || p.State?.select?.name;
      return status && status.toLowerCase().includes('published');
    });

    console.log(`[Notion] Posts publicados encontrados: ${publishedPosts.length}`);

    return Promise.all(
      publishedPosts.map(async (page: any) => {
        const p = page.properties;
        
        // Debug: mostrar propriedades disponíveis
        console.log(`[Notion] Propriedades do post ${page.id}:`, Object.keys(p));
        
        const title = p.title?.title?.[0]?.plain_text ?? p.Name?.title?.[0]?.plain_text ?? "Sem título";
        const routeSlug = p.route?.rich_text?.[0]?.plain_text ?? p.slug?.rich_text?.[0]?.plain_text;
        const status = p.status?.select?.name || p.Status?.select?.name || p.State?.select?.name || "Draft";
        const type = p.type?.select?.name || p.Type?.select?.name || "Tip";
        const tags = (p.categories?.multi_select ?? p.Tags?.multi_select ?? []).map((t: any) => t.name);
        const publishedAt = p.Published?.date?.start || p.publish?.date?.start || p.Date?.date?.start || new Date().toISOString();
        const excerpt = p.summary?.rich_text?.[0]?.plain_text || p.excerpt?.rich_text?.[0]?.plain_text || p.description?.rich_text?.[0]?.plain_text || "";
        
        // Calcular tempo de leitura (estimativa baseada no número de blocos)
        const blocks = await getPageBlocks(page.id);
        const readingTime = Math.max(1, Math.ceil(blocks.length / 15));
        
        return {
          id: page.id,
          title,
          slug: routeSlug && routeSlug !== "articles" ? routeSlug : slugify(title),
          status,
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
            p.cover_img?.files?.[0]?.external?.url ||
            p.cover_img?.files?.[0]?.file?.url ||
            page.cover?.external?.url ||
            page.cover?.file?.url ||
            "",
          altText: p.alt_text?.rich_text?.[0]?.plain_text ?? "",
          videoUrl: p.video_url?.url ?? null,
          readingTime,
          content: "", // Será preenchido pelo getPostBySlug quando necessário
        };
      })
    );
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

    // Buscar todos os posts publicados e encontrar o que corresponde ao slug
    const all = await notion.databases.query({
      database_id: DB_ID!,
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    });

    // Filtrar posts publicados e encontrar o que corresponde ao slug
    const publishedPosts = all.results.filter((page: any) => {
      const p = page.properties;
      const status = p.status?.select?.name || p.Status?.select?.name || p.State?.select?.name;
      return status && status.toLowerCase().includes('published');
    });

    console.log(`[Notion] getPostBySlug: buscando slug=${slug} em ${publishedPosts.length} posts publicados`);

    // Encontrar o post que corresponde ao slug
    const match = publishedPosts.find((page: any) => {
      const p = page.properties;
      const title = p.title?.title?.[0]?.plain_text ?? "";
      const routeSlug = p.route?.rich_text?.[0]?.plain_text ?? p.slug?.rich_text?.[0]?.plain_text;
      const generatedSlug = routeSlug && routeSlug !== "articles" ? routeSlug : slugify(title);
      
      console.log(`[Notion] Comparando: "${generatedSlug}" com "${slug}"`);
      return generatedSlug === slug;
    });

    if (!match) {
      console.log(`[Notion] getPostBySlug: nenhum resultado para slug=${slug}`);
      return null;
    }

    const res = { results: [match] } as any;

    if (!res.results.length) {
      console.log(`[Notion] getPostBySlug: nenhum resultado para slug=${slug}`);
      return null;
    }

    const page: any = res.results[0];
    const p = page.properties;
    
    // Obter o conteúdo da página
    const content = await getPageContent(page.id);
    
    // Calcular tempo de leitura (estimativa baseada no conteúdo)
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // Média de 200 palavras por minuto
    
    const title = p.title?.title?.[0]?.plain_text ?? "Sem título";
    return {
      id: page.id,
      title,
      slug,
      status: p.status?.select?.name ?? "Draft",
      type: p.type?.select?.name ?? "Tip",
      tags: (p.categories?.multi_select ?? []).map((t: any) => t.name),
      publishedAt: p.Published?.date?.start || p.publish?.date?.start || new Date().toISOString(),
      excerpt: p.summary?.rich_text?.[0]?.plain_text ?? "",
      seoTitle: p.seo_title?.rich_text?.[0]?.plain_text ?? p.title?.title?.[0]?.plain_text ?? "Sem título",
      seoDescription: p.seo_description?.rich_text?.[0]?.plain_text ?? p.summary?.rich_text?.[0]?.plain_text ?? "",
      cover:
        p.cover?.files?.[0]?.external?.url ||
        p.cover?.files?.[0]?.file?.url ||
        p.coverImage?.files?.[0]?.external?.url ||
        p.coverImage?.files?.[0]?.file?.url ||
        p.cover_img?.files?.[0]?.external?.url ||
        p.cover_img?.files?.[0]?.file?.url ||
        page.cover?.external?.url ||
        page.cover?.file?.url ||
        "",
      altText: p.alt_text?.rich_text?.[0]?.plain_text ?? "",
      videoUrl: p.video_url?.url ?? null,
      readingTime,
      content,
    };
  } catch (error) {
    console.error(`Erro ao buscar post com slug ${slug}:`, error);
    // Fallback em caso de erro
    const local = mockPosts.find((p) => p.slug === slug);
    return local ?? null;
  }
}

// Função para obter os blocos de uma página
async function getPageBlocks(pageId: string): Promise<any[]> {
  try {
    const { results } = await notion.blocks.children.list({
      block_id: pageId,
    });
    return results;
  } catch (error) {
    console.error(`Erro ao buscar blocos da página ${pageId}:`, error);
    return [];
  }
}

// Função para obter o conteúdo de uma página e converter para Markdown
async function getPageContent(pageId: string): Promise<string> {
  try {
    const blocks = await getPageBlocks(pageId);
    return convertBlocksToMarkdown(blocks);
  } catch (error) {
    console.error(`Erro ao obter conteúdo da página ${pageId}:`, error);
    return "";
  }
}

// Função para converter blocos do Notion para Markdown
function convertBlocksToMarkdown(blocks: any[]): string {
  let markdown = "";
  
  for (const block of blocks) {
    switch (block.type) {
      case "paragraph":
        markdown += block.paragraph.rich_text.map((text: any) => text.plain_text).join("") + "\n\n";
        break;
      case "heading_1":
        markdown += "# " + block.heading_1.rich_text.map((text: any) => text.plain_text).join("") + "\n\n";
        break;
      case "heading_2":
        markdown += "## " + block.heading_2.rich_text.map((text: any) => text.plain_text).join("") + "\n\n";
        break;
      case "heading_3":
        markdown += "### " + block.heading_3.rich_text.map((text: any) => text.plain_text).join("") + "\n\n";
        break;
      case "bulleted_list_item":
        markdown += "- " + block.bulleted_list_item.rich_text.map((text: any) => text.plain_text).join("") + "\n";
        break;
      case "numbered_list_item":
        markdown += "1. " + block.numbered_list_item.rich_text.map((text: any) => text.plain_text).join("") + "\n";
        break;
      case "to_do":
        const checked = block.to_do.checked ? "[x]" : "[ ]";
        markdown += `- ${checked} ` + block.to_do.rich_text.map((text: any) => text.plain_text).join("") + "\n";
        break;
      case "toggle":
        markdown += block.toggle.rich_text.map((text: any) => text.plain_text).join("") + "\n\n";
        break;
      case "code":
        markdown += "```" + (block.code.language || "") + "\n" + block.code.rich_text.map((text: any) => text.plain_text).join("") + "\n```\n\n";
        break;
      case "quote":
        markdown += "> " + block.quote.rich_text.map((text: any) => text.plain_text).join("") + "\n\n";
        break;
      case "divider":
        markdown += "---\n\n";
        break;
      case "image":
        const imageUrl = block.image.type === "external" ? block.image.external.url : block.image.file.url;
        const caption = block.image.caption?.length ? block.image.caption.map((text: any) => text.plain_text).join("") : "";
        markdown += `![${caption}](${imageUrl})\n\n`;
        break;
      case "bookmark":
        // Processar bookmarks (links) para detectar vídeos do YouTube
        const bookmarkUrl = block.bookmark.url;
        if (bookmarkUrl && isYouTubeUrl(bookmarkUrl)) {
          markdown += `{{YOUTUBE_EMBED:${bookmarkUrl}}}\n\n`;
        } else {
          markdown += `[${block.bookmark.caption?.[0]?.plain_text || "Link"}](${bookmarkUrl})\n\n`;
        }
        break;
      default:
        // Para outros tipos de blocos não tratados
        break;
    }
  }
  
  return markdown;
}

// Função para detectar URLs do YouTube
function isYouTubeUrl(url: string): boolean {
  const youtubePatterns = [
    /youtube\.com\/watch\?v=/,
    /youtu\.be\//,
    /youtube\.com\/embed\//,
    /youtube\.com\/v\//
  ];
  return youtubePatterns.some(pattern => pattern.test(url));
}