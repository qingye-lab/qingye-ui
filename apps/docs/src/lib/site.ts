import pkg from "@qingye_lab/ui/package.json";
import { localePath, PATHS, type DocsLocale } from "./paths";

export const SITE = {
  name: "Qingye UI",
  packageName: pkg.name,
  version: pkg.version,
  npmPublished: true,
  repo: "https://github.com/qingye-lab/qingye-ui",
  branch: "main",
  base: "https://ui.xflux.cc",
} as const;

export const siteUrl = (path = PATHS.home as string, locale: DocsLocale = "zh") => `${SITE.base}${localePath(path, locale)}`;

export const repoFile = (path: string) => `${SITE.repo}/blob/${SITE.branch}/${path}`;

export const releaseFile = `${pkg.name.slice(1).replace('/', '-')}-${pkg.version}.tgz`;
export const installTarget = SITE.npmPublished ? SITE.packageName : `./${releaseFile}`;
/** 不经 npm 时安装同一版本的本地包；npm 发布后仍保留这条途径。 */
export const tarballTarget = `./${releaseFile}`;


export const editComponentUrl = (slug: string) => repoFile(`apps/docs/src/content/${slug}/meta.ts`);

export const editPageUrl = (file: string) => repoFile(`apps/docs/src/pages/docs/${file}`);

/** `<title>` text for a page. */
export const pageTitle = (title?: string, locale: DocsLocale = "zh") => (title ? `${title} · ${SITE.name}` : `${SITE.name} — ${locale === "en" ? "React components" : "React 组件库"}`);
