"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-pink-100 to-pink-200 text-gray-800 animate-fade-in">
      <Image
        src="/images/logo-cuida-pet.png"
        alt="Logo Cuida Pet"
        width={160}
        height={160}
        className="drop-shadow-md"
        priority
      />
      <h1 className="text-3xl font-semibold mt-4">Cuida Pet</h1>
      <p className="text-sm mt-2">Conectando pessoas e pets com amor 🐾</p>
    </div>
  );
}
