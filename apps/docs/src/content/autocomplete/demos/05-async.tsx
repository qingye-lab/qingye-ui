import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompleteStatus,
  Spinner,
} from "@yanqing/ui";
import { useRef, useState } from "react";

export const meta = { title: "远程建议", description: "filter={null}，由接口返回建议；请求进行中显示加载状态。" };

const addresses = [
  "浙江省杭州市西湖区文三路 478 号",
  "浙江省杭州市滨江区网商路 699 号",
  "浙江省杭州市余杭区文一西路 969 号",
  "上海市浦东新区张江路 368 号",
  "北京市朝阳区望京东园四区 9 号",
];

// Stands in for an address-suggestion API.
const suggest = (query: string) =>
  new Promise<string[]>((resolve) => setTimeout(() => resolve(addresses.filter((item) => item.includes(query))), 450));

export default function Demo() {
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const latest = useRef(0);
  return (
    <div className="w-full max-w-sm">
      <Autocomplete
        items={items}
        filter={null}
        onValueChange={async (next) => {
          const query = next.trim();
          const ticket = ++latest.current;
          if (!query) return setItems([]);
          setLoading(true);
          const found = await suggest(query);
          if (ticket !== latest.current) return;
          setItems(found);
          setLoading(false);
        }}
      >
        <AutocompleteInput aria-label="安装地址" placeholder="输入街道或小区，例如 杭州" />
        <AutocompletePopup aria-busy={loading || undefined}>
          <AutocompleteStatus>
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner className="size-3.5" />
                正在获取地址建议…
              </span>
            ) : null}
          </AutocompleteStatus>
          <AutocompleteList>
            {(address: string) => (
              <AutocompleteItem key={address} value={address}>
                {address}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}
