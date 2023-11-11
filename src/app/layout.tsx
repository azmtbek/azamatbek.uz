"use client";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/themes-provider";
import { ThemeButton } from "./ThemeButton";
import { Toaster } from "@/components/ui/toaster";
import Mode from "./Mode";
import Navbar from "./Navbar";
import MapMenu from "./Map";
import useMode from "@/store/useMode";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useMode();
  return (
    <html lang="en">
      <body className={cn(inter.className, "relative m-0 p-0")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeButton />
          {mode == "adventure" && <MapMenu />}
          {mode == "simple" && <Navbar />}
          <Mode />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
