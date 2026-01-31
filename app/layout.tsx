import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";
import {AuthProvider} from "@/components/providers/AuthProvider";
import {Toaster} from "sonner";

export const metadata: Metadata = {
  title: "Nahian - Portfolio",
  description: "Software-developer",
};

export default function RootLayout({children}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
          <AuthProvider>
              {children}

              {/* ✅ REQUIRED for toast */}
              <Toaster position="top-right" richColors />
          </AuthProvider>
      </ThemeProvider>
      </body>
      </html>
  );
}
