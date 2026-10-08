# Qingye UI Design Philosophy

## Culture as a method of design

**Start with use, design through relationships, and judge fitness in context.**

## Begin with use

Qingye UI addresses a concrete question: how can digital interfaces carry human purposes more clearly? People come to read, express, compare, and decide. They also hesitate, change their minds, and encounter errors. Design should give these real actions an appropriate place.

We take our methods from Chinese classics and Eastern aesthetics. Philosophy orders our judgments; the craft of building supplies a system of measure; calligraphy, painting, and gardens supply the handling of density, ink, line, and placement. Culture participates in design decisions, rather than merely explaining a finished interface.

We take the method, not the motif. No cloud patterns, lattice windows, seals, or antique typefaces appear in the interface. What tradition leaves us is how an object serves its use, how dimensions form a set, how ink creates layers, and how empty space is composed. We select what is relevant to contemporary digital life and translate it into methods people can understand, discuss, and test today.

## Substance and form

The Analects say: “When substance exceeds form, the result is crude; when form exceeds substance, the result is clerical. Only when form and substance are in balance is one a person of quality.” 〔8〕

Interfaces have substance and form too. Accurate names, truthful states, and recovery after failure are substance. A consistent system of measure, layered ink, and lines and spaces each in their place are form. With substance alone, an interface works but feels rough; with form alone, it looks refined but tells untruths.

The methods therefore form two groups. The six methods of use address tasks and semantics; the nine methods of expression address measure and form. Each group is judged separately; neither substitutes for the other.

## Build a whole through relationships

Two buttons relate through more than primary and secondary emphasis: they may advance an action and protect the person taking it. Space and content relate through more than size: space can hold expression or distinguish groups. A process relates to what precedes and follows it through confirmation, return, and continuation as well as sequence.

The Laozi says that “long and short shape each other; high and low lean on each other.” Size, weight, and density exist only by comparison. Qingye UI develops its design through these relationships: to bring one thing forward, first quiet what surrounds it rather than amplifying it further.

---

## 01  名实相符 — Names match what is real

A name is first a promise. It tells people what they face, what action they can take, and what the action will produce. We draw on the concern of “rectifying names” for the relationship between names and their referents, applying it to accurate interface expression. 〔1〕

“Save draft” and “Publish” should not both become “Confirm” merely because they occupy the same button position. “Waiting,” “In progress,” and “Completed” are not interchangeable either. Wording should change with the actual state, without announcing a result before it is known.

Consistency does not mean mechanically using the same word everywhere. Within one context, use stable names for the same objects and actions. Where a real difference exists, make it visible.

Naming is therefore part of designing a component's responsibility, states, and operation, rather than a final embellishment.

## 02  相成相制 — Parts support and constrain each other

The “chief, deputy, assistant, and envoy” roles of traditional prescription composition suggest that relationships involve assistance, constraint, and coordination as well as strength. We borrow this view of interaction, without turning the traditional roles directly into four interface levels. 〔2〕

Around a task, some elements help complete it, some help explain it, some protect people from unintended consequences, and some preserve continuity. Text, controls, structure, or feedback may carry these responsibilities; there is no required number of buttons.

Protection is not inherently secondary. When something goes wrong, “Stop” may deserve more emphasis than “Continue.” During reading, the body text may matter more than any button. Responsibility and prominence require separate judgments.

A view has one chief. Two equally prominent entries side by side mean the main intent has not yet been decided.

## 03  布白有用 — Space serves a purpose

The Laozi uses the hub of a wheel, a vessel, and doors and windows to show that “where the room is empty lies its use.” Empty space has its purpose. 〔3〕

Empty space has different responsibilities in an interface. Gaps make relationships legible; inputs hold a person's expression; a canvas leaves room for content and action; an unmade choice leaves room for judgment. Emptiness is not always a defect for the system to eliminate quickly.

Space does not require an airy layout everywhere. Data for comparison can be dense, while separate tasks can stand farther apart. How space is graded and grouped is described under “Ordered density” below.

Necessary labels, entry points, and guidance should remain. Leaving space invites use; it should not leave people unable to begin.

## 04  随境取度 — Judge fitness in context

The idea of acting appropriately to the time and circumstances inspires a contextual understanding of fitness. It neither asks us to average every expression nor requires every interface to be understated. 〔5〕

