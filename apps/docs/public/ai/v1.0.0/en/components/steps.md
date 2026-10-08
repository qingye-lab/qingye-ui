# Steps

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/steps
Source: packages/ui/src/components/steps.tsx
Source SHA-256: 9620517d67de460eb5986d9eb8a445c6f41a7b4bad8d7316f6c38ab874df9495

An ordered process with application-owned progress.

## Decision
Order does not establish completion. Every state is explicit; only current receives aria-current=step.

## Notes
- Do not automatically complete earlier items from a current index.

## Use and ownership
- A process has an explicit order and actual states.
- Avoid: Use Timeline for events and navigation links for peer page destinations.
- Library: Order semantics, visible state names, and current-step markers.
- Application: Each step's completion, current position, errors, and recovery actions.

## Composition
- Steps: A named ordered list.
- Step: A li with state independent of preceding positions.
- StepTitle / StepDescription: div / p content slots.

## Responsive behavior
- Content stacks and wraps without hiding states.

## Customization
- Use the current props and composition first, then adjust the project's central theme; fix shared gaps in the public library.
- Configure brand, light or dark mode, and density separately; themes do not change permissions or save policies.

## Current exports
- Step: function; owner steps; PASS; props: StepProps
- StepDescription: function; owner steps; PASS; props: StepDescriptionProps
- StepDescriptionProps: type; owner steps; PASS
- StepProps: type; owner steps; PASS
- Steps: function; owner steps; PASS; props: StepsProps
- StepsProps: type; owner steps; PASS
- StepState: type; owner steps; PASS
- StepTitle: function; owner steps; PASS; props: StepTitleProps
- StepTitleProps: type; owner steps; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Steps
A named ordered list.
- aria-label / render / ref / native props: useRender.ComponentProps<ol>. The default name comes from locale.

### Step
A li with state independent of preceding positions.
- state: "upcoming" | "current" | "complete" | "error". Required application fact with a localized assistive label.
- render / ref / native props: useRender.ComponentProps<li>. State does not generate navigation.

### StepTitle / StepDescription
div / p content slots.
- children / render / ref / native props: useRender.ComponentProps<div | p>. The application provides titles, explanation and recovery links.

## Keyboard

## Source examples
### 明确的过程状态
Source: apps/docs/src/content/steps/demos/01-progress.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Step, StepDescription, Steps, StepTitle, type StepState } from "@qingye_lab/ui/components/steps";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "明确的过程状态", titleEn: "Explicit process states" } satisfies DemoMeta;
export default function Demo() {
  const [state, setState] = useState<StepState>("current");
  return <Stack><Steps><Step state={state}><StepTitle>第一步</StepTitle><StepDescription>{state === "complete" ? "已标记完成" : "等待标记完成"}</StepDescription></Step><Step state="upcoming"><StepTitle>第二步</StepTitle></Step><Step state="error"><StepTitle>第三步</StepTitle><StepDescription>需要重新编辑</StepDescription></Step></Steps><Button className="self-start" variant="bordered" onClick={() => setState(state === "complete" ? "current" : "complete")}>{state === "complete" ? "返回进行中" : "标记完成"}</Button></Stack>;
}
```
