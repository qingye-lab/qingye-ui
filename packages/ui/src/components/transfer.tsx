"use client";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { isName, received } from "../require-name";
import { cn } from "../utils";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { CheckboxGroup } from "./checkbox-group";
import { SearchInput } from "./search-input";

export type TransferItem = {
  /** 稳定的键，在 items 内唯一；value 数组里放的就是它。 */
  value: string;
  label: string;
  disabled?: boolean;
};

export type TransferDirection = "toTarget" | "toSource";
export type TransferChangeDetails = { direction: TransferDirection; moved: string[] };

export type TransferProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange" | "children"> & {
  /** 全部候选项。每项属于左侧（候选）或右侧（已选），由 value 决定。 */
  items: readonly TransferItem[];
  /** 已选项的键（右侧），受控。顺序即移入的先后；显示时两侧都按 items 的顺序。 */
  value?: readonly string[];
  defaultValue?: readonly string[];
  /** 只在移动发生时调用，给出移动后的完整键集合与本次移动的方向、键。 */
  onValueChange?: (value: string[], details: TransferChangeDetails) => void;
  /** 两侧的标题，默认「候选」「已选」。 */
  titles?: readonly [string, string];
  /** 每侧提供一个筛选输入。全选、计数与移动都只作用于筛选后可见的项。 */
  searchable?: boolean;
  /** 给了 name，右侧每一项的键以同名隐藏字段随原生表单提交。 */
  name?: string;
  disabled?: boolean;
  /** 列表区域的 className（默认固定高度，两侧同高，移动时版面不跳）。 */
  listClassName?: string;
};

function requireItems(items: readonly TransferItem[]) {
  const seen = new Set<string>();
  items.forEach((item, index) => {
    if (typeof item !== "object" || item === null) throw new Error(`Transfer items[${index}] must be an object with value and label; received ${received(item)}.`);
    if (!isName(item.value)) throw new Error(`Transfer items[${index}] requires a nonempty value; received ${received(item.value)}.`);
    if (!isName(item.label)) throw new Error(`Transfer items[${index}] (value "${item.value}") requires a nonempty label; received ${received(item.label)}.`);
    if (seen.has(item.value)) throw new Error(`Transfer items[${index}] repeats the value "${item.value}"; every value must be unique.`);
    seen.add(item.value);
  });
}

type ListProps = {
  title: string;
  items: readonly TransferItem[];
  checked: readonly string[];
  onCheckedChange: (keys: string[]) => void;
  query: string;
  onQueryChange: (query: string) => void;
  searchable: boolean;
  disabled: boolean;
  listClassName: string | undefined;
};

