'use client';

interface YouTubeEmbedProps {
  videoUrl: string;
  title?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoUrl, title }) => {
  // Função para extrair o ID do vídeo do YouTube de diferentes formatos de URL
  const getYouTubeVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return null;
  };

  const videoId = getYouTubeVideoId(videoUrl);

  if (!videoId) {
    return (
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Não foi possível carregar o vídeo do YouTube
        </p>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Assistir no YouTube
        </a>
      </div>
    );
  }

  return (
    <div className="w-full mb-6">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || "Vídeo do YouTube"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
        />
      </div>
      {title && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
          {title}
        </p>
      )}
    </div>
  );
};

export default YouTubeEmbed;
