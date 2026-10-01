import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useTheme } from "@qingye/ui";
import { findComponent, loadDemos, type LoadedDemo } from "@/lib/registry";

/**
 * Bare demo harness for visual review: every demo of one component, without
 * site chrome. `?theme=dark|light` forces the colour scheme for screenshots.
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
    setDemos(null);
    loadDemos(slug).then((loaded) => live && setDemos(loaded));
    return () => {
      live = false;
    };
  }, [slug]);

  const entry = findComponent(slug);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-5 py-10 sm:px-10 sm:py-14" data-playground={slug}>
      <header className="flex flex-col gap-2 border-b pb-6">
        <h1 className="font-semibold text-title tracking-heading">{entry?.title ?? slug}</h1>
        {entry ? (
          <p className="max-w-prose text-balance text-muted-foreground text-body">{entry.description}</p>
        ) : (
          <p className="text-destructive-foreground text-body">缺少 content/{slug}/meta.ts</p>
        )}
      </header>

      {demos === null ? (
        <p className="text-muted-foreground text-body">加载中…</p>
      ) : demos.length === 0 ? (
        <p className="text-muted-foreground text-body">还没有示例。</p>
      ) : null}

      <div className="flex flex-col gap-10">
        {demos?.map((demo) => (
          <section className="flex flex-col gap-3" data-demo={demo.id} key={demo.id}>
            <div className="flex flex-col gap-1">
              <h2 className="font-medium text-label text-muted-foreground">{demo.meta.title}</h2>
              {demo.meta.description ? (
                <p className="max-w-prose text-balance text-caption text-muted-foreground/80">{demo.meta.description}</p>
              ) : null}
            </div>
            {/*
             * The frame sits an octave above the page: pure-white card on the
             * tinted page, hairline border, and the same inner highlight the
             * library uses for its own surfaces.
             */}
            <div
              className={
                demo.meta.flush
                  ? "overflow-hidden rounded-2xl border bg-card not-dark:bg-clip-padding shadow-xs/5"
                  : "relative flex min-h-28 flex-wrap items-center justify-center gap-3 rounded-2xl border bg-card not-dark:bg-clip-padding p-6 shadow-xs/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] sm:gap-4 sm:p-10"
              }
            >
              <demo.default />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
