"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Compass, Map } from "lucide-react";
import Link from "next/link";
import React from "react";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const MapMenu = () => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  console.log(pathname);
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
          <Link href="/">
            <div className="md:w-32 md:h-32" onClick={() => setOpen(false)}>
              Into the Beginning
            </div>
          </Link>
          <div className="flex items-center justify-between gap-2">
            <Link href="/project-mountains" onClick={() => setOpen(false)}>
              <div className="md:w-32 md:h-32">Projecty Mountains</div>
            </Link>
            <Link href="/middle-earth" onClick={() => setOpen(false)}>
              <div className="md:w-32 md:h-32">Middle Earth</div>
            </Link>
            <Link href="/thoughts-forest" onClick={() => setOpen(false)}>
              <div className="md:w-32 md:h-32">Thoughts Forest</div>
            </Link>
          </div>
          <Link href="/contact-sea" onClick={() => setOpen(false)}>
            <div className="md:w-32 md:h-32">The Contact Sea</div>
          </Link>
        </div>
        <div className="w-full flex justify-end ">
          <Link href="/why" onClick={() => setOpen(false)}>
            <Compass />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapMenu;
