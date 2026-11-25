import { useState } from "react";

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for non-secure contexts (file://, plain http on a LAN address).
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<"idle" | "ok" | "fail">("idle");
  const copy = async () => {
    setState((await copyText(text)) ? "ok" : "fail");
    window.setTimeout(() => setState("idle"), 2500);
  };
  return (
    <span className="copy">
      <button type="button" className="btn btn-secondary btn-small" onClick={() => void copy()}>
        {label}
      </button>
      <span className="copy-status" role="status">
        {state === "ok" ? "Copied." : state === "fail" ? "Copy failed. Select the text instead." : ""}
      </span>
    </span>
  );
}