Reading needs sustained, comfortable space; comparison needs information present together; routine completion can receive quiet feedback; a problem that could cause significant loss needs clear intervention. The appropriate degree depends on the task, state, and conditions of use.

One design language can therefore serve both compact work interfaces and spacious reading or presentation. High density need not create high noise, and a strong warning need not make an entire page loud.

Adjustments need a reason and should not interrupt work already underway. An interface should not suddenly move while someone types merely to demonstrate “adaptation.”

---

## 05  展开有据 — Disclosure has a reason

Framing, borrowing views, separation, and openness in gardens let people see different relationships from different positions. We draw on the relationship between parts and the whole, without making everyday actions into a winding tour. 〔6〕

Details open from an identifiable object; previews help people decide whether to go deeper; current work remains connected to necessary context. Information is layered to reduce the immediate burden, rather than to create mystery.

Frequent tasks need direct access. Important consequences should appear before a decision. Familiar paths should allow direct arrival. Progressive disclosure and direct access can coexist.

Entering a part should not erase the whole. After returning, people should still understand where they came from and what they just handled.

## 06  进退相承 — Carry continuity through change

The Book of Changes speaks of “knowing advance and retreat, survival and loss, without losing what is right.” We borrow the view that advancing and retreating are equally legitimate and connected: continuing, pausing, returning, and refusing are all actions a person may need. 〔7〕

Validation after input, waiting after submission, and correction after failure should concern the same piece of work. A failure should not arbitrarily erase earlier effort; returning should not force someone to find the context again.

Motion explains real changes. Relationships should hold without animation, and states should remain understandable when animation is disabled. Smoothness comes from continuity of logic and position as well as visual movement.

We want interfaces that make progress easy and allow people to stop with dignity. Efficiency includes completing a task and changing a decision promptly when it proves unsuitable.

---

## 07  以材为祖 — The module as ancestor

The Song dynasty building standard Yingzao Fashi states: “All building begins from the cai module.” A whole building fixes one base measure, the cai, and writes the dimensions of every member as a number of its fen units. Buildings fall into eight grades; changing the grade changes only the size of the module, while proportions between members stay the same. 〔9〕

An interface's module is one line of body text. People read text, so control heights, padding, spacing, corner radii, and markers all derive from that line and its unit. Size steps and compact density only change the grade: parts change together rather than being adjusted one by one.

The module system carries a further idea: a building has grades, but the people inside it keep their height. Controls and spacing may change with the grade; the content people read is sized for reading and does not grow or shrink with its box. A button's name is part of the button and may follow its grade; input values, options, and body text are content and stay at body size.

A system of measure is judged by how many of its values are set without a relationship. The fewer there are, the more one change carries through the whole, and the less styles drift apart.

## 08  疏密有致 — Ordered density

Deng Shiru said of calligraphy: “Where sparse, a horse may run; where dense, no wind passes; count the white as black, and wonder appears.” Da Chongguang wrote: “Empty and solid produce each other; where nothing is painted, the scene is complete.” 〔4〕

Space is composed as carefully as ink, and sparse and dense must stand clearly apart. In an interface, spacing is the first means of grouping: tight within a group, looser between groups, looser still between sections, with each step visible at a glance. What spacing can separate needs no extra line or card.

Evenly distributed spacing means no grouping. With every border and fill removed, an interface's groups should still be readable.

## 09  墨分五色 — Five tones of ink

Zhang Yanyuan wrote: “Handle the ink and the five colors are present.” With one ink, tone alone separates near and far, main and secondary, and texture. Xie He's six principles add “apply color according to category”: color follows the kind of thing it depicts. 〔10〕〔11〕

Qingye UI carries its hierarchy with one limited neutral ink ladder. Text, lines, and surfaces all take their color from it; adjacent steps remain distinguishable, and no grays are invented outside it. Hue expresses only facts with a category: danger, warning, success, information, and data series.

A brand may have one accent color, used like a seal on a painting: in few places, over small areas, with clear meaning. Without a brand color, emphasis is the deepest step of ink.

In grayscale, hierarchy and states should remain readable.

## 10  骨法用笔 — The bone method of the brush

The second of Xie He's principles is “the bone method in using the brush”: lines are structure, and every stroke carries something. 〔11〕

A line appears in an interface for one reason: a surface cannot mark the boundary. A filled button needs no outline; an input that shares the white of its surroundings uses a line to mark where editing happens. One region uses one mechanism; line, fill, and shadow do not restate the same boundary.

