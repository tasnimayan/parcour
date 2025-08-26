import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/components/contexts/auth-context";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";
import "leaflet/dist/leaflet.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Parcour - Logistics Management System",
  description: "Professional courier and parcel management system for logistics companies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.style.fontFamily} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
