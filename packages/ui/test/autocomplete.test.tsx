import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, test, vi } from "vitest";
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompleteStatus,
} from "../src/components/autocomplete";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

const questions = [
  "如何重置设备管理员密码",
  "设备离线后如何排查网络",
  "批量升级固件的步骤",
  "如何导出近 30 天的告警记录",
];

function Basic({ onValueChange }: { onValueChange?: (value: string) => void } = {}) {
  return (
    <Autocomplete items={questions} onValueChange={onValueChange}>
      <AutocompleteInput aria-label="帮助搜索" placeholder="输入问题" />
      <AutocompletePopup>
        <AutocompleteEmpty>没有匹配的问题</AutocompleteEmpty>
        <AutocompleteList>
          {(item: string) => (
            <AutocompleteItem key={item} value={item}>
              {item}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompletePopup>
    </Autocomplete>
  );
}

describe("Autocomplete", () => {
  // Autocomplete opens once there is a query, not on a bare click; that is the
  // component's intended model, so these tests type to open the list.
  test("starts closed and reveals suggestions once you type", async () => {
    const user = userEvent.setup();
    render(<Basic />);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    const input = screen.getByRole("combobox", { name: "帮助搜索" });
    await user.type(input, "固件");
    const listbox = await screen.findByRole("listbox");
    await waitFor(() =>
      expect(within(listbox).getAllByRole("option").map((option) => option.textContent)).toEqual([
        "批量升级固件的步骤",
      ]),
    );
  });

  test("typing filters by substring, not only prefix", async () => {
    const user = userEvent.setup();
    render(<Basic />);
    const input = screen.getByRole("combobox", { name: "帮助搜索" });
    await user.type(input, "如何");
    await screen.findByRole("listbox");
    // "如何" also appears mid-string, so the middle question matches too.
    await waitFor(() =>
      expect(screen.getAllByRole("option").map((option) => option.textContent)).toEqual([
        "如何重置设备管理员密码",
        "设备离线后如何排查网络",
        "如何导出近 30 天的告警记录",
      ]),
    );
  });

  test("filters as you type and keeps free text", async () => {
    const user = userEvent.setup();
    render(<Basic />);
    const input = screen.getByRole("combobox", { name: "帮助搜索" });

    await user.type(input, "固件");
    await waitFor(() =>
      expect(screen.getAllByRole("option").map((option) => option.textContent)).toEqual([
        "批量升级固件的步骤",
      ]),
    );

    // A query that matches nothing is still accepted: the empty state shows and
    // the typed text is preserved rather than reverted.
    await user.clear(input);
    await user.type(input, "打印机脱机");
    expect(await screen.findByText("没有匹配的问题")).toBeInTheDocument();
    expect(screen.queryAllByRole("option")).toHaveLength(0);
    expect(input).toHaveValue("打印机脱机");
  });

  test("choosing a suggestion writes it back into the input", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Basic onValueChange={onValueChange} />);
    const input = screen.getByRole("combobox", { name: "帮助搜索" });
    await user.type(input, "固件");
    await screen.findByRole("listbox");

    await user.click(screen.getByRole("option", { name: "批量升级固件的步骤" }));

    const lastValue = onValueChange.mock.calls.at(-1)?.[0];
    expect(lastValue).toBe("批量升级固件的步骤");
    expect(input).toHaveValue("批量升级固件的步骤");
  });

  test("Escape closes the list and keeps the current text", async () => {
    const user = userEvent.setup();
    render(<Basic />);
    const input = screen.getByRole("combobox", { name: "帮助搜索" });
    await user.type(input, "密码");
    await screen.findByRole("listbox");

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    expect(input).toHaveValue("密码");
  });

  test("a controlled value round-trips through onValueChange", async () => {
    function Controlled() {
      const [value, setValue] = useState("");
      return (
        <>
          <Autocomplete items={questions} value={value} onValueChange={setValue}>
            <AutocompleteInput aria-label="帮助搜索" />
            <AutocompletePopup>
              <AutocompleteEmpty>没有匹配的问题</AutocompleteEmpty>
              <AutocompleteList>
                {(item: string) => (
                  <AutocompleteItem key={item} value={item}>
                    {item}
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </Autocomplete>
          <output data-testid="echo">{value}</output>
        </>
      );
    }
    const user = userEvent.setup();
    render(<Controlled />);
    const input = screen.getByRole("combobox", { name: "帮助搜索" });
    expect(input).toHaveValue("");

    await user.type(input, "固件");
    // Every keystroke flows out through onValueChange and back into the input.
    expect(screen.getByTestId("echo")).toHaveTextContent("固件");
    expect(input).toHaveValue("固件");
    await waitFor(() =>
      expect(screen.getAllByRole("option").map((option) => option.textContent)).toEqual([
        "批量升级固件的步骤",
      ]),
    );

    // Clearing writes the empty value back out.
    await user.clear(input);
    expect(screen.getByTestId("echo")).toHaveTextContent("");
    expect(input).toHaveValue("");
  });

  test("limit truncates the rendered list", async () => {
    const user = userEvent.setup();
    const many = Array.from({ length: 40 }, (_, index) => `基站 HZ-${index + 101}`);
    render(
      <Autocomplete items={many} limit={6}>
        <AutocompleteInput aria-label="基站" />
        <AutocompletePopup>
          <AutocompleteList>
            {(item: string) => (
              <AutocompleteItem key={item} value={item}>
                {item}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>,
    );
    const input = screen.getByRole("combobox", { name: "基站" });
    await user.type(input, "HZ-1");
    await screen.findByRole("listbox");
    await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(6));
  });

  test("status text is announced through an aria-live region", async () => {
    const user = userEvent.setup();
    render(
      <Autocomplete items={questions}>
        <AutocompleteInput aria-label="帮助搜索" />
        <AutocompletePopup aria-busy>
          <AutocompleteStatus>正在搜索…</AutocompleteStatus>
          <AutocompleteList>
            {(item: string) => (
              <AutocompleteItem key={item} value={item}>
                {item}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>,
    );
    await user.type(screen.getByRole("combobox", { name: "帮助搜索" }), "固件");
    // Base UI pads the live region with a zero-width space, so match a substring.
    const status = await screen.findByText(/正在搜索/);
    expect(status).toHaveAttribute("data-slot", "autocomplete-status");
    expect(status).toHaveAttribute("role", "status");
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  test("grouped suggestions keep their labels", async () => {
    const user = userEvent.setup();
    const groups = [
      { value: "最近搜索", items: ["杭州 A 栋机房", "UPS 电池更换"] },
      { value: "热门", items: ["温度告警阈值"] },
    ];
    render(
      <Autocomplete items={groups}>
        <AutocompleteInput aria-label="搜索" />
        <AutocompletePopup>
          <AutocompleteList>
            {(group: (typeof groups)[number]) => (
              <AutocompleteGroup items={group.items} key={group.value}>
                <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
                <AutocompleteCollection>
                  {(item: string) => (
                    <AutocompleteItem key={item} value={item}>
                      {item}
                    </AutocompleteItem>
                  )}
                </AutocompleteCollection>
              </AutocompleteGroup>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>,
    );
    const input = screen.getByRole("combobox", { name: "搜索" });
    // Autocomplete filters on the item's own text, so match a string that
    // exists in the data.
    await user.type(input, "UPS");
    await screen.findByRole("listbox");
    await waitFor(() =>
      expect(screen.getAllByRole("option").map((option) => option.textContent)).toEqual([
        "UPS 电池更换",
      ]),
    );
    // A group whose items all filtered out loses its label with them.
    expect(screen.getByText("最近搜索")).toBeInTheDocument();
    expect(screen.queryByText("热门")).not.toBeInTheDocument();
  });

  test("mode=inline fills the input from the highlighted item", async () => {
    const user = userEvent.setup();
    render(
      <Autocomplete items={["restart nginx", "restart redis", "reload nginx"]} mode="inline">
        <AutocompleteInput aria-label="运维指令" />
        <AutocompletePopup>
          <AutocompleteList>
            {(item: string) => (
              <AutocompleteItem key={item} value={item}>
                {item}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>,
    );
    const input = screen.getByRole("combobox", { name: "运维指令" });
    await user.type(input, "re");
    // Typing alone does not complete; the highlighted item drives the fill.
    expect(input).toHaveValue("re");
    await screen.findByRole("listbox");

    await user.click(screen.getByRole("option", { name: "restart nginx" }));
    expect(input).toHaveValue("restart nginx");
  });

  test("size and disabled state land on the input", () => {
    render(
      <Autocomplete items={questions} disabled>
        <AutocompleteInput aria-label="帮助搜索" size="sm" />
        <AutocompletePopup />
      </Autocomplete>,
    );
    const input = screen.getByRole("combobox", { name: "帮助搜索" });
    // Size is forwarded to the owning Input control, whose height follows the role token.
    expect(input.closest("[data-slot=input-control]")).toHaveAttribute("data-size", "sm");
    expect(input).toBeDisabled();
  });

  test("built-in control names follow the UI locale", async () => {
    const user = userEvent.setup();
    render(
      <UILocaleProvider locale={enUS}>
        <Autocomplete items={questions}>
          <AutocompleteInput aria-label="Help search" showTrigger showClear />
          <AutocompletePopup>
            <AutocompleteList>
              {(item: string) => (
                <AutocompleteItem key={item} value={item}>
                  {item}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompletePopup>
        </Autocomplete>
      </UILocaleProvider>,
    );
    await user.type(screen.getByRole("combobox", { name: "Help search" }), "firmware");
    const trigger = document.querySelector("[data-slot=autocomplete-trigger]");
    expect(trigger).toHaveAttribute("aria-label", "Show options");
    expect(screen.getByLabelText("Show options")).toBe(trigger);
  });
});
