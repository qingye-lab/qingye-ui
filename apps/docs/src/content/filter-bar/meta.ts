import type { ComponentMeta } from "@/lib/types";
export default {
  "title": "筛选条件 FilterBar",
  "titleEn": "FilterBar",
  "description": "分开显示草稿条件与已应用事实。",
  "descriptionEn": "Shows draft conditions separately from applied facts.",
  "category": "表单",
  "layer": "pattern",
  "source": "local",
  "exports": [
    "FilterBar",
    "FilterBarFields",
    "FilterBarApplied",
    "FilterBarStatus",
    "FilterBarActions",
    "FilterBarApply",
    "FilterBarCancel",
    "FilterBarClear"
  ],
  "decisions": "dirty 和 appliedSummary 是必填事实；点击应用只发出意图，库不修改条件或请求结果。",
  "decisionsEn": "Dirty and appliedSummary are required facts; Apply emits intent without changing conditions or requesting results.",
  "api": [
    {
      "name": "FilterBar",
      "description": "原生筛选 form 与事实上下文。",
      "descriptionEn": "A native filter form and fact context.",
      "props": [
        {
          "name": "dirty / appliedSummary / disabled / canClear",
          "type": "boolean / ReactNode",
          "description": "应用明确草稿差异、已应用摘要与是否可清除；零值保留。",
          "descriptionEn": "Applications supply draft differences, applied summary and clear availability; zero is retained."
        },
        {
          "name": "onApply / onCancel / onClear / onSubmit",
          "type": "native event callbacks",
          "description": "onSubmit.preventDefault() 取消应用；Apply 阻止浏览器导航。",
          "descriptionEn": "onSubmit.preventDefault() cancels Apply; Apply prevents native navigation."
        },
        {
          "name": "render / ref / native props",
          "type": "Base UI part props",
          "description": "属性和 ref 归属实际元素；调用方事件与样式保留。",
          "descriptionEn": "Props and refs target actual elements; caller events and styles are preserved."
        }
      ]
    },
    {
      "name": "FilterBarFields / FilterBarApplied / FilterBarStatus / FilterBarActions",
      "description": "fieldset、摘要、待应用状态与同组操作。",
      "descriptionEn": "Fieldset, summary, unapplied status and related actions.",
      "props": [
        {
          "name": "render / ref / native props",
          "type": "Base UI part props",
          "description": "属性和 ref 归属实际元素；调用方事件与样式保留。",
          "descriptionEn": "Props and refs target actual elements; caller events and styles are preserved."
        }
      ]
    },
    {
      "name": "FilterBarApply / FilterBarCancel / FilterBarClear",
      "description": "复用 Button 的真实意图入口。",
      "descriptionEn": "Real intent controls composed from Button.",
      "props": [
        {
          "name": "children / disabled / onClick / ref",
          "type": "ButtonProps",
          "description": "按钮不自行更新草稿；缺少处理器或不可用事实时禁用。",
          "descriptionEn": "Buttons never edit drafts; missing handlers or unavailable facts disable actions."
        }
      ]
    }
  ],
  "notes": [
    "Field/Input 放在 Fields 中；清除是应用策略，不伪造结果。"
  ],
  "notesEn": [
    "Place Field/Input inside Fields; clearing follows application policy and never fabricates results."
  ],
  "design": {
    "methods": [
      "名实相符",
      "相成相制",
      "布白有用"
    ],
    "whenToUse": [
      "多个条件需要明确应用/取消边界。"
    ],
    "avoid": [
      "不要把草稿数量当作已应用结果数量。"
    ],
    "stateOwner": {
      "library": [
        "原生提交、fieldset 禁用与状态标记。"
      ],
      "application": [
        "草稿、已应用条件、结果、计数和异步执行。"
      ]
    },
    "responsive": [
      "桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。"
    ],
    "customization": [
      "控件档案、间距和浮层表面消费现有角色；具体外观是预设。"
    ]
  }, designEn: {"whenToUse":["Several conditions need explicit apply/cancel boundaries."],"avoid":["Treating draft condition counts as applied result counts."],"stateOwner":{"library":["Native submission, fieldset disabling, and state markers."],"application":["Drafts, applied conditions, results, counts, and asynchronous execution."]},"responsive":["Keep actual desktop structure; menus fit available space and tables retain complete comparison columns."],"customization":["Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset."]}
} satisfies ComponentMeta;
