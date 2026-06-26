"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Client } from "@/lib/supabase";
import { useRestaurantTheme } from "./useTheme";

// ═══════════════════════════════════════════════════
// ANIMATION COMPONENTS
// ═══════════════════════════════════════════════════
const FadeIn = ({
  children, delay = 0, direction = "up", className = "",
}: {
  children: React.ReactNode; delay?: number;
  direction?: "up" | "down" | "left" | "right"; className?: string;
}) => {
  const d = { up: { y: 60, x: 0 }, down: { y: -60, x: 0 }, left: { x: 60, y: 0 }, right: { x: -60, y: 0 } };
  return (
    <motion.div
      initial={{ opacity: 0, ...d[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
};

const ScaleIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >{children}</motion.div>
);

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' fill='%23111'%3E%3Crect width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%23D4AF37' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif'%3EUpload Image%3C/text%3E%3C/svg%3E";

// ═══════════════════════════════════════════════════
// COUNTER ANIMATION
// ═══════════════════════════════════════════════════
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericPart = value.replace(/[^0-9.]/g, "");
  const nonNumeric = value.replace(/[0-9.]/g, "");
  const num = parseFloat(numericPart) || 0;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || !num) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, num]);

  return (
    <span ref={ref}>
      {count}{nonNumeric}{suffix}
    </span>
  );
}

// ═══════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════
interface HomePageProps {
  client: Client;
  setPage?: (page: string, postSlug?: string) => void;
}

