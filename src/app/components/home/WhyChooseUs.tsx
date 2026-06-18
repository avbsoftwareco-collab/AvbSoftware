const features = [
  {
    icon: "⚡",
    title: "On-Time Delivery Guaranteed",
    description: "We respect your deadlines. Every web & app project for our Indore and Bhopal clients is planned with clear milestones and delivered on schedule, every time.",
    points: ["Detailed project timelines", "Weekly progress updates", "Early delivery bonus"],
  },
  {
    icon: "💎",
    title: "Transparent & Affordable Pricing",
    description: "No hidden costs, no surprises. Get the best web development & software prices in Indore & Bhopal with clear quotations before we start.",
    points: ["Fixed price contracts", "Detailed quotations", "No hidden charges"],
  },
  {
    icon: "🎧",
    title: "Dedicated Local Support",
    description: "Local Indore & Bhopal team available 24/7. We don't disappear after launch. Our team provides ongoing support to keep your product running smoothly.",
    points: ["3-month post-launch support", "WhatsApp & email support", "Quick bug fixes"],
  },
  {
    icon: "🚀",
    title: "Latest & Modern Tech Stack",
    description: "We use Next.js, React, Flutter — the same proven technologies used by top companies in India and worldwide for fast, scalable products.",
    points: ["Next.js, React, Flutter", "Cloud-hosted solutions", "SEO-optimized by default"],
  },
];

function CheckIcon() {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      className="w-4 h-4 text-[#8B6F47] flex-shrink-0"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function WhyChooseUs() {
  return (
    <section 
      className="section-padding bg-[#FAF5EA] relative overflow-hidden"
      aria-labelledby="why-choose-heading"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#E8DCC4]/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C9A45C]/15 rounded-full blur-3xl" />

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-4">
            <span className="w-8 h-px bg-[#8B6F47]"></span>
            WHY AVB SOFTWARE
            <span className="w-8 h-px bg-[#8B6F47]"></span>
          </div>
          <h2 
            id="why-choose-heading" 
            className="text-3xl md:text-5xl font-bold text-[#2B2419] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Why Indore & Bhopal <span className="italic gradient-text">Businesses</span> Trust Us
          </h2>
          <p className="text-[#6B5D4A] text-lg">
            We&apos;re not just developers — we&apos;re your <strong className="text-[#2B2419]">local technology partners</strong> in 
            Madhya Pradesh, committed to your business growth and success.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="bg-white rounded-2xl border border-[#E8DEC8] p-7 group hover:border-[#D4C29E] hover:shadow-xl hover:shadow-[#8B6F47]/10 hover:-translate-y-2 transition-all duration-300"
            >
              <div 
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B6F47] to-[#6B5535] flex items-center justify-center text-3xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-[#8B6F47]/25"
                aria-hidden="true"
              >
                {feature.icon}
              </div>
              <h3 
                className="font-bold text-xl text-[#2B2419] mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {feature.title}
              </h3>
              <p className="text-[#6B5D4A] text-sm leading-relaxed mb-5">
                {feature.description}
              </p>
              <ul className="space-y-2.5 pt-4 border-t border-[#E8DEC8]">
                {feature.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-[#6B5D4A] text-sm">
                    <CheckIcon />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}