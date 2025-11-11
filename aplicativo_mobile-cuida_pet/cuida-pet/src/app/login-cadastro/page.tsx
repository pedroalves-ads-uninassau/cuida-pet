"use client";

import Image from "next/image";
import logo from "@/assets/images/logo-cuida-pet.png";
import { useRouter } from "next/navigation";

export default function LoginCadastro() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-between min-h-screen py-10 px-6 bg-gradient-to-b from-orange-400 to-orange-600 text-white">
      <div className="flex justify-end w-full max-w-md text-sm gap-4">
        <span className="cursor-pointer">Privacidade</span>
        <span className="cursor-pointer">Ajuda</span>
      </div>

      <div className="flex flex-col items-center gap-6">
        <Image src={logo} alt="Logo Cuida Pet" width={140} height={140} />
        <h1 className="text-center text-2xl font-bold">
          Bem vindo(a)
          <br /> ao CUIDA PET
        </h1>
      </div>

      <div className="flex flex-col w-full max-w-md gap-4">
        <button className="bg-orange-500 py-3 rounded-full font-bold hover:bg-orange-400 transition">
          REGISTRE-SE GRATUITAMENTE
        </button>
        <button className="bg-gray-100 text-gray-800 py-3 rounded-full font-bold hover:bg-gray-200 transition">
          JÁ TEM UMA CONTA?
        </button>
        <button
          onClick={() => router.push("/cadastro-social")}
          className="bg-gray-100 text-gray-800 py-3 rounded-full font-bold hover:bg-gray-200 transition"
        >
          CADASTRO DE CLÍNICA
        </button>
      </div>

      <p className="text-xs mt-6">Versão: 0.0.1 (Beta)</p>
    </main>
  );
}
