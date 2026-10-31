declare module "virtual:component-summaries" {
  const summaries: readonly Record<string, unknown>[];
  export default summaries;
}

declare module "virtual:design-principles" {
  const principles: Readonly<Record<"zh" | "en", readonly { name: string; aside?: string; source: string; meaning: string }[]>>;
  export default principles;
}
