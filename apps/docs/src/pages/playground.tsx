import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { findComponent, loadDemos, type LoadedDemo } from "@/lib/registry";
import { useTheme } from "@yanqing/ui";

/**
 * Bare demo harness for visual review: every demo of one component, no site
 * chrome. `?theme=dark|light` forces the scheme for screenshots.
 */
export function PlaygroundPage() {
  const { slug = "" } = useParams();
  const [params] = useSearchParams();
  const { setTheme } = useTheme();
  const [demos, setDemos] = useState<LoadedDemo[] | null>(null);
  const forced = params.get("theme");

  useEffect(() => {
    if (forced === "dark" || forced === "light") setTheme(forced);
  }, [forced, setTheme]);

  useEffect(() => {
    let live = true;
    loadDemos(slug).then((loaded) => live && setDemos(loaded));
    return () => {
      live = false;
    };
  }, [slug]);

  const entry = findComponent(slug);
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8 sm:px-8" data-playground={slug}>
      <header className="flex flex-col gap-1">
        <h1 className="font-semibold text-lg">{entry?.title ?? slug}</h1>
        {entry ? <p className="text-muted-foreground text-sm">{entry.description}</p> : <p className="text-destructive-foreground text-sm">缺少 meta.ts</p>}
      </header>
      {demos === null ? <p className="text-muted-foreground text-sm">加载中…</p> : null}
      {demos?.map((demo) => (
        <section key={demo.id} className="flex flex-col gap-2" data-demo={demo.id}>
          <h2 className="font-medium text-muted-foreground text-xs">{demo.meta.title}</h2>
          <div className={demo.meta.flush ? "rounded-xl border" : "flex min-h-24 flex-wrap items-center justify-center gap-4 rounded-xl border p-6 sm:p-10"}>
            <demo.default />
          </div>
        </section>
      ))}
    </main>
  );
}
