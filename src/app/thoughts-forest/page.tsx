"use client";
import { cn } from "@/lib/utils";
import useHaveBeen from "@/store/useHaveBeen";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

function Self() {
  const [isTame, setIsTime] = useState(false);
  const { theme } = useTheme();

  const { addPath } = useHaveBeen();
  useEffect(() => {
    addPath("/thoughts-forest");
  }, [addPath]);

  useEffect(() => {
    setTimeout(() => {
      setIsTime(true);
    }, 0);
  });
  return (
    <div className="w-full overflow-hidden">
      <div
        className={cn(
          "flex min-h-screen flex-col items-center justify-between py-12 mx-0",
          "transition duration-1000 translate-x-full opacity-0",
          isTame && "opacity-100 translate-x-0",
        )}
      >
        {theme == "light" && <div className="sun top-20 left-10 -z-10"></div>}
        <h1>Here shall be Posts</h1>
      </div>
    </div>
  );
}

export default Self;
