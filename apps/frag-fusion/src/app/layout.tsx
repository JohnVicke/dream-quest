import "@ff/ui/globals.css";

import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { cn, Toaster } from "@ff/ui";

import { siteConfig } from "~/config";
import { ThemeProvider } from "~/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const calSans = LocalFont({
  src: "../styles/calsans.ttf",
  variable: "--font-cal",
});

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [{ url: "/opengraph-image.png" }],
  },
};

export default function RootLayout({
  children,
  modal,
}: React.PropsWithChildren<{ modal?: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            calSans.variable,
            inter.variable,
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {modal}
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
