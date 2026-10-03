# C67–C91 contrast repair

2026-10-03. Base HEAD: `275d730` (`@qingye/ui` v0.4.0), with substantial existing and concurrent workspace changes. Those changes were preserved. Ownership for this task is library colour, Spinner semantics, and contrast enforcement; documentation demos supplied evidence, not app-level overrides. The changes follow `design.md`'s real foreground/background and ownership contracts. This task did not change geometry, layout, theme axes, or semantic token names.

## Measurement scope

Browser evidence uses one task-owned Chromium session, serial light/dark playgrounds, and keyboard focus at 1280px and 390px. Colours come from computed styles converted to sRGB; alpha paint is composited over the actual ancestor backgrounds. Unknown backdrops are not replaced with white. Necessary boundaries are compared with both their inside fill and outside surface. Ratios below are rounded for display only; checks use the full value.

The before snapshot is the workspace immediately before this task, not an older release reconstructed from HEAD. In particular, the existing 96% subtle-foreground alpha and generic light/dark ring colours were already present. Hover-before measurements explicitly reconstruct the saved pre-edit semantic CSS and original control fill alpha on the same geometry. Keyboard focus uses saved before token values over the measured actual background. Token-only results are identified separately from rendered component results.

Raw evidence: [before](../../output/playwright/c67-contrast/before.json), [after](../../output/playwright/c67-contrast/after.json), [resolved contracts before/after](../../output/playwright/c67-contrast/resolved-tokens-before-after.json), [hover](../../output/playwright/c67-contrast/hover.json), [focus and mobile](../../output/playwright/c67-contrast/focus-and-mobile.json), [segmented focus](../../output/playwright/c67-contrast/segmented-focus.json). The same directory contains screenshots and measurement scripts.

## C67 — fixed: necessary control boundaries

`Input`'s `input-control` wrapper uses `border-input`, and hover uses `border-border-strong` ([input.tsx](../../packages/ui/src/components/input.tsx)). `Select`, outlined `Button`, `Toggle`, and the other affected fields consume the same boundary role. These are necessary non-text boundaries, with a 3:1 threshold.

| Actual rendered pair | Before | After |
| --- | ---: | ---: |
| Light Input border-input / white control and surrounding card | 1.26 | 4.00 |
| Dark Input border-input / own fill over dark card, lower of inside/outside | 1.26 | 4.16 |
| Light hovered Input border-strong / white control and card | 1.38 | 4.60 |
| Dark hovered Input border-strong / own fill, inside | 1.46 | 4.97 |
| Dark hovered Input border-strong / surrounding card, outside | 1.57 | 5.51 |
| Light hovered outline Button border-strong / own fill, inside | 1.33 | 4.41 |
| Light hovered outline Button border-strong / surrounding panel, outside | 1.38 | 4.60 |
| Dark hovered outline Button border-strong / own fill, inside | 1.47 | 4.74 |
| Dark hovered outline Button border-strong / surrounding panel, outside | 1.69 | 5.77 |

The resolved dark token pairs reproduce the audit: border-input / surface **1.25 → 4.32**, border-strong / surface **1.43 → 5.19**. Those isolated token results are not substituted for the component's two-sided measurements above.

Light input/strong borders now use black alpha 50%/54%; dark uses white alpha 44%/50%. Control backgrounds formerly used the boundary token itself (`bg-input/32`, `/48`, `/64`, or pressed `bg-input`). Raising that token would also brighten the fill and reduce the boundary's inside contrast. Those control fills now consume existing inset/hover/active surface roles. Separator uses of `bg-input` were retained. No new token was introduced.

The same defect exists in invalid states: Input's alpha-reduced destructive boundary measured **1.70 → 3.81 light**, **1.61 → 4.41 dark** against its actual fill. Necessary error borders now use solid destructive paint; soft error glows remain soft. This includes the outlined destructive Button's hover/pressed boundary. It changes colour only.

