"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { useRender } from "@base-ui/react/use-render";
import { IconX } from "@tabler/icons-react";
import * as React from "react";
import { flushSync } from "react-dom";
import { useUILocale } from "../locale";
import { chipActionClassName, chipClassName, chipDraftControlClassName, chipFrameStyle, chipTextClassName } from "../chip";
import { cn } from "../utils";
import { Button } from "./button";
import { Input, type InputProps } from "./input";
import { InputGroup } from "./input-group";

export type TagInputChangeDetails = {
  reason: "add" | "remove";
  tag: string;
  /** 用户操作的事件；表单提交时收下草稿则是原生 submit 事件。 */
  event: React.SyntheticEvent | Event;
  cancel: () => void;
  readonly isCanceled: boolean;
};
declare const process: { env: { NODE_ENV?: string } };

/**
 * 「往前、往后」的方向键随实际排版：标签在行内起点一侧，RTL 下起点在右，往前就是 ArrowRight。
 * 读该元素的 computed `direction` 而不是 `useUIDirection()`：后者只反映 UILocaleProvider 的声明，
 * 而 `<html dir>`、局部 `dir` 属性与 CSS 同样会改变排版，键应当跟着屏幕上看到的方向走（与 Tree、Heatmap 一致）。
 */
const arrowToward = (element: Element) => {
  const rtl = getComputedStyle(element).direction === "rtl";
  return { backward: rtl ? "ArrowRight" : "ArrowLeft", forward: rtl ? "ArrowLeft" : "ArrowRight" };
};

export type TagInputProps = Omit<useRender.ComponentProps<"div">, "defaultValue" | "onChange" | "children"> & {
  value?: readonly string[];
  defaultValue?: readonly string[];
  onValueChange?: (value: string[], details: TagInputChangeDetails) => void;
  draft?: string;
  defaultDraft?: string;
  onDraftChange?: (draft: string) => void;
  name?: string;
  form?: string;
  disabled?: boolean;
  readOnly?: boolean;
  /**
   * 至少要有一个已确认的标签。原生校验落在草稿输入上，但只在没有任何标签时才带 `required`：
   * 有标签而草稿为空不算缺失。草稿里有字、尚无标签时，提交前先按 Enter 的规则收下（见 `validate`）。
   */
  required?: boolean;
  /**
   * 键入或粘贴到分隔符时拆成多个标签（字符串按字面，正则按匹配；不要带捕获组，捕获内容会被当作标签）。
   * 默认不拆：逗号、空格在有些任务里就是标签的一部分。键入分隔符收下其前的部分，粘贴则收下全部。
   */
  splitOn?: string | RegExp;
  /** 标签数量上限，正整数。达到后草稿输入与添加按钮禁用并说明原因；已有集合超出时完整呈现，不截断。 */
  max?: number;
  /** 草稿输入失焦时，把非空草稿当作一次 Enter 收下；焦点只是移到本组件的其他按钮时不触发。默认 false。 */
  addOnBlur?: boolean;
  /**
   * 自定义拒绝：返回文案即拒绝该标签，文案就地显示并进入草稿输入的可访问描述；返回 undefined 即接受。
   * 在空值、重复与数量上限判断之后才调用，第二个参数是当前已确认的标签。
   */
  validate?: (tag: string, tags: readonly string[]) => string | undefined;
  /** FieldLabel 注册真实草稿入口；额外属性、render 与 ref 也属于该入口。`required` 属于 TagInput 本身。 */
  inputProps?: Omit<InputProps, "value" | "defaultValue" | "onValueChange" | "name" | "size" | "required">;
};

// 默认值用稳定引用：每次渲染新建的空数组会让依赖它的 effect 反复重订阅。
const NO_TAGS: readonly string[] = Object.freeze([]);

// Field still registers the editing entrance; only confirmed hidden inputs own submission names.
function DraftInputSurface({ elementProps, state, render, limit, onBase }: { elementProps: React.ComponentPropsWithRef<"input">; state: InputPrimitive.State; render: InputProps["render"]; limit: boolean; onBase: (disabled: boolean) => void }) {
  // 数量上限造成的禁用与调用方、Field、fieldset 造成的禁用要分得开：前者不应连带禁用已确认标签与隐藏字段。
  React.useLayoutEffect(() => onBase(Boolean(elementProps.disabled)), [elementProps.disabled, onBase]);
  return useRender({ defaultTagName: "input", render, state: { ...state }, ref: elementProps.ref, props: { ...elementProps, name: undefined, disabled: elementProps.disabled || limit } });
}

