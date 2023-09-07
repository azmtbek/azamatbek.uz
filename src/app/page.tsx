"use client";
import Image from "next/image";
import Contact from "./contact-sea/Contact";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [isTame, setIsTime] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsTime(true);
      console.log("time");
    }, 0);
  });
  return (
    <>
      <main
        id="main"
        className={cn(
          "flex min-h-screen flex-col items-center justify-between p-24",
          "transition duration-1000 -translate-y-96 opacity-0",
          isTame && "opacity-100 translate-y-0",
        )}
      >
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <h1 className="text-6xl font-medium w-96 ">
            Welcome to <span className="text-[#009947]">Aza</span>land.
          </h1>
        </div>
        <Link href={"middle-earth"}>
          <div className="animate-pulse">scroll down</div>
        </Link>
      </main>

      <section
        id="contact"
        className="min-h-screen flex flex-col items-center justify-between p-24"
      >
        <a href="#middle">
          <div className="">scroll up</div>
        </a>
        <Contact />
      </section>
    </>
  );
}
