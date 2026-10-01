import type { ComponentMeta } from "@/lib/types";

export default {
  title: "自动完成 Autocomplete",
  description: "带建议列表的文本输入：用户可以选建议，也可以输入任意内容。值必须来自选项时用 Combobox。",
  category: "表单",
  source: "coss",
  exports: [
    "Autocomplete",
    "AutocompleteInput",
    "AutocompletePopup",
    "AutocompleteList",
    "AutocompleteItem",
    "AutocompleteEmpty",
    "AutocompleteGroup",
    "AutocompleteGroupLabel",
    "AutocompleteCollection",
    "AutocompleteStatus",
  ],
  keywords: ["autocomplete", "自动完成", "搜索建议", "联想", "typeahead"],
  api: [
    {
      name: "Autocomplete",
      description: "根组件（Base UI Autocomplete.Root）。值就是输入框里的文字。",
      props: [
        { name: "items", type: "T[] | { value, items }[]", description: "建议数据；分组时传 { value, items } 数组。" },
        { name: "value / defaultValue / onValueChange", type: "string", description: "受控 / 非受控的输入文字。" },
        { name: "mode", type: '"list" | "both" | "inline" | "none"', default: '"list"', description: "list 只筛选列表；both 同时在输入框内补全高亮项；inline 只补全不筛选。" },
        { name: "limit", type: "number", description: "最多显示的建议数，配合 AutocompleteStatus 提示剩余数量。" },
        { name: "filter", type: "((item, query) => boolean) | null", description: "自定义筛选；远程搜索时传 null。" },
        { name: "autoHighlight", type: "boolean", default: "false", description: "自动高亮第一个建议。" },
        { name: "itemToStringValue", type: "(item) => string", description: "对象建议写回输入框的文字；含 value 字段时可省略。" },
      ],
    },
    {
      name: "AutocompleteInput",
      description: "输入框，外观同 Input。",
      props: [
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "尺寸。" },
        { name: "startAddon", type: "ReactNode", description: "前置图标。" },
        { name: "showTrigger / showClear", type: "boolean", default: "false", description: "末端的展开 / 清除按钮。" },
      ],
    },
    { name: "AutocompletePopup", description: "弹出层，宽度至少与输入框相同。" },
    { name: "AutocompleteList / AutocompleteItem", description: "建议列表与单条建议；触屏设备上行高 44px。" },
    { name: "AutocompleteEmpty / AutocompleteStatus", description: "无结果提示；加载、结果数等状态文字（aria-live 播报）。" },
    { name: "AutocompleteGroup / AutocompleteGroupLabel / AutocompleteCollection / AutocompleteSeparator", description: "分组展示。" },
    { name: "useAutocompleteFilter", description: "Base UI 的本地化筛选工具。" },
  ],
  keyboard: [
    { keys: "↓ / ↑", description: "打开列表并在建议间移动。" },
    { keys: "Enter", description: "把高亮建议填入输入框。" },
    { keys: "Esc", description: "关闭列表；再次按下清空输入。" },
  ],
  notes: [
    "Autocomplete 不限制输入；需要校验值是否合法时改用 Combobox。",
    "建议很多时用 limit 截断，并在 AutocompleteStatus 中说明还有多少条。",
  ],
} satisfies ComponentMeta;
