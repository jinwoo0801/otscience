import type { Locale } from "@/i18n/routing";

export type Job = {
  id: string;
  title: Record<Locale, string>;
  department: Record<Locale, string>;
  type: Record<Locale, string>;
  location: Record<Locale, string>;
  /** ISO date (YYYY-MM-DD). Omit for rolling recruitment. */
  deadline?: string;
  /** Optional external posting (e.g. 사람인, 잡코리아). Falls back to email application. */
  link?: string;
};

// 진행 중인 채용 공고. 항목을 추가하면 채용 페이지에 자동으로 표시됩니다.
// 예시:
// {
//   id: "rnd-2026-1",
//   title: { ko: "도금 첨가제 연구원", en: "Plating Additive Researcher", zh: "电镀添加剂研究员", ja: "めっき添加剤研究員" },
//   department: { ko: "부설연구소", en: "Research Institute", zh: "附属研究所", ja: "付設研究所" },
//   type: { ko: "정규직", en: "Full-time", zh: "正式员工", ja: "正社員" },
//   location: { ko: "경기 화성", en: "Hwaseong, Gyeonggi", zh: "京畿道华城", ja: "京畿道華城" },
//   deadline: "2026-12-31",
// },
export const jobs: Job[] = [];
