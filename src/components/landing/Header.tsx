"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-white/80 border-b border-primary-light shadow-sm py-4 px-8 flex justify-between items-center backdrop-blur-md">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <Image
            src="/images/logo-cuida-pet.png"
            alt="Cuida Pet Logo"
            width={40}
            height={40}
            priority
            className="rounded-full shadow-md"
          />
          <span className="text-xl font-extrabold text-primary tracking-wider">
            Cuida Pet
          </span>
        </Link>
      </motion.div>

      <nav className="hidden md:flex space-x-6 text-neutral-gray-dark font-medium">
        <a href="#funcionalidades" className="hover:text-primary transition">
          Funcionalidades
        </a>
        <a href="#sobre" className="hover:text-primary transition">
          Sobre
        </a>
        <a href="#equipe" className="hover:text-primary transition">
          Equipe
        </a>
      </nav>

      <motion.button
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={() => router.push("/login")}
        className="bg-primary text-neutral-white px-6 py-2 rounded-full font-semibold text-sm shadow-md hover:bg-primary-dark transition duration-300"
      >
        Entrar ou Cadastrar
      </motion.button>
    </header>
  );
}
