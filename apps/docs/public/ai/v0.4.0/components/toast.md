# 消息提示 Toast

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/toast
Source: packages/ui/src/components/toast.tsx
Source SHA-256: 1e4f2469bcbba6c8ba28a3b1eba0aaf9c6565461ba2d738b4a1430637ce7a0b3

操作完成后在屏幕角落短暂出现的反馈，不打断当前任务。多条消息自动层叠，悬停或聚焦时展开；需要用户立即处理的信息改用 Alert 或 AlertDialog。

## Use and ownership
- 短暂反馈已确认的结果，或在工作面之外补充不会阻断任务的状态。
- Avoid: 请求开始就显示成功；上传成功写成设备升级完成；关键错误只有会消失的 Toast；撤销按钮不关联实际对象。
- Library: 通知原语、堆叠、关闭、动作部位、长文本布局。
- Application: Promise、真实结果、撤销可用性、持续错误与重试。

## Composition
- 同一对象通过 id 更新等待/结果；Action 到持久恢复入口，close 只是关闭通知。关键失败留在工作面。

## Responsive behavior
- 长文件名允许断行，窄屏动作另行排列，正文与关闭入口都可见；放大文字后仍需浏览器验证。

## Customization
- timeout 按必要阅读和行动时间选择，重要恢复不依赖默认消失时间。

## Current exports
- anchoredToastManager: const; owner toast; PASS
- AnchoredToastProvider: function; owner toast; PASS; props: AnchoredToastProviderProps
- AnchoredToastProviderProps: interface; owner toast; PASS
- toastManager: const; owner toast; PASS
- ToastPosition: type; owner toast; PASS
- ToastPrimitive: reexport; owner toast; alias of Toast; UNVERIFIED
- ToastProvider: function; owner toast; PASS; props: ToastProviderProps
- ToastProviderProps: interface; owner toast; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- 整个应用只挂载一个 ToastProvider，在任何地方调用 toastManager 即可。
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ToastProvider
在应用根部挂载一次，负责渲染全部消息。
- position: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"; default "bottom-right". 消息出现的位置。
- limit: number; default 3. 同时可见的最大数量，超出的旧消息淡出。
- timeout: number; default 5000. 默认自动关闭时间（毫秒），0 表示不自动关闭。

### toastManager.add(options)
添加一条消息并返回 id；传入已存在的 id 会原地更新并重新计时。
- title / description: ReactNode. 标题与补充说明。
- type: "success" | "error" | "warning" | "info" | "loading". 决定图标与颜色；loading 显示旋转图标。
- timeout: number; default 5000. 本条的自动关闭时间；带操作按钮时建议延长。
- priority: "low" | "high"; default "low". high 会被读屏器立即播报，用于错误。
- actionProps: ButtonProps. 操作按钮，例如“撤销”。
- id: string. 自定义 id，用于去重或更新。

### toastManager.update(id, options)
原地更新一条消息的内容或类型。

### toastManager.promise(promise, { loading, success, error })
随 Promise 状态自动切换：加载中 → 成功 / 失败。

### toastManager.close(id?)
关闭指定消息；不传 id 时关闭全部。

### AnchoredToastProvider / anchoredToastManager
锚定在某个元素旁的消息，例如复制成功的小提示。用法同上，额外传 positionerProps.anchor；data.tooltipStyle 使用紧凑样式。

## Keyboard
- F6: 把焦点移到消息区域。
- Tab: 在消息内的操作与关闭按钮之间移动。
- Esc: 关闭当前聚焦的消息。

## Source examples
### 类型
Source: apps/docs/src/content/toast/demos/01-types.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";

export const meta = { title: "类型", description: "success、error、warning、info 对应不同的图标与颜色。" };

export default function Demo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        onClick={() => toastManager.add({ type: "success", title: "设备已绑定", description: "YQ-SC-20391 已加入华东仓储。" })}
        variant="outline"
      >
        成功
      </Button>
      <Button
        onClick={() =>
          toastManager.add({ type: "error", priority: "high", title: "同步失败", description: "网络连接中断，请检查后重试。" })
        }
        variant="outline"
      >
        错误
      </Button>
      <Button
        onClick={() => toastManager.add({ type: "warning", title: "存储空间不足", description: "已使用 92%，建议清理过期报表。" })}
        variant="outline"
      >
        警告
      </Button>
      <Button
        onClick={() => toastManager.add({ type: "info", title: "新版本可用", description: "v2.8.0 将于今晚 23:00 自动更新。" })}
        variant="outline"
      >
        提示
      </Button>
    </div>
  );
}
```

### 标题与说明
Source: apps/docs/src/content/toast/demos/02-default.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";

export const meta = { title: "标题与说明", description: "不指定 type 时只显示文字；说明是可选的。" };

export default function Demo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button onClick={() => toastManager.add({ title: "链接已复制" })} variant="outline">
        仅标题
      </Button>
      <Button
        onClick={() => toastManager.add({ title: "已安排巡检", description: "10 月 8 日（周三）09:00，负责人周以宁。" })}
        variant="outline"
      >
        标题与说明
      </Button>
    </div>
  );
}
```

### 加载中
Source: apps/docs/src/content/toast/demos/03-loading.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";

export const meta = { title: "加载中", description: "type=\"loading\" 显示旋转图标，任务结束后用 update 换成结果。" };

