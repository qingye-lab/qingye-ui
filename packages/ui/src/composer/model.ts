/*
 * Composer 的值模型（纯函数，不碰 DOM）。
 *
 * 值是一串片段：普通文字，或一枚已确认的令牌（提及、命令）。位置一律用「模型偏移」：
 * 文字片段每个 UTF-16 码元计 1，令牌整体计 1。这与 DOM 里的文字节点长度一致，
 * 因此 DOM 选区与模型偏移可以互相换算，令牌因此是原子的——偏移落不到令牌里面。
 */

export type ComposerTextSegment = { type: "text"; text: string };
export type ComposerTokenSegment = {
  type: "token";
  /** 触发它的字符，例如 "@"、"/"。 */
  trigger: string;
  /** 稳定标识；业务对象的 id，不是显示名。 */
  id: string;
  /** 显示名，读屏读出的就是 `trigger + label`。 */
  label: string;
};
export type ComposerSegment = ComposerTextSegment | ComposerTokenSegment;
export type ComposerValue = readonly ComposerSegment[];

export const emptyComposerValue: ComposerValue = Object.freeze([]);

const unitLength = (segment: ComposerSegment) => (segment.type === "text" ? segment.text.length : 1);

/** 合并相邻文字、去掉空文字；令牌缺少 trigger / id 视为无效而丢弃。返回新数组。 */
export function normalizeComposerValue(value: ComposerValue): ComposerSegment[] {
  const out: ComposerSegment[] = [];
  for (const segment of value) {
    if (segment.type === "text") {
      if (!segment.text) continue;
      const last = out[out.length - 1];
      if (last?.type === "text") out[out.length - 1] = { type: "text", text: last.text + segment.text };
      else out.push({ type: "text", text: segment.text });
    } else if (segment.type === "token" && segment.trigger && segment.id !== "") {
      out.push({ type: "token", trigger: segment.trigger, id: segment.id, label: segment.label });
    }
  }
  return out;
}

/** 模型长度：文字按码元，令牌各计 1。 */
export function composerValueLength(value: ComposerValue): number {
  let total = 0;
  for (const segment of value) total += unitLength(segment);
  return total;
}

/** 按内容比较；两侧都应已规范化。 */
export function composerValueEquals(a: ComposerValue, b: ComposerValue): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  return a.every((segment, index) => {
    const other = b[index]!;
    if (segment.type === "text") return other.type === "text" && other.text === segment.text;
    return other.type === "token" && other.trigger === segment.trigger && other.id === segment.id && other.label === segment.label;
  });
}

/** 取 [from, to) 区间的片段；令牌要么整枚在内，要么不在。 */
export function sliceComposerValue(value: ComposerValue, from: number, to: number): ComposerSegment[] {
  const out: ComposerSegment[] = [];
  let position = 0;
  for (const segment of value) {
    const length = unitLength(segment);
    const start = position;
    position += length;
    if (position <= from) continue;
    if (start >= to) break;
    if (segment.type === "token") {
      if (start >= from && position <= to) out.push(segment);
    } else {
      out.push({ type: "text", text: segment.text.slice(Math.max(from - start, 0), Math.min(to - start, length)) });
    }
  }
  return normalizeComposerValue(out);
}

/** 用 insert 替换 [start, end)。 */
export function spliceComposerValue(value: ComposerValue, start: number, end: number, insert: ComposerValue): ComposerSegment[] {
  const length = composerValueLength(value);
  const from = Math.max(0, Math.min(start, length));
  const to = Math.max(from, Math.min(end, length));
  return normalizeComposerValue([...sliceComposerValue(value, 0, from), ...insert, ...sliceComposerValue(value, to, length)]);
}

/** 序列化成纯文字；令牌默认写成 `trigger + label`，可由 serializeToken 改写（例如写成 `@[名字](id)`）。 */
export function composerValueToText(value: ComposerValue, serializeToken: (token: ComposerTokenSegment) => string = (token) => token.trigger + token.label): string {
  return value.map((segment) => (segment.type === "text" ? segment.text : serializeToken(segment))).join("");
}

/**
 * 从纯文字还原。默认整段当作文字；给出 known（已知令牌）时，文中字面等于 `trigger + label`
 * 的片段会还原成令牌（长的优先），其余保持文字。换行统一为 "\n"。
 */
