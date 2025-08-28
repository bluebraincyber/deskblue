import { Post } from "@/types/post";

export const generateArticleSchema = (post: Post) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.seoTitle || post.title,
    "description": post.seoDescription || post.excerpt,
    "image": [
      `https://www.deskblue.com.br${post.cover}` // Replace with actual domain
    ],
    "datePublished": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": "DeskBlue" // Replace with actual author name if available
    },
    "publisher": {
      "@type": "Organization",
      "name": "DeskBlue",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.deskblue.com.br/logo.png" // Replace with actual logo URL
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.deskblue.com.br/post/${post.slug}` // Replace with actual domain
    }
  };
};

export const generateBreadcrumbSchema = (post: Post) => {
  const breadcrumbList = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.deskblue.com.br/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": post.type === "Tip" ? "Dicas" : "Futuro",
      "item": `https://www.deskblue.com.br/${post.type === "Tip" ? "tips" : "future"}`
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": post.title,
      "item": `https://www.deskblue.com.br/post/${post.slug}`
    }
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbList
  };
};


