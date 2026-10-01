const _02Sizes = 'import { Button } from "@yanqing/ui";\n\nexport const meta = {\n  title: "尺寸",\n  description: "xs 用于表格行内，sm 用于工具栏，lg / xl 用于登录与落地页。移动端统一加高 4px。",\n};\n\nexport default function Demo() {\n  return (\n    <>\n      <Button size="xs" variant="outline">行内</Button>\n      <Button size="sm" variant="outline">工具栏</Button>\n      <Button variant="outline">默认</Button>\n      <Button size="lg" variant="outline">登录</Button>\n      <Button size="xl" variant="outline">免费试用</Button>\n    </>\n  );\n}\n';
export {
  _02Sizes as default
};