Line weight stays uniform, and emphasis comes from deepening the ink rather than thickening the stroke. Focus, errors, and selection only darken an existing line. No ring is drawn outside the control, and its dimensions do not change between states.

## 11  应物象形 — Form follows the object

“Correspond to the object in depicting form”: shape follows the nature of the thing. 〔11〕

Regions for acting and editing are places of work; their contours are square with eased corners. Only things that mark a point or an identity, such as status dots, avatars, and radio marks, are round. When one contour is inset by an equal distance, the inner corner shrinks with the outer one, keeping them concentric.

A state changes properties the shape already has: tone, fill, position. It does not add a new shape.

## 12  经营位置 — Composition of placement

“Planning placement” is the principle of composing a picture. Calligraphy speaks of line flow: within a line, each character answers the last, and energy passes from one line to the next. 〔11〕

Priority comes first from position and space, then from size, ink, and fill. A view's chief should be the first thing seen by position alone. Inputs, buttons, and segmented controls in one row share their height, and their text sits on one baseline; left and right edges fall on a few alignment lines. Composition must hold when text grows, languages change, or content is enlarged.

## 13  绘事后素 — A plain ground before color

Confucius said that “painting comes after the plain ground.” Zhu Xi explained this as laying a clean ground before applying color. 〔12〕

An interface begins with a plain ground. Surfaces stay clean, without decorative gradients, textures, or highlights. Shadows express actual elevation only, such as a popup lying over content; things on one plane receive no shadow. Normal states carry no gray fill: gray is a step of ink and needs a fact to express.

Quality comes from proportion and material, not added ornament.

## 14  气韵生动 — Resonance and vitality

“Resonance of spirit, vitality of movement” heads the six principles: the parts of a picture pass into one whole, with breath and rhythm. 〔11〕

Motion in an interface keeps its place. It begins where the change happens, shows where it comes from and where it goes, and can be interrupted. Similar changes share one rhythm, and similar lists share one row spacing, so the whole reads as one thing rather than a pile of parts. Outcomes never depend on an animation finishing, and everything holds with motion turned off.

## 15  材有美 — Respect the material

The Kaogong Ji says: “Heaven has its seasons, earth its energies, materials their beauty, craft its skill; combine these four and the work is good.” 〔13〕

The screen has its own material: pixels, system fonts, input methods, and platform behavior. Geometry falls on whole pixels so lines stay crisp. System fonts are the default, so Chinese and Latin faces are designed as a pair and one line carries one weight and gray. Native platform behavior and accessibility are preserved. Chinese typesetting is checked with real punctuation, mixed scripts, and long words rather than settled by one tracking rule.

---

## In components

Buttons name actions and consequences clearly, with prominence appropriate to the current task; their height derives from one line of body text and matches the inputs in the same row. Input areas leave room for expression, while labels, descriptions, and errors have distinct places; on focus the edge darkens without spreading or thickening.

Tables keep comparison content visible together, without manufacturing density by continually shrinking text. Grouping starts with spacing, and cards enclose content only when it represents an independent object. The ink ladder carries hierarchy; hue appears only where a state is real.

Dialogs concern a specific matter and state its object, impact, and choices. A dialog lies over content and therefore casts a shadow. Necessary warnings should not disappear into a fleeting notification; a lightweight result need not become an interruption.

## Across a complete task

Consider editing information: a person enters a detail view from a list and sees which object they are editing; relevant comparison information remains accessible. After a change, saving and discarding have distinct meanings. If saving fails, the input remains and the problem is explained nearby. When the work ends, the person can return to its original context.

This process can express naming, cooperation, space, proportion, disclosure, and continuity without relying on traditional ornament, while its measure, ink, lines, and placement follow the nine methods of expression. The refinement of individual components and their ability to complete a task together require joint judgment.

## Across different products

The same methods do not require the same appearance. Content presentation may use striking images; professional tools may hold dense information; everyday applications may feel lighter. A brand may bring its own accent color and typeface, and the module may change grade; understandable relationships stay the same.

Clarity, readability, and operability are prerequisites for expression. Culture is no reason to lower them, and people should not need cultural terminology to have a good experience.

---

## 静 · 疏 · 序 · 和 · 含 · 韧

