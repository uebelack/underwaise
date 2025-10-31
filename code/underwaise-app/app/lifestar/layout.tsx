import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Life Insurance Application",
  description: "Apply for life insurance coverage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className="layout">
        <Header />
        <main>{children}</main>
      </div>
    </Providers>
  );
}
