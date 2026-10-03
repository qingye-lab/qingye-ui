# Qingye UI Design Guide

**Purpose first. Relationships guide the form. Fitness sets the measure.**

This guide helps people and AI make interface decisions. It explains how to name, organize, present, and support tasks. It is neither an API inventory nor a claim that every capability mentioned here is implemented. Read the types, documentation, and examples for the currently installed version before using a component.

Qingye UI draws methods from traditional Chinese thought, craft, and art. Culture informs concrete judgments; an interface need not use traditional patterns, antique typefaces, or a prescribed palette. Professional tools, content displays, and everyday applications can look different.

The design basis determines the goal; implementation choices serve it. Components in this library are original implementations written from this guide, `STANDARDS.md`, and the public APIs of accessibility primitives. Decide whether to use such primitives or another mature foundation by its actual capabilities. Replacing presentation does not require reinventing every basic interaction.

## Before designing

Establish these facts from the requirements and current project. Verify what can be found; ask only when missing information affects correctness.

- What the person needs to accomplish. Reading, comparing, creating, pausing, declining, and leaving can all be goals.
- The current object, action scope, and actual state; what counts as completion.
- What must appear together and what can be revealed on demand.
- Which inputs, selections, positions, and completed work must persist, and for how long.
- Available components, public compositions, project themes, and verification commands.

Extra buttons, deeper hierarchies, and cultural terminology cannot create a missing requirement.

## The order of decisions

Make every interface decision in this order, without skipping a step.

**Establish semantics, then relationships, then expression.** Semantics identify objects, actions, scope, and actual state. Relationships describe how content, actions, explanations, and safeguards support and constrain each other. Expression concerns surfaces, emphasis, dimensions, and motion. Choosing appearance before the first two steps treats design as decoration.

**Expression serves judgment; judgment serves the task.** Converge differences with no task basis; retain differences the task requires. A reference implementation, popular style, or personal preference cannot override that basis.

**Use composition before adding configuration, and reuse relationships before adding components.** Every prop, variant, or component introduces another decision. A design system removes decisions with no value rather than multiplying possibilities.

## Six methods

The methods guide judgment. They are neither style names nor requirements for every component. Ordinary components use relevant methods; a complete task checks all six questions. Their names are not HTML/ARIA roles or six theme parameters. The Chinese names remain the canonical terms for judgment.

| Method | English | Design decision | Avoid |
|---|---|---|---|
| 名实相符 | Semantic fidelity | Name the object, action, and consequence; express waiting, success, failure, and unknown results from actual events | Calling every action Confirm; announcing Saved when a request was only sent |
| 相成相制 | Mutual support and restraint | Let content, explanations, actions, and safeguards complete the task together; judge functional roles separately from visual emphasis | Fixed button hierarchies; weakening Stop during a failure; repeating warnings everywhere |
| 布白有用 | Purposeful space | Arrange relationship spacing, working capacity, and room for judgment separately; retain useful information density | Wrapping every section in a card; hiding comparison columns for whitespace; submitting examples automatically |
| 随境取度 | Contextual fitness | Choose emphasis, duration, and interruption for the task; preserve active work when changing layouts | Putting every error in a Toast or every result in a dialog; losing focus through rearrangement while typing |
| 展开有据 | Justified disclosure | Provide previews and deeper access for a reason, with direct arrival and a reasonable way back | Making frequent tasks require layered exploration; putting critical consequences only in a Tooltip; details with no return path |
| 进退相承 | Continuity of progress and retreat | Keep normal work, waiting, failure, uncertainty, cancellation, and recovery tied to the same object | Clearing drafts after failure; calling window closure successful cancellation; making completion depend on an animation |

Name what is true, let parts constrain each other, spend space on meaning, fit the context, disclose for a reason, and keep waiting, failure, cancellation, and recovery on one object. The English terms make the same reasoning readable; they do not replace the Chinese criteria.

