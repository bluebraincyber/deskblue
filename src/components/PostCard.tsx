import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/post';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link href={`/post/${post.slug}`} className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full">
      <div className="relative w-full h-40 sm:h-48">
        <Image
          src={post.cover}
          alt={post.altText || post.title}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 sm:mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs">
          <span>📅 {new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
          <span>⏱️ {post.readingTime} min de leitura</span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1 sm:gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default PostCard;


