# Install @qingye/ui 1.0.0

Use this exact package version when the configured registry supplies it, or the corresponding release tarball. Check the project before installing.

Required peers: react ^19.2.0, react-dom ^19.2.0.

Optional peers: @tanstack/react-table ^8.21.3, recharts ^3.10.1; install only for relevant components.

Tailwind CSS 4: import @qingye/ui/styles.css after tailwindcss and scan the package source as documented in /docs/installation. Precompiled path: import @qingye/ui/ui.css once. Choose one path.

ThemeProvider is document scoped. Brand: html[data-brand]; appearance: .light/.dark by default or explicit data-theme mode; density: data-density. Check provider guidance and current types.

Examples retain state locally. Reload persistence, permissions, backend writes and cancellation are host responsibilities.
