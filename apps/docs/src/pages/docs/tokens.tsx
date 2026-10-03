import themeCss from "@qingye/ui/theme.css?raw";
import componentsCss from "@qingye/ui/tokens/components.css?raw";
import semanticCss from "@qingye/ui/tokens/semantic.css?raw";
import { Button } from "@qingye/ui/components/button";
import { cn } from "@qingye/ui/utils";
import { useMediaQuery } from "@qingye/ui/hooks/use-media-query";
import { PlayIcon, RotateCcwIcon } from "lucide-react";
import { Fragment, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { A, Code, H2, H3, P, PageHeader } from "@/components/prose";
import { CodeBlock } from "@/components/code-block";
import { repoFile } from "@/lib/site";

// Names and utility aliases are extracted from the current library CSS.
const tokenNames = (css: string, pattern: RegExp) => [...new Set([...css.matchAll(pattern)].map((match) => match[1]!))];

const colorNames = tokenNames(semanticCss, /--qy-([a-z0-9-]+)\s*:/g).filter((name) => !name.startsWith("shadow-"));
const shadowNames = tokenNames(semanticCss, /--qy-(shadow-[a-z0-9-]+)\s*:/g);
const textRoles = tokenNames(componentsCss, /--qy-text-([a-z0-9-]+)-size\s*:/g);
const spaceNames = tokenNames(componentsCss, /--qy-(space-\d+)\s*:/g);
const radiusNames = tokenNames(componentsCss, /--qy-(radius(?:-[a-z0-9]+)?)\s*:/g);
const controlNames = tokenNames(componentsCss, /--qy-(control-[a-z]+)\s*:/g);
const densityNames = ["touch-target", "row-default", "row-compact", "panel-padding", "panel-padding-sm", "panel-gap", "section-gap", "topbar-height"].filter(
  (name) => componentsCss.includes(`--qy-${name}:`),
);
const focusNames = tokenNames(componentsCss, /--qy-(focus-[a-z-]+)\s*:/g);
const durationNames = tokenNames(componentsCss, /--qy-(duration-[a-z]+)\s*:/g);
const easeNames = tokenNames(componentsCss, /--qy-(ease-[a-z-]+)\s*:/g);

// Stable lists for the readers below (they are effect dependencies).
const typeTokens = textRoles.flatMap((role) => [`text-${role}-size`, `text-${role}-leading`]);
const controlTokens = [...controlNames, "control-mobile-extra", ...densityNames];
const motionTokens = [...durationNames, ...easeNames, "stagger"];

/** `--qy-primary` → the Tailwind colour names that read it (`primary`). */
const utilityFor = (() => {
  const map = new Map<string, string[]>();
  for (const [, color, token] of themeCss.matchAll(/--color-([a-z0-9-]+):\s*var\(--qy-([a-z0-9-]+)\)/g)) {
    map.set(token!, [...(map.get(token!) ?? []), color!]);
  }
  return (token: string) => map.get(token) ?? [];
})();

const COLOR_GROUPS: { title: string; id: string; test: (name: string) => boolean }[] = [
  { title: "页面与表面", id: "color-surface", test: (n) => /^(background|surface|overlay)/.test(n) },
  { title: "文字", id: "color-text", test: (n) => /^foreground/.test(n) },
  { title: "线条与焦点", id: "color-lines", test: (n) => /^(border|ring)/.test(n) },
  { title: "强调", id: "color-emphasis", test: (n) => /^(primary|accent)/.test(n) },
  { title: "状态", id: "color-status", test: (n) => /^(danger|warning|success|info)/.test(n) },
  { title: "图表", id: "color-chart", test: (n) => /^chart-/.test(n) },
  { title: "代码与侧栏", id: "color-code", test: (n) => /^(code|sidebar)/.test(n) },
];

interface Resolved {
  raw: string;
  hex: string;
  alpha: number;
}

/** Paints a CSS colour onto a 1×1 canvas to get sRGB bytes, whatever syntax the browser computed. */
function toHex(ctx: CanvasRenderingContext2D, color: string): { hex: string; alpha: number } {
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = "#000";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  // getImageData returns straight (not premultiplied) alpha, so RGB is the base colour.
  const [r = 0, g = 0, b = 0, a = 255] = ctx.getImageData(0, 0, 1, 1).data;
  const hex = `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  return { hex, alpha: a / 255 };
}

function useResolvedColors(names: string[]) {
  const light = useRef<HTMLDivElement>(null);
  const dark = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Record<"light" | "dark", Record<string, Resolved>> | null>(null);
  useLayoutEffect(() => {
    const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    if (!ctx || !light.current || !dark.current) return;
    const read = (host: HTMLDivElement) => {
      const probe = host.firstElementChild as HTMLElement;
      const style = getComputedStyle(host);
      const out: Record<string, Resolved> = {};
      for (const name of names) {
        probe.style.backgroundColor = `var(--qy-${name})`;
        const computed = getComputedStyle(probe).backgroundColor;
        out[name] = { raw: style.getPropertyValue(`--qy-${name}`).trim(), ...toHex(ctx, computed) };
      }
      return out;
    };
    setValues({ light: read(light.current), dark: read(dark.current) });
  }, [names]);
  const probes = (
    <div aria-hidden="true" className="pointer-events-none invisible absolute size-0 overflow-hidden">
      <div className="light" ref={light}>
        <span />
      </div>
      <div className="dark" ref={dark}>
        <span />
      </div>
    </div>
  );
  return { values, probes };
}

function formatColor(value?: Resolved) {
  if (!value) return "…";
  return value.alpha < 0.999 ? `${value.hex} · ${Math.round(value.alpha * 100)}%` : value.hex;
}

/** `primary-foreground` is read on `primary`; status foregrounds are read on the page. */
function surfaceFor(name: string): string | null {
  if (name === "danger-on-fill") return "var(--qy-danger-fill)";
  const base = name.replace(/-foreground$/, "");
  if (base === name || /^(danger|warning|success|info)$/.test(base)) return null;
  return colorNames.includes(base) ? `var(--qy-${base})` : null;
}

function Swatch({ name, scheme }: { name: string; scheme: "light" | "dark" }) {
  const token = `var(--qy-${name})`;
  const isText = name.includes("foreground") || name.endsWith("-on-fill");
  const isLine = /^(border|ring|sidebar-border|sidebar-ring)/.test(name);
  const surface = isText ? surfaceFor(name) : null;
  return (
    <div
      className={cn(scheme, "grid size-11 shrink-0 place-items-center rounded-lg border bg-background")}
      title={scheme === "light" ? "浅色" : "深色"}
    >
      {isText ? (
        <span
          className="grid size-8 place-items-center rounded-md font-semibold text-reading"
          style={{ color: token, ...(surface ? { background: surface } : {}) }}
        >
          Aa
        </span>
      ) : isLine ? (
        <span className="size-6 rounded-md" style={{ boxShadow: `inset 0 0 0 1.5px ${token}` }} />
      ) : (
        <span className="size-6 rounded-md" style={{ background: token, boxShadow: "inset 0 0 0 1px oklch(0.5 0 0 / 0.12)" }} />
      )}
    </div>
  );
}

function ColorTokens() {
  const { values, probes } = useResolvedColors(colorNames);
  const assigned = new Set<string>();
  const groups = COLOR_GROUPS.map((group) => {
    const items = colorNames.filter((name) => !assigned.has(name) && group.test(name));
    for (const name of items) assigned.add(name);
    return { ...group, items };
  });
  const rest = colorNames.filter((name) => !assigned.has(name));
  if (rest.length) groups.push({ title: "其他", id: "color-other", test: () => true, items: rest });

  return (
    <>
      {probes}
      {groups
        .filter((group) => group.items.length)
        .map((group) => (
          <Fragment key={group.id}>
            <H3 id={group.id}>{group.title}</H3>
            <div className="overflow-hidden rounded-xl border">
              <div className="hidden grid-cols-[6.25rem_minmax(0,1fr)_7.5rem_7.5rem] gap-4 border-b bg-surface-subtle/60 px-4 py-2 text-muted-foreground text-caption sm:grid dark:bg-surface/40">
                <span>浅色 / 深色</span>
                <span>令牌</span>
                <span>浅色</span>
                <span>深色</span>
              </div>
              <ul className="divide-y">
                {group.items.map((name) => {
                  const light = values?.light[name];
                  const dark = values?.dark[name];
                  const utilities = utilityFor(name);
                  return (
                    <li
                      className="grid grid-cols-[6.25rem_minmax(0,1fr)] items-center gap-x-4 gap-y-1 px-4 py-3 sm:grid-cols-[6.25rem_minmax(0,1fr)_7.5rem_7.5rem]"
                      key={name}
                    >
                      <div className="row-span-2 flex gap-1.5 sm:row-span-1">
                        <Swatch name={name} scheme="light" />
                        <Swatch name={name} scheme="dark" />
                      </div>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <code className="truncate font-mono text-heading text-foreground-strong">--qy-{name}</code>
                        <span className="truncate text-muted-foreground text-caption">
                          {utilities.length ? (
                            <>
                              Tailwind：<span className="font-mono">{utilities.join(" / ")}</span>
                            </>
                          ) : (
                            "仅以变量使用"
                          )}
                        </span>
                      </div>
                      <div className="col-start-2 flex gap-3 font-mono text-caption text-foreground/80 numeric sm:contents">
                        <span className="truncate" title={light?.raw}>
                          <span className="text-foreground-subtle sm:hidden">浅 </span>
                          {formatColor(light)}
                        </span>
                        <span className="truncate" title={dark?.raw}>
                          <span className="text-foreground-subtle sm:hidden">深 </span>
                          {formatColor(dark)}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Fragment>
        ))}
    </>
  );
}

/** Reads `--qy-*` values from :root once mounted. */
function useRootValues(names: string[]) {
  const [values, setValues] = useState<Record<string, string>>({});
  useLayoutEffect(() => {
    const style = getComputedStyle(document.documentElement);
    setValues(Object.fromEntries(names.map((name) => [name, style.getPropertyValue(`--qy-${name}`).trim()])));
  }, [names]);
  return values;
}

const toPx = (value: string) => {
  const rem = value.match(/^([\d.]+)rem$/);
  if (rem) return `${Number.parseFloat(rem[1]!) * 16}px`;
  return value;
};

function TokenTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="my-4 overflow-x-auto rounded-xl border">
      <table className="w-full min-w-[30rem] text-body">
        <thead className="border-b bg-surface-subtle/60 text-start text-muted-foreground text-caption dark:bg-surface/40">
          <tr>
            {head.map((cell) => (
              <th className="px-4 py-2 text-start font-medium" key={cell}>
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td className="px-4 py-2.5 align-middle" key={j}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const mono = (text: string) => <code className="font-mono text-heading text-foreground-strong">{text}</code>;
const value = (text?: string) => <span className="font-mono text-caption text-muted-foreground numeric">{text || "…"}</span>;

const typeUtilities = new Map<string, string>();
for (const [, utility, role] of themeCss.matchAll(/--text-([a-z0-9-]+):\s*var\(--qy-text-([a-z0-9-]+)-size\)/g)) {
  typeUtilities.set(role!, `text-${utility}`);
}
const typeWeight = (role: string) => /^(display|title|heading)/.test(role) ? "var(--qy-weight-semibold)" : /^(label|button|field-label)/.test(role) ? "var(--qy-weight-medium)" : "var(--qy-weight-regular)";

function TypeScale() {
  const values = useRootValues(typeTokens);
  return (
    <div className="my-4 overflow-hidden rounded-xl border">
      <ul className="divide-y">
        {textRoles.map((role) => {
          const size = values[`text-${role}-size`];
          const leading = values[`text-${role}-leading`];
          return (
            <li className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-baseline sm:gap-6" key={role}>
              <div className="flex w-32 shrink-0 flex-col gap-0.5" title={size}>
                {mono(typeUtilities.get(role) ?? `--qy-text-${role}-size`)}
                {value(size ? `${toPx(size)} / ${leading}` : undefined)}
              </div>
              <p
                className="min-w-0 truncate text-foreground-strong"
                style={{ fontSize: `var(--qy-text-${role}-size)`, lineHeight: `var(--qy-text-${role}-leading)`, fontWeight: typeWeight(role) }}
              >
                精致耐看 Refined 0123
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Spacing() {
  const values = useRootValues(spaceNames);
  return (
    <TokenTable
      head={["令牌", "值", ""]}
      rows={spaceNames.map((name) => [
        mono(`--qy-${name}`),
        value(values[name] ? `${values[name]} · ${toPx(values[name]!)}` : undefined),
        <span aria-hidden="true" className="block h-2.5 rounded-sm bg-foreground/16" style={{ width: `var(--qy-${name})`, minWidth: 1 }} />,
      ])}
    />
  );
}

function Radii() {
  const tiles = useRef<HTMLUListElement>(null);
  const [resolved, setResolved] = useState<Record<string, string>>({});
  // Derived radii are calc() expressions; read the used value off each tile instead.
  useLayoutEffect(() => {
    const out: Record<string, string> = {};
    tiles.current?.querySelectorAll<HTMLElement>("[data-radius]").forEach((el) => {
      out[el.dataset.radius!] = getComputedStyle(el).borderTopLeftRadius;
    });
    setResolved(out);
  }, []);
  return (
    <ul className="my-4 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-4" ref={tiles}>
      {radiusNames.map((name) => (
        <li className="flex flex-col gap-2.5" key={name}>
          <div
            className="size-16 border border-foreground/16 bg-surface-subtle dark:bg-surface"
            data-radius={name}
            style={{ borderRadius: `var(--qy-${name})` }}
          />
          <div className="flex flex-col">
            {mono(`--qy-${name}`)}
            {value(name === "radius-full" ? "9999px" : resolved[name])}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Shadows() {
  return (
    <ul className="my-4 grid grid-cols-2 gap-4 rounded-xl border bg-surface-subtle/60 p-5 sm:grid-cols-4 dark:bg-background">
      {shadowNames.map((name) => (
        <li className="flex flex-col gap-3" key={name}>
          <div className="h-16 rounded-xl bg-card" style={{ boxShadow: `var(--qy-${name})` }} />
          <code className="font-mono text-caption text-foreground-strong">--qy-{name}</code>
        </li>
      ))}
    </ul>
  );
}

const CONTROL_SIZE: Record<string, "xs" | "sm" | "default" | "lg" | "xl"> = {
  "control-xs": "xs",
  "control-sm": "sm",
  "control-md": "default",
  "control-lg": "lg",
  "control-xl": "xl",
};

function Controls() {
  const values = useRootValues(controlTokens);
  const [heights, setHeights] = useState<Record<string, { desktop: number; narrow: number }>>({});
  useLayoutEffect(() => {
    const probe = document.createElement("span");
    probe.style.cssText = "position:absolute;visibility:hidden;display:block;width:0";
    document.documentElement.append(probe);
    const result: Record<string, { desktop: number; narrow: number }> = {};
    for (const name of controlNames) {
      probe.style.height = `var(--qy-${name})`;
      const desktop = Number.parseFloat(getComputedStyle(probe).height);
      probe.style.height = `calc(var(--qy-${name}) + var(--qy-control-mobile-extra))`;
      result[name] = { desktop, narrow: Number.parseFloat(getComputedStyle(probe).height) };
    }
    probe.remove();
    setHeights(result);
  }, []);
  return (
    <>
      <TokenTable
        head={["外部高度令牌", "桌面 ≥640px", "窄屏 <640px", "当前视口按钮"]}
        rows={controlNames.map((name) => {
          const desktop = values[name];
          const used = heights[name];
          const size = CONTROL_SIZE[name];
          return [
            mono(`--qy-${name}`),
            value(used ? `${desktop} · ${used.desktop}px` : undefined),
            value(used ? `${used.narrow}px` : undefined),
            size ? (
              <Button aria-hidden="true" size={size === "default" ? "md" : size} tabIndex={-1} variant="quiet">
                {size === "default" ? "默认" : size}
              </Button>
            ) : null,
          ];
        })}
      />
      <P>窄屏增高量 <Code>--qy-control-mobile-extra</Code> 为 {value(values["control-mobile-extra"])}。Input 内部高度比含边框的外部高度小 2px；InputGroup 使用父层边框。</P>
      <TokenTable
        head={["密度令牌", "默认值"]}
        rows={densityNames.map((name) => [mono(`--qy-${name}`), value(values[name] ? `${values[name]} · ${toPx(values[name]!)}` : undefined)])}
      />
    </>
  );
}

function FocusTokens() {
  const values = useRootValues(focusNames);
  return (
    <>
      <TokenTable head={["焦点角色", "默认值"]} rows={focusNames.map((name) => [mono(`--qy-${name}`), value(values[name])])} />
      <P>有可见边界的控件保持 1px border，使用 --qy-focus-boundary-inset 增加 1px 内侧描边。无边界入口使用 --qy-focus-ring-width 的 2px 贴边环；实心填充配 --qy-focus-ring-on-solid 并向内绘制，其它填充在控件上声明 --qy-focus-ring-color。信号合成色与实际比较对象至少为 3:1，全部无 offset。</P>
      <CodeBlock code={`html[data-brand="project"] {\n  --qy-focus-ring-width: 2px;\n  --qy-focus-boundary-inset: 1px;\n  --qy-focus-ring-on-solid: var(--qy-primary-foreground);\n}`} lang="css" />
    </>
  );
}

function MotionTokens() {
  const values = useRootValues(motionTokens);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [played, setPlayed] = useState(false);
  const track = (style: CSSProperties) => (
    <div className="relative h-3 w-full min-w-24 rounded-full bg-foreground/6 [container-type:inline-size]">
      <span
        className="absolute top-0 start-0 size-3 rounded-full bg-foreground"
        style={{ translate: played ? "calc(100cqw - 0.75rem) 0" : "0 0", transitionProperty: "translate", ...style, ...(reduced ? { transitionDuration: "0s" } : {}) }}
      />
    </div>
  );
  return (
    <>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button onClick={() => setPlayed((value) => !value)} size="sm" variant="quiet">
          {played ? <RotateCcwIcon aria-hidden="true" /> : <PlayIcon aria-hidden="true" />}
          {played ? "回到起点" : "播放"}
        </Button>
        <span className="text-muted-foreground text-caption">
          {reduced ? "系统开启了“减少动态效果”，示例改为即时切换。" : "所有圆点同时出发，到达的先后就是时长的差别。"}
        </span>
      </div>
      <H3 id="durations">时长</H3>
      <TokenTable
        head={["令牌", "值", "演示（缓动 ease-out）"]}
        rows={durationNames.map((name) => [
          mono(`--qy-${name}`),
          value(values[name]),
          track({ transitionDuration: `var(--qy-${name})`, transitionTimingFunction: "var(--qy-ease-out)" }),
        ])}
      />
      <H3 id="easings">缓动</H3>
      <TokenTable
        head={["令牌", "曲线", "演示（放慢到 600ms）"]}
        rows={easeNames.map((name) => [
          mono(`--qy-${name}`),
          <span className="block max-w-56 truncate">{value(values[name])}</span>,
          track({ transitionDuration: "600ms", transitionTimingFunction: `var(--qy-${name})` }),
        ])}
      />
      <P className="text-body text-muted-foreground">
        <Code>--qy-ease-spring</Code> 用于通知的成功脉冲，其他缓动的使用约定见 <A href="/docs/motion#rules">动效</A>。<Code>--qy-stagger</Code> 为 {values.stagger || "…"}，列表延迟最多累加 8 项；用法见 <A href="/docs/motion#helpers">进场辅助</A>。
      </P>
    </>
  );
}

export default function TokensPage() {
  return (
    <article>
      <PageHeader
        description="名称和工具类对应当前库 CSS，取值在页面加载时读取。只有使用该变量的组件会随覆盖值改变。"
        title="设计令牌"
      />

      <H2 id="colors">颜色</H2>
      <P>危险状态的标记和边框用 <Code>danger</Code>，页面文字用 <Code>danger-foreground</Code>；实心动作的底色与文字分别用 <Code>danger-fill</Code> 和 <Code>danger-on-fill</Code>。<Code>danger-on-fill</Code> 色样显示在 <Code>danger-fill</Code> 背景上。</P>
      <ColorTokens />
      <P>库内的 <A href={repoFile("packages/ui/test/color-check.ts")}>AST 颜色检查</A> 会读取 className/style、cn/cva 和静态常量，并区分颜色、属性选择器与 URL 片段。动态 props 或 import 无法求值时记为 unresolved，仍需检查实际配色与对比度；此检查器尚未发布为消费项目的 lint 插件。</P>

      <H2 id="typography">字号</H2>
      <P>
        按钮用 <Code>text-button</Code>，输入用 <Code>text-field-input</Code>；<Code>text-input</Code> 是颜色类。窄屏使用对应的 mobile 字号角色。表单标签用 <Code>text-field-label</Code>，一般标签用 <Code>text-label</Code>。这些角色已用于 Button、Input/InputGroup、Textarea、NativeSelect、NumberField、Select 触发器、Label/FieldLabel/FieldTitle 和 CardDescription。拉丁文字按角色设置字距，CJK 使用自然字距；其余内容排版未全部接入。
      </P>
      <TypeScale />

      <H2 id="spacing">间距</H2>
      <P>
        在 html 上修改 <Code>--qy-space-1</Code>（默认 4px），其余命名间距随之变化。组件的 gap、padding 与正 margin 使用这些变量，Tailwind 的 <Code>--spacing</Code> 保持不变。图标、控件高度、thumb/marker、字形预留和负 margin 补偿各用自己的尺寸，不随基础间距缩放。局部容器覆盖 <Code>--qy-space-1</Code> 时，继承的派生变量不一定重新计算。
      </P>
      <Spacing />

      <H2 id="radius">圆角</H2>
      <P>
        xs/sm 控件圆角为 6px/7px，md 直接取 8px；lg 读取默认 8px 的 <Code>--qy-radius</Code>，并供 <Code>--qy-radius-control</Code> 使用。五档独立控件满足圆角不超过短边的 25%。标记用 marker（4px），菜单行与标签用 item（6px）。<Code>--qy-radius-panel</Code> 默认 12px；嵌套内角按实际内缩换算，1px 内缩的高光才减 1px。
      </P>
      <Radii />

      <H2 id="focus">焦点</H2>
      <FocusTokens />

      <H2 id="shadows">阴影</H2>
      <Shadows />

      <H2 id="controls">控件高度与密度</H2>
      <P>
        Button、Input 与 SelectTrigger/SelectButton 的控件令牌表示含边框的桌面高度。窄屏增加 <Code>--qy-control-mobile-extra</Code>，默认 4px。粗指针下，Input/InputGroup 的外部高度至少为 --qy-touch-target（默认 44px）；Button/Select 的可见高度不变，命中区通过伪元素扩至 <Code>--qy-touch-target</Code>。窄屏按视口宽度判断，粗指针按输入设备判断，可同时生效。输入与默认按钮的字号在窄屏为 16px、桌面为 14px；防止 iOS 输入缩放要调整字号，增加控件高度不起作用。
      </P>
      <Controls />

      <H2 id="motion">动效</H2>
      <MotionTokens />
    </article>
  );
}
