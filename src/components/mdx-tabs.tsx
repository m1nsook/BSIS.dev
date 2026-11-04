"use client";

import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { CodeTabs } from "@ariadocs/components";

const TabbedCodeContext = createContext(false);

export function useTabbedCode() {
  return useContext(TabbedCodeContext);
}

/** Named panel used inside the developer documentation's example tabs. */
export function Tab({ children }: { value: string; children?: ReactNode }) {
  return <>{children}</>;
}

/** Compact tab bar above each sample, with the active sample's copy button. */
export function Tabs({ items, children }: { items: string[]; children?: ReactNode }) {
  const [value, setValue] = useState(items[0] ?? "");
  const panels = Children.toArray(children).filter(
    (child): child is ReactElement<{ value: string; children?: ReactNode }> => isValidElement(child),
  );
  const selected = panels.find((panel) => panel.props.value === value) ?? panels[0];

  return (
    <div className="not-prose my-6 min-w-0 overflow-hidden rounded-xl border border-border bg-[var(--aria-code-background)]">
      <div className="flex h-10 items-center border-b border-border pl-1">
        <CodeTabs
          label="Code examples"
          value={value}
          options={items.map((item) => ({ value: item, label: item }))}
          onChange={setValue}
        />
      </div>
      <div role="tabpanel" aria-label={value} className="min-w-0">
        <TabbedCodeContext.Provider value>
          {selected?.props.children}
        </TabbedCodeContext.Provider>
      </div>
    </div>
  );
}
