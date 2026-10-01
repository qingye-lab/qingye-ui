import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import { inspectColors } from "./color-check";

const classSource = (value: string) => `export const Demo = () => <div className={${JSON.stringify(value)}} />;`;
const hits = (source: string) => inspectColors(source).violations.map((hit) => hit.value);

describe("AST colour inspection", () => {
  test.each([
    "bg-zinc-900", "bg-[#191919]", "bg-[rgb(25,25,25)]", "bg-[oklch(0.5_0_0)]",
    "dark:hover:bg-[#191919]", "text-[#abcd]", "border-[#19191980]", "[color:#191919]",
    "shadow-[0_1px_rgb(25,25,25)]", "[&[data-x='#fff']]:bg-[#191919]",
    "ring-[hsl(0_0%_10%)]", "bg-[color(display-p3_0_0_0)]", "[&:hover]:ring-offset-zinc-900", "border-t-zinc-900", "border-b-zinc-900", "border-l-zinc-900", "border-r-zinc-900",
  ])("reports paint utility %s", (value) => {
    expect(hits(classSource(value))).toContain(value);
  });

  test.each([
    "bg-primary", '[data-x="#fff"]', '[&[data-x="#fff"]]:bg-primary',
    "text-[color:var(--x)]", "bg-[var(--qy-primary)]", "bg-[url('/icons.svg#fff')]",
    "text-[18px]", "grid-cols-[1fr_2fr]", "before:shadow-[0_1px_--theme(--color-black/4%)]",
  ])("allows selector or token utility %s", (value) => {
    expect(hits(classSource(value))).toEqual([]);
  });

  test.each(["#191919", "rgb(25,25,25)", "oklch(0.5 0 0)", "#abcd", "#19191980"])("reports inline style colour %s", (value) => {
    expect(hits(`const Demo = () => <div style={{ color: ${JSON.stringify(value)} }} />`)).toEqual([value]);
  });

  test("ignores nonpaint strings, comments, links, and style geometry", () => {
    expect(hits(`// bg-[#191919]\nconst message = 'rgb(25,25,25)'; const Demo = () => <a href="#fff" data-x="#fff" style={{ width: 'rgb(25,25,25)' }}>bg-zinc-900</a>`)).toEqual([]);
  });

  test("follows cn conditions, object keys, and arrays", () => {
    expect(hits(`const Demo = () => <div className={cn(active && 'bg-[#191919]', ['text-primary', 'border-zinc-900'], { 'ring-[rgb(0,0,0)]': active })} />`)).toEqual(expect.arrayContaining(["bg-[#191919]", "border-zinc-900", "ring-[rgb(0,0,0)]"]));
  });

  test("checks cva base, variants and compound variants but not variant names", () => {
    expect(hits(`const variants = cva('bg-primary', { variants: { tone: { 'bg-zinc-900': 'text-primary', bad: 'bg-[#191919]' } }, defaultVariants: { tone: 'bg-zinc-900' }, compoundVariants: [{ tone: 'bg-zinc-900', className: 'text-[rgb(0,0,0)]' }] });`)).toEqual(["bg-[#191919]", "text-[rgb(0,0,0)]"]);
  });

  test("resolves lexical constants and static template expressions", () => {
    expect(hits("const color = '#191919'; const Demo = () => <div className={`bg-[${color}]`} />;")).toEqual(["bg-[#191919]"]);
    expect(hits("function A() { const classes = 'bg-[#191919]'; return <div className={classes}/>; } function B() { const classes = 'bg-primary'; return <div className={classes}/>; }")).toEqual(["bg-[#191919]"]);
  });

  test("checks known template fragments and records unknown runtime values", () => {
    const result = inspectColors("const Demo = () => <div className={`bg-[#191919] ${customClass} text-primary`} />;");
    expect(result.violations.map((hit) => hit.value)).toEqual(["bg-[#191919]"]);
    expect(result.unresolved).toContain("customClass");
    expect(inspectColors("const Demo = () => <div className={`bg-[${runtimeColor}]`} />;").unresolved).toContain("runtimeColor");
  });

  test("follows a style object and its spreads", () => {
    expect(hits(`const base = { color: '#191919' }; const styles = { ...base, backgroundColor: 'rgb(0,0,0)', width: '32px' }; const Demo = () => <div style={styles}/>;`)).toEqual(["#191919", "rgb(0,0,0)"]);
  });

  test("checks render-prop object className and style contexts", () => {
    expect(hits(`const defaults = { className: 'bg-[#191919]', style: { color: 'rgb(0,0,0)' } }; return useRender({ props: defaults });`)).toEqual(["bg-[#191919]", "rgb(0,0,0)"]);
  });

  test("resolves computed cn class keys", () => {
    expect(hits(`const key = 'bg-[#191919]'; const Demo = () => <div className={cn({ [key]: active })} />`)).toContain("bg-[#191919]");
  });

  test.each(["border", "borderTop", "outline", "background"])("checks style shorthand %s", (property) => {
    expect(hits(`const Demo = () => <div style={{ ${property}: '1px solid #fff' }}/>;`)).toEqual(["1px solid #fff"]);
  });

  test.each(["color", "{color}", "[color]"])("records parameter shadowing %s as unresolved", (parameter) => {
    const result = inspectColors("const color = '#fff'; function Demo(" + parameter + ") { return <div className={`bg-[${color}]`}/>; }");
    expect(result.violations).toEqual([]);
    expect(result.unresolved).toContain("color");
  });

  test("records destructured local bindings as unresolved instead of reading outer constants", () => {
    const result = inspectColors("const color = '#fff'; function Demo(props) { const {color} = props; return <div className={`bg-[${color}]`}/>; }");
    expect(result.violations).toEqual([]);
    expect(result.unresolved).toContain("color");
  });

  test("retains accurate source line and context", () => {
    expect(inspectColors("const Demo = () => (\n<div style={{ color: '#191919' }}/>\n);").violations).toEqual([{ line: 2, value: "#191919", context: "style" }]);
  });

  test("all existing component sources avoid literal paint values", () => {
    const dir = join(__dirname, '..', 'src', 'components');
    const files = readdirSync(dir).filter((file) => /\.tsx?$/.test(file));
    const violations = files.flatMap((file) => inspectColors(readFileSync(join(dir, file), 'utf8'), file).violations.map((hit) => ({ file, ...hit })));
    expect(violations).toEqual([]);
    expect(files.length).toBeGreaterThan(0);
  });
});