## System layers

A component library is more than a set of components. Designers, developers, AI, and users must be able to act on the same judgments. Five responsibility layers determine whether something belongs to the library, project, or application, and the granularity at which it should be reused.

| Layer | Question | Contents | Owner |
|---|---|---|---|
| Foundation | Which decisions must not be casually violated? | Semantic tokens, typography roles, spacing, radii, surfaces, motion, density, direction, focus, and accessibility requirements | This library |
| Primitive | What is the smallest stable interaction meaning? | A unit that cannot be split further without breaking its interaction semantics; semantics, anatomy, behavior, state, accessibility, and composition entries together | This library |
| Pattern | How is a recurring user problem resolved? | A stable structure composed from primitives; it may include state progression, empty states, error recovery, and result presentation | The library supplies contracts; projects may implement specific compositions |
| Capability | How is a complete business capability formed? | Data, validation, business rules, and external systems | Project or product |
| Experience | Does it hold when everything appears together? | Real pages, data, density, errors, and action chains | Project or product, accepted with this library |

Ask whether a thing still makes sense without a business object. If it does, it belongs to Foundation, Primitive, or Pattern. Otherwise it belongs to Capability or Experience.

**The library contains no business logic:** it sends no requests, reads no routes, depends on no sessions, and determines no permissions. Capabilities need these responsibilities and belong elsewhere. Putting business states into styles or copying foundation controls between pages assigns ownership incorrectly.

Patterns are particularly valuable reusable assets. `Button`, `Select`, and `Dialog` continue to become commodities; how filters accumulate, stay visible, and clear, or how failed uploads recover, remains a design problem. A Pattern is still a reusable interaction structure, rather than a finished page for one requirement.

Complete criteria and current component ownership are in `docs/decisions/component-layering.md`.

## Executable protocols

The library provides source and rules that make design judgments queryable and actionable. People, AI, tests, and runtime behavior read the same facts. Each item is part of the protocol:

| Content | Purpose |
|---|---|
| Code | Actual implementation; the authority for facts |
| Tokens | Named entries for design decisions, rather than a table of color values |
| Semantic | Definitions of objects, actions, states, and consequences |
| Rules | When something is allowed or disallowed, with criteria |
| Contracts | Inputs, states, ownership, and accessibility contracts for components and patterns |
| Examples | Component states and simple compositions; no orchestrated business flows or invented data |
| Skills | Task entries and constraints for AI |
| Registry | An inventory and structure for distributed resources |
| Validation | Observed evidence for types, behavior, contrast, geometry, and human visual review |

**Machine-readable criteria matter more than interface prose.** A component reference must explain what it is, when to use it, when to avoid it, alternatives, states, state ownership, and failure modes. Listing a Dialog is insufficient; explain when another mechanism should replace it.

Protocols preserve human judgment. Rules describe actionable boundaries without replacing the understanding of a real task. When rules conflict, identify the difference and reconsider with this guide's methods instead of silently overriding them.

## Context

Defaults change with the situation; they are neither averages nor one strength applied everywhere.

| Situation | May change | Must remain |
|---|---|---|
| Reading becomes comparison | Side-by-side information, columns, content width | Object meaning and source |
| Normal work becomes failure | Feedback emphasis and recovery actions | Drafts, object identity, unaffected content |
| Pointer becomes touch | Hit areas and visible entries | Task and control semantics |
| Wide screen becomes narrow | Container, wrapping, selected summaries | Input, selected scope, clues for returning |
| A user chooses compact density | Relationship spacing and supporting information | Readability, focus, necessary explanations |
| Content needs comparison | Tables and juxtaposition | Required two-dimensional relationships |
| Content is independent | Cards and enclosure | Independent object boundaries |

