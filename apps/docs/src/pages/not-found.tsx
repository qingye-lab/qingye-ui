import { Button, buttonVariants } from "@qingye/ui/components/button";
import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import { Link } from "@/components/locale-link";
import { useDocumentTitle } from "@/components/prose";
import { useSearch } from "@/components/search";
import { PageState } from "@/components/page-state";

export function NotFoundContent({ detail }: { detail?: string }) {
  useDocumentTitle("页面不存在");
  const { openSearch } = useSearch();
  return (
    <PageState headingLevel={1} title="没有找到这个页面" description={detail}>
        <Link className={buttonVariants()} to="/docs">
          <ArrowLeftIcon aria-hidden="true" />
          回到文档
        </Link>
        <Button onClick={openSearch} variant="quiet">
          <SearchIcon aria-hidden="true" />
          搜索
        </Button>
    </PageState>
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
