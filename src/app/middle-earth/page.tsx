"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MiddleEarth = () => {
  const [isTame, setIsTime] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsTime(true);
      console.log("time");
    }, 0);
  });
  return (
    <section
      id="middle"
      className={cn(
        "flex min-h-screen flex-col items-center justify-between p-24",
        "transition duration-1000 translate-y-96 opacity-0",
        isTame && "opacity-100 translate-y-0",
      )}
    >
      <Link href="/">
        <div className="animate-pulse">go to The Beginning</div>
      </Link>
      <h1>Middle Earth</h1>
      <div className="flex justify-between items-center w-full">
        <div>left</div>
        <div>right</div>
      </div>
      <Link href="/contact-sea">
        <div className="animate-pulse">go to Contact Sea</div>
      </Link>
    </section>
  );
};

export default MiddleEarth;
