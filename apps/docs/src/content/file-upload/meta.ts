import type { ComponentMeta } from "@/lib/types";

export default {
  title: "文件上传 FileUpload",
  description: "拖放或点选文件，按类型、大小和数量校验后列出。组件只管理文件列表，不发起上传；进度与错误由你传入。",
  category: "表单",
  source: "local",
  exports: ["FileUpload", "formatFileSize"],
  keywords: ["upload", "file", "dropzone", "上传", "附件", "拖拽"],
  design: {
    "methods": [
      "名实相符",
      "相成相制",
      "进退相承",
      "布白有用"
    ],
    "whenToUse": [
      "选择或拖入文件，逐项核对被接受文件、拒绝原因和上传状态。"
    ],
    "avoid": [
      "选进队列不代表上传完成；进度不能伪造服务端处理或已取消结果。"
    ],
    "composition": [
      "按钮或 dropzone 提供入口，列表保持文件身份，原位 rejection 和行内 actions 承接修正。"
    ],
    "stateOwner": {
      "library": [
        "文件选择、类型大小数量校验、已接受列表、原生提交镜像和移除焦点。"
      ],
      "application": [
        "上传、重试、取消请求、结果核实与持久化。"
      ]
    },
    "responsive": [
      "长文件名收缩并保留完整 title；行内错误与恢复动作不能遮住移除入口。"
    ],
    "customization": [
      "getProgress 和 getError 只展示宿主事实，renderActions 复用公共 Button 实现恢复。"
    ]
  },
  api: [
    {
      name: "FileUpload",
      description: "拖放区（或紧凑按钮）+ 文件列表 + 校验提示。",
      props: [
        { name: "files / defaultFiles", type: "readonly File[]", description: "受控 / 非受控的文件列表。" },
        { name: "onFilesChange", type: "(files: File[]) => void", description: "添加或移除后调用，参数是完整列表。" },
        { name: "onReject", type: "(rejected: FileRejection[]) => void", description: "有文件未通过校验时调用；reason 为 type | size | count。" },
        { name: "accept", type: "string", description: "与 <input accept> 相同，例如 \"image/*,.pdf\"。" },
        { name: "maxSize", type: "number", default: "Infinity", description: "单个文件上限（字节）。" },
        { name: "maxFiles", type: "number", default: "Infinity", description: "最多保留的文件数；为 1 时新选的文件替换旧文件。" },
        { name: "variant", type: '"dropzone" | "button"', default: '"dropzone"', description: "大面积拖放区，或适合密集表单的按钮触发。" },
        { name: "thumbnails", type: "boolean", default: "false", description: "图片文件显示缩略图。" },
        { name: "getProgress", type: "(file, index) => number | null | undefined", description: "0–100 的上传进度；返回空值时显示文件大小。" },
        { name: "getError", type: "(file, index) => ReactNode", description: "单个文件的错误信息，例如上传失败。" },
        { name: "renderActions", type: "(file, index) => ReactNode", description: "每行移除按钮前的额外操作，例如重试。" },
        { name: "name", type: "string", description: "字段名；浏览器支持 DataTransfer 时，隐藏输入与已接受列表同步；拒绝或重复选择不清掉原有文件。" },
        { name: "invalid", type: "boolean", default: "false", description: "错误边框；同时提供可见的错误文字。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用拖放、选择与移除。" },
        { name: "label / description / chooseLabel", type: "string / ReactNode", description: "覆盖默认文案。" },
        { name: "removeLabel / rejectionLabel", type: "(file) => string / (rejection) => string", description: "移除按钮名称与校验提示的文案。" },
        { name: "buttonProps", type: "ButtonProps", description: "button 形态下触发按钮的 variant、size 等。" },
      ],
    },
    { name: "formatFileSize", description: "字节数 → 「1.5 MB」这样的可读大小。" },
  ],
  keyboard: [
    { keys: "Tab", description: "聚焦拖放区（或按钮），再依次聚焦每个文件的移除按钮。" },
    { keys: "Enter / Space", description: "打开系统文件选择框。" },
    { keys: "Enter / Space（移除按钮）", description: "移除该文件，焦点移到下一个文件或拖放区。" },
  ],
  notes: [
    "组件不上传文件：在 onFilesChange 中自行上传，再通过 getProgress / getError 回显状态。",
    "说明文字写清允许的格式和大小，校验失败时会以 role=alert 读出原因。",
    "图片缩略图使用对象 URL，文件移除或组件卸载时自动释放。",
  ],
} satisfies ComponentMeta;
