import type { ComponentMeta } from "@/lib/types";

export default {
  "title": "测量 Meter",
  "titleEn": "Meter",
  "description": "表达真实范围内的测量值。",
  "descriptionEn": "A real measurement over a valid range.",
  "category": "反馈",
  "layer": "primitive",
  "source": "local",
  "exports": [
    "Meter",
    "MeterLabel",
    "MeterValue",
    "MeterTrack",
    "MeterIndicator",
    "MeterPrimitive"
  ],
  "keywords": ["meter", "gauge", "measure", "仪表", "度量", "用量", "容量"],
  "decisions": "任务完成比例使用 Progress；未知测量不要填0。读数本身是若干整格时用 segments 分格，读屏读出的仍是读数；对象的有序级别读出的是级别名称，用 SeverityMark。状态类别 tone 由调用方声明，色相之外格数或读数仍承担同一事实。值变化时填充长度过渡到新长度（首次渲染不动；减少动效或键盘操作下立即到位）。", decisionsEn: "Use Progress for task completion. Unknown measurements must not become zero. When the reading itself counts whole cells, use segments and the screen reader still reads the reading; an ordered level of an object reads as the level's name, so use SeverityMark. tone is declared by the caller, and the cell count or reading still carries the fact without hue. When the value changes the fill travels to its new length (nothing animates on first render; with reduced motion or keyboard input it lands at once).",
  "design": {
    "methods": [
      "名实相符",
      "布白有用"
    ],
    "whenToUse": [
      "表达一个有效范围内的测量值及单位，读屏读出读数。"
    ],
    "avoid": [
      "任务完成比例使用 Progress；未知测量不要填0。",
      "对象带有一个有次序的级别、读出的是级别名称（如高、中、低）时用 SeverityMark；对象处于哪一种状态用 StatusDot。"
    ],
    "composition": [
      "Label 关联名称，Value 展示实际读数，轨与指示不猜测好坏。",
      "segments 只给本身以整格计的读数分格，getAriaValueText 读出实际读数与单位；一行对象的级别用 SeverityMark。"
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
      "测量名称与格式化读数允许换行；轨厚由独立测量角色控制。"
    ],
    "customization": [
      "使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。"
    ]
  }, designEn: {"whenToUse":["Present a measurement over a valid range, with its unit; screen readers read the reading."],"avoid":["Use Progress for task completion. Unknown measurements must not become zero.","Use SeverityMark when an object has an ordered level read as its name (such as high, medium, low); use StatusDot for which state an object is in."],"composition":["Label associates the name, Value presents the actual reading, and track/indicator infer no judgment.","segments only splits a reading that itself counts whole cells; getAriaValueText reads the actual reading and unit. A row's level uses SeverityMark."],"stateOwner":{"library":["Native semantics, public composition, and centralized roles."],"application":["Objects, content, values, states, and request outcomes."]},"responsive":["Measurement names and formatted readings wrap; an independent measurement role controls track thickness."],"customization":["Public render/refs, ARIA, events, and styles; keep theme axes independent."]},
  "api": [
    {
      "name": "Meter",
      "description": "Label 关联名称，Value 展示实际读数，轨与指示不猜测好坏。", descriptionEn: "Label associates the name, Value presents the actual reading, and track/indicator infer no judgment.",
      "props": [
        {
          "name": "value / min / max",
          "type": "number",
          "description": "已知有限值及递增范围；越界、非有限或倒置范围抛 RangeError。", descriptionEn: "A known finite value in an increasing range; out-of-range, nonfinite, or reversed inputs throw RangeError."
        },
        {
          "name": "segments",
          "type": "number",
          "description": "以 n 个整格计的读数：轨道按 n 个等宽格分开，格间留 2px 透明空隙。n 为 2 以上的整数；(value − min) 必须是 (max − min)/n 的整数倍，否则抛 RangeError。实际读数与单位用 getAriaValueText 给出。", descriptionEn: "A reading counted in n whole cells: the track splits into n equal cells with a 2px transparent gap. n is an integer of 2 or more; (value − min) must be a whole multiple of (max − min)/n, otherwise RangeError is thrown. Give the actual reading and unit with getAriaValueText."
        },
        {
          "name": "tone",
          "type": "\"danger\" | \"warning\" | \"success\" | \"info\"",
          "description": "指示的状态类别，由调用方声明，组件不从数值猜好坏；根上带 data-tone。不给时用主色。非法值抛 RangeError。", descriptionEn: "The indicator's status category, declared by the caller; the component does not guess good or bad from the value. The root carries data-tone. Omitted, the primary color is used. An invalid value throws RangeError."
        },
        {
          "name": "format / locale / getAriaValueText",
          "type": "Base UI Meter props",
          "description": "真实单位和可访问读数；locale 默认跟随 UILocale。", descriptionEn: "Actual units and accessible readings; locale defaults to UILocale."
        },
        {
          "name": "render / ref / 原生属性", nameEn: "render / ref / native props",
          "type": "current public component props",
          "description": "属性、事件与ref透传实际元素；样式由className/style调整。", descriptionEn: "Forward attributes, events, and refs to the actual element; adjust presentation through className/style."
        }
      ]
    },
    {
      "name": "MeterLabel",
      "description": "登记测量对象的可访问名称。", descriptionEn: "Registers the measured object's accessible name."
    },
    {
      "name": "MeterValue",
      "description": "真实测量读数及调用方格式化内容。", descriptionEn: "Actual measurement and caller-formatted content."
    },
    {
      "name": "MeterTrack",
      "description": "测量范围的视觉轨道；消费独立轨厚角色。", descriptionEn: "A visual measurement range using an independent track-thickness role."
    },
    {
      "name": "MeterIndicator",
      "description": "由公共 Meter 上下文计算实际测量比例。", descriptionEn: "Computes the actual measurement ratio from public Meter context."
    },
    {
      "name": "MeterPrimitive",
      "description": "Base UI Meter 公共原语。", descriptionEn: "Public Base UI Meter primitive."
    }
  ]
} satisfies ComponentMeta;
