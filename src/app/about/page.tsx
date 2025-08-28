export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-4xl text-gray-500 dark:text-gray-400">👨‍💻</span>
        </div>
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 font-poppins mb-2">
          Sobre o DeskBlue
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 font-inter">
          &ldquo;Transformando complexidade em simplicidade&rdquo;
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-4 text-center">MISSÃO</h2>
          <p className="text-gray-700 dark:text-gray-300 text-center">
            Acredito que tecnologia deve simplificar a vida, não complicar. Por isso criei o DeskBlue: um espaço para compartilhar conhecimento de forma acessível e prática.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-4 text-center">O QUE FAÇO</h2>
          <ul className="text-gray-700 dark:text-gray-300 list-none space-y-2 text-center">
            <li>💡 Dicas rápidas de tecnologia</li>
            <li>🔧 Soluções para problemas digitais</li>
            <li>📚 Artigos sobre o futuro da tech</li>
            <li>🎥 Conteúdo no YouTube</li>
            <li>📱 Suporte pelo WhatsApp</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-4 text-center">ONDE ME ENCONTRAR</h2>
          <div className="flex justify-center space-x-6 text-4xl mb-4">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="WhatsApp">
              📱
            </a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="YouTube">
              🎥
            </a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Email">
              📧
            </a>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-center">
            &ldquo;Sempre pronto para ajudar com suas dúvidas!&rdquo;
          </p>
        </div>
      </section>
    </div>
  );
}


