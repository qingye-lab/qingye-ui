import { Input } from "@qingye/ui/components/input";

export const meta = {
  title: "原生文件选择",
  description:
    "type=\"file\" 使用浏览器自带控件，外框沿用 Input 的样式，但“Choose File / No file chosen”由浏览器按其语言绘制，CSS 无法翻译或替换（::file-selector-button 不接受 content）。界面为中文时请用 FileUpload。",
};

export default function Demo() {
  return <Input aria-label="导入设备清单" className="max-w-xs" type="file" />;
}
