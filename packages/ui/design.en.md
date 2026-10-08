# Qingye UI Design Guide

**Purpose first. Relationships guide the form. Fitness sets the measure.**

This guide helps people and AI make interface decisions. It explains how to name, organize, present, and support tasks. It is neither an API inventory nor a claim that every capability mentioned here is implemented. Read the types, documentation, and examples for the currently installed version before using a component.

Qingye UI takes its methods from Chinese classics and Eastern aesthetics: philosophy orders judgments, craft supplies a system of measure, and calligraphy, painting, and gardens supply the handling of density, ink, line, and placement. **Take the method, not the motif.** Culture informs concrete judgments; interfaces use no traditional patterns, antique typefaces, seals, scrolls, or similar decoration. Professional tools, content displays, and everyday applications can look different.

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

**Use composition before adding configuration, and reuse relationships before adding components.** Laozi: "With little, one gains; with much, one is confused." Every prop, variant, or component introduces another decision. A design system removes decisions with no value rather than multiplying possibilities.

**Substance and form in balance (文质彬彬).** Semantics and relationships are substance; expression is form. The Analects: "When substance exceeds form, the result is crude; when form exceeds substance, the result is clerical." Correct semantics with rough form, and refined appearance with false states, are equally unfinished. Each side has its methods: substance follows the six methods of use, form follows the nine methods of expression. Judge them separately; neither substitutes for the other.

## Principles and sources

| Principle | Source | Meaning |
|---|---|---|
| Purpose first (器用为本) | *Book of Changes*: "What is below form is called the vessel"; *Kaogongji* judges a vessel by whether it is good | A component is a vessel; its use comes first. Without semantics, states, and reachability, form is not discussed |
| Relationships guide the form (关系为法) | Laozi: "Being and nonbeing produce each other … long and short shape each other, high and low lean on each other" | Size, weight, and density exist only by comparison. To bring one thing forward, first quiet what surrounds it rather than amplifying it further |
| Fitness sets the measure (合宜为度) | *Kaogongji*: "Heaven has its seasons, earth its energies, materials their beauty, craft its skill; combine these four and the work is good"; *Yuanye*: "skill in borrowing, precision in fitness" | Quality means fitting context, environment, medium, and craft, not exhausting every means. Components inherit density, appearance, direction, and language from their surroundings instead of requiring per-call configuration |

A traditional method enters this guide only when it meets three conditions: **a source**, an identifiable text or recognized technique; **generation**, it makes a judgment or determines a class of values; **a test**, an observable criterion. Anything missing one is excluded. Not borrowed: traditional patterns as decoration, antique or calligraphic typefaces for interface text, seals, scrolls, paper textures, palettes justified by the five phases or directions, and vertical text unless the content itself is vertical.

## Six methods of use

The six methods of use address semantics, relationships, and tasks. They guide judgment; they are neither style names nor requirements for every component. Ordinary components use relevant methods; a complete task checks all six questions. Their names are not HTML/ARIA roles or theme parameters. The Chinese names remain canonical.

| Method | Source | Design decision | Avoid |
|---|---|---|---|
| 名实相符 Semantic fidelity | Analects: "If names are not correct, language will not accord" | Name the object, action, and consequence; express waiting, success, failure, and unknown results from actual events | Calling every action Confirm; announcing Saved when a request was only sent |
| 相成相制 Mutual support and restraint | *Suwen*: sovereign, minister, assistant, envoy | Let content, explanations, actions, and safeguards complete the task together; judge functional roles separately from visual emphasis | Fixed button hierarchies; weakening Stop during a failure; repeating warnings everywhere |
| 布白有用 Purposeful space | Laozi: "Where the room is empty lies its use" | Arrange relationship spacing, working capacity, and room for judgment separately; retain useful information density | Wrapping every section in a card; hiding comparison columns for whitespace; submitting examples automatically |
| 随境取度 Contextual fitness | *Doctrine of the Mean*: "the noble person is timely in the mean" | Choose emphasis, duration, and interruption for the task; preserve active work when changing layouts | Putting every error in a Toast or every result in a dialog; losing focus through rearrangement while typing |
| 展开有据 Justified disclosure | Garden framing, borrowed views, and changing views with each step | Provide previews and deeper access for a reason, with direct arrival and a reasonable way back | Making frequent tasks require layered exploration; putting critical consequences only in a Tooltip; details with no return path |
| 进退相承 Continuity of progress and retreat | *Book of Changes*: "knowing advance and retreat, survival and loss, without losing what is right" | Keep normal work, waiting, failure, uncertainty, cancellation, and recovery tied to the same object | Clearing drafts after failure; calling window closure successful cancellation; making completion depend on an animation |

## Nine methods of expression

The nine methods of expression address measure, ink, line, shape, placement, surface, and motion: the third step in the order of decisions. They determine where a class of values comes from rather than only suggesting a style. Concrete values live in the foundation layer with their sources.

