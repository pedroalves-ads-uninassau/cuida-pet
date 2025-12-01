"use client";


export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto pb-20 px-4">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Sobre o Projeto 🐾</h1>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          O <strong>Cuida Pet</strong> é um projeto acadêmico desenvolvido para facilitar a conexão entre tutores de pets e clínicas veterinárias, unindo tecnologia e cuidado animal.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-primary mb-4">Desenvolvedores</h2>
          <ul className="space-y-2 text-gray-700 font-medium text-lg">
            <li>Allan Victor</li>
            <li>Gabriel Henrique</li>
            <li>Pedro Alves</li>
          </ul>
        </div>

        <p className="text-sm text-gray-400 mt-8">
          Uninassau - Análise e Desenvolvimento de Sistemas
        </p>
      </div>
    </div>
  );
}
