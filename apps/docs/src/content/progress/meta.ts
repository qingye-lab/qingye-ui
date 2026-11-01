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
  "keywords": ["progress", "progress bar", "loading", "percent", "进度条", "加载", "百分比", "完成度"],
  "decisions": "动画和时间不能提供完成事实；0 与 null 不同。离散的量用 segments 分格：空隙是遮罩切出的透明缝，不画底色；值必须落在格边界上，不显示半格。值变化时填充长度过渡到新长度（首次渲染不动；减少动效或键盘操作下立即到位）；过渡只是反馈，不提供完成事实。", decisionsEn: "Animation and time establish no completion fact. Zero differs from null. A discrete quantity uses segments: the gaps are transparent cuts made by a mask, not a painted color, and the value must sit on a cell boundary, never half a cell. When the value changes the fill travels to its new length (nothing animates on first render; with reduced motion or keyboard input it lands at once). The move is feedback, not a completion fact.",
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
      "Label 关联任务；Value 默认按真实 null 显示已有 locale 的进行中，调用方格式化内容优先。",
      "总共 n 级的阶段条用 segments={n}；阶段名由 getAriaValueText 或 aria-valuetext 给出，例如「四龄，第 4 / 7 阶段」。"
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
  }, designEn: {"whenToUse":["A reliable completion ratio exists, or work is known to be underway without a ratio."],"avoid":["Animation and time establish no completion fact. Zero differs from null."],"composition":["Label names the task; Value defaults to localized in-progress for actual null, with caller formatting taking precedence.","A stage bar of n levels uses segments={n}; stage names come from getAriaValueText or aria-valuetext, for example \"Fourth instar, stage 4 of 7\"."],"stateOwner":{"library":["Native semantics, public composition, and centralized roles."],"application":["Objects, content, values, states, and request outcomes."]},"responsive":["Task names and formatted readings wrap; an independent progress role controls track thickness."],"customization":["Public render/refs, ARIA, events, and styles; keep theme axes independent."]},
  "notes": ["长任务按事实分阶段：已提交但无法计数用 value={null}，处理中数已确认的项，结束后用 Alert 说明完成或部分失败，列出失败项并给「重试失败项」。进度条不承担结果说明。"],
  notesEn: ["Stage a long task by what is known: submitted but uncountable uses value={null}, processing counts confirmed items, and afterwards an Alert states completion or partial failure, lists the failed items and offers a retry. The bar does not carry the outcome."],
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
          "name": "segments",
          "type": "number",
          "description": "离散的 n 级：轨道按 n 个等宽格分开，格间留 2px 透明空隙。n 为 2 以上的整数；value 不能为 null，且 (value − min) 必须是 (max − min)/n 的整数倍，否则抛 RangeError。阶段名用 getAriaValueText 给出。", descriptionEn: "A discrete scale of n levels: the track splits into n equal cells with a 2px transparent gap. n is an integer of 2 or more; value cannot be null and (value − min) must be a whole multiple of (max − min)/n, otherwise RangeError is thrown. Name stages with getAriaValueText."
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
