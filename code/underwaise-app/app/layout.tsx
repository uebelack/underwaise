import type { Metadata } from "next";
import { Open_Sans, Geist_Mono } from "next/font/google"; // Replace Lato with Open_Sans
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/next";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Analytics />
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
