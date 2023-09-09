"use client";
import useHaveBeen from "@/store/useHaveBeen";
import Link from "next/link";
import React, { useEffect } from "react";

const Admin = () => {
  const { addPath } = useHaveBeen();
  useEffect(() => {
    addPath("/here");
  }, [addPath]);
  
  return (
    <div>
      <div>
        <Link href="here/projects">
          <h1 className="text-3xl p-3">Projects</h1>
        </Link>
      </div>
      <div>
        <Link href="here/thoughts">
          <h1 className="text-3xl p-3">Thoughts</h1>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
