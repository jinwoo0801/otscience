import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export type LocaleParams = { params: Promise<{ locale: string }> };

export async function prepare({ params }: LocaleParams) {
  const { locale } = await params;
  setRequestLocale(locale);
  return locale;
}

export function pageMetadata(namespace: string, key = "title") {
  return async ({ params }: LocaleParams): Promise<Metadata> => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace });
    return { title: t(key) };
  };
}
