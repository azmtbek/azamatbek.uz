import Image from "next/image";
import Contact from "./Contact";


export default function Home() {
  return (
    <>
      <main
        id="main"
        className="flex min-h-screen flex-col items-center justify-between p-24"
      >
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <h1 className="text-6xl font-medium w-96 ">
            Welcome to <span className="text-[#009947]">Aza</span>land.
          </h1>
        </div>
        <a href="#middle">
          <div className="animate-pulse">scroll down</div>
        </a>
      </main>
      <section
        id="middle"
        className="min-h-screen flex flex-col items-center justify-between p-24"
      >
        <a href="#main">
          <div className="animate-pulse">scroll up</div>
        </a>
        section two
        <div className="flex justify-between items-center w-full">
          <div>left</div>
          <div>right</div>
        </div>
        <a href="#contact">
          <div className="animate-pulse">scroll down</div>
        </a>
      </section>

      <section
        id="contact"
        className="min-h-screen flex flex-col items-center justify-between p-24"
      >
        <a href="#middle">
          <div className="">scroll up</div>
        </a>
        <Contact />
      </section>
    </>
  );
}
