import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Backflow Exam Prep",
  description: "Master backflow systems. Get certified.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark-1 text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
