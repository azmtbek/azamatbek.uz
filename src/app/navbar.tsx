import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname()
  return (
    <>
      <div className="fixed top-0 inset-x-1/3 w-max z-10 bg-background">
        <div className="py-3" />
        <div className="flex gap-10 p-3 mx-3 justify-center w-full">
          <NavLink pathname={pathname} label='home' href='/' />
          <NavLink pathname={pathname} label='projects' href='/projects' />
          <NavLink pathname={pathname} label='blog' href='/blog' />
          <NavLink pathname={pathname} label='contact' href='/contact' />
        </div>
      </div>
      <div className="py-10"></div>
    </>
  );
};

type NavLink = {
  pathname: string,
  href: string,
  label: string
}
const NavLink = ({ pathname, href, label }: NavLink) => {
  return <Link href={href}>
    <Button variant={pathname === href ? "outline" : 'ghost'}  >
      <span className="text-xl capitalize">{label}</span>
    </Button>
  </Link>
}

export default Navbar;
