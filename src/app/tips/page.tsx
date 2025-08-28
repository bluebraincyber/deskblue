import { getPublishedPosts } from "@/lib/notion";
import PostCard from "@/components/PostCard";

export const revalidate = 300; // ISR 5 min

export default async function TipsPage() {
  const posts = await getPublishedPosts();

  if (!posts.length) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Dicas</h1>
        <p className="mt-4">Nada publicado ainda. Garanta status “Published”.</p>
      </main>
    );
  }

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {posts.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
