import { getPublishedPosts } from "@/lib/notion";
import TipsFilter from "@/components/TipsFilter";
import { Post } from '@/types/post';

// ISR: Revalidar a cada 1 minuto (60 segundos)
export const revalidate = 60;

export default async function TipsPage() {
  const allPosts = await getPublishedPosts();
  
  // Filtrar apenas posts do tipo "Tip"
  const tipPosts = allPosts.filter((post: Post) => post.type === 'Tip');

  return (
    <main className="w-full">
      <section className="text-center py-8 sm:py-12 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mb-6 sm:mb-8 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 font-poppins mb-2">
          💡 DICAS & TUTORIAIS
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-inter mb-6">
          &ldquo;Soluções práticas para problemas digitais cotidianos&rdquo;
        </p>
      </section>

      <TipsFilter posts={tipPosts} />
    </main>
  );
}
