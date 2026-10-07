import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import { boundaryFillCouplings, checkPair, composite, contrast, inspectSourceContrast, libraryPairs, resolveColor, tokenValues } from "./contrast-check";

const root = join(__dirname, "..");
const sources = ["tokens/primitives.css", "tokens/semantic.css"].map((path) => readFileSync(join(root, path), "utf8"));

describe("resolved library contrast", () => {
  test("control fills use surface roles independently of boundary paint", () => {
    const dir = join(root, "src/components");
    const hits = readdirSync(dir).filter((name) => name.endsWith(".tsx")).flatMap((name) => boundaryFillCouplings(readFileSync(join(dir, name), "utf8"), name));
    expect(hits).toEqual([]);
    expect(boundaryFillCouplings(`// border-input dark:bg-input/32\nconst label='border-input dark:bg-input/32';`)).toEqual([]);
    expect(boundaryFillCouplings(`const variants=cva('',{variants:{tone:{outline:'border-input dark:bg-input/32'}}});`)).toHaveLength(1);
    expect(boundaryFillCouplings(`const D=()=> <input className="border-input aria-invalid:border-destructive/36"/>;`)).toHaveLength(1);
    expect(boundaryFillCouplings(`const D=()=> <div className="border-input dark:bg-surface-inset"/>;`)).toEqual([]);
  });
  test.each(["light", "dark"] as const)("%s: real role pairs meet their thresholds", (appearance) => {
    const tokens = tokenValues(sources, appearance);
    const results = libraryPairs(appearance).map((pair) => checkPair(pair, tokens));
    // Known library pairs becoming unresolved is a failed gate, never a pass.
    expect(results.filter((r) => r.status !== "PASS")).toEqual([]);
    const dir = join(root, "src/components");
    const sourceResults = readdirSync(dir).filter((name) => name.endsWith(".tsx")).flatMap((name) => inspectSourceContrast(readFileSync(join(dir, name), "utf8"), tokens, name));
    expect(sourceResults.filter((r) => r.status === "FAIL")).toEqual([]);
    console.info(`contrast ${appearance}: ${results.length} library pairs PASS; ${sourceResults.filter((r) => r.status === "UNVERIFIED").length} source contexts UNVERIFIED (runtime/inherited cascade; require browser evidence)`);
  });

  test("regressions in both declarations and primitive aliases fail", () => {
    const tokens = tokenValues(sources, "dark");
    tokens.set("--qy-border-input", "oklch(1 0 0 / 0.08)");
    expect(libraryPairs("dark").map((p) => checkPair(p, tokens)).some((r) => r.status === "FAIL" && r.pair.startsWith("border-input"))).toBe(true);
    const light = tokenValues(sources, "light");
    // chart-2 引用赭石 500（2026-10-07 系列色取颜料）；把它改浅，别名链上的回归必须被发现。
    light.set("--qy-zheshi-500", "oklch(0.9 0.05 45)");
    expect(checkPair({ pair: "changed chart primitive", foreground: "var(--qy-chart-2)", background: ["var(--qy-surface)"], minimum: 3 }, light).status).toBe("FAIL");
    tokens.set("--qy-foreground-muted", "color-mix(in srgb, var(--qy-neutral-500) 80%, var(--qy-white))");
    expect(libraryPairs("dark").map((p) => checkPair(p, tokens)).some((r) => r.status === "FAIL" && r.minimum === 4.5 && r.pair.includes("surface-raised"))).toBe(true);
  });

  test("aliases, nested fallbacks, appearance cascade and premultiplied alpha resolve", () => {
    const tokens = tokenValues([`:root{--base:#000;--a:var(--missing,var(--base));}.dark,[data-theme="dark"]{--base:rgb(255 255 255)}:root,.light,.dark,[data-theme]{--soft:color-mix(in srgb,var(--a) 20%,transparent)}`], "dark");
    expect(resolveColor("var(--soft)", tokens)).toEqual([1, 1, 1, 0.2]);
    expect(resolveColor("color-mix(in srgb,#f008 25%,#00f 75%)", tokens)[3]).toBeCloseTo(0.8833333);
    expect(contrast([0, 0, 0, 1], [1, 1, 1, 1])).toBe(21);
    expect(resolveColor("oklch(0.5 0 0)", tokens)[0]).toBeCloseTo(0.38857, 4);
  });

  test("alpha text and multiple backgrounds are composited before luminance", () => {
    const tokens = new Map<string, string>();
    const actual = checkPair({ pair: "alpha on layered fill", foreground: "rgb(0 0 0 / 0.5)", background: ["white", "rgb(0 0 0 / 0.2)"], minimum: 4.5 }, tokens);
    expect(actual.ratio).toBeCloseTo(contrast(composite([0, 0, 0, 0.5], [0.8, 0.8, 0.8, 1]), [0.8, 0.8, 0.8, 1]), 10);
    expect(checkPair({ pair: "below threshold must not round up", foreground: "rgb(119 119 119)", background: ["white"], minimum: 4.5 }, tokens).status).toBe("FAIL");
  });

  test.each([[], ["transparent"], ["rgb(255 255 255 / 0.5)"], ["var(--runtime-backdrop)"], ["linear-gradient(white,black)"]])("unknown backdrop %s is UNVERIFIED", (background) => {
    expect(checkPair({ pair: "unknown", foreground: "black", background, minimum: 4.5 }, new Map()).status).toBe("UNVERIFIED");
  });
  test.each(["currentColor", "var(--runtime-color)", "color(display-p3 1 0 0)", "light-dark(white, black)"])("unsupported/runtime foreground %s is UNVERIFIED", (foreground) => {
    expect(checkPair({ pair: "unknown", foreground, background: ["white"], minimum: 4.5 }, new Map()).status).toBe("UNVERIFIED");
  });
  test("cycles and conditional token cascades are UNVERIFIED", () => {
    expect(checkPair({ pair: "cycle", foreground: "var(--a)", background: ["white"], minimum: 4.5 }, new Map([["--a", "var(--b)"], ["--b", "var(--a)"]])).status).toBe("UNVERIFIED");
    const conditional = tokenValues(["@media (prefers-contrast:more){:root{--a:white}}"], "light");
    expect(checkPair({ pair: "conditional", foreground: "var(--a)", background: ["white"], minimum: 4.5 }, conditional).status).toBe("UNVERIFIED");
  });

  test("AST checks actual JSX paint, not comments, prose or unrelated strings", () => {
    const tokens = tokenValues(sources, "light");
    const source = `// <span className="bg-card text-warning"/>
      const prose = 'bg-card text-warning'; const D = () => <span className="bg-card text-warning">State</span>;`;
    expect(inspectSourceContrast(source, tokens)).toHaveLength(1);
    tokens.set("--qy-warning", "var(--qy-amber-500)");
    expect(inspectSourceContrast(source, tokens)[0]?.status).toBe("FAIL");
  });
  test.each([
    '<span className="text-muted-foreground"/>',
    '<span className="bg-surface-inset text-muted-foreground"/>',
    '<span className={runtimeClasses}/>',
    '<span style={{color: runtimeColor}}/>',
    '<span {...props}/>',
    '<span className="bg-card text-muted-foreground opacity-80"/>',
    '<span className="bg-card text-muted-foreground hover:bg-accent"/>',
    '<Card className="bg-card text-muted-foreground"/>',
    '<span className="bg-card text-muted-foreground" style={runtimeStyle}/>',
    '<span className="bg-card text-muted-foreground" {...props}/>',
    '<div className="opacity-80"><span className="bg-card text-muted-foreground"/></div>',
    '<Card><span className="bg-card text-muted-foreground"/></Card>',
    '<span className="bg-card text-muted-foreground bg-linear-to-r from-warning to-danger"/>',
    '<svg fill={runtimeColor}/>',
    '<span className="bg-current text-current"/>',
    '<span className="bg-[var(--runtime-background)] text-[var(--runtime-color)]"/>',
    '<span className="bg-runtime-background text-runtime-color"/>',
    '<svg className="fill-current stroke-current"/>',
  ])("AST retains unresolved context %s", (source) => {
    const results = inspectSourceContrast(source, tokenValues(sources, "dark"));
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((r) => r.status === "UNVERIFIED")).toBe(true);
  });
});
