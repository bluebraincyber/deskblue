
'use client';
import { posts } from "@/data/mocks/posts";
import PostCard from "@/components/PostCard";
import { useState } from "react";

export default function TipsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("Todas");

  const filteredPosts = posts.filter(post => 
    post.type === "Tip" &&
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedTag === "Todas" || post.tags.includes(selectedTag))
  );

  const allTags = ["Todas", ...new Set(posts.flatMap(post => post.tags))];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 font-poppins mb-2">
          💡 DICAS PRÁTICAS
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 font-inter">
          "Soluções rápidas para seu dia a dia digital"
        </p>
      </section>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar dicas..."
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-gray-700 dark:text-gray-300 mr-2">🏷️</span>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedTag === tag ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900"}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg mt-8">
          Nenhuma dica encontrada com os critérios de busca.
        </p>
      )}
    </div>
  );
}


