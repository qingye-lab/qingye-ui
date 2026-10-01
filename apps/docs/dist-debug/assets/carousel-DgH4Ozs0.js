import { q as useUILocale, r as reactExports, j as jsxRuntimeExports, e as cn, B as Button, c7 as ChevronRight } from "./index-DM02Iz28.js";
import { C as ChevronLeft } from "./chevron-left-CtqcxRzh.js";
const CarouselContext = reactExports.createContext(null);
function useCarousel() {
  const context = reactExports.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used inside <Carousel>.");
  return context;
}
const INITIAL = { canNext: false, canPrevious: false, index: 0, positions: [0] };
function isRtl(element) {
  return getComputedStyle(element).direction === "rtl";
}
function measure(track) {
  const rtl = isRtl(track);
  const scroll = Math.abs(track.scrollLeft);
  const max = Math.max(0, track.scrollWidth - track.clientWidth);
  const box = track.getBoundingClientRect();
  const positions = [];
  for (const item of Array.from(track.children)) {
    const rect = item.getBoundingClientRect();
    const offset = rtl ? box.right - rect.right : rect.left - box.left;
    const position = Math.min(max, Math.max(0, Math.round(offset + scroll)));
    const last = positions[positions.length - 1];
    if (last === void 0 || position - last > 1) positions.push(position);
  }
  if (positions.length === 0) positions.push(0);
  let index = 0;
  positions.forEach((position, i) => {
    if (Math.abs(position - scroll) < Math.abs((positions[index] ?? 0) - scroll)) index = i;
  });
  return { canNext: scroll < max - 1, canPrevious: scroll > 1, index, positions };
}
function sameSnapshot(a, b) {
  return a.index === b.index && a.canNext === b.canNext && a.canPrevious === b.canPrevious && a.positions.length === b.positions.length && a.positions.every((position, i) => position === b.positions[i]);
}
function Carousel({
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
}) {
  const { messages } = useUILocale();
  const trackRef = reactExports.useRef(null);
  const [snapshot, setSnapshot] = reactExports.useState(INITIAL);
  const snapshotRef = reactExports.useRef(snapshot);
  snapshotRef.current = snapshot;
  const pendingRef = reactExports.useRef(null);
  const scrollTo = reactExports.useCallback((target, instant = false) => {
    const track = trackRef.current;
    if (!track) return;
    const { positions } = snapshotRef.current;
    const index = Math.min(positions.length - 1, Math.max(0, target));
    pendingRef.current = index;
    const left = (isRtl(track) ? -1 : 1) * (positions[index] ?? 0);
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const behavior = instant || reduce ? "instant" : "smooth";
    if (typeof track.scrollTo === "function") track.scrollTo({ behavior, left });
    else track.scrollLeft = left;
  }, []);
  const scrollPrevious = reactExports.useCallback(() => {
    scrollTo((pendingRef.current ?? snapshotRef.current.index) - 1);
  }, [scrollTo]);
  const scrollNext = reactExports.useCallback(() => {
    scrollTo((pendingRef.current ?? snapshotRef.current.index) + 1);
  }, [scrollTo]);
  reactExports.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      const next = measure(track);
      const pending = pendingRef.current;
      if (pending !== null && next.positions[pending] !== void 0) {
        if (Math.abs(Math.abs(track.scrollLeft) - next.positions[pending]) < 2) {
          pendingRef.current = null;
        }
      }
      setSnapshot((previous) => sameSnapshot(previous, next) ? previous : next);
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
  const initialIndex = indexProp ?? defaultIndex;
  const placed = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (placed.current || snapshot.positions.length < 2) return;
    placed.current = true;
    if (initialIndex > 0) scrollTo(initialIndex, true);
  }, [initialIndex, scrollTo, snapshot.positions.length]);
  reactExports.useEffect(() => {
    if (indexProp === void 0 || !placed.current) return;
    if (indexProp !== snapshotRef.current.index && indexProp !== pendingRef.current) {
      scrollTo(indexProp);
    }
  }, [indexProp, scrollTo]);
  const onIndexChangeRef = reactExports.useRef(onIndexChange);
  onIndexChangeRef.current = onIndexChange;
  const reported = reactExports.useRef(snapshot.index);
  reactExports.useEffect(() => {
    if (snapshot.index === reported.current) return;
    reported.current = snapshot.index;
    onIndexChangeRef.current?.(snapshot.index);
  }, [snapshot.index]);
  const handleKeyDown = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    if (event.target.closest("input, textarea, select, [contenteditable]")) return;
    event.preventDefault();
    const forward = event.key === "ArrowRight" !== isRtl(event.currentTarget);
    if (forward) scrollNext();
    else scrollPrevious();
  };
  const value = reactExports.useMemo(
    () => ({
      canNext: snapshot.canNext,
      canPrevious: snapshot.canPrevious,
      count: snapshot.positions.length,
      index: snapshot.index,
      scrollNext,
      scrollPrevious,
      scrollTo: (target) => scrollTo(target),
      trackRef
    }),
    [snapshot, scrollNext, scrollPrevious, scrollTo]
  );
  const vars = {};
  if (slidesPerView !== void 0) vars["--carousel-per-view"] = slidesPerView;
  if (gap !== void 0) vars["--carousel-gap"] = `calc(var(--spacing) * ${gap})`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselContext.Provider, { value, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      "aria-roledescription": messages.carousel,
      className: cn(
        "relative flex min-w-0 flex-col gap-3 [--carousel-gap:--spacing(4)] [--carousel-per-view:1]",
        className
      ),
      "data-slot": "carousel",
      onKeyDown: handleKeyDown,
      style: { ...vars, ...style },
      ...props,
      children: [
        children,
        value.count > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-atomic": "true", "aria-live": "polite", className: "sr-only", children: messages.slideOf(value.index + 1, value.count) }) : null
      ]
    }
  ) });
}
const SlideContext = reactExports.createContext({ index: 0, total: 1 });
function CarouselContent({
  className,
  children,
  ref,
  ...props
}) {
  const { trackRef } = useCarousel();
  const setRef = reactExports.useCallback(
    (node) => {
      trackRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref, trackRef]
  );
  const slides = reactExports.Children.toArray(children);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "flex snap-x snap-mandatory gap-(--carousel-gap) overflow-x-auto overscroll-x-contain rounded-xl outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background [&::-webkit-scrollbar]:hidden",
        className
      ),
      "data-slot": "carousel-content",
      ref: setRef,
      ...props,
      children: slides.map((slide, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        SlideContext.Provider,
        {
          value: { index, total: slides.length },
          children: slide
        },
        reactExports.isValidElement(slide) && slide.key !== null ? slide.key : index
      ))
    }
  );
}
function CarouselItem({
  className,
  ...props
}) {
  const { messages } = useUILocale();
  const { index, total } = reactExports.useContext(SlideContext);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "aria-label": messages.slideOf(index + 1, total),
      "aria-roledescription": messages.slide,
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-[calc((100%_-_(var(--carousel-per-view)_-_1)_*_var(--carousel-gap))_/_var(--carousel-per-view))] snap-start",
        className
      ),
      "data-slot": "carousel-item",
      role: "group",
      ...props
    }
  );
}
const navButtonClassName = "rounded-full aria-disabled:pointer-events-none aria-disabled:opacity-64 aria-disabled:shadow-none";
function CarouselPrevious({
  className,
  children,
  onClick,
  variant = "outline",
  size = "icon-sm",
  ...props
}) {
  const { messages } = useUILocale();
  const { canPrevious, scrollPrevious } = useCarousel();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      "aria-disabled": !canPrevious || void 0,
      "aria-label": messages.previousSlide,
      className: cn(navButtonClassName, className),
      "data-slot": "carousel-previous",
      onClick: (event) => {
        onClick?.(event);
        if (canPrevious && !event.defaultPrevented) scrollPrevious();
      },
      size,
      variant,
      ...props,
      children: children ?? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { "aria-hidden": "true", className: "rtl:-scale-x-100" })
    }
  );
}
function CarouselNext({
  className,
  children,
  onClick,
  variant = "outline",
  size = "icon-sm",
  ...props
}) {
  const { messages } = useUILocale();
  const { canNext, scrollNext } = useCarousel();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      "aria-disabled": !canNext || void 0,
      "aria-label": messages.nextSlide,
      className: cn(navButtonClassName, className),
      "data-slot": "carousel-next",
      onClick: (event) => {
        onClick?.(event);
        if (canNext && !event.defaultPrevented) scrollNext();
      },
      size,
      variant,
      ...props,
      children: children ?? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { "aria-hidden": "true", className: "rtl:-scale-x-100" })
    }
  );
}
function CarouselDots({
  className,
  ...props
}) {
  const { messages } = useUILocale();
  const { count, index, scrollTo } = useCarousel();
  if (count < 2) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("flex items-center", className),
      "data-slot": "carousel-dots",
      ...props,
      children: Array.from({ length: count }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          "aria-current": i === index ? "true" : void 0,
          "aria-label": messages.slideOf(i + 1, count),
          className: "group/dot touch-target relative flex h-6 cursor-pointer items-center rounded-full px-1 outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "data-slot": "carousel-dot",
          onClick: () => scrollTo(i),
          type: "button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block h-1.5 w-1.5 rounded-full bg-foreground/16 transition-[width,background-color] duration-(--qy-duration-base) ease-(--qy-ease-out) group-hover/dot:bg-foreground/32 group-aria-current/dot:w-4 group-aria-current/dot:bg-foreground/72" })
        },
        i
      ))
    }
  );
}
export {
  Carousel as C,
  CarouselContent as a,
  CarouselItem as b,
  CarouselDots as c,
  CarouselPrevious as d,
  CarouselNext as e,
  useCarousel as u
};
