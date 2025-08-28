import { posts } from "@/data/mocks/posts";
import PostCard from "@/components/PostCard";

export default function FuturePage() {
  const futurePosts = posts.filter(post => post.type === "Future");

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 font-poppins mb-2">
          🚀 TECNOLOGIA & FUTURO
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 font-inter">
          &ldquo;Reflexões sobre o mundo digital que nos cerca&rdquo;
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {futurePosts.map((post) => (
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


