"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const { sendPasswordResetEmail } = await import("firebase/auth");
      const { auth } = await import("@/services/firebase");

      if (auth) {
        await sendPasswordResetEmail(auth, email);
        alert(`Um link de recuperação foi enviado para ${email}. Verifique sua caixa de entrada (e spam).`);
        router.push('/login');
      }
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/user-not-found') {
        alert("Email não encontrado.");
      } else {
        alert("Erro ao enviar email. Tente novamente.");
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
                Esqueceu a senha?
              </h1>
              <p className="text-gray-500 mt-1 text-center">
                Digite seu e-mail para receber as instruções
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email cadastrado</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                  placeholder="seu@email.com"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-primary-dark hover:shadow-xl transition duration-300"
              >
                Recuperar Senha
              </motion.button>
            </form>
          </div>
          <div className="text-center mt-6">
            <Link href="/login" className="text-gray-500 hover:text-primary transition inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeftIcon className="w-4 h-4" />
              Voltar para o login
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
