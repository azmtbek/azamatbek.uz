import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="fixed top-0 inset-x-1/3 w-max z-10">
      <div className="flex gap-10 p-3 mx-3 justify-center w-full">
        <Link href="/">Home</Link>
        <Link href="projects">
          Projects
        </Link>
        <Link href="blog">
          Thoughts
        </Link>
        <Link href="contact">
          Find me in
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
