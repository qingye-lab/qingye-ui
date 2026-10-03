import { Card } from "@qingye/ui/components/card";
import { useEffect, useRef, useState } from "react";

const treatments = [
  { id: "current", label: "① 线 + 面 + 阴影", className: "" },
  { id: "no-shadow", label: "② 线 + 面", className: "[--qy-shadow-panel:0_0_0_0_transparent]" },
  { id: "no-line", label: "③ 面 + 阴影", className: "border-transparent" },
  { id: "line-only", label: "④ 只有线", className: "bg-transparent [--qy-shadow-panel:0_0_0_0_transparent]" },
] as const;

type Color = [number, number, number, number];

// Computed colors may be OKLCH or color-mix. Canvas resolves them to sRGB;
// composite translucent layers in paint order, including background under border.
function readColor(context: CanvasRenderingContext2D, value: string): Color {
  context.clearRect(0, 0, 1, 1);
  context.fillStyle = value;
  context.fillRect(0, 0, 1, 1);
  const rgba = context.getImageData(0, 0, 1, 1).data;
  return [rgba[0]! / 255, rgba[1]! / 255, rgba[2]! / 255, rgba[3]! / 255];
}

function composite(top: Color, bottom: Color): Color {
  const alpha = top[3] + bottom[3] * (1 - top[3]);
  if (!alpha) return [0, 0, 0, 0];
  return [0, 1, 2].map((index) =>
    (top[index]! * top[3] + bottom[index]! * bottom[3] * (1 - top[3])) / alpha,
  ).concat(alpha) as Color;
}

function contrast(a: Color, b: Color): string {
  const luminance = (color: Color) => [0.2126, 0.7152, 0.0722].reduce((sum, weight, i) => {
    const c = color[i]!;
    return sum + weight * (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  }, 0);
  const first = luminance(a), second = luminance(b);
  return ((Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05)).toFixed(2);
}

function paintedBackground(context: CanvasRenderingContext2D, element: HTMLElement | null): Color {
  if (!element) return [1, 1, 1, 1];
  const own = readColor(context, getComputedStyle(element).backgroundColor);
  return own[3] === 1 ? own : composite(own, paintedBackground(context, element.parentElement));
}

function useSurfaceFact() {
  const ref = useRef<HTMLDivElement>(null);
  const [fact, setFact] = useState("对比度：未测量");
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const measure = () => {
      const host = ref.current;
      const card = host?.querySelector<HTMLElement>('[data-slot="card"]');
      const context = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
      if (!host || !card || !context) {
        setFact("对比度：未测量");
        return;
      }
      const style = getComputedStyle(card);
      const base = paintedBackground(context, host);
      const fill = composite(readColor(context, style.backgroundColor), base);
      const border = readColor(context, style.borderTopColor);
      const edge = composite(border, style.backgroundClip === "border-box" ? fill : base);
      const line = parseFloat(style.borderTopWidth) > 0 && border[3] > 0
        ? `边线/底 ${contrast(edge, base)}:1`
        : "无线";
      setFact(`${line} · 面/底 ${contrast(fill, base)}:1`);
    };
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(measure, 600);
    };
    const observer = new MutationObserver(schedule);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme", "data-brand"] });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return { ref, fact };
}

function SurfaceSample({ treatment, white }: { treatment: typeof treatments[number]; white: boolean }) {
  const { ref, fact } = useSurfaceFact();
  // Fixed white remains a comparison surface in both themes.
  const transparentWhite = white && treatment.id === "line-only";
  const cardClass = `p-(--qy-panel-padding-sm) ${treatment.className} ${transparentWhite ? "text-(--qy-neutral-950)" : ""}`;
  return (
    <div
      ref={ref}
      className="space-y-(--qy-field-group-gap) p-(--qy-panel-padding)"
      style={{ backgroundColor: white ? "var(--qy-white)" : "var(--qy-background)", color: white ? "var(--qy-neutral-950)" : "var(--qy-foreground)" }}
      data-card-comparison={`${treatment.id}-${white ? "white" : "page"}`}
    >
      <div className="flex items-baseline justify-between gap-(--qy-space-4)">
        <h4 className="text-body-strong">{white ? "白面" : "页面底"}</h4>
        <p className="text-caption numeric" data-card-fact="">{fact}</p>
      </div>
      <Card className={cardClass}>
        <h5 className="text-heading">卡片</h5>
        <p className="mt-(--qy-field-gap) text-caption">一行内容。</p>
      </Card>
    </div>
  );
}

export default function CardSurfaceReview() {
  return (
    <section id="card-surface" className="border-t border-border py-9">
      <h2 className="text-heading">Card · 表面对照</h2>
      <div className="mt-(--qy-space-6) space-y-(--qy-space-8)">
        {treatments.map((treatment) => (
          <section key={treatment.id} className="space-y-(--qy-space-4)">
            <h3 className="text-body-strong">{treatment.label}</h3>
            <SurfaceSample treatment={treatment} white={false} />
            <SurfaceSample treatment={treatment} white />
          </section>
        ))}
      </div>
    </section>
  );
}
