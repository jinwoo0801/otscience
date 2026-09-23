"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { asset } from "@/lib/asset";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const t = useTranslations("Home.hero");
  const ts = useTranslations("Home.stats");

  const stats = [
    { label: ts("founded"), value: ts("foundedValue") },
    { label: ts("iso"), value: ts("isoValue") },
    { label: ts("patents"), value: ts("patentsValue") },
    { label: ts("lab"), value: ts("labValue") },
  ];

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 -z-20">
        <Image
          src={asset("/images/main_visual_img1.jpg")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-slow-zoom object-cover object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/70 via-navy-950/40 to-navy-950/95"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/60 to-transparent"
      />

      <div className="container-x flex flex-1 flex-col justify-center pb-16 pt-32 sm:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-white/90 backdrop-blur-sm sm:text-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
        >
          {t("title")}
          <span className="mt-2 block bg-gradient-to-r from-mint-400 to-brand-400 bg-clip-text text-transparent">
            {t("subtitle")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.35 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.5 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/business/chemicals"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-semibold text-navy-900 transition hover:bg-mint-100"
          >
            {t("primaryCta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/company/greeting"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            {t("secondaryCta")}
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.7 }}
        className="container-x pb-8"
      >
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-navy-950/40 px-5 py-4 sm:px-6 sm:py-5">
              <dd className="text-xl font-bold sm:text-2xl">{s.value}</dd>
              <dt className="mt-1 text-xs text-white/60 sm:text-sm">{s.label}</dt>
            </div>
          ))}
        </dl>
      </motion.div>

      <a
        href="#business"
        aria-hidden="true"
        className="absolute bottom-[8.5rem] left-1/2 hidden -translate-x-1/2 animate-bounce text-white/50 lg:block"
      >
        <ChevronDown className="h-6 w-6" />
      </a>
    </section>
  );
}
