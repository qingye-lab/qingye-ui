import { c as createLucideIcon, q as useUILocale, r as reactExports, j as jsxRuntimeExports, B as Button, e as cn, bp as X } from "./index-DM02Iz28.js";
import { F as FileImage, a as FileArchive } from "./file-image-B9HNmRf2.js";
import { F as FileCode } from "./file-code-hnUPkPAB.js";
import { F as FileText } from "./file-text-BKTUvRr9.js";
import { F as File } from "./file-tUYWJKRx.js";
const __iconNode$3 = [
  [
    "path",
    {
      d: "M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343",
      key: "1vfytu"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  [
    "path",
    {
      d: "M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0",
      key: "1etmh7"
    }
  ]
];
const FileHeadphone = createLucideIcon("file-headphone", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  [
    "path",
    {
      d: "M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z",
      key: "1tzo1f"
    }
  ]
];
const FilePlay = createLucideIcon("file-play", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }]
];
const FileSpreadsheet = createLucideIcon("file-spreadsheet", __iconNode$1);
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function formatFileSize(bytes) {
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
function accepts(file, accept) {
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
const sameFile = (a, b) => a.name === b.name && a.size === b.size && a.lastModified === b.lastModified;
function FileTypeIcon({ file, className }) {
  const type = file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const Icon = type.startsWith("image/") ? FileImage : type.startsWith("video/") ? FilePlay : type.startsWith("audio/") ? FileHeadphone : /^(zip|rar|7z|gz|tar|tgz)$/.test(ext) || /zip|compressed|archive/.test(type) ? FileArchive : /^(xls|xlsx|csv|numbers)$/.test(ext) || /spreadsheet|csv|excel/.test(type) ? FileSpreadsheet : /^(js|ts|tsx|jsx|json|html|css|py|go|rs|java|sh|yml|yaml)$/.test(ext) ? FileCode : /^(pdf|doc|docx|txt|md|rtf|pages)$/.test(ext) || type.startsWith("text/") || /pdf|word/.test(type) ? FileText : File;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { "aria-hidden": "true", className });
}
function FileThumbnail({ file }) {
  const [url, setUrl] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (typeof URL.createObjectURL !== "function") return;
    const next = URL.createObjectURL(file);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [file]);
  return url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { alt: "", className: "size-full object-cover", src: url }) : null;
}
function FileUpload({
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
  className
}) {
  const { messages } = useUILocale();
  const [internal, setInternal] = reactExports.useState(defaultFiles);
  const [rejected, setRejected] = reactExports.useState([]);
  const [dragging, setDragging] = reactExports.useState(false);
  const dragDepth = reactExports.useRef(0);
  const inputRef = reactExports.useRef(null);
  const triggerRef = reactExports.useRef(null);
  const listRef = reactExports.useRef(null);
  const pendingFocus = reactExports.useRef(null);
  const baseId = reactExports.useId();
  const labelId = `${baseId}-label`;
  const descriptionId = `${baseId}-description`;
  const errorsId = `${baseId}-errors`;
  const current = files ?? internal;
  const single = maxFiles === 1;
  const labelText = label ?? messages.addFiles;
  const descriptionText = description ?? messages.dropFiles;
  const chooseText = chooseLabel ?? messages.chooseFiles;
  const removeText = removeLabel ?? ((file) => messages.removeFile(file.name));
  const rejectionText = rejectionLabel ?? (({ file, reason }) => messages.fileError(file.name, reason));
  const update = (next) => {
    if (files === void 0) setInternal(next);
    onFilesChange?.(next);
  };
  const add = (incoming) => {
    if (disabled || incoming.length === 0) return;
    let next = [...current];
    const errors = [];
    for (const file of incoming) {
      const reason = !accepts(file, accept) ? "type" : file.size > maxSize ? "size" : !single && next.length >= Math.max(0, maxFiles) ? "count" : null;
      if (reason) errors.push({ file, reason });
      else if (single) next = [file];
      else if (!next.some((saved) => sameFile(saved, file))) next.push(file);
    }
    setRejected(errors);
    if (errors.length) onReject?.(errors);
    if (next.length !== current.length || next.some((file, index) => file !== current[index])) update(next);
  };
  const remove = (index) => {
    const next = current.filter((_, item) => item !== index);
    pendingFocus.current = next.length ? Math.min(index, next.length - 1) : -1;
    setRejected([]);
    update(next);
  };
  reactExports.useEffect(() => {
    const target = pendingFocus.current;
    if (target === null) return;
    pendingFocus.current = null;
    const buttons = listRef.current?.querySelectorAll("[data-slot=file-upload-remove]");
    const next = target >= 0 ? buttons?.[target] : void 0;
    if (next) next.focus();
    else triggerRef.current?.focus();
  });
  reactExports.useEffect(() => {
    const input = inputRef.current;
    if (!name || !input || typeof DataTransfer === "undefined") return;
    try {
      const transfer = new DataTransfer();
      for (const file of current) transfer.items.add(file);
      input.files = transfer.files;
    } catch {
    }
  }, [current, name]);
  const dragProps = {
    onDragEnter: (event) => {
      event.preventDefault();
      if (disabled) return;
      dragDepth.current += 1;
      setDragging(true);
    },
    onDragOver: (event) => {
      event.preventDefault();
      if (!disabled) event.dataTransfer.dropEffect = "copy";
    },
    onDragLeave: () => {
      dragDepth.current = Math.max(0, dragDepth.current - 1);
      if (dragDepth.current === 0) setDragging(false);
    },
    onDrop: (event) => {
      event.preventDefault();
      dragDepth.current = 0;
      setDragging(false);
      add(Array.from(event.dataTransfer.files));
    }
  };
  const describedBy = [variant === "dropzone" ? descriptionId : null, rejected.length ? errorsId : null, ariaDescribedBy].filter(Boolean).join(" ") || void 0;
  const open = () => inputRef.current?.click();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn("flex min-w-0 flex-col gap-3", className),
      "data-disabled": disabled ? "" : void 0,
      "data-slot": "file-upload",
      children: [
        variant === "dropzone" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            "aria-describedby": describedBy,
            "aria-invalid": invalid || void 0,
            "aria-labelledby": labelId,
            className: "group/dropzone relative flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-border-strong border-dashed bg-muted/40 px-6 py-8 text-center outline-none transition-[background-color,border-color,box-shadow] hover:border-ring/64 hover:bg-muted/72 focus-visible:border-ring focus-visible:border-solid focus-visible:ring-[3px] focus-visible:ring-ring/24 disabled:cursor-not-allowed disabled:opacity-64 disabled:hover:border-border-strong disabled:hover:bg-muted/40 aria-invalid:border-destructive/48 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/16 data-dragging:border-ring data-dragging:border-solid data-dragging:bg-accent dark:bg-input/24 dark:hover:bg-input/40 dark:disabled:hover:bg-input/24 dark:focus-visible:aria-invalid:ring-destructive/24 dark:data-dragging:bg-input/40",
            "data-dragging": dragging ? "" : void 0,
            "data-slot": "file-upload-dropzone",
            disabled,
            id,
            onClick: open,
            ref: triggerRef,
            type: "button",
            ...dragProps,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  "aria-hidden": "true",
                  className: "relative flex size-10 items-center justify-center rounded-lg border bg-background not-dark:bg-clip-padding text-foreground shadow-xs/5 transition-[translate,scale] duration-(--qy-duration-base) ease-out before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] group-data-dragging/dropzone:-translate-y-0.5 group-data-dragging/dropzone:scale-105 dark:bg-input/32 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
                  "data-slot": "file-upload-icon",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-4.5 opacity-80 sm:size-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-base/5 text-foreground sm:text-sm/5", id: labelId, children: dragging ? messages.dropFilesActive : labelText }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-pretty text-muted-foreground text-xs", id: descriptionId, children: descriptionText })
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5", ...dragProps, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              ...buttonProps,
              "aria-describedby": describedBy,
              "aria-invalid": invalid || void 0,
              className: cn(
                invalid && "border-destructive/48",
                dragging && "border-ring bg-accent",
                buttonProps?.className
              ),
              "data-dragging": dragging ? "" : void 0,
              "data-slot": "file-upload-trigger",
              disabled,
              id,
              onClick: open,
              ref: triggerRef,
              type: "button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { "aria-hidden": "true" }),
                chooseText
              ]
            }
          ),
          description !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 text-muted-foreground text-xs", id: descriptionId, children: description }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            accept: accept || void 0,
            "aria-hidden": "true",
            className: "sr-only",
            disabled,
            multiple: !single,
            name,
            onChange: (event) => {
              const picked = Array.from(event.currentTarget.files ?? []);
              event.currentTarget.value = "";
              add(picked);
            },
            ref: inputRef,
            tabIndex: -1,
            type: "file"
          }
        ),
        current.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ul",
          {
            "aria-label": label ?? messages.fileCount(current.length),
            className: "m-0 flex list-none flex-col overflow-hidden rounded-xl border bg-card not-dark:bg-clip-padding p-0",
            "data-slot": "file-upload-list",
            ref: listRef,
            children: current.map((file, index) => {
              const progress = getProgress?.(file, index);
              const error = getError?.(file, index);
              const hasProgress = typeof progress === "number" && Number.isFinite(progress);
              const percent = hasProgress ? Math.min(100, Math.max(0, Math.round(progress))) : 0;
              const isImage = thumbnails && file.type.startsWith("image/");
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex min-w-0 items-center gap-3 px-3 py-2.5 not-last:border-b",
                  "data-invalid": error ? "" : void 0,
                  "data-slot": "file-upload-item",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        "aria-hidden": "true",
                        className: cn(
                          "relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-background text-muted-foreground dark:bg-input/32",
                          error && "border-destructive/24 bg-destructive/4 text-destructive-foreground dark:bg-destructive/8"
                        ),
                        "data-slot": "file-upload-item-icon",
                        children: isImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(FileThumbnail, { file }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FileTypeIcon, { className: "size-4.5 sm:size-4", file })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-baseline gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate font-medium text-sm", title: file.name, children: file.name }),
                        hasProgress && !error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 text-muted-foreground text-xs numeric", children: [
                          percent,
                          "%"
                        ] }) : null
                      ] }),
                      hasProgress && !error ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          "aria-label": messages.fileProgress(file.name),
                          "aria-valuemax": 100,
                          "aria-valuemin": 0,
                          "aria-valuenow": percent,
                          className: "flex h-4 items-center",
                          "data-slot": "file-upload-progress",
                          role: "progressbar",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative block h-1 w-full overflow-hidden rounded-full bg-input", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "absolute inset-y-0 start-0 rounded-full bg-primary transition-[width] duration-(--qy-duration-base) ease-out",
                              style: { width: `${percent}%` }
                            }
                          ) })
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: cn(
                            "truncate text-muted-foreground text-xs",
                            error ? "text-destructive-foreground" : "numeric"
                          ),
                          "data-slot": error ? "file-upload-item-error" : "file-upload-item-size",
                          children: error ?? formatFileSize(file.size)
                        }
                      )
                    ] }),
                    renderActions?.(file, index),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        "aria-label": removeText(file),
                        className: "-me-1 shrink-0 text-muted-foreground hover:text-foreground",
                        "data-slot": "file-upload-remove",
                        disabled,
                        onClick: () => remove(index),
                        size: "icon-sm",
                        type: "button",
                        variant: "ghost",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { "aria-hidden": "true" })
                      }
                    )
                  ]
                },
                `${file.name}-${file.size}-${file.lastModified}`
              );
            })
          }
        ) : null,
        rejected.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex flex-col gap-0.5 text-destructive-foreground text-xs",
            "data-slot": "file-upload-errors",
            id: errorsId,
            role: "alert",
            children: rejected.map((error) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0", children: rejectionText(error) }, `${error.file.name}-${error.reason}`))
          }
        ) : null
      ]
    }
  );
}
export {
  FileUpload as F
};
