"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useApp } from "@/context/AppContext";

export default function RegisterTutorPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const { register } = useApp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name);
      router.push('/feed');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError("Este email já está em uso.");
      } else if (err.code === 'auth/weak-password') {
        setError("A senha deve ter pelo menos 6 caracteres.");
      } else {
        setError(`Erro: ${err.message}`); // Show detailed error
      }
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
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-16 h-16 mb-4">
                <Image
                  src="/images/logo-cuida-pet.png"
                  alt="Cuida Pet Logo"
                  fill
                  className="rounded-full object-cover shadow-md"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Crie sua conta
              </h1>
              <p className="text-gray-500 mt-1">Junte-se ao Cuida Pet</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg text-center">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                  placeholder="voce@email.com"
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                  placeholder="Crie uma senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-400 hover:text-primary transition"
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                  placeholder="Confirme sua senha"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-primary-dark hover:shadow-xl transition duration-300 mt-2"
              >
                Cadastrar
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link
                  href="/login"
                  className="font-bold text-primary hover:text-primary-dark transition"
                >
                  Faça login
                </Link>
              </p>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link href="/register" className="text-gray-500 hover:text-primary transition inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeftIcon className="w-4 h-4" />
              Voltar
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}