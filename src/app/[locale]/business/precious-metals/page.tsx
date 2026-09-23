import { getTranslations } from "next-intl/server";
import { Zap, Filter } from "lucide-react";
import { pageMetadata, prepare, type LocaleParams } from "@/lib/page";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { CertBadges, Gallery } from "@/components/ui";

export const generateMetadata = pageMetadata("Business.Metals");

export default async function MetalsPage(props: LocaleParams) {
  await prepare(props);
  const t = await getTranslations("Business.Metals");
  const tb = await getTranslations("Business");

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        sectionKey="business"
        currentHref="/business/precious-metals"
      />
      <section className="container-x py-16 lg:py-24">
        <Reveal className="max-w-3xl">
          <p className="text-lg leading-relaxed text-ink-700 sm:text-xl">{t("intro")}</p>
        </Reveal>

        <div className="mt-12">
          <CertBadges
            title={tb("certifications")}
            items={[
              { image: "/images/patent03.png", label: t("certs.recycle") },
              { image: "/images/patent04.png", label: t("certs.hazmat") },
              { image: "/images/patent05.png", label: t("certs.patent1") },
              { image: "/images/patent06_01.png", label: t("certs.patent2") },
              { image: "/images/patent07.png", label: t("certs.patent3") },
              { image: "/images/patent08.png", label: t("certs.patent4") },
            ]}
          />
        </div>

        <div className="mt-16 space-y-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Zap className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-2xl font-bold text-navy-900">{t("electrolytic.title")}</h2>
              <p className="text-sm uppercase tracking-wider text-ink-500">{t("electrolytic.en")}</p>
              <p className="mt-4 leading-relaxed text-ink-700">{t("electrolytic.desc")}</p>
            </Reveal>
            <Gallery
              title={t("electrolytic.title")}
              images={["/images/bu02_img00.png", "/images/bu02_img01.png", "/images/bu02_img02.png"]}
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-100 text-mint-600">
                <Filter className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-2xl font-bold text-navy-900">{t("adsorption.title")}</h2>
              <p className="text-sm uppercase tracking-wider text-ink-500">{t("adsorption.en")}</p>
              <p className="mt-4 leading-relaxed text-ink-700">{t("adsorption.desc")}</p>
            </Reveal>
            <Gallery
              title={t("adsorption.title")}
              images={[
                "/images/bu02_img03.png",
                "/images/bu02_img04.png",
                "/images/bu02_img05.png",
                "/images/bu02_img06.png",
                "/images/bu02_img07.png",
                "/images/bu02_img08.png",
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
