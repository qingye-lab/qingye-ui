import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Heading, Prose, TextLink } from "../src/components/typography";

test("heading level sets the element, size the visual scale", () => {
  render(
    <>
      <Heading level={1}>门店运营概览</Heading>
      <Heading level={3} size="title">
        徐汇店
      </Heading>
    </>,
  );
  const h1 = screen.getByRole("heading", { level: 1 });
  expect(h1).toHaveAttribute("data-size", "display");
  const h3 = screen.getByRole("heading", { level: 3, name: "徐汇店" });
  expect(h3).toHaveClass("text-title");
});

test("external links open safely in a new tab and say so", () => {
  render(
    <TextLink external href="https://example.com">
      开发者中心
    </TextLink>,
  );
  const link = screen.getByRole("link", { name: /开发者中心/ });
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
  expect(link).toHaveTextContent("在新标签页中打开");
});

test("prose renders through render and keeps its slot", () => {
  render(
    <Prose render={<article />}>
      <p>正文</p>
    </Prose>,
  );
  expect(screen.getByRole("article")).toHaveAttribute("data-slot", "prose");
});
