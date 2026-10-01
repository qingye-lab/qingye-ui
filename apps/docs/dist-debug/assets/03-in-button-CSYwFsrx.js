const _03InButton = 'import { Button, Kbd, KbdGroup } from "@yanqing/ui";\n\nexport const meta = {\n  title: "在按钮中",\n  description: "Kbd 自动跟随按钮的文字颜色，在实心、描边与幽灵按钮上都清晰可读。",\n};\n\nexport default function Demo() {\n  return (\n    <>\n      <Button>\n        保存\n        <KbdGroup>\n          <Kbd>⌘</Kbd>\n          <Kbd>S</Kbd>\n        </KbdGroup>\n      </Button>\n      <Button variant="outline">\n        取消\n        <Kbd>Esc</Kbd>\n      </Button>\n      <Button size="sm" variant="ghost">\n        新建工单\n        <Kbd>C</Kbd>\n      </Button>\n    </>\n  );\n}\n';
export {
  _03InButton as default
};
