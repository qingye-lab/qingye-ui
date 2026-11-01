"use client";
import * as React from "react";
import { Tooltip, TooltipPopup, TooltipTrigger } from "./tooltip";
import { useUILocale } from "../locale";
import { received } from "../require-name";
import { cn } from "../utils";

export type RelativeTimeValue = Date | string | number;
export type RelativeTimeProps = Omit<React.ComponentProps<"time">, "children" | "dateTime"> & {
  /** 要说明的时刻：Date、ISO 8601 字符串，或毫秒时间戳。无法解析时抛错。 */
  value: RelativeTimeValue;
  /** 固定的参照时刻（同样接受三种写法）。给出后文字只由 value 与 now 决定，不随时间刷新：供测试与静态渲染。 */
  now?: RelativeTimeValue;
};

/*
 * 相对时间（「3 分钟前」）。读者要的是“多久以前”，核对时要的是“具体几点”，所以两者都留着：
 * - 可见文字是相对说法；绝对时间在悬停提示里（鼠标），也在同一元素内的仅读屏文字里（读屏）。
 *   绝对时间不放进 title：title 读屏读不到，也不可靠。<time> 不是控件，不进 Tab 序，所以悬停提示只给指针；
 *   不为它新增 Tab 停靠点。需要键盘也能看到绝对时间的位置（如详情页），由调用方直接写出绝对时间。
 * - dateTime 是机器可读的 ISO 8601（UTC），与显示语言无关。
 */

const SECOND = 1000, MINUTE = 60 * SECOND, HOUR = 60 * MINUTE, DAY = 24 * HOUR;
/*
 * 说法的档位：从远到近取第一个“放得下至少一个单位”的。分、时、日是定义出来的整数倍（不顾夏令时的 23/25 小时日）；
 * 月按 30 日、年按 365 日只是近似，预设——相对说法本来就不精确到日历，需要精确日期的读者看绝对时间。
 * 不足一分钟统一说“现在”（Intl 的 0 秒）：显示精度的下限是分钟，不逐秒跳动。
 * 取整是向零截断（3 分 59 秒说“3 分钟前”），与大多数界面一致；未来的时刻对称地截断（“3 分钟后”）。
 */
const UNITS: readonly (readonly [Intl.RelativeTimeFormatUnit, number])[] = [["year", 365 * DAY], ["month", 30 * DAY], ["day", DAY], ["hour", HOUR], ["minute", MINUTE]];
function relativeText(formatter: Intl.RelativeTimeFormat, time: number, now: number) {
  const difference = time - now;
  for (const [unit, size] of UNITS) if (Math.abs(difference) >= size) return formatter.format(Math.trunc(difference / size), unit);
  return formatter.format(0, "second");
}

/*
 * 刷新间隔的分档（预设）：距现在越近，文字越快变，所以刷得越勤；远了就没必要。
 * 决定间隔的关系只有一条：间隔不超过此档显示的单位，这样文字翻到下一个数的延迟小于一个单位。
 * 具体数值是预设：一分钟内 10 秒（翻到“1 分钟前”最多晚 10 秒）、一小时内 30 秒（单位是分钟）、更久 5 分钟（单位是小时或更大）。
 */
const REFRESH_TIERS: readonly { within: number; every: number }[] = [{ within: MINUTE, every: 10 * SECOND }, { within: HOUR, every: 30 * SECOND }, { within: Infinity, every: 5 * MINUTE }];
const refreshEvery = (age: number) => REFRESH_TIERS.find(tier => age < tier.within)!.every;

/*
 * 全部实例共用一个计时器：每次到点只读一次 Date.now()，通知所有订阅者；到点后按订阅者里最勤的那一档重排下一次。
 * 订阅者拿到的是“渲染出的相对文字”这个字符串快照（useSyncExternalStore），文字没变就不重渲染，
 * 所以一小时档的实例不会因为一分钟档的实例而重渲染。刷新只改文字、不设 aria-live：读屏不会因此播报。
 */
