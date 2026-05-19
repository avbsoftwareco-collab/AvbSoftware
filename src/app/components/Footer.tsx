import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-white to-bg-subtle border-t border-border-subtle overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      {/* Background blobs */}
      <div className="absolute -top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container-custom py-20 relative">
        {/* CTA Section */}
        <div className="text-center mb-16 pb-16 border-b border-border-subtle">
          <h2 className="text-4xl md:text-5xl font-extrabold text-text mb-4 tracking-tight">
            Ready to build something{" "}
            <span className="gradient-text">extraordinary?</span>
          </h2>
          <p className="text-text-muted text-lg mb-8 max-w-xl mx-auto">
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
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-white font-bold shadow-lg shadow-primary/30">
                  A
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary blur-lg opacity-50 -z-10" />
              </div>
              <span className="text-text font-bold text-lg">
                avb<span className="text-text-muted font-normal">software</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-sm mb-6">
              We craft premium digital experiences for ambitious brands. 
              Web, mobile, and custom software — built with love in India.
            </p>
            <div className="flex gap-2">
              {[
                { label: "in", color: "from-blue-500 to-blue-700" },
                { label: "ig", color: "from-pink-500 to-orange-500" },
                { label: "X", color: "from-gray-800 to-black" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center text-white text-xs font-bold hover:scale-110 hover:rotate-3 transition-all shadow-md`}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-text font-bold text-sm mb-4 uppercase tracking-wider">
              Studio
            </h3>
            <ul className="space-y-3">
              {["Work", "Services", "About", "Contact", "Blog"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-text-muted text-sm hover:text-primary hover:translate-x-1 inline-block transition-all"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-text font-bold text-sm mb-4 uppercase tracking-wider">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:contact@avbsoftware.com" className="text-text-muted hover:text-primary block">
                  contact@avbsoftware.com
                </a>
              </li>
              <li>
                <a href="tel:+91XXXXX" className="text-text-muted hover:text-primary block">
                  +91 XXXXX XXXXX
                </a>
              </li>
              <li className="text-text-muted">
                📍 Bhopal, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-subtle text-sm">
            © 2025 AVB Software. Crafted with 💜 in India.
          </p>
          <div className="flex gap-6 text-sm text-text-subtle">
            <Link href="/privacy-policy" className="hover:text-primary">Privacy</Link>
            <Link href="/terms" className="hover:text-primary">Terms</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}