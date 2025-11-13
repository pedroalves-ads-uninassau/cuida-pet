"use client";
import { motion } from "framer-motion";
import { features } from "@/data/features";
import { fadeIn } from "@/utils/motion";

export function Features() {
  return (
    <section id="funcionalidades" className="py-24 bg-neutral-white px-6 text-center">
      <motion.h2
        className="text-4xl font-bold text-neutral-black mb-10"
        {...fadeIn("up", 0)}
      >
        Recursos que Você Vai Amar 🧡
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            className="bg-primary-light/20 p-8 rounded-2xl shadow-lg border border-primary-light hover:shadow-xl"
            {...fadeIn("up", 0.2 + i * 0.1)}
          >
            <div className="flex items-center justify-center mb-4">
              <f.icon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl text-primary-dark mb-2">
              {f.title}
            </h3>
            <p className="text-neutral-gray-dark text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
