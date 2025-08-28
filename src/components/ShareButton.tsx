'use client';

interface ShareButtonProps {
  url: string;
}

export default function ShareButton({ url }: ShareButtonProps) {
  const shareOnWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}`, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    // Opcional: adicionar feedback visual como um toast
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 lg:p-10 text-center">
      <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Gostou da dica? Compartilhe!
      </p>
      <div className="flex justify-center space-x-6 text-3xl">
        <button 
          onClick={shareOnWhatsApp} 
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
          aria-label="Compartilhar no WhatsApp"
        >
          📱
        </button>
        <button 
          onClick={shareOnTelegram} 
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
          aria-label="Compartilhar no Telegram"
        >
          💬
        </button>
        <button
          onClick={copyToClipboard}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label="Copiar Link"
        >
          🔗
        </button>
      </div>
    </section>
  );
}