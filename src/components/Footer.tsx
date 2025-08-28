import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-12 shadow-inner">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p className="text-lg font-semibold mb-4">
          DeskBlue - Simplificando tecnologia para você
        </p>
        <nav className="flex justify-center space-x-6 mb-4">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link href="/tips" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Tips
          </Link>
          <Link href="/future" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Future
          </Link>
          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Terms
          </Link>
        </nav>
        <div className="flex justify-center space-x-6 mb-4 text-2xl">
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
        <p className="text-sm">
          &copy; 2024 DeskBlue
        </p>
      </div>
    </footer>
  );
};

export default Footer;


