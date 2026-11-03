import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@ariadocs/components/styles.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: { default: "BSIS Documentation", template: "%s | BSIS Documentation" },
  description: "Guides and API reference for BSIS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        <SiteHeader />
        <div className="min-w-0 flex-1">{children}</div>
      </body>
    </html>
  );
}
