"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ArrowRight,
  Mail,
  Clock,
  Shield,
  FileText,
  Phone,
  Home,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function ThankYou() {
  useEffect(() => {
    // Trigger confetti animation on page load
    const triggerConfetti = () => {
      const paxTextShape = confetti.shapeFromPath({
        path: 'M313.288 144.806l44.794-58.06-44.365-57.495h43.368l25.82 34.954 26.11-34.954h38.802L403.309 86.46l45.79 58.347h-44.936l-25.391-33.952-25.968 33.952h-39.516zm-43.082-35.092V92.31c-4.992.71-9.416 1.425-22.111 3.566-13.41 2.283-17.835 7.418-17.835 13.84 0 7.131 3.995 12.266 14.269 12.266 7.704 0 18.402-5.278 25.677-12.267m4.99 35.092l-2.712-11.842c-12.266 9.988-23.965 14.698-39.368 14.698-22.974 0-39.092-13.124-39.092-34.382 0-21.543 14.55-33.528 43.94-38.09 16.69-2.57 25.11-3.853 31.383-4.563V66.77c0-10.412-5.277-15.122-17.114-15.122-13.13 0-17.835 5.282-18.407 14.126h-34.81c2.569-29.529 24.966-39.373 55.782-39.373 37.518 0 50.786 16.118 50.786 47.787v39.092c0 12.839.286 18.545 3.137 31.526h-33.524zM125.69 73.478c17.978 0 24.251-7.418 24.251-19.975 0-12.553-6.273-19.97-24.251-19.97h-18.83v39.945h18.83zm-56.207 71.328V5h59.344c41.233 0 59.348 20.256 59.348 48.503 0 28.251-18.115 48.507-59.348 48.507h-21.968v42.796H69.482z',
      });

      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 120,
        zIndex: 0,
        scalar: 6,
        gravity: 0.8,
        drift: 0,
      };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: NodeJS.Timeout = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 8;

        // PAX logos from different positions
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
      }, 250);
    };

    // Trigger confetti after a short delay
    const timeoutId = setTimeout(triggerConfetti, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white flex items-center justify-center p-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#1a5ab8]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-[#7cb50d]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-4xl">
        {/* Logo Header */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Image
            src="/logo.png"
            alt="Underwaise Logo"
            width={180}
            height={60}
            className="h-12 w-auto"
          />
          <Image
            src="/baselhack.svg"
            alt="baselhack Logo"
            width={100}
            height={56}
            className="brightness-0 h-10 w-auto"
          />
        </div>

        {/* Main Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-br from-[#1a5ab8] via-[#1548a0] to-[#1a5ab8] px-8 py-12 text-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7cb50d]/20 rounded-full blur-3xl animate-pulse" />
              <div
                className="absolute bottom-0 left-0 w-64 h-64 bg-[#7cb50d]/20 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>

            <div className="relative">
              {/* Success Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#7cb50d] rounded-full mb-6 shadow-xl">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Vielen Dank!
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Dein Antrag wurde erfolgreich eingereicht
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-6 sm:px-8 md:px-12 py-10">
            {/* Next Steps Timeline */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Wie geht es weiter?
              </h2>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#7cb50d] rounded-xl flex items-center justify-center shadow-sm">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        E-Mail Bestätigung
                      </h3>
                      <span className="text-xs font-semibold text-[#7cb50d] bg-[#7cb50d]/10 px-2 py-1 rounded-full">
                        Sofort
                      </span>
                    </div>
                    <p className="text-gray-600">
                      Du erhältst eine Bestätigung mit deiner Antragsnummer und
                      allen wichtigen Details per E-Mail.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1a5ab8] rounded-xl flex items-center justify-center shadow-sm">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        Prüfung & Bearbeitung
                      </h3>
                      <span className="text-xs font-semibold text-[#1a5ab8] bg-[#1a5ab8]/10 px-2 py-1 rounded-full">
                        1-2 Werktage
                      </span>
                    </div>
                    <p className="text-gray-600">
                      Unser Team prüft deinen Antrag sorgfältig. Bei Fragen
                      melden wir uns telefonisch oder per E-Mail.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#7cb50d] rounded-xl flex items-center justify-center shadow-sm">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        Versicherungsschutz aktiv
                      </h3>
                      <span className="text-xs font-semibold text-[#7cb50d] bg-[#7cb50d]/10 px-2 py-1 rounded-full">
                        3-5 Werktage
                      </span>
                    </div>
                    <p className="text-gray-600">
                      Nach positiver Prüfung erhältst du deine Police und dein
                      Versicherungsschutz beginnt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {/* Email Sent Card */}
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#1a5ab8]/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#1a5ab8]" />
                  </div>
                  <h3 className="font-bold text-gray-900">
                    Check deine E-Mails
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Wir haben dir eine Bestätigung an deine angegebene
                  E-Mail-Adresse gesendet.
                </p>
              </div>

              {/* Response Time Card */}
              <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#7cb50d]/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#7cb50d]" />
                  </div>
                  <h3 className="font-bold text-gray-900">Schnelle Antwort</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Du erhältst innerhalb von 24-48 Stunden eine Rückmeldung von
                  unserem Team.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                Fragen? Wir sind für dich da!
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-5 h-5 text-[#1a5ab8]" />
                  <span className="font-medium">+41 61 123 45 67</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-gray-300" />
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-5 h-5 text-[#1a5ab8]" />
                  <span className="font-medium">support@underwaise.ch</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-[#1a5ab8] hover:bg-[#1548a0] text-white shadow-lg"
              >
                <Link
                  href="/"
                  className="inline-flex items-center justify-center"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Zurück zur Startseite
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-gray-300 hover:bg-gray-50"
              >
                <a
                  href="mailto:support@underwaise.ch"
                  className="inline-flex items-center justify-center"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  E-Mail senden
                </a>
              </Button>
            </div>
          </div>

          {/* Footer Trust Indicators */}
          <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-6 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-center gap-6 text-center">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#7cb50d]" />
                <span className="text-sm text-gray-600 font-medium">
                  Sichere Datenübertragung
                </span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-300" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#7cb50d]" />
                <span className="text-sm text-gray-600 font-medium">
                  Schweizer Qualität
                </span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-300" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#7cb50d]" />
                <span className="text-sm text-gray-600 font-medium">
                  24/7 Support
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-gray-600 mt-8 text-sm">
          Antragsnummer: <span className="font-mono font-semibold">UW-{new Date().getFullYear()}-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
        </p>
      </div>
    </div>
  );
}
