import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { cn } from "../src/utils";
import { Button } from "../src/components/button";
import { InputGroup, InputGroupInput } from "../src/components/input-group";
import { Label } from "../src/components/label";

const roles = ["button", "button-mobile", "button-lg", "button-xs", "field-input", "field-input-mobile", "field-label", "field-label-mobile"];
test.each(roles)("text-%s is a font size that coexists with colour and respects the caller's size", (role) => {
  expect(cn(`text-${role}`, "text-foreground")).toBe(`text-${role} text-foreground`);
  expect(cn(`text-${role}`, "text-sm")).toBe("text-sm");
  expect(cn("text-sm", `text-${role}`)).toBe(`text-${role}`);
  expect(cn(`sm:text-${role}`, "sm:text-muted-foreground", "sm:text-sm")).toBe("sm:text-muted-foreground sm:text-sm");
});

test("real controls retain their size role beside a text colour", () => {
  render(<><Button>Save</Button><Label>Name</Label><InputGroup data-testid="group"><InputGroupInput aria-label="Name" /></InputGroup></>);
  expect(screen.getByRole("button", { name: "Save" })).toHaveClass("text-button-mobile", "text-primary-foreground");
  expect(screen.getByText("Name")).toHaveClass("text-field-label-mobile", "text-foreground");
  expect(screen.getByTestId("group")).toHaveClass("text-field-input-mobile", "text-foreground");
});

test("caller-provided font size and colour replace the corresponding control classes", () => {
  render(<Button className="text-sm text-success-foreground">Save</Button>);
  const button = screen.getByRole("button", { name: "Save" });
  expect(button).toHaveClass("text-sm", "text-success-foreground");
  expect(button).not.toHaveClass("text-button-mobile", "text-primary-foreground");
});

test("the public input text colour coexists with input font sizes and respects colour overrides", () => {
  expect(cn("text-field-input", "text-input")).toBe("text-field-input text-input");
  expect(cn("text-input", "text-field-input")).toBe("text-input text-field-input");
  expect(cn("sm:text-field-input", "sm:text-input")).toBe("sm:text-field-input sm:text-input");
  expect(cn("text-field-input", "text-input", "text-foreground")).toBe("text-field-input text-foreground");
  expect(cn("text-field-input", "text-input", "text-sm")).toBe("text-input text-sm");
});