/** 一侧的列表：全选（只作用于可见项）+ 标题 + 计数 + 可选筛选 + 逐项复选。 */
function TransferList({ title, items, checked, onCheckedChange, query, onQueryChange, searchable, disabled, listClassName }: ListProps) {
  const { messages } = useUILocale();
  const id = React.useId();
  const needle = query.trim().toLocaleLowerCase();
  const visible = needle === "" ? items : items.filter(item => item.label.toLocaleLowerCase().includes(needle));
  const visibleKeys = new Set(visible.map(item => item.value));
  const enabledKeys = visible.filter(item => !item.disabled).map(item => item.value);
  const picked = checked.filter(key => visibleKeys.has(key));
  return <div data-slot="transfer-list" className="flex min-w-0 flex-col gap-(--qy-field-gap) rounded-control border border-border p-(--qy-panel-padding-sm)">
    <CheckboxGroup
      aria-labelledby={`${id}-title`} aria-describedby={`${id}-count`}
      value={picked} disabled={disabled} allValues={enabledKeys}
      onValueChange={keys => onCheckedChange([...checked.filter(key => !visibleKeys.has(key)), ...keys])}
      className="gap-(--qy-field-gap)"
    >
      {/* 全选 + 标题 + 计数是同一行：标题给整组命名，计数是组的描述（读屏读到「已选 n / m」）。 */}
      <div className="flex min-w-0 items-start gap-(--qy-field-gap)">
        <Checkbox parent aria-label={messages.transferSelectAll} disabled={disabled || enabledKeys.length === 0} />
        <span id={`${id}-title`} className="min-w-0 flex-1 text-label-mobile text-foreground wrap-break-word sm:text-label">{title}</span>
        <span id={`${id}-count`} className="text-support-mobile text-muted-foreground tabular-nums sm:text-support">{picked.length} / {visible.length}</span>
      </div>
      {searchable && <SearchInput aria-label={messages.transferFilter(title)} value={query} disabled={disabled} onChange={event => onQueryChange(event.target.value)} onClear={() => onQueryChange("")} />}
      {/* 预设：列表区固定 16rem（h-64）高度，使两侧同高、移动时版面不跳；超出滚动。可用 listClassName 改。 */}
      <div data-slot="transfer-items" className={cn("flex min-h-0 flex-col gap-(--qy-field-gap) overflow-y-auto", "h-64", listClassName)}>
        {visible.length === 0
          ? <p className="m-0 text-support-mobile text-muted-foreground sm:text-support">{items.length === 0 ? messages.transferEmpty : messages.transferNoMatch}</p>
          : visible.map(item => <label key={item.value} data-slot="transfer-item" className={cn("flex min-w-0 cursor-pointer items-start gap-(--qy-field-gap)", (disabled || item.disabled) && "cursor-not-allowed opacity-disabled")}>
            <Checkbox value={item.value} disabled={disabled || item.disabled} />
            <span className="min-w-0 flex-1 text-label-mobile text-foreground wrap-break-word sm:text-label">{item.label}</span>
          </label>)}
      </div>
    </CheckboxGroup>
  </div>;
}

/**
 * 穿梭框：两个候选列表加中间的移动按钮。勾选若干项，点按钮把它们从一侧移到另一侧；值是右侧（已选）的键数组。
 * - 关系：左右是同一批 items 按 value 的划分，移动只改 value，不改 items。
 * - 勾选是临时的、各侧自己的；只有「可见（经筛选）、未禁用、已勾选」的项会被移动，计数「n / m」说的也是可见项，
 *   所以看到什么勾选就移动什么，没被看见的勾选不会被带走。
 * - 无可移动项时按钮用 aria-disabled 而非 disabled：点完最后一批后焦点仍留在按钮上，不掉到页面顶部。
 * - 读屏：每个列表是命名的组（标题），按钮的名称带数量与去向，移动后在 role="status" 里礼貌播报。
 * - 几何：三列（列表、按钮列、列表）；按钮列按 action-gap 与两侧隔开，列表内边距读 panel-padding-sm，边界只有列表外框一条线。
 */
