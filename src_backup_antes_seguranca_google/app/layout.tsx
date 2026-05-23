import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Escuta TUCXA",
  description: "Pesquisa de dores e oportunidades de melhoria do TUCXA.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
