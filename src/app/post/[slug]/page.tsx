import { posts } from "@/data/mocks/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { generateArticleSchema, generateBreadcrumbSchema } from "./schema";
import ShareButton from "@/components/ShareButton";

interface PostPageProps {
  params: { slug: string };
}

export default function PostPage({ params }: PostPageProps) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema(post);

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/${post.type.toLowerCase()}s`} className="hover:underline">{post.type === "Tip" ? "Tips" : "Future"}</Link>
        <span className="mx-2">/</span>
        <span>{post.title}</span>
      </nav>

      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 lg:p-10 mb-8">
        <div className="relative w-full h-64 md:h-80 lg:h-96 mb-6 rounded-lg overflow-hidden">
          <Image
            src={post.cover}
            alt={post.altText || post.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-poppins mb-4">
          {post.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-inter mb-6">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap items-center text-gray-500 dark:text-gray-400 text-sm mb-6">
          <span className="mr-4">📅 Publicado em {new Date(post.publishedAt).toLocaleDateString("pt-BR")}</span>
          <span className="mr-4">⏱️ {post.readingTime} minutos de leitura</span>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="prose dark:prose-invert max-w-none">
          {post.videoUrl && (
            <div className="aspect-video w-full mb-6">
              <iframe
                src={`https://www.youtube.com/embed/${post.videoUrl.split("v=")[1]}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          )}
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </section>

      <ShareButton url={typeof window !== 'undefined' ? window.location.href : `https://www.deskblue.com.br/post/${post.slug}`} />

      {/* Related Posts - Placeholder */}
      {/* <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-6">Outros posts que podem interessar:</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>Testes de velocidade: como medir sua internet</li>
          <li>Roteador vs Modem: qual a diferença?</li>
          <li>Apps que consomem sua internet sem você saber</li>
        </ul>
      </section> */}
    </div>
  );
}


export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}


