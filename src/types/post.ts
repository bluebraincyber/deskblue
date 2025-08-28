export type Post = {
  id: string;
  title: string;
  slug: string;
  status: 'Published' | 'Draft';
  type: 'Tip' | 'Future';
  tags: string[];
  publishedAt: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  cover: string;
  altText: string;
  videoUrl: string | null;
  readingTime: number;
  content: string;
};


