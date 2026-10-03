# Qingye UI Style Contract

Generated from the English source blocks in root design.md and STANDARDS.md. The Chinese criteria remain canonical; source hashes prevent silent translation drift.

Read [design philosophy](design-philosophy.en.md) for method sources, [the matching resource index](v1.0.0/en/llms.txt) for component contracts, and [the public guide](../design.en.md) for project adoption.

## Use

1. Read the bans before implementing.
2. Check each observable criterion in the actual result.
3. Identify conflicts with confirmed project choices before deciding; do not silently override them.
4. Report PASS, FAIL, UNVERIFIED, or NOT_RUN. Unrun checks are never passes.

## Design contract

The six methods guide judgment. This section supplies directly actionable criteria. Review each one against an observable result rather than a feeling.

### Required

Establish correct facts, truthful states, and accessibility before expression.

- **Names match actual objects, actions, and outcomes.** Waiting, success, failure, and unknown results remain distinct. Never announce an outcome before the fact.
- **States have explicit owners.** Separate local disclosure from persistent selection. Applications own drafts, scope, versions, and asynchronous outcomes; interfaces present them accurately.
- **Accessible behavior stays intact.** Keyboard access, names, visible focus, actual foreground/background contrast, narrow layouts, enlarged text, and reduced motion must support the task.
- **The three theme axes stay independent.** Brand uses `data-brand`; appearance uses `light`/`dark` or `data-theme`; density uses `data-density`. Themes do not change permission, save policy, or action scope.
- **Text length preserves structure.** Grouping, hierarchy, and action positions must hold with long titles, labels, mixed scripts, enlarged text, and changed languages.
- **Record judgments machines can read.** Uses, unavailable conditions, alternatives, states, and ownership for components and patterns must exist beyond memory and interface copy.

### Bans

These practices have no acceptable presentation rationale. Lack of a better solution does not justify them.

| # | Ban | Observable criterion |
|---|---|---|
| NG1 | Repeat content already expressed by a heading or neighbor | Removing the sentence does not change the likelihood of a wrong action or missing information |
| NG2 | Flatten information with real priorities into equal emphasis | Without decoration, the reader cannot identify the current focus |
| NG3 | Mix unrelated design languages on one product surface | The same control uses different radius, weight, or spacing logic across pages |
| NG4 | Enclose content with no independent identity in cards | Removing the border leaves the content relationship unchanged |
| NG5 | Add a kicker or eyebrow above a heading | It carries no information needed for identification, a decision, or error recovery |
| NG6 | Explain states through decorative motion, or make completion depend on animation | Turning animation off makes a state unclear or a task impossible |
| NG7 | Put a critical consequence solely in a disappearing hint | Once the hint disappears, the consequence cannot be checked |
| NG8 | Explain the interface's design or implementation in interface copy | The sentence describes a technique rather than the object, consequence, or recovery |

### Copy

Explain what the reader cannot see, then stop.

1. **Write facts:** parameters, values, state names, permissions, irreversible consequences, and necessary distinctions such as cancellation requested versus completed.
2. **Do not repeat:** NG1 applies to information already clear from headings, previews, or neighbors.
3. **Avoid sprawling abstractions:** a sentence should not contain more than two groups of parallel abstract nouns.
4. **Use real subjects:** people, interface elements, or specific objects rather than abstract nouns.
5. **State the content directly:** skip announcements of what will be discussed next.
6. **Do not end with a maxim:** the final sentence carries information that belongs to the paragraph.
7. **Give the actual approach:** explain the tradeoff through what to do, rather than only what to avoid.
8. **Avoid adjectives without criteria:** elegant, modern, powerful, or premium need observable counterparts to be useful.

Tutorials, installation steps, error recovery, and permission explanations are necessary guidance; explain them fully.

### Tests of judgment

**1. Removal.** Does removing an element harm understanding, execution, protection, or coordination? If not, remove it. Do not duplicate an already reliable mechanism.

**2. Division of roles.** Judge functional role separately from visual emphasis. The executing action need not be strongest; Stop may take priority in an exception, body text during reading, and scope review before bulk work.

