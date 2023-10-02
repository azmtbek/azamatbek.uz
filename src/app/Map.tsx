"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Compass,
  Map,
  MountainSnow,
  Sparkles,
  Sprout,
  Trees,
  Waves,
} from "lucide-react";

import Link from "next/link";
import React, { useEffect } from "react";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import useHaveBeen, { isInPath } from "@/store/useHaveBeen";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const MapMenu = () => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const { paths } = useHaveBeen();
  const onClickLink = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link: string,
  ) => {
    if (isInPath(paths, link)) {
      setOpen(false);
    } else {
      e.preventDefault();
    }
  };

  useEffect(() => {
    console.log(paths);
  }, [paths]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(
          "fixed top-10 right-10 cursor-pointer z-10",
          pathname === "/thoughts-forest" && "absolute",
        )}
      >
        <Map className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>The Map</DialogTitle>
          <DialogDescription>
            Go to wherever you want
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-between gap-2">
          <Link href="/" onClick={() => setOpen(false)}>
            <div
              className={cn(
                "md:w-32 md:h-32 flex items-center justify-center opacity-100",
              )}
            >
              <Sparkles />
              Into the Beginning!
            </div>
          </Link>
          <div className="flex items-center justify-between gap-2">
            <Link
              href="/project-mountains"
              onClick={(e) => onClickLink(e, "/project-mountains")}
            >
              <div
                className={cn(
                  "md:w-32 md:h-32 flex items-center justify-center opacity-0 cursor-default",
                  isInPath(paths, "/project-mountains") &&
                    "opacity-100 cursor-pointer",
                )}
              >
                <MountainSnow />
                Projecty Mountains
              </div>
            </Link>
            <Link
              href="/middle-earth"
              onClick={(e) => onClickLink(e, "/middle-earth")}
            >
              <div
                className={cn(
                  "md:w-32 md:h-32 flex items-center justify-center opacity-0 cursor-default",
                  isInPath(paths, "/middle-earth") &&
                    "opacity-100 cursor-pointer",
                )}
              >
                <Sprout />
                Middle Earth
              </div>
            </Link>
            <Link
              href="/thoughts-forest"
              onClick={(e) => onClickLink(e, "/thoughts-forest")}
            >
              <div
                className={cn(
                  "md:w-32 md:h-32 flex items-center justify-center opacity-0 cursor-default",
                  isInPath(paths, "/thoughts-forest") &&
                    "opacity-100 cursor-pointer",
                )}
              >
                <Trees />
                Thoughts Forest
              </div>
            </Link>
          </div>
          <Link
            href="/contact-sea"
            onClick={(e) => onClickLink(e, "/contact-sea")}
          >
            <div
              className={cn(
                "md:w-32 md:h-32 flex items-center justify-center opacity-0 cursor-default",
                isInPath(paths, "/contact-sea") && "opacity-100 cursor-pointer",
              )}
            >
              <Waves />
              The Contact Sea
            </div>
          </Link>
        </div>
        <div className="w-full flex justify-between ">
          <Link
            href="/here"
            className="w-10 h-10"
            onClick={() => setOpen(false)}
          >
          </Link>
          <Link href="/why" onClick={() => setOpen(false)}>
            <Compass />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapMenu;
