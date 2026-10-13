/*
 * 名称必填（名实相符）：Chart、ScatterChart、Heatmap 的系列、行、列、点与各轴都要有非空名称，缺了就抛错——这是契约。
 * 调用方的数据常来自接口，类型上写着 string，运行时却可能是 undefined、null 或数字；
 * 直接 `.trim()` 会抛 “Cannot read properties of undefined (reading 'trim')”，读不出是哪一项缺了什么。
 * 所以先判类型再去空白，错误信息写明是哪一组的第几项、缺什么、收到了什么。
 */

/** 去掉首尾空白后仍非空的字符串；其余任何值（undefined、null、数字、对象）都不是名称。 */
export function isName(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "";
}

/**
 * 是不是数组。Array.isArray 会把 `readonly T[]` 收窄成 `any[]`，之后元素类型全失；这里保持元素类型。
 * 声明上是数组的属性，运行时可能是 undefined、null 或别的东西——对它调用 .map / .some 同样是读不懂的 TypeError。
 */
export function isList<T>(value: readonly T[] | null | undefined): value is readonly T[] {
  return Array.isArray(value);
}

/** 错误信息里的“收到了什么”：字符串带引号（空串与纯空白看得出来），对象与函数只说种类，不展开内容。 */
export function received(value: unknown): string {
  if (typeof value === "string") return JSON.stringify(value);
  if (Array.isArray(value)) return "an array";
  if (typeof value === "object" && value !== null) return "an object";
  if (typeof value === "function") return "a function";
  return String(value);
}

/**
 * 一组具名条目：每项是对象，带非空的稳定标识（key 或 id）与非空的 label，标识在组内不重复。
 * owner 写成读得懂的位置，例如 "Chart series"、"Heatmap columns"；报错形如
 * `Chart series[2] (key "humidity") requires a nonempty label; received undefined.`
 */
export function requireNamedItems(owner: string, items: readonly unknown[], idKey: "key" | "id"): void {
  const seen = new Map<string, number>();
  items.forEach((item, index) => {
    const at = `${owner}[${index}]`;
    if (typeof item !== "object" || item === null) throw new Error(`${at} must be an object with ${idKey} and label; received ${received(item)}.`);
    const { [idKey]: id, label } = item as Record<string, unknown>;
    if (!isName(id)) throw new Error(`${at} requires a nonempty ${idKey}; received ${received(id)}.`);
    if (!isName(label)) throw new Error(`${at} (${idKey} "${id}") requires a nonempty label; received ${received(label)}.`);
    const first = seen.get(id);
    if (first !== undefined) throw new Error(`${at} repeats the ${idKey} "${id}" of ${owner}[${first}]; every ${idKey} must be unique.`);
    seen.set(id, index);
  });
}
