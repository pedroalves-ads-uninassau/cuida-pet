"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 bg-gradient-to-tr from-primary-light to-neutral-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl"
      >
        <Image
          src="/images/logo-cuida-pet.png"
          alt="Logo Cuida Pet"
          width={140}
          height={140}
          priority
          className="mx-auto mb-8 drop-shadow-2xl rounded-3xl"
        />
        <h1 className="text-5xl md:text-6xl font-extrabold text-neutral-black mb-6 leading-tight">
          Conectando Pessoas e Pets com{" "}
          <span className="text-primary">Amor e Tecnologia</span> 🐾
        </h1>
        <p className="text-lg md:text-xl text-neutral-gray-dark mb-8 font-light">
          Cuida Pet é a plataforma perfeita para cuidar, agendar e se conectar
          com quem também ama os animais.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="bg-primary text-neutral-white px-10 py-3 text-lg rounded-full font-bold shadow-md hover:bg-primary-dark transition transform hover:scale-105"
        >
          Começar Agora
        </button>
      </motion.div>
    </section>
  );
}
