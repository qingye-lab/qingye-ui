集中收紧 Sentinel 项目的两个字段组间距，由默认 20px 变为 12px。只修改 theme.css；Fields.tsx 是固定消费端，不能编辑。主题三轴独立：文档级 html[data-brand="sentinel"] 为品牌；.light/.dark（或 data-theme=light/dark）为明暗；data-density 为密度。

通过现有公共关系 token --qy-field-group-gap 在项目主题入口统一完成。Sentinel 的浅深色和舒适/紧凑均为 12px，默认品牌与其它品牌仍为默认 20px。不得改变 --qy-field-gap、全局 spacing、控件外部/内部尺寸、触摸目标、文字尺寸或单页 class/style；不得用 !important、直接 gap/height 等 CSS 几何属性或复制基础组件。既有 FieldGroup 消费角色 token，无需修改库。

请交付 theme.css 与简短 report.md（改动归属、实际验证、未验证边界）。不要只写方案。
