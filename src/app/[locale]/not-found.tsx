import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-20 text-center">
      <p className="text-7xl font-extrabold text-brand-100">404</p>
      <h1 className="mt-4 text-2xl font-bold text-navy-900">{t("title")}</h1>
      <p className="mt-2 text-ink-500">{t("description")}</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600"
      >
        {t("back")}
      </Link>
    </section>
  );
}
