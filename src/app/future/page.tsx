import { getPublishedPosts } from "@/lib/notion";
import PostCard from "@/components/PostCard";
import { Post } from "@/types/post";

export default async function FuturePage() {
  const posts = await getPublishedPosts();
  const futurePosts = posts.filter((post: Post) => post.type === "Future");

  return (
    <div className="w-full">
      <section className="text-center py-8 sm:py-12 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mb-6 sm:mb-8 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 font-poppins mb-2">
          🚀 TECNOLOGIA & FUTURO
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-inter">
          &ldquo;Reflexões sobre o mundo digital que nos cerca&rdquo;
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {futurePosts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {futurePosts.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg mt-8">
          Nenhum artigo sobre o futuro encontrado.
        </p>
      )}
    </div>
  );
}