Quietness reduces competition unrelated to the task without leaving the system unresponsive. Spaciousness separates relationships where needed, alongside organized density. Order lets names, positions, and actions create expectations without forcing every task onto one path.

Harmony coordinates parts while retaining necessary differences. Reserve presents information in layers with discoverable entry points, without hiding important facts. Resilience carries change and unexpected events, leaving room to continue, correct, or leave.

These six words describe experiences we hope to achieve, rather than an appearance template. An interface need not express every quality at once, and should not sacrifice its practical use for one of them.

## Culture continues through method

Tradition gives us starting points for thought, rather than answers exempt from examination. Every method taken from tradition must meet three conditions: it has an identifiable source, it makes a decision in the interface, and it can be tested. However appealing, a method that fails any of them is not adopted.

Qingye UI is concerned with whether these ideas make a name more accurate, a set of actions more complete, a space more useful, a system of measure more consistent, or a change easier to understand, rather than whether people can identify a cultural symbol.

When culture participates in these concrete judgments, it lives in the relationship between people and tools as well as in an interface's appearance.

## Qingye UI

Begin with use, build order through relationships, and leave room for people.

## Bring the methods into everyday project work

The [design guide](/design.en.md) turns these methods into concrete design judgments. [Project adoption and AI use](/docs/ai#project-rules) provides references that can be merged into existing AGENTS.md and design.md files, so relevant tasks begin with project constraints, the installed version, and actual state. Downloading a file alone does not configure a tool.

---

## About contemporary translation

The method names and digital interface examples in this document are Qingye UI's contemporary design expressions. The sources cited in the notes identify intellectual references; they do not suggest that classical texts directly prescribed modern interface rules or establish that these rules have been validated through use.

“Start with use” draws on the Kaogong Ji in the Rites of Zhou and its joint consideration of material, craft, and surrounding conditions. We take inspiration related to fitness for use, without treating it as a summary of all Chinese tradition.

## Brief source notes

〔1〕Analects, Book 13, Zilu, chapter 3. “Rectifying names” has its own original context; we draw on the need for an explainable and actionable relationship between a name and what it refers to.

〔2〕Nanjing University of Chinese Medicine Museum, “君臣佐使” (2023). The original concept concerns principal treatment, assistance, constraint, guidance, and coordination. We borrow its cooperative relationships without constructing four levels of controls.

〔3〕Laozi, chapters 2 and 11. The former concerns the mutual arising of presence and absence and the mutual shaping of long and short; the latter explains use through empty space in objects. We distinguish relational gaps from space available for use.

〔4〕Deng Shiru as recorded in Bao Shichen, Yizhou Shuangji, “Shu Shu, Part One,” with reference to Shi Zhewen, “ ‘计白当黑’: 邓石如的书、印、诗,” Guangming Daily (2019); Da Chongguang, Huaquan. We take the method of graded density without reproducing its rhetoric of extremes.

〔5〕The phrase “君子而时中” in the Doctrine of the Mean in the Book of Rites, and related explanations in Zhuzi Yulei, volume 63. We draw on contextual fitness, without reducing the Doctrine of the Mean to an adaptive interface.

〔6〕Shanghai Municipal Landscaping and City Appearance Administrative Bureau, “中国古典园林的造园手法” (2023). We borrow contextual organization without treating concealment and winding paths as universal interaction goals.

〔7〕Book of Changes, Qian, “Wenyan.” We take only the idea that advance and retreat are equally legitimate and continuous.

〔8〕Analects, Yong Ye. We use substance and form to refer to semantics and expression, without its original judgment of character.

〔9〕Li Jie, Yingzao Fashi, volume 4, “Major carpentry, part one: the cai module.” We borrow the modular relationship among module, unit, and grade, not its specific proportions.

〔10〕Zhang Yanyuan, Lidai Minghua Ji, volume 2. “Five tones of ink” is a later summary of the idea.

〔11〕The six principles in the preface to Xie He's Guhua Pinlu. We adopt resonance, bone method, correspondence to the object, color by category, and placement. “Transmission by copying” concerns copying models and conflicts with this library's rule against basing work on existing implementations, so it is not adopted.

〔12〕Analects, Ba Yi, with Zhu Xi's commentary that the plain ground comes first.

〔13〕Rites of Zhou, Kaogong Ji. We take the phrase “materials have their beauty” as a requirement to design with the nature of the screen.

*Design philosophy, third edition · October 2026. The document version is not the software version.*
