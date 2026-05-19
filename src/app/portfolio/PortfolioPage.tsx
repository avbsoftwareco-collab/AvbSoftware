"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Code2, Smartphone, Palette, Globe } from "lucide-react";

type Category = "All" | "Web" | "Mobile" | "Design";

const projects = [
  {
    id: 1,
    title: "Client Project 1",
    category: "Web",
    description:
      "A modern e-commerce website built for a retail client with integrated payment gateway and inventory management.",
    technologies: ["Next.js", "Tailwind CSS", "Razorpay", "MongoDB"],
    image: "/images/project-placeholder-1.jpg",
    status: "Live",
    placeholder: true,
  },
  {
    id: 2,
    title: "Mobile App Project",
    category: "Mobile",
    description:
      "Cross-platform mobile application for service booking with real-time notifications and GPS tracking.",
    technologies: ["React Native", "Firebase", "Node.js"],
    image: "/images/project-placeholder-2.jpg",
    status: "Live",
    placeholder: true,
  },
  {
    id: 3,
    title: "Brand Identity & UI",
    category: "Design",
    description:
      "Complete brand identity and UI/UX design for a startup, including logo, design system, and mobile app screens.",
    technologies: ["Figma", "Adobe Illustrator"],
    image: "/images/project-placeholder-3.jpg",
    status: "Completed",
    placeholder: true,
  },
  {
    id: 4,
    title: "Business Management System",
    category: "Web",
    description:
      "Custom ERP-like system for managing inventory, invoices, and staff for a mid-sized business.",
    technologies: ["React", "Node.js", "PostgreSQL", "Chart.js"],
    image: "/images/project-placeholder-4.jpg",
    status: "Live",
    placeholder: true,
  },
];

const categories: Category[] = ["All", "Web", "Mobile", "Design"];

const categoryIcons = {
  Web: Globe,
  Mobile: Smartphone,
  Design: Palette,
  All: Code2,
};

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-surface border-b border-slate-100">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="section-badge">Our Work</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-4">
              Projects We&apos;re Proud Of
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Real solutions built for real businesses. Here&apos;s a selection
              of our recent work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-primary text-white shadow-md shadow-primary/30"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence>
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Project image / placeholder */}
                  <div className="relative h-52 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                    {project.placeholder ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-3">
                          <Code2 className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-slate-400 text-sm">
                          Screenshot Coming Soon
                        </p>
                      </div>
                    ) : (
                      // Replace with Next.js Image when real image available
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-indigo-500/20" />
                    )}

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full">
                        {project.category}
                      </span>
                    </div>

                    {/* Status badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          project.status === "Live"
                            ? "bg-green-500 text-white"
                            : "bg-slate-500 text-white"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Project info */}
                  <div className="p-6">
                    <h3 className="font-jakarta font-bold text-xl text-navy mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tech chips */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                    >
                      View Details
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3 inline-block">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-extrabold text-navy">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>
              <p className="text-muted leading-relaxed mb-6">
                {selectedProject.description}
              </p>
              <div className="mb-6">
                <p className="font-semibold text-navy text-sm mb-2">
                  Technologies Used:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href="/contact"
                className="btn-primary w-full justify-center"
                onClick={() => setSelectedProject(null)}
              >
                Start a Similar Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="section-padding bg-surface border-t border-slate-100">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-extrabold text-navy mb-4">
            Want to see your project here?
          </h2>
          <p className="text-muted mb-8">
            Let&apos;s build something amazing together.
          </p>
          <Link href="/contact" className="btn-primary">
            Start Your Project
          </Link>
        </div>
      </section>
    </>
  );
}