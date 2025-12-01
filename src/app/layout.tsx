  import "./globals.css";
  import { Baloo_2 } from "next/font/google";

  const baloo = Baloo_2({ subsets: ["latin"], weight: ["400", "600", "700"] });

  export const metadata = {
    title: "Cuida Pet - Conectando Pessoas e Pets com Amor e Tecnologia",
    description: "Cuida Pet é a plataforma perfeita para cuidar, agendar e se conectar com quem também ama os animais.",
    icons: {
      icon: '/icon.png',
    },
  };

  import { AppProvider } from "@/context/AppContext";



  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="pt-BR">
        <head>
          <link rel="icon" href="/icon.png" sizes="any" />
        </head>
        <body className={`${baloo.className} bg-gray-50 flex flex-col min-h-screen`}>
          <AppProvider>
            {children}
          </AppProvider>
        </body>
      </html>
    );
  }
