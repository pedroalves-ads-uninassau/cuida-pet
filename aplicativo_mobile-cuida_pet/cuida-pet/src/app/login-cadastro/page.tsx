"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginCadastro() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFB347] to-[#FF8008] text-white px-8 py-10 space-y-8">
      <div className="flex justify-end w-full max-w-5xl text-sm font-medium gap-6">
        <button className="hover:underline">Privacidade</button>
        <button className="hover:underline">Ajuda</button>
      </div>

      <Image
        src="/images/logo-cuida-pet.png"
        alt="Logo Cuida Pet"
        width={150}
        height={150}
        className="drop-shadow-lg"
      />

      <h1 className="text-2xl font-bold text-center">
        Bem-vindo(a){"\n"}ao Cuida Pet
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          className="bg-[#FFA733] text-white font-bold py-3 rounded-full shadow-md hover:opacity-90 transition"
        >
          REGISTRE-SE GRATUITAMENTE
        </button>

        <button
          className="bg-[#f3f3f3] text-gray-800 font-bold py-3 rounded-full shadow-md hover:bg-gray-200 transition"
        >
          JÁ TEM UMA CONTA?
        </button>

        <button
          className="bg-[#f3f3f3] text-gray-800 font-bold py-3 rounded-full shadow-md hover:bg-gray-200 transition"
        >
          CADASTRO DE CLÍNICA
        </button>
      </div>

      <p className="text-sm mt-10 opacity-80">Versão: 0.0.1 (Beta)</p>
    </main>
  );
}
