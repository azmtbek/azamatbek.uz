import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname()
  return (
    <>
      <div className="fixed top-0 inset-x-1/3 w-max z-10">
        <div className="py-3" />
        <div className="flex gap-10 p-3 mx-3 justify-center w-full">
          <Link href="/">
            <Button variant={pathname == '/' ? "outline" : 'ghost'}  >
              <span className="text-lg">Home</span>
            </Button>
          </Link>
          <Button variant={pathname == '/projects' ? "outline" : 'ghost'} ><Link href="projects">
            <span className="text-lg">projects</span>
          </Link></Button>
          <Button variant={pathname == '/blog' ? "outline" : 'ghost'} ><Link href="blog">
            <span className="text-lg">blog</span>
          </Link></Button>
          <Button variant={pathname == '/contact' ? "outline" : 'ghost'} ><Link href="contact">
            <span className="text-lg">contact</span>
          </Link></Button>
        </div>
      </div>
      <div className="py-10"></div>
    </>
  );
};

export default Navbar;
