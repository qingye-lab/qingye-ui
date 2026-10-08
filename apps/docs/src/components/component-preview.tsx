import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { loadPreview } from "@/lib/registry";
const previews = new Map<string, ReturnType<typeof lazy>>();
function previewFor(slug: string) {
  let Preview = previews.get(slug);
  if (!Preview) { Preview = lazy(() => loadPreview(slug)); previews.set(slug, Preview); }
  return Preview;
}
/** Interactive current examples; no separate application or business simulator. */
export function ComponentPreview({ slug = "input-group" }: { slug?: string }) {
  const Preview = previewFor(slug);
  return <Suspense fallback={<div aria-busy="true" />}><Preview /></Suspense>;
}

/** A specimen that cannot render leaves its stage empty; the entry's name and link stay usable. */
class Quiet extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

/**
 * The component's first example at 1:1, for recognition in a directory.
 * It mounts once its entry nears the viewport and stays mounted. The stage is inert:
 * the entry's link is the only destination, so the example's controls take no focus,
 * pointer or accessibility-tree presence. Without IntersectionObserver nothing is mounted.
 */
export function ComponentSpecimen({ slug, className }: { slug: string; className?: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const node = stage.current;
    if (near || !node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      setNear(true);
      observer.disconnect();
    }, { rootMargin: "50% 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [near]);
  const Preview = near ? previewFor(slug) : null;
  return <div aria-hidden="true" className={className} data-component-specimen={slug} inert ref={stage}>
    {Preview ? <Quiet><Suspense fallback={null}><Preview /></Suspense></Quiet> : null}
  </div>;
}
