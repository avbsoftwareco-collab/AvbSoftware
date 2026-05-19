import Link from "next/link";

const services = [
  {
    icon: "🌐",
    title: "Web Development",
    description: "Modern, fast, and SEO-optimized websites built with React, Next.js, and WordPress.",
    href: "/services#web",
    gradient: "from-blue-50 to-indigo-50",
    accentColor: "text-blue-600",
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    description: "Cross-platform mobile apps for iOS and Android using React Native and Flutter.",
    href: "/services#mobile",
    gradient: "from-purple-50 to-pink-50",
    accentColor: "text-purple-600",
  },
  {
    icon: "⚙️",
    title: "Custom Software",
    description: "Tailor-made software solutions designed specifically for your business needs.",
    href: "/services#custom",
    gradient: "from-indigo-50 to-blue-50",
    accentColor: "text-indigo-600",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description: "Beautiful, user-friendly interfaces designed in Figma that convert visitors to customers.",
    href: "/services#design",
    gradient: "from-pink-50 to-rose-50",
    accentColor: "text-pink-600",
  },
  {
    icon: "🔍",
    title: "SEO & Digital Marketing",
    description: "Get found on Google and grow your online presence with data-driven SEO strategies.",
    href: "/services#seo",
    gradient: "from-green-50 to-emerald-50",
    accentColor: "text-green-600",
  },
  {
    icon: "💡",
    title: "IT Consulting",
    description: "Expert technology advice to help your business make the right IT decisions.",
    href: "/services#consulting",
    gradient: "from-amber-50 to-orange-50",
    accentColor: "text-amber-600",
  },
];

export default function ServicesOverview() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-badge">
            ✨ Our Services
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-text mb-4">
            Everything Your Business Needs
          </h2>
          <p className="text-text-muted text-lg">
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
              className="group card-premium hover:-translate-y-2"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                {service.icon}
              </div>
              <h3 className="font-jakarta font-bold text-xl text-text mb-2">
                {service.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <span className={`inline-flex items-center gap-1 ${service.accentColor} text-sm font-semibold group-hover:gap-2 transition-all`}>
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