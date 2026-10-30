import { linkClassName } from "@qingye_lab/ui/components/link";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/components/locale-link";
import { AXES_MESSAGE, BRANDS, type Axes, type Density } from "@/lib/axes";
import { useDocsLocale } from "@/lib/docs-locale";
import { EXAMPLES } from "@/examples/list";

/*
 * 首页的示例窗口：示例应用本身（裸框路由，同源 iframe），不是截图，可以直接操作。
 * 明暗跟随站点——框内的 ThemeProvider 读同一份存储，页头切换明暗时窗口里的应用一起换，没有第二个明暗开关。
 * 窗口顶栏起始侧换示例，结束侧试密度与品牌：两轴经 postMessage 写进框内文档的根（lib/axes.ts），不重载、不丢框内的操作；
 * 换示例才换地址。窄于 48rem 时先打开会随宽度改排的预约（工作区与记录是桌面范围的应用）。
 */
export function HomeWindow() {
  const locale = useDocsLocale();
  const en = locale === "en";
  const t = (zh: string, english: string) => (en ? english : zh);
  const [example, setExample] = useState<string>(() => typeof window !== "undefined" && window.matchMedia?.("(width < 48rem)").matches ? "booking" : EXAMPLES[0]!.id);
  const [density, setDensity] = useState<Density>("default");
  const [brand, setBrand] = useState("qing");
  const frame = useRef<HTMLIFrameElement>(null);
  const axes: Axes = { density, brand };

  // 地址只在换示例时变：两轴的当前值写进地址，此后的变化走消息。
  const [src, setSrc] = useState(() => frameSrc(example, axes));
  const post = () => frame.current?.contentWindow?.postMessage({ type: AXES_MESSAGE, axes }, window.location.origin);
  useEffect(post, [density, brand]);
  const choose = (id: string) => { setExample(id); setSrc(frameSrc(id, axes)); };
  const current = EXAMPLES.find((item) => item.id === example)!;

  return (
    <section aria-label={t("示例应用", "Example application")} className="home-window" data-ui>
      <div className="home-window-bar">
        <SegmentedControl aria-label={t("示例", "Example")} onValueChange={(value) => choose(String(value))} size="sm" value={example}>
          {EXAMPLES.map((item) => <SegmentedControlItem key={item.id} value={item.id}>{en ? item.title.en : item.title.zh}</SegmentedControlItem>)}
        </SegmentedControl>
        <div className="home-window-axes">
          <SegmentedControl aria-label={t("密度", "Density")} onValueChange={(value) => setDensity(value as Density)} size="sm" value={density}>
            <SegmentedControlItem value="default">{t("舒展", "Default")}</SegmentedControlItem>
            <SegmentedControlItem value="compact">{t("紧凑", "Compact")}</SegmentedControlItem>
          </SegmentedControl>
          <SegmentedControl aria-label={t("品牌", "Brand")} onValueChange={(value) => setBrand(String(value))} size="sm" value={brand}>
            {BRANDS.map((item) => (
              <SegmentedControlItem key={item.id} value={item.id}>
                {/* 圆以标点：色点只标出这个品牌的颜色，名称在旁；颜色读 index.css 的预设，随明暗换组。 */}
                <span aria-hidden="true" className="home-dot" style={{ background: item.swatch }} />
                {en ? item.en : item.zh}
              </SegmentedControlItem>
            ))}
          </SegmentedControl>
        </div>
      </div>
      <iframe className="home-window-frame" key={src} onLoad={post} ref={frame} src={src} title={en ? current.title.en : current.title.zh} />
      <div className="home-window-foot">
        <span>{en ? current.text.en : current.text.zh}</span>
        <Link className={linkClassName} to={`/examples/${current.id}`}>{t("全屏打开", "Open full page")}</Link>
      </div>
    </section>
  );
}

// 裸框路由与语言无关（示例应用只有中文）。
function frameSrc(id: string, { density, brand }: Axes) {
  return `/frame/examples/${id}?${new URLSearchParams({ density, brand })}`;
}
