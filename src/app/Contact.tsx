import { Github, Linkedin } from "lucide-react";
import React from "react";

function Contact() {
  return (
    <div>
      <h1 className="text-4xl">Find me in</h1>
      <div className="flex justify-around pt-24">
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
      </div>
    </div>
  );
}

export default Contact;
