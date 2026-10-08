import { Pagination, PaginationList, PaginationItem, PaginationPrevious, PaginationNext } from "@qingye_lab/ui/components/pagination";
import { Tabs, TabsList, TabsTab } from "@qingye_lab/ui/components/tabs";
import { CopyButton } from "@qingye_lab/ui/components/copy-button";
import { Input } from "@qingye_lab/ui/components/input";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Stack, Inline } from "@qingye_lab/ui/components/layout";
import { UILocaleProvider, zhCN } from "@qingye_lab/ui/locale";
import { enUS } from "@qingye_lab/ui/locales/en-US";
import { useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { Code, H2, P, PageHeader } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
function LocalePreview() {
  const en = useDocsLocale() === "en";
  const [language,setLanguage] = useState(en ? "en-US" : "zh-CN");
  const [page,setPage] = useState(1);
  const values = ["A", "B", "C"];
  return <Stack className="mb-(--qy-space-module)" gap="panel"><Tabs value={language} onValueChange={value => setLanguage(String(value))}><TabsList aria-label={en ? "Built-in language" : "内置文案语言"}><TabsTab value="zh-CN">简体中文</TabsTab><TabsTab value="en-US">English</TabsTab></TabsList></Tabs><UILocaleProvider locale={language === "en-US" ? enUS : zhCN}><Stack lang={language} gap="fields"><Field><FieldLabel>{en ? "Editable content" : "可编辑内容"}</FieldLabel><Input defaultValue="A" /></Field><Inline><CopyButton value={values[page-1]!} /><output aria-live="polite">{values[page-1]}</output></Inline><Pagination page={page} totalPages={values.length}><PaginationList><PaginationItem><PaginationPrevious disabled={page === 1} onClick={() => setPage(value => value-1)} /></PaginationItem><PaginationItem><span className="numeric">{page} / {values.length}</span></PaginationItem><PaginationItem><PaginationNext disabled={page === values.length} onClick={() => setPage(value => value+1)} /></PaginationItem></PaginationList></Pagination></Stack></UILocaleProvider></Stack>;
}
export default function I18nPage() {
  const en = useDocsLocale() === "en";
  return <article><PageHeader title={en ? "Internationalization" : "国际化"} description={en ? "Built-in messages default to Chinese. UILocaleProvider switches or overrides them; your own content and labels stay yours." : "内置文案默认中文，用 UILocaleProvider 切换或覆盖；内容与标签仍由你提供。"} />
    <H2 id="english">{en ? "Choose a language" : "选择语言"}</H2><P><Code>UILocaleProvider</Code>{en ? " uses only the locale you pass; it does not read the browser language. Set <html lang> to the page's actual language so screen readers and hyphenation follow it." : " 只按你传入的 locale 选择内置文案，不读取浏览器语言。把 <html lang> 设成页面实际的语言，读屏与断字才会按这门语言处理。"}</P><CodeBlock code={'import { UILocaleProvider } from "@qingye_lab/ui/locale";\nimport { enUS } from "@qingye_lab/ui/locales/en-US";\n\n<UILocaleProvider locale={enUS}><App /></UILocaleProvider>'} /><LocalePreview />
    <H2 id="overrides">{en ? "Override messages" : "覆盖文案"}</H2><P>{en ? "messages replaces only the keys it lists; the rest come from the enclosing language. Parameterized messages are functions: keep their parameters. When a single component needs a different name, pass a public prop such as aria-label." : "messages 只替换列出的键，其余沿用外层语言。带参数的文案是函数，覆盖时保持同样的参数。单个组件需要不同的名称时，直接传 aria-label 等公开属性。"}</P><CodeBlock code={'<UILocaleProvider messages={{ close: "Close preview" }}>\n  <App />\n</UILocaleProvider>'} />
    <H2 id="custom-components">{en ? "Use messages in your compositions" : "在自己的组合里使用"}</H2><P>{en ? "Your compositions read the same messages and switch language with the library:" : "自建组合读取同一份文案，随库一起切换语言："}</P><CodeBlock code={'import { useUILocale } from "@qingye_lab/ui/locale";\nimport { Button } from "@qingye_lab/ui/components/button";\n\nfunction Clear({ onClear }: { onClear: () => void }) {\n  const { messages } = useUILocale();\n  return <Button onClick={onClear}>{messages.clear}</Button>;\n}'} />
  </article>;
}
