import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="fixed top-0 inset-x-1/3 w-max z-10 hidden">
      <div className="flex gap-10 p-3 mx-3 justify-center bg-slate-100 w-full">
        <Link href="/">Home</Link>
        <Link href="project-mountains">
          Projects
        </Link>
        <Link href="thoughts-forest">
          Thoughts
        </Link>
        <Link href="contact-sea">
          Contacts
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
