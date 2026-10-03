import pkg from "@qingye/ui/package.json";
import { localePath, PATHS, type DocsLocale } from "./paths";

export const SITE = {
  name: "Qingye UI",
  packageName: pkg.name,
  version: pkg.version,
  repo: "https://github.com/qingye-lab/qingye-ui",
  branch: "main",
  base: "https://ui.xflux.cc",
} as const;

export const siteUrl = (path = PATHS.home as string, locale: DocsLocale = "zh") => `${SITE.base}${localePath(path, locale)}`;

export const repoFile = (path: string) => `${SITE.repo}/blob/${SITE.branch}/${path}`;

export const releaseFile = "qingye-ui.tgz";
export const releaseDownloadCommand = `gh release download --repo qingye-lab/qingye-ui --pattern 'qingye-ui-*.tgz' --output qingye-ui.tgz --clobber`;

export const editComponentUrl = (slug: string) => repoFile(`apps/docs/src/content/${slug}/meta.ts`);

export const componentSourceUrl = (slug: string) => repoFile(`packages/ui/src/components/${slug}.tsx`);

export const editPageUrl = (file: string) => repoFile(`apps/docs/src/pages/docs/${file}`);

/** `<title>` text for a page. */
export const pageTitle = (title?: string) => (title ? `${title} · ${SITE.name}` : `${SITE.name} — React 组件库`);
