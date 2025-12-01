"use client";
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function HelpPage() {
  return (
    <div className="max-w-2xl mx-auto pb-20 px-4">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center mt-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Central de Ajuda</h1>
        <p className="text-gray-500 mb-8">
          Precisa de suporte ou tem alguma dúvida? Entre em contato com a gente!
        </p>

        <a
          href="mailto:aplicativocuidapet@gmail.com"
          className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary hover:bg-primary/5 transition group cursor-pointer"
        >
          <div className="bg-white p-4 rounded-full shadow-sm text-primary mb-4 group-hover:scale-110 transition-transform">
            <EnvelopeIcon className="h-8 w-8" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-1">Fale Conosco</h3>
          <p className="text-gray-500 font-medium">aplicativocuidapet@gmail.com</p>
        </a>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400">
            Responderemos o mais breve possível. 🧡
          </p>
        </div>
      </div>
    </div>
  );
}
