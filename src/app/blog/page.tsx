"use client";
import Grid from "@/components/Grid";
import { cn } from "@/lib/utils";
import useHaveBeen from "@/store/useHaveBeen";
import { Grid2x2, List } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import ListGroup from "@/components/List";

function Self() {
  const [isTame, setIsTime] = useState(false);
  const [view, setView] = useState("grid");

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

  const onChangeView = (view: string) => {
    setView(view);
  };
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
      </div>
    </div>
  );
}

export default Self;
