import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pratyangi Fashions | Tradition Meets Elegance",
  description:
    "Discover heirloom Indian sarees, festive wear, and timeless occasion dressing at Pratyangi Fashions.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
