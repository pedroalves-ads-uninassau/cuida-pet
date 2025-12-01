"use client";
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="relative h-48 bg-primary">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32 bg-white rounded-full p-2 shadow-lg">
              <Image
                src="/images/logo-cuida-pet.png"
                alt="Cuida Pet Logo"
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="px-8 py-10 text-center">
          <h1 className="text-3xl font-baloo font-bold text-gray-900 mb-4">Sobre o Cuida Pet</h1>

          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-6">
              Olá! Nós somos um grupo de estudantes apaixonados por tecnologia e, claro, por animais! 🐾
            </p>
            <p className="mb-6">
              O <strong>Cuida Pet</strong> nasceu de um trabalho da faculdade. Nosso objetivo era simples: criar algo que facilitasse a vida de quem ama seus bichinhos, conectando tutores a clínicas veterinárias de um jeito fácil e moderno.
            </p>
            <p>
              Ainda estamos aprendendo e melhorando o aplicativo a cada dia. Esperamos que você goste e que o Cuida Pet ajude você a cuidar ainda melhor do seu melhor amigo!
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-400">
              Feito com ❤️ (e muito café ☕) por estudantes.
            </p>
            <p className="text-xs text-gray-300 mt-2">
              Versão 1.0.0 (Beta)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
