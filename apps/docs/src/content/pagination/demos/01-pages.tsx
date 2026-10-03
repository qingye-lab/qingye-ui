import { useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Stack } from "@qingye/ui/components/layout";
import { Pagination, PaginationItem, PaginationList, PaginationNext, PaginationPrevious } from "@qingye/ui/components/pagination";
import { Text } from "@qingye/ui/components/typography";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "已知与未知总页数", titleEn: "Known and unknown totals" } satisfies DemoMeta;
const pages = ["A · B", "C · D", "E · F"];
const availablePages = ["A · B", "C · D"];
export default function Demo() {
  const [page, setPage] = useState(1);
  const [partialPage, setPartialPage] = useState(2);
  return <Stack gap="section"><Stack><Text>{pages[page - 1]}</Text><Pagination page={page} totalPages={pages.length} aria-label="内容分页"><PaginationList><PaginationItem><PaginationPrevious disabled={page === 1} onClick={() => setPage(page - 1)} /></PaginationItem>{pages.map((_, index) => <PaginationItem key={index}><Button variant="quiet" aria-current={page === index + 1 ? "page" : undefined} onClick={() => setPage(index + 1)}>{index + 1}</Button></PaginationItem>)}<PaginationItem><PaginationNext disabled={page === pages.length} onClick={() => setPage(page + 1)} /></PaginationItem></PaginationList></Pagination></Stack><Stack><Text>{availablePages[partialPage - 1]}</Text><Pagination page={partialPage} totalPages={null} aria-label="未知总数的分页"><PaginationList><PaginationItem><PaginationPrevious disabled={partialPage === 1} onClick={() => setPartialPage(partialPage - 1)} /></PaginationItem><PaginationItem><PaginationNext disabled={partialPage === availablePages.length} onClick={() => setPartialPage(partialPage + 1)} /></PaginationItem></PaginationList><Text step="support">第 {partialPage} 页 · 总页数未知</Text></Pagination></Stack></Stack>;
}
