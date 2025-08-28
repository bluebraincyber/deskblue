import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 sm:py-8 mt-12 shadow-inner">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
        <p className="text-base sm:text-lg font-semibold mb-4">
          DeskBlue - Simplificando tecnologia para você
        </p>
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4 text-sm sm:text-base">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link href="/tips" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Dicas
          </Link>
          <Link href="/future" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Futuro
          </Link>
          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Sobre
          </Link>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Contato
          </Link>
          <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Privacidade
          </Link>
          <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Termos
          </Link>
        </nav>
        <div className="flex justify-center space-x-4 sm:space-x-6 mb-4 text-xl sm:text-2xl">
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
        <p className="text-xs sm:text-sm">
          &copy; 2024 DeskBlue
        </p>
      </div>
    </footer>
  );
};

export default Footer;


