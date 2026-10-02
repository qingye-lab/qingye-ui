import type { ComponentMeta } from "@/lib/types";

export default {
  title: "验证码输入 OTPField",
  description: "逐格输入短信或邮箱验证码，支持粘贴整串、自动跳格与退格回退。",
  category: "表单",
  source: "coss",
  exports: ["OTPField", "OTPFieldInput", "OTPFieldSeparator"],
  keywords: ["otp", "验证码", "一次性密码", "pin", "verification code"],
  design: {
    "methods": [
      "名实相符",
      "进退相承",
      "布白有用"
    ],
    "whenToUse": [
      "逐位核对短验证码，支持整串粘贴与自动填入。"
    ],
    "avoid": [
      "填满仅表示输入完成，不能把 onValueComplete 当作验证成功。"
    ],
    "composition": [
      "整组有统一名称，每格同属一个值；错误与等待围绕该验证码持续显示。"
    ],
    "stateOwner": {
      "library": [
        "字符规则、跳格、粘贴、键盘回退和字段关联。"
      ],
      "application": [
        "校验请求、重发、有效期、尝试次数与敏感值清理。"
      ]
    },
    "responsive": [
      "粗指针每格至少 44×44px，格间距收紧；不足物理最小宽度的容器保留单行顺序并横向滚动，键盘聚焦可抵达后位。"
    ],
    "customization": [
      "length 与 validationType 来自真实码格式，normalizeValue 仅作明确规范化。"
    ]
  },
  api: [
    {
      name: "OTPField",
      description: "Base UI OTPField.Root；把若干 OTPFieldInput 组成一个字段。",
      props: [
        { name: "length", type: "number", description: "位数（必填）。" },
        { name: "value / defaultValue / onValueChange", type: "string", description: "受控 / 非受控的值。" },
        { name: "onValueComplete", type: "(value: string) => void", description: "填满全部位数时调用，适合自动提交。" },
        { name: "validationType", type: '"numeric" | "alpha" | "alphanumeric" | "none"', default: '"numeric"', description: "允许的字符；不符合的输入会被忽略。" },
        { name: "mask", type: "boolean", default: "false", description: "以圆点遮挡已输入字符。" },
        { name: "size", type: '"default" | "lg"', default: '"default"', description: "格子尺寸。" },
        { name: "autoSubmit", type: "boolean", default: "false", description: "填满后自动提交所在表单。" },
        { name: "name / disabled / readOnly / required", type: "string / boolean", description: "表单字段名与状态。" },
      ],
    },
    { name: "OTPFieldInput", description: "单个格子；每位一个。可设 placeholder 作为提示，aria-invalid 显示错误。" },
    { name: "OTPFieldSeparator", description: "格子之间的分隔短线，用于 3-3 分组。" },
  ],
  keyboard: [
    { keys: "0–9 / 字母", description: "输入当前位并跳到下一格。" },
    { keys: "Backspace", description: "删除当前位，空格时回到上一格。" },
    { keys: "← → / Home / End", description: "在格子间移动。" },
    { keys: "Ctrl / ⌘ + V", description: "粘贴整串验证码，自动分配到各格。" },
  ],
  notes: [
    "第一格默认 autocomplete=\"one-time-code\"，iOS 与 Android 可直接填入短信验证码。",
    "给整组提供标签：FieldLabel 或 aria-label。",
  ],
} satisfies ComponentMeta;
