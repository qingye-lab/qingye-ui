import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, test, vi } from "vitest";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxStatus,
  ComboboxValue,
} from "../src/components/combobox";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

const cities = ["北京", "上海", "广州", "深圳", "杭州"];

function Single({
  onValueChange,
  defaultValue,
  ...rest
}: {
  onValueChange?: (value: string | null) => void;
  defaultValue?: string | null;
  "aria-label"?: string;
}) {
  return (
    <Combobox
      items={cities}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      {...rest}
    >
      <ComboboxInput aria-label="发货城市" placeholder="输入城市名" />
      <ComboboxPopup>
        <ComboboxEmpty>没有匹配的城市</ComboboxEmpty>
        <ComboboxList>
          {(city: string) => (
            <ComboboxItem key={city} value={city}>
              {city}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}

describe("Combobox single", () => {
  // Base UI moves the active option with real layout measurements, so the
  // commit-on-Enter path is verified in a browser (see the docs playground);
  // here we cover open/close, filtering and the empty state, which are
  // layout-independent.
  test("opens on click and filters as you type", async () => {
    const user = userEvent.setup();
    render(<Single />);
    const input = screen.getByRole("combobox", { name: "发货城市" });

    // Closed: no listbox is mounted.
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    await user.click(input);
    const listbox = await screen.findByRole("listbox");
    expect(within(listbox).getAllByRole("option")).toHaveLength(cities.length);

    await user.type(input, "杭");
    await waitFor(() =>
      expect(within(listbox).getAllByRole("option").map((o) => o.textContent)).toEqual(["杭州"]),
    );
    expect(input).toHaveValue("杭");
  });

  test("choosing an option calls onValueChange and closes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Combobox items={cities} onValueChange={onValueChange}>
        <ComboboxInput aria-label="发货城市" />
        <ComboboxPopup>
          <ComboboxList>
            {(city: string) => (
              <ComboboxItem key={city} value={city}>
                {city}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>,
    );
    const input = screen.getByRole("combobox", { name: "发货城市" });
    await user.click(input);
    await screen.findByRole("listbox");
    await user.click(screen.getByRole("option", { name: "杭州" }));

    // Base UI appends an eventDetails object after the value; assert on the value.
    expect(onValueChange.mock.calls[0]?.[0]).toBe("杭州");
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
  });

  test("Escape closes the popup and keeps the committed value", async () => {
    const user = userEvent.setup();
    render(<Single defaultValue="上海" />);
    const input = screen.getByRole("combobox", { name: "发货城市" });
    expect(input).toHaveValue("上海");

    await user.click(input);
    await screen.findByRole("listbox");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    expect(input).toHaveValue("上海");
  });

  test("shows the empty state when nothing matches, then recovers", async () => {
    const user = userEvent.setup();
    render(<Single />);
    const input = screen.getByRole("combobox", { name: "发货城市" });
    await user.click(input);
    await screen.findByRole("listbox");

    await user.type(input, "重庆");
    expect(await screen.findByText("没有匹配的城市")).toBeInTheDocument();
    // The empty node stays mounted but collapses when it has no text box.
    expect(screen.queryAllByRole("option")).toHaveLength(0);

    await user.clear(input);
    await user.type(input, "深");
    await waitFor(() =>
      expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["深圳"]),
    );
    expect(screen.queryByText("没有匹配的城市")).not.toBeInTheDocument();
  });

  test("the selected option is marked data-selected on reopen", async () => {
    const user = userEvent.setup();
    render(<Single defaultValue="广州" />);
    const input = screen.getByRole("combobox", { name: "发货城市" });
    await user.click(input);
    await screen.findByRole("listbox");
    expect(screen.getByRole("option", { name: "广州" })).toHaveAttribute("data-selected");
    expect(screen.getByRole("option", { name: "北京" })).not.toHaveAttribute("data-selected");
  });

  test("a disabled combobox cannot be opened", async () => {
    const user = userEvent.setup();
    render(<Single defaultValue="上海" />);
    const input = screen.getByRole("combobox", { name: "发货城市" });
    expect(input).not.toBeDisabled();
    await user.click(input);
    await screen.findByRole("listbox");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
  });
});

function Multiple({
  onValueChange,
}: {
  onValueChange?: (value: string[]) => void;
}) {
  return (
    <Combobox items={cities} multiple defaultValue={["上海"]} onValueChange={onValueChange}>
      <ComboboxChips className="w-full max-w-sm">
        <ComboboxValue>
          {(value: string[]) => (
            <>
              {value.map((city) => (
                <ComboboxChip aria-label={city} key={city}>
                  {city}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput
                aria-label="途经城市"
                placeholder={value.length ? undefined : "添加城市"}
              />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxPopup>
        <ComboboxEmpty>没有匹配的城市</ComboboxEmpty>
        <ComboboxList>
          {(city: string) => (
            <ComboboxItem key={city} value={city}>
              {city}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}

describe("Combobox multiple with chips", () => {
  test("picking a second value adds a chip", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Multiple onValueChange={onValueChange} />);
    // The chip itself carries the removed item's name as its accessible label.
    expect(screen.getByRole("button", { name: "移除 上海" })).toBeInTheDocument();

    const input = screen.getByRole("combobox", { name: "途经城市" });
    await user.click(input);
    await screen.findByRole("listbox");
    await user.type(input, "杭州");
    await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(1));
    await user.click(screen.getByRole("option", { name: "杭州" }));

    const lastValue = onValueChange.mock.calls.at(-1)?.[0] as string[] | undefined;
    expect(lastValue).toEqual(expect.arrayContaining(["上海", "杭州"]));
    // Both chips are present, each with its own remove button.
    await waitFor(() => expect(document.querySelectorAll("[data-slot=combobox-chip]")).toHaveLength(2));
  });

  test("Backspace in an empty input removes the last chip", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Multiple onValueChange={onValueChange} />);
    const input = screen.getByRole("combobox", { name: "途经城市" });
    await user.click(input);
    await screen.findByRole("listbox");
    await user.keyboard("{Backspace}");
    await waitFor(() => expect(onValueChange.mock.calls.at(-1)?.[0]).toEqual([]));
    await waitFor(() => expect(document.querySelectorAll("[data-slot=combobox-chip]")).toHaveLength(0));
  });

  test("a chip remove button removes exactly that chip", async () => {
    const user = userEvent.setup();
    render(
      <Combobox items={cities} multiple defaultValue={["上海", "杭州"]}>
        <ComboboxChips>
          <ComboboxValue>
            {(value: string[]) => (
              <>
                {value.map((city) => (
                  <ComboboxChip aria-label={`移除 ${city}`} key={city}>
                    {city}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput aria-label="途经城市" />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxPopup>
          <ComboboxList>
            {(city: string) => (
              <ComboboxItem key={city} value={city}>
                {city}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>,
    );
    const input = screen.getByRole("combobox", { name: "途经城市" });
    await user.click(input);
    await screen.findByRole("listbox");

    // Each remove action names the exact selected object.
    const chips = [...document.querySelectorAll("[data-slot=combobox-chip]")];
    expect(chips.map((chip) => chip.getAttribute("aria-label"))).toEqual(["移除 上海", "移除 杭州"]);

    const shanghaiChip = chips.find((chip) => chip.getAttribute("aria-label") === "移除 上海");
    await user.click(shanghaiChip!.querySelector("button") as HTMLElement);

    await waitFor(() => expect(document.querySelectorAll("[data-slot=combobox-chip]")).toHaveLength(1));
    expect(document.querySelector("[data-slot=combobox-chip]")).toHaveAttribute("aria-label", "移除 杭州");
  });

  test("the chip remove button names the action and selected object", () => {
    render(<Multiple />);
    expect(screen.getByRole("button", { name: "移除 上海" })).toBeInTheDocument();
  });

  test("chip removal names follow the locale and an explicit removeProps label wins", () => {
    render(
      <UILocaleProvider locale={enUS}>
        <Combobox items={cities} multiple defaultValue={["上海", "杭州"]}>
          <ComboboxChips>
            <ComboboxChip>上海</ComboboxChip>
            <ComboboxChip removeProps={{ "aria-label": "Remove Hangzhou from this route" }}>杭州</ComboboxChip>
            <ComboboxChipsInput aria-label="Route" />
          </ComboboxChips>
        </Combobox>
      </UILocaleProvider>,
    );
    expect(screen.getByRole("button", { name: "Remove 上海" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Remove Hangzhou from this route" })).toBeInTheDocument();
  });
});

// A controlled open state is the only way to assert popup content without a
// pointer, which is also what the docs site does for its playground.
test("a controlled open combobox renders its list without interaction", () => {
  render(
    <Combobox items={cities} defaultOpen>
      <ComboboxInput aria-label="发货城市" />
      <ComboboxPopup>
        <ComboboxEmpty>没有匹配的城市</ComboboxEmpty>
        <ComboboxList>
          {(city: string) => (
            <ComboboxItem key={city} value={city}>
              {city}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>,
  );
  expect(screen.getByRole("listbox")).toBeInTheDocument();
  expect(screen.getAllByRole("option")).toHaveLength(cities.length);
});

test("grouped items keep their labels and hide groups that filter out", async () => {
  const user = userEvent.setup();
  const groups = [
    { value: "华东", items: ["杭州", "上海"] },
    { value: "华北", items: ["北京"] },
  ];
  render(
    <Combobox items={groups}>
      <ComboboxInput aria-label="可用区" placeholder="选择可用区" />
      <ComboboxPopup>
        <ComboboxEmpty>没有匹配的可用区</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof groups)[number]) => (
            <ComboboxGroup items={group.items} key={group.value}>
              <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
              <ComboboxCollection>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>,
  );
  const input = screen.getByRole("combobox", { name: "可用区" });
  await user.click(input);
  await screen.findByRole("listbox");
  expect(screen.getByText("华东")).toBeInTheDocument();
  expect(screen.getByText("华北")).toBeInTheDocument();

  await user.keyboard("北");
  await waitFor(() => expect(screen.queryByText("华东")).not.toBeInTheDocument());
  expect(screen.getByText("华北")).toBeInTheDocument();
});

test("a long list stays scrollable and only renders matching rows", async () => {
  const user = userEvent.setup();
  const many = Array.from({ length: 200 }, (_, index) => `基站 HZ-${index + 100}`);
  render(
    <Combobox items={many} defaultOpen>
      <ComboboxInput aria-label="基站" />
      <ComboboxPopup>
        <ComboboxList>
          {(station: string) => (
            <ComboboxItem key={station} value={station}>
              {station}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>,
  );
  const list = screen.getByRole("listbox");
  expect(list).toHaveAttribute("data-slot", "combobox-list");
  const input = screen.getByRole("combobox", { name: "基站" });
  await user.type(input, "HZ-100");
  await waitFor(() => expect(screen.getAllByRole("option").length).toBeLessThan(many.length));
  // The popup grows no wider than its anchor column.
  expect(list.className).not.toMatch(/w-screen/);
});

test("status text is announced through an aria-live region", () => {
  render(
    <Combobox items={cities} defaultOpen>
      <ComboboxInput aria-label="发货城市" />
      <ComboboxPopup aria-busy>
        <ComboboxStatus>正在搜索设备…</ComboboxStatus>
        <ComboboxList>
          {(city: string) => (
            <ComboboxItem key={city} value={city}>
              {city}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>,
  );
  // Base UI pads the live region with a zero-width space so repeat announcements
  // still fire, so match on a substring rather than the exact node text.
  const status = screen.getByText(/正在搜索设备/);
  expect(status).toHaveAttribute("data-slot", "combobox-status");
  expect(status).toHaveAttribute("role", "status");
  expect(status).toHaveAttribute("aria-live", "polite");
  expect(document.querySelector("[data-slot=combobox-popup]")).toHaveAttribute("aria-busy", "true");
});

test("the trigger's built-in accessible name follows the UI locale", () => {
  render(
    <Combobox items={cities} defaultOpen>
      <ComboboxInput aria-label="City" showTrigger />
      <ComboboxPopup>
        <ComboboxList>
          {(city: string) => (
            <ComboboxItem key={city} value={city}>
              {city}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>,
  );
  const trigger = document.querySelector("[data-slot=combobox-trigger]");
  expect(trigger).toHaveAttribute("aria-label", "展开选项");
  // The icon button's name is the locale string, not the icon.
  expect(screen.getByLabelText("展开选项")).toBe(trigger);
});

test("an English UI locale renames the built-in controls", () => {
  render(
    <UILocaleProvider locale={enUS}>
      <Combobox items={cities} defaultOpen>
        <ComboboxInput aria-label="City" showTrigger />
        <ComboboxPopup>
          <ComboboxList>
            {(city: string) => (
              <ComboboxItem key={city} value={city}>
                {city}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </UILocaleProvider>,
  );
  expect(screen.getByLabelText("Show options")).toBeInTheDocument();
});

test("a controlled input value drives the filter", async () => {
  function Controlled() {
    const [query, setQuery] = useState("");
    return (
      <>
        <Combobox items={cities} inputValue={query} onInputValueChange={setQuery}>
          <ComboboxInput aria-label="发货城市" />
          <ComboboxPopup>
            <ComboboxEmpty>没有匹配的城市</ComboboxEmpty>
            <ComboboxList>
              {(city: string) => (
                <ComboboxItem key={city} value={city}>
                  {city}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>
        <output data-testid="echo">{query}</output>
      </>
    );
  }
  const user = userEvent.setup();
  render(<Controlled />);
  const input = screen.getByRole("combobox", { name: "发货城市" });
  await user.click(input);
  await user.keyboard("上");
  expect(screen.getByTestId("echo")).toHaveTextContent("上");
  await waitFor(() =>
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["上海"]),
  );
});
