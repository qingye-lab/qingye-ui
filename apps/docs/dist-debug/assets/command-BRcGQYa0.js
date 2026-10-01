import { af as DialogRoot, j as jsxRuntimeExports, ag as DialogPortal, ah as DialogPopup, e as cn, q as useUILocale, D as Search, ai as DialogBackdrop, aj as DialogViewport, ak as DialogTrigger } from "./index-DM02Iz28.js";
import { h as AutocompleteCollection, A as Autocomplete, a as AutocompleteInput, c as AutocompleteEmpty, d as AutocompleteList, f as AutocompleteGroup, g as AutocompleteGroupLabel, e as AutocompleteItem, i as AutocompleteSeparator } from "./autocomplete-DlyiU5Sk.js";
const CommandDialog = DialogRoot;
const CommandDialogPortal = DialogPortal;
function CommandDialogTrigger(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogTrigger,
    {
      "data-slot": "command-dialog-trigger",
      ...props
    }
  );
}
function CommandDialogBackdrop({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogBackdrop,
    {
      className: cn(
        "fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-all duration-(--qy-duration-base) ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-(--qy-duration-fast)",
        className
      ),
      "data-slot": "command-dialog-backdrop",
      ...props
    }
  );
}
function CommandDialogViewport({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogViewport,
    {
      className: cn(
        "fixed inset-0 z-50 flex flex-col items-center px-4 py-[max(--spacing(4),4vh)] sm:py-[10vh]",
        className
      ),
      "data-slot": "command-dialog-viewport",
      ...props
    }
  );
}
function CommandDialogPopup({
  className,
  children,
  portalProps,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandDialogPortal, { ...portalProps, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommandDialogBackdrop, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommandDialogViewport, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogPopup,
      {
        className: cn(
          "relative row-start-2 flex max-h-105 min-h-0 w-full min-w-0 max-w-xl -translate-y-[calc(1.25rem*var(--nested-dialogs))] scale-[calc(1-0.1*var(--nested-dialogs))] flex-col rounded-2xl border bg-popover not-dark:bg-clip-padding text-popover-foreground opacity-[calc(1-0.1*var(--nested-dialogs))] shadow-lg/5 outline-none transition-[scale,opacity,translate] duration-(--qy-duration-base) ease-out will-change-transform data-ending-style:duration-(--qy-duration-fast) before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:bg-muted/72 before:shadow-[0_1px_--theme(--color-black/4%)] data-nested:data-ending-style:translate-y-8 data-nested:data-starting-style:translate-y-8 data-nested-dialog-open:origin-top data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 **:data-[slot=scroll-area-viewport]:data-has-overflow-y:pe-1 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
          className
        ),
        "data-slot": "command-dialog-popup",
        ...props,
        children
      }
    ) })
  ] });
}
function Command({
  autoHighlight = "always",
  keepHighlight = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Autocomplete,
    {
      autoHighlight,
      inline: true,
      keepHighlight,
      open: true,
      ...props
    }
  );
}
function CommandInput({
  className,
  placeholder,
  ...props
}) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2.5 py-1.5", "data-slot": "command-input", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    AutocompleteInput,
    {
      autoFocus: true,
      className: cn(
        "border-transparent! bg-transparent! shadow-none before:hidden has-focus-visible:ring-0",
        className
      ),
      placeholder: placeholder ?? messages.commandPlaceholder,
      size: "lg",
      startAddon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, {}),
      ...props
    }
  ) });
}
function CommandList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AutocompleteList,
    {
      className: cn("not-empty:scroll-py-2 not-empty:p-2", className),
      "data-slot": "command-list",
      ...props
    }
  );
}
function CommandEmpty({
  className,
  children,
  ...props
}) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AutocompleteEmpty,
    {
      className: cn("not-empty:py-6", className),
      "data-slot": "command-empty",
      ...props,
      children: children ?? messages.noResults
    }
  );
}
function CommandPanel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "relative -mx-px not-has-[+[data-slot=command-footer]]:-mb-px min-h-0 rounded-t-xl not-has-[+[data-slot=command-footer]]:rounded-b-2xl border border-b-0 bg-popover bg-clip-padding shadow-xs/5 [clip-path:inset(0_1px)] not-has-[+[data-slot=command-footer]]:[clip-path:inset(0_1px_1px_1px_round_0_0_calc(var(--radius-2xl)-1px)_calc(var(--radius-2xl)-1px))] before:pointer-events-none before:absolute before:inset-0 before:rounded-t-[calc(var(--radius-xl)-1px)] **:data-[slot=scroll-area-scrollbar]:mt-2",
        className
      ),
      "data-slot": "command-panel",
      ...props
    }
  );
}
function CommandGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AutocompleteGroup,
    {
      className,
      "data-slot": "command-group",
      ...props
    }
  );
}
function CommandGroupLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AutocompleteGroupLabel,
    {
      className,
      "data-slot": "command-group-label",
      ...props
    }
  );
}
const CommandCollection = AutocompleteCollection;
function CommandItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AutocompleteItem,
    {
      className: cn(
        "gap-2 pointer-coarse:min-h-11 py-1.5 [&>svg:not([class*='opacity-'])]:opacity-80 [&>svg:not([class*='size-'])]:size-4.5 sm:[&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:-mx-0.5 [&>svg]:shrink-0",
        className
      ),
      "data-slot": "command-item",
      ...props
    }
  );
}
function CommandSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AutocompleteSeparator,
    {
      className: cn("my-2", className),
      "data-slot": "command-separator",
      ...props
    }
  );
}
function CommandShortcut({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "kbd",
    {
      className: cn(
        "ms-auto font-medium font-sans text-muted-foreground/72 text-xs tracking-widest",
        className
      ),
      "data-slot": "command-shortcut",
      ...props
    }
  );
}
function CommandFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "flex items-center justify-between gap-2 rounded-b-[calc(var(--radius-2xl)-1px)] border-t px-5 py-3 text-muted-foreground text-xs",
        className
      ),
      "data-slot": "command-footer",
      ...props
    }
  );
}
export {
  Command as C,
  CommandInput as a,
  CommandPanel as b,
  CommandEmpty as c,
  CommandList as d,
  CommandGroup as e,
  CommandGroupLabel as f,
  CommandCollection as g,
  CommandItem as h,
  CommandShortcut as i,
  CommandFooter as j,
  CommandDialog as k,
  CommandDialogPopup as l,
  CommandDialogTrigger as m,
  CommandSeparator as n
};
