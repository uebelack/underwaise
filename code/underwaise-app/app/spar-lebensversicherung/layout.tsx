import type { Metadata } from "next";
import Providers from "../providers";
import Layout from "@/components/layout/layout/layout";

export const metadata: Metadata = {
  title: "PAX Life Spar Lebensversicherung - Apply Now",
  description:
    "Apply for life spar lebensversicherung now and secure your family's future with PAX's trusted coverage options.",
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
