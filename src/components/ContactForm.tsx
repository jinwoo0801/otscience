"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, AlertCircle, Send, Loader2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/data/site";

type Status = "idle" | "sending" | "success" | "error" | "mail";

const inputClass =
  "w-full rounded-xl border border-ink-300 bg-white px-4 py-3 text-base text-ink-900 placeholder:text-ink-300 transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100";

export default function ContactForm() {
  const t = useTranslations("Contact.form");
  const locale = useLocale();
  const categories = t.raw("categories") as string[];
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill hidden fields, humans do not.
    if (data.get("website")) {
      setStatus("success");
      return;
    }

    const email = String(data.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);

    const fields = {
      name: String(data.get("name") ?? ""),
      company: String(data.get("company") ?? ""),
      email,
      phone: String(data.get("phone") ?? ""),
      category: String(data.get("category") ?? ""),
      message: String(data.get("message") ?? ""),
      locale,
      page: typeof window !== "undefined" ? window.location.href : "",
    };
    const subject = `${t("subjectPrefix")} ${fields.category} - ${fields.name}`;

    if (!site.formEndpoint) {
      // No form backend configured: hand the message to the visitor's mail app.
      const body = [
        `${t("name")}: ${fields.name}`,
        `${t("company")}: ${fields.company}`,
        `${t("email")}: ${fields.email}`,
        `${t("phone")}: ${fields.phone}`,
        `${t("category")}: ${fields.category}`,
        "",
        fields.message,
      ].join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("mail");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...fields, _subject: subject }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-mint-400/40 bg-mint-100/40 p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-mint-600" />
        <h3 className="mt-4 text-xl font-bold text-navy-900">{t("successTitle")}</h3>
        <p className="mt-2 text-ink-700">{t("successDesc")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-ink-300 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-white"
        >
          {t("another")}
        </button>
      </div>
    );
  }

  const req = <span className="ml-1 text-xs font-medium text-brand-600">*</span>;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink-700">{t("name")}{req}</span>
          <input name="name" required autoComplete="name" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink-700">{t("company")}</span>
          <input name="company" autoComplete="organization" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink-700">{t("email")}{req}</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            aria-invalid={emailError}
            className={`${inputClass} ${emailError ? "border-red-400 ring-4 ring-red-100" : ""}`}
          />
          {emailError && <span className="mt-1 block text-xs text-red-600">{t("invalidEmail")}</span>}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink-700">{t("phone")}</span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" className={inputClass} />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-ink-700">{t("category")}{req}</span>
        <select name="category" required defaultValue={categories[0]} className={inputClass}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-ink-700">{t("message")}{req}</span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder={t("messagePlaceholder")}
          className={`${inputClass} resize-y`}
        />
      </label>

      {/* Honeypot (hidden from humans) */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-700">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 rounded border-ink-300 accent-brand-600" />
        <span>
          {t("consent")}{req}{" "}
          <Link href="/privacy" target="_blank" className="font-semibold text-brand-600 underline underline-offset-2">
            {t("consentLink")}
          </Link>
        </span>
      </label>

      {status === "error" && (
        <div role="alert" className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">{t("errorTitle")}</p>
            <p>{t("errorDesc")} <a className="underline" href={`mailto:${site.email}`}>{site.email}</a></p>
          </div>
        </div>
      )}
      {status === "mail" && (
        <div role="status" className="flex gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-navy-900">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600" />
          <p>{t("mailFallback")}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {status === "sending" ? t("sending") : t("submit")}
      </button>
      <p id="form-note" className="text-xs text-ink-500">* {t("required")}</p>
    </form>
  );
}
