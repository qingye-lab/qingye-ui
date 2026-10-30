"use client";

import * as React from "react";

/*
 * 工具条吸顶（FilterBar、BulkActionBar 共用）。吸顶需要知道「是否真的吸住了」，而条在容器顶端的文流位置与吸住位置可能重合，
 * 所以吸附位置定在容器顶之上 1px（-top-px，条内补 pt-px 使内容不动）：条一旦吸住就被容器裁掉 1px，
 * 「未完全可见且上沿高于容器顶」＝吸住；在文流里时上沿不低于容器顶，不会误判。观察的是条本身——
 * 条内的哨兵会随 sticky 条一起移动，判不出吸住（浏览器实测）。观察根取最近的带 overflow 的祖先，与 CSS sticky 的参照一致；
 * 没有 IntersectionObserver 的环境不标记。
 */
export function useStuck<T extends HTMLElement>(enabled: boolean) {
  const target = React.useRef<T>(null); const [stuck, setStuck] = React.useState(false);
  React.useEffect(() => {
    const node = target.current; if (!enabled || !node || typeof IntersectionObserver === "undefined") { setStuck(false); return; }
    let root: HTMLElement | null = node.parentElement; while (root && /^(visible|clip)$/.test(getComputedStyle(root).overflowY)) root = root.parentElement;
    const observer = new IntersectionObserver(([entry]) => setStuck(Boolean(entry && entry.intersectionRatio < 1 && entry.rootBounds && entry.boundingClientRect.top < entry.rootBounds.top)), { root, threshold: [1] }); observer.observe(node); return () => observer.disconnect();
  }, [enabled]);
  return { target, stuck };
}
/*
 * 底色取承载面 bg-surface（WorkspaceContent 的底），不另造色。
 * z-2：工具条在页面滚动容器里吸顶，表格的吸顶表头（TableHeader sticky，z-[1]）在 DOM 里排在其后、同在一个层叠上下文，
 * 必须高它一层才不会被滚上来的表头盖住；数值本身为预设，只表达这一先后。
 * 下沿留 --qy-field-gap 再画线；线用 border-b，平时透明占位避免吸住时跳 1px，吸住（data-stuck）才显出 border 色（骨法用笔：无物滚过不画线）。
 */
export const stickyBarClassName = "sticky -top-px pt-px z-2 border-b border-transparent bg-surface pb-(--qy-field-gap) data-stuck:border-border";
