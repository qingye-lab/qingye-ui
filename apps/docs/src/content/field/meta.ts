import type { ComponentMeta } from "@/lib/types";

export default {
  title: "表单项 Field",
  description: "把标签、控件、说明与错误信息组织成一个表单项，自动处理关联、禁用与校验状态。",
  category: "表单",
  source: "coss",
  exports: ["Field", "FieldLabel", "FieldDescription", "FieldError", "FieldContent", "FieldTitle", "FieldGroup", "FieldSeparator", "FieldControl", "FieldValidity"],
  keywords: ["field", "表单项", "校验", "错误提示", "label", "description"],
  design: {
    "methods": [
      "名实相符",
      "相成相制",
      "布白有用",
      "进退相承"
    ],
    "whenToUse": [
      "把一个问题、控件、必要说明与原位错误放在同一关系中。"
    ],
    "avoid": [
      "标签、示例和错误各自表达事实；不要给每个字段都重复一段操作说明。"
    ],
    "composition": [
      "纵向适合文字输入，水平适合复选或开关；FieldContent 容纳名称和必要说明。"
    ],
    "stateOwner": {
      "library": [
        "控制关联、校验状态与描述、错误的可访问连接。"
      ],
      "application": [
        "业务规则、草稿、后端错误和保存结果。"
      ]
    },
    "responsive": [
      "说明与错误可换行而不挤掉控件；横向名称列允许收缩。"
    ],
    "customization": [
      "orientation 调整字段关系；FieldTitle 不能冒充 label，非原生组合显式关联 id。"
    ]
  },
  api: [
    {
      name: "Field",
      description: "基于 Base UI Field.Root。为内部控件提供 id、aria-describedby 与校验状态。",
      props: [
        { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "horizontal 让标签与控件并排，用于开关、复选框行。" },
        { name: "name", type: "string", description: "字段名；在 Form 中用于提交值与匹配 errors。" },
        { name: "invalid", type: "boolean", description: "外部校验结果（如表单库）；为 true 时控件标记为无效。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用标签与控件。" },
        { name: "validate", type: "(value, formValues) => string | string[] | null", description: "自定义校验，返回错误信息。" },
        { name: "validationMode", type: '"onSubmit" | "onBlur" | "onChange"', default: '"onSubmit"', description: "何时校验。" },
      ],
    },
    { name: "FieldLabel", description: "标签，自动关联控件；禁用时一起变淡。" },
    { name: "FieldDescription", description: "说明文字，自动加入控件的 aria-describedby。" },
    {
      name: "FieldError",
      description: "错误信息，出现时轻微淡入，并加入 aria-describedby。",
      props: [
        { name: "children", type: "ReactNode", description: "有内容时直接显示，由调用方决定何时渲染。" },
        { name: "errors", type: "Array<{ message?: string } | undefined>", description: "表单库的错误数组；去重，多条时显示为列表。" },
        { name: "match", type: "boolean | keyof ValidityState", description: "只在某个校验状态下显示，如 \"valueMissing\"、\"typeMismatch\"。" },
      ],
    },
    { name: "FieldContent", description: "横向表单项中包住标签与说明的一列。" },
    { name: "FieldTitle", description: "非 <label> 的标题，用于控件自带标签（如 ToggleGroup、选项卡片）的场景。" },
    { name: "FieldGroup", description: "一组表单项的纵向间距容器。" },
    { name: "FieldSeparator", description: "表单项之间的分隔线，可带一段短文字。" },
    { name: "FieldControl / FieldValidity", description: "Base UI 原语：自定义控件与读取校验状态。" },
  ],
  keyboard: [{ keys: "Tab", description: "按文档顺序在控件间移动；点击标签聚焦或切换对应控件。" }],
  notes: [
    "没有 children 的 <FieldError /> 跟随 Base UI：字段无效时显示浏览器校验信息或 Form errors 中的同名错误。",
    "自定义文案时用 match 绑定具体校验状态，例如 <FieldError match=\"valueMissing\">请填写邮箱</FieldError>；不写 match 的文案会一直显示。",
    "接入 react-hook-form 等表单库时，用 invalid 标记字段，并把错误交给 errors。",
    "一组相关的表单项用 Fieldset 与 FieldsetLegend（别名 FieldSet、FieldLegend）包起来。",
    "没有注册到 Field 的组合控件（如 FileUpload）显式关联 label 的 htmlFor 与触发器 id，说明 id 通过 aria-describedby 传给控件。",
  ],
} satisfies ComponentMeta;
