import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { FileUpload, formatFileSize } from "../src/components/file-upload";

const file = (name: string, type: string, size = 10) => new File([new Uint8Array(size)], name, { type });
const fileInput = (container: HTMLElement) => container.querySelector<HTMLInputElement>('input[type="file"]')!;
const pick = (container: HTMLElement, files: File[]) => fireEvent.change(fileInput(container), { target: { files } });

test("formats sizes with binary units", () => {
  expect(formatFileSize(512)).toBe("512 B");
  expect(formatFileSize(1536)).toBe("1.5 KB");
  expect(formatFileSize(1024 * 1024)).toBe("1 MB");
  expect(formatFileSize(25 * 1024 * 1024)).toBe("25 MB");
});

test("the drop zone is a labelled button that opens the file dialog", async () => {
  const user = userEvent.setup();
  const { container } = render(<FileUpload label="上传发票" description="PDF，不超过 10 MB" />);
  const zone = screen.getByRole("button", { name: "上传发票" });
  expect(zone).toHaveAccessibleDescription("PDF，不超过 10 MB");
  const click = vi.spyOn(fileInput(container), "click");
  zone.focus();
  await user.keyboard("{Enter}");
  expect(click).toHaveBeenCalled();
});

test("validates type, size and count, and explains rejections", () => {
  const onFilesChange = vi.fn();
  const onReject = vi.fn();
  const { container } = render(
    <FileUpload accept="image/*,.pdf" maxSize={100} maxFiles={2} onFilesChange={onFilesChange} onReject={onReject} />,
  );
  pick(container, [
    file("发票.pdf", "application/pdf"),
    file("日志.zip", "application/zip"),
    file("大图.png", "image/png", 500),
    file("截图.png", "image/png"),
    file("第三张.jpg", "image/jpeg"),
  ]);
  expect(onFilesChange).toHaveBeenLastCalledWith([expect.objectContaining({ name: "发票.pdf" }), expect.objectContaining({ name: "截图.png" })]);
  expect(onReject.mock.calls[0]![0].map((r: { reason: string }) => r.reason)).toEqual(["type", "size", "count"]);
  const alert = screen.getByRole("alert");
  expect(alert).toHaveTextContent("日志.zip：文件类型不支持");
  expect(alert).toHaveTextContent("大图.png：文件过大");
  expect(alert).toHaveTextContent("第三张.jpg：超出文件数量限制");
  expect(screen.getByRole("list")).toHaveTextContent("发票.pdf");
});

test("ignores duplicates and replaces the file when maxFiles is 1", () => {
  const onFilesChange = vi.fn();
  const first = file("合同.pdf", "application/pdf");
  const { container } = render(<FileUpload maxFiles={1} onFilesChange={onFilesChange} />);
  pick(container, [first]);
  pick(container, [file("合同-签署版.pdf", "application/pdf")]);
  expect(onFilesChange).toHaveBeenLastCalledWith([expect.objectContaining({ name: "合同-签署版.pdf" })]);
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});

test("removing a file keeps focus in the list, then returns it to the trigger", async () => {
  const user = userEvent.setup();
  render(<FileUpload label="附件" defaultFiles={[file("a.txt", "text/plain"), file("b.txt", "text/plain")]} />);
  await user.click(screen.getByRole("button", { name: "移除 a.txt" }));
  expect(screen.getByRole("button", { name: "移除 b.txt" })).toHaveFocus();
  await user.keyboard("{Enter}");
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "附件" })).toHaveFocus();
});

test("shows caller-provided progress and per-file errors", () => {
  const files = [file("机柜.jpg", "image/jpeg"), file("告警.jpg", "image/jpeg")];
  render(
    <FileUpload
      files={files}
      getProgress={(item) => (item === files[0] ? 42.4 : null)}
      getError={(item) => (item === files[1] ? "上传失败：网络连接中断" : null)}
    />,
  );
  const bar = screen.getByRole("progressbar", { name: "机柜.jpg 上传进度" });
  expect(bar).toHaveAttribute("aria-valuenow", "42");
  expect(screen.getByText("上传失败：网络连接中断")).toBeInTheDocument();
});

