import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ImagePreview } from "../src/components/image-preview";

const images = [
  { src: "/a.png", alt: "海边日出" },
  { src: "/b.png", alt: "山间小路" },
  { src: "/c.png", alt: "雨后街道" },
];

describe("ImagePreview", () => {
  it("opens a dialog named after the image and returns focus to the original thumbnail", async () => {
    const user = userEvent.setup();
    render(<ImagePreview images={images} />);
    const thumbnail = screen.getByRole("button", { name: "山间小路" });
    await user.click(thumbnail);
    const dialog = await screen.findByRole("dialog", { name: "山间小路" });
    expect(within(dialog).getByRole("img", { name: "山间小路" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(thumbnail).toHaveFocus());
  });

  it("moves between images with buttons and arrow keys, stopping at the ends", async () => {
    const user = userEvent.setup();
    render(<ImagePreview images={images} />);
    await user.click(screen.getByRole("button", { name: "海边日出" }));
    const dialog = await screen.findByRole("dialog", { name: "海边日出" });
    expect(within(dialog).getByRole("button", { name: "上一张" })).toHaveAttribute("aria-disabled", "true");
    await user.click(within(dialog).getByRole("button", { name: "下一张" }));
    expect(await screen.findByRole("dialog", { name: "山间小路" })).toBeInTheDocument();
    await user.keyboard("{ArrowRight}");
    expect(await screen.findByRole("dialog", { name: "雨后街道" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "下一张" })).toHaveAttribute("aria-disabled", "true");
    await user.keyboard("{ArrowLeft}");
    expect(await screen.findByRole("dialog", { name: "山间小路" })).toBeInTheDocument();
  });

  it("returns focus to the thumbnail that opened it even after switching images", async () => {
    const user = userEvent.setup();
    render(<ImagePreview images={images} />);
    const first = screen.getByRole("button", { name: "海边日出" });
    await user.click(first);
    await screen.findByRole("dialog");
    await user.keyboard("{ArrowRight}");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(first).toHaveFocus());
  });

  it("zooms with buttons and keys, and the fit key restores", async () => {
    const user = userEvent.setup();
    render(<ImagePreview images={images.slice(0, 1)} />);
    await user.click(screen.getByRole("button", { name: "海边日出" }));
    const dialog = await screen.findByRole("dialog");
    const stage = dialog.querySelector('[data-slot="image-preview-stage"]')!;
    expect(stage).toHaveAttribute("data-zoom", "1");
    expect(within(dialog).queryByRole("button", { name: "上一张" })).toBeNull();
    await user.click(within(dialog).getByRole("button", { name: "放大" }));
    expect(stage).toHaveAttribute("data-zoom", "2");
    expect(stage).toHaveAttribute("tabindex", "0");
    await user.keyboard("+");
    expect(stage).toHaveAttribute("data-zoom", "3");
    await user.keyboard("0");
    expect(stage).toHaveAttribute("data-zoom", "1");
  });

  it("shows readable text when the large image fails to load", async () => {
    const user = userEvent.setup();
    render(<ImagePreview images={images.slice(0, 1)} />);
    await user.click(screen.getByRole("button", { name: "海边日出" }));
    const dialog = await screen.findByRole("dialog");
    fireEvent.error(within(dialog).getByRole("img", { name: "海边日出" }));
    expect(await within(dialog).findByText("图片加载失败")).toBeInTheDocument();
  });

  it("requires an alt for every image", () => {
    expect(() => render(<ImagePreview images={[{ src: "/a.png", alt: " " }]} />)).toThrow(/images\[0\].*alt/);
  });
});
