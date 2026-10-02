import type { ComponentMeta } from "@/lib/types";

export default {
  title: "表单 Form",
  description: "基于 Base UI Form：提交时统一校验，把焦点移到第一个错误字段，并按字段名显示服务端返回的错误。",
  category: "表单",
  source: "coss",
  exports: ["Form"],
  keywords: ["form", "表单", "提交", "校验", "validation"],
  design: {
    "methods": [
      "进退相承",
      "名实相符",
      "相成相制"
    ],
    "whenToUse": [
      "组织一组输入与一个明确提交动作，让校验与修正保持在原位。"
    ],
    "avoid": [
      "浏览器校验通过和 onSubmit 触发都不代表后端保存成功。"
    ],
    "composition": [
      "Form 与具名 Field 关联提交值和 errors；提交按钮名称表达真实后果。"
    ],
    "stateOwner": {
      "library": [
        "提交、原生校验与字段错误分派。"
      ],
      "application": [
        "草稿、请求、版本、结果未知和恢复流程。"
      ]
    },
    "responsive": [
      "提交反馈保留已填写的控件；小屏按阅读和修正顺序安排字段。"
    ],
    "customization": [
      "errors 接收服务端字段消息，应用决定何时清除或重新校验。"
    ]
  },
  api: [
    {
      name: "Form",
      description: "渲染 <form>，与内部 Field 协同校验。",
      props: [
        { name: "onFormSubmit", type: "(values, details) => void", description: "校验通过后调用，values 以 Field 的 name 为键。" },
        { name: "onSubmit", type: "(event) => void", description: "原生提交事件；需要 FormData 时使用。" },
        { name: "errors", type: "Record<string, string | string[]>", description: "外部错误（如服务端），按 name 显示在对应 FieldError 中，字段修改后自动清除。" },
        { name: "validationMode", type: '"onSubmit" | "onBlur" | "onChange"', default: '"onSubmit"', description: "所有字段的默认校验时机。" },
        { name: "actionsRef", type: "RefObject<{ validate }>", description: "手动触发校验。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Enter", description: "在单行输入框中提交表单。" },
    { keys: "Tab", description: "按顺序在字段间移动；提交失败时焦点落在第一个错误字段。" },
  ],
  notes: [
    "提交按钮用 type=\"submit\"，请求期间设 loading，防止重复提交。",
    "错误信息写清如何修正，例如“请填写 11 位手机号”，而不是“格式错误”。",
    "Form 不发请求；在 onFormSubmit 里调用你的接口，把返回的字段错误交给 errors。",
  ],
} satisfies ComponentMeta;
