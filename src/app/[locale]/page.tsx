import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ArrowUpRight, FlaskConical, Gem, Wrench, Microscope, Mail, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/data/site";
import { prepare, type LocaleParams } from "@/lib/page";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { SectionTitle } from "@/components/ui";
import { asset } from "@/lib/asset";

const businesses = [
  { key: "chemicals", href: "/business/chemicals", Icon: FlaskConical, image: "/images/rnd02.png" },
  { key: "metals", href: "/business/precious-metals", Icon: Gem, image: "/images/bu02_img01.png" },
  { key: "equipment", href: "/business/equipment", Icon: Wrench, image: "/images/sub_busi03_cont1_img01.jpg" },
  { key: "rnd", href: "/business/rnd", Icon: Microscope, image: "/images/rnd03.png" },
] as const;

export default async function HomePage(props: LocaleParams) {
  await prepare(props);
  const t = await getTranslations("Home");
  const tc = await getTranslations("Common");
  const tp = await getTranslations("Company.Policy");
  const mottos = tp.raw("motto.items") as { title: string; en: string }[];

  return (
    <>
      <Hero />

      {/* Business */}
      <section id="business" className="scroll-mt-20 bg-white py-20 lg:py-28">
        <div className="container-x">
          <SectionTitle
            eyebrow={t("business.eyebrow")}
            title={t("business.title")}
            description={t("business.description")}
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {businesses.map((b, i) => (
              <Reveal as="li" key={b.key} delay={i * 0.08}>
                <Link
                  href={b.href}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
                    <Image
                      src={asset(b.image)}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                    <span className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-brand-600 shadow">
                      <b.Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
                      {t(`business.${b.key}.en`)}
                    </p>
                    <h3 className="mt-1.5 text-lg font-bold text-navy-900">
                      {t(`business.${b.key}.title`)}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
                      {t(`business.${b.key}.description`)}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                      {tc("readMore")}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* About */}
      <section className="bg-ink-50 py-20 lg:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-navy-900/15">
              <Image
                src={asset("/images/sub_company_img.jpg")}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-navy-900 px-6 py-5 text-white shadow-xl sm:block lg:-right-8">
              <p className="text-3xl font-extrabold">{tc("since", { year: site.founded })}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/60">OT SCIENCE</p>
            </div>
          </Reveal>
          <div>
            <SectionTitle
              eyebrow={t("about.eyebrow")}
              title={t("about.title")}
              description={t("about.description")}
            />
            <Reveal delay={0.1}>
              <Link
                href="/company/greeting"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                {t("about.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${asset("/images/main_visual_img2.jpg")})` }}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-950 via-navy-900/80 to-brand-600/40" />
        <div className="container-x">
          <SectionTitle
            eyebrow={t("philosophy.eyebrow")}
            title={t("philosophy.title")}
            align="center"
            light
          />
          <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
            {mottos.map((m, i) => (
              <Reveal as="li" key={m.title} delay={i * 0.1} className="h-full rounded-3xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur-sm">
                  <p className="text-xl font-bold">{m.title}</p>
                  <p className="mt-2 text-sm text-white/60">{m.en}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2} className="mt-10 text-center">
            <Link
              href="/company/policy"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              {t("philosophy.cta")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Technical + Contact */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-ink-100 bg-ink-50 p-8 sm:p-10">
              <div>
                <p className="eyebrow">{t("technical.eyebrow")}</p>
                <h2 className="mt-3 text-2xl font-bold text-navy-900 sm:text-3xl">
                  {t("technical.title")}
                </h2>
                <p className="mt-3 text-ink-500">{t("technical.description")}</p>
              </div>
              <Link
                href="/technical"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy-900 shadow-sm ring-1 ring-ink-100 transition hover:bg-brand-50"
              >
                {t("technical.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between rounded-3xl bg-gradient-to-br from-brand-600 to-navy-900 p-8 text-white sm:p-10">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">{t("contact.title")}</h2>
                <p className="mt-3 text-white/70">{t("contact.description")}</p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition hover:bg-mint-100"
                >
                  <Mail className="h-4 w-4" />
                  {t("contact.cta")}
                </Link>
                <a
                  href={`tel:${site.tel}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                  {t("contact.call")}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
