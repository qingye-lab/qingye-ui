import { Button } from "@qingye/ui/components/button";
import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/components/prose";
import { useSearch } from "@/components/search";

export function NotFoundContent({ detail }: { detail?: string }) {
  useDocumentTitle("页面不存在");
  const { openSearch } = useSearch();
  return (
    <section className="flex flex-col items-start gap-5 py-6 sm:py-12">
      <p className="font-mono text-muted-foreground text-sm numeric">404</p>
      <h1 className="font-semibold text-[1.75rem] text-foreground-strong leading-tight sm:text-[2rem]" tabIndex={-1}>
        没有找到这个页面
      </h1>
      <p className="max-w-[34rem] text-pretty text-[0.9375rem] text-muted-foreground leading-relaxed">
        {detail ?? "链接可能已经调整，或者地址里有拼写错误。"}可以回到文档首页，或者直接搜索想找的组件。
      </p>
      <div className="flex flex-wrap gap-2 pt-1">
        <Button nativeButton={false} render={<Link to="/docs" />}>
          <ArrowLeftIcon aria-hidden="true" />
          回到文档
        </Button>
        <Button onClick={openSearch} variant="outline">
          <SearchIcon aria-hidden="true" />
          搜索
        </Button>
      </div>
    </section>
  );
}

export default function NotFoundPage() {
  return (
    <main className="mx-auto w-full max-w-[90rem] px-4 pt-10 pb-24 outline-none sm:px-6 lg:px-8" id="main" tabIndex={-1}>
      <div className="mx-auto max-w-[48rem]">
        <NotFoundContent />
      </div>
    </main>
  );
}
