import Image from "next/image";
import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <Reveal className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`eyebrow ${light ? "text-mint-400" : ""}`}>{eyebrow}</p>
      )}
      <h2
        className={`mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? "text-white/70" : "text-ink-500"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}

export function CertBadges({
  title,
  items,
}: {
  title: string;
  items: { image: string; label: string }[];
}) {
  return (
    <Reveal>
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink-500">{title}</p>
      <ul className="flex flex-wrap gap-3">
        {items.map((item) => (
          <li
            key={item.label + item.image}
            className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white px-4 py-3 shadow-sm"
          >
            <Image
              src={asset(item.image)}
              alt=""
              width={72}
              height={40}
              className="h-9 w-auto object-contain"
            />
            <span className="text-sm font-medium text-ink-700">{item.label}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function Gallery({
  title,
  subtitle,
  images,
  cols = 3,
}: {
  title: string;
  subtitle?: string;
  images: string[];
  cols?: 2 | 3;
}) {
  return (
    <Reveal>
      <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-xl font-bold text-navy-900">{title}</h3>
        {subtitle && <span className="text-sm text-ink-500">{subtitle}</span>}
      </div>
      <ul
        className={`grid gap-4 ${cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}
      >
        {images.map((src, i) => (
          <li
            key={src}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-ink-100"
          >
            <Image
              src={asset(src)}
              alt={`${title} ${i + 1}`}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5 text-[0.98rem] leading-[1.85] text-ink-700 sm:text-base lg:text-[1.05rem]">
      {children}
    </div>
  );
}
