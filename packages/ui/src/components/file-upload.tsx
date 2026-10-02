"use client";

import {
  FileArchiveIcon,
  FileAudioIcon,
  FileCodeIcon,
  FileIcon,
  FileImageIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FileVideoIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Button, type ButtonProps } from "./button";

export type FileRejection = { file: File; reason: "type" | "size" | "count" };

export type FileUploadProps = {
  /** Controlled file list. */
  files?: readonly File[];
  defaultFiles?: readonly File[];
  onFilesChange?: (files: File[]) => void;
  /** Files that failed `accept`, `maxSize` or `maxFiles`. */
  onReject?: (rejected: FileRejection[]) => void;
  /** Same syntax as `<input accept>`: `image/*`, `.pdf`, `application/zip`. */
  accept?: string;
  /** Largest allowed file in bytes. */
  maxSize?: number;
  /** Most files kept. With `1`, a new pick replaces the current file. */
  maxFiles?: number;
  disabled?: boolean;
  /** Error styling for the drop zone or button; pair with a visible message. */
  invalid?: boolean;
  /** `dropzone` is a large target; `button` is a compact trigger for dense forms. */
  variant?: "dropzone" | "button";
  /**
   * Field name. The hidden file input mirrors the list, so a native form
   * submission carries the files (where the browser supports DataTransfer).
   */
  name?: string;
  /** Id of the focusable trigger, for an external `<label htmlFor>`. */
  id?: string;
  "aria-describedby"?: string;
  label?: string;
  description?: React.ReactNode;
  chooseLabel?: string;
  removeLabel?: (file: File) => string;
  rejectionLabel?: (rejection: FileRejection) => string;
  /** Show image previews instead of type icons. */
  thumbnails?: boolean;
  /** Upload progress 0–100 for a file, or nothing when idle. The component never uploads. */
  getProgress?: (file: File, index: number) => number | null | undefined;
  /** Per-file error, e.g. a failed upload. */
  getError?: (file: File, index: number) => React.ReactNode;
  /** Extra actions per row, rendered before the remove button (e.g. retry). */
  renderActions?: (file: File, index: number) => React.ReactNode;
  /** Props for the trigger button in the `button` variant. */
  buttonProps?: Omit<ButtonProps, "onClick" | "disabled" | "type" | "children">;
  className?: string;
};

