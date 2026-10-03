# Copy button

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/copy-button
Source: packages/ui/src/components/copy-button.tsx
Source SHA-256: 7949c5addb94935ccc1ea2362eea5269d2d00e6e1a166d454c9eb3352977da9a

Copy supplied text and reflect the clipboard write result.

## Decision
CopyButton uses useCopyToClipboard; success comes from the write Promise resolving. Feedback duration, the quiet default, and icons are choices or presets.

## Notes
- Clipboard access needs environment support and permission. Failure retains guidance for manual copying.
- onCopySuccess confirms only writing the supplied text to the current clipboard, not saving or business completion.

## Use and ownership
- Copy known text.
- Avoid: Announcing business success after copying.
- Library: Clipboard waiting, actual outcome, and feedback.
- Application: Text content and subsequent handling.

## Composition
- Button + actual copy state/failure recovery.

## Responsive behavior
- Keep essential content and actions reachable in narrow containers; preserve the object, input, and focus when the layout changes.

## Customization
- Button's five profiles/variant and timeout.

## Current exports
- CopyButton: function; owner copy-button; PASS; props: CopyButtonProps
- CopyButtonProps: type; owner copy-button; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### CopyButton
Inherits Button's five profiles, emphasis, native/non-native render, and refs.
- value: string. The actual text to copy; never inferred from DOM or business objects.
- timeout: number; default 2000. A millisecond preset for clearing success feedback; it clears feedback without establishing success.
- onCopySuccess / onCopyError: () => void / (error: unknown) => void. Success callback after writeText resolves; rejection or an unavailable API invokes the error callback.
- size / shape / variant: ButtonProps; default md / label / quiet. Five matching control/text profiles; icon shape retains a localized action name.
- disabled / onClick / render / ref / ARIA: ButtonProps. Canceled events prevent writing; waiting blocks repeated activation. ref and render correspond to the actual button.

## Keyboard
- Enter / Space: Start one copy when available; waiting never repeats the write.

## Source examples
### 复制文本
Source: apps/docs/src/content/copy-button/demos/01-copy.tsx
```tsx
import { CopyButton } from "@qingye/ui/components/copy-button";
export const meta = { title: "复制文本", titleEn: "Copy text" };
export default function Demo() {
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)"><code className="text-body">Qingye</code><CopyButton value="Qingye" /><CopyButton value="Qingye" shape="icon" /><CopyButton value="Qingye" disabled /></div>;
}
```

### 五档
Source: apps/docs/src/content/copy-button/demos/02-sizes.tsx
```tsx
import { CopyButton } from "@qingye/ui/components/copy-button";
export const meta = { title: "五档", titleEn: "Sizes" };
export default function Demo() {
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)">{(["xs", "sm", "md", "lg", "xl"] as const).map(size => <CopyButton key={size} value={size} size={size} variant="bordered">{size}</CopyButton>)}</div>;
}
```
