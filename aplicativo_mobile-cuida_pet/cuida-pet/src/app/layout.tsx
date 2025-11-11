import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cuida Pet",
  description: "Cuida Pet — Seu app de cuidado animal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gradient-to-b from-orange-400 to-orange-600 text-white min-h-screen flex flex-col items-center justify-center">
        {children}
      </body>
    </html>
  );
}
