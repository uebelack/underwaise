"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Heart,
  CheckCircle2,
  Users,
  Award,
  Lock,
  Sparkles,
  Zap,
  Star,
} from "lucide-react";

export function LifeInsuranceLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white min-h-[90vh] flex items-center">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#1a5ab8]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-[#7cb50d]/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Underwaise Logo"
                width={200}
                height={67}
              />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#benefits"
                className="text-sm font-medium text-gray-600 hover:text-[#1a5ab8] transition-colors"
              >
                Benefits
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium text-gray-600 hover:text-[#1a5ab8] transition-colors"
              >
                Pricing
              </a>
              <Button size="sm" asChild className="bg-[#7cb50d] hover:bg-[#6ba00b] text-white">
                <Link href="/spar-lebensversicherung">
                  Get Started
                </Link>
              </Button>
            </div>
          </nav>

          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-700 mb-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Hero Content */}
              <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7cb50d]/20 backdrop-blur-sm rounded-full mb-6 border border-[#7cb50d]/40">
                <Sparkles className="w-4 h-4 text-[#7cb50d]" />
                <span className="text-sm font-semibold text-[#7cb50d]">
                  Versicherung neu gedacht
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                Deine Zukunft.
                <span className="text-[#7cb50d] block mt-2">Deine Sicherheit.</span>
              </h1>

              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Moderne Lebensversicherung mit transparenten Konditionen und 
                blitzschneller Beantragung. In nur 5 Minuten zum Versicherungsschutz.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" asChild className="bg-[#7cb50d] hover:bg-[#6ba00b] text-white shadow-lg shadow-green-500/30">
                  <Link
                    href="/spar-lebensversicherung"
                    className="group inline-flex items-center"
                  >
                    Jetzt starten
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators & Info Cards */}
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-sm">
                    <div className="text-2xl font-bold text-white mb-1">5 Min</div>
                    <div className="text-xs text-gray-300">Antragsdauer</div>
                  </div>
                  <div className="flex flex-col bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-sm">
                    <div className="text-2xl font-bold text-white mb-1">0 CHF</div>
                    <div className="text-xs text-gray-300">Versteckte Kosten</div>
                  </div>
                  <div className="flex flex-col bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-sm">
                    <div className="text-2xl font-bold text-white mb-1">24/7</div>
                    <div className="text-xs text-gray-300">Support</div>
                  </div>
                </div>

                {/* Key Info Cards */}
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-[#1a5ab8]/30 to-[#1a5ab8]/20 backdrop-blur-sm rounded-2xl p-4 border border-[#1a5ab8]/40 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-300 mb-1">Versicherungssumme bis</div>
                        <div className="text-2xl font-bold text-white">CHF 400,000</div>
                      </div>
                      <div className="w-12 h-12 bg-[#1a5ab8] rounded-xl flex items-center justify-center shadow-lg">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#7cb50d]/30 to-[#7cb50d]/20 backdrop-blur-sm rounded-2xl p-4 border border-[#7cb50d]/40 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-300 mb-1">Monatliche Prämie ab</div>
                        <div className="text-2xl font-bold text-white">CHF 49</div>
                      </div>
                      <div className="w-12 h-12 bg-[#7cb50d] rounded-xl flex items-center justify-center shadow-lg">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white shadow-sm" />
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white shadow-sm" />
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white shadow-sm" />
                      </div>
                      <div>
                        <div className="text-white font-bold">2,500+ Kunden</div>
                        <div className="text-gray-300 text-sm">vertrauen uns bereits</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual - iPhone Image */}
            <div className="relative flex items-center justify-center">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7cb50d]/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1a5ab8]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* iPhone Image */}
              <div className="relative z-10">
                <Image
                  src="/hero-iphone.png"
                  alt="AI Ally App on iPhone"
                  width={400}
                  height={800}
                  className="drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Alles was du brauchst,
              <span className="text-[#1a5ab8] block mt-2">in einer Lösung</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Moderne Lebensversicherung mit allen wichtigen Features für deine 
              finanzielle Sicherheit und die deiner Familie.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#1a5ab8]/50 transition-all hover:shadow-xl">
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#7cb50d] rounded-2xl rotate-12 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-green-500/20" />
              <div className="relative">
                <div className="w-14 h-14 bg-[#1a5ab8]/10 group-hover:bg-[#1a5ab8] rounded-2xl flex items-center justify-center mb-6 transition-colors">
                  <Shield className="h-7 w-7 text-[#1a5ab8] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Todesfallschutz
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Steuerfreie Auszahlung an deine Begünstigten zur Deckung von 
                  Bestattungskosten, Schulden, Hypotheken und laufenden Lebenshaltungskosten.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                    <span>Sofortige Einmalzahlung</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                    <span>Deckung Bestattungskosten</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                    <span>Hypotheken & Schuldenschutz</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#1a5ab8]/50 transition-all hover:shadow-xl">
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#7cb50d] rounded-2xl rotate-12 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-green-500/20" />
              <div className="relative">
                <div className="w-14 h-14 bg-[#1a5ab8]/10 group-hover:bg-[#1a5ab8] rounded-2xl flex items-center justify-center mb-6 transition-colors">
                  <Heart className="h-7 w-7 text-[#1a5ab8] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Invaliditätsschutz
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Einkommensersatz bei Erwerbsunfähigkeit. Deine Familie behält 
                  finanzielle Stabilität während der Erholungsphase.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                    <span>Monatlicher Einkommensersatz</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                    <span>Unterstützung Arztkosten</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                    <span>Rehabilitations-Hilfe</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#1a5ab8]/50 transition-all hover:shadow-xl">
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#7cb50d] rounded-2xl rotate-12 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-green-500/20" />
              <div className="relative">
                <div className="w-14 h-14 bg-[#1a5ab8]/10 group-hover:bg-[#1a5ab8] rounded-2xl flex items-center justify-center mb-6 transition-colors">
                  <TrendingUp className="h-7 w-7 text-[#1a5ab8] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Finanzielle Sicherheit
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Deine Familie behält ihren Lebensstandard, bezahlt Bildung und 
                  bewältigt tägliche Ausgaben ohne finanzielle Belastung.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                    <span>Bildungsfonds Schutz</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                    <span>Lebenshaltungskosten</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                    <span>Zukünftige Stabilität</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50/80 to-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-200/50">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7cb50d]/10 rounded-full mb-6 border border-[#7cb50d]/20">
                <Star className="w-4 h-4 text-[#7cb50d]" />
                <span className="text-sm font-semibold text-[#7cb50d]">
                  Vorteile
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Warum{" "}
                <span className="text-[#1a5ab8]">Underwaise</span>?
              </h2>
              <p className="text-lg text-gray-600 mb-10">
                Moderne Versicherung mit Tradition. Wir kombinieren die Sicherheit 
                eines etablierten Partners mit der Geschwindigkeit und Transparenz 
                der digitalen Welt.
              </p>

              <div className="space-y-5">
                {[
                  {
                    text: "5-Minuten Online-Antrag",
                    detail: "Einfach, schnell, ohne Papierkram",
                  },
                  {
                    text: "Deckung bis CHF 400,000+",
                    detail: "Flexible Beträge für deine Bedürfnisse",
                  },
                  {
                    text: "100% Transparente Preise",
                    detail: "Keine versteckten Gebühren oder Überraschungen",
                  },
                  {
                    text: "Umfassender Schutz",
                    detail: "Todes- und Invaliditätsschutz inklusive",
                  },
                  {
                    text: "24/7 Digital Support",
                    detail: "Immer für dich da, wenn du uns brauchst",
                  },
                  {
                    text: "Schnelle Auszahlung",
                    detail: "Im Ernstfall schnell und unkompliziert",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 bg-[#1a5ab8]/10 group-hover:bg-[#1a5ab8] rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                      <CheckCircle2 className="h-5 w-5 text-[#1a5ab8] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-gray-900 font-semibold text-lg">
                        {benefit.text}
                      </div>
                      <div className="text-gray-600 text-sm mt-0.5">
                        {benefit.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200 shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-8">
                  Deine Deckung auf einen Blick
                </h3>
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-[#1a5ab8] hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-sm font-bold text-[#1a5ab8] uppercase tracking-wide">
                        Todesfallleistung
                      </div>
                      <Shield className="h-5 w-5 text-[#1a5ab8]" />
                    </div>
                    <div className="text-gray-900 font-bold text-lg mb-2">
                      Einmalzahlung
                    </div>
                    <div className="text-sm text-gray-600">
                      Steuerfreie Auszahlung für Hypothek, Schulden und 
                      Lebenshaltungskosten deiner Familie
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-[#7cb50d] hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-sm font-bold text-[#7cb50d] uppercase tracking-wide">
                        Invaliditätsschutz
                      </div>
                      <Heart className="h-5 w-5 text-[#7cb50d]" />
                    </div>
                    <div className="text-gray-900 font-bold text-lg mb-2">
                      Einkommensersatz
                    </div>
                    <div className="text-sm text-gray-600">
                      Monatliche Zahlungen bei Erwerbsunfähigkeit für Arztkosten 
                      und tägliche Ausgaben
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-gray-300 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-sm font-bold text-gray-600 uppercase tracking-wide">
                        Seelenfrieden
                      </div>
                      <TrendingUp className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="text-gray-900 font-bold text-lg mb-2">
                      Vollständiger Schutz
                    </div>
                    <div className="text-sm text-gray-600">
                      Keine finanzielle Belastung in schwierigen Zeiten—deine 
                      Familie bleibt sicher
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#7cb50d]/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#1a5ab8]/20 rounded-full blur-3xl -z-10" />
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a5ab8]/10 rounded-full mb-6 border border-[#1a5ab8]/20">
              <TrendingUp className="w-4 h-4 text-[#1a5ab8]" />
              <span className="text-sm font-semibold text-[#1a5ab8]">
                Pricing
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Faire Preise.
              <span className="text-[#1a5ab8] block mt-2">Keine Überraschungen.</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transparente Preisgestaltung ohne versteckte Kosten. Erhalte sofort 
              ein persönliches Angebot.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-[#1a5ab8]/30 transition-all">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Basis</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  ab CHF 29
                </div>
                <div className="text-sm text-gray-600">pro Monat</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Bis CHF 150,000 Deckung</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Todesfallschutz</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Online Support</span>
                </li>
              </ul>
            </div>

            {/* Premium - Highlighted */}
            <div className="relative bg-gradient-to-b from-[#1a5ab8] to-[#1548a0] rounded-3xl p-8 border-2 border-[#1a5ab8] shadow-2xl shadow-blue-500/20 transform scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#7cb50d] text-white px-4 py-1 rounded-full text-sm font-semibold">
                Beliebt
              </div>
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Premium</h3>
                <div className="text-4xl font-bold text-white mb-2">
                  ab CHF 49
                </div>
                <div className="text-sm text-white/80">pro Monat</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-white">Bis CHF 300,000 Deckung</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-white">Todes- & Invaliditätsschutz</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-white">Prioritäts-Support</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-white">Schnelle Auszahlung</span>
                </li>
              </ul>
              <Button className="w-full bg-[#7cb50d] hover:bg-[#6ba00b] text-white" size="lg" asChild>
                <Link href="/spar-lebensversicherung">
                  Jetzt starten
                </Link>
              </Button>
            </div>

            {/* Ultimate */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-[#1a5ab8]/30 transition-all">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ultimate</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  ab CHF 89
                </div>
                <div className="text-sm text-gray-600">pro Monat</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Bis CHF 400,000+ Deckung</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Vollständiger Schutz</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Persönlicher Berater</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">24/7 Premium-Support</span>
                </li>
              </ul>
              <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900" size="lg">
                Mehr erfahren
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a5ab8] via-[#1548a0] to-[#1a5ab8] py-24">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#7cb50d]/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#7cb50d]/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <Sparkles className="w-4 h-4 text-[#7cb50d]" />
              <span className="text-sm font-semibold text-white">
                Bereit loszulegen?
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Schütze was dir wichtig ist.
              <span className="text-[#7cb50d] block mt-2">Starte heute.</span>
            </h2>

            <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
              Schließe dich tausenden Schweizer Familien an, die uns vertrauen. 
              Einfache Beantragung, transparente Preise und jahrzehntelange Erfahrung.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" asChild className="bg-[#7cb50d] hover:bg-[#6ba00b] text-white shadow-xl shadow-green-500/20">
                <Link href="/spar-lebensversicherung" className="group">
                  Antrag starten
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white hover:bg-white hover:text-[#1a5ab8] text-white"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Mehr erfahren
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">
                  5 Min
                </div>
                <div className="text-white/80">
                  Antragsdauer
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">
                  0 CHF
                </div>
                <div className="text-white/80">
                  Versteckte Kosten
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">
                  24/7
                </div>
                <div className="text-white/80">
                  Support verfügbar
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <Image
                src="/logo.png"
                alt="Underwaise Logo"
                width={160}
                height={53}
                className="mb-4 brightness-0 invert"
              />
              <p className="text-gray-400 mb-4">
                Moderne Lebensversicherung für die Schweiz. 
                Einfach, transparent und sicher.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produkt</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#benefits" className="hover:text-white transition-colors">Vorteile</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Preise</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Unternehmen</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Über uns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontakt</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Underwaise. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
