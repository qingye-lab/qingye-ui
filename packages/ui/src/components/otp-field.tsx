"use client";

import * as React from "react";
import { writeInputValue } from "../input-facts";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Input, type InputProps } from "./input";

export type OtpFieldProps = Omit<InputProps, "value" | "defaultValue" | "onValueChange" | "type" | "size" | "maxLength"> & {
  /** 文本容量，以 Unicode code point 计；由任务给出，不预设验证码长度。 */
  length: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * 键入与粘贴的文本先经过它，再按 `length` 校验；返回值就是写入的文本。
   * 默认去掉空白与连字符：验证码常以分组形式送达（`123 456`、`123-456`），
   * WCAG 3.3.8（可访问认证）要求不得靠拒绝粘贴来为难人。
   * 需要限定字符集时由调用方给出，例如 `text => text.replace(/\D/g, "")`；
   * 码本身含连字符时传 `text => text` 保留。
   */
  normalizeValue?: (text: string) => string;
  /**
   * 分组，如 `[3, 3]`：组间画一道短横作分隔，读屏仍是一个输入。总和必须等于 `length`，否则抛错。
   * 分隔只是呈现，不进入值；超出 `length` 的外部值多出的格归入最后一组，不再增加分隔。
   */
  groups?: readonly number[];
  /**
   * 已输入的格画成圆点。只改格子怎么画：值、粘贴与复制都不变，输入仍是 `type="text"`。
   * 不用 `type="password"`：它会让浏览器与密码管理器把这格当凭据（提示保存、不再给出一次性验证码建议），
   * 并让 `autocomplete="one-time-code"` 失效；而这里真实输入本就透明地盖在格子上，遮蔽只需要换掉格子里画的东西。
   * 代价要说明白：辅助技术读到的仍是真实文本，遮蔽是视觉上的防窥，不是保密。
   */
  mask?: boolean;
};

/** 默认归一化：空白（含不换行空格、全角空格）与各种连字符。选择，理由见 `normalizeValue`。 */
const stripSeparators = (text: string) => text.replace(/[\s\-\u2010-\u2015\u2212]+/g, "");


/** 点在哪个分段：取水平中心最近的一格（格间的间隙与溢出的输入面都归到最近的格）。 */
function segmentIndexAt(grid: HTMLElement, clientX: number): number | null {
  let best: number | null = null;
  let distance = Infinity;
  grid.querySelectorAll<HTMLElement>("[data-otp-index]").forEach(segment => {
    const rect = segment.getBoundingClientRect();
    const gap = Math.abs(clientX - (rect.left + rect.right) / 2);
    if (gap < distance) { distance = gap; best = Number(segment.dataset.otpIndex); }
  });
  return best;
}

