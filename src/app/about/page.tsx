import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "About AVB Software — IT Company in Bhopal, MP",
  description:
    "Learn about AVB Software — our story, our team, and why we're the trusted IT partner for businesses in Bhopal.",
};

export default function About() {
  return <AboutPage />;
}