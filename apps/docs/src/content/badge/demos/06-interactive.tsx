import { Badge, Button } from "@yanqing/ui";
import { XIcon } from "lucide-react";
import { useState } from "react";

export const meta = {
  title: "作为链接或按钮",
  description: "通过 render 渲染为 <a> 或 <button>，获得悬停、焦点环与 44px 触屏点击区。",
};

const initialFilters = ["华东区", "已付款", "本月"];

export default function Demo() {
  const [filters, setFilters] = useState(initialFilters);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground text-sm">话题</span>
        <Badge render={<a href="#design-system" />} variant="outline">#设计系统</Badge>
        <Badge render={<a href="#a11y" />} variant="outline">#无障碍</Badge>
        <Badge render={<a href="#dark-mode" />} variant="outline">#深色模式</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground text-sm">筛选</span>
        {filters.map((filter) => (
          <Badge
            key={filter}
            render={
              <button
                type="button"
                aria-label={`移除筛选条件：${filter}`}
                onClick={() => setFilters(filters.filter((item) => item !== filter))}
              />
            }
            variant="secondary"
          >
            {filter}
            <XIcon aria-hidden="true" />
          </Badge>
        ))}
        {filters.length === 0 ? (
          <Button size="xs" variant="ghost" onClick={() => setFilters(initialFilters)}>
            恢复默认筛选
          </Button>
        ) : null}
      </div>
    </div>
  );
}
