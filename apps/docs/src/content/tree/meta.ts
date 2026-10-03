import type { ComponentMeta } from "@/lib/types";
export default {
  "title": "层级集合 Tree",
  "titleEn": "Tree",
  "description": "稳定节点的层级、展开、焦点与独立单选。",
  "descriptionEn": "Hierarchy, expansion, focus and independent single selection for stable nodes.",
  "category": "导航",
  "layer": "pattern",
  "source": "local",
  "exports": [
    "Tree"
  ],
  "decisions": "expandedIds 与 selectedId 分开；聚焦不选择，隐藏节点不强行清除既有选择。",
  "decisionsEn": "Expanded IDs and selected ID are separate; focus never selects, and hidden nodes do not automatically clear selection.",
  "api": [
    {
      "name": "Tree",
      "description": "完整层级集合。",
      "descriptionEn": "A complete hierarchical collection.",
      "props": [
        {
          "name": "nodes",
          "type": "readonly TreeNode[]",
          "description": "id/label 必须非空且 id 全树唯一；disabled 与 children 显式提供。",
          "descriptionEn": "IDs and labels must be nonempty; IDs are unique across the tree. Disabled and children are explicit."
        },
        {
          "name": "expandedIds / defaultExpandedIds / onExpandedChange",
          "type": "readonly string[] / callback",
          "description": "展开独立于选择；details.cancel() 不提交。",
          "descriptionEn": "Expansion is independent of selection; details.cancel() prevents commit."
        },
        {
          "name": "selectedId / defaultSelectedId / onSelectionChange",
          "type": "string | null / callback",
          "description": "单选独立于焦点，可取消；不猜测业务状态。",
          "descriptionEn": "Single selection is independent of focus and cancellable; no business state is inferred."
        },
        {
          "name": "selectable / disabled / emptyContent",
          "type": "boolean / ReactNode",
          "description": "默认 selectable=true；空树可聚焦，内容由调用方或 locale 提供。",
          "descriptionEn": "Selectable defaults to true; empty trees remain focusable with caller or locale content."
        },
        {
          "name": "render / ref / native props",
          "type": "Base UI part props",
          "description": "属性和 ref 归属实际元素；调用方事件与样式保留。",
          "descriptionEn": "Props and refs target actual elements; caller events and styles are preserved."
        }
      ]
    }
  ],
  "notes": [
    "移除焦点节点回到可用节点；清空回到拥有焦点的容器，不抢走外部焦点。"
  ],
  "notesEn": [
    "Removing a focused node finds an enabled fallback; clearing returns owned focus to the container without stealing outside focus."
  ],
  "design": {
    "methods": [
      "名实相符",
      "相成相制",
      "布白有用"
    ],
    "whenToUse": [
      "真实层级需要键盘定位和独立选择。"
    ],
    "avoid": [
      "平面比较用 DataTable；不内置懒加载、多选或请求。"
    ],
    "stateOwner": {
      "library": [
        "roving focus、稳定 key 与焦点恢复。"
      ],
      "application": [
        "节点、展开、选择、禁用与空/未知语义。"
      ]
    },
    "responsive": [
      "桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。"
    ],
    "customization": [
      "控件档案、间距和浮层表面消费现有角色；具体外观是预设。"
    ]
  }, designEn: {"whenToUse":["An actual hierarchy needs keyboard positioning and independent selection."],"avoid":["Use DataTable for flat comparison; no built-in lazy loading, multiple selection, or requests."],"stateOwner":{"library":["Roving focus, stable keys, and focus recovery."],"application":["Nodes, expansion, selection, disabled, and empty/unknown semantics."]},"responsive":["Keep actual desktop structure; menus fit available space and tables retain complete comparison columns."],"customization":["Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset."]},
  "keyboard": [
    {
      "keys": "↑ / ↓ / Home / End",
      "description": "在可见且可用节点间移动。",
      "descriptionEn": "Move between visible enabled nodes."
    },
    {
      "keys": "← / →",
      "description": "关闭/展开或移动到父/子节点；RTL 相反。",
      "descriptionEn": "Collapse/expand or move to parent/child; reversed in RTL."
    },
    {
      "keys": "Enter / Space / 字首", keysEn: "Enter / Space / Typeahead",
      "description": "单选当前节点，或按标签字首定位。",
      "descriptionEn": "Select the current node, or navigate by a label's first character."
    }
  ]
} satisfies ComponentMeta;
