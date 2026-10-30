"use client";

import * as React from "react";
import { fileCapacity, judgeFiles, validateRules, type FileUploadRejection } from "../file-rules";
import { Button, type ButtonProps } from "./button";

export type FileTriggerSelectDetails = {
  /** 被规则拒绝的文件及原因。本组件没有地方显示它们，必须由应用呈现，不能丢弃。 */
  rejected: readonly FileUploadRejection[];
  event: React.ChangeEvent<HTMLInputElement>;
};
export type FileTriggerProps = Omit<ButtonProps, "onSelect" | "name" | "form" | "value" | "type"> & {
  /** 扩展名或 MIME 规则，逗号分隔；同时交给原生选择框，也用来判定实际选中的文件。 */
  accept?: string;
  /** 一次可选多个。默认 false：「导入」这类入口一次只处理一个文件。 */
  multiple?: boolean;
  /** 每个文件的字节数上限；省略不限。 */
  maxSize?: number;
  /** 单次选择可接受的文件数上限；省略不限（multiple 为 false 时最多 1）。 */
  maxFiles?: number;
  /** 自定义拒绝：返回文案即拒绝该文件，在类型与大小之后、数量之前判断。文案在 `rejected` 里原样交回。 */
  validate?: (file: File) => string | undefined;
  /**
   * 选择完成即调用，只在有文件被接受或被拒绝时调用（用户取消不调用）。
   * 全部被拒绝时 `accepted` 为空，仍会调用。
   */
  onSelect?: (accepted: readonly File[], details: FileTriggerSelectDetails) => void;
};

/**
 * 点一下按钮，弹出系统文件选择框，选完立即把文件交给应用。
 * 它不保留选择：每次选择后原生 input 即被清空，所以可以连续选同一个文件，也没有 reset。
 * 不带 `name` / `form`，不参与表单提交；需要列表、移除或随表单提交请用 FileUpload。
 */
export function FileTrigger({ accept, multiple = false, maxSize, maxFiles, validate, onSelect, onClick, disabled = false, children, ...props }: FileTriggerProps) {
  validateRules("FileTrigger", accept, maxFiles, maxSize);
  const inputRef = React.useRef<HTMLInputElement>(null);
  return <>
    <Button data-slot="file-trigger" {...props} disabled={disabled} onClick={event => {
      onClick?.(event);
      if (event.defaultPrevented || event.baseUIHandlerPrevented || disabled) return;
      inputRef.current?.click();
    }}>{children}</Button>
    <input ref={inputRef} data-slot="file-trigger-input" type="file" hidden tabIndex={-1} accept={accept} multiple={multiple} disabled={disabled}
      onChange={event => {
        const input = event.currentTarget;
        // 先取出 File 引用再清空；清空让同一个文件可以再次选择。
        const files = Array.from(input.files ?? []);
        input.value = "";
        if (!files.length) return;
        const { accepted, rejected } = judgeFiles(files, { accept, maxSize, validate, capacity: fileCapacity(multiple, maxFiles) });
        if (accepted.length || rejected.length) onSelect?.(accepted, { rejected, event });
      }} />
  </>;
}
