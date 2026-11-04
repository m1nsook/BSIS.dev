import type { ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle, Info, Lightbulb, ShieldAlert } from "lucide-react";
import { cn } from "@ariadocs/components";

const styles = {
  info: { icon: Info, className: "border-blue-500/30 bg-blue-500/5 [&_svg]:text-blue-500" },
  tip: { icon: Lightbulb, className: "border-emerald-500/30 bg-emerald-500/5 [&_svg]:text-emerald-500" },
  warning: { icon: AlertTriangle, className: "border-amber-500/30 bg-amber-500/5 [&_svg]:text-amber-500" },
  danger: { icon: ShieldAlert, className: "border-red-500/30 bg-red-500/5 [&_svg]:text-red-500" },
};

export function Callout({ type = "info", title, children }: {
  type?: keyof typeof styles;
  title?: string;
  children?: ReactNode;
}) {
  const { icon: Icon, className } = styles[type];
  return (
    <div className={cn("not-prose my-6 flex gap-3 rounded-lg border p-4 text-sm", className)}>
      <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <div className="min-w-0 space-y-1 text-muted-foreground [&_a]:underline [&_strong]:text-foreground">
        {title ? <p className="text-sm font-semibold text-foreground">{title}</p> : null}
        <div className="[&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}

export function Cards({ children }: { children?: ReactNode }) {
  return <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">{children}</div>;
}

export function Card({ title, href, children }: { title: string; href: string; children?: ReactNode }) {
  return (
    <Link href={href} className="block rounded-lg border border-border p-4 no-underline transition-colors hover:bg-muted/50">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      {children !== undefined ? <div className="mt-1 text-sm leading-6 text-muted-foreground">{children}</div> : null}
    </Link>
  );
}
