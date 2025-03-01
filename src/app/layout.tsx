import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthContextProvider, ThemeContextProvider } from "@/hooks";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DJ Tip ME",
  description:
    "DJs can accept song requests and tips from the audience in real-time. Request your favorite song and boost its priority with a tip!",
};

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthContextProvider>
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
