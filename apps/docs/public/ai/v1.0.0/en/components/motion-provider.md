# MotionProvider

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/motion-provider
Source: packages/ui/src/components/motion-provider.tsx
Source SHA-256: 8afcccdffccd39281b9211a5d474b7e4121f0e3895ba39e1c4d79777f664f8b2

Record input modality at the application root and skip transitions for keyboard input.

## Decision
Keyboard and reduced-motion policies skip some transitions. Update state directly, independently of animation completion.

## Notes
- Mount once at the application root. These demos reuse the site's root MotionProvider.
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
- MotionProvider: function; owner motion-provider; PASS; props: { children: ReactNode }

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: react
- Optional peers: none recorded
- Mount once at the application root. These demos reuse the site's root MotionProvider.
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### MotionProvider
No visible UI. Mount sets data-ui-input to pointer; captured keydown switches to keyboard, pointerdown/pointermove to pointer. Unmount restores the previous value. The html attribute also covers body Portals.
- children: ReactNode. Application content.

## Keyboard

## Source examples
### 输入方式
Source: apps/docs/src/content/motion-provider/demos/01-modality.tsx
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
Source: apps/docs/src/content/motion-provider/demos/02-custom.tsx
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
