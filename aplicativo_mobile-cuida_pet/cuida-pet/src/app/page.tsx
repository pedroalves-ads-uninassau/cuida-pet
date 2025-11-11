"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-400 to-orange-600 text-white">
      <div className="absolute top-5 right-5 flex gap-4 text-sm">
        <span className="cursor-pointer hover:underline">privacidade</span>
        <span className="cursor-pointer hover:underline">ajuda</span>
      </div>

      {/* LOGO */}
      <Image
        src="/images/logo-cuida-pet.png"
        alt="Logo Cuida Pet"
        width={160}
        height={160}
        className="mb-6"
      />

      <h1 className="text-center text-2xl font-bold mb-8">
        Bem-vindo(a){"\n"}ao CUIDA PET
      </h1>

      {/* BOTÃO AVANÇAR */}
      <button
        onClick={() => router.push("/login-cadastro")}
        className="bg-white text-orange-600 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-orange-100 transition"
      >
        Avançar
      </button>

      <p className="mt-12 text-sm opacity-80">Versão: 0.0.1 (Beta)</p>
    </main>
  );
}
