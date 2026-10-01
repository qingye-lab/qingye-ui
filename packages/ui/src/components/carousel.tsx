"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Button } from "./button";

/*
 * A scroll-snap carousel. The track is a native horizontal scroller, so touch
 * swipe, trackpad and momentum come from the browser; the component only
 * measures where each snap point sits and drives buttons, dots and arrow keys
 * from that. It never advances on its own.
 */

type CarouselContextValue = {
  trackRef: React.RefObject<HTMLDivElement | null>;
  /** Active snap position. */
  index: number;
  /** Number of snap positions; fewer than slides when several are in view. */
  count: number;
  canPrevious: boolean;
  canNext: boolean;
  scrollTo: (index: number) => void;
  scrollPrevious: () => void;
  scrollNext: () => void;
};

const CarouselContext: React.Context<CarouselContextValue | null> =
  React.createContext<CarouselContextValue | null>(null);

/** Read carousel state from inside `<Carousel>`, e.g. for a custom counter. */
export function useCarousel(): CarouselContextValue {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used inside <Carousel>.");
  return context;
}

type Snapshot = {
  positions: number[];
  index: number;
  canPrevious: boolean;
  canNext: boolean;
};

const INITIAL: Snapshot = { canNext: false, canPrevious: false, index: 0, positions: [0] };

function isRtl(element: HTMLElement): boolean {
  return getComputedStyle(element).direction === "rtl";
}

/** Snap positions as distances from the inline start, deduplicated at the end. */
function measure(track: HTMLDivElement): Snapshot {
  const rtl = isRtl(track);
  const scroll = Math.abs(track.scrollLeft);
  const max = Math.max(0, track.scrollWidth - track.clientWidth);
  const box = track.getBoundingClientRect();
  const positions: number[] = [];
  for (const item of Array.from(track.children)) {
    const rect = item.getBoundingClientRect();
    const offset = rtl ? box.right - rect.right : rect.left - box.left;
    const position = Math.min(max, Math.max(0, Math.round(offset + scroll)));
    const last = positions[positions.length - 1];
    if (last === undefined || position - last > 1) positions.push(position);
  }
  if (positions.length === 0) positions.push(0);

  let index = 0;
  positions.forEach((position, i) => {
    if (Math.abs(position - scroll) < Math.abs((positions[index] ?? 0) - scroll)) index = i;
  });
  return { canNext: scroll < max - 1, canPrevious: scroll > 1, index, positions };
}

function sameSnapshot(a: Snapshot, b: Snapshot): boolean {
  return (
    a.index === b.index &&
    a.canNext === b.canNext &&
    a.canPrevious === b.canPrevious &&
    a.positions.length === b.positions.length &&
    a.positions.every((position, i) => position === b.positions[i])
  );
}

export type CarouselProps = React.ComponentProps<"section"> & {
  /** Slides visible at once. For per-breakpoint values, set `--carousel-per-view` in `className` instead. @default 1 */
  slidesPerView?: number;
  /** Space between slides, in spacing steps (`4` = 1rem). @default 4 */
  gap?: number;
  /** Controlled active position. */
  index?: number;
  /** Initial position when uncontrolled. @default 0 */
  defaultIndex?: number;
  /** Called when the settled position changes, by swipe, keys or buttons. */
  onIndexChange?: (index: number) => void;
};

