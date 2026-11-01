"use client";

import * as React from "react";
import { useCandidateStatus } from "../candidate-status";
import { useUILocale } from "../locale";
import { PickerFormValue, PickerTrigger, pickerSummary, usePickerField } from "../picker-trigger";
import { Input } from "./input";
import { Popover, PopoverPopup } from "./popover";
import { Tree, type TreeChangeDetails, type TreeNode } from "./tree";

/** 与 Tree 的变更详情同一形状：event、reason，以及 cancel()——调用后不提交（单选时弹层也保持打开）。 */
export type TreeSelectChangeDetails = TreeChangeDetails;

type TreeSelectBaseProps = {
  /** 沿用 Tree 的节点：id 全树唯一，label 非空；disabled 的节点不可选。 */
  nodes: readonly TreeNode[];
  /** 弹层顶部出现搜索输入：按名称筛选（不分大小写），保留命中节点的祖先并展开它们，命中的文字被标出。单选与多选都可用；只搜已知的节点。 */
  searchable?: boolean | undefined;
  placeholder?: React.ReactNode;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  /** 隐藏 input 的名称。单选提交所选 id（未选择提交空字符串）；多选每个已选 id 一条同名值，未选择不提交。 */
  name?: string | undefined;
  form?: string | undefined;
  id?: string | undefined;
  className?: string | undefined;
  "aria-label"?: string | undefined;
  "aria-labelledby"?: string | undefined;
  "aria-describedby"?: string | undefined;
  "aria-invalid"?: boolean | "true" | "false" | undefined;
};
type TreeSelectSingleProps = {
  multiple?: false | undefined;
  /** 所选节点的 id（分支也可以被选）；null 是未选择。省略初值不会选第一项。选中即提交并关闭弹层。 */
  value?: string | null | undefined;
  defaultValue?: string | null | undefined;
  onValueChange?: ((id: string | null, details: TreeSelectChangeDetails) => void) | undefined;
};
type TreeSelectMultipleProps = {
  multiple: true;
  /** 已勾选的叶子 id（与 Tree 的 checkedIds 同一约定：分支的勾选由叶子派生，不进值）。勾选不关闭弹层。 */
  value?: readonly string[] | undefined;
  defaultValue?: readonly string[] | undefined;
  /** ids 按树的顺序（不在树里的 id 原样保留在末尾）。 */
  onValueChange?: ((ids: string[], details: TreeSelectChangeDetails) => void) | undefined;
};
export type TreeSelectProps = TreeSelectBaseProps & (TreeSelectSingleProps | TreeSelectMultipleProps);

type Index = { labels: Map<string, string>; parents: Map<string, string | null>; leaves: string[] };
function indexNodes(nodes: readonly TreeNode[]): Index {
  const index: Index = { labels: new Map(), parents: new Map(), leaves: [] };
  const visit = (list: readonly TreeNode[], parent: string | null) => {
    for (const node of list) {
      index.labels.set(node.id, node.label);
      index.parents.set(node.id, parent);
      // 空 children 数组等同叶子，与 Tree 的判断一致。
      if (node.children?.length) visit(node.children, node.id); else index.leaves.push(node.id);
    }
  };
  visit(nodes, null);
  return index;
}

/**
 * 树形选择：在弹层里的 Tree 上选一个节点，或勾选若干叶子。
 *
 * 触发器与表单值和 Cascader 共用（picker-trigger.tsx），所以外观、Field 接入与 required 行为同 Select；
 * 弹层里就是库的 Tree，键盘（方向键、字首跳转）与勾选语义（mixed、禁用叶子）完全由它承担。
 * 触发器是 combobox，弹出的是 tree（aria-haspopup="tree"）。searchable 时弹层顶部多一个搜索输入，把 query 交给 Tree 筛选；
 * 输入里按 ↓ 进入树。不做异步加载。
 */
