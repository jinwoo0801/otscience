/**
 * Base path support (e.g. GitHub Pages project sites served at /<repo>/).
 * next/link applies basePath automatically; static asset URLs do not, so
 * every image/background path goes through asset().
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  return `${basePath}${path}`;
}
