import type { Metadata } from "next";
import { motion } from "framer-motion";
import ServicesPage from "./ServicesPage";

export const metadata: Metadata = {
  title: "IT Services — Web, Mobile & Software Development",
  description:
    "Explore our IT services: web development, mobile app development, UI/UX design, SEO, and custom software solutions.",
};

export default function Services() {
  return <ServicesPage />;
}