# 青野 UI · Qingye UI

器用为本，关系为法，合宜为度。

`@qingye_lab/ui` provides **95 component modules** built from the Qingye design basis and accessible Base UI primitives. React and React DOM must satisfy `^19.2.0`. Applications own data, validation, permissions, requests and results; the library provides controls and reusable structural relationships.

Version **5.2.0** rebuilds the PaginationPattern and DataTablePattern pager: one row with a range summary, icon page buttons, a constant page window, and only the controls that change the result. Props are unchanged; tests that relied on always-present page controls and custom complete locales (add `paginationRange`) need updating, and `paginationSummary` is deprecated. Read the [5.2.0 notes](https://github.com/qingye-lab/qingye-ui/blob/main/docs/releases/v5.2.0.md). 5.1.0 loads the Sidebar narrow-screen drawer on demand, adds `WorkspaceContent transitionKey`, Layout `justify`, Grid columns and the `pair` gap role, keeps DataTable sticky headers on the page scroll with `stickyHeaderOffset`, fades only the hidden end of overflowing Tabs, accepts millisecond time values, and enlarges navigation and command items to the touch target on coarse pointers. Two adjustments to 5.0.0 contracts can require code changes: a Sidebar drawer handle created outside `Workspace` now comes from `createSidebarDrawerHandle()`, and TimeField at `minute` granularity keeps the seconds of its value. Read the [5.1.0 notes](https://github.com/qingye-lab/qingye-ui/blob/main/docs/releases/v5.1.0.md). 5.0.0 added ColorPicker, Resizable, TimeField, Cascader, TreeSelect, Command and FileTrigger; completes DataTable (sticky header, pinned and mixed-width columns, row names, scoped select-all, busy and error states), Sidebar (named nav, narrow-screen drawer) and form states; and is breaking: four unused spacing tokens and the `components/motion-provider` subpath are removed, Sidebar renders `div`, motion attaches to stable `.qy-*` classes, and several components now throw when their accessible name or contract is missing. Read the [5.0.0 notes](https://github.com/qingye-lab/qingye-ui/blob/main/docs/releases/v5.0.0.md). 4.2.0 added dynamic VirtualList measurement and reading anchors, measured DataTable windows and column dimensions, opt-in Sparkline point inspection, leading menu marks and styled scrollbar parts. Dialog and AlertDialog popups now anchor absolute descendants after entry motion. Defaults retain their existing opt-in boundaries. 4.1.0 added DataTablePattern, PaginationPattern, ConfirmProvider/useConfirm, AsyncContent and ComboboxSelect, including confirmation recovery after React Activity/StrictMode lifecycle reconnection. Existing advanced and snapshot APIs remain available. 4.0.0 removed three unused tokens and two chart constants from 3.0.0; 3.0.0 changed the locale, DateRangePicker and FileUpload contracts from 2.0.0; 2.0.0 changed Button, Input, Toast, chart, Tooltip and Tabs from 1.0.0, which itself broke from 0.4.x. Review the current public entries and migration boundaries below before upgrading.

## Installation

Install from npm:

```sh
npm install @qingye_lab/ui
```

Or use `pnpm add @qingye_lab/ui` / `yarn add @qingye_lab/ui`. To select this version explicitly, install `@qingye_lab/ui@5.2.0`.

Chart requires the optional `recharts` peer (`^3.10.1`); DataTable requires the optional `@tanstack/react-table` peer (`^8.21.3`). Install the peer for the component you use. If automatic peer installation is disabled, also satisfy Recharts' `react-is` requirement with a version compatible with your React version.

## Styles

For a Tailwind CSS 4 project:

```css
@import "tailwindcss";
@import "@qingye_lab/ui/styles.css";
```

`styles.css` declares the dark variant for `.dark` or `data-theme="dark"` ancestors.

For a project without Tailwind, import the compiled stylesheet instead:

```ts
import "@qingye_lab/ui/ui.css";
```

Use one stylesheet route.

## Public entries

Import the component module you use:

```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Dialog, DialogPopup } from "@qingye_lab/ui/components/dialog";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@qingye_lab/ui/components/tabs";
```

The `@qingye_lab/ui` aggregate entry exports current components and hooks, including `useMediaQuery`. Loading it without eliminating unused exports can require both optional Chart/DataTable peers, so each hook also has its own entry: `@qingye_lab/ui/hooks/use-media-query` and `@qingye_lab/ui/hooks/use-copy-to-clipboard`. Locale, utilities and floating-layer helpers have public entries at `@qingye_lab/ui/locale`, `@qingye_lab/ui/locales/<name>`, `@qingye_lab/ui/utils` and `@qingye_lab/ui/floating-layer`.

There are no compatibility aliases for `DropdownMenu*`, `DialogContent`, `SheetContent` or `TabsTrigger`. `TooltipContent` remains an exported alias of `TooltipPopup`. Query the installed `catalog.json` and declarations for the actual part names. `useIsMobile` has been removed; `useMediaQuery("max-md")` queries the former width condition without classifying the physical device.

## Providers and localization

Use the providers required by the components in your application:

```tsx
import { ThemeProvider } from "@qingye_lab/ui/components/theme-provider";
import { ToastProvider } from "@qingye_lab/ui/components/toast";
import { TooltipProvider } from "@qingye_lab/ui/components/tooltip";

<ThemeProvider>
  <TooltipProvider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </TooltipProvider>
</ThemeProvider>
```

Built-in messages default to Simplified Chinese independently of browser language. To use English:

```tsx
import { UILocaleProvider } from "@qingye_lab/ui/locale";
import { enUS } from "@qingye_lab/ui/locales/en-US";

<UILocaleProvider locale={enUS}>…</UILocaleProvider>
```

The provider accepts message overrides; explicit component labels take precedence over built-in labels.

## Theme boundaries

Brand, light/dark mode and density are separate axes. Set project identity on document-level `html[data-brand]`. ThemeProvider uses `.light` / `.dark` by default, or the light/dark `data-theme` attribute when explicitly configured. Density uses `data-density`; only components consuming the relevant roles respond to it.

Override the documented `--qy-*` roles after importing the stylesheet. The package includes primitive, semantic and component token layers; values and their relationships are documented in the design guide. A project owns its theme and composition. Do not use the light/dark marker as a brand name.

## Documentation and AI guidance

The documentation site is configured at [ui.xflux.cc](https://ui.xflux.cc), with English pages under [/en](https://ui.xflux.cc/en). It provides component pages, playgrounds, a workspace application at `/examples/workspace`, and a list/detail reference at `/examples/records`. These examples use local data and state.

The repository's root `design.md` is the sole authored public design guide. The package includes generated [design.md](./design.md) and [design.en.md](./design.en.md), retaining the method names 名实相符、相成相制、布白有用、随境取度、展开有据、进退相承.

Use the resources for your installed version:

- [catalog.json](./catalog.json): current entries, API guidance and documentation metadata. Unknown inherited requirements remain unknown rather than runtime guarantees.
- [ai/SKILL.md](./ai/SKILL.md) and [ai/SKILL.en.md](./ai/SKILL.en.md): Chinese and English AI adoption guidance.
- [ai/v5.2.0/llms.txt](./ai/v5.2.0/llms.txt) and [ai/v5.2.0/en/llms.txt](./ai/v5.2.0/en/llms.txt): versioned component indexes.
- `registry/`: project provider/theme templates that reference the shared package.

Merge the guide's adoption snippets into the consumer's existing `AGENTS.md` and `design.md`, preserving its project constraints. Generated package resources are projections of the authored sources. `@qingye/tooling` is a separate package; the UI runtime does not require it.

## License

MIT; see [LICENSE](./LICENSE). Third-party dependencies distribute their own licenses.
