"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function HelpPage() {
  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-neutral-white rounded-2xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-neutral-black mb-6 text-center">
          Central de Ajuda
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-primary-dark mb-4">
            Perguntas Frequentes (FAQ)
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg text-neutral-black">
                Como faço para criar uma conta?
              </h3>
              <p className="text-neutral-gray-dark">
                Para criar uma conta, clique em "Cadastre-se" na página inicial ou na página de login. Escolha entre Tutor ou Clínica, preencha o formulário com seus dados e siga as instruções.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-neutral-black">
                Esqueci minha senha, o que devo fazer?
              </h3>
              <p className="text-neutral-gray-dark">
                Na página de login, clique em "Esqueceu sua senha?". Você será guiado para um processo de recuperação de senha.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-neutral-black">
                Como entro em contato com o suporte?
              </h3>
              <p className="text-neutral-gray-dark">
                Você pode entrar em contato com nosso suporte através do email ajuda@cuidapet.com.br.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary-dark mb-4">
            Ainda precisa de ajuda?
          </h2>
          <p className="text-neutral-gray-dark">
            Se você não encontrou a resposta para sua pergunta, por favor, entre em contato conosco.
          </p>
          <Link
            href="mailto:ajuda@cuidapet.com.br"
            className="mt-4 inline-block bg-primary text-neutral-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-primary-dark transition duration-300"
          >
            Enviar um Email
          </Link>
        </section>

        <div className="text-center mt-8">
          <Link href="/feed" className="text-primary hover:text-primary-dark inline-flex items-center gap-1">
            <ArrowLeftIcon className="w-4 h-4" />
            Voltar para o Feed
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
