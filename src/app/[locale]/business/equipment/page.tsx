import { getTranslations } from "next-intl/server";
import { Grip, CircleDot, Cpu } from "lucide-react";
import { pageMetadata, prepare, type LocaleParams } from "@/lib/page";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { CertBadges, Gallery } from "@/components/ui";

export const generateMetadata = pageMetadata("Business.Equipment");

const icons = [Grip, CircleDot, Cpu];

export default async function EquipmentPage(props: LocaleParams) {
  await prepare(props);
  const t = await getTranslations("Business.Equipment");
  const tb = await getTranslations("Business");
  const items = t.raw("items") as { title: string; en: string; desc: string }[];

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        sectionKey="business"
        currentHref="/business/equipment"
      />
      <section className="container-x py-16 lg:py-24">
        <Reveal className="max-w-3xl">
          <p className="text-lg leading-relaxed text-ink-700 sm:text-xl">{t("intro")}</p>
        </Reveal>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((it, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={it.title} delay={i * 0.08} className="h-full rounded-3xl border border-ink-100 bg-white p-6 shadow-sm">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-4 text-lg font-bold text-navy-900">{it.title}</h2>
                  <p className="text-xs text-ink-500">{it.en}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-700">{it.desc}</p>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-12">
          <CertBadges
            title={tb("certifications")}
            items={[
              { image: "/images/patent09.png", label: t("certs.design") },
              { image: "/images/patent07.png", label: t("certs.patent") },
            ]}
          />
        </div>

        <Reveal className="mt-14 rounded-2xl border-l-4 border-mint-500 bg-mint-100/50 px-5 py-4 text-sm font-medium text-navy-900">
          {t("application")}
        </Reveal>

        <div className="mt-12 space-y-14">
          <Gallery
            title={t("jigs")}
            subtitle={t("jigsEn")}
            images={[
              "/images/sub_busi03_cont1_img01.jpg",
              "/images/sub_busi03_cont1_img02.jpg",
              "/images/sub_busi03_cont1_img03.jpg",
            ]}
          />
          <Gallery
            title={t("plated")}
            subtitle={t("platedEn")}
            images={[
              "/images/sub_busi03_cont2_img01.jpg",
              "/images/sub_busi03_cont2_img02.jpg",
              "/images/sub_busi03_cont2_img03.jpg",
            ]}
          />
        </div>
      </section>
    </>
  );
}
