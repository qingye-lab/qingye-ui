import type { ComponentMeta } from "@/lib/types";
export default {
  "title": "批量操作 BulkActionBar",
  "titleEn": "BulkActionBar",
  "description": "明确对象、版本与范围的共同动作。",
  "descriptionEn": "Shared actions with explicit targets, versions and scope.",
  "category": "通用",
  "layer": "pattern",
  "source": "local",
  "exports": [
    "BulkActionBar",
    "BulkActionBarActions",
    "BulkActionBarAction",
    "BulkActionBarClear",
    "BulkActionBarExtend"
  ],
  "decisions": "targets 与 scope 必填；执行传递当前对象版本快照，零选择禁止执行。",
  "decisionsEn": "Targets and scope are required; execution receives the current target/version snapshot, and zero selection prevents execution.",
  "keywords": ["bulk", "batch", "批量", "批量操作", "多选操作", "已选"],
  "api": [
    {
      "name": "BulkActionBar",
      "description": "可识别的作用对象与范围。",
      "descriptionEn": "Identifiable operation targets and scope.",
      "props": [
        {
          "name": "targets / scope",
          "type": "readonly BulkActionTarget[] / string",
          "description": "每项 id/label/version 必填，id 唯一；version=0 合法；scope 非空。",
          "descriptionEn": "Each target requires id, label and version; IDs are unique, version=0 is valid and scope is nonempty."
        },
        {
          "name": "extent",
          "type": "{ count: number; label: string }",
          "description": "应用定义的整个集合（count 为正整数、label 非空）；显示计数与 label 而不列对象，targets 可为空，快照带 extent，由应用按自己持有的查询执行。",
          "descriptionEn": "An application-defined whole set (positive integer count, nonempty label); shows count and label instead of listing targets, targets may be empty, and the snapshot carries extent for the application to execute against its own query."
        },
        {
          "name": "sticky",
          "type": "boolean",
          "description": "吸附在最近的滚动容器顶端（Workspace 中为 WorkspaceContent），不能放进带 overflow 的中间容器；吸住且有内容滚过时才出现分界线（data-stuck）。",
          "descriptionEn": "Sticks to the nearest scroll container (WorkspaceContent in a Workspace); do not place it inside an intermediate overflow container. The divider appears only while stuck with content scrolling beneath (data-stuck)."
        },
        {
          "name": "disabled / onClear",
          "type": "boolean / callback",
          "description": "清除收到当前快照，不取消服务或自行清空应用状态。",
          "descriptionEn": "Clear receives the current snapshot; it never cancels a service or clears application state itself."
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
      "name": "BulkActionBarExtend",
      "description": "把本页选择扩展为整个集合的入口；仅在调用方渲染时出现，不推断是否还有更多。",
      "descriptionEn": "Entry that extends the page selection to the whole set; it appears only when rendered and never infers whether more exist.",
      "props": [
        {
          "name": "count / onExtend",
          "type": "number / (event) => void",
          "description": "默认文字「选择全部 N 项」，数字按界面语言分组；onClick.preventDefault() 取消。",
          "descriptionEn": "Default text is Select all N items with locale-grouped digits; onClick.preventDefault() cancels."
        }
      ]
    },
    {
      "name": "BulkActionBarActions / BulkActionBarAction / BulkActionBarClear",
      "description": "同组动作与清除选择。",
      "descriptionEn": "Related actions and selection clearing.",
      "props": [
        {
          "name": "onExecute",
          "type": "(snapshot, event) => void",
          "description": "onClick.preventDefault() 取消；危险操作需另外提供后果保护。",
          "descriptionEn": "onClick.preventDefault() cancels execution; dangerous actions require separate consequence protection."
        },
        {
          "name": "Button props",
          "type": "ButtonProps",
          "description": "尺寸、ref、render 与真实禁用消费当前 Button。",
          "descriptionEn": "Sizes, refs, render and actual disabled behavior use the current Button."
        }
      ]
    }
  ],
  "notes": [
    "库显示对象版本而不推断新旧；应用在执行边界复核实际版本。"
  ],
  "notesEn": [
    "The library displays versions without judging freshness; applications revalidate actual versions at execution."
  ],
  "design": {
    "methods": [
      "名实相符",
      "相成相制",
      "布白有用"
    ],
    "whenToUse": [
      "已明确选择对象的共同操作。"
    ],
    "avoid": [
      "工具组 Toolbar 不能推断对象或版本；不造后端确认。"
    ],
    "stateOwner": {
      "library": [
        "快照传递、范围呈现与零选择禁用。"
      ],
      "application": [
        "对象、版本、范围、权限、后果与执行结果。"
      ]
    },
    "responsive": [
      "桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。"
    ],
    "customization": [
      "控件档案、间距和浮层表面消费现有角色；具体外观是预设。"
    ]
  }, designEn: {"whenToUse":["Shared actions for explicitly selected objects."],"avoid":["Toolbar cannot infer objects or versions; do not invent backend confirmation."],"stateOwner":{"library":["Snapshot delivery, scope presentation, and disabling zero-selection actions."],"application":["Objects, versions, scope, permissions, consequences, and execution outcomes."]},"responsive":["Keep actual desktop structure; menus fit available space and tables retain complete comparison columns."],"customization":["Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset."]}
} satisfies ComponentMeta;
