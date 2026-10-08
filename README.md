# 青野 UI · Qingye UI

器用为本，关系为法，合宜为度。

Qingye UI is a React component library built from the design basis in [design.md](./design.md), using accessible [Base UI](https://base-ui.com) primitives. The current source contains **87 component modules**. Applications own their data, validation, requests, permissions and results; the library provides controls and reusable structural relationships.

| Workspace | Purpose | Current version |
| --- | --- | --- |
| [packages/ui](./packages/ui/README.md) | `@qingye_lab/ui`, components and public design resources | **1.0.0 — local, unreleased candidate** |
| [apps/docs](./apps/docs) | Chinese and English component documentation, playgrounds and six simple compositions | Private documentation app |
| [packages/tooling](./packages/tooling/README.md) | `@qingye/tooling`, explicit project queries, AST diagnostics and theme tools | 0.5.0 |
| [apps/studio](./apps/studio/README.md) | Local Theme Studio for explicitly registered projects | 0.4.0, private |

The UI candidate introduces breaking API and visual changes. Read the [1.0.0 candidate notes](./docs/releases/v1.0.0.md) before migrating an existing consumer. Tooling and private Studio have their own version and API boundaries.

## Install the candidate

**1.0.0 is prepared for npm publication as `@qingye_lab/ui`; publication is still awaiting npm authentication.** The verified local package is `dist-pack/npm/qingye_lab-ui-1.0.0.tgz`. Install that file from the consuming project:

```sh
npm install /path/to/qingye_lab-ui-1.0.0.tgz
```

Keep the tarball and lockfile when using this route. Historical GitHub releases use `@qingye/ui`; their package name and API differ from this candidate.

For a Tailwind CSS 4 project:

```css
@import "tailwindcss";
@import "@qingye_lab/ui/styles.css";
```

For a project without Tailwind, use the compiled stylesheet instead:

```ts
import "@qingye_lab/ui/ui.css";
```

Use one stylesheet route. Public component entries are `@qingye_lab/ui/components/<name>`:

```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Dialog, DialogPopup } from "@qingye_lab/ui/components/dialog";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@qingye_lab/ui/components/tabs";
```

React and React DOM must satisfy `^19.2.0`. Chart uses the optional `recharts` peer; DataTable uses the optional `@tanstack/react-table` peer. Per-component imports keep unrelated dependencies out of the import graph. The aggregate `@qingye_lab/ui` entry also exports Chart and DataTable; loading it without eliminating unused exports can require both peers. See the [package README](./packages/ui/README.md) for providers, localization and package resources.

## Documentation and compositions

The documentation site is configured at [ui.xflux.cc](https://ui.xflux.cc); English pages start at [/en](https://ui.xflux.cc/en). Run `pnpm dev` for the local site at `http://localhost:5180`.

Component pages live at `/docs/components/<name>` and isolated demos at `/playground/<name>`. `/examples` contains six simple compositions using the current public components:

| Composition | Route |
| --- | --- |
| InputGroup | `/examples/input-group` |
| Tabs | `/examples/tabs` |
| FilterBar | `/examples/filter-bar` |
| BulkActionBar | `/examples/bulk-action-bar` |
| DataTable | `/examples/data-table` |
| Toolbar | `/examples/toolbar` |

These demonstrations use local data and state. The former dashboard, mail, media Studio and business task pages are no longer supported example routes. The separate local Theme Studio remains in `apps/studio`.

## Design and AI resources

The root [design.md](./design.md) is the sole authored source for the public design guide. Its methods retain their Chinese names: 名实相符、相成相制、布白有用、随境取度、展开有据、进退相承. [STANDARDS.md](./STANDARDS.md) specifies the component implementation contracts, and [component-layering.md](./docs/decisions/component-layering.md) records the library boundary.

The package and site receive generated Chinese and English guides (`design.md`, `design.en.md`), `catalog.json`, AI guidance (`ai/SKILL.md`, `ai/SKILL.en.md`) and versioned component resources (`ai/v1.0.0/`, including `en/`). Generated copies are not independent design sources. Use the guide's adoption snippets to merge persistent package/API references into a consumer's existing `AGENTS.md` and `design.md`; downloading the package alone does not configure an AI assistant. Registry templates reference the shared library while projects own their theme, composition and application state.

## Development

```sh
pnpm install
pnpm dev                         # Documentation site
pnpm --filter @qingye_lab/ui build   # UI package and generated catalog
pnpm --filter docs typecheck    # Documentation types
pnpm studio:build               # Local Theme Studio
pnpm typecheck                  # Workspace type checks
pnpm test                       # Workspace tests
```

Follow [AGENTS.md](./AGENTS.md) and the [current rewrite roadmap](./docs/plans/2026-10-03-rewrite-roadmap.md). Verification is proportional to the changed contract; a successful static check does not establish runtime or visual acceptance. Browser ownership and cleanup rules apply to all browser runners.

## Release

The Release workflow checks that an explicitly approved `v<version>` tag matches `packages/ui/package.json`. It runs its validation gates, packs UI and tooling at **their own manifest versions**, verifies installed consumers, and attaches both tarballs to a GitHub Release. A UI major release does not require an unrelated tooling bump or a matching private Studio version. See [release.yml](./.github/workflows/release.yml) for the executable process.

**1.0.0 is a local unreleased candidate.** A workspace version, generated catalog or local build is not a published release. Candidate status and breaking changes are recorded in [v1.0.0.md](./docs/releases/v1.0.0.md); [v0.4.0.md](./docs/releases/v0.4.0.md) remains a historical release note.

## License

MIT; see [LICENSE](./LICENSE). Third-party dependencies distribute their own licenses. The [provenance closure decision](./docs/decisions/2026-10-03-provenance-closure.md) records the scope of the source review and retained evidence.
