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
    title: "Quality",
    description:
      "We never compromise on quality. Every line of code, every pixel of design is crafted with care.",
    color: "bg-red-50 text-red-500",
  },
  {
    icon: Target,
    title: "Transparency",
    description:
      "Clear communication, honest pricing, and no surprises. You always know what's happening.",
    color: "bg-blue-50 text-blue-500",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We stay ahead of technology trends to deliver modern, future-proof solutions.",
    color: "bg-yellow-50 text-yellow-500",
  },
  {
    icon: Users,
    title: "Client-First",
    description:
      "Your success is our success. We go above and beyond to ensure you're completely satisfied.",
    color: "bg-green-50 text-green-500",
  },
];

const team = [
  {
    name: "Abhinandan Meena",
    role: "Co-Founder & CEO",
    designation: "Lead Developer",
    bio: "Passionate full-stack developer with expertise in React, Next.js, and Node.js. Abhinandan leads all technical decisions and ensures every project meets the highest quality standards.",
    linkedin: "https://linkedin.com/in/abhinandan-meena",
    image: "/images/team/abhinandan.jpg",
    initials: "AM",
    color: "bg-blue-500",
  },
  {
    name: "Varsha Thakre",
    role: "Co-Founder & COO",
    designation: "Project Manager",
    bio: "Varsha ensures every project is delivered on time and within budget. Her attention to detail and client communication skills make her the backbone of AVB Software's operations.",
    linkedin: "https://linkedin.com/in/varsha-thakre",
    image: "/images/team/varsha.jpg",
    initials: "VT",
    color: "bg-purple-500",
  },
  {
    name: "Bharti Dhote",
    role: "Co-Founder & Design Lead",
    designation: "Client Relations",
    bio: "Creative UI/UX designer with a passion for building beautiful, user-friendly interfaces. Bharti manages client relationships and ensures design excellence in every project.",
    linkedin: "https://linkedin.com/in/bharti-dhote",
    image: "/images/team/bharti.jpg",
    initials: "BD",
    color: "bg-pink-500",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-surface border-b border-slate-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="section-badge">Our Story</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-6">
              We&apos;re a Team of Builders,
              <br />
              <span className="gradient-text">Passionate About Technology</span>
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              AVB Software was founded with a simple mission: to make
              high-quality software development accessible and affordable for
              businesses of all sizes in India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-extrabold text-navy mb-6">
                How We Started
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  AVB Software was born out of a shared passion for technology
                  and a desire to solve real business problems. Three friends —
                  Abhinandan, Varsha, and Bharti — came together with
                  complementary skills and a common vision.
                </p>
                <p>
                  We noticed that many small and medium businesses in Bhopal and
                  across India were struggling to afford quality software
                  development. Large agencies were either too expensive or too
                  slow. Freelancers were unreliable.
                </p>
                <p>
                  So we decided to fill that gap. We built AVB Software as a
                  lean, remote-first team that could deliver enterprise-quality
                  work at startup-friendly prices.
                </p>
                <p>
                  Today, we work with clients across India, helping them build
                  their digital presence, automate their processes, and grow
                  their businesses through technology.
                </p>
              </div>

              {/* Mission Statement */}
              <div className="mt-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl">
                <p className="font-jakarta font-semibold text-navy text-lg">
                  Our Mission
                </p>
                <p className="text-muted mt-2">
                  &quot;To deliver reliable, modern software solutions that help
                  businesses grow — transparently, affordably, and with
                  excellence.&quot;
                </p>
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
                  title: "India-Based",
                  desc: "Proudly from Bhopal, MP",
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
                  className="p-5 bg-surface rounded-2xl border border-slate-100"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-semibold text-navy text-sm">
                    {item.title}
                  </div>
                  <div className="text-muted text-xs mt-1">{item.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface border-y border-slate-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="section-badge">Our Values</span>
            <h2 className="text-3xl font-extrabold text-navy">
              What We Stand For
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-white rounded-2xl border border-slate-100 text-center hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-14 h-14 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-jakarta font-bold text-navy text-lg mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="section-badge">The Team</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
              Meet the Founders
            </h2>
            <p className="text-muted text-lg">
              Three passionate professionals united by a love for technology and
              a desire to help businesses grow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                {/* Photo */}
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div
                    className={`w-full h-full rounded-2xl overflow-hidden border-4 border-slate-100 group-hover:border-primary transition-colors duration-300`}
                  >
                    {/* Try to load real image, fallback to initials */}
                    <div
                      className={`w-full h-full ${member.color} flex items-center justify-center`}
                    >
                      <span className="text-white text-4xl font-bold font-jakarta">
                        {member.initials}
                      </span>
                    </div>
                    {/* 
                      Uncomment when real photos are available:
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    */}
                  </div>
                </div>

                {/* Info */}
                <h3 className="font-jakarta font-bold text-xl text-navy mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-semibold text-sm mb-0.5">
                  {member.role}
                </p>
                <p className="text-muted text-xs mb-3">{member.designation}</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 px-2">
                  {member.bio}
                </p>

                {/* LinkedIn */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline"
                >
                  
                  Connect on LinkedIn
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why WFH */}
      <section className="section-padding bg-navy">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-extrabold text-white mb-6">
                Why Our Remote Model Works for You
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                By working remotely from Bhopal, we save on office overheads —
                and pass those savings directly to you. You get the same quality
                as big-city agencies at a fraction of the cost. Our distributed
                team model also means we can work across time zones and deliver
                faster.
              </p>
              <div className="grid grid-cols-3 gap-6 text-center">
                {[
                  { label: "Lower Cost", value: "40%", desc: "vs city agencies" },
                  { label: "Faster Delivery", value: "2x", desc: "agile sprints" },
                  { label: "Availability", value: "6/7", desc: "days a week" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/10 rounded-2xl p-5">
                    <div className="text-3xl font-extrabold text-primary font-jakarta">
                      {item.value}
                    </div>
                    <div className="text-white font-semibold text-sm mt-1">
                      {item.label}
                    </div>
                    <div className="text-slate-400 text-xs mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all"
                >
                  Work With Us
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}