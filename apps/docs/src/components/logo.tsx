import { cn } from "@qingye_lab/ui/utils";

/**
 * The mark (应物象形, design.md): a square carries the work, a dot marks the point.
 * Stroke 2 on the 20-unit grid; the three closed corners ease at r3 outside and r1
 * inside, concentric. The square opens toward its lower-right corner, where the dot
 * sits 1 分 (4 units) clear of both arm ends.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={cn("size-5", className)} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 19H4A3 3 0 0 1 1 16V4A3 3 0 0 1 4 1H16A3 3 0 0 1 19 4V9H17V4A1 1 0 0 0 16 3H4A1 1 0 0 0 3 4V16A1 1 0 0 0 4 17H9Z" />
      <circle cx="16" cy="16" r="3" />
    </svg>
  );
}

export function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}
