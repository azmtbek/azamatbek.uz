"use client";

import * as React from "react";
import { MonitorSpeaker, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const OPTIONS = ["system", "dark", "light"];

export function ThemeButton() {
  const { setTheme } = useTheme();
  const [themeId, setThemeId] = React.useState(0);
  const toggleTheme = () => {
    setThemeId((prev) => (prev + 1) % 3);
  };
  React.useEffect(() => {
    setTheme(OPTIONS[themeId]);
  }, [themeId, setTheme]);

  return (
    <>
      <div className="fixed top-9 left-9 z-10">
        <Button
          variant="ghost"
          size="icon"
          className=""
          onClick={() => toggleTheme()}
        >
          {OPTIONS[themeId] === "light" && (
            <Sun className="absolute h-[1.2rem] w-[1.2rem]  " />
          )}
          {OPTIONS[themeId] === "dark" && (
            <Moon className="absolute h-[1.2rem] w-[1.2rem] " />
          )}
          {OPTIONS[themeId] === "system" && (
            <MonitorSpeaker className="absolute h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </div>
    </>
  );
}
