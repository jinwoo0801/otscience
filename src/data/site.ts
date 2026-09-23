export const site = {
  name: "OT SCIENCE",
  nameKo: "㈜오티사이언스",
  email: "sales@otscience.co.kr",
  tel: "+82-31-355-9121",
  telDisplay: "+82.31.355.9121",
  fax: "+82.31.355.9122",
  founded: 2002,
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3178.685535971984!2d126.78969851558061!3d37.18394355370309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b1286173248bf%3A0x69410864bee98175!2zKOyjvCnsmKTti7DsgqzsnbTslrjsiqQ!5e0!3m2!1sko!2skr!4v1603430840687!5m2!1sko!2skr",
  mapLink: "https://maps.google.com/?q=37.18394355370309,126.79228",
};

export type NavItem = {
  key: string;
  href: string;
  children?: { key: string; href: string }[];
};

export const nav: NavItem[] = [
  {
    key: "company",
    href: "/company/greeting",
    children: [
      { key: "greeting", href: "/company/greeting" },
      { key: "history", href: "/company/history" },
      { key: "policy", href: "/company/policy" },
      { key: "location", href: "/company/location" },
    ],
  },
  {
    key: "business",
    href: "/business/chemicals",
    children: [
      { key: "chemicals", href: "/business/chemicals" },
      { key: "metals", href: "/business/precious-metals" },
      { key: "equipment", href: "/business/equipment" },
      { key: "rnd", href: "/business/rnd" },
    ],
  },
  { key: "technical", href: "/technical" },
  { key: "careers", href: "/careers" },
];
