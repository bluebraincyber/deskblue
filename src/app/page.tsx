import { getPublishedPosts } from "@/lib/notion";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const posts = await getPublishedPosts();
  const latestPosts = posts.slice(0, 4);

  return (
    <div className="w-full">
      <section className="text-center py-12 sm:py-20 px-4">
        <div className="flex justify-center mb-6">
          <Link href="/" className="block">
            <Image
              src="/logo.png"
              alt="DeskBlue Logo"
              width={120}
              height={120}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full cursor-pointer hover:scale-105 transition-transform duration-200"
              priority
            />
          </Link>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400 font-poppins">DeskBlue</h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mt-4 font-inter">Simplificando tecnologia para você</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/tips" className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors text-center">
            Ver Dicas
          </Link>
          <a href="#" className="w-full sm:w-auto bg-yellow-400 text-gray-900 px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors text-center">
            WhatsApp
          </a>
        </div>
      </section>

      <section className="py-8 sm:py-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 font-poppins">Últimas Dicas e Artigos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {latestPosts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center mt-6 sm:mt-8">
          <Link href="/tips" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Ver Todos os Posts
          </Link>
        </div>
      </section>

      <section className="py-8 sm:py-12 text-center px-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 font-poppins">Conecte-se comigo nos canais oficiais</h2>
        <div className="flex justify-center space-x-6 sm:space-x-8 text-3xl sm:text-4xl">
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
