"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  MapPinIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const fadeIn = (direction, delay) => ({
  initial: { opacity: 0, y: direction === "up" ? 40 : -40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: "easeOut" },
  viewport: { once: true, amount: 0.3 },
});

export default function Home() {
  const router = useRouter();

  const features = [
    { icon: HeartIcon, title: "Feed Social", desc: "Compartilhe momentos e interaja com curtidas e comentários." },
    { icon: UsersIcon, title: "Perfis Dinâmicos", desc: "Perfis completos para tutores e clínicas veterinárias." },
    { icon: ChatBubbleBottomCenterTextIcon, title: "Chat Integrado", desc: "Converse diretamente com veterinários e outros tutores." },
    { icon: MapPinIcon, title: "Mapa Inteligente", desc: "Encontre clínicas, petshops e hospitais próximos." },
    { icon: BookOpenIcon, title: "Histórico de Pets", desc: "Acompanhe vacinas, consultas e tratamentos com facilidade." },
    { icon: Cog6ToothIcon, title: "Configurações", desc: "Personalize sua experiência no aplicativo." },
  ];

  const team = ["Allan Victor", "Paulo Ricardo", "Gabriel Henrique", "Pedro Alves"];

  return (
    <main className="bg-gradient-to-b from-orange-50 via-white to-orange-100 min-h-screen text-gray-800 flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 border-b border-orange-200 shadow-sm py-4 px-8 flex justify-between items-center backdrop-blur-md">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src="/images/logo-cuida-pet.png"
            alt="Cuida Pet Logo"
            width={40}
            height={40}
            loading="eager"
            className="rounded-full shadow-md"
          />
          <h1 className="text-xl font-extrabold text-orange-600 tracking-wider">Cuida Pet</h1>
        </motion.div>

        <nav className="hidden md:flex space-x-6 text-gray-600 font-medium">
          <a href="#funcionalidades" className="hover:text-orange-500 transition">Funcionalidades</a>
          <a href="#sobre" className="hover:text-orange-500 transition">Sobre</a>
          <a href="#equipe" className="hover:text-orange-500 transition">Equipe</a>
        </nav>

        <motion.button
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => router.push("/splash")}
          className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-md hover:bg-orange-700 transition duration-300"
        >
          Entrar ou Cadastrar
        </motion.button>
      </header>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 bg-gradient-to-tr from-orange-100 to-white overflow-hidden">
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
            loading="eager"
            className="mx-auto mb-8 drop-shadow-2xl rounded-3xl"
          />
          <h2 className="text-5xl md:text-6xl font-extrabold text-orange-700 mb-6 leading-tight">
            Conectando Pessoas e Pets com <span className="text-orange-500">Amor e Tecnologia</span> 🐾
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 font-light">
            Cuida Pet é a plataforma perfeita para cuidar, agendar e se conectar com quem também ama os animais.
          </p>
          <button
            onClick={() => router.push("/splash")}
            className="bg-orange-500 text-white px-10 py-3 text-lg rounded-full font-bold shadow-md hover:bg-orange-600 transition transform hover:scale-105"
          >
            Começar Agora
          </button>
        </motion.div>
      </section>

      {/* FUNCIONALIDADES */}
      <section id="funcionalidades" className="py-24 bg-white px-6 text-center">
        <motion.h3 className="text-4xl font-bold text-orange-700 mb-10" {...fadeIn("up", 0)}>
          Recursos que Você Vai Amar 🧡
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="card bg-orange-50 p-8 rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl"
              {...fadeIn("up", 0.2 + i * 0.1)}
            >
              <div className="flex items-center justify-center mb-4">
                <f.icon className="w-12 h-12 text-orange-600" />
              </div>
              <h4 className="font-bold text-xl text-orange-700 mb-2">{f.title}</h4>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EQUIPE */}
      <section id="equipe" className="py-24 bg-orange-50 px-8 text-center">
        <motion.h3 className="text-4xl font-bold text-orange-700 mb-4" {...fadeIn("up", 0)}>
          Nossa Equipe 🧑‍💻
        </motion.h3>
        <motion.p className="max-w-3xl mx-auto text-gray-600 text-lg mb-12" {...fadeIn("up", 0.2)}>
          O time que une amor por pets e inovação.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {team.map((name, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md border-t-4 border-orange-500 hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              {...fadeIn("up", 0.2 + i * 0.1)}
            >
              <div className="text-4xl mb-3">🐶</div>
              <h4 className="font-bold text-lg text-gray-800">{name}</h4>
              <p className="text-sm text-orange-600 font-medium">Dev Full Stack</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-10 text-center mt-auto border-t-4 border-orange-600">
        <div className="max-w-5xl mx-auto px-4">
          <h4 className="text-2xl font-extrabold mb-2 text-orange-400">Cuida Pet</h4>
          <p className="text-gray-400 text-sm mb-4">
            © {new Date().getFullYear()} Cuida Pet — Feito com ❤️ por alunos da UNINASSAU.
          </p>
          <div className="space-x-4">
            <a href="#sobre" className="hover:text-orange-400 transition">Sobre</a>
            <a href="#funcionalidades" className="hover:text-orange-400 transition">Recursos</a>
            <a href="#equipe" className="hover:text-orange-400 transition">Equipe</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
