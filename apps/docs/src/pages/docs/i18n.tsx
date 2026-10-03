import { Pagination, PaginationList, PaginationItem, PaginationPrevious, PaginationNext } from "@qingye/ui/components/pagination";
import { Tabs, TabsList, TabsTab } from "@qingye/ui/components/tabs";
import { CopyButton } from "@qingye/ui/components/copy-button";
import { Input } from "@qingye/ui/components/input";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Stack, Inline } from "@qingye/ui/components/layout";
import { UILocaleProvider, zhCN } from "@qingye/ui/locale";
import { enUS } from "@qingye/ui/locales/en-US";
import { useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { Code, H2, P, PageHeader } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
function LocalePreview() {
  const en = useDocsLocale() === "en";
  const [language,setLanguage] = useState(en ? "en-US" : "zh-CN");
  const [page,setPage] = useState(1);
  const values = ["A", "B", "C"];
  return <Stack className="my-(--qy-section-gap)" gap="panel"><Tabs value={language} onValueChange={value => setLanguage(String(value))}><TabsList aria-label={en ? "Built-in language" : "内置文案语言"}><TabsTab value="zh-CN">简体中文</TabsTab><TabsTab value="en-US">English</TabsTab></TabsList></Tabs><UILocaleProvider locale={language === "en-US" ? enUS : zhCN}><Stack lang={language} gap="fields"><Field><FieldLabel>{en ? "Editable content" : "可编辑内容"}</FieldLabel><Input defaultValue="A" /></Field><Inline><CopyButton value={values[page-1]!} /><output aria-live="polite">{values[page-1]}</output></Inline><Pagination page={page} totalPages={values.length}><PaginationList><PaginationItem><PaginationPrevious disabled={page === 1} onClick={() => setPage(value => value-1)} /></PaginationItem><PaginationItem><span className="numeric">{page} / {values.length}</span></PaginationItem><PaginationItem><PaginationNext disabled={page === values.length} onClick={() => setPage(value => value+1)} /></PaginationItem></PaginationList></Pagination></Stack></UILocaleProvider></Stack>;
}
export default function I18nPage() {
  const en = useDocsLocale() === "en";
  return <article><PageHeader title={en ? "Internationalization" : "国际化"} description={en ? "Choose built-in messages explicitly. Content, labels, and application facts remain yours." : "显式选择内置文案；内容、标签与应用事实由调用者提供。"} /><H2 id="english">{en ? "Choose a language" : "选择语言"}</H2><P><Code>UILocaleProvider</Code>{en ? " selects built-in messages without guessing from browser language. Set the document lang to match the page's actual language." : " 选择内置文案，不猜测浏览器语言。文档 lang 应与页面实际语言一致。"}</P><CodeBlock code={'import { UILocaleProvider } from "@qingye/ui/locale";\nimport { enUS } from "@qingye/ui/locales/en-US";\n\n<UILocaleProvider locale={enUS}><App /></UILocaleProvider>'} /><LocalePreview /><H2 id="overrides">{en ? "Override messages" : "覆盖文案"}</H2><P>{en ? "A nested messages object merges with its parent locale. Preserve function signatures for parameterized messages. Explicit public props, such as aria-label, can provide the name appropriate to the current task." : "嵌套 messages 与上层语言合并，带参数的文案保留函数签名。aria-label 等公开属性可提供符合当前任务的名称。"}</P><CodeBlock code={'<UILocaleProvider messages={{ close: "Close preview" }}>\n  <App />\n</UILocaleProvider>'} /><H2 id="custom-components">{en ? "Use messages in your compositions" : "在公共组合中使用"}</H2><CodeBlock code={'import { useUILocale } from "@qingye/ui/locale";\nimport { Button } from "@qingye/ui/components/button";\n\nfunction Clear({ onClear }: { onClear: () => void }) {\n  const { messages } = useUILocale();\n  return <Button onClick={onClear}>{messages.clear}</Button>;\n}'} /></article>;
}
