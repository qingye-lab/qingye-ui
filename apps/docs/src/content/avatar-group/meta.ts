import type { ComponentMeta } from "@/lib/types";

export default {
  title: "头像组 AvatarGroup", titleEn: "AvatarGroup",
  description: "一组相关的人，叠放并收起多余的成员。", descriptionEn: "A set of related people, overlapped, with the surplus collapsed.",
  category: "数据展示", layer: "pattern", source: "local", exports: ["AvatarGroup"],
  keywords: ["avatar group", "stacked avatars", "members", "头像组", "成员", "协作者"],
  decisions: "叠放量取头像直径的四分之一，字始终露在外面；被收起的人不会消失，「+N」的可访问名称列出他们全部的名称。整组不可点击，要点击就放进按钮或链接。",
  decisionsEn: "The overlap is a quarter of the avatar diameter so the initials always stay clear; collapsed people do not disappear: the accessible name of \"+N\" lists all of them. The group itself is not clickable; to make it so, put it inside a button or link.",
  design: { methods: ["名实相符", "相成相制"], whenToUse: ["表达一件事涉及哪几个人，且空间只够窄窄一行。"], avoid: ["一个人的身份用 Avatar；需要逐个操作成员时用列表，不用叠放。"], composition: ["整组 role=group 必须有名称；每个头像仍是自己的图形与名称，末尾的「+N」是一个独立头像。"], stateOwner: { library: ["叠放、截断与整组命名。"], application: ["成员事实、顺序与每个人的真实名称。"] }, responsive: ["叠放量随头像档位等比，不随容器宽度变化；收起数量由 max 决定。"], customization: ["size 取头像五档之一；其余用 className。"] },
  designEn: { whenToUse: ["Show which people a thing involves when there is room for only a narrow row."], avoid: ["Use Avatar for one identity; use a list, not an overlap, when members must be acted on individually."], composition: ["The group is role=group and must be named; each avatar remains its own graphic with its own name, and the trailing \"+N\" is a separate avatar."], stateOwner: { library: ["Overlap, truncation and naming of the whole group."], application: ["Membership facts, order and each person's real name."] }, responsive: ["The overlap scales with the avatar size step, not with container width; max decides how many collapse."], customization: ["size takes one of the five avatar steps; use className for the rest."] },
  api: [
    { name: "AvatarGroup", description: "role=group 的 div，必须有 aria-label 或 aria-labelledby。", descriptionEn: "A role=group div that requires aria-label or aria-labelledby.", props: [
      { name: "items", type: "{ key?, label, src?, fallback? }[]", description: "成员；label 必填，fallback 省略时取名称的第一个字。", descriptionEn: "Members; label is required, and fallback defaults to the first character of the name." },
      { name: "max", type: "number", default: "5", description: "最多露出几个头像，其余收进末尾的「+N」。", descriptionEn: "How many avatars to show before the rest collapse into a trailing \"+N\"." },
      { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "与 Avatar 同一组档位。", descriptionEn: "The same steps as Avatar." },
      { name: "className / native props", type: "React.ComponentProps<div>", description: "其余属性透传到根元素。", descriptionEn: "Remaining attributes forward to the root." },
    ] },
  ],
  notes: ["「+N」的名称由 locale 提供（avatarGroupMore），列出被收起的全部名称。"], notesEn: ["The name of \"+N\" comes from the locale (avatarGroupMore) and lists every collapsed name."],
} satisfies ComponentMeta;
