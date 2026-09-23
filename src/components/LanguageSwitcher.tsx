"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe, Check, ChevronDown } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { localeNames, routing, type Locale } from "@/i18n/routing";

type Props = { inverted?: boolean; variant?: "menu" | "grid" };

export default function LanguageSwitcher({
  inverted = false,
  variant = "menu",
}: Props) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const remember = (l: Locale) => {
    try {
      localStorage.setItem("locale", l);
    } catch {}
  };

  if (variant === "grid") {
    return (
      <div className="grid grid-cols-2 gap-2">
        {routing.locales.map((l) => (
          <Link
            key={l}
            href={pathname}
            locale={l}
            onClick={() => remember(l)}
            className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition ${
              l === locale
                ? "border-brand-500 bg-brand-50 text-navy-900"
                : "border-ink-300 text-ink-700 hover:border-brand-400"
            }`}
          >
            {localeNames[l]}
            {l === locale && <Check className="h-4 w-4 text-brand-600" />}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={t("language")}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition ${
          inverted
            ? "text-white/90 hover:bg-white/10"
            : "text-ink-700 hover:bg-ink-100"
        }`}
      >
        <Globe className="h-4 w-4" />
        <span>{localeNames[locale]}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-ink-100 bg-white p-1 shadow-xl shadow-navy-900/10"
        >
          {routing.locales.map((l) => (
            <Link
              key={l}
              role="menuitem"
              href={pathname}
              locale={l}
              onClick={() => {
                remember(l);
                setOpen(false);
              }}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition hover:bg-brand-50 ${
                l === locale ? "font-semibold text-navy-900" : "text-ink-700"
              }`}
            >
              {localeNames[l]}
              {l === locale && <Check className="h-4 w-4 text-brand-600" />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
