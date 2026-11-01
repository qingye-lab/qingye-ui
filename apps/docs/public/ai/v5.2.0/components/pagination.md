# 分页 Pagination

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/pagination
Source: packages/ui/src/components/pagination.tsx
Source SHA-256: 7b07abeea9f8f8a94d87a23f9168ec613aaabdef810c06fb4df56db15caf98ac

页位置、真实入口与明确的未知总数。

## Decision
PaginationPattern 一行呈现范围摘要、页窗与条数选择，只放能改变结果的控件；页码与 pageSize 一次通知，总数下降时校正。未知总数必须显式提供 hasNextPage。链接导航或自定结构继续使用分页原语。

## Notes
- 标准组合不请求数据或保存路由；受控 value 越界时呈现校正页，并以 total-change 通知一次，应用据此更新状态和请求。未知总数不证明有无下一页。
- 自 5.2.0：PaginationPattern 与 DataTablePattern 分页条改为一行布局与图标翻页按钮，属性不变；只有一页、0 条或游标首页无下一页时控件收起或整条不渲染，依赖这些按钮常驻的测试需按新行为更新。自定完整 UILocale 时补 paginationRange；paginationSummary 已弃用，下个主版本移除。

## Use and ownership
- 结果按页呈现，页位置和方向可用性已知。
- Avoid: 过程进度用 Steps；不确定结果总数时不伪造末页。
- Library: 页入口的导航、列表、当前页语义与真实禁用。
- Application: 页内容、当前页、总数或未知、前后页可用性与请求结果。

## Composition
- PaginationPattern：本地页动作的标准组合：上一页／下一页为带名称的图标按钮，页窗格数恒定，当前页以选中面标出。
- Pagination：有名称的 nav，不生成页码。
- PaginationList / PaginationItem：ul / li 组织页面入口。
- PaginationLink：a，匹配当前页时 aria-current=page，并以选中面加中等字重呈现；每个页码按中等字重预留宽度，当前页进出时按钮不变宽。
- PaginationPrevious / PaginationNext：复用 Button；省略 children 时显示本地化的上一页／下一页文字。仅用图标替换内容时，必须用 aria-label、aria-labelledby 或 sr-only 文字提供方向名称，并隐藏装饰图标。
- PaginationEllipsis：省略页名称，不代表末页。

## Responsive behavior
- 宽屏一行：摘要在左，页码与条数在右。窄屏页窗收为五格，页码排独占第二行。

## Customization
- 先使用当前属性与组合，再调整项目集中主题；共享缺口在公共库修复。
- 品牌、明暗和密度分别配置，主题不改变权限或保存策略。

## Current exports
- normalizePaginationValue: function; owner pagination; PASS; props: PaginationValue
- Pagination: function; owner pagination; PASS; props: PaginationProps
- PaginationChangeDetails: type; owner pagination; PASS
- PaginationEllipsis: function; owner pagination; PASS; props: PaginationEllipsisProps
- PaginationEllipsisProps: type; owner pagination; PASS
- PaginationItem: function; owner pagination; PASS; props: PaginationItemProps
- PaginationItemProps: type; owner pagination; PASS
- PaginationLink: function; owner pagination; PASS; props: PaginationLinkProps
- PaginationLinkProps: type; owner pagination; PASS
- PaginationList: function; owner pagination; PASS; props: PaginationListProps
- PaginationListProps: type; owner pagination; PASS
- PaginationNext: function; owner pagination; PASS; props: PaginationNextProps
- PaginationNextProps: type; owner pagination; PASS
- PaginationPattern: function; owner pagination; PASS; props: PaginationPatternProps
- PaginationPatternProps: type; owner pagination; PASS
- PaginationPrevious: function; owner pagination; PASS; props: PaginationPreviousProps
- PaginationPreviousProps: type; owner pagination; PASS
- PaginationProps: type; owner pagination; PASS
- PaginationValue: type; owner pagination; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Pagination
- `page?`: `number`.
- `totalPages`: `number | null`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### PaginationEllipsis
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### PaginationItem
- no props declared by this library
- plus 282 inherited (@types/react 281, @base-ui/react 1); not expanded, see the installed declarations

### PaginationLink
- `page`: `number`.
- plus 289 inherited (@types/react 288, @base-ui/react 1); not expanded, see the installed declarations

### PaginationList
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### PaginationNext
- `className?`: `string`.
- `data-slot?`: `string`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `tone?`: `"neutral" | "danger"`.
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 288 inherited (@types/react 285, @base-ui/react 3); not expanded, see the installed declarations

