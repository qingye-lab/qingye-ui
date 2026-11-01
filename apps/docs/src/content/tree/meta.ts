import type { ComponentMeta } from "@/lib/types";
export default {
  "title": "层级集合 Tree",
  "titleEn": "Tree",
  "description": "稳定节点的层级、展开、焦点、独立单选与可选的级联勾选。",
  "descriptionEn": "Hierarchy, expansion, focus, independent single selection, and an optional cascading checkable mode for stable nodes.",
  "category": "导航",
  "layer": "pattern",
  "source": "local",
  "exports": [
    "Tree"
  ],
  "decisions": "expandedIds 与 selectedId 分开；加载与失败是组件自己看得见的事实，不当成「没有子项」；过滤只隐藏、不改变值与派生的勾选状态；拖放只报告、不持有数据。聚焦不选择，隐藏节点不强行清除既有选择。checkable 与 selectable 的点击不组合：checkable 为 true 时行点击与 Space 勾选，不再单选，避免同一次点击承担两种互相冲突的意图。checkedIds 只含叶子节点 id；分支的勾选是派生显示（true / false / mixed），从不写回值，避免「勾一个分支」被多计成 N+1 项。级联只触达启用的叶子：禁用节点保留给定的勾选事实，不被祖先的勾选/取消改变；分支在其启用的叶子后代全部勾选时显示为已勾选，即使存在未勾选的禁用后代。",
  "decisionsEn": "Expanded IDs and selected ID are separate; loading and failure are facts the component sees for itself and are never taken for \"no children\"; filtering only hides and never changes the value or derived checks; dragging only reports and holds no data. focus never selects, and hidden nodes do not automatically clear selection. Checkable and selectable clicks do not combine: when checkable is true, row clicks and Space toggle the check instead of selecting, so one click never carries two conflicting intents. checkedIds holds only leaf ids; a branch's checked state is a derived display (true / false / mixed) and is never written back into the value, so checking one branch cannot be miscounted as N+1 items. Cascade only touches enabled leaves: a disabled node keeps the checked fact it was given and cascade from an ancestor never changes it; a branch displays as fully checked once every one of its enabled leaf descendants is checked, even with unchecked disabled descendants remaining.",
  "keywords": ["tree view", "hierarchy", "树", "树形", "层级", "目录树"],
  "api": [
    {
      "name": "Tree",
      "description": "完整层级集合。",
      "descriptionEn": "A complete hierarchical collection.",
      "props": [
        {
          "name": "nodes",
          "type": "readonly TreeNode[]",
          "description": "id/label 必须非空且 id 全树唯一；disabled 与 children 显式提供。isLeaf 声明没有子项，使配了 loadChildren 时也不去加载它。",
          "descriptionEn": "IDs and labels must be nonempty; IDs are unique across the tree. Disabled and children are explicit. isLeaf declares no children, so a node is not loaded even when loadChildren is set."
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
          "name": "checkable",
          "type": "boolean",
          "description": "开启级联多选勾选模式；默认 false。为 true 时行点击与 Space 勾选当前节点，selectable 的单选点击不再生效。",
          "descriptionEn": "Turns on cascading checkable mode; defaults to false. When true, row clicks and Space toggle the checked state instead of selectable's single-select click."
        },
        {
          "name": "checkedIds / defaultCheckedIds / onCheckedChange",
          "type": "readonly string[] / callback",
          "description": "只含叶子节点 id；details.cancel() 不提交。勾选一个分支会把它启用的叶子后代一并加入或移出集合；禁用的叶子保留给定事实，不被级联改变。",
          "descriptionEn": "Holds only leaf ids; details.cancel() prevents commit. Checking a branch adds or removes its enabled leaf descendants together; a disabled leaf keeps the fact it was given and cascade never changes it."
        },
        {
          "name": "defaultFocusedId",
          "type": "string | null",
          "description": "首次渲染时 roving 入口所在的节点，默认是第一个可用节点；节点不可见或不可用时退回最近的可见可用祖先。展开其祖先由调用方通过 expandedIds 负责。TreeSelect 用它让弹层打开时焦点落在已选节点上。",
          "descriptionEn": "The node holding the roving entry on first render, the first enabled node by default; a hidden or disabled node falls back to its nearest visible enabled ancestor. Expanding its ancestors is the caller's job through expandedIds. TreeSelect uses it to land focus on the chosen node when its popup opens."
        },
        {
          "name": "loadChildren",
          "type": "(node: TreeNode) => Promise<readonly TreeNode[]>",
          "description": "第一次展开一个没有 children、也没有标 isLeaf 的节点时调用（命名与 Cascader 一致）。等待时该节点标 aria-busy，并在其下显示 locale 的「正在加载」；reject 时显示「加载失败」与重试按钮（节点上按 → 也可重试）；结果为空数组则该节点成为叶子。结果按节点缓存，组件不重复请求。未加载的分支在 checkable 模式下不能被勾选，点它只会展开。",
          "descriptionEn": "Called when a node with neither children nor isLeaf is expanded for the first time (named as in Cascader). While waiting the node carries aria-busy and shows the locale's \"Loading\" under it; a rejection shows \"Failed to load\" with a retry button (→ on the node retries too); an empty result makes the node a leaf. Results are cached per node and not requested twice. In checkable mode an unloaded branch cannot be checked; clicking it only expands."
        },
        {
          "name": "query",
          "type": "string",
          "description": "按标签过滤：保留匹配的节点及其全部祖先，其余隐藏，匹配的文字用 mark 标出，无匹配时显示 emptyContent。有匹配后代的分支被强制展开（此时它的展开开关不起作用，也不触发 onExpandedChange），清空 query 后回到原来的展开状态。过滤只隐藏：分支的勾选状态与级联仍按完整的树计算。传原始字符串即可，匹配不区分大小写并忽略首尾空白。",
          "descriptionEn": "Filters by label: matching nodes and all their ancestors stay, the rest are hidden, the matched text is marked, and emptyContent shows when nothing matches. A branch with matching descendants is forced open (its toggle then does nothing and onExpandedChange does not fire), and clearing the query restores the earlier expansion. Filtering only hides: a branch's checked state and cascade are still computed on the full tree. Pass the raw string; matching ignores case and surrounding whitespace."
        },
        {
          "name": "draggable / onMove / canDrop",
          "type": "boolean / (move: TreeMove, details: { event, reason: \"keyboard\" | \"pointer\" }) => void / (move: TreeMove) => boolean",
          "description": "draggable 打开调整位置：指针拖放按落点在行内的位置报告 before（上四分之一）、after（下四分之一）或 inside（中间），并画出插入线；键盘用 Ctrl/⌘+X 取起、Alt+↑ / ↓ / Enter 放到当前节点之前 / 之后 / 之内。Tree 不持有数据，只通过 onMove({ nodeId, targetId, position }) 报告，调用方改 nodes。不能放到自身或自身子树里、不能是位置不变的移动、禁用的节点既不能拖也不能作目标；canDrop 返回 false 可进一步禁止。取起、放下、取消与不允许的位置都通过 role=status 的区域播报。",
          "descriptionEn": "draggable turns on repositioning: a pointer drop reports before (top quarter), after (bottom quarter) or inside (middle) by where it lands in the row, with an insertion line; the keyboard picks up with Ctrl/Cmd+X and drops before / after / inside the focused node with Alt+↑ / ↓ / Enter. Tree holds no data and only reports through onMove({ nodeId, targetId, position }); the caller changes nodes. A node cannot go onto itself or into its own subtree, a move that changes nothing is refused, and a disabled node can neither be dragged nor be a target; canDrop returning false forbids more. Picking up, dropping, cancelling and refused places are announced in a role=status region."
        },
        {
          "name": "aria-label / aria-labelledby",
          "type": "string",
          "description": "必填其一：树的名称，落在 role=tree 的根上；缺失或为空时抛错。各节点的名称来自节点自己的 label。",
          "descriptionEn": "One is required: the name of the tree, on the role=tree root. A missing or blank name throws. Each item is named by its own label."
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
    "移除焦点节点回到可用节点；清空回到拥有焦点的容器，不抢走外部焦点。",
    "拖放只报告意图，不改数据：移动是否成立、节点放在哪里由调用方决定，所以同一套规则和同一个 onMove 服务指针与键盘两条路径。draggable 时 Enter 仍是选择，取起用 Ctrl/⌘+X，不抢占已有键。"
  ],
  "notesEn": [
    "Removing a focused node finds an enabled fallback; clearing returns owned focus to the container without stealing outside focus.",
    "Dragging reports intent and never changes data: whether a move holds and where the node lands is the caller's decision, so one set of rules and one onMove serve both the pointer and the keyboard. With draggable, Enter still selects; picking up uses Ctrl/Cmd+X so no existing key is taken."
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
      "平面比较用 DataTable；请求本身由调用方发起，Tree 只管理加载中与失败的状态。收进触发器的选择用 TreeSelect。",
      "同一棵树里混用 checkable 与 selectable 的点击语义：一次点击只承担一种意图。"
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
  }, designEn: {"whenToUse":["An actual hierarchy needs keyboard positioning and independent selection."],"avoid":["Use DataTable for flat comparison; the caller makes the request and Tree only manages the loading and failed states. Use TreeSelect for a choice folded into a trigger.","Mixing checkable and selectable click semantics on the same tree; one click carries one intent."],"stateOwner":{"library":["Roving focus, stable keys, and focus recovery."],"application":["Nodes, expansion, selection, disabled, and empty/unknown semantics."]},"responsive":["Keep actual desktop structure; menus fit available space and tables retain complete comparison columns."],"customization":["Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset."]},
  "keyboard": [
    {
      "keys": "↑ / ↓ / Home / End",
      "description": "在可见且可用节点间移动。",
      "descriptionEn": "Move between visible enabled nodes."
    },
    {
      "keys": "← / →",
      "description": "关闭/展开或移动到父/子节点；RTL 相反。展开与收起由方向键承担；行首的展开图标只供指针使用，不进 Tab 序列，也不进可访问树。",
      "descriptionEn": "Collapse/expand or move to parent/child; reversed in RTL. Expansion belongs to the arrow keys; the chevron at the row start is for pointers only and is outside both the Tab sequence and the accessibility tree."
    },
    {
      "keys": "Ctrl/⌘+X，Alt+↑ / ↓ / Enter，Esc", keysEn: "Ctrl/Cmd+X, Alt+↑ / ↓ / Enter, Esc",
      "description": "仅 draggable：Ctrl/⌘+X 取起当前节点，方向键移动焦点，Alt+↑ 放到焦点节点之前、Alt+↓ 放到之后、Alt+Enter 放到之内，Esc 或焦点离开则取消。每一步都有播报。",
      "descriptionEn": "Only with draggable: Ctrl/Cmd+X picks up the focused node, the arrow keys move focus, Alt+↑ drops before the focused node, Alt+↓ after it and Alt+Enter inside it, and Esc or leaving the tree cancels. Every step is announced."
    },
    {
      "keys": "Enter / Space / 字首", keysEn: "Enter / Space / Typeahead",
      "description": "单选当前节点，或键入标签开头定位：连续键入的字符（间隔 500ms 内，预设）累积成前缀；重复键入同一个字符则在以它开头的节点间循环。checkable 模式下 Space 改为勾选/取消勾选当前节点及其启用的叶子后代，Enter 不触发单选。",
      "descriptionEn": "Select the current node, or type the start of a label to move: characters typed in quick succession (within 500ms, a preset) accumulate into a prefix, and repeating one character cycles through nodes starting with it. In checkable mode, Space toggles the current node and its enabled leaf descendants instead, and Enter does not select."
    }
  ]
} satisfies ComponentMeta;
