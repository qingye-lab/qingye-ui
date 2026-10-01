import type { UILocale } from "../locale";

// Imported separately so Chinese applications do not ship the English messages.
export const enUS: UILocale = {
  code: "en-US",
  messages: {
    close: "Close", loading: "Loading", breadcrumb: "Breadcrumb", more: "More",
    pagination: "Pagination", previousPage: "Previous", nextPage: "Next", morePages: "More pages",
    sidebar: "Workspace navigation", sidebarDescription: "Main workspace navigation", toggleSidebar: "Toggle sidebar",
    showOptions: "Show options", clearSelection: "Clear selection", remove: "Remove",
    decrease: "Decrease", increase: "Increase", numberInput: "Number input",
    notifications: "Notifications", closeNotification: "Dismiss notification",
    selectDate: "Select date", clearDate: "Clear date", selectDateTime: (label) => `Select ${label} date and time`, time: "Time", done: "Done",
    showPassword: "Show password", hidePassword: "Hide password", clearSearch: "Clear search",
    copy: "Copy", copied: "Copied", copyError: "Copy failed. Please copy manually.",
    addFiles: "Add files", dropFiles: "Drop files here or choose local files", chooseFiles: "Choose files", removeFile: (name) => `Remove ${name}`,
    fileError: (name, reason) => `${name}: ${reason === "type" ? "File type is not supported" : reason === "size" ? "File is too large" : "File count limit exceeded"}`,
    table: "Data table", noResults: "No matching results", searchTable: "Search table", pageSummary: (page, pages, total) => `Page ${page} of ${pages}, ${total} items`,
    steps: "Steps", timeline: "Timeline", carousel: "Carousel", slide: "Slide", previousSlide: "Previous slide", nextSlide: "Next slide",
    clear: "Clear", cancel: "Cancel", confirm: "Confirm", apply: "Apply", reset: "Reset", back: "Back", search: "Search", expand: "Expand", collapse: "Collapse",
    theme: "Theme", lightTheme: "Light", darkTheme: "Dark", systemTheme: "System",
    selectPlaceholder: "Select…", searchPlaceholder: "Search…", commandPlaceholder: "Type a command or search…", addTag: "Add tag", tagInputHint: "Press Enter to add",
    selectDateRange: "Select date range", startDate: "Start date", endDate: "End date", today: "Today",
    rowsPerPage: "Rows per page", selectedCount: (count) => `${count} selected`, sortAscending: "Ascending", sortDescending: "Descending", toggleColumns: "Columns", firstPage: "First page", lastPage: "Last page", selectRow: "Select row", selectAllRows: "Select all rows",
    trendUp: "Up", trendDown: "Down", trendFlat: "Flat", resize: "Resize", copyCode: "Copy code", showMore: "Show more", showLess: "Show less",
  },
};