test("button variant and disabled state", () => {
  const { container } = render(<FileUpload variant="button" chooseLabel="选择 PDF" disabled />);
  expect(screen.getByRole("button", { name: "选择 PDF" })).toBeDisabled();
  pick(container, [file("a.pdf", "application/pdf")]);
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("duplicate picks at the limit are ignored while new files are rejected once", () => {
  const first = file("a.pdf", "application/pdf");
  const second = file("b.pdf", "application/pdf");
  const extra = file("c.pdf", "application/pdf");
  const onFilesChange = vi.fn();
  const onReject = vi.fn();
  const { container } = render(
    <FileUpload files={[first, second]} maxFiles={2} onFilesChange={onFilesChange} onReject={onReject} />,
  );
  pick(container, [first, extra, second]);
  expect(onFilesChange).not.toHaveBeenCalled();
  expect(onReject).toHaveBeenCalledOnce();
  expect(onReject).toHaveBeenCalledWith([{ file: extra, reason: "count" }]);
  expect(screen.getByRole("alert")).toHaveTextContent("c.pdf");
  expect(screen.getByRole("alert")).not.toHaveTextContent("a.pdf");
});

test("partial rejection keeps valid additions and reports all failures in one callback", () => {
  const saved = file("a.pdf", "application/pdf");
  const valid = file("b.pdf", "application/pdf");
  const wrongType = file("notes.txt", "text/plain");
  const tooLarge = file("large.pdf", "application/pdf", 100);
  const extra = file("c.pdf", "application/pdf");
  const onFilesChange = vi.fn();
  const onReject = vi.fn();
  const { container } = render(
    <FileUpload files={[saved]} accept=".pdf" maxFiles={2} maxSize={50} onFilesChange={onFilesChange} onReject={onReject} />,
  );
  pick(container, [saved, valid, wrongType, tooLarge, extra]);
  expect(onFilesChange).toHaveBeenCalledOnce();
  expect(onFilesChange).toHaveBeenCalledWith([saved, valid]);
  expect(onReject).toHaveBeenCalledOnce();
  expect(onReject).toHaveBeenCalledWith([
    { file: wrongType, reason: "type" },
    { file: tooLarge, reason: "size" },
    { file: extra, reason: "count" },
  ]);
  // A controlled component reports the proposal; it does not add rows itself.
  expect(screen.getByRole("list")).not.toHaveTextContent("b.pdf");
});

test("a button trigger associates its visible description", () => {
  render(<FileUpload variant="button" description="PDF，不超过 10 MB" />);
  expect(screen.getByRole("button", { name: "选择文件" })).toHaveAccessibleDescription("PDF，不超过 10 MB");
});

test("native submission keeps accepted files after rejected, duplicated or empty picker changes", () => {
  const saved = file("invoice.pdf", "application/pdf");
  vi.stubGlobal("DataTransfer", class {
    private entries: File[] = [];
    items = { add: (entry: File) => { this.entries.push(entry); } };
    get files() { return this.entries; }
  });
  try {
    const { container } = render(<FileUpload accept=".pdf" defaultFiles={[saved]} name="attachments" />);
    const input = fileInput(container);
    let nativeFiles: File[] = [];
    // jsdom cannot construct a native FileList. Keep its file-list boundary
    // observable while exercising the real picker and mirroring effects.
    Object.defineProperty(input, "files", {
      configurable: true,
      get: () => nativeFiles,
      set: (next: ArrayLike<File>) => { nativeFiles = Array.from(next); },
    });
    for (const incoming of [[file("notes.txt", "text/plain")], [saved], []]) {
      nativeFiles = incoming;
      fireEvent.change(input);
      expect(nativeFiles).toEqual([saved]);
      expect(screen.getByRole("list")).toHaveTextContent("invoice.pdf");
    }
  } finally {
    vi.unstubAllGlobals();
  }
});