| Method | Source | Design decision | Avoid |
|---|---|---|---|
| 以材为祖 Module as ancestor | *Yingzao Fashi*: "All building begins from the cai module" | Derive all geometry from one base measure: the module is one line of body text; the unit divides it. Size steps and density change only the grade, scaling parts together | A separate size table per control; enlarging a container and the type of its content with it |
| 疏密有致 Ordered density | Deng Shiru: "Where sparse, a horse may run; where dense, no wind passes; count the white as black" | Spacing is the first means of grouping: tight within groups, looser between them, looser still between sections, with steps that read at a glance. Space is composed as carefully as ink | Evenly distributed spacing; lines and cards repairing groups that spacing should express |
| 墨分五色 Five tones of ink | Zhang Yanyuan: "Handle ink and the five colors are present"; Xie He: "apply color by category" | One limited neutral ink ladder carries the hierarchy of text, lines, and surfaces. Hue is applied only by semantic category; a brand accent acts like a seal, rare and specific | Extra grays outside the ladder; hue used as decoration or to separate things without meaning |
| 骨法用笔 Bone method of the brush | Xie He: "bone method in using the brush" | Lines are structure: draw one only where a surface cannot mark a boundary. Use one line weight; emphasize by deepening ink, not thickening. One boundary mechanism per region | Outlining a filled shape; thickened or outward focus rings; line, fill, and shadow restating one boundary |
| 应物象形 Form follows the object | Xie He: "correspond to the object in depicting form" | Square for things that carry work: actionable and editable regions are square with eased corners. Round for points and identities only. Equal insets of one contour stay concentric | Arbitrary radii; nonconcentric rounds inside square contours; new shapes expressing state |
| 经营位置 Composition of placement | Xie He: "planning placement"; calligraphic layout and line flow | Establish priority through position and space before size and ink. One sovereign per view. Items in a row share height and baseline; edges fall on few alignment lines | Building emphasis by piling color and size; uneven control heights within a row |
| 绘事后素 Plain ground before color | Analects: "Painting comes after the plain ground" | A plain ground first, color after. Surfaces stay clean, without decorative gradients, textures, or highlights. Shadows express actual elevation only; normal states carry no factless gray fill | Shadows within one plane; gray fills on normal states; texture standing in for proportion |
| 气韵生动 Resonant vitality | Xie He: "resonance of spirit, vitality of movement" | Motion keeps its place: it begins where the change happens, shows origin and destination, and can be interrupted. Similar changes share one rhythm so the whole reads as continuous | Decorative motion unrelated to position; similar transitions with unrelated durations |
| 材有美 Respect the material | *Kaogongji*: "materials have their beauty" | Work with the medium: geometry on whole pixels; system fonts by default so Latin and Chinese faces pair; preserve native platform behavior; check Chinese typesetting with real punctuation and mixed scripts | Half-pixel edges and blurred lines; an added Latin face producing two x-heights in one line; overriding platform accessibility |

**The house has grades; people do not.** The module system grades buildings while their occupants keep their height. Size steps and density change the grade of controls and spacing; the content text people read is set by reading needs and does not scale with its container. A button's name is part of the button and may follow its grade; input values, options, and body text are content and do not.

The quality of a foundation is measured by its number of free values. People choose the module, the unit, and a few ratios; every other dimension should be expressible through them, with the relationship that sets each coefficient. A value without such a relationship can only be recorded as a preset and should converge over time.

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
| A user chooses compact density | Relationship spacing, control heights and padding, supporting information | Content type size, readability, focus, touch targets, necessary explanations |
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

A view has one 君. Its position and surrounding space establish it first (composition of placement); size and ink reinforce it. Two equally emphasized entries side by side mean the main intent is not yet decided.

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

Relationships carry the character without Chinese decoration; the methods are the nine methods of expression. In an interface they read as open content with bounded actions; tight groups with generous space between them; grouping by spacing rather than universal cards; hierarchy by ink tones with rare hue; square contours with eased corners; states that change only existing properties; motion that keeps its place.

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
| NG9 | Express state by adding shape: outward focus rings, thickened borders, dimensions that change with state | The element's outer edge or dimensions differ before and after the state change |
| NG10 | Use hue without a semantic category | Removing the hue loses none of danger, warning, success, information, a data series, or brand |
| NG11 | Mark one region with more than one mechanism | Removing one of line, fill, or shadow leaves the region equally clear |
| NG12 | Decorative surfaces: gradients, textures, shadows within one plane | Removing them leaves understanding, layering, and operation unchanged |

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

**7. Grayscale.** In grayscale, hierarchy and states remain readable; no state depends on hue alone.

**8. Density.** With every line and fill removed, groups remain readable; spacing widens step by step within groups, between groups, and between sections, and one relationship uses one spacing value across the library.

**9. Line flow.** Items in one row share outer height and text baseline; a block's alignment lines are countable and few.

**10. Module.** Every dimension is expressible through the module and unit, with the relationship that sets its coefficient; every value records its source as anchor, derivation, or ruling. *Book of Rites*: "Inscribe the maker's name on the object, to examine its sincerity."

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

<!-- qingye:project-adoption:en:end -->

## Giving a task to AI

Establish the project references above before giving a specific task to AI. When using `@qingye_lab/ui`, supply the installed version or allow it to read that version from the project.

```text
Complete this interface task from design.md while following the project's collaboration rules.
Read the current implementation, component APIs, theme entry, and public compositions before deciding changes.
Design around real objects, action scope, state owners, and work that must remain available.
Connect normal work, failure, cancellation, and return into a complete task; use relevant design methods.
Implement and verify within the authorized scope, and report ownership, actual evidence, and unverified areas.
```