## C68 — fixed: chart and status marks, distinct from text on fills

| Actual rendered pair | Role | Before | After |
| --- | --- | ---: | ---: |
| Light chart-2 mark / white Card | graphical mark, ≥3 | 2.47 | 5.36 |
| Light chart-3 mark / white Card | graphical mark, ≥3 | 2.13 | 5.03 |
| Light warning StatusDot / white panel | solid mark, ≥3 | 2.13 | 5.03 |
| Light warning Alert SVG / warning 4% fill over white | graphical mark, ≥3 | 2.07 | 4.76 |
| Light success StatusDot / white panel | solid mark, ≥3 | 2.47 | 5.36 |
| Light success Alert SVG / success 4% fill over white | graphical mark, ≥3 | 2.39 | 5.08 |
| Dark chart-2 mark / dark Card | graphical mark, ≥3 | 8.89 | 8.89 |
| Dark chart-3 mark / dark Card | graphical mark, ≥3 | 10.00 | 10.00 |
| Dark warning StatusDot / dark panel | solid mark, ≥3 | 8.07 | 8.07 |
| Dark warning Alert SVG / warning 4% fill over dark panel | graphical mark, ≥3 | 7.59 | 7.59 |

The statically resolved white pairs are chart-2 **2.46 → 5.37** and chart-3/warning **2.15 → 5.05**. Small differences from computed browser measurements reflect browser colour conversion/quantisation; both measurement sets retain their full values in the evidence.

Call-site classification:

- [status-dot.tsx](../../packages/ui/src/components/status-dot.tsx) sets `bg-current` on the indicator, with `text-warning` / `text-success` selecting its paint. This is a solid mark, not small text.
- [alert.tsx](../../packages/ui/src/components/alert.tsx) applies `bg-warning/4` / `bg-success/4` to the surface and the status colour to its SVG. The tint and the mark are separate roles. The alert's body text uses normal foreground roles.
- [progress-circle.tsx](../../packages/ui/src/components/progress-circle.tsx) applies the status colour to a `stroke-current` progress indicator. Its central value explicitly uses `text-foreground`.
- [chart.tsx](../../packages/ui/src/components/chart.tsx) and the chart demos pass configured series colours to Recharts marks. Measurement selected the rendered bar/pie fill or line stroke, rather than assuming every SVG's stroke is the mark.
- [badge.tsx](../../packages/ui/src/components/badge.tsx) uses `bg-warning/8` + `text-warning-foreground` (dark fill 16%), similarly for success/danger. This is normal text on a translucent fill and is checked at **4.5:1**.

Light warning/chart-3 now use existing amber-700; success/chart-2 use emerald-700. Dark solid status/chart colours are unchanged. The separate light warning/success foregrounds were darkened after checking their changed translucent fills. Actual Badge text over a white panel is warning **4.73 → 5.36**, success **4.99 → 5.66**. The warning Badge role over the supported page background was **4.426920 → 4.977881**, so leaving its old text colour after changing the mark would be insufficient. No threshold was lowered.

## C87 — fixed: secondary text and alpha composites

The base muted/raised dark pair passed; layered pairs did not. Muted text is normal text, so its threshold is 4.5:1. The browser probe resolves the real library surface paints; it does not claim that every public-token combination is directly present in every demo.

| Resolved browser composite, dark | Before | After |
| --- | ---: | ---: |
| foreground-muted / surface-raised | 4.80 | 7.49 |
| foreground-subtle (96% muted) / surface-raised | 4.52 | 7.03 |
| foreground-muted / inset over raised | 4.28 | 6.68 |
| foreground-muted / hover over raised | 3.88 | 6.05 |
| foreground-muted / active over raised | 3.41 | 5.32 |
| foreground-subtle / inset over raised | 4.05 | 6.30 |
| foreground-subtle / hover over raised | 3.68 | 5.72 |
| foreground-subtle / active over raised | 3.25 | 5.04 |

