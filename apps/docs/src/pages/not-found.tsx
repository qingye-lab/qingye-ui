import { Button, buttonVariants } from "@qingye_lab/ui/components/button";
import { linkClassName } from "@qingye_lab/ui/components/link";
import { Code, Heading, Text } from "@qingye_lab/ui/components/typography";
import { useLocation } from "react-router-dom";
import { IconArrowLeft, IconSearch } from "@tabler/icons-react";
import { Link } from "@/components/locale-link";
import { useDocumentTitle } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
import { useSearch } from "@/components/search";
import { PageState } from "@/components/page-state";

export function NotFoundContent({ detail }: { detail?: string }) {
  const locale = useDocsLocale(); useDocumentTitle(locale === "en" ? "Page not found" : "页面不存在");
  const { openSearch } = useSearch();
  return (
    <PageState state="not-applicable" headingLevel={1} title={locale === "en" ? "Page not found" : "没有找到这个页面"} description={detail}>
        <Link className={buttonVariants()} to="/docs">
          <IconArrowLeft aria-hidden="true" />
          {locale === "en" ? "Back to docs" : "回到文档"}
        </Link>
        <Button onClick={openSearch} variant="quiet">
          <IconSearch aria-hidden="true" />
          {locale === "en" ? "Search" : "搜索"}
        </Button>
    </PageState>
  );
}

/*
 * 站点级的未找到：与首页、示例同一个站框（左缘与页头的站标对齐），同一种声音——大号常规字重的标题，
 * 其下说清找的是哪个地址，再给去处：回到文档、搜索，以及三个顶层入口。不另设版心。
 */
export default function NotFoundPage() {
  const en = useDocsLocale() === "en";
  const { pathname } = useLocation();
  const { openSearch } = useSearch();
  useDocumentTitle(en ? "Page not found" : "页面不存在");
  return (
    <main className="site-frame grid content-start justify-items-start gap-(--qy-section-gap) pt-[calc(5*var(--qy-cai))] pb-[calc(8*var(--qy-cai))] outline-none" id="main" tabIndex={-1}>
      <div className="grid gap-(--qy-field-gap)">
        <Heading className="font-normal" level={1} step="display-lg" tabIndex={-1}>{en ? "Page not found" : "没有找到这个页面"}</Heading>
        <Text className="text-muted-foreground" step="reading">{en ? "Nothing lives at " : "这个地址没有页面："}<Code>{pathname}</Code></Text>
      </div>
      <div className="flex flex-wrap gap-(--qy-field-gap)">
        <Link className={buttonVariants()} to="/docs"><IconArrowLeft aria-hidden="true" />{en ? "Back to docs" : "回到文档"}</Link>
        <Button onClick={openSearch} variant="quiet"><IconSearch aria-hidden="true" />{en ? "Search" : "搜索"}</Button>
      </div>
      <nav aria-label={en ? "Main sections" : "主要入口"} className="flex flex-wrap gap-x-(--qy-field-group-gap) gap-y-(--qy-field-gap) text-reading">
        <Link className={linkClassName} to="/docs/components">{en ? "Components" : "组件"}</Link>
        <Link className={linkClassName} to="/examples">{en ? "Examples" : "示例"}</Link>
        <Link className={linkClassName} to="/docs/design-philosophy">{en ? "Design philosophy" : "设计理念"}</Link>
      </nav>
    </main>
  );
}
