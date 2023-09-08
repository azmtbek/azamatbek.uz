"use client";

import { cn } from "@/lib/utils";
import usePrevPath from "@/store/usePrevPath";
import { MountainSnow, Sprout, Trees, Waves } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MiddleEarth = () => {
  const [isTame, setIsTime] = useState(false);
  const { path } = usePrevPath();

  useEffect(() => {
    setTimeout(() => {
      setIsTime(true);
      console.log(path);
    }, 0);
  });

  return (
    <section
      id="middle"
      className={cn(
        "flex min-h-screen flex-col items-center justify-between p-24",
        "transition duration-1000 opacity-0",
        path === "contact-sea" ? "-translate-y-full" : " translate-y-full",
        isTame && "opacity-100 translate-y-0",
      )}
    >
      <Link href="/">
        <div className="animate-pulse">go to The Beginning</div>
      </Link>
      <h1>
        <Sprout /> Middle Earth
      </h1>
      <div className="flex justify-between items-center w-full">
        <Link href="/project-mountains">
          <div className="animate-pulse">
            <MountainSnow />
            Projecty Mountains
          </div>
        </Link>
        <Link href="/thoughts-forest">
          <Trees />
          <div className="animate-pulse">Thoughts Forest</div>
        </Link>
      </div>
      <Link href="/contact-sea">
        <Waves />
        <div className="animate-pulse">the Contact Sea</div>
      </Link>
    </section>
  );
};

export default MiddleEarth;
