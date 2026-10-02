import type { ComponentMeta } from "@/lib/types";

export default {
  title: "复制按钮 CopyButton",
  description: "把一段文本复制到剪贴板，并在按钮上就地确认。用于 API 密钥、邀请链接、订单号、命令等。",
  category: "工具",
  source: "local",
  exports: ["CopyButton", "useCopyToClipboard"],
  keywords: ["copy", "复制", "剪贴板", "clipboard"],
  api: [
    {
      name: "CopyButton",
      description: "基于 Button，接受其全部样式属性（variant 默认 outline）。结果通过礼貌的 live region 播报。",
      props: [
        { name: "value", type: "string | () => string", description: "要复制的文本；传函数时在点击瞬间取值。" },
        { name: "timeout", type: "number", default: "2000", description: "“已复制 / 复制失败”状态保持的毫秒数；0 表示一直保持。" },
        { name: "onCopy", type: "() => void", description: "复制成功后调用。" },
        { name: "onCopyError", type: "(error: unknown) => void", description: "剪贴板不可用或浏览器拒绝写入时调用。" },
        { name: "copyLabel", type: "string", default: "locale: copy", description: "按钮文字；仅图标时作为 aria-label。" },
        { name: "copiedLabel", type: "string", default: "locale: copied", description: "复制成功后的播报文字（视觉上由对勾图标确认）。" },
        { name: "errorLabel", type: "string", default: "locale: copyFailed", description: "复制失败时替换按钮文字，并播报。" },
        { name: "size", type: "ButtonProps[\"size\"]", default: '"default"', description: "icon-* 尺寸只显示图标；其余尺寸在无 children 时显示 copyLabel。" },
        { name: "children", type: "ReactNode", description: "自定义按钮文字。" },
      ],
    },
    {
      name: "useCopyToClipboard",
      description: "底层 Hook：{ copyToClipboard, isCopied, isCopying }，参数 { timeout, onCopy, onError }。最近一次调用拥有结果反馈；卸载后不再回调。",
    },
  ],
  keyboard: [{ keys: "Enter / Space", description: "复制。" }],
  notes: [
    "成功时只把图标换成对勾，按钮宽度不变、相邻元素不跳动；图标以 140ms 的淡入缩放切换，减少动态效果时只保留淡入。读屏通过礼貌播报听到“已复制”。",
    "剪贴板需要安全上下文（HTTPS 或 localhost）；失败时按钮显示“复制失败”，并调用 onCopyError，可在其中引导用户手动复制。",
    "仅图标时务必让周围文字说明复制的是什么，或通过 copyLabel 写清楚，例如“复制 API 密钥”。",
  ],
  design: {
    "methods": [
      "名实相符",
      "进退相承"
    ],
    "whenToUse": [
      "将当前对象的明确文本复制到剪贴板，并在动作处反馈结果。"
    ],
    "avoid": [
      "请求发出就打对勾；旧请求的失败覆盖新结果；失败后隐藏原文本；把空串当作无请求。"
    ],
    "composition": [
      "复制值按原样写入，包括空串；等待复用 Button loading。成功与错误由 Clipboard Promise 结果决定；失败仍可重试和手动选择原文。"
    ],
    "stateOwner": {
      "library": [
        "剪贴板请求归属、等待状态、反馈计时、卸载后回调抑制。"
      ],
      "application": [
        "被复制的对象和值、敏感数据策略、人工复制入口。"
      ]
    },
    "responsive": [
      "图标按钮保留对象名称；成功不改变标签宽度，失败文字允许获得必要空间。"
    ],
    "customization": [
      "copyLabel/copiedLabel/errorLabel 说明对象与结果，timeout 决定反馈持续时间。"
    ]
  },
} satisfies ComponentMeta;
