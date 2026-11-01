# 相对时间 RelativeTime

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/relative-time
Source: packages/ui/src/components/relative-time.tsx
Source SHA-256: 6f2886b8777aa3c19b4c3773b05e84246c46295cb9e707a22aeab7a3487ad2f6

把一个时刻说成「3 分钟前」，同时保留可核对的绝对时间；全部实例共用一个刷新计时器。

## Decision
相对说法不精确到日历，需要核对的读者要看绝对时间：绝对时间在悬停提示和读屏文字里，不会只放在 title。传了 now 就不再刷新，不要在要随时间变化的界面里固定它。

## Notes
- 不足一分钟统一说“现在”，之后按分钟、小时、日、月、年向零截断；月按 30 日、年按 365 日近似（预设）。
- 刷新按距离现在的远近分三档：一分钟内每 10 秒、一小时内每 30 秒、更久每 5 分钟（预设）。刷新只改文字，不设 aria-live，读屏不会因此播报。
- value 无法解析成时间（无效的 Date、不是时间的字符串、NaN）会抛出带说明的错误。

## Use and ownership
- 列表、表格与说明里“多久以前发生”比“几点几分”更有用的时刻。
- 同一界面多处出现的相对时间，需要同一套文案与刷新节奏。
- Avoid: 需要精确核对的时刻（审计、截止日）单独写出绝对时间，不只靠相对说法。
- Avoid: 不要为它再套一个 Tooltip 或自己写计时器。
- Library: 相对文字、绝对时间、dateTime、共享计时器与档位。
- Application: 要说明的时刻 value；测试或静态渲染时的固定参照 now。

## Composition
- 元素固定是 time，机器可读的 dateTime 由 value 给出；语言取自 UILocaleProvider。
- 嵌在句子、表格单元格或描述列表里，字号字重跟随所在行。

## Responsive behavior
- 文字随所在行换行；悬停提示只给指针，触屏与键盘读者的绝对时间由读屏文字和页面语境承担。

## Customization
- className、ref、ARIA 与事件透传到 time；不提供 render，元素语义固定。

## Current exports
- RelativeTime: function; owner relative-time; PASS; props: RelativeTimeProps
- RelativeTimeProps: type; owner relative-time; PASS
- RelativeTimeValue: type; owner relative-time; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### RelativeTime
- `now?`: `RelativeTimeValue`. 固定的参照时刻（同样接受三种写法）。给出后文字只由 value 与 now 决定，不随时间刷新：供测试与静态渲染。
- `value`: `RelativeTimeValue`. 要说明的时刻：Date、ISO 8601 字符串，或毫秒时间戳。无法解析时抛错。
- plus 279 inherited (@types/react 279); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### RelativeTime
渲染 time：相对文字可见，绝对时间在悬停提示与仅读屏文字里。
- value: Date | string | number. 要说明的时刻：Date、ISO 8601 字符串或毫秒时间戳，必填。
- now: Date | string | number. 固定的参照时刻。给出后不自动刷新，供测试与静态渲染。
- ref / 原生属性: React.ComponentProps<"time">. id、ARIA、data 属性与事件透传到 time 元素；dateTime 与 children 由组件给出。

## Keyboard

## Source examples
### 远近不同的时刻
Source: apps/docs/src/content/relative-time/demos/01-distances.tsx
```tsx
import { RelativeTime } from "@qingye_lab/ui/components/relative-time";
import { Stack } from "@qingye_lab/ui/components/layout";
export const meta = { title: "远近不同的时刻", titleEn: "Moments at different distances" };
const loaded = Date.now();
const offsets = [20 * 1000, 3 * 60_000, 5 * 3_600_000, 2 * 86_400_000, 40 * 86_400_000];
export default function Demo() {
  return <Stack gap="field" align="start">{offsets.map(offset => <RelativeTime key={offset} value={loaded - offset} />)}</Stack>;
}
```

### 固定参照时间
Source: apps/docs/src/content/relative-time/demos/02-fixed-now.tsx
```tsx
import { RelativeTime } from "@qingye_lab/ui/components/relative-time";
import { Stack } from "@qingye_lab/ui/components/layout";
export const meta = { title: "固定参照时间", titleEn: "A fixed reference time" };
const now = new Date("2026-11-01T10:00:00+08:00");
export default function Demo() {
  return <Stack gap="field" align="start">
    <RelativeTime value="2026-11-01T09:57:00+08:00" now={now} />
    <RelativeTime value="2026-11-01T14:00:00+08:00" now={now} />
    <RelativeTime value="2026-10-30T10:00:00+08:00" now={now} />
  </Stack>;
}
```

### 嵌在句子里
Source: apps/docs/src/content/relative-time/demos/03-inline.tsx
```tsx
import { RelativeTime } from "@qingye_lab/ui/components/relative-time";
export const meta = { title: "嵌在句子里", titleEn: "Inside a sentence" };
const loaded = Date.now();
export default function Demo() {
  return <p className="text-body">设备在 <RelativeTime value={loaded - 12 * 60_000} /> 上报了最后一次心跳，配置在 <RelativeTime value={loaded - 26 * 3_600_000} /> 更新。</p>;
}
```