export default function Demo() {
  return (
    <Button
      onClick={() => {
        const id = toastManager.add({ type: "loading", title: "正在生成报表…", description: "共 1,286 条记录", timeout: 0 });
        setTimeout(() => {
          toastManager.update(id, { type: "success", title: "报表已生成", description: "已发送到 finance@qingye.example", timeout: 4000 });
        }, 2000);
      }}
      variant="outline"
    >
      生成报表
    </Button>
  );
}
```

### 带操作按钮
Source: apps/docs/src/content/toast/demos/04-action.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";

export const meta = { title: "带操作按钮", description: "可撤销的操作给出“撤销”，并适当延长显示时间。" };

export default function Demo() {
  return (
    <Button
      onClick={() => {
        const id = toastManager.add({
          type: "success",
          title: "已归档 3 张工单",
          timeout: 8000,
          actionProps: {
            children: "撤销",
            onClick: () => {
              toastManager.close(id);
              toastManager.add({ type: "info", title: "已恢复 3 张工单" });
            },
          },
        });
      }}
      variant="outline"
    >
      归档工单
    </Button>
  );
}
```

### 跟随 Promise
Source: apps/docs/src/content/toast/demos/05-promise.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";

export const meta = {
  title: "跟随 Promise",
  description: "toastManager.promise 在加载、成功、失败之间自动切换；这里随机成功或失败。",
};

function uploadFirmware() {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => (Math.random() > 0.3 ? resolve("v2.8.0") : reject(new Error("校验失败"))), 1800);
  });
}

export default function Demo() {
  return (
    <Button
      onClick={() =>
        toastManager
          .promise(uploadFirmware(), {
            loading: { title: "正在上传固件…", description: "请勿断开设备电源。" },
            success: (version) => ({ title: "固件已更新", description: `12 台设备已升级到 ${version}。` }),
            error: (error: Error) => ({ title: "固件上传失败", description: `${error.message}，请重新下载安装包。` }),
          })
          .catch(() => {})
      }
      variant="outline"
    >
      上传固件
    </Button>
  );
}
```

### 原地更新
Source: apps/docs/src/content/toast/demos/06-update.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";

export const meta = {
  title: "原地更新",
  description: "用同一个 id 重复添加时不会堆叠，而是更新原消息并轻微脉冲提示，适合自动保存。",
};

export default function Demo() {
  return (
    <Button
      onClick={() =>
        toastManager.add({
          id: "draft-saved",
          type: "success",
          title: "草稿已保存",
          description: `最近保存：${new Date().toLocaleTimeString("zh-CN")}`,
        })
      }
      variant="outline"
    >
      保存草稿
    </Button>
  );
}
```

### 层叠
Source: apps/docs/src/content/toast/demos/07-stack.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";

export const meta = {
  title: "层叠",
  description: "多条消息层叠显示，悬停或聚焦时展开并暂停计时；高度不同的消息也能平滑过渡。",
};

const messages = [
  { title: "周以宁接受了工单 #2318" },
  { title: "华东仓储新增 4 台设备", description: "其中 1 台需要更新固件后才能上线。" },
  {
    title: "温控器告警已恢复",
    description: "冷库 2 号温控器在离线 18 分钟后重新上报，期间的温度数据已自动补传，无需人工处理。",
  },
];

export default function Demo() {
  return (
    <Button
      onClick={() => messages.forEach((message, index) => setTimeout(() => toastManager.add(message), index * 160))}
      variant="outline"
    >
      连续添加 3 条
    </Button>
  );
}
```

### 锚定提示
Source: apps/docs/src/content/toast/demos/08-anchored.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { AnchoredToastProvider, anchoredToastManager } from "@qingye/ui/components/toast";
import { CopyIcon } from "lucide-react";
import { useRef } from "react";

export const meta = {
  title: "锚定提示",
  description: "anchoredToastManager 把消息显示在触发元素旁，适合复制成功这类就地反馈。AnchoredToastProvider 同样只在应用根部挂载一次。",
};

function CopyLink() {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <Button
      onClick={() => {
        void navigator.clipboard?.writeText("https://qingye.example/t/2318");
        anchoredToastManager.add({
          title: "已复制",
          timeout: 1500,
          positionerProps: { anchor: ref.current },
          data: { tooltipStyle: true },
        });
      }}
      ref={ref}
      variant="outline"
    >
      <CopyIcon />
      复制工单链接
    </Button>
  );
}

export default function Demo() {
  return (
    <AnchoredToastProvider>
      <CopyLink />
    </AnchoredToastProvider>
  );
}
```

### 长内容与后续操作
Source: apps/docs/src/content/toast/demos/09-long-content.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";
import { useState } from "react";

export const meta = { title: "长内容与后续操作" };

export default function Demo() {
  const [showFailures, setShowFailures] = useState(false);
  return (
    <div className="flex flex-col items-start gap-3">
      <Button
        onClick={() => toastManager.add({
          type: "warning",
          title: "设备清单已导入，2 条记录需要处理",
          description: "qingye-device-inventory-2026-10-02-east-region-final.csv：1 条序列号重复，1 条所属仓库不存在。",
          timeout: 0,
          actionProps: { children: "查看失败记录", onClick: () => setShowFailures(true) },
        })}
        variant="outline"
      >
        查看导入结果
      </Button>
      {showFailures ? (
        <ul className="list-disc ps-5 text-sm" aria-label="失败记录">
          <li>第 18 行：序列号 QY-0048 重复。</li>
          <li>第 29 行：仓库「东区临时库」不存在。</li>
        </ul>
      ) : null}
    </div>
  );
}
```

