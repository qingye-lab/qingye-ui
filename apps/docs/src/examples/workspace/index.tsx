import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Link as RouterLink } from "@/components/locale-link";
import { buttonVariants } from "@qingye_lab/ui/components/button";
import { Empty, EmptyActions, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { BASE, WorkspaceShell } from "./shell";

const Overview = lazy(() => import("./overview"));
const Collections = lazy(() => import("./collections"));
const CollectionDetail = lazy(() => import("./collection-detail"));
const Settings = lazy(() => import("./settings"));
const Help = lazy(() => import("./help"));

/** 工作区内未知的页面：外壳保持，正文只给出回到概览的去处——不借用站点自己的未找到页（那里的去处是文档）。 */
function Missing() {
  return <div className="mx-auto grid w-full max-w-[80rem] px-(--qy-page-gutter) py-(--qy-section-gap)">
    <Empty state="not-applicable"><EmptyTitle level={1}>没有这个页面</EmptyTitle><EmptyActions><RouterLink to={BASE} className={buttonVariants({ variant: "bordered" })}>回到概览</RouterLink></EmptyActions></Empty>
  </div>;
}

/** 示例应用：一个完整的工作区，只用 @qingye_lab/ui 组合。 */
export default function WorkspaceApp() {
  return <Suspense>
    <Routes>
      <Route element={<WorkspaceShell />}>
        <Route index element={<Overview />} />
        <Route path="collections" element={<Collections />} />
        <Route path="collections/:id" element={<CollectionDetail />} />
        <Route path="settings" element={<Navigate to="general" replace />} />
        <Route path="settings/:section" element={<Settings />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  </Suspense>;
}
