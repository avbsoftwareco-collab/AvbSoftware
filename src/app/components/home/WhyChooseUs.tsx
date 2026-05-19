const features = [
  {
    icon: "⚡",
    title: "On-Time Delivery",
    description: "We respect your deadlines. Every project is planned with clear milestones and delivered on schedule, every time.",
    points: ["Detailed project timelines", "Weekly progress updates", "Early delivery bonus"],
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: "💎",
    title: "Transparent Pricing",
    description: "No hidden costs, no surprises. You'll know exactly what you're paying for before we start any work.",
    points: ["Fixed price contracts", "Detailed quotations", "No hidden charges"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: "🎧",
    title: "Dedicated Support",
    description: "We don't disappear after launch. Our team provides ongoing support to keep your product running smoothly.",
    points: ["3-month post-launch support", "WhatsApp & email support", "Quick bug fixes"],
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: "🚀",
    title: "Modern Tech Stack",
    description: "We use the latest, proven technologies to build fast, scalable, and future-proof digital products.",
    points: ["Next.js, React, Flutter", "Cloud-hosted solutions", "SEO-optimized by default"],
    gradient: "from-amber-500 to-orange-500",
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-green-500 flex-shrink-0">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-bg-subtle relative overflow-hidden">
      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-badge">
            💫 Why AVB Software
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-text mb-4">
            Why Businesses Trust Us
          </h2>
          <p className="text-text-muted text-lg">
            We&apos;re not just developers — we&apos;re your technology partners
            committed to your growth.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card-premium group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="font-jakarta font-bold text-xl text-text mb-3">
                {feature.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-text-muted text-sm">
                    <CheckIcon />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}