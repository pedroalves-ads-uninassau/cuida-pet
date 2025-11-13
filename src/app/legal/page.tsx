import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-primary-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="bg-neutral-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-black text-center">
              Termos de Uso e Política de Privacidade
            </h1>
          </div>

          <div className="prose prose-lg max-w-none text-neutral-gray-dark">
            <p>
              Ao utilizar o aplicativo Cuida Pet, você concorda em usar nossos
              serviços de forma responsável e respeitosa. O app tem como
              objetivo conectar tutores de animais e clínicas veterinárias para
              facilitar o cuidado com os pets.
            </p>

            <h2 className="text-2xl font-bold text-neutral-black mt-8">
              Uso da Plataforma
            </h2>
            <p>
              É proibido publicar conteúdo ofensivo, falso, difamatório, ou que
              viole direitos de terceiros (incluindo direitos autorais e de
              imagem). O Cuida Pet não se responsabiliza por informações
              incorretas, agendamentos não cumpridos ou qualquer outro problema
              decorrente da interação entre usuários ou clínicas.
            </p>

            <h2 className="text-2xl font-bold text-neutral-black mt-8">
              Coleta de Dados
            </h2>
            <p>
              Para fornecer nossos serviços, coletamos informações que você nos
              fornece no momento do cadastro, como nome, e-mail e dados do seu
              pet. Utilizamos esses dados para personalizar sua experiência e
              facilitar a comunicação com outros usuários e clínicas.
            </p>

            <h2 className="text-2xl font-bold text-neutral-black mt-8">
              Responsabilidades
            </h2>
            <p>
              O Cuida Pet atua como um facilitador. A responsabilidade pelos
              serviços prestados, diagnósticos e tratamentos é inteiramente das
              clínicas e profissionais contratados. Recomendamos que os tutores
              verifiquem as credenciais e a qualidade dos serviços por conta
              própria.
            </p>

            <p className="mt-8">
              Ao continuar utilizando o Cuida Pet, você declara estar ciente e
              de acordo com todos os pontos descritos nestes termos.
            </p>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-primary hover:text-primary-dark inline-flex items-center gap-2 font-bold"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
