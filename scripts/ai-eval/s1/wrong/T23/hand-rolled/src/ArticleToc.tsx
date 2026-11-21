export type ArticleTocProps = {
  headings: { id: string; title: string }[];
};

export function ArticleToc({ headings }: ArticleTocProps) {
  if (headings.length < 2) return null;
  return (
    <nav aria-label="本页目录">
      <ul>
        {headings.map(h => (
          <li key={h.id}><a href={`#${h.id}`}>{h.title}</a></li>
        ))}
      </ul>
    </nav>
  );
}
