---
name: qingye-ui
description: Build complete React tasks using the installed Qingye UI version, public methods and verified facts.
---

# Qingye UI

This file accompanies @qingye_lab/ui 1.0.0. Read the installed version first; a website or upstream namesake may describe another API.

## Continued use in a project

When adopting `@qingye_lab/ui`, keep references to the methods and actual APIs in the project's `AGENTS.md` and `design.md` for later tasks. Merge these snippets into existing files, preserving rules and project facts and respecting permission to edit guidance. This guide does not authorize automatic edits to other repositories or file replacement. Find and record actual entries for the central theme, public compositions, and verification commands; state clearly when an entry does not exist.

If the installed package lacks this guide, save the download as `docs/qingye-design.md` and replace the guide paths below. Continue checking APIs against the installed package.

Project `AGENTS.md`:

```md
## Qingye UI

- Before interface work, read this project's design.md and node_modules/@qingye_lab/ui/design.en.md. Use the six methods of use to judge the task, semantics, structure, and states, and the nine methods of expression to decide measure, ink, line, shape, and placement.
- Before implementation, check the installed @qingye_lab/ui package.json, catalog.json, declarations, and related examples. Reuse shared interactive controls; the project owns themes and public compositions, and the application owns permissions, drafts, requests, and outcomes.
- Verify normal and relevant failure, cancellation, or recovery paths. Check keyboard access, names, contrast, narrow layouts, and long text according to impact. Report only observed checks.
```

Project `design.md`:

```md
## Qingye UI methods

Purpose first. Relationships guide the form. Fitness sets the measure. From node_modules/@qingye_lab/ui/design.en.md, the six methods of use (名实相符, 相成相制, 布白有用, 随境取度, 展开有据, 进退相承) address tasks and semantics; the nine methods of expression (以材为祖, 疏密有致, 墨分五色, 骨法用笔, 应物象形, 经营位置, 绘事后素, 气韵生动, 材有美) address measure and form. Ordinary components use relevant methods; complete tasks check every question. The Chinese method names remain canonical.

Component capabilities come from the installed @qingye_lab/ui catalog.json, types, and examples. Brand, appearance, and density are independent. Record actual entries for the central theme, public compositions, and verification commands here, and keep them current.
```

After upgrades, read the installed guide and declarations again. Website resources help discovery but cannot replace local version facts. Other stacks may save this guide in project documentation and apply its methods, but must verify platform semantics separately; these React APIs cannot be assumed to apply.

## Style contract

Read [style.en.md](style.en.md) before implementing UI. It contains the translated design contract from ../design.en.md and implementation rules from STANDARDS.md; Chinese source criteria remain canonical.

These are bans, not preferences:

NG1. Repeat content already expressed by a heading or neighbor
NG2. Flatten information with real priorities into equal emphasis
NG3. Mix unrelated design languages on one product surface
NG4. Enclose content with no independent identity in cards
NG5. Add a kicker or eyebrow above a heading
NG6. Explain states through decorative motion, or make completion depend on animation
NG7. Put a critical consequence solely in a disappearing hint
NG8. Explain the interface's design or implementation in interface copy
NG9. Express state by adding shape: outward focus rings, thickened borders, dimensions that change with state

Preserve grouping, hierarchy, and action reachability when text grows. Density may tighten relationship spacing without shrinking text or targets. Reuse named control/text profiles; actual data dimensions retain their task-defined values.

## Task workflow

1. Read project instructions, the UI entry point, installed package.json, catalog.json and design.en.md. Check the project's persistent references described above when completing onboarding. Preserve unrelated work.
2. State the object, action, scope, current status and work to retain. Use relevant methods; cultural terms are not HTML roles or API names.
3. Load related resources from ai/v<installed-version>/en/components. actualExports and local declarations are authority. api is curated guidance. Missing signatures and provider requirements remain UNVERIFIED. Inspect example imports and optionalPeers.
4. Reuse current props and combinations. The library owns shared UI behavior, the project owns recipes/theme, the application owns permissions/drafts/requests/versions, and tooling owns facts/diagnostics. Do not copy foundation controls.
5. Implement normal, waiting, relevant failure/unknown, cancellation and return paths. Timeout does not prove a write failed. Confirm current objects and revisions. Cancellation requested differs from cancellation complete.
6. Run existing checks. Separate source, computed styles, interactions, accessibility and human visual judgment. Report PASS, FAIL, UNVERIFIED, NOT_RUN or justified N/A. Never relax tests or invent success.

Read [design-philosophy.en.md](design-philosophy.en.md) for methods and their sources; [the public guide](../design.en.md) for project adoption; [installation](v1.0.0/installation.md) for styles and dependencies; [the resource index](v1.0.0/en/llms.txt) for component constraints. Examples retain their authored language and local component state; they do not prove backend permissions, persistence, idempotency or cancellation.

Registry templates reference this exact package version. Check configured package access; never silently substitute latest. This skill grants no external-action authority and creates no runtime model service.
