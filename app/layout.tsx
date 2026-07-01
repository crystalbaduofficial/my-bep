import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SpaceBackground } from "@/components/SpaceBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: "Backflow Exam Prep — Professional Training & Certification",
  description: "Master backflow prevention systems with guided lessons, practice exams, simulator training, and certification tools. Built for students, instructors, and organizations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark-1 text-white overflow-x-hidden">
        <SpaceBackground />
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
