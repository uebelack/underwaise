import type { Metadata } from "next";
import { Lato, Geist_Mono } from "next/font/google"; // Replace Geist with Lato
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Underwaise - Moderne Lebensversicherung in 5 Minuten | Schweiz",
  description:
    "Moderne Lebensversicherung mit transparenten Konditionen. Todes- und Invaliditätsschutz ab CHF 29/Monat. Jetzt in nur 5 Minuten online abschliessen.",
  keywords: [
    "Lebensversicherung Schweiz",
    "Online Lebensversicherung",
    "Todesfallschutz",
    "Invaliditätsschutz",
    "günstige Versicherung",
  ],
  openGraph: {
    title: "Underwaise - Moderne Lebensversicherung für die Schweiz",
    description:
      "In nur 5 Minuten zur Lebensversicherung. Transparente Preise, umfassender Schutz, 24/7 Support.",
    type: "website",
    locale: "de_CH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Underwaise - Lebensversicherung neu gedacht",
    description:
      "Moderne Lebensversicherung in 5 Minuten. Ab CHF 29/Monat. Jetzt starten!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
