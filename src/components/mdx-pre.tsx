"use client";

import { useRef, type ComponentProps } from "react";
import { CopyButton, tokenize } from "@ariadocs/components";
import { Code2, Terminal } from "lucide-react";
import { useTabbedCode } from "@/components/mdx-tabs";

type Props = ComponentProps<"pre"> & {
  raw?: string;
  "data-title"?: string;
  "data-language"?: string;
};

const LANGUAGE_LABELS: Record<string, string> = {
  powershell: "PowerShell",
  ps1: "PowerShell",
  bash: "Shell",
  sh: "Shell",
  shell: "Shell",
  cmd: "Command Prompt",
  json: "JSON",
  ts: "TypeScript",
  typescript: "TypeScript",
  js: "JavaScript",
  javascript: "JavaScript",
  rust: "Rust",
  rs: "Rust",
  text: "Plain text",
};

/**
 * Reusable visual treatment for every fenced MDX code example.
 * Prism-highlighted children are preserved; unsupported PowerShell fences get
 * a safe token-only shell fallback (no HTML injection).
 */
export function MdxPre({
  raw,
  children,
  className: _className,
  "data-title": title,
  "data-language": language = "",
  ...props
}: Props) {
  const preRef = useRef<HTMLPreElement>(null);
  const tabbed = useTabbedCode();
  const label = LANGUAGE_LABELS[language] ?? (language || "Code");
  const command = language === "powershell" || language === "ps1" || language === "pwsh";
  const code = raw ?? "";

  const body = command && raw ? (
    <code className="font-mono">
      {tokenize(code, "bash").map((token, i) =>
        token.type ? (
          <span key={i} className={"token " + token.type}>{token.value}</span>
        ) : token.value,
      )}
    </code>
  ) : children;

  return (
    <figure data-slot="bsis-code" className={
      "not-prose relative my-6 min-w-0 overflow-hidden rounded-xl border border-border bg-[var(--aria-code-background)] " +
      (tabbed ? "!my-0 !rounded-none !border-0" : "")
    }>
      {!tabbed ? (
        <figcaption className="flex min-h-11 items-center gap-2 border-b border-border px-3 py-2 sm:px-4">
          {command ? (
            <Terminal aria-hidden="true" className="size-4 shrink-0 text-sky-500" />
          ) : (
            <Code2 aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
          )}
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
            {title || label}
          </span>
          {title ? (
            <span className="hidden shrink-0 font-mono text-[11px] text-muted-foreground sm:inline">
              {label}
            </span>
          ) : null}
          <CopyButton
            value={() => raw ?? preRef.current?.innerText ?? ""}
            className="shrink-0 rounded-md border border-border bg-background/60"
          />
        </figcaption>
      ) : (
        <div className="absolute right-2 top-2 z-10">
          <CopyButton
            value={() => raw ?? preRef.current?.innerText ?? ""}
            className="rounded-md border border-border bg-background/90 shadow-sm backdrop-blur"
          />
        </div>
      )}
      <pre
        ref={preRef}
        {...props}
        className="m-0 max-h-[32rem] min-w-0 overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words [overflow-wrap:anywhere] bg-transparent px-4 py-4 pr-12 font-mono text-[13px] leading-[1.7] text-foreground [tab-size:2]"
      >
        {body}
      </pre>
    </figure>
  );
}
