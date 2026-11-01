# RelativeTime

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/relative-time
Source: packages/ui/src/components/relative-time.tsx
Source SHA-256: 6f2886b8777aa3c19b4c3773b05e84246c46295cb9e707a22aeab7a3487ad2f6

States a moment as "3 minutes ago" while keeping the exact time checkable; every instance shares one refresh timer.

## Decision
A relative phrase is not calendar-exact, so a reader who must verify needs the absolute time: it is in the hover tooltip and the screen-reader text, never only in title. Passing now stops refreshing; do not pin it in a view that must follow the clock.

## Notes
- Under one minute reads "now"; after that the phrase truncates toward zero by minute, hour, day, month and year. A month is approximated as 30 days and a year as 365 days (presets).
- Refreshing has three tiers by distance from now: every 10 seconds within a minute, every 30 seconds within an hour, every 5 minutes beyond (presets). Refreshing only changes the text and sets no aria-live, so nothing is announced.
- A value that cannot be parsed as a time (an invalid Date, a non-time string, NaN) throws a descriptive error.

## Use and ownership
- Moments in lists, tables and prose where "how long ago" matters more than the clock time.
- Relative times that recur across a view and need one wording and one refresh cadence.
- Avoid: Write the absolute time separately where exact checking matters (audits, deadlines); do not rely on the relative phrase alone.
- Avoid: Do not wrap it in another Tooltip or write your own timer.
- Library: Relative text, absolute time, dateTime, the shared timer and its tiers.
- Application: The moment to describe (value); a fixed reference (now) for tests or static rendering.

## Composition
- The element is always time; the machine-readable dateTime comes from value; the language comes from UILocaleProvider.
- Sits inside a sentence, table cell or description list and follows the row's size and weight.

## Responsive behavior
- Text wraps with its row; the hover tooltip is for pointers, and touch or keyboard readers get the absolute time from the screen-reader text and page context.

## Customization
- className, ref, ARIA and events pass through to time; there is no render because the element's semantics are fixed.

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
Renders a time element: the relative text is visible; the absolute time is in the hover tooltip and the screen-reader-only text.
- value: Date | string | number. Required moment to describe: a Date, an ISO 8601 string or a millisecond timestamp.
- now: Date | string | number. A fixed reference moment. When given, nothing refreshes; for tests and static rendering.
- ref / native props: React.ComponentProps<"time">. id, ARIA, data attributes and events pass through to the time element; dateTime and children are set by the component.

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
