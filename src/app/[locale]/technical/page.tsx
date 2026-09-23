import { getTranslations } from "next-intl/server";
import { FileText, Download, Mail } from "lucide-react";
import { technicalDocs } from "@/data/chemicals";
import { site } from "@/data/site";
import { type Locale } from "@/i18n/routing";
import { pageMetadata, prepare, type LocaleParams } from "@/lib/page";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const generateMetadata = pageMetadata("Technical");

export default async function TechnicalPage(props: LocaleParams) {
  const locale = (await prepare(props)) as Locale;
  const t = await getTranslations("Technical");

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        sectionKey="technical"
        currentHref="/technical"
      />
      <section className="container-x py-16 lg:py-24">
        <Reveal className="max-w-3xl">
          <p className="text-lg leading-relaxed text-ink-700 sm:text-xl">{t("intro")}</p>
        </Reveal>

        {technicalDocs.length === 0 ? (
          <Reveal className="mt-12 rounded-3xl border border-dashed border-ink-300 bg-ink-50 p-10 text-center sm:p-16">
            <FileText className="mx-auto h-10 w-10 text-brand-400" />
            <h2 className="mt-4 text-xl font-bold text-navy-900">{t("empty")}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">{t("emptyDesc")}</p>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(t("request"))}`}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              <Mail className="h-4 w-4" />
              {t("request")}
            </a>
          </Reveal>
        ) : (
          <Reveal className="mt-12 overflow-hidden rounded-3xl border border-ink-100">
            <ul className="divide-y divide-ink-100">
              {technicalDocs.map((d) => (
                <li key={d.id} className="flex items-center gap-4 bg-white px-5 py-4 sm:px-6">
                  <FileText className="h-5 w-5 shrink-0 text-brand-600" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink-900">{d.title[locale]}</p>
                    <p className="text-xs text-ink-500">{d.date}</p>
                  </div>
                  {d.file && (
                    <a
                      href={d.file}
                      download
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-2 text-xs font-semibold text-brand-600 hover:bg-brand-100"
                    >
                      <Download className="h-3.5 w-3.5" />
                      {t("download")}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </section>
    </>
  );
}