/** `1536` → `1.5 KB`. Binary units, one decimal under 10. */
export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value < 10 ? value.toFixed(1).replace(/\.0$/, "") : Math.round(value)} ${units[unit]}`;
}

function accepts(file: File, accept: string) {
  if (!accept.trim()) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return accept.split(",").some((raw) => {
    const rule = raw.trim().toLowerCase();
    if (!rule) return false;
    if (rule.startsWith(".")) return name.endsWith(rule);
    if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1));
    return type === rule;
  });
}

const sameFile = (a: File, b: File) =>
  a.name === b.name && a.size === b.size && a.lastModified === b.lastModified;

function FileTypeIcon({ file, className }: { file: File; className?: string }) {
  const type = file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const Icon = type.startsWith("image/")
    ? FileImageIcon
    : type.startsWith("video/")
      ? FileVideoIcon
      : type.startsWith("audio/")
        ? FileAudioIcon
        : /^(zip|rar|7z|gz|tar|tgz)$/.test(ext) || /zip|compressed|archive/.test(type)
          ? FileArchiveIcon
          : /^(xls|xlsx|csv|numbers)$/.test(ext) || /spreadsheet|csv|excel/.test(type)
            ? FileSpreadsheetIcon
            : /^(js|ts|tsx|jsx|json|html|css|py|go|rs|java|sh|yml|yaml)$/.test(ext)
              ? FileCodeIcon
              : /^(pdf|doc|docx|txt|md|rtf|pages)$/.test(ext) || type.startsWith("text/") || /pdf|word/.test(type)
                ? FileTextIcon
                : FileIcon;
  return <Icon aria-hidden="true" className={className} />;
}

function FileThumbnail({ file }: { file: File }) {
  const [url, setUrl] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (typeof URL.createObjectURL !== "function") return;
    const next = URL.createObjectURL(file);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [file]);
  return url ? <img alt="" className="size-full object-cover" src={url} /> : null;
}

export function FileUpload({
  files,
  defaultFiles = [],
  onFilesChange,
  onReject,
  accept = "",
  maxSize = Number.POSITIVE_INFINITY,
  maxFiles = Number.POSITIVE_INFINITY,
  disabled = false,
  invalid = false,
  variant = "dropzone",
  name,
  id,
  "aria-describedby": ariaDescribedBy,
  label,
  description,
  chooseLabel,
  removeLabel,
  rejectionLabel,
  thumbnails = false,
  getProgress,
  getError,
  renderActions,
  buttonProps,
  className,
}: FileUploadProps): React.ReactElement {
  const { messages } = useUILocale();
  const [internal, setInternal] = React.useState<readonly File[]>(defaultFiles);
  const [rejected, setRejected] = React.useState<FileRejection[]>([]);
  const [dragging, setDragging] = React.useState(false);
  const [selectionRevision, markSelection] = React.useReducer((revision: number) => revision + 1, 0);
  const dragDepth = React.useRef(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const pendingFocus = React.useRef<number | null>(null);
  const baseId = React.useId();
  const labelId = `${baseId}-label`;
  const descriptionId = `${baseId}-description`;
  const errorsId = `${baseId}-errors`;
  const current = files ?? internal;
  const single = maxFiles === 1;
  const labelText = label ?? messages.addFiles;
  const descriptionText = description ?? messages.dropFiles;
  const chooseText = chooseLabel ?? messages.chooseFiles;
  const removeText = removeLabel ?? ((file: File) => messages.removeFile(file.name));
  const rejectionText = rejectionLabel ?? (({ file, reason }: FileRejection) => messages.fileError(file.name, reason));

  const update = (next: File[]) => {
    if (files === undefined) setInternal(next);
    onFilesChange?.(next);
  };

  const add = (incoming: File[]) => {
    if (disabled || incoming.length === 0) return;
    let next = [...current];
    const errors: FileRejection[] = [];
    for (const file of incoming) {
      // A file already in the queue consumes no new slot. Ignore it before
      // validating capacity, including when the queue is already full.
      if (next.some((saved) => sameFile(saved, file))) continue;
      const reason = !accepts(file, accept)
        ? "type"
        : file.size > maxSize
          ? "size"
          : !single && next.length >= Math.max(0, maxFiles)
            ? "count"
            : null;
      if (reason) errors.push({ file, reason });
      else if (single) next = [file];
      else next.push(file);
    }
    setRejected(errors);
    if (errors.length) onReject?.(errors);
    if (next.length !== current.length || next.some((file, index) => file !== current[index])) update(next);
  };

  const remove = (index: number) => {
    const next = current.filter((_, item) => item !== index);
    pendingFocus.current = next.length ? Math.min(index, next.length - 1) : -1;
    setRejected([]);
    update(next);
  };

  // Removing a row would drop focus to <body>; keep it in the list instead.
  React.useEffect(() => {
    const target = pendingFocus.current;
    if (target === null) return;
    pendingFocus.current = null;
    const buttons = listRef.current?.querySelectorAll<HTMLElement>("[data-slot=file-upload-remove]");
    const next = target >= 0 ? buttons?.[target] : undefined;
    if (next) next.focus();
    else triggerRef.current?.focus();
  });

  // Mirror the list into the native input so plain form posts include the files.
  React.useEffect(() => {
    const input = inputRef.current;
    if (!name || !input || typeof DataTransfer === "undefined") return;
    try {
      const transfer = new DataTransfer();
      for (const file of current) transfer.items.add(file);
      input.files = transfer.files;
    } catch {
      // Older browsers cannot assign FileList; the list is still available via onFilesChange.
    }
  }, [current, name, selectionRevision]);

  const dragProps = {
    onDragEnter: (event: React.DragEvent) => {
      event.preventDefault();
      if (disabled) return;
      dragDepth.current += 1;
      setDragging(true);
    },
    onDragOver: (event: React.DragEvent) => {
      event.preventDefault();
      if (!disabled) event.dataTransfer.dropEffect = "copy";
    },
    onDragLeave: () => {
      dragDepth.current = Math.max(0, dragDepth.current - 1);
      if (dragDepth.current === 0) setDragging(false);
    },
    onDrop: (event: React.DragEvent) => {
      event.preventDefault();
      dragDepth.current = 0;
      setDragging(false);
      add(Array.from(event.dataTransfer.files));
    },
  };

  const describedBy =
    [variant === "dropzone" || description !== undefined ? descriptionId : null, rejected.length ? errorsId : null, ariaDescribedBy]
      .filter(Boolean)
      .join(" ") || undefined;
  const open = () => inputRef.current?.click();

  return (
    <div
      className={cn("flex min-w-0 flex-col gap-(--qy-space-3)", className)}
      data-disabled={disabled ? "" : undefined}
      data-slot="file-upload"
    >
      {variant === "dropzone" ? (
        <button
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          aria-labelledby={labelId}
          className="group/dropzone relative flex w-full cursor-pointer flex-col items-center justify-center gap-(--qy-space-3) rounded-xl border border-border-strong border-dashed bg-muted/40 px-(--qy-space-6) py-(--qy-space-8) text-center outline-none transition-[background-color,border-color,box-shadow] hover:border-ring/64 hover:bg-muted/72 focus-visible:border-ring focus-visible:border-solid focus-visible:ring-[length:var(--qy-focus-input-width)] focus-visible:ring-ring/24 ring-offset-[length:var(--qy-focus-input-offset)] ring-offset-background disabled:cursor-not-allowed disabled:opacity-64 disabled:hover:border-border-strong disabled:hover:bg-muted/40 aria-invalid:border-destructive/48 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/16 data-dragging:border-ring data-dragging:border-solid data-dragging:bg-accent dark:bg-input/24 dark:hover:bg-input/40 dark:disabled:hover:bg-input/24 dark:focus-visible:aria-invalid:ring-destructive/24 dark:data-dragging:bg-input/40"
          data-dragging={dragging ? "" : undefined}
          data-slot="file-upload-dropzone"
          disabled={disabled}
          id={id}
          onClick={open}
          ref={triggerRef}
          type="button"
          {...dragProps}
        >
          <span
            aria-hidden="true"
            className="relative flex size-10 items-center justify-center rounded-lg border bg-background not-dark:bg-clip-padding text-foreground shadow-xs/5 transition-[translate,scale] duration-(--qy-duration-base) ease-out before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] group-data-dragging/dropzone:-translate-y-0.5 group-data-dragging/dropzone:scale-105 dark:bg-input/32 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]"
            data-slot="file-upload-icon"
          >
            <UploadIcon className="size-4.5 opacity-80 sm:size-4" />
          </span>
          <span className="flex flex-col gap-(--qy-space-1)">
            <span className="font-medium text-base/5 text-foreground sm:text-sm/5" id={labelId}>
              {dragging ? messages.dropFilesActive : labelText}
            </span>
            <span className="text-pretty text-muted-foreground text-xs" id={descriptionId}>
              {descriptionText}
            </span>
          </span>
        </button>
      ) : (
        <div className="flex min-w-0 flex-wrap items-center gap-x-(--qy-space-3) gap-y-[calc(var(--qy-space-1)*1.5)]" {...dragProps}>
          <Button
            variant="outline"
            {...buttonProps}
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
            className={cn(
              invalid && "border-destructive/48",
              dragging && "border-ring bg-accent",
              buttonProps?.className,
            )}
            data-dragging={dragging ? "" : undefined}
            data-slot="file-upload-trigger"
            disabled={disabled}
            id={id}
            onClick={open}
            ref={triggerRef}
            type="button"
          >
            <UploadIcon aria-hidden="true" />
            {chooseText}
          </Button>
          {description !== undefined ? (
            <span className="min-w-0 text-muted-foreground text-xs" id={descriptionId}>
              {description}
            </span>
          ) : null}
        </div>
      )}
      <input
        accept={accept || undefined}
        aria-hidden="true"
        className="sr-only"
        disabled={disabled}
        multiple={!single}
        name={name}
        onChange={(event) => {
          const picked = Array.from(event.currentTarget.files ?? []);
          event.currentTarget.value = "";
          add(picked);
          // The picker replaced the native FileList even when all incoming
          // files were rejected, duplicated, or cleared. Restore the accepted
          // list after the caller has had a chance to accept a controlled change.
          markSelection();
        }}
        ref={inputRef}
        tabIndex={-1}
        type="file"
      />
      {current.length ? (
        <ul
          aria-label={label ?? messages.fileCount(current.length)}
          className="m-0 flex list-none flex-col overflow-hidden rounded-xl border bg-card not-dark:bg-clip-padding p-0"
          data-slot="file-upload-list"
          ref={listRef}
        >
          {current.map((file, index) => {
            const progress = getProgress?.(file, index);
            const error = getError?.(file, index);
            const hasProgress = typeof progress === "number" && Number.isFinite(progress);
            const percent = hasProgress ? Math.min(100, Math.max(0, Math.round(progress))) : 0;
            const isImage = thumbnails && file.type.startsWith("image/");
            return (
              <li
                className="flex min-w-0 items-center gap-(--qy-space-3) px-(--qy-space-3) py-[calc(var(--qy-space-1)*2.5)] not-last:border-b"
                data-invalid={error ? "" : undefined}
                data-slot="file-upload-item"
                key={`${file.name}-${file.size}-${file.lastModified}`}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-background text-muted-foreground dark:bg-input/32",
                    error && "border-destructive/24 bg-destructive/4 text-destructive-foreground dark:bg-destructive/8",
                  )}
                  data-slot="file-upload-item-icon"
                >
                  {isImage ? <FileThumbnail file={file} /> : <FileTypeIcon className="size-4.5 sm:size-4" file={file} />}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-(--qy-space-1)">
                  <span className="flex min-w-0 items-baseline gap-(--qy-space-2)">
                    <span className="min-w-0 flex-1 truncate font-medium text-sm" title={file.name}>
                      {file.name}
                    </span>
                    {hasProgress && !error ? (
                      <span className="shrink-0 text-muted-foreground text-xs numeric">{percent}%</span>
                    ) : null}
                  </span>
                  {hasProgress && !error ? (
                    <span
                      aria-label={messages.fileProgress(file.name)}
                      aria-valuemax={100}
                      aria-valuemin={0}
                      aria-valuenow={percent}
                      className="flex h-4 items-center"
                      data-slot="file-upload-progress"
                      role="progressbar"
                    >
                      <span className="relative block h-1 w-full overflow-hidden rounded-full bg-input">
                        <span
                          className="absolute inset-y-0 start-0 rounded-full bg-primary transition-[width] duration-(--qy-duration-base) ease-out"
                          style={{ width: `${percent}%` }}
                        />
                      </span>
                    </span>
                  ) : (
                    <span
                      className={cn(
                        "text-muted-foreground text-xs",
                        error ? "wrap-break-word text-destructive-foreground" : "truncate numeric",
                      )}
                      data-slot={error ? "file-upload-item-error" : "file-upload-item-size"}
                    >
                      {error ?? formatFileSize(file.size)}
                    </span>
                  )}
                </span>
                {renderActions?.(file, index)}
                <Button
                  aria-label={removeText(file)}
                  className="-me-1 shrink-0 text-muted-foreground hover:text-foreground"
                  data-slot="file-upload-remove"
                  disabled={disabled}
                  onClick={() => remove(index)}
                  size="icon-sm"
                  type="button"
                  variant="ghost"
                >
                  <XIcon aria-hidden="true" />
                </Button>
              </li>
            );
          })}
        </ul>
      ) : null}
      {rejected.length ? (
        <div
          className="flex flex-col gap-[calc(var(--qy-space-1)*0.5)] text-destructive-foreground text-xs"
          data-slot="file-upload-errors"
          id={errorsId}
          role="alert"
        >
          {rejected.map((error) => (
            <p className="m-0" key={`${error.file.name}-${error.reason}`}>
              {rejectionText(error)}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
