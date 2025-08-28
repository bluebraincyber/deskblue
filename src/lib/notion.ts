import { Client } from "@notionhq/client";
import { Post } from "@/types/post";

const notion = new Client({ auth: process.env.NOTION_API_KEY! });
const DB_ID = process.env.NOTION_DATABASE_ID!;

// Função para obter posts publicados
export async function getPublishedPosts(): Promise<Post[]> {
  try {
    const res = await notion.databases.query({
      database_id: DB_ID,
      filter: { property: "status", select: { equals: "Published" } },
      sorts: [{ timestamp: "created_time", direction: "descending" }], // Corrigido para usar timestamp em vez de property
    });

    return Promise.all(
      res.results.map(async (page: any) => {
        const p = page.properties;
        
        // Calcular tempo de leitura (estimativa baseada no número de blocos)
        const blocks = await getPageBlocks(page.id);
        const readingTime = Math.max(1, Math.ceil(blocks.length / 15)); // Estimativa: 15 blocos por minuto
        
        return {
          id: page.id,
          title: p.title?.title?.[0]?.plain_text ?? "Sem título",
          slug: p.route?.rich_text?.[0]?.plain_text ?? page.id,
          status: p.status?.select?.name ?? "Draft",
          type: p.type?.select?.name ?? "Tip",
          tags: (p.categories?.multi_select ?? []).map((t: any) => t.name),
          publishedAt: p.publish?.date?.start ?? new Date().toISOString(),
          excerpt: p.summary?.rich_text?.[0]?.plain_text ?? "",
          seoTitle: p.seo_title?.rich_text?.[0]?.plain_text ?? p.title?.title?.[0]?.plain_text ?? "Sem título",
          seoDescription: p.seo_description?.rich_text?.[0]?.plain_text ?? p.summary?.rich_text?.[0]?.plain_text ?? "",
          cover: page.cover?.external?.url || page.cover?.file?.url || "",
          altText: p.alt_text?.rich_text?.[0]?.plain_text ?? "",
          videoUrl: p.video_url?.url ?? null,
          readingTime,
          content: "", // Será preenchido pelo getPostBySlug quando necessário
        };
      })
    );
  } catch (error) {
    console.error("Erro ao buscar posts do Notion:", error);
    return [];
  }
}

// Função para obter um post específico pelo slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const res = await notion.databases.query({
      database_id: DB_ID,
      filter: {
        and: [
          { property: "route", rich_text: { equals: slug } },
          { property: "status", select: { equals: "Published" } }
        ]
      },
    });

    if (!res.results.length) {
      return null;
    }

    const page = res.results[0];
    const p = page.properties;
    
    // Obter o conteúdo da página
    const content = await getPageContent(page.id);
    
    // Calcular tempo de leitura (estimativa baseada no conteúdo)
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // Média de 200 palavras por minuto
    
    return {
      id: page.id,
      title: p.title?.title?.[0]?.plain_text ?? "Sem título",
      slug,
      status: p.status?.select?.name ?? "Draft",
      type: p.type?.select?.name ?? "Tip",
      tags: (p.categories?.multi_select ?? []).map((t: any) => t.name),
      publishedAt: p.publish?.date?.start ?? new Date().toISOString(),
      excerpt: p.summary?.rich_text?.[0]?.plain_text ?? "",
      seoTitle: p.seo_title?.rich_text?.[0]?.plain_text ?? p.title?.title?.[0]?.plain_text ?? "Sem título",
      seoDescription: p.seo_description?.rich_text?.[0]?.plain_text ?? p.summary?.rich_text?.[0]?.plain_text ?? "",
      cover: page.cover?.external?.url || page.cover?.file?.url || "",
      altText: p.alt_text?.rich_text?.[0]?.plain_text ?? "",
      videoUrl: p.video_url?.url ?? null,
      readingTime,
      content,
    };
  } catch (error) {
    console.error(`Erro ao buscar post com slug ${slug}:`, error);
    return null;
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
      default:
        // Para outros tipos de blocos não tratados
        break;
    }
  }
  
  return markdown;
}