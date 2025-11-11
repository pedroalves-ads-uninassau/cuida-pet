"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-500 to-orange-400 text-white text-center p-6">
      {/* Logo com animação */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/images/logo-cuida-pet.png"
          alt="Cuida Pet Logo"
          width={180}
          height={180}
          className="mx-auto mb-6 drop-shadow-lg"
        />
      </motion.div>

      {/* Título e slogan */}
      <motion.h1
        className="text-4xl font-bold mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        🐾 Cuida Pet
      </motion.h1>

      <motion.p
        className="text-lg max-w-md mb-8 text-orange-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        Conectando pessoas e pets com amor e tecnologia. ❤️
      </motion.p>

      {/* Botão de login */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/splash")}
        className="bg-white text-orange-600 font-semibold px-8 py-3 rounded-full shadow-lg transition-all hover:bg-orange-100"
      >
        Entrar no App
      </motion.button>

      {/* Rodapé */}
      <footer className="absolute bottom-6 text-sm text-orange-100 opacity-80">
        © 2025 Cuida Pet – Projeto UNINASSAU
      </footer>
    </main>
  );
}
