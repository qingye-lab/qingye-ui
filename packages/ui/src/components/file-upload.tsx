"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { Input as FileUploadPrimitive } from "@base-ui/react/input";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Button, buttonVariants } from "./button";
import { Input, type InputProps, type InputSize } from "./input";
import { Progress, ProgressIndicator, ProgressTrack } from "./progress";

export type FileUploadRejection = { file: File; reason: "type" | "size" | "count" };
export type FileUploadChangeDetails = {
  reason: "select" | "drop" | "remove";
  added: readonly File[];
  removed: readonly File[];
  event: React.SyntheticEvent;
  cancel: () => void;
  readonly isCanceled: boolean;
};
export type FileUploadStatus = {
  state: "waiting" | "failed" | "unknown" | "success";
  label: string;
} | {
  state: "in-progress";
  label: string;
  progress?: { value: number | null; min?: number; max: number };
};
export type FileUploadProps = Omit<useRender.ComponentProps<"div">, "children" | "defaultValue"> & {
  value?: readonly File[];
  defaultValue?: readonly File[];
  onValueChange?: (value: readonly File[], details: FileUploadChangeDetails) => void;
  onReject?: (rejections: readonly FileUploadRejection[], event: React.SyntheticEvent) => void;
  name?: string | undefined;
  form?: string | undefined;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  readOnly?: boolean;
  size?: InputSize;
  inputProps?: Omit<InputProps, "value" | "defaultValue" | "onValueChange" | "type" | "name" | "form" | "accept" | "multiple" | "required" | "disabled" | "readOnly" | "size">;
  getStatus?: (file: File) => FileUploadStatus | undefined;
  renderFileActions?: (file: File, status: FileUploadStatus | undefined) => React.ReactNode;
};

