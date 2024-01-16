export const withClassAddedToMatchingSections = (
  text: string | null,
  search: string | null,
  className: string,
): React.ReactNode => {
  if (!text || !search || search.length < 1) return text;

  const regex = new RegExp(`(${search})`, 'gi'); // Capturing group to include the matched search term in the parts.
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className={className}>
        {part}
      </span>
    ) : (
      part
    ),
  );
};
