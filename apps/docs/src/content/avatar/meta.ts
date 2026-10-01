import type { ComponentMeta } from "@/lib/types";

export default {
  title: "头像 Avatar",
  description: "用图片或姓名缩写代表一个人或团队。图片加载失败或缺失时自动显示回退内容；多人时用头像组叠放。",
  category: "数据展示",
  source: "coss",
  exports: ["Avatar", "AvatarImage", "AvatarFallback", "AvatarBadge", "AvatarGroup", "AvatarGroupCount"],
  keywords: ["avatar", "头像", "用户", "user", "成员", "member", "头像组", "avatar group", "在线状态", "presence"],
  api: [
    {
      name: "Avatar",
      description: "根元素，圆形裁切并带一圈内描边，避免浅色图片与页面融在一起。",
      props: [
        { name: "size", type: '"xs" | "sm" | "default" | "lg" | "xl"', default: '"default"', description: "直径依次为 20 / 24 / 32 / 40 / 48px，回退文字随之缩放。" },
        { name: "render", type: "ReactElement | (props) => ReactElement", description: "替换渲染元素，例如包成链接。" },
      ],
    },
    {
      name: "AvatarImage",
      description: "头像图片；加载中和加载失败时隐藏，由 AvatarFallback 顶上。",
      props: [
        { name: "src", type: "string", description: "图片地址。" },
        { name: "alt", type: "string", description: "替代文本；头像旁已显示姓名时传空字符串，避免重复朗读。" },
        { name: "onLoadingStatusChange", type: '(status: "idle" | "loading" | "loaded" | "error") => void', description: "图片加载状态变化时调用。" },
      ],
    },
    {
      name: "AvatarFallback",
      description: "图片缺失、加载中或失败时显示，通常放姓氏或图标。",
      props: [
        { name: "delay", type: "number", default: "0", description: "延迟显示的毫秒数，图片很快加载完成时可避免回退内容闪一下。" },
      ],
    },
    {
      name: "AvatarBadge",
      description: "固定在右下角的状态圆点，默认为成功色；尺寸随头像自动匹配，颜色用 className 覆盖，如 bg-muted-foreground 表示离线。可放一个小图标。",
    },
    {
      name: "AvatarGroup",
      description: "叠放的一组头像，按头像尺寸自动调整重叠量，并用页面底色描边保持边缘清晰。",
    },
    {
      name: "AvatarGroupCount",
      description: "放在 AvatarGroup 末尾的 “+N” 计数，自动匹配组内头像的尺寸。",
    },
  ],
  notes: [
    "回退内容用一个汉字（通常是姓），最小两档尺寸放不下两个字。",
    "在线状态不要只靠 AvatarBadge 的颜色，旁边同时用文字说明，如 “在线”“离开”。",
    "头像组外层可加 aria-label（如 “共 9 位成员”），“+N” 本身对读屏来说信息不完整。",
    "头像只是标识；需要点击查看资料时，把头像和姓名一起包在链接或按钮里，而不是单独让头像可点击。",
  ],
} satisfies ComponentMeta;