随境取度 concerns context beyond responsiveness: viewport, available space, input method, keyboard, reduced motion, contrast, language, direction, content density, and user abilities. One intent may use a popup on desktop, a full-screen panel in a narrow space, and a compact entry in a dense interface. **Semantics, capabilities, and predictability must stay consistent.** A change of shape alone does not constitute adaptation.

## 君臣佐使: relationships among actions

This method describes actions within one interface. It is neither a global component taxonomy nor a naming requirement.

| Role | Meaning in the interface |
|---|---|
| 君 | The main intent of the current task |
| 臣 | Support for completing the main task |
| 佐 | Safeguards, exceptional conditions, risks, and corrections |
| 使 | Direction toward the next step and a way out |

For account deletion, deletion is 君; explaining the impact is 臣; danger notices, confirmation input, and irreversible consequences are 佐; cancel and return are 使. Check whether safeguards sit proportionately to the risk and whether the way out actually exists.

## Applying relationships to interfaces

The methods explain how to judge. These are the places those judgments affect an interface.

### Names and states

Use clear verbs and necessary objects. Distinguish saving a draft, publishing, archiving, removing from a collection, and permanently deleting. Bulk actions state their scope; confirmation concerns the current object, version, and changes.

Labels, explanations, examples, and errors each express their own facts. A placeholder cannot be a field's sole name. Unknown, inapplicable, empty, and zero must not merge for visual tidiness.

Let structure, content, and state explain what they can. Interface text identifies objects, explains necessary consequences, and supports correction and continuation. Remove repeated labels, obvious instructions, and descriptions of the interface's design. Avoid a paragraph for every control, section, or blank space. Reveal necessary help when needed and organize documentation for its reading task. Concision must retain field names, critical consequences, and error recovery.

Tabs switch panels, Select chooses a value, Menu runs commands, Progress expresses progress, and Meter expresses a measurement. Determine semantics before appearance.

States can coexist: selected and focused, expanded and invalid, loading and disabled. Explain precedence when they combine. Every state must answer: **who owns it, and what lets a user know it has actually happened?** Animation strengthens evidence; it cannot establish the fact.

| State ownership | Responsibility |
|---|---|
| Pointer, focus, pressed, open, temporary selection | Components and accessibility primitives |
| Selected, invalid, current item | Components, optionally controlled by the application |
| Loading, failure, empty, partial success | The application determines facts; components present them |
| Permissions, approval, versions, persistence | Application |

Components cannot infer facts they do not have. Clicking Save without an outcome fact cannot establish success.

### Space and surfaces

Group fields and actions around a shared task. Cards serve objects needing independent boundaries. Headings, alignment, and spacing can organize reading and settings. Open, enclosed, inset, and raised are choices, not four required new components.

Comparison retains necessary two-dimensional relationships. Compact density may tighten relationship spacing but cannot mechanically shrink text and touch targets. Empty states make an entry clear and yield when content arrives. Refreshes retain still-valid working space.

Use existing role tokens and layout compositions. Add a token only when a relationship needs independent adjustment and has a clear consumer. Structural `0`, percentages, `fr`, ordinary flex/grid, and actual data values do not require tokens.

### Emphasis and content

The core may be text, an image, data, an input area, or a safeguard. Set hierarchy for the current task while retaining necessary differences. Restraint does not mean every element must be faint; space does not mean every page must have low density.

Modern imagery and vivid expression are allowed. Check actual Chinese punctuation, mixed scripts, long labels, and font fallback. An antique typeface or one tracking rule cannot replace these checks.

### Change and recovery

Design slow responses, in-place errors, partial success, return, abandonment, and re-entry as well as the normal path. Express an unknown write outcome accurately, then verify or recover within the application's capabilities. Do not assume the server did nothing.

Define separate consequences for closing an interface, canceling editing, requesting background cancellation, and undoing a saved action. Sending a cancellation request does not confirm cancellation. When permissions are revoked or sensitive information is involved, identify work that must be cleared rather than retaining everything forever.

