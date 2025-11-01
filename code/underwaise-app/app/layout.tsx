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
  title: "PAX Life Insurance - Protect Your Family Since 1876",
  description:
    "Life insurance that protects your loved ones financially if something happens to you. Death and disability coverage from Switzerland's trusted member-owned cooperative.",
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
