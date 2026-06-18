const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "Startup Founder",
    location: "Bhopal, MP",
    rating: 5,
    text: "AVB Software delivered our e-commerce website exactly as promised. Best web development company in Bhopal! The team was professional, responsive, and the final product exceeded our expectations. Highly recommended!",
    avatar: "RK",
  },
  {
    name: "Priya Sharma",
    company: "Business Owner",
    location: "Indore, MP",
    rating: 5,
    text: "Excellent mobile app development services in Indore! They built our app within the timeline and budget. The design is clean and our customers love using it. Will definitely work with them again.",
    avatar: "PS",
  },
  {
    name: "Amit Patel",
    company: "CEO, Tech Startup",
    location: "Indore, MP",
    rating: 5,
    text: "Working with AVB Software was a great experience. Best custom software company in Indore! They understood our requirements quickly and delivered a solution that improved our business efficiency by 40%.",
    avatar: "AP",
  },
];

function StarIcon() {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="w-4 h-4 text-[#C9A45C]"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="w-12 h-12 text-[#E8DCC4]"
      aria-hidden="true"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

export default function TestimonialsSection() {
  return (
    <section 
      className="section-padding bg-[#F5F0E6] relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Background decorations */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-[#E8DCC4]/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-[#C9A45C]/20 rounded-full blur-3xl" />

      <div className="container-custom relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-4">
            <span className="w-8 h-px bg-[#8B6F47]"></span>
            CLIENT TESTIMONIALS
            <span className="w-8 h-px bg-[#8B6F47]"></span>
          </div>
          <h2 
            id="testimonials-heading" 
            className="text-3xl md:text-5xl font-bold text-[#2B2419] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What Our Clients <span className="italic gradient-text">Say</span>
          </h2>
          <p className="text-[#6B5D4A] text-lg">
            Real reviews from real clients across Madhya Pradesh. See why businesses 
            choose <strong className="text-[#2B2419]">AVB Software</strong> for their digital needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="bg-white rounded-2xl border border-[#E8DEC8] p-7 hover:border-[#D4C29E] hover:shadow-xl hover:shadow-[#8B6F47]/10 hover:-translate-y-2 transition-all duration-300 relative"
              itemScope
              itemType="https://schema.org/Review"
            >
              <QuoteIcon />

              <div 
                className="flex gap-1 mb-4 mt-2"
                itemProp="reviewRating"
                itemScope
                itemType="https://schema.org/Rating"
              >
                <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
                <meta itemProp="bestRating" content="5" />
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              <p 
                className="text-[#6B5D4A] text-sm leading-relaxed mb-6 italic"
                itemProp="reviewBody"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                &quot;{testimonial.text}&quot;
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-[#E8DEC8]">
                <div 
                  className="w-12 h-12 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                  aria-hidden="true"
                >
                  {testimonial.avatar}
                </div>
                <div itemProp="author" itemScope itemType="https://schema.org/Person">
                  <div 
                    className="font-bold text-[#2B2419] text-sm" 
                    itemProp="name"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {testimonial.name}
                  </div>
                  <div className="text-[#8B6F47] text-xs font-medium">{testimonial.company}</div>
                  <div className="text-[#8B7E6A] text-xs flex items-center gap-1 mt-0.5">
                    <span>📍</span> {testimonial.location}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-xs text-[#8B7E6A] mt-8 italic">
          ✨ Real client testimonials from Indore, Bhopal & across Madhya Pradesh
        </p>
      </div>
    </section>
  );
}