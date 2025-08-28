import { getPublishedPosts } from "@/lib/notion";

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
      {posts.map((post) => (
        <a key={post.id} href={`/post/${post.slug}`} className="rounded-xl border p-4 hover:shadow">
          {post.cover && (
            <img src={post.cover} alt="" className="mb-3 h-40 w-full object-cover rounded-lg" />
          )}
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">{post.summary}</p>
        </a>
      ))}
    </main>
  );
}
