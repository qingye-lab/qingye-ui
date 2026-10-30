import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AsyncContent } from "../src/components/async-content";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

describe("AsyncContent", () => {
  it("distinguishes first load, failure, and a confirmed empty result", () => {
    const view = render(<AsyncContent status="pending" hasContent={false} emptyContent="没有记录">不可用内容</AsyncContent>);
    expect(screen.getByRole("status")).toHaveTextContent("正在加载");
    expect(screen.getByRole("status").closest('[aria-busy="true"]')).toBeNull();
    expect(screen.queryByText("没有记录")).not.toBeInTheDocument();
    expect(screen.queryByText("不可用内容")).not.toBeInTheDocument();
    view.rerender(<AsyncContent status="error" hasContent={false} emptyContent="没有记录" errorContent={<button>重新加载</button>} />);
    expect(screen.getByRole("button", { name: "重新加载" })).toBeEnabled();
    expect(screen.queryByText("没有记录")).not.toBeInTheDocument();
    view.rerender(<AsyncContent status="success" hasContent={false} emptyContent="没有记录" />);
    expect(screen.getByText("没有记录")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("retains the same input, draft, focus and local selection through refresh and failure", async () => {
    const user = userEvent.setup();
    const content = <><input aria-label="备注" defaultValue="" /><input type="checkbox" aria-label="选择" /></>;
    const view = render(<AsyncContent status="success" hasContent emptyContent="没有记录">{content}</AsyncContent>);
    const input = screen.getByRole("textbox", { name: "备注" });
    await user.click(screen.getByRole("checkbox"));
    await user.type(input, "未保存的草稿");
    view.rerender(<AsyncContent status="pending" hasContent emptyContent="没有记录">{content}</AsyncContent>);
    expect(screen.getByRole("textbox")).toBe(input);
    expect(input).toHaveValue("未保存的草稿");
    expect(input).toHaveFocus();
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(input.closest("[data-slot=async-content-body]")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("status").closest('[aria-busy="true"]')).toBeNull();
    view.rerender(<AsyncContent status="error" hasContent emptyContent="没有记录" errorContent={<div>刷新失败，保留上次结果</div>}>{content}</AsyncContent>);
    expect(input).toHaveFocus();
    expect(input).toHaveValue("未保存的草稿");
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(screen.getByRole("alert")).toHaveTextContent("刷新失败");
    expect(input.closest("[data-slot=async-content-body]")).toHaveAttribute("aria-busy", "false");
  });

  it("leaves permissions and partial failures independent of request state", () => {
    render(<AsyncContent status="success" hasContent emptyContent="没有记录"><p>只读：没有编辑权限</p><input aria-label="值" readOnly value="可用数据" /><div role="alert">附件加载失败</div></AsyncContent>);
    expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
    expect(screen.getByRole("textbox")).toHaveValue("可用数据");
    expect(screen.getByRole("alert")).toHaveTextContent("附件加载失败");
  });

  it("announces failure as an alert and keeps feedback behind the content so the content is not pushed", () => {
    const content = <p>可用数据</p>;
    const view = render(<AsyncContent status="success" hasContent emptyContent="没有记录" errorContent="失败">{content}</AsyncContent>);
    const body = screen.getByText("可用数据").closest("[data-slot=async-content-body]")!;
    view.rerender(<AsyncContent status="pending" hasContent emptyContent="没有记录">{content}</AsyncContent>);
    expect(screen.getByRole("status")).toHaveTextContent("正在加载");
    expect(body.compareDocumentPosition(screen.getByRole("status")) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    view.rerender(<AsyncContent status="error" hasContent emptyContent="没有记录" errorContent="刷新失败">{content}</AsyncContent>);
    expect(screen.getByRole("alert")).toHaveTextContent("刷新失败");
    expect(body.compareDocumentPosition(screen.getByRole("alert")) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // 同一个节点，没有因为反馈出现而重排或重挂。
    expect(screen.getByText("可用数据").closest("[data-slot=async-content-body]")).toBe(body);
  });

  it("localizes default loading and forwards the actual element props", () => {
    render(<UILocaleProvider locale={enUS}><AsyncContent status="pending" hasContent={false} emptyContent={null} render={<section aria-label="Records" />} id="records" /></UILocaleProvider>);
    expect(screen.getByRole("region", { name: "Records" })).toHaveAttribute("id", "records");
    expect(screen.getByRole("status")).toHaveTextContent("Loading");
  });
});
