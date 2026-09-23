import { getTranslations } from "next-intl/server";
import { pageMetadata, prepare, type LocaleParams } from "@/lib/page";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { Prose } from "@/components/ui";

export const generateMetadata = pageMetadata("Company.History");

type Item = { year: string; month: string; title: string; note: string };

export default async function HistoryPage(props: LocaleParams) {
  await prepare(props);
  const t = await getTranslations("Company.History");
  const items = t.raw("items") as Item[];

  const byYear = items.reduce<Record<string, Item[]>>((acc, it) => {
    (acc[it.year] ??= []).push(it);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        sectionKey="company"
        currentHref="/company/history"
        image="/images/sub_history.jpg"
      />
      <section className="container-x py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <Reveal>
            <p className="text-2xl font-bold leading-snug text-navy-900 sm:text-3xl">{t("lead")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Prose>
              <p>{t("p1")}</p>
            </Prose>
          </Reveal>
        </div>

        <ol className="relative mt-20 border-l-2 border-brand-100 pl-6 sm:ml-24 sm:pl-10">
          {years.map((year, yi) => (
            <li key={year} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[calc(1.5rem+5px)] top-1.5 h-2 w-2 rounded-full bg-brand-500 ring-4 ring-white sm:-left-[calc(2.5rem+5px)]" />
              <Reveal delay={Math.min(yi * 0.03, 0.2)}>
                <p className="text-2xl font-extrabold text-navy-900 sm:absolute sm:-left-[calc(2.5rem+6rem)] sm:top-0 sm:w-20 sm:text-right sm:text-xl">
                  {year}
                </p>
                <ul className="mt-3 space-y-3 sm:mt-0">
                  {byYear[year].map((it) => (
                    <li
                      key={it.month + it.title}
                      className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-4 shadow-sm sm:p-5"
                    >
                      <span className="shrink-0 rounded-lg bg-brand-50 px-2.5 py-1 text-sm font-bold text-brand-600">
                        {it.month}
                      </span>
                      <div>
                        <p className="font-semibold text-ink-900">{it.title}</p>
                        {it.note && <p className="mt-1 text-sm text-ink-500">{it.note}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
