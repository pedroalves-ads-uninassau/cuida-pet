"use client";
import { motion } from "framer-motion";
import { team } from "@/data/team";
import { fadeIn } from "@/utils/motion";

export function Team() {
  return (
    <section id="equipe" className="py-24 bg-neutral-white px-8 text-center">
      <motion.h2
        className="text-4xl font-bold text-neutral-black mb-4"
        {...fadeIn("up", 0)}
      >
        Nossa Equipe 🧑‍💻
      </motion.h2>
      <motion.p
        className="max-w-3xl mx-auto text-neutral-gray-dark text-lg mb-12"
        {...fadeIn("up", 0.2)}
      >
        O time que une amor por pets e inovação.
      </motion.p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {team.map((name, i) => (
          <motion.div
            key={i}
            className="bg-white p-6 rounded-xl shadow-md border-t-4 border-primary hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            {...fadeIn("up", 0.2 + i * 0.1)}
          >
            <div className="text-4xl mb-3">🐶</div>
            <h3 className="font-bold text-lg text-neutral-black">{name}</h3>
            <p className="text-sm text-primary-dark font-medium">
              Dev Full Stack
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