export function Carousel({
  slidesPerView,
  gap,
  index: indexProp,
  defaultIndex = 0,
  onIndexChange,
  className,
  style,
  onKeyDown,
  children,
  ...props
}: CarouselProps): React.ReactElement {
  const { messages } = useUILocale();
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const [snapshot, setSnapshot] = React.useState<Snapshot>(INITIAL);
  const snapshotRef = React.useRef(snapshot);
  snapshotRef.current = snapshot;
  // Target of an in-flight programmatic scroll, so rapid presses keep counting.
  const pendingRef = React.useRef<number | null>(null);

  const scrollTo = React.useCallback((target: number, instant = false) => {
    const track = trackRef.current;
    if (!track) return;
    const { positions } = snapshotRef.current;
    const index = Math.min(positions.length - 1, Math.max(0, target));
    pendingRef.current = index;
    const left = (isRtl(track) ? -1 : 1) * (positions[index] ?? 0);
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = instant || reduce ? "instant" : "smooth";
    if (typeof track.scrollTo === "function") track.scrollTo({ behavior, left });
    else track.scrollLeft = left;
  }, []);

  const scrollPrevious = React.useCallback(() => {
    scrollTo((pendingRef.current ?? snapshotRef.current.index) - 1);
  }, [scrollTo]);
  const scrollNext = React.useCallback(() => {
    scrollTo((pendingRef.current ?? snapshotRef.current.index) + 1);
  }, [scrollTo]);

  // Measure on scroll, on resize of the track or any slide, and when slides change.
  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      const next = measure(track);
      const pending = pendingRef.current;
      if (pending !== null && next.positions[pending] !== undefined) {
        if (Math.abs(Math.abs(track.scrollLeft) - next.positions[pending]) < 2) {
          pendingRef.current = null;
        }
      }
      setSnapshot((previous) => (sameSnapshot(previous, next) ? previous : next));
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const settle = () => {
      pendingRef.current = null;
      schedule();
    };
    update();

    const resize = new ResizeObserver(schedule);
    const observeSlides = () => {
      resize.observe(track);
      for (const child of Array.from(track.children)) resize.observe(child);
    };
    observeSlides();
    const mutation = new MutationObserver(() => {
      resize.disconnect();
      observeSlides();
      schedule();
    });
    mutation.observe(track, { childList: true });

    track.addEventListener("scroll", schedule, { passive: true });
    track.addEventListener("scrollend", settle);
    // A swipe or wheel takes over from any button-driven scroll.
    track.addEventListener("pointerdown", settle);
    track.addEventListener("wheel", settle, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      mutation.disconnect();
      track.removeEventListener("scroll", schedule);
      track.removeEventListener("scrollend", settle);
      track.removeEventListener("pointerdown", settle);
      track.removeEventListener("wheel", settle);
    };
  }, []);

  // Initial position, applied without animation once slides are measured.
  const initialIndex = indexProp ?? defaultIndex;
  const placed = React.useRef(false);
  React.useEffect(() => {
    if (placed.current || snapshot.positions.length < 2) return;
    placed.current = true;
    if (initialIndex > 0) scrollTo(initialIndex, true);
  }, [initialIndex, scrollTo, snapshot.positions.length]);

  // Controlled index: follow the prop when it moves away from where we are.
  React.useEffect(() => {
    if (indexProp === undefined || !placed.current) return;
    if (indexProp !== snapshotRef.current.index && indexProp !== pendingRef.current) {
      scrollTo(indexProp);
    }
  }, [indexProp, scrollTo]);

  const onIndexChangeRef = React.useRef(onIndexChange);
  onIndexChangeRef.current = onIndexChange;
  const reported = React.useRef(snapshot.index);
  React.useEffect(() => {
    if (snapshot.index === reported.current) return;
    reported.current = snapshot.index;
    onIndexChangeRef.current?.(snapshot.index);
  }, [snapshot.index]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
    if ((event.target as HTMLElement).closest("input, textarea, select, [contenteditable]")) return;
    event.preventDefault();
    const forward = (event.key === "ArrowRight") !== isRtl(event.currentTarget);
    if (forward) scrollNext();
    else scrollPrevious();
  };

  const value = React.useMemo<CarouselContextValue>(
    () => ({
      canNext: snapshot.canNext,
      canPrevious: snapshot.canPrevious,
      count: snapshot.positions.length,
      index: snapshot.index,
      scrollNext,
      scrollPrevious,
      scrollTo: (target: number) => scrollTo(target),
      trackRef,
    }),
    [snapshot, scrollNext, scrollPrevious, scrollTo],
  );

  const vars: Record<string, string | number> = {};
  if (slidesPerView !== undefined) vars["--carousel-per-view"] = slidesPerView;
  if (gap !== undefined) vars["--carousel-gap"] = `calc(var(--spacing) * ${gap})`;

  return (
    <CarouselContext.Provider value={value}>
      <section
        aria-roledescription={messages.carousel}
        className={cn(
          "relative flex min-w-0 flex-col gap-(--qy-space-3) [--carousel-gap:var(--qy-space-4)] [--carousel-per-view:1]",
          className,
        )}
        data-slot="carousel"
        onKeyDown={handleKeyDown}
        style={{ ...vars, ...style }}
        {...props}
      >
        {children}
        {value.count > 1 ? (
          <div aria-atomic="true" aria-live="polite" className="sr-only">
            {messages.slideOf(value.index + 1, value.count)}
          </div>
        ) : null}
      </section>
    </CarouselContext.Provider>
  );
}

const SlideContext: React.Context<{ index: number; total: number }> =
  React.createContext({ index: 0, total: 1 });