/** 一个可选择和复制的真实文本输入；分段只是呈现，长度完成不代表验证。 */
export function OtpField({
  length, value: valueProp, defaultValue = "", onValueChange, normalizeValue = stripSeparators, groups, mask = false, placeholder,
  className, controlClassName, ref, onChange, onSelect, onFocus, onBlur, onPaste, onCompositionStart, onCompositionEnd,
  "aria-describedby": describedBy, ...props
}: OtpFieldProps) {
  if (!Number.isInteger(length) || length < 1) throw new Error("OtpField length must be a positive integer.");
  if (groups && (groups.some(size => !Number.isInteger(size) || size < 1) || groups.reduce((sum, size) => sum + size, 0) !== length)) throw new Error("OtpField groups must be positive integers that sum to length.");
  const { messages } = useUILocale();
  const feedbackId = React.useId();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const [selection, setSelection] = React.useState({ start: 0, end: 0 });
  const [feedback, setFeedback] = React.useState(false);
  // 合成（输入法）期间不截断、不回写：中途把值改回去会打断合成。
  const composing = React.useRef(false);
  const beforeComposition = React.useRef("");
  const touchIndex = React.useRef<number | null>(null);
  const value = valueProp ?? uncontrolled;
  const characters = Array.from(value);
  const cellCount = Math.max(length, characters.length);
  // 每组的起点（第一组除外）：分隔画在这些格之前。
  const groupStarts = new Set<number>();
  if (groups) { let at = 0; for (const size of groups.slice(0, -1)) { at += size; groupStarts.add(at); } }
  // 恰为一个 code point 的占位符是「每个空格里的提示」，画在格子里，不再交给透明的真实输入；其余写法照旧交给输入。
  const cellPlaceholder = typeof placeholder === "string" && Array.from(placeholder).length === 1 ? placeholder : undefined;
  const countBefore = (offset: number) => Array.from(value.slice(0, offset)).length;
  const active = Math.min(countBefore(selection.start), Math.max(length, characters.length) - 1);
  const syncSelection = (input: HTMLInputElement) => setSelection({ start: input.selectionStart ?? 0, end: input.selectionEnd ?? 0 });
  const selectSegment = (input: HTMLInputElement, segmentIndex: number) => {
    const index = Math.min(segmentIndex, characters.length);
    const offset = characters.slice(0, index).join("").length;
    input.setSelectionRange(offset, offset < value.length ? offset + (characters[index]?.length ?? 0) : offset);
    syncSelection(input);
  };
  const setRef = React.useCallback((node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === "function") {
      const cleanup = ref(node);
      if (typeof cleanup === "function") return () => { inputRef.current = null; cleanup(); };
    } else if (ref) ref.current = node;
  }, [ref]);
  React.useEffect(() => {
    const input = inputRef.current;
    const form = input?.form;
    const reset = (event: Event) => queueMicrotask(() => {
      if (event.defaultPrevented) return;
      if (valueProp === undefined) setUncontrolled(defaultValue);
      setFeedback(false);
      setSelection({ start: 0, end: 0 });
    });
    form?.addEventListener("reset", reset);
    return () => form?.removeEventListener("reset", reset);
  }, [defaultValue, valueProp, props.form]);

  return <div data-slot="otp-field" className={cn("flex min-w-0 flex-col gap-(--qy-field-gap)", controlClassName)}>
    {/* dir="ltr"：验证码是数字或字母串，没有书写方向。Unicode 双向算法里数字本就按从左到右排，
        RTL 页面里若分段随页面反向，格子顺序会与输入的先后、光标移动的方向相反。 */}
    <div data-slot="otp-field-segments" dir="ltr" className="group/otp relative grid w-fit max-w-full items-start gap-(--qy-field-gap)"
      style={{
        // 分隔列取内容宽（短横），格列等分。
        gridTemplateColumns: Array.from({ length: cellCount }, (_, index) => `${groupStarts.has(index) ? "auto " : ""}minmax(0, 1fr)`).join(" "),
        "--qy-otp-cell": "var(--qy-fill-height)",
        "--qy-otp-cell-narrow": "var(--qy-fill-height-narrow)",
      } as React.CSSProperties}
      // 真实输入覆盖在分段上接收指针，落点由坐标归到最近的分段。鼠标与笔仍先阻止默认再手工落光标；
      // 触屏不阻止：让系统照常聚焦与长按（粘贴菜单属于真实输入），点击完成后再把选区对到被点的分段。
      onPointerDown={event => {
        touchIndex.current = null;
        if (event.defaultPrevented || event.button !== 0) return;
        const input = inputRef.current;
        if (!input || input.disabled || input.matches(":disabled")) return;
        const hit = (event.target as Element).closest<HTMLElement>("[data-otp-index]");
        const index = hit ? Number(hit.dataset.otpIndex) : segmentIndexAt(event.currentTarget, event.clientX);
        if (index === null) return;
        if (event.pointerType === "touch") { touchIndex.current = index; return; }
        event.preventDefault();
        input.focus();
        selectSegment(input, index);
      }}
      onPointerCancel={() => { touchIndex.current = null; }}
      onContextMenu={() => { touchIndex.current = null; }}
      onClick={() => {
        const input = inputRef.current;
        const index = touchIndex.current;
        touchIndex.current = null;
        if (input && index !== null && !input.disabled) selectSegment(input, index);
      }}
    >
      {/* 容器比格子总宽窄时格子等比缩小：圆角取 min(控件圆角, 边长 × --qy-radius-ratio)——基础层 §4「比例而非常数」
          的同一条比例；固定 10px 在格宽缩到 14px 时会把格子压成圆（圆以标点，格子不是点）。
          items-start 让 aspect-square 按缩小后的宽度取高，而不是被网格拉成胶囊。 */}
      {Array.from({ length: cellCount }, (_, index) => <React.Fragment key={index}>
        {/* 分隔：2 分长、一道线粗的短横（预设：短横短于格宽的一半，读作连字符而不是缝），竖向取整行居中——
            self-stretch 取的是格子撑出的行高，格子等比缩小时它跟着居中。两侧各有一个组内间隔（网格的 gap）。 */}
        {groupStarts.has(index) && <span data-slot="otp-field-separator" aria-hidden="true" className="flex items-center justify-center self-stretch"><span className="block h-line w-(--qy-space-2) bg-muted-foreground" /></span>}
        <span data-slot="otp-field-segment" data-otp-index={index} aria-hidden="true"
        data-active={index === active ? "" : undefined}
        data-selected={index >= countBefore(selection.start) && index < countBefore(selection.end) ? "" : undefined}
        className={cn(
          "flex aspect-square min-w-0 rounded-[min(var(--qy-fill-radius),calc(var(--qy-radius-ratio)*100%))] text-control-md-mobile sm:text-control-md w-(--qy-otp-cell-narrow) max-w-full items-center justify-center border border-input bg-surface-field text-foreground sm:w-(--qy-otp-cell) pointer-coarse:min-h-(--qy-touch-target) pointer-coarse:w-(--qy-touch-target) group-has-[input:read-only:not(:disabled)]/otp:border-border group-has-[input:disabled]/otp:bg-surface-inset group-has-[input:disabled]/otp:text-muted-foreground group-has-[input[aria-invalid=true]]/otp:border-destructive data-selected:bg-surface-selected transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out)",
          // 悬停与 Input 同一规则（边线升到 border-strong）：可编辑、未聚焦、未声明无效时才有；悬停落在整个输入面（覆盖在分段上的真实输入）上。
          "group-not-has-[input:disabled]/otp:group-not-has-[input:read-only]/otp:group-not-has-[input:focus-visible]/otp:group-not-has-[input[aria-invalid=true]]/otp:group-hover/otp:border-border-strong",
          index === active && "group-has-[input:focus-visible]/otp:border-ring group-has-[input[aria-invalid=true]:focus-visible]/otp:border-destructive-foreground",
        )}
      >{characters[index] === undefined
        ? (cellPlaceholder && <span data-slot="otp-field-placeholder" className="text-muted-foreground">{cellPlaceholder}</span>)
        // 遮蔽的圆点：圆以标点（基础层 §4），直径 2 分（预设，与分隔短横同长）；取当前文字色，随禁用、选中一起变。
        : mask ? <span data-slot="otp-field-mask" className="block size-(--qy-space-2) rounded-full bg-current" /> : characters[index]}</span>
      </React.Fragment>)}
      <Input {...props} ref={setRef} type="text" value={value} unstyled placeholder={cellPlaceholder ? undefined : placeholder}
        data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "otp-field-input"} autoComplete={props.autoComplete ?? "one-time-code"}
        aria-describedby={[describedBy, feedback ? feedbackId : undefined].filter(Boolean).join(" ") || undefined}
        controlClassName="absolute inset-0" className={state => cn("cursor-text opacity-0", typeof className === "function" ? className(state) : className)}
        onFocus={event => { onFocus?.(event); syncSelection(event.currentTarget); }}
        onBlur={event => { onBlur?.(event); syncSelection(event.currentTarget); }}
        onSelect={event => { onSelect?.(event); syncSelection(event.currentTarget); }}
        onCompositionStart={event => { composing.current = true; beforeComposition.current = event.currentTarget.value; onCompositionStart?.(event); }}
        onCompositionEnd={event => {
          composing.current = false;
          onCompositionEnd?.(event);
          if (event.defaultPrevented || event.currentTarget.disabled || event.currentTarget.readOnly) return;
          // 合成结束才校验。个别浏览器在 compositionend 之后才补发最后一次 input，那一次走 onChange 的常规路径。
          const input = event.currentTarget;
          const raw = input.value;
          const normalized = normalizeValue(raw);
          const rejected = Array.from(normalized).length > length && Array.from(normalized).length >= Array.from(beforeComposition.current).length;
          const target = rejected ? beforeComposition.current : normalized;
          if (target !== raw) writeInputValue(input, target);
          if (rejected) setFeedback(true);
        }}
        onChange={event => {
          onChange?.(event);
          if (event.defaultPrevented || event.baseUIHandlerPrevented || event.currentTarget.disabled || event.currentTarget.readOnly) return;
          const input = event.currentTarget;
          const raw = input.value;
          if (composing.current) {
            // 原样镜像：受控的调用方需要回显同一段文本，否则 React 会把输入框改回旧值。
            setFeedback(false);
            if (valueProp === undefined) setUncontrolled(raw);
            onValueChange?.(raw, event);
            syncSelection(input);
            return;
          }
          const next = normalizeValue(raw);
          const nextLength = Array.from(next).length;
          if (nextLength > length && nextLength >= characters.length) { event.preventBaseUIHandler(); setFeedback(true); return; }
          setFeedback(false);
          if (next !== raw) {
            // 被改写的文本会让光标跳到末尾；按光标之前那段的归一化结果放回原位。
            const caret = normalizeValue(raw.slice(0, input.selectionStart ?? raw.length)).length;
            queueMicrotask(() => { if (inputRef.current === input && document.activeElement === input) { input.setSelectionRange(caret, caret); syncSelection(input); } });
          }
          // 归一化后与当前值相同（键入了空格、连字符）不是变更：不通知；受控输入由 React 放回原值。
          if (next === value) { syncSelection(input); return; }
          if (valueProp === undefined) setUncontrolled(next);
          onValueChange?.(next, event);
          syncSelection(input);
        }}
        onPaste={event => {
          onPaste?.(event);
          if (event.defaultPrevented || event.baseUIHandlerPrevented || event.currentTarget.disabled || event.currentTarget.readOnly) return;
          const input = event.currentTarget;
          const next = normalizeValue(value.slice(0, input.selectionStart ?? 0) + event.clipboardData.getData("text") + value.slice(input.selectionEnd ?? 0));
          const nextLength = Array.from(next).length;
          if (nextLength > length && nextLength >= characters.length) { event.preventDefault(); setFeedback(true); }
        }}
      />
    </div>
    {/* 只读说明与 Textarea、NumberField 同一件事、同一档字（caption），在格子外下方；只读本身由 input 的 readonly 向读屏表达，故 aria-hidden。 */}
    {props.readOnly && <span data-slot="otp-field-readonly" aria-hidden="true" className="text-caption text-muted-foreground">{messages.readOnly}</span>}
    {feedback && <div id={feedbackId} data-slot="otp-field-feedback" role="status" className="text-support-mobile text-muted-foreground sm:text-support">{messages.otpLengthExceeded(length)}</div>}
  </div>;
}
