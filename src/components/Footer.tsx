import { useTranslations } from "next-intl";
import { Mail, Phone, Printer, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { nav, site } from "@/data/site";
import Logo from "./Logo";

export default function Footer() {
  const t = useTranslations("Footer");
  const tn = useTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white/80">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:py-20">
        <div>
          <Logo inverted />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
            {t("ceo")}
            <br />
            {t("address")}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">
            {t("quickLinks")}
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:grid-cols-1">
            {nav.flatMap((item) =>
              item.children
                ? item.children.map((c) => (
                    <li key={c.key}>
                      <Link href={c.href} className="transition hover:text-white">
                        {tn(c.key)}
                      </Link>
                    </li>
                  ))
                : [
                    <li key={item.key}>
                      <Link href={item.href} className="transition hover:text-white">
                        {tn(item.key)}
                      </Link>
                    </li>,
                  ],
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">
            {t("contact")}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-mint-400" />
              <a href={`tel:${site.tel}`} className="hover:text-white">
                {site.telDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Printer className="h-4 w-4 text-mint-400" />
              <span>{site.fax}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-mint-400" />
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mint-400" />
              <Link href="/company/location" className="hover:text-white">
                {tn("location")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("copyright", { year })}</p>
          <p className="flex items-center gap-4">
            <Link href="/privacy" className="font-medium text-white/60 transition hover:text-white">
              {t("privacy")}
            </Link>
            <span>{site.nameKo} · {site.name} Co., Ltd.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
