"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { useRender } from "@base-ui/react/use-render";
import { IconX } from "@tabler/icons-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { chipActionClassName, chipClassName, chipDraftControlClassName, chipFrameStyle, chipTextClassName } from "../chip";
import { cn } from "../utils";
import { Button } from "./button";
import { Input, type InputProps } from "./input";
import { InputGroup } from "./input-group";

export type TagInputChangeDetails = {
  reason: "add" | "remove";
  tag: string;
  event: React.SyntheticEvent;
  cancel: () => void;
  readonly isCanceled: boolean;
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
  /** FieldLabel 注册真实草稿入口；额外属性、render 与 ref 也属于该入口。 */
  inputProps?: Omit<InputProps, "value" | "defaultValue" | "onValueChange" | "name" | "size">;
};

// 默认值用稳定引用：每次渲染新建的空数组会让依赖它的 effect 反复重订阅。
const NO_TAGS: readonly string[] = Object.freeze([]);

// Field still registers the editing entrance; only confirmed hidden inputs own submission names.
function DraftInputSurface({ elementProps, state, render }: { elementProps: React.ComponentPropsWithRef<"input">; state: InputPrimitive.State; render: InputProps["render"] }) {
  return useRender({ defaultTagName: "input", render, state: { ...state }, ref: elementProps.ref, props: { ...elementProps, name: undefined } });
}

