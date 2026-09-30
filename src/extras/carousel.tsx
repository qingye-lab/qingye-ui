"use client";

import { useUILocale } from "../locale";

import { useRef, useState, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../button";
import { cn } from "../utils";

export type CarouselProps = { slides: readonly ReactNode[]; label: string; previousLabel?: string; nextLabel?: string; slideLabel?: (index: number, total: number) => string; className?: string };
export function Carousel(props: CarouselProps) {
  const { messages } = useUILocale();
  const { slides, label, previousLabel = messages.previousSlide, nextLabel = messages.nextSlide, slideLabel = (index, total) => `${index + 1} / ${total}`, className } = props;
  const viewport = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const current = Math.min(active, Math.max(0, slides.length - 1));
  const go = (index: number) => {
    const element = viewport.current;
    if (!element) return;
    const direction = getComputedStyle(element).direction === "rtl" ? -1 : 1;
    element.scrollTo({ left: direction * index * element.clientWidth, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return <section aria-label={label} aria-roledescription={messages.carousel} className={cn("flex min-w-0 flex-col gap-3", className)}>
    <div ref={viewport} className="flex snap-x snap-mandatory overflow-x-auto rounded-lg border border-border [scrollbar-width:none]" onScroll={(event) => { const element = event.currentTarget; if (element.clientWidth) setActive(Math.round(Math.abs(element.scrollLeft) / element.clientWidth)); }}>
      {slides.map((slide, index) => <div key={index} role="group" aria-roledescription={messages.slide} aria-label={slideLabel(index, slides.length)} inert={index !== current} className="min-w-0 shrink-0 basis-full snap-start">{slide}</div>)}
    </div>
    <div className="flex items-center justify-between gap-3"><Button type="button" size="icon" variant="outline" disabled={current === 0} aria-label={previousLabel} onClick={() => go(current - 1)}><ChevronLeftIcon aria-hidden="true" /></Button><span aria-live="polite" className="text-xs text-muted-foreground">{slides.length ? slideLabel(current, slides.length) : "0 / 0"}</span><Button type="button" size="icon" variant="outline" disabled={current >= slides.length - 1} aria-label={nextLabel} onClick={() => go(current + 1)}><ChevronRightIcon aria-hidden="true" /></Button></div>
  </section>;
}
