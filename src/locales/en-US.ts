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
  },
};
