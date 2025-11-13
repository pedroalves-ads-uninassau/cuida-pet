"use client";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

export function About() {
  return (
    <section id="sobre" className="py-24 bg-primary-light/20 px-8 text-center">
      <motion.h2
        className="text-4xl font-bold text-neutral-black mb-4"
        {...fadeIn("up", 0)}
      >
        Sobre Nós 🧡
      </motion.h2>
      <motion.p
        className="max-w-3xl mx-auto text-neutral-gray-dark text-lg mb-12"
        {...fadeIn("up", 0.2)}
      >
        Cuida Pet nasceu da paixão por animais e do desejo de facilitar a
        vida de quem os ama. Nossa missão é criar uma comunidade onde
        tutores, veterinários e amantes de pets possam se conectar,
        compartilhar e cuidar dos seus companheiros com a ajuda da tecnologia.
      </motion.p>
    </section>
  );
}
