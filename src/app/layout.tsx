import "./globals.css";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://avbsoftware.com"),
  title: "AVB Software — Premium Digital Studio in Bhopal",
  description: "Crafting digital excellence for ambitious brands. Web, mobile, and custom software solutions.",
  icons: {
    icon: "/favicon.png?v=20",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="bg-cream antialiased">
        {children}
      </body>
    </html>
  );
}