import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
// import { TopAlertBar } from "@/components/layout/TopAlertBar";
import { Navbar } from "@/components/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";

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
  title: "SwapSkill - Skill Exchange Platform",
  description: "Swap knowledge. Learn faster. Grow together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased flex flex-col min-h-screen bg-[var(--bg-base)] text-text-main`}
      >
        <AuthProvider>
          {/* <TopAlertBar /> */}
          <Navbar />
          <div className="flex-1 overflow-x-hidden">
            {children}
          </div>
          <Toaster
            position="top-center"
            toastOptions={{
              className: "bg-[#1a1a1a] text-white border border-white/10",
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
