"use client";

import * as React from "react";

/*
 * 只有内容确实溢出、键盘用户才需要借焦点滚动它；不溢出的区域进入 Tab 序列，只是多一个空停靠点（名实相符）。
 * 溢出以 scrollHeight / scrollWidth 大于 clientHeight / clientWidth 判定，两个方向都看：
 * 区域自身尺寸变化（容器缩放）与内部内容变化（折行、异步内容）都会重新量，所以同时观察元素和它的直接子元素。
 * 首帧（含服务端渲染）按「不溢出」处理，挂载后量一次。
 */
export function useScrollable<T extends HTMLElement>(forwardedRef?: React.Ref<T>): [React.RefCallback<T>, boolean] {
  const [element, setElement] = React.useState<T | null>(null);
  const [scrollable, setScrollable] = React.useState(false);
  const ref = React.useCallback((node: T | null) => {
    setElement(node);
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) (forwardedRef as React.MutableRefObject<T | null>).current = node;
  }, [forwardedRef]);
  React.useEffect(() => {
    if (!element) { setScrollable(false); return; }
    const measure = () => setScrollable(element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const resize = new ResizeObserver(measure);
    const observeChildren = () => { resize.disconnect(); resize.observe(element); for (const child of element.children) resize.observe(child); };
    observeChildren();
    const mutation = typeof MutationObserver === "undefined" ? undefined : new MutationObserver(() => { observeChildren(); measure(); });
    mutation?.observe(element, { childList: true, subtree: true, characterData: true });
    return () => { resize.disconnect(); mutation?.disconnect(); };
  }, [element]);
  return [ref, scrollable];
}
