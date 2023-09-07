"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Contact from "./Contact";

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
      id="contact"
      className={cn(
        "flex min-h-screen flex-col items-center justify-between p-24",
        "transition duration-1000 translate-y-96 opacity-0",
        isTame && "opacity-100 translate-y-0",
      )}
    >
      <div className="flex flex-col items-center">
        <h1>GO TO</h1>
        <div className="flex justify-between w-96">
          <Link href="/project-mountains">
            <div className="animate-pulse">Project Mountains</div>
          </Link>
          <Link href="/middle-earth">
            <div className="animate-pulse">Middle Earth</div>
          </Link>
          <Link href="/self-swamps">
            <div className="animate-pulse">Self Swamps</div>
          </Link>
        </div>
      </div>
      <h1>Contact Sea</h1>
      <p>
        There Will Be <del>Blood</del> Sea Picture
      </p>
      <Contact />
    </section>
  );
};

export default MiddleEarth;