export function composerValueFromText(text: string, known: readonly ComposerTokenSegment[] = []): ComposerSegment[] {
  const source = text.replace(/\r\n?/g, "\n");
  if (!source) return [];
  const candidates = known
    .filter((token) => token.trigger && token.label !== "")
    .map((token) => ({ token, literal: token.trigger + token.label }))
    .sort((a, b) => b.literal.length - a.literal.length);
  if (candidates.length === 0) return [{ type: "text", text: source }];
  const out: ComposerSegment[] = [];
  let buffer = "";
  let index = 0;
  while (index < source.length) {
    const hit = candidates.find(({ literal }) => source.startsWith(literal, index));
    if (hit) {
      if (buffer) out.push({ type: "text", text: buffer });
      buffer = "";
      out.push({ type: "token", trigger: hit.token.trigger, id: hit.token.id, label: hit.token.label });
      index += hit.literal.length;
    } else {
      buffer += source[index];
      index += 1;
    }
  }
  if (buffer) out.push({ type: "text", text: buffer });
  return normalizeComposerValue(out);
}

/** 纯文字或片段数组，统一还原成规范化的值。 */
export function parseComposerValue(input: string | ComposerValue | null | undefined, known?: readonly ComposerTokenSegment[]): ComposerSegment[] {
  if (input == null) return [];
  return typeof input === "string" ? composerValueFromText(input, known) : normalizeComposerValue(input);
}

/** 没有令牌且文字全是空白，就没有可提交的内容。 */
export function isComposerValueEmpty(value: ComposerValue): boolean {
  return value.every((segment) => segment.type === "text" && segment.text.trim() === "");
}

export type ComposerTriggerMatch = {
  /** 命中的触发项在 triggers 数组里的序号。 */
  index: number;
  /** 触发字符起点与光标位置（模型偏移）；替换区间是 [start, end)。 */
  start: number;
  end: number;
  query: string;
};
export type ComposerTriggerRule = { char: string; startOnly?: boolean | undefined };

/**
 * 光标前是否正处在一次触发里。规则：
 * - 触发字符与光标同在一个文字片段内（令牌是边界，跨令牌不算）；
 * - 触发字符前一个字符不能是 ASCII 字母、数字或下划线（排除 a@b.com、and/or 里的误触），也不能是触发字符自己；
 *   startOnly 的触发项只认整个输入的最开头；
 * - 触发字符到光标之间不含空白（含换行）。
 * 多个触发项同时命中时取离光标最近的。
 */
export function findComposerTrigger(value: ComposerValue, caret: number, rules: readonly ComposerTriggerRule[]): ComposerTriggerMatch | null {
  let position = 0;
  let best: ComposerTriggerMatch | null = null;
  for (let s = 0; s < value.length; s += 1) {
    const segment = value[s]!;
    const length = unitLength(segment);
    const start = position;
    position += length;
    if (segment.type !== "text" || !(caret > start && caret <= position)) continue;
    const before = segment.text.slice(0, caret - start);
    rules.forEach((rule, index) => {
      if (!rule.char) return;
      const at = before.lastIndexOf(rule.char);
      if (at < 0) return;
      const previous = at > 0 ? before[at - 1]! : "";
      if (rule.startOnly ? !(s === 0 && at === 0) : /[A-Za-z0-9_]/.test(previous) || previous === rule.char) return;
      const query = before.slice(at + rule.char.length);
      if (/\s/.test(query)) return;
      if (!best || start + at > best.start) best = { index, start: start + at, end: caret, query };
    });
    break;
  }
  return best;
}

/** 紧邻光标的令牌（backward 看光标之前一个单位，forward 看之后一个）；不是令牌则返回 null。 */
export function composerTokenNear(value: ComposerValue, caret: number, direction: "backward" | "forward"): { start: number; end: number } | null {
  let position = 0;
  for (const segment of value) {
    if (segment.type === "token") {
      if (direction === "backward" && position + 1 === caret) return { start: position, end: caret };
      if (direction === "forward" && position === caret) return { start: position, end: position + 1 };
    }
    position += unitLength(segment);
  }
  return null;
}
