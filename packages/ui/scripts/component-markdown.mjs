// Render one catalog component entry as Markdown. Used for the per-component files that ship in
// ai/<version>/components (all examples), and for llms-full.txt (first example only). It reads
// only catalog fields, so a fact exists in one place: the generated catalog.
//
// `component` is a catalog component, already merged with its localized fields when the English
// text is wanted (see localizedComponent).

/** Overlay the English fields on a catalog component, as the per-locale files do. */
export function localizedComponent(component, locale) {
  if (locale !== "en") return component;
  return { ...component, ...component.localized.en, providers: { ...component.providers, guidance: component.localized.en.providerGuidance } };
}

function ownProps(component) {
  const typeApi = component.typeApi;
  if (!typeApi || typeApi.status !== "PASS") {
    return ["Props are curated by hand and were not resolved from types for this component" + (typeApi?.reason ? ` (${typeApi.reason}).` : "."), ""];
  }
  const lines = [];
  for (const part of typeApi.parts) {
    if (part.status === "not-applicable") continue;
    if (part.status === "no-props") { lines.push(`### ${part.name}`, "- takes no props", ""); continue; }
    if (part.status !== "resolved") { lines.push(`### ${part.name}`, `- not resolved: ${part.reason ?? part.status}`, ""); continue; }
    if (!part.ownProps.length && !/^[A-Z]/.test(part.name)) continue;
    lines.push(`### ${part.name}`);
    for (const prop of part.ownProps) {
      const note = prop.doc ? ` ${prop.doc.replace(/\s*\n\s*/g, " ")}` : "";
      lines.push(`- \`${prop.name}${prop.optional ? "?" : ""}\`: \`${prop.type}\`${prop.default ? `; default ${prop.default}` : ""}.${note}`);
    }
    if (!part.ownProps.length) lines.push("- no props declared by this library");
    const origin = part.inheritedFrom.map((item) => `${item.source} ${item.count}`).join(", ");
    if (part.inheritedCount) lines.push(`- plus ${part.inheritedCount} inherited${origin ? ` (${origin})` : ""}; not expanded, see the installed declarations`);
    lines.push("");
  }
  return lines;
}

function providerLines(component) {
  const providers = component.providers;
  const lines = [`- Runtime: ${component.dependencies.runtime.join(", ") || "none recorded"}`, `- Optional peers: ${component.dependencies.optionalPeers.join(", ") || "none recorded"}`];
  lines.push(...providers.guidance.map((item) => `- ${item.text}`));
  if (providers.scope) {
    lines.push(`- Required providers: ${providers.required.length ? providers.required.join(", ") : "none"}`);
    lines.push(`- Locale: ${providers.usesLocale ? "reads UILocale; works without UILocaleProvider (default locale)" : "does not read UILocale"}`);
    for (const context of providers.contexts.filter((item) => item.name !== "LocaleContext")) {
      lines.push(`- Context ${context.name}: without a provider ${context.withoutProvider}${context.providedBy ? `; provided by ${context.providedBy.join(", ")}` : ""}`);
    }
    if (providers.status !== "PASS") lines.push(`- UNVERIFIED: ${providers.unverified}`);
  } else lines.push("- Required providers are not resolved for this component: UNVERIFIED.");
  return lines;
}

/**
 * @param {object} options
 * @param {"all"|"first"} options.examples  how many source examples to include
 * @param {number} options.depth             heading level of the component title (1 for a file, 2 inside llms-full)
 */
export function renderComponent(component, { pkgName, pkgVersion, examples = "all", depth = 1 } = {}) {
  const h = (level, text) => `${"#".repeat(level + depth - 1)} ${text}`;
  const shown = examples === "first" ? component.examples.slice(0, 1) : component.examples;
  return [
    h(1, component.title), "", `Package: ${pkgName}@${pkgVersion}`, `Import: ${component.import}`, `Source: ${component.sourceFacts.file}`, `Source SHA-256: ${component.sourceFacts.sha256}`, "",
    component.description, "",
    ...(component.decisions ? [h(2, "Decision"), component.decisions, ""] : []),
    ...(component.notes?.length ? [h(2, "Notes"), ...component.notes.map((note) => `- ${note}`), ""] : []),
    h(2, "Use and ownership"),
    ...component.design.whenToUse.map((item) => `- ${item}`), ...component.design.avoid.map((item) => `- Avoid: ${item}`),
    ...component.design.stateOwner.library.map((item) => `- Library: ${item}`), ...component.design.stateOwner.application.map((item) => `- Application: ${item}`), "",
    h(2, "Composition"), ...component.design.composition.map((item) => `- ${item}`), "",
    h(2, "Responsive behavior"), ...component.design.responsive.map((item) => `- ${item}`), "",
    h(2, "Customization"), ...component.design.customization.map((item) => `- ${item}`), "",
    h(2, "Current exports"),
    ...component.actualExports.map((item) => `- ${item.name}: ${item.kind}; owner ${item.owner ?? "external"}${item.aliasOf ? `; alias of ${item.aliasOf}` : ""}; ${item.status}${item.propsType ? `; props: ${item.propsType}` : ""}`), "",
    h(2, "Props declared by this library"),
    "Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.", "",
    ...ownProps(component),
    h(2, "Dependencies and providers"), ...providerLines(component), "",
    h(2, "Curated API"), "Written descriptions; the list above is the type-resolved fact.", "",
    ...component.api.flatMap((part) => [h(3, part.name), part.description, ...(part.props ?? []).map((prop) => `- ${prop.name}: ${prop.type}${prop.default ? `; default ${prop.default}` : ""}. ${prop.description}`), ""]),
    h(2, "Keyboard"), ...component.keyboard.map((row) => `- ${row.keys}: ${row.description}`), "",
    h(2, examples === "first" ? "Source example" : "Source examples"),
    ...shown.flatMap((example) => [h(3, example.title), `Source: ${example.source}`, "```tsx", example.code.trim(), "```", ""]),
    ...(examples === "first" && component.examples.length > 1 ? [`${component.examples.length - 1} more examples: see the component page and its Markdown file.`, ""] : []),
  ].join("\n").trimEnd() + "\n";
}
