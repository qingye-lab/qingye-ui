import "./_env";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LastSignIn } from "../LastSignIn";

const NOW = new Date("2026-11-01T10:00:00+08:00");
const AT = new Date("2026-11-01T09:57:00+08:00");

describe("T15 LastSignIn", () => {
  it("[behavior] 以相对说法显示“最近登录”", () => {
    const { container } = render(<LastSignIn at={AT} now={NOW} />);
    const text = container.textContent ?? "";
    expect(text).toContain("最近登录");
    expect(text).toMatch(/3\s*分钟前/);
  });

  it("[a11y] LastSignIn 读屏文字包含绝对时间", () => {
    const { container } = render(<LastSignIn at={AT} now={NOW} />);
    // 库把绝对时间放进仅读屏文字（textContent 包含，且不只放在 title 属性里）
    const time = container.querySelector("time");
    expect(time).toBeTruthy();
    const text = time!.textContent ?? "";
    expect(text).toMatch(/2026/);
    expect(time!.getAttribute("datetime")).toBeTruthy();
  });

  it("[api] LastSignIn 来自库（带 data-slot）", () => {
    const { container } = render(<LastSignIn at={AT} now={NOW} />);
    const time = container.querySelector("time");
    expect(time?.getAttribute("data-slot")).toBe("relative-time");
  });
});
