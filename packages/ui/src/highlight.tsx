import * as React from "react";

/**
 * 命中文字：按 needle（调用方已小写、已去首尾空白）把 label 切成片段，命中的用 mark 标出（Tree、TreeSelect、Cascader 的搜索共用）。
 * 标记靠字重而不是颜色：不依赖色觉（WCAG 1.4.1），也不新增墨色；mark 的默认黄底在这里被清掉。
 * 大小写折叠改变长度时（个别字符）退回纯文本，宁可不标也不标错位置。
 */
export function highlightMatch(label: string, needle: string): React.ReactNode {
  if (!needle) return label;
  const lower = label.toLocaleLowerCase(); if (lower.length !== label.length) return label;
  const parts: React.ReactNode[] = []; let from = 0;
  for (let at = lower.indexOf(needle); at >= 0; at = lower.indexOf(needle, from)) {
    if (at > from) parts.push(label.slice(from, at));
    from = at + needle.length;
    parts.push(<mark key={at} data-slot="match" className="bg-transparent font-semibold text-inherit">{label.slice(at, from)}</mark>);
  }
  if (parts.length === 0) return label;
  if (from < label.length) parts.push(label.slice(from));
  return parts;
}