export default function HomePage({ client, setPage }: HomePageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [hoveredSpecialty, setHoveredSpecialty] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  // 🎨 Get theme colors based on client selection
  const theme = useRestaurantTheme(client);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // ══════════════════════════════════════════════════
  // DATA
  // ══════════════════════════════════════════════════
  const heroImage = client.hero_image || client.hero_image_url || PLACEHOLDER;
  const featuredImage1 = client.featured_image_1 || client.hero_image_url || PLACEHOLDER;
  const featuredImage2 = client.featured_image_2 || client.products?.[0]?.image_url || PLACEHOLDER;
  const featuredImage3 = client.featured_image_3 || client.products?.[1]?.image_url || PLACEHOLDER;
  const specialtyImage1 = client.specialty_image_1 || client.products?.[0]?.image_url || client.hero_image_url || PLACEHOLDER;
  const specialtyImage2 = client.specialty_image_2 || client.products?.[1]?.image_url || client.hero_image_url || PLACEHOLDER;
  const specialtyImage3 = client.specialty_image_3 || client.products?.[2]?.image_url || client.hero_image_url || PLACEHOLDER;
  const landscapeImage = (client as any).landscape_image || client.hero_image_url || null;

  const restaurantName = client.business_name || "Restaurant";
  const tagline = client.tagline || client.about || "Welcome to our restaurant";
  const yearEstablished = client.year_established || client.established_year || "2020";
  const phone = client.phone || "";
  const email = client.email || "";
  const aboutText = client.about_short || client.about || "";

  const stats = [
    { number: client.stat_1_number || "", label: client.stat_1_label || "" },
    { number: client.stat_2_number || "", label: client.stat_2_label || "" },
    { number: client.stat_3_number || "", label: client.stat_3_label || "" },
    { number: client.stat_4_number || "", label: client.stat_4_label || "" },
  ].filter((s) => s.number && s.label);

  const specialties = client.specialties && client.specialties.length > 0
    ? client.specialties
    : [
        { title: client.specialty_1_title || "", description: client.specialty_1_desc || "", image: specialtyImage1 },
        { title: client.specialty_2_title || "", description: client.specialty_2_desc || "", image: specialtyImage2 },
        { title: client.specialty_3_title || "", description: client.specialty_3_desc || "", image: specialtyImage3 },
      ].filter((s) => s.title);

  const openingHours = client.opening_hours || [];
  const reviews = client.reviews || [];
  const marqueeText = client.marquee_text || `${restaurantName}  ✦  FINE DINING  ✦  COCKTAILS  ✦  PRIVATE EVENTS  ✦`;

  // Auto-scroll reviews on mobile
  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <div 
      style={{ backgroundColor: theme.bg, color: theme.text }}
      className="font-serif overflow-x-hidden"
    >

      {/* ════════════════════════════════════════════════════ */}
      {/*  1. HERO                                            */}
      {/* ════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div style={{ y: isMobile ? 0 : heroY }} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})`, filter: "brightness(0.3)" }}
          />
        </motion.div>

        <div 
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at center, ${theme.primary}14 0%, transparent 70%)` }}
        />
        <div 
          className="hidden md:block absolute top-1/2 left-[5%] right-[5%] h-px -translate-y-[60px]"
          style={{ background: `linear-gradient(to right, transparent, ${theme.primary}66, transparent)` }}
        />
        <div 
          className="hidden md:block absolute top-1/2 left-[5%] right-[5%] h-px translate-y-[60px]"
          style={{ background: `linear-gradient(to right, transparent, ${theme.primary}66, transparent)` }}
        />

        <motion.div style={{ opacity: isMobile ? 1 : heroOpacity }} className="relative z-10 w-full">
          <div className="text-center px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              <div 
                className="h-px w-10 sm:w-16 md:w-20"
                style={{ background: `linear-gradient(to right, transparent, ${theme.primary})` }}
              />
              <span 
                className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[4px] sm:tracking-[6px] uppercase font-sans font-light"
                style={{ color: theme.primary }}
              >
                Est. {yearEstablished}
              </span>
              <div 
                className="h-px w-10 sm:w-16 md:w-20"
                style={{ background: `linear-gradient(to left, transparent, ${theme.primary})` }}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[8px] sm:tracking-[12px] md:tracking-[16px] lg:tracking-[20px] mb-2 leading-none bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${theme.text}, ${theme.primary}, ${theme.text})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {restaurantName}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xs sm:text-sm md:text-base tracking-[2px] sm:tracking-[3px] md:tracking-[4px] uppercase font-sans font-light mt-4 sm:mt-5 md:mt-6 mb-8 sm:mb-10 md:mb-12 max-w-md sm:max-w-lg md:max-w-xl mx-auto px-4"
              style={{ color: theme.textMuted }}
            >
              {tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center items-center px-6 sm:px-0"
            >
              {phone && (
                <motion.a
                  href={`tel:${phone}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-bold cursor-pointer text-center block no-underline"
                  style={{
                    background: `linear-gradient(to bottom right, ${theme.primary}, ${theme.accent})`,
                    color: theme.bg,
                  }}
                >
                  Reserve A Table
                </motion.a>
              )}
              <motion.button
                onClick={() => setPage?.("menu")}
                whileHover={{ scale: 1.05, backgroundColor: `${theme.primary}1a` }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 bg-transparent text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-light cursor-pointer text-center block"
                style={{
                  color: theme.primary,
                  border: `1px solid ${theme.primary}80`,
                }}
              >
                View Menu
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        >
          <span 
            className="text-[10px] tracking-[4px] font-sans"
            style={{ color: `${theme.primary}99` }}
          >
            SCROLL
          </span>
          <div 
            className="w-px h-10"
            style={{ background: `linear-gradient(to bottom, ${theme.primary}, transparent)` }}
          />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  2. MARQUEE                                         */}
      {/* ════════════════════════════════════════════════════ */}
      <div 
        className="py-2.5 sm:py-3 md:py-3.5 overflow-hidden relative"
        style={{ backgroundColor: theme.primary }}
      >
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-8 sm:gap-12 md:gap-16 whitespace-nowrap w-max"
        >
          {Array(10).fill(marqueeText).map((text, i) => (
            <span 
              key={i} 
              className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[2px] sm:tracking-[3px] font-sans font-bold"
              style={{ color: theme.bg }}
            >
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/*  3. SPLIT SCREEN - About + Mosaic                   */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-0 lg:min-h-[90vh]">
        <div 
          className="grid grid-rows-[200px_150px] sm:grid-rows-[250px_180px] md:grid-rows-[300px_200px] lg:grid-rows-[60%_40%] gap-[2px] sm:gap-[3px]"
          style={{ backgroundColor: theme.bg }}
        >
          <ScaleIn>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${featuredImage1})`, filter: "brightness(0.75)" }} />
          </ScaleIn>
          <div className="grid grid-cols-2 gap-[2px] sm:gap-[3px]">
            <FadeIn delay={0.2} direction="left">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${featuredImage2})`, filter: "brightness(0.7)" }} />
            </FadeIn>
            <FadeIn delay={0.4} direction="right">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${featuredImage3})`, filter: "brightness(0.7)" }} />
            </FadeIn>
          </div>
        </div>

      <FadeIn direction="right">
  <div 
    className="flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-[70px] py-12 sm:py-16 md:py-20 lg:py-0 h-full"
    style={{ backgroundColor: theme.bgSecondary }}
  >
    <div className="flex items-center gap-3 mb-6 sm:mb-8">
      <div 
        className="w-8 sm:w-10 h-px"
        style={{ backgroundColor: theme.primary }}
      />
      <span 
        className="text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[5px] uppercase font-sans"
        style={{ color: theme.primary }}
      >
        Our Story
      </span>
    </div>

    <h2 
      className="text-3xl sm:text-4xl md:text-[42px] lg:text-[48px] xl:text-[52px] font-bold leading-[1.1] sm:leading-[1.15] mb-5 sm:mb-6 md:mb-7"
      style={{ color: theme.text }}
    >
      A Sanctuary of<br />
      <span style={{ color: theme.primary }}>Extraordinary</span><br />
      Taste
    </h2>

    {aboutText && (
      <p 
        className="leading-[1.7] sm:leading-[1.8] md:leading-[1.9] text-sm sm:text-[15px] mb-8 sm:mb-10 font-sans font-light max-w-lg"
        style={{ color: theme.textMuted }}
      >
        {aboutText}
      </p>
    )}

    {stats.length > 0 && (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
        {stats.map((stat, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div>
              <div 
                className="text-2xl sm:text-3xl md:text-[32px] font-bold mb-1"
                style={{ color: theme.primary }}
              >
                <AnimatedCounter value={stat.number} />
              </div>
              <div 
                className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[1.5px] sm:tracking-[2px] uppercase font-sans"
                style={{ color: theme.textMuted, opacity: 0.7 }}
              >
                {stat.label}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    )}

    <motion.button
      onClick={() => setPage?.("about")}
      whileHover={{ x: 8 }}
      className="self-start text-[11px] sm:text-xs tracking-[3px] sm:tracking-[4px] uppercase cursor-pointer flex items-center gap-2 sm:gap-3 font-sans bg-transparent border-none"
      style={{ color: theme.primary }}
    >
      Discover Our Story <span className="text-base sm:text-lg">→</span>
    </motion.button>
  </div>
</FadeIn>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  4. SPECIALTIES                                     */}
      {/* ════════════════════════════════════════════════════ */}
      {specialties.length > 0 && (
        <section 
          className="px-4 sm:px-6 md:px-[5%] py-16 sm:py-20 md:py-24 lg:py-[120px]"
          style={{ backgroundColor: theme.bgSecondary }}
        >
          <FadeIn className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20">
            <span 
              className="text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans block mb-3 sm:mb-4 md:mb-5"
              style={{ color: theme.primary }}
            >
              Signature Offerings
            </span>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-bold m-0"
              style={{ color: theme.text }}
            >
              The {restaurantName} Experience
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] sm:gap-[3px]">
            {specialties.map((item: any, i: number) => (
              <FadeIn key={i} delay={i * 0.15}>
                <motion.div
                  onMouseEnter={() => setHoveredSpecialty(i)}
                  onMouseLeave={() => setHoveredSpecialty(null)}
                  className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden cursor-pointer group"
                >
                  <motion.div
                    animate={{ scale: hoveredSpecialty === i ? 1.08 : 1 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image || PLACEHOLDER})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.95)] via-[rgba(0,0,0,0.2)] to-transparent" />
                  <motion.div 
                    animate={{ opacity: hoveredSpecialty === i ? 1 : 0 }} 
                    className="absolute inset-0 pointer-events-none"
                    style={{ border: `1px solid ${theme.primary}80` }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 md:p-8 lg:p-10">
                    <div 
                      className="w-6 sm:w-7 md:w-[30px] h-px mb-3 sm:mb-4"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <h3 
                      className="text-lg sm:text-xl md:text-[22px] font-bold m-0 mb-2 sm:mb-3"
                      style={{ color: theme.text }}
                    >
                      {item.title}
                    </h3>
                    {item.description && (
                      <p 
                        className="text-xs sm:text-[13px] leading-[1.6] sm:leading-[1.7] font-sans m-0 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-sm:opacity-100"
                        style={{ color: theme.textMuted }}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div 
                    className="absolute top-4 sm:top-5 md:top-6 right-4 sm:right-5 md:right-6 text-4xl sm:text-5xl md:text-[60px] font-bold leading-none font-sans"
                    style={{ color: `${theme.primary}26` }}
                  >
                    0{i + 1}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════ */}
      {/*  5. OPENING HOURS + RESERVATION                     */}
      {/* ════════════════════════════════════════════════════ */}
      {(openingHours.length > 0 || phone || client.working_hours) && (
        <section 
          className="relative px-4 sm:px-6 md:px-[5%] py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden"
          style={{ backgroundColor: theme.bg }}
        >
          <div 
            className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse at top, ${theme.primary}0d, transparent 60%)` }}
          />
          <div 
            className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse at bottom, ${theme.primary}0d, transparent 60%)` }}
          />

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ 
                  backgroundColor: theme.primary,
                  left: `${10 + i * 12}%`, 
                  top: `${15 + (i % 4) * 20}%` 
                }}
                animate={{ y: [-15, 15, -15], opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.4, 0.8] }}
                transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>

          <FadeIn className="text-center mb-12 sm:mb-16 md:mb-20 relative z-10">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="flex items-center justify-center gap-4 sm:gap-5 mb-4 sm:mb-5"
            >
              <div 
                className="h-px w-12 sm:w-16 md:w-20"
                style={{ background: `linear-gradient(to right, transparent, ${theme.primary})` }}
              />
              <span 
                className="text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans"
                style={{ color: theme.primary }}
              >
                Visit Us
              </span>
              <div 
                className="h-px w-12 sm:w-16 md:w-20"
                style={{ background: `linear-gradient(to left, transparent, ${theme.primary})` }}
              />
            </motion.div>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold"
              style={{ color: theme.text }}
            >
              We&apos;re Open &{" "}
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.text}, ${theme.primary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Waiting
              </span>
            </h2>
          </FadeIn>

          <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 relative z-10">

            {/* LEFT - OPENING HOURS CARD */}
            <FadeIn direction="left">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative h-full p-8 sm:p-10 md:p-12 lg:p-14 overflow-hidden group"
                style={{
                  background: `linear-gradient(to bottom right, ${theme.bgCard}, ${theme.bgSecondary}, ${theme.bg})`,
                  border: `1px solid ${theme.primary}33`,
                }}
              >
                <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="absolute top-0 left-0 h-px" style={{ backgroundColor: theme.primary }} />
                <motion.div initial={{ height: 0 }} whileInView={{ height: 60 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="absolute top-0 left-0 w-px" style={{ backgroundColor: theme.primary }} />
                <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} className="absolute bottom-0 right-0 h-px" style={{ backgroundColor: theme.primary }} />
                <motion.div initial={{ height: 0 }} whileInView={{ height: 60 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} className="absolute bottom-0 right-0 w-px" style={{ backgroundColor: theme.primary }} />

                <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="inline-block mb-6 sm:mb-8"
                  >
                    <div 
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-2xl sm:text-3xl"
                      style={{ border: `1px solid ${theme.primary}` }}
                    >
                      🕐
                    </div>
                  </motion.div>

                  <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <div 
                      className="h-px w-8 sm:w-10"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <span 
                      className="text-[10px] sm:text-[11px] tracking-[4px] sm:tracking-[5px] uppercase font-sans font-light"
                      style={{ color: theme.primary }}
                    >
                      Opening Hours
                    </span>
                  </div>

                  <h3 
                    className="text-2xl sm:text-3xl md:text-[34px] font-bold mb-6 sm:mb-8 leading-tight"
                    style={{ color: theme.text }}
                  >
                    Visit Us<br />
                    <span style={{ color: theme.primary }}>Anytime</span>
                  </h3>

                  {openingHours.length > 0 ? (
                    <div className="space-y-0">
                      {openingHours.map((item: any, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + 0.4, duration: 0.6 }}
                          className="flex justify-between items-center py-4 sm:py-5 group/item"
                          style={i < openingHours.length - 1 ? { borderBottom: `1px solid ${theme.primary}1a` } : {}}
                        >
                          <span 
                            className="font-sans text-sm sm:text-[15px] font-light transition-colors"
                            style={{ color: theme.textMuted }}
                          >
                            {item.days}
                          </span>
                          <span 
                            className="font-sans text-sm sm:text-[15px] font-semibold tracking-[1px] sm:tracking-[1.5px]"
                            style={{ color: theme.primary }}
                          >
                            {item.hours}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  ) : client.working_hours ? (
                    <div 
                      className="py-6 px-6"
                      style={{ 
                        backgroundColor: `${theme.primary}0d`,
                        border: `1px solid ${theme.primary}26`,
                      }}
                    >
                      <p 
                        className="font-sans text-base sm:text-lg font-medium text-center"
                        style={{ color: theme.text }}
                      >
                        {client.working_hours}
                      </p>
                    </div>
                  ) : null}

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-8 sm:mt-10 inline-flex items-center gap-2.5 px-4 py-2.5"
                    style={{ 
                      backgroundColor: `${theme.primary}1a`,
                      border: `1px solid ${theme.primary}4d`,
                    }}
                  >
                    <motion.span
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <span 
                      className="text-[10px] sm:text-[11px] tracking-[2px] sm:tracking-[3px] uppercase font-sans font-semibold"
                      style={{ color: theme.primary }}
                    >
                      Now Accepting Reservations
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </FadeIn>

            {/* RIGHT - RESERVATION CARD */}
            {phone && (
              <FadeIn direction="right">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="relative h-full overflow-hidden group"
                >
                  <div 
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to bottom right, ${theme.primary}, ${theme.accent}, ${theme.primaryDark})` }}
                  />
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle, ${theme.bg} 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />
                  <div 
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top right, ${theme.bg}66, transparent, transparent)` }}
                  />

                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />

                  <div className="relative z-10 p-8 sm:p-10 md:p-12 lg:p-14 h-full flex flex-col justify-between min-h-[420px]">
                    <div>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="inline-block mb-6 sm:mb-8"
                      >
                        <div className="text-4xl sm:text-5xl" style={{ color: theme.bg }}>✦</div>
                      </motion.div>

                      <div className="flex items-center gap-3 mb-5 sm:mb-6">
                        <div className="h-px w-8 sm:w-10" style={{ backgroundColor: theme.bg }} />
                        <span 
                          className="text-[10px] sm:text-[11px] tracking-[4px] sm:tracking-[5px] uppercase font-sans font-bold"
                          style={{ color: theme.bg }}
                        >
                          Reserve Now
                        </span>
                      </div>

                      <h3 
                        className="text-2xl sm:text-3xl md:text-[34px] font-bold mb-4 sm:mb-5 leading-[1.1]"
                        style={{ color: theme.bg }}
                      >
                        Book Your<br />
                        Perfect Evening
                      </h3>

                      <p 
                        className="font-sans text-sm sm:text-[15px] leading-[1.7] font-medium mb-8 sm:mb-10 max-w-xs"
                        style={{ color: `${theme.bg}bf` }}
                      >
                        Skip the wait. Reserve your table at {restaurantName} and indulge in an unforgettable culinary journey.
                      </p>
                    </div>

                    <div>
                      <motion.a
                        href={`tel:${phone}`}
                        whileHover={{ scale: 1.02 }}
                        className="block mb-5 sm:mb-6 p-4 sm:p-5 group/phone no-underline"
                        style={{
                          backgroundColor: theme.bg,
                          border: `2px solid ${theme.bg}`,
                        }}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <motion.div
                            animate={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                            className="text-2xl sm:text-3xl"
                          >
                            📞
                          </motion.div>
                          <div className="flex-1">
                            <div 
                              className="text-[9px] sm:text-[10px] tracking-[2px] sm:tracking-[3px] uppercase font-sans font-semibold mb-0.5"
                              style={{ color: theme.primary }}
                            >
                              Call Direct
                            </div>
                            <div 
                              className="font-sans text-base sm:text-lg md:text-xl font-bold tracking-wider transition-colors"
                              style={{ color: theme.text }}
                            >
                              {phone}
                            </div>
                          </div>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-xl sm:text-2xl"
                            style={{ color: theme.primary }}
                          >
                            →
                          </motion.div>
                        </div>
                      </motion.a>

                      <motion.button
                        onClick={() => setPage?.("contact")}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 sm:px-8 py-4 sm:py-[18px] text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-bold cursor-pointer border-none transition-colors flex items-center justify-center gap-3 group/btn"
                        style={{
                          backgroundColor: theme.bg,
                          color: theme.primary,
                        }}
                      >
                        <span>Book Online</span>
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="text-base sm:text-lg"
                        >
                          ✦
                        </motion.span>
                      </motion.button>

                      <div 
                        className="flex items-center justify-center gap-4 sm:gap-6 mt-5 sm:mt-6 text-[9px] sm:text-[10px] font-sans uppercase tracking-[2px] font-semibold"
                        style={{ color: `${theme.bg}b3` }}
                      >
                        <div className="flex items-center gap-1.5">
                          <span>✓</span>
                          <span>Instant Confirm</span>
                        </div>
                        <div className="w-px h-3" style={{ backgroundColor: `${theme.bg}4d` }} />
                        <div className="flex items-center gap-1.5">
                          <span>✓</span>
                          <span>No Fees</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            )}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="max-w-[1100px] mx-auto mt-12 sm:mt-16 md:mt-20 h-px"
            style={{ background: `linear-gradient(to right, transparent, ${theme.primary}66, transparent)` }}
          />
        </section>
      )}

      {/* ════════════════════════════════════════════════════ */}
      {/*  6. LANDSCAPE                                       */}
      {/* ════════════════════════════════════════════════════ */}
      {landscapeImage && landscapeImage !== PLACEHOLDER && (
        <section className="relative overflow-hidden">
          <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
            <motion.div
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${landscapeImage})`, filter: "brightness(0.5)" }}
              />
            </motion.div>

            <div 
              className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${theme.bg}, transparent, rgba(0,0,0,0.4))` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.3)] via-transparent to-[rgba(0,0,0,0.3)]" />

            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full opacity-40"
                  style={{ 
                    backgroundColor: theme.primary,
                    left: `${15 + i * 15}%`, 
                    top: `${20 + (i % 3) * 25}%` 
                  }}
                  animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2], scale: [0.5, 1.5, 0.5] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.7 }}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-center px-4 max-w-3xl"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8"
                >
                  <div 
                    className="h-px w-16 sm:w-24 md:w-32"
                    style={{ background: `linear-gradient(to right, transparent, ${theme.primary})` }}
                  />
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="text-2xl sm:text-3xl md:text-4xl"
                    style={{ color: theme.primary }}
                  >
                    ✦
                  </motion.span>
                  <div 
                    className="h-px w-16 sm:w-24 md:w-32"
                    style={{ background: `linear-gradient(to left, transparent, ${theme.primary})` }}
                  />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1]"
                >
                  Experience the<br />
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.text}, ${theme.primary})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Magic
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="text-[rgba(255,255,255,0.65)] font-sans text-sm sm:text-base md:text-lg max-w-xl mx-auto font-light tracking-wide leading-relaxed"
                >
                  Where culinary artistry meets unforgettable ambiance — every visit becomes a cherished memory
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="mt-8 sm:mt-10"
                >
                  <motion.button
                    onClick={() => setPage?.("gallery")}
                    whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${theme.primary}4d` }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 sm:px-10 py-3.5 sm:py-4 text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-light cursor-pointer bg-transparent transition-colors"
                    style={{
                      color: theme.primary,
                      border: `1px solid ${theme.primary}`,
                    }}
                  >
                    Explore Gallery →
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════ */}
      {/*  7. WHY CHOOSE US                                   */}
      {/* ════════════════════════════════════════════════════ */}
      <section 
        className="px-4 sm:px-6 md:px-[5%] py-16 sm:py-20 md:py-24 lg:py-[100px] relative overflow-hidden"
        style={{ backgroundColor: theme.bgSecondary }}
      >
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px"
              style={{ 
                top: `${20 + i * 15}%`, 
                left: 0, 
                right: 0,
                background: `linear-gradient(to right, transparent, ${theme.primary}, transparent)`,
              }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear", delay: i * 1.5 }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <FadeIn className="text-center mb-12 sm:mb-16">
            <span 
              className="text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans block mb-3 sm:mb-4 md:mb-5"
              style={{ color: theme.primary }}
            >
              Why Choose Us
            </span>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold m-0"
              style={{ color: theme.text }}
            >
              Crafted for <span style={{ color: theme.primary }}>Perfection</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-[1200px] mx-auto">
            {[
              { icon: "🍷", title: "Premium Ingredients", desc: "Sourced from the finest local and international suppliers" },
              { icon: "👨‍🍳", title: "Expert Chefs", desc: "Award-winning culinary team crafting every dish to perfection" },
              { icon: "🎵", title: "Unique Ambiance", desc: "Immersive atmosphere designed for unforgettable evenings" },
              { icon: "⭐", title: "5-Star Service", desc: "Dedicated team ensuring every guest feels like royalty" },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="p-6 sm:p-8 relative group cursor-pointer overflow-hidden"
                style={{
                  backgroundColor: theme.bgCard,
                  border: `1px solid ${theme.primary}1a`,
                }}
              >
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to bottom right, ${theme.primary}14, transparent)` }}
                />
                <motion.div
                  className="absolute top-0 left-0 h-[2px]"
                  style={{ backgroundColor: theme.primary }}
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.5, duration: 0.8 }}
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-3xl sm:text-4xl mb-4 sm:mb-5 inline-block"
                  >
                    {card.icon}
                  </motion.div>
                  <h3 
                    className="text-base sm:text-lg font-bold mb-2 sm:mb-3"
                    style={{ color: theme.text }}
                  >
                    {card.title}
                  </h3>
                  <p 
                    className="font-sans text-xs sm:text-[13px] leading-[1.6] sm:leading-[1.7] font-light m-0"
                    style={{ color: theme.textMuted, opacity: 0.7 }}
                  >
                    {card.desc}
                  </p>
                </div>

                <div 
                  className="absolute bottom-3 right-3 text-3xl sm:text-4xl font-sans font-bold"
                  style={{ color: `${theme.primary}1a` }}
                >
                  0{i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  8. REVIEWS                                         */}
      {/* ════════════════════════════════════════════════════ */}
      {reviews.length > 0 && (
        <section 
          className="px-4 sm:px-6 md:px-[5%] py-16 sm:py-20 md:py-24 lg:py-[100px] overflow-hidden"
          style={{ backgroundColor: theme.bg }}
        >
          <FadeIn className="text-center mb-10 sm:mb-14 md:mb-16">
            <span 
              className="text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans block mb-3 sm:mb-5"
              style={{ color: theme.primary }}
            >
              Guest Experiences
            </span>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold m-0"
              style={{ color: theme.text }}
            >
              What Our Guests Say
            </h2>
          </FadeIn>

          {/* MOBILE: Single card auto-scroll */}
          <div className="md:hidden relative max-w-md mx-auto">
            <div className="overflow-hidden">
              <motion.div
                key={reviewIndex}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.5 }}
                className="p-6 sm:p-7 relative"
                style={{
                  backgroundColor: theme.bgCard,
                  border: `1px solid ${theme.primary}1a`,
                }}
              >
                <div 
                  className="absolute top-0 left-0 w-full h-px"
                  style={{ background: `linear-gradient(to right, ${theme.primary}, ${theme.primary}4d, transparent)` }}
                />
                <div 
                  className="text-4xl leading-none font-serif opacity-50 mb-3"
                  style={{ color: theme.primary }}
                >
                  &ldquo;
                </div>
                <p 
                  className="font-sans text-xs sm:text-[13px] leading-[1.7] mb-5 font-light italic"
                  style={{ color: theme.textMuted }}
                >
                  {reviews[reviewIndex]?.text}
                </p>
                <div className="flex items-center gap-3">
                  <div>
                    <div 
                      className="font-sans text-xs sm:text-sm font-semibold"
                      style={{ color: theme.text }}
                    >
                      {reviews[reviewIndex]?.name}
                    </div>
                    {reviews[reviewIndex]?.role && (
                      <div 
                        className="font-sans text-[10px]"
                        style={{ color: theme.textMuted, opacity: 0.6 }}
                      >
                        {reviews[reviewIndex]?.role}
                      </div>
                    )}
                    {reviews[reviewIndex]?.rating && (
                      <div 
                        className="text-[10px] tracking-wider"
                        style={{ color: theme.primary }}
                      >
                        {"★".repeat(Math.floor(Number(reviews[reviewIndex]?.rating)))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIndex(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: i === reviewIndex ? '24px' : '8px',
                    backgroundColor: i === reviewIndex ? theme.primary : `${theme.primary}4d`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* DESKTOP: Infinite horizontal scroll */}
          <div className="hidden md:block relative">
            <div className="overflow-hidden">
              <motion.div
                animate={{ x: [0, -(reviews.length * 420)] }}
                transition={{ x: { duration: reviews.length * 6, repeat: Infinity, ease: "linear" } }}
                className="flex gap-5"
                style={{ width: "max-content" }}
              >
                {[...reviews, ...reviews, ...reviews].map((review: any, i: number) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="w-[380px] shrink-0 p-7 md:p-8 relative group cursor-pointer"
                    style={{
                      backgroundColor: theme.bgCard,
                      border: `1px solid ${theme.primary}1a`,
                    }}
                  >
                    <div 
                      className="absolute top-0 left-0 w-full h-px"
                      style={{ background: `linear-gradient(to right, ${theme.primary}, ${theme.primary}4d, transparent)` }}
                    />
                    <motion.div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{ border: `1px solid ${theme.primary}66` }}
                    />

                    <div 
                      className="text-4xl sm:text-5xl leading-none font-serif opacity-50 mb-3 sm:mb-4"
                      style={{ color: theme.primary }}
                    >
                      &ldquo;
                    </div>
                    <p 
                      className="font-sans text-[13px] leading-[1.8] mb-5 sm:mb-6 font-light italic line-clamp-4"
                      style={{ color: theme.textMuted }}
                    >
                      {review.text || review.content || review.message}
                    </p>
                    <div className="flex items-center gap-3">
                      {review.image && (
                        <img 
                          src={review.image} 
                          alt={review.name || "Guest"} 
                          className="w-10 h-10 rounded-full object-cover"
                          style={{ border: `1px solid ${theme.primary}4d` }}
                        />
                      )}
                      <div>
                        <div 
                          className="font-sans text-sm font-semibold"
                          style={{ color: theme.text }}
                        >
                          {review.name || review.author}
                        </div>
                        {review.role && (
                          <div 
                            className="font-sans text-xs"
                            style={{ color: theme.textMuted, opacity: 0.6 }}
                          >
                            {review.role}
                          </div>
                        )}
                        {review.rating && (
                          <div 
                            className="text-xs tracking-wider"
                            style={{ color: theme.primary }}
                          >
                            {"★".repeat(Math.floor(Number(review.rating)))}{"☆".repeat(5 - Math.floor(Number(review.rating)))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div 
              className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: `linear-gradient(to right, ${theme.bg}, transparent)` }}
            />
            <div 
              className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: `linear-gradient(to left, ${theme.bg}, transparent)` }}
            />
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════ */}
      {/*  9. BOTTOM CTA                                      */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${featuredImage2 !== PLACEHOLDER ? featuredImage2 : heroImage})`, filter: "brightness(0.15)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0.5)]" />

        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8">
          <FadeIn>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6"
              style={{ color: theme.text }}
            >
              Ready for an <span style={{ color: theme.primary }}>Unforgettable</span> Evening?
            </h2>
            <p 
              className="font-sans text-xs sm:text-sm md:text-base mb-8 sm:mb-10 font-light max-w-md sm:max-w-lg mx-auto"
              style={{ color: theme.textMuted }}
            >
              Reserve your table at {restaurantName} and let us craft an experience you&apos;ll remember forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              {phone && (
                <motion.a 
                  href={`tel:${phone}`} 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-bold cursor-pointer no-underline text-center block"
                  style={{
                    background: `linear-gradient(to bottom right, ${theme.primary}, ${theme.accent})`,
                    color: theme.bg,
                  }}
                >
                  Call {phone}
                </motion.a>
              )}
              <motion.button 
                onClick={() => setPage?.("contact")} 
                whileHover={{ scale: 1.05, backgroundColor: `${theme.primary}1a` }} 
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 bg-transparent text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-light cursor-pointer text-center block"
                style={{
                  color: theme.primary,
                  border: `1px solid ${theme.primary}80`,
                }}
              >
                Contact Us
              </motion.button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}