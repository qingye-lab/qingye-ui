import type { ComponentMeta } from "@/lib/types";

export default {
  title: "标签 Label",
  description: "表单控件的可见标签。简单场景直接关联控件；需要说明与校验信息时改用 Field 与 FieldLabel。",
  category: "表单",
  source: "coss",
  exports: ["Label"],
  keywords: ["label", "标签", "表单标签"],
  api: [
    {
      name: "Label",
      description: "渲染 <label>，通过 htmlFor 关联控件，或直接包裹复选框、开关。支持 render 替换元素。",
      props: [
        { name: "htmlFor", type: "string", description: "关联控件的 id。" },
        { name: "render", type: "ReactElement | (props) => ReactElement", description: "替换渲染元素。" },
      ],
    },
  ],
  notes: [
    "点击标签会聚焦或切换关联的控件，包裹复选框时整行都可点击。",
    "在 Field 中请用 FieldLabel，它会自动关联控件并跟随禁用状态。",
    "必填标记用文字或星号加说明，不要只靠颜色。",
  ],
} satisfies ComponentMeta;
