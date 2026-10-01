import pkg from "@qingye/ui/package.json";

export const SITE = {
  name: "Qingye UI",
  packageName: pkg.name,
  version: pkg.version,
  repo: "https://github.com/qingye-lab/qingye-ui",
  branch: "main",
} as const;

export const repoFile = (path: string) => `${SITE.repo}/blob/${SITE.branch}/${path}`;

export const releaseFile = `qingye-ui-${SITE.version}.tgz`;
export const releaseDownloadCommand = `gh release download v${SITE.version} --repo qingye-lab/qingye-ui --pattern ${releaseFile}`;

export const editComponentUrl = (slug: string) => repoFile(`apps/docs/src/content/${slug}/meta.ts`);

export const componentSourceUrl = (slug: string) => repoFile(`packages/ui/src/components/${slug}.tsx`);

export const editPageUrl = (file: string) => repoFile(`apps/docs/src/pages/docs/${file}`);

/** `<title>` text for a page. */
export const pageTitle = (title?: string) => (title ? `${title} · ${SITE.name}` : `${SITE.name} — 精致、耐看的 React 组件库`);
