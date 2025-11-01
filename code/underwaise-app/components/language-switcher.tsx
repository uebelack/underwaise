"use client";

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'default' | 'light';
}

export function LanguageSwitcher({ variant = 'default' }: LanguageSwitcherProps) {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(newLocale: string) {
    startTransition(() => {
      // Set cookie for locale
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`; // 1 year
      // Reload page to apply new locale
      window.location.reload();
    });
  }

  const lightStyles = "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700";
  const defaultStyles = "bg-white/10 hover:bg-white/20 border-white/20 text-white";

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onSelectChange(locale === 'en' ? 'de' : 'en')}
        disabled={isPending}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all disabled:opacity-50 text-sm font-medium ${variant === 'light' ? lightStyles : defaultStyles}`}
        aria-label="Switch language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{locale === 'en' ? 'Deutsch' : 'English'}</span>
        <span className="sm:hidden">{locale === 'en' ? 'DE' : 'EN'}</span>
      </button>
    </div>
  );
}
