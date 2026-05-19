"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 1, suffix: "+", label: "Happy Clients", emoji: "😊" },
  { value: 3, suffix: "+", label: "Projects Delivered", emoji: "🚀" },
  { value: 2, suffix: "+", label: "Years Experience", emoji: "⭐" },
  { value: 100, suffix: "%", label: "Client Satisfaction", emoji: "💎" },
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
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container-custom relative">
        <div className="text-center mb-12">
          <div className="section-badge">
            📊 Our Numbers
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-text">
            Small Team, Big Impact
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="card-premium text-center group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {stat.emoji}
              </div>
              <div className="text-4xl md:text-5xl font-extrabold font-jakarta gradient-text mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-text-muted text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}