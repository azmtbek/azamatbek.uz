"use client";

import Contact from "./contact-sea/Contact";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import usePrevPath from "@/store/usePrevPath";
import useHaveBeen, { isInPath } from "@/store/useHaveBeen";
import useElementsOnScreen from "@/hooks/useElementsOnScreen";
import { TimerReset } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export default function Home() {
  const [isTame, setIsTime] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsTime(true);
    }, 0);
  });

  const { paths, resetPaths, addPath, progress } = useHaveBeen();
  const { setPath } = usePrevPath();
  const onClickLink = () => {
    setPath("");
  };
  const onResetProgress = () => {
    resetPaths();
  };

  const [theRef, isVisible] = useElementsOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  }) as [theRef: React.RefObject<HTMLDivElement>, isVisible: boolean];

  useEffect(() => {
    if (!isInPath(paths, "/fake-contact") && isVisible) {
      addPath("/fake-contact");
    }
  }, [isVisible, addPath, paths]);
  return (
    <>
      <main
        id="main"
        className={cn(
          "flex min-h-screen flex-col items-center justify-between py-24",
          "transition duration-1000 -translate-y-96 opacity-0",
          isTame && "opacity-100 translate-y-0",
        )}
      >
        <div className="absolute top-0 overflow-hidden w-full min-h-screen -z-10">
          <div className="  w-full min-h-screen  origin-center rotate-45 hidden dark:block">
            {list.map((index) => (
              <div key={index} className="shooting_star">
              </div>
            ))}
          </div>
        </div>
        <h1 className="text-3xl md:text-6xl font-medium w-32 md:w-96 ">
          Welcome to <span className="text-[#009947]">Aza</span>land.
        </h1>
        {paths.length > 1 && (
          <div onClick={onResetProgress} className="fixed top-20 right-10">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <TimerReset />
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>reset progress</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        <div className="w-64 px-6">
          <p>Progress: {progress}%</p>
          <Progress value={progress} className="" />
        </div>
        <Link href={"middle-earth"} onClick={onClickLink}>
          <div className="animate-pulse">
            {isInPath(paths, "/fake-contact")
              ? "Go to Middle Earth"
              : "scroll down"}
          </div>
        </Link>
      </main>

      <section
        id="contact"
        className="min-h-screen flex flex-col items-center justify-between pt-24"
      >
        <a href="#main">
          <div className="">scroll up</div>
        </a>
        <Contact />
        <div ref={theRef}></div>
      </section>
    </>
  );
}
