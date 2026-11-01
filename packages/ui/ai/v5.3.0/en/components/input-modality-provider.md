# InputModalityProvider

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/input-modality-provider
Source: packages/ui/src/components/input-modality-provider.tsx
Source SHA-256: 011d0f9673180acea6dd34d463e7cdf1436738881d96f8e20a7c7147c7940d46

Record input modality at the application root and skip transitions for keyboard input.

## Decision
Keyboard and reduced-motion policies skip some transitions. Update state directly, independently of animation completion.

## Notes
- Mount once at the application root. These demos reuse the site's root InputModalityProvider. The old name MotionProvider remains as a deprecated alias and is removed in the next major version.
- motion.css reads data-ui-input, skipping transitions for keyboard input and retaining them for pointer input.
- motion.css handles the system reduced-motion preference independently of input modality.
- data-instant skips an element's transition. Custom parts use data-slot or qy-pressable for the shared policy.

## Use and ownership
- Keyboard actions complete immediately while pointer actions retain necessary transitions.
- Avoid: Multiple document owners in separate subtrees; saving on animation completion; indistinguishable states with reduced motion.
- Library: Recent input method, listener cleanup, and original document attribute restoration.
- Application: Business state timing, root assembly, and whether programmatic changes need animation.

## Composition
- Mount once at the root. Document attributes cover Portals; components use shared motion.css through data-slot/data-motion.

## Responsive behavior
- Layouts and animation permit interruption; keyboard and system reduced motion are checked separately.

## Customization
- Project compositions may use data-instant without registering another input-method listener.

## Current exports
- InputModalityProvider: function; owner input-modality-provider; PASS; props: { children: ReactNode }
- MotionProvider: const; owner input-modality-provider; UNVERIFIED

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### InputModalityProvider
- `children`: `ReactNode`.

### MotionProvider
- `children`: `ReactNode`.

## Dependencies and providers
- Runtime: react
- Optional peers: none recorded
- Mount once at the application root. These demos reuse the site's root InputModalityProvider. The old name MotionProvider remains as a deprecated alias and is removed in the next major version.
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### InputModalityProvider
No visible UI; it only records input modality and provides no motion. Mount sets data-ui-input to pointer; captured keydown switches to keyboard, pointerdown/pointermove to pointer. Unmount restores the previous value. The html attribute also covers body Portals.
- children: ReactNode. Application content.

## Keyboard

## Source examples
### 输入方式
Source: apps/docs/src/content/input-modality-provider/demos/01-modality.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { Text } from "@qingye_lab/ui/components/typography";
import { useEffect, useState } from "react";

export const meta = { title: "输入方式", titleEn: "Input modality" };

export default function Demo() {
  const [input, setInput] = useState<string | null>(null);
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setInput(root.getAttribute("data-ui-input"));
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributeFilter: ["data-ui-input"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Stack gap="panel">
      <Inline gap="actions"><Button>按钮</Button><Button variant="bordered">按钮</Button></Inline>
      <Text step="support" className="text-muted-foreground">输入方式：{input === "keyboard" ? "键盘" : input === "pointer" ? "指针" : "待检测"}</Text>
    </Stack>
  );
}
```

### 即时变化
Source: apps/docs/src/content/input-modality-provider/demos/02-custom.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { useState } from "react";

export const meta = { title: "即时变化", titleEn: "Instant changes" };

export default function Demo() {
  const [normal, setNormal] = useState(false);
  const [instant, setInstant] = useState(false);
  return (
    <Inline gap="actions">
      <Button variant="bordered" aria-pressed={normal} onClick={() => setNormal(!normal)}>常规</Button>
      <Button variant="bordered" data-instant aria-pressed={instant} onClick={() => setInstant(!instant)}>即时</Button>
    </Inline>
  );
}
```
