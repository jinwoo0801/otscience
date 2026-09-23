"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, ChevronDown, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Link, usePathname } from "@/i18n/navigation";
import { nav } from "@/data/site";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer whenever the route changes (state adjustment during render).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const inverted = isHome && !scrolled && !open;
  const solid = !inverted;

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href.split("/").slice(0, 2).join("/") + "/");

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        solid
          ? "border-b border-ink-100 bg-white/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between lg:h-20">
        <Link href="/" aria-label={t("home")} className="relative z-50">
          <Logo inverted={inverted} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.filter((item) => item.key !== "contact").map((item) => (
            <div key={item.key} className="group relative">
              <Link
                href={item.href}
                className={`flex items-center gap-1 rounded-full px-4 py-2 text-[0.95rem] font-medium transition ${
                  inverted
                    ? "text-white/90 hover:bg-white/10 hover:text-white"
                    : isActive(item.href)
                      ? "text-brand-600"
                      : "text-ink-700 hover:bg-ink-100 hover:text-navy-900"
                }`}
              >
                {t(item.key)}
                {item.children && (
                  <ChevronDown className="h-3.5 w-3.5 opacity-70 transition group-hover:rotate-180" />
                )}
              </Link>
              {item.children && (
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="min-w-[14rem] rounded-2xl border border-ink-100 bg-white p-2 shadow-xl shadow-navy-900/10">
                    {item.children.map((child) => (
                      <Link
                        key={child.key}
                        href={child.href}
                        className={`block rounded-xl px-4 py-2.5 text-sm transition hover:bg-brand-50 hover:text-navy-900 ${
                          pathname === child.href
                            ? "font-semibold text-brand-600"
                            : "text-ink-700"
                        }`}
                      >
                        {t(child.key)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher inverted={inverted} />
          <Link
            href="/contact"
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              inverted
                ? "bg-white text-navy-900 hover:bg-white/90"
                : "bg-navy-900 text-white hover:bg-brand-600"
            }`}
          >
            <Mail className="h-4 w-4" />
            {t("contact")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t("closeMenu") : t("openMenu")}
          aria-expanded={open}
          className={`relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full transition lg:hidden ${
            inverted ? "text-white hover:bg-white/10" : "text-navy-900 hover:bg-ink-100"
          }`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </header>

      {/* Mobile drawer (outside <header>: backdrop-filter would otherwise become its containing block) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 flex flex-col bg-white pt-16 lg:hidden"
          >
            <div className="container-x flex-1 overflow-y-auto py-6">
              <ul className="divide-y divide-ink-100">
                {nav.filter((item) => item.key !== "contact").map((item) => (
                  <li key={item.key}>
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setExpanded((v) => (v === item.key ? null : item.key))
                          }
                          aria-expanded={expanded === item.key}
                          className="flex w-full items-center justify-between py-4 text-left text-lg font-semibold text-navy-900"
                        >
                          {t(item.key)}
                          <ChevronDown
                            className={`h-5 w-5 text-ink-500 transition-transform ${
                              expanded === item.key ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded === item.key && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              {item.children.map((child) => (
                                <li key={child.key}>
                                  <Link
                                    href={child.href}
                                    className={`block rounded-xl px-4 py-3 text-base ${
                                      pathname === child.href
                                        ? "bg-brand-50 font-semibold text-brand-600"
                                        : "text-ink-700"
                                    }`}
                                  >
                                    {t(child.key)}
                                  </Link>
                                </li>
                              ))}
                              <li className="h-3" />
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="block py-4 text-lg font-semibold text-navy-900"
                      >
                        {t(item.key)}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-500">
                  {t("language")}
                </p>
                <LanguageSwitcher variant="grid" />
              </div>

              <Link
                href="/contact"
                className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-navy-900 px-5 py-4 text-base font-semibold text-white"
              >
                <Mail className="h-5 w-5" />
                {t("contact")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
