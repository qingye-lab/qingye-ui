/*
 * Composer 的 contenteditable 引擎：值 ↔ DOM ↔ 选区的换算。
 *
 * DOM 约定（编辑区里只有这几种东西）：
 * - 文字节点，换行就是文字里的 "\n"（编辑区 white-space: pre-wrap）；
 * - 令牌：`<span contenteditable="false" data-composer-token>`，整体计 1 个模型单位；
 * - 末尾哨兵 `<br>`：值以令牌或换行结尾时补一个，否则浏览器不给最后一个位置画光标。哨兵不计入值。
 * 浏览器自己改过的 DOM（清空后留下的 `<br>`、`<div>` 分块）也能读回，见 parseEditor。
 */
import { normalizeComposerValue, type ComposerSegment, type ComposerTokenSegment, type ComposerValue } from "./model";

export const TOKEN_ATTRIBUTE = "data-composer-token";

const isElement = (node: Node | null | undefined): node is HTMLElement => node?.nodeType === 1;
const isText = (node: Node | null | undefined): node is Text => node?.nodeType === 3;
export const isTokenElement = (node: Node | null | undefined): node is HTMLElement => isElement(node) && node.hasAttribute(TOKEN_ATTRIBUTE);
const blockTags = new Set(["DIV", "P", "LI"]);

export function tokenText(token: Pick<ComposerTokenSegment, "trigger" | "label">) {
  return token.trigger + token.label;
}

export function createTokenElement(doc: Document, token: ComposerTokenSegment, className: string): HTMLElement {
  const element = doc.createElement("span");
  element.setAttribute("contenteditable", "false");
  element.setAttribute(TOKEN_ATTRIBUTE, "");
  element.setAttribute("data-slot", "composer-token");
  element.setAttribute("data-trigger", token.trigger);
  element.setAttribute("data-id", token.id);
  element.setAttribute("data-label", token.label);
  // 令牌是一个整体：role=img 让读屏把它当一个有名字的对象读出，而不是逐字读文字。
  element.setAttribute("role", "img");
  element.setAttribute("aria-label", tokenText(token));
  element.className = className;
  element.textContent = tokenText(token);
  return element;
}

/** 重绘整个编辑区。 */
export function renderEditor(root: HTMLElement, value: ComposerValue, tokenClassName: string) {
  const doc = root.ownerDocument;
  root.replaceChildren();
  for (const segment of value) {
    if (segment.type === "text") root.appendChild(doc.createTextNode(segment.text));
    else root.appendChild(createTokenElement(doc, segment, tokenClassName));
  }
  const last = value[value.length - 1];
  if (last && (last.type === "token" || last.text.endsWith("\n"))) {
    const sentinel = doc.createElement("br");
    sentinel.setAttribute("data-composer-sentinel", "");
    root.appendChild(sentinel);
  }
}

/** 把 DOM 读回成值。 */
export function parseEditor(root: HTMLElement): ComposerSegment[] {
  const out: ComposerSegment[] = [];
  const walk = (parent: Node) => {
    const nodes = Array.from(parent.childNodes);
    nodes.forEach((node, index) => {
      if (isText(node)) {
        out.push({ type: "text", text: node.nodeValue ?? "" });
      } else if (isTokenElement(node)) {
        out.push({ type: "token", trigger: node.getAttribute("data-trigger") ?? "", id: node.getAttribute("data-id") ?? "", label: node.getAttribute("data-label") ?? "" });
      } else if (isElement(node)) {
        if (node.tagName === "BR") {
          // 父节点里最后一个 <br> 是占位（哨兵或浏览器补的），不是换行。
          if (index < nodes.length - 1) out.push({ type: "text", text: "\n" });
        } else {
          if (blockTags.has(node.tagName) && out.length > 0) out.push({ type: "text", text: "\n" });
          walk(node);
        }
      }
    });
  };
  walk(root);
  return normalizeComposerValue(out);
}

/** 一个节点所含的模型单位数，规则与 parseEditor 一致。 */
function unitsOf(node: Node, isLastChild: boolean): number {
  if (isText(node)) return node.length;
  if (isTokenElement(node)) return 1;
  if (isElement(node)) {
    if (node.tagName === "BR") return isLastChild ? 0 : 1;
    let total = 0;
    const children = Array.from(node.childNodes);
    children.forEach((child, index) => { total += unitsOf(child, index === children.length - 1); });
    return total;
  }
  return 0;
}

