import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/other-component/app-sidebar";
import Navbar from "@/components/other-component/navbar";
import { ThemeProvider } from "@/components/other-component/themes-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "@/hooks/providers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Money Tracker",
  description: "Track your money today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" richColors />
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <main className="w-full flex flex-col min-h-screen ">
                <Navbar />
                <div className="flex-1 px-4">
                  {children}
                </div>

                <footer className="border-t mt-auto">
                  <div className="px-4 py-6 md:py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                      <div className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Money Tracker. All rights reserved.
                      </div>
                      <div className="flex gap-6 text-sm">
                        <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                          Privacy Policy
                        </a>
                        <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                          Terms of Service
                        </a>
                        <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                          Contact
                        </a>
                      </div>
                    </div>
                  </div>
                </footer>
              </main>
            </SidebarProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}