import type { ComponentMeta } from "@/lib/types";

export default {
  "title": "进度 Progress",
  "titleEn": "Progress",
  "description": "表达可靠分母的任务进度或明确不定状态。",
  "descriptionEn": "Confirmed task completion or an explicit indeterminate state.",
  "category": "反馈",
  "layer": "primitive",
  "source": "local",
  "exports": [
    "Progress",
    "ProgressLabel",
    "ProgressValue",
    "ProgressTrack",
    "ProgressIndicator",
    "ProgressPrimitive"
  ],
  "keywords": [
    "progress"
  ],
  "decisions": "动画和时间不能提供完成事实；0 与 null 不同。", decisionsEn: "Animation and time establish no completion fact. Zero differs from null.",
  "design": {
    "methods": [
      "名实相符",
      "进退相承"
    ],
    "whenToUse": [
      "有可靠完成比例，或已知正在进行但缺少比例。"
    ],
    "avoid": [
      "动画和时间不能提供完成事实；0 与 null 不同。"
    ],
    "composition": [
      "Label 关联任务；Value 默认按真实 null 显示已有 locale 的进行中，调用方格式化内容优先。"
    ],
    "stateOwner": {
      "library": [
        "原生语义、公共组合与集中角色。"
      ],
      "application": [
        "对象、内容、值、状态与请求结果。"
      ]
    },
    "responsive": [
      "任务名称与格式化读数允许换行；轨厚由独立进度角色控制。"
    ],
    "customization": [
      "使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。"
    ]
  }, designEn: {"whenToUse":["A reliable completion ratio exists, or work is known to be underway without a ratio."],"avoid":["Animation and time establish no completion fact. Zero differs from null."],"composition":["Label names the task; Value defaults to localized in-progress for actual null, with caller formatting taking precedence."],"stateOwner":{"library":["Native semantics, public composition, and centralized roles."],"application":["Objects, content, values, states, and request outcomes."]},"responsive":["Task names and formatted readings wrap; an independent progress role controls track thickness."],"customization":["Public render/refs, ARIA, events, and styles; keep theme axes independent."]},
  "api": [
    {
      "name": "Progress",
      "description": "Label 关联任务；Value 默认按真实 null 显示已有 locale 的进行中，调用方格式化内容优先。", descriptionEn: "Label names the task; Value defaults to localized in-progress for actual null, with caller formatting taking precedence.",
      "props": [
        {
          "name": "value",
          "type": "number | null",
          "description": "已确认值；null 才是不定进度，不输出 aria-valuenow。", descriptionEn: "Confirmed value; only null is indeterminate and omits aria-valuenow."
        },
        {
          "name": "min / max",
          "type": "number",
          "description": "有限递增范围且分母有限；越界或不合法输入抛 RangeError。", descriptionEn: "A finite increasing range with a finite denominator; invalid or out-of-range values throw RangeError."
        },
        {
          "name": "format / locale / getAriaValueText",
          "type": "Base UI Progress props",
          "description": "数字格式跟随 locale（默认 UILocale）；真实 null 的默认 ARIA 文案使用现有 buttonInProgress，getAriaValueText 定制优先。", descriptionEn: "Number formatting follows locale, defaulting to UILocale. Actual null uses existing buttonInProgress ARIA text; getAriaValueText takes precedence."
        },
        {
          "name": "render / ref / 原生属性", nameEn: "render / ref / native props",
          "type": "current public component props",
          "description": "属性、事件与ref透传实际元素；样式由className/style调整。", descriptionEn: "Forward attributes, events, and refs to the actual element; adjust presentation through className/style."
        }
      ]
    },
    {
      "name": "ProgressLabel",
      "description": "登记实际任务的可访问名称。", descriptionEn: "Registers the actual task's accessible name."
    },
    {
      "name": "ProgressValue",
      "description": "已确认读数保留数字格式；真实 null 默认显示本地化进行中，children 回调定制优先。", descriptionEn: "Confirmed readings retain number formatting; actual null defaults to localized in-progress, with a children callback taking precedence."
    },
    {
      "name": "ProgressTrack",
      "description": "实际进度的视觉轨道；消费独立轨厚角色。", descriptionEn: "The visual progress track consumes an independent thickness role."
    },
    {
      "name": "ProgressIndicator",
      "description": "已确认进度的比例；不定状态是一段移动的窄带，与确定态同形，只是位置不可知。", descriptionEn: "Confirmed progress ratio; the indeterminate state is a moving narrow band with the same form as determinate progress, only its position unknown."
    },
    {
      "name": "ProgressPrimitive",
      "description": "Base UI Progress 公共原语。", descriptionEn: "Public Base UI Progress primitive."
    }
  ]
} satisfies ComponentMeta;
