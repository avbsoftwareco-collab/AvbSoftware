import type { Metadata } from "next";
import TemplatesPage from "../../components/templates/TemplatesPage";

export const metadata: Metadata = {
  title: "Premium Website Templates @ ₹799/Month — AVB Software",
  description: "Choose from premium website templates for your business. Timber, Bakery, Restaurant & more. Live in 3-5 days. Starting at ₹799/month.",
  keywords: [
    "website templates india",
    "business website templates",
    "ready website templates ₹799",
    "timber website template",
    "bakery website template",
    "AVB Software templates",
  ],
};

export default function Templates() {
  return <TemplatesPage />;
}