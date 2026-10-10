import { Fragment, type ReactNode } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Input } from "@qingye_lab/ui/components/input";
import { PasswordInput } from "@qingye_lab/ui/components/password-input";
import { SearchInput } from "@qingye_lab/ui/components/search-input";
import { Card } from "@qingye_lab/ui/components/card";
import { Popover, PopoverClose, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { Field, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { useTheme } from "@qingye_lab/ui/components/theme-provider";
import { IconPlus } from "@tabler/icons-react";

// The standalone entry needs its icon before React commits, before window.load.
if (typeof document !== "undefined" && !document.querySelector('link[rel="icon"]')) {
  const icon = document.createElement("link");
  icon.rel = "icon";
  icon.type = "image/svg+xml";
  icon.href = "/favicon.svg";
  document.head.append(icon);
}

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
// 用户裁决 2026-10-05：填值控件不再按尺寸档放大，紧凑由密度轴承担；
// Button 仍保留五档（命令类的尺寸表达位置），两者的审查方式因此不同。
const densities = ["default", "compact"] as const;
const variants = ["solid", "bordered", "quiet"] as const;

function Section({ id, title, fact, children }: {
  id: string; title: string; fact?: string; children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border py-(--qy-section-gap) first:border-t-0 first:pt-0">
      <h2 className="text-heading text-foreground">{title}</h2>
      {fact && <p className="mt-(--qy-field-gap) text-caption text-muted-foreground">{fact}</p>}
      <div className="mt-(--qy-field-group-gap)">{children}</div>
    </section>
  );
}

export default function DesignReview() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <div className="bg-background">
      <title>组件审查 · Qingye UI</title>
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-(--qy-panel-gap) px-8 py-3">
          <h1 className="text-heading text-foreground">组件审查</h1>
          <Button size="sm" variant="quiet" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
            {resolvedTheme === "dark" ? "浅色" : "深色"}
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-8 py-10">
        <Section id="button-sizes-review" title="Button · 变体 × 尺寸">
          <div className="grid grid-cols-[auto_repeat(5,minmax(0,1fr))] items-center gap-(--qy-panel-gap)">
            <span />
            {sizes.map((size) => <span key={size} className="text-caption text-muted-foreground">{size}</span>)}
            {variants.map((variant) => (
              <Fragment key={variant}>
                <span className="text-caption text-muted-foreground">{variant}</span>
                {sizes.map((size) => <Button key={size} variant={variant} size={size} className="justify-self-start">保存</Button>)}
              </Fragment>
            ))}
          </div>
          <div className="mt-(--qy-field-group-gap) flex items-center gap-(--qy-action-gap)">
            {sizes.map((size) => <Button key={size} size={size} shape="icon" variant="bordered" aria-label={`添加 · ${size}`}><IconPlus aria-hidden="true" /></Button>)}
          </div>
        </Section>

        <Section id="button-states-review" title="Button · 状态" fact="忙碌时保留焦点并挡住再次触发。">
          <div className="grid grid-cols-[auto_repeat(3,minmax(0,1fr))] items-center gap-(--qy-panel-gap)">
            <span />
            {variants.map((variant) => <span key={variant} className="text-caption text-muted-foreground">{variant}</span>)}
            {[false, true].map((loading) => (
              <Fragment key={String(loading)}>
                <span className="text-caption text-muted-foreground">{loading ? "忙碌" : "静态"}</span>
                {variants.map((variant) => <Button key={variant} variant={variant} loading={loading} className="justify-self-start">保存</Button>)}
              </Fragment>
            ))}
            <span className="text-caption text-muted-foreground">禁用</span>
            {variants.map((variant) => <Button key={variant} variant={variant} disabled className="justify-self-start">保存</Button>)}
          </div>
          <div className="mt-(--qy-field-group-gap) grid grid-cols-2 gap-(--qy-panel-gap)">
            <div className="flex items-start gap-(--qy-action-gap)">
              <Button>保存</Button><Button variant="bordered">预览</Button><Button variant="quiet">取消</Button>
            </div>
            <div className="flex gap-(--qy-action-gap)">
              {variants.map((variant) => <Button key={variant} variant={variant} tone="danger">删除</Button>)}
            </div>
          </div>
        </Section>

        <Section id="input-review" title="Input · 密度与状态" fact="输入主体聚焦时边框只变色，不加粗。">
          <div className="grid grid-cols-2 items-start gap-(--qy-panel-gap)">
            {densities.map((density) => <div data-density={density} key={density}><Field><FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel><Input defaultValue="青野" /></Field></div>)}
          </div>
          <div className="mt-(--qy-field-group-gap) grid grid-cols-4 items-start gap-(--qy-panel-gap)">
            <Field><FieldLabel>静态</FieldLabel><Input defaultValue="青野" /></Field>
            <Field invalid><FieldLabel>无效</FieldLabel><Input defaultValue="青野" /><FieldError>格式不正确。</FieldError></Field>
            <Field disabled><FieldLabel>禁用</FieldLabel><Input disabled defaultValue="青野" /></Field>
            <Field><FieldLabel>只读</FieldLabel><Input readOnly defaultValue="青野" /></Field>
          </div>
          <div className="mt-(--qy-field-group-gap) grid grid-cols-2 gap-(--qy-panel-gap)">
            <Field><FieldLabel>搜索</FieldLabel><SearchInput defaultValue="青野" /></Field>
            <Field><FieldLabel>密码</FieldLabel><PasswordInput defaultValue="qingye" /></Field>
          </div>
        </Section>

        <Section id="card-review" title="Card · 静态与链接">
          <div className="grid grid-cols-2 gap-(--qy-panel-gap)">
            <Card className="p-(--qy-panel-padding-sm)"><h3 className="text-body-strong">静态卡片</h3><p className="mt-(--qy-field-gap) text-caption">一行内容。</p></Card>
            <Card className="p-(--qy-panel-padding-sm)" render={<a href="#card-surface" />}><h3 className="text-body-strong">卡片链接</h3><p className="mt-(--qy-field-gap) text-caption">查看表面对照。</p></Card>
          </div>
        </Section>

        <Section id="popover-review" title="Popover · 触发与关闭">
          <div className="flex gap-(--qy-action-gap)">
            <Popover>
              <PopoverTrigger render={<Button variant="bordered" />}>打开浮层</PopoverTrigger>
              <PopoverPopup><PopoverTitle>浮层</PopoverTitle><PopoverClose render={<Button variant="quiet" size="sm" />}>关闭</PopoverClose></PopoverPopup>
            </Popover>
            <Popover>
              <PopoverTrigger>裸触发者</PopoverTrigger>
              <PopoverPopup><PopoverTitle>浮层</PopoverTitle><PopoverClose render={<Button variant="quiet" size="sm" />}>关闭</PopoverClose></PopoverPopup>
            </Popover>
            <Popover><PopoverTrigger disabled render={<Button variant="bordered" disabled />}>禁用</PopoverTrigger></Popover>
          </div>
        </Section>
      </div>
    </div>
  );
}
