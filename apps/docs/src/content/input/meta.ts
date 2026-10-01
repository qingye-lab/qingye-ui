import type { ComponentMeta } from "@/lib/types";

export default {
  title: "输入框 Input",
  description: "单行文本输入。配合 Field 提供标签、说明与校验信息；需要前后缀、图标或按钮时用 InputGroup。",
  category: "表单",
  source: "coss",
  exports: ["Input"],
  keywords: ["input", "输入框", "文本框", "text field"],
  api: [
    {
      name: "Input",
      description: "基于 Base UI Input，外层 <span data-slot=\"input-control\"> 承载边框与焦点环，className 作用于外层；其余属性透传给 <input>。",
      props: [
        { name: "size", type: '"sm" | "default" | "lg" | number', default: '"default"', description: "高度：28 / 32 / 36px（移动端各加 4px）；传数字时作为原生 size 属性。" },
        { name: "type", type: "string", default: '"text"', description: "原生类型；search 会隐藏浏览器自带的清除按钮，file 有专门样式。" },
        { name: "aria-invalid", type: "boolean", description: "标记为无效；在 Field 中由校验自动设置。" },
        { name: "unstyled", type: "boolean", default: "false", description: "去掉外层样式，供 InputGroup 等组合使用。" },
        { name: "nativeInput", type: "boolean", default: "false", description: "渲染原生 <input> 而不注册到 Base UI Field。" },
      ],
    },
  ],
  keyboard: [{ keys: "Tab", description: "移入、移出焦点；键盘聚焦时显示焦点环。" }],
  notes: [
    "每个输入框都要有可见标签（FieldLabel / Label）；只有搜索框等意义明确的场景才只用 aria-label。",
    "占位文字只做示例，不要代替标签。",
    "触屏设备上输入框最小高度为 44px，便于点按；字号在移动端为 16px，避免 iOS 聚焦时缩放。",
  ],
} satisfies ComponentMeta;