The statically resolved unlayered muted/raised result is **4.791465 → 7.425706**. The 96% subtle variant's alpha percentage was an existing workspace change; this task changed its source muted colour, not that percentage. Dark muted now mixes neutral-400 at 80% with white, rather than neutral-500. Light muted is darker as well: subtle/hover-over-raised **4.44 → 6.01**, subtle/active-over-raised **4.11 → 5.57** in browser probes.

`PopoverDescription`, `CardDescription` / chart secondary labels, `ItemDescription`, and segmented-control item text use `text-muted-foreground`. Raised descriptions and surface selection layers are checked at 4.5. The public subtle role is included as a supported theme contract even though there is no direct library `text-foreground-subtle` call site.

`StatusDot` uses the alpha variants `/64` and `/80` for marks, not normal-size text. Its actual neutral `/64` mark on a dark Card was **2.94 → 4.17**; light was **2.68 → 3.15**, both checked at 3:1. Disabled-calendar alpha paint is not presented as an enabled-text acceptance result. Arbitrary consumer opacity, runtime backgrounds and project brand overrides remain `UNVERIFIED` without rendered evidence.

## C88 / C42 — fixed: truthful Spinner semantics

Ratio: **not applicable**; this is an accessibility-name/role failure, not a paint pair.

[spinner.tsx](../../packages/ui/src/components/spinner.tsx) defaults to an exposed `role="status"` with the locale loading name and explicit `aria-hidden={false}`. The latter matters because Lucide otherwise hides unnamed SVG icons. Custom `aria-label` and `aria-labelledby` work for exposed spinners.

When the caller explicitly sets `aria-hidden={true}` or `"true"`, Spinner emits no role, label or labelled-by reference. Decoration therefore does not retain a contradictory hidden status/name. [button.tsx](../../packages/ui/src/components/button.tsx)'s internal spinner remains decorative: Button retains its action name and owns `aria-busy`. [search-input.tsx](../../packages/ui/src/components/search-input.tsx) similarly owns `aria-busy`; its unnecessary `role={undefined}` workaround was removed. Documentation's hidden inline/context spinners accompany visible waiting text and remain decorative. Standalone documentation spinners retain the default exposed status.

Five focused tests cover both locales, boolean/string hidden values, custom names, labelled-by, Button/SearchInput loading and non-loading paths. The prior C42 test expecting a hidden locale label was corrected to assert the truthful decoration contract. No live screen-reader announcement test was run.

## C89 — fixed: sidebar keyboard focus

`SidebarMenuButton` and other sidebar controls use `ring-sidebar-ring` on `focus-visible` ([sidebar.tsx](../../packages/ui/src/components/sidebar.tsx)). This is a required non-text focus signal, with a 3:1 threshold.

| Actual keyboard-focused ring / sidebar background | Before | After |
| --- | ---: | ---: |
| Light, 1280px and open 390px drawer | 2.48 | 14.50 |
| Dark, 1280px and open 390px drawer | 7.31 | 12.75 |

The token now aliases the existing appearance-appropriate `--qy-ring`, rather than using neutral-400 in both appearances. Focus was reached using Tab, with `:focus-visible` confirmed, and screenshots saved. The generic ring colours themselves were pre-existing workspace changes and were not introduced here.

## C90 — fixed: source enforcement with explicit limits

Ratio before/after: **not applicable to the absence of a gate**. The new gate reports **185 default-library role pairs per appearance PASS**, and **862 source contexts per appearance UNVERIFIED** in the final required test run. Those unresolved contexts are not counted as passing contrast. In the saved before/after contract comparison, light had 87 failing pairs and dark 61; after had zero failures. No previously passing declared pair became a failing pair.

