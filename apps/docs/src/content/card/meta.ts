import type { ComponentMeta } from "@/lib/types";

export default {
  title: "卡片 Card",
  titleEn: "Card",
  description: "为可独立识别的对象建立内容边界。",
  descriptionEn: "Bound an independently identifiable object.",
  category: "布局",
  layer: "pattern",
  source: "local",
  exports: ["Card"],
  keywords: ["card", "卡片", "独立对象", "panel", "面板"],
  api: [
    {
      name: "Card",
      description: "面板表面、边界与圆角。不生成标题、内容槽、内边距或排列方式。",
      descriptionEn: "Panel surface, boundary and radius. It supplies no title, content slots, padding or layout.",
      props: [
        { name: "render", type: "ReactElement | (props, state) => ReactElement", description: "组合为 article、section 或原生链接，完整保留事件与 ref。", descriptionEn: "Compose an article, section or native link while retaining handlers and refs." },
        { name: "className / style", type: "string / CSSProperties", description: "消费端按对象关系组合布局与内缘；外部类最后合并。", descriptionEn: "Compose layout and content inset for this object. Caller classes are merged last." },
        { name: "原生属性", nameEn: "Native props", type: "ComponentPropsWithRef<\"div\">", description: "透传 id、aria-*、data-*、事件与 ref。", descriptionEn: "Forward id, aria-*, data-*, events and ref." },
      ],
    },
  ],
  decisions: "对象无需独立识别、排序或操作时，用标题与间距组织内容。整张 Card 是链接时，内部不能再嵌套按钮或其他链接。",
  decisionsEn: "Use headings and spacing when content has no independent identity, ordering or actions. A Card rendered as a link cannot contain other links or buttons.",
  notes: [
    "标题用 Heading 或真实 h2/h3；内容与动作由 Stack、Inline 和原生结构组合。",
    "size、CardHeader/Title/Description/Action/Panel/Content/Footer 与 CardFrame* 已移除。",
    "只有同一轮廓等距内缩时才计算内圆角；独立子控件保留自身圆角。",
    "密度、方向与语言由容器继承；Card 不写入这些标记。",
    "当前默认只有线、面与圆角，没有阴影；这是可逆外观选择，项目按实际关系组合阴影。",
  ],
  notesEn: [
    "Use Heading or a real h2/h3, and compose content and actions with Stack, Inline and native structure.",
    "size, CardHeader/Title/Description/Action/Panel/Content/Footer and CardFrame* have been removed.",
    "Calculate an inner radius only for an equally inset contour of the same surface. Independent controls keep their own radii.",
    "Density, direction and language belong to the containing context. Card sets no such markers.",
    "The current default uses a boundary, surface and radius without a shadow. This is a reversible appearance choice; projects can compose shadows where appropriate.",
  ],
  design: {
    methods: ["相成相制", "布白有用"],
    whenToUse: ["对象需要独立识别、排序或操作，其边界参与任务关系。"],
    avoid: ["去掉边框关系不变的内容；整卡链接嵌套交互；用卡片代替所有分节。"],
    composition: ["仅消费 Card 边界；Heading、Stack、Inline、原生表单与列表负责内容关系。"],
    stateOwner: { library: ["面板边界、表面、圆角与 render 透传。"], application: ["对象身份、标题级别、布局、草稿与异步事实。"] },
    responsive: ["消费端允许长标题和动作换行；比较任务保留必要维度。"],
    customization: ["通过集中主题调整面板角色，内容布局由组合提供。"],
  }, designEn: {"whenToUse":["An object needs independent identification, ordering, or actions whose boundary supports the task."],"avoid":["Content whose relationships survive border removal; nested interaction inside a whole-card link; cards for every section."],"composition":["Consume Card's boundary only; Heading, Stack, Inline, native forms, and lists organize content relationships."],"stateOwner":{"library":["Panel boundary, surface, radius, and render forwarding."],"application":["Object identity, heading levels, layout, drafts, and asynchronous facts."]},"responsive":["Consumers permit long titles and actions to wrap; comparisons retain necessary dimensions."],"customization":["Adjust panel roles through the central theme; composition supplies content layout."]},
} satisfies ComponentMeta;
