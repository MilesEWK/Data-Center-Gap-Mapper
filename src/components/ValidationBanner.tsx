interface Props {
  violations: string[];
}

export function ValidationBanner({ violations }: Props) {
  if (violations.length === 0) return null;
  return (
    <div className="validation-banner" role="alert">
      <h2>Data validation failed: {violations.length} {violations.length === 1 ? "problem" : "problems"}</h2>
      <p>The data has not been altered. Fix these in the source files:</p>
      <ul>
        {violations.map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul>
    </div>
  );
}
