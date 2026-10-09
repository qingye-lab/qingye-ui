import type { ComponentMeta } from "@/lib/types";
export default {
  title: "语言切换 LocaleSwitch", titleEn: "Locale switch",
  description: "请求切换应用语言，并显示 Provider 当前事实。", descriptionEn: "Request an application locale change and show the current Provider value.",
  category: "工具", layer: "primitive", source: "local", exports: ["LocaleSwitch"],
  keywords: ["language", "i18n", "locale", "语言", "切换语言", "国际化"],
  api: [{ name: "LocaleSwitch", description: "复用 NativeSelect；UILocaleProvider 是唯一当前值来源。", descriptionEn: "Uses NativeSelect; UILocaleProvider alone supplies the current value.", props: [
    { name: "options", type: "readonly { locale: UILocale; label: string; disabled?: boolean }[]", description: "消费项目提供可选语言与名称，code 必须非空且唯一。当前 code 未列入时显示其禁用事实选项。", descriptionEn: "The consumer supplies available languages and names. Codes must be nonblank and unique; an unlisted current code appears as a disabled factual option." },
    { name: "onLocaleChange", type: "(locale: UILocale, event: ChangeEvent<HTMLSelectElement>) => void", description: "请求新 locale；应用更新 Provider 后才改变选择事实，拒绝时保留原值。", descriptionEn: "Requests a locale; selection changes only after the application updates Provider. Refusal retains the previous value." },
    { name: "name / form / disabled / render / ref / onChange / ARIA", type: "NativeSelectProps", description: "原生表单、禁用与出口；onChange preventDefault 可取消请求；默认名称读 messages.language。", descriptionEn: "Native form, disabling, and composition. onChange preventDefault cancels a request; the default name reads messages.language." },
  ] }],
  keyboard: [{ keys: "平台选择器键位", keysEn: "Platform picker keys", description: "保留原生 select 的方向、确认与移动选择器行为。", descriptionEn: "Retain native select direction, confirmation, and mobile-picker behavior." }],
  notes: ["不修改 document.lang、系统语言、存储或路由；这些属于应用。", "内置名 language 走 UI locale；选项可见名称由消费项目给出。"], notesEn: ["No changes to document.lang, system language, storage, or routes; applications own these.","The built-in language name uses UI locale; consumers supply visible option names."],
  design: { methods: ["名实相符", "相成相制"], whenToUse: ["UILocaleProvider 的应用语言入口"], avoid: ["内部乐观切值却未改变 Provider"], composition: ["Provider + NativeSelect + 应用接受变化"], stateOwner: { library: ["呈现 Provider 当前值与请求"], application: ["可选语言、Provider、URL/文档语言"] }, customization: ["NativeSelect 的公开出口与显式名称"] }, designEn: {"whenToUse":["An application-language entry for UILocaleProvider."],"avoid":["Optimistically switching the internal value without changing Provider."],"composition":["Provider + NativeSelect + application acceptance."],"stateOwner":{"library":["Presenting Provider's current value and requests."],"application":["Available languages, Provider, URLs, and document language."]},"customization":["NativeSelect public composition and explicit names."]},
} satisfies ComponentMeta;
