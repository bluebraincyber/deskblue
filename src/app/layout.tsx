import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-poppins" });

export const metadata: Metadata = {
  metadataBase: process.env.NODE_ENV === 'development' 
    ? new URL('http://localhost:3000') 
    : new URL('https://www.deskblue.com.br'),
  title: "DeskBlue - Simplificando tecnologia para você",
  description: "Dicas práticas de tecnologia, conteúdo acessível e soluções rápidas para problemas digitais cotidianos.",
  openGraph: {
    title: "DeskBlue - Simplificando tecnologia para você",
    description: "Dicas práticas de tecnologia, conteúdo acessível e soluções rápidas para problemas digitais cotidianos.",
    url: "https://www.deskblue.com.br",
    siteName: "DeskBlue",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "DeskBlue - Simplificando tecnologia",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeskBlue - Simplificando tecnologia para você",
    description: "Dicas práticas de tecnologia, conteúdo acessível e soluções rápidas para problemas digitais cotidianos.",
    images: ["/images/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 flex flex-col min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}


