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
    <main className="max-w-5xl mx-auto p-6 grid gap-6 sm:grid-cols-2">
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}
