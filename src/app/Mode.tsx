"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const OPTIONS = ["adventure", "simple"];

const Mode = () => {
  const [mode, setMode] = useState(0);
  const toggleMode = () => {
    setMode((prev) => (prev + 1) % 2);
  };
  return (
    <Button
      variant="ghost"
      className="fixed top-9 left-20 z-10"
      onClick={() => toggleMode()}
    >
      {OPTIONS[mode] === "simple" && "Simple Mode"}
      {OPTIONS[mode] === "adventure" && "Adventure Mode"}
    </Button>
  );
};

export default Mode;
