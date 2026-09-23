# OT SCIENCE 웹사이트

㈜오티사이언스(otscience.co.kr) 기업 사이트 재구축 프로젝트입니다.
Next.js 정적 사이트로 빌드되며, 한국어·영어·중국어(간체)·일본어 4개 언어를 지원합니다.

## 기술 스택

| 항목 | 선택 |
| --- | --- |
| 프레임워크 | Next.js 16 (App Router, `output: "export"` 정적 빌드) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4 |
| 다국어 | next-intl (경로 기반 `/ko`, `/en`, `/zh`, `/ja`, 기본 한국어) |
| 애니메이션 | motion |
| 아이콘 | lucide-react |
| 패키지 매니저 | pnpm |

## 개발

```bash
pnpm install
pnpm dev        # http://localhost:3000/ko/
pnpm lint
pnpm build      # out/ 폴더에 정적 HTML 생성
```

`pnpm build` 결과물인 `out/` 폴더를 그대로 웹서버(카페24·가비아 등 일반 웹호스팅, Vercel, Cloudflare Pages, Netlify)에 올리면 됩니다.
서버 언어(PHP 등)나 데이터베이스는 필요하지 않습니다.

루트 `/`로 접속하면 브라우저 언어(또는 마지막으로 선택한 언어)를 보고 `/ko/`, `/en/`, `/zh/`, `/ja/` 중 하나로 이동합니다.

## 구조

```
messages/            언어별 문구 (ko.json, en.json, zh.json, ja.json)
public/images/       사이트 이미지
public/docs/         기술자료 파일을 두는 곳 (다운로드용)
src/app/(root)/      루트(/) 언어 감지·리다이렉트 페이지
src/app/[locale]/    실제 페이지 (홈, 회사소개 4, 사업분야 4, 기술자료, 채용, 문의하기, 개인정보처리방침)
src/components/      Header, Footer, Hero, PageHeader, Reveal 등
src/data/site.ts     연락처·주소·메뉴 구조
src/data/chemicals.ts 약품 공정표, 분석장비 목록, 기술자료 목록
src/data/careers.ts  채용 공고 목록
src/i18n/            next-intl 라우팅 설정
```

## 문의하기 폼 연결

정적 사이트라 폼 데이터를 받을 서버가 없습니다. 두 가지 방식 중 하나로 동작합니다.

1. **Formspree 연결 (권장)**: https://formspree.io 에서 무료 폼을 만들고 엔드포인트를 환경변수에 넣습니다.
   - 로컬: `.env.local`에 `NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxx`
   - GitHub Pages: 저장소 Settings → Secrets and variables → Actions → Variables에 `FORM_ENDPOINT` 추가
2. **미설정 시**: 방문자의 메일 앱이 열리고 입력한 내용이 채워진 상태로 `sales@otscience.co.kr` 앞으로 보내집니다.

## 자주 하는 수정

- **문구 수정**: `messages/<언어>.json`에서 해당 키를 고칩니다. 네 언어 파일의 키 구조는 동일합니다.
- **연혁 추가**: `messages/*.json`의 `Company.History.items` 배열 맨 앞에 항목을 추가합니다.
- **기술자료 등록**: 파일을 `public/docs/`에 넣고 `src/data/chemicals.ts`의 `technicalDocs` 배열에 항목을 추가합니다.
  ```ts
  { id: "aux-series", date: "2026-09-01", file: "/docs/aux-series.pdf",
    title: { ko: "AUX 시리즈 기술자료", en: "AUX Series Datasheet", zh: "AUX 系列技术资料", ja: "AUXシリーズ技術資料" } }
  ```
- **연락처·주소**: `src/data/site.ts`와 `messages/*.json`의 `Footer`, `Company.Location`.
- **언어 추가**: `src/i18n/routing.ts`의 `locales`에 코드를 추가하고 `messages/<코드>.json`을 만듭니다.
