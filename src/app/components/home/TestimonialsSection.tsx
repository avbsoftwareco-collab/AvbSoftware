const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "Startup Founder, Bhopal",
    rating: 5,
    text: "AVB Software delivered our e-commerce website exactly as promised. The team was professional, responsive, and the final product exceeded our expectations. Highly recommended!",
    avatar: "RK",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    name: "Priya Sharma",
    company: "Business Owner, Indore",
    rating: 5,
    text: "Excellent work! They built our mobile app within the timeline and budget. The design is clean and our customers love using it. Will definitely work with them again.",
    avatar: "PS",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Amit Patel",
    company: "CEO, Tech Startup",
    rating: 5,
    text: "Working with AVB Software was a great experience. They understood our requirements quickly and delivered a custom software solution that improved our business efficiency by 40%.",
    avatar: "AP",
    gradient: "from-pink-500 to-rose-500",
  },
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-400">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-primary/20">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-bg-subtle relative overflow-hidden">
      <div className="container-custom relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-badge">
            ⭐ Testimonials
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-text mb-4">
            What Our Clients Say
          </h2>
          <p className="text-text-muted text-lg">
            Don&apos;t just take our word for it — here&apos;s what our clients
            think about working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="card-premium"
            >
              <QuoteIcon />

              <div className="flex gap-1 mb-4 mt-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              <p className="text-text-muted text-sm leading-relaxed mb-6">
                &quot;{testimonial.text}&quot;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
                <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-text text-sm">{testimonial.name}</div>
                  <div className="text-text-subtle text-xs">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-text-subtle mt-8">
          * Real client testimonials coming soon
        </p>
      </div>
    </section>
  );
}