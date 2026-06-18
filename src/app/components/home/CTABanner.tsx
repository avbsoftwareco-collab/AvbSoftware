import Link from "next/link";

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5" aria-hidden="true">
      <line x1="5" x2="19" y1="12" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    </svg>
  );
}

export default function CTABanner() {
  return (
    <section 
      className="section-padding bg-[#FAF5EA]"
      aria-labelledby="cta-heading"
    >
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center bg-gradient-to-br from-[#8B6F47] via-[#6B5535] to-[#2B2419]">
          {/* Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, #C9A45C 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
            aria-hidden="true"
          />

          {/* Floating decorative orbs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#C9A45C]/20 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E8DCC4]/10 rounded-full blur-3xl" aria-hidden="true" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#C9A45C] mb-6">
              <span className="w-8 h-px bg-[#C9A45C]"></span>
              LET&apos;S BUILD TOGETHER
              <span className="w-8 h-px bg-[#C9A45C]"></span>
            </div>

            <h2 
              id="cta-heading" 
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ready to Start Your <span className="italic" style={{ color: '#C9A45C' }}>Project?</span>
            </h2>

            <p className="text-[#E8DCC4] text-lg max-w-2xl mx-auto mb-10">
              Let&apos;s turn your idea into reality. Get a <strong className="text-white">free consultation</strong> from 
              the best <strong className="text-white">software company in Madhya Pradesh</strong> — no commitment required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                aria-label="Contact AVB Software for free consultation"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-2xl hover:bg-white transition-all hover:-translate-y-1 shadow-xl"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span>Talk to Us Today</span>
                <ArrowRightIcon />
              </Link>
              <a
                href="https://wa.me/918103558368?text=Hi%20AVB%20Software!%20I%20want%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with AVB Software on WhatsApp"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A45C] hover:bg-[#A88848] text-white font-bold rounded-2xl transition-all hover:-translate-y-1 shadow-xl"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <MessageIcon />
                <span>WhatsApp Us</span>
              </a>
            </div>

            <p className="mt-6 text-[#E8DCC4]/80 text-sm">
              ✓ Free consultation &nbsp;·&nbsp; ✓ Response within 24 hours &nbsp;·&nbsp; ✓ No hidden fees
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}