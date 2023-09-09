"use client";
import useHaveBeen from "@/store/useHaveBeen";
import React, { useEffect } from "react";

const Why = () => {
  const { addPath } = useHaveBeen();
  useEffect(() => {
    addPath("/why");
  }, [addPath]);
  return (
    <div>
      <h1>FAQ</h1>
      <div>
        <p>Why is your website like this?</p>
      </div>
    </div>
  );
};

export default Why;
