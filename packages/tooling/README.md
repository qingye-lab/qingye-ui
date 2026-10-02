# Qingye local tooling

`@qingye/tooling` is independent of the component runtime. Its `qingye-ui` executable and the local Theme Studio use the same project, theme, diagnostic and impact services. Nothing downloads the newest component library, publishes, starts a browser, uploads code or grows a baseline automatically.

Build before running the workspace executable:

```sh
pnpm --filter @qingye/tooling build
pnpm --filter @qingye/studio exec qingye-ui info --project ./fixtures/azure --json
pnpm --filter @qingye/studio exec qingye-ui docs Button --project ./fixtures/azure --json
```

All commands require an explicit application directory containing its own `package.json`. Configuration is `ui.config.json` in that directory; the tool does not select the nearest application. Installed package version, public exports and catalog come from that project's actual module resolution. A catalog/package version mismatch is an execution failure. `info` without configuration still reports installed facts plus `missingConfig`; it creates no files. Older catalogs remain queryable, with absent API/example evidence marked `UNVERIFIED`.

## Configuration and theme

The schemas live in `schemas/`. Required managed and scan paths are project relative and must stay inside the selected project, including symlink resolution. `ledger` and `ledgerRoot` are explicit read-only references to the existing shared two-layer ledger; each fingerprint input must stay inside its declared source root.

```json
{
  "schemaVersion": 1,
  "package": "@qingye/ui",
  "publicEntry": "src/ui.ts",
  "styleEntry": "src/ui.css",
  "theme": { "source": "ui.theme.json", "generated": "ui.theme.generated.css", "mode": "class" },
  "scan": ["src"],
  "compositions": [], "tokenSources": [], "adapters": [],
  "diagnostics": { "preset": "personal", "mode": "report", "report": ".qingye/report.json" }
}
```

`tokenSources` registers meaningful project custom properties. `adapters` is an explicit third-party adaptation boundary. Installed `tokens/*.css` supplies the shared token registry; the tool does not maintain a second token database. Theme input requires `schemaVersion`, a distinct `brand` and `common/light/dark/compact` objects. Only registered token/value overrides are accepted. Generated CSS targets document-level `html[data-brand]`, `.light/.dark` or `data-theme`, and document-level `data-density="compact"`. The generated CSS is unlayered and loaded after library styles, so its exact brand selectors override layered defaults. Consumers must import their configured stylesheet once and set brand/density on `html`; theme data does not change application state.

```sh
qingye-ui init --project /absolute/app --dry-run
qingye-ui init --project /absolute/app --apply
qingye-ui theme get --project /absolute/app --json > theme-read.json
qingye-ui theme validate --project /absolute/app --input candidate.json --json
qingye-ui theme update --project /absolute/app --input candidate.json --json
```

`init` defaults to a whitelist creation plan. It never rewrites an existing app entry, package manifest or CSS. Its source-CSS entry includes Tailwind CSS; an application without a Tailwind build must choose the published precompiled CSS instead and verify its integration. A conflicting file aborts before writing; an identical rerun is unchanged.

For theme apply, use the full read envelope from `theme get`, replace its `theme` with the reviewed candidate, and pass `--apply`. `fingerprint`, `generatedFingerprint` and `configFingerprint` are mandatory for apply. Changed input aborts; it cannot overwrite a new user edit. JSON and CSS use atomic file replacements, with guarded source rollback on generated-write failure. Each read reports whether the two files agree. This is optimistic local concurrency, not a distributed transaction or a universal editor lock.

Handwritten CSS listed in `theme.legacyCss` is read only. Exact registered document brand selectors produce one-way migration candidates. Unknown selectors, conditional rules and third-party declarations retain evidence and are never discarded or rewritten. Adoption must remove duplicate managed variables from the handwritten source explicitly; arbitrary CSS round-trip editing is unsupported.

## Diagnostics and evidence

```sh
qingye-ui check --project /absolute/app --json
qingye-ui check --project /absolute/app --mode gate --save --json
qingye-ui impact --project /absolute/app --token --qy-primary --json
qingye-ui impact --project /absolute/app --slot button --json
qingye-ui report --projects /absolute/app-a,/absolute/app-b --json
```

Paint extraction shares one syntax-owned TypeScript checker in `src/color-check.ts`, migrated from the library test helper. The library's conventions and existing color fixtures re-export this same owner; the library runtime has no tooling dependency. It retains variant, lexical shadowing and arbitrary HEX/RGB/OKLCH handling. Module resolution and public exports use the project's TypeScript options/checker; CSS uses PostCSS AST. Structure tags, ordinary layout/data numbers and declared adapters are allowed. Dynamic visual expressions remain `UNVERIFIED`; browser focus/layout/state checks remain `NOT_RUN`. Reports include rule version, status, certainty, severity, exact location/evidence, owning layer, autofix safety and limitations. No visual or behavioral rule offers speculative autofix. Public component bypass remains explicitly `UNVERIFIED`, browser checks `NOT_RUN`, and token deprecation is `N/A` when the installed registry publishes no authoritative deprecation records. An otherwise clean report therefore remains `UNVERIFIED` overall instead of hiding those coverage limits behind PASS.

Presets change severity and explicit gate policy while keeping evidence/status intact. `recommended` reports visual failures as warnings and gates public import/token/axis errors; `personal` treats known visual failures as errors; `legacy` uses the full personal rules and recognizes existing problems only through an explicitly configured exact baseline. No preset creates or expands a baseline. `report` and `gate` remain independent. Default personal/report does not install a consumer CI gate. Report completion exits `0` while retaining actual `FAIL/UNVERIFIED`; gate with new certain error-severity failures exits `1`. Missing optional peers for actually used catalog components, malformed configuration, unavailable tooling dependencies, unreadable files or scanner failures exit `2` and report `NOT_RUN/completed:false`. Importing or using Button never requires chart/table peers; unused and type-only bindings do not create a peer requirement.

Legacy baseline JSON is `{ "schemaVersion": 1, "issues": [{ "id": "exact diagnostic id", "reason": "existing issue" }] }`. Exceptions are separately configured as `{ "schemaVersion": 1, "exceptions": [{ "rule": "visual/hardcoded", "file": "src/example.tsx", "line": 12, "evidence": "exact extracted value", "reason": "approved reason", "reviewAfter": "2026-12-01" }] }`. Exceptions require exact evidence and an unexpired review date; wildcards are rejected. Existing baseline/exception diagnostics retain their actual status, with a separate disposition. Gate blocks new certain failures; no command rewrites these files.

`impact` reads the existing static paths and recorded runtime cases. Changed source inputs invalidate runtime evidence; an absent or stale measurement cannot mean no influence. `report` reads only saved reports for the explicitly listed projects, checks source/config/version freshness, and never scans or upgrades those projects. Remote upgrade candidates remain `NOT_RUN`.

## Checks

```sh
pnpm --filter @qingye/tooling typecheck
pnpm --filter @qingye/tooling test
```

The tests cover source transactions and rollback, path aliases/symlinks, actual installed versions, legal alias/reexport imports, arbitrary paint, central definitions, structural/data values, adapters, unknown expressions, exact baseline/exception separation, scanner failure and CLI exit codes. Static tests are separate from browser and human visual acceptance.
