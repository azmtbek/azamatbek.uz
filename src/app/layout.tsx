import { cn } from "@/lib/utils";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/themes-provider";
import { ThemeButton } from "./theme-button";
import { Toaster } from "@/components/ui/toaster";
import Mode from "./mode-switcher";
import useMode from "@/store/useMode";
import { Metadata } from "next";
import MovingPoint from './moving-point';

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Azamatbek",
  description: "Azamatbek's portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "relative m-0 p-0")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MovingPoint >
            <ThemeButton />
            <Mode />
            {children}
            <Toaster />
          </MovingPoint>
        </ThemeProvider>
      </body>
    </html>
  );
}
