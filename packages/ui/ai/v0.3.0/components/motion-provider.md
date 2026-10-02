# 动效策略 MotionProvider

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/motion-provider
Source: packages/ui/src/components/motion-provider.tsx
Source SHA-256: 8afcccdffccd39281b9211a5d474b7e4121f0e3895ba39e1c4d79777f664f8b2

记录用户最近一次使用的输入方式，写到 <html data-ui-input>：键盘操作时组件的过渡立即完成，鼠标与触屏时保留细微的动效。在应用根部挂载一次。

## Use and ownership
- 记录用户最近一次使用的输入方式，写到 <html data-ui-input>：键盘操作时组件的过渡立即完成，鼠标与触屏时保留细微的动效。在应用根部挂载一次。
- Avoid: 不要让样式替代语义；空值、未知与零分别表达。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- MotionProvider: function; owner motion-provider; PASS; props: { children: ReactNode }

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: react
- Optional peers: none recorded
- 系统开启“减少动态效果”时，motion.css 只保留透明度与颜色的过渡，去掉位移、缩放与高度动画；这一层不依赖 MotionProvider。
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### MotionProvider
无界面组件。挂载时把 data-ui-input 设为 pointer；捕获到 keydown 改为 keyboard，pointerdown 或 pointermove 改回 pointer；卸载时还原。属性写在 <html> 上，因此也覆盖传送到 body 的浮层。
- children: ReactNode. 应用内容。

## Keyboard

## Source examples
### 输入方式
Source: apps/docs/src/content/motion-provider/demos/01-modality.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Kbd } from "@qingye/ui/components/kbd";
import { MotionProvider } from "@qingye/ui/components/motion-provider";
import { useEffect, useState } from "react";

export const meta = {
  title: "输入方式",
  description: "移动鼠标或按 Tab 键，观察 <html data-ui-input> 的变化。实际应用中 MotionProvider 放在根部。",
};

function useInputModality() {
  const [input, setInput] = useState<string | null>(null);
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setInput(root.getAttribute("data-ui-input"));
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributeFilter: ["data-ui-input"] });
    return () => observer.disconnect();
  }, []);
  return input;
}

function Readout() {
  const input = useInputModality();
  return (
    <p className="text-muted-foreground text-sm">
      data-ui-input = <code className="font-mono text-foreground">{input ?? "—"}</code>
    </p>
  );
}

export default function Demo() {
  return (
    <MotionProvider>
      <div className="flex flex-col items-center gap-4">
        <Readout />
        <div className="flex gap-2">
          <Button variant="outline">保存草稿</Button>
          <Button>发布</Button>
        </div>
        <p className="text-muted-foreground text-xs">
          按 <Kbd>Tab</Kbd> 切换焦点时焦点环立即出现；用鼠标点击按钮可以看到 0.97 的按压缩放。
        </p>
      </div>
    </MotionProvider>
  );
}
```

### 让自定义元素遵循策略
Source: apps/docs/src/content/motion-provider/demos/02-custom.tsx
```tsx
import { MotionProvider } from "@qingye/ui/components/motion-provider";

export const meta = {
  title: "让自定义元素遵循策略",
  description: "加上 qy-pressable 获得按压反馈；加上 data-slot 后，键盘操作时它的过渡也会立即完成。",
};

const colors = [
  { name: "青", value: "bg-teal-500" },
  { name: "靛", value: "bg-indigo-500" },
  { name: "琥珀", value: "bg-amber-500" },
];

export default function Demo() {
  return (
    <MotionProvider>
      <div aria-label="标签颜色" className="flex gap-3" role="group">
        {colors.map((color) => (
          <button
            className="qy-pressable flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
            data-slot="color-chip"
            key={color.name}
            type="button"
          >
            <span aria-hidden="true" className={`size-3 rounded-full ${color.value}`} />
            {color.name}
          </button>
        ))}
      </div>
    </MotionProvider>
  );
}
```

