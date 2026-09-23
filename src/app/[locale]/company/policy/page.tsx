import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Quote, Sparkles, Trophy, HeartHandshake, Users, ShieldCheck, Leaf } from "lucide-react";
import { pageMetadata, prepare, type LocaleParams } from "@/lib/page";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { asset } from "@/lib/asset";

export const generateMetadata = pageMetadata("Company.Policy");

type Pair = { title: string; desc: string };

const philosophyIcons = [Trophy, Users, HeartHandshake];
const philosophyImages = [
  "/images/sub_infor_sec02_img01.png",
  "/images/sub_infor_sec02_img02.png",
  "/images/sub_infor_sec02_img03.png",
];
const qualityImages = [
  "/images/sub_infor_sec03_img01.png",
  "/images/sub_infor_sec03_img02.png",
  "/images/sub_infor_sec03_img03.png",
];
const envImages = [
  "/images/sub_infor_sec04_img01.png",
  "/images/sub_infor_sec04_img02.png",
  "/images/sub_infor_sec04_img03.png",
];

function PolicyBlock({
  icon: Icon,
  title,
  en,
  text,
  items,
  images,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  en: string;
  text: string;
  items: Pair[];
  images: string[];
  tone: "blue" | "green";
}) {
  const accent = tone === "blue" ? "bg-brand-50 text-brand-600" : "bg-mint-100 text-mint-600";
  return (
    <Reveal className="rounded-3xl border border-ink-100 bg-white p-6 shadow-sm sm:p-10">
      <div className="flex items-center gap-3">
        <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${accent}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-bold text-navy-900 sm:text-2xl">{title}</h2>
          <p className="text-xs uppercase tracking-widest text-ink-500">{en}</p>
        </div>
      </div>
      <p className="mt-6 leading-relaxed text-ink-700">{text}</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {items.map((it, i) => (
          <li key={it.title} className="flex items-center gap-4 rounded-2xl bg-ink-50 p-4">
            <Image src={asset(images[i])} alt="" width={56} height={56} className="h-12 w-12 object-contain" />
            <div>
              <p className="font-bold text-navy-900">{it.title}</p>
              <p className="text-xs text-ink-500">{it.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default async function PolicyPage(props: LocaleParams) {
  await prepare(props);
  const t = await getTranslations("Company.Policy");
  const mottos = t.raw("motto.items") as { title: string; en: string }[];
  const philosophy = t.raw("philosophy.items") as Pair[];
  const quality = t.raw("quality.items") as Pair[];
  const environment = t.raw("environment.items") as Pair[];

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        sectionKey="company"
        currentHref="/company/policy"
      />

      {/* Motto */}
      <section className="bg-ink-50 py-16 lg:py-24">
        <div className="container-x">
          <Reveal className="text-center">
            <p className="eyebrow">{t("motto.en")}</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">{t("motto.title")}</h2>
          </Reveal>
          <ul className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
            {mottos.map((m, i) => (
              <Reveal as="li" key={m.title} delay={i * 0.1} className="relative flex aspect-square flex-col items-center justify-center rounded-full border-4 border-brand-100 bg-white p-6 text-center shadow-lg shadow-navy-900/5">
                  <Sparkles className="mb-3 h-6 w-6 text-mint-500" />
                  <p className="text-xl font-extrabold text-navy-900 sm:text-2xl">{m.title}</p>
                  <p className="mt-2 text-sm text-ink-500">{m.en}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2} className="mx-auto mt-14 max-w-2xl text-center">
            <Quote className="mx-auto h-8 w-8 text-brand-100" />
            <p className="mt-3 text-2xl font-bold text-brand-600 sm:text-3xl">{t("motto.quote")}</p>
            <p className="mt-2 text-ink-500">{t("motto.quoteEn")}</p>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">{t("philosophy.en")}</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">{t("philosophy.title")}</h2>
            <p className="mt-5 text-xl font-semibold text-ink-900 sm:text-2xl">{t("philosophy.lead")}</p>
            <p className="mt-1 text-ink-500">{t("philosophy.leadEn")}</p>
          </Reveal>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {philosophy.map((p, i) => {
              const Icon = philosophyIcons[i];
              return (
                <Reveal as="li" key={p.title} delay={i * 0.1} className="flex h-full flex-col rounded-3xl bg-gradient-to-br from-navy-900 to-brand-600 p-7 text-white">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                        <Icon className="h-5 w-5" />
                      </span>
                      <Image src={asset(philosophyImages[i])} alt="" width={56} height={56} className="h-12 w-12 object-contain opacity-90 brightness-0 invert" />
                    </div>
                    <p className="mt-8 text-xl font-bold">{p.title}</p>
                    <p className="mt-2 text-sm text-white/70">{p.desc}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Quality & Environment */}
      <section className="bg-ink-50 py-16 lg:py-24">
        <div className="container-x space-y-8">
          <PolicyBlock
            icon={ShieldCheck}
            title={t("quality.title")}
            en={t("quality.en")}
            text={t("quality.text")}
            items={quality}
            images={qualityImages}
            tone="blue"
          />
          <PolicyBlock
            icon={Leaf}
            title={t("environment.title")}
            en={t("environment.en")}
            text={t("environment.text")}
            items={environment}
            images={envImages}
            tone="green"
          />
        </div>
      </section>
    </>
  );
}
