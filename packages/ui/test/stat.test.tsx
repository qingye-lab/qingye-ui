import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stat, StatDescription, StatLabel, StatUnit, StatValue } from "../src/components/stat";

describe("Stat", () => {
  it("keeps zero separate from its unit and description", () => {
    const { container } = render(<Stat state="known"><StatLabel>数量</StatLabel><StatValue>{0}<StatUnit>项</StatUnit></StatValue><StatDescription>当前值</StatDescription></Stat>);
    expect(container.querySelector("dl > dt")).toHaveTextContent("数量"); expect(container.querySelector("[data-slot=stat-value]")).toHaveTextContent("0项"); expect(screen.getByText("当前值").tagName).toBe("DD");
  });
  it.each(["unknown", "not-applicable"] as const)("preserves %s without manufacturing a number or trend", state => {
    const { container } = render(<Stat state={state}><StatLabel>数量</StatLabel><StatValue>{state}</StatValue></Stat>); expect(container.firstChild).toHaveAttribute("data-state", state); expect(screen.queryByText("0")).toBeNull(); expect(container.querySelector("[data-slot=stat-unit]")).toBeNull();
  });
});
