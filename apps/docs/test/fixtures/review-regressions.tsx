import { createRoot } from "react-dom/client";
import { Button } from "@qingye_lab/ui/components/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@qingye_lab/ui/components/menu";
import { ToastPrimitive, ToastProvider } from "@qingye_lab/ui/components/toast";

/** Imported only by the development browser regression runner. */
export function mountReviewRegressions(host: HTMLElement) {
  const root = createRoot(host);
  const manager = ToastPrimitive.createToastManager();
  let resolve: (() => void) | undefined;
  let reject: (() => void) | undefined;
  const render = (loading: boolean) => root.render(
    <ToastProvider toastManager={manager} loadingTimeout={150}>
      <Menu>
        <MenuTrigger render={<Button loading={loading}>等待中的菜单</Button>} />
        <MenuPopup><MenuItem>菜单操作</MenuItem></MenuPopup>
      </Menu>
      <button type="button">下一个控件</button>
    </ToastProvider>,
  );
  render(true);
  return {
    setLoading: render,
    startPromise(mode: "string" | "object") {
      const pending = new Promise<void>((done, fail) => {
        resolve = done;
        reject = () => fail(new Error("confirmed failure"));
      });
      void manager.promise(pending, mode === "string"
        ? { loading: "正在上传", success: "上传完成", error: "上传失败" }
        : { loading: { title: "正在上传", description: "文件 A" }, success: { title: "上传完成" }, error: { title: "上传失败" } },
      ).catch(() => {});
    },
    settle(success: boolean) { if (success) resolve?.(); else reject?.(); },
    closeToasts() { manager.close(); },
    dispose() { manager.close(); root.unmount(); host.remove(); },
  };
}
