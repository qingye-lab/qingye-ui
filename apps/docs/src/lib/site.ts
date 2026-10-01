import pkg from "@yanqing/ui/package.json";

export const SITE = {
  name: "Yanqing UI",
  packageName: pkg.name,
  version: pkg.version,
  repo: "https://github.com/qingye-lab/yanqing-ui",
  branch: "main",
} as const;

export const repoFile = (path: string) => `${SITE.repo}/blob/${SITE.branch}/${path}`;

export const releaseTarball = `${SITE.repo}/releases/download/v${SITE.version}/yanqing-ui-${SITE.version}.tgz`;

export const editComponentUrl = (slug: string) => repoFile(`apps/docs/src/content/${slug}/meta.ts`);

export const componentSourceUrl = (slug: string) => repoFile(`packages/ui/src/components/${slug}.tsx`);

export const editPageUrl = (file: string) => repoFile(`apps/docs/src/pages/docs/${file}`);

/** `<title>` text for a page. */
export const pageTitle = (title?: string) => (title ? `${title} · ${SITE.name}` : `${SITE.name} — 精致、耐看的 React 组件库`);
