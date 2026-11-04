"use client";

import { Children, isValidElement, useState, type ReactElement, type ReactNode } from "react";
import { CodeTabs } from "@ariadocs/components";

/** Named panel used inside the developer documentation's example tabs. */
export function Tab({ children }: { value: string; children?: ReactNode }) {
  return <>{children}</>;
}

/** AriaDocs-style interactive tabs; each fenced code sample retains its own copy button. */
export function Tabs({ items, children }: { items: string[]; children?: ReactNode }) {
  const [value, setValue] = useState(items[0] ?? "");
  const panels = Children.toArray(children).filter(
    (child): child is ReactElement<{ value: string; children?: ReactNode }> => isValidElement(child),
  );
  const selected = panels.find((panel) => panel.props.value === value) ?? panels[0];

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-border bg-[var(--aria-code-background)] [&_[data-slot=pre]_pre]:m-0 [&_[data-slot=pre]_pre]:rounded-none [&_[data-slot=pre]_pre]:border-0 [&_[data-slot=pre]_pre]:p-4 [&_.rehype-code-title]:hidden">
      <div className="flex h-10 items-center border-b border-border pl-1">
        <CodeTabs label="Code examples" value={value}
          options={items.map((item) => ({ value: item, label: item }))}
          onChange={setValue} />
      </div>
      <div role="tabpanel" aria-label={value} className="min-w-0 [&_pre]:max-h-[32rem] [&_pre]:overflow-x-auto">
        {selected?.props.children}
      </div>
    </div>
  );
}
