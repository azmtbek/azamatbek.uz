"use client";
import { cn } from "@/lib/utils";
import useHaveBeen from "@/store/useHaveBeen";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import Moon from "./Moon";
import { Grid2x2, List } from "lucide-react";
import Grid from "./Grid";
import ListGroup from "./List";
import Mountains from "./Mountains";
import useTimerCount from "@/hooks/useTimerCount";

const Projects = () => {
  const isTime = useTimerCount();
  const [view, setView] = useState("grid");
  const [theme, setTheme] = useState<string | undefined>("");
  const { addPath } = useHaveBeen();
  const { theme: myTheme } = useTheme();
  useEffect(() => {
    addPath("/project-mountains");
  }, [addPath]);
  useEffect(() => {
    setTheme(myTheme);
  }, [myTheme]);

  const onChangeView = (view: string) => {
    setView(view);
  };

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-start py-32",
        "transition duration-1000  opacity-0",
        isTime && "opacity-100",
      )}
    >
      {theme == "dark" && <Moon />}
      <h1 className="text-2xl">Here shall be Projects</h1>
      <div className="flex w-full mt-24">
        <div className="flex py-2 border rounded-xl px-3 gap-3 justify-end  w-full mx-24">
          <button
            onClick={() => onChangeView("grid")}
            className={view !== "grid"
              ? "dark:text-slate-600 text-slate-400"
              : ""}
          >
            <Grid2x2 />
          </button>
          <button
            onClick={() => onChangeView("list")}
            className={view !== "list"
              ? "dark:text-slate-600 text-slate-400"
              : ""}
          >
            <List />
          </button>
        </div>
      </div>
      <div className="flex w-full h-full my-10  px-24">
        {(view === "grid") && <Grid />}
        {(view === "list") && <ListGroup />}
      </div>
      <Mountains />
    </div>
  );
};

export default Projects;
