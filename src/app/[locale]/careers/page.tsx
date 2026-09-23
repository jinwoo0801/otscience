import { getTranslations } from "next-intl/server";
import {
  Lightbulb,
  Users,
  Landmark,
  FlaskConical,
  Factory,
  Handshake,
  Wrench,
  FileText,
  MessagesSquare,
  BadgeCheck,
  Mail,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import { jobs } from "@/data/careers";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/routing";
import { pageMetadata, prepare, type LocaleParams } from "@/lib/page";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const generateMetadata = pageMetadata("Careers");

type Pair = { title: string; desc: string };
const valueIcons = [Lightbulb, Users, Landmark];
const fieldIcons = [FlaskConical, Factory, Handshake, Wrench];
const processIcons = [FileText, MessagesSquare, BadgeCheck];

export default async function CareersPage(props: LocaleParams) {
  const locale = (await prepare(props)) as Locale;
  const t = await getTranslations("Careers");
  const values = t.raw("values") as Pair[];
  const fields = t.raw("fields") as Pair[];
  const process = t.raw("process") as Pair[];
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(t("applySubject"))}`;

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        sectionKey="careers"
        currentHref="/careers"
        image="/images/sub_company_img.jpg"
      />

      <section className="container-x py-16 lg:py-24">
        <Reveal className="max-w-3xl">
          <p className="text-lg leading-relaxed text-ink-700 sm:text-xl">{t("intro")}</p>
        </Reveal>

        {/* Values */}
        <div className="mt-16">
          <Reveal>
            <p className="eyebrow">{t("valuesEn")}</p>
            <h2 className="mt-2 text-2xl font-bold text-navy-900 sm:text-3xl">{t("valuesTitle")}</h2>
          </Reveal>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <Reveal
                  as="li"
                  key={v.title}
                  delay={i * 0.08}
                  className="h-full rounded-3xl bg-gradient-to-br from-navy-900 to-brand-600 p-7 text-white"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-6 text-lg font-bold">{v.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{v.desc}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Fields */}
      <section className="bg-ink-50 py-16 lg:py-24">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">{t("fieldsEn")}</p>
            <h2 className="mt-2 text-2xl font-bold text-navy-900 sm:text-3xl">{t("fieldsTitle")}</h2>
          </Reveal>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {fields.map((f, i) => {
              const Icon = fieldIcons[i];
              return (
                <Reveal
                  as="li"
                  key={f.title}
                  delay={i * 0.06}
                  className="h-full rounded-3xl border border-ink-100 bg-white p-6 shadow-sm"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-lg font-bold text-navy-900">{f.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.desc}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Process + Openings */}
      <section className="container-x py-16 lg:py-24">
        <Reveal>
          <p className="eyebrow">{t("processEn")}</p>
          <h2 className="mt-2 text-2xl font-bold text-navy-900 sm:text-3xl">{t("processTitle")}</h2>
        </Reveal>
        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {process.map((p, i) => {
            const Icon = processIcons[i];
            return (
              <Reveal
                as="li"
                key={p.title}
                delay={i * 0.08}
                className="relative rounded-3xl border border-ink-100 bg-gradient-to-br from-white to-brand-50 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-600">STEP {i + 1}</span>
                  <Icon className="h-5 w-5 text-brand-400" />
                </div>
                <p className="mt-3 text-lg font-bold text-navy-900">{p.title}</p>
                <p className="mt-1 text-sm text-ink-500">{p.desc}</p>
              </Reveal>
            );
          })}
        </ol>

        <div className="mt-20">
          <Reveal>
            <p className="eyebrow">{t("openingsEn")}</p>
            <h2 className="mt-2 text-2xl font-bold text-navy-900 sm:text-3xl">{t("openingsTitle")}</h2>
          </Reveal>

          {jobs.length === 0 ? (
            <Reveal className="mt-8 rounded-3xl border border-dashed border-ink-300 bg-ink-50 p-10 text-center sm:p-14">
              <Briefcase className="mx-auto h-10 w-10 text-brand-400" />
              <p className="mt-4 text-lg font-bold text-navy-900">{t("noOpenings")}</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">{t("noOpeningsDesc")}</p>
            </Reveal>
          ) : (
            <Reveal className="mt-8 overflow-hidden rounded-3xl border border-ink-100">
              <ul className="divide-y divide-ink-100">
                {jobs.map((j) => (
                  <li key={j.id} className="grid gap-4 bg-white p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
                    <div>
                      <p className="text-lg font-bold text-navy-900">{j.title[locale]}</p>
                      <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-500">
                        <div className="flex gap-1.5"><dt className="font-medium text-ink-700">{t("department")}</dt><dd>{j.department[locale]}</dd></div>
                        <div className="flex gap-1.5"><dt className="font-medium text-ink-700">{t("type")}</dt><dd>{j.type[locale]}</dd></div>
                        <div className="flex gap-1.5"><dt className="font-medium text-ink-700">{t("location")}</dt><dd>{j.location[locale]}</dd></div>
                        <div className="flex gap-1.5"><dt className="font-medium text-ink-700">{t("deadline")}</dt><dd>{j.deadline ?? t("always")}</dd></div>
                      </dl>
                    </div>
                    <a
                      href={j.link ?? mailto}
                      target={j.link ? "_blank" : undefined}
                      rel={j.link ? "noreferrer" : undefined}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
                    >
                      {t("apply")}
                      {j.link ? <ArrowUpRight className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        {/* CTA */}
        <Reveal className="mt-16 rounded-3xl bg-gradient-to-br from-brand-600 to-navy-900 p-8 text-white sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">{t("ctaTitle")}</h2>
              <p className="mt-2 max-w-xl text-white/70">{t("ctaDesc")}</p>
            </div>
            <a
              href={mailto}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-navy-900 transition hover:bg-mint-100"
            >
              <Mail className="h-4 w-4" />
              {t("ctaButton")}
            </a>
          </div>
          <p className="mt-6 text-sm text-white/60">{site.email}</p>
        </Reveal>
      </section>
    </>
  );
}
