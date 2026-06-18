"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Target,
  Heart,
  Lightbulb,
  Users,
  ArrowRight,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Quality First",
    description:
      "We never compromise on quality. Every line of code, every pixel of design for our Indore & Bhopal clients is crafted with care.",
  },
  {
    icon: Target,
    title: "Complete Transparency",
    description:
      "Clear communication, honest pricing, and no surprises. Our Indore & Bhopal clients always know what's happening at every stage.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Driven",
    description:
      "We stay ahead of technology trends to deliver modern, future-proof solutions to businesses in Madhya Pradesh.",
  },
  {
    icon: Users,
    title: "Client-First Approach",
    description:
      "Your success is our success. We go above and beyond to ensure complete satisfaction for every Indore & Bhopal business we serve.",
  },
];

const team = [
  {
    name: "Abhinandan Meena",
    role: "Co-Founder & CEO",
    designation: "Lead Developer",
    bio: "Passionate full-stack developer with expertise in React, Next.js, and Node.js. Abhinandan leads all technical decisions and ensures every project for our Indore & Bhopal clients meets the highest quality standards.",
    linkedin: "https://linkedin.com/in/abhinandan-meena",
    image: "/images/team/abhinandan.jpg",
    initials: "AM",
    expertise: ["React.js", "Next.js", "Node.js", "MongoDB"],
  },
  {
    name: "Varsha Thakre",
    role: "Co-Founder & COO",
    designation: "Project Manager",
    bio: "Varsha ensures every project is delivered on time and within budget. Her attention to detail and client communication skills make her the backbone of AVB Software's operations across Indore & Bhopal.",
    linkedin: "https://linkedin.com/in/varsha-thakre",
    image: "/images/team/varsha.jpg",
    initials: "VT",
    expertise: ["Project Management", "Agile", "Client Relations", "Strategy"],
  },
  {
    name: "Bharti Dhote",
    role: "Co-Founder & Design Lead",
    designation: "UI/UX Designer",
    bio: "Creative UI/UX designer with a passion for building beautiful, user-friendly interfaces. Bharti manages client relationships in Indore & Bhopal and ensures design excellence in every project.",
    linkedin: "https://linkedin.com/in/bharti-dhote",
    image: "/images/team/bharti.jpg",
    initials: "BD",
    expertise: ["Figma", "UI Design", "UX Research", "Branding"],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section 
        className="pt-32 pb-16 bg-[#F5F0E6] border-b border-[#D4C29E]/30 relative overflow-hidden"
        aria-labelledby="about-hero-heading"
      >
        {/* Decorative blobs */}
        <div className="absolute top-20 -left-20 w-[400px] h-[400px] bg-[#E8DCC4]/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-[#C9A45C]/15 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-6">
              <span className="w-8 h-px bg-[#8B6F47]"></span>
              OUR STORY
            </div>

            <h1 
              id="about-hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B2419] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              About <span className="italic gradient-text">AVB Software</span>
              <br />
              Premium Digital Studio
            </h1>
            <p className="text-lg text-[#6B5D4A] leading-relaxed">
              <strong className="text-[#2B2419]">AVB Software</strong> is a leading <strong className="text-[#2B2419]">software development company in Indore & Bhopal</strong>, 
              founded with a simple mission: to make high-quality web & app development accessible and affordable 
              for businesses across Madhya Pradesh and India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== OUR STORY SECTION ===== */}
      <section 
        className="section-padding bg-[#FAF5EA]"
        aria-labelledby="our-story-heading"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-4">
                <span className="w-8 h-px bg-[#8B6F47]"></span>
                THE JOURNEY
              </div>
              <h2 
                id="our-story-heading"
                className="text-3xl md:text-4xl font-bold text-[#2B2419] mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                How <span className="italic gradient-text">AVB Software</span> Started
              </h2>
              <div className="space-y-4 text-[#6B5D4A] leading-relaxed">
                <p>
                  <strong className="text-[#2B2419]">AVB Software</strong> was born out of a shared passion for technology
                  and a desire to solve real business problems in <strong className="text-[#2B2419]">Indore, Bhopal, and across Madhya Pradesh</strong>. 
                  Three friends — Abhinandan, Varsha, and Bharti — came together with
                  complementary skills and a common vision.
                </p>
                <p>
                  We noticed that many small and medium businesses in <strong className="text-[#2B2419]">Bhopal, Indore, 
                  Ujjain, and across MP</strong> were struggling to afford quality software
                  development. Large agencies were either too expensive or too slow. 
                  Freelancers were unreliable.
                </p>
                <p>
                  So we decided to fill that gap. We built <strong className="text-[#2B2419]">AVB Software</strong> as a
                  lean, remote-first team that could deliver enterprise-quality
                  <strong className="text-[#2B2419]"> web development, mobile app development, and custom software</strong> at 
                  startup-friendly prices for Indore & Bhopal businesses.
                </p>
                <p>
                  Today, we work with clients across <strong className="text-[#2B2419]">Madhya Pradesh and India</strong>, helping them build
                  their digital presence, automate their processes, and grow
                  their businesses through technology.
                </p>
              </div>

              {/* Mission Statement */}
              <div className="mt-8 p-7 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-2xl shadow-lg shadow-[#8B6F47]/20 relative overflow-hidden">
                {/* Decorative pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle at 2px 2px, #C9A45C 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="relative z-10">
                  <p 
                    className="text-xs font-bold text-[#C9A45C] uppercase tracking-[2px] mb-3"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    — OUR MISSION
                  </p>
                  <p 
                    className="text-white text-xl leading-relaxed italic"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    &quot;To deliver reliable, modern software solutions that help
                    businesses in <span className="text-[#C9A45C]">Indore, Bhopal, and across India</span> grow — 
                    transparently, affordably, and with excellence.&quot;
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats / Story visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  icon: "🚀",
                  title: "Founded 2023",
                  desc: "Started with a vision",
                },
                {
                  icon: "🇮🇳",
                  title: "Based in MP",
                  desc: "Proudly from Bhopal & Indore",
                },
                {
                  icon: "💻",
                  title: "Remote-First",
                  desc: "Work from anywhere model",
                },
                {
                  icon: "🎯",
                  title: "Client-Focused",
                  desc: "Your success = our success",
                },
                {
                  icon: "⚡",
                  title: "Agile Process",
                  desc: "Fast, iterative delivery",
                },
                {
                  icon: "🔒",
                  title: "Transparent",
                  desc: "No hidden costs, ever",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="p-6 bg-white rounded-2xl border border-[#E8DEC8] hover:border-[#D4C29E] hover:shadow-lg hover:shadow-[#8B6F47]/10 hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform" aria-hidden="true">{item.icon}</div>
                  <div 
                    className="font-bold text-[#2B2419] text-sm mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.title}
                  </div>
                  <div className="text-[#6B5D4A] text-xs">{item.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== VALUES SECTION ===== */}
      <section 
        className="section-padding bg-[#F5F0E6] border-y border-[#D4C29E]/30 relative overflow-hidden"
        aria-labelledby="values-heading"
      >
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#E8DCC4]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C9A45C]/15 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-4">
              <span className="w-8 h-px bg-[#8B6F47]"></span>
              OUR VALUES
              <span className="w-8 h-px bg-[#8B6F47]"></span>
            </div>
            <h2 
              id="values-heading"
              className="text-3xl md:text-4xl font-bold text-[#2B2419] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Why Businesses <span className="italic gradient-text">Trust Us</span>
            </h2>
            <p className="text-[#6B5D4A]">
              Our core values that drive every project for our Madhya Pradesh clients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.article
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-7 bg-white rounded-3xl border border-[#E8DEC8] text-center hover:border-[#D4C29E] hover:shadow-xl hover:shadow-[#8B6F47]/10 hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#8B6F47]/25 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" aria-hidden="true">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 
                    className="font-bold text-[#2B2419] text-lg mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-[#6B5D4A] text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TEAM SECTION ===== */}
      <section 
        className="section-padding bg-[#FAF5EA]"
        aria-labelledby="team-heading"
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-4">
              <span className="w-8 h-px bg-[#8B6F47]"></span>
              THE TEAM
              <span className="w-8 h-px bg-[#8B6F47]"></span>
            </div>
            <h2 
              id="team-heading"
              className="text-3xl md:text-5xl font-bold text-[#2B2419] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Meet the <span className="italic gradient-text">Founders</span>
            </h2>
            <p className="text-[#6B5D4A] text-lg">
              Three passionate professionals from <strong className="text-[#2B2419]">Madhya Pradesh</strong>, united by a love for 
              technology and a desire to help businesses grow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-7 border border-[#E8DEC8] text-center group hover:border-[#D4C29E] hover:shadow-2xl hover:shadow-[#8B6F47]/15 hover:-translate-y-2 transition-all duration-500"
                itemScope
                itemType="https://schema.org/Person"
              >
                {/* Photo */}
                <div className="relative w-36 h-36 mx-auto mb-6">
                  {/* Decorative ring */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C9A45C] to-[#8B6F47] rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                  
                  <div className="absolute inset-0 rounded-3xl overflow-hidden border-4 border-[#FAF5EA] shadow-xl">
                    <div
                      className="w-full h-full bg-gradient-to-br from-[#8B6F47] to-[#6B5535] flex items-center justify-center"
                      aria-label={`${member.name}`}
                    >
                      <span 
                        className="text-white text-4xl font-bold"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {member.initials}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <h3 
                  className="font-bold text-2xl text-[#2B2419] mb-1"
                  itemProp="name"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {member.name}
                </h3>
                <p 
                  className="text-[#8B6F47] font-bold text-sm mb-1 uppercase tracking-wider"
                  itemProp="jobTitle"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {member.role}
                </p>
                <p className="text-[#6B5D4A] text-xs mb-4 italic" itemProp="hasOccupation">
                  {member.designation}
                </p>
                <p 
                  className="text-[#6B5D4A] text-sm leading-relaxed mb-5 px-2"
                  itemProp="description"
                >
                  {member.bio}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                  {member.expertise.map((skill) => (
                    <span 
                      key={skill}
                      className="text-xs bg-[#FAF5EA] text-[#8B6F47] px-3 py-1.5 rounded-full font-semibold border border-[#E8DEC8]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* LinkedIn */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#8B6F47] text-sm font-bold hover:text-[#6B5535] transition-colors group/link"
                  itemProp="sameAs"
                >
                  Connect on LinkedIn
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY REMOTE SECTION (DARK) ===== */}
      <section 
        className="section-padding bg-gradient-to-br from-[#8B6F47] via-[#6B5535] to-[#2B2419] relative overflow-hidden"
        aria-labelledby="remote-heading"
      >
        {/* Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #C9A45C 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#C9A45C]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E8DCC4]/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#C9A45C] mb-6">
                <span className="w-8 h-px bg-[#C9A45C]"></span>
                OUR ADVANTAGE
                <span className="w-8 h-px bg-[#C9A45C]"></span>
              </div>

              <h2 
                id="remote-heading"
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Why Our <span className="italic" style={{ color: '#C9A45C' }}>Remote Model</span> Wins
              </h2>
              <p className="text-[#E8DCC4] text-lg leading-relaxed mb-10">
                By working remotely from <strong className="text-white">Bhopal & Indore</strong>, we save on office overheads —
                and pass those savings directly to you. You get the same quality
                as big-city agencies (Mumbai, Bangalore, Delhi) at a fraction of the cost.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { label: "Lower Cost", value: "40%", desc: "vs city agencies" },
                  { label: "Faster Delivery", value: "2x", desc: "agile sprints" },
                  { label: "Availability", value: "6/7", desc: "days a week" },
                ].map((item) => (
                  <div key={item.label} className="bg-[#FAF5EA]/10 backdrop-blur-sm rounded-2xl p-5 border border-[#C9A45C]/20 hover:border-[#C9A45C]/50 hover:-translate-y-1 transition-all">
                    <div 
                      className="text-4xl font-bold text-[#C9A45C] mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.value}
                    </div>
                    <div 
                      className="text-white font-bold text-sm"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {item.label}
                    </div>
                    <div className="text-[#E8DCC4]/80 text-xs mt-1">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-2xl hover:bg-white transition-all hover:-translate-y-1 shadow-xl"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Work With Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== AREAS WE SERVE SECTION ===== */}
      <section 
        className="section-padding bg-[#F5F0E6]"
        aria-labelledby="areas-heading"
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-4">
              <span className="w-8 h-px bg-[#8B6F47]"></span>
              SERVICE AREAS
              <span className="w-8 h-px bg-[#8B6F47]"></span>
            </div>
            <h2 
              id="areas-heading"
              className="text-3xl md:text-4xl font-bold text-[#2B2419] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Cities We <span className="italic gradient-text">Serve</span>
            </h2>
            <p className="text-[#6B5D4A] text-lg">
              While we&apos;re based in Bhopal & Indore, we proudly serve businesses 
              across Madhya Pradesh and all of India.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { city: "Indore", desc: "Commercial Hub of MP" },
              { city: "Bhopal", desc: "Capital City" },
              { city: "Ujjain", desc: "Religious & Cultural" },
              { city: "Dewas", desc: "Industrial Hub" },
              { city: "Jabalpur", desc: "Educational Hub" },
              { city: "Gwalior", desc: "Historic City" },
              { city: "Sagar", desc: "Central MP" },
              { city: "Ratlam", desc: "Western MP" },
            ].map((location, index) => (
              <motion.div
                key={location.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-5 bg-white rounded-2xl border border-[#E8DEC8] text-center hover:border-[#D4C29E] hover:shadow-lg hover:shadow-[#8B6F47]/10 hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform" aria-hidden="true">📍</div>
                <h3 
                  className="font-bold text-[#2B2419] text-base mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {location.city}
                </h3>
                <p className="text-xs text-[#8B6F47] font-semibold">{location.desc}</p>
              </motion.div>
            ))}
          </div>

          <p 
            className="text-center text-[#6B5D4A] mt-10 text-sm italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ✨ And many more cities across <strong className="text-[#2B2419] not-italic">India</strong> — we work remotely! 🇮🇳
          </p>
        </div>
      </section>
    </>
  );
}