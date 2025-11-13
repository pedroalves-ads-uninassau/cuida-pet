"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, UserIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";

export default function RegisterChoicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-primary-light">
      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex flex-col items-center mb-8">
              <Image
                src="/images/logo-cuida-pet.png"
                alt="Cuida Pet Logo"
                width={80}
                height={80}
                className="rounded-full mb-4"
              />
              <h1 className="text-3xl font-baloo font-bold text-black">
                Como você quer se cadastrar?
              </h1>
              <p className="text-neutral-gray-dark mt-2">Escolha uma opção para continuar</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/register/tutor">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center justify-center p-8 bg-primary-light/30 rounded-2xl shadow-lg border border-primary-light cursor-pointer h-full"
                >
                  <UserIcon className="w-16 h-16 text-primary mb-4" />
                  <h2 className="text-2xl font-bold text-primary-dark">Sou Tutor</h2>
                  <p className="text-neutral-gray-dark text-center mt-2">
                    Para quem quer cuidar do seu pet, agendar consultas e muito mais.
                  </p>
                </motion.div>
              </Link>

              <Link href="/register/clinic">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center justify-center p-8 bg-primary-light/30 rounded-2xl shadow-lg border border-primary-light cursor-pointer h-full"
                >
                  <BuildingOffice2Icon className="w-16 h-16 text-primary mb-4" />
                  <h2 className="text-2xl font-bold text-primary-dark">Sou Clínica</h2>
                  <p className="text-neutral-gray-dark text-center mt-2">
                    Para clínicas e veterinários que querem oferecer seus serviços.
                  </p>
                </motion.div>
              </Link>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-neutral-gray-dark">
                Já tem uma conta?{" "}
                <Link
                  href="/login"
                  className="font-bold text-primary hover:text-primary-dark"
                >
                  Faça login
                </Link>
              </p>
            </div>

          </div>
          <div className="text-center mt-4">
            <Link href="/" className="text-primary hover:text-primary-dark inline-flex items-center gap-1">
              <ArrowLeftIcon className="w-4 h-4" />
              Voltar para a página inicial
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}