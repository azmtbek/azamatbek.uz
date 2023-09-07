import { Github, Linkedin } from "lucide-react";
import Image from "next/image";
import React from "react";

function Contact() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl">Find me in</h1>
      <div className="flex justify-around pt-24 w-96">
        <a href="https://github.com/azmtbek" target="_blank">
          <div>
            <Github size={50} />
            Github
          </div>
        </a>
        <a href="https://www.linkedin.com/in/azamatbek/" target="_blank">
          <div>
            <Linkedin size={50} />
            Linkedin
          </div>
        </a>
        <a href="https://leetcode.com/azamatbek/" target="_blank">
          <div>
            <Image
              src={"/leetcode.svg"}
              width={50}
              height={50}
              alt="leetcode icon"
            />
            Leetcode
          </div>
        </a>
      </div>
    </div>
  );
}

export default Contact;