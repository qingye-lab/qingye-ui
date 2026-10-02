export type Status = 'PASS' | 'FAIL' | 'UNVERIFIED' | 'NOT_RUN';
export type Theme = { schemaVersion: 1; brand: string; common: Record<string,string>; light: Record<string,string>; dark: Record<string,string>; compact: Record<string,string> };
export type ProjectConfig = {
  schemaVersion: 1; package: '@qingye/ui'; publicEntry: string; styleEntry: string;
  theme: { source: string; generated: string; mode: 'class' | 'data-theme'; legacyCss?: string[] };
  scan: string[]; compositions: string[]; tokenSources: string[]; adapters: string[];
  diagnostics: { preset: 'recommended' | 'personal' | 'legacy'; mode: 'report' | 'gate'; exceptions?: string; baseline?: string; report: string };
  ledger?: string; ledgerRoot?: string;
};
export type Catalog = { schemaVersion?: number; version: string; components: any[]; patterns?: any[]; [key: string]: unknown };
export type Project = { root: string; configPath: string; config: ProjectConfig; packageRoot: string; packageJson: any; catalog: Catalog; configFingerprint: string };
export type Diagnostic = { id: string; rule: string; ruleVersion: 1; status: Status; certainty: 'certain' | 'unknown'; severity: 'error' | 'warning' | 'info'; file: string; line: number; evidence: string; decision: string; layer: 'L' | 'P' | 'A' | 'T'; safeAutofix: false; limitation: string; disposition?: 'baseline' | 'exception'; reason?: string };
export class ToolError extends Error { constructor(message: string, public code = 'EXECUTION_FAILURE') { super(message); this.name = 'ToolError'; } }
