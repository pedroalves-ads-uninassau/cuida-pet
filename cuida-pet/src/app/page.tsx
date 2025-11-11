"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col justify-between items-center min-h-screen bg-gradient-to-b from-[#FFB347] to-[#FF8008] text-white px-6 py-12">
      <div className="flex justify-end w-full max-w-5xl text-sm font-medium gap-6">
        <button className="hover:underline">Privacidade</button>
        <button className="hover:underline">Ajuda</button>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow text-center space-y-8">
        <Image
          src="/images/logo-cuida-pet.png"
          alt="Logo Cuida Pet"
          width={180}
          height={180}
          priority
        />

        <h1 className="text-3xl font-bold leading-snug drop-shadow-md">
          Bem-vindo(a) ao Cuida Pet!
        </h1>

        <button
          onClick={() => router.push("/login-cadastro")}
          className="mt-6 bg-white text-[#FF8008] font-bold text-lg px-10 py-3 rounded-full shadow-lg hover:bg-orange-50 transition-all"
        >
          Avançar
        </button>
      </div>

      <footer className="text-sm opacity-80">
        <p>Versão 0.0.1 (Beta)</p>
      </footer>
    </main>
  );
}
