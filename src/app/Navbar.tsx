import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="fixed top-0 inset-x-1/3 w-max z-10">
      <div className="py-3" />
      <div className="flex gap-10 p-3 mx-3 justify-center w-full">
        <Button variant="outline" >
          <Link href="/">Home</Link>
        </Button>
        <Button variant="ghost" ><Link href="projects">
          Projects
        </Link></Button>
        <Button variant="ghost" ><Link href="blog">
          Thoughts
        </Link></Button>
        <Button variant="ghost" ><Link href="contact">
          Find me in
        </Link></Button>
      </div>
    </div>
  );
};

export default Navbar;