[contrast-check.ts](../../packages/ui/test/contrast-check.ts) lives beside the existing AST colour check. [contrast-check.test.ts](../../packages/ui/test/contrast-check.test.ts) is picked up by the existing library test command and has 35 tests. A test-only PostCSS dependency parses CSS; TypeScript's AST parses component class/paint contexts, rather than regex over raw TSX.

Computation:

1. Parse the current `tokens/primitives.css` and `tokens/semantic.css` declarations; resolve the default root/light/dark/explicit data-theme cascade, aliases and nested fallbacks. Values are not copied into the test.
2. Convert OKLCH through Oklab to linear sRGB with the CSS Color 4 matrices, then encode/clamp to the checker’s sRGB target. Support rgb/rgba, hex, `color(srgb ...)`, and premultiplied `color-mix(in srgb, ...)` including transparency.
3. Composite each declared background bottom to top, then alpha-composite foreground over that resolved opaque background. A still-translucent backdrop is unresolved, not white.
4. Compute WCAG relative luminance using the sRGB transfer function and weights 0.2126/0.7152/0.0722; contrast is `(lighter + .05)/(darker + .05)`. Compare the unrounded result with 4.5 for normal text or 3 for necessary marks/boundaries.

The declared role contracts cover text over page/panel/raised/subtle and inset/hover/active/accent layers, control boundaries, chart/status marks, Alert icons on 4% tints, Badge text on 8%/16% status fills, StatusDot alpha marks, ring/50, sidebar focus/text, primary and destructive button text. Known contract `UNVERIFIED` results fail the contract test, just as `FAIL` does. Source analysis evaluates bounded literal same-element semantic text/background pairs; explicit detected failures fail the test. An AST check also rejects reintroducing boundary-token control fills or alpha-reduced necessary error borders. It ignores comments and unrelated prose.

Exactly what remains `UNVERIFIED`:

- Missing/cyclic/runtime token values, unresolved `currentColor`, unsupported colour functions/interpolation/spaces (including display-p3), and conditional token declarations outside the unconditional default cascade.
- Transparent or alpha backgrounds without a known opaque bottom layer; unknown/inherited backdrops and gradients/images whose effective background cannot be established.
- Runtime class/style/colour/fill/stroke expressions or spread props; arbitrary component composition and ancestor styles/classes that may change the paint or introduce opacity/blending.
- JSX classes with pseudo/variant/state overrides, opacity, blending, backdrop effects or multiple competing paint declarations. The bounded checker does not execute `cn`/`cva` or infer their runtime branch.
- Project `data-brand` overrides and arbitrary consumer CSS remain outside the default-library contract. Wide-gamut output, browser-specific rendering, focus clipping and accessibility announcements require appropriate runtime evidence.

The source scanner is not an exhaustive CSS cascade interpreter; unknown text/background/fill/stroke classes outside its supported semantic utility subset return `UNVERIFIED`, including literal `currentColor` and arbitrary paint even when neither side is a recognised token. Source `UNVERIFIED` reports remain visible in test output. The gate does not claim those runtime contexts passed.

Regression tests restore the old dark border, change an underlying chart primitive while keeping the semantic alias, and restore the old muted dark text; each causes a failure. Tests also check alpha layering, aliases, threshold strictness and the unresolved cases above.

## C91 — no change needed on the tested focus path

The outline-only paths are the exported [segmented-control.tsx](../../packages/ui/src/components/segmented-control.tsx) item variants composed with `RadioPrimitive.Root` and `TogglePrimitive` in the real [radio](../../apps/docs/src/content/segmented-control/demos/01-radio.tsx) and [toggle-group](../../apps/docs/src/content/segmented-control/demos/03-toggle-group.tsx) demos. The same public style is also used by navigation links. They use `outline-2 outline-transparent focus-visible:outline-ring`.

| Actual keyboard focus outline / surrounding segmented track | Before | After |
| --- | ---: | ---: |
| Light radio, toggle and link, 1280px and 390px | 13.76 | 13.76 |
| Dark radio, toggle and link, 1280px and 390px | 10.48 | 10.48 |

