import type { ComponentMeta } from "@/lib/types";

export default {
  title: "输入框 Input",
  description: "单行文本输入。配合 Field 提供标签、说明与校验信息；需要前后缀、图标或按钮时用 InputGroup。",
  category: "表单",
  source: "coss",
  exports: ["Input"],
  keywords: ["input", "输入框", "文本框", "text field"],
  design: {
    "methods": [
      "名实相符",
      "布白有用",
      "进退相承"
    ],
    "whenToUse": [
      "填写单行名称、编号或联系方式，type 与真实输入内容匹配。"
    ],
    "avoid": [
      "示例只放 placeholder；提交失败不应卸载或重置已有文字。"
    ],
    "composition": [
      "FieldLabel、Input 与必要的 FieldError 形成同一个字段；前后缀交给 InputGroup。"
    ],
    "stateOwner": {
      "library": [
        "原生输入、字段关联、焦点与尺寸角色。"
      ],
      "application": [
        "草稿、输入业务规则、保存结果及何时清除。"
      ]
    },
    "responsive": [
      "窄容器中输入可以收缩；移动字号保留 16px，粗指针命中区保留 44px。"
    ],
    "customization": [
      "size 消费 --qy-control-*；className 调整外框，原生属性落到输入。"
    ]
  },
  api: [
    {
      name: "Input",
      description: "基于 Base UI Input，外层 <span data-slot=\"input-control\"> 承载边框与焦点环，className 作用于外层；其余属性透传给 <input>。",
      props: [
        { name: "size", type: '"sm" | "default" | "lg" | number', default: '"default"', description: "高度：28 / 32 / 36px（移动端各加 4px）；传数字时作为原生 size 属性。" },
        { name: "type", type: "string", default: '"text"', description: "原生类型。search 会隐藏浏览器自带的清除按钮；file 复用 Input 的外框样式，但控件本身是浏览器原生的，文案不可本地化（见下方说明）。" },
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
    "type=\"file\" 用的是浏览器原生控件：Input 只提供外框样式，“Choose File / No file chosen”由浏览器按自身语言绘制，CSS 无法改写（::file-selector-button 不接受 content），也无对应属性可覆盖。中文界面请改用 FileUpload——它自带本地化文案、格式与大小校验和文件列表。",
  ],
} satisfies ComponentMeta;
