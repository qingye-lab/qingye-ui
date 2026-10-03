# Progress

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/progress
Source: packages/ui/src/components/progress.tsx
Source SHA-256: 48ae638f73c4c2aceac9839caaa4fd9d2f17dba13d4a2d5f61c209abccc7438b

Confirmed task completion or an explicit indeterminate state.

## Decision
Animation and time establish no completion fact. Zero differs from null.

## Use and ownership
- A reliable completion ratio exists, or work is known to be underway without a ratio.
- Avoid: Animation and time establish no completion fact. Zero differs from null.
- Library: Native semantics, public composition, and centralized roles.
- Application: Objects, content, values, states, and request outcomes.

## Composition
- Label names the task; Value defaults to localized in-progress for actual null, with caller formatting taking precedence.

## Responsive behavior
- Task names and formatted readings wrap; an independent progress role controls track thickness.

## Customization
- Public render/refs, ARIA, events, and styles; keep theme axes independent.

## Current exports
- Progress: function; owner progress; PASS; props: ProgressProps
- ProgressIndicator: function; owner progress; PASS; props: React.ComponentProps<typeof ProgressPrimitive.Indicator>
- ProgressLabel: function; owner progress; PASS; props: React.ComponentProps<typeof ProgressPrimitive.Label>
- ProgressPrimitive: reexport; owner progress; UNVERIFIED
- ProgressProps: type; owner progress; PASS
- ProgressTrack: function; owner progress; PASS; props: React.ComponentProps<typeof ProgressPrimitive.Track>
- ProgressValue: function; owner progress; PASS; props: React.ComponentProps<typeof ProgressPrimitive.Value>

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Progress
Label names the task; Value defaults to localized in-progress for actual null, with caller formatting taking precedence.
- value: number | null. Confirmed value; only null is indeterminate and omits aria-valuenow.
- min / max: number. A finite increasing range with a finite denominator; invalid or out-of-range values throw RangeError.
- format / locale / getAriaValueText: Base UI Progress props. Number formatting follows locale, defaulting to UILocale. Actual null uses existing buttonInProgress ARIA text; getAriaValueText takes precedence.
- render / ref / native props: current public component props. Forward attributes, events, and refs to the actual element; adjust presentation through className/style.

### ProgressLabel
Registers the actual task's accessible name.

### ProgressValue
Confirmed readings retain number formatting; actual null defaults to localized in-progress, with a children callback taking precedence.

### ProgressTrack
The visual progress track consumes an independent thickness role.

### ProgressIndicator
Confirmed progress ratio; indeterminate state shows a dashed boundary without a ratio.

### ProgressPrimitive
Public Base UI Progress primitive.

## Keyboard

## Source examples
### 已确认与不定进度
Source: apps/docs/src/content/progress/demos/01-states.tsx
```tsx
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye/ui/components/progress";
import { Stack } from "@qingye/ui/components/layout";
export const meta = { title: "已确认与不定进度", titleEn: "Confirmed and indeterminate progress" };
export default function Demo() { return <Stack gap="fields" className="w-full max-w-sm">{([0,50,100,null] as const).map((value,index) => <Progress key={index} value={value}><ProgressLabel>进度</ProgressLabel><ProgressValue /><ProgressTrack><ProgressIndicator /></ProgressTrack></Progress>)}</Stack>; }
```
