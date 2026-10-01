const _01Variants = 'import { Button } from "@yanqing/ui";\n\nexport const meta = {\n  title: "样式",\n  description: "一个区域只放一个主按钮；次要操作用 outline、secondary 或 ghost，危险操作用 destructive。",\n};\n\nexport default function Demo() {\n  return (\n    <>\n      <Button>保存</Button>\n      <Button variant="outline">取消</Button>\n      <Button variant="secondary">存为草稿</Button>\n      <Button variant="ghost">稍后再说</Button>\n      <Button variant="link">查看详情</Button>\n      <Button variant="destructive">删除设备</Button>\n      <Button variant="destructive-outline">解除绑定</Button>\n    </>\n  );\n}\n';
export {
  _01Variants as default
};
