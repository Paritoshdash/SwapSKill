import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
// import { TopAlertBar } from "@/components/layout/TopAlertBar";
import { Navbar } from "@/components/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";

import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | SwapSkill",
    default: "SwapSkill - The Global Skill Exchange Platform",
  },
  description: "Swap knowledge. Learn faster. Grow together. Trade your skills with experts worldwide without spending money.",
  keywords: ["skill exchange", "mentorship", "barter skills", "learn online", "SwapSkill", "peer-to-peer learning"],
  openGraph: {
    title: "SwapSkill - Skill Exchange Platform",
    description: "Swap knowledge. Learn faster. Grow together. Trade your skills with experts worldwide.",
    url: "https://swapskill.com",
    siteName: "SwapSkill",
    images: [
      {
        url: "https://swapskill.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "SwapSkill Preview",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SwapSkill - The Global Skill Exchange Platform",
    description: "Trade your skills with experts worldwide without spending money.",
    images: ["https://swapskill.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased flex flex-col min-h-screen bg-[var(--bg-base)] text-text-main`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* <TopAlertBar /> */}
            <Navbar />
            <div className="flex-1 overflow-x-hidden">
              {children}
            </div>
          </ThemeProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              className: "bg-card text-foreground border border-divider",
              style: {
                background: 'var(--bg-card)',
                color: 'var(--text-main)',
                border: '1px solid var(--divider)',
              }
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
