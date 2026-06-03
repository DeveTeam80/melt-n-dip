import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});



export const metadata: Metadata = {
  title: "Premium Dessert Catering in Chicago | Delight Enterprises LLC",
  description:
    "Elevating events across Chicagoland with premium Belgian chocolate, live crepe stations, artisan gelato carts, and Halal custom sweet platters.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="antialiased selection:bg-teal-900 selection:text-white">
        {/* We wrap everything in ClientLayout to provide smooth scroll and global UI */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
