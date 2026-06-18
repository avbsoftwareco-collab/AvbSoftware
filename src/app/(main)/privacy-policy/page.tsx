import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — AVB Software | How We Protect Your Data",
  description: "AVB Software privacy policy — how we collect, use, and protect your personal data. Your privacy and trust are our top priority.",
  keywords: ["privacy policy", "AVB Software privacy", "data protection", "GDPR compliance India"],
};

const sections = [
  {
    icon: "📋",
    title: "1. Information We Collect",
    content:
      "We collect information you voluntarily provide when you contact us through our website form, including your name, email address, phone number, and project details. We also collect technical information such as IP address, browser type, and pages visited through cookies and analytics tools.",
  },
  {
    icon: "🎯",
    title: "2. How We Use Your Information",
    content:
      "We use the information we collect to respond to your inquiries, provide our services, send project updates and communications, improve our website and services, and comply with legal obligations. We do not sell, trade, or rent your personal information to third parties.",
  },
  {
    icon: "🍪",
    title: "3. Cookies",
    content:
      "Our website uses cookies to enhance your browsing experience. We use Google Analytics to understand how visitors use our site. You can control cookie settings through your browser preferences. By continuing to use our website, you consent to our use of cookies.",
  },
  {
    icon: "🔒",
    title: "4. Data Security",
    content:
      "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our website uses SSL encryption (HTTPS) to secure data transmission.",
  },
  {
    icon: "🤝",
    title: "5. Third-Party Services",
    content:
      "We may use third-party services including Google Analytics (traffic analysis), Google Fonts (typography), and Vercel (hosting). These services have their own privacy policies governing the use of your information.",
  },
  {
    icon: "✅",
    title: "6. Your Rights",
    content:
      "Under applicable Indian privacy laws and GDPR, you have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time. To exercise these rights, contact us at avbsoftware.co@gmail.com.",
  },
  {
    icon: "👶",
    title: "7. Children's Privacy",
    content:
      "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.",
  },
  {
    icon: "📝",
    title: "8. Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated date. We encourage you to review this policy periodically.",
  },
  {
    icon: "📞",
    title: "9. Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please contact us at avbsoftware.co@gmail.com or write to us at AVB Software, Bhopal, Madhya Pradesh, India.",
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="pt-32 pb-16 bg-[#F5F0E6] border-b border-[#D4C29E]/30 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 -left-20 w-[400px] h-[400px] bg-[#E8DCC4]/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-[#C9A45C]/15 rounded-full blur-3xl" />

        <div className="container-custom text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-6">
            <span className="w-8 h-px bg-[#8B6F47]"></span>
            LEGAL
            <span className="w-8 h-px bg-[#8B6F47]"></span>
          </div>

          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B2419] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Privacy <span className="italic gradient-text">Policy</span>
          </h1>

          <p className="text-lg text-[#6B5D4A] max-w-2xl mx-auto mb-4">
            Your privacy is our top priority. Learn how we collect, use, and protect your personal information.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#E8DEC8] text-sm text-[#8B6F47] font-semibold shadow-md">
            <span>📅</span>
            Last Updated: January 2025
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="py-10 bg-[#FAF5EA] border-b border-[#D4C29E]/30">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: "🔒", text: "SSL Secured" },
              { icon: "🛡️", text: "GDPR Compliant" },
              { icon: "✅", text: "Data Protected" },
              { icon: "🤝", text: "Your Trust First" },
            ].map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[#E8DEC8] hover:border-[#D4C29E] hover:shadow-md transition-all"
              >
                <div className="text-2xl">{badge.icon}</div>
                <div 
                  className="font-bold text-[#2B2419] text-sm"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {badge.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTENT SECTIONS ===== */}
      <section className="section-padding bg-[#FAF5EA]">
        <div className="container-custom max-w-4xl">
          {/* Intro Card */}
          <div className="mb-12 p-7 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-3xl shadow-lg shadow-[#8B6F47]/20 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, #C9A45C 1px, transparent 0)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative z-10">
              <h2 
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Our Commitment to <span className="italic" style={{ color: '#C9A45C' }}>You</span>
              </h2>
              <p className="text-[#E8DCC4] leading-relaxed">
                At <strong className="text-white">AVB Software</strong>, we believe privacy is a fundamental right. 
                This policy outlines how we handle your information with the utmost care, transparency, and security. 
                We&apos;re committed to protecting your data and keeping you informed every step of the way.
              </p>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-5">
            {sections.map((section, index) => (
              <div 
                key={section.title}
                className="bg-white rounded-2xl border border-[#E8DEC8] p-7 hover:border-[#D4C29E] hover:shadow-lg hover:shadow-[#8B6F47]/10 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#E8DCC4] to-[#D4C29E] rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {section.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 
                      className="text-xl font-bold text-[#2B2419] mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {section.title}
                    </h2>
                    <p className="text-[#6B5D4A] leading-relaxed text-sm">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 p-8 bg-gradient-to-br from-[#F5F0E6] to-[#E8DCC4] rounded-3xl border border-[#D4C29E] text-center">
            <div className="text-4xl mb-4">📧</div>
            <h3 
              className="text-2xl font-bold text-[#2B2419] mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Questions About Your <span className="italic gradient-text">Privacy?</span>
            </h3>
            <p className="text-[#6B5D4A] mb-6 max-w-xl mx-auto">
              We&apos;re here to help! If you have any questions about how we handle your data, 
              please don&apos;t hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:avbsoftware.co@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                📧 Email Us
              </a>
              <a
                href="https://wa.me/918103558368"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A45C] hover:bg-[#A88848] text-white font-bold rounded-xl transition-all hover:-translate-y-0.5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-xs text-[#8B7E6A] italic">
              By using our website and services, you agree to this Privacy Policy.
              <br />
              © 2025 AVB Software. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}