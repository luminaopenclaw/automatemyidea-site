import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Automatemyidea.ai | AI Automation for SMB Growth",
  description:
    "Automatemyidea.ai designs and deploys practical AI automations for sales, operations, and support teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
