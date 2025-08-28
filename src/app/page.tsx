import { getPublishedPosts } from "@/lib/notion";
import PostCard from "@/components/PostCard";
import Link from "next/link";

export default async function Home() {
  const posts = await getPublishedPosts();
  const latestPosts = posts.slice(0, 4);

  return (
    <div>
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold text-blue-600 dark:text-blue-400 font-poppins">DeskBlue</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mt-4 font-inter">Simplificando tecnologia para você</p>
        <div className="mt-8 space-x-4">
          <Link href="/tips" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
            Ver Dicas
          </Link>
          <a href="#" className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors">
            WhatsApp
          </a>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8 font-poppins">Últimas Dicas e Artigos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestPosts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/tips" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Ver Todos os Posts
          </Link>
        </div>
      </section>

      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-4 font-poppins">Conecte-se comigo nos canais oficiais</h2>
        <div className="flex justify-center space-x-8 text-4xl">
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="WhatsApp">
            📱
          </a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="YouTube">
            🎥
          </a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Email">
            📧
          </a>
        </div>
      </section>
    </div>
  );
}
