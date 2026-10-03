import { lazy, Suspense } from "react";
import { loadPreview } from "@/lib/registry";
const previews = new Map<string, ReturnType<typeof lazy>>();
/** Interactive current examples; no separate application or business simulator. */
export function ComponentPreview({ slug = "input-group" }: { slug?: string }) {
  let Preview = previews.get(slug); if (!Preview) { Preview = lazy(() => loadPreview(slug)); previews.set(slug, Preview); }
  return <Suspense fallback={<div aria-busy="true" />}><Preview /></Suspense>;
}
