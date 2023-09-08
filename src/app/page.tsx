"use client";
import Image from "next/image";
import Contact from "./contact-sea/Contact";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import usePrevPath from "@/store/usePrevPath";

export default function Home() {
  const [isTame, setIsTime] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsTime(true);
    }, 0);
  });

  const { setPath } = usePrevPath();
  const onClickLink = () => {
    setPath("");
  };
  return (
    <>
      <main
        id="main"
        className={cn(
          "flex min-h-screen flex-col items-center justify-between py-24",
          "transition duration-1000 -translate-y-96 opacity-0",
          isTame && "opacity-100 translate-y-0",
        )}
      >
        <h1 className="text-3xl md:text-6xl font-medium w-32 md:w-96 ">
          Welcome to <span className="text-[#009947]">Aza</span>land.
        </h1>

        <Link href={"middle-earth"} onClick={onClickLink}>
          <div className="animate-pulse">scroll down</div>
        </Link>
      </main>

      <section
        id="contact"
        className="min-h-screen flex flex-col items-center justify-between pt-24"
      >
        <a href="#main">
          <div className="">scroll up</div>
        </a>
        <Contact />
      </section>
    </>
  );
}
