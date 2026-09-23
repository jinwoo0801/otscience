import { getTranslations } from "next-intl/server";
import { chemicalProcesses } from "@/data/chemicals";
import { pageMetadata, prepare, type LocaleParams } from "@/lib/page";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { CertBadges } from "@/components/ui";

export const generateMetadata = pageMetadata("Business.Chemicals");

export default async function ChemicalsPage(props: LocaleParams) {
  await prepare(props);
  const t = await getTranslations("Business.Chemicals");
  const tb = await getTranslations("Business");

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        sectionKey="business"
        currentHref="/business/chemicals"
      />
      <section className="container-x py-16 lg:py-24">
        <Reveal className="max-w-3xl">
          <p className="text-lg leading-relaxed text-ink-700 sm:text-xl">{t("intro")}</p>
        </Reveal>

        <div className="mt-12">
          <CertBadges
            title={tb("certifications")}
            items={[
              { image: "/images/patent00.png", label: t("certs.hazmat") },
              { image: "/images/patent01.png", label: t("certs.iso") },
              { image: "/images/patent02.png", label: t("certs.innobiz") },
            ]}
          />
        </div>

        {/* Process flow */}
        <Reveal className="mt-16">
          <ol className="grid gap-3 sm:grid-cols-4">
            {chemicalProcesses.map((p, i) => (
              <li
                key={p.key}
                className="relative rounded-2xl border border-ink-100 bg-gradient-to-br from-white to-brand-50 p-5"
              >
                <span className="text-xs font-bold text-brand-600">STEP {i + 1}</span>
                <p className="mt-1 text-lg font-bold text-navy-900">{t(`processes.${p.key}.title`)}</p>
                <p className="text-xs uppercase tracking-wider text-ink-500">{t(`processes.${p.key}.en`)}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Table (desktop) */}
        <Reveal className="mt-10 hidden overflow-hidden rounded-3xl border border-ink-100 md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-900 text-white">
              <tr>
                <th className="px-6 py-4 font-semibold">{t("table.process")}</th>
                <th className="px-6 py-4 font-semibold">{t("table.chemicals")}</th>
                <th className="px-6 py-4 font-semibold">{t("table.products")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {chemicalProcesses.map((p) => (
                <tr key={p.key} className="align-top odd:bg-white even:bg-ink-50">
                  <td className="px-6 py-5">
                    <p className="font-bold text-navy-900">{t(`processes.${p.key}.title`)}</p>
                    <p className="text-xs text-ink-500">{t(`processes.${p.key}.en`)}</p>
                  </td>
                  <td className="px-6 py-5">
                    <ul className="space-y-1 text-ink-700">
                      {p.chemicals.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-5">
                    <ul className="flex flex-wrap gap-2">
                      {p.products.map((c) => (
                        <li key={c} className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-navy-900">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Cards (mobile) */}
        <ul className="mt-8 space-y-4 md:hidden">
          {chemicalProcesses.map((p, i) => (
            <Reveal as="li" key={p.key} delay={i * 0.05} className="rounded-3xl border border-ink-100 bg-white p-5">
                <p className="font-bold text-navy-900">{t(`processes.${p.key}.title`)}</p>
                <p className="text-xs text-ink-500">{t(`processes.${p.key}.en`)}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-ink-500">{t("table.chemicals")}</p>
                <ul className="mt-1 space-y-0.5 text-sm text-ink-700">
                  {p.chemicals.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-ink-500">{t("table.products")}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {p.products.map((c) => (
                    <li key={c} className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-navy-900">
                      {c}
                    </li>
                  ))}
                </ul>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
