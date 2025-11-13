"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login form submitted. Redirecting to /feed.");
    router.push('/feed');
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary-light">
      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-neutral-white rounded-2xl shadow-2xl p-8">
            <div className="flex flex-col items-center mb-6">
              <Image
                src="/images/logo-cuida-pet.png"
                alt="Cuida Pet Logo"
                width={80}
                height={80}
                className="rounded-full mb-4"
              />
              <h1 className="text-3xl font-bold text-neutral-black">
                Bem-vindo de volta!
              </h1>
              <p className="text-neutral-gray-dark">Faça login para continuar</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-gray-dark"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-4 py-3 bg-neutral-white border border-neutral-gray-light rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="voce@email.com"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-neutral-gray-dark"
                >
                  Senha
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="mt-1 block w-full px-4 py-3 bg-neutral-white border border-neutral-gray-light rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-neutral-gray-dark hover:text-primary"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-6 w-6" />
                  ) : (
                    <EyeIcon className="h-6 w-6" />
                  )}
                </button>
              </div>

              <div className="text-right text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-primary hover:text-primary-dark"
                >
                  Esqueceu sua senha?
                </Link>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary text-neutral-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-primary-dark transition duration-300"
              >
                Entrar
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-gray-dark">
                Não tem uma conta?{" "}
                <Link
                  href="/register"
                  className="font-bold text-primary hover:text-primary-dark"
                >
                  Cadastre-se
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