export function Transfer({ items, value: valueProp, defaultValue = [], onValueChange, titles, searchable = false, name, disabled = false, listClassName, className, ref, ...props }: TransferProps) {
  const { messages } = useUILocale();
  requireItems(items);
  const [uncontrolled, setUncontrolled] = React.useState<readonly string[]>(defaultValue);
  const value = valueProp ?? uncontrolled;
  const [checkedSource, setCheckedSource] = React.useState<readonly string[]>([]);
  const [checkedTarget, setCheckedTarget] = React.useState<readonly string[]>([]);
  const [querySource, setQuerySource] = React.useState("");
  const [queryTarget, setQueryTarget] = React.useState("");
  const [announcement, setAnnouncement] = React.useState({ text: "", count: 0 });
  const [sourceTitle, targetTitle] = titles ?? [messages.transferSource, messages.transferTarget];
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const setRoot = React.useCallback((node: HTMLDivElement | null) => {
    rootRef.current = node;
    if (typeof ref === "function") ref(node); else if (ref) ref.current = node;
  }, [ref]);

  const selected = new Set(value);
  const source = items.filter(item => !selected.has(item.value));
  const target = items.filter(item => selected.has(item.value));
  const targetKeys = new Set(target.map(item => item.value));

  // 表单重置：非受控回到 defaultValue，临时勾选清空。
  const resetRef = React.useRef({ controlled: valueProp !== undefined, defaultValue });
  resetRef.current = { controlled: valueProp !== undefined, defaultValue };
  React.useEffect(() => {
    const form = rootRef.current?.closest("form");
    if (!form) return;
    const reset = (event: Event) => queueMicrotask(() => {
      if (event.defaultPrevented) return;
      if (!resetRef.current.controlled) setUncontrolled(resetRef.current.defaultValue);
      setCheckedSource([]); setCheckedTarget([]);
    });
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, []);

  /** 某一侧「看得见、没禁用、已勾选」的键，按 items 的顺序。 */
  const movable = (side: readonly TransferItem[], checked: readonly string[], query: string) => {
    const needle = query.trim().toLocaleLowerCase();
    return side.filter(item => !item.disabled && checked.includes(item.value) && (needle === "" || item.label.toLocaleLowerCase().includes(needle))).map(item => item.value);
  };
  const movableSource = movable(source, checkedSource, querySource);
  const movableTarget = movable(target, checkedTarget, queryTarget);

  const move = (direction: TransferDirection) => {
    const moved = direction === "toTarget" ? movableSource : movableTarget;
    if (disabled || moved.length === 0) return;
    const next = direction === "toTarget" ? [...value, ...moved] : value.filter(key => !moved.includes(key));
    if (valueProp === undefined) setUncontrolled(next);
    if (direction === "toTarget") setCheckedSource(checkedSource.filter(key => !moved.includes(key)));
    else setCheckedTarget(checkedTarget.filter(key => !moved.includes(key)));
    setAnnouncement(previous => ({ text: messages.transferMoved(moved.length, direction === "toTarget" ? targetTitle : sourceTitle), count: previous.count + 1 }));
    onValueChange?.(next, { direction, moved });
  };

  return <div
    data-slot="transfer" role="group" ref={setRoot} {...props}
    className={cn("grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-(--qy-action-gap)", className)}
  >
    <TransferList title={sourceTitle} items={source} checked={checkedSource} onCheckedChange={setCheckedSource} query={querySource} onQueryChange={setQuerySource} searchable={searchable} disabled={disabled} listClassName={listClassName} />
    <div data-slot="transfer-actions" className="flex flex-col gap-(--qy-action-gap)">
      <Button type="button" variant="bordered" shape="icon" disabled={disabled} aria-disabled={movableSource.length === 0 || undefined}
        aria-label={messages.transferMoveTo(movableSource.length, targetTitle)} onClick={() => move("toTarget")}>
        <IconChevronRight aria-hidden="true" className="rtl:rotate-180" />
      </Button>
      <Button type="button" variant="bordered" shape="icon" disabled={disabled} aria-disabled={movableTarget.length === 0 || undefined}
        aria-label={messages.transferMoveTo(movableTarget.length, sourceTitle)} onClick={() => move("toSource")}>
        <IconChevronLeft aria-hidden="true" className="rtl:rotate-180" />
      </Button>
    </div>
    <TransferList title={targetTitle} items={target} checked={checkedTarget} onCheckedChange={setCheckedTarget} query={queryTarget} onQueryChange={setQueryTarget} searchable={searchable} disabled={disabled} listClassName={listClassName} />
    {/* 只提交 items 里确有的键，按 value 的顺序：value 里残留的未知键不是用户选中的条目。 */}
    {name !== undefined && value.filter(key => targetKeys.has(key)).map(key => <input key={key} type="hidden" name={name} value={key} disabled={disabled} />)}
    {/* 同一句话连续出现时交替补一个零宽字符，让 live region 看到变化（与 Tree 相同）。 */}
    <div role="status" className="sr-only">{announcement.text}{announcement.count % 2 === 0 ? "\u200b" : ""}</div>
  </div>;
}