/** The scrolling track. Its direct children must be `CarouselItem`s. */
export function CarouselContent({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  const { trackRef } = useCarousel();
  const setRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      trackRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref, trackRef],
  );
  const slides = React.Children.toArray(children);
  return (
    <div
      className={cn(
        "flex snap-x snap-mandatory gap-(--carousel-gap) overflow-x-auto overscroll-x-contain rounded-xl outline-none [scrollbar-width:none] focus-visible:ring-[length:var(--qy-focus-button-width)] focus-visible:ring-ring focus-visible:ring-offset-[length:var(--qy-focus-button-offset)] focus-visible:ring-offset-background [&::-webkit-scrollbar]:hidden",
        className,
      )}
      data-slot="carousel-content"
      ref={setRef}
      {...props}
    >
      {slides.map((slide, index) => (
        <SlideContext.Provider
          key={React.isValidElement(slide) && slide.key !== null ? slide.key : index}
          value={{ index, total: slides.length }}
        >
          {slide}
        </SlideContext.Provider>
      ))}
    </div>
  );
}

/** One slide. Sized from `slidesPerView` and `gap`. */
export function CarouselItem({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  const { messages } = useUILocale();
  const { index, total } = React.useContext(SlideContext);
  return (
    <div
      aria-label={messages.slideOf(index + 1, total)}
      aria-roledescription={messages.slide}
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-[calc((100%_-_(var(--carousel-per-view)_-_1)_*_var(--carousel-gap))_/_var(--carousel-per-view))] snap-start",
        className,
      )}
      data-slot="carousel-item"
      role="group"
      {...props}
    />
  );
}

type CarouselButtonProps = React.ComponentProps<typeof Button>;

/*
 * At either end the buttons become aria-disabled rather than disabled, so a
 * keyboard user pressing "next" repeatedly keeps focus on the button.
 */
const navButtonClassName =
  "rounded-full aria-disabled:pointer-events-none aria-disabled:opacity-64 aria-disabled:shadow-none";

export function CarouselPrevious({
  className,
  children,
  onClick,
  variant = "outline",
  size = "icon-sm",
  ...props
}: CarouselButtonProps): React.ReactElement {
  const { messages } = useUILocale();
  const { canPrevious, scrollPrevious } = useCarousel();
  return (
    <Button
      aria-disabled={!canPrevious || undefined}
      aria-label={messages.previousSlide}
      className={cn(navButtonClassName, className)}
      data-slot="carousel-previous"
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (canPrevious && !event.defaultPrevented) scrollPrevious();
      }}
      size={size}
      variant={variant}
      {...props}
    >
      {children ?? <ChevronLeftIcon aria-hidden="true" className="rtl:-scale-x-100" />}
    </Button>
  );
}

export function CarouselNext({
  className,
  children,
  onClick,
  variant = "outline",
  size = "icon-sm",
  ...props
}: CarouselButtonProps): React.ReactElement {
  const { messages } = useUILocale();
  const { canNext, scrollNext } = useCarousel();
  return (
    <Button
      aria-disabled={!canNext || undefined}
      aria-label={messages.nextSlide}
      className={cn(navButtonClassName, className)}
      data-slot="carousel-next"
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (canNext && !event.defaultPrevented) scrollNext();
      }}
      size={size}
      variant={variant}
      {...props}
    >
      {children ?? <ChevronRightIcon aria-hidden="true" className="rtl:-scale-x-100" />}
    </Button>
  );
}

/** One dot per snap position; hidden when everything fits in view. */
export function CarouselDots({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement | null {
  const { messages } = useUILocale();
  const { count, index, scrollTo } = useCarousel();
  if (count < 2) return null;
  return (
    <div
      className={cn("flex items-center", className)}
      data-slot="carousel-dots"
      {...props}
    >
      {Array.from({ length: count }, (_, i) => (
        <button
          aria-current={i === index ? "true" : undefined}
          aria-label={messages.slideOf(i + 1, count)}
          className="group/dot touch-target relative flex h-6 cursor-pointer items-center rounded-full px-(--qy-space-1) outline-none focus-visible:ring-[length:var(--qy-focus-button-width)] focus-visible:ring-ring"
          data-slot="carousel-dot"
          // biome-ignore lint/suspicious/noArrayIndexKey: dots are positional
          key={i}
          onClick={() => scrollTo(i)}
          type="button"
        >
          <span className="block h-1.5 w-1.5 rounded-full bg-foreground/16 transition-[width,background-color] duration-(--qy-duration-base) ease-(--qy-ease-out) group-hover/dot:bg-foreground/32 group-aria-current/dot:w-4 group-aria-current/dot:bg-foreground/72" />
        </button>
      ))}
    </div>
  );
}
