import Link from "next/link";
import Script from "next/script";
import { basePath } from "@/lib/asset";

const detect = `
(function () {
  var base = ${JSON.stringify(basePath)};
  try {
    var supported = ["ko", "en", "zh", "ja"];
    var saved = null;
    try { saved = localStorage.getItem("locale"); } catch (e) {}
    var target = saved && supported.indexOf(saved) !== -1 ? saved : null;
    if (!target) {
      var langs = navigator.languages || [navigator.language || "ko"];
      for (var i = 0; i < langs.length && !target; i++) {
        var code = String(langs[i]).toLowerCase().split("-")[0];
        if (supported.indexOf(code) !== -1) target = code;
      }
    }
    window.location.replace(base + "/" + (target || "ko") + "/");
  } catch (e) {
    window.location.replace(base + "/ko/");
  }
})();
`;

export const metadata = {
  title: "OT SCIENCE",
  robots: { index: false },
};

export default function RootPage() {
  return (
    <>
      <Script id="locale-redirect" strategy="beforeInteractive">
        {detect}
      </Script>
      <noscript>
        <Link href="/ko/">한국어</Link> · <Link href="/en/">English</Link> ·{" "}
        <Link href="/zh/">中文</Link> · <Link href="/ja/">日本語</Link>
      </noscript>
    </>
  );
}