export function TreeSelect(props: TreeSelectProps) {
  const {
    nodes, searchable = false, placeholder, disabled: disabledProp = false, readOnly = false, required = false, name: nameProp, form, id, className,
    "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, "aria-invalid": ariaInvalid,
  } = props;
  const multiple = props.multiple === true;
  const { messages } = useUILocale();
  const { fieldRoot, disabled, name, invalid, describedBy, labelledBy } = usePickerField({
    owner: "TreeSelect", ariaLabel, ariaLabelledBy, ariaDescribedBy, ariaInvalid, disabled: disabledProp, name: nameProp,
  });
  const index = React.useMemo(() => indexNodes(nodes), [nodes]);

  // 单选与多选统一成「已选 id 的列表」，只在对外的边界上换回各自的形状。
  const controlled = props.value !== undefined;
  const [inner, setInner] = React.useState<readonly string[]>(() => toList(props.defaultValue));
  const selection = controlled ? toList(props.value) : inner;
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [entryId, setEntryId] = React.useState<string | null>(null);
  const [query, setQuery] = React.useState("");
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  const selectedSet = new Set(selection);
  /** 多选的值按树的顺序；不在树里的 id 保留在末尾，不被静默丢掉。 */
  const ordered = (ids: readonly string[]) => {
    const set = new Set(ids);
    return [...index.leaves.filter(leaf => set.has(leaf)), ...ids.filter(item => !index.labels.has(item))];
  };

  // ── 展示 ──
  const names = (multiple ? ordered(selection) : selection).map(item => index.labels.get(item) ?? item);
  const text = pickerSummary(names, messages);

  // ── 搜索：命中数只给读屏；没有命中的文字是 Tree 的空状态 ──
  const needle = searchable ? query.trim().toLocaleLowerCase() : "";
  let matches = 0;
  if (needle) for (const label of index.labels.values()) if (label.toLocaleLowerCase().includes(needle)) matches += 1;
  const status = useCandidateStatus({ count: needle ? matches : undefined });

  // ── 弹层状态 ──
  // 进入时的位置：单选是所选节点；多选是树里第一个已勾选的叶子；都没有则交给 Tree 的默认入口（第一个可用节点）。
  // 展开所选节点的祖先，让它们可见；Tree 会随弹层关闭而卸载，所以展开状态由这里持有，每次打开重算。
  function prepare() {
    const known = (multiple ? index.leaves.filter(leaf => selectedSet.has(leaf)) : selection).filter(item => index.labels.has(item));
    const ancestors = new Set<string>();
    for (const item of known) {
      for (let ancestor = index.parents.get(item) ?? null; ancestor !== null && !ancestors.has(ancestor); ancestor = index.parents.get(ancestor) ?? null) ancestors.add(ancestor);
    }
    setExpanded([...ancestors]);
    setEntryId(known[0] ?? null);
    setQuery("");
  }
  function changeOpen(next: boolean) {
    if (next && (disabled || readOnly)) return;
    if (next) prepare(); else fieldRoot.setTouched(true);
    setOpen(next);
  }

  /** 提交一次新的选择。返回 false 表示调用方在回调里 cancel() 了。 */
  function commit(next: readonly string[], event: React.SyntheticEvent, reason: TreeChangeDetails["reason"]): boolean {
    let canceled = false;
    const details: TreeSelectChangeDetails = { event, reason, cancel() { canceled = true; } };
    if (props.multiple === true) props.onValueChange?.([...next], details);
    else (props.onValueChange as TreeSelectSingleProps["onValueChange"])?.(next[0] ?? null, details);
    if (canceled) return false;
    if (!controlled) setInner(next);
    fieldRoot.setFilled(next.length > 0);
    return true;
  }

  return <>
    <Popover open={open} onOpenChange={changeOpen}>
      <PickerTrigger
        ref={triggerRef} slot="tree-select" id={id} className={className} popup="tree" open={open} onRequestOpen={() => changeOpen(true)}
        disabled={disabled} readOnly={readOnly} required={required} invalid={invalid}
        ariaLabel={ariaLabel} labelledBy={labelledBy} describedBy={describedBy}
        text={text} placeholder={placeholder ?? messages.selectPlaceholder}
      />
      <PopoverPopup data-slot="tree-select-popup" role="group" align="start" className="min-w-(--anchor-width)">
        {searchable && <div data-slot="tree-select-search" className="mb-(--qy-overlay-inset)">
          <Input
            nativeInput value={query} aria-label={messages.search}
            onValueChange={setQuery}
            onKeyDown={event => {
              if (event.key !== "ArrowDown" || event.defaultPrevented || event.nativeEvent.isComposing) return;
              // 进入树：落在它的 roving 入口（筛选后若原入口被隐藏，Tree 已退到第一个可见节点）。
              const entry = event.currentTarget.closest<HTMLElement>('[data-slot="tree-select-popup"]')?.querySelector<HTMLElement>('[role="treeitem"][tabindex="0"]');
              if (entry) { event.preventDefault(); entry.focus(); }
            }}
          />
          <div role="status" className={status.className}>{status.content}</div>
        </div>}
        <Tree
          nodes={nodes} aria-label={ariaLabel} aria-labelledby={labelledBy}
          {...(needle ? { query: needle, emptyContent: messages.selectEmpty } : {})}
          expandedIds={expanded} onExpandedChange={ids => setExpanded(ids)} defaultFocusedId={entryId}
          {...(multiple
            ? {
              checkable: true as const, checkedIds: selection,
              onCheckedChange: (ids: string[], details: TreeChangeDetails) => {
                // Tree 按点击先后给出集合；这里整理成树的顺序，再交给调用方。
                commit(ordered(ids), details.event, details.reason);
              },
            }
            : {
              selectable: true as const, selectedId: selection[0] ?? null,
              // 选中即提交并关闭，焦点由 Popover 还给触发器；重选同一个节点只关闭。
              onSelectionChange: (picked: string | null, details: TreeChangeDetails) => {
                if (picked === null) return;
                if (selection[0] === picked || commit([picked], details.event, details.reason)) changeOpen(false);
              },
            })}
        />
      </PopoverPopup>
    </Popover>
    <PickerFormValue
      slot="tree-select" name={name} form={form} value={multiple ? ordered(selection) : selection[0] ?? ""}
      required={required} disabled={disabled} triggerRef={triggerRef}
    />
  </>;
}

function toList(value: string | null | readonly string[] | undefined): readonly string[] {
  if (value === undefined || value === null) return [];
  return typeof value === "string" ? [value] : value;
}
