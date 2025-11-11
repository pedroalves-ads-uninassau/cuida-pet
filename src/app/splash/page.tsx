"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/"); // redireciona pra Home
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFB347] to-[#FF8008] text-white">
      <div className="animate-fade-in flex flex-col items-center">
        <Image
          src="/images/logo-cuida-pet.png"
          alt="Logo Cuida Pet"
          width={200}
          height={200}
          priority
          className="drop-shadow-lg"
        />
        <h1 className="mt-6 text-2xl font-semibold">Cuida Pet</h1>
        <p className="text-sm opacity-80">Conectando pessoas e pets 🐾</p>
      </div>
    </main>
  );
}