/** DOM 点 (node, offset) 之前有多少个模型单位。令牌内部的点按令牌之前算。 */
export function pointToOffset(root: HTMLElement, node: Node, offset: number): number {
  let total = 0;
  let found = false;
  const visit = (current: Node, isLast: boolean) => {
    if (found) return;
    if (current === node) {
      found = true;
      if (isText(current)) total += Math.min(offset, current.length);
      else {
        const children = Array.from(current.childNodes);
        for (let i = 0; i < Math.min(offset, children.length); i += 1) total += unitsOf(children[i]!, i === children.length - 1);
      }
      return;
    }
    if (isTokenElement(current)) {
      if (current.contains(node)) found = true;
      else total += 1;
      return;
    }
    if (isText(current)) { total += current.length; return; }
    if (isElement(current)) {
      if (current.tagName === "BR") { total += isLast ? 0 : 1; return; }
      const children = Array.from(current.childNodes);
      children.forEach((child, index) => visit(child, index === children.length - 1));
    }
  };
  visit(root, true);
  return total;
}

/** 模型偏移 → DOM 点。落在令牌前后时给出编辑区自身的子节点位置，永远不进入令牌内部。 */
export function offsetToPoint(root: HTMLElement, offset: number): { node: Node; offset: number } {
  let remaining = Math.max(0, offset);
  const children = Array.from(root.childNodes);
  for (let i = 0; i < children.length; i += 1) {
    const child = children[i]!;
    const isLast = i === children.length - 1;
    if (isText(child)) {
      if (remaining <= child.length) return { node: child, offset: remaining };
      remaining -= child.length;
    } else if (isTokenElement(child)) {
      if (remaining === 0) return { node: root, offset: i };
      remaining -= 1;
    } else if (isElement(child) && child.tagName === "BR") {
      if (isLast) return { node: root, offset: i };
      if (remaining === 0) return { node: root, offset: i };
      remaining -= 1;
    } else {
      const length = unitsOf(child, isLast);
      if (remaining <= length) return { node: root, offset: remaining === 0 ? i : i + 1 };
      remaining -= length;
    }
  }
  return { node: root, offset: children.length };
}

export type ModelSelection = { start: number; end: number };

/** 当前选区（模型偏移）；不在编辑区内返回 null。 */
export function readSelection(root: HTMLElement): ModelSelection | null {
  const selection = root.ownerDocument.getSelection();
  if (!selection || selection.rangeCount === 0) return null;
  const range = selection.getRangeAt(0);
  if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) return null;
  const start = pointToOffset(root, range.startContainer, range.startOffset);
  const end = range.collapsed ? start : pointToOffset(root, range.endContainer, range.endOffset);
  return { start: Math.min(start, end), end: Math.max(start, end) };
}

export function writeSelection(root: HTMLElement, start: number, end = start) {
  const doc = root.ownerDocument;
  const selection = doc.getSelection();
  if (!selection) return;
  const from = offsetToPoint(root, start);
  const to = end === start ? from : offsetToPoint(root, end);
  const range = doc.createRange();
  range.setStart(from.node, from.offset);
  range.setEnd(to.node, to.offset);
  selection.removeAllRanges();
  selection.addRange(range);
}

/** 触发文字区间的屏幕矩形，给候选浮层定位用；量不到（空矩形）返回 null。 */
export function rangeRect(root: HTMLElement, start: number, end: number): DOMRect | null {
  const from = offsetToPoint(root, start);
  const to = offsetToPoint(root, end);
  const range = root.ownerDocument.createRange();
  try {
    range.setStart(from.node, from.offset);
    range.setEnd(to.node, to.offset);
  } catch {
    return null;
  }
  const rects = typeof range.getClientRects === "function" ? range.getClientRects() : undefined;
  const rect = rects && rects.length > 0 ? rects[rects.length - 1]! : typeof range.getBoundingClientRect === "function" ? range.getBoundingClientRect() : null;
  if (!rect || (rect.width === 0 && rect.height === 0)) return null;
  return rect;
}
