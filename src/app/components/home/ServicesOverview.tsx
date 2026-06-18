import Link from "next/link";

const services = [
  {
    icon: "🌐",
    title: "Web Development",
    description: "Modern, fast, and SEO-optimized websites built with React, Next.js, and WordPress.",
    href: "/services#web",
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    description: "Cross-platform mobile apps for iOS and Android using React Native and Flutter.",
    href: "/services#mobile",
  },
  {
    icon: "⚙️",
    title: "Custom Software",
    description: "Tailor-made software solutions designed specifically for your business needs.",
    href: "/services#custom",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description: "Beautiful, user-friendly interfaces designed in Figma that convert visitors to customers.",
    href: "/services#design",
  },
  {
    icon: "🔍",
    title: "SEO & Digital Marketing",
    description: "Get found on Google and grow your online presence with data-driven SEO strategies.",
    href: "/services#seo",
  },
  {
    icon: "💡",
    title: "IT Consulting",
    description: "Expert technology advice to help your business make the right IT decisions.",
    href: "/services#consulting",
  },
];

export default function ServicesOverview() {
  return (
    <section className="section-padding bg-[#F5F0E6] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#E8DCC4]/40 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#C9A45C]/15 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-4">
            <span className="w-8 h-px bg-[#8B6F47]"></span>
            OUR SERVICES
            <span className="w-8 h-px bg-[#8B6F47]"></span>
          </div>
          <h2 
            className="text-3xl md:text-5xl font-bold text-[#2B2419] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Everything Your Business <span className="italic gradient-text">Needs</span>
          </h2>
          <p className="text-[#6B5D4A] text-lg">
            From idea to deployment, we provide end-to-end technology solutions
            for startups and enterprises.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group bg-white rounded-2xl border border-[#E8DEC8] p-7 hover:border-[#D4C29E] hover:shadow-xl hover:shadow-[#8B6F47]/10 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E8DCC4] to-[#D4C29E] flex items-center justify-center text-3xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
                {service.icon}
              </div>
              <h3 
                className="font-bold text-xl text-[#2B2419] mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {service.title}
              </h3>
              <p className="text-[#6B5D4A] text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-1 text-[#8B6F47] text-sm font-semibold group-hover:gap-2 transition-all">
                Learn More →
              </span>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link href="/services" className="btn-secondary">
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}