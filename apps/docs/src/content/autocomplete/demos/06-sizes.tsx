import { Autocomplete, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup } from "@qingye/ui/components/autocomplete";

export const meta = { title: "尺寸与禁用" };

const domains = ["example.com", "example.cn", "corp.example.com", "mail.example.com"];

function DomainAutocomplete({ size = "default", disabled = false }: { size?: "sm" | "default" | "lg"; disabled?: boolean }) {
  return (
    <Autocomplete items={domains} disabled={disabled}>
      <AutocompleteInput size={size} aria-label="邮箱域名" placeholder="邮箱域名" />
      <AutocompletePopup>
        <AutocompleteList>
          {(domain: string) => (
            <AutocompleteItem key={domain} value={domain}>
              {domain}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompletePopup>
    </Autocomplete>
  );
}

export default function Demo() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-3">
      <DomainAutocomplete size="sm" />
      <DomainAutocomplete />
      <DomainAutocomplete size="lg" />
      <DomainAutocomplete disabled />
    </div>
  );
}
