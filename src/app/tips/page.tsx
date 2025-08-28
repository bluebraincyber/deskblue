import { getPublishedPosts } from "@/lib/notion";
import PostCard from "@/components/PostCard";
import { Post } from '@/types/post';

export default async function TipsPage() {
  const posts = await getPublishedPosts();
  const allPosts = posts.filter((post: Post) => post.type === "Tip");

  // Extrair categorias únicas dos posts
  const categories = ['all', ...Array.from(new Set(allPosts.flatMap(post => post.tags)))];

  if (!allPosts.length) {
    return (
      <main className="w-full">
        <section className="text-center py-8 sm:py-12 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mb-6 sm:mb-8 px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 font-poppins mb-2">
            💡 DICAS & TUTORIAIS
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-inter">
            &ldquo;Soluções práticas para problemas digitais cotidianos&rdquo;
          </p>
        </section>
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Nada publicado ainda. Garanta status "Published".</p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full">
      <section className="text-center py-8 sm:py-12 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mb-6 sm:mb-8 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 font-poppins mb-2">
          💡 DICAS & TUTORIAIS
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-inter mb-6">
          &ldquo;Soluções práticas para problemas digitais cotidianos&rdquo;
        </p>
        
        {/* Filtros de Categoria */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((category) => (
            <span
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {category === 'all' ? 'Todas as Categorias' : category}
              <span className="ml-2 text-xs">({allPosts.filter(post => 
                category === 'all' || post.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
              ).length})</span>
            </span>
          ))}
        </div>
      </section>

      {/* Resultados */}
      <div className="mb-6">
        <div className="text-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Mostrando todas as {allPosts.length} dicas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {allPosts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
