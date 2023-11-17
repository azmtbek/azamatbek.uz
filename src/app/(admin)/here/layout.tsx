import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Azamatbek Admin",
  description: "Admin page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("flex flex-col min-h-screen items-center justify-center")}
    >
      <div className="pb-24">
        <Link href="/here">Admin main</Link>
      </div>
      {children}
    </div>
  );
}
