'use client';

import ReactMarkdown from 'react-markdown';
import YouTubeEmbed from './YouTubeEmbed';

interface CustomMarkdownProps {
  children: string;
}

const CustomMarkdown: React.FC<CustomMarkdownProps> = ({ children }) => {
  // Função para processar o conteúdo e detectar vídeos do YouTube
  const processContent = (content: string): string => {
    // Padrões para detectar URLs do YouTube no texto
    const youtubePatterns = [
      /(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[^\s\n]+)/g,
      /(https?:\/\/youtu\.be\/[^\s\n]+)/g,
      /(https?:\/\/(?:www\.)?youtube\.com\/embed\/[^\s\n]+)/g,
      /(https?:\/\/(?:www\.)?youtube\.com\/v\/[^\s\n]+)/g,
    ];

    let processedContent = content;

    // Substituir URLs do YouTube por placeholders especiais
    youtubePatterns.forEach(pattern => {
      processedContent = processedContent.replace(pattern, (match) => {
        return `{{YOUTUBE_EMBED:${match}}}`;
      });
    });

    return processedContent;
  };

  // Componente customizado para renderizar vídeos do YouTube
  const components = {
    p: ({ children, ...props }: any) => {
      const text = children?.toString() || '';
      
      // Verificar se o parágrafo contém um placeholder de vídeo do YouTube
      if (text.includes('{{YOUTUBE_EMBED:')) {
        const videoUrl = text.match(/{{YOUTUBE_EMBED:(https?:\/\/[^}]+)}}/)?.[1];
        if (videoUrl) {
          return (
            <div className="my-6">
              <YouTubeEmbed videoUrl={videoUrl} />
            </div>
          );
        }
      }
      
      // Verificar se o parágrafo contém URLs do YouTube diretas
      const youtubeUrl = text.match(/(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[^\s\n]+|https?:\/\/youtu\.be\/[^\s\n]+|https?:\/\/(?:www\.)?youtube\.com\/embed\/[^\s\n]+|https?:\/\/(?:www\.)?youtube\.com\/v\/[^\s\n]+)/);
      
      if (youtubeUrl) {
        return (
          <div className="my-6">
            <YouTubeEmbed videoUrl={youtubeUrl[0]} />
          </div>
        );
      }
      
      return <p {...props}>{children}</p>;
    },
  };

  const processedContent = processContent(children);

  return (
    <ReactMarkdown components={components}>
      {processedContent}
    </ReactMarkdown>
  );
};

export default CustomMarkdown;