### PaginationPattern
- `busy?`: `boolean`. 正在取数（例如 DataTablePattern busy）。与 disabled 的区别：翻页被挡住，但按钮保持可聚焦—— 原生 disabled 会让刚按下的那个按钮立刻丢掉焦点，键盘用户被甩到页面顶部。页大小选择改为只读（同样留住焦点）。
- `defaultValue?`: `PaginationValue`.
- `disabled?`: `boolean`.
- `hasNextPage?`: `boolean`.
- `onValueChange?`: `(value: PaginationValue, details: PaginationChangeDetails) => void`.
- `pageSizeOptions?`: `readonly number[]`. Omit to hide the page-size control. Values must be distinct positive integers.
- `totalCount`: `number`.
- `value?`: `PaginationValue`.
- plus 278 inherited (@types/react 277, @base-ui/react 1); not expanded, see the installed declarations

### PaginationPrevious
- `className?`: `string`.
- `data-slot?`: `string`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `tone?`: `"neutral" | "danger"`.
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 288 inherited (@types/react 285, @base-ui/react 3); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context PageContext: without a provider nullable; provided by Pagination

## Curated API
Written descriptions; the list above is the type-resolved fact.

### PaginationPattern
本地页动作的标准组合：上一页／下一页为带名称的图标按钮，页窗格数恒定，当前页以选中面标出。
- value / defaultValue / onValueChange: PaginationValue / (value, { reason }) => void. { page, pageSize } 原子更新；page 从 1 开始。reason 为 page、page-size 或 total-change。条数改变同时回到第 1 页。
- totalCount / hasNextPage: number | null / boolean. 非负条数计算总页数，下降时校正当前页；只有一页时只留范围摘要，0 条时显示「共 0 条」。未知 null 时必须显式给 hasNextPage，不推断末页；第 1 页且无下一页时整条不渲染。
- pageSizeOptions / disabled / busy: readonly number[] / boolean / boolean. 省略 options 时隐藏条数控件；候选为不重复正整数。总数不超过最小候选时，换条数不改变结果，控件不出现。disabled 只阻止本地操作，不推断请求状态。busy 同样挡住翻页，但按钮保持可聚焦（原生 disabled 会让刚按下的按钮丢掉焦点），条数控件改为只读；DataTablePattern 的 busy 会传给它。
- aria-label / render / ref / native nav props: PaginationProps. 转发到 nav；可访问页名、上一页／下一页图标按钮名称、范围摘要（paginationRange）与条数标签来自 locale。

### Pagination
有名称的 nav，不生成页码。
- page: number. 应用确认的当前正整数页码，零结果可省略。
- totalPages: number | null. 必填非负整数总页数或 null=未知；在内容中明确未知状态。
- aria-label / render / ref / native props: useRender.ComponentProps<nav>. 默认名称来自 locale。

### PaginationList / PaginationItem
ul / li 组织页面入口。
- render / ref / native props: useRender.ComponentProps<ul | li>. 保留原生列表结构。

### PaginationLink
a，匹配当前页时 aria-current=page，并以选中面加中等字重呈现；每个页码按中等字重预留宽度，当前页进出时按钮不变宽。
- page / href / render / ref / native props: { page: number } & useRender.ComponentProps<a>. 应用提供正整数页码与真实目标。

### PaginationPrevious / PaginationNext
复用 Button；省略 children 时显示本地化的上一页／下一页文字。仅用图标替换内容时，必须用 aria-label、aria-labelledby 或 sr-only 文字提供方向名称，并隐藏装饰图标。
- disabled / onClick / render / nativeButton / Button props: ButtonProps. 应用明确禁用；导航可 render 为 a 并设 nativeButton=false。

### PaginationEllipsis
省略页名称，不代表末页。
- children / render / native props: useRender.ComponentProps<span>. 仅在已知有省略页时提供。

## Keyboard

## Source examples
### 页码与每页条数
Source: apps/docs/src/content/pagination/demos/01-pages.tsx
```tsx
import { PaginationPattern } from "@qingye_lab/ui/components/pagination";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "页码与每页条数", titleEn: "Pages and page size" } satisfies DemoMeta;

export default function Demo() {
  return <PaginationPattern aria-label="分页：已知总数" totalCount={95} defaultValue={{ page: 2, pageSize: 20 }} pageSizeOptions={[20, 50, 100]} />;
}
```

### 页数较多
Source: apps/docs/src/content/pagination/demos/02-ellipsis.tsx
```tsx
import { PaginationPattern } from "@qingye_lab/ui/components/pagination";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "页数较多", titleEn: "Many pages" } satisfies DemoMeta;

export default function Demo() {
  return <PaginationPattern aria-label="分页：折叠的页码" totalCount={120} defaultValue={{ page: 6, pageSize: 10 }} />;
}
```

### 总数未知
Source: apps/docs/src/content/pagination/demos/03-unknown.tsx
```tsx
import { PaginationPattern, type PaginationValue } from "@qingye_lab/ui/components/pagination";
import * as React from "react";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "总数未知", titleEn: "Unknown total" } satisfies DemoMeta;

export default function Demo() {
  const [value, setValue] = React.useState<PaginationValue>({ page: 1, pageSize: 20 });
  return <PaginationPattern aria-label="分页：总数未知" totalCount={null} hasNextPage={value.page < 4} value={value} onValueChange={setValue} />;
}
```
