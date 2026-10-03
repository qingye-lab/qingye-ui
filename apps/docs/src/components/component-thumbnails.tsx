import { lazy, Suspense } from "react";
import { components, demoCount, loadPreview } from "@/lib/registry";
const previews = new Map<string, ReturnType<typeof lazy>>();
export const componentThumbnailSlugs = Object.freeze(components.filter(entry => demoCount(entry.slug) > 0).map(entry => entry.slug));
export function hasComponentThumbnail(slug: string) { return componentThumbnailSlugs.includes(slug); }
/** The actual first library example, loaded only when its directory entry is visible. */
export function ComponentThumbnail({ slug }: { slug: string }) {
  let Preview = previews.get(slug);
  if (!Preview) { Preview = lazy(() => loadPreview(slug)); previews.set(slug, Preview); }
  return <div className="home-preview-content home-preview-demo" data-component-thumbnail={slug}><Suspense fallback={<span aria-busy="true" />}><Preview /></Suspense></div>;
}
