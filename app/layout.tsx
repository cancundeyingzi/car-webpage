import { homeMetadata } from "@/content/home";
import { sitePath } from "@/lib/site-path";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./liquid-glass.css";
import { SiteShell } from "@/components/site-shell";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f5f6fa"
};
export const metadata: Metadata = {
  ...homeMetadata,
  icons: {
    icon: sitePath("/favicon.svg"),
    shortcut: sitePath("/favicon.svg")
  }
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="zh-CN">
    <body className="antialiased">
      <SiteShell>{children}</SiteShell>
    </body>
  </html>;
}
