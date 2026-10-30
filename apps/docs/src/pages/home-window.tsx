import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { useTheme } from "@qingye_lab/ui/components/theme-provider";
import { linkClassName } from "@qingye_lab/ui/components/link";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/components/locale-link";
import { AXES_MESSAGE, BRANDS, type Axes, type Density, type Scheme } from "@/lib/axes";
import { useDocsLocale } from "@/lib/docs-locale";
import { localePath } from "@/lib/paths";
import { EXAMPLES } from "@/examples/list";

/*
 * 首页的产品窗口：示例应用本身（裸框路由，同源 iframe），可以直接操作。
 * 窗口自己的顶栏是唯一的控件区：起始侧换示例，结束侧是主题的三个轴。
 * 三轴经 postMessage 写进框内文档的根（lib/axes.ts），整个应用一起换，不重载、不丢框内的操作；
 * 换示例才换地址。明暗初值跟随站点，读者在窗口上选过之后保留自己的选择。
 */
export function HomeWindow() {
  const locale = useDocsLocale();
  const en = locale === "en";
  const t = (zh: string, english: string) => (en ? english : zh);
  const { resolvedTheme } = useTheme();
  // 工作区与记录是桌面范围的应用（不设窄屏抽屉）；窄屏先打开会随宽度改排的预约。
  const [example, setExample] = useState<string>(() => typeof window !== "undefined" && window.matchMedia?.("(width < 48rem)").matches ? "booking" : EXAMPLES[0]!.id);
  const [picked, setPicked] = useState<Scheme | null>(null);
  const [density, setDensity] = useState<Density>("default");
  const [brand, setBrand] = useState("qing");
  const frame = useRef<HTMLIFrameElement>(null);
  const scheme: Scheme = picked ?? (resolvedTheme === "dark" ? "dark" : "light");
  const axes: Axes = { scheme, density, brand };

  // 地址只在换示例时变：三轴的初值写进地址，此后的变化走消息。
  const [src, setSrc] = useState(() => frameSrc(example, axes, locale));
  const post = () => frame.current?.contentWindow?.postMessage({ type: AXES_MESSAGE, axes }, window.location.origin);
  useEffect(post, [scheme, density, brand]);
  const choose = (id: string) => { setExample(id); setSrc(frameSrc(id, axes, locale)); };
  const current = EXAMPLES.find((item) => item.id === example)!;

  return (
    <section aria-label={t("示例应用", "Example application")} className="home-window" data-ui>
      <div className="home-window-bar">
        <SegmentedControl aria-label={t("示例", "Example")} onValueChange={(value) => choose(String(value))} size="sm" value={example}>
          {EXAMPLES.map((item) => <SegmentedControlItem key={item.id} value={item.id}>{en ? item.title.en : item.title.zh}</SegmentedControlItem>)}
        </SegmentedControl>
        <div className="home-window-axes">
          <SegmentedControl aria-label={t("明暗", "Scheme")} onValueChange={(value) => setPicked(value as Scheme)} size="sm" value={scheme}>
            <SegmentedControlItem value="light">{t("浅", "Light")}</SegmentedControlItem>
            <SegmentedControlItem value="dark">{t("深", "Dark")}</SegmentedControlItem>
          </SegmentedControl>
          <SegmentedControl aria-label={t("密度", "Density")} onValueChange={(value) => setDensity(value as Density)} size="sm" value={density}>
            <SegmentedControlItem value="default">{t("舒展", "Default")}</SegmentedControlItem>
            <SegmentedControlItem value="compact">{t("紧凑", "Compact")}</SegmentedControlItem>
          </SegmentedControl>
          <SegmentedControl aria-label={t("品牌", "Brand")} onValueChange={(value) => setBrand(String(value))} size="sm" value={brand}>
            {BRANDS.map((item) => (
              <SegmentedControlItem key={item.id} value={item.id}>
                {/* 圆以标点：色点只标出这个品牌的颜色，名称在旁。 */}
                <span aria-hidden="true" className="home-dot" style={{ background: item[scheme]?.[0] ?? "var(--qy-foreground)" }} />
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

function frameSrc(id: string, { scheme, density, brand }: Axes, locale: "zh" | "en") {
  return `${localePath(`/frame/examples/${id}`, locale)}?${new URLSearchParams({ scheme, density, brand })}`;
}
