"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useUILocale } from "../locale";
import { navLineCurrentClassName, navLineItemClassNameVertical, navLineListClassNameVertical } from "../nav-line";
import { cn } from "../utils";

export type TocItem = { id: string; label: string; level: 2 | 3 };

/*
 * 阅读目录（design.md「表达九法」；基础层 §6、§7、§19）：与 Tabs、NavigationMenu 同一类
 * 任务——在几个目的地间走动，不是选一个值——只是目的地纵向排列，所以共用 src/nav-line.ts
 * 的机制、换成纵向变体，不另起一套画法：清墨基线贯穿整份列表，当前项把自己那一段线加深为
 * 焦墨（状态只加深已有的线，不新增形、不加粗）；未到达的目的地浓墨，悬停焦墨，当前项不改
 * 字重（避免文字变宽、整排跳动，navLineItemClassNameVertical 的字重随 text-support 走，
 * 不随当前状态变化）。
 *
 * 本库不读路由、不做平滑滚动：<a href="#id"> 是原生锚点跳转；路由集成、滚动行为、
 * scroll-padding-top 这类页面级细节留给项目（Toc 不知道页面有没有吸顶头部）。
 *
 * 字号：13px（text-support，与基础层 §8 一致）——目录是辅助导航，不是正文，字号低于
 * 一档，但仍是分格上的既有内容档，不新开尺寸；行高 = 材（支持档的 leading 本就是
 * var(--qy-cai)），条目按行居中不必另算。
 *
 * 层级缩进（以材为祖）：二级目录到基线的距离 = 组内间隔（--qy-field-gap，线与它标记的
 * 内容之间是贴身关系）；三级在此基础上再加一层层级缩进（--qy-level-indent，基础层 §3
 * 为它写的关系就是「明显小于行高，又大到一眼数得出级数」，这正是目录要的「看得出是子项」）。
 * 两者相加 = 20px，不是巧合也不是另造值，只是两个已有关系相加后落在材上。
 *
 * 命中区：目录条目是纵向紧排的短文字行，touch-target 的 44px 命中层会盖住上下条目
 * （link.tsx 对行内链接的同一条理由），所以不加；用 py-(--qy-fen) 把条目撑到 28px
 * （7 分），在分格上，也比纯文字行更容易点中。
 *
 * 状态归属：当前项（aria-current="location"）——不是 "page"，目录指向的是本页内的位置，
 * 不是另一个页面——由调用方决定，组件不猜测滚动位置。本文件额外导出两个可选工具：
 * useTocHeadings 从容器里扫描 h2/h3[id]；useTocScrollSpy 按滚动位置计算当前 id，
 * 接受一个可选的滚动容器引用，不默认为 window 之外的任何容器，也不强加路由副作用。
 * 调用方可以只用 Toc + 自己的 items/current，完全不用这两个工具。
 */

const INDENT: Record<TocItem["level"], string> = {
  2: "ps-(--qy-field-gap)",
  3: "ps-[calc(var(--qy-field-gap)+var(--qy-level-indent))]",
};

export type TocProps = Omit<useRender.ComponentProps<"nav">, "children"> & {
  items: TocItem[];
  /**
   * 当前所在目的地的 id；缺省时没有条目带 aria-current，纯展示一份目录。类型显式带
   * `| undefined`：useTocScrollSpy 在没有命中任何目的地时返回 undefined，这个值需要能
   * 直接传入（exactOptionalPropertyTypes 下，`current?: string` 只允许省略整个属性，
   * 不允许显式传 undefined）。
   */
  current?: string | undefined;
};

export function Toc({ items, current, render, className, ...props }: TocProps) {
  const { messages } = useUILocale();
  // useRender 内部用了 hook，要无条件调用；用 enabled 表达「没有条目就不渲染」，
  // 不能用提前 return 跳过这次调用（rules-of-hooks：hook 调用次数不能随条件变化）。
  return useRender({
    defaultTagName: "nav",
    render,
    enabled: items.length > 0,
    props: mergeProps({
      "data-slot": "toc",
      "aria-label": messages.toc,
      className: cn("min-w-0", className),
      children: (
        <ul className={navLineListClassNameVertical}>
          {items.map((item) => {
            const isCurrent = item.id === current;
            return (
              <li key={item.id} data-slot="toc-item" className="min-w-0">
                <a
                  href={`#${item.id}`}
                  aria-current={isCurrent ? "location" : undefined}
                  className={cn(navLineItemClassNameVertical, "py-(--qy-fen)", INDENT[item.level], isCurrent && navLineCurrentClassName)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      ),
    }, props),
  });
}

const DEFAULT_SELECTOR = ":is(h2,h3)[id]";

function sameItems(a: TocItem[], b: TocItem[]): boolean {
  return a.length === b.length && a.every((item, index) => item.id === b[index]!.id && item.label === b[index]!.label && item.level === b[index]!.level);
}

/** 从一段已渲染内容里直接读出标题；调用方负责给标题赋 id（锚点跳转需要它）。 */
export function scanTocHeadings(root: Element, selector: string = DEFAULT_SELECTOR): TocItem[] {
  return [...root.querySelectorAll<HTMLElement>(selector)].map((el) => ({
    id: el.id,
    label: el.textContent?.trim() ?? "",
    level: el.tagName === "H3" ? 3 : 2,
  }));
}

/** scanTocHeadings 的 React 封装：内容变化（含异步加载）时重新扫描。 */
export function useTocHeadings(container: React.RefObject<Element | null>, selector: string = DEFAULT_SELECTOR): TocItem[] {
  const [items, setItems] = React.useState<TocItem[]>([]);
  React.useEffect(() => {
    const root = container.current;
    if (!root) return;
    let frame = 0;
    const scan = () => setItems((previous) => {
      const next = scanTocHeadings(root, selector);
      return sameItems(previous, next) ? previous : next;
    });
    scan();
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    observer.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["id"] });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [container, selector]);
  return items;
}

export type TocScrollSpyOptions = {
  /** 滚动的容器；缺省为 window——组件不猜测页面用了哪个滚动容器，调用方必须显式给出非 window 的情形。 */
  container?: React.RefObject<HTMLElement | null>;
  /** 吸顶头部一类的视口偏移，与判断「已进入这一节」的阈值相同。 */
  offset?: number;
};

/** 按滚动位置计算当前目的地；不写入任何状态之外的副作用，不读路由。 */
export function useTocScrollSpy(items: TocItem[], options: TocScrollSpyOptions = {}): string | undefined {
  const { container, offset = 0 } = options;
  const [active, setActive] = React.useState<string | undefined>(undefined);
  React.useEffect(() => {
    if (!items.length) {
      setActive(undefined);
      return;
    }
    const scrollTarget: HTMLElement | Window = container?.current ?? window;
    let frame = 0;
    const update = () => {
      let next = items[0]!.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) next = item.id;
        else break;
      }
      const el = container?.current;
      const scrollTop = el ? el.scrollTop : window.scrollY;
      const scrollHeight = el ? el.scrollHeight : document.documentElement.scrollHeight;
      const clientHeight = el ? el.clientHeight : window.innerHeight;
      if (clientHeight + scrollTop >= scrollHeight - 4 && scrollTop > 0) next = items.at(-1)!.id;
      setActive(next);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      scrollTarget.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items, offset, container]);
  return active;
}
