"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function RegisterClinicPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#FFA333] to-[#E27B00]">
      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex flex-col items-center mb-8">
              <Image
                src="/images/logo-cuida-pet.png"
                alt="Cuida Pet Logo"
                width={60}
                height={60}
                className="rounded-full mb-4"
              />
              <h1 className="text-3xl font-baloo font-bold text-black">
                Cadastro de Clínica
              </h1>
              <p className="text-neutral-gray-dark mt-2 text-center">
                Conectando pessoas e pets com amor e tecnologia!
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="cnpj"
                  className="mb-1 block text-sm font-baloo font-medium text-gray-dark"
                >
                  CNPJ:
                </label>
                <input
                  type="text"
                  id="cnpj"
                  className="w-full rounded-md border border-gray-light px-3 py-2 focus:border-primary focus:outline-none"
                  placeholder="00.000.000/0000-00"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-sm font-baloo font-medium text-gray-dark"
                >
                  Telefone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full rounded-md border border-gray-light px-3 py-2 focus:border-primary focus:outline-none"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-baloo font-medium text-gray-dark"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md border border-gray-light px-3 py-2 focus:border-primary focus:outline-none"
                  placeholder="contato@suaclinica.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-baloo font-medium text-gray-dark"
                >
                  Senha:
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full rounded-md border border-gray-light px-3 py-2 focus:border-primary focus:outline-none"
                  placeholder="********"
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-1 block text-sm font-baloo font-medium text-gray-dark"
                >
                  Confirmação da senha:
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full rounded-md border border-gray-light px-3 py-2 focus:border-primary focus:outline-none"
                  placeholder="********"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-dark">
                  Li e concordo com os{" "}
                  <Link href="/legal" className="text-primary hover:underline">
                    Termos de Uso e Política de Privacidade
                  </Link>
                </label>
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-primary py-2 font-baloo font-bold text-white hover:bg-primary-dark"
              >
                CADASTRAR CLÍNICA
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-gray-dark">
                Já tem uma conta?{" "}
                <Link
                  href="/login"
                  className="font-bold text-primary hover:text-primary-dark"
                >
                  Faça login com o email
                </Link>
              </p>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link href="/register" className="text-primary hover:text-primary-dark inline-flex items-center gap-1">
              <ArrowLeftIcon className="w-4 h-4" />
              VOLTAR
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}