**3. Change.** Changing expression must preserve ongoing input, selection, and position. Rearranging a layout alone is not adaptation.

**4. Source.** Differences in appearance need an identifiable reason: task, state, conditions, or project identity. Converge differences without a reason.

**5. Ownership.** Assign each change to the public library, project design layer, application, or development tooling. Keep business state out of styles and shared foundation controls out of page copies.

**6. Evidence.** Claims about states, contrast, keyboard access, and correct behavior need observed checks. Record unsupported claims as unverified rather than passed.

## Delivery checks for people and AI

- Code uses exports and props that exist in the current version, without treating proposed commands as available tools.
- Normal and relevant failure, cancellation, or recovery paths work; state sources and ownership are clear.
- Objects, scope, drafts, focus, and the basis for returning remain valid in agreed contexts.
- Check keyboard access, names, actual foreground/background contrast, narrow layouts, long text, and reduced motion according to impact.
- Normal text, including supporting text, generally requires at least 4.5:1; large text and necessary non-text content use their applicable requirements. The library's 44px touch target is not a universal WCAG AA threshold. [Text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · [Target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- Report source checks, browser behavior, assistive technology, and human visual review separately. Simulated IME events do not establish real Chinese IME behavior; screenshots do not establish complete accessibility acceptance.
- Use `PASS`, `FAIL`, `UNVERIFIED`, and `NOT_RUN`. Use `N/A` only with a reason. Missing capabilities or checks never count as a pass.

Delivery notes briefly state the changed judgment, owning layer, retained work, verified states, and remaining gaps. Cultural adjectives and a model's self-rating cannot replace evidence.

Every substantial design change connects a real task, a relevant method, a specific tradeoff, and an observable result. Redesign if only traditional decoration remains, or preserving a reference component hides necessary feedback, weakens exits, or sacrifices comparison and content capacity. Adding cultural prose cannot make it acceptable.

This document changes no user authorization, collaboration rules, or release permissions. Identify material conflicts with project rules before deciding; preserve established contracts unless an authorized change resolves the conflict.

## Public component implementation

