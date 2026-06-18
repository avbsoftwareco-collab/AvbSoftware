import type { Metadata } from "next";
import BlogPage from "../blog/[slug]/BlogPage";

export const metadata: Metadata = {
  title: "Blog — IT Tips, Web & App Development Insights",
  description:
    "Read expert articles on web development, app development, SEO, and technology from AVB Software's team.",
};

export default function Blog() {
  return <BlogPage />;
}