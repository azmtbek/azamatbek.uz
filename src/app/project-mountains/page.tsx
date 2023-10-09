"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        "flex min-h-screen flex-col items-center justify-start py-12 my-0",
        "transition duration-1000 -translate-x-full opacity-0",
        isTame && "opacity-100 translate-x-0",
      )}
    >
      {theme == "dark" && (
        <>
          <div className="moon top-20 right-10 -z-20"></div>
          <div className="moon2 top-24 right-16 -z-10"></div>
          <div className="moon3 top-32 right-16 -z-10"></div>
          <div className="moon4 top-24 right-20 -z-10"></div>
        </>
      )}
      <h1 className="text-2xl">Here shall be Projects</h1>
      <div>options</div>
      <div className="flex flex-wrap items-start w-full h-full my-10 px-24 ">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Projects;
