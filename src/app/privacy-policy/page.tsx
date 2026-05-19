import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "AVB Software privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <section className="pt-32 pb-24">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-extrabold text-navy mb-4">Privacy Policy</h1>
        <p className="text-muted mb-8">
          Last updated: January 2025
        </p>

        <div className="prose prose-slate max-w-none space-y-8">
          {[
            {
              title: "1. Information We Collect",
              content:
                "We collect information you voluntarily provide when you contact us through our website form, including your name, email address, phone number, and project details. We also collect technical information such as IP address, browser type, and pages visited through cookies and analytics tools.",
            },
            {
              title: "2. How We Use Your Information",
              content:
                "We use the information we collect to respond to your inquiries, provide our services, send project updates and communications, improve our website and services, and comply with legal obligations. We do not sell, trade, or rent your personal information to third parties.",
            },
            {
              title: "3. Cookies",
              content:
                "Our website uses cookies to enhance your browsing experience. We use Google Analytics to understand how visitors use our site. You can control cookie settings through your browser preferences. By continuing to use our website, you consent to our use of cookies.",
            },
            {
              title: "4. Data Security",
              content:
                "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our website uses SSL encryption (HTTPS) to secure data transmission.",
            },
            {
              title: "5. Third-Party Services",
              content:
                "We may use third-party services including Google Analytics (traffic analysis), Google Fonts (typography), and Vercel (hosting). These services have their own privacy policies governing the use of your information.",
            },
            {
              title: "6. Your Rights",
              content:
                "Under applicable Indian privacy laws and GDPR, you have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time. To exercise these rights, contact us at contact@avbsoftware.com.",
            },
            {
              title: "7. Children's Privacy",
              content:
                "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.",
            },
            {
              title: "8. Changes to This Policy",
              content:
                "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated date. We encourage you to review this policy periodically.",
            },
            {
              title: "9. Contact Us",
              content:
                "If you have any questions about this Privacy Policy, please contact us at contact@avbsoftware.com or write to us at AVB Software, Bhopal, Madhya Pradesh, India.",
            },
          ].map((section) => (
            <div key={section.title} className="border-b border-slate-100 pb-6">
              <h2 className="text-xl font-bold text-navy mb-3 font-jakarta">
                {section.title}
              </h2>
              <p className="text-slate-700 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}