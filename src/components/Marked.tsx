/**
 * Renders a data string exactly as written, wrapping each literal "UNKNOWN" in a span so it
 * can be set in the audit colour. The text itself is never altered.
 */
export function Marked({ text }: { text: string }) {
  const parts = text.split(/(UNKNOWN)/);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) =>
        part === "UNKNOWN" ? (
          <span key={i} className="unknown">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
