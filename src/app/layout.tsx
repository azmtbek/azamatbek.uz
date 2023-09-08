import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MapMenu from "./Map";
import { ThemeProvider } from "@/components/themes-provider";
import { ThemeButton } from "./ThemeButton";

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
          <ThemeButton/>
          <MapMenu />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
