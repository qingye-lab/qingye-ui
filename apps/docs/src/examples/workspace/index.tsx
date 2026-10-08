import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { NotFoundContent } from "@/pages/not-found";
import { WorkspaceShell } from "./shell";

const Overview = lazy(() => import("./overview"));
const Collections = lazy(() => import("./collections"));
const CollectionDetail = lazy(() => import("./collection-detail"));
const Settings = lazy(() => import("./settings"));
const Help = lazy(() => import("./help"));

/** 工作区内未知的页面：外壳保持，正文换成站点统一的未找到状态。 */
function Missing() {
  return <div className="mx-auto w-full max-w-[48rem] px-(--qy-page-gutter) py-(--qy-section-gap)"><NotFoundContent /></div>;
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
