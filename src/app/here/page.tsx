import Link from "next/link";
import React from "react";

const Admin = () => {
  
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
