import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact AVB Software — Get a Free Quote Today",
  description:
    "Reach out to AVB Software, Bhopal for a free consultation. We respond within 24 hours. Call, WhatsApp, or email us.",
};

export default function Contact() {
  return <ContactPage />;
}