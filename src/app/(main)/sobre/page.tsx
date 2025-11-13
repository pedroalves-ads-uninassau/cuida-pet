import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function SobrePage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-neutral-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/images/logo-cuida-pet.png"
            alt="Cuida Pet Logo"
            width={100}
            height={100}
            className="rounded-full mb-4"
          />
          <h1 className="text-4xl font-bold text-neutral-black text-center">
            Sobre o Cuida Pet
          </h1>
        </div>

        <div className="prose prose-lg max-w-none text-neutral-gray-dark">
          <p>
            O <strong>Cuida Pet</strong> é um aplicativo mobile (e agora uma aplicação web!) desenvolvido com o objetivo de aproximar tutores de animais e clínicas veterinárias, promovendo o bem-estar e o cuidado dos pets por meio da tecnologia.
          </p>
          <p>
            Nossa plataforma oferece recursos de agendamento de consultas, interação entre usuários e compartilhamento de experiências, em um ambiente moderno e intuitivo inspirado em redes sociais.
          </p>
          <p>
            Com o Cuida Pet, buscamos unir amor, praticidade e inovação, criando uma comunidade digital voltada ao cuidado e à saúde animal.
          </p>
          <h2 className="text-2xl font-bold text-neutral-black mt-8">Nossa Missão</h2>
          <p>
            Nossa missão é criar uma comunidade onde tutores, veterinários e amantes de pets possam se conectar, compartilhar e cuidar dos seus companheiros com a ajuda da tecnologia, tornando o acesso a serviços veterinários mais simples e eficiente.
          </p>
        </div>
        <div className="text-center mt-8">
          <Link href="/feed" className="text-primary hover:text-primary-dark inline-flex items-center gap-1 font-bold">
            <ArrowLeftIcon className="w-4 h-4" />
            Voltar para o Feed
          </Link>
        </div>
      </div>
    </div>
  );
}
