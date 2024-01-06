"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import usePrevPath from "@/store/usePrevPath";
import useHaveBeen from "@/store/useHaveBeen";
import useMode from "@/store/useMode";
import useTimerCount from "@/hooks/useTimerCount";

const ContactSea = () => {
  const isTime = useTimerCount()
  const { addPath } = useHaveBeen();
  const { mode } = useMode();
  useEffect(() => {
    addPath("/contact-sea");
  }, [addPath]);
  const { setPath } = usePrevPath();
  const onClickLink = () => {
    setPath("contact-sea");
  };
  return (
    <section
      id="contact"
      className={cn(
        "flex min-h-screen flex-col items-center justify-between py-12 my-0",
        "transition duration-1000 opacity-0",
        isTime && "opacity-100",
      )}
    >
      {mode == "adventure" && (
        <div className="flex flex-col items-center w-screen">
          <div className="flex w-full items-center justify-center">
            <Link href="/middle-earth" onClick={onClickLink}>
              <div className="animate-pulse">Middle Earth</div>
            </Link>
          </div>
          <div className="flex justify-around w-full">
            <Link href="/project-mountains">
              <div className="animate-pulse">Project Mountains</div>
            </Link>

            <Link href="/thoughts-forest">
              <div className="animate-pulse">Thoughts Forest</div>
            </Link>
          </div>
        </div>
      )}
      <h1>Contact Sea</h1>
      <p>
        There Will Be <del>Blood</del> Sea Picture
      </p>
      <Contact />
    </section>
  );
};

export default ContactSea;
