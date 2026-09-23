import { getTranslations } from "next-intl/server";
import { MapPin, Phone, Printer, Mail, Bus, Car, ExternalLink } from "lucide-react";
import { site } from "@/data/site";
import { pageMetadata, prepare, type LocaleParams } from "@/lib/page";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const generateMetadata = pageMetadata("Company.Location");

export default async function LocationPage(props: LocaleParams) {
  await prepare(props);
  const t = await getTranslations("Company.Location");
  const tc = await getTranslations("Common");

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        sectionKey="company"
        currentHref="/company/location"
      />
      <section className="container-x py-16 lg:py-24">
        <Reveal className="overflow-hidden rounded-3xl border border-ink-100 shadow-xl shadow-navy-900/10">
          <iframe
            src={site.mapEmbed}
            title={t("mapTitle")}
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-[320px] w-full sm:h-[420px]"
          />
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Reveal className="rounded-3xl bg-navy-900 p-7 text-white lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-mint-400">OT SCIENCE Co., Ltd.</p>
            <h2 className="mt-2 text-2xl font-bold">{t("companyName")}</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mint-400" />
                <div>
                  <p className="leading-relaxed">{t("address")}</p>
                  <p className="mt-1 leading-relaxed text-white/60">{t("addressEn")}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-mint-400" />
                <a href={`tel:${site.tel}`} className="hover:underline">{site.telDisplay}</a>
              </li>
              <li className="flex items-center gap-3">
                <Printer className="h-4 w-4 shrink-0 text-mint-400" />
                <span>{site.fax}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-mint-400" />
                <a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a>
              </li>
            </ul>
            <a
              href={site.mapLink}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-mint-100"
            >
              {t("openMap")}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl border border-ink-100 bg-white p-7">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <Bus className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-bold text-navy-900">{t("publicTransit")}</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-700">
              <li>
                <p className="font-semibold text-ink-900">{t("bus1")}</p>
                <p className="text-ink-500">{t("bus1Desc")}</p>
              </li>
              <li>
                <p className="font-semibold text-ink-900">{t("bus2")}</p>
                <p className="text-ink-500">{t("bus2Desc")}</p>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="rounded-3xl border border-ink-100 bg-white p-7">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-mint-100 text-mint-600">
              <Car className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-bold text-navy-900">{t("byCar")}</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-700">{t("byCarDesc")}</p>
            <p className="mt-3 text-xs text-ink-500">{tc("address")} · {t("addressEn")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
