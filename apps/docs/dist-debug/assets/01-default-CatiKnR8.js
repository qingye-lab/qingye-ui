const n=`import { Kbd, KbdGroup } from "@qingye/ui/components/kbd";

export const meta = { title: "单键与组合" };

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
        <Kbd>Esc</Kbd>
        <Kbd>Enter</Kbd>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>Alt</Kbd>
          <Kbd>Delete</Kbd>
        </KbdGroup>
      </div>
    </div>
  );
}
`;export{n as default};
