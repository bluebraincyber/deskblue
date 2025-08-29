import { getLatestPosts } from "@/lib/notion";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";

// ISR: Revalidar a cada 1 minuto (60 segundos)
export const revalidate = 60;

export default async function Home() {
  const latestPosts = await getLatestPosts(4);

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
        <div className="mt-8 flex flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link href="/tips" className="flex-1 sm:flex-none bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors text-center text-base min-w-[140px] h-12 flex items-center justify-center">
            Ver Dicas
          </Link>
          
          <a href="#" className="flex-1 sm:flex-none bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors text-center flex items-center justify-center text-base min-w-[140px] h-12 gap-2">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.87 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </section>

      <section className="py-8 sm:py-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 font-poppins">Últimas Dicas e Artigos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {latestPosts.map((post: Post) => (
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
        <div className="flex justify-center space-x-6 sm:space-x-8">
          <a href="#" className="p-4 rounded-full bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors text-green-600 dark:text-green-400 w-14 h-14 flex items-center justify-center" aria-label="WhatsApp">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.87 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </a>
          <a href="#" className="p-4 rounded-full bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors text-red-600 dark:text-red-400 w-14 h-14 flex items-center justify-center" aria-label="YouTube">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a href="#" className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors text-blue-600 dark:text-blue-400 w-14 h-14 flex items-center justify-center" aria-label="Email">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