Motion explains actual changes and permits interruption. With reduced motion, names, states, inputs, and exits must remain usable.

### Visual character

Relationships carry the character without Chinese decoration. These are judgments rather than a style checklist: open content with bounded actions; breathing room between sections and tight relationships within groups; grouping through relationships rather than universal cards; square contours with moderated corners; scarce emphasis; motion that preserves position.

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

## Assigning changes

| Layer | Responsibility |
|---|---|
| Public component library | Component semantics, basic interactions, public anatomy, basic states, accessible behavior, and role tokens |
| Project design layer | Brand themes, recurring task compositions, third-party visual adaptation, and explicit project variants |
| Application | Routing, permissions, drafts, versions, asynchronous outcomes, saving, retrying, undoing, and persistence |
| Development tooling | Querying actual capabilities, locating ownership, diagnosing problems, and recording evidence |

Reuse current props and compositions first, then adjust the central theme or project compositions. Extend the shared implementation for actual public gaps. Avoid page copies of foundation controls and expecting a UI component to guarantee server idempotency or permission security.

Brand, appearance, and density are independent. A theme changes presentation without changing save policy, confirmation conditions, action scope, or permission. Shared component updates reach consumers through package upgrades.

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

<!-- qingye:project-adoption:en:start -->
## Continued use in a project

When adopting `@qingye/ui`, keep references to the methods and actual APIs in the project's `AGENTS.md` and `design.md` for later tasks. Merge these snippets into existing files, preserving rules and project facts and respecting permission to edit guidance. This guide does not authorize automatic edits to other repositories or file replacement. Find and record actual entries for the central theme, public compositions, and verification commands; state clearly when an entry does not exist.

If the installed package lacks this guide, save the download as `docs/qingye-design.md` and replace the guide paths below. Continue checking APIs against the installed package.

Project `AGENTS.md`:

```md
## Qingye UI

- Before interface work, read this project's design.md and node_modules/@qingye/ui/design.en.md. Use relevant methods to judge the task, semantics, structure, and states.
- Before implementation, check the installed @qingye/ui package.json, catalog.json, declarations, and related examples. Reuse shared interactive controls; the project owns themes and public compositions, and the application owns permissions, drafts, requests, and outcomes.
- Verify normal and relevant failure, cancellation, or recovery paths. Check keyboard access, names, contrast, narrow layouts, and long text according to impact. Report only observed checks.
```

Project `design.md`:

```md
## Qingye UI methods

Purpose first. Relationships guide the form. Fitness sets the measure. Use 名实相符 (semantic fidelity), 相成相制 (mutual support and restraint), 布白有用 (purposeful space), 随境取度 (contextual fitness), 展开有据 (justified disclosure), and 进退相承 (continuity of progress and retreat) from node_modules/@qingye/ui/design.en.md. Ordinary components use relevant methods; complete tasks check all six questions. The Chinese method names remain canonical.

Component capabilities come from the installed @qingye/ui catalog.json, types, and examples. Brand, appearance, and density are independent. Record actual entries for the central theme, public compositions, and verification commands here, and keep them current.
```

After upgrades, read the installed guide and declarations again. Website resources help discovery but cannot replace local version facts. Other stacks may save this guide in project documentation and apply its methods, but must verify platform semantics separately; these React APIs cannot be assumed to apply.

<!-- qingye:project-adoption:en:end -->

## Giving a task to AI

Establish the project references above before giving a specific task to AI. When using `@qingye/ui`, supply the installed version or allow it to read that version from the project.

```text
Complete this interface task from design.md while following the project's collaboration rules.
Read the current implementation, component APIs, theme entry, and public compositions before deciding changes.
Design around real objects, action scope, state owners, and work that must remain available.
Connect normal work, failure, cancellation, and return into a complete task; use relevant design methods.
Implement and verify within the authorized scope, and report ownership, actual evidence, and unverified areas.
```
