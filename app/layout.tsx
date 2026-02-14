import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CardioRenal Risk Assessment",
  description: "Avaliação de risco cardiovascular e renal para profissionais de saúde",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.Node;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}
