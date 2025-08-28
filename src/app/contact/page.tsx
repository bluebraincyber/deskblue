// Remove the unused import
import React from "next/react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 font-poppins mb-2">
          📞 CONTATO
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 font-inter">
          &ldquo;Vamos conversar!&rdquo;
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-4">
            📱 WHATSAPP
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Dúvidas rápidas e suporte direto
          </p>
          <a href="#" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
            Chamar no WhatsApp
          </a>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            &ldquo;Respondo pessoalmente em até 2 horas&rdquo;
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-4">
            🎥 YOUTUBE
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Tutoriais em vídeo e reviews
          </p>
          <a href="#" className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors">
            Ver no YouTube
          </a>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            &ldquo;Conteúdo visual para aprender melhor&rdquo;
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-4">
            📧 EMAIL
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Contato profissional
          </p>
          <a href="#" className="bg-gray-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors">
            Enviar Email
          </a>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            &ldquo;Para parcerias e colaborações&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}