Tab reaches the actual focus owner, `:focus-visible` is true, the computed outline is solid 2px, and the track's overflow is visible. Saved screenshots show the outline unobstructed; inner selected surfaces also exceed 3:1. There is no requirement that a working focus indicator use box-shadow instead of outline. No colour/geometry change was needed for these paths.

Outlined Button, Toggle and linked Badge were checked too: their existing box-shadow focus rings measure light **15.13 → 15.13**, dark **11.62 → 11.62** on the tested panel. This task did not add or replace those rings. Forced-colors and assistive-technology runs were not performed.

## Additional changes and ownership

The light control borders, invalid-state boundaries, success marks, layered light secondary text, alpha neutral StatusDot marks, and status-foreground fill pairs above are the same boundary/mark/composite defects reached through the named token consumers. In particular, dark danger Badge text on 16% fill over raised resolves to **4.498744 → 4.943758**, a real below-4.5 failure that must not be rounded into a pass. Dark danger-foreground was lightened accordingly; actual Badge text over the demo's dark panel is **5.02 → 5.51**. Light warning/success text was adjusted so stronger marks did not trade a graphic fix for a text failure.

Control-fill or error-border colour classes were updated at the owning components: Button, Input, Textarea, Select, NativeSelect, Combobox, Checkbox, RadioGroup, InputGroup, Group, NumberField, OtpField, Calendar, Badge, Alert, Toggle, NavigationMenu, Item, TagInput and FileUpload. SearchInput's change is solely Spinner semantics. Required coss adaptation notes and SHA records were refreshed for touched derived sources; the upstream baseline was not edited. Locally authored sources remain locally authored.

`gen-capabilities` and `token-ledger` were rerun after the token changes. The generated count remains **88 components / 233 tokens**. Existing general token-ledger runtime observations are stale, with **78 NOT_RUN** entries; this is not reported as a passed runtime ledger. The focused fresh measurements in this report supply the changed contrast evidence. Generated source references are not runtime proof.

## Required verification

| Exact command | Observed final result |
| --- | --- |
| `pnpm --filter @qingye/ui typecheck` | PASS, exit 0 |
| `pnpm --filter @qingye/ui test` | PASS, exit 0; 61 files, 476 tests; 28.97s |
| `pnpm --filter docs typecheck` | PASS, exit 0 |
| `pnpm --filter docs test` | PASS, exit 0; 52 tests, 0 failures; 4156ms |

Full outputs are in [checks](../../output/playwright/c67-contrast/checks/), with the exact default library test in `ui-test-default.log`. A separate single-worker full-library run passed all then-present 472 tests; final review added four unresolved-literal regressions before the final 476-test run. Earlier runs had DateRangePicker timeouts under concurrent load, the old C42 assertion, and Pagination assertions while its owner was editing its disabled-link semantics; those are not hidden as successful runs. The corrected Spinner assertion and the Pagination owner's subsequent changes are present in the final passing library run. A later docs run failed because the concurrently added design-guidance test's VM had no `require` for its new localisation import (50 passed, 1 failed). Its owner replaced that VM with the repository's Vite SSR loader; the failed output is retained in `docs-test-before-harness-fix.log`. The subsequent exact docs command passed all 52 tests; this task made no docs-runtime or docs-test-harness change.

Browser verification recorded a React duplicate-createRoot console error during concurrent Vite HMR; it does not establish a clean console audit. One navigation destroyed an evaluation context; verification resumed in the existing owned session and completed. No fresh site-wide audit, production build/deployment, physical-device or screen-reader acceptance is claimed. The task browser/session and its recorded descendants were closed, and the task-owned Vite server and child were verified exited; other task sessions were preserved. Process ownership evidence is in [ownership.json](../../output/playwright/c67-contrast/ownership.json).
