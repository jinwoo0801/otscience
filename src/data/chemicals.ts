export type ChemicalProcess = {
  key: "pre" | "under" | "finish" | "post";
  chemicals: string[];
  products: string[];
};

export const chemicalProcesses: ChemicalProcess[] = [
  {
    key: "pre",
    chemicals: ["Alkali Cleaner", "Acid Cleaner", "Activator", "Micro-Etchant"],
    products: ["HD-Series", "MX-Series"],
  },
  {
    key: "under",
    chemicals: ["Sulfur-free Ni additives", "Ancor Nickel Series"],
    products: ["NIS-Series", "ANDI-Series"],
  },
  {
    key: "finish",
    chemicals: [
      "Au plating process",
      "Ag plating process",
      "Pd-Ni plating process",
      "Sn plating process",
    ],
    products: ["AUX-Series", "AGB-Series", "PALLAS-Series", "SNP-Series"],
  },
  {
    key: "post",
    chemicals: ["Anti-tarnish agents"],
    products: ["NISS-Series", "SAT Series", "HiLUX-Series", "AUS-Series", "ANTIBAC"],
  },
];

export const analyzers = [
  { image: "/images/rnd00.png", name: "ICP-OES" },
  { image: "/images/rnd01.png", name: "Atomic Absorption Spectrometer" },
  { image: "/images/rnd02.png", name: "HPLC" },
  { image: "/images/rnd03.png", name: "Scanning Electron Microscope" },
  { image: "/images/rnd04.png", name: "X-ray Thickness Gauge" },
  { image: "/images/rnd05.png", name: "Optical Microscope" },
];

export type TechnicalDoc = {
  id: string;
  date: string;
  title: Record<"ko" | "en" | "zh" | "ja", string>;
  file?: string;
};

// 기술자료 목록. 파일은 public/docs/ 아래에 두고 file 경로를 지정하면 다운로드 링크가 생깁니다.
export const technicalDocs: TechnicalDoc[] = [];
