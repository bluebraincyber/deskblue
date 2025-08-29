'use client';

import { useState } from 'react';
import PostCard from '@/components/PostCard';
import { Post } from '@/types/post';

interface TipsFilterProps {
  posts: Post[];
}

const TipsFilter: React.FC<TipsFilterProps> = ({ posts }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Extrair categorias únicas dos posts
  const categories = ['all', ...Array.from(new Set(posts.flatMap(post => post.tags)))];
  
  // Filtrar posts baseado na categoria selecionada
  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => 
        post.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase())
      );

  return (
    <>
      {/* Filtros de Categoria */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'
            }`}
          >
            {category === 'all' ? 'Todas as Categorias' : category}
            <span className="ml-2 text-xs">({posts.filter(post => 
              category === 'all' || post.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
            ).length})</span>
          </button>
        ))}
      </div>

      {/* Resultados */}
      <div className="mb-6">
        <div className="text-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Mostrando {filteredPosts.length} de {posts.length} dicas
            {selectedCategory !== 'all' && (
              <span className="ml-2 text-blue-600 dark:text-blue-400">
                na categoria "{selectedCategory}"
              </span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredPosts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TipsFilter;