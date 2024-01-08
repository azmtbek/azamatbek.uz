import useTimerCount from "@/hooks/useTimerCount";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";

export const SimpleMode = () => {
  const isTime = useTimerCount()
  return (
    <>
      <div className={cn("flex min-h-screen flex-col items-center justify-between py-10",
        "transition duration-1000 opacity-0",
        isTime && "opacity-100",)}>
        <div className="flex">
          WIP: Work In Proggress
        </div>
      </div>
    </>
  );
};
