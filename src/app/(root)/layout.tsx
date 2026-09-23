import { basePath } from "@/lib/asset";

export default function RootRedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta httpEquiv="refresh" content={`1; url=${basePath}/ko/`} />
      </head>
      <body>{children}</body>
    </html>
  );
}
