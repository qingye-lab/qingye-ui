import { Toc, useTocHeadings, useTocScrollSpy } from "@qingye_lab/ui/components/toc";
import { useEffect, useState, type MouseEvent, type RefObject } from "react";
import { useHashLink } from "@/lib/use-route-effects";

/** The article's own `[data-toc]` headings (prose H2/H3), so pages never maintain a list by hand. */
const HEADINGS = "[data-toc][id]";

/** The page header's scroll padding is the reading line a heading has to cross to become current. */
function useScrollPadding() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const read = () => setOffset(parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0);
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);
  return offset;
}

/*
 * The on-page contents are the library's Toc: the vertical navigation line, with the
 * current section darkening its own segment. No visible title: its position beside the
 * article and its entries already say what it is; the landmark keeps the Toc's own
 * accessible name. A single section needs no contents.
 */
export function TableOfContents({ container }: { container: RefObject<HTMLElement | null> }) {
  const items = useTocHeadings(container, HEADINGS);
  const current = useTocScrollSpy(items, { offset: useScrollPadding() });
  const onHashClick = useHashLink();
  if (items.length < 2) return null;
  // Route-aware hash navigation for the Toc's plain anchors, delegated from the landmark.
  const onClick = (event: MouseEvent<HTMLElement>) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    const id = link ? decodeURIComponent(link.hash.slice(1)) : "";
    if (id) onHashClick(event as MouseEvent<HTMLAnchorElement>, id);
  };
  return <Toc current={current} items={items} onClick={onClick} />;
}
