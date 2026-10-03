# Tabs

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/tabs
Source: packages/ui/src/components/tabs.tsx
Source SHA-256: 070f5fc49f3a258a15676a612d2ff2a27d9f55b9abbce0add1b59770e46ff127

Different views of one object with panel drafts retained.

## Decision
Manual activation and mounted panels are defaults; switching views does not approve or save a draft.

## Notes
- Hidden panels remain mounted but leave the accessibility tree; switching is never reported as saving.

## Use and ownership
- Multiple views of one object need editing continuity.
- Avoid: Use Steps for progression and links for actual destinations.
- Library: Tab associations, keyboard, and panel visibility.
- Application: value, drafts, saving, and approval.

## Composition
- Tabs / TabsList: The current view and a manually activated list.
- TabsTab: A tab associated with a panel.
- TabsPanel / TabsPrimitive: A tabpanel and public primitives.

## Responsive behavior
- Keep actual desktop structure; menus fit available space and tables retain complete comparison columns.

## Customization
- Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset.

## Current exports
- Tabs: function; owner tabs; PASS; props: TabsProps
- TabsList: function; owner tabs; PASS; props: TabsListProps
- TabsListProps: type; owner tabs; PASS
- TabsPanel: function; owner tabs; PASS; props: TabsPanelProps
- TabsPanelProps: type; owner tabs; PASS
- TabsPrimitive: reexport; owner tabs; UNVERIFIED
- TabsProps: type; owner tabs; PASS
- TabsTab: function; owner tabs; PASS; props: TabsTabProps
- TabsTabProps: type; owner tabs; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Tabs / TabsList
The current view and a manually activated list.
- value / defaultValue / onValueChange / orientation: Base UI Root props. The application or primitive owns the value; cancellation prevents a switch.
- activateOnFocus: boolean; default false. Focus movement does not activate by default; consumers may explicitly opt in.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### TabsTab
A tab associated with a panel.
- value / disabled: Base UI Tab props. Value is stable; disabled tabs may receive focus but cannot activate.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### TabsPanel / TabsPrimitive
A tabpanel and public primitives.
- value / keepMounted: Base UI Panel props; default keepMounted=true. Mounted panels retain input by default; applications own the effects of false.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

## Keyboard
- ← / → / Home / End: Move tab focus.
- Enter / Space: Manually activate an enabled tab.

## Source examples
### 同一条目的两个视角
Source: apps/docs/src/content/tabs/demos/01-task.tsx
```tsx
import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye/ui/components/tabs";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "同一条目的两个视角", titleEn: "Two views of one item" } satisfies DemoMeta;
export default function Demo() { return <Tabs defaultValue="text"><TabsList aria-label="条目视角"><TabsTab value="text">名称</TabsTab><TabsTab value="facts">事实</TabsTab><TabsTab value="unused" disabled>历史</TabsTab></TabsList><TabsPanel value="text"><Field><FieldLabel>名称草稿</FieldLabel><Input defaultValue="条目 A" /></Field></TabsPanel><TabsPanel value="facts"><dl className="m-0 text-body"><dt>标识</dt><dd className="m-0">a</dd><dt>数量</dt><dd className="m-0">0</dd></dl></TabsPanel></Tabs>; }
```
