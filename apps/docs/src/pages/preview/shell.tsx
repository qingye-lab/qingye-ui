/** 预览页共用的外壳：页面切换、密度与明暗开关。切换器本身就是被预览的组件。 */
import * as React from "react";
import { Button } from "@qingye/ui/components/button";
import { Select, SelectItem, SelectPopup, SelectTrigger } from "@qingye/ui/components/select";
import { Tabs, TabsList, TabsTab } from "@qingye/ui/components/tabs";
import type { Density } from "./types";

export type PreviewPageId = "components" | "inputs" | "data" | "navigation" | "overlay" | "composition" | "settings" | "workbench" | "detail";

/* 前五个是组件页（按用途分组），后三个是用这些组件拼出的真实页面。 */
export const PREVIEW_PAGES: readonly { id: PreviewPageId; label: string }[] = [
  { id: "components", label: "基础" },
  { id: "inputs", label: "进阶输入" },
  { id: "data", label: "数据展示" },
  { id: "navigation", label: "导航" },
  { id: "overlay", label: "浮层与反馈" },
  { id: "composition", label: "组合" },
  { id: "settings", label: "设置页" },
  { id: "workbench", label: "集合工作台" },
  { id: "detail", label: "编辑详情" },
];

const DENSITY_ITEMS = [{ value: "default", label: "默认密度" }, { value: "compact", label: "紧凑密度" }];

export const isPreviewPage = (value: string): value is PreviewPageId => PREVIEW_PAGES.some(entry => entry.id === value);

export function PreviewShell({ page, onPageChange, density, onDensityChange, theme, onThemeChange, children }: {
  page: PreviewPageId;
  onPageChange: (next: PreviewPageId) => void;
  density: Density;
  onDensityChange: (next: Density) => void;
  theme: "light" | "dark";
  onThemeChange: (next: "light" | "dark") => void;
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-10 flex flex-wrap items-center gap-(--qy-action-gap) border-b border-border bg-background px-(--qy-page-gutter) py-(--qy-field-gap)">
      <span className="me-(--qy-field-gap) text-body-strong">青野 UI</span>
      <Tabs value={page} onValueChange={value => onPageChange(value as PreviewPageId)}>
        <TabsList aria-label="预览页面">
          {PREVIEW_PAGES.map(entry => <TabsTab key={entry.id} value={entry.id}>{entry.label}</TabsTab>)}
        </TabsList>
      </Tabs>
      <div className="ms-auto flex items-center gap-(--qy-action-gap)">
        {/* items 让触发器显示「默认密度」而不是原始值 default：Select 只有拿到值→名称的表
         *  才知道怎么称呼当前值（名实相符）。 */}
        <Select items={DENSITY_ITEMS} value={density === "compact" ? "compact" : "default"} onValueChange={next => onDensityChange(next === "compact" ? "compact" : "default")}>
          {/* 省略 children 时触发器自带 SelectValue 与展开图标。 */}
          <SelectTrigger className="w-fit" aria-label="密度" />
          <SelectPopup>
            <SelectItem value="default">默认密度</SelectItem>
            <SelectItem value="compact">紧凑密度</SelectItem>
          </SelectPopup>
        </Select>
        <Button variant="bordered" onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? "浅色" : "深色"}</Button>
      </div>
    </header>
    {children}
  </div>;
}
