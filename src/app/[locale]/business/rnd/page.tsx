import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { analyzers } from "@/data/chemicals";
import { pageMetadata, prepare, type LocaleParams } from "@/lib/page";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { CertBadges } from "@/components/ui";
import { asset } from "@/lib/asset";

export const generateMetadata = pageMetadata("Business.Rnd");

export default async function RndPage(props: LocaleParams) {
  await prepare(props);
  const t = await getTranslations("Business.Rnd");
  const tb = await getTranslations("Business");

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        sectionKey="business"
        currentHref="/business/rnd"
      />
      <section className="container-x py-16 lg:py-24">
        <Reveal className="max-w-3xl">
          <p className="text-lg leading-relaxed text-ink-700 sm:text-xl">{t("intro")}</p>
        </Reveal>

        <div className="mt-12">
          <CertBadges
            title={tb("certifications")}
            items={[{ image: "/images/patent10.png", label: t("cert") }]}
          />
        </div>

        <Reveal className="mt-16 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="text-2xl font-bold text-navy-900">{t("analyzers")}</h2>
          <span className="text-sm uppercase tracking-wider text-ink-500">{t("analyzersEn")}</span>
        </Reveal>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {analyzers.map((a, i) => (
            <Reveal as="li" key={a.name} delay={i * 0.06} className="group overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-sm">
                <div className="relative aspect-[4/3] bg-ink-100">
                  <Image
                    src={asset(a.image)}
                    alt={a.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-600">Analyzer</p>
                  <p className="mt-1 font-bold text-navy-900">{a.name}</p>
                </div>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
