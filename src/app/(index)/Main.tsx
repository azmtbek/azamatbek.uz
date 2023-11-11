"use client";
import React from "react";
import AdventureMode from "./AdventureMode";
import { SimpleMode } from "./SimpleMode";
import useMode from "@/store/useMode";
const Main = () => {
  const { mode } = useMode();

  return (
    <>
      {mode == "adventure" && <AdventureMode />}
      {mode == "simple" && <SimpleMode />}
    </>
  );
};

export default Main;
