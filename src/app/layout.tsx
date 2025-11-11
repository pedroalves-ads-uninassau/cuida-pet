// NÃO coloque "use client" aqui! Esse arquivo é SERVER COMPONENT.

import "./globals.css";
import { Poppins } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Cuida Pet",
  description: "Conectando pessoas e pets com amor e tecnologia ❤️🐾",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} bg-gradient-to-br from-orange-400 to-orange-600 min-h-screen`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
