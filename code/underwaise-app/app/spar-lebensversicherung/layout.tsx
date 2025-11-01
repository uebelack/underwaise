import type { Metadata } from "next";
import Providers from "../providers";
import Layout from "@/components/layout/layout/layout";
import Script from "next/script";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;

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
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
      />
      <Layout>{children}</Layout>
    </Providers>
  );
}
