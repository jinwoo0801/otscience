import { getTranslations } from "next-intl/server";
import { pageMetadata, prepare, type LocaleParams } from "@/lib/page";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const generateMetadata = pageMetadata("Privacy");

type Section = { title: string; body: string[] };

export default async function PrivacyPage(props: LocaleParams) {
  await prepare(props);
  const t = await getTranslations("Privacy");
  const sections = t.raw("sections") as Section[];

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} sectionKey="privacy" currentHref="/privacy" />
      <section className="container-x py-16 lg:py-24">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold text-brand-600">{t("effective")}</p>
          <p className="mt-4 text-base leading-relaxed text-ink-700 sm:text-lg">{t("intro")}</p>
        </Reveal>
        <div className="mt-12 max-w-3xl space-y-10">
          {sections.map((s, i) => (
            <section key={s.title} id={`section-${i + 1}`}>
              <h2 className="text-lg font-bold text-navy-900 sm:text-xl">{s.title}</h2>
              <ul className="mt-3 space-y-2 text-[0.95rem] leading-relaxed text-ink-700">
                {s.body.map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
