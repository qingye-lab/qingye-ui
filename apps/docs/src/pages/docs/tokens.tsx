import themeCss from "@yanqing/ui/theme.css?raw";
import componentsCss from "@yanqing/ui/tokens/components.css?raw";
import semanticCss from "@yanqing/ui/tokens/semantic.css?raw";
import { Button, cn, useMediaQuery } from "@yanqing/ui";
import { PlayIcon, RotateCcwIcon } from "lucide-react";
import { Fragment, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { A, Code, H2, H3, P, PageHeader } from "@/components/prose";

// Token names come from the library's own CSS, so this page never drifts.
const tokenNames = (css: string, pattern: RegExp) => [...new Set([...css.matchAll(pattern)].map((match) => match[1]!))];

const colorNames = tokenNames(semanticCss, /--qy-([a-z0-9-]+)\s*:/g).filter((name) => !name.startsWith("shadow-"));
const shadowNames = tokenNames(semanticCss, /--qy-(shadow-[a-z0-9-]+)\s*:/g);
const textRoles = tokenNames(componentsCss, /--qy-text-([a-z]+)-size\s*:/g);
const spaceNames = tokenNames(componentsCss, /--qy-(space-\d+)\s*:/g);
const radiusNames = tokenNames(componentsCss, /--qy-(radius(?:-[a-z0-9]+)?)\s*:/g);
const controlNames = tokenNames(componentsCss, /--qy-(control-[a-z]+)\s*:/g);
const densityNames = ["touch-target", "row-default", "row-compact", "panel-padding", "panel-padding-sm", "panel-gap", "section-gap", "topbar-height"].filter(
  (name) => componentsCss.includes(`--qy-${name}:`),
);
const durationNames = tokenNames(componentsCss, /--qy-(duration-[a-z]+)\s*:/g);
const easeNames = tokenNames(componentsCss, /--qy-(ease-[a-z-]+)\s*:/g);

// Stable lists for the readers below (they are effect dependencies).
const typeTokens = textRoles.flatMap((role) => [`text-${role}-size`, `text-${role}-leading`]);
const controlTokens = [...controlNames, ...densityNames];
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
  const base = name.replace(/-foreground$/, "");
  if (base === name || /^(danger|warning|success|info)$/.test(base)) return null;
  return colorNames.includes(base) ? `var(--qy-${base})` : null;
}

