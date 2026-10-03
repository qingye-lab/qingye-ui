# Accordion

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/accordion
Source: packages/ui/src/components/accordion.tsx
Source SHA-256: ad50046eae1b5b374b3da1dc03c19042c1a9453c2f4ca9c521f387aec6599370

Reveal content from each item's named trigger.

## Decision
Keep heading, trigger and content related to the same item; closing neither removes inputs nor declares business cancellation.

## Notes
- Names must identify the content being disclosed.
- Use Collapsible for a single section. Hidden content does not imply reading or completion.
- keepMounted retains actual form fields; the application determines whether hidden fields are disabled.

## Use and ownership
- A finite group of content needs deliberate disclosure.
- Avoid: Putting the only critical consequence in initially hidden content.
- Library: Expansion state, ARIA associations, and primitive keyboard behavior.
- Application: Item content, stable identifiers, inputs, and business facts.

## Composition
- Item contains Header/Trigger and Panel; the default Trigger uses Button.

## Responsive behavior
- Long names and content wrap instead of being cut by a fixed height.

## Customization
- Existing field gaps and text roles; motion.css owns entry and exit.

## Current exports
- Accordion: function; owner accordion; PASS; props: AccordionPrimitive.Root.Props<Value>
- AccordionHeader: function; owner accordion; PASS; props: AccordionPrimitive.Header.Props
- AccordionItem: function; owner accordion; PASS; props: AccordionPrimitive.Item.Props
- AccordionPanel: function; owner accordion; PASS; props: AccordionPrimitive.Panel.Props
- AccordionPrimitive: reexport; owner accordion; UNVERIFIED
- AccordionTrigger: function; owner accordion; PASS; props: AccordionPrimitive.Trigger.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Accordion
Expansion state and retention policy for one group.
- value / defaultValue / onValueChange: AccordionPrimitive.Root.Props. Application-controlled or primitive-owned expanded items; the event can be canceled.
- multiple: boolean; default false. Allow several items to remain expanded together.
- keepMounted: boolean; default true. Retain closed content and native fields; explicitly opt out when removal is required.
- disabled: boolean. Disable the whole group.

### AccordionItem
One item's identity and disabled state.
- value / disabled: AccordionPrimitive.Item.Props. A stable item identifier and per-item disabling.

### AccordionHeader / AccordionTrigger / AccordionPanel
Native heading, Button composition, and associated content. Forward render, refs, events, and state className. The caller sets the heading level through render.

## Keyboard
- Enter / Space: Toggle the current item.
- Tab / Shift+Tab: Reach enabled triggers and controls in expanded content.

## Source examples
### 展开与禁用
Source: apps/docs/src/content/accordion/demos/01-states.tsx
```tsx
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionTrigger } from "@qingye/ui/components/accordion";
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
export const meta = { title: "展开与禁用", titleEn: "Open and disabled" };
export default function AccordionDemo() {
  return <Accordion multiple defaultValue={["first"]} className="w-full max-w-sm">
    <AccordionItem value="first"><AccordionHeader render={<h4 />}><AccordionTrigger>第一项</AccordionTrigger></AccordionHeader><AccordionPanel><Label htmlFor="accordion-value">输入</Label><Input id="accordion-value" defaultValue="" /></AccordionPanel></AccordionItem>
    <AccordionItem value="second"><AccordionHeader render={<h4 />}><AccordionTrigger>第二项</AccordionTrigger></AccordionHeader><AccordionPanel>第二项内容</AccordionPanel></AccordionItem>
    <AccordionItem value="disabled" disabled><AccordionHeader render={<h4 />}><AccordionTrigger>禁用项</AccordionTrigger></AccordionHeader><AccordionPanel>禁用项内容</AccordionPanel></AccordionItem>
  </Accordion>;
}
```
