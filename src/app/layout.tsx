import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
// import { TopAlertBar } from "@/components/layout/TopAlertBar";
import { Navbar } from "@/components/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";

import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
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
        className={`${inter.variable} ${playfair.variable} font-sans antialiased flex flex-col min-h-screen`}
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
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
              }
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