type Subscriber = { time: number; notify: () => void };
const subscribers = new Set<Subscriber>();
let clockNow = Date.now(), lastTick = clockNow, due = 0;
let timer: ReturnType<typeof setTimeout> | undefined;
function schedule() {
  if (!subscribers.size) { clearTimeout(timer); timer = undefined; return; }
  let every = Infinity;
  for (const subscriber of subscribers) every = Math.min(every, refreshEvery(Math.abs(subscriber.time - clockNow)));
  const at = lastTick + every;
  if (timer !== undefined && due <= at) return; // 已排的一次不晚于需要的：不重排，免得频繁订阅把计时器一再推后
  clearTimeout(timer);
  due = at;
  timer = setTimeout(tick, Math.max(0, at - Date.now()));
}
function tick() {
  clearTimeout(timer); timer = undefined;
  clockNow = lastTick = Date.now();
  subscribers.forEach(subscriber => subscriber.notify());
  schedule();
}
// 后台标签页的计时器会被浏览器放慢；回到前台时立刻对一次表，免得读者先看到过期的说法。
const onVisibility = () => { if (document.visibilityState === "visible") tick(); };
function subscribeClock(time: number) {
  return (notify: () => void) => {
    if (!subscribers.size) {
      clockNow = lastTick = Date.now();
      if (typeof document !== "undefined") document.addEventListener("visibilitychange", onVisibility);
    }
    const subscriber: Subscriber = { time, notify };
    subscribers.add(subscriber);
    schedule();
    return () => {
      subscribers.delete(subscriber);
      if (!subscribers.size && typeof document !== "undefined") document.removeEventListener("visibilitychange", onVisibility);
      schedule();
    };
  };
}
// 没有订阅者（首次渲染前）时没有计时器维护 clockNow，现读；有订阅者时返回上次到点的读数，同一次渲染内保持稳定。
function readClock() { if (!subscribers.size) clockNow = Date.now(); return clockNow; }
const noSubscription = () => () => {};

function toTime(name: "value" | "now", input: unknown): number {
  const time = input instanceof Date ? input.getTime() : typeof input === "number" ? new Date(input).getTime() : typeof input === "string" && input.trim() ? new Date(input).getTime() : NaN;
  if (!Number.isFinite(time)) throw new RangeError(`RelativeTime ${name} must be a valid Date, an ISO 8601 string, or a millisecond timestamp; received ${input instanceof Date ? "an invalid Date" : received(input)}.`);
  return time;
}

/** 相对时间的文字跟随所在那一行的字号与字重；元素固定是 `<time>`，所以不提供 render。 */
export function RelativeTime({ value, now, className, ref, ...props }: RelativeTimeProps) {
  const time = toTime("value", value);
  const fixed = now === undefined ? undefined : toTime("now", now);
  const { code, messages } = useUILocale();
  const relative = React.useMemo(() => new Intl.RelativeTimeFormat(code, { numeric: "auto" }), [code]);
  const absolute = React.useMemo(() => new Intl.DateTimeFormat(code, { dateStyle: "medium", timeStyle: "medium" }).format(time), [code, time]);
  const isFixed = fixed !== undefined;
  const subscribe = React.useMemo(() => isFixed ? noSubscription : subscribeClock(time), [isFixed, time]);
  const text = React.useSyncExternalStore(subscribe, () => relativeText(relative, time, fixed ?? readClock()), () => relativeText(relative, time, fixed ?? Date.now()));
  // 文字依赖当前时刻与时区，服务端渲染与首次水合可能不同；dateTime 是固定的，不受影响。
  return <Tooltip>
    <TooltipTrigger {...props as object} ref={ref as React.Ref<HTMLButtonElement>} render={<time dateTime={new Date(time).toISOString()} />} data-slot="relative-time" className={cn(className as string | undefined)}>
      <span data-slot="relative-time-text" suppressHydrationWarning>{text}</span>
      <span data-slot="relative-time-absolute" className="sr-only" suppressHydrationWarning>{messages.relativeTimeAbsolute(absolute)}</span>
    </TooltipTrigger>
    <TooltipPopup><span suppressHydrationWarning>{absolute}</span></TooltipPopup>
  </Tooltip>;
}
