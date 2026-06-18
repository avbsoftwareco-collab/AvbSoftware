import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#FAF5EA] to-[#EFE8D8] border-t border-[#D4C29E]/30 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#8B6F47] to-transparent" />
      
      {/* Background blobs */}
      <div className="absolute -top-20 left-1/4 w-96 h-96 bg-[#E8DCC4]/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C9A45C]/15 rounded-full blur-3xl" />

      <div className="container-custom py-20 relative">
        {/* CTA Section */}
        <div className="text-center mb-16 pb-16 border-b border-[#D4C29E]/30">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-4">
            <span className="w-8 h-px bg-[#8B6F47]"></span>
            LET'S CREATE TOGETHER
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold text-[#2B2419] mb-4 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to build something{" "}
            <span className="italic gradient-text">extraordinary?</span>
          </h2>
          <p className="text-[#6B5D4A] text-lg mb-8 max-w-xl mx-auto">
            Let&apos;s turn your vision into reality. Free consultation, no commitments.
          </p>
          <Link href="/contact" className="btn-primary">
            <span>Start Your Project</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B6F47] via-[#6B5535] to-[#C9A45C] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#8B6F47]/30" style={{ fontFamily: "'Playfair Display', serif" }}>
                  A
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#8B6F47] to-[#C9A45C] blur-lg opacity-50 -z-10" />
              </div>
              <span 
                className="text-[#2B2419] font-bold text-xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                avb<span className="text-[#8B6F47] italic">software</span>
              </span>
            </Link>
            <p className="text-[#6B5D4A] text-sm leading-relaxed max-w-sm mb-6">
              We craft premium digital experiences for ambitious brands. 
              Web, mobile, and custom software — built with love in India.
            </p>
            <div className="flex gap-2">
              {[
                { label: "in", name: "LinkedIn" },
                { label: "ig", name: "Instagram" },
                { label: "X", name: "Twitter" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.name}
                  className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#8B6F47] to-[#6B5535] flex items-center justify-center text-white text-xs font-bold hover:scale-110 hover:rotate-3 transition-all shadow-md hover:shadow-lg hover:shadow-[#8B6F47]/30"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 
              className="text-[#2B2419] font-bold text-sm mb-4 uppercase tracking-[2px]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Studio
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Portfolio", href: "/portfolio" },
                { label: "Services", href: "/services" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Blog", href: "/blog" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#6B5D4A] text-sm hover:text-[#8B6F47] hover:translate-x-1 inline-block transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 
              className="text-[#2B2419] font-bold text-sm mb-4 uppercase tracking-[2px]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="mailto:avbsoftware.co@gmail.com" 
                  className="text-[#6B5D4A] hover:text-[#8B6F47] block transition-colors"
                >
                  ✉️ avbsoftware.co@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+918103558368" 
                  className="text-[#6B5D4A] hover:text-[#8B6F47] block transition-colors"
                >
                  📞 +91 8103558368
                </a>
              </li>
              <li>
                <a 
                  href="tel:+918821962424" 
                  className="text-[#6B5D4A] hover:text-[#8B6F47] block transition-colors"
                >
                  📞 +91 8821962424
                </a>
              </li>
              <li className="text-[#6B5D4A]">
                📍 Bhopal, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[#D4C29E]/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#8B7E6A] text-sm">
            © 2025 AVB Software. Crafted with ✨ in India.
          </p>
          <div className="flex gap-6 text-sm text-[#8B7E6A]">
            <Link href="/privacy-policy" className="hover:text-[#8B6F47] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#8B6F47] transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-[#8B6F47] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}