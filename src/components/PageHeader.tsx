import { useTranslations } from "next-intl";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { nav } from "@/data/site";
import { asset } from "@/lib/asset";

type Props = {
  title: string;
  subtitle?: string;
  sectionKey: "company" | "business" | "technical" | "careers";
  currentHref: string;
  image?: string;
};

export default function PageHeader({
  title,
  subtitle,
  sectionKey,
  currentHref,
  image = "/images/sub_visual_img.jpg",
}: Props) {
  const tn = useTranslations("Nav");
  const tc = useTranslations("Common");
  const section = nav.find((n) => n.key === sectionKey);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-900 pt-16 text-white lg:pt-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${asset(image)})` }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/90 via-navy-900/70 to-brand-600/40"
        />
        <div className="container-x py-16 sm:py-20 lg:py-28">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs text-white/60 sm:text-sm">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-white">
              <Home className="h-3.5 w-3.5" />
              {tc("home")}
            </Link>
            {section?.children && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <span>{tn(sectionKey)}</span>
              </>
            )}
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">{title}</span>
          </nav>
          {subtitle && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-mint-400 sm:text-sm">
              {subtitle}
            </p>
          )}
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
        </div>
      </section>

      {section?.children && (
        <div className="sticky top-16 z-30 border-b border-ink-100 bg-white/90 backdrop-blur-md lg:top-20">
          <div className="container-x -mb-px flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {section.children.map((c) => {
              const active = c.href === currentHref;
              return (
                <Link
                  key={c.key}
                  href={c.href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap border-b-2 px-3 py-3.5 text-sm font-medium transition sm:px-4 ${
                    active
                      ? "border-brand-600 text-brand-600"
                      : "border-transparent text-ink-500 hover:text-navy-900"
                  }`}
                >
                  {tn(c.key)}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
