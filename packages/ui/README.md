# 青野 UI · Qingye UI

器用为本，关系为法，合宜为度。

`@qingye/ui` provides **83 component modules** built from the Qingye design basis and accessible Base UI primitives. React and React DOM must satisfy `^19.2.0`. Applications own data, validation, permissions, requests and results; the library provides controls and reusable structural relationships.

The workspace version **1.0.0 is a local, unreleased candidate** with breaking API and visual changes. The installation command below downloads the latest published release, which can differ from this README's workspace version.

## Installation

With repository access and an authenticated GitHub CLI:

```sh
gh release download --repo qingye-lab/qingye-ui --pattern 'qingye-ui-*.tgz' --output qingye-ui.tgz --clobber && pnpm add ./qingye-ui.tgz
```

Keep the tarball, `package.json` and lockfile in the consumer repository. Ordinary installs reproduce that release; run the download command again when upgrading. For npm or Yarn, replace the final install command with `npm install ./qingye-ui.tgz` or `yarn add ./qingye-ui.tgz`.

Chart requires the optional `recharts` peer (`^3.10.1`); DataTable requires the optional `@tanstack/react-table` peer (`^8.21.3`). Install the peer for the component you use. If automatic peer installation is disabled, also satisfy Recharts' `react-is` requirement with a version compatible with your React version.

## Styles

For a Tailwind CSS 4 project:

```css
@import "tailwindcss";
@import "@qingye/ui/styles.css";
```

`styles.css` declares the dark variant for `.dark` or `data-theme="dark"` ancestors.

For a project without Tailwind, import the compiled stylesheet instead:

```ts
import "@qingye/ui/ui.css";
```

Use one stylesheet route.

## Public entries

Import the component module you use:

```tsx
import { Button } from "@qingye/ui/components/button";
import { Dialog, DialogPopup } from "@qingye/ui/components/dialog";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@qingye/ui/components/tabs";
```

The `@qingye/ui` aggregate entry exports current components and hooks, including `useMediaQuery`. Loading it without eliminating unused exports can require both optional Chart/DataTable peers. Locale, utilities and floating-layer helpers have public entries at `@qingye/ui/locale`, `@qingye/ui/locales/<name>`, `@qingye/ui/utils` and `@qingye/ui/floating-layer`.

There are no compatibility aliases for `DropdownMenu*`, `DialogContent`, `SheetContent` or `TabsTrigger`. `TooltipContent` remains an exported alias of `TooltipPopup`. Query the installed `catalog.json` and declarations for the actual part names. `useIsMobile` has been removed; `useMediaQuery("max-md")` queries the former width condition without classifying the physical device.

## Providers and localization

Use the providers required by the components in your application:

```tsx
import { ThemeProvider } from "@qingye/ui/components/theme-provider";
import { ToastProvider } from "@qingye/ui/components/toast";
import { TooltipProvider } from "@qingye/ui/components/tooltip";

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
import { UILocaleProvider } from "@qingye/ui/locale";
import { enUS } from "@qingye/ui/locales/en-US";

<UILocaleProvider locale={enUS}>…</UILocaleProvider>
```

The provider accepts message overrides; explicit component labels take precedence over built-in labels.

## Theme boundaries

Brand, light/dark mode and density are separate axes. Set project identity on document-level `html[data-brand]`. ThemeProvider uses `.light` / `.dark` by default, or the light/dark `data-theme` attribute when explicitly configured. Density uses `data-density`; only components consuming the relevant roles respond to it.

Override the documented `--qy-*` roles after importing the stylesheet. The package includes primitive, semantic and component token layers; values and their relationships are documented in the design guide. A project owns its theme and composition. Do not use the light/dark marker as a brand name.

## Documentation and AI guidance

The documentation site is configured at [ui.xflux.cc](https://ui.xflux.cc), with English pages under [/en](https://ui.xflux.cc/en). It provides the current component pages, playgrounds and six simple compositions: InputGroup, Tabs, FilterBar, BulkActionBar, DataTable and Toolbar. These examples use local data and state.

The repository's root `design.md` is the sole authored public design guide. The package includes generated [design.md](./design.md) and [design.en.md](./design.en.md), retaining the method names 名实相符、相成相制、布白有用、随境取度、展开有据、进退相承.

Use the resources for your installed version:

- [catalog.json](./catalog.json): current entries, API guidance and documentation metadata. Unknown inherited requirements remain unknown rather than runtime guarantees.
- [ai/SKILL.md](./ai/SKILL.md) and [ai/SKILL.en.md](./ai/SKILL.en.md): Chinese and English AI adoption guidance.
- [ai/v1.0.0/llms.txt](./ai/v1.0.0/llms.txt) and [ai/v1.0.0/en/llms.txt](./ai/v1.0.0/en/llms.txt): versioned component indexes.
- `registry/`: project provider/theme templates that reference the shared package.

Merge the guide's adoption snippets into the consumer's existing `AGENTS.md` and `design.md`, preserving its project constraints. Generated package resources are projections of the authored sources. `@qingye/tooling` is a separate package; the UI runtime does not require it.

## License

MIT; see [LICENSE](./LICENSE). Third-party dependencies distribute their own licenses.
