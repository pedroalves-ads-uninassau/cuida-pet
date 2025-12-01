"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useApp();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      router.push('/feed');
    } catch (err: any) {
      console.error(err);
      setError("Falha ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary-light/30">
      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-white/50 backdrop-blur-sm">
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-20 h-20 mb-4">
                <Image
                  src="/images/logo-cuida-pet.png"
                  alt="Cuida Pet Logo"
                  fill
                  className="rounded-full object-cover shadow-md"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bem-vindo de volta!
              </h1>
              <p className="text-gray-500 mt-2">Faça login para continuar</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg text-center">
                  {error}
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                  placeholder="voce@email.com"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Senha
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-400 hover:text-primary transition"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="text-right text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-primary hover:text-primary-dark transition"
                >
                  Esqueceu sua senha?
                </Link>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:bg-primary-dark hover:shadow-xl transition duration-300"
              >
                Entrar
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Link
                  href="/register"
                  className="font-bold text-primary hover:text-primary-dark transition"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link href="/" className="text-gray-500 hover:text-primary transition inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeftIcon className="w-4 h-4" />
              Voltar para a página inicial
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}