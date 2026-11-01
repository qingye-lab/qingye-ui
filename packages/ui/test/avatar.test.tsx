import { act, render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Avatar, AvatarFallback, AvatarImage } from "../src/components/avatar";
import { Button } from "../src/components/button";
test("fallback is the same named identity sample when no image is available", () => {
  render(<Avatar label="图像"><AvatarImage /><AvatarFallback>图</AvatarFallback></Avatar>);
  expect(screen.getByRole("img", { name: "图像" })).toHaveTextContent("图");
});
test("actual image load and error events switch the same object's representation", async () => {
  const images: HTMLImageElement[] = [];
  const Constructor = window.Image;
  const mocked = vi.spyOn(window, "Image").mockImplementation(function () { const node = new Constructor(); images.push(node); return node; });
  try {
    const fixture = (src: string) => <Avatar label="图像"><AvatarImage src={src} /><AvatarFallback>图</AvatarFallback></Avatar>;
    const { rerender, container } = render(fixture("/one.svg"));
    await act(async () => { images[0]!.dispatchEvent(new Event("load")); });
    await waitFor(() => expect(container.querySelector("[data-slot=avatar-image]")).toBeInTheDocument());
    expect(container.querySelector("img")).toHaveAttribute("src", "/one.svg");
    rerender(fixture("/two.svg"));
    await act(async () => { images.at(-1)!.dispatchEvent(new Event("error")); });
    await waitFor(() => expect(screen.getByRole("img", { name: "图像" })).toHaveTextContent("图"));
  } finally { mocked.mockRestore(); }
});
test("an empty identity name is rejected instead of fabricating a person", () => {
  expect(() => render(<Avatar label=" "><AvatarFallback>?</AvatarFallback></Avatar>)).toThrow("non-empty label");
});
test("inside a button the avatar's label is the button's name once, and the button owns the focus", () => {
  render(<Button variant="quiet" shape="icon"><Avatar label="王一"><AvatarFallback>王</AvatarFallback></Avatar></Button>);
  const button = screen.getByRole("button", { name: "王一" });
  expect(button.querySelector('[data-slot="avatar"]')).not.toHaveAttribute("tabindex");
});
test("an outer aria-label names the action and replaces the avatar's name for the button", () => {
  render(<Button variant="quiet" shape="icon" aria-label="打开王一的资料"><Avatar label="王一"><AvatarFallback>王</AvatarFallback></Avatar></Button>);
  expect(screen.getByRole("button", { name: "打开王一的资料" })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "王一" })).toBeNull();
});
