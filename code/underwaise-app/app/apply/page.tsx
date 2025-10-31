import { LifeInsuranceForm } from "@/components/life-insurance-form";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply for Life Insurance - PAX",
  description: "Apply for PAX life insurance coverage. Fill out our simple application form to get started.",
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#7cb50d]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-[#3b3a53]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[#7cb50d]/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative bg-[#3b3a53]/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-semibold">Back to Home</span>
            </Link>

            <Image
              src="/pax-logo.svg"
              alt="PAX Logo"
              width={100}
              height={33}
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative flex items-center justify-center py-12 px-4">
        <LifeInsuranceForm />
      </div>
    </div>
  );
}
