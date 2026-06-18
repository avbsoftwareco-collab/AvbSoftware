"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Happy Clients in Indore & Bhopal", emoji: "😊" },
  { value: 75, suffix: "+", label: "Projects Delivered", emoji: "🚀" },
  { value: 3, suffix: "+", label: "Years of Experience", emoji: "⭐" },
  { value: 100, suffix: "%", label: "Client Satisfaction Rate", emoji: "💎" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let current = 0;
          const duration = 1500;
          const increment = target / (duration / 16);

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section 
      className="section-padding bg-[#FAF5EA] relative overflow-hidden"
      aria-labelledby="stats-heading"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E8DCC4]/30 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#C9A45C]/15 rounded-full blur-3xl" aria-hidden="true" />

      <div className="container-custom relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-4">
            <span className="w-8 h-px bg-[#8B6F47]"></span>
            OUR NUMBERS
            <span className="w-8 h-px bg-[#8B6F47]"></span>
          </div>
          <h2 
            id="stats-heading" 
            className="text-3xl md:text-5xl font-bold text-[#2B2419] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Trusted <span className="italic gradient-text">Software Company</span> in Madhya Pradesh
          </h2>
          <p className="text-[#6B5D4A] text-base max-w-2xl mx-auto">
            Numbers that speak louder than words. Real results from real clients.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-[#E8DEC8] p-6 text-center group hover:border-[#D4C29E] hover:shadow-lg hover:shadow-[#8B6F47]/10 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#E8DCC4] to-[#D4C29E] flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                {stat.emoji}
              </div>
              <div 
                className="text-4xl md:text-5xl font-bold gradient-text mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[#6B5D4A] text-sm font-medium leading-relaxed">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}