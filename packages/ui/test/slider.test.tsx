import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { Slider, SliderValue } from "../src/components/slider";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

test("names each thumb of a range slider and drops the English range suffix", () => {
  const { container } = render(
    <Slider defaultValue={[800, 3200]} max={5000} getAriaLabel={(index) => (index === 0 ? "最低价" : "最高价")} />,
  );
  // Thumbs stay visibility:hidden until measured, which jsdom never does, so query the inputs directly.
  const [min, max] = Array.from(container.querySelectorAll<HTMLInputElement>('input[type="range"]'));
  expect(min).toHaveAttribute("aria-label", "最低价");
  expect(min).toHaveAttribute("aria-valuetext", "800");
  expect(max).toHaveAttribute("aria-label", "最高价");
  expect(max).toHaveAttribute("aria-valuenow", "3200");
});

test("formats values with the UI locale rather than the browser", () => {
  const format = { style: "currency", currency: "CNY", maximumFractionDigits: 0 } as const;
  const { unmount } = render(
    <Slider defaultValue={1200} max={5000} format={format} aria-label="预算">
      <SliderValue />
    </Slider>,
  );
  expect(document.querySelector("[data-slot=slider-value]")).toHaveTextContent("¥1,200");
  unmount();
  render(
    <UILocaleProvider locale={enUS}>
      <Slider defaultValue={1200} max={5000} format={format} aria-label="Budget">
        <SliderValue />
      </Slider>
    </UILocaleProvider>,
  );
  expect(document.querySelector("[data-slot=slider-value]")).toHaveTextContent("CN¥1,200");
});
