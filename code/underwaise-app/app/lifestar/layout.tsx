import type { Metadata } from "next";
import Providers from "./providers";
import Layout from "@/components/layout/layout/layout";

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
      <Layout>{children}</Layout>
    </Providers>
  );
}
