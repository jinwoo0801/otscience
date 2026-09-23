import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { pageMetadata, prepare, type LocaleParams } from "@/lib/page";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { Prose } from "@/components/ui";
import { asset } from "@/lib/asset";

export const generateMetadata = pageMetadata("Company.Greeting");

export default async function GreetingPage(props: LocaleParams) {
  await prepare(props);
  const t = await getTranslations("Company.Greeting");

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        sectionKey="company"
        currentHref="/company/greeting"
      />
      <section className="container-x py-16 lg:py-24">
        <Reveal className="relative aspect-[21/9] overflow-hidden rounded-3xl bg-ink-100 shadow-xl shadow-navy-900/10">
          <Image
            src={asset("/images/sub_company_img.jpg")}
            alt={t("imageAlt")}
            fill
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <Reveal>
            <p className="text-2xl font-bold leading-snug text-navy-900 sm:text-3xl">
              {t("lead")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Prose>
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
              <p>{t("p4")}</p>
              <p>{t("closing")}</p>
            </Prose>
            <p className="mt-10 border-l-4 border-mint-500 pl-4 text-lg font-bold text-navy-900">
              {t("signature")}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