Foundation and value-adjudication paths below identify repository evidence, which is not distributed in the package. Public criteria are in [Delivery checks](../design.en.md#delivery-checks-for-people-and-ai) and [this file's focus section](#5-states-and-focus). Current values and preset classifications are stated below; component decisions and APIs are in [catalog.json](../catalog.json).

These are implementation rules for `@qingye/ui`. The generator projects them into the distributed `ai/style.en.md`; edit this source rather than generated copies. The design basis is [design.en.md](../design.en.md). Current values and classifications are recorded in the foundation (repository evidence: `docs/decisions/2026-10-03-foundation.md`), revised through value adjudication (repository evidence: `docs/decisions/2026-10-03-value-adjudication.md`). The Chinese source remains authoritative; the generator checks this translation's source hash.

### 0. Requirements, choices, and presets

Design requirements refer to [Required](../design.en.md#required), without establishing a second normative copy here. Classify values as derived, constrained, chosen, or preset. One value within a constraint is not automatically a unique derivation; renaming an inherited value cannot turn it into a design requirement. Current dimensions, colors, tracking, shadows, and durations without a unique basis are presets.

Components are rewritten by current layers and roadmap batches. Read completed files in `packages/ui/src/components/` and their execution records for evidence. A changing file count cannot establish acceptance. Archived components are not implementation or design-value sources.

### 1. Structure and API

- One component per `packages/ui/src/components/<name>.tsx` file, named in kebab-case.
- Styleable parts have `data-slot`. Merge external classes last; forward id, ARIA, data attributes, and events.
- Use Base UI `render`, `useRender`, and `mergeProps` to replace rendered elements. Avoid aliases or an `as` API without a task basis. Current Card is a composition entry without automatic title slots or padding.
- Components based on Base UI export their primitive namespace. Controlled state retains applicable controlled and uncontrolled entries. Assign responsibilities using [Assigning changes](../design.en.md#assigning-changes).
- Request facts and outcome inference follow [Names and states](../design.en.md#names-and-states). Button currently chooses `idle / waiting / in-progress / unknown / failed`. A boolean loading prop could also respect ownership; the union is a choice rather than a design requirement.
- Danger consequences must be visible and associated. Place a danger Button inside ButtonProtection or reference existing nonblank text through `aria-describedby`. Development throws when neither exists; production does not. Missing runtime `process` is treated as production. ButtonProtection requires visible nonblank consequence text about the current object. Do not duplicate a reliable existing explanation. See foundation §18 and batch 3 D for the missing-runtime check.

### 2. Dimensions

Size and emphasis are independent choices; using size for expression requires a task reason. Outer heights, type sizes, and the narrow-screen +4px are current presets. Size can communicate importance when justified. The default `sm:` breakpoint is 640px and restores desktop profiles; coarse-pointer hit areas are handled separately.

| Size | Desktop / narrow outer height | Matching text profile | Desktop / narrow font size | Desktop / narrow line height | Desktop visual allowance per vertical side |
|---|---|---|---|---|---|
| `xs` | 24 / 28px | `text-control-xs` | 12 / 14px | 16 / 20px | 4px |
| `sm` | 28 / 32px | `text-control-sm` | 13 / 14px | 18 / 20px | 5px |
| `md` | 32 / 36px | `text-control-md` | 14 / 15px | 20 / 22px | 6px |
| `lg` | 36 / 40px | `text-control-lg` | 16 / 17px | 24 / 24px | 6px |
| `xl` | 40 / 44px | `text-control-xl` | 18 / 19px | 26 / 28px | 7px |

Pixel conversions assume a 16px root font. Button and Input consume their matching text profile, using `-mobile` classes on narrow screens and desktop classes at `sm:`. Earlier lg reused md type and xl reused lg type; added height without line-height growth left 8px per side. The current 4/5/6/6/7px allowances are calculated from chosen outer heights and line heights; see foundation §2 and §8.

- Distinguish occupied outer dimensions, usable space inside borders, and touch hit dimensions. Outer heights consume dimension roles rather than increasing indirectly with global spacing.
- Horizontal allowances of 10/12/14/16/16px, roughly 40–44%, are presets rather than minimum content capacity. Capacity depends on actual width, text, icons, and adjunct actions. Bordered/Input profiles subtract the actual 1px border from padding to align text origins; borderless profiles use unadjusted padding. See foundation §1.
- Icons use the same profile. Desktop xs/sm use 14px, md/lg 16px, xl 18px; narrow profiles use 16/16/18/18/20px. All are presets. Icon is a shape axis; centering allowance derives from outer height and icon dimensions.
- Independent controls below the library's 44px target use `touch-target`. On coarse pointers, it establishes its own positioning context and centers an expanded pseudo-element. Check clipping, neighboring overlap, and accidental viewport targets. Input's coarse-pointer minimum outer height reads `--qy-touch-target` without changing its nominal profile.

### 3. Surfaces and boundaries

Task criteria come from [Space and surfaces](../design.en.md#space-and-surfaces) and [Removal](../design.en.md#tests-of-judgment). Foundation §5 and §6 describe the selected identification mechanisms.

| Current Button variant | Boundary mechanism | Focus mechanism |
|---|---|---|
| `solid` | Fill; no default border or external shadow | 2px contrasting line inside the fill |
| `bordered` | White surface in light mode with a boundary line; card surface in dark mode | Change the existing 1px border's color |
| `quiet` | Transparent by default; content identifies the entry | 1px line inside its own box |

These three variants are current choices, not fixed importance levels; tone is independent. The user's rule to retain borders when a surface matches its background motivates bordered, without adding lines to entries already distinguished by fill.

Neutral bordered reads `--qy-border-input` through `--qy-button-bordered-border`, and `--qy-ring` through `--qy-button-bordered-border-focus`. Current light mode uses black at 50% alpha and dark mode white at 44%; the chosen 50% is not the current value for both. Danger bordered locally mixes danger text at 50%, with opaque danger text for focus.

- Use semantic surface roles rather than hard-coded gray. Surface/raised currently use white in light mode and opaque color mixes in dark mode. Surface-inset, lines, and feedback layers are translucent; measure their actual compositions.
- Input currently has a 1px shared outer boundary and a transparent inner input; dark mode reads the inset surface. Current Card/Popover each have a 1px container boundary. This records implementation rather than requiring a line in every context.
- Judge highlights and shadows with the removal test. Current solid Button and Card have no default external shadow. Removing Card's shadow-panel is a reversible default choice; an unproven independent purpose does not forbid shadows in every project. Popover/Tooltip consume shadow-raised and Dialog/Drawer shadow-overlay. All parameters are presets; consuming a role does not establish necessity in every composition.
- Necessary boundary contrast refers to foundation §16. No library contract reads parent backgrounds or adds borders automatically. The G9 project declaration protocol is undecided; proposals are not current APIs.

### 4. Radii

Current square independent controls use `r ≤ 25% × nominal outer height`. The 25% criterion is chosen; 6/7/8px are choices within it. Taking the upper bound for xs/sm/md is not the only solution; lg/xl retain 8px. Check actual widths, zoom, and wrapping.

| Current class / role | Value | Consumer |
|---|---|---|
| `rounded-xs` / `rounded-sm` | 6 / 7px | xs / sm controls |
| `rounded-control` | 8px | md/lg/xl Button and Input |
| `rounded-panel` | 12px | Card |
| `rounded-overlay` | 12px | Popover panel; independent adjustment entry |
| `rounded-md` / `rounded-lg` | 8 / 8px | Independent geometry / default control chain |
| `rounded-xl` / `rounded-2xl` | 10 / 12px | Other geometry presets |
| `rounded-marker` / `rounded-item` | 4 / 6px | Defined marker/item presets, without a matching rewritten component in this source record |

`--qy-radius-md` is direct; `--qy-radius-lg` reads `--qy-radius`. Equal current values do not establish a nested contour relationship. Use `inner radius = max(0, outer radius − inset)` only for an equal inset of the same carrying contour; negatives become square corners. Independent child objects do not follow it: an independent 8px Button inside Card is not forced to derive its radius from Card padding. See foundation §4 and §18.

### 5. States and focus

Ownership and simultaneous states follow [Names and states](../design.en.md#names-and-states). This table records current part implementations.

| State | Current expression and classification |
|---|---|
| hover / pressed | solid fill `/90` is an inherited preset; bordered/quiet use accent or danger-soft without layout changes. qy-pressable's 0.97 scale is a preset |
| focus-visible | No additional outer ring. Input, focusable Card, Popover panel, and bordered Button change existing border color without thickness changes. solid uses an internal 2px line; quiet an internal 1px line |
| disabled | Native/ARIA semantics and event guards apply independently. Current opacity-64 is an inherited preset rather than a substitute for actual disabled behavior |
| invalid | Caller-declared facts. Input retains aria-invalid and an error border, changing to danger text color on focus at the same 1px width without an added inner ring |
| waiting / in-progress / unknown / failed | Button expresses supplied facts and retains the action name. Busy and unknown block repeated activation without inferring success or retry |
| selected / open | Consume actual primitive data states; preserve semantics when changing appearance |

Foundation §15 records focus values: `--qy-focus-ring-width` currently chooses 2px and `--qy-focus-quiet-width` 1px. Input's clear/password adjunct buttons and bare Popover entries currently use 2px internal lines, rather than quiet Button's 1px. Popover panel actually receives focus; review observed focus-visible after opening with Enter, and its border only changes color.

In forced colors, systems remove box shadows. `styles.css` restores CSS outline with width and inward offset reading local `--qy-focus-ring-width`: 2px by default and 1px for quiet. System colors take over; `!important` overrides utilities-layer outline-none. Widths are choices rather than AA minimums. The full forced-color composition matrix remains UNVERIFIED.

Test focus-visible through actual `keyboard.press("Tab")`, wait at least 500ms for transitions, then read computed values. Dimensions must remain unchanged, the signal visible, and the outline internal. Static styles and a candidate coverage page are not runtime acceptance.

### 6. Motion

- Actual changes, interruption, and continuity follow [Change and recovery](../design.en.md#change-and-recovery) and ban NG6.
- Durations and curves are presets. Current press is 100ms, fast 140ms, feedback 180ms, base 220ms, slow 320ms, drawer 450ms. Consume roles instead of another inline value for the same purpose; see foundation §12.
- motion.css owns Popover/Tooltip entry and exit. Components provide structure, trigger position, and slots. Initial scale 0.98 and opacity 0 are inherited presets whose migration into a shared file does not change provenance. Entry at 140ms and exit at 100ms are policy choices.
- Toast retains local entry/exit and stacking; theme.css also contains success/error animations. These values are presets. This source does not claim complete motion consolidation across retained components.
- MotionProvider records input method and switches instantly for keyboard. Reduced motion removes translation and scale while retaining readable color, opacity, and loading indications. Runtime acceptance follows [Delivery checks](../design.en.md#delivery-checks-for-people-and-ai).

### 7. Typography and capacity

Each semantic profile includes font size, line height, tracking, and weight; current values are presets. Control profiles are separate from content profiles. Hierarchy follows [Emphasis and content](../design.en.md#emphasis-and-content).

| Content profile | Current font size | Current tracking |
|---|---|---|
| `display-lg` / `display` | 40 / 32px | −0.032em |
| `title` | 24px | −0.022em |
| `chapter` | 22px | −0.02em |
| `heading` | 16px | −0.012em |
| `body` / `label` | 14 / 13px | −0.006em |
| `caption` | 12px | 0 |
| `micro` | 11px | +0.01em |

- Font size does not uniquely determine tracking; the default pattern is not a hard ban. Current weights are 400/500/600. Theme changes require actual hierarchy and contrast checks rather than making a preference universal.
- utilities.css uses :lang to set Chinese/Japanese/Korean tracking to normal. The source records no typography-component ownership of this rule. Check typography with Emphasis and content and Delivery checks.
- numeric serves numeric columns and counts; text-metric includes tabular numerals.
- Choose truncation, wrapping, text-balance, and text-pretty for the task. Single-line truncation is not mandatory. Button currently permits wrapping. Consequences and empty values follow Names and states and NG7; see foundation §14 and §17 for capacity.

### 8. Accessibility

- Preserve primitive keyboard, naming, state, and focus behavior. Hide decorative icons and name icon-only entries.
- Contrast follows [Delivery checks](../design.en.md#delivery-checks-for-people-and-ai) and foundation §16 without copying its numbers here. Composition is described in foundation §5.
- Applicable focus criteria, hit targets, and project choices refer to foundation §15 and Delivery checks. Current mechanisms are in §5 above.
- Graphics must express states through names, text, icons, and ARIA as well as color.

### 9. Internationalization, direction, and theme axes

- Built-in strings use useUILocale; add keys to both src/locale.tsx and src/locales/en-US.ts. Caller-supplied explicit names take precedence.
- Prefer logical directions. Keep physical direction where its task requires it, such as arrow positioning. Check actual Portal language, direction, and density containers.
- Independent axes and compact presentation follow Required and Space and surfaces. ThemeProvider defaults to class with an explicit attribute mode. Current document-level brand and compact wiring are in foundation §13.

### 10. Appearance and implementation provenance

Accept actual combinations through Delivery checks; composition and light/dark sampling follow foundation §16. Provenance and design derivation are separate. Retain legally required notices for distributed derived files. Never read archived component source to decide values or call renamed copies original work.

### 11. Documentation and acceptance

Component documentation follows [Executable protocols](../design.en.md#executable-protocols); interface copy follows [Copy](../design.en.md#copy). These standards record implementation rules only.

Select checks and combinations by current task impact and user decisions, using Delivery checks for evidence statuses and §5 above for focus sampling. Screenshots reveal changes; do not update them in bulk to pass. Explain every changed assertion.

Generating AI style resources and the unified build follows completion of parallel tasks; it is outside an individual component batch.

Generated by packages/ui/scripts/gen-catalog.mjs. Edit canonical source translation blocks; manual edits to this file are overwritten.
