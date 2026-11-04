import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@ariadocs/components/styles.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { DocsSearchProvider } from "@/components/docs-search";
import { ThemeSync } from "@/components/theme-controls";
import { getDocsSearchEntries } from "@/lib/docs-search-index";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: { default: "BSIS Documentation", template: "%s | BSIS Documentation" },
  description: "Guides, command-line reference and design notes for the Better NSIS installer framework.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const entries = await getDocsSearchEntries();
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable + " " + jetbrainsMono.variable + " antialiased"}>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        <ThemeSync />
        <DocsSearchProvider entries={entries}>
          <SiteHeader />
          <div className="min-w-0 flex-1">{children}</div>
        </DocsSearchProvider>
      </body>
    </html>
  );
}
