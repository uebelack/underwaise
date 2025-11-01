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
  Menu,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCallback, useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from "@/components/language-switcher";
import { CatchGame } from "@/components/catch-game";

export function LifeInsuranceLanding() {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  const triggerConfetti = useCallback(() => {
    const paxTextShape = confetti.shapeFromPath({
      path: 'M313.288 144.806l44.794-58.06-44.365-57.495h43.368l25.82 34.954 26.11-34.954h38.802L403.309 86.46l45.79 58.347h-44.936l-25.391-33.952-25.968 33.952h-39.516zm-43.082-35.092V92.31c-4.992.71-9.416 1.425-22.111 3.566-13.41 2.283-17.835 7.418-17.835 13.84 0 7.131 3.995 12.266 14.269 12.266 7.704 0 18.402-5.278 25.677-12.267m4.99 35.092l-2.712-11.842c-12.266 9.988-23.965 14.698-39.368 14.698-22.974 0-39.092-13.124-39.092-34.382 0-21.543 14.55-33.528 43.94-38.09 16.69-2.57 25.11-3.853 31.383-4.563V66.77c0-10.412-5.277-15.122-17.114-15.122-13.13 0-17.835 5.282-18.407 14.126h-34.81c2.569-29.529 24.966-39.373 55.782-39.373 37.518 0 50.786 16.118 50.786 47.787v39.092c0 12.839.286 18.545 3.137 31.526h-33.524zM125.69 73.478c17.978 0 24.251-7.418 24.251-19.975 0-12.553-6.273-19.97-24.251-19.97h-18.83v39.945h18.83zm-56.207 71.328V5h59.344c41.233 0 59.348 20.256 59.348 48.503 0 28.251-18.115 48.507-59.348 48.507h-21.968v42.796H69.482z',
    });

    const duration = 4 * 1000; 
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 15, 
      spread: 360, 
      ticks: 120, 
      zIndex: 0,
      scalar: 5.5, 
      gravity: 0.5, 
      drift: 0.2, 
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }
    
    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 5; // Mehr PAX-Logos

      // PAX-Logo von allen Seiten
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#8ccd0f", "#1a5ab8", "#7cb50d"],
        shapes: [paxTextShape],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.4, 0.6), y: Math.random() - 0.2 },
        colors: ["#8ccd0f", "#1a5ab8", "#7cb50d"],
        shapes: [paxTextShape],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#8ccd0f", "#1a5ab8", "#7cb50d"],
        shapes: [paxTextShape],
      });
    }, 300);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  }, []);

  const handleCTAClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsNavigating(true);
    triggerConfetti();
    // Navigation will happen automatically via Link
  }, [triggerConfetti]);

  const handleLogoClick = useCallback(() => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);

    if (newCount === 3) {
      setShowGame(true);
      setLogoClickCount(0); // Reset counter
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.2 },
        colors: ["#8ccd0f", "#1a5ab8", "#7cb50d"],
      });
    }
  }, [logoClickCount]);

  // Subtiles Hintergrund-Konfetti
  useEffect(() => {
    const paxTextShape = confetti.shapeFromPath({
      path: 'M313.288 144.806l44.794-58.06-44.365-57.495h43.368l25.82 34.954 26.11-34.954h38.802L403.309 86.46l45.79 58.347h-44.936l-25.391-33.952-25.968 33.952h-39.516zm-43.082-35.092V92.31c-4.992.71-9.416 1.425-22.111 3.566-13.41 2.283-17.835 7.418-17.835 13.84 0 7.131 3.995 12.266 14.269 12.266 7.704 0 18.402-5.278 25.677-12.267m4.99 35.092l-2.712-11.842c-12.266 9.988-23.965 14.698-39.368 14.698-22.974 0-39.092-13.124-39.092-34.382 0-21.543 14.55-33.528 43.94-38.09 16.69-2.57 25.11-3.853 31.383-4.563V66.77c0-10.412-5.277-15.122-17.114-15.122-13.13 0-17.835 5.282-18.407 14.126h-34.81c2.569-29.529 24.966-39.373 55.782-39.373 37.518 0 50.786 16.118 50.786 47.787v39.092c0 12.839.286 18.545 3.137 31.526h-33.524zM125.69 73.478c17.978 0 24.251-7.418 24.251-19.975 0-12.553-6.273-19.97-24.251-19.97h-18.83v39.945h18.83zm-56.207 71.328V5h59.344c41.233 0 59.348 20.256 59.348 48.503 0 28.251-18.115 48.507-59.348 48.507h-21.968v42.796H69.482z',
    });

    const defaults = {
      startVelocity: 3, // Moderat
      spread: 360,
      ticks: 1200, // Sehr lange Lebensdauer für vollen Fall
      zIndex: 0, // Im Hintergrund
      scalar: 4.5,
      gravity: 0.4, // Mehr Gravität für vollen Fall durch den Screen
      drift: 0.1,
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const particleCount = 1; // Nur 1 Partikel pro Position

      // Zufällige Farbe aus grün oder blau
      const colors = Math.random() > 0.5
        ? ["#8ccd0f", "#7cb50d"] // Grüne PAX-Farben
        : ["#1a5ab8", "#1548a0"]; // Blaue PAX-Farben

      // Zufällige PAX-Logos von oben
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.2, 0.8), y: 0 }, // Starten am oberen Rand
        colors: colors,
        shapes: [paxTextShape],
      });
    }, 2500); // Weniger häufig

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Catch Game */}
      {showGame && <CatchGame onClose={() => setShowGame(false)} />}

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
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3 sm:gap-6">
              <button
                onClick={handleLogoClick}
                className="cursor-pointer hover:scale-105 transition-transform"
                title="Click me 3 times for a surprise!"
              >
                <Image
                  src="/logo.png"
                  alt="Underwaise - Moderne Lebensversicherung"
                  width={200}
                  height={67}
                  className="h-12 sm:h-16 w-auto"
                />
              </button>
              <Image
                src="/baselhack.svg"
                alt="baselhack Hackathon"
                width={120}
                height={67}
                className="brightness-0 h-10 sm:h-12 w-auto"
              />
              <Image
                src="/nag.png"
                alt="NAG"
                width={100}
                height={50}
                className="h-8 sm:h-10 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('features')}
                className="text-sm font-medium text-gray-600 hover:text-[#1a5ab8] transition-colors"
              >
                {t('nav.features')}
              </button>
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-sm font-medium text-gray-600 hover:text-[#1a5ab8] transition-colors"
              >
                {t('nav.benefits')}
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-sm font-medium text-gray-600 hover:text-[#1a5ab8] transition-colors"
              >
                {t('nav.pricing')}
              </button>
              <LanguageSwitcher variant="light" />
              <Button size="sm" asChild className="bg-[#7cb50d] hover:bg-[#6ba00b] text-white">
                <Link href="/spar-lebensversicherung">
                  {t('nav.getStarted')}
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-[#1a5ab8] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-24 left-4 right-4 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-6 animate-in slide-in-from-top-5 duration-200">
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-left text-base font-medium text-gray-600 hover:text-[#1a5ab8] transition-colors py-2"
                >
                  {t('nav.features')}
                </button>
                <button
                  onClick={() => scrollToSection('benefits')}
                  className="text-left text-base font-medium text-gray-600 hover:text-[#1a5ab8] transition-colors py-2"
                >
                  {t('nav.benefits')}
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-left text-base font-medium text-gray-600 hover:text-[#1a5ab8] transition-colors py-2"
                >
                  {t('nav.pricing')}
                </button>
                <div className="pt-2 border-t border-gray-200">
                  <LanguageSwitcher variant="light" />
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <Button size="lg" asChild className="w-full bg-[#7cb50d] hover:bg-[#6ba00b] text-white">
                    <Link href="/spar-lebensversicherung">
                      {t('nav.getStarted')}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div
              className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black backdrop-blur-xl rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl border border-gray-700 mb-12 sm:mb-20 mt-8">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Hero Content */}
              <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#7cb50d]/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6 border border-[#7cb50d]/40">
                <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 text-[#7cb50d]" />
                <span className="text-xs sm:text-sm font-semibold text-[#7cb50d]">
                  {t('hero.badge')}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight">
                {t('hero.title')}
                <span className="text-[#7cb50d] block mt-1 sm:mt-2">{t('hero.titleHighlight')}</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
                {t('hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
                <Button
                  size="lg"
                  asChild
                  disabled={isNavigating}
                  className="bg-[#7cb50d] hover:bg-[#6ba00b] text-white shadow-lg shadow-green-500/30 disabled:opacity-70"
                >
                  <Link
                    href="/spar-lebensversicherung"
                    className="group inline-flex items-center justify-center"
                    onClick={handleCTAClick}
                  >
                    {isNavigating ? (
                      <>
                        <Zap className="mr-2 h-5 w-5 animate-pulse" />
                        {t('hero.loading')}
                      </>
                    ) : (
                      <>
                        {t('hero.cta')}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators & Info Cards */}
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                  <div className="flex flex-col bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 border border-white/20 shadow-sm">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-0.5 sm:mb-1">{t('stats.duration')}</div>
                    <div className="text-[10px] sm:text-xs text-gray-300">{t('stats.durationLabel')}</div>
                  </div>
                  <div className="flex flex-col bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 border border-white/20 shadow-sm">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-0.5 sm:mb-1">{t('stats.hiddenCosts')}</div>
                    <div className="text-[10px] sm:text-xs text-gray-300">{t('stats.hiddenCostsLabel')}</div>
                  </div>
                  <div className="flex flex-col bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 border border-white/20 shadow-sm">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-0.5 sm:mb-1">{t('stats.support')}</div>
                    <div className="text-[10px] sm:text-xs text-gray-300">{t('stats.supportLabel')}</div>
                  </div>
                </div>

                {/* Key Info Cards */}
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-[#1a5ab8]/30 to-[#1a5ab8]/20 backdrop-blur-sm rounded-2xl p-4 border border-[#1a5ab8]/40 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-300 mb-1">{t('hero.coverageUpTo')}</div>
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
                        <div className="text-sm text-gray-300 mb-1">{t('hero.monthlyFrom')}</div>
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
                        <img src="/customer1.webp" alt="Customer 1" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" />
                        <img src="/customer2.webp" alt="Customer 2" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" />
                        <img src="/customer3.webp" alt="Customer 3" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" />
                      </div>
                      <div>
                        <div className="text-white font-bold">2,500+ {t('hero.customers')}</div>
                        <div className="text-gray-300 text-sm">{t('hero.trustUs')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual - iPhone Image */}
            <div className="relative flex items-center justify-center mt-8 lg:mt-0">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#7cb50d]/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#1a5ab8]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

              {/* iPhone Image */}
              <div className="relative z-10">
                <Image
                  src="/hero-iphone-2.png"
                  alt={t('hero.altText')}
                  width={400}
                  height={800}
                  className="drop-shadow-2xl w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] h-auto"
                  priority
                />
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              {t('features.title')}
              <span className="text-[#1a5ab8] block mt-1 sm:mt-2">{t('features.titleHighlight')}</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              {t('features.description')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#1a5ab8]/50 transition-all hover:shadow-xl">
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#7cb50d] rounded-2xl rotate-12 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-green-500/20" />
              <div className="relative">
                <div className="w-14 h-14 bg-[#1a5ab8]/10 group-hover:bg-[#1a5ab8] rounded-2xl flex items-center justify-center mb-6 transition-colors">
                  <Shield className="h-7 w-7 text-[#1a5ab8] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('features.deathBenefit.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t('features.deathBenefit.description')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                    <span>{t('features.deathBenefit.benefit1')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                    <span>{t('features.deathBenefit.benefit2')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                    <span>{t('features.deathBenefit.benefit3')}</span>
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
                  {t('features.disabilityProtection.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t('features.disabilityProtection.description')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                    <span>{t('features.disabilityProtection.benefit1')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                    <span>{t('features.disabilityProtection.benefit2')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                    <span>{t('features.disabilityProtection.benefit3')}</span>
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
                  {t('features.financialSecurity.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t('features.financialSecurity.description')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                    <span>{t('features.financialSecurity.benefit1')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                    <span>{t('features.financialSecurity.benefit2')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                    <span>{t('features.financialSecurity.benefit3')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50/80 to-white rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl border border-gray-200/50">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7cb50d]/10 rounded-full mb-6 border border-[#7cb50d]/20">
                <Star className="w-4 h-4 text-[#7cb50d]" />
                <span className="text-sm font-semibold text-[#7cb50d]">
                  {t('benefits.badge')}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                {t('benefits.title')}{" "}
                <span className="text-[#1a5ab8]">{t('benefits.titleHighlight')}</span>{t('benefits.question')}
              </h2>
              <p className="text-lg text-gray-600 mb-10">
                {t('benefits.description')}
              </p>

              <div className="space-y-5">
                {[
                  {
                    text: t('benefits.list.onlineApplication'),
                    detail: t('benefits.list.onlineApplicationDetail'),
                  },
                  {
                    text: t('benefits.list.coverage'),
                    detail: t('benefits.list.coverageDetail'),
                  },
                  {
                    text: t('benefits.list.transparentPricing'),
                    detail: t('benefits.list.transparentPricingDetail'),
                  },
                  {
                    text: t('benefits.list.comprehensiveCoverage'),
                    detail: t('benefits.list.comprehensiveCoverageDetail'),
                  },
                  {
                    text: t('benefits.list.digitalSupport'),
                    detail: t('benefits.list.digitalSupportDetail'),
                  },
                  {
                    text: t('benefits.list.fastPayout'),
                    detail: t('benefits.list.fastPayoutDetail'),
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
                  {t('benefits.coverageOverview.title')}
                </h3>
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-[#1a5ab8] hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-sm font-bold text-[#1a5ab8] uppercase tracking-wide">
                        {t('benefits.coverageOverview.deathBenefit.label')}
                      </div>
                      <Shield className="h-5 w-5 text-[#1a5ab8]" />
                    </div>
                    <div className="text-gray-900 font-bold text-lg mb-2">
                      {t('benefits.coverageOverview.deathBenefit.title')}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t('benefits.coverageOverview.deathBenefit.description')}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-[#7cb50d] hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-sm font-bold text-[#7cb50d] uppercase tracking-wide">
                        {t('benefits.coverageOverview.disabilityProtection.label')}
                      </div>
                      <Heart className="h-5 w-5 text-[#7cb50d]" />
                    </div>
                    <div className="text-gray-900 font-bold text-lg mb-2">
                      {t('benefits.coverageOverview.disabilityProtection.title')}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t('benefits.coverageOverview.disabilityProtection.description')}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-gray-300 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-sm font-bold text-gray-600 uppercase tracking-wide">
                        {t('benefits.coverageOverview.peaceOfMind.label')}
                      </div>
                      <TrendingUp className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="text-gray-900 font-bold text-lg mb-2">
                      {t('benefits.coverageOverview.peaceOfMind.title')}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t('benefits.coverageOverview.peaceOfMind.description')}
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
      <section id="pricing" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1a5ab8]/10 rounded-full mb-4 sm:mb-6 border border-[#1a5ab8]/20">
              <TrendingUp className="w-3 sm:w-4 h-3 sm:h-4 text-[#1a5ab8]" />
              <span className="text-xs sm:text-sm font-semibold text-[#1a5ab8]">
                {t('pricing.badge')}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              {t('pricing.title')}
              <span className="text-[#1a5ab8] block mt-1 sm:mt-2">{t('pricing.titleHighlight')}</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              {t('pricing.description')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Basic */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-[#1a5ab8]/30 transition-all">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('pricing.basic.name')}</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {t('pricing.basic.price')}
                </div>
                <div className="text-sm text-gray-600">{t('pricing.perMonth')}</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{t('pricing.basic.coverage')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{t('pricing.basic.deathBenefit')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{t('pricing.basic.support')}</span>
                </li>
              </ul>
            </div>

            {/* Premium - Highlighted */}
            <div className="relative bg-gradient-to-b from-[#1a5ab8] to-[#1548a0] rounded-3xl p-8 border-2 border-[#1a5ab8] shadow-2xl shadow-blue-500/20 sm:transform sm:scale-105">
              <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-[#7cb50d] text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                {t('pricing.popular')}
              </div>
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{t('pricing.premium.name')}</h3>
                <div className="text-4xl font-bold text-white mb-2">
                  {t('pricing.premium.price')}
                </div>
                <div className="text-sm text-white/80">{t('pricing.perMonth')}</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-white">{t('pricing.premium.coverage')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-white">{t('pricing.premium.protection')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-white">{t('pricing.premium.support')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-white">{t('pricing.premium.fastPayout')}</span>
                </li>
              </ul>
              <Button
                className="w-full bg-[#7cb50d] hover:bg-[#6ba00b] text-white disabled:opacity-70"
                size="lg"
                asChild
                disabled={isNavigating}
              >
                <Link
                  href="/spar-lebensversicherung"
                  className="inline-flex items-center justify-center"
                  onClick={handleCTAClick}
                >
                  {isNavigating ? (
                    <>
                      <Zap className="mr-2 h-5 w-5 animate-pulse" />
                      {t('hero.loading')}
                    </>
                  ) : (
                    t('hero.cta')
                  )}
                </Link>
              </Button>
            </div>

            {/* Ultimate */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-[#1a5ab8]/30 transition-all">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('pricing.ultimate.name')}</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {t('pricing.ultimate.price')}
                </div>
                <div className="text-sm text-gray-600">{t('pricing.perMonth')}</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{t('pricing.ultimate.coverage')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{t('pricing.ultimate.protection')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{t('pricing.ultimate.advisor')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#7cb50d] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{t('pricing.ultimate.support')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a5ab8] via-[#1548a0] to-[#1a5ab8] py-12 sm:py-16 md:py-24">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-64 sm:w-96 h-64 sm:h-96 bg-[#7cb50d]/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 -right-20 w-64 sm:w-96 h-64 sm:h-96 bg-[#7cb50d]/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 sm:mb-8 border border-white/20">
              <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 text-[#7cb50d]" />
              <span className="text-xs sm:text-sm font-semibold text-white">
                {t('cta.badge')}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight px-4">
              {t('cta.title')}
              <span className="text-[#7cb50d] block mt-1 sm:mt-2">{t('cta.titleHighlight')}</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto px-4">
              {t('cta.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                asChild
                disabled={isNavigating}
                className="bg-[#7cb50d] hover:bg-[#6ba00b] text-white shadow-xl shadow-green-500/20 disabled:opacity-70"
              >
                <Link
                  href="/spar-lebensversicherung"
                  className="group inline-flex items-center justify-center"
                  onClick={handleCTAClick}
                >
                  {isNavigating ? (
                    <>
                      <Zap className="mr-2 h-5 w-5 animate-pulse" />
                      {t('hero.loading')}
                    </>
                  ) : (
                    <>
                      {t('cta.startApplication')}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                  {t('stats.duration')}
                </div>
                <div className="text-sm sm:text-base text-white/80">
                  {t('stats.durationLabel')}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                  {t('stats.hiddenCosts')}
                </div>
                <div className="text-sm sm:text-base text-white/80">
                  {t('stats.hiddenCostsLabel')}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                  {t('stats.support')}
                </div>
                <div className="text-sm sm:text-base text-white/80">
                  {t('stats.supportAvailable')}
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
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/logo.png"
                  alt="Underwaise Logo"
                  width={160}
                  height={53}
                  className="brightness-0 invert"
                />
                <Image
                  src="/baselhack.svg"
                  alt="baselhack Logo"
                  width={100}
                  height={56}
                  className="brightness-0 invert"
                />
                <Image
                  src="/nag.png"
                  alt="NAG Logo"
                  width={80}
                  height={40}
                  className="brightness-0 invert"
                />
              </div>
              <p className="text-gray-400 mb-4">
                {t('footer.description')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.product')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">{t('nav.features')}</a></li>
                <li><a href="#benefits" className="hover:text-white transition-colors">{t('nav.benefits')}</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">{t('nav.pricing')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.aboutUs')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.contact')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
