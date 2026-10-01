const n=`import { Button } from "@qingye/ui/components/button";
import { Kbd, KbdGroup } from "@qingye/ui/components/kbd";

export const meta = {
  title: "在按钮中",
  description: "Kbd 自动跟随按钮的文字颜色，在实心、描边与幽灵按钮上都清晰可读。",
};

export default function Demo() {
  return (
    <>
      <Button>
        保存
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </Button>
      <Button variant="outline">
        取消
        <Kbd>Esc</Kbd>
      </Button>
      <Button size="sm" variant="ghost">
        新建工单
        <Kbd>C</Kbd>
      </Button>
    </>
  );
}
`;export{n as default};
