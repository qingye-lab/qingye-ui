import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, useCarousel } from "@yanqing/ui";
import { useState } from "react";

export const meta = {
  title: "自定义计数",
  description: "用 useCarousel 读取位置，onIndexChange 同步外部状态；defaultIndex 指定初始位置。",
};

const steps = [
  { title: "连接代码仓库", text: "授权 GitHub 或 GitLab，选择要部署的仓库。" },
  { title: "确认构建设置", text: "自动识别框架，也可以手动修改构建命令。" },
  { title: "配置环境变量", text: "密钥只在构建与运行时注入，不会出现在日志里。" },
  { title: "部署上线", text: "每次推送自动部署，任意版本一键回滚。" },
];

function Counter() {
  const { index, count } = useCarousel();
  return (
    <span className="numeric text-muted-foreground text-sm">
      <span className="font-medium text-foreground">{index + 1}</span> / {count}
    </span>
  );
}

export default function Demo() {
  const [current, setCurrent] = useState(1);
  return (
    <Carousel aria-label="上手指南" className="w-full max-w-sm" defaultIndex={1} onIndexChange={setCurrent}>
      <CarouselContent>
        {steps.map((step) => (
          <CarouselItem key={step.title}>
            <div className="flex h-36 flex-col justify-center gap-1.5 rounded-xl border bg-card p-5">
              <p className="font-medium">{step.title}</p>
              <p className="text-muted-foreground text-sm">{step.text}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-between">
        <CarouselPrevious />
        <Counter />
        <CarouselNext />
      </div>
      <p className="text-center text-muted-foreground text-xs">当前步骤：{steps[current]?.title}</p>
    </Carousel>
  );
}
