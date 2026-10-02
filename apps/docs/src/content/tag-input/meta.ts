import type { ComponentMeta } from "@/lib/types";

export default {
  title: "标签输入 TagInput",
  description:
    "在输入框里录入一组自由文本标签，例如关键词、邮箱或技能。回车或逗号确认，粘贴一列文本会自动拆分；从固定选项中多选时用 Combobox。",
  category: "表单",
  source: "local",
  exports: ["TagInput"],
  keywords: ["tag input", "tags", "chips", "标签", "关键词", "多值输入", "token"],
  design: {
    "methods": [
      "名实相符",
      "布白有用",
      "进退相承"
    ],
    "whenToUse": [
      "输入并核对可自由定义的标签或收件人，逐项修改。"
    ],
    "avoid": [
      "重复值不应再加入；被规则拒绝的文字保留用于修正，而非悄悄丢弃。"
    ],
    "composition": [
      "标签、待确认文本与校验消息围绕同一集合；隐藏 inputs 提交已确认项。"
    ],
    "stateOwner": {
      "library": [
        "确认、去重、IME、键盘移除、焦点与继承禁用。"
      ],
      "application": [
        "标签业务规则、集合上限、草稿和持久化。"
      ]
    },
    "responsive": [
      "标签可在框内换行，长项有截断但完整值继续保留；键盘焦点定位到当前项。"
    ],
    "customization": [
      "validate 返回真实可修正原因；removeLabel 为自定义对象命名，size 调整密度。"
    ]
  },
  api: [
    {
      name: "TagInput",
      description:
        "渲染控件框与内部的文本输入；id、placeholder、aria-*、onKeyDown 等属性落在文本输入上。放在 Field 中时自动关联 FieldLabel。",
      props: [
        { name: "value / defaultValue", type: "string[]", description: "受控 / 非受控的标签列表。" },
        { name: "onValueChange", type: "(value: string[]) => void", description: "标签增删时回调。" },
        { name: "name", type: "string", description: "每个标签提交一个同名隐藏字段，服务端用 formData.getAll(name) 读取。" },
        { name: "max", type: "number", description: "标签数量上限；超出时提示且保留输入。" },
        { name: "validate", type: "(tag, tags) => string | null", description: "返回文案即拒绝该标签并在下方显示，输入内容保留以便修改。" },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "与 Combobox 多选框一致的尺寸。" },
        { name: "addOnBlur", type: "boolean", default: "true", description: "失去焦点时把未确认的文字加为标签。" },
        { name: "removeLabel", type: "(tag: string) => string", description: "移除按钮的无障碍名称，默认“移除 {标签}”。" },
        { name: "disabled / readOnly / required", type: "boolean", description: "只读时隐藏移除按钮；required 在没有任何标签时阻止提交。" },
        { name: "className / inputClassName", type: "string", description: "分别作用于控件框与内部文本输入。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Enter / ,", description: "把输入内容确认为标签（支持全角逗号）；输入为空时 Enter 照常提交表单。" },
    { keys: "Backspace", description: "输入为空时移除最后一个标签。" },
    { keys: "← / →", description: "光标在开头时进入标签，在标签之间移动；越过最后一个回到输入框。" },
    { keys: "Backspace / Delete", description: "移除当前聚焦的标签。" },
    { keys: "Esc", description: "清空未确认的输入与提示。" },
  ],
  notes: [
    "重复的标签不会再次加入，已有的那个会短暂高亮并给出提示。",
    "粘贴多行或逗号分隔的文本（例如从表格复制的一列）会一次加入多个标签。",
    "中文输入法组字期间按回车不会误加标签。",
  ],
} satisfies ComponentMeta;
