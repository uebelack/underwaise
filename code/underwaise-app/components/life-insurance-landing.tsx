"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Heart, CheckCircle2, Users, Award, Lock } from "lucide-react";

export function LifeInsuranceLanding() {
  return (
    <div className="min-h-screen bg-[#3b3a53]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3b3a53] via-[#4a495e] to-[#3b3a53]">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#7cb50d]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-[#7cb50d]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          {/* Navigation */}
          <nav className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <Image
                src="/pax-logo.svg"
                alt="PAX Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#coverage" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Coverage</a>
              <a href="#benefits" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Benefits</a>
              <a href="#about" className="text-sm font-medium text-white/80 hover:text-white transition-colors">About Us</a>
            </div>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                <div className="w-2 h-2 bg-[#7cb50d] rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-white">
                  Trusted Since 1876
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                Protect What
                <span className="text-[#7cb50d] block mt-2">Matters Most</span>
              </h1>

              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Comprehensive life insurance that safeguards your family's financial future. Death and disability coverage with transparent, straightforward terms.
              </p>

              <div className="mb-12">
                <Link href="/apply" className="group inline-block">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-[#7cb50d] hover:bg-[#6da00b] text-white font-semibold px-8 py-7 text-lg shadow-lg hover:shadow-xl transition-all group-hover:scale-105"
                  >
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d]" />
                  <span>5-minute application</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d]" />
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d]" />
                  <span>223% financial strength</span>
                </div>
              </div>
            </div>

            {/* Hero Visual/Stats */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 bg-[#7cb50d]/20 rounded-xl flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-[#7cb50d]" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">150+</div>
                    <div className="text-sm text-white/70">Years of Trust</div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 bg-[#7cb50d]/20 rounded-xl flex items-center justify-center mb-4">
                      <Award className="h-6 w-6 text-[#7cb50d]" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">223%</div>
                    <div className="text-sm text-white/70">Financial Strength</div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 bg-[#7cb50d]/20 rounded-xl flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-[#7cb50d]" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">Member</div>
                    <div className="text-sm text-white/70">Owned Cooperative</div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 bg-[#7cb50d]/20 rounded-xl flex items-center justify-center mb-4">
                      <Lock className="h-6 w-6 text-[#7cb50d]" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">CHF 400k+</div>
                    <div className="text-sm text-white/70">Max Coverage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section id="coverage" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3b3a53]/5 rounded-full mb-6 border border-[#3b3a53]/10">
              <span className="text-sm font-semibold text-[#3b3a53]">Coverage Details</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#3b3a53] mb-6 tracking-tight">
              What Does Life Insurance <br className="hidden sm:block" />
              <span className="text-[#7cb50d]">Actually Cover?</span>
            </h2>
            <p className="text-lg text-[#3b3a53]/70 max-w-2xl mx-auto">
              Financial protection when your family needs it most. Simple coverage that ensures peace of mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-white to-zinc-50/50 hover:from-zinc-50 hover:to-white rounded-3xl p-8 border border-[#3b3a53]/10 hover:border-[#7cb50d]/50 transition-all hover:shadow-2xl">
              <div className="w-14 h-14 bg-[#7cb50d]/10 group-hover:bg-[#7cb50d] rounded-2xl flex items-center justify-center mb-6 transition-colors">
                <Shield className="h-7 w-7 text-[#7cb50d] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-[#3b3a53] mb-4">
                Death Benefit
              </h3>
              <p className="text-[#3b3a53]/70 leading-relaxed mb-6">
                Tax-free payout to your beneficiaries to cover funeral costs, outstanding debts, mortgages, and ongoing living expenses.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-[#3b3a53]/80">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span>Immediate lump sum payment</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#3b3a53]/80">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span>Cover funeral and final expenses</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#3b3a53]/80">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span>Mortgage and debt protection</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-white to-zinc-50/50 hover:from-zinc-50 hover:to-white rounded-3xl p-8 border border-[#3b3a53]/10 hover:border-[#7cb50d]/50 transition-all hover:shadow-2xl">
              <div className="w-14 h-14 bg-[#7cb50d]/10 group-hover:bg-[#7cb50d] rounded-2xl flex items-center justify-center mb-6 transition-colors">
                <Heart className="h-7 w-7 text-[#7cb50d] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-[#3b3a53] mb-4">
                Disability Coverage
              </h3>
              <p className="text-[#3b3a53]/70 leading-relaxed mb-6">
                Income replacement if you become disabled and unable to work. Your family maintains financial stability during recovery.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-[#3b3a53]/80">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span>Monthly income replacement</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#3b3a53]/80">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span>Medical expense support</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#3b3a53]/80">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span>Rehabilitation assistance</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gradient-to-br from-white to-zinc-50/50 hover:from-zinc-50 hover:to-white rounded-3xl p-8 border border-[#3b3a53]/10 hover:border-[#7cb50d]/50 transition-all hover:shadow-2xl">
              <div className="w-14 h-14 bg-[#7cb50d]/10 group-hover:bg-[#7cb50d] rounded-2xl flex items-center justify-center mb-6 transition-colors">
                <TrendingUp className="h-7 w-7 text-[#7cb50d] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-[#3b3a53] mb-4">
                Financial Security
              </h3>
              <p className="text-[#3b3a53]/70 leading-relaxed mb-6">
                Your family maintains their lifestyle, pays for education, and handles daily expenses without financial burden.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-[#3b3a53]/80">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span>Education fund protection</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#3b3a53]/80">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span>Living expenses coverage</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#3b3a53]/80">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span>Future financial stability</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3b3a53]/5 rounded-full mb-6 border border-[#3b3a53]/10">
                <span className="text-sm font-semibold text-[#3b3a53]">Why PAX</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#3b3a53] mb-6 tracking-tight">
                Switzerland's Most <span className="text-[#7cb50d]">Trusted</span> Life Insurance
              </h2>
              <p className="text-lg text-[#3b3a53]/70 mb-10">
                Founded in 1876, PAX is a member-owned cooperative that puts policyholders first.
                Nearly 150 years of protecting Swiss families with unmatched financial strength.
              </p>

              <div className="space-y-5">
                {[
                  { text: "5-minute online application", detail: "Simple, fast, no paperwork" },
                  { text: "Coverage up to CHF 400,000+", detail: "Flexible amounts for your needs" },
                  { text: "Member-owned cooperative", detail: "Profits returned to members, not shareholders" },
                  { text: "223% financial strength rating", detail: "Exceptional stability and security" },
                  { text: "100% transparent pricing", detail: "No hidden fees or surprise charges" },
                  { text: "Comprehensive support", detail: "Death and disability coverage included" },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-6 h-6 bg-[#7cb50d]/10 group-hover:bg-[#7cb50d] rounded-lg flex items-center justify-center flex-shrink-0 mt-1 transition-colors">
                      <CheckCircle2 className="h-4 w-4 text-[#7cb50d] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-[#3b3a53] font-semibold text-lg">
                        {benefit.text}
                      </div>
                      <div className="text-[#3b3a53]/70 text-sm mt-0.5">
                        {benefit.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="bg-gradient-to-br from-white to-zinc-50/50 rounded-3xl p-8 border border-[#3b3a53]/10 shadow-xl">
                <h3 className="text-xl font-bold text-[#3b3a53] mb-8">
                  Your Coverage at a Glance
                </h3>
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-[#7cb50d] hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-sm font-bold text-[#7cb50d] uppercase tracking-wide">
                        Death Benefit
                      </div>
                      <Shield className="h-5 w-5 text-[#7cb50d]" />
                    </div>
                    <div className="text-[#3b3a53] font-bold text-lg mb-2">
                      Lump Sum Payment
                    </div>
                    <div className="text-sm text-[#3b3a53]/70">
                      Tax-free payout covering mortgage, debts, and living expenses for your family
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-[#3b3a53]/30 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-sm font-bold text-[#3b3a53]/80 uppercase tracking-wide">
                        Disability Coverage
                      </div>
                      <Heart className="h-5 w-5 text-[#3b3a53]/80" />
                    </div>
                    <div className="text-[#3b3a53] font-bold text-lg mb-2">
                      Income Replacement
                    </div>
                    <div className="text-sm text-[#3b3a53]/70">
                      Monthly payments if unable to work, covering medical bills and daily expenses
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-[#3b3a53]/20 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-sm font-bold text-[#3b3a53]/70 uppercase tracking-wide">
                        Peace of Mind
                      </div>
                      <TrendingUp className="h-5 w-5 text-[#3b3a53]/70" />
                    </div>
                    <div className="text-[#3b3a53] font-bold text-lg mb-2">
                      Complete Protection
                    </div>
                    <div className="text-sm text-[#3b3a53]/70">
                      No financial burden during difficult times—your family stays secure
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#7cb50d]/10 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="relative overflow-hidden bg-gradient-to-br from-[#3b3a53] via-[#4a495e] to-[#3b3a53] py-24">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#7cb50d]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#7cb50d]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-12 md:p-16 shadow-2xl">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7cb50d]/10 rounded-full mb-8 border border-[#7cb50d]/20">
                <div className="w-2 h-2 bg-[#7cb50d] rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-[#7cb50d]">
                  Get Started Today
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3b3a53] mb-6 tracking-tight leading-tight">
                Ready to Protect <br className="hidden sm:block" />
                <span className="text-[#7cb50d]">Your Family?</span>
              </h2>

              <p className="text-xl text-[#3b3a53]/70 mb-10 leading-relaxed">
                Join thousands of Swiss families who trust PAX for their life insurance needs.
                Simple application, transparent pricing, and 150 years of financial strength.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/apply" className="group">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-[#7cb50d] hover:bg-[#6da00b] text-white font-bold px-10 py-7 text-lg shadow-xl hover:shadow-2xl transition-all group-hover:scale-105"
                  >
                    Start Your Application
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <a href="#coverage">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-[#3b3a53] hover:bg-[#3b3a53] hover:text-white text-[#3b3a53] font-semibold px-10 py-7 text-lg transition-all"
                  >
                    Learn More About Coverage
                  </Button>
                </a>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#3b3a53]/10">
                <div>
                  <div className="text-3xl font-bold text-[#3b3a53] mb-1">5 min</div>
                  <div className="text-sm text-[#3b3a53]/70">Application time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#3b3a53] mb-1">0 CHF</div>
                  <div className="text-sm text-[#3b3a53]/70">Hidden fees</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#3b3a53] mb-1">24/7</div>
                  <div className="text-sm text-[#3b3a53]/70">Support available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3b3a53] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <Image
                  src="/pax-logo.svg"
                  alt="PAX Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                Switzerland's trusted life insurance cooperative since 1876.
                Member-owned, financially strong, and dedicated to protecting families.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#coverage" className="text-white/70 hover:text-[#7cb50d] text-sm transition-colors">Coverage</a></li>
                <li><a href="#benefits" className="text-white/70 hover:text-[#7cb50d] text-sm transition-colors">Benefits</a></li>
                <li><a href="/apply" className="text-white/70 hover:text-[#7cb50d] text-sm transition-colors">Apply Now</a></li>
                <li><a href="#about" className="text-white/70 hover:text-[#7cb50d] text-sm transition-colors">About Us</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li>Basel, Switzerland</li>
                <li>support@pax.ch</li>
                <li>+41 61 277 66 66</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/60 text-sm text-center md:text-left">
                © {new Date().getFullYear()} PAX Schweizerische Lebensversicherungs-Gesellschaft AG. All rights reserved.
              </p>
              <div className="flex gap-6 text-xs text-white/60">
                <a href="#" className="hover:text-[#7cb50d] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#7cb50d] transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-[#7cb50d] transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
