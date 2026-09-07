import type { Metadata } from "next";
import { Toaster } from "sonner";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "ThinkSpend",
  description: "AI-powered app to track your expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background flex">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex-1 min-h-screen mx-auto">
            {children}
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}