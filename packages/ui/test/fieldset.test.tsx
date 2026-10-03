import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { expect, test } from "vitest";
import { Field, FieldLabel } from "../src/components/field";
import { Fieldset, FieldsetLegend } from "../src/components/fieldset";
import { Input } from "../src/components/input";

test("a real legend gives the group its accessible name, separate from field names", () => {
  render(<Fieldset><FieldsetLegend>说明</FieldsetLegend><Field><FieldLabel>名称</FieldLabel><Input /></Field></Fieldset>);
  const group = screen.getByRole("group", {name: "说明"});
  const legend = screen.getByText("说明");
  expect(group.tagName).toBe("FIELDSET");
  expect(legend.tagName).toBe("LEGEND");
  expect(group).toHaveAttribute("aria-labelledby", legend.id);
  expect(screen.getByLabelText("名称")).toHaveAccessibleName("名称");
});

test("disabling the group disables both registered and native controls", () => {
  render(<Fieldset disabled><FieldsetLegend>说明</FieldsetLegend><Field><FieldLabel>名称</FieldLabel><Input defaultValue="原值" /></Field><label>编号<input /></label></Fieldset>);
  expect(screen.getByRole("group", {name: "说明"})).toBeDisabled();
  expect(screen.getByLabelText("名称")).toBeDisabled();
  expect(screen.getByLabelText("编号")).toBeDisabled();
});

test("a common question uses the label variant while each native option keeps its name", () => {
  render(<Fieldset><FieldsetLegend variant="label">选项</FieldsetLegend><label><input type="checkbox" />选项一</label><label><input type="checkbox" />选项二</label></Fieldset>);
  expect(screen.getByText("选项")).toHaveAttribute("data-variant", "label");
  expect(screen.getByRole("group", {name: "选项"})).toBeInTheDocument();
  expect(screen.getByLabelText("选项一")).toHaveAttribute("type", "checkbox");
});

test("render can replace the legend tag while retaining its naming association", () => {
  render(<Fieldset><FieldsetLegend id="shared-name" render={<div />}>名称</FieldsetLegend></Fieldset>);
  expect(screen.getByText("名称").tagName).toBe("DIV");
  expect(screen.getByRole("group", {name: "名称"})).toHaveAttribute("aria-labelledby", "shared-name");
});

test("refs, state functions, native attributes and caller classes reach their owners", () => {
  const ref = createRef<HTMLElement>();
  render(<Fieldset ref={ref} name="example" data-owner="caller" className={state => state.disabled ? "gap-3" : "gap-8"}><FieldsetLegend className="text-title">说明</FieldsetLegend></Fieldset>);
  expect(ref.current).toBe(screen.getByRole("group", {name: "说明"}));
  expect(ref.current).toHaveAttribute("name", "example");
  expect(ref.current).toHaveAttribute("data-owner", "caller");
  expect(ref.current).toHaveClass("gap-8");
  expect(ref.current).not.toHaveClass("gap-(--qy-field-group-gap)");
  expect(screen.getByText("说明")).toHaveClass("text-title");
  expect(screen.getByText("说明")).not.toHaveClass("text-heading");
});
