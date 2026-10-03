import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Button } from "../src/components/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "../src/components/field";
import { FileUpload } from "../src/components/file-upload";

/** jsdom does not dispatch the native formdata event from its FormData constructor. */
function bridgeData(form: HTMLFormElement) {
  const formData = new FormData(form);
  form.dispatchEvent(Object.assign(new Event("formdata"), { formData }));
  return formData;
}
const file = (name: string, text = "A", type = "text/plain") => new File([text], name, { type });

test("drop validation rejects actual type/size/count; Field outlet submits only accepted Files and preserves same-name fields", () => {
  const valid = file("A.txt");
  const wrong = file("B.pdf", "B", "application/pdf");
  const large = file("C.txt", "CC");
  const extra = file("D.txt");
  const rejected = vi.fn();
  const ref = createRef<HTMLInputElement>();
  const { container } = render(<form><input name="files" defaultValue="合法字段" /><Field name="files" invalid><FieldLabel>文件</FieldLabel><FileUpload accept=".txt" maxSize={1} maxFiles={1} onReject={rejected} inputProps={{ ref, render: <input data-custom="yes" /> }} /><FieldDescription>文本文件</FieldDescription><FieldError>待核对</FieldError></Field></form>);
  const input = screen.getByLabelText("文件") as HTMLInputElement;
  expect(ref.current).toBe(input);
  expect(input).toHaveAttribute("data-custom", "yes");
  expect(input).not.toHaveAttribute("name");
  expect(input).toHaveAccessibleDescription("文本文件 待核对");
  expect(input).toHaveAttribute("aria-invalid", "true");
  fireEvent.drop(container.querySelector('[data-slot="file-upload"]')!, { dataTransfer: { files: [wrong, large, valid, extra], types: ["Files"] } });
  expect(rejected.mock.calls[0]![0]).toEqual([{ file: wrong, reason: "type" }, { file: large, reason: "size" }, { file: extra, reason: "count" }]);
  expect(screen.getAllByRole("alert")).toHaveLength(3);
  const data = bridgeData(container.querySelector("form")!);
  expect(data.getAll("files")).toEqual(["合法字段", valid]);
});

test.each(["controlled refusal", "canceled change"])("%s never enters accepted submission; the chooser can select the same File again", async mode => {
  const selected = file("A.txt");
  const change = vi.fn((_next, details) => { if (mode === "canceled change") details.cancel(); });
  const { container } = render(<form><FileUpload name="files" {...(mode === "controlled refusal" ? { value: [] } : {})} onValueChange={change} inputProps={{ "aria-label": "文件" }} /></form>);
  const input = screen.getByLabelText("文件") as HTMLInputElement;
  expect(container.querySelector('[data-slot="file-upload-chooser-label"]')).toHaveTextContent("选择文件");
  expect(container.querySelector('[data-slot="file-upload-chooser-label"]')).toHaveAttribute("aria-hidden", "true");
  expect(screen.queryByRole("button", { name: "选择文件" })).not.toBeInTheDocument();
  await userEvent.tab();
  expect(input).toHaveFocus();
  await userEvent.upload(input, selected);
  expect(input.value).toBe("");
  await userEvent.upload(input, selected);
  expect(change).toHaveBeenCalledTimes(2);
  expect(bridgeData(container.querySelector("form")!).getAll("files")).toEqual([]);
  expect(screen.queryByRole("button", { name: "移除 A.txt" })).not.toBeInTheDocument();
});

test("local remove/reselect and uncanceled native reset retain real File references; canceled reset preserves edits", async () => {
  const a = file("A.txt");
  const b = file("B.txt");
  const change = vi.fn();
  const { container } = render(<form><FileUpload name="files" defaultValue={[a]} onValueChange={change} inputProps={{ "aria-label": "文件" }} /></form>);
  const form = container.querySelector("form")!;
  const input = screen.getByLabelText("文件") as HTMLInputElement;
  await userEvent.upload(input, b);
  await userEvent.click(screen.getByRole("button", { name: "移除 A.txt" }));
  expect(screen.getByRole("button", { name: "移除 B.txt" })).toHaveFocus();
  expect(bridgeData(form).getAll("files")).toEqual([b]);
  await userEvent.upload(input, a);
  expect(bridgeData(form).getAll("files")).toEqual([b, a]);
  const requests = change.mock.calls.length;
  form.reset();
  await waitFor(() => expect(bridgeData(form).getAll("files")).toEqual([a]));
  expect(change).toHaveBeenCalledTimes(requests);
  await userEvent.upload(input, b);
  form.addEventListener("reset", event => event.preventDefault(), { once: true });
  form.reset();
  await Promise.resolve();
  expect(bridgeData(form).getAll("files")).toEqual([a, b]);
});

test("focused removal returns to chooser when empty; a controlled refusal keeps the original button focus", async () => {
  const a = file("A.txt");
  const b = file("B.txt");
  const request = vi.fn();
  const { container, rerender } = render(<form><FileUpload name="files" value={[a, b]} onValueChange={request} inputProps={{ "aria-label": "文件" }} /></form>);
  const remove = screen.getByRole("button", { name: "移除 A.txt" });
  await userEvent.click(remove);
  expect(request).toHaveBeenCalledTimes(1);
  expect(remove).toHaveFocus();
  expect(bridgeData(container.querySelector("form")!).getAll("files")).toEqual([a, b]);
  rerender(<form><FileUpload name="files" value={[b]} onValueChange={request} inputProps={{ "aria-label": "文件" }} /></form>);
  expect(screen.getByRole("button", { name: "移除 B.txt" })).toHaveFocus();
  await userEvent.keyboard("{Enter}");
  expect(request).toHaveBeenCalledTimes(2);
  expect(screen.getByRole("button", { name: "移除 B.txt" })).toHaveFocus();
  rerender(<form><FileUpload name="files" value={[]} onValueChange={request} inputProps={{ "aria-label": "文件" }} /></form>);
  expect(screen.getByLabelText("文件")).toHaveFocus();
});

test.each(["readOnly", "disabled", "fieldDisabled"])("%s uses the external form and blocks collection mutations", state => {
  const a = file("A.txt");
  const change = vi.fn();
  const recover = vi.fn();
  const { container } = render(<><form id="outside" /><Field name="files" disabled={state === "fieldDisabled"}><FieldLabel>文件</FieldLabel><FileUpload defaultValue={[a]} form="outside" disabled={state === "disabled"} readOnly={state === "readOnly"} onValueChange={change} getStatus={() => ({ state: "unknown", label: "结果未知" })} renderFileActions={() => <Button onClick={recover}>核对结果</Button>} /></Field></>);
  const input = screen.getByLabelText("文件");
  expect((input as HTMLInputElement).form).toBe(container.querySelector("form"));
  fireEvent.change(input, { target: { files: [file("B.txt")] } });
  fireEvent.drop(container.querySelector('[data-slot="file-upload"]')!, { dataTransfer: { files: [file("C.txt")], types: ["Files"] } });
  fireEvent.click(screen.getByRole("button", { name: "移除 A.txt" }));
  expect(change).not.toHaveBeenCalled();
  expect(recover).not.toHaveBeenCalled();
  expect(screen.getByRole("status")).toHaveTextContent("结果未知");
  expect(bridgeData(container.querySelector("form")!).getAll("files")).toEqual(state === "readOnly" ? [a] : []);
});
