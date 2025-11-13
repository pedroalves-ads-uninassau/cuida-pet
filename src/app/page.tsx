"use client";

import { About } from "@/components/landing/About";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Team } from "@/components/landing/Team";

export default function Home() {
  return (
    <main className="bg-neutral-white min-h-screen text-neutral-black flex flex-col">
      <Header />
      <Hero />
      <Features />
      <About />
      <Team />
      <Footer />
    </main>
  );
}