"use client";
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function HelpPage() {
  const faqs = [
    {
      question: "Como agendar uma consulta?",
      answer: "Vá até a aba 'Mapa', encontre uma clínica próxima e clique em 'Ver Detalhes'. Lá você encontrará a opção de agendamento."
    },
    {
      question: "É gratuito?",
      answer: "O download e cadastro no app são gratuitos. Os serviços veterinários são cobrados diretamente pelas clínicas parceiras."
    },
    {
      question: "Como cadastro meu pet?",
      answer: "No seu perfil, clique no botão '+ Adicionar Pet' e preencha as informações do seu bichinho."
    },
  ];

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Central de Ajuda</h1>

      {/* FAQs */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Perguntas Frequentes</h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <Disclosure.Button className="flex w-full justify-between px-4 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                    <span>{faq.question}</span>
                    <ChevronUpIcon
                      className={`${open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-primary`}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-4 pb-4 pt-2 text-sm text-gray-500 bg-gray-50/50">
                      {faq.answer}
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Ainda precisa de ajuda?</h2>
        <div className="grid grid-cols-1 gap-4">
          <a
            href="mailto:aplicativocuidapet@gmail.com"
            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition group"
          >
            <div className="bg-primary/10 p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition">
              <EnvelopeIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Email</h3>
              <p className="text-sm text-gray-500">aplicativocuidapet@gmail.com</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