function Swatch({ name, scheme }: { name: string; scheme: "light" | "dark" }) {
  const token = `var(--qy-${name})`;
  const isText = name.includes("foreground");
  const isLine = /^(border|ring|sidebar-border|sidebar-ring)/.test(name);
  const surface = isText ? surfaceFor(name) : null;
  return (
    <div
      className={cn(scheme, "grid size-11 shrink-0 place-items-center rounded-lg border bg-background")}
      title={scheme === "light" ? "浅色" : "深色"}
    >
      {isText ? (
        <span
          className="grid size-8 place-items-center rounded-md font-semibold text-[0.9375rem]"
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
              <div className="hidden grid-cols-[6.25rem_minmax(0,1fr)_7.5rem_7.5rem] gap-4 border-b bg-surface-subtle/60 px-4 py-2 text-muted-foreground text-xs sm:grid dark:bg-surface/40">
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
                        <code className="truncate font-mono text-[0.8125rem] text-foreground-strong">--qy-{name}</code>
                        <span className="truncate text-muted-foreground text-xs">
                          {utilities.length ? (
                            <>
                              Tailwind：<span className="font-mono">{utilities.join(" / ")}</span>
                            </>
                          ) : (
                            "仅以变量使用"
                          )}
                        </span>
                      </div>
                      <div className="col-start-2 flex gap-3 font-mono text-[0.75rem] text-foreground/80 numeric sm:contents">
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
      <table className="w-full min-w-[30rem] text-sm">
        <thead className="border-b bg-surface-subtle/60 text-start text-muted-foreground text-xs dark:bg-surface/40">
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

const mono = (text: string) => <code className="font-mono text-[0.8125rem] text-foreground-strong">{text}</code>;
const value = (text?: string) => <span className="font-mono text-[0.75rem] text-muted-foreground numeric">{text || "…"}</span>;

const TYPE_WEIGHT: Record<string, number> = { display: 600, title: 600, heading: 600, label: 500 };

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
                {mono(`text-${role}`)}
                {value(size ? `${toPx(size)} / ${leading}` : undefined)}
              </div>
              <p
                className="min-w-0 truncate text-foreground-strong"
                style={{ fontSize: `var(--qy-text-${role}-size)`, lineHeight: `var(--qy-text-${role}-leading)`, fontWeight: TYPE_WEIGHT[role] ?? 400 }}
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
          <code className="font-mono text-[0.75rem] text-foreground-strong">--qy-{name}</code>
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
  return (
    <>
      <TokenTable
        head={["令牌", "桌面", "移动端", "按钮"]}
        rows={controlNames.map((name) => {
          const desktop = values[name];
          const px = desktop ? Number.parseFloat(desktop) * 16 : 0;
          const size = CONTROL_SIZE[name];
          return [
            mono(`--qy-${name}`),
            value(desktop ? `${desktop} · ${px}px` : undefined),
            value(desktop ? `${px + 4}px` : undefined),
            size ? (
              <Button aria-hidden="true" size={size} tabIndex={-1} variant="outline">
                {size === "default" ? "默认" : size}
              </Button>
            ) : null,
          ];
        })}
      />
      <TokenTable
        head={["密度令牌", "默认值"]}
        rows={densityNames.map((name) => [mono(`--qy-${name}`), value(values[name] ? `${values[name]} · ${toPx(values[name]!)}` : undefined)])}
      />
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
        <Button onClick={() => setPlayed((value) => !value)} size="sm" variant="outline">
          {played ? <RotateCcwIcon aria-hidden="true" /> : <PlayIcon aria-hidden="true" />}
          {played ? "回到起点" : "播放"}
        </Button>
        <span className="text-muted-foreground text-xs">
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
      <P className="text-[0.875rem] text-muted-foreground">
        <Code>--qy-ease-spring</Code> 只用于通知的成功脉冲，其余动效一律不回弹。列表逐项进场的间隔是 <Code>--qy-stagger</Code>（{values.stagger || "…"}
        ），最多累计 8 项。
      </P>
    </>
  );
}

export default function TokensPage() {
  return (
    <article>
      <PageHeader
        description="下面的每个数值都在页面加载时从库的 CSS 中读出，与组件实际使用的完全一致。"
        title="设计令牌"
      />
      <P>
        令牌分为原语、语义与组件三层，见 <A href="/docs/theming#layers">主题</A>。组件只读取语义与组件两层；覆盖它们就能定制整个库。
      </P>

      <H2 id="colors">颜色</H2>
      <P>
        每个语义颜色都同时给出浅色与深色下的取值。中性色大多是半透明的黑或白，所以放在卡片、侧栏或浮层上都能保持相同的观感；色块按各自主题的背景展示。
      </P>
      <ColorTokens />

      <H2 id="typography">字号</H2>
      <P>
        字号与行高成对出现，Tailwind 中写作 <Code>text-body</Code>、<Code>text-label</Code> 等。字重只用 400、500、600：标题 600，标签与按钮 500。
      </P>
      <TypeScale />

      <H2 id="spacing">间距</H2>
      <P>
        以 4px 为基数。组件内部间距直接使用 Tailwind 的 <Code>--spacing</Code>，这里的令牌供布局与自定义组件使用。
      </P>
      <Spacing />

      <H2 id="radius">圆角</H2>
      <P>
        全部由 <Code>--qy-radius</Code> 派生。徽章与复选框用 <Code>sm</Code>，菜单项用 <Code>md</Code>，控件与浮层用 <Code>lg</Code>，提示条用 <Code>xl</Code>
        ，卡片与弹窗用 <Code>2xl</Code>。
      </P>
      <Radii />

      <H2 id="shadows">阴影</H2>
      <P>层次主要来自半透明边框，阴影只起辅助作用。下方按当前主题显示；深色下阴影更重，以便在暗背景上仍可分辨。</P>
      <Shadows />

      <H2 id="controls">控件高度与密度</H2>
      <P>
        控件高度令牌是桌面值。移动端统一加高 4px，避免 iOS 输入时缩放并方便点按；粗指针下独立控件的点击区扩展到 <Code>--qy-touch-target</Code>。
      </P>
      <Controls />

      <H2 id="motion">动效</H2>
      <P>
        时长短、缓动统一、随时可被打断。使用规则见 <A href="/docs/motion">动效</A>。
      </P>
      <MotionTokens />
    </article>
  );
}