/** 已确认集合与草稿分开；受控添加尚未接受时不清除草稿。 */
export function TagInput({
  value: valueProp, defaultValue = NO_TAGS, onValueChange, draft: draftProp, defaultDraft = "", onDraftChange,
  name, form, disabled = false, readOnly = false, required = false, splitOn, max, addOnBlur = false, validate, inputProps = {},
  className, render, ref, ...props
}: TagInputProps) {
  if (max !== undefined && (!Number.isSafeInteger(max) || max < 1)) throw new RangeError("TagInput max must be a positive safe integer.");
  const { messages } = useUILocale();
  const feedbackId = React.useId();
  const limitId = React.useId();
  const [uncontrolledValue, setUncontrolledValue] = React.useState<readonly string[]>(defaultValue);
  const [uncontrolledDraft, setUncontrolledDraft] = React.useState(defaultDraft);
  const [feedback, setFeedback] = React.useState<string | null>(null);
  const [blocked, setBlocked] = React.useState({ disabled, readOnly });
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const removeRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const composing = React.useRef(false);
  const pending = React.useRef<{ tag: string; draft: string; rest: string } | null>(null);
  const value = valueProp ?? uncontrolledValue;
  const draft = draftProp ?? uncontrolledDraft;
  const atMax = max !== undefined && value.length >= max;
  // 数量上限造成的禁用与外部造成的禁用分开记：前者不得连带禁用已确认标签与隐藏字段。
  const limited = React.useRef(false);
  const baseDisabled = React.useRef(false);
  const onBase = React.useCallback((next: boolean) => { baseDisabled.current = next; }, []);
  const focusLastAfterLimit = React.useRef(false);
  const latest = React.useRef<{ value: readonly string[]; submit: (event: Event) => void } | null>(null);
  const changeDraft = React.useCallback((next: string) => {
    if (draftProp === undefined) setUncontrolledDraft(next);
    onDraftChange?.(next);
  }, [draftProp, onDraftChange]);
  const readFacts = React.useCallback(() => {
    const input = inputRef.current;
    if (!input) return null;
    return {
      disabled: limited.current ? baseDisabled.current || Boolean(input.closest("fieldset[disabled]")) : input.disabled || input.matches(":disabled"),
      readOnly: input.readOnly,
    };
  }, []);
  const syncBlocked = React.useCallback(() => {
    const next = readFacts();
    if (!next) return;
    setBlocked(previous => previous.disabled === next.disabled && previous.readOnly === next.readOnly ? previous : next);
  }, [readFacts]);
  React.useLayoutEffect(() => { limited.current = atMax; });
  React.useLayoutEffect(syncBlocked);
  React.useLayoutEffect(() => {
    // 数量到顶时草稿输入被禁用，焦点会丢到页面上；改落在刚收下的那个标签的移除按钮。
    if (atMax && focusLastAfterLimit.current) { focusLastAfterLimit.current = false; removeRefs.current[value.length - 1]?.focus(); }
  });
  React.useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const observer = new MutationObserver(syncBlocked);
    const container = input.closest("fieldset") ?? input.parentElement;
    if (container) observer.observe(container, { attributes: true, subtree: true, attributeFilter: ["disabled", "readonly"] });
    const ownerForm = input.form;
    const reset = (event: Event) => queueMicrotask(() => {
      if (event.defaultPrevented) return;
      if (valueProp === undefined) setUncontrolledValue(defaultValue);
      if (draftProp === undefined) setUncontrolledDraft(defaultDraft);
      setFeedback(null);
      pending.current = null;
    });
    const submit = (event: Event) => latest.current?.submit(event);
    ownerForm?.addEventListener("reset", reset);
    ownerForm?.addEventListener("submit", submit);
    return () => { observer.disconnect(); ownerForm?.removeEventListener("reset", reset); ownerForm?.removeEventListener("submit", submit); };
  }, [syncBlocked, valueProp, draftProp, defaultValue, defaultDraft, form]);
  React.useEffect(() => {
    const request = pending.current;
    if (request && value.includes(request.tag)) {
      pending.current = null;
      if (draft === request.draft) changeDraft(request.rest);
    }
  }, [value, draft, changeDraft]);

  const isBlocked = () => {
    const facts = readFacts();
    return !facts || facts.disabled || facts.readOnly;
  };
  const emit = (next: string[], tag: string, reason: TagInputChangeDetails["reason"], event: React.SyntheticEvent | Event) => {
    let canceled = false;
    onValueChange?.(next, { reason, tag, event, cancel: () => { canceled = true; }, get isCanceled() { return canceled; } });
    if (!canceled && valueProp === undefined) setUncontrolledValue(next);
    return !canceled;
  };
  // 一枚标签能否收下：空、重复、数量、调用方规则，依次判断，第一个不成立的就是拒绝理由。
  const judge = (tag: string, existing: readonly string[]): string | null =>
    !tag ? messages.tagEmpty
      : existing.includes(tag) ? messages.tagExists(tag)
        : max !== undefined && existing.length >= max ? messages.tagLimit(max)
          : validate?.(tag, existing) || null;
  const splitText = (text: string): string[] => splitOn === undefined ? [text] : text.split(splitOn).filter((part): part is string => part !== undefined);
  // 被拒绝的片段留在草稿里，用文本里实际出现过的分隔符接回去，再键入分隔符即可重试。
  const separatorIn = (text: string) => typeof splitOn === "string" ? splitOn : splitOn ? text.match(new RegExp(splitOn.source, splitOn.flags.replace(/[gy]/g, "")))?.[0] ?? " " : "";
  const commit = (parts: readonly string[], event: React.SyntheticEvent | Event, skipEmpty: boolean) => {
    let accepted: readonly string[] = value;
    const kept: string[] = [];
    let error: string | null = null;
    for (const part of parts) {
      const tag = part.trim();
      if (!tag && skipEmpty) continue;
      const problem = judge(tag, accepted);
      if (problem) { error ??= problem; kept.push(part); continue; }
      const next = [...accepted, tag];
      if (emit(next, tag, "add", event)) accepted = next; else kept.push(part);
    }
    return { accepted, kept, error, added: accepted.length - value.length };
  };
  /**
   * 收下之后的草稿去向。`text` 是此刻应显示的草稿（受控集合尚未接受时保留它），`rest` 是全部收下后剩下的：
   * 被拒绝的片段，以及键入时分隔符之后还在写的那一段。一枚也没收下就让草稿保持 `text`，失败不清草稿。
   */
  const settle = (result: ReturnType<typeof commit>, text: string, rest: string) => {
    setFeedback(result.error);
    if (result.added > 0) {
      if (max !== undefined && result.accepted.length >= max) focusLastAfterLimit.current = true;
      if (valueProp === undefined) changeDraft(rest);
      else { pending.current = { tag: result.accepted[result.accepted.length - 1]!, draft: text, rest }; if (text !== draft) changeDraft(text); }
    } else if (text !== draft) changeDraft(text);
  };
  /** Enter、添加按钮、失焦、表单提交共用的一条路：收下草稿。 */
  const addDraft = (event: React.SyntheticEvent | Event, refocus: boolean) => {
    if (isBlocked() || composing.current) return null;
    const parts = splitText(draft);
    const result = commit(parts, event, parts.length > 1);
    settle(result, draft, result.kept.join(separatorIn(draft)));
    if (refocus && !focusLastAfterLimit.current) inputRef.current?.focus();
    return result;
  };
  // 键入分隔符：其前的部分收下，其后的部分仍是草稿。
  const confirmTyped = (text: string, event: React.SyntheticEvent) => {
    const parts = splitText(text);
    const result = commit(parts.slice(0, -1), event, true);
    const separator = separatorIn(text);
    settle(result, text, [result.kept.join(separator), parts[parts.length - 1] ?? ""].filter(Boolean).join(separator));
  };
  const remove = (index: number, event: React.SyntheticEvent) => {
    if (isBlocked()) return;
    const tag = value[index];
    if (tag === undefined) return;
    const next = value.filter((_, position) => position !== index);
    if (emit(next, tag, "remove", event)) {
      setFeedback(null);
      // DOM 更新后保留相邻位置；受控拒绝时原集合与按钮继续存在。
      queueMicrotask(() => (removeRefs.current[Math.min(index, next.length - 1)] ?? inputRef.current)?.focus());
    }
  };
  // 提交：草稿里有字却不入表单是静默丢失。按 Enter 的规则收下；收不下就拦住提交并就地说出原因。
  React.useLayoutEffect(() => {
    latest.current = {
      value,
      submit: event => {
        if (event.defaultPrevented || isBlocked() || composing.current || !draft.trim()) return;
        const box: { done: ReturnType<typeof addDraft> } = { done: null };
        flushSync(() => { box.done = addDraft(event, false); });
        const done = box.done;
        if (done && done.kept.length === 0 && done.added > 0 && done.accepted.every(tag => latest.current?.value.includes(tag))) return;
        // 取消还不够：React 的 onSubmit 不看 defaultPrevented，调用方的处理函数仍会照常执行并读到少一条的数据。
        // 拦住提交要与浏览器原生校验失败一致——提交事件根本不发生。
        event.preventDefault();
        event.stopPropagation();
        setFeedback(done?.error ?? messages.tagDraftPending(draft.trim()));
        inputRef.current?.focus();
      },
    };
  });
  const { ref: inputExternalRef, render: inputRender, controlClassName, onChange, onKeyDown, onCompositionStart, onCompositionEnd, onBlur, onPaste, "aria-describedby": describedBy, ...restInputProps } = inputProps;
  const { required: misplacedRequired, ...nativeInputProps } = restInputProps as typeof restInputProps & { required?: boolean };
  React.useEffect(() => {
    if (misplacedRequired !== undefined && typeof process !== "undefined" && process.env.NODE_ENV !== "production") console.warn("TagInput: `inputProps.required` is ignored. Pass `required` to TagInput; it means at least one confirmed tag.");
  }, [misplacedRequired]);
  const setInputRef = React.useCallback((node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof inputExternalRef === "function") {
      const cleanup = inputExternalRef(node);
      if (typeof cleanup === "function") return () => { inputRef.current = null; cleanup(); };
    } else if (inputExternalRef) inputExternalRef.current = node;
  }, [inputExternalRef]);
  const shownFeedback = feedback ?? (atMax && max !== undefined ? messages.tagLimit(max) : null);

  // 已确认的标签、草稿与添加动作共用一条可换行的编辑边界；几何见 src/chip.ts。
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({
    "data-slot": "tag-input",
    "data-disabled": blocked.disabled ? "" : undefined,
    "data-readonly": blocked.readOnly ? "" : undefined,
    style: chipFrameStyle,
  }, props, {
    className: cn("flex min-w-0 flex-col gap-(--qy-field-gap)", className),
    children: <>
      {/* 到顶只是「这里不能再添加」，不是「整个字段不可操作」：已确认的标签仍可移除、仍要读。
            草稿输入为此禁用，InputGroup 会按禁用画清染面；在这一状态下改回纸色与焦墨，线仍是清墨——与只读同一画法（基础层 §9）。 */}
      <InputGroup data-slot="tag-input-control" data-readonly={blocked.readOnly ? "" : undefined} data-limit={atMax && !blocked.disabled ? "" : undefined}
        className="items-center gap-(--qy-tag-inset) p-(--qy-tag-inset) data-limit:has-[input:disabled]:cursor-auto data-limit:has-[input:disabled]:bg-surface-field data-limit:has-[input:disabled]:text-foreground">
        {value.length > 0 && <ul data-slot="tag-input-items" className="flex min-w-0 max-w-full flex-wrap gap-(--qy-tag-inset)">
          {value.map((tag, index) => <li key={`${index}:${tag}`} data-slot="tag-input-item" className={chipClassName} data-readonly={blocked.readOnly ? "" : undefined}>
            <span data-slot="tag-input-value" className={cn("min-w-0 truncate", chipTextClassName)}>{tag}</span>
            {!blocked.readOnly && <Button ref={node => { removeRefs.current[index] = node; }} data-slot="tag-input-remove" size="xs" variant="quiet" shape="icon" type="button" disabled={blocked.disabled}
              className={chipActionClassName}
              aria-label={messages.removeTag(tag)} onClick={event => remove(index, event)}
              onKeyDown={event => {
                if (event.defaultPrevented || event.nativeEvent.isComposing || event.keyCode === 229) return;
                if (event.key === "Backspace" || event.key === "Delete") { event.preventDefault(); remove(index, event); }
                else if (event.key === arrowToward(event.currentTarget).backward) { event.preventDefault(); (removeRefs.current[index - 1] ?? inputRef.current)?.focus(); }
                else if (event.key === arrowToward(event.currentTarget).forward) { event.preventDefault(); (removeRefs.current[index + 1] ?? inputRef.current)?.focus(); }
              }}
            ><IconX aria-hidden="true" /></Button>}
          </li>)}
        </ul>}
        {/* 草稿与添加动作成对换行：添加只作用于草稿，二者分到两行时动作失去对象。
            10em 是草稿编辑区的最小宽度，预设（约十个字符，容得下一个常见标签），与 --qy-field-min-text 是两回事。 */}
        <div data-slot="tag-input-editor" className="flex min-w-[min(100%,10em)] flex-1 items-center gap-(--qy-tag-inset)">
        <Input {...nativeInputProps} ref={setInputRef} value={draft} form={form} disabled={disabled || nativeInputProps.disabled} readOnly={readOnly || nativeInputProps.readOnly} unstyled
          // required 的意思是「至少一个标签」：有标签时草稿为空不算缺失。aria-required 始终跟随，不随原生属性的开关忽有忽无。
          required={required && value.length === 0} aria-required={required || undefined}
          controlClassName={cn(chipDraftControlClassName, controlClassName)}
          className="px-(--qy-tag-padding)"
          // 到上限只停用空草稿：留着字的草稿（溢出的粘贴、defaultDraft）必须还能改、能清，否则它挡住提交又改不了。
          render={(elementProps, state) => <DraftInputSurface elementProps={elementProps} state={state} render={inputRender} limit={atMax && draft === ""} onBase={onBase} />}
          aria-describedby={[describedBy, shownFeedback ? feedbackId : max !== undefined ? limitId : undefined].filter(Boolean).join(" ") || undefined}
          onChange={event => {
            onChange?.(event);
            if (event.defaultPrevented || event.baseUIHandlerPrevented || isBlocked()) return;
            pending.current = null;
            setFeedback(null);
            const text = event.currentTarget.value;
            if (splitOn !== undefined && !composing.current && splitText(text).length > 1) confirmTyped(text, event);
            else changeDraft(text);
          }}
          onPaste={event => {
            onPaste?.(event);
            if (splitOn === undefined || event.defaultPrevented || event.baseUIHandlerPrevented || isBlocked() || composing.current) return;
            const input = event.currentTarget;
            const combined = draft.slice(0, input.selectionStart ?? draft.length) + event.clipboardData.getData("text") + draft.slice(input.selectionEnd ?? draft.length);
            const parts = splitText(combined);
            if (parts.length < 2) return;
            // 粘贴一串：全部收下（键入分隔符时最后一段还在写，粘贴则已写完）。
            event.preventDefault();
            const result = commit(parts, event, true);
            settle(result, combined, result.kept.join(separatorIn(combined)));
          }}
          onBlur={event => {
            onBlur?.(event);
            if (!addOnBlur || event.defaultPrevented || event.baseUIHandlerPrevented || isBlocked() || composing.current || !draft.trim()) return;
            // 焦点只是移到本组件自己的按钮（添加、移除）：草稿还要由那个动作处理，不抢先收下。
            const next = event.relatedTarget;
            if (next instanceof Node && event.currentTarget.closest("[data-slot=tag-input-control]")?.contains(next)) return;
            addDraft(event, false);
          }}
          onCompositionStart={event => { composing.current = true; onCompositionStart?.(event); }}
          onCompositionEnd={event => {
            composing.current = false;
            onCompositionEnd?.(event);
            // 合成中键入的分隔符直到合成结束才有意义。
            const text = event.currentTarget.value;
            if (splitOn !== undefined && !event.defaultPrevented && !isBlocked() && splitText(text).length > 1) confirmTyped(text, event);
          }}
          onKeyDown={event => {
            onKeyDown?.(event);
            if (event.defaultPrevented || event.baseUIHandlerPrevented || isBlocked() || composing.current || event.nativeEvent.isComposing || event.keyCode === 229) return;
            if (event.key === "Enter") { event.preventDefault(); addDraft(event, true); }
            else if ((event.key === "Backspace" && draft === "") || (event.key === arrowToward(event.currentTarget).backward && event.currentTarget.selectionStart === 0 && event.currentTarget.selectionEnd === 0)) {
              const last = removeRefs.current[value.length - 1];
              if (last) { event.preventDefault(); last.focus(); }
            }
          }}
        />
        {!blocked.readOnly && <Button data-slot="tag-input-add" variant="quiet" type="button" disabled={blocked.disabled || atMax} onClick={event => addDraft(event, true)}
          // 点添加不让草稿失焦：失焦收下（addOnBlur）与这一次点击会重复处理同一份草稿；Safari 的按钮点击不给焦点，relatedTarget 也认不出。
          onMouseDown={event => event.preventDefault()}
          aria-label={max !== undefined ? messages.addTagWithLimit(max) : undefined}
          className={cn("h-(--qy-tag-chip) min-h-0 shrink-0 whitespace-nowrap rounded-(--qy-tag-radius) px-(--qy-tag-padding) text-muted-foreground hover:text-foreground sm:min-h-0 [&_[data-slot=button-content]]:whitespace-nowrap", chipTextClassName)}>{messages.addTag}</Button>}
        </div>
      </InputGroup>
      {shownFeedback && <div id={feedbackId} data-slot="tag-input-feedback" role="status" className="text-support-mobile text-muted-foreground sm:text-support">{shownFeedback}</div>}
      {max !== undefined && !shownFeedback && <span id={limitId} className="sr-only">{messages.tagLimit(max)}</span>}
      {name && value.map((tag, index) => <input key={index} type="hidden" name={name} value={tag} form={form} disabled={blocked.disabled} />)}
    </>,
  }) });
}