/** 已确认集合与草稿分开；受控添加尚未接受时不清除草稿。 */
export function TagInput({
  value: valueProp, defaultValue = NO_TAGS, onValueChange, draft: draftProp, defaultDraft = "", onDraftChange,
  name, form, disabled = false, readOnly = false, inputProps = {},
  className, render, ref, ...props
}: TagInputProps) {
  const { messages } = useUILocale();
  const feedbackId = React.useId();
  const [uncontrolledValue, setUncontrolledValue] = React.useState<readonly string[]>(defaultValue);
  const [uncontrolledDraft, setUncontrolledDraft] = React.useState(defaultDraft);
  const [feedback, setFeedback] = React.useState<string | null>(null);
  const [blocked, setBlocked] = React.useState({ disabled, readOnly });
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const removeRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const composing = React.useRef(false);
  const pending = React.useRef<{ tag: string; draft: string } | null>(null);
  const value = valueProp ?? uncontrolledValue;
  const draft = draftProp ?? uncontrolledDraft;
  const changeDraft = React.useCallback((next: string) => {
    if (draftProp === undefined) setUncontrolledDraft(next);
    onDraftChange?.(next);
  }, [draftProp, onDraftChange]);
  const syncBlocked = React.useCallback(() => {
    const input = inputRef.current;
    if (!input) return;
    const next = { disabled: input.disabled || input.matches(":disabled"), readOnly: input.readOnly };
    setBlocked(previous => previous.disabled === next.disabled && previous.readOnly === next.readOnly ? previous : next);
  }, []);
  React.useLayoutEffect(syncBlocked);
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
    ownerForm?.addEventListener("reset", reset);
    return () => { observer.disconnect(); ownerForm?.removeEventListener("reset", reset); };
  }, [syncBlocked, valueProp, draftProp, defaultValue, defaultDraft, form]);
  React.useEffect(() => {
    const request = pending.current;
    if (request && value.includes(request.tag)) {
      pending.current = null;
      if (draft === request.draft) changeDraft("");
    }
  }, [value, draft, changeDraft]);

  const isBlocked = () => {
    const input = inputRef.current;
    return !input || input.disabled || input.matches(":disabled") || input.readOnly;
  };
  const emit = (next: string[], tag: string, reason: TagInputChangeDetails["reason"], event: React.SyntheticEvent) => {
    let canceled = false;
    onValueChange?.(next, { reason, tag, event, cancel: () => { canceled = true; }, get isCanceled() { return canceled; } });
    if (!canceled && valueProp === undefined) setUncontrolledValue(next);
    return !canceled;
  };
  const add = (event: React.SyntheticEvent) => {
    if (isBlocked() || composing.current) return;
    const tag = draft.trim();
    if (!tag) { setFeedback(messages.tagEmpty); return; }
    if (value.includes(tag)) { setFeedback(messages.tagExists(tag)); return; }
    setFeedback(null);
    if (emit([...value, tag], tag, "add", event)) {
      if (valueProp === undefined) changeDraft("");
      else pending.current = { tag, draft };
    }
    inputRef.current?.focus();
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
  const { ref: inputExternalRef, render: inputRender, controlClassName, onChange, onKeyDown, onCompositionStart, onCompositionEnd, "aria-describedby": describedBy, ...nativeInputProps } = inputProps;
  const setInputRef = React.useCallback((node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof inputExternalRef === "function") {
      const cleanup = inputExternalRef(node);
      if (typeof cleanup === "function") return () => { inputRef.current = null; cleanup(); };
    } else if (inputExternalRef) inputExternalRef.current = node;
  }, [inputExternalRef]);

  // 已确认的标签、草稿与添加动作共用一条可换行的编辑边界；几何见 src/chip.ts。
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({
    "data-slot": "tag-input",
    "data-disabled": blocked.disabled ? "" : undefined,
    "data-readonly": blocked.readOnly ? "" : undefined,
    style: chipFrameStyle,
  }, props, {
    className: cn("flex min-w-0 flex-col gap-(--qy-field-gap)", className),
    children: <>
      <InputGroup data-slot="tag-input-control" data-readonly={blocked.readOnly ? "" : undefined} className="items-center gap-(--qy-tag-inset) p-(--qy-tag-inset)">
        {value.length > 0 && <ul data-slot="tag-input-items" className="flex min-w-0 max-w-full flex-wrap gap-(--qy-tag-inset)">
          {value.map((tag, index) => <li key={`${index}:${tag}`} data-slot="tag-input-item" className={chipClassName} data-readonly={blocked.readOnly ? "" : undefined}>
            <span data-slot="tag-input-value" className={cn("min-w-0 truncate", chipTextClassName)}>{tag}</span>
            {!blocked.readOnly && <Button ref={node => { removeRefs.current[index] = node; }} data-slot="tag-input-remove" size="xs" variant="quiet" shape="icon" type="button" disabled={blocked.disabled}
              className={chipActionClassName}
              aria-label={messages.removeTag(tag)} onClick={event => remove(index, event)}
              onKeyDown={event => {
                if (event.defaultPrevented || event.nativeEvent.isComposing || event.keyCode === 229) return;
                if (event.key === "Backspace" || event.key === "Delete") { event.preventDefault(); remove(index, event); }
                else if (event.key === "ArrowLeft") { event.preventDefault(); (removeRefs.current[index - 1] ?? inputRef.current)?.focus(); }
                else if (event.key === "ArrowRight") { event.preventDefault(); (removeRefs.current[index + 1] ?? inputRef.current)?.focus(); }
              }}
            ><IconX aria-hidden="true" /></Button>}
          </li>)}
        </ul>}
        {/* 草稿与添加动作成对换行：添加只作用于草稿，二者分到两行时动作失去对象。 */}
        <div data-slot="tag-input-editor" className="flex min-w-[min(100%,10em)] flex-1 items-center gap-(--qy-tag-inset)">
        <Input {...nativeInputProps} ref={setInputRef} value={draft} form={form} disabled={disabled || nativeInputProps.disabled} readOnly={readOnly || nativeInputProps.readOnly} unstyled
          controlClassName={cn(chipDraftControlClassName, controlClassName)}
          className="px-(--qy-tag-padding)"
          render={(elementProps, state) => <DraftInputSurface elementProps={elementProps} state={state} render={inputRender} />}
          aria-describedby={[describedBy, feedback ? feedbackId : undefined].filter(Boolean).join(" ") || undefined}
          onChange={event => {
            onChange?.(event);
            if (event.defaultPrevented || event.baseUIHandlerPrevented || isBlocked()) return;
            pending.current = null;
            setFeedback(null);
            changeDraft(event.currentTarget.value);
          }}
          onCompositionStart={event => { composing.current = true; onCompositionStart?.(event); }}
          onCompositionEnd={event => { composing.current = false; onCompositionEnd?.(event); }}
          onKeyDown={event => {
            onKeyDown?.(event);
            if (event.defaultPrevented || event.baseUIHandlerPrevented || isBlocked() || composing.current || event.nativeEvent.isComposing || event.keyCode === 229) return;
            if (event.key === "Enter") { event.preventDefault(); add(event); }
            else if ((event.key === "Backspace" && draft === "") || (event.key === "ArrowLeft" && event.currentTarget.selectionStart === 0 && event.currentTarget.selectionEnd === 0)) {
              const last = removeRefs.current[value.length - 1];
              if (last) { event.preventDefault(); last.focus(); }
            }
          }}
        />
        {!blocked.readOnly && <Button data-slot="tag-input-add" variant="quiet" type="button" disabled={blocked.disabled} onClick={add}
          className={cn("h-(--qy-tag-chip) min-h-0 shrink-0 whitespace-nowrap rounded-(--qy-tag-radius) px-(--qy-tag-padding) text-muted-foreground hover:text-foreground sm:min-h-0 [&_[data-slot=button-content]]:whitespace-nowrap", chipTextClassName)}>{messages.addTag}</Button>}
        </div>
      </InputGroup>
      {feedback && <div id={feedbackId} data-slot="tag-input-feedback" role="status" className="text-support-mobile text-muted-foreground sm:text-support">{feedback}</div>}
      {name && value.map((tag, index) => <input key={index} type="hidden" name={name} value={tag} form={form} disabled={blocked.disabled} />)}
    </>,
  }) });
}
