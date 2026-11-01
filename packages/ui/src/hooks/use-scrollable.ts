"use client";

import * as React from "react";

/*
 * 量一个元素的滚动几何：区域自身尺寸变化（容器缩放）与内部内容变化（折行、异步内容）都会重新量，
 * 所以同时观察元素和它的直接子元素；需要时连滚动也算一次变化。合并外部传入的 ref。
 * 首帧（含服务端渲染）用 empty，挂载后量一次。read 与 same 须是模块级常量，且在同一调用处不随渲染改变。
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
 * 滚动区某一轴的两端各自还有没有被切掉的内容。横轴方向无关：滚动偏移以起始端为 0，RTL 下 scrollLeft 为负或为零，
 * 取绝对值后「离起始端多远」在两个方向含义一致；纵轴的起始端是顶端。1px 容差吸收亚像素舍入，避免滚到头仍判为有内容。
 */
export type OverflowEdges = { start: boolean; end: boolean };
const noEdges: OverflowEdges = { start: false, end: false };
const edgesOf = (max: number, offset: number): OverflowEdges => max > 1 ? { start: offset > 1, end: offset < max - 1 } : noEdges;
const readEdgesX = (element: HTMLElement) => edgesOf(element.scrollWidth - element.clientWidth, Math.abs(element.scrollLeft));
const readEdgesY = (element: HTMLElement) => edgesOf(element.scrollHeight - element.clientHeight, element.scrollTop);
const sameEdges = (a: OverflowEdges, b: OverflowEdges) => a.start === b.start && a.end === b.end;
export function useOverflowEdges<T extends HTMLElement>(forwardedRef?: React.Ref<T>, axis: "x" | "y" = "x"): [React.RefCallback<T>, OverflowEdges] {
  return useMeasured(forwardedRef, noEdges, axis === "x" ? readEdgesX : readEdgesY, sameEdges, true);
}

/*
 * 原生滚动条占的条带（经典滚动条占位，覆盖式滚动条为 0）：竖向条带在行内末端（RTL 在左），横向条带在底端。
 * 宽度从盒子外缘量起，含滚动条那一侧的边框，供遮罩把条带整条留成不透明；没有滚动条时为 0，边框照常随遮罩。
 */
export type ScrollbarGutter = { y: number; x: number };
const noGutter: ScrollbarGutter = { y: 0, x: 0 };
const readGutter = (element: HTMLElement): ScrollbarGutter => {
  const style = getComputedStyle(element);
  const left = parseFloat(style.borderLeftWidth) || 0, right = parseFloat(style.borderRightWidth) || 0;
  const top = parseFloat(style.borderTopWidth) || 0, bottom = parseFloat(style.borderBottomWidth) || 0;
  const barY = element.offsetWidth - element.clientWidth - left - right, barX = element.offsetHeight - element.clientHeight - top - bottom;
  return { y: barY > 0 ? barY + (style.direction === "rtl" ? left : right) : 0, x: barX > 0 ? barX + bottom : 0 };
};
const sameGutter = (a: ScrollbarGutter, b: ScrollbarGutter) => a.y === b.y && a.x === b.x;
export function useScrollbarGutter<T extends HTMLElement>(forwardedRef?: React.Ref<T>): [React.RefCallback<T>, ScrollbarGutter] {
  return useMeasured(forwardedRef, noGutter, readGutter, sameGutter, false);
}
