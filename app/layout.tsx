import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const mono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Courty — O sistema operacional da sua arena",
  description:
    "Courty gerencia mensalistas, aulas, cobranças PIX, presença e reservas avulsas. Grátis para donos de arena. Tudo num só lugar para quem joga.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-mode="owner">
      <body className={`${bricolage.variable} ${instrument.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
