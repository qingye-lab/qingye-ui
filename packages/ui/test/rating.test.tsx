import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import { Field, FieldLabel } from "../src/components/field";
import { Rating } from "../src/components/rating";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

const star = (n: number) => screen.getByRole("radio", { name: `${n} 星` });

test("is a named radio group with max stars, default 5, nothing checked", () => {
  render(<Rating />);
  expect(screen.getByRole("radiogroup", { name: "评分" })).toBeInTheDocument();
  expect(screen.getAllByRole("radio")).toHaveLength(5);
  screen.getAllByRole("radio").forEach(radio => expect(radio).toHaveAttribute("aria-checked", "false"));
});

test("max sets the number of stars and rejects invalid values", () => {
  render(<Rating max={3} />);
  expect(screen.getAllByRole("radio")).toHaveLength(3);
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<Rating max={0} />)).toThrow(RangeError);
  expect(() => render(<Rating max={2.5} />)).toThrow(RangeError);
  expect(() => render(<Rating value={9} />)).toThrow(RangeError);
  error.mockRestore();
});

test("clicking a star selects that score (uncontrolled) and reports it", async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  render(<Rating onValueChange={onValueChange} />);
  await user.click(star(3));
  expect(star(3)).toHaveAttribute("aria-checked", "true");
  expect(onValueChange).toHaveBeenCalledWith(3);
});

test("defaultValue is the initial score", () => {
  render(<Rating defaultValue={4} />);
  expect(star(4)).toHaveAttribute("aria-checked", "true");
});

test("clicking the current score clears it, and allowClear={false} turns that off", async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  const { unmount } = render(<Rating defaultValue={2} onValueChange={onValueChange} />);
  await user.click(star(2));
  expect(star(2)).toHaveAttribute("aria-checked", "false");
  expect(onValueChange).toHaveBeenLastCalledWith(0);
  unmount();
  render(<Rating defaultValue={2} allowClear={false} />);
  await user.click(star(2));
  expect(star(2)).toHaveAttribute("aria-checked", "true");
});

test("arrow keys move and select between stars", async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  render(<Rating defaultValue={2} onValueChange={onValueChange} />);
  star(2).focus();
  await user.keyboard("{ArrowRight}");
  expect(star(3)).toHaveAttribute("aria-checked", "true");
  expect(onValueChange).toHaveBeenLastCalledWith(3);
  await user.keyboard("{ArrowLeft}{ArrowLeft}");
  expect(star(1)).toHaveAttribute("aria-checked", "true");
});

test("controlled value is not changed by clicks until the parent updates", async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  const { rerender } = render(<Rating value={1} onValueChange={onValueChange} />);
  await user.click(star(4));
  expect(onValueChange).toHaveBeenCalledWith(4);
  expect(star(1)).toHaveAttribute("aria-checked", "true");
  rerender(<Rating value={4} onValueChange={onValueChange} />);
  expect(star(4)).toHaveAttribute("aria-checked", "true");
});

test("controlled use works through state, including clearing", async () => {
  const user = userEvent.setup();
  function Controlled() {
    const [value, setValue] = useState(0);
    return <><Rating value={value} onValueChange={setValue} /><output>{value}</output></>;
  }
  render(<Controlled />);
  await user.click(star(5));
  expect(screen.getByRole("status")).toHaveTextContent("5");
  await user.click(star(5));
  expect(screen.getByRole("status")).toHaveTextContent("0");
});

test("disabled stars cannot be chosen", async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  render(<Rating disabled onValueChange={onValueChange} />);
  await user.click(star(3));
  expect(onValueChange).not.toHaveBeenCalled();
});

test("readOnly is an image named with the score plus the visible text, with no radios", () => {
  render(<Rating readOnly value={4} />);
  expect(screen.queryByRole("radio")).toBeNull();
  expect(screen.getByRole("img", { name: "评分 4 / 5" })).toBeInTheDocument();
  expect(screen.getByText("4 / 5")).toBeInTheDocument();
});

test("readOnly with no score says it is not rated", () => {
  render(<Rating readOnly />);
  expect(screen.getByRole("img", { name: "未评分" })).toBeInTheDocument();
});

test("name submits the chosen score with the form", async () => {
  const user = userEvent.setup();
  render(<form aria-label="f"><Rating name="score" /></form>);
  await user.click(star(4));
  const form = screen.getByRole("form", { name: "f" }) as HTMLFormElement;
  expect(new FormData(form).get("score")).toBe("4");
});

test("readOnly keeps the caller's root props, and the interactive group keeps the caller's pointer-leave handler", async () => {
  const { unmount } = render(<Rating readOnly value={2} aria-describedby="hint" data-test="r" style={{ marginTop: 3 }} />);
  const root = document.querySelector("[data-slot=rating]")!;
  expect(root).toHaveAttribute("aria-describedby", "hint"); expect(root).toHaveAttribute("data-test", "r"); expect(root).toHaveStyle({ marginTop: "3px" });
  unmount();
  const onPointerLeave = vi.fn(); const user = userEvent.setup();
  render(<Rating onPointerLeave={onPointerLeave} />);
  await user.hover(star(3)); await user.unhover(screen.getByRole("radiogroup"));
  expect(onPointerLeave).toHaveBeenCalled();
});

test("readOnly with a name still submits the score", () => {
  render(<form aria-label="f"><Rating readOnly value={3} name="score" /></form>);
  expect(new FormData(screen.getByRole("form", { name: "f" }) as HTMLFormElement).get("score")).toBe("3");
});

test("is named by a Field label and keeps its own star names", () => {
  render(<Field><FieldLabel>服务态度</FieldLabel><Rating aria-label={undefined} /></Field>);
  expect(screen.getAllByRole("radio")).toHaveLength(5);
  expect(star(1)).toBeInTheDocument();
});

test("names follow the locale", () => {
  render(<UILocaleProvider locale={enUS}><Rating /></UILocaleProvider>);
  expect(screen.getByRole("radiogroup", { name: "Rating" })).toBeInTheDocument();
  expect(screen.getByRole("radio", { name: "1 star" })).toBeInTheDocument();
  expect(screen.getByRole("radio", { name: "2 stars" })).toBeInTheDocument();
});
