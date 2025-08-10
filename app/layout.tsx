import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "RoadGuard - Professional Roadside Assistance",
  description: "Get fast, reliable roadside assistance 24/7. Professional mechanics ready to help with flat tires, dead batteries, towing, and more.",
  keywords: "roadside assistance, towing, flat tire, dead battery, car lockout, emergency car service",
    generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}
