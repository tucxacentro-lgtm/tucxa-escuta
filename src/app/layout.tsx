import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tucxa-escuta.vercel.app";
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Escuta TUCXA",
    template: "%s | Escuta TUCXA",
  },
  description:
    "Sistema institucional de pesquisas do TUCXA para escuta voluntária, identificação de oportunidades de melhoria, acolhimento, comunicação e organização.",
  applicationName: "Escuta TUCXA",
  keywords: ["TUCXA", "Escuta TUCXA", "pesquisa", "acolhimento", "organização", "consulentes"],
  authors: [{ name: "TUCXA" }],
  creator: "TUCXA",
  publisher: "TUCXA",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Escuta TUCXA",
    title: "Escuta TUCXA",
    description:
      "Pesquisa institucional do TUCXA. Participação voluntária, identificação opcional e foco em melhoria de processos, acolhimento e organização.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: googleVerification
    ? {
        google: googleVerification,
      }
    : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
