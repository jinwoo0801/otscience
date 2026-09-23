import { getTranslations } from "next-intl/server";
import { Mail, Phone, Printer, MapPin, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/data/site";
import { pageMetadata, prepare, type LocaleParams } from "@/lib/page";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const generateMetadata = pageMetadata("Contact");

export default async function ContactPage(props: LocaleParams) {
  await prepare(props);
  const t = await getTranslations("Contact");
  const tl = await getTranslations("Company.Location");
  const tn = await getTranslations("Nav");

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} sectionKey="contact" currentHref="/contact" />
      <section className="container-x py-16 lg:py-24">
        <Reveal className="max-w-3xl">
          <p className="text-lg leading-relaxed text-ink-700 sm:text-xl">{t("intro")}</p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
          <Reveal className="h-fit rounded-3xl bg-navy-900 p-7 text-white sm:p-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-mint-400">{t("infoTitle")}</h2>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-mint-400" />
                <a href={`mailto:${site.email}`} className="font-semibold hover:underline">{site.email}</a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-mint-400" />
                <a href={`tel:${site.tel}`} className="hover:underline">{site.telDisplay}</a>
              </li>
              <li className="flex gap-3">
                <Printer className="mt-0.5 h-4 w-4 shrink-0 text-mint-400" />
                <span>{site.fax}</span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-mint-400" />
                <div>
                  <p className="text-white/60">{t("hours")}</p>
                  <p>{t("hoursValue")}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mint-400" />
                <div>
                  <p className="leading-relaxed">{tl("address")}</p>
                  <Link href="/company/location" className="mt-1 inline-block text-white/60 underline underline-offset-2 hover:text-white">
                    {tn("location")}
                  </Link>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="relative rounded-3xl border border-ink-100 bg-white p-6 shadow-sm sm:p-8">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
