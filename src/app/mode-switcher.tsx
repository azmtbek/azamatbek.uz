"use client";
import { Button } from "@/components/ui/button";
import useMode from "@/store/useMode";
import React, { useState } from "react";
import MapMenu from "./map";
import Navbar from "./Navbar";
import useTimerCount from "@/hooks/useTimerCount";

const OPTIONS = ["adventure", "simple"];

const Mode = () => {
  const { mode, setMode } = useMode();
  const toggleMode = () => {
    setMode((mode == OPTIONS[0]) ? OPTIONS[1] : OPTIONS[0]);
  };

  return (
    <>
      {mode == "adventure" && <MapMenu />}
      {mode == "simple" && <Navbar />}
      <Button
        variant="outline"
        className="fixed top-9 left-20 z-10"
        onClick={() => toggleMode()}
      >
        {mode === "simple" && "Simple Mode"}
        {mode === "adventure" && "Adventure Mode"}
      </Button>
    </>
  );
};

export default Mode;
