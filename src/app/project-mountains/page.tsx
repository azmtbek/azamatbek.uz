"use client";
import { cn } from "@/lib/utils";
import useHaveBeen from "@/store/useHaveBeen";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const Projects = () => {
  const [isTame, setIsTime] = useState(false);
  const { addPath } = useHaveBeen();
  const { theme } = useTheme();
  useEffect(() => {
    addPath("/project-mountains");
  }, [addPath]);
  useEffect(() => {
    setTimeout(() => {
      setIsTime(true);
    }, 0);
  });
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-between py-12 my-0",
        "transition duration-1000 -translate-x-full opacity-0",
        isTame && "opacity-100 translate-x-0",
      )}
    >
      {theme == "dark" && <div className="moon top-20 right-10 -z-10"></div>}
      <h1>Here shall be Projects</h1>
    </div>
  );
};

export default Projects;
