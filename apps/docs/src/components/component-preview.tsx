import { Component, lazy, Suspense, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Skeleton, SkeletonBlock } from "@qingye_lab/ui/components/skeleton";
import { loadCover, loadPreview } from "@/lib/registry";
const previews = new Map<string, ReturnType<typeof lazy>>();
function previewFor(slug: string) {
  let Preview = previews.get(slug);
  if (!Preview) { Preview = lazy(() => loadPreview(slug)); previews.set(slug, Preview); }
  return Preview;
}
const covers = new Map<string, ReturnType<typeof lazy>>();
function coverFor(slug: string) {
  let Cover = covers.get(slug);
  if (!Cover) { Cover = lazy(() => loadCover(slug)); covers.set(slug, Cover); }
  return Cover;
}
/** Interactive current examples; no separate application or business simulator. */
export function ComponentPreview({ slug = "input-group" }: { slug?: string }) {
  const Preview = previewFor(slug);
  return <Suspense fallback={<div aria-busy="true" />}><Preview /></Suspense>;
}

/**
 * A specimen that fails to load or throws is reported (with its slug, so the broken one can be found)
 * and replaced by the component's name; the frame is never left empty and the tile link keeps working.
 */
class SpecimenBoundary extends Component<{ slug: string; name: string; onFail: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: unknown) {
    console.error(`[component-specimen] "${this.props.slug}" failed to render`, error);
    this.props.onFail();
  }
  render() { return this.state.failed ? this.props.name : this.props.children; }
}

/** The quiet stand-in for a specimen that has not arrived: the frame's whole inner area, one wash. */
function SpecimenPlaceholder() {
  return <Skeleton className="size-full"><SkeletonBlock className="size-full" /></Skeleton>;
}

/**
 * The component's cover (or, when its first example already fits the frame, that example) at 1:1,
 * for recognition in a directory.
 * It mounts once its frame nears the viewport (a frame already near it on first paint mounts at once,
 * without waiting for a scroll) and stays mounted. Until then, and while it loads, the frame shows a
 * placeholder; if it cannot load, the frame shows the component's name. The stage is inert:
 * the tile's link is the only destination, so the example's controls take no focus,
 * pointer or accessibility-tree presence. Without IntersectionObserver only the first-paint check runs.
 */
export function ComponentSpecimen({ slug, name, className }: { slug: string; name: string; className?: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [failed, setFailed] = useState(false);
  // First paint: whatever is already within the same margin as the observer below loads immediately.
  useLayoutEffect(() => {
    const node = stage.current;
    if (near || !node) return;
    const { top, bottom } = node.getBoundingClientRect();
    const margin = window.innerHeight / 2;
    if (bottom >= -margin && top <= window.innerHeight + margin) setNear(true);
  }, [near]);
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
  const Preview = near ? coverFor(slug) : null;
  return <div aria-hidden="true" className={className} data-component-specimen={slug} data-state={failed ? "failed" : near ? "mounted" : "idle"} inert ref={stage}>
    {Preview
      ? <SpecimenBoundary name={name} onFail={() => setFailed(true)} slug={slug}><Suspense fallback={<SpecimenPlaceholder />}><Preview /></Suspense></SpecimenBoundary>
      : <SpecimenPlaceholder />}
  </div>;
}
