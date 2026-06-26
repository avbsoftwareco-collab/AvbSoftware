"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Client } from "@/lib/supabase";
import { useRestaurantTheme } from "./useTheme";

// ═══════════════════════════════════════════════════
// ANIMATIONS
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

interface AboutPageProps {
  client: Client;
  setPage?: (page: string, postSlug?: string) => void;
}

export default function AboutPage({ client }: AboutPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 🎨 Get theme colors
  const theme = useRestaurantTheme(client);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
    c(); window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  // ══════════════════════════════════════════════════
  // IMAGES
  // ══════════════════════════════════════════════════
  const heroImage = client.about_hero_image || client.hero_image || client.hero_image_url || PLACEHOLDER;
  const aboutImage = client.about_image || client.hero_image_url || PLACEHOLDER;
  const chefImage = client.chef_image || client.logo_url || PLACEHOLDER;
  const storyImage1 = client.story_image_1 || client.featured_image_2 || client.products?.[0]?.image_url || PLACEHOLDER;
  const storyImage2 = client.story_image_2 || client.featured_image_3 || client.products?.[1]?.image_url || PLACEHOLDER;

  // ══════════════════════════════════════════════════
  // DATA
  // ══════════════════════════════════════════════════
  const restaurantName = client.business_name || "Restaurant";
  const yearEstablished = client.year_established || client.established_year || "2020";
  const currentYear = new Date().getFullYear();
  const yearsRunning = parseInt(yearEstablished) ? currentYear - parseInt(yearEstablished) : 5;

  const chefName = client.chef_name || client.owner_name || "";
  const chefQuote = client.chef_quote || "";
  const chefRole = client.chef_role || "Executive Chef";

  const storyHeading = client.story_heading || client.about_heading || "Born From Passion, Crafted With Purpose";

  const storyParagraphs: string[] = (() => {
    if (client.story_paragraphs && client.story_paragraphs.length > 0) {
      return client.story_paragraphs as string[];
    }
    const paragraphs: string[] = [
      client.about_text,
      client.about_text_2,
      client.about,
    ].filter((p): p is string => Boolean(p));

    if (paragraphs.length > 0) return paragraphs;

    return [
      `Founded in ${yearEstablished}, ${restaurantName} began as a passionate vision to redefine the dining experience in ${client.city || "the city"}. What started as a dream has now blossomed into a beloved destination for food enthusiasts and connoisseurs alike.`,
      `Over the years, we have remained committed to one simple philosophy — exceptional ingredients, authentic flavors, and an atmosphere that turns every meal into a cherished memory. Our journey is built on the trust of countless guests who walk through our doors.`,
      `Today, ${restaurantName} stands as a testament to what's possible when passion meets perfection. Every dish tells a story, every detail matters, and every guest becomes part of our family.`,
    ];
  })();

  const teamMembers: any[] = client.team_members || [];
  const awards: any[] = client.awards || [];

  const mission: string = (client as any).mission ||
    `To deliver an unforgettable culinary journey that celebrates authentic flavors, premium ingredients, and warm hospitality — making every visit to ${restaurantName} a moment worth remembering.`;

  const vision: string = (client as any).vision ||
    `To become ${client.city || "the city"}'s most loved dining destination, where tradition meets innovation, and where every guest leaves with a smile and a story to share.`;

  const values = [
    { icon: "🌿", title: "Quality First", desc: "We source only the finest ingredients from trusted local and global suppliers, ensuring every dish meets our uncompromising standards." },
    { icon: "❤️", title: "Passion Driven", desc: "Our team pours their heart into every plate, treating cooking as an art form and hospitality as a sacred calling." },
    { icon: "✨", title: "Authentic Experience", desc: "We believe in preserving traditional techniques while embracing modern creativity to create unique flavor experiences." },
    { icon: "🤝", title: "Guest Family", desc: "Every guest who walks in is treated like family. Your comfort, satisfaction, and happiness are our highest priorities." },
  ];

  const timeline = [
    { year: yearEstablished, title: "The Beginning", desc: `${restaurantName} opened its doors with a vision to revolutionize the dining scene.` },
    { year: String(parseInt(yearEstablished) + Math.floor(yearsRunning / 3)), title: "Growing Recognition", desc: "Earned love from thousands of guests and established our signature style." },
    { year: String(parseInt(yearEstablished) + Math.floor((yearsRunning * 2) / 3)), title: "Award Winning", desc: "Recognized for culinary excellence and outstanding service in the region." },
    { year: String(currentYear), title: "Today & Beyond", desc: "Continuing to innovate and serve unforgettable experiences to our cherished guests." },
  ];

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
        className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[70vh] overflow-hidden flex items-end justify-start"
      >
        <motion.div style={{ y: isMobile ? 0 : heroY }} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})`, filter: "brightness(0.3)" }}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.8)] via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 px-4 sm:px-6 md:px-[5%] lg:px-[8%] pb-12 sm:pb-16 md:pb-20"
        >
          <span 
            className="text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans block mb-3 sm:mb-4 md:mb-5"
            style={{ color: theme.primary }}
          >
            About {restaurantName}
          </span>
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px] font-bold m-0 leading-[1.05]"
            style={{ color: theme.text }}
          >
            Our<br />
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${theme.primary}, ${theme.accent})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Legacy
            </span>
          </h1>
        </motion.div>

        <div 
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(to right, ${theme.primary}, ${theme.primary}4d, transparent)`,
          }}
        />
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  2. INTRO STATS BAR                                 */}
      {/* ════════════════════════════════════════════════════ */}
      <section 
        className="py-10 sm:py-12 md:py-14"
        style={{ 
          backgroundColor: theme.bgSecondary,
          borderBottom: `1px solid ${theme.primary}26`,
        }}
      >
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {[
            { number: yearEstablished, label: "Founded" },
            { number: `${yearsRunning}+`, label: "Years of Excellence" },
            { number: client.happy_customers || "10K+", label: "Happy Guests" },
            { number: awards.length > 0 ? `${awards.length}+` : "5+", label: "Awards Won" },
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="text-center">
                <div 
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 leading-none"
                  style={{ color: theme.primary }}
                >
                  {stat.number}
                </div>
                <div 
                  className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[2px] sm:tracking-[3px] uppercase font-sans"
                  style={{ color: theme.textMuted, opacity: 0.7 }}
                >
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  3. STORY - Split Screen                            */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-0 lg:min-h-[80vh]">
        <FadeIn direction="left" className="order-2 lg:order-1">
          <div 
            className="flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-12 sm:py-16 md:py-20 lg:py-[100px]"
            style={{ backgroundColor: theme.bgSecondary }}
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
              <div 
                className="w-8 sm:w-10 md:w-[50px] h-px"
                style={{ backgroundColor: theme.primary }}
              />
              <span 
                className="text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[5px] uppercase font-sans"
                style={{ color: theme.primary }}
              >
                The Story
              </span>
            </div>

            <h2 
              className="text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] xl:text-[44px] font-bold leading-[1.15] sm:leading-[1.2] mb-6 sm:mb-8 md:mb-9"
              style={{ color: theme.text }}
            >
              {storyHeading}
            </h2>

            {storyParagraphs.map((para, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <p 
                  className="leading-[1.7] sm:leading-[1.8] md:leading-[1.9] text-sm sm:text-[15px] mb-5 sm:mb-6 font-sans font-light"
                  style={{ color: theme.textMuted }}
                >
                  {para}
                </p>
              </FadeIn>
            ))}

            {(storyImage1 !== PLACEHOLDER || storyImage2 !== PLACEHOLDER) && (
              <div className="grid grid-cols-2 gap-2 sm:gap-[8px] mt-6 sm:mt-8 md:mt-10">
                {[storyImage1, storyImage2].filter(img => img !== PLACEHOLDER).map((img, i) => (
                  <ScaleIn key={i} delay={i * 0.1}>
                    <div
                      className="h-28 sm:h-32 md:h-36 lg:h-40 bg-cover bg-center"
                      style={{ backgroundImage: `url(${img})`, filter: "brightness(0.75) sepia(0.2)" }}
                    />
                  </ScaleIn>
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn direction="right" className="relative overflow-hidden order-1 lg:order-2 min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${aboutImage})`, filter: "brightness(0.6) sepia(0.15)" }}
          />
          <div 
            className="absolute inset-0"
            style={{ background: `linear-gradient(to bottom right, rgba(0,0,0,0.5), ${theme.primary}0d)` }}
          />

          <div 
            className="absolute bottom-4 right-4 sm:bottom-8 sm:right-6 md:bottom-12 md:right-8 lg:bottom-[60px] lg:right-10 p-4 sm:p-5 md:p-6 lg:p-8 backdrop-blur-[10px]"
            style={{
              backgroundColor: `${theme.bg}d9`,
              border: `1px solid ${theme.primary}4d`,
            }}
          >
            <div 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold leading-none"
              style={{ color: theme.primary }}
            >
              {yearEstablished}
            </div>
            <div 
              className="font-sans text-[9px] sm:text-[10px] md:text-[11px] tracking-[2px] sm:tracking-[3px] uppercase mt-1 sm:mt-2"
              style={{ color: theme.textMuted }}
            >
              Founded
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  4. MISSION & VISION CARDS                          */}
      {/* ════════════════════════════════════════════════════ */}
      <section 
        className="relative px-4 sm:px-6 md:px-[5%] py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden"
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

        <FadeIn className="text-center mb-12 sm:mb-16 md:mb-20 relative z-10">
          <div className="flex items-center justify-center gap-4 sm:gap-5 mb-4 sm:mb-5">
            <div 
              className="h-px w-12 sm:w-16 md:w-20"
              style={{ background: `linear-gradient(to right, transparent, ${theme.primary})` }}
            />
            <span 
              className="text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans"
              style={{ color: theme.primary }}
            >
              Our Purpose
            </span>
            <div 
              className="h-px w-12 sm:w-16 md:w-20"
              style={{ background: `linear-gradient(to left, transparent, ${theme.primary})` }}
            />
          </div>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold"
            style={{ color: theme.text }}
          >
            Mission &{" "}
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.text}, ${theme.primary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Vision
            </span>
          </h2>
        </FadeIn>

        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 relative z-10">

          {/* MISSION CARD */}
          <FadeIn direction="left">
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative h-full p-8 sm:p-10 md:p-12 lg:p-14 overflow-hidden group"
              style={{
                background: `linear-gradient(to bottom right, ${theme.bgCard}, ${theme.bgSecondary}, ${theme.bg})`,
                border: `1px solid ${theme.primary}33`,
              }}
            >
              <motion.div initial={{ width: 0 }} whileInView={{ width: 80 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="absolute top-0 left-0 h-px" style={{ backgroundColor: theme.primary }} />
              <motion.div initial={{ height: 0 }} whileInView={{ height: 80 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="absolute top-0 left-0 w-px" style={{ backgroundColor: theme.primary }} />

              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to bottom right, ${theme.primary}14, transparent)` }}
              />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="inline-block mb-6 sm:mb-8"
                >
                  <div 
                    className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl"
                    style={{ 
                      border: `2px solid ${theme.primary}`,
                      backgroundColor: `${theme.primary}0d`,
                    }}
                  >
                    🎯
                  </div>
                </motion.div>

                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div 
                    className="h-px w-8 sm:w-10"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span 
                    className="text-[10px] sm:text-[11px] tracking-[4px] sm:tracking-[5px] uppercase font-sans font-light"
                    style={{ color: theme.primary }}
                  >
                    Our Mission
                  </span>
                </div>

                <h3 
                  className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-bold mb-5 sm:mb-6 leading-[1.15]"
                  style={{ color: theme.text }}
                >
                  What Drives <span style={{ color: theme.primary }}>Us</span>
                </h3>

                <p 
                  className="font-sans text-sm sm:text-[15px] md:text-base leading-[1.8] sm:leading-[1.9] font-light italic"
                  style={{ color: theme.textMuted }}
                >
                  &ldquo;{mission}&rdquo;
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="mt-8 sm:mt-10 h-px"
                  style={{ background: `linear-gradient(to right, ${theme.primary}, ${theme.primary}4d, transparent)` }}
                />
              </div>
            </motion.div>
          </FadeIn>

          {/* VISION CARD */}
          <FadeIn direction="right">
            <motion.div
              whileHover={{ y: -10 }}
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
                style={{ background: `linear-gradient(to top right, ${theme.bg}80, transparent, transparent)` }}
              />

              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />

              <div className="relative z-10 p-8 sm:p-10 md:p-12 lg:p-14 h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-block mb-6 sm:mb-8"
                >
                  <div 
                    className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl"
                    style={{ 
                      border: `2px solid ${theme.bg}`,
                      backgroundColor: `${theme.bg}1a`,
                    }}
                  >
                    🌟
                  </div>
                </motion.div>

                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div 
                    className="h-px w-8 sm:w-10"
                    style={{ backgroundColor: theme.bg }}
                  />
                  <span 
                    className="text-[10px] sm:text-[11px] tracking-[4px] sm:tracking-[5px] uppercase font-sans font-bold"
                    style={{ color: theme.bg }}
                  >
                    Our Vision
                  </span>
                </div>

                <h3 
                  className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-bold mb-5 sm:mb-6 leading-[1.15]"
                  style={{ color: theme.bg }}
                >
                  Where We&apos;re Headed
                </h3>

                <p 
                  className="font-sans text-sm sm:text-[15px] md:text-base leading-[1.8] sm:leading-[1.9] font-medium italic"
                  style={{ color: `${theme.bg}d9` }}
                >
                  &ldquo;{vision}&rdquo;
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="mt-8 sm:mt-10 h-px"
                  style={{ background: `linear-gradient(to right, ${theme.bg}, ${theme.bg}4d, transparent)` }}
                />
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  5. CORE VALUES                                     */}
      {/* ════════════════════════════════════════════════════ */}
      <section 
        className="px-4 sm:px-6 md:px-[5%] py-16 sm:py-20 md:py-24 lg:py-[100px]"
        style={{ backgroundColor: theme.bg }}
      >
        <FadeIn className="text-center mb-12 sm:mb-14 md:mb-16">
          <span 
            className="text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans block mb-3 sm:mb-4 md:mb-5"
            style={{ color: theme.primary }}
          >
            What We Stand For
          </span>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold m-0"
            style={{ color: theme.text }}
          >
            Our Core <span style={{ color: theme.primary }}>Values</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-[1200px] mx-auto">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              whileHover={{ y: -12 }}
              className="p-6 sm:p-7 md:p-8 relative group cursor-pointer overflow-hidden"
              style={{
                backgroundColor: theme.bgCard,
                border: `1px solid ${theme.primary}1a`,
              }}
            >
              <motion.div
                className="absolute top-0 left-0 h-[2px]"
                style={{ backgroundColor: theme.primary }}
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.5, duration: 0.8 }}
              />

              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to bottom right, ${theme.primary}14, transparent)` }}
              />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-3xl sm:text-4xl mb-4 sm:mb-5 inline-block"
                >
                  {value.icon}
                </motion.div>
                <h3 
                  className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3"
                  style={{ color: theme.text }}
                >
                  {value.title}
                </h3>
                <p 
                  className="font-sans text-xs sm:text-[13px] leading-[1.7] font-light m-0"
                  style={{ color: theme.textMuted }}
                >
                  {value.desc}
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
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  6. JOURNEY TIMELINE                                */}
      {/* ════════════════════════════════════════════════════ */}
      <section 
        className="px-4 sm:px-6 md:px-[5%] py-16 sm:py-20 md:py-24 lg:py-[100px] relative overflow-hidden"
        style={{ backgroundColor: theme.bgSecondary }}
      >
        <FadeIn className="text-center mb-12 sm:mb-14 md:mb-16">
          <span 
            className="text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans block mb-3 sm:mb-4 md:mb-5"
            style={{ color: theme.primary }}
          >
            Our Journey
          </span>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold m-0"
            style={{ color: theme.text }}
          >
            A Story of <span style={{ color: theme.primary }}>Growth</span>
          </h2>
        </FadeIn>

        <div className="max-w-[900px] mx-auto relative">
          <div 
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: `linear-gradient(to bottom, transparent, ${theme.primary}4d, transparent)` }}
          />
          <div 
            className="md:hidden absolute left-4 top-0 bottom-0 w-px"
            style={{ background: `linear-gradient(to bottom, transparent, ${theme.primary}4d, transparent)` }}
          />

          {timeline.map((item, i) => (
            <FadeIn key={i} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
              <div className={`relative mb-8 sm:mb-10 md:mb-12 md:flex md:items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`absolute md:relative md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"} left-0 md:left-auto`}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3, type: "spring", stiffness: 300 }}
                    className="hidden md:inline-block"
                  >
                    <div 
                      className="text-3xl sm:text-4xl md:text-5xl font-bold"
                      style={{ color: theme.primary }}
                    >
                      {item.year}
                    </div>
                  </motion.div>
                </div>

                <div className="absolute left-4 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.5, type: "spring", stiffness: 300 }}
                    className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full"
                    style={{ 
                      backgroundColor: theme.primary,
                      border: `4px solid ${theme.bgSecondary}`,
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: theme.primary }}
                    />
                  </motion.div>
                </div>

                <div className={`pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                  <div 
                    className="md:hidden text-2xl sm:text-3xl font-bold mb-2"
                    style={{ color: theme.primary }}
                  >
                    {item.year}
                  </div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="relative p-5 sm:p-6 md:p-7 group"
                    style={{
                      backgroundColor: theme.bgCard,
                      border: `1px solid ${theme.primary}26`,
                    }}
                  >
                    <div 
                      className="absolute top-0 left-0 w-full h-px"
                      style={{ background: `linear-gradient(to right, ${theme.primary}, ${theme.primary}4d, transparent)` }}
                    />
                    <h3 
                      className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3"
                      style={{ color: theme.text }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className="font-sans text-xs sm:text-[13px] md:text-sm leading-[1.7] font-light m-0"
                      style={{ color: theme.textMuted }}
                    >
                      {item.desc}
                    </p>
                  </motion.div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  7. CHEF SECTION                                    */}
      {/* ════════════════════════════════════════════════════ */}
      {(chefName || chefQuote) && (
        <section 
          className="relative overflow-hidden"
          style={{ backgroundColor: theme.bg }}
        >
          <div
            className="absolute inset-[-10%] bg-cover bg-center"
            style={{ backgroundImage: `url(${chefImage})`, filter: "brightness(0.12) blur(3px)" }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-0 lg:min-h-[80vh]">
            <ScaleIn className="relative">
              <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-[60px] my-6 sm:my-8 md:my-10 lg:my-[60px] relative">
                <div
                  className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-cover bg-center bg-top"
                  style={{ backgroundImage: `url(${chefImage})`, filter: "brightness(0.85)" }}
                />
                <div 
                  className="hidden md:block absolute -top-4 -left-4 lg:-top-5 lg:-left-5 right-4 lg:right-5 bottom-4 lg:bottom-5 pointer-events-none"
                  style={{ border: `1px solid ${theme.primary}4d` }}
                />
              </div>
            </ScaleIn>

            <FadeIn direction="right" className="flex flex-col justify-center">
              <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-0">
                <span 
                  className="text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[5px] uppercase font-sans block mb-5 sm:mb-6 md:mb-8"
                  style={{ color: theme.primary }}
                >
                  The Mastermind
                </span>

                {chefQuote && (
                  <>
                    <div 
                      className="text-4xl sm:text-5xl md:text-[60px] leading-[0.5] mb-4 sm:mb-5 md:mb-6 font-serif"
                      style={{ color: theme.primary }}
                    >
                      &ldquo;
                    </div>
                    <p 
                      className="text-lg sm:text-xl md:text-2xl lg:text-[26px] leading-[1.4] sm:leading-[1.5] italic m-0 mb-6 sm:mb-8 md:mb-10 font-normal max-w-lg"
                      style={{ color: theme.text }}
                    >
                      {chefQuote}
                    </p>
                  </>
                )}

                <div 
                  className="w-10 sm:w-12 md:w-[60px] h-px mb-4 sm:mb-5 md:mb-6"
                  style={{ backgroundColor: theme.primary }}
                />

                {chefName && (
                  <h3 
                    className="text-lg sm:text-xl md:text-2xl font-bold m-0 mb-1 sm:mb-2"
                    style={{ color: theme.text }}
                  >
                    {chefName}
                  </h3>
                )}
                <p 
                  className="font-sans text-[10px] sm:text-[11px] md:text-xs tracking-[2px] sm:tracking-[3px] uppercase m-0"
                  style={{ color: theme.primary }}
                >
                  {chefRole}
                </p>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════ */}
      {/*  8. TEAM MEMBERS                                    */}
      {/* ════════════════════════════════════════════════════ */}
      {teamMembers.length > 0 && (
        <section 
          className="px-4 sm:px-6 md:px-[5%] py-16 sm:py-20 md:py-24 lg:py-[120px]"
          style={{ backgroundColor: theme.bgSecondary }}
        >
          <FadeIn className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20">
            <span 
              className="text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans block mb-3 sm:mb-4 md:mb-5"
              style={{ color: theme.primary }}
            >
              Our People
            </span>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold m-0"
              style={{ color: theme.text }}
            >
              The Team Behind {restaurantName}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px] sm:gap-[3px] max-w-[1200px] mx-auto">
            {teamMembers.map((member, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <motion.div 
                  whileHover={{ y: -8 }} 
                  className="overflow-hidden"
                  style={{ backgroundColor: theme.bgCard }}
                >
                  <div
                    className="h-48 sm:h-56 md:h-64 lg:h-[320px] bg-cover bg-center bg-top relative"
                    style={{ backgroundImage: `url(${member.image || PLACEHOLDER})`, filter: "brightness(0.8) grayscale(0.3)" }}
                  >
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-14"
                      style={{ background: `linear-gradient(to top, ${theme.bgCard}, transparent)` }}
                    />
                  </div>
                  <div className="p-5 sm:p-6 md:p-7 lg:p-8">
                    <div 
                      className="w-5 sm:w-6 h-px mb-3 sm:mb-4"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <h3 
                      className="text-base sm:text-lg md:text-xl font-bold m-0 mb-1"
                      style={{ color: theme.text }}
                    >
                      {member.name}
                    </h3>
                    <p 
                      className="font-sans text-[9px] sm:text-[10px] md:text-[11px] tracking-[1.5px] sm:tracking-[2px] uppercase m-0 mb-3 sm:mb-4"
                      style={{ color: theme.primary }}
                    >
                      {member.role}
                    </p>
                    {member.bio && (
                      <p 
                        className="font-sans text-[11px] sm:text-xs md:text-[13px] leading-[1.6] sm:leading-[1.7] m-0 font-light"
                        style={{ color: theme.textMuted }}
                      >
                        {member.bio}
                      </p>
                    )}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════ */}
      {/*  9. AWARDS                                          */}
      {/* ════════════════════════════════════════════════════ */}
      {awards.length > 0 && (
        <section 
          className="px-4 sm:px-6 md:px-[5%] py-12 sm:py-16 md:py-20"
          style={{ 
            backgroundColor: theme.bgSecondary,
            borderTop: `1px solid ${theme.primary}26`,
          }}
        >
          <div className="max-w-[1100px] mx-auto">
            <FadeIn className="text-center mb-10 sm:mb-12 md:mb-[60px]">
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold m-0"
                style={{ color: theme.text }}
              >
                Recognition & Awards
              </h2>
            </FadeIn>
            <div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-px"
              style={{ backgroundColor: `${theme.primary}1a` }}
            >
              {awards.map((award, i) => (
                <ScaleIn key={i} delay={i * 0.1}>
                  <div 
                    className="p-6 sm:p-8 md:p-10 lg:p-12 text-center"
                    style={{ backgroundColor: theme.bgCard }}
                  >
                    <div 
                      className="text-xl sm:text-2xl mb-3 sm:mb-4"
                      style={{ color: theme.primary }}
                    >
                      ✦
                    </div>
                    <div 
                      className="text-xl sm:text-2xl md:text-[28px] font-bold font-sans mb-2 sm:mb-3"
                      style={{ color: theme.primary }}
                    >
                      {award.year}
                    </div>
                    <h4 
                      className="text-xs sm:text-sm md:text-[15px] font-bold m-0 mb-1 sm:mb-2 leading-[1.3]"
                      style={{ color: theme.text }}
                    >
                      {award.title}
                    </h4>
                    <p 
                      className="font-sans text-[9px] sm:text-[10px] md:text-[11px] tracking-[1px] sm:tracking-[2px] m-0 uppercase"
                      style={{ color: theme.textMuted, opacity: 0.7 }}
                    >
                      {award.org || award.organization}
                    </p>
                  </div>
                </ScaleIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════ */}
      {/*  10. CTA                                            */}
      {/* ════════════════════════════════════════════════════ */}
      <section 
        className="px-4 sm:px-6 md:px-[5%] py-16 sm:py-20 md:py-24"
        style={{
          background: `linear-gradient(to bottom right, ${theme.bgSecondary}, ${theme.bg}, ${theme.bgSecondary})`,
          borderTop: `1px solid ${theme.primary}26`,
        }}
      >
        <FadeIn className="text-center max-w-3xl mx-auto">
          <div 
            className="text-4xl sm:text-5xl mb-6 sm:mb-8"
            style={{ color: theme.primary }}
          >
            ✦
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
            style={{ color: theme.text }}
          >
            Become Part of Our <span style={{ color: theme.primary }}>Story</span>
          </h2>
          <p 
            className="font-sans text-sm sm:text-base mb-8 sm:mb-10 font-light leading-relaxed"
            style={{ color: theme.textMuted }}
          >
            Every guest at {restaurantName} adds a beautiful chapter to our journey. We&apos;d love to welcome you to our family.
          </p>
          {client.phone && (
            <motion.a
              href={`tel:${client.phone}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-bold cursor-pointer no-underline"
              style={{
                background: `linear-gradient(to bottom right, ${theme.primary}, ${theme.accent})`,
                color: theme.bg,
              }}
            >
              Reserve Your Table
            </motion.a>
          )}
        </FadeIn>
      </section>
    </div>
  );
}