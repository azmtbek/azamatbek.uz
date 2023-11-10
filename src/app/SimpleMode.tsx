import Link from "next/link";
import React from "react";

export const SimpleMode = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between py-10">
      <div className="flex ">
        <Link href="projects">Projects</Link>
        <Link href="blog">Blog</Link>
        <Link href="contact">Contact</Link>
      </div>
    </div>
  );
};
