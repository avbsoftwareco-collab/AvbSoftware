import type { Metadata } from "next";
import PortfolioPage from "./PortfolioPage";

export const metadata: Metadata = {
  title: "Our Work & Projects",
  description:
    "See the websites, apps, and software projects delivered by AVB Software for clients across India.",
};

export default function Portfolio() {
  return <PortfolioPage />;
}