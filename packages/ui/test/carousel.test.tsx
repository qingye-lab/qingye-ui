import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../src/components/carousel";

const WIDTH = 300;

/** jsdom has no layout: give the track and slides real-looking geometry. */
function layout(count: number) {
  const track = document.querySelector<HTMLDivElement>("[data-slot=carousel-content]")!;
  let scrollLeft = 0;
  Object.defineProperty(track, "scrollLeft", {
    configurable: true,
    get: () => scrollLeft,
    set: (value: number) => {
      scrollLeft = value;
    },
  });
  Object.defineProperty(track, "clientWidth", { configurable: true, value: WIDTH });
  Object.defineProperty(track, "scrollWidth", { configurable: true, value: WIDTH * count });
  track.getBoundingClientRect = () => ({ left: 0, right: WIDTH, top: 0, bottom: 200, width: WIDTH, height: 200, x: 0, y: 0, toJSON() {} });
  Array.from(track.children).forEach((item, i) => {
    (item as HTMLElement).getBoundingClientRect = () => {
      const left = i * WIDTH - scrollLeft;
      return { left, right: left + WIDTH, top: 0, bottom: 200, width: WIDTH, height: 200, x: left, y: 0, toJSON() {} };
    };
  });
  const scrollTo = vi.fn((options: ScrollToOptions) => {
    scrollLeft = options.left ?? 0;
    track.dispatchEvent(new Event("scroll"));
  });
  track.scrollTo = scrollTo as unknown as typeof track.scrollTo;
  return { scrollTo, track };
}

const frame = () => act(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));

function Gallery(props: { onIndexChange?: (index: number) => void }) {
  return (
    <Carousel aria-label="新品推荐" {...props}>
      <CarouselContent>
        {["云台相机", "降噪耳机", "机械键盘", "便携屏"].map((name) => (
          <CarouselItem key={name}>{name}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots />
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

test("exposes carousel and slide semantics from the locale", () => {
  render(<Gallery />);
  const region = screen.getByRole("region", { name: "新品推荐" });
  expect(region).toHaveAttribute("aria-roledescription", "轮播");
  const slides = screen.getAllByRole("group");
  expect(slides).toHaveLength(4);
  expect(slides[0]).toHaveAttribute("aria-roledescription", "幻灯片");
  expect(slides[0]).toHaveAccessibleName("第 1 张，共 4 张");
});

test("buttons scroll one position and disable at the ends", async () => {
  const onIndexChange = vi.fn();
  render(<Gallery onIndexChange={onIndexChange} />);
  const { scrollTo, track } = layout(4);
  fireEvent.scroll(track);
  await frame();

  const previous = screen.getByRole("button", { name: "上一张" });
  const next = screen.getByRole("button", { name: "下一张" });
  expect(previous).toHaveAttribute("aria-disabled", "true");
  expect(next).not.toHaveAttribute("aria-disabled");
  expect(screen.getAllByRole("button", { name: /^第 \d 张/ })).toHaveLength(4);

  await userEvent.click(next);
  expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ left: WIDTH }));
  await frame();
  expect(onIndexChange).toHaveBeenLastCalledWith(1);
  expect(screen.getByRole("button", { name: "第 2 张，共 4 张" })).toHaveAttribute("aria-current", "true");
  expect(previous).not.toHaveAttribute("aria-disabled");

  await userEvent.click(screen.getByRole("button", { name: "第 4 张，共 4 张" }));
  await frame();
  expect(next).toHaveAttribute("aria-disabled", "true");
  // Focus stays on a disabled-looking button, and pressing it does nothing.
  next.focus();
  scrollTo.mockClear();
  await userEvent.keyboard("{Enter}");
  expect(scrollTo).not.toHaveBeenCalled();
  expect(next).toHaveFocus();
});

test("arrow keys move between slides", async () => {
  render(<Gallery />);
  const { scrollTo, track } = layout(4);
  fireEvent.scroll(track);
  await frame();

  fireEvent.keyDown(track, { key: "ArrowRight" });
  expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ left: WIDTH }));
  await frame();
  fireEvent.keyDown(track, { key: "ArrowLeft" });
  expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ left: 0 }));
});

test("hides dots when every slide fits and sizes slides from slidesPerView", () => {
  render(
    <Carousel aria-label="合作伙伴" gap={2} slidesPerView={3}>
      <CarouselContent>
        <CarouselItem>青烟科技</CarouselItem>
        <CarouselItem>远山设计</CarouselItem>
      </CarouselContent>
      <CarouselDots />
    </Carousel>,
  );
  const region = screen.getByRole("region", { name: "合作伙伴" });
  expect(region.style.getPropertyValue("--carousel-per-view")).toBe("3");
  expect(region.style.getPropertyValue("--carousel-gap")).toBe("calc(var(--spacing) * 2)");
  expect(document.querySelector("[data-slot=carousel-dots]")).toBeNull();
});

test("starts at defaultIndex without animating", async () => {
  render(
    <Carousel aria-label="新品推荐" defaultIndex={2}>
      <CarouselContent>
        <CarouselItem>一</CarouselItem>
        <CarouselItem>二</CarouselItem>
        <CarouselItem>三</CarouselItem>
      </CarouselContent>
    </Carousel>,
  );
  const { scrollTo, track } = layout(3);
  fireEvent.scroll(track);
  await frame();
  await waitFor(() =>
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ behavior: "instant", left: WIDTH * 2 })),
  );
});
