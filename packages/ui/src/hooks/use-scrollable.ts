"use client";

import * as React from "react";

/*
 * 量一个元素的滚动几何：区域自身尺寸变化（容器缩放）与内部内容变化（折行、异步内容）都会重新量，
 * 所以同时观察元素和它的直接子元素；需要时连滚动也算一次变化。合并外部传入的 ref。
 * 首帧（含服务端渲染）用 empty，挂载后量一次。read 与 same 须是模块级常量，不随渲染变化。
 */
function useMeasured<T extends HTMLElement, V>(forwardedRef: React.Ref<T> | undefined, empty: V, read: (element: T) => V, same: (a: V, b: V) => boolean, onScroll: boolean): [React.RefCallback<T>, V] {
  const [element, setElement] = React.useState<T | null>(null);
  const [value, setValue] = React.useState(empty);
  const ref = React.useCallback((node: T | null) => {
    setElement(node);
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) (forwardedRef as React.MutableRefObject<T | null>).current = node;
  }, [forwardedRef]);
  React.useEffect(() => {
    if (!element) { setValue(empty); return; }
    const measure = () => { const next = read(element); setValue(prev => same(prev, next) ? prev : next); };
    measure();
    if (onScroll) element.addEventListener("scroll", measure, { passive: true });
    const resize = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(measure);
    const observeChildren = () => { if (!resize) return; resize.disconnect(); resize.observe(element); for (const child of element.children) resize.observe(child); };
    observeChildren();
    const mutation = typeof MutationObserver === "undefined" ? undefined : new MutationObserver(() => { observeChildren(); measure(); });
    mutation?.observe(element, { childList: true, subtree: true, characterData: true });
    return () => { element.removeEventListener("scroll", measure); resize?.disconnect(); mutation?.disconnect(); };
    // empty、read、same 是调用方的模块级常量。
  }, [element, onScroll]);
  return [ref, value];
}

/*
 * 只有内容确实溢出、键盘用户才需要借焦点滚动它；不溢出的区域进入 Tab 序列，只是多一个空停靠点（名实相符）。
 * 溢出以 scrollHeight / scrollWidth 大于 clientHeight / clientWidth 判定，两个方向都看。
 */
const readScrollable = (element: HTMLElement) => element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
const sameValue = Object.is;
export function useScrollable<T extends HTMLElement>(forwardedRef?: React.Ref<T>): [React.RefCallback<T>, boolean] {
  return useMeasured(forwardedRef, false, readScrollable, sameValue, false);
}

/*
 * 横向滚动区的两端各自还有没有被切掉的内容。方向无关：滚动偏移以起始端为 0，RTL 下 scrollLeft 为负或为零，
 * 取绝对值后「离起始端多远」在两个方向含义一致。1px 容差吸收亚像素舍入，避免滚到头仍判为有内容。
 */
export type OverflowEdges = { start: boolean; end: boolean };
const noEdges: OverflowEdges = { start: false, end: false };
const readEdges = (element: HTMLElement): OverflowEdges => {
  const max = element.scrollWidth - element.clientWidth, offset = Math.abs(element.scrollLeft);
  return max > 1 ? { start: offset > 1, end: offset < max - 1 } : noEdges;
};
const sameEdges = (a: OverflowEdges, b: OverflowEdges) => a.start === b.start && a.end === b.end;
export function useOverflowEdges<T extends HTMLElement>(forwardedRef?: React.Ref<T>): [React.RefCallback<T>, OverflowEdges] {
  return useMeasured(forwardedRef, noEdges, readEdges, sameEdges, true);
}
