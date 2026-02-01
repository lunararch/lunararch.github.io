import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { FileProvider } from "@/context/FileContext";

export const metadata: Metadata = {
  title: "Tim Hofman | Full-Stack Developer Portfolio",
  description: "Portfolio of Tim Hofman - Full-Stack Developer specializing in Java, .NET, and modern web technologies",
  keywords: ["web developer", "full-stack developer", "portfolio", "Tim Hofman", "React", "Java", "TypeScript"],
  authors: [{ name: "Tim Hofman" }],
  openGraph: {
    title: "Tim Hofman | Full-Stack Developer Portfolio",
    description: "Portfolio of Tim Hofman - Full-Stack Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <FileProvider>
            {children}
          </FileProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
