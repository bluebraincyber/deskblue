'use client';

import { useState, useEffect } from 'react';
import { getPublishedPosts } from "@/lib/notion";
import PostCard from "@/components/PostCard";
import { Post } from '@/types/post';

export default function TipsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPublishedPosts();
        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filtrar posts por categoria
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [selectedCategory, posts]);

  // Extrair categorias únicas dos posts
  const categories = ['all', ...Array.from(new Set(posts.flatMap(post => post.tags)))];

  if (loading) {
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando dicas...</p>
        </div>
      </main>
    );
  }

  if (!posts.length) {
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
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 hover:scale-105'
              }`}
            >
              {category === 'all' ? 'Todas as Categorias' : category}
              {selectedCategory === category && (
                <span className="ml-2 text-xs">({filteredPosts.length})</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Resultados */}
      <div className="mb-6">
        <div className="text-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {selectedCategory === 'all' 
              ? `Mostrando todas as ${filteredPosts.length} dicas`
              : `Mostrando ${filteredPosts.length} dica${filteredPosts.length !== 1 ? 's' : ''} na categoria "${selectedCategory}"`
            }
          </p>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Nenhuma dica encontrada para a categoria selecionada.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Ver Todas as Dicas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredPosts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
