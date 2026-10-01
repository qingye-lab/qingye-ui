import { q as useUILocale, r as reactExports, j as jsxRuntimeExports, e as cn, a8 as useRender, a9 as mergeProps } from "./index-DM02Iz28.js";
import { C as CopyButton } from "./copy-button-B3gSj0u1.js";
function CodeBlock({
  className,
  style,
  code,
  children,
  filename,
  language,
  lineNumbers = false,
  highlightLines,
  wrap = false,
  maxHeight,
  copyable = true,
  copyLabel,
  ...props
}) {
  const { messages } = useUILocale();
  const codeRef = reactExports.useRef(null);
  const source = code ?? (typeof children === "string" ? children : void 0);
  const usesSource = source !== void 0 && (children === void 0 || typeof children === "string");
  const lines = usesSource ? source.replace(/\n$/, "").split("\n") : [];
  const highlighted = new Set(highlightLines);
  const copyValue = source ?? (() => codeRef.current?.textContent ?? "");
  const hasHeader = filename !== void 0 || language !== void 0;
  const gutter = `${Math.max(2, String(lines.length || 1).length)}ch`;
  const copyButton = copyable ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    CopyButton,
    {
      className: cn(
        "shrink-0 text-muted-foreground hover:text-foreground",
        !hasHeader && "absolute end-2 top-2 z-10 opacity-0 transition-[opacity,background-color,color] focus-visible:opacity-100 group-hover/code-block:opacity-100 group-focus-within/code-block:opacity-100 pointer-coarse:opacity-100 data-[status=copied]:opacity-100 data-[status=failed]:opacity-100"
      ),
      copyLabel: copyLabel ?? messages.copyCode,
      size: "icon-xs",
      value: copyValue,
      variant: hasHeader ? "ghost" : "outline"
    }
  ) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "group/code-block relative flex min-w-0 flex-col overflow-hidden rounded-xl border bg-code not-dark:bg-clip-padding text-code-foreground shadow-xs/5 before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[calc(var(--radius-xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        className
      ),
      "data-language": language,
      "data-slot": "code-block",
      style: maxHeight === void 0 ? style : {
        "--code-block-max-height": typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
        ...style
      },
      ...props,
      children: [
        hasHeader ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex h-10 shrink-0 items-center gap-3 border-b ps-4 pe-2 text-xs",
            "data-slot": "code-block-header",
            children: [
              filename !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "min-w-0 flex-1 truncate font-medium text-foreground",
                  "data-slot": "code-block-filename",
                  children: filename
                }
              ) : null,
              language !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "shrink-0 text-muted-foreground",
                    filename === void 0 && "flex-1"
                  ),
                  "data-slot": "code-block-language",
                  children: language
                }
              ) : null,
              copyButton
            ]
          }
        ) : copyButton,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "pre",
          {
            className: cn(
              "m-0 min-h-0 overflow-auto py-3 font-mono text-[0.8125rem] leading-6 outline-none [font-variant-ligatures:none] [scrollbar-width:thin] focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset",
              maxHeight !== void 0 && "max-h-(--code-block-max-height)",
              wrap ? "whitespace-pre-wrap [overflow-wrap:anywhere]" : "whitespace-pre"
            ),
            "data-slot": "code-block-pre",
            dir: "ltr",
            tabIndex: 0,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "code",
              {
                className: cn(
                  // With line numbers each line is a two-column grid, so the number
                  // keeps its gutter and wrapped lines hang under their own text.
                  lineNumbers ? "has-[[data-line]]:grid has-[[data-line]]:grid-cols-[auto_1fr] has-[[data-line]]:px-4 [&_[data-line]]:[counter-increment:line] [&_[data-line]]:before:me-4 [&_[data-line]]:before:min-w-0 [&_[data-line]]:before:select-none [&_[data-line]]:before:text-end [&_[data-line]]:before:text-muted-foreground/64 [&_[data-line]]:before:content-[counter(line)]" : "px-4",
                  "[&_[data-line]]:block [&_[data-line]]:min-h-[1lh]",
                  !lineNumbers && "[&_[data-line]]:px-4",
                  "[&_[data-line][data-highlighted]]:bg-code-highlight [&_[data-line][data-highlighted]]:shadow-[inset_2px_0_0_var(--color-border-strong)]"
                ),
                "data-slot": "code-block-code",
                ref: codeRef,
                style: { "--code-block-gutter": gutter },
                children: usesSource ? lines.map((line, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    "data-highlighted": highlighted.has(index + 1) ? "" : void 0,
                    "data-line": index + 1,
                    children: line
                  },
                  index
                )) : children
              }
            )
          }
        )
      ]
    }
  );
}
function InlineCode({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "box-decoration-clone rounded-[.3125rem] bg-muted px-[0.3em] py-[0.15em] font-mono text-[0.875em] text-foreground",
      className
    ),
    "data-slot": "inline-code"
  };
  return useRender({
    defaultTagName: "code",
    props: mergeProps(defaultProps, props),
    render
  });
}
export {
  CodeBlock as C,
  InlineCode as I
};
