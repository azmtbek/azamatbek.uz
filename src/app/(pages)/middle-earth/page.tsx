"use client";

import useTimerCount from "@/hooks/useTimerCount";
import { cn } from "@/lib/utils";
import useHaveBeen from "@/store/useHaveBeen";
import usePrevPath from "@/store/usePrevPath";
import { MountainSnow, Sparkles, Sprout, Trees, Waves } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MiddleEarth = () => {
  const isTime = useTimerCount()

  const { addPath } = useHaveBeen();
  useEffect(() => {
    addPath("/middle-earth");
  }, [addPath]);



  return (
    <section
      id="middle"
      className={cn(
        "flex min-h-screen flex-col items-center justify-between p-24",
        "transition duration-1000 opacity-0",
        isTime && "opacity-100",
      )}
    >
      <Link href="/">
        <div className="animate-pulse">
          <Sparkles /> The Beginning
        </div>
      </Link>
      <h1>
        <Sprout /> Middle Earth
      </h1>
      <div className="flex justify-between items-center w-full">
        <Link href="/projects">
          <div className="animate-pulse">
            <MountainSnow />
            Projecty Mountains
          </div>
        </Link>
        <Link href="/blog">
          <Trees />
          <div className="animate-pulse">Thoughts Forest</div>
        </Link>
      </div>
      <Link href="/contact">
        <Waves />
        <div className="animate-pulse">the Contact Sea</div>
      </Link>
    </section>
  );
};

export default MiddleEarth;
