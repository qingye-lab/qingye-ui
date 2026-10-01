import { Kbd, KbdGroup } from "@yanqing/ui/components/kbd";

export const meta = { title: "在说明文字中" };

export default function Demo() {
  return (
    <p className="max-w-sm text-pretty text-center text-muted-foreground text-sm">
      按
      <KbdGroup className="mx-1">
        <Kbd>⌘</Kbd>
        <Kbd>Enter</Kbd>
      </KbdGroup>
      发送消息，按 <Kbd>Esc</Kbd> 放弃编辑。
    </p>
  );
}
