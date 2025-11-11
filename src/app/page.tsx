"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import logo from "@/assets/images/logo-cuida-pet.png";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000); // redireciona após 3 segundos
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-br from-orange-400 to-orange-600 text-white">
      {/* Logo com animação */}
      <Image
        src={logo}
        alt="Cuida Pet"
        width={180}
        height={180}
        priority
        className="animate-bounce-in drop-shadow-xl"
      />

      {/* Título */}
      <h1 className="text-4xl font-bold mt-6 text-shadow animate-fade-in">
        CUIDA PET
      </h1>

      {/* Subtítulo */}
      <p className="text-sm opacity-90 mt-3 animate-fade-in">
        Conectando pessoas e pets com amor e tecnologia ❤️
      </p>

      {/* Versão */}
      <p className="absolute bottom-8 text-xs opacity-70 animate-fade-in">
        Versão 0.0.1 (Beta)
      </p>
    </div>
  );
}
