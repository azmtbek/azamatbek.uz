import { Metadata } from "next";
import Main from "./Main";

export const metadata: Metadata = {
  title: "Azamatbek",
  description: "Azamatbek's portfolio website",
};

export default function Home() {
  return (
    <>
      <Main />
    </>
  );
}
