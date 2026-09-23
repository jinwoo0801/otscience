type Props = { className?: string; inverted?: boolean };

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="otBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b6fe0" />
          <stop offset="1" stopColor="#0b2352" />
        </linearGradient>
        <linearGradient id="otGreen" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#1f9a63" />
          <stop offset="1" stopColor="#5ccb9b" />
        </linearGradient>
      </defs>
      <path
        d="M6 30 C10 14, 24 6, 36 5 C28 10, 20 18, 16 32 Z"
        fill="url(#otBlue)"
      />
      <path d="M5 35 L19 19 L21 35 Z" fill="url(#otGreen)" />
    </svg>
  );
}

export default function Logo({ className = "", inverted = false }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`text-[1.05rem] font-extrabold tracking-[0.18em] ${
            inverted ? "text-white" : "text-navy-900"
          }`}
        >
          OT SCIENCE
        </span>
        <span
          className={`mt-1 text-[0.6rem] font-medium tracking-[0.22em] ${
            inverted ? "text-white/70" : "text-ink-500"
          }`}
        >
          ㈜오티사이언스
        </span>
      </span>
    </span>
  );
}
