import * as React from "react";

/*
 * 外部标签转成 aria-labelledby（2026-11-20）。
 *
 * 输入框在弹层之外的 Combobox / Autocomplete 打开时，Base UI 把弹层与输入框以外的内容标为 aria-hidden，
 * 与输入框同级的 <label for> 自身也被标上。label 自身隐藏后，Chrome 不再用它给输入框取名，名称变空
 * （label 只是落在隐藏祖先里时名称还在）。Base UI 1.9 没有不标记的公开选项。
 *
 * 可访问名称计算的规则是：aria-labelledby 直接引用的元素即使隐藏，也照样参与取名。
 * Field 里的 FieldLabel 正是经 aria-labelledby 关联，打开后名称保留（真实 Chrome 实测）。
 * 所以 Field 之外，把用 htmlFor/id 关联到输入框的外部 label 也经 aria-labelledby 引用，名称就不随弹层开合消失。
 *
 * 只转外部的 label：包住输入框的 label 若被引用，取名时会把输入框自己的值也算进去；
 * 它的文字是直接文本时，打开后本来就保留名称。包裹写法里文字放进子元素的情形无法这样修复，见组件文档。
 * 外部 label 与包裹 label 同时存在时整体不转：aria-labelledby 只引用外部那个，会替换掉原生取名，
 * 弹层关着时也丢掉包裹 label 的文字；保持原生取名，代价是打开时只剩包裹 label 的名称（与未加此处理时相同）。
 * 调用方显式给了 aria-label / aria-labelledby，或在 Field 里时，由调用处的优先级决定，不用这里的结果。
 */

/**
 * 用 htmlFor/id 关联到输入框的 label 的 id 列表（空格分隔）；有 label 包住输入框时为空。缺 id 的 label 补一个稳定 id。
 * 返回的 refresh 交给输入框的 onFocus：打开通常伴随聚焦，聚焦时再核对一次，覆盖输入框没重新渲染而 label 已变的情形。
 */
export function useExternalLabelledBy(inputRef: React.RefObject<HTMLInputElement | null>): [string | undefined, () => void] {
  const uid = React.useId();
  const [ids, setIds] = React.useState<string | undefined>(undefined);
  const current = React.useRef(ids);
  current.current = ids;
  const refresh = React.useCallback(() => {
    const input = inputRef.current;
    if (!input) return;
    // 已由调用方或 Field 命名（属性不是这里给的）：不用外部标签，也不去改调用方 label 的 id。
    const labelledBy = input.getAttribute("aria-labelledby");
    if (input.hasAttribute("aria-label") || (labelledBy !== null && labelledBy !== current.current)) {
      setIds(undefined);
      return;
    }
    const all = Array.from(input.labels ?? []);
    const labels = all.some(label => label.contains(input)) ? [] : all;
    const next = labels.map((label, index) => {
      // 调用方的 label 没有 id 时才写入；已有的 id 原样引用。
      if (!label.id) label.id = `${uid}-label-${index}`;
      return label.id;
    }).join(" ") || undefined;
    setIds(previous => previous === next ? previous : next);
  }, [inputRef, uid]);
  // 每次渲染后核对一次：label 可能晚于输入框挂载，或改了 id。结果不变时不触发重渲染。
  React.useLayoutEffect(refresh);
  // label 由别的组件渲染，重新挂载时这里补的 id 随旧节点一起丢掉，而输入框未必重新渲染。
  // 监听这些 label 所在父节点的子节点变化，换了节点就立即补回 id，不等下一次聚焦。
  React.useEffect(() => {
    const input = inputRef.current;
    if (!ids || !input || typeof MutationObserver === "undefined") return;
    const parents = new Set(Array.from(input.labels ?? []).map(label => label.parentNode).filter((node): node is ParentNode & Node => node !== null));
    if (parents.size === 0) return;
    const observer = new MutationObserver(refresh);
    parents.forEach(parent => observer.observe(parent, { childList: true }));
    return () => observer.disconnect();
  }, [ids, inputRef, refresh]);
  return [ids, refresh];
}

/** 调用方或 Field 已经命名时不用外部标签；`""` 也算调用方的显式决定。 */
export function labelledByFallback(props: { "aria-label"?: string | undefined; "aria-labelledby"?: string | undefined }, external: string | undefined): string | undefined {
  if (props["aria-labelledby"] !== undefined) return props["aria-labelledby"];
  return props["aria-label"] ? undefined : external;
}
