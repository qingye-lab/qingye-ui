import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AvatarGroup } from "../src/components/avatar-group";

const people = [{ label: "王一" }, { label: "李二" }, { label: "张三" }, { label: "赵四" }, { label: "钱五" }, { label: "孙六" }, { label: "周七" }];

describe("AvatarGroup", () => {
  it("is a named group whose members keep their own names", () => {
    render(<AvatarGroup aria-label="项目成员" items={people.slice(0, 3)} />);
    const group = screen.getByRole("group", { name: "项目成员" });
    expect(group.querySelectorAll('[role="img"]')).toHaveLength(3);
    expect(screen.getByRole("img", { name: "李二" })).toHaveTextContent("李");
  });

  it("collapses members beyond max into a +N that names every hidden person", () => {
    render(<AvatarGroup aria-label="项目成员" items={people} max={4} />);
    expect(screen.queryByRole("img", { name: "钱五" })).toBeNull();
    const more = screen.getByRole("img", { name: "另有 3 位：钱五、孙六、周七" });
    expect(more).toHaveTextContent("+3");
  });

  it("shows no +N when everyone fits", () => {
    render(<AvatarGroup aria-label="项目成员" items={people.slice(0, 2)} max={2} />);
    expect(screen.getAllByRole("img")).toHaveLength(2);
    expect(screen.queryByText(/^\+/)).toBeNull();
  });

  it("requires a name for the group and a label for each person", () => {
    // @ts-expect-error the group name is required at runtime too
    expect(() => render(<AvatarGroup items={people} />)).toThrow(/aria-label or aria-labelledby/);
    expect(() => render(<AvatarGroup aria-label="成员" items={[{ label: " " }]} />)).toThrow(/items\[0\].*label/);
  });
});
