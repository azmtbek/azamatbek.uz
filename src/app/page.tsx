"use client";
import AdventureMode from "./AdventureMode";
import { SimpleMode } from "./SimpleMode";
import useMode from "@/store/useMode";

export default function Home() {
  const { mode } = useMode();
  return (
    <>
      {mode == "adventure" && <AdventureMode />}
      {mode == "simple" && <SimpleMode />}
    </>
  );
}
