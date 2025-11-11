import "./globals.css";
import { Poppins } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata = {
  title: "Cuida Pet",
  description: "Conectando pessoas e pets com amor e tecnologia",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
