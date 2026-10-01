const e=`import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye/ui/components/progress";

export const meta = {
  title: "自定义数值",
  description: "ProgressValue 接收一个函数，可以显示已完成量与总量；读屏文本用 getAriaValueText 同步。",
};

export default function Demo() {
  return (
    <Progress
      className="max-w-sm"
      getAriaValueText={(_, value) => \`已上传 \${value} MB，共 512 MB\`}
      max={512}
      value={302}
    >
      <div className="flex items-center justify-between gap-2">
        <ProgressLabel>上传安装包</ProgressLabel>
        <ProgressValue className="text-muted-foreground">{(_, value) => \`\${value} / 512 MB\`}</ProgressValue>
      </div>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  );
}
`;export{e as default};
