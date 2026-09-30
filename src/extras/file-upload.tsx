"use client";

import { useUILocale } from "../locale";

import { useId, useRef, useState, type ReactNode } from "react";
import { FileIcon, UploadIcon, XIcon } from "lucide-react";
import { Button } from "../button";
import { FieldError } from "../field";
import { cn } from "../utils";

export type FileRejection = { file: File; reason: "type" | "size" | "count" };
export type FileUploadProps = {
  files?: readonly File[];
  defaultFiles?: readonly File[];
  onFilesChange?: (files: File[]) => void;
  onReject?: (rejected: FileRejection[]) => void;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  label?: string;
  description?: ReactNode;
  chooseLabel?: string;
  removeLabel?: (file: File) => string;
  rejectionLabel?: (rejection: FileRejection) => string;
  className?: string;
};

function accepts(file: File, accept: string) {
  return !accept || accept.split(",").some((raw) => {
    const type = raw.trim().toLowerCase();
    return type.startsWith(".") ? file.name.toLowerCase().endsWith(type)
      : type.endsWith("/*") ? file.type.toLowerCase().startsWith(type.slice(0, -1)) : file.type.toLowerCase() === type;
  });
}

export function FileUpload(props: FileUploadProps) {
  const { messages } = useUILocale();
  const { files, defaultFiles = [], onFilesChange, onReject, accept = "", maxSize = Infinity, maxFiles = 10, disabled = false, label = messages.addFiles, description = messages.dropFiles, chooseLabel = messages.chooseFiles, removeLabel = (file) => messages.removeFile(file.name), rejectionLabel = ({ file, reason }) => messages.fileError(file.name, reason), className } = props;
  const [internal, setInternal] = useState<readonly File[]>(defaultFiles);
  const [rejected, setRejected] = useState<FileRejection[]>([]);
  const [dragging, setDragging] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const current = files ?? internal;
  const update = (next: File[]) => { if (files === undefined) setInternal(next); onFilesChange?.(next); };
  const add = (incoming: File[]) => {
    if (disabled) return;
    const next = [...current]; const errors: FileRejection[] = [];
    for (const file of incoming) {
      const reason = !accepts(file, accept) ? "type" : file.size > maxSize ? "size" : next.length >= Math.max(0, maxFiles) ? "count" : null;
      if (reason) errors.push({ file, reason });
      else if (!next.some((saved) => saved.name === file.name && saved.size === file.size && saved.lastModified === file.lastModified)) next.push(file);
    }
    update(next); setRejected(errors); if (errors.length) onReject?.(errors);
  };
  return <div className={cn("flex min-w-0 flex-col gap-3", className)}>
    <div className={cn("flex flex-col items-center gap-3 rounded-lg border border-dashed border-input bg-background p-6 text-center transition-colors", dragging && "border-ring bg-accent", disabled && "opacity-64")} onDragOver={(event) => { event.preventDefault(); if (!disabled) setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); add(Array.from(event.dataTransfer.files)); }}>
      <UploadIcon aria-hidden="true" className="size-5 text-muted-foreground" />
      <p id={`${id}-label`} className="m-0 font-medium">{label}</p><p id={`${id}-description`} className="m-0 text-sm text-muted-foreground">{description}</p>
      <input ref={input} type="file" className="sr-only" tabIndex={-1} aria-labelledby={`${id}-label`} aria-describedby={`${id}-description`} accept={accept} multiple={maxFiles !== 1} disabled={disabled} onChange={(event) => { add(Array.from(event.currentTarget.files ?? [])); event.currentTarget.value = ""; }} />
      <Button type="button" variant="outline" disabled={disabled} onClick={() => input.current?.click()}>{chooseLabel}</Button>
    </div>
    {current.length ? <ul aria-label={label} className="m-0 flex list-none flex-col gap-2 p-0">{current.map((file, index) => <li key={`${file.name}-${file.lastModified}-${index}`} className="flex min-w-0 items-center gap-2 rounded-lg border border-border px-3 py-1">
      <FileIcon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" /><span className="min-w-0 flex-1 truncate">{file.name}</span><span className="text-xs text-muted-foreground">{Math.ceil(file.size / 1024)} KB</span>
      <Button type="button" variant="ghost" size="icon" disabled={disabled} aria-label={removeLabel(file)} onClick={() => { update(current.filter((_, item) => item !== index)); setRejected([]); }}><XIcon aria-hidden="true" /></Button>
    </li>)}</ul> : null}
    {rejected.length ? <FieldError role="alert">{rejected.map((error, index) => <div key={index}>{rejectionLabel(error)}</div>)}</FieldError> : null}
  </div>;
}
