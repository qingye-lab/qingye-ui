import { cn } from "@qingye/ui/utils";
import { useEffect, useState, type RefObject } from "react";
import { useLocation } from "react-router-dom";
import { routeVisitKey } from "@/lib/paths";
import { useHashLink } from "@/lib/use-route-effects";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const same = (a: TocItem[], b: TocItem[]) =>
  a.length === b.length && a.every((item, i) => item.id === b[i]!.id && item.text === b[i]!.text && item.level === b[i]!.level);

/** Reads the article's `[data-toc]` headings, so pages never maintain a list by hand. */
function useHeadings(container: RefObject<HTMLElement | null>) {
  const { pathname } = useLocation();
  const visit = routeVisitKey(pathname);
  const [items, setItems] = useState<TocItem[]>([]);
  useEffect(() => {
    const root = container.current;
    if (!root) return;
    let frame = 0;
    const scan = () => {
      const next = [...root.querySelectorAll<HTMLElement>("[data-toc][id]")].map((el) => ({
        id: el.id,
        text: el.textContent?.trim() ?? "",
        level: (el.dataset.toc === "3" ? 3 : 2) as 2 | 3,
      }));
      setItems((prev) => (same(prev, next) ? prev : next));
    };
    scan();
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    observer.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["id", "data-toc"] });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [container, visit]);
  return items;
}

function useActiveHeading(items: TocItem[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!items.length) return setActive(null);
    let frame = 0;
    const update = () => {
      const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      let current = items[0]!.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) current = item.id;
        else break;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && window.scrollY > 0) current = items.at(-1)!.id;
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);
  return active;
}

export function TableOfContents({ container }: { container: RefObject<HTMLElement | null> }) {
  const items = useHeadings(container);
  const active = useActiveHeading(items);
  const onHashClick = useHashLink();
  if (items.length < 2) return null;
  return (
    <nav aria-labelledby="toc-title" className="flex flex-col gap-3">
      <p className="font-medium text-foreground-strong text-caption" id="toc-title">
        本页目录
      </p>
      <ul className="flex flex-col border-s">
        {items.map((item) => {
          const current = item.id === active;
          return (
            <li key={item.id}>
              <a
                aria-current={current ? "location" : undefined}
                className={cn(
                  "focus-ring relative -ms-px block rounded-e-sm border-s border-transparent py-1 text-heading leading-snug transition-colors [overflow-wrap:anywhere]",
                  item.level === 3 ? "ps-6" : "ps-3",
                  current
                    ? "border-foreground font-medium text-foreground-strong"
                    : "text-muted-foreground hover:border-foreground/24 hover:text-foreground",
                )}
                href={`#${item.id}`}
                onClick={(event) => onHashClick(event, item.id)}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