function accepts(file: File, accept: string | undefined) {
  const rules = accept?.split(",").map(rule => rule.trim().toLowerCase()).filter(Boolean) ?? [];
  if (!rules.length) return true;
  return rules.some(rule => rule.startsWith(".") ? file.name.toLowerCase().endsWith(rule) : rule.endsWith("/*") ? file.type.toLowerCase().startsWith(rule.slice(0, -1)) : file.type.toLowerCase() === rule);
}
function validateRules(accept: string | undefined, maxFiles: number | undefined, maxSize: number | undefined) {
  if (maxFiles !== undefined && (!Number.isSafeInteger(maxFiles) || maxFiles < 0)) throw new RangeError("FileUpload maxFiles must be a non-negative safe integer.");
  if (maxSize !== undefined && (!Number.isSafeInteger(maxSize) || maxSize < 0)) throw new RangeError("FileUpload maxSize must be a non-negative byte count.");
  if (accept?.split(",").map(rule => rule.trim()).filter(Boolean).some(rule => !/^\.[\w.-]+$|^[\w!#$&^.+-]+\/(?:[\w!#$&^.+-]+|\*)$/.test(rule))) throw new TypeError("FileUpload accept requires comma-separated extensions or MIME types.");
}
type InputMeta = { name: string | undefined; disabled: boolean };
function ChooserSurface({ elementProps, state, render, onMeta, size, label }: { elementProps: React.ComponentPropsWithRef<"input">; state: FileUploadPrimitive.State; render: InputProps["render"]; onMeta: (meta: InputMeta) => void; size: InputSize; label: string }) {
  React.useLayoutEffect(() => onMeta({ name: elementProps.name, disabled: Boolean(elementProps.disabled) }), [elementProps.name, elementProps.disabled, onMeta]);
  // Field registration keeps names/errors, while this native outlet is a selection draft.
  const { value: _value, defaultValue: _defaultValue, name: _name, required: _required, ...nativeProps } = elementProps;
  const input = useRender({ defaultTagName: "input", render, ref: elementProps.ref, state: { ...state }, props: { ...nativeProps, className: cn("absolute inset-0 h-full cursor-pointer opacity-0", nativeProps.className) } });
  return <>{input}<span aria-hidden="true" data-slot="file-upload-chooser-label" className={cn(buttonVariants({ variant: "quiet", size }), "pointer-events-none col-start-2 row-start-1 min-h-0 px-(--qy-input-padding) sm:min-h-0")}>{label}</span></>;
}

/** Local accepted Files only. Upload facts and recovery remain with the application. */
export function FileUpload({ value: valueProp, defaultValue = [], onValueChange, onReject, name, form, accept, multiple = true, maxFiles, maxSize, disabled = false, readOnly = false, size = "md", inputProps = {}, getStatus, renderFileActions, className, render, ref, onDrop, onDragOver, onDragLeave, ...props }: FileUploadProps) {
  validateRules(accept, maxFiles, maxSize);
  const { messages } = useUILocale();
  const initial = React.useRef([...defaultValue]);
  const [localValue, setLocalValue] = React.useState<readonly File[]>(initial.current);
  const value = valueProp ?? localValue;
  if (new Set(value).size !== value.length) throw new TypeError("FileUpload requires distinct File references.");
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [meta, setMeta] = React.useState<InputMeta>({ name, disabled });
  const [rejections, setRejections] = React.useState<readonly FileUploadRejection[]>([]);
  const [dragging, setDragging] = React.useState(false);
  const [nativeDisabled, setNativeDisabled] = React.useState(disabled);
  const keys = React.useRef(new WeakMap<File, string>());
  const nextKey = React.useRef(0);
  const removeButtons = React.useRef(new Map<File, HTMLButtonElement>());
  const focusedFile = React.useRef<{ file: File; index: number; element: Element } | undefined>(undefined);
  const fileKey = (file: File) => { let key = keys.current.get(file); if (!key) { key = `file-${nextKey.current++}`; keys.current.set(file, key); } return key; };
  const blocked = disabled || meta.disabled || nativeDisabled || readOnly;
  const current = React.useRef({ value, name: meta.name ?? name, disabled: disabled || meta.disabled });
  current.current = { value, name: meta.name ?? name, disabled: disabled || meta.disabled };
  const onMeta = React.useCallback((next: InputMeta) => setMeta(previous => previous.name === next.name && previous.disabled === next.disabled ? previous : next), []);
  React.useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const sync = () => setNativeDisabled(input.disabled || input.matches(":disabled"));
    sync();
    const observer = new MutationObserver(sync);
    const container = input.closest("fieldset") ?? input.parentElement;
    if (container) observer.observe(container, { attributes: true, subtree: true, attributeFilter: ["disabled"] });
    return () => observer.disconnect();
  }, []);
  React.useLayoutEffect(() => {
    const input = inputRef.current;
    const owner = input?.form;
    if (!input || !owner) return;
    const serialize = (event: Event) => {
      const data = (event as Event & { formData: FormData }).formData;
      const facts = current.current;
      if (!data || !facts.name || facts.disabled || input.disabled || input.matches(":disabled")) return;
      for (const file of facts.value) data.append(facts.name, file);
    };
    const reset = (event: Event) => queueMicrotask(() => {
      if (event.defaultPrevented || inputRef.current !== input) return;
      if (valueProp === undefined) setLocalValue(initial.current);
      setRejections([]);
      setDragging(false);
      input.value = "";
    });
    owner.addEventListener("formdata", serialize);
    owner.addEventListener("reset", reset);
    return () => { owner.removeEventListener("formdata", serialize); owner.removeEventListener("reset", reset); };
  });
  React.useLayoutEffect(() => {
    const focused = focusedFile.current;
    if (!focused) return;
    if (value.includes(focused.file)) { focused.index = value.indexOf(focused.file); return; }
    const input = inputRef.current;
    const active = input?.ownerDocument.activeElement;
    focusedFile.current = undefined;
    if (input && (!active || active === input.ownerDocument.body || active === focused.element)) {
      const neighbor = value[Math.min(focused.index, value.length - 1)];
      (neighbor ? removeButtons.current.get(neighbor) : undefined)?.focus();
      if (!neighbor || !removeButtons.current.has(neighbor)) input.focus();
    }
  });
  const request = (next: readonly File[], reason: FileUploadChangeDetails["reason"], added: readonly File[], removed: readonly File[], event: React.SyntheticEvent) => {
    let canceled = false;
    onValueChange?.(next, { reason, added, removed, event, cancel: () => { canceled = true; }, get isCanceled() { return canceled; } });
    if (!canceled && valueProp === undefined) setLocalValue(next);
  };
  const add = (incoming: readonly File[], reason: "select" | "drop", event: React.SyntheticEvent) => {
    if (blocked || inputRef.current?.disabled || inputRef.current?.matches(":disabled")) return;
    const next = [...value];
    const added: File[] = [];
    const rejected: FileUploadRejection[] = [];
    const capacity = multiple ? maxFiles : Math.min(maxFiles ?? 1, 1);
    for (const file of incoming) {
      if (next.includes(file)) continue;
      const rejection = !accepts(file, accept) ? "type" : maxSize !== undefined && file.size > maxSize ? "size" : capacity !== undefined && next.length >= capacity ? "count" : undefined;
      if (rejection) rejected.push({ file, reason: rejection });
      else { next.push(file); added.push(file); }
    }
    setRejections(rejected);
    if (rejected.length) onReject?.(rejected, event);
    if (added.length) request(next, reason, added, [], event);
  };
  const { ref: externalRef, render: inputRender, onChange, onClick, ...inputRest } = inputProps;
  const setInputRef = React.useCallback((node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof externalRef === "function") {
      const cleanup = externalRef(node);
      if (typeof cleanup === "function") return () => { inputRef.current = null; cleanup(); };
    } else if (externalRef) externalRef.current = node;
  }, [externalRef]);
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "data-slot": "file-upload" }, props, {
    "data-dragging": dragging ? "" : undefined,
    "data-readonly": readOnly ? "" : undefined,
    className: cn("grid min-w-0 gap-(--qy-field-group-gap) data-dragging:bg-accent", className),
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => { onDragOver?.(event); if (event.defaultPrevented || blocked) return; event.preventDefault(); if (event.dataTransfer.types.includes("Files")) { event.dataTransfer.dropEffect = "copy"; setDragging(true); } },
    onDragLeave: (event: React.DragEvent<HTMLDivElement>) => { onDragLeave?.(event); if (!event.defaultPrevented && (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget))) setDragging(false); },
    onDrop: (event: React.DragEvent<HTMLDivElement>) => { onDrop?.(event); const canceled = event.defaultPrevented; event.preventDefault(); setDragging(false); if (!canceled) add(Array.from(event.dataTransfer.files), "drop", event); },
    children: <>
      <Input {...inputRest} ref={setInputRef} type="file" name={name} form={form} accept={accept} multiple={multiple} size={size} disabled={disabled} readOnly={readOnly} controlClassName={cn("w-fit", inputRest.controlClassName)} value={value.map(file => file.name).join(", ")} render={(elementProps, state) => <ChooserSurface elementProps={elementProps} state={state} render={inputRender} onMeta={onMeta} size={size} label={messages.chooseFiles} />}
        onClick={event => { onClick?.(event); if (blocked) event.preventDefault(); }}
        onChange={event => { onChange?.(event); const canceled = event.defaultPrevented || event.baseUIHandlerPrevented; event.preventBaseUIHandler(); if (!canceled) add(Array.from(event.currentTarget.files ?? []), "select", event); event.currentTarget.value = ""; }} />
      {!blocked && <p className="text-support text-muted-foreground">{messages.dropFiles}</p>}
      {value.length > 0 && <ul data-slot="file-upload-files" className="grid min-w-0 gap-(--qy-field-group-gap)">{value.map(file => {
        const status = getStatus?.(file);
        if (status && !status.label.trim()) throw new TypeError("FileUpload status requires a visible factual label.");
        return <li key={fileKey(file)} data-slot="file-upload-file" className="grid min-w-0 gap-(--qy-field-gap)" onFocusCapture={event => { focusedFile.current = { file, index: value.indexOf(file), element: event.target }; }} onBlurCapture={event => { if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) focusedFile.current = undefined; }}>
          <div className="flex min-w-0 items-start gap-(--qy-action-gap)"><span className="min-w-0 flex-1 text-body wrap-anywhere">{file.name}</span><Button ref={node => { if (node) removeButtons.current.set(file, node); else removeButtons.current.delete(file); }} size={size} variant="quiet" disabled={blocked} aria-label={messages.removeFile(file.name)} onClick={event => request(value.filter(item => item !== file), "remove", [], [file], event)}>{messages.remove}</Button></div>
          {status && <p role="status" className={cn("text-support wrap-anywhere", status.state === "failed" ? "text-destructive-foreground" : "text-muted-foreground")}>{status.label}</p>}
          {status?.state === "in-progress" && status.progress && <Progress {...status.progress} aria-label={messages.fileProgress(file.name)}><ProgressTrack><ProgressIndicator /></ProgressTrack></Progress>}
          {renderFileActions?.(file, status)}
        </li>;
      })}</ul>}
      {rejections.length > 0 && <ul data-slot="file-upload-rejections" className="grid min-w-0 gap-(--qy-field-gap)">{rejections.map((rejection, index) => <li key={index} className="flex min-w-0 items-start gap-(--qy-action-gap)"><span role="alert" className="min-w-0 flex-1 text-support text-destructive-foreground wrap-anywhere">{messages.fileError(rejection.file.name, rejection.reason)}</span><Button size={size} variant="quiet" aria-label={messages.dismissFileRejection(rejection.file.name)} onClick={() => setRejections(current => current.filter(item => item !== rejection))}>{messages.close}</Button></li>)}</ul>}
    </>,
  }) });
}

export { FileUploadPrimitive };
