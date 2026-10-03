import type { ComponentMeta } from "@/lib/types";
export default {
  "title": "数据集合 DataTable",
  "titleEn": "DataTable",
  "description": "调用方真实集合的比较、排序与范围选择。",
  "descriptionEn": "Comparison, sorting and scoped selection for a real caller-owned collection.",
  "category": "数据展示",
  "layer": "pattern",
  "source": "local",
  "exports": [
    "DataTable",
    "DataTableSortButton",
    "DataTableSelectionCell",
    "DataTableSelectAll"
  ],
  "decisions": "TanStack 实例与 getRowId 由应用提供；筛选/当前页选择只改该范围，保留范围外选择。",
  "decisionsEn": "Applications supply the TanStack instance and getRowId; filtered/page selection changes only its scope and preserves outside selections.",
  "api": [
    {
      "name": "DataTable",
      "description": "原生二维集合。",
      "descriptionEn": "A native two-dimensional collection.",
      "props": [
        {
          "name": "table / emptyContent / caption / busy / containerProps",
          "type": "TableInstance<T> / ReactNode / TableContainerProps",
          "description": "getRowId 必填、至少一列；零值/caption 保留，busy 不删除有效 rows。",
          "descriptionEn": "GetRowId and at least one visible column are required; zero and caption are retained, and busy preserves valid rows."
        },
        {
          "name": "columnDef.meta.rowHeader",
          "type": "boolean",
          "description": "实际行标题用 th scope=row；比较列不自动隐藏。",
          "descriptionEn": "Actual row headers use th scope=row; comparison columns are never automatically hidden."
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
      "name": "DataTableSortButton",
      "description": "应用实例的真实排序入口。",
      "descriptionEn": "A real sorting control for the caller instance.",
      "props": [
        {
          "name": "column / Button props",
          "type": "Column<T, unknown> / ButtonProps",
          "description": "触发 TanStack sorter；仅主排序表头写 aria-sort，多重顺序由应用补充。",
          "descriptionEn": "Invokes TanStack sorting; only the primary header gets aria-sort, and applications explain secondary sort order."
        }
      ]
    },
    {
      "name": "DataTableSelectionCell / DataTableSelectAll",
      "description": "行选择与显式范围选择。",
      "descriptionEn": "Row selection and explicit scope selection.",
      "props": [
        {
          "name": "row / table / scope / aria-label",
          "type": "Row<T> / TableInstance<T> / page | filtered / string",
          "description": "全选的 aria-label 和 scope 必填；checked/mixed 只看该范围可选择 rows。",
          "descriptionEn": "Select-all requires aria-label and scope; checked/mixed considers only selectable rows in that scope."
        },
        {
          "name": "onCheckedChange / disabled / ref",
          "type": "CheckboxProps",
          "description": "取消原语细节可阻止改变选择，禁用行不进入全选。",
          "descriptionEn": "Primitive cancellation prevents selection changes; disabled rows are excluded from select-all."
        }
      ]
    }
  ],
  "notes": [
    "TanStack 为已声明的可选 peer；应用明确启用排序/筛选/分页模型。"
  ],
  "notesEn": [
    "TanStack is a declared optional peer; applications explicitly enable sorting, filtering and pagination models."
  ],
  "design": {
    "methods": [
      "名实相符",
      "相成相制",
      "布白有用"
    ],
    "whenToUse": [
      "真实集合按共同维度比较并需要排序或选择。"
    ],
    "avoid": [
      "不请求服务、不猜总数、不把未知当空、不自动删列。"
    ],
    "stateOwner": {
      "library": [
        "表格语义、公共组合与范围选择。"
      ],
      "application": [
        "TanStack 实例、数据、稳定标识、模型配置与状态。"
      ]
    },
    "responsive": [
      "桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。"
    ],
    "customization": [
      "控件档案、间距和浮层表面消费现有角色；具体外观是预设。"
    ]
  }, designEn: {"whenToUse":["Compare an actual collection along shared dimensions with sorting or selection."],"avoid":["Requesting services, guessing totals, treating unknown as empty, or automatically removing columns."],"stateOwner":{"library":["Table semantics, public composition, and scoped selection."],"application":["TanStack instance, data, stable identifiers, model configuration, and state."]},"responsive":["Keep actual desktop structure; menus fit available space and tables retain complete comparison columns."],"customization":["Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset."]}
} satisfies ComponentMeta;
